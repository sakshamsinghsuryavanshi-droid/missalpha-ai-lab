-- ====================================================================
-- MISSALPHA AI LAB - DATABASE SEED DATA
-- Comprehensive demo courses, modules, lessons, quizzes & assignments
-- ====================================================================

-- Insert 10 Core AI Courses
INSERT INTO public.courses (id, title, slug, tagline, description, category, level, duration, thumbnail_url, badge_text, is_premium, published, order_index)
VALUES
(
    'c1111111-1111-1111-1111-111111111111',
    'AI Fundamentals',
    'ai-fundamentals',
    'Understand core artificial intelligence, neural networks, LLMs and the future of computation.',
    'Master the bedrock principles of modern Artificial Intelligence. From foundational machine learning algorithms to transformers, generative models, and ethical AI deployment, this course transforms beginners into AI-literate practitioners ready to conquer the modern tech landscape.',
    'Foundations',
    'Beginner',
    '4 Hours (14 Lessons)',
    'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80',
    'FREE STARTER',
    FALSE,
    TRUE,
    1
),
(
    'c2222222-2222-2222-2222-222222222222',
    'ChatGPT Masterclass',
    'chatgpt-masterclass',
    'Unlock the ultimate cognitive copilot: advanced reasoning, custom GPTs and enterprise workflows.',
    'Go beyond casual chatting to build enterprise-grade reasoning workflows. Master OpenAI Advanced Data Analysis, Custom GPT creation, system prompt architecture, API integration patterns, and zero-shot reasoning techniques to 10x your professional productivity.',
    'Generative AI',
    'All Levels',
    '5.5 Hours (16 Lessons)',
    'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80',
    'BESTSELLER',
    TRUE,
    2
),
(
    'c3333333-3333-3333-3333-333333333333',
    'Google Gemini Masterclass',
    'google-gemini-masterclass',
    'Harness multi-modal AI with massive 2M token context windows, audio, video and code.',
    'Master Google state-of-the-art multimodal AI model. Learn how to ingest 2-hour videos, full audio transcripts, 100,000-line codebases, and massive PDF documents simultaneously using Gemini 1.5 Pro and Flash with Google AI Studio and Vertex AI.',
    'Generative AI',
    'Intermediate',
    '4.5 Hours (12 Lessons)',
    'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=800&q=80',
    'TRENDING',
    TRUE,
    3
),
(
    'c4444444-4444-4444-4444-444444444444',
    'Prompt Engineering',
    'prompt-engineering',
    'The science of steering LLMs: Few-shot, Chain-of-Thought, ReAct frameworks and deterministic outputs.',
    'Prompt engineering is the new programming language of the cognitive era. Learn formal prompt design methodologies including Few-Shot Learning, Chain-of-Thought (CoT), Tree of Thoughts (ToT), Directional Stimulus, and programmatic output structuring (JSON schema, Pydantic).',
    'Engineering',
    'All Levels',
    '5 Hours (15 Lessons)',
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    'HIGH DEMAND',
    TRUE,
    4
),
(
    'c5555555-5555-5555-5555-555555555555',
    'AI Image Generation',
    'ai-image-generation',
    'Create photorealistic imagery, concept art, and brand visuals with Midjourney v6 & Flux.',
    'Unleash world-class visual generation capabilities. Master Midjourney v6 parameters, Flux.1 Schnell & Dev, Stable Diffusion XL LoRA fine-tuning, ControlNet pose conditioning, upscaling, inpainting, and commercial product photography reproduction without expensive studios.',
    'Creative AI',
    'All Levels',
    '6 Hours (18 Lessons)',
    'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?auto=format&fit=crop&w=800&q=80',
    'CREATOR FAVORITE',
    TRUE,
    5
),
(
    'c6666666-6666-6666-6666-666666666666',
    'AI Video Generation',
    'ai-video-generation',
    'Produce cinematic videos, AI avatars and viral social clips with Runway Gen-3, Kling and Sora.',
    'Turn text and reference frames into breathtaking 4K cinematic video. Master camera motion trajectories, consistent character rendering, lipsync avatars with HeyGen and ElevenLabs, and hybrid editing workflows combining AI generators with modern video timelines.',
    'Creative AI',
    'Intermediate',
    '5 Hours (14 Lessons)',
    'https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=800&q=80',
    'CUTTING EDGE',
    TRUE,
    6
),
(
    'c7777777-7777-7777-7777-777777777777',
    'AI Automation',
    'ai-automation',
    'Build autonomous agentic workflows with Zapier, Make.com, n8n and Python scripts.',
    'Replace manual human busywork with autonomous self-healing AI agents. Connect CRM records, email replies, web scrapers, and database alerts into end-to-end multi-step pipelines running 24/7 without human intervention.',
    'Productivity & Ops',
    'Intermediate',
    '6.5 Hours (18 Lessons)',
    'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    'ROI BOOSTER',
    TRUE,
    7
),
(
    'c8888888-8888-8888-8888-888888888888',
    'AI for Digital Marketing',
    'ai-for-digital-marketing',
    'Dominate SEO, high-converting ad copy, social calendars, and hyper-personalized email campaigns.',
    'Supercharge customer acquisition and retention. Learn programmatic content clustering, programmatic SEO with AI, automated A/B test ad copywriting, viral Twitter/LinkedIn post engines, and dynamic email personalization at scale.',
    'Business & Marketing',
    'All Levels',
    '4.5 Hours (13 Lessons)',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    'CAREER ACCELERATOR',
    TRUE,
    8
),
(
    'c9999999-9999-9999-9999-999999999999',
    'AI for Business',
    'ai-for-business',
    'Strategic AI implementation, executive decision frameworks, legal risk and enterprise ROI.',
    'Equip entrepreneurs, executives, and managers to lead AI transformation. Learn how to audit operational bottlenecks, calculate AI project ROI, manage data governance and privacy risks, and negotiate enterprise AI software contracts.',
    'Business & Marketing',
    'Beginner to Intermediate',
    '4 Hours (11 Lessons)',
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    'EXECUTIVE',
    TRUE,
    9
),
(
    'caaaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    'Practical AI Projects',
    'practical-ai-projects',
    'Build 5 real-world AI applications: Chatbot, Document Q&A, Voice Assistant, Lead Scraper & Vision App.',
    'The capstone hands-on experience. Build, test, and deploy 5 fully operational AI applications from scratch using modern developer stacks, API keys, vector databases, and responsive web user interfaces.',
    'Hands-on Projects',
    'Advanced',
    '7 Hours (20 Lessons)',
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    'PORTFOLIO BUILDER',
    TRUE,
    10
)
ON CONFLICT (slug) DO NOTHING;

