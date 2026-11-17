import React from "react";
import Image from "next/image";
import { Star, MessageSquareQuote, ShieldAlert } from "lucide-react";
import { DEMO_TESTIMONIALS } from "@/lib/data/initial-data";

export default function TestimonialsSection() {
  return (
    <section className="py-24 relative overflow-hidden bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-semibold text-amber-300">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
            EARLY ADOPTER REVIEWS (DEMO CONTENT)
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Loved By Students, Creators & Pros
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            Read what early test cohort learners are saying about our ₹99 lifetime learning model.
            <span className="text-amber-400/80 block text-xs mt-1">
              * Note: The reviews below are clearly identified demo representations for demonstration until production cohort feedback is populated.
            </span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {DEMO_TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="glass-panel p-6 rounded-2xl border border-purple-500/20 glass-panel-hover flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                {/* Rating Stars */}
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                <p className="text-sm text-gray-300 italic leading-relaxed">
                  “{t.content}”
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden bg-purple-900 border border-purple-500/30">
                  <Image
                    src={t.avatar}
                    alt={t.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{t.name}</h4>
                  <p className="text-xs text-gray-400">{t.role}</p>
                  <span className="text-[10px] text-cyan-400 font-medium block">
                    {t.tag}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
