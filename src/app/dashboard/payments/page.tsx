"use client";

import React, { useState, useEffect } from "react";
import { CreditCard, CheckCircle2, ShieldCheck, Download, ExternalLink, AlertCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { PaymentRecord } from "@/types";

export default function PaymentsHistoryPage() {
  const [payments, setPayments] = useState<PaymentRecord[]>([
    {
      id: "pay_1",
      user_id: "usr_1",
      razorpay_order_id: "order_demo_101",
      razorpay_payment_id: "pay_demo_101",
      amount: 9900, // ₹99
      currency: "INR",
      status: "captured",
      method: "upi",
      receipt: "mal_rcpt_1739812",
      created_at: new Date().toISOString(),
    },
  ]);
  const [selectedReceipt, setSelectedReceipt] = useState<PaymentRecord | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        supabase
          .from("payments")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .then(({ data }) => {
            if (data && data.length > 0) {
              setPayments(data);
            }
          });
      }
    });
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
          <CreditCard className="w-7 h-7 text-cyan-400" />
          Payment Transactions & Invoices
        </h1>
        <p className="text-xs sm:text-sm text-gray-400 mt-1">
          Complete ledger of your MissAlpha AI Lab membership transactions processed securely via Razorpay.
        </p>
      </div>

      <div className="glass-panel rounded-2xl border border-purple-500/20 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm text-gray-300">
            <thead className="bg-slate-900/90 text-gray-400 uppercase tracking-wider text-[11px] border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Plan / Description</th>
                <th className="py-3.5 px-4">Order ID</th>
                <th className="py-3.5 px-4">Payment ID</th>
                <th className="py-3.5 px-4">Amount</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4 text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {payments.map((p) => (
                <tr key={p.id} className="hover:bg-slate-900/40 transition-colors">
                  <td className="py-4 px-4 font-semibold text-white">
                    MissAlpha AI Lab Lifetime Premium
                  </td>
                  <td className="py-4 px-4 font-mono text-xs text-gray-400">
                    {p.razorpay_order_id}
                  </td>
                  <td className="py-4 px-4 font-mono text-xs text-cyan-300">
                    {p.razorpay_payment_id || "-"}
                  </td>
                  <td className="py-4 px-4 font-bold text-white">
                    ₹{p.amount / 100}
                  </td>
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      <CheckCircle2 className="w-3 h-3" /> {p.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-xs text-gray-400">
                    {new Date(p.created_at).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-4 text-right">
                    <button
                      onClick={() => setSelectedReceipt(p)}
                      className="px-3 py-1 rounded-lg bg-purple-600/30 hover:bg-purple-600 text-purple-200 text-xs font-semibold border border-purple-500/30 transition-colors"
                    >
                      View Receipt
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Receipt Modal */}
      {selectedReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#0B0F19] border-2 border-purple-500/50 rounded-3xl max-w-md w-full p-6 space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-display font-bold text-base text-white">
                Official Payment Receipt
              </h3>
              <button
                onClick={() => setSelectedReceipt(null)}
                className="text-gray-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="flex justify-between items-center bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                <span className="text-gray-400">Merchant Name:</span>
                <strong className="text-white">MissAlpha AI Lab</strong>
              </div>
              <div className="flex justify-between items-center bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                <span className="text-gray-400">Plan Purchased:</span>
                <span className="text-cyan-300 font-semibold">Lifetime Premium Pass</span>
              </div>
              <div className="flex justify-between items-center bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                <span className="text-gray-400">Amount Paid:</span>
                <span className="text-white font-extrabold text-base">₹{selectedReceipt.amount / 100}.00</span>
              </div>
              <div className="flex justify-between items-center bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                <span className="text-gray-400">Payment Gateway:</span>
                <span className="text-gray-200">Razorpay Encrypted</span>
              </div>
              <div className="flex justify-between items-center bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                <span className="text-gray-400">Transaction ID:</span>
                <code className="text-cyan-400 font-mono">{selectedReceipt.razorpay_payment_id}</code>
              </div>
              <div className="flex justify-between items-center bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                <span className="text-gray-400">Status:</span>
                <span className="text-emerald-400 font-bold uppercase">CAPTURED (SUCCESS)</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedReceipt(null)}
              className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition-colors"
            >
              Close Receipt
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
