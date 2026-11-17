import React from "react";
import { Bot, Sparkles, Terminal, Palette, Video, Mic, Workflow, Code2, ExternalLink } from "lucide-react";
import { POPULAR_AI_TOOLS } from "@/lib/data/initial-data";

const iconMap: Record<string, React.ElementType> = {
  Bot,
  Sparkles,
  Terminal,
  Palette,
  Video,
  Mic,
  Workflow,
  Code2,
};

export default function AIToolsShowcase() {
  return (
    <section id="ai-tools" className="py-24 relative overflow-hidden bg-[#070A14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-semibold text-indigo-300">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            COMPREHENSIVE TOOLKIT
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Master the World’s Leading <span className="gradient-text-neon">AI Tools</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            Don’t just learn abstract theory. We teach you production-tested workflows across the exact AI software powering modern tech companies and top creators.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {POPULAR_AI_TOOLS.map((tool, idx) => {
            const IconComponent = iconMap[tool.icon] || Sparkles;
            return (
              <div
                key={idx}
                className="glass-panel p-5 rounded-2xl border border-purple-500/20 glass-panel-hover flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-purple-950/60 border border-purple-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    {tool.badge && (
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-800/40">
                        {tool.badge}
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="font-display font-bold text-base text-white group-hover:text-cyan-300 transition-colors">
                      {tool.name}
                    </h3>
                    <span className="text-[11px] font-medium text-purple-400 uppercase tracking-wider block mt-0.5">
                      {tool.category}
                    </span>
                  </div>

                  <p className="text-xs text-gray-400 leading-relaxed">
                    {tool.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-gray-400 font-medium">
                    Best for: <strong className="text-gray-300">{tool.popularFor}</strong>
                  </span>
                  <a
                    href={tool.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-cyan-400 transition-colors"
                    aria-label={`Open ${tool.name}`}
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
