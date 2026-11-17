"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, ShieldCheck, Check, Zap, ArrowLeft, Lock, Award, HeartHandshake } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import RazorpayButton from "@/components/checkout/RazorpayButton";
import { createClient } from "@/lib/supabase/client";

export default function CheckoutPage() {
  const [user, setUser] = useState<{ email?: string; id?: string; name?: string } | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setUser({
          id: user.id,
          email: user.email,
          name: user.user_metadata?.full_name,
        });
      } else {
        const local = localStorage.getItem("missalpha_demo_user");
        if (local) {
          try {
            setUser(JSON.parse(local));
          } catch {
            // Ignore parse error
          }
        }
      }
    });
  }, []);

  const benefits = [
    "Full Lifetime Access to all 10 AI Masterclasses",
    "ChatGPT, Gemini 1.5, Claude 3.5 & Midjourney Guides",
    "50+ Production Prompt Repositories & Templates",
    "5 Practical Real-World End-to-End Projects",
    "Downloadable PDF Learning Materials & Resource Files",
    "Interactive Module Quizzes with Answer Explanations",
    "Automated Progress Tracking & Completion Analytics",
    "Verifiable Certificates of Completion with Cryptographic ID",
    "All Future Curriculum Updates Included at Zero Extra Cost",
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />

      <main className="flex-grow pt-28 pb-20 relative bg-grid-pattern">
        {/* Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/15 blur-[150px] rounded-full -z-10 pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Home
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Left Column: Plan Details & Benefits */}
            <div className="md:col-span-7 space-y-6">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-300">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  OFFICIAL CHECKOUT
                </div>
                <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                  MissAlpha AI Lab <br />
                  <span className="gradient-text-neon">Lifetime Premium</span>
                </h1>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Join hundreds of students, creators, and engineers mastering modern generative AI.
                </p>
              </div>

              {/* Crucial Banner Display Mandated by Master Prompt */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-950/60 to-indigo-950/60 border border-purple-500/30">
                <p className="text-sm font-bold text-white text-center">
                  “Pay ₹99 once. Get lifetime premium learning access. No recurring charges.”
                </p>
              </div>

              {/* Benefits Checklist */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-300">
                  Everything Unlocked With Your Membership:
                </h3>
                <ul className="space-y-2.5 text-xs sm:text-sm text-gray-300">
                  {benefits.map((b, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-cyan-950 border border-cyan-500/40 flex items-center justify-center shrink-0 mt-0.5 text-cyan-400">
                        <Check className="w-3 h-3" />
                      </div>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 flex items-center gap-6 text-xs text-gray-400">
                <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                  <ShieldCheck className="w-4 h-4" /> 100% Risk Free
                </span>
                <span>•</span>
                <span>Razorpay Encrypted</span>
                <span>•</span>
                <span>Instant Unlocking</span>
              </div>
            </div>

            {/* Right Column: Order Summary & Razorpay Trigger */}
            <div className="md:col-span-5">
              <div className="rounded-3xl glass-panel p-6 sm:p-8 border-2 border-purple-500/40 shadow-2xl backdrop-blur-2xl space-y-6 sticky top-28">
                <div>
                  <h3 className="font-display font-bold text-lg text-white">
                    Order Summary
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5">
                    MissAlpha AI Lab Direct Enrollment
                  </p>
                </div>

                <div className="space-y-3 border-t border-b border-slate-800/80 py-4 text-xs sm:text-sm">
                  <div className="flex items-center justify-between text-gray-300">
                    <span>Plan:</span>
                    <strong className="text-white text-right">Lifetime Premium</strong>
                  </div>
                  <div className="flex items-center justify-between text-gray-300">
                    <span>Access Duration:</span>
                    <span className="text-cyan-400 font-semibold">Lifetime Access</span>
                  </div>
                  <div className="flex items-center justify-between text-gray-300">
                    <span>Payment Type:</span>
                    <span className="text-gray-300">One-Time Payment</span>
                  </div>
                  <div className="flex items-center justify-between text-gray-300">
                    <span>Standard Value:</span>
                    <span className="line-through text-gray-500">₹2,999</span>
                  </div>
                  <div className="flex items-center justify-between text-gray-300 pt-2 border-t border-slate-800">
                    <span className="font-bold text-white text-base">Total Due Now:</span>
                    <span className="font-display font-extrabold text-2xl text-white">
                      ₹99
                    </span>
                  </div>
                </div>

                {/* User email note */}
                <div className="text-xs text-gray-400 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                  <span className="font-medium text-gray-300 block mb-0.5">Purchasing as:</span>
                  <span className="text-cyan-300 truncate block">
                    {user?.email || "Guest Student (will link upon login)"}
                  </span>
                </div>

                {/* Razorpay Checkout Trigger Button */}
                <RazorpayButton
                  buttonText="Pay ₹99 & Unlock Lifetime Access"
                  demoUserId={user?.id}
                  demoUserEmail={user?.email}
                />

                <div className="text-center text-[11px] text-gray-500 space-y-1">
                  <p>🔒 256-Bit SSL Encrypted Razorpay Gateway</p>
                  <p>Supports UPI (GPay, PhonePe, Paytm), Cards & NetBanking</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
