import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Briefcase, Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import ProjectCard from "./components/project-card";
import TechStack from "./components/tech-stack";

const UPWORK_URL = "https://www.upwork.com/freelancers/~019cbbd63fe3a1e4b9";
const GITHUB_URL = "https://github.com/andresListorti";
const LINKEDIN_URL = "https://www.linkedin.com/in/andres-listorti-177485240/";
const EMAIL = "andreslistorti@gmail.com";

const projects = [
  {
    title: "Zapatería Genaro",
    subtitle: "Full-stack e-commerce · 2026",
    description:
      "Production-grade online store for an Argentine handmade footwear brand: catalog, cart, accounts, admin panel and in-site payments.",
    highlights: [
      "Next.js 16 frontend + Express 5/TypeScript API, both deployed on Vercel",
      "Mercado Pago Checkout Bricks with signature-verified, idempotent webhooks",
      "Stock reservation with 30-min expiry, Firestore security rules, role-based admin",
      "Vitest + Testing Library, Sentry monitoring, transactional mail via Resend",
    ],
    image: "https://res.cloudinary.com/dgiqb0ipg/image/upload/v1746281682/Card2gen_h0rxrp.png",
    links: [
      { label: "Live store", href: "https://genarozapateria.vercel.app", kind: "live" as const },
      { label: "Code", href: "https://github.com/andresListorti/Genio26", kind: "code" as const },
    ],
    tags: ["Next.js", "React 19", "Express", "TypeScript", "Firestore", "Mercado Pago", "Vitest"],
  },
  {
    title: "Digital Assistant",
    subtitle: "AI agent SaaS for Instagram · 2026",
    description:
      "Multi-tenant web app that turns an idea into an approved, published Instagram post, with metrics and inbox handling.",
    highlights: [
      "Pluggable LLM providers for copy (Gemini, OpenAI, Claude) and image generation",
      "Human-in-the-loop approval before anything is published via Meta Graph API",
      "Workspaces, auth and monthly plans billed through Mercado Pago",
      "Node/Express backend on Firestore; webhooks for comments, DMs and mentions",
    ],
    links: [
      { label: "Product site", href: "https://digitalassistant.com.ar", kind: "live" as const },
    ],
    tags: ["AI agents", "LLM APIs", "Node.js", "Express", "Firestore", "Meta Graph API"],
    isPrivate: true,
  },
  {
    title: "Costs & Pricing App",
    subtitle: "Internal business tool · 2026",
    description:
      "Installable PWA that replaced a footwear factory's pricing spreadsheet: per-article cost breakdowns, price levels and reports.",
    highlights: [
      "Firebase Hosting + Firestore + Auth, running on the free tier",
      "Excel export matching the original workbook layout, printable PDF report",
      "Charts for cost composition, price levels and product rankings",
    ],
    links: [],
    tags: ["PWA", "JavaScript", "Firebase", "Firestore", "Data reporting"],
    isPrivate: true,
  },
  {
    title: "AI Chatbot",
    subtitle: "LLM chat interface",
    description:
      "Streaming chat UI built with the Vercel AI SDK on top of OpenAI models.",
    highlights: [
      "Next.js 15 + TypeScript, streaming responses with @ai-sdk/react",
      "Component library with shadcn/ui and Tailwind CSS",
    ],
    links: [
      { label: "Code", href: "https://github.com/andresListorti/React-Native-Chatbot", kind: "code" as const },
    ],
    tags: ["Vercel AI SDK", "OpenAI", "Next.js", "TypeScript"],
  },
  {
    title: "Spring Boot REST API",
    subtitle: "Java back end",
    description:
      "Layered e-commerce API (model / repository / service / controller) with full CRUD for users, customers, products and addresses.",
    highlights: [
      "Spring Web, Spring Data JPA, H2, Lombok",
      "Endpoints exercised and documented with Postman",
    ],
    links: [
      { label: "Code", href: "https://github.com/andresListorti/java-ecomm", kind: "code" as const },
    ],
    tags: ["Java", "Spring Boot", "JPA", "REST"],
  },
  {
    title: "Real-time Products API",
    subtitle: "Node.js back end",
    description:
      "Express API for products and carts with a live-updating product view pushed over WebSockets.",
    highlights: [
      "Express routers for products, carts and views",
      "Socket.io real-time updates, Handlebars templates, Postman collection",
    ],
    links: [
      { label: "Code", href: "https://github.com/andresListorti/ecommerce-api", kind: "code" as const },
    ],
    tags: ["Node.js", "Express", "Socket.io", "Handlebars"],
  },
];

