import React from "react";
import { Brain, Target, Compass, Rocket, Award, Shield } from "lucide-react";

export default function AboutSection() {
  const pillars = [
    {
      icon: Brain,
      title: "Commercial-First AI Skills",
      desc: "We skip dry, obsolete academic theory to focus on high-impact tools and architectures that generate real revenue and automate business tasks.",
    },
    {
      icon: Target,
      title: "Built for Every Learner",
      desc: "Whether you are a college student, freelance creator, startup founder, or enterprise executive, our progressive curriculum scales with your ambition.",
    },
    {
      icon: Rocket,
      title: "Hands-on Practical Labs",
      desc: "Every course features real assignments: building automated scrapers, generating marketing collateral, coding custom agents, and training custom models.",
    },
    {
      icon: Compass,
      title: "Democratic & Accessible Pricing",
      desc: "Top-tier AI education shouldn't cost ₹50,000. Our mission is to make bleeding-edge AI literacy accessible to every student for just ₹99 lifetime.",
    },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-[#0A0D18]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-semibold text-purple-300">
              <Award className="w-3.5 h-3.5 text-purple-400" />
              ABOUT MISSALPHA AI LAB
            </div>

            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
              Bridging the Gap Between <br />
              <span className="gradient-text-purple">Bleeding-Edge AI</span> and Real Execution.
            </h2>

            <p className="text-gray-300 text-base leading-relaxed">
              At <strong>MissAlpha AI Lab</strong>, we believe the cognitive era creates unprecedented leverage for those who know how to command Artificial Intelligence.
            </p>

            <p className="text-gray-400 text-sm leading-relaxed">
              Most online courses charge thousands of rupees for superficial overviews. We designed MissAlpha AI Lab as an all-inclusive academy featuring 10 masterclasses, video tutorials, downloadable prompt repositories, real-world case studies, and certification for a single, fair fee of ₹99.
            </p>

            <div className="pt-2 flex items-center gap-4 text-xs font-semibold text-gray-300">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-cyan-400" />
                <span>Zero Subscription Lock-in</span>
              </div>
              <div className="flex items-center gap-2">
                <Rocket className="w-4 h-4 text-pink-400" />
                <span>Continuous Curriculum Updates</span>
              </div>
            </div>
          </div>

          {/* Right Cards Column */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {pillars.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="glass-panel p-6 rounded-2xl border border-purple-500/20 glass-panel-hover flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-900/40 border border-purple-500/30 flex items-center justify-center text-cyan-400">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-display font-bold text-lg text-white">
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
