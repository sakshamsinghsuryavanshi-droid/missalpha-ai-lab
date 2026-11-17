import { NextRequest, NextResponse } from "next/server";
import { INITIAL_COURSES } from "@/lib/data/initial-data";
import { createClientServer } from "@/lib/supabase/server";
import { getAdminClient, isSupabaseConfigured, isAdminUser } from "@/lib/supabase/admin";

export async function GET() {
  try {
    if (isSupabaseConfigured()) {
      const supabase = createClientServer();
      const { data: courses, error } = await supabase
        .from("courses")
        .select(`
          *,
          modules:modules(
            *,
            lessons:lessons(*)
          )
        `)
        .order("order_index", { ascending: true });

      if (!error && courses && courses.length > 0) {
        return NextResponse.json({ courses });
      }
    }

    return NextResponse.json({ courses: INITIAL_COURSES });
  } catch (err: unknown) {
    console.error("Courses fetch error:", err);
    return NextResponse.json({ courses: INITIAL_COURSES });
  }
}

export async function POST(req: NextRequest) {
  try {
    const supabase = createClientServer();
    const { data: { user } } = await supabase.auth.getUser();

    // Check admin authorization
    if (!isAdminUser(user?.email)) {
      return NextResponse.json({ error: "Unauthorized. Admin privileges required." }, { status: 403 });
    }

    const body = await req.json();
    const { title, slug, tagline, description, category, level, duration, thumbnail_url, badge_text, is_premium } = body;

    if (!title || !slug || !description) {
      return NextResponse.json({ error: "Missing required course fields (title, slug, description)" }, { status: 400 });
    }

    if (isSupabaseConfigured()) {
      const admin = getAdminClient();
      const { data: newCourse, error } = await admin.from("courses").insert({
        title,
        slug,
        tagline,
        description,
        category: category || "Generative AI",
        level: level || "Beginner",
        duration: duration || "4 Hours",
        thumbnail_url: thumbnail_url || "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80",
        badge_text,
        is_premium: is_premium ?? true,
        published: true,
      }).select().single();

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
      }

      return NextResponse.json({ success: true, course: newCourse });
    }

    return NextResponse.json({ success: true, message: "Course saved successfully (in-memory mode)" });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to create course";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
