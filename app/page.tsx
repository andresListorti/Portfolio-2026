import { ArrowUpRight, Briefcase, FileText, Github, Linkedin, Lock, Mail, MapPin } from "lucide-react";
import Image from "next/image";
import type React from "react";
import {
  NAME,
  ROLE,
  aiPractices,
  education,
  experience,
  featured,
  links,
  more,
  stack,
  type Project,
} from "./data";
import ThemeToggle from "./theme-toggle";

const nav = [
  { href: "#about", label: "About" },
  { href: "#ai", label: "AI" },
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

function External({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  );
}

function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mx-auto max-w-page px-4 py-16 sm:px-6 md:py-20">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl">{title}</h2>
      <div className="mt-10">{children}</div>
    </section>
  );
}

function ProjectLinks({ p }: { p: Project }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {p.live && (
        <External href={p.live} className="btn-ghost !px-4 !py-2">
          {p.isPrivate ? "Product site" : "Live"} <ArrowUpRight className="h-4 w-4" />
        </External>
      )}
      {p.code && (
        <External href={p.code} className="btn-ghost !px-4 !py-2">
          <Github className="h-4 w-4" /> Code
        </External>
      )}
      {p.isPrivate && (
        <span className="chip gap-1.5">
          <Lock className="h-3 w-3" /> Private code · demo on request
        </span>
      )}
    </div>
  );
}