-- Sample Modules & Lessons for AI Fundamentals
INSERT INTO public.modules (id, course_id, title, description, order_index)
VALUES
('m1111111-0001-0000-0000-000000000001', 'c1111111-1111-1111-1111-111111111111', 'Module 1: The AI Revolution & Mental Models', 'Core intuition behind machine learning, deep learning, and generative models.', 1),
('m1111111-0002-0000-0000-000000000002', 'c1111111-1111-1111-1111-111111111111', 'Module 2: How Large Language Models Work', 'Demystifying tokens, embeddings, transformers, and attention mechanisms.', 2),
('m1111111-0003-0000-0000-000000000003', 'c1111111-1111-1111-1111-111111111111', 'Module 3: Ethics, Safety & Future Horizons', 'Hallucinations, bias, security, copyright, and AGI roadmaps.', 3)
ON CONFLICT (id) DO NOTHING;

-- Sample Lessons for AI Fundamentals
INSERT INTO public.lessons (id, module_id, course_id, title, slug, content, video_url, duration_minutes, is_free_preview, order_index, assignment_prompt, resources)
VALUES
(
    'l1111111-0001-0000-0000-000000000001',
    'm1111111-0001-0000-0000-000000000001',
    'c1111111-1111-1111-1111-111111111111',
    'Welcome to MissAlpha AI Lab & The Age of Intelligence',
    'welcome-to-missalpha-ai-lab',
    '# Welcome to MissAlpha AI Lab\n\nArtificial Intelligence is the single most transformative technological paradigm shift since the invention of electricity. In this foundational lesson, we break down why AI is fundamentally different from traditional rule-based software programming.\n\n### Key Concepts Covered:\n- **Deterministic vs Probabilistic computing**\n- The timeline from expert systems (1980s) to Deep Learning (2012) and Transformers (2017+)\n- Why compute and dataset scale triggered emergent capabilities\n- Setting up your daily AI learning habit\n\n### Why MissAlpha AI Lab?\nOur mission is to equip creators, professionals, and students with practical, non-fluff AI skills that translate directly into market value, career growth, and startup execution.',
    'https://www.youtube.com/embed/aircAruvnKk',
    12,
    TRUE,
    1,
    'Write a 200-word summary explaining how probabilistic AI differs from traditional if-then code to a non-technical manager.',
    '[{"title": "MissAlpha AI Glossary PDF", "url": "https://example.com/missalpha-glossary.pdf", "type": "pdf", "size": "1.4 MB"}]'::jsonb
),
(
    'l1111111-0002-0000-0000-000000000002',
    'm1111111-0001-0000-0000-000000000001',
    'c1111111-1111-1111-1111-111111111111',
    'The Machine Learning Spectrum: Supervised vs Unsupervised vs RL',
    'the-machine-learning-spectrum',
    '# The Machine Learning Spectrum\n\nTo master AI, you need a crisp mental model of how machines learn.\n\n### 1. Supervised Learning\nLearning from labeled pairs `(Input X -> Ground Truth Y)`. Used in fraud detection, image classification, and sentiment analysis.\n\n### 2. Unsupervised Learning\nDetecting latent structure and hidden patterns without labels. Used in clustering, customer segmentation, and dimensionality reduction.\n\n### 3. Reinforcement Learning from Human Feedback (RLHF)\nAgents taking actions in an environment to maximize cumulative reward. This is the secret sauce that turned raw GPT-3 into conversational ChatGPT.',
    'https://www.youtube.com/embed/z-EtmaFJieY',
    18,
    TRUE,
    2,
    'Identify 3 manual processes in your current job or study routine and categorize which ML paradigm could solve each.',
    '[{"title": "ML Cheat Sheet", "url": "https://example.com/ml-cheatsheet.pdf", "type": "pdf", "size": "850 KB"}]'::jsonb
),
(
    'l1111111-0003-0000-0000-000000000003',
    'm1111111-0002-0000-0000-000000000002',
    'c1111111-1111-1111-1111-111111111111',
    'Inside Transformers: Tokens, Embeddings & Self-Attention',
    'inside-transformers-attention',
    '# Inside the Transformer Architecture\n\nIn 2017, the seminal paper "Attention Is All You Need" changed computer science forever.\n\n### What Happens When You Send a Message to an LLM?\n1. **Tokenization**: Breaking words and byte pairs into numerical integers (`tokens`).\n2. **Vector Embeddings**: Projecting tokens into 1,536+ dimensional semantic space where cosine distance measures conceptual similarity.\n3. **Self-Attention**: Computing query-key-value matrices to determine which words in a sentence relate to each other regardless of positional distance.\n4. **Next Token Prediction**: Outputting logits and probability distributions over the model vocabulary.',
    'https://www.youtube.com/embed/wjZofJX0v4U',
    22,
    FALSE,
    3,
    'Calculate the approximate token count of a 5,000 word blog post and estimate the inference cost across GPT-4o and Gemini 1.5 Flash.',
    '[{"title": "Tokenization Visual Guide", "url": "https://example.com/tokens-guide.pdf", "type": "pdf", "size": "2.1 MB"}]'::jsonb
)
ON CONFLICT (id) DO NOTHING;

