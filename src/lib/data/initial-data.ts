import { Course, AITool } from "@/types";

export const INITIAL_COURSES: Course[] = [
  {
    id: "c1111111-1111-1111-1111-111111111111",
    title: "AI Fundamentals",
    slug: "ai-fundamentals",
    tagline: "Understand core artificial intelligence, neural networks, LLMs and modern computation.",
    description: "Master the bedrock principles of modern Artificial Intelligence. From foundational machine learning algorithms to transformers, generative models, and ethical AI deployment, this course transforms beginners into AI-literate practitioners ready to conquer the modern tech landscape.",
    category: "Foundations",
    level: "Beginner",
    duration: "4 Hours (14 Lessons)",
    lessons_count: 14,
    thumbnail_url: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80",
    badge_text: "FREE STARTER",
    is_premium: false,
    published: true,
    order_index: 1,
    created_at: "2025-01-15T00:00:00Z",
    modules: [
      {
        id: "m1111111-0001",
        course_id: "c1111111-1111-1111-1111-111111111111",
        title: "Module 1: The AI Paradigm Shift",
        description: "Demystifying artificial intelligence, deterministic vs probabilistic software.",
        order_index: 1,
        lessons: [
          {
            id: "l1111111-0001",
            module_id: "m1111111-0001",
            course_id: "c1111111-1111-1111-1111-111111111111",
            title: "Welcome to MissAlpha AI Lab & The Cognitive Revolution",
            slug: "welcome-to-missalpha-ai-lab",
            content: `### Welcome to MissAlpha AI Lab

Artificial Intelligence represents the most foundational computing evolution since the invention of the graphical user interface and the Internet.

In this introductory lesson, we establish the mental models required to understand how probabilistic machine learning models differ fundamentally from deterministic if-then software code.

#### Key Takeaways:
1. **Deterministic vs Probabilistic Systems**:
   - Traditional code runs fixed conditional rules.
   - Machine learning algorithms infer patterns from statistical representations across billions of parameters.
2. **The Evolution of Generative AI**:
   - 1950s - 1980s: Symbolic AI & Expert Systems
   - 2012: The AlexNet Deep Learning Breakthrough
   - 2017: Transformer Architectures ('Attention is All You Need')
   - 2023+: Multi-Modal Frontier Reasoning Models
3. **The MissAlpha Advantage**:
   - We focus on practical, commercially viable AI application: building products, automating workflows, generating business revenue, and becoming 10x more valuable in the knowledge economy.`,
            video_url: "https://www.youtube.com/embed/aircAruvnKk",
            duration_minutes: 14,
            is_free_preview: true,
            order_index: 1,
            resources: [
              { title: "MissAlpha AI Foundations Guide (PDF)", url: "#", type: "pdf", size: "1.4 MB" },
              { title: "AI vs Software Cheat Sheet", url: "#", type: "link" }
            ],
            assignment_prompt: "Write a 3-paragraph explanation comparing how an AI model generates answers versus how a traditional search engine returns indexed results.",
            assignment_solution: "A search engine crawls web pages and indexes keywords into an inverted database index, returning exact text matches. A generative AI model does not look up stored articles; instead, it synthesizes new responses token-by-token based on probability weights learned during pre-training across semantic relationships.",
            quiz: {
              id: "q1111111-0001",
              course_id: "c1111111-1111-1111-1111-111111111111",
              lesson_id: "l1111111-0001",
              title: "AI Foundations Checkpoint",
              passing_score: 80,
              questions: [
                {
                  id: "q1",
                  quiz_id: "q1111111-0001",
                  question: "How do LLMs fundamentally generate text responses?",
                  options: [
                    "By querying a hidden Google search index",
                    "By predicting the most probable next token iteratively based on learned context",
                    "By copying and pasting pre-written paragraphs from Wikipedia",
                    "By running hardcoded if/else statements written by engineers"
                  ],
                  correct_option_index: 1,
                  explanation: "LLMs are autoregressive models that predict subsequent tokens based on probability distributions computed by transformer attention mechanisms.",
                  order_index: 1
                },
                {
                  id: "q2",
                  quiz_id: "q1111111-0001",
                  question: "What seminal architecture was introduced in the 2017 paper 'Attention Is All You Need'?",
                  options: [
                    "Convolutional Neural Networks (CNN)",
                    "Transformer Architecture",
                    "Recurrent Neural Networks (RNN)",
                    "Random Forests"
                  ],
                  correct_option_index: 1,
                  explanation: "The Transformer architecture replaced recurrence with multi-head self-attention, unlocking massive parallel pre-training.",
                  order_index: 2
                }
              ]
            }
          },
          {
            id: "l1111111-0002",
            module_id: "m1111111-0001",
            course_id: "c1111111-1111-1111-1111-111111111111",
            title: "Supervised vs Unsupervised vs RLHF",
            slug: "supervised-vs-unsupervised-rlhf",
            content: `### The Three Pillars of Machine Learning

Machine learning can be partitioned into distinct training strategies:

#### 1. Supervised Learning
The model is provided with labeled data pairs $(X, Y)$. For example:
- Input: Image of a skin lesion $\\rightarrow$ Output: Malignant or Benign
- Input: Email text $\\rightarrow$ Output: Spam or Not Spam

#### 2. Unsupervised Learning
The model analyzes unlabeled data to uncover latent structures, clusters, and representations. Pre-training LLMs on trillions of internet tokens is largely self-supervised next-token prediction.

#### 3. Reinforcement Learning from Human Feedback (RLHF)
Raw pre-trained models often output unstructured, hallucinated, or unsafe ramblings. RLHF introduces:
- Human preference rating datasets
- Training a Reward Model (RM)
- Proximal Policy Optimization (PPO) or Direct Preference Optimization (DPO) to align outputs with helpfulness and safety.`,
            video_url: "https://www.youtube.com/embed/z-EtmaFJieY",
            duration_minutes: 18,
            is_free_preview: true,
            order_index: 2,
            resources: [
              { title: "Machine Learning Paradigms Infographic", url: "#", type: "pdf", size: "890 KB" }
            ],
            assignment_prompt: "List 2 products you use daily and describe how RLHF makes their AI assistants friendlier and more conversational.",
            quiz: {
              id: "q1111111-0002",
              course_id: "c1111111-1111-1111-1111-111111111111",
              lesson_id: "l1111111-0002",
              title: "Training Paradigms Quiz",
              passing_score: 80,
              questions: [
                {
                  id: "q3",
                  quiz_id: "q1111111-0002",
                  question: "What role does RLHF play in modern AI chatbots?",
                  options: [
                    "It translates code into machine binary",
                    "It aligns base model predictions with human conversational expectations and safety guidelines",
                    "It speeds up GPU hardware clock rates",
                    "It compresses image files"
                  ],
                  correct_option_index: 1,
                  explanation: "RLHF fine-tunes base foundation models to make them steerable, conversational, and aligned with human values.",
                  order_index: 1
                }
              ]
            }
          }
        ]
      },
      {
        id: "m1111111-0002",
        course_id: "c1111111-1111-1111-1111-111111111111",
        title: "Module 2: Tokenization & Embeddings",
        description: "How computers convert words, images, and audio into mathematical vector spaces.",
        order_index: 2,
        lessons: [
          {
            id: "l1111111-0003",
            module_id: "m1111111-0002",
            course_id: "c1111111-1111-1111-1111-111111111111",
            title: "Demystifying Tokens, Embeddings and Vector Search",
            slug: "demystifying-tokens-embeddings",
            content: `### How AI Sees the World: Vectors & Tokens

AI models do not read human letters directly; they process numbers.

#### Step 1: Byte-Pair Tokenization
Sentences are parsed into token integers:
\`\`\`
"Artificial intelligence is incredible" -> [23871, 4438, 318, 11403]
\`\`\`
- On average, 1 token = 4 English characters or ~0.75 words.
- Pricing for APIs (OpenAI, Anthropic, Gemini) is charged per 1,000 or 1,000,000 tokens.

#### Step 2: High-Dimensional Semantic Embeddings
Each token is projected into an embedding space (e.g., 1,536 dimensions).
- Distance between vectors in this space represents conceptual similarity.
- Famous example: Vector("King") - Vector("Man") + Vector("Woman") $\\approx$ Vector("Queen").
- Vector databases (Pinecone, pgvector, Weaviate) enable Retrieval-Augmented Generation (RAG).`,
            video_url: "https://www.youtube.com/embed/wjZofJX0v4U",
            duration_minutes: 22,
            is_free_preview: false,
            order_index: 1,
            resources: [
              { title: "Vector Embeddings Interactive Visualizer", url: "#", type: "link" }
            ],
            assignment_prompt: "Calculate the estimated token count of a 2,500-word contract and write down the approximate API cost for processing 100 such contracts on GPT-4o mini.",
          }
        ]
      }
    ]
  },
  {
    id: "c2222222-2222-2222-2222-222222222222",
    title: "ChatGPT Masterclass",
    slug: "chatgpt-masterclass",
    tagline: "Unlock the ultimate cognitive copilot: advanced reasoning, custom GPTs and enterprise workflows.",
    description: "Go beyond casual chatting to build enterprise-grade reasoning workflows. Master OpenAI Advanced Data Analysis, Custom GPT creation, system prompt architecture, API integration patterns, and zero-shot reasoning techniques to 10x your professional productivity.",
    category: "Generative AI",
    level: "All Levels",
    duration: "5.5 Hours (16 Lessons)",
    lessons_count: 16,
    thumbnail_url: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80",
    badge_text: "BESTSELLER",
    is_premium: true,
    published: true,
    order_index: 2,
    created_at: "2025-01-20T00:00:00Z",
    modules: [
      {
        id: "m2222222-0001",
        course_id: "c2222222-2222-2222-2222-222222222222",
        title: "Module 1: Advanced Prompting Architectures",
        order_index: 1,
        lessons: [
          {
            id: "l2222222-0001",
            module_id: "m2222222-0001",
            course_id: "c2222222-2222-2222-2222-222222222222",
            title: "The System Prompt & Role Framing Blueprint",
            slug: "system-prompt-role-framing",
            content: `### Master Level System Prompting

The difference between mediocre ChatGPT outputs and world-class domain expertise lies in the structural framing of your prompts.

#### The 5-Part Enterprise Prompt Framework:
1. **Persona & Domain Expertise**: "Act as a Senior Principal Software Architect with 15 years designing distributed fintech systems..."
2. **Context & Constraints**: "We have 50,000 concurrent websocket connections. Database writes are throttled to 5,000 IOPS..."
3. **Execution Instructions**: "Break down the architectural tradeoffs step-by-step. Include diagrams in Mermaid.js format..."
4. **Negative Constraints**: "Do NOT suggest cloud provider vendor-lock solutions. Avoid generic high-level platitudes..."
5. **Output Specification**: "Format as a structured markdown RFC with Executive Summary, Technical Architecture, and Risk Matrix."`,
            video_url: "https://www.youtube.com/embed/b-TswFq32tA",
            duration_minutes: 20,
            is_free_preview: true,
            order_index: 1,
            resources: [
              { title: "MissAlpha 50+ Enterprise Prompt Templates", url: "#", type: "pdf", size: "3.2 MB" }
            ],
            assignment_prompt: "Design a complete Custom GPT system prompt for a legal contract auditor specializing in freelance NDA reviews."
          }
        ]
      }
    ]
  },
  {
    id: "c3333333-3333-3333-3333-333333333333",
    title: "Google Gemini Masterclass",
    slug: "google-gemini-masterclass",
    tagline: "Harness multi-modal AI with massive 2M token context windows, audio, video and code.",
    description: "Master Google state-of-the-art multimodal AI model. Learn how to ingest 2-hour videos, full audio transcripts, 100,000-line codebases, and massive PDF documents simultaneously using Gemini 1.5 Pro and Flash with Google AI Studio and Vertex AI.",
    category: "Generative AI",
    level: "Intermediate",
    duration: "4.5 Hours (12 Lessons)",
    lessons_count: 12,
    thumbnail_url: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=800&q=80",
    badge_text: "TRENDING",
    is_premium: true,
    published: true,
    order_index: 3,
    created_at: "2025-02-01T00:00:00Z"
  },
  {
    id: "c4444444-4444-4444-4444-444444444444",
    title: "Prompt Engineering",
    slug: "prompt-engineering",
    tagline: "The science of steering LLMs: Few-shot, Chain-of-Thought, ReAct frameworks and deterministic outputs.",
    description: "Prompt engineering is the new programming language of the cognitive era. Learn formal prompt design methodologies including Few-Shot Learning, Chain-of-Thought (CoT), Tree of Thoughts (ToT), Directional Stimulus, and programmatic output structuring (JSON schema, Pydantic).",
    category: "Engineering",
    level: "All Levels",
    duration: "5 Hours (15 Lessons)",
    lessons_count: 15,
    thumbnail_url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
    badge_text: "HIGH DEMAND",
    is_premium: true,
    published: true,
    order_index: 4,
    created_at: "2025-02-05T00:00:00Z"
  },
  {
    id: "c5555555-5555-5555-5555-555555555555",
    title: "AI Image Generation",
    slug: "ai-image-generation",
    tagline: "Create photorealistic imagery, concept art, and brand visuals with Midjourney v6 & Flux.",
    description: "Unleash world-class visual generation capabilities. Master Midjourney v6 parameters, Flux.1 Schnell & Dev, Stable Diffusion XL LoRA fine-tuning, ControlNet pose conditioning, upscaling, inpainting, and commercial product photography reproduction without expensive studios.",
    category: "Creative AI",
    level: "All Levels",
    duration: "6 Hours (18 Lessons)",
    lessons_count: 18,
    thumbnail_url: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?auto=format&fit=crop&w=800&q=80",
    badge_text: "CREATOR FAVORITE",
    is_premium: true,
    published: true,
    order_index: 5,
    created_at: "2025-02-10T00:00:00Z"
  },
  {
    id: "c6666666-6666-6666-6666-666666666666",
    title: "AI Video Generation",
    slug: "ai-video-generation",
    tagline: "Produce cinematic videos, AI avatars and viral social clips with Runway Gen-3, Kling and Sora.",
    description: "Turn text and reference frames into breathtaking 4K cinematic video. Master camera motion trajectories, consistent character rendering, lipsync avatars with HeyGen and ElevenLabs, and hybrid editing workflows combining AI generators with modern video timelines.",
    category: "Creative AI",
    level: "Intermediate",
    duration: "5 Hours (14 Lessons)",
    lessons_count: 14,
    thumbnail_url: "https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=800&q=80",
    badge_text: "CUTTING EDGE",
    is_premium: true,
    published: true,
    order_index: 6,
    created_at: "2025-02-12T00:00:00Z"
  },
  {
    id: "c7777777-7777-7777-7777-777777777777",
    title: "AI Automation",
    slug: "ai-automation",
    tagline: "Build autonomous agentic workflows with Zapier, Make.com, n8n and Python scripts.",
    description: "Replace manual human busywork with autonomous self-healing AI agents. Connect CRM records, email replies, web scrapers, and database alerts into end-to-end multi-step pipelines running 24/7 without human intervention.",
    category: "Productivity & Ops",
    level: "Intermediate",
    duration: "6.5 Hours (18 Lessons)",
    lessons_count: 18,
    thumbnail_url: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    badge_text: "ROI BOOSTER",
    is_premium: true,
    published: true,
    order_index: 7,
    created_at: "2025-02-14T00:00:00Z"
  },
  {
    id: "c8888888-8888-8888-8888-888888888888",
    title: "AI for Digital Marketing",
    slug: "ai-for-digital-marketing",
    tagline: "Dominate SEO, high-converting ad copy, social calendars, and hyper-personalized email campaigns.",
    description: "Supercharge customer acquisition and retention. Learn programmatic content clustering, programmatic SEO with AI, automated A/B test ad copywriting, viral Twitter/LinkedIn post engines, and dynamic email personalization at scale.",
    category: "Business & Marketing",
    level: "All Levels",
    duration: "4.5 Hours (13 Lessons)",
    lessons_count: 13,
    thumbnail_url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    badge_text: "CAREER ACCELERATOR",
    is_premium: true,
    published: true,
    order_index: 8,
    created_at: "2025-02-16T00:00:00Z"
  },
  {
    id: "c9999999-9999-9999-9999-999999999999",
    title: "AI for Business",
    slug: "ai-for-business",
    tagline: "Strategic AI implementation, executive decision frameworks, legal risk and enterprise ROI.",
    description: "Equip entrepreneurs, executives, and managers to lead AI transformation. Learn how to audit operational bottlenecks, calculate AI project ROI, manage data governance and privacy risks, and negotiate enterprise AI software contracts.",
    category: "Business & Marketing",
    level: "Intermediate",
    duration: "4 Hours (11 Lessons)",
    lessons_count: 11,
    thumbnail_url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    badge_text: "EXECUTIVE",
    is_premium: true,
    published: true,
    order_index: 9,
    created_at: "2025-02-18T00:00:00Z"
  },
  {
    id: "caaaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
    title: "Practical AI Projects",
    slug: "practical-ai-projects",
    tagline: "Build 5 real-world AI applications: Chatbot, Document Q&A, Voice Assistant, Lead Scraper & Vision App.",
    description: "The capstone hands-on experience. Build, test, and deploy 5 fully operational AI applications from scratch using modern developer stacks, API keys, vector databases, and responsive web user interfaces.",
    category: "Hands-on Projects",
    level: "Advanced",
    duration: "7 Hours (20 Lessons)",
    lessons_count: 20,
    thumbnail_url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
    badge_text: "PORTFOLIO BUILDER",
    is_premium: true,
    published: true,
    order_index: 10,
    created_at: "2025-02-20T00:00:00Z"
  }
];

