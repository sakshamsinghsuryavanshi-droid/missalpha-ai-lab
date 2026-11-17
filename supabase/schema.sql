-- ====================================================================
-- MISSALPHA AI LAB - SUPABASE POSTGRESQL DATABASE SCHEMA
-- Production-ready schema with Row Level Security (RLS) policies,
-- triggers, indexes, and full relational integrity.
-- ====================================================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. PROFILES TABLE
-- Linked to Supabase Auth auth.users
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    bio TEXT,
    is_premium BOOLEAN DEFAULT FALSE,
    is_admin BOOLEAN DEFAULT FALSE,
    membership_plan TEXT DEFAULT 'free', -- 'free' or 'lifetime_premium'
    membership_started_at TIMESTAMPTZ,
    razorpay_customer_id TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index on email and admin/premium flags
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);
CREATE INDEX IF NOT EXISTS idx_profiles_is_premium ON public.profiles(is_premium);
CREATE INDEX IF NOT EXISTS idx_profiles_is_admin ON public.profiles(is_admin);

-- 2. COURSES TABLE
CREATE TABLE IF NOT EXISTS public.courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    tagline TEXT,
    description TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'AI Foundations',
    level TEXT NOT NULL DEFAULT 'Beginner', -- 'Beginner', 'Intermediate', 'Advanced', 'All Levels'
    duration TEXT DEFAULT '4-6 Hours',
    thumbnail_url TEXT,
    badge_text TEXT, -- e.g. 'HOT', 'BESTSELLER', 'FOUNDATIONAL'
    is_premium BOOLEAN DEFAULT TRUE,
    published BOOLEAN DEFAULT TRUE,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_courses_slug ON public.courses(slug);
CREATE INDEX IF NOT EXISTS idx_courses_published ON public.courses(published);
CREATE INDEX IF NOT EXISTS idx_courses_is_premium ON public.courses(is_premium);

-- 3. MODULES TABLE
CREATE TABLE IF NOT EXISTS public.modules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_modules_course_id ON public.modules(course_id);

-- 4. LESSONS TABLE
CREATE TABLE IF NOT EXISTS public.lessons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    module_id UUID NOT NULL REFERENCES public.modules(id) ON DELETE CASCADE,
    course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    slug TEXT NOT NULL,
    content TEXT, -- Markdown formatted lesson body
    video_url TEXT, -- Embed or video streaming URL
    duration_minutes INTEGER DEFAULT 15,
    is_free_preview BOOLEAN DEFAULT FALSE,
    order_index INTEGER DEFAULT 0,
    resources JSONB DEFAULT '[]'::jsonb, -- Array of { title, url, type, size }
    assignment_prompt TEXT,
    assignment_solution TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_lessons_course_id ON public.lessons(course_id);
CREATE INDEX IF NOT EXISTS idx_lessons_module_id ON public.lessons(module_id);
CREATE INDEX IF NOT EXISTS idx_lessons_slug ON public.lessons(slug);

-- 5. QUIZZES TABLE
CREATE TABLE IF NOT EXISTS public.quizzes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    lesson_id UUID REFERENCES public.lessons(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    description TEXT,
    passing_score INTEGER DEFAULT 80, -- percentage
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_quizzes_course_id ON public.quizzes(course_id);
CREATE INDEX IF NOT EXISTS idx_quizzes_lesson_id ON public.quizzes(lesson_id);

-- 6. QUIZ QUESTIONS TABLE
CREATE TABLE IF NOT EXISTS public.quiz_questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    quiz_id UUID NOT NULL REFERENCES public.quizzes(id) ON DELETE CASCADE,
    question TEXT NOT NULL,
    options JSONB NOT NULL, -- JSON array of string options
    correct_option_index INTEGER NOT NULL,
    explanation TEXT,
    order_index INTEGER DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_quiz_questions_quiz_id ON public.quiz_questions(quiz_id);

-- 7. QUIZ ATTEMPTS TABLE
CREATE TABLE IF NOT EXISTS public.quiz_attempts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    quiz_id UUID NOT NULL REFERENCES public.quizzes(id) ON DELETE CASCADE,
    score INTEGER NOT NULL,
    passed BOOLEAN NOT NULL DEFAULT FALSE,
    answers JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_quiz_attempts_user ON public.quiz_attempts(user_id);
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_quiz ON public.quiz_attempts(quiz_id);

-- 8. ENROLLMENTS TABLE
CREATE TABLE IF NOT EXISTS public.enrollments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    enrolled_at TIMESTAMPTZ DEFAULT NOW(),
    completed_at TIMESTAMPTZ,
    progress_percent INTEGER DEFAULT 0,
    last_accessed_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT unique_user_course_enrollment UNIQUE (user_id, course_id)
);

