# MissAlpha AI Lab 🚀

> **Learn AI. Build Skills. Create the Future.**

MissAlpha AI Lab is a production-grade, commercial AI education platform designed with a dark futuristic theme, neon accents, and high-conversion learning mechanics. It offers 10 comprehensive masterclasses covering Prompt Engineering, ChatGPT, Google Gemini, Midjourney, AI Video Generation, Automation, Marketing, Business, and Hands-on Projects.

---

## ⚡ Technology Stack

- **Frontend**: Next.js 14 (App Router) + TypeScript
- **Styling**: Tailwind CSS + Custom Neon Glassmorphism
- **Authentication**: Supabase Auth (Email/Password, Sessions, Cookie Management via `@supabase/ssr`)
- **Database**: Supabase PostgreSQL with strict Row Level Security (RLS) policies
- **Payment Gateway**: Razorpay (HMAC-SHA256 signature verification, raw body webhooks, idempotent transactions)
- **Deployment**: Vercel ready
- **Icons**: Lucide React
- **Celebration Effects**: Canvas Confetti

---

## 💎 Pricing & Membership Model

- **Plan Name**: MissAlpha AI Lab Lifetime Premium
- **Price**: ₹99 (exactly 9900 paise)
- **Payment Type**: One-time payment
- **Access Duration**: Lifetime access
- **Motto**: *"Pay ₹99 once. Get lifetime premium learning access. No recurring charges."*

---

## 📁 Repository Structure

```
├── src/
│   ├── app/
│   │   ├── layout.tsx                # Futuristic Root Layout & metadata
│   │   ├── page.tsx                  # 10-section commercial homepage
│   │   ├── globals.css               # Futuristic glow, glassmorphism & gradients
│   │   ├── checkout/page.tsx         # Dedicated ₹99 checkout with Razorpay modal
│   │   ├── auth/
│   │   │   ├── login/page.tsx        # Student login with demo quick-fills
│   │   │   ├── register/page.tsx     # Student registration & email verification
│   │   │   ├── forgot-password/page.tsx # Password reset
│   │   │   └── callback/route.ts     # Supabase auth code exchange
│   │   ├── courses/
│   │   │   ├── page.tsx              # Public course catalog with search & filters
│   │   │   └── [slug]/
│   │   │       ├── page.tsx          # Course syllabus & preview
│   │   │       └── learn/page.tsx    # Interactive classroom with video, quiz & assignment
│   │   ├── dashboard/
│   │   │   ├── layout.tsx            # Protected student dashboard layout
│   │   │   ├── page.tsx              # Student overview with verified status & resume CTA
│   │   │   ├── courses/page.tsx      # All enrolled & available masterclasses
│   │   │   ├── certificates/page.tsx # Downloadable & printable verified certificates
│   │   │   ├── payments/page.tsx     # Payment history & official receipt viewer
│   │   │   └── profile/page.tsx      # Student profile & settings
│   │   ├── admin/
│   │   │   ├── layout.tsx            # Protected admin layout with server-side allow-list
│   │   │   ├── page.tsx              # Executive analytics (revenue, students, conversion)
│   │   │   ├── courses/page.tsx      # Course & lesson manager with video URL editor
│   │   │   ├── students/page.tsx     # Student management & premium toggles
│   │   │   └── payments/page.tsx     # Audit ledger of all Razorpay transactions
│   │   ├── api/
│   │   │   ├── payments/
│   │   │   │   ├── create-order/route.ts # Razorpay order creation (₹99 = 9900 paise)
│   │   │   │   ├── verify/route.ts       # HMAC-SHA256 signature verification & unlock
│   │   │   │   └── webhook/route.ts      # Raw body verification & idempotent updates
│   │   │   ├── courses/route.ts          # Course catalog & creation
│   │   │   ├── progress/route.ts         # Lesson completion & certificate generation
│   │   │   ├── quiz/submit/route.ts      # Automated quiz evaluation & scoring
│   │   │   └── admin/stats/route.ts      # Telemetry analytics
│   │   ├── privacy/page.tsx          # Privacy policy
│   │   └── terms/page.tsx            # Terms of service
│   ├── components/
│   │   ├── layout/                   # Navbar, Footer, DashboardNav
│   │   ├── home/                     # Hero, About, Courses, Tools, WhyUs, Benefits, Testimonials, Pricing, FAQ
│   │   └── checkout/                 # RazorpayButton client modal trigger
│   ├── lib/
│   │   ├── supabase/                 # Client, Server, and Service Role Admin utilities
│   │   ├── razorpay.ts               # Razorpay SDK initialization & HMAC cryptographic verifier
│   │   ├── data/initial-data.ts      # Initial 10 masterclasses, tools, and demo data
│   │   └── utils.ts                  # Currency formatters, certificate generators
│   └── types/index.ts                # TypeScript interfaces
├── supabase/
│   ├── schema.sql                    # Production PostgreSQL schema with full RLS policies
│   └── seed.sql                      # Initial seed dataset with courses, modules, lessons & quizzes
├── tests/
│   └── test-suite.mjs                # Integration test suite (16/16 automated assertions)
└── .env.example                      # Environment variables template
```

