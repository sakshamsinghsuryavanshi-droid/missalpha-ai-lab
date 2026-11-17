"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Filter, Lock, CheckCircle2, BookOpen, Clock, ArrowRight, Sparkles } from "lucide-react";
import { INITIAL_COURSES } from "@/lib/data/initial-data";
import { createClient } from "@/lib/supabase/client";

export default function DashboardCoursesPage() {
  const [courses] = useState(INITIAL_COURSES);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [filterType, setFilterType] = useState<"all" | "free" | "premium">("all");
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        supabase
          .from("profiles")
          .select("is_premium")
          .eq("id", user.id)
          .single()
          .then(({ data }) => {
            if (data?.is_premium) setIsPremium(true);
          });
      } else {
        const local = localStorage.getItem("missalpha_demo_user");
        if (local) {
          try {
            if (JSON.parse(local).is_premium) setIsPremium(true);
          } catch {
            // Ignore
          }
        }
      }
    });
  }, []);

  const categories = ["All", "Foundations", "Generative AI", "Engineering", "Creative AI", "Productivity & Ops", "Business & Marketing", "Hands-on Projects"];

  const filteredCourses = courses.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || c.category === category;
    const matchesType =
      filterType === "all" ||
      (filterType === "free" && !c.is_premium) ||
      (filterType === "premium" && c.is_premium);

    return matchesSearch && matchesCategory && matchesType;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-white">
            Curriculum & Masterclasses
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            Browse all 10 structured AI courses. {isPremium ? "You have lifetime access to all courses." : "Free starter course available. Upgrade for ₹99 to unlock all."}
          </p>
        </div>

        {!isPremium && (
          <Link
            href="/checkout"
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-purple-400 hover:opacity-95 shadow-md flex items-center gap-1.5 self-start md:self-auto"
          >
            <span>Unlock All for ₹99</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        )}
      </div>

      {/* Search and Filters Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search courses by keyword, topic or tool..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-900/90 border border-slate-700 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => setFilterType("all")}
            className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
              filterType === "all" ? "bg-purple-600 text-white" : "bg-slate-900 text-gray-400 hover:text-white"
            }`}
          >
            All Courses
          </button>
          <button
            onClick={() => setFilterType("free")}
            className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
              filterType === "free" ? "bg-purple-600 text-white" : "bg-slate-900 text-gray-400 hover:text-white"
            }`}
          >
            Free Starters
          </button>
          <button
            onClick={() => setFilterType("premium")}
            className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
              filterType === "premium" ? "bg-purple-600 text-white" : "bg-slate-900 text-gray-400 hover:text-white"
            }`}
          >
            Premium Only
          </button>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap border transition-colors ${
              category === cat
                ? "bg-cyan-950/80 border-cyan-500 text-cyan-300"
                : "bg-slate-900/50 border-slate-800 text-gray-400 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
        {filteredCourses.map((c) => {
          const isLocked = c.is_premium && !isPremium;
          return (
            <div
              key={c.id}
              className="glass-panel rounded-2xl overflow-hidden border border-purple-500/20 glass-panel-hover flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-44 w-full bg-slate-900">
                  <Image
                    src={c.thumbnail_url}
                    alt={c.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080B14] via-transparent to-black/30" />
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-purple-900/80 text-purple-200 border border-purple-500/30">
                      {c.level}
                    </span>
                    {isLocked ? (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-500 text-slate-950 flex items-center gap-1">
                        <Lock className="w-3 h-3" /> PRO
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-500 text-white">
                        {c.is_premium ? "PRO UNLOCKED" : "FREE STARTER"}
                      </span>
                    )}
                  </div>
                  <div className="absolute bottom-2.5 right-3 text-[11px] text-gray-300 bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm">
                    {c.duration}
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <span className="text-[11px] font-semibold text-cyan-400 uppercase tracking-wider">
                    {c.category}
                  </span>
                  <h3 className="font-display font-bold text-base sm:text-lg text-white group-hover:text-cyan-300 transition-colors">
                    {c.title}
                  </h3>
                  <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                    {c.description}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                {isLocked ? (
                  <Link
                    href="/checkout"
                    className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors border border-amber-500/30"
                  >
                    <Lock className="w-3.5 h-3.5" /> Unlock for ₹99
                  </Link>
                ) : (
                  <Link
                    href={`/courses/${c.slug}/learn`}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-95 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-md"
                  >
                    <span>Enter Classroom</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
