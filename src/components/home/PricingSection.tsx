"use client";

import React from "react";
import Link from "next/link";
import { Check, Zap, Sparkles, ShieldCheck, ArrowRight, Lock, Award } from "lucide-react";

export default function PricingSection() {
  const perks = [
    "Full Lifetime Access to all 10 AI Masterclasses",
    "50+ AI Tools Workflows (ChatGPT, Gemini, Midjourney, Claude)",
    "Comprehensive Prompt Engineering Repositories & Templates",
    "Real-World Hands-On Practical AI Projects",
    "Downloadable PDF Guides, Code Snippets & CSV Datasets",
    "Interactive Module Quizzes with Instant Explanations",
    "Course Completion Tracking & Progress Analytics",
    "Verifiable MissAlpha AI Lab Certificates of Completion",
    "All Future Curriculum Updates Included at No Extra Cost",
  ];

  return (
    <section id="pricing" className="py-24 relative overflow-hidden bg-[#070A14]">
      {/* Background Neon Accent Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/15 blur-[120px] rounded-full -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-300">
            <Zap className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400" />
            TRANSPARENT, ONE-TIME PRICING
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            One Single Investment. <br />
            <span className="gradient-text-neon">Lifetime Unrestricted Access.</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto">
            No recurring monthly charges. No hidden upgrade tiers. Learn at your own pace forever.
          </p>
        </div>

        {/* Pricing Card */}
        <div className="max-w-xl mx-auto">
          <div className="relative rounded-3xl glass-panel p-8 sm:p-10 border-2 border-purple-500/40 shadow-2xl shadow-purple-950/50 backdrop-blur-2xl">
            {/* Top Pill */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 text-slate-950 text-xs font-extrabold uppercase tracking-wider shadow-lg flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              LIFETIME PASS SPECIAL
            </div>

            <div className="space-y-6 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-slate-800/80 pb-6">
                <div>
                  <h3 className="font-display font-extrabold text-2xl text-white">
                    MissAlpha AI Lab Lifetime Premium
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">
                    Complete all-access membership for ambitious learners
                  </p>
                </div>
                <div className="text-center sm:text-right">
                  <div className="flex items-baseline justify-center sm:justify-end gap-1">
                    <span className="text-gray-500 text-lg line-through">₹2,999</span>
                    <span className="font-display text-4xl sm:text-5xl font-extrabold text-white">
                      ₹99
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold text-cyan-400 uppercase tracking-wider">
                    One-Time Payment
                  </span>
                </div>
              </div>

              {/* Crucial Banner Mandated in Requirements */}
              <div className="p-3.5 rounded-xl bg-purple-950/40 border border-purple-500/30 text-center">
                <p className="text-xs sm:text-sm font-semibold text-purple-200">
                  “Pay ₹99 once. Get lifetime premium learning access. No recurring charges.”
                </p>
              </div>

              {/* Benefits Checklist */}
              <div className="space-y-3 pt-2">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-300">
                  What is included in your lifetime pass:
                </p>
                <ul className="space-y-2.5 text-xs sm:text-sm text-gray-300">
                  {perks.map((perk, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-cyan-950 border border-cyan-500/40 flex items-center justify-center shrink-0 mt-0.5 text-cyan-400">
                        <Check className="w-3 h-3" />
                      </div>
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Button */}
              <div className="pt-4 space-y-3">
                <Link
                  href="/checkout"
                  className="w-full py-4 rounded-xl text-base font-extrabold text-slate-950 bg-gradient-to-r from-cyan-400 via-purple-300 to-pink-400 hover:shadow-cyan-500/30 shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group hover:scale-[1.01]"
                >
                  <Zap className="w-5 h-5 fill-slate-950 text-slate-950" />
                  <span>Buy Lifetime Access (₹99)</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>

                <div className="flex items-center justify-center gap-4 text-xs text-gray-400">
                  <span className="flex items-center gap-1 text-emerald-400">
                    <ShieldCheck className="w-4 h-4" /> 100% Safe Checkout
                  </span>
                  <span>•</span>
                  <span>UPI, Cards, NetBanking</span>
                  <span>•</span>
                  <span>Instant Activation</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
