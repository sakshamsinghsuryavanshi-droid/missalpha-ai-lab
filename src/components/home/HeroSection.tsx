import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, ShieldCheck, Zap, PlayCircle, Users, Award, CheckCircle2 } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden bg-grid-pattern">
      {/* Background Radial Glow Accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] md:w-[900px] md:h-[500px] bg-gradient-to-tr from-brand-600/25 via-indigo-600/20 to-cyan-500/20 blur-[130px] rounded-full -z-10 pointer-events-none" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-cyan-500/10 blur-[100px] rounded-full -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto space-y-8">
          {/* Top Banner Tag */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-purple-500/30 text-xs sm:text-sm font-medium text-purple-200 shadow-lg shadow-purple-900/20 animate-float">
            <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-cyan-400 font-bold">LIFETIME ACCESS OFFER</span>
            <span className="text-gray-400">•</span>
            <span>Only ₹99 One-Time (No Subscriptions)</span>
            <Zap className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          </div>

          {/* Main Brand & Headline */}
          <div className="space-y-4">
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
              Learn AI. Build Skills. <br />
              <span className="gradient-text-neon">Create the Future.</span>
            </h1>
            <p className="font-display text-xl sm:text-2xl font-semibold text-brand-300">
              MissAlpha AI Lab
            </p>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              The premier hands-on AI education academy for students, creators, and professionals. 
              Master Prompt Engineering, ChatGPT, Gemini, AI Image & Video, Automation, and Real-world Projects.
            </p>
          </div>

          {/* Value Props Bullet Pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-gray-300">
            <span className="flex items-center gap-1.5 bg-slate-900/60 px-3 py-1.5 rounded-lg border border-slate-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 10 Structured Courses
            </span>
            <span className="flex items-center gap-1.5 bg-slate-900/60 px-3 py-1.5 rounded-lg border border-slate-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Practical Assignments & Quizzes
            </span>
            <span className="flex items-center gap-1.5 bg-slate-900/60 px-3 py-1.5 rounded-lg border border-slate-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Verifiable Certificates
            </span>
            <span className="flex items-center gap-1.5 bg-slate-900/60 px-3 py-1.5 rounded-lg border border-slate-800">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" /> Razorpay Verified
            </span>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/checkout"
              className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-bold text-slate-950 bg-gradient-to-r from-cyan-400 via-purple-300 to-pink-400 hover:shadow-cyan-500/25 shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group hover:scale-[1.02]"
            >
              <Zap className="w-5 h-5 fill-slate-950 text-slate-950" />
              <span>Get Lifetime Premium for ₹99</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/courses"
              className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-semibold text-white glass-panel hover:bg-slate-800/80 transition-all duration-200 flex items-center justify-center gap-2 border border-purple-500/30"
            >
              <PlayCircle className="w-5 h-5 text-purple-400" />
              <span>Explore All Courses</span>
            </Link>
          </div>

          {/* Pricing Highlight Tagline */}
          <p className="text-xs sm:text-sm text-gray-400 font-medium">
            🔒 Pay ₹99 once. Get lifetime premium learning access. No recurring charges.
          </p>

          {/* Floating Metric Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-10 max-w-4xl mx-auto">
            <div className="glass-panel p-4 rounded-2xl border border-purple-500/20 text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-display">10+</div>
              <div className="text-xs text-gray-400 mt-1">Premium AI Courses</div>
            </div>
            <div className="glass-panel p-4 rounded-2xl border border-purple-500/20 text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400 font-display">50+</div>
              <div className="text-xs text-gray-400 mt-1">AI Tools & Workflows</div>
            </div>
            <div className="glass-panel p-4 rounded-2xl border border-purple-500/20 text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-purple-400 font-display">₹99</div>
              <div className="text-xs text-gray-400 mt-1">One-Time Lifetime Price</div>
            </div>
            <div className="glass-panel p-4 rounded-2xl border border-purple-500/20 text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-display">100%</div>
              <div className="text-xs text-gray-400 mt-1">Certified Completion</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
