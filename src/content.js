// Portfolio content: single source of truth. Written by the controller from JP's resume
// (JP Betis Resume 2026 Final.docx) and confirmed facts 2026-11-06. Builders copy verbatim;
// wording changes go back to the controller.

export const profile = {
  name: "John Paul Betis",
  short: "JP",
  title: "Manager of AI and Data Architecture",
  location: "Philippines (UTC+8), working US hours",
  pitch:
    "I build AI agents, data platforms and internal apps that people use every day, and I ship them to production.",
  summary:
    "10+ years across cloud support, analytics and data architecture. Today I lead the Business Intelligence team at a US real estate investment firm: the data warehouse, the pipelines into it, and the AI agents and apps built on top of it.",
  links: {
    github: "https://github.com/SaigoNoSenshi",
    linkedin: "https://linkedin.com/in/johnpaulbetis",
    credentials: "https://credential.net/jpbetis29/wallet",
    email: "jpaulbetis@gmail.com",
  },
};

export const stats = [
  { value: "90%", label: "less manual data work after integrating 10+ sources into one warehouse" },
  { value: "95%+", label: "data accuracy from validation pipelines" },
  { value: "75%", label: "faster reporting" },
  { value: "48%", label: "lower SaaS subscription spend after consolidation" },
  { value: "15+", label: "production apps and agents shipped since 2025" },
];

// "How I work" — written from what Claude (JP's coding partner) knows about how JP builds.
export const howIWork = [
  {
    title: "AI as an engineering team",
    body: "I run builds the way a small team would: one model investigates, writes the spec and reviews; others build in parallel; an independent reviewer tries to break every change before it ships.",
  },
  {
    title: "Numbers you can trace",
    body: "Every figure an app or agent shows comes from the warehouse and can be traced back to its source rows. If the data is incomplete, the screen says so instead of guessing.",
  },
  {
    title: "Security is the first requirement",
    body: "Secrets live in environment variables, access is checked on the server, and anything that can fail closes the door rather than opening it.",
  },
  {
    title: "Ship, then sharpen",
    body: "I get a working version in front of real users fast, then iterate on what they actually do with it. Every feature gets a real screen, not just an endpoint.",
  },
];

// Data-flow funnel (animated SVG): wide at the top, narrowing to outcomes.
export const funnel = {
  sources: ["CRM", "ERP & ledgers", "Property management", "Ad platforms", "Web analytics", "Microsoft 365", "Documents"],
  warehouse: { label: "Cloud data warehouse", detail: "BigQuery: raw, cleaned and modeled layers" },
  agents: { label: "AI agents & apps", detail: "Chat and voice assistants, analysts, MCP tools, internal apps" },
  outcomes: ["90% less manual work", "95%+ accuracy", "75% faster reporting"],
};

export const experience = [
  {
    role: "Manager of AI and Data Architecture",
    org: "Spartan Investment Group LLC",
    orgNote: "US real estate investment firm, $800M+ AUM, 74+ facilities in 11 states, ~300 employees",
    period: "Feb 2025 – Present",
    points: [
      "Lead the Business Intelligence team: data pipelines, integration, automation, AI agents and agentic apps across the company.",
      "Consolidated SaaS tools and led AI platform strategy for ~300 staff: cut subscription costs 48% and rolled out an M365 Copilot + OpenRouter setup for under $1,500/month.",
      "Integrated 10+ sources (CRM, ERP, property management, ad platforms) into BigQuery, cutting manual data work 90% and speeding up reporting 75%.",
      "Raised data accuracy to 95%+ with validation pipelines that catch discrepancies before they reach a report.",
      "Shipped production apps with React, Firebase, FastAPI and BigQuery using Claude Code, from a company-wide AI assistant to field operations and marketing intelligence suites.",
      "Built agentic systems on Claude, OpenAI and n8n for loan analysis, campaign generation, investor-relations data extraction, transcription and an enterprise knowledge base.",
    ],
  },
  {
    role: "Associate Data Architect Analyst",
    org: "WebFX Inc.",
    orgNote: "Full-service digital marketing agency",
    period: "May 2023 – Dec 2024",
    points: [
      "Raised GA4/GTM/Google Ads data accuracy from 85% to 95% through audits and tag fixes across client accounts.",
      "Configured the MarketingCloudFX platform to drive data-driven client growth.",
      "Automated client data workflows with Excel, Power Query and Python.",
    ],
  },
  {
    role: "Digital Marketing Consultant – Google Analytics",
    org: "Google Operations Center",
    period: "May 2021 – May 2023",
    points: [
      "Advanced support for GA4 360, Google Ads, BigQuery, GMP, Search Ads 360 and Looker Studio.",
      "Configured GTM tags including Consent Mode, e-commerce tracking and server-side tagging.",
    ],
  },
  {
    role: "Cloud Support Engineer / SME – GCP",
    org: "TELUS International Philippines",
    period: "Sep 2017 – May 2021",
    points: [
      "Grew from GCP subject-matter expert to cloud customer support for App Engine, GKE and Cloud services.",
    ],
  },
  {
    role: "Technical Support Representative",
    org: "Convergys",
    period: "Jul 2015 – Aug 2017",
    points: ["Technical support for AT&T U-verse: troubleshooting, configuration and escalations."],
  },
];