export const POPULAR_AI_TOOLS: AITool[] = [
  {
    name: "ChatGPT (GPT-4o)",
    category: "LLM & Reasoning",
    description: "Industry-standard conversational reasoning, data analysis, custom GPTs, and vision processing.",
    icon: "Bot",
    popularFor: "Research, Coding, Writing",
    link: "https://chatgpt.com",
    badge: "Most Popular"
  },
  {
    name: "Google Gemini 1.5",
    category: "Multimodal AI",
    description: "2-Million token context window capable of analyzing hours of video, audio, and large repositories.",
    icon: "Sparkles",
    popularFor: "Video & Large Doc Analysis",
    link: "https://gemini.google.com",
    badge: "Largest Context"
  },
  {
    name: "Claude 3.5 Sonnet",
    category: "Code & Analysis",
    description: "Leading coding agent intelligence with Artifacts interactive UI sandbox.",
    icon: "Terminal",
    popularFor: "Software Engineering, Artifacts",
    link: "https://claude.ai",
    badge: "Top Coder"
  },
  {
    name: "Midjourney v6",
    category: "Image Generation",
    description: "Hyper-realistic conceptual art, commercial brand assets, and creative design styling.",
    icon: "Palette",
    popularFor: "Visual Arts, Marketing Visuals",
    link: "https://midjourney.com",
    badge: "Photorealistic"
  },
  {
    name: "Runway Gen-3 Alpha",
    category: "Video Generation",
    description: "Cinematic text-to-video and image-to-video generation with camera trajectory controls.",
    icon: "Video",
    popularFor: "Cinematic Shots, Reels",
    link: "https://runwayml.com",
    badge: "Cinematic"
  },
  {
    name: "ElevenLabs",
    category: "Voice Synthesis",
    description: "Ultra-expressive AI voice cloning, multilingual dubbing, and conversational voice agents.",
    icon: "Mic",
    popularFor: "Podcasts, Voiceovers, Dubbing",
    link: "https://elevenlabs.io",
    badge: "Hyper-Realistic Voice"
  },
  {
    name: "Make.com & n8n",
    category: "AI Workflows",
    description: "Visual node-based workflow automation engines connecting AI APIs to 1000+ business tools.",
    icon: "Workflow",
    popularFor: "Autonomous Business Agents",
    link: "https://make.com",
    badge: "Zero-Code Automation"
  },
  {
    name: "Cursor AI",
    category: "AI Developer Tool",
    description: "Next-generation AI code editor built on VS Code with repo-wide semantic indexing.",
    icon: "Code2",
    popularFor: "10x Developer Productivity",
    link: "https://cursor.com",
    badge: "Dev Essential"
  }
];

