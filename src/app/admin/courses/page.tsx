"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Plus, Edit3, Trash2, Lock, CheckCircle2, Video, BookOpen, Sparkles, X } from "lucide-react";
import { INITIAL_COURSES } from "@/lib/data/initial-data";
import { Course } from "@/types";

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<Course[]>(INITIAL_COURSES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  // New course form state
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("Generative AI");
  const [level, setLevel] = useState<"Beginner" | "Intermediate" | "Advanced" | "All Levels">("Beginner");
  const [duration, setDuration] = useState("5 Hours");
  const [description, setDescription] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80");
  const [isPremium, setIsPremium] = useState(true);

  const handleOpenCreate = () => {
    setEditingCourse(null);
    setTitle("");
    setSlug("");
    setDescription("");
    setIsModalOpen(true);
  };

  const handleOpenEdit = (c: Course) => {
    setEditingCourse(c);
    setTitle(c.title);
    setSlug(c.slug);
    setCategory(c.category);
    setLevel(c.level);
    setDuration(c.duration);
    setDescription(c.description);
    setThumbnailUrl(c.thumbnail_url);
    setIsPremium(c.is_premium);
    setIsModalOpen(true);
  };

  const handleSaveCourse = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingCourse) {
      setCourses((prev) =>
        prev.map((c) =>
          c.id === editingCourse.id
            ? {
                ...c,
                title,
                slug,
                category,
                level,
                duration,
                description,
                thumbnail_url: thumbnailUrl,
                is_premium: isPremium,
              }
            : c
        )
      );
    } else {
      const newCourse: Course = {
        id: `course_${Date.now()}`,
        title,
        slug: slug || title.toLowerCase().replace(/[^a-z0-9]/g, "-"),
        tagline: description.slice(0, 80),
        description,
        category,
        level,
        duration,
        lessons_count: 12,
        thumbnail_url: thumbnailUrl,
        badge_text: "NEW",
        is_premium: isPremium,
        published: true,
        order_index: courses.length + 1,
        created_at: new Date().toISOString(),
      };
      setCourses([newCourse, ...courses]);
    }

    setIsModalOpen(false);
  };

  const handleDeleteCourse = (id: string) => {
    if (confirm("Are you sure you want to delete this course from the catalog?")) {
      setCourses((prev) => prev.filter((c) => c.id !== id));
    }
  };

  const handleTogglePremium = (id: string) => {
    setCourses((prev) =>
      prev.map((c) => (c.id === id ? { ...c, is_premium: !c.is_premium } : c))
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
            <BookOpen className="w-7 h-7 text-amber-400" />
            Course, Module & Lesson Manager
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            Publish courses, manage lesson video URLs, edit curriculum modules, and configure ₹99 premium locks.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-2 transition-colors shadow-lg self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New AI Course</span>
        </button>
      </div>

      {/* Courses List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((c) => (
          <div
            key={c.id}
            className="glass-panel rounded-2xl overflow-hidden border border-purple-500/20 flex flex-col justify-between"
          >
            <div>
              <div className="relative h-40 w-full bg-slate-900">
                <Image
                  src={c.thumbnail_url}
                  alt={c.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-2.5 left-2.5 flex items-center gap-2">
                  <button
                    onClick={() => handleTogglePremium(c.id)}
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider transition-colors ${
                      c.is_premium
                        ? "bg-amber-500 text-slate-950 flex items-center gap-1"
                        : "bg-emerald-500 text-white"
                    }`}
                  >
                    {c.is_premium ? (
                      <>
                        <Lock className="w-3 h-3" /> ₹99 PREMIUM
                      </>
                    ) : (
                      "FREE STARTER"
                    )}
                  </button>
                </div>
              </div>

              <div className="p-4 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400">
                  {c.category} • {c.level}
                </span>
                <h3 className="font-display font-bold text-base text-white">
                  {c.title}
                </h3>
                <p className="text-xs text-gray-400 line-clamp-2">
                  {c.description}
                </p>
              </div>
            </div>

            <div className="p-4 pt-0 border-t border-slate-800/80 flex items-center justify-between text-xs mt-3">
              <span className="text-gray-400 font-mono text-[11px]">{c.slug}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenEdit(c)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-gray-300 hover:text-white"
                  title="Edit Course"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDeleteCourse(c.id)}
                  className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400"
                  title="Delete Course"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Course Edit/Create Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#0B0F19] border-2 border-purple-500/40 rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-display font-bold text-lg text-white">
                {editingCourse ? "Edit AI Course" : "Create New AI Course"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-white text-sm"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCourse} className="space-y-4 text-xs">
              <div>
                <label className="block text-gray-300 font-semibold mb-1">
                  Course Title
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Multi-Agent AI Architectures"
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">
                  URL Slug
                </label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="e.g. multi-agent-ai-architectures"
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-400 font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-300 font-semibold mb-1">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none"
                  >
                    <option value="Foundations">Foundations</option>
                    <option value="Generative AI">Generative AI</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Creative AI">Creative AI</option>
                    <option value="Productivity & Ops">Productivity & Ops</option>
                    <option value="Business & Marketing">Business & Marketing</option>
                    <option value="Hands-on Projects">Hands-on Projects</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 font-semibold mb-1">
                    Difficulty Level
                  </label>
                  <select
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    value={level as any}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    onChange={(e) => setLevel(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="All Levels">All Levels</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">
                  Duration & Lesson Count
                </label>
                <input
                  type="text"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="e.g. 5 Hours (16 Lessons)"
                  className="w-full px-3.5 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">
                  Course Description
                </label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Detailed breakdown of syllabus and practical learning goals..."
                  className="w-full px-3.5 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">
                  Thumbnail Image URL
                </label>
                <input
                  type="text"
                  value={thumbnailUrl}
                  onChange={(e) => setThumbnailUrl(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none font-mono"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="is_premium_check"
                  checked={isPremium}
                  onChange={(e) => setIsPremium(e.target.checked)}
                  className="w-4 h-4 rounded text-purple-600 bg-slate-900 border-slate-700"
                />
                <label htmlFor="is_premium_check" className="text-gray-300 font-medium">
                  Require MissAlpha Lifetime Premium Membership (₹99)
                </label>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-gray-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold"
                >
                  Save Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
