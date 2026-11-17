import { NextRequest, NextResponse } from "next/server";
import { createClientServer } from "@/lib/supabase/server";
import { getAdminClient, isSupabaseConfigured } from "@/lib/supabase/admin";
import { generateCertificateId } from "@/lib/utils";

export async function POST(req: NextRequest) {
  try {
    const supabase = createClientServer();
    const { data: { user } } = await supabase.auth.getUser();

    const body = await req.json();
    const { courseId, lessonId, completed = true, demoUserId, studentName } = body;

    const userId = user?.id || demoUserId;
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (isSupabaseConfigured() && user) {
      const admin = getAdminClient();

      // Record lesson completion
      await admin.from("lesson_progress").upsert({
        user_id: userId,
        lesson_id: lessonId,
        course_id: courseId,
        completed,
        completed_at: new Date().toISOString(),
      }, { onConflict: "user_id,lesson_id" });

      // Calculate overall course progress
      const { count: totalLessons } = await admin
        .from("lessons")
        .select("*", { count: "exact", head: true })
        .eq("course_id", courseId);

      const { count: completedLessons } = await admin
        .from("lesson_progress")
        .select("*", { count: "exact", head: true })
        .eq("user_id", userId)
        .eq("course_id", courseId)
        .eq("completed", true);

      const progressPercent = totalLessons && totalLessons > 0
        ? Math.min(100, Math.round(((completedLessons || 0) / totalLessons) * 100))
        : 100;

      const isCompleted = progressPercent >= 100;

      // Update enrollment
      await admin.from("enrollments").upsert({
        user_id: userId,
        course_id: courseId,
        progress_percent: progressPercent,
        completed_at: isCompleted ? new Date().toISOString() : null,
        last_accessed_at: new Date().toISOString(),
      }, { onConflict: "user_id,course_id" });

      // If newly completed, generate certificate
      let certificate = null;
      if (isCompleted) {
        const { data: courseData } = await admin.from("courses").select("title").eq("id", courseId).single();
        const certNumber = generateCertificateId();
        const { data: newCert } = await admin.from("certificates").upsert({
          certificate_number: certNumber,
          user_id: userId,
          course_id: courseId,
          student_name: studentName || user.email?.split("@")[0] || "MissAlpha Student",
          course_title: courseData?.title || "AI Course",
          issue_date: new Date().toISOString(),
        }, { onConflict: "user_id,course_id" }).select().single();

        certificate = newCert;
      }

      return NextResponse.json({
        success: true,
        progressPercent,
        isCompleted,
        certificate,
      });
    }

    // In-memory fallback
    return NextResponse.json({
      success: true,
      progressPercent: 100,
      isCompleted: true,
      certificateNumber: generateCertificateId(),
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Progress update error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
