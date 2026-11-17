"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Sparkles, Clock, BookOpen, Lock, ArrowRight, Zap } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { INITIAL_COURSES } from "@/lib/data/initial-data";

export default function PublicCoursesPage() {
  const [courses] = useState(INITIAL_COURSES);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = [
    "All",
    "Foundations",
    "Generative AI",
    "Engineering",
    "Creative AI",
    "Productivity & Ops",
    "Business & Marketing",
    "Hands-on Projects",
  ];

  const filtered = courses.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || c.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />

      <main className="flex-grow pt-28 pb-20 relative bg-grid-pattern">
        {/* Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-purple-600/15 blur-[150px] rounded-full -z-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-300">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              10 STRUCTURED AI MASTERCLASSES
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
              Master the Future of <span className="gradient-text-neon">Artificial Intelligence</span>
            </h1>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
              Explore our full curriculum. Gain practical skills across Prompt Engineering, ChatGPT, Gemini, Midjourney, AI Video, Automation, and Real-world Projects for just ₹99 lifetime.
            </p>
          </div>

          {/* Search & Category Filter */}
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search courses by keyword (e.g. Prompt, ChatGPT, Video)..."
                className="w-full pl-12 pr-4 py-3.5 bg-slate-900/90 border border-slate-700 rounded-2xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 shadow-xl"
              />
            </div>

            <div className="flex items-center justify-center gap-2 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors border ${
                    category === cat
                      ? "bg-purple-600 border-purple-500 text-white shadow-md shadow-purple-500/30"
                      : "bg-slate-900/60 border-slate-800 text-gray-400 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((course) => (
              <div
                key={course.id}
                className="glass-panel rounded-2xl overflow-hidden border border-purple-500/20 glass-panel-hover flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-48 w-full bg-slate-900">
                    <Image
                      src={course.thumbnail_url}
                      alt={course.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080B14] via-transparent to-black/30" />
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      {course.badge_text && (
                        <span className="px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase bg-purple-600 text-white shadow-md">
                          {course.badge_text}
                        </span>
                      )}
                      {course.is_premium ? (
                        <span className="px-2 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase bg-amber-500/90 text-slate-950 flex items-center gap-1 shadow-md">
                          <Lock className="w-3 h-3" /> PREMIUM
                        </span>
                      ) : (
                        <span className="px-2 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase bg-emerald-500 text-white shadow-md">
                          FREE
                        </span>
                      )}
                    </div>
                    <div className="absolute bottom-3 right-3 text-xs text-gray-300 bg-black/60 px-2 py-0.5 rounded backdrop-blur-md">
                      {course.duration}
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-purple-400">
                      {course.category} • {course.level}
                    </span>
                    <h3 className="font-display font-bold text-lg text-white group-hover:text-cyan-300 transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-xs text-gray-400 line-clamp-3 leading-relaxed">
                      {course.description}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 flex items-center justify-between border-t border-slate-800/80 mt-4">
                  <div className="text-xs text-gray-400 flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-brand-400" />
                    <span>{course.lessons_count || 14} Lessons</span>
                  </div>

                  <Link
                    href={`/courses/${course.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 group-hover:text-cyan-300"
                  >
                    <span>View Syllabus</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Upgrade CTA */}
          <div className="p-8 rounded-3xl bg-gradient-to-r from-purple-900/40 via-indigo-900/30 to-cyan-900/40 border border-purple-500/30 text-center space-y-4 max-w-3xl mx-auto shadow-2xl">
            <h3 className="font-display font-bold text-2xl text-white">
              Unlock All 10 Masterclasses for Just ₹99
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 max-w-xl mx-auto">
              Pay ₹99 once. Get lifetime premium learning access. No recurring charges.
            </p>
            <Link
              href="/checkout"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 via-purple-300 to-pink-400 text-slate-950 font-extrabold text-sm shadow-xl"
            >
              <Zap className="w-4 h-4 fill-slate-950" />
              <span>Get Lifetime Access (₹99)</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
