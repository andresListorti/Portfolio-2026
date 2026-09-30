import type { ConsoleCopy } from "./components/orchestrator-console";
import type { PipelineCopy } from "./components/pipeline";

export const SITE_URL = "https://andres-listorti-2026.vercel.app";
export const NAME = "Andrés Antonio Listorti";

export type Locale = "en" | "es";
export const LOCALES: Locale[] = ["en", "es"];
export const localePath = (l: Locale) => (l === "en" ? "/" : "/es");

export const links = {
  upwork: "https://www.upwork.com/freelancers/~019cbbd63fe3a1e4b9",
  github: "https://github.com/andresListorti",
  linkedin: "https://www.linkedin.com/in/andres-listorti-177485240/",
  email: "andreslistorti@gmail.com",
  resume: "/Andres-Listorti-Resume-2026.pdf",
  whatsapp: "https://wa.me/5491125326630",
};

export type CaseStudy = {
  problem: string;
  approach: string;
  decisions: string[];
  outcome: string;
};

export type Project = {
  title: string;
  kind: string;
  year: string;
  summary: string;
  stack: string[];
  caseStudy?: CaseStudy;
  image?: string;
  live?: string;
  code?: string;
  isPrivate?: boolean;
};

export type Review = {
  file: string;
  repo: string;
  repoUrl: string;
  lang: string;
  context: string;
  before: string;
  issues: string[];
  after: string;
  why: string;
};

// Code is language-neutral; only the prose around it is translated.
const code = {
  webhookBefore: `const sig = req.headers['x-signature'];
if (sig && !verifySignature(sig, reqId, paymentId)) {
  return res.status(400).end();
}
await applyPayment(paymentId);`,
  webhookAfter: `// Always verify: a missing header must fail
// exactly like a wrong one.
const sig = String(req.headers['x-signature'] ?? '');
const reqId = String(req.headers['x-request-id'] ?? '');
if (!verifyMercadoPagoSignature(sig, reqId, paymentId)) {
  return res.status(400).json({ error: 'Invalid signature' });
}
// inside verify: HMAC-SHA256 + crypto.timingSafeEqual`,
  stockBefore: `const shoe = (await ref.get()).data();
const v = shoe.variants.find(
  (x) => x.size === size && x.color === color);
if (v.stock < qty) throw new Error('Out of stock');
v.stock -= qty;
await ref.update({ variants: shoe.variants });`,
  stockAfter: `await firestore.runTransaction(async (tx) => {
  const snap = await tx.get(ref);
  const variants = [...snap.data().variants];
  const i = variants.findIndex(
    (v) => v.size === size && v.color === color);
  if (i === -1) throw new VariantNotFound(shoeId);
  const available = variants[i].stock - (variants[i].reserved ?? 0);
  if (available < qty) throw new OutOfStock(shoeId);
  variants[i] = { ...variants[i],
    reserved: (variants[i].reserved ?? 0) + qty };
  tx.update(ref, { variants });
});`,
  springBefore: `@PostMapping
public ResponseEntity<ProductDTO> createProduct(
    @RequestBody ProductDTO productDTO) {
  return ResponseEntity.ok(productService.createProduct(productDTO));
}

@DeleteMapping("/{id}")
public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
  productService.deleteProduct(id);
  return ResponseEntity.noContent().build();
}`,
  springAfter: `// ProductDTO: @NotBlank String model; @NotBlank String brand;
@PostMapping
public ResponseEntity<ProductDTO> create(
    @Valid @RequestBody ProductDTO dto) {
  ProductDTO saved = productService.createProduct(dto);
  return ResponseEntity
      .created(URI.create("/api/products/" + saved.getId()))
      .body(saved);
}

@DeleteMapping("/{id}")
public ResponseEntity<Void> delete(@PathVariable Long id) {
  if (!productRepository.existsById(id)) {
    return ResponseEntity.notFound().build();
  }
  productService.deleteProduct(id);
  return ResponseEntity.noContent().build();
}`,
};

type Content = {
  meta: { title: string; description: string; ogLocale: string };
  nav: { href: string; label: string }[];
  ui: {
    hireMe: string;
    toTop: string;
    themeLabel: string;
    langSwitch: string;
    langSwitchLabel: string;
    sectionsLabel: string;
  };
  hero: {
    badge: string;
    role: string;
    lead: string;
    upwork: string;
    email: string;
    resume: string;
    location: string;
  };
  about: {
    eyebrow: string;
    title: string;
    p1: string;
    p2: string;
    tiles: { label: string; value: string; sub?: string }[];
  };
  stats: { value: number; suffix: string; label: string }[];
  marquee: string[];
  graphLabels: string[];
  images: { law: string; orchestration: string; portrait: string };
  services: {
    eyebrow: string;
    title: string;
    intro: string;
    cta: string;
    items: { name: string; body: string; deliverables: string[] }[];
  };
  console: ConsoleCopy;
  pipeline: PipelineCopy & { eyebrow: string; title: string; intro: string };
  lab: {
    eyebrow: string;
    title: string;
    intro: string;
    items: { name: string; kind: string; body: string; stack: string[]; href?: string; linkLabel?: string }[];
  };
  reviews: {
    eyebrow: string;
    title: string;
    intro: string;
    context: string;
    before: string;
    issues: string;
    after: string;
    why: string;
    source: string;
    items: Review[];
  };
  law: {
    eyebrow: string;
    title: string;
    intro: string;
    points: { title: string; body: string }[];
    note: string;
  };
  work: {
    eyebrow: string;
    title: string;
    more: string;
    live: string;
    productSite: string;
    code: string;
    privateNote: string;
    screenshotAlt: string;
    labels: { problem: string; approach: string; decisions: string; outcome: string };
    featured: Project[];
    others: Project[];
  };
  experience: {
    eyebrow: string;
    title: string;
    educationLabel: string;
    items: { period: string; title: string; org: string; body: string }[];
    education: { title: string; org: string; period: string }[];
  };
  stack: { eyebrow: string; title: string; groups: { group: string; items: string[] }[] };
  contact: {
    eyebrow: string;
    title: string;
    body: string;
    upwork: string;
    resumeLabel: string;
    channels: { label: string; value: string; href: string }[];
  };
  footer: { built: string };
};

