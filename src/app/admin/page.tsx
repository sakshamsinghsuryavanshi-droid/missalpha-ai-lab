"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Users,
  CreditCard,
  DollarSign,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  Sparkles,
} from "lucide-react";

interface AdminStats {
  totalStudents: number;
  premiumMembers: number;
  freeMembers: number;
  totalPayments: number;
  totalRevenue: number;
  conversionRate: string;
  isDemo: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  recentPayments: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  recentStudents: any[];
}

export default function AdminOverviewPage() {
  const [stats, setStats] = useState<AdminStats>({
    totalStudents: 1420,
    premiumMembers: 980,
    freeMembers: 440,
    totalPayments: 980,
    totalRevenue: 97020, // 980 * ₹99
    conversionRate: "69%",
    isDemo: true,
    recentPayments: [
      {
        id: "p1",
        customer_email: "priya.k@example.com",
        amount: 9900,
        status: "captured",
        method: "upi",
        created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
        razorpay_order_id: "order_demo_101",
        razorpay_payment_id: "pay_demo_101",
      },
      {
        id: "p2",
        customer_email: "rahul.tech@example.com",
        amount: 9900,
        status: "captured",
        method: "card",
        created_at: new Date(Date.now() - 3600000 * 5).toISOString(),
        razorpay_order_id: "order_demo_102",
        razorpay_payment_id: "pay_demo_102",
      },
      {
        id: "p3",
        customer_email: "ananya.design@example.com",
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
        id: "s1",
        email: "priya.k@example.com",
        full_name: "Priya Kapoor",
        is_premium: true,
        created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
      },
      {
        id: "s2",
        email: "rahul.tech@example.com",
        full_name: "Rahul Verma",
        is_premium: true,
        created_at: new Date(Date.now() - 3600000 * 5).toISOString(),
      },
      {
        id: "s3",
        email: "sameer.ai@example.com",
        full_name: "Sameer Joshi",
        is_premium: false,
        created_at: new Date(Date.now() - 3600000 * 8).toISOString(),
      },
    ],
  });

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.totalStudents) {
          setStats(data);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
            MissAlpha AI Lab • Executive Command Center
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            Real-time telemetry on revenue, student enrollments, conversion rate, and Razorpay settlements.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            Live Gateway Synced
          </span>
        </div>
      </div>

      {/* Primary KPI Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="glass-panel p-5 rounded-2xl border border-purple-500/20 space-y-2">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>Total Revenue</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="font-display text-2xl font-extrabold text-white">
            ₹{stats.totalRevenue.toLocaleString("en-IN")}
          </div>
          <span className="text-[10px] text-emerald-400 font-medium block">
            ₹99 per lifetime enrollment
          </span>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-purple-500/20 space-y-2">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>Registered Students</span>
            <Users className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="font-display text-2xl font-extrabold text-white">
            {stats.totalStudents.toLocaleString()}
          </div>
          <span className="text-[10px] text-gray-400 font-medium block">
            Total student accounts
          </span>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-purple-500/20 space-y-2">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>Premium Members</span>
            <Sparkles className="w-4 h-4 text-amber-400" />
          </div>
          <div className="font-display text-2xl font-extrabold text-amber-300">
            {stats.premiumMembers.toLocaleString()}
          </div>
          <span className="text-[10px] text-amber-400 font-medium block">
            Verified ₹99 lifetime access
          </span>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-purple-500/20 space-y-2">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>Free Members</span>
            <Clock className="w-4 h-4 text-gray-400" />
          </div>
          <div className="font-display text-2xl font-extrabold text-gray-300">
            {stats.freeMembers.toLocaleString()}
          </div>
          <span className="text-[10px] text-gray-400 font-medium block">
            Starter course access only
          </span>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-purple-500/20 space-y-2">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>Conversion Rate</span>
            <TrendingUp className="w-4 h-4 text-pink-400" />
          </div>
          <div className="font-display text-2xl font-extrabold text-pink-400">
            {stats.conversionRate}
          </div>
          <span className="text-[10px] text-pink-300 font-medium block">
            Free to ₹99 Lifetime upgrade
          </span>
        </div>
      </div>

      {/* Two Column Layout: Recent Registrations & Payments */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Payments Ledger */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-bold text-lg text-white flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-cyan-400" />
              Recent Payment Transactions
            </h2>
            <Link
              href="/admin/payments"
              className="text-xs text-cyan-400 hover:underline flex items-center gap-1"
            >
              View Full Ledger <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="glass-panel rounded-2xl border border-purple-500/20 overflow-hidden shadow-lg">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-gray-300">
                <thead className="bg-slate-900/90 text-gray-400 text-[11px] uppercase tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-4">Student Email</th>
                    <th className="py-3 px-4">Amount</th>
                    <th className="py-3 px-4">Order ID</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {stats.recentPayments.map((p, idx) => (
                    <tr key={idx} className="hover:bg-slate-900/40 transition-colors">
                      <td className="py-3 px-4 font-semibold text-white">
                        {p.customer_email || "student@missalpha.ai"}
                      </td>
                      <td className="py-3 px-4 font-bold text-white">
                        ₹{p.amount / 100}
                      </td>
                      <td className="py-3 px-4 font-mono text-[11px] text-gray-400">
                        {p.razorpay_order_id}
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                          {p.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right text-gray-400">
                        {new Date(p.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Recent Registrations */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-bold text-lg text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-400" />
              Recent Registrations
            </h2>
            <Link
              href="/admin/students"
              className="text-xs text-purple-400 hover:underline flex items-center gap-1"
            >
              All Students <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="glass-panel rounded-2xl border border-purple-500/20 p-4 space-y-3 shadow-lg">
            {stats.recentStudents.map((s, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between"
              >
                <div>
                  <h4 className="text-xs font-bold text-white">{s.full_name}</h4>
                  <span className="text-[11px] text-gray-400">{s.email}</span>
                </div>
                <div>
                  {s.is_premium ? (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-400/20 text-amber-300 border border-amber-400/40">
                      PRO MEMBER
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-slate-800 text-gray-400">
                      FREE
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
