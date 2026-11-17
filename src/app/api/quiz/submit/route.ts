import { NextRequest, NextResponse } from "next/server";
import { createClientServer } from "@/lib/supabase/server";
import { getAdminClient, isSupabaseConfigured } from "@/lib/supabase/admin";

export async function POST(req: NextRequest) {
  try {
    const supabase = createClientServer();
    const { data: { user } } = await supabase.auth.getUser();

    const body = await req.json();
    const { quizId, answers, passingScore = 80, questions, demoUserId } = body;

    const userId = user?.id || demoUserId;
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!questions || !Array.isArray(questions) || questions.length === 0) {
      return NextResponse.json({ error: "Quiz questions not provided" }, { status: 400 });
    }

    // Evaluate answers
    let correctCount = 0;
    const review = questions.map((q, idx) => {
      const userAnswer = answers[q.id ?? idx];
      const isCorrect = userAnswer === q.correct_option_index;
      if (isCorrect) correctCount++;
      return {
        questionId: q.id ?? idx,
        question: q.question,
        userAnswer,
        correctAnswer: q.correct_option_index,
        isCorrect,
        explanation: q.explanation,
      };
    });

    const scorePercent = Math.round((correctCount / questions.length) * 100);
    const passed = scorePercent >= passingScore;

    if (isSupabaseConfigured() && user) {
      const admin = getAdminClient();
      await admin.from("quiz_attempts").insert({
        user_id: userId,
        quiz_id: quizId,
        score: scorePercent,
        passed,
        answers,
      });
    }

    return NextResponse.json({
      score: scorePercent,
      correctCount,
      totalQuestions: questions.length,
      passed,
      passingScore,
      review,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Quiz submission failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