// Project cards. kind: "work" = built at work, cleaned copy (company names, people, keys and data removed);
// "personal" = my own projects. repo = name on github.com/SaigoNoSenshi. public=false hides the code link
// and shows "Code available on request" until JP flips the repo public. live = optional demo URL.
export const projects = [
  { kind: "work", name: "Leo", repo: "leo-ai-workplace-assistant", public: false, featured: true,
    summary: "Company-wide AI assistant in chat and voice: answers from the data warehouse, email, calendar, Teams and documents, with per-user access control on every source.",
    stack: ["FastAPI", "React", "Postgres + pgvector", "Microsoft Graph", "OpenRouter"] },
  { kind: "work", name: "Marketing Intelligence Command Center", repo: "marketing-intelligence-command-center", public: false, featured: true,
    summary: "Marketing analytics suite with Google Ads, GA4, GTM, Search Console and Meta connectors, warehouse views per location, and an AI analyst that refuses to answer when the data isn't there.",
    stack: ["FastAPI", "React", "BigQuery", "Cloud Run"] },
  { kind: "work", name: "AI Learning Academy", repo: "ai-academy-platform", public: false, featured: true,
    summary: "Gamified AI training platform for staff: courses, XP economy, seasons, leaderboards and an AI-graded practice playground.",
    stack: ["React", "Firebase Functions", "Firestore"] },
  { kind: "work", name: "Atlas", repo: "atlas-knowledge-assistant", public: false,
    summary: "Retrieval-augmented knowledge assistant over thousands of company documents, synced from SharePoint.",
    stack: ["FastAPI", "Postgres + pgvector", "OpenRouter"] },
  { kind: "work", name: "IT Helpdesk Portal", repo: "it-helpdesk-portal", public: false,
    summary: "IT ticket portal synced with an Azure DevOps board, with Teams chat updates, email notices and AI triage.",
    stack: ["FastAPI", "React", "Azure DevOps", "Microsoft Graph"] },
  { kind: "work", name: "Drawing Revision Diff", repo: "drawing-revision-diff", public: false,
    summary: "Compares two revisions of an architectural drawing, lists every change and exports to PDF, Excel, CSV, image or a written summary.",
    stack: ["Claude API", "Python", "JavaScript"] },
  { kind: "work", name: "Investor Update Studio", repo: "investor-update-studio-v2", public: false,
    summary: "Generates per-asset investor update reports from templates and data, with an approval step that hands off to automation.",
    stack: ["Python", "n8n", "LLM"] },
  { kind: "work", name: "Project Command Center", repo: "app-command-center", public: false,
    summary: "Live catalog of every internal app: GitHub sync, automatic onboarding of new repos, site health checks and AI write-ups.",
    stack: ["React", "Firebase", "GitHub API"] },
  { kind: "work", name: "AI Usage Dashboard", repo: "ai-spend-dashboard", public: false,
    summary: "Tracks AI spend across providers and projects so every dollar is attributed.",
    stack: ["React", "Python"] },
  { kind: "work", name: "Project Request Portal", repo: "data-request-portal", public: false,
    summary: "Intake forms for data and BI requests with routing, notifications and a review board.",
    stack: ["React", "Firebase", "Microsoft Graph"] },
  { kind: "work", name: "Construction Lifecycle Agent", repo: "construction-lifecycle-agent", public: false,
    summary: "Agent that follows a construction project from preconstruction to closeout.",
    stack: ["Python", "LLM"] },
  { kind: "work", name: "FieldLog", repo: "fieldlog", public: false,
    summary: "Offline-first field logging app for site teams.",
    stack: ["React", "PWA"] },
  { kind: "work", name: "Meeting Transcriber", repo: "meeting-notes-transcriber", public: false,
    summary: "Turns meeting video and audio into transcripts and notes.",
    stack: ["Python", "Whisper"] },
  { kind: "work", name: "Deal Radar", repo: "deal-sourcing-radar", public: false,
    summary: "Watches real estate deal sources and surfaces the ones that fit.",
    stack: ["Python", "React"] },
  { kind: "work", name: "Marketing Attribution Dashboard", repo: "ad-attribution-dashboard", public: false,
    summary: "Ad-to-lead attribution dashboard on warehouse data.",
    stack: ["React", "BigQuery"] },
  { kind: "work", name: "Team Events Calendar", repo: "events-calendar", public: false,
    summary: "Shared calendar of company events.",
    stack: ["React"] },
  { kind: "work", name: "React UI Kit", repo: "react-ui-kit", public: false,
    summary: "Shared component kit used across internal apps.",
    stack: ["React", "Tailwind"] },
  { kind: "work", name: "AI Agent Legion", repo: "ai-agent-legion", public: false,
    summary: "Collection of AI agents and MCP tools, including a warehouse query server.",
    stack: ["Python", "MCP"] },
  { kind: "work", name: "Codex AI OS", repo: "codex-ai-os", public: false,
    summary: "Workspace setup for running coding agents.",
    stack: ["Markdown", "Shell"] },

  { kind: "personal", name: "PJ's Diamond World", repo: "pjs-diamond-world", public: true, featured: true,
    live: "https://saigonosenshi.github.io/pjs-diamond-world/",
    summary: "A learning world for kids from Grade 1 to Grade 6: six learning islands, a daily quest, stickers and hundreds of quizzes, built as a tablet app.",
    stack: ["TypeScript", "React", "PWA"] },
  { kind: "personal", name: "Doodle Kingdom", repo: "doodle-kingdom", public: true, featured: true,
    live: "https://saigonosenshi.github.io/doodle-kingdom/",
    summary: "Coloring, drawing, tracing and music app for kids: photo-to-coloring-page, procedurally generated pages, bilingual English/Filipino, works offline.",
    stack: ["HTML", "JavaScript", "PWA"] },
  { kind: "personal", name: "Pivren OS", repo: "pivren-public", public: false,
    summary: "Personal startup concept site and operating plan.",
    stack: ["React"] },
  { kind: "personal", name: "Bloom", repo: "bloom-habit-planner", public: false,
    summary: "Personal efficiency app.",
    stack: ["JavaScript"] },
  { kind: "personal", name: "Strafe", repo: "strafe-ai-code-review", public: false,
    summary: "AI code reviewer.",
    stack: ["Python", "LLM"] },
];