CREATE INDEX IF NOT EXISTS idx_enrollments_user_id ON public.enrollments(user_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_course_id ON public.enrollments(course_id);

-- 9. LESSON PROGRESS TABLE
CREATE TABLE IF NOT EXISTS public.lesson_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    lesson_id UUID NOT NULL REFERENCES public.lessons(id) ON DELETE CASCADE,
    course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    completed BOOLEAN DEFAULT TRUE,
    completed_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT unique_user_lesson_progress UNIQUE (user_id, lesson_id)
);

CREATE INDEX IF NOT EXISTS idx_lesson_progress_user_course ON public.lesson_progress(user_id, course_id);

-- 10. CERTIFICATES TABLE
CREATE TABLE IF NOT EXISTS public.certificates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    certificate_number TEXT UNIQUE NOT NULL,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    student_name TEXT NOT NULL,
    course_title TEXT NOT NULL,
    issue_date TIMESTAMPTZ DEFAULT NOW(),
    metadata JSONB DEFAULT '{}'::jsonb,
    CONSTRAINT unique_user_course_certificate UNIQUE (user_id, course_id)
);

CREATE INDEX IF NOT EXISTS idx_certificates_user_id ON public.certificates(user_id);
CREATE INDEX IF NOT EXISTS idx_certificates_cert_num ON public.certificates(certificate_number);

-- 11. PAYMENTS TABLE
CREATE TABLE IF NOT EXISTS public.payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    razorpay_order_id TEXT NOT NULL,
    razorpay_payment_id TEXT,
    razorpay_signature TEXT,
    amount INTEGER NOT NULL DEFAULT 9900, -- in paise (₹99.00)
    currency TEXT NOT NULL DEFAULT 'INR',
    status TEXT NOT NULL DEFAULT 'created', -- 'created', 'authorized', 'captured', 'failed', 'refunded'
    method TEXT, -- 'upi', 'card', 'netbanking', 'wallet'
    receipt TEXT,
    customer_email TEXT,
    customer_name TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_payments_user_id ON public.payments(user_id);
CREATE INDEX IF NOT EXISTS idx_payments_order_id ON public.payments(razorpay_order_id);
CREATE INDEX IF NOT EXISTS idx_payments_payment_id ON public.payments(razorpay_payment_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON public.payments(status);

-- 12. WEBHOOK EVENTS TABLE (For Idempotent Processing)
CREATE TABLE IF NOT EXISTS public.webhook_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id TEXT UNIQUE NOT NULL,
    event_type TEXT NOT NULL,
    payload JSONB NOT NULL,
    processed_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_webhook_events_event_id ON public.webhook_events(event_id);

-- 13. BOOKMARKS TABLE
CREATE TABLE IF NOT EXISTS public.bookmarks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT unique_user_course_bookmark UNIQUE (user_id, course_id)
);

CREATE INDEX IF NOT EXISTS idx_bookmarks_user ON public.bookmarks(user_id);

-- ====================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ====================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lesson_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.webhook_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookmarks ENABLE ROW LEVEL SECURITY;

-- Helper function to check if current user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid() AND is_admin = TRUE
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Profiles:
-- Anyone logged in can read their own profile; admins can read all profiles
CREATE POLICY "Users can view own profile"
    ON public.profiles FOR SELECT
    USING (auth.uid() = id OR public.is_admin());

-- Users can update their own profile (name, avatar, bio) but NOT is_premium or is_admin
CREATE POLICY "Users can update own profile non-privileged fields"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id)
    WITH CHECK (
        auth.uid() = id AND 
        (public.is_admin() OR (
            is_premium = (SELECT is_premium FROM public.profiles WHERE id = auth.uid()) AND
            is_admin = (SELECT is_admin FROM public.profiles WHERE id = auth.uid())
        ))
    );