const aiPractices = [
  {
    title: "AI-native daily workflow",
    body: "I build with Claude Code, GitHub Copilot, OpenAI Codex and Cursor every day, and keep per-project agent instructions (CLAUDE.md) so AI tools work from accurate context.",
  },
  {
    title: "Reviewing AI-generated code",
    body: "I treat model output as a pull request: check correctness, edge cases, security (auth, secrets, webhook signatures), idempotency and readability before anything ships.",
  },
  {
    title: "Building with LLMs",
    body: "Shipped products that call Gemini, OpenAI and Claude, stream responses, and keep a human approval step before an agent takes a public action.",
  },
  {
    title: "Clear technical writing",
    body: "15+ years as a lawyer trained me to write precise, well-reasoned explanations — in English (C1) and Spanish (native). My READMEs double as onboarding docs.",
  },
];

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-14 items-center px-4 md:px-6">
          <div className="mr-4 flex">
            <Link className="mr-6 flex items-center space-x-2" href="/">
              <span className="font-bold">AndresListorti.dev</span>
            </Link>
            <nav className="hidden items-center space-x-6 text-sm font-medium md:flex">
              <Link href="#about" className="transition-colors hover:text-foreground/80">
                About
              </Link>
              <Link href="#ai" className="transition-colors hover:text-foreground/80">
                AI & Code Quality
              </Link>
              <Link href="#projects" className="transition-colors hover:text-foreground/80">
                Projects
              </Link>
              <Link href="#contact" className="transition-colors hover:text-foreground/80">
                Contact
              </Link>
            </nav>
          </div>
          <Button variant="outline" className="ml-auto">
            <Link
              href="https://drive.google.com/file/d/1gT6qb8uN27dUFiHbApDt9nQKaFXvS_nW/view?usp=drive_link"
              className="transition-colors hover:text-foreground/80"
            >
              Resume
            </Link>
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 md:px-6">
        <section id="about" className="py-12 md:py-24 lg:py-32">
          <div className="flex flex-col items-center justify-center space-y-6 text-center">
            <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
              Andrés Antonio Listorti · Buenos Aires, Argentina · Remote
            </p>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Full-Stack Developer · AI-Native Engineer · Lawyer
            </h1>
            <p className="mx-auto max-w-[760px] text-gray-500 md:text-xl dark:text-gray-400">
              I ship end-to-end products — Next.js and React front ends, Node/Express and Spring Boot back
              ends, payments, auth and deployment — working AI-first every day. Before code, I spent 15+
              years as a business lawyer, so I bring rigor, clear writing and a sharp eye for detail to
              every review.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href={UPWORK_URL} target="_blank">
                <Button>
                  <Briefcase className="mr-2 h-4 w-4" />
                  Hire me on Upwork
                </Button>
              </Link>
              <Link href="#projects">
                <Button variant="outline">See my work</Button>
              </Link>
            </div>
            <div className="space-x-4">
              <Link href={GITHUB_URL} target="_blank">
                <Button variant="outline" size="icon">
                  <Github className="h-4 w-4" />
                  <span className="sr-only">GitHub</span>
                </Button>
              </Link>
              <Link href={LINKEDIN_URL} target="_blank">
                <Button variant="outline" size="icon">
                  <Linkedin className="h-4 w-4" />
                  <span className="sr-only">LinkedIn</span>
                </Button>
              </Link>
              <Link href={`mailto:${EMAIL}`}>
                <Button variant="outline" size="icon">
                  <Mail className="h-4 w-4" />
                  <span className="sr-only">Email</span>
                </Button>
              </Link>
            </div>
            <div className="grid w-full max-w-3xl gap-4 pt-6 text-left sm:grid-cols-3">
              <Card className="p-4">
                <p className="text-sm font-semibold">Developer since 2022</p>
                <p className="text-sm text-muted-foreground">
                  Coderhouse Full Stack certification; JS/TS, React, Node, Java/Spring, Python.
                </p>
              </Card>
              <Card className="p-4">
                <p className="text-sm font-semibold">Lawyer since 2010</p>
                <p className="text-sm text-muted-foreground">
                  Business law, Universidad de Belgrano. Independent practice for 15+ years.
                </p>
              </Card>
              <Card className="p-4">
                <p className="text-sm font-semibold">English C1 · Spanish native</p>
                <p className="text-sm text-muted-foreground">
                  Comfortable writing specs, reviews and technical explanations in both.
                </p>
              </Card>
            </div>
          </div>
        </section>

        <section id="ai" className="py-12 md:py-24">
          <h2 className="mb-4 text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            AI & Code Quality
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground">
            How I work with AI models — and how I make sure what they produce is correct.
          </p>
          <div className="grid gap-6 md:grid-cols-2">
            {aiPractices.map((p) => (
              <Card key={p.title} className="p-6">
                <h3 className="mb-2 text-lg font-semibold">{p.title}</h3>
                <p className="text-sm text-muted-foreground">{p.body}</p>
              </Card>
            ))}
          </div>
        </section>

        <section id="projects" className="py-12 md:py-24">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Projects
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.title} {...project} />
            ))}
          </div>
        </section>

        <section className="py-12 md:py-24">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Tech Stack
          </h2>
          <TechStack />
        </section>

        <section id="contact" className="py-12 md:py-24 lg:py-32">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Get in Touch</h2>
            <p className="mb-8 text-muted-foreground">
              Open to freelance projects, AI training / code evaluation work and full-time remote roles.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <Link href={`mailto:${EMAIL}`}>
                <Card className="flex items-center gap-3 p-4 transition-colors hover:bg-muted">
                  <Mail className="h-5 w-5" />
                  <span className="text-sm font-medium">{EMAIL}</span>
                </Card>
              </Link>
              <Link href={UPWORK_URL} target="_blank">
                <Card className="flex items-center gap-3 p-4 transition-colors hover:bg-muted">
                  <Briefcase className="h-5 w-5" />
                  <span className="text-sm font-medium">Upwork profile</span>
                </Card>
              </Link>
              <Link href={LINKEDIN_URL} target="_blank">
                <Card className="flex items-center gap-3 p-4 transition-colors hover:bg-muted">
                  <Linkedin className="h-5 w-5" />
                  <span className="text-sm font-medium">LinkedIn</span>
                </Card>
              </Link>
              <Link href={GITHUB_URL} target="_blank">
                <Card className="flex items-center gap-3 p-4 transition-colors hover:bg-muted">
                  <Github className="h-5 w-5" />
                  <span className="text-sm font-medium">github.com/andresListorti</span>
                </Card>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="container mx-auto flex w-full shrink-0 items-center px-4 py-6 md:px-6">
          <p className="text-xs text-gray-500 dark:text-gray-400">© 2026 Andrés Antonio Listorti</p>
        </div>
      </footer>
    </div>
  );
}
