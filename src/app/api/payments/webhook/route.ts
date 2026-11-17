import { NextRequest, NextResponse } from "next/server";
import { verifyWebhookSignature, LIFETIME_PRICE_PAISE } from "@/lib/razorpay";
import { getAdminClient, isSupabaseConfigured } from "@/lib/supabase/admin";

export async function POST(req: NextRequest) {
  try {
    // 1. Read the raw text body strictly for cryptographic signature verification
    const rawBody = await req.text();
    const signature = req.headers.get("x-razorpay-signature");

    if (!signature) {
      return NextResponse.json(
        { error: "Missing x-razorpay-signature header" },
        { status: 400 }
      );
    }

    // 2. Verify webhook signature
    const isValid = verifyWebhookSignature(rawBody, signature);
    if (!isValid) {
      console.warn("Invalid Razorpay webhook signature detected");
      return NextResponse.json(
        { error: "Invalid webhook signature" },
        { status: 400 }
      );
    }

    const payload = JSON.parse(rawBody);
    const eventType = payload.event;
    const eventId = payload.account_id ? `${payload.account_id}_${payload.created_at}_${payload.event}` : `evt_${Date.now()}`;

    // 3. Process with Idempotency: Prevent duplicate processing of the same event
    if (isSupabaseConfigured()) {
      const admin = getAdminClient();

      const { data: existingEvent } = await admin
        .from("webhook_events")
        .select("id")
        .eq("event_id", eventId)
        .single();

      if (existingEvent) {
        // Event already processed safely
        return NextResponse.json({ received: true, duplicate: true });
      }

      // Record the webhook event
      await admin.from("webhook_events").insert({
        event_id: eventId,
        event_type: eventType,
        payload,
      });

      // 4. Handle specific events
      if (eventType === "order.paid" || eventType === "payment.captured") {
        const paymentEntity = payload.payload?.payment?.entity;
        const orderEntity = payload.payload?.order?.entity;

        const orderId = paymentEntity?.order_id || orderEntity?.id;
        const paymentId = paymentEntity?.id;
        const userId =
          paymentEntity?.notes?.user_id ||
          orderEntity?.notes?.user_id;

        if (userId) {
          // Grant lifetime premium entitlement
          await admin
            .from("profiles")
            .update({
              is_premium: true,
              membership_plan: "lifetime_premium",
              membership_started_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            })
            .eq("id", userId);

          // Update or insert payment status
          if (orderId) {
            await admin.from("payments").upsert({
              user_id: userId,
              razorpay_order_id: orderId,
              razorpay_payment_id: paymentId,
              amount: paymentEntity?.amount || LIFETIME_PRICE_PAISE,
              currency: paymentEntity?.currency || "INR",
              status: "captured",
              method: paymentEntity?.method,
              customer_email: paymentEntity?.email,
              updated_at: new Date().toISOString(),
            }, { onConflict: "razorpay_order_id" });
          }
        }
      } else if (eventType === "payment.failed") {
        const paymentEntity = payload.payload?.payment?.entity;
        const orderId = paymentEntity?.order_id;
        const userId = paymentEntity?.notes?.user_id;

        if (orderId && userId) {
          await admin.from("payments").upsert({
            user_id: userId,
            razorpay_order_id: orderId,
            razorpay_payment_id: paymentEntity?.id,
            amount: paymentEntity?.amount || LIFETIME_PRICE_PAISE,
            currency: paymentEntity?.currency || "INR",
            status: "failed",
            updated_at: new Date().toISOString(),
          }, { onConflict: "razorpay_order_id" });
        }
      }
    }

    return NextResponse.json({ received: true, status: "processed" });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Webhook processing failed";
    console.error("Webhook processing error:", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
