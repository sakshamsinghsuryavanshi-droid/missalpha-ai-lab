import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, BookOpen, Lock, Sparkles, Check } from "lucide-react";
import { INITIAL_COURSES } from "@/lib/data/initial-data";

export default function FeaturedCourses() {
  const featured = INITIAL_COURSES.slice(0, 6);

  return (
    <section id="courses" className="py-24 relative overflow-hidden bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-300">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              INDUSTRY-LEADING CURRICULUM
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Featured AI Masterclasses
            </h2>
            <p className="text-gray-400 text-sm max-w-xl">
              10 structured courses designed to take you from foundational concepts to building production AI agents and creative masterpieces.
            </p>
          </div>

          <Link
            href="/courses"
            className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <span>View All 10 Courses</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((course) => (
            <div
              key={course.id}
              className="glass-panel rounded-2xl overflow-hidden border border-purple-500/20 glass-panel-hover flex flex-col group"
            >
              {/* Course Thumbnail Image */}
              <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                <Image
                  src={course.thumbnail_url}
                  alt={course.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080B14] via-transparent to-black/30" />

                {/* Badge Overlay */}
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
                    <span className="px-2 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase bg-emerald-500/90 text-white shadow-md">
                      FREE STARTER
                    </span>
                  )}
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-gray-300">
                  <span className="bg-black/60 backdrop-blur-md px-2 py-0.5 rounded text-[11px] font-medium border border-white/10">
                    {course.category}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] text-gray-300 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded border border-white/10">
                    <Clock className="w-3 h-3 text-cyan-400" />
                    {course.duration}
                  </span>
                </div>
              </div>

              {/* Course Info */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="text-[11px] font-semibold text-purple-400 uppercase tracking-wider">
                    {course.level} Level
                  </div>
                  <h3 className="font-display font-bold text-lg text-white group-hover:text-cyan-300 transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                    {course.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <div className="text-xs text-gray-400 flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5 text-brand-400" />
                    <span>{course.lessons_count || 14} Lessons</span>
                  </div>

                  <Link
                    href={`/courses/${course.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-white group-hover:text-cyan-400 transition-colors"
                  >
                    <span>View Syllabus</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lifetime Banner below courses */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-purple-900/30 via-indigo-900/20 to-cyan-900/30 border border-purple-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-display font-bold text-lg text-white">
              Unlock All 10 Courses with Lifetime Membership
            </h4>
            <p className="text-xs sm:text-sm text-gray-400">
              Pay ₹99 once. Get lifetime access to every current and future AI masterclass. No recurring monthly fees.
            </p>
          </div>
          <Link
            href="/checkout"
            className="px-6 py-3 rounded-xl text-sm font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-purple-400 hover:opacity-95 shadow-lg shadow-purple-500/25 whitespace-nowrap transition-all"
          >
            Get Lifetime Access (₹99)
          </Link>
        </div>
      </div>
    </section>
  );
}
