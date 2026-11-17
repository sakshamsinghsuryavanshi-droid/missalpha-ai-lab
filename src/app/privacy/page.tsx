import React from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ArrowLeft, ShieldCheck } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />

      <main className="flex-grow pt-28 pb-20 relative bg-grid-pattern">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-white transition-colors mb-4"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Home
            </Link>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400">
              <ShieldCheck className="w-4 h-4" /> Legal & Compliance
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white mt-1">
              Privacy Policy
            </h1>
            <p className="text-xs text-gray-400 mt-1">
              Last updated: February 2025 • MissAlpha AI Lab
            </p>
          </div>

          <div className="glass-panel p-8 rounded-3xl border border-purple-500/20 text-sm text-gray-300 space-y-6 leading-relaxed">
            <section className="space-y-2">
              <h2 className="font-display font-bold text-lg text-white">
                1. Information We Collect
              </h2>
              <p>
                When you create an account on <strong>MissAlpha AI Lab</strong> or purchase our ₹99 Lifetime Premium membership, we collect your full name, email address, password hash (via Supabase Auth), and payment transaction metadata (Order ID, Payment ID, settlement status) provided securely by Razorpay.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-display font-bold text-lg text-white">
                2. Payment Security & Credentials
              </h2>
              <p>
                We never store, log, or have access to your full debit/credit card numbers, CVVs, or net banking passwords. All monetary transactions are processed directly by <strong>Razorpay</strong> under PCI-DSS Level 1 compliance.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-display font-bold text-lg text-white">
                3. How We Use Your Data
              </h2>
              <p>
                Your personal details are used solely to deliver educational content, track course progression, generate verified certificates of completion, verify lifetime access entitlements, and provide technical customer support. We do not sell or rent your personal information to third-party advertisers.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-display font-bold text-lg text-white">
                4. Contact & Inquiries
              </h2>
              <p>
                For privacy inquiries or account data deletion requests, contact us at <a href="mailto:support@missalpha.ai" className="text-cyan-400 hover:underline">support@missalpha.ai</a>.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
