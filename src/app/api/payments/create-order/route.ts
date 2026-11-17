import { NextRequest, NextResponse } from "next/server";
import { getRazorpayClient, LIFETIME_PRICE_PAISE, isRazorpayConfigured } from "@/lib/razorpay";
import { createClientServer } from "@/lib/supabase/server";
import { getAdminClient, isSupabaseConfigured } from "@/lib/supabase/admin";

export async function POST(req: NextRequest) {
  try {
    const supabase = createClientServer();
    const { data: { user } } = await supabase.auth.getUser();

    // Check if user is logged in
    let userId = user?.id;
    let userEmail = user?.email || "student@missalpha.ai";

    // If client provided a demo/guest email or fallback when Supabase Auth is demo
    const body = await req.json().catch(() => ({}));
    if (!userId && body.demoUserId) {
      userId = body.demoUserId;
      userEmail = body.demoUserEmail || userEmail;
    }

    if (!userId) {
      return NextResponse.json(
        { error: "Authentication required. Please log in to purchase lifetime membership." },
        { status: 401 }
      );
    }

    // Check if user is already lifetime premium
    if (isSupabaseConfigured() && user) {
      const admin = getAdminClient();
      const { data: profile } = await admin
        .from("profiles")
        .select("is_premium")
        .eq("id", userId)
        .single();

      if (profile?.is_premium) {
        return NextResponse.json(
          { error: "You are already a Lifetime Premium member!" },
          { status: 400 }
        );
      }
    }

    const receipt = `mal_rcpt_${Date.now()}_${userId.slice(0, 6)}`;
    const razorpay = getRazorpayClient();

    let orderId: string;

    if (isRazorpayConfigured() && razorpay) {
      // Create real Razorpay order
      const order = await razorpay.orders.create({
        amount: LIFETIME_PRICE_PAISE, // 9900 paise = ₹99
        currency: "INR",
        receipt,
        notes: {
          user_id: userId,
          plan: "MissAlpha AI Lab Lifetime Premium",
          email: userEmail,
        },
      });
      orderId = order.id;
    } else {
      // Simulated / Demo Order when live API keys are not yet provided
      orderId = `order_test_${Date.now()}`;
    }

    // Log the created order into payments table
    if (isSupabaseConfigured() && user) {
      const admin = getAdminClient();
      await admin.from("payments").insert({
        user_id: userId,
        razorpay_order_id: orderId,
        amount: LIFETIME_PRICE_PAISE,
        currency: "INR",
        status: "created",
        receipt,
        customer_email: userEmail,
      });
    }

    return NextResponse.json({
      orderId,
      amount: LIFETIME_PRICE_PAISE,
      currency: "INR",
      keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_demo",
      isLiveConfigured: isRazorpayConfigured(),
      planName: "MissAlpha AI Lab Lifetime Premium",
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to create payment order";
    console.error("Order creation error:", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