export const skills = {
  "AI & LLMs": ["Claude (API, Code)", "OpenAI", "Gemini / Vertex AI", "DeepSeek", "Grok", "OpenRouter"],
  "Agents & automation": ["Multi-agent orchestration", "RAG", "MCP servers", "n8n", "Make.com", "Prompt engineering"],
  "Apps": ["React", "Vite", "Tailwind", "shadcn/ui", "Python", "FastAPI", "Node.js", "Firebase"],
  "Cloud & data": ["GCP", "BigQuery", "Vertex AI", "Azure", "AWS S3", "dbt", "Airflow", "Fivetran", "Hevo", "Skyvia"],
  "Analytics": ["GA4", "GTM", "Google Ads", "Looker Studio", "Power BI", "Streamlit"],
  "Platforms": ["Salesforce", "NetSuite", "HubSpot", "Microsoft 365", "SharePoint", "Copilot Studio"],
};

export const certifications = [
  { name: "Google Cloud Professional Data Engineer", issuer: "Google Cloud" },
  { name: "Google Cloud Professional Machine Learning Engineer", issuer: "Google Cloud" },
  { name: "Building Agentic RAG with Claude (MCP & Tool Use)", issuer: "Anthropic" },
  { name: "Building with Claude: AI Agents & Tool Use", issuer: "Anthropic" },
  { name: "Claude Code Fundamentals", issuer: "Anthropic" },
  { name: "Generative AI with Large Language Models", issuer: "DeepLearning.AI" },
  { name: "Power BI Data Analyst Associate", issuer: "Microsoft" },
  { name: "Google Analytics 4", issuer: "Google Skillshop" },
  { name: "Google Ads Search", issuer: "Google" },
  { name: "n8n Beginner", issuer: "n8n" },
  { name: "Make.com Automation", issuer: "Make" },
];

export const education = { degree: "BS Information Technology", school: "Bicol University", period: "2011 – 2015", note: "Best Thesis Paper Award" };
