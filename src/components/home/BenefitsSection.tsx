import React from "react";
import { Video, FileText, Download, CheckSquare, Trophy, ShieldAlert, Cpu, Sparkles } from "lucide-react";

export default function BenefitsSection() {
  const benefits = [
    {
      icon: Video,
      title: "HD Video Lessons",
      description: "Bite-sized, step-by-step video tutorials showing live UI demonstrations, prompt executions, and software setup.",
    },
    {
      icon: FileText,
      title: "In-Depth Text Guides",
      description: "Thorough written breakdowns, code snippets, cheat sheets, and conceptual diagrams for fast referencing.",
    },
    {
      icon: Download,
      title: "Downloadable Resources",
      description: "Instant access to curated prompt libraries, CSV datasets, automation JSON templates, and PDF guides.",
    },
    {
      icon: CheckSquare,
      title: "Interactive Quizzes",
      description: "Knowledge check modules with instant feedback and answer explanations to reinforce your retention.",
    },
    {
      icon: Cpu,
      title: "Practical Assignments",
      description: "Solve real-world challenges: audit contracts, generate marketing funnels, and build intelligent bots.",
    },
    {
      icon: Trophy,
      title: "Verifiable Certificates",
      description: "Earn official MissAlpha AI Lab course certificates featuring your full name and unique cryptographic ID.",
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-[#0A0D18]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-300">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            END-TO-END PEDAGOGY
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Built For Serious <span className="gradient-text-neon">Skill Acquisition</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            Every feature on our learning platform is engineered to maximize practical capability, retention, and tangible career outcomes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, idx) => {
            const Icon = benefit.icon;
            return (
              <div
                key={idx}
                className="glass-panel p-6 rounded-2xl border border-purple-500/20 glass-panel-hover space-y-4 group"
              >
                <div className="w-12 h-12 rounded-xl bg-purple-950/60 border border-purple-500/30 flex items-center justify-center text-cyan-400 group-hover:bg-gradient-to-tr group-hover:from-purple-600 group-hover:to-cyan-400 group-hover:text-slate-950 transition-all duration-300">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-lg text-white">
                  {benefit.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
