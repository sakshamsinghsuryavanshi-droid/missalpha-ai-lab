import React from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ArrowLeft, ShieldCheck } from "lucide-react";

export default function TermsPage() {
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
              <ShieldCheck className="w-4 h-4" /> Terms of Service
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white mt-1">
              Terms & Conditions
            </h1>
            <p className="text-xs text-gray-400 mt-1">
              Last updated: February 2025 • MissAlpha AI Lab
            </p>
          </div>

          <div className="glass-panel p-8 rounded-3xl border border-purple-500/20 text-sm text-gray-300 space-y-6 leading-relaxed">
            <section className="space-y-2">
              <h2 className="font-display font-bold text-lg text-white">
                1. Acceptance of Terms
              </h2>
              <p>
                By creating an account or purchasing access on <strong>MissAlpha AI Lab</strong> (the “Service”), you agree to be bound by these Terms of Service and all applicable laws and regulations.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-display font-bold text-lg text-white">
                2. Lifetime Premium Membership (₹99)
              </h2>
              <p>
                The <strong>MissAlpha AI Lab Lifetime Premium</strong> membership is granted upon a verified single one-time payment of <strong>₹99</strong> (9900 paise). This grant provides lifetime non-transferable personal learning access to all current and future curriculum courses published under this plan. There are no recurring monthly subscription charges.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-display font-bold text-lg text-white">
                3. Intellectual Property
              </h2>
              <p>
                All lesson materials, custom prompt templates, downloadable scripts, course videos, and branding are the exclusive intellectual property of MissAlpha AI Lab. Course materials are licensed for individual personal educational use and may not be resold, redistributed, or repackaged without prior written authorization.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-display font-bold text-lg text-white">
                4. Payment Processing & Verification
              </h2>
              <p>
                Payments are processed via Razorpay. Membership is unlocked strictly upon cryptographic server-side HMAC-SHA256 verification and captured settlement. Fraudulent chargebacks or charge tampering will result in immediate termination of the offending account.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-display font-bold text-lg text-white">
                5. Contact & Support
              </h2>
              <p>
                For assistance, please email our support team at <a href="mailto:support@missalpha.ai" className="text-cyan-400 hover:underline">support@missalpha.ai</a>.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