const stackItems = {
  front: ["TypeScript", "JavaScript", "React", "Next.js", "Tailwind CSS", "HTML / CSS"],
  back: ["Node.js", "Express", "Java", "Spring Boot", "JPA", "Python", "Socket.io"],
  data: ["Firestore", "Firebase Auth", "MySQL", "Mercado Pago", "Meta Graph API", "Resend", "Sentry"],
  ai: ["Claude Code", "GitHub Copilot", "OpenAI Codex", "Cursor", "Vercel AI SDK", "OpenAI / Gemini / Claude APIs"],
  tooling: ["Git & GitHub", "Vercel", "Vitest", "Postman", "Figma", "Jira / Scrum"],
};

const repos = {
  genio: "https://github.com/andresListorti/Genio26",
  java: "https://github.com/andresListorti/java-ecomm",
};

export const content: Record<Locale, Content> = {
  en: {
    meta: {
      title: `${NAME} — AI-Native Web & App Builder & Lawyer`,
      description:
        "AI-native builder and lawyer in Buenos Aires. Websites, custom business apps, AI assistants and automations, built fast with the latest AI tools.",
      ogLocale: "en_US",
    },
    nav: [
      { href: "#process", label: "Process" },
      { href: "#lab", label: "AI work" },
      { href: "#services", label: "Services" },
      { href: "#work", label: "Projects" },
      { href: "#law", label: "AI + Law" },
      { href: "#about", label: "About" },
      { href: "#contact", label: "Contact" },
    ],
    ui: {
      hireMe: "Hire me",
      toTop: "back to top",
      themeLabel: "Toggle color theme",
      langSwitch: "ES",
      langSwitchLabel: "Ver en español",
      sectionsLabel: "Sections",
    },
    hero: {
      badge: "Taking new projects: websites, apps & AI automations",
      role: "AI-native web & app builder and lawyer",
      lead: "I build websites, custom business apps and AI automations with the latest AI tools, so you get a working product in days or weeks, not months.",
      upwork: "Hire me on Upwork",
      email: "Email",
      resume: "Resume",
      location: "Buenos Aires · GMT-3",
    },
    about: {
      eyebrow: "About",
      title: "A builder who spent fifteen years as a lawyer first.",
      p1: "I've practiced business law since 2010 and have been building digital products since 2020. Today I work AI-native: AI tools do most of the building, and I own the result, from the plan to the product running live. I build for businesses in any niche: stores, services, professionals and startups.",
      p2: "The legal background isn't a footnote. It's why I scope work carefully, think about what can go wrong, and explain decisions clearly to clients who aren't technical.",
      tiles: [
        { label: "Law", value: "Since 2010", sub: "Business law · Universidad de Belgrano" },
        { label: "Building", value: "Since 2020", sub: "AI-native · React & Next.js certs" },
        { label: "Languages", value: "English C1 · Spanish native" },
        { label: "Works with", value: "Next.js · Node · Java/Spring · Firebase" },
      ],
    },
    stats: [
      { value: 15, suffix: "+", label: "years practicing business law" },
      { value: 6, suffix: "+", label: "years building software" },
      { value: 3, suffix: "", label: "products running in production" },
      { value: 4, suffix: "", label: "AI coding agents in my daily loop" },
    ],
    marquee: ["Claude Code", "Next.js", "React", "Node.js", "TypeScript", "AI agents", "Python", "Firestore", "Mercado Pago", "MCP", "OpenCode", "Vercel", "Nano Banana", "Business law"],
    graphLabels: ["Claude Code", "Codex", "MCP", "OpenCode", "React", "Next.js", "Node.js", "Java", "Python", "Firestore", "Vercel", "Automations", "Business law", "AI governance"],
    images: {
      law: "Scales of justice drawn as a glowing knowledge graph, weighing legal papers against code",
      orchestration: "A developer at night directing floating AI agent terminals connected to one central node",
      portrait: "Portrait of Andrés Listorti",
    },
    services: {
      eyebrow: "Services",
      title: "What I can do for you.",
      intro: "For businesses in any niche, remote from Buenos Aires, in English or Spanish. Fixed price and clear delivery dates.",
      cta: "Start a project",
      items: [
        { name: "Websites & landing pages", body: "Fast, mobile-first sites that load quickly and rank: from a one-page landing to a full company site on your own domain.", deliverables: ["live in days, not months", "SEO and analytics ready", "WhatsApp and contact forms wired in"] },
        { name: "Custom business apps", body: "Apps shaped around how your business actually works: online stores, booking, pricing and stock tools, client portals and dashboards.", deliverables: ["login, database and admin panel", "payments with Mercado Pago or Stripe", "built for your niche"] },
        { name: "AI assistants & automations", body: "Chatbots and agents that answer clients, capture leads and draft content, with a human approval step where it matters.", deliverables: ["website, Instagram or WhatsApp", "Gemini, OpenAI or Claude", "human-in-the-loop by design"] },
        { name: "AI visuals & legal-aware delivery", body: "Product photos, social media assets and short promo videos made with AI, plus plain-language notes on data and terms of service from a practicing lawyer.", deliverables: ["Nano Banana and Higgsfield visuals", "privacy-aware by default (GDPR / Ley 25.326)", "bilingual EN / ES"] },
      ],
    },
    console: {
      ariaLabel: "Animated example of how I orchestrate AI coding agents and review their output",
      title: "orchestrator.run",
      agentsLabel: "Agents",
      reviewLabel: "review",
      approved: "approved",
      returned: "returned",
      idle: "idle",
      working: "working",
      tasks: [
        { agent: "claude-code", task: "split the redesign into parallel tasks", log: ["wrote SPEC.md: 5 components, 1 owner each", "types first, no shared files"], verdict: "approved", note: "no two agents touch the same file" },
        { agent: "muse-spark", task: "build the hero orchestration console", log: ["created orchestrator-console.tsx", "added reduced-motion fallback"], verdict: "approved", note: "pauses when off-screen" },
        { agent: "codex", task: "mark order paid from webhook", log: ["reads x-signature header", "verifies only if header is present"], verdict: "returned", note: "a missing header must fail closed" },
        { agent: "codex", task: "fix: always verify the signature", log: ["HMAC-SHA256 + timingSafeEqual", "400 when header is missing"], verdict: "approved", note: "fails closed now" },
        { agent: "nemotron", task: "canvas neural field for the hero", log: ["≤ 90 nodes, links under 140px", "devicePixelRatio capped at 2"], verdict: "approved", note: "static frame for reduced motion" },
        { agent: "claude-code", task: "reserve stock during checkout", log: ["read + check + write in one transaction", "30-minute reservation"], verdict: "approved", note: "no overselling under concurrency" },
      ],
    },
    pipeline: {
      eyebrow: "How I work with AI",
      title: "I direct the agents. I sign off on the result.",
      intro: "AI writes most of the first draft. My job is to make the task impossible to misread, route it to the right model, and refuse anything I wouldn't put my name on.",
      progressLabel: "step",
      steps: [
        { name: "Brief", body: "Turn a request into a spec an agent can't misread: goal, constraints, files it may touch and what done looks like.", detail: ["SPEC.md + CLAUDE.md per project", "out-of-scope written down", "acceptance checks named up front"] },
        { name: "Plan", body: "Choose the architecture and split the work into pieces that can run in parallel without colliding.", detail: ["one owner per file", "interfaces and types first", "pick the model per task"] },
        { name: "Delegate", body: "Claude Code orchestrates. Implementation goes to the model that fits: Claude, Codex, or open models like Muse Spark and Nemotron through OpenCode.", detail: ["parallel agent sessions", "MCP tools: Vercel, Drive, image generation", "cheap models for boilerplate"] },
        { name: "Review", body: "Nothing ships unread. Agent output gets reviewed like a pull request: correctness, edge cases, security and readability.", detail: ["tsc + build + tests must pass", "auth, secrets, webhooks checked by hand", "returned with notes when it falls short"] },
        { name: "Ship", body: "Preview deploy per branch, checked in a real browser, then merged.", detail: ["Vercel preview on every push", "mobile + reduced-motion pass", "merge to main"] },
      ],
    },
    lab: {
      eyebrow: "Built with agents",
      title: "Recent AI work.",
      intro: "What I've shipped lately with AI agents in the loop, and how the work was split between them and me.",
      items: [
        { name: "This portfolio", kind: "Multi-agent build, 2026", body: "I wrote the design spec and split it by file. Claude Code orchestrated; the hero console and scroll sequence went to Muse Spark, the canvas field and code viewer to Nemotron, both through OpenCode over MCP. I reviewed, type-checked and built every file before merging.", stack: ["Claude Code", "OpenCode", "MCP", "Next.js", "Motion"], href: "https://github.com/andresListorti/Portfolio-2026", linkLabel: "Source" },
        { name: "Digital Assistant", kind: "AI agent SaaS, 2026", body: "An agent that drafts Instagram posts and images with Gemini, OpenAI or Claude, schedules them and handles the inbox, but never publishes without a human approval.", stack: ["LLM APIs", "Agents", "Node.js", "Meta Graph API"], href: "https://digitalassistant.com.ar", linkLabel: "Product site" },
        { name: "Agent workstation", kind: "Daily setup", body: "Claude Code as orchestrator, with MCP connectors for Vercel, Google Drive, image generation and a local ComfyUI, plus OpenCode to route routine tasks to open models and keep costs down.", stack: ["Claude Code", "MCP", "OpenCode", "ComfyUI"] },
      ],
    },
    reviews: {
      eyebrow: "Code review samples",
      title: "What I look for when I review code.",
      intro:
        "Review notes from my own projects. Snippets are shortened; the “before” is the naive version a first draft (or an AI assistant) tends to produce, the “after” is the pattern I ship or recommend.",
      context: "Context",
      before: "Before",
      issues: "Issues found",
      after: "After",
      why: "Why it matters",
      source: "Source",
      items: [
        {
          file: "webhook.controller.ts",
          repo: "Genio26",
          repoUrl: repos.genio,
          lang: "TypeScript · Express",
          context: "Mercado Pago payment notifications for an online store. The handler marks orders as paid.",
          before: code.webhookBefore,
          issues: [
            "Security: verification only runs when the header is present, so omitting x-signature bypasses it entirely.",
            "Security: a verifier that returns true when the secret is unset fails open if an env var is missing in production.",
            "Correctness: comparing signatures with === leaks timing information; use a constant-time comparison.",
          ],
          after: code.webhookAfter,
          why: "A webhook is an unauthenticated public endpoint that moves money-related state. The check has to be unconditional and fail closed, otherwise anyone who can send an HTTP request can mark an order as paid.",
        },
        {
          file: "shoe.service.ts",
          repo: "Genio26",
          repoUrl: repos.genio,
          lang: "TypeScript · Firestore",
          context: "Holding stock while a buyer completes payment, so two people can't buy the last pair.",
          before: code.stockBefore,
          issues: [
            "Race condition: read, check and write are separate operations, so two concurrent checkouts can both pass the check and oversell.",
            "Logic: it ignores units already held by other in-flight payments.",
            "Robustness: find() can return undefined, turning a bad request into a TypeError and a 500.",
          ],
          after: code.stockAfter,
          why: "The transaction makes the check and the write atomic, and Firestore retries it on contention. Reserving instead of decrementing means an abandoned checkout gives its units back when the 30-minute reservation expires.",
        },
        {
          file: "ProductController.java",
          repo: "java-ecomm",
          repoUrl: repos.java,
          lang: "Java · Spring Boot 3",
          context: "Self-review of an older REST API I wrote while learning Spring.",
          before: code.springBefore,
          issues: [
            "Validation: @RequestBody without @Valid, and no constraints on the DTO, so blank products are persisted.",
            "HTTP semantics: creating a resource returns 200 with no Location header instead of 201 Created.",
            "API contract: deleteById is a silent no-op for unknown ids in Spring Data 3, so DELETE returns 204 even when nothing existed.",
          ],
          after: code.springAfter,
          why: "Clients rely on status codes to tell a typo from a success. Validating at the edge keeps bad data out of the database, and 201 + Location lets callers find what they just created without guessing.",
        },
      ],
    },
    law: {
      eyebrow: "AI + Law",
      title: "Why a lawyer who codes is useful on AI projects.",
      intro:
        "Most AI risk isn't in the model; it's in what the product does with people's data and what it's allowed to do on their behalf. That's where my two careers overlap.",
      points: [
        {
          title: "Human in the loop, by design",
          body: "In Digital Assistant, nothing an LLM writes is published without an explicit human approval, and failed posts go back to review instead of being retried blindly. Accountability is a product decision, not a disclaimer.",
        },
        {
          title: "Data-protection-aware development",
          body: "I design with Argentina's Personal Data Protection Law (Ley 25.326) and GDPR basics in mind: collect only what's needed, know why each field exists, keep secrets and credentials out of repos, and make deletion possible.",
        },
        {
          title: "Contract and ToS literacy",
          body: "I read API terms, platform policies and client contracts the way I read code: what's promised, what's excluded, who carries the risk. That matters when a product depends on Meta, payment providers or model vendors.",
        },
        {
          title: "Governance you can explain",
          body: "Clients and compliance teams need to understand what an AI feature does. I document behavior, limits and failure modes in plain language, in English and Spanish.",
        },
      ],
      note: "I'm a practicing lawyer in Argentina, not a certified privacy officer; for regulated work I collaborate with the client's legal team.",
    },
    work: {
      eyebrow: "Selected work",
      title: "Real products, running in production.",
      more: "More projects",
      live: "Live",
      productSite: "Product site",
      code: "Code",
      privateNote: "Private code · demo on request",
      screenshotAlt: "screenshot of the live site",
      labels: { problem: "Problem", approach: "Approach", decisions: "Key decisions", outcome: "Outcome" },
      featured: [
        {
          title: "Zapatería Genaro",
          kind: "Full-stack e-commerce",
          year: "2026",
          summary: "Online store for an Argentine handmade footwear brand: catalog, cart, customer accounts, admin panel and in-site payments.",
          stack: ["Next.js", "React 19", "Express", "TypeScript", "Firestore", "Mercado Pago", "Vitest"],
          caseStudy: {
            problem:
              "The brand needed its own store instead of relying on marketplaces, with payments and stock that stay consistent under real traffic.",
            approach:
              "A Next.js front end and a separate Express / TypeScript API, both on Vercel, with Firestore and Firebase Auth. Mercado Pago Checkout Bricks keeps payment inside the site.",
            decisions: [
              "Signature-verified, idempotent webhooks: an order is fulfilled exactly once, whichever path confirms the payment first.",
              "Stock is reserved in a transaction for 30 minutes, and the payment link expires at the same moment.",
              "Underpaid payments are never fulfilled; PayPal was switched off because its sandbox mode allowed fake payments.",
              "Vitest + Testing Library, Sentry monitoring and transactional email via Resend.",
            ],
            outcome:
              "Live with catalog, accounts and admin working. Checkout is deliberately closed behind a launch switch until the owner opens the store.",
          },
          image: "/projects/genaro-home.webp",
          live: "https://genarozapateria.vercel.app",
          code: repos.genio,
        },
        {
          title: "Digital Assistant",
          kind: "AI agent SaaS for Instagram",
          year: "2026",
          summary: "Multi-tenant web app that turns an idea into an approved, published Instagram post, plus metrics and inbox handling.",
          stack: ["AI agents", "LLM APIs", "React", "Node.js", "Express", "Firestore", "Meta Graph API"],
          caseStudy: {
            problem: "Small businesses want AI-generated content without losing control of what goes out under their name.",
            approach:
              "A React front end and a Node / Express API on Firestore. Each post is one document that moves through a state machine: queued → generated → approved or scheduled → publishing → published.",
            decisions: [
              "Pluggable LLM providers for copy and images (Gemini, OpenAI, Claude), plus a manual mode.",
              "Nothing is published through the Meta Graph API without an explicit human approval.",
              "Errors send a post back to review instead of losing it or retrying blindly.",
              "Workspaces, Google sign-in and monthly plans billed through Mercado Pago.",
            ],
            outcome:
              "In production at app.digitalassistant.com.ar, with review, calendar, comment and DM inboxes, and metrics.",
          },
          image: "/projects/digital-home.webp",
          live: "https://digitalassistant.com.ar",
          isPrivate: true,
        },
      ],
      others: [
        {
          title: "Costs & Pricing App",
          kind: "Internal business tool",
          year: "2026",
          summary:
            "Installable PWA that replaced a footwear factory's pricing spreadsheet: per-article cost breakdowns, price levels, charts and Excel / PDF reports.",
          stack: ["PWA", "JavaScript", "Firebase", "Firestore"],
          isPrivate: true,
        },
        {
          title: "AI Chatbot",
          kind: "LLM chat interface",
          year: "2025",
          summary: "Streaming chat UI built with the Vercel AI SDK on top of OpenAI models, Next.js and TypeScript.",
          stack: ["Vercel AI SDK", "OpenAI", "Next.js", "TypeScript"],
          code: "https://github.com/andresListorti/React-Native-Chatbot",
        },
        {
          title: "Spring Boot REST API",
          kind: "Java back end",
          year: "2024",
          summary:
            "Layered e-commerce API (model / repository / service / controller) with full CRUD for users, customers, products and addresses.",
          stack: ["Java", "Spring Boot", "JPA", "H2"],
          code: repos.java,
        },
        {
          title: "Real-time Products API",
          kind: "Node.js back end",
          year: "2025",
          summary: "Express API for products and carts with a live product view pushed over Socket.io.",
          stack: ["Node.js", "Express", "Socket.io", "Handlebars"],
          code: "https://github.com/andresListorti/ecommerce-api",
        },
      ],
    },
    experience: {
      eyebrow: "Experience",
      title: "Two careers, one way of working.",
      educationLabel: "Education",
      items: [
        {
          period: "2020 — present",
          title: "AI-Native Web & App Builder (freelance)",
          org: "Self-employed · Remote",
          body: "Digital products for small businesses, built AI-native: the Zapatería Genaro online store, a costs & pricing tool for a shoe factory, and Digital Assistant, an AI SaaS for Instagram.",
        },
        {
          period: "2010 — present",
          title: "Independent Attorney",
          org: "Business, commercial, labor & civil law",
          body: "Independent practice including commercial law for banking clients. Where I learned rigorous reading, risk analysis and clear communication with non-technical clients.",
        },
      ],
      education: [
        { title: "Full Stack Development", org: "Coderhouse", period: "2021 — 2024" },
        { title: "Next.js — Intensive Career (cert.)", org: "Coderhouse", period: "2025" },
        { title: "React JS — Intensive Career (cert.)", org: "Coderhouse", period: "2024" },
        { title: "Algorithms in Python", org: "ITMaster Academy", period: "2022 — 2023" },
        { title: "Lawyer — Business Law", org: "Universidad de Belgrano", period: "2004 — 2009" },
      ],
    },
    stack: {
      eyebrow: "Stack",
      title: "Tools I've actually shipped with.",
      groups: [
        { group: "Front end", items: stackItems.front },
        { group: "Back end", items: stackItems.back },
        { group: "Data & services", items: stackItems.data },
        { group: "AI", items: stackItems.ai },
        { group: "Tooling", items: stackItems.tooling },
      ],
    },
    contact: {
      eyebrow: "Contact",
      title: "Have a website, app or automation in mind?",
      body: "Pick whichever channel suits you. I answer in English or Spanish, usually within a day.",
      upwork: "Upwork profile",
      resumeLabel: "Download resume (PDF)",
      channels: [
        { label: "Email", value: "andreslistorti@gmail.com", href: "mailto:andreslistorti@gmail.com" },
        { label: "LinkedIn", value: "in/andres-listorti", href: links.linkedin },
        { label: "GitHub", value: "andresListorti", href: links.github },
        { label: "Upwork", value: "Freelancer profile", href: links.upwork },
        { label: "WhatsApp", value: "+54 9 11 2532-6630", href: links.whatsapp },
      ],
    },
    footer: { built: "Orchestrated with Claude Code, built with Next.js, deployed on Vercel." },
  },

  es: {
    meta: {
      title: `${NAME} — Creador de Webs y Apps con IA y Abogado`,
      description:
        "Creador AI-native y abogado en Buenos Aires. Sitios web, apps a medida para tu negocio, asistentes y automatizaciones con IA, hechos rápido con las últimas herramientas.",
      ogLocale: "es_AR",
    },
    nav: [
      { href: "#process", label: "Proceso" },
      { href: "#lab", label: "IA" },
      { href: "#services", label: "Servicios" },
      { href: "#work", label: "Proyectos" },
      { href: "#law", label: "IA + Derecho" },
      { href: "#about", label: "Sobre mí" },
      { href: "#contact", label: "Contacto" },
    ],
    ui: {
      hireMe: "Contratame",
      toTop: "volver arriba",
      themeLabel: "Cambiar tema de color",
      langSwitch: "EN",
      langSwitchLabel: "View in English",
      sectionsLabel: "Secciones",
    },
    hero: {
      badge: "Tomando proyectos: webs, apps y automatizaciones con IA",
      role: "Creador de webs y apps con IA, y abogado",
      lead: "Construyo sitios web, apps a medida y automatizaciones con las últimas herramientas de IA, para que tengas tu producto funcionando en días o semanas, no meses.",
      upwork: "Contratame en Upwork",
      email: "Email",
      resume: "CV",
      location: "Buenos Aires · GMT-3",
    },
    about: {
      eyebrow: "Sobre mí",
      title: "Un creador de productos que antes fue abogado durante quince años.",
      p1: "Ejerzo el derecho empresarial desde 2010 y construyo productos digitales desde 2020. Hoy trabajo AI-native: las herramientas de IA hacen la mayor parte de la construcción y yo me hago cargo del resultado, desde el plan hasta el producto funcionando. Trabajo para negocios de cualquier rubro: comercios, servicios, profesionales y startups.",
      p2: "La formación legal no es un detalle. Por eso defino bien el alcance, pienso en qué puede salir mal y explico las decisiones con claridad a clientes que no son técnicos.",
      tiles: [
        { label: "Derecho", value: "Desde 2010", sub: "Derecho empresarial · Universidad de Belgrano" },
        { label: "Productos", value: "Desde 2020", sub: "AI-native · certificaciones React y Next.js" },
        { label: "Idiomas", value: "Inglés C1 · Español nativo" },
        { label: "Trabajo con", value: "Next.js · Node · Java/Spring · Firebase" },
      ],
    },
    stats: [
      { value: 15, suffix: "+", label: "años ejerciendo derecho empresarial" },
      { value: 6, suffix: "+", label: "años desarrollando software" },
      { value: 3, suffix: "", label: "productos funcionando en producción" },
      { value: 4, suffix: "", label: "agentes de IA en mi flujo diario" },
    ],
    marquee: ["Claude Code", "Next.js", "React", "Node.js", "TypeScript", "Agentes de IA", "Python", "Firestore", "Mercado Pago", "MCP", "OpenCode", "Vercel", "Nano Banana", "Derecho empresarial"],
    graphLabels: ["Claude Code", "Codex", "MCP", "OpenCode", "React", "Next.js", "Node.js", "Java", "Python", "Firestore", "Vercel", "Automatizaciones", "Derecho", "Gobernanza IA"],
    images: {
      law: "Balanza de la justicia dibujada como un grafo luminoso, pesando papeles legales contra código",
      orchestration: "Un desarrollador de noche dirigiendo terminales de agentes de IA conectadas a un nodo central",
      portrait: "Retrato de Andrés Listorti",
    },
    services: {
      eyebrow: "Servicios",
      title: "Qué puedo hacer por vos.",
      intro: "Para negocios de cualquier rubro, remoto desde Buenos Aires, en español o inglés. Precio cerrado y fechas de entrega claras.",
      cta: "Empezar un proyecto",
      items: [
        { name: "Sitios web y landing pages", body: "Sitios rápidos, pensados para celular y listos para aparecer en Google: desde una landing de una página hasta la web completa de tu empresa con tu dominio.", deliverables: ["online en días, no meses", "SEO y analítica listos", "WhatsApp y formularios conectados"] },
        { name: "Apps a medida para tu negocio", body: "Apps adaptadas a cómo funciona tu negocio: tiendas online, turnos, herramientas de precios y stock, portales de clientes y tableros.", deliverables: ["login, base de datos y panel de administración", "pagos con Mercado Pago o Stripe", "pensadas para tu rubro"] },
        { name: "Asistentes y automatizaciones con IA", body: "Chatbots y agentes que responden a tus clientes, capturan consultas y preparan contenido, con aprobación humana donde importa.", deliverables: ["web, Instagram o WhatsApp", "Gemini, OpenAI o Claude", "humano en el circuito por diseño"] },
        { name: "Contenido visual con IA y mirada legal", body: "Fotos de producto, piezas para redes y videos cortos hechos con IA, más notas claras sobre datos y términos de servicio de parte de un abogado en ejercicio.", deliverables: ["visuales con Nano Banana y Higgsfield", "cuidado de datos personales (Ley 25.326 / GDPR)", "bilingüe ES / EN"] },
      ],
    },
    console: {
      ariaLabel: "Ejemplo animado de cómo orquesto agentes de IA y reviso lo que producen",
      title: "orchestrator.run",
      agentsLabel: "Agentes",
      reviewLabel: "revisión",
      approved: "aprobado",
      returned: "devuelto",
      idle: "libre",
      working: "trabajando",
      tasks: [
        { agent: "claude-code", task: "dividir el rediseño en tareas paralelas", log: ["escribió SPEC.md: 5 componentes, 1 dueño c/u", "tipos primero, sin archivos compartidos"], verdict: "approved", note: "ningún archivo lo tocan dos agentes" },
        { agent: "muse-spark", task: "construir la consola del hero", log: ["creó orchestrator-console.tsx", "agregó modo sin animación"], verdict: "approved", note: "se pausa fuera de pantalla" },
        { agent: "codex", task: "marcar orden pagada desde el webhook", log: ["lee el header x-signature", "verifica sólo si el header existe"], verdict: "returned", note: "sin header tiene que rechazar" },
        { agent: "codex", task: "fix: verificar siempre la firma", log: ["HMAC-SHA256 + timingSafeEqual", "400 si falta el header"], verdict: "approved", note: "ahora falla cerrado" },
        { agent: "nemotron", task: "red neuronal en canvas para el hero", log: ["≤ 90 nodos, enlaces < 140px", "devicePixelRatio limitado a 2"], verdict: "approved", note: "frame estático sin animación" },
        { agent: "claude-code", task: "reservar stock durante el checkout", log: ["leer + validar + escribir en una transacción", "reserva de 30 minutos"], verdict: "approved", note: "sin sobreventa con concurrencia" },
      ],
    },
    pipeline: {
      eyebrow: "Cómo trabajo con IA",
      title: "Yo dirijo a los agentes. Yo firmo el resultado.",
      intro: "La IA escribe la mayor parte del primer borrador. Mi trabajo es que la tarea no se pueda malinterpretar, mandarla al modelo indicado y rechazar todo lo que no firmaría con mi nombre.",
      progressLabel: "paso",
      steps: [
        { name: "Brief", body: "Convierto un pedido en una especificación que un agente no pueda malinterpretar: objetivo, restricciones, archivos que puede tocar y cuándo está terminado.", detail: ["SPEC.md + CLAUDE.md por proyecto", "lo que queda afuera, por escrito", "criterios de aceptación desde el inicio"] },
        { name: "Plan", body: "Elijo la arquitectura y divido el trabajo en partes que puedan correr en paralelo sin chocar.", detail: ["un dueño por archivo", "interfaces y tipos primero", "el modelo adecuado para cada tarea"] },
        { name: "Delegar", body: "Claude Code orquesta. La implementación va al modelo que corresponde: Claude, Codex o modelos abiertos como Muse Spark y Nemotron vía OpenCode.", detail: ["sesiones de agentes en paralelo", "herramientas MCP: Vercel, Drive, imágenes", "modelos baratos para lo repetitivo"] },
        { name: "Revisar", body: "Nada se publica sin leerlo. Reviso lo que producen los agentes como un pull request: que sea correcto, casos límite, seguridad y legibilidad.", detail: ["tsc + build + tests tienen que pasar", "auth, secretos y webhooks, a mano", "se devuelve con notas si no alcanza"] },
        { name: "Publicar", body: "Deploy de preview por rama, probado en un navegador real y después merge.", detail: ["preview de Vercel en cada push", "prueba en mobile y sin animaciones", "merge a main"] },
      ],
    },
    lab: {
      eyebrow: "Hecho con agentes",
      title: "Trabajo reciente con IA.",
      intro: "Lo último que publiqué con agentes de IA en el circuito, y cómo se repartió el trabajo entre ellos y yo.",
      items: [
        { name: "Este portfolio", kind: "Desarrollo multiagente, 2026", body: "Escribí la especificación de diseño y la dividí por archivo. Claude Code orquestó; la consola del hero y la secuencia de scroll fueron a Muse Spark, y el canvas y el visor de código a Nemotron, ambos vía OpenCode por MCP. Revisé, validé tipos y compilé cada archivo antes del merge.", stack: ["Claude Code", "OpenCode", "MCP", "Next.js", "Motion"], href: "https://github.com/andresListorti/Portfolio-2026", linkLabel: "Código" },
        { name: "Digital Assistant", kind: "SaaS con agentes de IA, 2026", body: "Un agente que redacta publicaciones e imágenes para Instagram con Gemini, OpenAI o Claude, las programa y atiende la bandeja, pero nunca publica sin aprobación humana.", stack: ["APIs de LLM", "Agentes", "Node.js", "Meta Graph API"], href: "https://digitalassistant.com.ar", linkLabel: "Sitio del producto" },
        { name: "Estación de agentes", kind: "Mi entorno diario", body: "Claude Code como orquestador, con conectores MCP para Vercel, Google Drive, generación de imágenes y un ComfyUI local, más OpenCode para mandar tareas rutinarias a modelos abiertos y bajar costos.", stack: ["Claude Code", "MCP", "OpenCode", "ComfyUI"] },
      ],
    },
    reviews: {
      eyebrow: "Ejemplos de code review",
      title: "Qué busco cuando reviso código.",
      intro:
        "Notas de revisión de mis propios proyectos. Los fragmentos están resumidos: el “antes” es la versión ingenua que suele salir en un primer borrador (o de un asistente de IA) y el “después” es el patrón que uso o recomiendo.",
      context: "Contexto",
      before: "Antes",
      issues: "Problemas encontrados",
      after: "Después",
      why: "Por qué importa",
      source: "Fuente",
      items: [
        {
          file: "webhook.controller.ts",
          repo: "Genio26",
          repoUrl: repos.genio,
          lang: "TypeScript · Express",
          context: "Notificaciones de pago de Mercado Pago para una tienda online. El handler marca los pedidos como pagados.",
          before: code.webhookBefore,
          issues: [
            "Seguridad: la verificación solo corre si el header está presente; omitir x-signature la saltea por completo.",
            "Seguridad: un verificador que devuelve true cuando falta el secreto queda abierto si en producción falta una variable de entorno.",
            "Corrección: comparar firmas con === filtra información de tiempos; hay que usar una comparación de tiempo constante.",
          ],
          after: code.webhookAfter,
          why: "Un webhook es un endpoint público sin autenticación que cambia estado ligado a dinero. La verificación tiene que ser incondicional y fallar cerrada; si no, cualquiera que pueda mandar un request HTTP puede marcar un pedido como pagado.",
        },
        {
          file: "shoe.service.ts",
          repo: "Genio26",
          repoUrl: repos.genio,
          lang: "TypeScript · Firestore",
          context: "Reservar stock mientras un comprador termina de pagar, para que dos personas no compren el último par.",
          before: code.stockBefore,
          issues: [
            "Condición de carrera: leer, validar y escribir son operaciones separadas; dos checkouts simultáneos pueden pasar la validación y sobrevender.",
            "Lógica: ignora las unidades ya reservadas por otros pagos en curso.",
            "Robustez: find() puede devolver undefined y convertir un request inválido en un TypeError y un 500.",
          ],
          after: code.stockAfter,
          why: "La transacción hace atómicas la validación y la escritura, y Firestore la reintenta si hay contención. Reservar en lugar de descontar hace que un checkout abandonado devuelva sus unidades cuando vence la reserva de 30 minutos.",
        },
        {
          file: "ProductController.java",
          repo: "java-ecomm",
          repoUrl: repos.java,
          lang: "Java · Spring Boot 3",
          context: "Autorrevisión de una API REST más antigua que escribí mientras aprendía Spring.",
          before: code.springBefore,
          issues: [
            "Validación: @RequestBody sin @Valid y sin restricciones en el DTO, así que se guardan productos vacíos.",
            "Semántica HTTP: crear un recurso devuelve 200 sin header Location en lugar de 201 Created.",
            "Contrato de la API: en Spring Data 3, deleteById no hace nada con ids inexistentes, así que DELETE devuelve 204 aunque no existiera nada.",
          ],
          after: code.springAfter,
          why: "Los clientes usan los códigos de estado para distinguir un error de tipeo de un éxito. Validar en la entrada deja los datos inválidos fuera de la base, y 201 + Location le dice a quien llama dónde está lo que acaba de crear.",
        },
      ],
    },
    law: {
      eyebrow: "IA + Derecho",
      title: "Por qué un abogado que programa suma en proyectos de IA.",
      intro:
        "La mayor parte del riesgo de la IA no está en el modelo, sino en qué hace el producto con los datos de las personas y qué puede hacer en su nombre. Ahí se cruzan mis dos carreras.",
      points: [
        {
          title: "Humano en el circuito, desde el diseño",
          body: "En Digital Assistant nada de lo que escribe un LLM se publica sin una aprobación humana explícita, y los posts con error vuelven a revisión en lugar de reintentarse a ciegas. La responsabilidad es una decisión de producto, no un aviso legal.",
        },
        {
          title: "Desarrollo que cuida los datos personales",
          body: "Diseño teniendo en cuenta la Ley 25.326 de Protección de Datos Personales y lo básico del GDPR: recolectar solo lo necesario, saber para qué existe cada campo, dejar secretos y credenciales fuera de los repositorios y permitir la eliminación de datos.",
        },
        {
          title: "Lectura de contratos y términos de servicio",
          body: "Leo los términos de las APIs, las políticas de las plataformas y los contratos con clientes como leo código: qué se promete, qué se excluye y quién asume el riesgo. Importa cuando un producto depende de Meta, de proveedores de pago o de proveedores de modelos.",
        },
        {
          title: "Gobernanza que se puede explicar",
          body: "Los clientes y los equipos de compliance necesitan entender qué hace una función de IA. Documento el comportamiento, los límites y las formas de falla en lenguaje claro, en inglés y en español.",
        },
      ],
      note: "Soy abogado matriculado en Argentina, no un oficial de privacidad certificado; en trabajos regulados colaboro con el equipo legal del cliente.",
    },
    work: {
      eyebrow: "Proyectos destacados",
      title: "Productos reales, funcionando en producción.",
      more: "Más proyectos",
      live: "En vivo",
      productSite: "Sitio del producto",
      code: "Código",
      privateNote: "Código privado · demo a pedido",
      screenshotAlt: "captura del sitio en vivo",
      labels: { problem: "Problema", approach: "Enfoque", decisions: "Decisiones clave", outcome: "Resultado" },
      featured: [
        {
          title: "Zapatería Genaro",
          kind: "E-commerce full-stack",
          year: "2026",
          summary: "Tienda online para una marca argentina de calzado artesanal: catálogo, carrito, cuentas de clientes, panel de administración y pagos dentro del sitio.",
          stack: ["Next.js", "React 19", "Express", "TypeScript", "Firestore", "Mercado Pago", "Vitest"],
          caseStudy: {
            problem:
              "La marca necesitaba su propia tienda en lugar de depender de marketplaces, con pagos y stock que se mantengan consistentes con tráfico real.",
            approach:
              "Un front end en Next.js y una API separada en Express / TypeScript, ambos en Vercel, con Firestore y Firebase Auth. Mercado Pago Checkout Bricks mantiene el pago dentro del sitio.",
            decisions: [
              "Webhooks con firma verificada e idempotentes: un pedido se procesa una sola vez, sin importar qué camino confirma el pago primero.",
              "El stock se reserva en una transacción por 30 minutos y el link de pago vence en el mismo momento.",
              "Los pagos por un monto menor nunca se procesan; PayPal se apagó porque su modo sandbox permitía pagos falsos.",
              "Vitest + Testing Library, monitoreo con Sentry y emails transaccionales con Resend.",
            ],
            outcome:
              "En línea con catálogo, cuentas y administración funcionando. El checkout está cerrado a propósito detrás de un interruptor de lanzamiento hasta que el dueño abra la tienda.",
          },
          image: "/projects/genaro-home.webp",
          live: "https://genarozapateria.vercel.app",
          code: repos.genio,
        },
        {
          title: "Digital Assistant",
          kind: "SaaS de agentes de IA para Instagram",
          year: "2026",
          summary: "App web multi-cliente que convierte una idea en un post de Instagram aprobado y publicado, con métricas y manejo de bandejas.",
          stack: ["Agentes de IA", "APIs de LLM", "React", "Node.js", "Express", "Firestore", "Meta Graph API"],
          caseStudy: {
            problem: "Las pymes quieren contenido generado con IA sin perder el control de lo que sale publicado con su nombre.",
            approach:
              "Un front end en React y una API en Node / Express sobre Firestore. Cada post es un documento que avanza por una máquina de estados: en cola → generado → aprobado o programado → publicando → publicado.",
            decisions: [
              "Proveedores de LLM intercambiables para textos e imágenes (Gemini, OpenAI, Claude), más un modo manual.",
              "Nada se publica a través de la Meta Graph API sin una aprobación humana explícita.",
              "Ante un error, el post vuelve a revisión en lugar de perderse o reintentarse a ciegas.",
              "Espacios de trabajo, ingreso con Google y planes mensuales cobrados con Mercado Pago.",
            ],
            outcome:
              "En producción en app.digitalassistant.com.ar, con revisión, calendario, bandejas de comentarios y mensajes directos, y métricas.",
          },
          image: "/projects/digital-home.webp",
          live: "https://digitalassistant.com.ar",
          isPrivate: true,
        },
      ],
      others: [
        {
          title: "App de Costos y Precios",
          kind: "Herramienta interna",
          year: "2026",
          summary:
            "PWA instalable que reemplazó la planilla de precios de una fábrica de calzado: desglose de costos por artículo, niveles de precio, gráficos y reportes en Excel / PDF.",
          stack: ["PWA", "JavaScript", "Firebase", "Firestore"],
          isPrivate: true,
        },
        {
          title: "Chatbot con IA",
          kind: "Interfaz de chat con LLM",
          year: "2025",
          summary: "Chat con respuestas en streaming hecho con Vercel AI SDK sobre modelos de OpenAI, Next.js y TypeScript.",
          stack: ["Vercel AI SDK", "OpenAI", "Next.js", "TypeScript"],
          code: "https://github.com/andresListorti/React-Native-Chatbot",
        },
        {
          title: "API REST con Spring Boot",
          kind: "Back end en Java",
          year: "2024",
          summary:
            "API de e-commerce en capas (modelo / repositorio / servicio / controlador) con CRUD completo de usuarios, clientes, productos y domicilios.",
          stack: ["Java", "Spring Boot", "JPA", "H2"],
          code: repos.java,
        },
        {
          title: "API de productos en tiempo real",
          kind: "Back end en Node.js",
          year: "2025",
          summary: "API en Express para productos y carritos, con una vista de productos que se actualiza en vivo por Socket.io.",
          stack: ["Node.js", "Express", "Socket.io", "Handlebars"],
          code: "https://github.com/andresListorti/ecommerce-api",
        },
      ],
    },
    experience: {
      eyebrow: "Experiencia",
      title: "Dos carreras, una misma forma de trabajar.",
      educationLabel: "Formación",
      items: [
        {
          period: "2020 — hoy",
          title: "Creador de webs y apps con IA (freelance)",
          org: "Independiente · Remoto",
          body: "Productos digitales para pymes, construidos AI-native: la tienda online de Zapatería Genaro, una herramienta de costos y precios para una fábrica de calzado y Digital Assistant, un SaaS de IA para Instagram.",
        },
        {
          period: "2010 — hoy",
          title: "Abogado independiente",
          org: "Derecho empresarial, comercial, laboral y civil",
          body: "Ejercicio independiente, incluido derecho comercial para clientes bancarios. Ahí aprendí la lectura rigurosa, el análisis de riesgos y la comunicación clara con clientes no técnicos.",
        },
      ],
      education: [
        { title: "Desarrollo Full Stack", org: "Coderhouse", period: "2021 — 2024" },
        { title: "Next.js — Carrera intensiva (cert.)", org: "Coderhouse", period: "2025" },
        { title: "React JS — Carrera intensiva (cert.)", org: "Coderhouse", period: "2024" },
        { title: "Algoritmos en Python", org: "ITMaster Academy", period: "2022 — 2023" },
        { title: "Abogado — Derecho Empresarial", org: "Universidad de Belgrano", period: "2004 — 2009" },
      ],
    },
    stack: {
      eyebrow: "Stack",
      title: "Herramientas con las que realmente publiqué productos.",
      groups: [
        { group: "Front end", items: stackItems.front },
        { group: "Back end", items: stackItems.back },
        { group: "Datos y servicios", items: stackItems.data },
        { group: "IA", items: stackItems.ai },
        { group: "Herramientas", items: stackItems.tooling },
      ],
    },
    contact: {
      eyebrow: "Contacto",
      title: "¿Tenés en mente una web, una app o una automatización?",
      body: "Elegí el canal que te quede más cómodo. Respondo en español o inglés, normalmente en el día.",
      upwork: "Perfil de Upwork",
      resumeLabel: "Descargar CV (PDF)",
      channels: [
        { label: "Email", value: "andreslistorti@gmail.com", href: "mailto:andreslistorti@gmail.com" },
        { label: "LinkedIn", value: "in/andres-listorti", href: links.linkedin },
        { label: "GitHub", value: "andresListorti", href: links.github },
        { label: "Upwork", value: "Perfil freelance", href: links.upwork },
        { label: "WhatsApp", value: "+54 9 11 2532-6630", href: links.whatsapp },
      ],
    },
    footer: { built: "Orquestado con Claude Code, hecho con Next.js, publicado en Vercel." },
  },
};