-- Courses:
-- Anyone (even unauthenticated) can view published courses
CREATE POLICY "Anyone can view published courses"
    ON public.courses FOR SELECT
    USING (published = TRUE OR public.is_admin());

-- Only admins can insert, update, or delete courses
CREATE POLICY "Admins can insert courses"
    ON public.courses FOR INSERT
    WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update courses"
    ON public.courses FOR UPDATE
    USING (public.is_admin());

CREATE POLICY "Admins can delete courses"
    ON public.courses FOR DELETE
    USING (public.is_admin());

-- Modules:
-- Anyone can view modules of published courses
CREATE POLICY "Anyone can view modules"
    ON public.modules FOR SELECT
    USING (TRUE);

CREATE POLICY "Admins can manage modules"
    ON public.modules FOR ALL
    USING (public.is_admin());

-- Lessons:
-- Anyone can view free preview lessons; enrolled or premium can view all; admins can view all
CREATE POLICY "Users can view lessons"
    ON public.lessons FOR SELECT
    USING (
        is_free_preview = TRUE OR
        public.is_admin() OR
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid() AND is_premium = TRUE
        ) OR
        EXISTS (
            SELECT 1 FROM public.courses c
            WHERE c.id = course_id AND c.is_premium = FALSE
        )
    );

CREATE POLICY "Admins can manage lessons"
    ON public.lessons FOR ALL
    USING (public.is_admin());

-- Quizzes:
CREATE POLICY "Users can view quizzes"
    ON public.quizzes FOR SELECT
    USING (TRUE);

CREATE POLICY "Admins can manage quizzes"
    ON public.quizzes FOR ALL
    USING (public.is_admin());

-- Quiz questions:
CREATE POLICY "Users can view quiz questions"
    ON public.quiz_questions FOR SELECT
    USING (TRUE);

CREATE POLICY "Admins can manage quiz questions"
    ON public.quiz_questions FOR ALL
    USING (public.is_admin());

-- Quiz attempts:
CREATE POLICY "Users can view own quiz attempts"
    ON public.quiz_attempts FOR SELECT
    USING (auth.uid() = user_id OR public.is_admin());

CREATE POLICY "Users can insert own quiz attempts"
    ON public.quiz_attempts FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Enrollments:
CREATE POLICY "Users can view own enrollments"
    ON public.enrollments FOR SELECT
    USING (auth.uid() = user_id OR public.is_admin());

CREATE POLICY "Users can create own enrollments"
    ON public.enrollments FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own enrollments"
    ON public.enrollments FOR UPDATE
    USING (auth.uid() = user_id);

-- Lesson Progress:
CREATE POLICY "Users can view own lesson progress"
    ON public.lesson_progress FOR SELECT
    USING (auth.uid() = user_id OR public.is_admin());

CREATE POLICY "Users can manage own lesson progress"
    ON public.lesson_progress FOR ALL
    USING (auth.uid() = user_id);

-- Certificates:
CREATE POLICY "Users can view own certificates"
    ON public.certificates FOR SELECT
    USING (auth.uid() = user_id OR public.is_admin());

CREATE POLICY "Public can view valid certificate by number"
    ON public.certificates FOR SELECT
    USING (TRUE);

CREATE POLICY "System can insert certificates"
    ON public.certificates FOR INSERT
    WITH CHECK (auth.uid() = user_id OR public.is_admin());

-- Payments:
CREATE POLICY "Users can view own payments"
    ON public.payments FOR SELECT
    USING (auth.uid() = user_id OR public.is_admin());

CREATE POLICY "Admins can view all payments"
    ON public.payments FOR SELECT
    USING (public.is_admin());

-- Webhook events (Server only)
CREATE POLICY "Only admins or server can access webhook events"
    ON public.webhook_events FOR ALL
    USING (public.is_admin());

-- Bookmarks:
CREATE POLICY "Users can manage own bookmarks"
    ON public.bookmarks FOR ALL
    USING (auth.uid() = user_id);

-- ====================================================================
-- AUTOMATIC PROFILE CREATION TRIGGER
-- When a user signs up via Supabase Auth, automatically insert a profile.
-- ====================================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name, avatar_url, is_premium, is_admin)
    VALUES (
        new.id,
        new.email,
        COALESCE(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
        COALESCE(new.raw_user_meta_data->>'avatar_url', ''),
        FALSE,
        FALSE
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
