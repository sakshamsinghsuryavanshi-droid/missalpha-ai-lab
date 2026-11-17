import { NextResponse } from "next/server";
import { createClientServer } from "@/lib/supabase/server";
import { getAdminClient, isSupabaseConfigured, isAdminUser } from "@/lib/supabase/admin";

export async function GET() {
  try {
    const supabase = createClientServer();
    const { data: { user } } = await supabase.auth.getUser();

    // Check if user is admin
    if (!isAdminUser(user?.email)) {
      // Return safe mock metrics if requested without active admin login or in demo mode
      return NextResponse.json({
        totalStudents: 1420,
        premiumMembers: 980,
        freeMembers: 440,
        totalPayments: 980,
        totalRevenue: 97020, // 980 * ₹99
        conversionRate: "69%",
        isDemo: true,
        recentPayments: [
          {
            id: "pay_demo_1",
            user_email: "priya.k@example.com",
            amount: 9900,
            status: "captured",
            method: "upi",
            created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
            razorpay_order_id: "order_demo_101",
            razorpay_payment_id: "pay_demo_101",
          },
          {
            id: "pay_demo_2",
            user_email: "rahul.tech@example.com",
            amount: 9900,
            status: "captured",
            method: "card",
            created_at: new Date(Date.now() - 3600000 * 5).toISOString(),
            razorpay_order_id: "order_demo_102",
            razorpay_payment_id: "pay_demo_102",
          },
          {
            id: "pay_demo_3",
            user_email: "ananya.design@example.com",
            amount: 9900,
            status: "captured",
            method: "upi",
            created_at: new Date(Date.now() - 3600000 * 12).toISOString(),
            razorpay_order_id: "order_demo_103",
            razorpay_payment_id: "pay_demo_103",
          },
        ],
        recentStudents: [
          {
            id: "stu_1",
            email: "priya.k@example.com",
            full_name: "Priya Kapoor",
            is_premium: true,
            created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
          },
          {
            id: "stu_2",
            email: "rahul.tech@example.com",
            full_name: "Rahul Verma",
            is_premium: true,
            created_at: new Date(Date.now() - 3600000 * 5).toISOString(),
          },
          {
            id: "stu_3",
            email: "sameer.ai@example.com",
            full_name: "Sameer Joshi",
            is_premium: false,
            created_at: new Date(Date.now() - 3600000 * 8).toISOString(),
          },
        ],
      });
    }

    if (isSupabaseConfigured()) {
      const admin = getAdminClient();

      const { count: totalStudents } = await admin.from("profiles").select("*", { count: "exact", head: true });
      const { count: premiumMembers } = await admin.from("profiles").select("*", { count: "exact", head: true }).eq("is_premium", true);
      const { data: capturedPayments } = await admin.from("payments").select("amount").eq("status", "captured");

      const totalRevenuePaise = capturedPayments?.reduce((acc, curr) => acc + (curr.amount || 0), 0) || 0;
      const totalRevenue = Math.round(totalRevenuePaise / 100);

      const { data: recentPayments } = await admin.from("payments").select("*").order("created_at", { ascending: false }).limit(10);
      const { data: recentStudents } = await admin.from("profiles").select("*").order("created_at", { ascending: false }).limit(10);

      const freeMembers = (totalStudents || 0) - (premiumMembers || 0);
      const conversionRate = totalStudents && totalStudents > 0
        ? `${Math.round(((premiumMembers || 0) / totalStudents) * 100)}%`
        : "0%";

      return NextResponse.json({
        totalStudents: totalStudents || 0,
        premiumMembers: premiumMembers || 0,
        freeMembers: Math.max(0, freeMembers),
        totalPayments: capturedPayments?.length || 0,
        totalRevenue,
        conversionRate,
        isDemo: false,
        recentPayments: recentPayments || [],
        recentStudents: recentStudents || [],
      });
    }

    return NextResponse.json({
      totalStudents: 1420,
      premiumMembers: 980,
      freeMembers: 440,
      totalPayments: 980,
      totalRevenue: 97020,
      conversionRate: "69%",
      isDemo: true,
      recentPayments: [],
      recentStudents: [],
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to load admin stats";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
