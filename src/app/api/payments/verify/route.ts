import { NextRequest, NextResponse } from "next/server";
import {
  verifyRazorpaySignature,
  isRazorpayConfigured,
  getRazorpayClient,
  LIFETIME_PRICE_PAISE,
} from "@/lib/razorpay";
import { createClientServer } from "@/lib/supabase/server";
import { getAdminClient, isSupabaseConfigured } from "@/lib/supabase/admin";

export async function POST(req: NextRequest) {
  try {
    const supabase = createClientServer();
    const { data: { user } } = await supabase.auth.getUser();

    const body = await req.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      demoUserId,
    } = body;

    const userId = user?.id || demoUserId;

    if (!userId) {
      return NextResponse.json(
        { error: "Authentication required to verify payment" },
        { status: 401 }
      );
    }

    if (!razorpay_order_id || !razorpay_payment_id) {
      return NextResponse.json(
        { error: "Missing required payment parameters: order_id and payment_id" },
        { status: 400 }
      );
    }

    const liveConfigured = isRazorpayConfigured();

    if (liveConfigured) {
      // 1. Strict HMAC-SHA256 signature verification
      if (!razorpay_signature) {
        return NextResponse.json(
          { error: "Missing Razorpay payment signature" },
          { status: 400 }
        );
      }

      const isValidSignature = verifyRazorpaySignature(
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature
      );

      if (!isValidSignature) {
        return NextResponse.json(
          { error: "Invalid payment signature. Verification failed." },
          { status: 400 }
        );
      }

      // 2. Fetch payment directly from Razorpay to confirm it was captured
      const razorpay = getRazorpayClient();
      if (razorpay) {
        const paymentDetails = await razorpay.payments.fetch(razorpay_payment_id);
        if (paymentDetails.status !== "captured") {
          return NextResponse.json(
            { error: `Payment is not captured. Current status: ${paymentDetails.status}` },
            { status: 400 }
          );
        }

        if (paymentDetails.amount !== LIFETIME_PRICE_PAISE) {
          return NextResponse.json(
            { error: "Payment amount does not match plan price of ₹99 (9900 paise)" },
            { status: 400 }
          );
        }
      }
    } else {
      // In Demo / Testing Mode without live keys, verify order matches demo format
      if (!razorpay_order_id.startsWith("order_test_")) {
        return NextResponse.json(
          { error: "Invalid demo order token" },
          { status: 400 }
        );
      }
    }

    // 3. Update Database: Grant Lifetime Premium status
    if (isSupabaseConfigured() && user) {
      const admin = getAdminClient();

      // Check for duplicate payment or entitlement
      const { data: existingProfile } = await admin
        .from("profiles")
        .select("is_premium")
        .eq("id", userId)
        .single();

      if (existingProfile?.is_premium) {
        return NextResponse.json({
          success: true,
          alreadyActive: true,
          message: "Congratulations! Your MissAlpha AI Lab Lifetime Premium Membership is Active.",
        });
      }

      // Update user profile to lifetime premium
      const { error: profileError } = await admin
        .from("profiles")
        .update({
          is_premium: true,
          membership_plan: "lifetime_premium",
          membership_started_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq("id", userId);

      if (profileError) {
        console.error("Profile update error:", profileError);
      }

      // Record payment transaction
      await admin.from("payments").upsert({
        user_id: userId,
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature: razorpay_signature || "demo_signature",
        amount: LIFETIME_PRICE_PAISE,
        currency: "INR",
        status: "captured",
        customer_email: user.email,
        updated_at: new Date().toISOString(),
      }, { onConflict: "razorpay_order_id" });
    }

    return NextResponse.json({
      success: true,
      message: "Congratulations! Your MissAlpha AI Lab Lifetime Premium Membership is Active.",
      membership: {
        plan: "MissAlpha AI Lab Lifetime Premium",
        price: "₹99",
        access: "Lifetime Access",
        status: "Active",
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Payment verification failed";
    console.error("Verification error:", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
