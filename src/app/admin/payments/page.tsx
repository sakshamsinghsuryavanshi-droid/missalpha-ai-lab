"use client";

import React, { useState } from "react";
import { CreditCard, Search, CheckCircle2, AlertCircle, ArrowDownUp, ShieldCheck } from "lucide-react";
import { PaymentRecord } from "@/types";

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState<PaymentRecord[]>([
    {
      id: "pay_101",
      user_id: "usr_101",
      customer_email: "aarav.sharma@example.com",
      razorpay_order_id: "order_Qz9810a0129",
      razorpay_payment_id: "pay_Qz9810b8923",
      razorpay_signature: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
      amount: 9900,
      currency: "INR",
      status: "captured",
      method: "upi",
      receipt: "mal_rcpt_101",
      created_at: "2025-02-14T09:35:00Z",
    },
    {
      id: "pay_102",
      user_id: "usr_102",
      customer_email: "priya.kapoor@example.com",
      razorpay_order_id: "order_Qz9810a0130",
      razorpay_payment_id: "pay_Qz9810b8924",
      razorpay_signature: "a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e",
      amount: 9900,
      currency: "INR",
      status: "captured",
      method: "card",
      receipt: "mal_rcpt_102",
      created_at: "2025-02-15T11:50:00Z",
    },
    {
      id: "pay_103",
      user_id: "usr_103",
      customer_email: "ananya.sen@example.com",
      razorpay_order_id: "order_Qz9810a0131",
      razorpay_payment_id: "pay_Qz9810b8925",
      razorpay_signature: "2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae",
      amount: 9900,
      currency: "INR",
      status: "captured",
      method: "upi",
      receipt: "mal_rcpt_103",
      created_at: "2025-02-16T16:15:00Z",
    },
    {
      id: "pay_104",
      user_id: "usr_104",
      customer_email: "failed.user@example.com",
      razorpay_order_id: "order_Qz9810a0132",
      razorpay_payment_id: "pay_Qz9810b8926",
      amount: 9900,
      currency: "INR",
      status: "failed",
      method: "upi",
      receipt: "mal_rcpt_104",
      created_at: "2025-02-16T18:20:00Z",
    },
  ]);

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "captured" | "failed">("all");

  const filtered = payments.filter((p) => {
    const matchesSearch =
      (p.customer_email?.toLowerCase() || "").includes(search.toLowerCase()) ||
      p.razorpay_order_id.toLowerCase().includes(search.toLowerCase()) ||
      (p.razorpay_payment_id?.toLowerCase() || "").includes(search.toLowerCase());
    const matchesStatus = filterStatus === "all" || p.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
            <CreditCard className="w-7 h-7 text-emerald-400" />
            Razorpay Payment Ledger & Audit
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            Auditable database of all order authorizations, captured settlements, HMAC signatures, and failed payment attempts.
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by student email, order ID or payment ID..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilterStatus("all")}
            className={`px-3 py-2 rounded-xl text-xs font-semibold ${
              filterStatus === "all" ? "bg-purple-600 text-white" : "bg-slate-900 text-gray-400"
            }`}
          >
            All ({payments.length})
          </button>
          <button
            onClick={() => setFilterStatus("captured")}
            className={`px-3 py-2 rounded-xl text-xs font-semibold ${
              filterStatus === "captured" ? "bg-emerald-600 text-white" : "bg-slate-900 text-gray-400"
            }`}
          >
            Captured (3)
          </button>
          <button
            onClick={() => setFilterStatus("failed")}
            className={`px-3 py-2 rounded-xl text-xs font-semibold ${
              filterStatus === "failed" ? "bg-rose-600 text-white" : "bg-slate-900 text-gray-400"
            }`}
          >
            Failed (1)
          </button>
        </div>
      </div>

      <div className="glass-panel rounded-2xl border border-purple-500/20 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-300">
            <thead className="bg-slate-900/90 text-gray-400 text-[11px] uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Student</th>
                <th className="py-3.5 px-4">Amount</th>
                <th className="py-3.5 px-4">Razorpay Order ID</th>
                <th className="py-3.5 px-4">Payment ID</th>
                <th className="py-3.5 px-4">Method</th>
                <th className="py-3.5 px-4">HMAC Signature</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-slate-900/40 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-white">
                    {p.customer_email}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-white">
                    ₹{p.amount / 100}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[11px] text-gray-400">
                    {p.razorpay_order_id}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[11px] text-cyan-300">
                    {p.razorpay_payment_id || "-"}
                  </td>
                  <td className="py-3.5 px-4 uppercase text-[10px] font-bold text-gray-400">
                    {p.method || "UPI"}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[10px] text-gray-500 max-w-[120px] truncate" title={p.razorpay_signature}>
                    {p.razorpay_signature ? `${p.razorpay_signature.slice(0, 16)}...` : "None"}
                  </td>
                  <td className="py-3.5 px-4">
                    {p.status === "captured" ? (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1 w-fit">
                        <CheckCircle2 className="w-3 h-3" /> CAPTURED
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-rose-500/10 text-rose-400 border border-rose-500/30 flex items-center gap-1 w-fit">
                        <AlertCircle className="w-3 h-3" /> FAILED
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-right text-gray-400 text-[11px]">
                    {new Date(p.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
