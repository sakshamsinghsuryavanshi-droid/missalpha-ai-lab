export type UserRole = 'student' | 'admin';

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  bio?: string;
  is_premium: boolean;
  is_admin: boolean;
  membership_plan: 'free' | 'lifetime_premium';
  membership_started_at?: string;
  razorpay_customer_id?: string;
  created_at: string;
  updated_at?: string;
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  description: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  duration: string;
  lessons_count?: number;
  thumbnail_url: string;
  badge_text?: string;
  is_premium: boolean;
  published: boolean;
  order_index: number;
  created_at: string;
  modules?: CourseModule[];
}

export interface CourseResource {
  title: string;
  url: string;
  type: 'pdf' | 'code' | 'doc' | 'link';
  size?: string;
}

export interface Lesson {
  id: string;
  module_id: string;
  course_id: string;
  title: string;
  slug: string;
  content: string;
  video_url: string;
  duration_minutes: number;
  is_free_preview: boolean;
  order_index: number;
  resources: CourseResource[];
  assignment_prompt?: string;
  assignment_solution?: string;
  quiz?: Quiz;
  completed?: boolean;
}

export interface CourseModule {
  id: string;
  course_id: string;
  title: string;
  description?: string;
  order_index: number;
  lessons: Lesson[];
}

export interface QuizQuestion {
  id: string;
  quiz_id: string;
  question: string;
  options: string[];
  correct_option_index: number;
  explanation: string;
  order_index: number;
}

export interface Quiz {
  id: string;
  course_id: string;
  lesson_id?: string;
  title: string;
  description?: string;
  passing_score: number;
  questions: QuizQuestion[];
}

export interface QuizAttempt {
  id: string;
  user_id: string;
  quiz_id: string;
  score: number;
  passed: boolean;
  answers: Record<string, number>;
  created_at: string;
}

export interface Enrollment {
  id: string;
  user_id: string;
  course_id: string;
  enrolled_at: string;
  completed_at?: string;
  progress_percent: number;
  last_accessed_at: string;
  course?: Course;
}

export interface PaymentRecord {
  id: string;
  user_id: string;
  razorpay_order_id: string;
  razorpay_payment_id?: string;
  razorpay_signature?: string;
  amount: number; // in paise, e.g. 9900 = ₹99
  currency: string;
  status: 'created' | 'authorized' | 'captured' | 'failed' | 'refunded';
  method?: string;
  receipt?: string;
  customer_email?: string;
  customer_name?: string;
  created_at: string;
  updated_at?: string;
}

export interface Certificate {
  id: string;
  certificate_number: string;
  user_id: string;
  course_id: string;
  student_name: string;
  course_title: string;
  issue_date: string;
}

export interface AITool {
  name: string;
  category: string;
  description: string;
  icon: string;
  popularFor: string;
  link: string;
  badge?: string;
}