---

## 🛠️ Local Development Quickstart

### 1. Clone & Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Fill in your actual API keys:
```env
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Supabase Auth & Database
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# Razorpay Payments
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_your_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret

# Admin Authorization Allow-list
ADMIN_EMAILS=admin@missalpha.ai,founder@missalpha.ai
```

### 3. Run the Database Migrations
1. Open your Supabase project dashboard -> **SQL Editor**.
2. Run `supabase/schema.sql` to create all tables and RLS security policies.
3. Run `supabase/seed.sql` to populate all 10 courses, modules, lessons, and quizzes.

### 4. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Run the Integration Tests
```bash
npm test
```

---

## 💳 Razorpay Gateway Configuration

1. **Test Mode Credentials**:
   - Go to [Razorpay Dashboard](https://dashboard.razorpay.com/) -> **Settings** -> **API Keys**.
   - Generate test keys and place them in `NEXT_PUBLIC_RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET`.

2. **Webhooks Setup**:
   - Go to **Settings** -> **Webhooks** -> **Add New Webhook**.
   - URL: `https://your-domain.vercel.app/api/payments/webhook`
   - Secret: Choose a strong secret and set it in `RAZORPAY_WEBHOOK_SECRET`.
   - Active Events:
     - `order.paid`
     - `payment.captured`
     - `payment.failed`

3. **Production Switch**:
   - In production on Vercel, replace `rzp_test_...` with your live `rzp_live_...` credentials.
   - The platform will immediately process live UPI, cards, and net banking transactions for ₹99.

---

## 🔒 Production Security Checklist

- [x] **No Secret Key Leakage**: `RAZORPAY_KEY_SECRET` and `SUPABASE_SERVICE_ROLE_KEY` are strictly server-side environment variables.
- [x] **Cryptographic Payment Verification**: Payment signatures are validated on the server using `crypto.timingSafeEqual` HMAC-SHA256. Frontend callbacks never grant premium access directly.
- [x] **Raw Body Webhook Verification**: `x-razorpay-signature` is verified against the raw text request body.
- [x] **Idempotency**: Webhook events check `webhook_events` table before applying state updates, preventing duplicate billing or multiple grants.
- [x] **Client Tamper Prevention**: Row Level Security (RLS) ensures users cannot modify `is_premium` or `is_admin` in their profiles.
- [x] **Admin Authorization**: Admin routes check server-side against an explicit email allow-list (`admin@missalpha.ai`). Client-side role claims are never trusted.

---

## 🚀 Vercel Deployment

1. Push your repository to GitHub.
2. In the [Vercel Dashboard](https://vercel.com/new), select your repository.
3. Set the Environment Variables matching `.env.example`.
4. Deploy! Next.js 14 App Router builds automatically with static generation and optimized serverless endpoints.
