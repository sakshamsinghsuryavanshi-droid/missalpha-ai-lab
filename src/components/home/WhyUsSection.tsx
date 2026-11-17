import React from "react";
import { Check, X, Sparkles, Zap, Shield, HelpCircle } from "lucide-react";

export default function WhyUsSection() {
  const comparison = [
    {
      feature: "Price & Model",
      missAlpha: "₹99 one-time payment for lifetime access",
      others: "₹2,999 to ₹49,999 or recurring monthly subscriptions",
      highlight: true,
    },
    {
      feature: "Course Breadth",
      missAlpha: "10 Complete masterclasses (Fundamentals to Agentic Ops)",
      others: "Usually 1 narrow topic sold separately",
      highlight: false,
    },
    {
      feature: "Practical Assignments",
      missAlpha: "Hands-on projects, custom prompt repos, code sandboxes",
      others: "Passive slide decks and outdated recorded webinars",
      highlight: false,
    },
    {
      feature: "Multi-Model Mastery",
      missAlpha: "ChatGPT, Gemini 1.5, Claude 3.5, Midjourney, Flux, Runway",
      others: "Locked to one tool only (e.g. basic ChatGPT text)",
      highlight: false,
    },
    {
      feature: "Certificates of Completion",
      missAlpha: "Verifiable certificates with unique verification IDs included",
      others: "Often locked behind extra examination fees",
      highlight: false,
    },
    {
      feature: "Future Curriculum Updates",
      missAlpha: "All future course updates included free for lifetime members",
      others: "Pay again for every new version or model release",
      highlight: true,
    },
  ];

  return (
    <section id="why-us" className="py-24 relative overflow-hidden bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-semibold text-purple-300">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            THE UNFAIR ADVANTAGE
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Why Learn With <span className="gradient-text-purple">MissAlpha AI Lab?</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            See how our accessible, high-yield learning model compares to traditional overpriced online academies.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="max-w-4xl mx-auto rounded-2xl glass-panel border border-purple-500/20 overflow-hidden shadow-2xl">
          <div className="grid grid-cols-12 bg-slate-900/80 p-4 sm:p-5 border-b border-slate-800 text-xs sm:text-sm font-bold tracking-wider uppercase text-gray-300">
            <div className="col-span-4 sm:col-span-4 text-gray-400">Feature</div>
            <div className="col-span-4 sm:col-span-4 text-cyan-400 flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-cyan-400 fill-cyan-400" />
              MissAlpha AI Lab
            </div>
            <div className="col-span-4 sm:col-span-4 text-gray-500">Other Courses</div>
          </div>

          <div className="divide-y divide-slate-800/60">
            {comparison.map((row, idx) => (
              <div
                key={idx}
                className={`grid grid-cols-12 p-4 sm:p-5 items-center text-xs sm:text-sm transition-colors ${
                  row.highlight ? "bg-purple-950/20" : "hover:bg-slate-900/40"
                }`}
              >
                <div className="col-span-4 sm:col-span-4 font-semibold text-white">
                  {row.feature}
                </div>
                <div className="col-span-4 sm:col-span-4 text-gray-200 flex items-start gap-2">
                  <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span className="font-medium text-cyan-200">{row.missAlpha}</span>
                </div>
                <div className="col-span-4 sm:col-span-4 text-gray-500 flex items-start gap-2">
                  <X className="w-4 h-4 text-rose-500/80 shrink-0 mt-0.5" />
                  <span>{row.others}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
