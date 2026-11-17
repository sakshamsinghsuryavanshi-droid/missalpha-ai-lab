"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Sparkles,
  BookOpen,
  Trophy,
  Clock,
  Zap,
  ArrowRight,
  CheckCircle2,
  Lock,
  Play,
  Award,
  CreditCard,
  UserCheck,
} from "lucide-react";
import { INITIAL_COURSES } from "@/lib/data/initial-data";
import { createClient } from "@/lib/supabase/client";

export default function StudentDashboardPage() {
  const [user, setUser] = useState<{ id?: string; email?: string; full_name?: string } | null>(null);
  const [isPremium, setIsPremium] = useState(false);
  const [completedCount, setCompletedCount] = useState(1);
  const [certificatesCount, setCertificatesCount] = useState(1);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setUser({
          id: user.id,
          email: user.email,
          full_name: user.user_metadata?.full_name || user.email?.split("@")[0],
        });

        supabase
          .from("profiles")
          .select("is_premium, full_name")
          .eq("id", user.id)
          .single()
          .then(({ data }) => {
            if (data?.is_premium) setIsPremium(true);
            if (data?.full_name) {
              setUser((prev) => ({ ...prev, full_name: data.full_name }));
            }
          });
      } else {
        const local = localStorage.getItem("missalpha_demo_user");
        if (local) {
          try {
            const parsed = JSON.parse(local);
            setUser(parsed);
            if (parsed.is_premium) setIsPremium(true);
          } catch {
            // Ignore
          }
        }
      }
    });

    // Check URL params for payment=verified
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("payment") === "verified" || params.get("payment") === "success") {
        setIsPremium(true);
      }
    }
  }, []);

  const studentName = user?.full_name || "Aarav Sharma";
  const continueCourse = INITIAL_COURSES[0];
  const enrolledCourses = INITIAL_COURSES.slice(0, 4);

  return (
    <div className="space-y-8">
      {/* 1. Verified Premium vs Free Upgrade Banner (Prompt Requirement) */}
      {isPremium ? (
        <div className="p-6 rounded-3xl bg-gradient-to-r from-purple-900/40 via-indigo-900/30 to-cyan-900/40 border-2 border-purple-500/40 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-500 p-0.5 shrink-0 shadow-lg shadow-amber-500/30">
              <div className="w-full h-full bg-[#080B14] rounded-[14px] flex items-center justify-center text-amber-400">
                <Trophy className="w-6 h-6" />
              </div>
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-[10px] font-bold text-amber-300 uppercase tracking-wider mb-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Lifetime Pro Active
              </div>
              <h2 className="font-display font-extrabold text-lg sm:text-xl text-white">
                Congratulations! Your MissAlpha AI Lab Lifetime Premium Membership is Active.
              </h2>
              <p className="text-xs text-gray-300 mt-0.5">
                All 10 Masterclasses, prompts, practical assignments, and certificates are 100% unlocked for life.
              </p>
            </div>
          </div>
          <div className="shrink-0">
            <Link
              href="/dashboard/courses"
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-purple-400 hover:opacity-95 shadow-md flex items-center gap-1.5 whitespace-nowrap"
            >
              <span>Explore Curriculum</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="p-6 rounded-3xl bg-gradient-to-r from-purple-950/60 via-slate-900 to-cyan-950/40 border border-purple-500/30 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-purple-900/60 border border-purple-500/40 flex items-center justify-center text-cyan-400 shrink-0">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400">
                Free Learner Plan
              </span>
              <h2 className="font-display font-bold text-lg text-white">
                Unlock Complete Access with ₹99 Lifetime Membership
              </h2>
              <p className="text-xs text-gray-300">
                Pay ₹99 once. Get lifetime premium learning access. No recurring charges.
              </p>
            </div>
          </div>
          <Link
            href="/checkout"
            className="px-6 py-3 rounded-xl text-xs sm:text-sm font-extrabold text-slate-950 bg-gradient-to-r from-cyan-400 via-purple-300 to-pink-400 hover:opacity-95 shadow-lg shadow-purple-500/25 whitespace-nowrap"
          >
            Upgrade for ₹99
          </Link>
        </div>
      )}

      {/* 2. Welcome Message & Profile Overview */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Welcome Back, <span className="gradient-text-purple">{studentName}</span> 👋
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            Keep mastering artificial intelligence. You are on track to build the future.
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <div className="glass-panel px-3.5 py-2 rounded-xl border border-purple-500/20 text-gray-300 flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-cyan-400" />
            <span>ID: {user?.email || "student@missalpha.ai"}</span>
          </div>
        </div>
      </div>

      {/* 3. Quick Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel p-5 rounded-2xl border border-purple-500/20 space-y-2">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>Enrolled Courses</span>
            <BookOpen className="w-4 h-4 text-purple-400" />
          </div>
          <div className="font-display text-2xl sm:text-3xl font-extrabold text-white">
            {isPremium ? 10 : 2}
          </div>
          <span className="text-[11px] text-gray-400 block">
            {isPremium ? "All 10 masterclasses active" : "8 locked behind pro"}
          </span>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-purple-500/20 space-y-2">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>Completed Courses</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="font-display text-2xl sm:text-3xl font-extrabold text-white">
            {completedCount}
          </div>
          <span className="text-[11px] text-emerald-400 block">
            100% finished curriculum
          </span>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-purple-500/20 space-y-2">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>Hours Learned</span>
            <Clock className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="font-display text-2xl sm:text-3xl font-extrabold text-white">
            14.5
          </div>
          <span className="text-[11px] text-gray-400 block">
            Across 18 completed lessons
          </span>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-purple-500/20 space-y-2">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>Certificates Issued</span>
            <Award className="w-4 h-4 text-amber-400" />
          </div>
          <div className="font-display text-2xl sm:text-3xl font-extrabold text-white">
            {certificatesCount}
          </div>
          <span className="text-[11px] text-amber-400 block">
            Verified cryptographic ID
          </span>
        </div>
      </div>

      {/* 4. Continue Learning Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display font-bold text-lg sm:text-xl text-white flex items-center gap-2">
            <Play className="w-5 h-5 text-cyan-400 fill-cyan-400" />
            Continue Learning
          </h2>
          <Link
            href={`/courses/${continueCourse.slug}/learn`}
            className="text-xs font-semibold text-cyan-400 hover:underline flex items-center gap-1"
          >
            Resume Lesson <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="glass-panel rounded-2xl border border-purple-500/20 p-5 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left w-full md:w-auto">
            <div className="relative w-32 h-20 rounded-xl overflow-hidden shrink-0 bg-slate-900 border border-slate-700">
              <Image
                src={continueCourse.thumbnail_url}
                alt={continueCourse.title}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <div className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider">
                Current Module 1: The AI Paradigm Shift
              </div>
              <h3 className="font-display font-bold text-base sm:text-lg text-white">
                AI Fundamentals: Lesson 2 – Supervised vs Unsupervised vs RLHF
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">
                18 Minutes • Includes practical assignment & interactive quiz
              </p>
            </div>
          </div>

          <div className="w-full md:w-64 space-y-2">
            <div className="flex items-center justify-between text-xs text-gray-300 font-medium">
              <span>Course Progress</span>
              <span className="text-cyan-400 font-bold">65%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full transition-all duration-500"
                style={{ width: "65%" }}
              />
            </div>
            <Link
              href={`/courses/${continueCourse.slug}/learn`}
              className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors mt-2"
            >
              <span>Resume Classroom</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* 5. Enrolled Courses Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display font-bold text-lg sm:text-xl text-white">
            Your Active Courses
          </h2>
          <Link
            href="/dashboard/courses"
            className="text-xs font-semibold text-gray-400 hover:text-white"
          >
            View All ({INITIAL_COURSES.length})
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {enrolledCourses.map((c, idx) => {
            const isLocked = c.is_premium && !isPremium;
            return (
              <div
                key={c.id}
                className="glass-panel rounded-2xl overflow-hidden border border-purple-500/20 glass-panel-hover flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-36 w-full bg-slate-900">
                    <Image
                      src={c.thumbnail_url}
                      alt={c.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080B14] via-transparent to-black/30" />
                    <div className="absolute top-2.5 right-2.5">
                      {isLocked ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500 text-slate-950 flex items-center gap-1">
                          <Lock className="w-3 h-3" /> PRO ONLY
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/90 text-white">
                          UNLOCKED
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-4 space-y-1.5">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-purple-400">
                      {c.level}
                    </div>
                    <h3 className="font-display font-bold text-sm text-white group-hover:text-cyan-300 transition-colors">
                      {c.title}
                    </h3>
                    <p className="text-xs text-gray-400 line-clamp-2">
                      {c.description}
                    </p>
                  </div>
                </div>

                <div className="p-4 pt-0">
                  {isLocked ? (
                    <Link
                      href="/checkout"
                      className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border border-amber-500/30"
                    >
                      <Lock className="w-3 h-3" /> Unlock for ₹99
                    </Link>
                  ) : (
                    <Link
                      href={`/courses/${c.slug}/learn`}
                      className="w-full py-2 rounded-xl bg-purple-600/30 hover:bg-purple-600 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all border border-purple-500/40"
                    >
                      <span>Start Learning</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
