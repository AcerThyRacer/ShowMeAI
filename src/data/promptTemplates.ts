/* ─────────────────────────────────────────────────────────────────────────────
   PROMPT TEMPLATE LIBRARY - 50+ Curated Prompts for Every AI Use Case
   Organized by category with clear descriptions and copyable templates
──────────────────────────────────────────────────────────────────────────── */

export interface PromptCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  color: string;
}

export interface PromptTemplate {
  id: string;
  categoryId: string;
  title: string;
  description: string;
  tags: string[];
  template: string;
  variables?: string[];
}

/* ─── CATEGORIES ─── */
export const PROMPT_CATEGORIES: PromptCategory[] = [
  {
    id: 'coding',
    name: 'Coding & Development',
    icon: 'Code',
    description: 'Debug, refactor, explain, and generate code across all languages',
    color: '#3b82f6',
  },
  {
    id: 'writing',
    name: 'Writing & Content',
    icon: 'PenTool',
    description: 'Create, edit, and improve written content of all kinds',
    color: '#ec4899',
  },
  {
    id: 'analysis',
    name: 'Analysis & Research',
    icon: 'Search',
    description: 'Analyze data, summarize documents, and conduct research',
    color: '#8b5cf6',
  },
  {
    id: 'business',
    name: 'Business & Strategy',
    icon: 'Briefcase',
    description: 'Strategic planning, decision-making, and business operations',
    color: '#f59e0b',
  },
  {
    id: 'learning',
    name: 'Learning & Education',
    icon: 'GraduationCap',
    description: 'Teach, explain, and learn any topic effectively',
    color: '#10b981',
  },
  {
    id: 'creative',
    name: 'Creative & Brainstorming',
    icon: 'Lightbulb',
    description: 'Generate ideas, stories, and creative content',
    color: '#f43f5e',
  },
  {
    id: 'productivity',
    name: 'Productivity & Workflow',
    icon: 'Zap',
    description: 'Automate tasks, manage time, and boost efficiency',
    color: '#06b6d4',
  },
  {
    id: 'communication',
    name: 'Communication',
    icon: 'MessageSquare',
    description: 'Draft emails, messages, and improve communication',
    color: '#6366f1',
  },
];