-- Sample Quizzes
INSERT INTO public.quizzes (id, course_id, lesson_id, title, description, passing_score)
VALUES
(
    'q1111111-0001-0000-0000-000000000001',
    'c1111111-1111-1111-1111-111111111111',
    'l1111111-0001-0000-0000-000000000001',
    'AI Fundamentals - Module 1 Certification Quiz',
    'Test your foundational understanding of AI concepts, tokenization and learning paradigms.',
    80
)
ON CONFLICT (id) DO NOTHING;

-- Quiz Questions
INSERT INTO public.quiz_questions (quiz_id, question, options, correct_option_index, explanation, order_index)
VALUES
(
    'q1111111-0001-0000-0000-000000000001',
    'Which mechanism introduced in 2017 enables models to process words in parallel while considering context across the entire sequence?',
    '["Convolutional Kernels", "Self-Attention Mechanism", "Recurrent Hidden States", "Backpropagation Through Time"]'::jsonb,
    1,
    'Self-attention, introduced in "Attention Is All You Need", allows tokens to attend to all other tokens in parallel without sequential bottlenecks.',
    1
),
(
    'q1111111-0001-0000-0000-000000000001',
    'What technique aligns base LLMs to be helpful, harmless, and conversational according to human preferences?',
    '["Unsupervised Clustering", "RLHF (Reinforcement Learning from Human Feedback)", "Binary Classification", "Quantization"]'::jsonb,
    1,
    'RLHF aligns pre-trained base models with human conversational goals and safety guidelines using reward models.',
    2
),
(
    'q1111111-0001-0000-0000-000000000001',
    'Approximately how many characters on average correspond to 1 token in English text?',
    '["1 character", "4 characters (~0.75 words)", "20 characters", "100 characters"]'::jsonb,
    1,
    'In standard byte-pair tokenizers (like cl100k_base), 1 token is roughly 4 characters or 0.75 words in English.',
    3
),
(
    'q1111111-0001-0000-0000-000000000001',
    'What is vector embedding in modern LLMs?',
    '["A JPEG image representation", "A high-dimensional mathematical coordinate vector representing semantic meaning", "A database SQL index", "A hardware processor unit"]'::jsonb,
    1,
    'Embeddings capture semantic concepts as geometric points in high-dimensional space where related concepts sit close to each other.',
    4
)
ON CONFLICT (id) DO NOTHING;