export const DEMO_TESTIMONIALS = [
  {
    id: "t1",
    name: "Aditya Verma",
    role: "Product Manager at Fintech Unicorn",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    content: "The ₹99 lifetime membership is the highest ROI investment I made this year. The Prompt Engineering and ChatGPT masterclasses gave me frameworks I use daily with engineering and design teams.",
    rating: 5,
    tag: "Verified Lifetime Member (Demo)"
  },
  {
    id: "t2",
    name: "Pooja Sharma",
    role: "Freelance Creative Director",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
    content: "The AI Image and Video courses completely upgraded my client deliverables. I went from spending 3 days on moodboards to generating client pitch decks in 2 hours with Midjourney and Runway.",
    rating: 5,
    tag: "Verified Lifetime Member (Demo)"
  },
  {
    id: "t3",
    name: "Rohan Nair",
    role: "CS Student & Indie Hacker",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    content: "The Practical AI Projects course actually teaches you to build RAG pipelines and custom chatbots with real code. Unlike other courses that charge ₹10,000 for fluff, MissAlpha delivers world-class value for ₹99.",
    rating: 5,
    tag: "Verified Lifetime Member (Demo)"
  }
];

export const FAQS = [
  {
    question: "Is MissAlpha AI Lab really a one-time payment of ₹99 with lifetime access?",
    answer: "Yes, exactly! Pay ₹99 once and unlock permanent lifetime access to all current and future premium AI courses, tool tutorials, assignments, downloadable resources, and certificates. There are no recurring monthly fees, no hidden renewals, and no surprise charges."
  },
  {
    question: "What payment methods are supported on MissAlpha AI Lab?",
    answer: "We support all major Indian and international payment options via Razorpay, including UPI (Google Pay, PhonePe, Paytm, BHIM), Credit and Debit Cards (Visa, Mastercard, RuPay, Maestro), Net Banking (across 50+ major banks), and popular mobile wallets."
  },
  {
    question: "Do I need prior coding knowledge to learn?",
    answer: "No. Courses range from beginner-friendly AI fundamentals and no-code prompt engineering to intermediate business workflows and advanced developer projects. Each course is tagged with its difficulty level so you can progress comfortably at your own pace."
  },
  {
    question: "Will I receive verifiable certificates upon course completion?",
    answer: "Yes! Once you complete all lessons and pass the final quiz in a course, you can generate and download an official MissAlpha AI Lab Certificate of Completion featuring your student name, course title, and unique verification ID."
  },
  {
    question: "How do I access premium courses after making the payment?",
    answer: "Your payment is verified securely in real-time. Immediately upon successful payment completion, your account is upgraded to MissAlpha AI Lab Lifetime Premium, unlocking instant access to all courses across your student dashboard."
  },
  {
    question: "Can I access the platform on mobile and tablet devices?",
    answer: "Yes! MissAlpha AI Lab is built with a mobile-first, responsive architecture. You can learn comfortably on your smartphone, tablet, laptop, or desktop browser."
  }
];