/* ─── PROMPT TEMPLATES ─── */
export const PROMPT_TEMPLATES: PromptTemplate[] = [
  // ═══════════════════════════════════════════════════════════════
  // CODING & DEVELOPMENT
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'code-senior-review',
    categoryId: 'coding',
    title: '🔥 Senior Dev Code Review',
    description: 'Get a brutal, honest code review like a senior engineer would give',
    tags: ['review', 'senior', 'best-practices'],
    template: `You are a senior software engineer with 15 years of experience doing a code review. Be thorough and direct. Don't sugarcoat anything.

Review the following code and provide:

1. **CRITICAL ISSUES** — Bugs, security flaws, or things that will break in production
2. **DESIGN PROBLEMS** — Architecture issues, SOLID violations, wrong abstractions
3. **PERFORMANCE** — N+1 queries, unnecessary re-renders, memory leaks, O(n²) when O(n) is possible
4. **READABILITY** — Confusing naming, missing types, overly clever code
5. **WHAT'S GOOD** — Acknowledge what's done well

For each issue, show the problematic code and your suggested fix.

\`\`\`
[paste your code here]
\`\`\``,
  },
  {
    id: 'code-debug-expert',
    categoryId: 'coding',
    title: '🐛 Debug Like a Detective',
    description: 'Systematic debugging — find the root cause, not just a band-aid',
    tags: ['debug', 'troubleshoot', 'root-cause'],
    template: `You are an expert debugger. I need you to find the ROOT CAUSE, not just a surface-level fix.

**The error:**
[paste error message / unexpected behavior]

**My code:**
\`\`\`
[paste relevant code]
\`\`\`

**What I expected to happen:**
[describe expected behavior]

**What actually happened:**
[describe actual behavior]

Please:
1. Identify the exact root cause (not just symptoms)
2. Explain WHY this happens (the underlying mechanism)
3. Provide the minimal fix
4. Show me how to add a test that would have caught this
5. List similar bugs I should check for in the rest of my code`,
  },
  {
    id: 'code-build-feature',
    categoryId: 'coding',
    title: '🏗️ Build a Feature from Scratch',
    description: 'Get production-ready code for a complete feature with tests',
    tags: ['feature', 'architecture', 'production'],
    template: `You are a senior full-stack developer. Build this feature production-ready from scratch.

**Feature:** [describe what you want to build]
**Tech stack:** [e.g., React + TypeScript + Node.js + PostgreSQL]
**Context:** [any existing patterns or constraints]

Requirements:
- Follow the existing project conventions
- Include proper TypeScript types
- Add error handling for all failure modes
- Include input validation
- Write it so another dev can understand it without comments
- Add JSDoc for public APIs only

Provide the code organized by file, with clear file paths.`,
  },
  {
    id: 'code-refactor-pro',
    categoryId: 'coding',
    title: '♻️ Pro Refactor',
    description: 'Transform messy code into clean, maintainable code',
    tags: ['refactor', 'clean-code', 'patterns'],
    template: `You are a refactoring expert. Transform this code to be clean, maintainable, and following SOLID principles. Don't over-engineer — find the sweet spot.

**Current code:**
\`\`\`
[paste your messy code here]
\`\`\`

Rules:
- Show the refactored code in full (not partial snippets)
- Extract functions/classes where it genuinely helps
- Use meaningful names that explain "why" not "what"
- Remove dead code and unnecessary abstractions
- Add types where they prevent bugs
- Keep it as SIMPLE as possible — complexity is the enemy

For each change, add a one-line comment explaining WHY you made it.`,
  },
  {
    id: 'code-convert-language',
    categoryId: 'coding',
    title: '🔄 Convert Between Languages',
    description: 'Translate code between any two languages idiomatically',
    tags: ['convert', 'translate', 'polyglot'],
    template: `Convert this code from [SOURCE LANGUAGE] to [TARGET LANGUAGE].

Don't just do a 1:1 translation — rewrite it to be **idiomatic** in the target language. Use the target language's conventions, patterns, and standard library.

**Source code:**
\`\`\`
[paste code here]
\`\`\`

Requirements:
- Use idiomatic patterns (e.g., list comprehensions in Python, streams in Java)
- Use the standard library where it makes sense
- Match the target language's error handling conventions
- Preserve all functionality and edge case handling
- Add brief notes where the approaches differ significantly`,
  },
  {
    id: 'code-write-tests',
    categoryId: 'coding',
    title: '🧪 Write Bulletproof Tests',
    description: 'Generate comprehensive tests that actually catch bugs',
    tags: ['testing', 'unit-tests', 'coverage'],
    template: `Write comprehensive tests for this code. Focus on tests that would actually catch real bugs, not just checkbox coverage.

\`\`\`
[paste your code here]
\`\`\`

**Test framework:** [e.g., Jest, Vitest, pytest, Go testing]

Include:
1. **Happy paths** — normal expected usage
2. **Edge cases** — empty inputs, boundary values, unicode, huge inputs
3. **Error cases** — invalid inputs, network failures, missing data
4. **Race conditions** — if applicable (async code, shared state)
5. **Regression tests** — for any bugs you spot in the code

Name each test so that when it fails, the name alone tells you what's broken.`,
  },
  {
    id: 'code-explain-codebase',
    categoryId: 'coding',
    title: '🗺️ Explain This Codebase',
    description: 'Understand an unfamiliar codebase quickly',
    tags: ['explain', 'onboarding', 'architecture'],
    template: `You are helping me understand an unfamiliar codebase. Explain this code like I'm a new developer joining the team.

\`\`\`
[paste code here]
\`\`\`

Explain:
1. **Big picture** — What is this code's job in one sentence?
2. **Data flow** — What goes in, what comes out, what gets transformed?
3. **Key decisions** — Why was it built this way? What problem does each piece solve?
4. **Dependencies** — What does this rely on? What relies on it?
5. **Gotchas** — What would trip up a new developer? Any hidden assumptions or side effects?
6. **If I need to modify this** — What are the most likely change scenarios, and where would I start?`,
  },
  {
    id: 'code-api-design',
    categoryId: 'coding',
    title: '📡 Design a REST API',
    description: 'Design clean, consistent API endpoints with schemas',
    tags: ['api', 'rest', 'backend', 'design'],
    template: `Design a REST API for [RESOURCE/FEATURE].

**Context:** [describe the domain and use case]
**Auth:** [e.g., JWT, API key, OAuth]
**Consumers:** [who calls this API — web app, mobile, third parties?]

For each endpoint provide:
- Method + path (follow REST conventions)
- Request body/params with TypeScript types
- Success response with TypeScript types  
- Error responses (400, 401, 403, 404, 409, 422, 500)
- Rate limiting recommendation

Also include:
- Pagination strategy (cursor vs offset)
- Filtering/sorting query params
- Versioning approach
- A sample cURL for each endpoint`,
  },
  {
    id: 'code-optimize-performance',
    categoryId: 'coding',
    title: '⚡ Optimize Performance',
    description: 'Find and fix performance bottlenecks in your code',
    tags: ['performance', 'optimization', 'speed'],
    template: `You are a performance optimization expert. Find every performance issue in this code and fix it.

\`\`\`
[paste your code here]
\`\`\`

**Context:** [how often this runs, data size, latency requirements]

Analyze:
1. **Time complexity** — Is the algorithm optimal? Any hidden O(n²)?
2. **Memory** — Unnecessary copies, growing arrays, retained references?
3. **I/O** — Sequential calls that should be parallel? Missing caching?
4. **Framework-specific** — React re-renders, unnecessary DB queries, missing indexes?

For each issue:
- Show the problematic code
- Explain the impact (with rough numbers if possible)
- Show the optimized version
- Rate the improvement: 🟢 minor | 🟡 moderate | 🔴 critical`,
  },
  {
    id: 'code-git-commit-message',
    categoryId: 'coding',
    title: '📝 Perfect Commit Message',
    description: 'Generate clear conventional commit messages from your diff',
    tags: ['git', 'commit', 'conventional-commits'],
    template: `Write a conventional commit message for this diff. Follow the format strictly.

\`\`\`diff
[paste your git diff here]
\`\`\`

Format:
<type>(<scope>): <imperative mood description, max 72 chars>

<body explaining WHAT changed and WHY, wrapped at 72 chars>

<footer with breaking changes or issue refs>

Types: feat|fix|refactor|perf|test|docs|chore|ci|style|build
Only include a body if the change isn't obvious from the subject line.`,
  },

  // ═══════════════════════════════════════════════════════════════
  // WRITING & CONTENT
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'write-rewrite-better',
    categoryId: 'writing',
    title: '✏️ Make My Writing Better',
    description: 'Paste any text and get a dramatically improved version',
    tags: ['edit', 'improve', 'rewrite'],
    template: `Rewrite the following text to be clearer, more engaging, and more concise. Fix any grammar issues. Keep my voice and intent — just make it significantly better.

**My text:**
[paste your text here]

**Target audience:** [who is reading this?]
**Tone:** [e.g., professional, casual, authoritative, friendly]

Provide:
1. The improved version
2. A bullet list of the key changes you made and why
3. One alternative version with a completely different angle/approach`,
  },
  {
    id: 'write-twitter-thread',
    categoryId: 'writing',
    title: '🐦 Viral Twitter/X Thread',
    description: 'Turn any topic into an engaging thread that gets engagement',
    tags: ['twitter', 'social', 'thread', 'viral'],
    template: `Write a Twitter/X thread about: [TOPIC]

**Angle:** [what unique perspective or insight?]
**Goal:** [educate / entertain / persuade / build authority]

Rules:
- First tweet must be a scroll-stopping hook (question, bold claim, or surprising stat)
- Each tweet must stand on its own but flow naturally to the next
- Use short sentences and line breaks for readability
- Include at least one "wait, what?" moment that makes people stop scrolling
- End with a clear CTA (follow, bookmark, reply)
- 8-12 tweets total
- No cringe hashtags — max 1-2 relevant ones on the last tweet only

Format each tweet as:
🧵 1/
[tweet text]

🧵 2/
[tweet text]
...`,
  },
  {
    id: 'write-linkedin-post',
    categoryId: 'writing',
    title: '💼 LinkedIn Post That Gets Reach',
    description: 'Professional LinkedIn content that actually gets engagement',
    tags: ['linkedin', 'professional', 'networking'],
    template: `Write a LinkedIn post about: [TOPIC/STORY]

**My role/expertise:** [your background]
**Goal:** [thought leadership / hiring / networking / product launch]

Rules:
- Open with a hook line that makes people click "see more" (first 2 lines visible)
- Use short paragraphs (1-2 lines each)
- Tell a story or share a specific insight — never be generic
- Include a personal angle or real experience
- End with a question or discussion prompt to drive comments
- Keep it under 1300 characters for best reach
- No hashtag spam — 3 relevant ones max at the end

Format with line breaks between each point for mobile readability.`,
  },
  {
    id: 'write-blog-post-pro',
    categoryId: 'writing',
    title: '📝 Write a Blog Post',
    description: 'SEO-friendly, well-structured blog posts that people actually read',
    tags: ['blog', 'article', 'seo', 'content'],
    template: `Write a blog post about: [TOPIC]

**Target audience:** [who's reading and what's their level?]
**Target keyword:** [primary SEO keyword]
**Word count:** [e.g., 1500]
**Tone:** [e.g., conversational but authoritative]

Structure:
1. H1 title (includes keyword, compelling, under 60 chars)
2. Opening paragraph — hook + what the reader will learn
3. Sections with H2 subheadings (use keyword variations)
4. Include at least one real example or case study per section
5. A "key takeaways" section near the end
6. CTA conclusion

Rules:
- Write for humans first, SEO second
- No filler sentences — every line should add value
- Use bullet points and short paragraphs
- Include natural internal link opportunities (suggest where)
- Write a meta description (155 chars max)`,
  },
  {
    id: 'write-email-sequence',
    categoryId: 'writing',
    title: '📧 Email That Gets Replies',
    description: 'Cold emails, follow-ups, and outreach that actually work',
    tags: ['email', 'outreach', 'cold-email'],
    template: `Write an email for: [PURPOSE — e.g., cold outreach, follow-up, sales, networking]

**Who I'm emailing:** [role, company, context]
**What I want:** [specific desired outcome]
**My credibility:** [why should they care about me?]

Rules:
- Subject line: curiosity-driven, under 40 chars, no clickbait
- First sentence: mention something specific about THEM (not about me)
- Keep the body under 100 words — respect their time
- One clear, low-friction ask (not "let me know your thoughts")
- No "I hope this email finds you well" or other filler
- P.S. line with a compelling reason to reply

Provide:
1. The email
2. A follow-up email (for 3 days later if no reply)
3. One alternative subject line`,
  },
  {
    id: 'write-product-copy',
    categoryId: 'writing',
    title: '🎯 Product Landing Page Copy',
    description: 'High-converting copy for product or landing pages',
    tags: ['copywriting', 'landing-page', 'conversion'],
    template: `Write landing page copy for: [PRODUCT/SERVICE]

**What it does:** [one sentence]
**Who it's for:** [target customer]
**Main competitor:** [what they're using instead]
**Key differentiator:** [why this is better]

Provide copy for each section:
1. **Hero** — Headline (under 10 words) + subheadline + CTA button text
2. **Problem** — Describe the pain they feel today (3-4 lines)
3. **Solution** — How your product solves it (focus on outcomes, not features)
4. **Social proof** — Suggested testimonial format + stats to include
5. **Features** — 3-4 features written as benefits (not "we have X" but "you get Y")
6. **FAQ** — 4 objection-handling questions and answers
7. **Final CTA** — Urgency-driven closing section`,
  },
  {
    id: 'write-youtube-script',
    categoryId: 'writing',
    title: '🎬 YouTube Video Script',
    description: 'Engaging scripts that keep viewers watching',
    tags: ['youtube', 'video', 'script'],
    template: `Write a YouTube video script about: [TOPIC]

**Channel style:** [educational / entertainment / tutorial / commentary]
**Target length:** [e.g., 10 minutes]
**Audience:** [who watches your channel]

Structure:
1. **Hook (0:00-0:30)** — Open with a bold claim, question, or visual that prevents clicking away
2. **Context (0:30-1:30)** — Why this matters to the viewer right now
3. **Main content** — 3-5 key sections with clear transitions
4. **Pattern interrupts** — Add a "by the way" or "here's what most people miss" every 2-3 minutes
5. **Callback/payoff** — Reference something from the hook
6. **CTA (last 30s)** — Natural, non-desperate call to subscribe

Format:
[VISUAL: description of what's on screen]
[NARRATION: what to say]
[B-ROLL: suggested footage/graphics]`,
  },
  {
    id: 'write-resume-bullet',
    categoryId: 'writing',
    title: '📄 Resume Bullet Points',
    description: 'Transform boring job descriptions into compelling resume bullets',
    tags: ['resume', 'career', 'job'],
    template: `Transform these job responsibilities into powerful resume bullet points.

**My role:** [job title]
**Company type:** [e.g., Series B startup, Fortune 500]
**What I actually did:**
[describe your responsibilities and achievements in plain language]

Rules:
- Start each bullet with a strong action verb (Led, Built, Reduced, Launched — never "Responsible for")
- Include numbers wherever possible (%, $, team size, time saved)
- Format: [Action verb] + [what you did] + [measurable result]
- 5-7 bullets, most impressive first
- Optimize for ATS keywords in [INDUSTRY/ROLE]

Also provide:
- A 2-line professional summary for the top of the resume
- 3 alternative action verbs for each bullet`,
  },

  // ═══════════════════════════════════════════════════════════════
  // ANALYSIS & RESEARCH
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'analyze-summarize-anything',
    categoryId: 'analysis',
    title: '📋 Summarize Anything',
    description: 'Get a clear, actionable summary of any document or text',
    tags: ['summary', 'tldr', 'extract'],
    template: `Summarize the following text. Optimize for someone who has 30 seconds to understand this.

[paste text here]

Provide:
1. **TL;DR** — One sentence, max 25 words
2. **Key points** — 3-5 bullets, each one a complete thought
3. **Action items** — What should the reader DO based on this? (if applicable)
4. **Questions raised** — What isn't answered that probably should be?
5. **One-paragraph summary** — For forwarding to someone who needs more context`,
  },
  {
    id: 'analyze-decision-matrix',
    categoryId: 'analysis',
    title: '⚖️ Decision Matrix',
    description: 'Make hard decisions with a structured framework',
    tags: ['decision', 'framework', 'comparison'],
    template: `Help me make this decision using a structured framework.

**Decision:** [what are you choosing between?]
**Options:** [list your options]
**Context:** [any constraints, timeline, budget, stakeholders]
**What matters most:** [your top priorities]

Provide:
1. **Weighted criteria matrix** — Score each option 1-10 on each criterion
2. **Second-order effects** — What happens 6 months after each choice?
3. **Reversibility check** — How hard is it to undo each option?
4. **Pre-mortem** — "If we chose X and it failed, why did it fail?"
5. **Gut check** — Which option feels right? (emotions are data too)
6. **Recommendation** — Your pick with confidence level (high/medium/low)`,
  },
  {
    id: 'analyze-explain-paper',
    categoryId: 'analysis',
    title: '🔬 Explain Research Paper',
    description: 'Understand complex academic papers in plain language',
    tags: ['research', 'academic', 'paper', 'science'],
    template: `Explain this research paper/article to me in plain language. Assume I'm smart but not an expert in this field.

[paste abstract, key sections, or the whole paper]

Break down:
1. **The problem** — What question were they trying to answer? Why does it matter?
2. **Their approach** — What did they actually do? (method in simple terms)
3. **Key findings** — What did they discover? (with actual numbers where relevant)
4. **So what?** — Why should anyone care? What changes because of this?
5. **Limitations** — What are the honest weaknesses they admit (or should admit)?
6. **My take** — Is this paper strong or weak? Does the evidence support the claims?
7. **Plain English summary** — Explain this to a curious friend at dinner`,
  },
  {
    id: 'analyze-market-research',
    categoryId: 'analysis',
    title: '📊 Quick Market Research',
    description: 'Understand any market, industry, or competitive landscape',
    tags: ['market', 'research', 'competitive', 'business'],
    template: `Give me a rapid market analysis of: [INDUSTRY / PRODUCT CATEGORY / NICHE]

I need:
1. **Market size** — Rough TAM/SAM/SOM with sources to verify
2. **Key players** — Top 5-10 companies, their positioning, and rough market share
3. **Trends** — 3-5 trends shaping this market right now
4. **Customer segments** — Who buys this and why? (personas)
5. **Business models** — How do companies in this space make money?
6. **Entry barriers** — What makes it hard to compete here?
7. **Opportunities** — Where are the gaps nobody is filling?
8. **Risks** — What could disrupt this market in 2-3 years?

Be specific with numbers, company names, and examples. Flag anything you're uncertain about.`,
  },
  {
    id: 'analyze-data-analysis',
    categoryId: 'analysis',
    title: '📈 Analyze My Data',
    description: 'Extract insights and patterns from any dataset',
    tags: ['data', 'analytics', 'insights', 'patterns'],
    template: `Analyze this data and tell me what's interesting. I want insights I can act on, not just descriptions.

**Data:**
\`\`\`
[paste your data — CSV, JSON, table, or just paste numbers]
\`\`\`

**Context:** [what is this data about? what business question are you answering?]

Provide:
1. **Key insight** — The single most important thing this data tells us
2. **Patterns** — What trends, correlations, or clusters do you see?
3. **Anomalies** — Anything unexpected or worth investigating?
4. **Segments** — Are there meaningful groups in this data?
5. **Recommendations** — What should we DO based on this?
6. **What's missing** — What additional data would make this analysis better?
7. **Visualization suggestions** — Best chart types for communicating these findings`,
  },
  {
    id: 'analyze-contract-review',
    categoryId: 'analysis',
    title: '📜 Review a Contract/Agreement',
    description: 'Understand legal documents in plain language and spot red flags',
    tags: ['legal', 'contract', 'review', 'agreement'],
    template: `Review this contract/agreement in plain English. I'm not a lawyer — explain it so I understand what I'm agreeing to.

[paste contract text or key clauses]

Provide:
1. **Plain English summary** — What does this agreement actually say?
2. **My obligations** — What am I committing to do?
3. **Their obligations** — What are they committing to do?
4. **🚩 Red flags** — Unusual clauses, one-sided terms, or things I should push back on
5. **Missing protections** — Standard clauses that SHOULD be here but aren't
6. **Key dates/deadlines** — Anything time-sensitive
7. **Negotiation points** — Top 3 things I should try to change before signing

⚠️ Disclaimer: This is not legal advice. Consult a lawyer for binding decisions.`,
  },
  {
    id: 'analyze-swot-pro',
    categoryId: 'analysis',
    title: '🎯 SWOT Analysis',
    description: 'Thorough SWOT with actual strategic implications',
    tags: ['swot', 'strategy', 'planning'],
    template: `Perform a SWOT analysis for: [COMPANY / PRODUCT / PROJECT / IDEA]

**Context:** [industry, stage, key facts]
**Goal:** [what decision is this SWOT informing?]

For each quadrant, provide 4-6 points with specifics (not generic statements):

| **STRENGTHS** (internal +) | **WEAKNESSES** (internal -) |
| **OPPORTUNITIES** (external +) | **THREATS** (external -) |

Then provide:
1. **SO strategies** — Use strengths to capture opportunities
2. **WO strategies** — Overcome weaknesses using opportunities
3. **ST strategies** — Use strengths to defend against threats
4. **WT strategies** — Minimize weaknesses to avoid threats
5. **#1 priority action** — The single most important thing to do based on this analysis`,
  },

  // ═══════════════════════════════════════════════════════════════
  // BUSINESS & STRATEGY
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'business-startup-idea',
    categoryId: 'business',
    title: '🚀 Validate a Startup Idea',
    description: 'Stress-test any business idea before you invest time',
    tags: ['startup', 'validation', 'business-model'],
    template: `Evaluate this business idea like a tough but fair VC partner. Be honest — I need truth, not encouragement.

**The idea:** [describe your idea]
**Target customer:** [who pays and why?]
**How it makes money:** [revenue model]

Analyze:
1. **Problem validation** — Is this a real problem? How painful is it? (rate 1-10)
2. **Market size** — Is this a big enough market to build a business?
3. **Competition** — Who else is solving this? Why haven't they won already?
4. **Unfair advantage** — What do you have that's hard to copy?
5. **Business model** — Does the unit economics make sense?
6. **Biggest risk** — What's the #1 thing that could kill this?
7. **First 90 days** — What should you do in the next 3 months to validate/invalidate this?
8. **Verdict** — 🟢 Go / 🟡 Maybe (with conditions) / 🔴 Don't do this`,
  },
  {
    id: 'business-pitch-deck',
    categoryId: 'business',
    title: '🎤 Pitch Deck Copy',
    description: 'Create compelling copy for each slide of your pitch deck',
    tags: ['pitch', 'fundraising', 'startup'],
    template: `Write pitch deck copy for: [COMPANY/PRODUCT]

**What we do:** [one sentence]
**Stage:** [pre-seed / seed / Series A / etc.]
**Traction:** [users, revenue, growth rate, key metrics]
**Ask:** [how much are you raising?]

Write copy for each slide:
1. **Title slide** — Company name + one-line tagline
2. **Problem** — The pain point (make them feel it)
3. **Solution** — How you solve it (outcome-focused)
4. **Market** — TAM/SAM/SOM with a clear "why now"
5. **Product** — Key features as benefits (suggest screenshot placements)
6. **Traction** — Numbers that prove momentum
7. **Business model** — How you make money (clear and simple)
8. **Competition** — Why you win (avoid the magic quadrant cliché)
9. **Team** — Why THIS team can pull this off
10. **Ask** — What you need and what you'll do with it

Keep each slide to 2-3 sentences MAX. The deck should tell a story.`,
  },
  {
    id: 'business-okrs',
    categoryId: 'business',
    title: '🎯 Write OKRs',
    description: 'Clear, measurable OKRs that actually drive results',
    tags: ['okr', 'goals', 'planning', 'management'],
    template: `Create OKRs for: [TEAM / DEPARTMENT / COMPANY]

**Time period:** [Q1 2026, H1, annual, etc.]
**Company goal:** [what's the top-level priority?]
**Team context:** [size, current challenges, what happened last quarter]

Rules for good OKRs:
- Objectives should be inspiring and qualitative ("Become the go-to platform for..." not "Increase revenue")
- Key Results must be measurable with a specific number
- Include 2-4 Objectives, each with 3-5 Key Results
- Each KR should have a baseline (where we are) and target (where we want to be)
- At least one KR should be a stretch goal (70% confidence of hitting it)

Format:
**O1: [Objective]**
  - KR1: [metric] from [baseline] → [target]
  - KR2: ...
  
Also provide:
- Leading indicators to track weekly
- Anti-goals (what we're explicitly NOT trying to do)`,
  },
  {
    id: 'business-prd',
    categoryId: 'business',
    title: '📋 Product Requirements Doc',
    description: 'PRD template that engineering teams actually like',
    tags: ['prd', 'product', 'requirements', 'pm'],
    template: `Write a PRD (Product Requirements Document) for: [FEATURE/PRODUCT]

**Problem:** [what user problem does this solve?]
**Evidence:** [how do you know this is a problem? data, user interviews, support tickets?]
**Target user:** [who is this for specifically?]

Structure:
1. **Summary** — One paragraph explaining the feature and why we're building it
2. **Goals & Success Metrics** — What does success look like? (specific numbers)
3. **Non-goals** — What are we explicitly NOT doing?
4. **User Stories** — As a [user], I want [action], so that [outcome]
5. **Requirements** — Functional (must have / nice to have) and non-functional
6. **Design considerations** — Key UX decisions and trade-offs
7. **Technical considerations** — Architecture notes, dependencies, migration needs
8. **Edge cases** — Things that could go wrong
9. **Launch plan** — Rollout strategy (feature flag, % rollout, etc.)
10. **Open questions** — Decisions that still need to be made`,
  },
  {
    id: 'business-meeting-notes',
    categoryId: 'business',
    title: '📝 Meeting Notes → Action Items',
    description: 'Transform messy meeting notes into clear action items',
    tags: ['meeting', 'notes', 'action-items'],
    template: `Transform these raw meeting notes into a structured summary with clear action items.

**Meeting notes:**
[paste your messy notes, transcript, or bullet points here]

Provide:
1. **Meeting summary** — 2-3 sentences on what was discussed
2. **Key decisions made** — Numbered list of decisions with rationale
3. **Action items** — Table format:
   | Action | Owner | Deadline | Priority |
4. **Open questions** — Things that weren't resolved
5. **Parking lot** — Ideas mentioned but tabled for later
6. **Next meeting** — Suggested agenda items based on this meeting`,
  },
  {
    id: 'business-negotiate',
    categoryId: 'business',
    title: '🤝 Negotiation Prep',
    description: 'Prepare for any negotiation with a strategic framework',
    tags: ['negotiation', 'strategy', 'preparation'],
    template: `Help me prepare for this negotiation.

**What I'm negotiating:** [salary, contract, deal, partnership, etc.]
**The other side:** [who are they? what do they want?]
**My position:** [what do I want? what's my ideal outcome?]
**My BATNA:** [best alternative if this fails]

Provide:
1. **Their likely perspective** — What do they care about? What are their constraints?
2. **ZOPA** — Where does the zone of possible agreement likely sit?
3. **My anchoring strategy** — What should my opening position be and why?
4. **Value creation** — Can we expand the pie? (creative options that benefit both)
5. **Concession plan** — What can I give up that costs me little but they value?
6. **Red lines** — What should I never agree to?
7. **If they say X, I say Y** — 5 anticipated objections with responses
8. **Walk-away point** — When should I leave the table?`,
  },
  {
    id: 'business-strategy-one-pager',
    categoryId: 'business',
    title: '📄 Strategy One-Pager',
    description: 'Compress any strategy into a clear single page',
    tags: ['strategy', 'planning', 'executive'],
    template: `Create a strategy one-pager for: [INITIATIVE/PROJECT/COMPANY]

**Context:** [current situation, what triggered this]
**Audience:** [who will read this — CEO, board, team?]

Format (must fit on one page):
1. **Situation** — Where are we now? (2-3 sentences, with data)
2. **Problem** — What's the core challenge? (1-2 sentences)
3. **Insight** — What have we learned that changes our approach?
4. **Strategy** — Our plan in one sentence
5. **Key initiatives** — 3-5 workstreams with owners
6. **Success metrics** — How we'll know it's working
7. **Timeline** — Key milestones
8. **Risks & mitigations** — Top 3 risks

Keep it tight — every word must earn its place.`,
  },

  // ═══════════════════════════════════════════════════════════════
  // LEARNING & EDUCATION
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'learn-explain-anything',
    categoryId: 'learning',
    title: '🧠 Explain Anything Clearly',
    description: 'Understand any complex topic with layered explanations',
    tags: ['explain', 'learn', 'understand'],
    template: `Explain [TOPIC] to me at three different levels:

**Level 1 — ELI5 (Explain Like I'm 5):**
Use a simple analogy anyone could understand. No jargon.

**Level 2 — Intermediate (I know the basics):**
Include proper terminology, how it works, and why it matters.

**Level 3 — Advanced (I want depth):**
Technical details, edge cases, trade-offs, and current debates among experts.

After all three, provide:
- **Common misconceptions** that even intermediate people get wrong
- **The one thing** that clicks for most people learning this
- **Best resource** to go deeper (book, video, course, paper)`,
  },
  {
    id: 'learn-study-plan',
    categoryId: 'learning',
    title: '📚 Build a Study Plan',
    description: 'Structured learning roadmap for any skill',
    tags: ['study', 'roadmap', 'curriculum', 'learning-path'],
    template: `Create a study plan to learn: [SKILL/TOPIC]

**My current level:** [complete beginner / know the basics / intermediate]
**Time I can dedicate:** [hours per week]
**My goal:** [what do I want to be able to DO with this knowledge?]
**My learning style:** [reading / video / hands-on projects / mix]

Provide:
1. **Phase 1: Foundation** — Core concepts to learn first (with specific resources)
2. **Phase 2: Practice** — Exercises and mini-projects to build skills
3. **Phase 3: Real projects** — Build something meaningful
4. **Phase 4: Mastery** — Advanced topics and how to stay current

For each phase:
- Specific resources (free preferred, paid if significantly better)
- Milestone: "You're ready for the next phase when you can..."
- Common plateaus and how to push through them

Also include:
- **Study technique** — How to study this topic effectively (not just "read more")
- **Practice routine** — Daily/weekly habits that accelerate learning`,
  },
  {
    id: 'learn-socratic-method',
    categoryId: 'learning',
    title: '❓ Teach Me (Socratic Method)',
    description: 'Learn through guided questions instead of being told answers',
    tags: ['socratic', 'teaching', 'critical-thinking'],
    template: `I want to learn about [TOPIC] through the Socratic method. Instead of explaining directly, guide me with questions that help me discover the answers myself.

Rules:
- Ask me ONE question at a time
- Start with what I might already know and build from there
- If I'm wrong, don't correct me — ask a follow-up that helps me see the flaw
- If I'm stuck, give a small hint, not the answer
- After every 3-4 questions, summarize what we've established so far
- Celebrate when I get to an insight on my own

Start with your first question now. Begin at a basic level and adjust based on my answers.

My current understanding of [TOPIC]: [what I think I know so far, if anything]`,
  },
  {
    id: 'learn-cheat-sheet',
    categoryId: 'learning',
    title: '📝 Create a Cheat Sheet',
    description: 'Condensed reference for any topic, tool, or language',
    tags: ['cheat-sheet', 'reference', 'quick-guide'],
    template: `Create a comprehensive cheat sheet for: [TOPIC/TOOL/LANGUAGE]

**My level:** [beginner / intermediate / advanced]
**Use case:** [what I'll use this for most]

Format it as a printable reference with:
1. **Quick reference** — Most common commands/syntax/patterns at the top
2. **Core concepts** — Essential things to remember (tables work great)
3. **Common patterns** — Templates for frequently needed tasks
4. **Gotchas** — Things that trip everyone up
5. **Shortcuts** — Time-saving tricks the pros use
6. **Debugging** — Common errors and their fixes

Use tables, code blocks, and compact formatting. Optimize for scanning, not reading.`,
  },
  {
    id: 'learn-compare-concepts',
    categoryId: 'learning',
    title: '🔀 Compare Two Concepts',
    description: 'Understand differences between confusing or similar things',
    tags: ['compare', 'difference', 'versus'],
    template: `Explain the difference between [CONCEPT A] and [CONCEPT B].

I keep mixing these up. Help me never confuse them again.

Provide:
1. **One-line difference** — The simplest possible distinction
2. **Analogy** — Compare them to everyday things
3. **Side-by-side comparison** — Table with key attributes
4. **When to use each** — Practical decision guide
5. **Common confusion** — Why people mix these up and how to remember
6. **Memory trick** — A mnemonic or mental model that sticks
7. **Examples** — Real-world example of each being used correctly`,
  },
  {
    id: 'learn-practice-problems',
    categoryId: 'learning',
    title: '🏋️ Generate Practice Problems',
    description: 'Get exercises and challenges for any skill',
    tags: ['practice', 'exercises', 'problems', 'drill'],
    template: `Generate practice problems for: [TOPIC/SKILL]

**My level:** [beginner / intermediate / advanced]
**Focus area:** [specific subtopic I want to practice]

Provide:
1. **Warm-up (3 problems)** — Easy, build confidence
2. **Core practice (5 problems)** — Medium difficulty, cover key concepts
3. **Challenge (3 problems)** — Push beyond comfort zone
4. **Boss level (1 problem)** — Combines multiple concepts

For each problem:
- Clear problem statement
- Hint (collapsed/hidden if possible)
- Full solution with step-by-step explanation
- What concept this tests
- Common mistakes on this type of problem`,
  },
  {
    id: 'learn-mental-model',
    categoryId: 'learning',
    title: '🧩 Mental Model Builder',
    description: 'Build a mental framework for understanding any domain',
    tags: ['mental-model', 'framework', 'thinking'],
    template: `Help me build a mental model for understanding: [DOMAIN/TOPIC]

I want a framework I can carry in my head that helps me reason about this topic even in situations I haven't seen before.

Provide:
1. **The core model** — The simplest mental picture that captures the essence (use an analogy or diagram description)
2. **Key variables** — What are the 3-5 things that matter most?
3. **How they interact** — What happens when you change each variable?
4. **Common situations** — Apply the model to 3 real scenarios
5. **Where the model breaks** — When does this simplification fail?
6. **Expert intuition** — What do experts "just know" that beginners don't?
7. **Building blocks** — What mental models complement this one?`,
  },

  // ═══════════════════════════════════════════════════════════════
  // CREATIVE & BRAINSTORMING
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'creative-brainstorm-rapid',
    categoryId: 'creative',
    title: '💡 Rapid Brainstorm (30 Ideas)',
    description: 'Generate a massive list of diverse ideas fast',
    tags: ['brainstorm', 'ideas', 'creative', 'ideation'],
    template: `Brainstorm 30 ideas for: [TOPIC/CHALLENGE]

**Context:** [what problem are you solving? constraints?]
**What's been tried:** [ideas you've already considered]

Organize into:
1. **🟢 Safe bets (10)** — Proven approaches likely to work
2. **🟡 Creative angles (10)** — Unexpected approaches worth exploring
3. **🔴 Moonshots (10)** — Wild ideas that could be genius or terrible

For each idea: one sentence description + why it might work.

Then pick your **Top 3** across all categories and explain why those have the highest potential.`,
  },
  {
    id: 'creative-name-brand',
    categoryId: 'creative',
    title: '✨ Name Generator',
    description: 'Generate names for products, companies, projects, or features',
    tags: ['naming', 'branding', 'creative'],
    template: `Generate name ideas for: [WHAT NEEDS A NAME]

**What it does:** [one sentence description]
**Vibe:** [e.g., modern/playful/professional/techy/friendly]
**Target audience:** [who uses this?]
**Constraints:** [.com available? short? specific language?]

Provide 25 names across these categories:
1. **Descriptive** — Says what it does (5 names)
2. **Abstract** — Sounds cool, conveys feeling (5 names)
3. **Compound** — Two words combined (5 names)
4. **Invented** — Made-up words that feel right (5 names)
5. **Metaphor** — Named after something that represents the concept (5 names)

For each name:
- The name
- Why it works
- Potential concerns (trademark, pronunciation, cultural)

⭐ Mark your top 3 picks with reasoning.`,
  },
  {
    id: 'creative-solve-problem',
    categoryId: 'creative',
    title: '🧠 Solve a Problem Creatively',
    description: 'Attack a problem from multiple angles to find breakthrough solutions',
    tags: ['problem-solving', 'creative-thinking', 'innovation'],
    template: `Help me solve this problem creatively: [DESCRIBE THE PROBLEM]

**What I've already tried:** [previous approaches]
**Constraints:** [budget, time, resources, etc.]

Attack this from multiple angles:

1. **Inversion** — What if we did the exact opposite?
2. **First principles** — Strip away assumptions. What's actually true?
3. **Analogy** — How have other industries/domains solved similar problems?
4. **Constraint removal** — If we had unlimited [time/money/people], what would we do?
5. **Worst possible idea** — What's the worst solution? (sometimes these flip into great ones)
6. **User perspective** — What would the affected person suggest?
7. **10x thinking** — What if we needed to make it 10x better, not 10% better?

Then:
- **Synthesis** — Combine the best elements from multiple angles
- **Next step** — The single smallest action to test the best idea`,
  },
  {
    id: 'creative-content-ideas',
    categoryId: 'creative',
    title: '📱 Content Calendar Ideas',
    description: 'Generate a month of content ideas for any platform',
    tags: ['content', 'social-media', 'calendar', 'ideas'],
    template: `Generate a month of content ideas for: [PLATFORM — Twitter/LinkedIn/YouTube/TikTok/Blog]

**Niche/Topic:** [what's the content about?]
**Audience:** [who follows you?]
**Goal:** [grow followers / drive sales / build authority / educate]
**Posting frequency:** [e.g., 3x per week]

For each content piece provide:
- **Hook/Title** — The attention-grabbing headline
- **Format** — Thread, carousel, video, story, long-form, etc.
- **Content brief** — 2-3 sentences on what to cover
- **Why it works** — The psychology behind why this will perform

Organize by week and mix content types:
- 40% value/educational
- 25% personal stories/behind-the-scenes
- 20% engagement (questions, polls, hot takes)
- 15% promotional`,
  },
  {
    id: 'creative-reframe-problem',
    categoryId: 'creative',
    title: '🔮 Reframe Any Problem',
    description: 'See a situation from completely different perspectives',
    tags: ['perspective', 'reframe', 'mindset'],
    template: `Help me reframe this situation. I might be looking at it wrong.

**The situation:** [describe what's happening]
**How I currently see it:** [your current interpretation/feeling]

Reframe this from these perspectives:
1. **The optimist** — What's the opportunity hidden in this?
2. **The scientist** — What would data say? What are the facts vs. my assumptions?
3. **Future me (5 years)** — Will this matter? What would I wish I'd done?
4. **The mentor** — What would a wise advisor I respect tell me?
5. **The contrarian** — What if the opposite of what I believe is true?
6. **The stoic** — What's within my control? What isn't? 
7. **The comedian** — What's absurd about this situation?

Then: What's the most useful reframe, and what does it suggest I should do next?`,
  },
  {
    id: 'creative-story-idea',
    categoryId: 'creative',
    title: '📖 Story/Plot Generator',
    description: 'Generate compelling story premises and plot structures',
    tags: ['story', 'fiction', 'plot', 'writing'],
    template: `Generate a compelling story concept.

**Genre:** [e.g., sci-fi, thriller, romance, literary fiction, mystery]
**Theme I want to explore:** [e.g., identity, power, forgiveness, technology, belonging]
**Tone:** [e.g., dark, hopeful, humorous, cerebral, emotional]
**Length target:** [short story / novella / novel / screenplay]

Provide:
1. **Logline** — One sentence that sells the story
2. **Protagonist** — Who are they? What do they want vs. what they need?
3. **Antagonist/Conflict** — What stands in their way? (external + internal)
4. **Hook** — The inciting incident that starts the story
5. **Twist** — The mid-point revelation that changes everything
6. **Climax** — The final confrontation or decision
7. **Theme statement** — What truth does this story explore?
8. **Opening line** — Give me a killer first sentence

Generate 3 completely different concepts so I can pick my favorite.`,
  },

  // ═══════════════════════════════════════════════════════════════
  // PRODUCTIVITY & WORKFLOW
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'productivity-weekly-plan',
    categoryId: 'productivity',
    title: '📅 Plan My Week',
    description: 'Turn a messy to-do list into an organized week',
    tags: ['planning', 'weekly', 'productivity', 'schedule'],
    template: `Help me plan my week. I have too much to do and need to be strategic.

**My to-do list:**
[dump everything you need to do]

**Fixed commitments this week:** [meetings, deadlines, appointments]
**Hours available for focused work:** [e.g., 25 hours]
**My #1 priority this week:** [the ONE thing that matters most]
**My energy pattern:** [e.g., most productive in mornings, crash after lunch]

Provide:
1. **Priority ranking** — Categorize everything as: Must do / Should do / Could do / Delegate / Delete
2. **Daily plan** — Mon-Fri with time blocks
3. **Deep work blocks** — Protected 2-3 hour blocks for priority work
4. **Buffer time** — Built in for overruns and surprises
5. **What to say no to** — Things on my list that I should drop or defer
6. **End-of-week success** — "This week was a win if I accomplished these 3 things"`,
  },
  {
    id: 'productivity-automate-task',
    categoryId: 'productivity',
    title: '🤖 Automate My Workflow',
    description: 'Find ways to automate repetitive tasks',
    tags: ['automation', 'workflow', 'efficiency', 'tools'],
    template: `Help me automate this repetitive task/workflow.

**What I do repeatedly:** [describe the manual process step by step]
**How often:** [daily / weekly / per project]
**Time it takes:** [how long each time?]
**Tools I already use:** [e.g., Google Sheets, Slack, VS Code, Notion]
**Technical level:** [can I write code? just use no-code tools? anything?]

Provide:
1. **Quick wins** — Things I can automate in under 30 minutes
2. **Medium effort** — Automations worth a few hours of setup
3. **Full solution** — The ideal automated workflow end-to-end
4. **Tools to use** — Specific tools, apps, or scripts with links
5. **Code/config** — If applicable, provide the actual code, Zapier config, or script
6. **Time savings** — How much time will each automation save per week?

Start with the highest-ROI automation first.`,
  },
  {
    id: 'productivity-email-triage',
    categoryId: 'productivity',
    title: '📧 Email Templates Kit',
    description: 'Pre-written templates for every common email scenario',
    tags: ['email', 'templates', 'communication', 'efficiency'],
    template: `Create a set of email templates I can reuse. I waste too much time writing the same types of emails.

**My role:** [e.g., product manager, freelancer, founder, engineer]
**Common scenarios I email about:**
[list your most frequent email types — or use these defaults]

Create templates for:
1. **Saying no politely** — Declining requests without burning bridges
2. **Following up** — When someone hasn't replied (non-annoying version)
3. **Asking for something** — Clear request with easy-to-say-yes framing
4. **Sharing bad news** — Direct but empathetic
5. **Scheduling a meeting** — With proposed times
6. **Giving an update** — Project status without the fluff
7. **Introduction** — Connecting two people via email
8. **Thank you** — Post-meeting or post-favor

For each template:
- Subject line
- Body (with [BRACKETS] for customizable parts)
- Keep each under 100 words`,
  },
  {
    id: 'productivity-system-design',
    categoryId: 'productivity',
    title: '⚙️ Design My System',
    description: 'Create a personal productivity or organizational system',
    tags: ['system', 'organization', 'workflow', 'gtd'],
    template: `Help me design a personal system for: [e.g., task management, note-taking, goal tracking, habit building, knowledge management]

**My current approach:** [what I do now — even if it's chaos]
**What's not working:** [pain points with current approach]
**Tools I like using:** [apps, notebooks, etc.]
**My personality:** [e.g., detail-oriented, big-picture, procrastinator, over-planner]

Design a system that:
1. **Takes less than 15 minutes/day** to maintain
2. **Has a clear inbox → process → organize → review** workflow
3. **Handles both** quick tasks AND long-term projects
4. **Includes a weekly review** ritual (what to check, in what order)
5. **Has escape hatches** — what to do when I fall behind

Provide:
- The system overview (how the pieces fit together)
- Daily routine (morning + evening, under 15 min total)
- Weekly review checklist
- How to set it up (step-by-step, under 1 hour)
- The #1 habit that makes the whole system work`,
  },
  {
    id: 'productivity-delegation',
    categoryId: 'productivity',
    title: '🎯 Delegation Brief',
    description: 'Write clear briefs so delegated work comes back right the first time',
    tags: ['delegation', 'management', 'brief', 'outsource'],
    template: `Create a delegation brief for this task. I want it done right the first time with minimal back-and-forth.

**Task:** [what needs to be done]
**Who's doing it:** [team member role/level, freelancer, VA, etc.]
**Deadline:** [when do you need it]

Write a brief that includes:
1. **Objective** — What done looks like (be specific)
2. **Context** — Why this matters (motivation + background)
3. **Scope** — What's included / what's NOT included
4. **Requirements** — Must-haves vs. nice-to-haves
5. **Examples** — "Make it like this" references
6. **Constraints** — Budget, tools, brand guidelines, etc.
7. **Check-in points** — When to show progress (not just the final deliverable)
8. **Definition of done** — How will we know it's complete and good?

Keep it under 1 page. Clear enough that they don't need to ask questions.`,
  },

  // ═══════════════════════════════════════════════════════════════
  // COMMUNICATION
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'comm-difficult-conversation',
    categoryId: 'communication',
    title: '💬 Navigate a Difficult Conversation',
    description: 'Prepare for tough talks with scripts and strategies',
    tags: ['difficult', 'conflict', 'script', 'conversation'],
    template: `Help me prepare for a difficult conversation.

**Situation:** [what happened or needs to be addressed]
**Who I'm talking to:** [relationship — boss, report, partner, friend, client]
**What I want to achieve:** [ideal outcome]
**What I'm afraid of:** [worst case scenario in my head]
**Their likely perspective:** [how they probably see the situation]

Provide:
1. **Opening line** — How to start without putting them on the defensive
2. **Key points script** — Exactly what to say for each main point (use "I" statements)
3. **If they get defensive** — De-escalation phrases to use
4. **If they shut down** — How to re-engage
5. **If they get emotional** — Empathetic responses that don't abandon your point
6. **Active listening prompts** — Questions to show you hear them
7. **Closing** — How to end with a clear agreement or next step
8. **Follow-up** — What to send after the conversation`,
  },
  {
    id: 'comm-salary-negotiation',
    categoryId: 'communication',
    title: '💰 Salary Negotiation Script',
    description: 'Scripts for negotiating compensation with confidence',
    tags: ['salary', 'negotiation', 'career', 'money'],
    template: `Help me negotiate my salary/compensation.

**Situation:** [new offer / annual review / promotion / counter-offer]
**Current compensation:** [what you make now]
**Their offer:** [what they offered, if applicable]
**Your target:** [what you want]
**Your leverage:** [competing offers, key skills, market data, recent wins]
**Your BATNA:** [what happens if you don't get what you want?]

Provide:
1. **Opening statement** — How to bring up compensation confidently
2. **Your case** — Script for presenting your value (numbers and impact)
3. **The ask** — Exact phrasing for stating your number
4. **If they say "that's above our budget"** — Response script
5. **If they say "we can't do that"** — How to negotiate non-salary comp (equity, PTO, bonus, remote, title)
6. **If they need time** — How to respond and follow up
7. **Closing** — Lock in the agreement
8. **Email follow-up** — Written confirmation template

Never apologize for asking. You're not asking for a favor — you're correcting a market mismatch.`,
  },
  {
    id: 'comm-public-speaking',
    categoryId: 'communication',
    title: '🎙️ Presentation Script',
    description: 'Create a compelling talk or presentation outline',
    tags: ['presentation', 'public-speaking', 'talk'],
    template: `Help me create a presentation about: [TOPIC]

**Audience:** [who are they? what do they care about?]
**Duration:** [how long is the talk?]
**Goal:** [inform / persuade / inspire / teach]
**Setting:** [conference talk, team meeting, pitch, class, etc.]

Structure:
1. **Opening hook (30 sec)** — Start with a story, question, or surprising fact (NOT "Hi, I'm...")
2. **Context (1-2 min)** — Why this matters to THIS audience right now
3. **Main point 1** — [with supporting evidence/story]
4. **Main point 2** — [with supporting evidence/story]
5. **Main point 3** — [with supporting evidence/story]
6. **So what?** — Connect back to the audience's world
7. **Close** — End on a memorable note (callback to opening, challenge, or inspiring thought)

Also provide:
- Suggested slide titles for each section
- 3 potential opening hooks to choose from
- Audience participation moments to keep engagement
- Transition phrases between sections`,
  },
  {
    id: 'comm-feedback-framework',
    categoryId: 'communication',
    title: '📣 Give Effective Feedback',
    description: 'Deliver feedback that motivates change without damaging relationships',
    tags: ['feedback', 'management', 'leadership'],
    template: `Help me give feedback to someone.

**Who:** [their role and my relationship to them]
**What happened:** [specific situation or behavior]
**Impact:** [how it affected the team, project, or outcomes]
**What I want to change:** [desired future behavior]
**Their personality:** [how do they usually receive feedback?]

Write the feedback using the SBI-I framework:
1. **Situation** — When and where (specific, not "you always...")
2. **Behavior** — What they did (observable facts, not judgments)
3. **Impact** — How it affected others (use "I noticed" not "you made me")
4. **Intent/Invitation** — What I'd like to see instead + ask for their perspective

Provide:
- The feedback script (what to say word-for-word)
- An alternative softer version (if they're sensitive)
- An alternative direct version (if they prefer bluntness)
- How to handle "but I was just..." defensive responses
- A positive reinforcement version (if the feedback is about something good)`,
  },
  {
    id: 'comm-apology',
    categoryId: 'communication',
    title: '🕊️ Write a Good Apology',
    description: 'Craft genuine apologies that repair trust',
    tags: ['apology', 'repair', 'trust', 'relationship'],
    template: `Help me write a genuine apology.

**What happened:** [what I did or failed to do]
**Who was affected:** [person/people and relationship]
**The impact:** [how it affected them — be honest]
**Context (not excuse):** [what was going on for me]

Write an apology that:
1. **Acknowledges** — Name exactly what I did wrong (no "if I offended you")
2. **Takes responsibility** — No "but" or shifting blame
3. **Shows understanding** — Demonstrate I understand how they felt
4. **Explains (briefly)** — Context, not justification
5. **States what I'll do differently** — Specific, actionable change
6. **Asks, doesn't demand** — Request forgiveness without expecting it

Provide:
- In-person script version
- Written/text version
- What NOT to say (common apology mistakes)`,
  },
];

/* ─── HELPER: Get prompts by category ─── */
export function getPromptsByCategory(categoryId: string): PromptTemplate[] {
  return PROMPT_TEMPLATES.filter(p => p.categoryId === categoryId);
}

/* ─── HELPER: Search prompts ─── */
export function searchPrompts(query: string): PromptTemplate[] {
  const q = query.toLowerCase();
  return PROMPT_TEMPLATES.filter(p =>
    p.title.toLowerCase().includes(q) ||
    p.description.toLowerCase().includes(q) ||
    p.tags.some(t => t.toLowerCase().includes(q))
  );
}

/* ─── HELPER: Get prompts by tags ─── */
export function getPromptsByTags(tags: string[]): PromptTemplate[] {
  return PROMPT_TEMPLATES.filter(p =>
    tags.some(t => p.tags.includes(t))
  );
}