export default function Page() {
  return (
    <>
      {/* Nav */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-line/60 bg-bg/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-page items-center gap-4 px-4 sm:px-6">
          <a href="#top" className="flex items-center gap-2.5" aria-label={`${NAME}, back to top`}>
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-fg font-mono text-[11px] font-bold text-bg">
              AAL
            </span>
            <span className="hidden text-sm font-medium sm:inline">{NAME}</span>
          </a>
          <nav className="ml-auto hidden items-center gap-6 text-sm text-muted md:flex" aria-label="Sections">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="transition hover:text-fg">
                {n.label}
              </a>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-2 md:ml-4">
            <ThemeToggle />
            <External href={links.upwork} className="btn-primary !px-4 !py-2">
              Hire me
            </External>
          </div>
        </div>
      </header>

      <main id="top">
        {/* Hero */}
        <section className="relative overflow-hidden pt-16">
          <div className="hero-bg pointer-events-none absolute inset-0" aria-hidden />
          <div className="relative mx-auto grid max-w-page items-center gap-12 px-4 pb-16 pt-20 sm:px-6 md:pb-24 md:pt-28 lg:grid-cols-[1fr_23rem]">
            <div>
            <p className="rise inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-3 py-1 text-xs text-muted">
              <span className="live-dot h-2 w-2 rounded-full bg-accent" /> Available for freelance &amp; remote roles
            </p>
            <h1 className="rise rise-1 mt-6 text-[2.6rem] font-semibold leading-[1.05] tracking-tight text-balance sm:text-6xl md:text-7xl">
              {NAME}
            </h1>
            <p className="rise rise-2 mt-4 font-mono text-sm text-gradient sm:text-base">{ROLE}</p>
            <p className="rise rise-2 mt-6 max-w-2xl text-lg text-muted text-balance sm:text-xl">
              I ship end-to-end web products and review code, human or AI-written, with the rigor of 15 years
              reading contracts line by line.
            </p>
            <div className="rise rise-3 mt-9 flex flex-wrap gap-3">
              <External href={links.upwork} className="btn-primary">
                <Briefcase className="h-4 w-4" /> Hire me on Upwork
              </External>
              <a href={`mailto:${links.email}`} className="btn-ghost">
                <Mail className="h-4 w-4" /> Email
              </a>
              <External href={links.resume} className="btn-ghost">
                <FileText className="h-4 w-4" /> Resume
              </External>
            </div>
            <div className="rise rise-3 mt-6 flex items-center gap-2">
              <External href={links.github} className="grid h-10 w-10 place-items-center rounded-full border border-line text-muted transition hover:text-fg">
                <Github className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </External>
              <External href={links.linkedin} className="grid h-10 w-10 place-items-center rounded-full border border-line text-muted transition hover:text-fg">
                <Linkedin className="h-4 w-4" />
                <span className="sr-only">LinkedIn</span>
              </External>
              <span className="ml-2 inline-flex items-center gap-1.5 text-sm text-muted">
                <MapPin className="h-4 w-4" /> Buenos Aires · GMT-3
              </span>
            </div>
            </div>

            {/* How I review a change — illustrates the practice, not a real PR */}
            <figure className="rise rise-3 card hidden overflow-hidden font-mono text-[13px] lg:block" aria-label="Example of how I review AI-generated code">
              <div className="flex items-center gap-1.5 border-b border-line px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-fg/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-fg/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-fg/15" />
                <span className="ml-2 text-xs text-muted">review · checkout-webhook.ts</span>
              </div>
              <ul className="space-y-2.5 p-5 leading-relaxed">
                <li><span className="text-accent">✓</span> signature verified before parsing</li>
                <li><span className="text-accent">✓</span> idempotent on retried events</li>
                <li><span className="text-accent">✓</span> secrets read from env, never logged</li>
                <li><span className="text-amber-500">!</span> empty cart not handled <span className="text-muted">→ fix + test</span></li>
                <li><span className="text-amber-500">!</span> O(n²) stock lookup <span className="text-muted">→ use a Map</span></li>
              </ul>
              <figcaption className="border-t border-line px-5 py-3 font-sans text-xs text-muted">
                How I read AI-generated code: like a pull request.
              </figcaption>
            </figure>
          </div>
        </section>

        {/* About — bento */}
        <Section id="about" eyebrow="About" title="A developer who spent fifteen years as a lawyer first.">
          <div className="grid gap-4 md:grid-cols-6">
            <div className="card p-6 md:col-span-4 md:row-span-2">
              <p className="text-lg leading-relaxed text-fg/90">
                I&apos;ve practiced business law since 2010, and I&apos;ve been building software full-time since 2022,
                self-taught from 2020 and trained through Coderhouse. Today I build products for small businesses end
                to end: front end, back end, payments, auth and deployment.
              </p>
              <p className="mt-4 leading-relaxed text-muted">
                The legal background isn&apos;t a footnote. It&apos;s why I read specs closely, think about edge cases
                and failure modes, and explain technical decisions clearly to people who aren&apos;t engineers.
              </p>
            </div>
            <div className="card p-6 md:col-span-2">
              <p className="font-mono text-xs text-muted">Law</p>
              <p className="mt-2 text-2xl font-semibold">Since 2010</p>
              <p className="mt-1 text-sm text-muted">Business law · Universidad de Belgrano</p>
            </div>
            <div className="card p-6 md:col-span-2">
              <p className="font-mono text-xs text-muted">Code</p>
              <p className="mt-2 text-2xl font-semibold">Since 2022</p>
              <p className="mt-1 text-sm text-muted">Full Stack · React &amp; Next.js certs</p>
            </div>
            <div className="card p-6 md:col-span-3">
              <p className="font-mono text-xs text-muted">Languages</p>
              <p className="mt-2 text-lg font-medium">English C1 · Spanish native</p>
            </div>
            <div className="card p-6 md:col-span-3">
              <p className="font-mono text-xs text-muted">Works with</p>
              <p className="mt-2 text-lg font-medium">Next.js · Node · Java/Spring · Firebase</p>
            </div>
          </div>
        </Section>

        {/* AI */}
        <Section id="ai" eyebrow="How I work with AI" title="AI-native, with a reviewer's discipline.">
          <div className="grid gap-4 sm:grid-cols-2">
            {aiPractices.map((a, i) => (
              <div key={a.title} className="card group p-6 transition hover:border-accent/50">
                <span className="font-mono text-xs text-accent">0{i + 1}</span>
                <h3 className="mt-3 text-lg font-semibold">{a.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{a.body}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Work */}
        <Section id="work" eyebrow="Selected work" title="Real products, running in production.">
          <div className="space-y-6">
            {featured.map((p) => (
              <article key={p.title} className="card overflow-hidden md:grid md:grid-cols-5">
                {p.image && (
                  <div className="relative aspect-[16/10] self-center border-b border-line md:col-span-3 md:m-4 md:overflow-hidden md:rounded-xl md:border">
                    <Image
                      src={p.image}
                      alt={`${p.title} — screenshot of the live site`}
                      fill
                      sizes="(min-width: 768px) 60vw, 100vw"
                      className="object-cover object-top"
                    />
                  </div>
                )}
                <div className="flex flex-col p-6 md:col-span-2 md:p-8">
                  <p className="font-mono text-xs text-muted">
                    {p.kind} · {p.year}
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold tracking-tight">{p.title}</h3>
                  <p className="mt-3 text-muted">{p.summary}</p>
                  <ul className="mt-5 space-y-2 text-sm">
                    {p.built.map((b) => (
                      <li key={b} className="flex gap-2">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                        <span className="text-fg/85">{b}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {p.stack.map((s) => (
                      <span key={s} className="chip">
                        {s}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6 md:mt-auto md:pt-6">
                    <ProjectLinks p={p} />
                  </div>
                </div>
              </article>
            ))}
          </div>

          <h3 className="mt-16 font-mono text-xs uppercase tracking-[0.2em] text-muted">More projects</h3>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {more.map((p) => (
              <article key={p.title} className="card flex flex-col p-6">
                <p className="font-mono text-xs text-muted">
                  {p.kind} · {p.year}
                </p>
                <h4 className="mt-2 text-lg font-semibold">{p.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.summary}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.stack.map((s) => (
                    <span key={s} className="chip">
                      {s}
                    </span>
                  ))}
                </div>
                <div className="mt-5 pt-1 md:mt-auto md:pt-5">
                  <ProjectLinks p={p} />
                </div>
              </article>
            ))}
          </div>
        </Section>

        {/* Experience */}
        <Section id="experience" eyebrow="Experience" title="Two careers, one way of working.">
          <div className="grid gap-10 md:grid-cols-5">
            <ol className="relative space-y-8 border-l border-line pl-6 md:col-span-3">
              {experience.map((e) => (
                <li key={e.title} className="relative">
                  <span className="absolute -left-[1.83rem] top-1.5 h-3 w-3 rounded-full border-2 border-bg bg-accent" />
                  <p className="font-mono text-xs text-muted">{e.period}</p>
                  <h3 className="mt-1 text-lg font-semibold">{e.title}</h3>
                  <p className="text-sm text-muted">{e.org}</p>
                  <p className="mt-2 leading-relaxed text-fg/85">{e.body}</p>
                </li>
              ))}
            </ol>
            <div className="md:col-span-2">
              <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Education</h3>
              <ul className="mt-4 divide-y divide-line">
                {education.map((ed) => (
                  <li key={ed.title} className="py-3">
                    <p className="font-medium">{ed.title}</p>
                    <p className="text-sm text-muted">
                      {ed.org} · {ed.period}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        {/* Stack */}
        <Section id="stack" eyebrow="Stack" title="Tools I've actually shipped with.">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {stack.map((s) => (
              <div key={s.group} className="card p-6">
                <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-muted">{s.group}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {s.items.map((i) => (
                    <span key={i} className="rounded-md bg-fg/[0.06] px-2.5 py-1 text-sm">
                      {i}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Contact */}
        <section id="contact" className="mx-auto max-w-page px-4 pb-24 sm:px-6">
          <div className="card relative overflow-hidden p-8 sm:p-12">
            <div
              className="pointer-events-none absolute inset-0 opacity-60"
              style={{ background: "radial-gradient(40rem 20rem at 100% 0%, rgb(var(--accent2) / 0.14), transparent 60%)" }}
              aria-hidden
            />
            <div className="relative">
              <p className="eyebrow">Contact</p>
              <h2 className="mt-3 max-w-xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                Have a product to build or code to review?
              </h2>
              <p className="mt-4 max-w-xl text-muted">
                The fastest way to work with me is Upwork. For anything else, email me.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <External href={links.upwork} className="btn-primary">
                  <Briefcase className="h-4 w-4" /> Upwork profile
                </External>
                <a href={`mailto:${links.email}`} className="btn-ghost">
                  <Mail className="h-4 w-4" /> {links.email}
                </a>
                <External href={links.linkedin} className="btn-ghost">
                  <Linkedin className="h-4 w-4" /> LinkedIn
                </External>
                <External href={links.github} className="btn-ghost">
                  <Github className="h-4 w-4" /> GitHub
                </External>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-page flex-col gap-2 px-4 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© 2026 {NAME}</p>
          <p className="font-mono text-xs">Built with Next.js · Deployed on Vercel</p>
        </div>
      </footer>
    </>
  );
}
