import React from "react";
import Link from "next/link";
import { Sparkles, Mail, ShieldCheck, Heart, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-800/80 bg-[#06080F] text-gray-400 pt-16 pb-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/60">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 via-indigo-600 to-cyan-400 p-0.5">
                <div className="w-full h-full bg-[#080B14] rounded-[10px] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <div className="font-display font-bold text-xl text-white">
                MissAlpha <span className="gradient-text-purple">AI Lab</span>
              </div>
            </Link>
            <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
              Empowering students, creators, and ambitious professionals with commercial, hands-on Artificial Intelligence mastery.
            </p>
            <p className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
              Tagline: Learn AI. Build Skills. Create the Future.
            </p>
            <div className="pt-2 flex items-center gap-4 text-xs text-gray-500">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <ShieldCheck className="w-4 h-4" /> 256-Bit SSL Encrypted
              </span>
              <span>•</span>
              <span>Razorpay Verified</span>
            </div>
          </div>

          {/* AI Courses */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              Curriculum
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/courses/ai-fundamentals" className="hover:text-white transition-colors">
                  AI Fundamentals
                </Link>
              </li>
              <li>
                <Link href="/courses/chatgpt-masterclass" className="hover:text-white transition-colors">
                  ChatGPT Masterclass
                </Link>
              </li>
              <li>
                <Link href="/courses/google-gemini-masterclass" className="hover:text-white transition-colors">
                  Google Gemini
                </Link>
              </li>
              <li>
                <Link href="/courses/prompt-engineering" className="hover:text-white transition-colors">
                  Prompt Engineering
                </Link>
              </li>
              <li>
                <Link href="/courses/ai-image-generation" className="hover:text-white transition-colors">
                  AI Image Generation
                </Link>
              </li>
              <li>
                <Link href="/courses/ai-video-generation" className="hover:text-white transition-colors">
                  AI Video Generation
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform & Membership */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              Membership
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/checkout" className="text-cyan-400 font-medium hover:underline flex items-center gap-1">
                  Lifetime Premium (₹99)
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-white transition-colors">
                  Course Catalog
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-white transition-colors">
                  Student Dashboard
                </Link>
              </li>
              <li>
                <Link href="/auth/login" className="hover:text-white transition-colors">
                  Student Login
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-purple-400 transition-colors">
                  Instructor Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              Legal & Support
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <a href="mailto:support@missalpha.ai" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-gray-400" />
                  support@missalpha.ai
                </a>
              </li>
              <li>
                <span className="text-xs text-gray-500 block pt-1">
                  Razorpay Merchant ID: MissAlpha AI Lab
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>
            © {new Date().getFullYear()} MissAlpha AI Lab. All rights reserved. Built for learners worldwide.
          </p>
          <p className="flex items-center gap-1">
            Engineered with <Heart className="w-3 h-3 text-pink-500 fill-pink-500" /> for the next generation of AI pioneers.
          </p>
        </div>
      </div>
    </footer>
  );
}
