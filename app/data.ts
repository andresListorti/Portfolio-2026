export const SITE_URL = "https://andres-listorti.vercel.app";
export const NAME = "Andrés Antonio Listorti";
export const ROLE = "Full-Stack Developer · AI-Native Engineer · Lawyer";

export const links = {
  upwork: "https://www.upwork.com/freelancers/~019cbbd63fe3a1e4b9",
  github: "https://github.com/andresListorti",
  linkedin: "https://www.linkedin.com/in/andres-listorti-177485240/",
  email: "andreslistorti@gmail.com",
  resume: "https://drive.google.com/file/d/1gT6qb8uN27dUFiHbApDt9nQKaFXvS_nW/view?usp=drive_link",
};

export type Project = {
  title: string;
  kind: string;
  year: string;
  summary: string;
  problem: string;
  built: string[];
  stack: string[];
  image?: string;
  live?: string;
  code?: string;
  isPrivate?: boolean;
};

export const featured: Project[] = [
  {
    title: "Zapatería Genaro",
    kind: "Full-stack e-commerce",
    year: "2026",
    summary:
      "Online store for an Argentine handmade footwear brand: catalog, cart, customer accounts, admin panel and in-site payments.",
    problem:
      "The brand needed its own store instead of relying on marketplaces, with payments and stock that stay consistent under real traffic.",
    built: [
      "Next.js 16 front end and an Express 5 / TypeScript API, both deployed on Vercel",
      "Mercado Pago Checkout Bricks with signature-verified, idempotent webhooks",
      "Stock reservation with a 30-minute expiry, Firestore security rules and a role-based admin",
      "Vitest + Testing Library, Sentry monitoring and transactional email via Resend",
    ],
    stack: ["Next.js", "React 19", "Express", "TypeScript", "Firestore", "Mercado Pago", "Vitest"],
    image: "/projects/genaro-home.webp",
    live: "https://genarozapateria.vercel.app",
    code: "https://github.com/andresListorti/Genio26",
  },
  {
    title: "Digital Assistant",
    kind: "AI agent SaaS for Instagram",
    year: "2026",
    summary:
      "Multi-tenant web app that turns an idea into an approved, published Instagram post, plus metrics and inbox handling.",
    problem:
      "Small businesses want AI-generated content without losing control of what goes out under their name.",
    built: [
      "Pluggable LLM providers for copy (Gemini, OpenAI, Claude) and image generation",
      "Human-in-the-loop approval before anything is published through the Meta Graph API",
      "Workspaces, auth and monthly plans billed through Mercado Pago",
      "Node / Express back end on Firestore, with webhooks for comments, DMs and mentions",
    ],
    stack: ["AI agents", "LLM APIs", "Node.js", "Express", "Firestore", "Meta Graph API"],
    image: "/projects/digital-home.webp",
    live: "https://digitalassistant.com.ar",
    isPrivate: true,
  },
];

export const more: Project[] = [
  {
    title: "Costs & Pricing App",
    kind: "Internal business tool",
    year: "2026",
    summary:
      "Installable PWA that replaced a footwear factory's pricing spreadsheet: per-article cost breakdowns, price levels, charts and Excel / PDF reports.",
    problem: "",
    built: [],
    stack: ["PWA", "JavaScript", "Firebase", "Firestore"],
    isPrivate: true,
  },
  {
    title: "AI Chatbot",
    kind: "LLM chat interface",
    year: "2025",
    summary: "Streaming chat UI built with the Vercel AI SDK on top of OpenAI models, Next.js and TypeScript.",
    problem: "",
    built: [],
    stack: ["Vercel AI SDK", "OpenAI", "Next.js", "TypeScript"],
    code: "https://github.com/andresListorti/React-Native-Chatbot",
  },
  {
    title: "Spring Boot REST API",
    kind: "Java back end",
    year: "2024",
    summary:
      "Layered e-commerce API (model / repository / service / controller) with full CRUD for users, customers, products and addresses.",
    problem: "",
    built: [],
    stack: ["Java", "Spring Boot", "JPA", "H2"],
    code: "https://github.com/andresListorti/java-ecomm",
  },
  {
    title: "Real-time Products API",
    kind: "Node.js back end",
    year: "2025",
    summary: "Express API for products and carts with a live product view pushed over Socket.io.",
    problem: "",
    built: [],
    stack: ["Node.js", "Express", "Socket.io", "Handlebars"],
    code: "https://github.com/andresListorti/ecommerce-api",
  },
];

export const aiPractices = [
  {
    title: "AI-native, every day",
    body: "I build with Claude Code, GitHub Copilot, OpenAI Codex and Cursor, and keep per-project agent instructions (CLAUDE.md) so the tools work from accurate context.",
  },
  {
    title: "AI code, reviewed like a PR",
    body: "Model output doesn't ship unread. I check correctness, edge cases, security (auth, secrets, webhook signatures), idempotency and readability first.",
  },
  {
    title: "Products built on LLMs",
    body: "I've shipped apps that call Gemini, OpenAI and Claude, stream responses, and keep a human approval step before an agent does anything public.",
  },
  {
    title: "Precise technical writing",
    body: "Fifteen years of legal drafting shows in my reviews, specs and READMEs: clear, structured and well argued, in English (C1) and Spanish.",
  },
];

export const experience = [
  {
    period: "2022 — present",
    title: "Freelance Full-Stack Developer",
    org: "Self-employed · Remote",
    body: "End-to-end products for small businesses: the Zapatería Genaro store, a costs & pricing tool for a shoe factory, and Digital Assistant, an AI SaaS for Instagram. Self-taught since 2020.",
  },
  {
    period: "2010 — present",
    title: "Independent Attorney",
    org: "Business, commercial, labor & civil law",
    body: "Independent practice including commercial law for banking clients. Where I learned rigorous reading, risk analysis and clear communication with non-technical clients.",
  },
];

export const education = [
  { title: "Full Stack Development", org: "Coderhouse", period: "2023 — 2024" },
  { title: "Next.js — Intensive Career (cert.)", org: "Coderhouse", period: "2025" },
  { title: "React JS — Intensive Career (cert.)", org: "Coderhouse", period: "2024" },
  { title: "Algorithms in Python", org: "ITMaster Academy", period: "2022 — 2023" },
  { title: "Lawyer — Business Law", org: "Universidad de Belgrano", period: "2004 — 2009" },
];

export const stack = [
  { group: "Front end", items: ["TypeScript", "JavaScript", "React", "Next.js", "Tailwind CSS", "HTML / CSS"] },
  { group: "Back end", items: ["Node.js", "Express", "Java", "Spring Boot", "JPA", "Python", "Socket.io"] },
  { group: "Data & services", items: ["Firestore", "Firebase Auth", "MySQL", "Mercado Pago", "Meta Graph API", "Resend", "Sentry"] },
  { group: "AI", items: ["Claude Code", "GitHub Copilot", "OpenAI Codex", "Cursor", "Vercel AI SDK", "OpenAI / Gemini / Claude APIs"] },
  { group: "Tooling", items: ["Git & GitHub", "Vercel", "Vitest", "Postman", "Figma", "Jira / Scrum"] },
];
