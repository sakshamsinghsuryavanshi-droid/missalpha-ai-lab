"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  Sparkles,
  Play,
  CheckCircle2,
  Lock,
  Download,
  BookOpen,
  Award,
  ChevronLeft,
  ChevronRight,
  FileText,
  HelpCircle,
  Code,
  Zap,
  ArrowLeft,
  RotateCcw,
} from "lucide-react";
import confetti from "canvas-confetti";
import { INITIAL_COURSES } from "@/lib/data/initial-data";
import { createClient } from "@/lib/supabase/client";
import { Lesson, CourseModule } from "@/types";

export default function CourseClassroomPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;
  const course = INITIAL_COURSES.find((c) => c.slug === slug) || INITIAL_COURSES[0];

  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
  const [isPremium, setIsPremium] = useState(false);
  const [completedLessons, setCompletedLessons] = useState<Record<string, boolean>>({});
  const [showSolution, setShowSolution] = useState(false);

  // Quiz interactive state
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [certificateUnlocked, setCertificateUnlocked] = useState(false);

  const modules: CourseModule[] = course.modules || [
    {
      id: "m-default-1",
      course_id: course.id,
      title: "Module 1: Foundations",
      order_index: 1,
      lessons: [
        {
          id: "l-default-1",
          module_id: "m-default-1",
          course_id: course.id,
          title: `${course.title} - Fundamentals & Overview`,
          slug: "fundamentals-overview",
          content: `### Welcome to ${course.title}\n\nIn this core lesson, we analyze foundational mechanics, setup requirements, and mental frameworks to get the highest ROI from this tool.\n\n#### Key Objectives:\n1. Understand architecture and mechanics.\n2. Apply production prompting and automation recipes.\n3. Complete the practical assignment below.`,
          video_url: "https://www.youtube.com/embed/aircAruvnKk",
          duration_minutes: 15,
          is_free_preview: true,
          order_index: 1,
          resources: [
            { title: "Course Resource Guide (PDF)", url: "#", type: "pdf", size: "1.2 MB" },
            { title: "Prompt Cheat Sheet", url: "#", type: "link" },
          ],
          assignment_prompt: "Summarize the 3 core benefits of using this AI tool in your current career or business workflow.",
          assignment_solution: "The 3 core benefits are: 10x faster iteration speed, programmatic consistency, and automated handling of repetitive tasks.",
        },
      ],
    },
  ];

  const currentModule = modules[activeModuleIndex] || modules[0];
  const currentLesson: Lesson = currentModule?.lessons?.[activeLessonIndex] || modules[0].lessons[0];

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

  const isLocked = course.is_premium && !currentLesson.is_free_preview && !isPremium;

  const handleMarkComplete = async () => {
    const newCompleted = { ...completedLessons, [currentLesson.id]: true };
    setCompletedLessons(newCompleted);

    // Call progress API
    try {
      const res = await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseId: course.id,
          lessonId: currentLesson.id,
          completed: true,
        }),
      });

      const data = await res.json();
      if (data.isCompleted) {
        setCertificateUnlocked(true);
        triggerConfetti();
      }
    } catch {
      // Local progress fallback
      setCertificateUnlocked(true);
    }
  };

  const handleQuizAnswer = (questionId: string, optionIndex: number) => {
    setQuizAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleSubmitQuiz = async () => {
    if (!currentLesson.quiz) return;

    try {
      const res = await fetch("/api/quiz/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          quizId: currentLesson.quiz.id,
          answers: quizAnswers,
          questions: currentLesson.quiz.questions,
          passingScore: currentLesson.quiz.passing_score,
        }),
      });

      const data = await res.json();
      setQuizScore(data.score);
      setQuizSubmitted(true);

      if (data.passed) {
        triggerConfetti();
        handleMarkComplete();
      }
    } catch {
      setQuizScore(100);
      setQuizSubmitted(true);
      triggerConfetti();
      handleMarkComplete();
    }
  };

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      // Ignore
    }
  };

  const handleNextLesson = () => {
    if (activeLessonIndex < currentModule.lessons.length - 1) {
      setActiveLessonIndex(activeLessonIndex + 1);
    } else if (activeModuleIndex < modules.length - 1) {
      setActiveModuleIndex(activeModuleIndex + 1);
      setActiveLessonIndex(0);
    }
    setShowSolution(false);
    setQuizSubmitted(false);
  };

  const handlePrevLesson = () => {
    if (activeLessonIndex > 0) {
      setActiveLessonIndex(activeLessonIndex - 1);
    } else if (activeModuleIndex > 0) {
      setActiveModuleIndex(activeModuleIndex - 1);
      setActiveLessonIndex(modules[activeModuleIndex - 1].lessons.length - 1);
    }
    setShowSolution(false);
    setQuizSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-[#070A14] text-foreground flex flex-col">
      {/* Top Bar Navigation */}
      <header className="h-16 border-b border-purple-500/20 bg-[#080B14]/90 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/courses"
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="font-display font-bold text-sm sm:text-base text-white truncate max-w-xs sm:max-w-md">
              {course.title}
            </h1>
            <span className="text-[11px] text-gray-400 truncate block">
              {currentLesson.title}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {!isPremium && course.is_premium && (
            <Link
              href="/checkout"
              className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-400 to-purple-400 text-slate-950 font-extrabold text-xs flex items-center gap-1 shadow-md"
            >
              <Zap className="w-3.5 h-3.5 fill-slate-950" />
              <span>Unlock ₹99</span>
            </Link>
          )}

          <Link
            href="/dashboard"
            className="px-3 py-1.5 rounded-lg bg-slate-800 text-gray-300 hover:text-white text-xs font-semibold"
          >
            Exit Classroom
          </Link>
        </div>
      </header>

      {/* Main Classroom Layout: Sidebar + Player */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Main Content Pane */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-5xl space-y-8">
          {/* Locked Overlay if Premium Content */}
          {isLocked ? (
            <div className="rounded-3xl glass-panel p-8 sm:p-12 border-2 border-purple-500/40 text-center space-y-5 shadow-2xl">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mx-auto">
                <Lock className="w-8 h-8" />
              </div>
              <div className="space-y-2 max-w-md mx-auto">
                <h2 className="font-display font-extrabold text-2xl text-white">
                  This Lesson Requires Lifetime Premium
                </h2>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  Join hundreds of learners unlocking all 10 AI courses, video lessons, prompt repositories and certificates.
                </p>
                <p className="text-xs font-bold text-cyan-300">
                  Pay ₹99 once. Get lifetime premium learning access. No recurring charges.
                </p>
              </div>
              <Link
                href="/checkout"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-extrabold text-slate-950 bg-gradient-to-r from-cyan-400 via-purple-300 to-pink-400 shadow-xl hover:scale-105 transition-all"
              >
                <Zap className="w-4 h-4 fill-slate-950" />
                <span>Unlock for ₹99 Lifetime</span>
              </Link>
            </div>
          ) : (
            <>
              {/* 1. Video Lesson Player */}
              <div className="rounded-2xl overflow-hidden glass-panel border border-purple-500/30 shadow-2xl bg-black">
                <div className="relative aspect-video w-full">
                  <iframe
                    src={currentLesson.video_url}
                    title={currentLesson.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                </div>
              </div>

              {/* Lesson Controls Bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl glass-panel border border-purple-500/20">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrevLesson}
                    className="px-3 py-2 rounded-xl bg-slate-800 text-gray-300 hover:text-white text-xs font-semibold flex items-center gap-1 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" /> Previous
                  </button>
                  <button
                    onClick={handleNextLesson}
                    className="px-3 py-2 rounded-xl bg-slate-800 text-gray-300 hover:text-white text-xs font-semibold flex items-center gap-1 transition-colors"
                  >
                    Next <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={handleMarkComplete}
                    className={`flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                      completedLessons[currentLesson.id]
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                        : "bg-purple-600 hover:bg-purple-500 text-white shadow-md"
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>
                      {completedLessons[currentLesson.id]
                        ? "Completed ✓"
                        : "Mark as Complete"}
                    </span>
                  </button>
                </div>
              </div>

              {/* 2. Text Lesson Body */}
              <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-purple-500/20 space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400">
                  <FileText className="w-4 h-4" /> Comprehensive Written Guide
                </div>
                <div className="prose prose-invert max-w-none text-sm text-gray-300 space-y-3 leading-relaxed whitespace-pre-line">
                  {currentLesson.content}
                </div>
              </div>

              {/* 3. Downloadable Resources */}
              {currentLesson.resources && currentLesson.resources.length > 0 && (
                <div className="glass-panel p-6 rounded-2xl border border-purple-500/20 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-400">
                    <Download className="w-4 h-4" /> Downloadable Learning Materials
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {currentLesson.resources.map((res, i) => (
                      <a
                        key={i}
                        href={res.url}
                        className="p-3 rounded-xl bg-slate-900/80 border border-slate-700/80 hover:border-purple-500 text-xs text-gray-200 flex items-center justify-between group transition-colors"
                      >
                        <div className="flex items-center gap-2.5 truncate">
                          <FileText className="w-4 h-4 text-cyan-400 shrink-0" />
                          <span className="font-semibold truncate">{res.title}</span>
                        </div>
                        {res.size && (
                          <span className="text-[10px] text-gray-400 shrink-0">
                            {res.size}
                          </span>
                        )}
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* 4. Practical Assignment */}
              {currentLesson.assignment_prompt && (
                <div className="glass-panel p-6 rounded-2xl border border-purple-500/20 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
                    <Code className="w-4 h-4" /> Practical Lab Assignment
                  </div>
                  <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-gray-300 leading-relaxed">
                    {currentLesson.assignment_prompt}
                  </div>

                  {currentLesson.assignment_solution && (
                    <div className="space-y-2">
                      <button
                        onClick={() => setShowSolution(!showSolution)}
                        className="text-xs font-bold text-cyan-400 hover:underline flex items-center gap-1"
                      >
                        {showSolution ? "Hide Model Solution" : "View Instructor Solution"}
                      </button>

                      {showSolution && (
                        <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-500/30 text-xs text-purple-200 leading-relaxed whitespace-pre-line animate-fadeIn">
                          <strong>Instructor Reference:</strong>
                          <p className="mt-1">{currentLesson.assignment_solution}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* 5. Checkpoint Quiz */}
              {currentLesson.quiz && (
                <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-purple-500/20 space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 block">
                        Knowledge Check
                      </span>
                      <h3 className="font-display font-bold text-lg text-white">
                        {currentLesson.quiz.title}
                      </h3>
                      <p className="text-xs text-gray-400 mt-0.5">
                        Passing score: {currentLesson.quiz.passing_score}%
                      </p>
                    </div>

                    {quizSubmitted && quizScore !== null && (
                      <div
                        className={`px-3 py-1.5 rounded-xl text-xs font-extrabold uppercase tracking-wider ${
                          quizScore >= currentLesson.quiz.passing_score
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                            : "bg-rose-500/20 text-rose-400 border border-rose-500/40"
                        }`}
                      >
                        Score: {quizScore}% {quizScore >= currentLesson.quiz.passing_score ? "PASSED" : "RETRY"}
                      </div>
                    )}
                  </div>

                  <div className="space-y-6">
                    {currentLesson.quiz.questions.map((q, qIndex) => (
                      <div
                        key={q.id}
                        className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3"
                      >
                        <h4 className="font-semibold text-xs sm:text-sm text-white">
                          {qIndex + 1}. {q.question}
                        </h4>

                        <div className="space-y-2">
                          {q.options.map((opt, optIdx) => {
                            const isSelected = quizAnswers[q.id] === optIdx;
                            const isCorrect = optIdx === q.correct_option_index;
                            return (
                              <button
                                key={optIdx}
                                type="button"
                                onClick={() => !quizSubmitted && handleQuizAnswer(q.id, optIdx)}
                                className={`w-full p-3 rounded-xl text-left text-xs font-medium transition-all border ${
                                  quizSubmitted
                                    ? isCorrect
                                      ? "bg-emerald-950/60 border-emerald-500 text-emerald-300"
                                      : isSelected
                                      ? "bg-rose-950/60 border-rose-500 text-rose-300"
                                      : "bg-slate-900 border-slate-800 text-gray-400"
                                    : isSelected
                                    ? "bg-purple-900/40 border-purple-500 text-white"
                                    : "bg-slate-900/80 border-slate-800 text-gray-300 hover:border-slate-700"
                                }`}
                              >
                                {opt}
                              </button>
                            );
                          })}
                        </div>

                        {quizSubmitted && q.explanation && (
                          <p className="text-[11px] text-gray-400 bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                            💡 <strong>Explanation:</strong> {q.explanation}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    {quizSubmitted ? (
                      <button
                        onClick={() => {
                          setQuizSubmitted(false);
                          setQuizAnswers({});
                        }}
                        className="px-4 py-2 rounded-xl bg-slate-800 text-gray-300 text-xs font-semibold flex items-center gap-1.5"
                      >
                        <RotateCcw className="w-3.5 h-3.5" /> Retake Quiz
                      </button>
                    ) : (
                      <button
                        onClick={handleSubmitQuiz}
                        className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-500 text-slate-950 font-bold text-xs shadow-md"
                      >
                        Submit Answers for Grading
                      </button>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Sidebar: Course Modules & Lesson List */}
        <div className="w-full lg:w-80 border-t lg:border-t-0 lg:border-l border-purple-500/20 bg-[#070913] p-5 space-y-6 overflow-y-auto">
          <div>
            <h3 className="font-display font-bold text-sm text-white">
              Course Syllabus
            </h3>
            <p className="text-[11px] text-gray-400 mt-0.5">
              {modules.length} Modules • Track your completion
            </p>
          </div>

          <div className="space-y-4">
            {modules.map((mod, mIdx) => (
              <div key={mod.id} className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400 block px-1">
                  {mod.title}
                </span>

                <div className="space-y-1">
                  {mod.lessons.map((les, lIdx) => {
                    const isCurrent =
                      mIdx === activeModuleIndex && lIdx === activeLessonIndex;
                    const isDone = completedLessons[les.id];
                    const isLessonLocked =
                      course.is_premium && !les.is_free_preview && !isPremium;

                    return (
                      <button
                        key={les.id}
                        onClick={() => {
                          setActiveModuleIndex(mIdx);
                          setActiveLessonIndex(lIdx);
                          setShowSolution(false);
                          setQuizSubmitted(false);
                        }}
                        className={`w-full p-2.5 rounded-xl text-left text-xs transition-all flex items-center justify-between ${
                          isCurrent
                            ? "bg-purple-600/30 border border-purple-500/40 text-cyan-300 font-semibold"
                            : "hover:bg-slate-900 text-gray-400 hover:text-white"
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          {isDone ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          ) : isLessonLocked ? (
                            <Lock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                          ) : (
                            <Play className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                          )}
                          <span className="truncate">{les.title}</span>
                        </div>
                        <span className="text-[10px] text-gray-500 shrink-0">
                          {les.duration_minutes}m
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Certificate Generation Status */}
          <div className="p-4 rounded-2xl glass-panel border border-purple-500/20 text-center space-y-2">
            <Award className="w-6 h-6 text-amber-400 mx-auto" />
            <h4 className="font-bold text-xs text-white">Course Certificate</h4>
            <p className="text-[11px] text-gray-400">
              Complete lessons & score 80%+ on quizzes to unlock your verified credential.
            </p>
            <Link
              href="/dashboard/certificates"
              className="inline-block text-[11px] font-bold text-cyan-400 hover:underline pt-1"
            >
              View My Certificates →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
