"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import {
  Sparkles,
  Clock,
  BookOpen,
  Award,
  Lock,
  Play,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Zap,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { INITIAL_COURSES } from "@/lib/data/initial-data";
import { createClient } from "@/lib/supabase/client";
import { Course } from "@/types";

export default function CourseDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const course = INITIAL_COURSES.find((c) => c.slug === slug) || INITIAL_COURSES[0];
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

  const modules = course.modules || [
    {
      id: "mod-1",
      course_id: course.id,
      title: "Module 1: Foundations & Architecture",
      description: "Core mental models, terminology and basic setup.",
      order_index: 1,
      lessons: [
        {
          id: "les-1",
          module_id: "mod-1",
          course_id: course.id,
          title: "Introduction and Executive Overview",
          slug: "intro-overview",
          content: "Welcome to this masterclass.",
          video_url: "https://www.youtube.com/embed/aircAruvnKk",
          duration_minutes: 15,
          is_free_preview: true,
          order_index: 1,
          resources: [],
        },
        {
          id: "les-2",
          module_id: "mod-1",
          course_id: course.id,
          title: "Architecture and Core Workflow Walkthrough",
          slug: "architecture-workflow",
          content: "Deep dive into techniques.",
          video_url: "https://www.youtube.com/embed/z-EtmaFJieY",
          duration_minutes: 20,
          is_free_preview: false,
          order_index: 2,
          resources: [],
        },
      ],
    },
    {
      id: "mod-2",
      course_id: course.id,
      title: "Module 2: Advanced Techniques & Production Workflows",
      description: "Scaling to enterprise projects, automation and monetization.",
      order_index: 2,
      lessons: [
        {
          id: "les-3",
          module_id: "mod-2",
          course_id: course.id,
          title: "Production Case Studies and Best Practices",
          slug: "case-studies-best-practices",
          content: "Real world case studies.",
          video_url: "https://www.youtube.com/embed/wjZofJX0v4U",
          duration_minutes: 25,
          is_free_preview: false,
          order_index: 1,
          resources: [],
        },
      ],
    },
  ];

  const isLocked = course.is_premium && !isPremium;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />

      <main className="flex-grow pt-28 pb-20 relative bg-grid-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header Banner */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-900/60 text-purple-300 border border-purple-500/30">
                  {course.category}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-cyan-950/80 text-cyan-300 border border-cyan-800/40">
                  {course.level} Level
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold text-gray-300 bg-slate-900 border border-slate-800 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  {course.duration}
                </span>
              </div>

              <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
                {course.title}
              </h1>

              <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                {course.tagline || course.description}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href={`/courses/${course.slug}/learn`}
                  className="px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-purple-600 hover:bg-purple-500 shadow-lg shadow-purple-500/25 flex items-center gap-2 transition-colors"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Start Classroom</span>
                </Link>

                {isLocked && (
                  <Link
                    href="/checkout"
                    className="px-6 py-3.5 rounded-xl text-sm font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-purple-400 hover:opacity-95 shadow-md flex items-center gap-2"
                  >
                    <Zap className="w-4 h-4 fill-slate-950" />
                    <span>Unlock for ₹99 Lifetime</span>
                  </Link>
                )}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden glass-panel border border-purple-500/30 shadow-2xl">
                <div className="relative h-64 sm:h-72 w-full">
                  <Image
                    src={course.thumbnail_url}
                    alt={course.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080B14] via-transparent to-black/20" />
                </div>
                <div className="p-5 space-y-3 bg-[#080B14]/90">
                  <div className="flex items-center justify-between text-xs text-gray-300">
                    <span className="flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4 text-purple-400" /> Complete Curriculum
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-amber-400" /> Official Certificate
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Syllabus Modules */}
          <div className="max-w-4xl space-y-6 pt-6">
            <div>
              <h2 className="font-display text-2xl font-bold text-white">
                Course Syllabus & Lessons
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Structured modules with video lessons, practical assignments and checkpoint quizzes.
              </p>
            </div>

            <div className="space-y-4">
              {modules.map((mod, modIdx) => (
                <div
                  key={mod.id}
                  className="rounded-2xl glass-panel border border-purple-500/20 overflow-hidden"
                >
                  <div className="p-5 bg-slate-900/60 border-b border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 block">
                        Module {modIdx + 1}
                      </span>
                      <h3 className="font-display font-bold text-base text-white">
                        {mod.title}
                      </h3>
                      {mod.description && (
                        <p className="text-xs text-gray-400 mt-0.5">{mod.description}</p>
                      )}
                    </div>
                  </div>

                  <div className="divide-y divide-slate-800/40">
                    {mod.lessons.map((les, lesIdx) => (
                      <div
                        key={les.id}
                        className="p-4 sm:px-6 flex items-center justify-between hover:bg-slate-900/30 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-7 h-7 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-semibold text-gray-300">
                            {lesIdx + 1}
                          </div>
                          <div>
                            <h4 className="text-xs sm:text-sm font-semibold text-white">
                              {les.title}
                            </h4>
                            <span className="text-[11px] text-gray-400">
                              {les.duration_minutes} Minutes
                            </span>
                          </div>
                        </div>

                        <div>
                          {les.is_free_preview ? (
                            <Link
                              href={`/courses/${course.slug}/learn`}
                              className="px-3 py-1 rounded-lg bg-cyan-950 border border-cyan-800/60 text-cyan-300 text-xs font-semibold hover:bg-cyan-900 transition-colors flex items-center gap-1"
                            >
                              <Play className="w-3 h-3 fill-cyan-300" /> Free Preview
                            </Link>
                          ) : isLocked ? (
                            <span className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-gray-500 text-xs font-semibold flex items-center gap-1">
                              <Lock className="w-3 h-3" /> Pro Only
                            </span>
                          ) : (
                            <Link
                              href={`/courses/${course.slug}/learn`}
                              className="px-3 py-1 rounded-lg bg-purple-600/30 text-purple-300 text-xs font-semibold hover:bg-purple-600 hover:text-white transition-colors"
                            >
                              Play Lesson
                            </Link>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
