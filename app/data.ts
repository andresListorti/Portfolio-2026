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
  resume: "https://drive.google.com/file/d/1gT6qb8uN27dUFiHbApDt9nQKaFXvS_nW/view?usp=drive_link",
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
    reviewFile: string;
    reviewItems: { ok: boolean; text: string; note?: string }[];
    reviewCaption: string;
    reviewAria: string;
  };
  about: {
    eyebrow: string;
    title: string;
    p1: string;
    p2: string;
    tiles: { label: string; value: string; sub?: string }[];
  };
  ai: { eyebrow: string; title: string; items: { title: string; body: string }[] };
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
  contact: { eyebrow: string; title: string; body: string; upwork: string };
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
      title: `${NAME} — Full-Stack Developer · AI-Native Engineer · Lawyer`,
      description:
        "Full-stack developer (Next.js, Node, Java/Spring) and lawyer based in Buenos Aires. I ship end-to-end products and review AI-generated code with a lawyer's rigor.",
      ogLocale: "en_US",
    },
    nav: [
      { href: "#about", label: "About" },
      { href: "#ai", label: "AI" },
      { href: "#reviews", label: "Reviews" },
      { href: "#law", label: "AI + Law" },
      { href: "#work", label: "Work" },
      { href: "#experience", label: "Experience" },
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
      badge: "Available for freelance & remote roles",
      role: "Full-Stack Developer · AI-Native Engineer · Lawyer",
      lead: "I ship end-to-end web products and review code, human or AI-written, with the rigor of 15 years reading contracts line by line.",
      upwork: "Hire me on Upwork",
      email: "Email",
      resume: "Resume",
      location: "Buenos Aires · GMT-3",
      reviewFile: "review · checkout-webhook.ts",
      reviewItems: [
        { ok: true, text: "signature verified before parsing" },
        { ok: true, text: "idempotent on retried events" },
        { ok: true, text: "secrets read from env, never logged" },
        { ok: false, text: "empty cart not handled", note: "→ fix + test" },
        { ok: false, text: "O(n²) stock lookup", note: "→ use a Map" },
      ],
      reviewCaption: "How I read AI-generated code: like a pull request.",
      reviewAria: "Example of how I review AI-generated code",
    },
    about: {
      eyebrow: "About",
      title: "A developer who spent fifteen years as a lawyer first.",
      p1: "I've practiced business law since 2010, and I've been building software full-time since 2022, self-taught from 2020 and trained through Coderhouse. Today I build products for small businesses end to end: front end, back end, payments, auth and deployment.",
      p2: "The legal background isn't a footnote. It's why I read specs closely, think about edge cases and failure modes, and explain technical decisions clearly to people who aren't engineers.",
      tiles: [
        { label: "Law", value: "Since 2010", sub: "Business law · Universidad de Belgrano" },
        { label: "Code", value: "Since 2022", sub: "Full Stack · React & Next.js certs" },
        { label: "Languages", value: "English C1 · Spanish native" },
        { label: "Works with", value: "Next.js · Node · Java/Spring · Firebase" },
      ],
    },
    ai: {
      eyebrow: "How I work with AI",
      title: "AI-native, with a reviewer's discipline.",
      items: [
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
      ],
      education: [
        { title: "Full Stack Development", org: "Coderhouse", period: "2023 — 2024" },
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
      title: "Have a product to build or code to review?",
      body: "The fastest way to work with me is Upwork. For anything else, email me.",
      upwork: "Upwork profile",
    },
    footer: { built: "Built with Next.js · Deployed on Vercel" },
  },

  es: {
    meta: {
      title: `${NAME} — Desarrollador Full-Stack · Ingeniero AI-Native · Abogado`,
      description:
        "Desarrollador full-stack (Next.js, Node, Java/Spring) y abogado en Buenos Aires. Construyo productos de punta a punta y reviso código generado por IA con rigor de abogado.",
      ogLocale: "es_AR",
    },
    nav: [
      { href: "#about", label: "Sobre mí" },
      { href: "#ai", label: "IA" },
      { href: "#reviews", label: "Revisiones" },
      { href: "#law", label: "IA + Derecho" },
      { href: "#work", label: "Proyectos" },
      { href: "#experience", label: "Experiencia" },
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
      badge: "Disponible para freelance y roles remotos",
      role: "Desarrollador Full-Stack · Ingeniero AI-Native · Abogado",
      lead: "Construyo productos web de punta a punta y reviso código, escrito por personas o por IA, con el rigor de 15 años leyendo contratos línea por línea.",
      upwork: "Contratame en Upwork",
      email: "Email",
      resume: "CV",
      location: "Buenos Aires · GMT-3",
      reviewFile: "revisión · checkout-webhook.ts",
      reviewItems: [
        { ok: true, text: "firma verificada antes de parsear" },
        { ok: true, text: "idempotente ante reintentos" },
        { ok: true, text: "secretos desde env, nunca en logs" },
        { ok: false, text: "carrito vacío sin manejar", note: "→ fix + test" },
        { ok: false, text: "búsqueda de stock O(n²)", note: "→ usar un Map" },
      ],
      reviewCaption: "Cómo leo código generado por IA: como un pull request.",
      reviewAria: "Ejemplo de cómo reviso código generado por IA",
    },
    about: {
      eyebrow: "Sobre mí",
      title: "Un desarrollador que antes fue abogado durante quince años.",
      p1: "Ejerzo el derecho empresarial desde 2010 y desarrollo software a tiempo completo desde 2022: autodidacta desde 2020 y formado en Coderhouse. Hoy construyo productos para pymes de punta a punta: front end, back end, pagos, autenticación y deploy.",
      p2: "La formación legal no es un detalle. Por eso leo las especificaciones con atención, pienso en los casos límite y en cómo puede fallar algo, y explico las decisiones técnicas con claridad a quienes no son ingenieros.",
      tiles: [
        { label: "Derecho", value: "Desde 2010", sub: "Derecho empresarial · Universidad de Belgrano" },
        { label: "Código", value: "Desde 2022", sub: "Full Stack · certificaciones React y Next.js" },
        { label: "Idiomas", value: "Inglés C1 · Español nativo" },
        { label: "Trabajo con", value: "Next.js · Node · Java/Spring · Firebase" },
      ],
    },
    ai: {
      eyebrow: "Cómo trabajo con IA",
      title: "AI-native, con disciplina de revisor.",
      items: [
        {
          title: "IA todos los días",
          body: "Desarrollo con Claude Code, GitHub Copilot, OpenAI Codex y Cursor, y mantengo instrucciones por proyecto para los agentes (CLAUDE.md) para que trabajen con contexto preciso.",
        },
        {
          title: "Código de IA, revisado como un PR",
          body: "Lo que genera un modelo no se publica sin leerlo. Primero reviso que sea correcto, los casos límite, la seguridad (auth, secretos, firmas de webhooks), la idempotencia y la legibilidad.",
        },
        {
          title: "Productos sobre LLMs",
          body: "Publiqué apps que usan Gemini, OpenAI y Claude, con respuestas en streaming y un paso de aprobación humana antes de que un agente haga algo público.",
        },
        {
          title: "Escritura técnica precisa",
          body: "Quince años de redacción legal se notan en mis revisiones, especificaciones y READMEs: claros, ordenados y bien argumentados, en inglés (C1) y en español.",
        },
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
          period: "2022 — hoy",
          title: "Desarrollador Full-Stack freelance",
          org: "Independiente · Remoto",
          body: "Productos de punta a punta para pymes: la tienda de Zapatería Genaro, una herramienta de costos y precios para una fábrica de calzado y Digital Assistant, un SaaS de IA para Instagram. Autodidacta desde 2020.",
        },
        {
          period: "2010 — hoy",
          title: "Abogado independiente",
          org: "Derecho empresarial, comercial, laboral y civil",
          body: "Ejercicio independiente, incluido derecho comercial para clientes bancarios. Ahí aprendí la lectura rigurosa, el análisis de riesgos y la comunicación clara con clientes no técnicos.",
        },
      ],
      education: [
        { title: "Desarrollo Full Stack", org: "Coderhouse", period: "2023 — 2024" },
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
      title: "¿Tenés un producto para construir o código para revisar?",
      body: "La forma más rápida de trabajar conmigo es Upwork. Para cualquier otra cosa, escribime por email.",
      upwork: "Perfil de Upwork",
    },
    footer: { built: "Hecho con Next.js · Publicado en Vercel" },
  },
};
