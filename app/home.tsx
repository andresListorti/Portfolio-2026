import { ArrowUpRight, Briefcase, FileText, Github, Languages, Linkedin, Lock, Mail, MapPin, Scale } from "lucide-react";
import Image from "next/image";
import type React from "react";
import { NAME, SITE_URL, content, links, localePath, type Locale, type Project } from "./data";
import ThemeToggle from "./theme-toggle";

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
  intro,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mx-auto max-w-page px-4 py-16 sm:px-6 md:py-20">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl">{title}</h2>
      {intro && <p className="mt-4 max-w-3xl leading-relaxed text-muted">{intro}</p>}
      <div className="mt-10">{children}</div>
    </section>
  );
}

function ProjectLinks({ p, t }: { p: Project; t: (typeof content)[Locale]["work"] }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {p.live && (
        <External href={p.live} className="btn-ghost !px-4 !py-2">
          {p.isPrivate ? t.productSite : t.live} <ArrowUpRight className="h-4 w-4" />
        </External>
      )}
      {p.code && (
        <External href={p.code} className="btn-ghost !px-4 !py-2">
          <Github className="h-4 w-4" /> {t.code}
        </External>
      )}
      {p.isPrivate && (
        <span className="chip gap-1.5">
          <Lock className="h-3 w-3" /> {t.privateNote}
        </span>
      )}
    </div>
  );
}

function CodeBlock({ label, code, tone }: { label: string; code: string; tone: "bad" | "good" }) {
  return (
    <div className="min-w-0">
      <p className={`font-mono text-[11px] uppercase tracking-[0.18em] ${tone === "bad" ? "text-amber-500" : "text-accent"}`}>
        {label}
      </p>
      <pre className="code-block mt-2">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: NAME,
    url: SITE_URL,
    jobTitle: ["Full-Stack Developer", "Lawyer"],
    email: `mailto:${links.email}`,
    address: { "@type": "PostalAddress", addressLocality: "Buenos Aires", addressCountry: "AR" },
    alumniOf: [
      { "@type": "CollegeOrUniversity", name: "Universidad de Belgrano" },
      { "@type": "EducationalOrganization", name: "Coderhouse" },
    ],
    knowsLanguage: ["en", "es"],
    knowsAbout: ["Next.js", "React", "Node.js", "TypeScript", "Java", "Spring Boot", "Code review", "AI agents", "Business law"],
    sameAs: [links.upwork, links.github, links.linkedin],
  };
}

export default function Home({ locale }: { locale: Locale }) {
  const t = content[locale];
  const other: Locale = locale === "en" ? "es" : "en";

  return (
    <>
      <script
        type="application/ld+json"
        // Static data defined in this repo; no user input.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()) }}
      />

      {/* Nav */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-line/60 bg-bg/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-page items-center gap-4 px-4 sm:px-6">
          <a href="#top" className="flex items-center gap-2.5" aria-label={`${NAME}, ${t.ui.toTop}`}>
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-fg font-mono text-[11px] font-bold text-bg">
              AAL
            </span>
            <span className="hidden text-sm font-medium sm:inline lg:hidden xl:inline">{NAME}</span>
          </a>
          <nav className="ml-auto hidden items-center gap-5 text-sm text-muted lg:flex" aria-label={t.ui.sectionsLabel}>
            {t.nav.map((n) => (
              <a key={n.href} href={n.href} className="transition hover:text-fg">
                {n.label}
              </a>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-2 lg:ml-4">
            <a
              href={localePath(other)}
              hrefLang={other}
              aria-label={t.ui.langSwitchLabel}
              className="inline-flex h-9 items-center gap-1.5 rounded-full border border-line px-3 font-mono text-xs text-muted transition hover:text-fg"
            >
              <Languages className="h-3.5 w-3.5" /> {t.ui.langSwitch}
            </a>
            <ThemeToggle label={t.ui.themeLabel} />
            <External href={links.upwork} className="btn-primary !px-4 !py-2">
              {t.ui.hireMe}
            </External>
          </div>
        </div>
      </header>

      <main id="top">
        {/* Hero */}
        <section className="relative overflow-hidden pt-16">
          <div className="hero-bg pointer-events-none absolute inset-0" aria-hidden />
          <div className="relative mx-auto grid max-w-page items-center gap-12 px-4 pb-16 pt-16 sm:px-6 md:pb-24 md:pt-28 lg:grid-cols-[1fr_23rem]">
            <div>
              <p className="rise inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-3 py-1 text-xs text-muted">
                <span className="live-dot h-2 w-2 rounded-full bg-accent" /> {t.hero.badge}
              </p>
              <h1 className="rise rise-1 mt-6 text-[2.6rem] font-semibold leading-[1.05] tracking-tight text-balance sm:text-6xl md:text-7xl">
                {NAME}
              </h1>
              <p className="rise rise-2 mt-4 font-mono text-sm text-gradient sm:text-base">{t.hero.role}</p>
              <p className="rise rise-2 mt-6 max-w-2xl text-lg text-muted text-balance sm:text-xl">{t.hero.lead}</p>
              <div className="rise rise-3 mt-9 flex flex-wrap gap-3">
                <External href={links.upwork} className="btn-primary">
                  <Briefcase className="h-4 w-4" /> {t.hero.upwork}
                </External>
                <a href={`mailto:${links.email}`} className="btn-ghost">
                  <Mail className="h-4 w-4" /> {t.hero.email}
                </a>
                <External href={links.resume} className="btn-ghost">
                  <FileText className="h-4 w-4" /> {t.hero.resume}
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
                  <MapPin className="h-4 w-4" /> {t.hero.location}
                </span>
              </div>
            </div>

            {/* Illustrates the practice, not a real PR */}
            <figure className="rise rise-3 card hidden overflow-hidden font-mono text-[13px] lg:block" aria-label={t.hero.reviewAria}>
              <div className="flex items-center gap-1.5 border-b border-line px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-fg/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-fg/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-fg/15" />
                <span className="ml-2 text-xs text-muted">{t.hero.reviewFile}</span>
              </div>
              <ul className="space-y-2.5 p-5 leading-relaxed">
                {t.hero.reviewItems.map((r) => (
                  <li key={r.text}>
                    <span className={r.ok ? "text-accent" : "text-amber-500"}>{r.ok ? "✓" : "!"}</span> {r.text}
                    {r.note && <span className="text-muted"> {r.note}</span>}
                  </li>
                ))}
              </ul>
              <figcaption className="border-t border-line px-5 py-3 font-sans text-xs text-muted">{t.hero.reviewCaption}</figcaption>
            </figure>
          </div>
        </section>

        {/* About — bento */}
        <Section id="about" eyebrow={t.about.eyebrow} title={t.about.title}>
          <div className="grid gap-4 md:grid-cols-6">
            <div className="card p-6 md:col-span-4 md:row-span-2">
              <p className="text-lg leading-relaxed text-fg/90">{t.about.p1}</p>
              <p className="mt-4 leading-relaxed text-muted">{t.about.p2}</p>
            </div>
            {t.about.tiles.map((tile, i) => (
              <div key={tile.label} className={`card p-6 ${i < 2 ? "md:col-span-2" : "md:col-span-3"}`}>
                <p className="font-mono text-xs text-muted">{tile.label}</p>
                <p className={`mt-2 ${tile.sub ? "text-2xl font-semibold" : "text-lg font-medium"}`}>{tile.value}</p>
                {tile.sub && <p className="mt-1 text-sm text-muted">{tile.sub}</p>}
              </div>
            ))}
          </div>
        </Section>

        {/* AI */}
        <Section id="ai" eyebrow={t.ai.eyebrow} title={t.ai.title}>
          <div className="grid gap-4 sm:grid-cols-2">
            {t.ai.items.map((a, i) => (
              <div key={a.title} className="card group p-6 transition hover:border-accent/50">
                <span className="font-mono text-xs text-accent">0{i + 1}</span>
                <h3 className="mt-3 text-lg font-semibold">{a.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{a.body}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Code review samples */}
        <Section id="reviews" eyebrow={t.reviews.eyebrow} title={t.reviews.title} intro={t.reviews.intro}>
          <div className="space-y-6">
            {t.reviews.items.map((r, i) => (
              <article key={r.file} className="card overflow-hidden">
                <header className="flex flex-wrap items-center gap-x-3 gap-y-1 border-b border-line px-5 py-3 sm:px-6">
                  <span className="font-mono text-xs text-accent">#{i + 1}</span>
                  <h3 className="font-mono text-sm font-semibold">{r.file}</h3>
                  <span className="chip">{r.lang}</span>
                  <External href={r.repoUrl} className="ml-auto inline-flex items-center gap-1 text-xs text-muted transition hover:text-fg">
                    {t.reviews.source}: {r.repo} <ArrowUpRight className="h-3.5 w-3.5" />
                  </External>
                </header>
                <div className="grid gap-6 p-5 sm:p-6 lg:grid-cols-2">
                  <div className="min-w-0 space-y-5">
                    <div>
                      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">{t.reviews.context}</p>
                      <p className="mt-2 leading-relaxed text-fg/90">{r.context}</p>
                    </div>
                    <CodeBlock label={t.reviews.before} code={r.before} tone="bad" />
                    <div>
                      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">{t.reviews.issues}</p>
                      <ul className="mt-2 space-y-2 text-sm">
                        {r.issues.map((issue) => (
                          <li key={issue} className="flex gap-2">
                            <span className="mt-[0.1rem] font-mono text-amber-500">!</span>
                            <span className="leading-relaxed text-fg/85">{issue}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="min-w-0 space-y-5">
                    <CodeBlock label={t.reviews.after} code={r.after} tone="good" />
                    <div className="rounded-xl border border-accent/30 bg-accent/[0.06] p-4">
                      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">{t.reviews.why}</p>
                      <p className="mt-2 text-sm leading-relaxed text-fg/90">{r.why}</p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Section>

        {/* AI + Law */}
        <Section id="law" eyebrow={t.law.eyebrow} title={t.law.title} intro={t.law.intro}>
          <div className="grid gap-4 md:grid-cols-2">
            {t.law.points.map((p) => (
              <div key={p.title} className="card p-6">
                <Scale className="h-5 w-5 text-accent" aria-hidden />
                <h3 className="mt-3 text-lg font-semibold">{p.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{p.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 max-w-3xl text-sm text-muted">{t.law.note}</p>
        </Section>

        {/* Work */}
        <Section id="work" eyebrow={t.work.eyebrow} title={t.work.title}>
          <div className="space-y-6">
            {t.work.featured.map((p) => (
              <article key={p.title} className="card overflow-hidden">
                <div className="md:grid md:grid-cols-5">
                  {p.image && (
                    <div className="relative aspect-[16/10] self-start border-b border-line md:col-span-3 md:m-4 md:overflow-hidden md:rounded-xl md:border">
                      <Image
                        src={p.image}
                        alt={`${p.title} — ${t.work.screenshotAlt}`}
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
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {p.stack.map((s) => (
                        <span key={s} className="chip">
                          {s}
                        </span>
                      ))}
                    </div>
                    <div className="mt-6 md:mt-auto md:pt-6">
                      <ProjectLinks p={p} t={t.work} />
                    </div>
                  </div>
                </div>
                {p.caseStudy && (
                  <dl className="grid gap-px border-t border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
                    <div className="bg-surface p-6">
                      <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">{t.work.labels.problem}</dt>
                      <dd className="mt-2 text-sm leading-relaxed text-fg/85">{p.caseStudy.problem}</dd>
                    </div>
                    <div className="bg-surface p-6">
                      <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">{t.work.labels.approach}</dt>
                      <dd className="mt-2 text-sm leading-relaxed text-fg/85">{p.caseStudy.approach}</dd>
                    </div>
                    <div className="bg-surface p-6">
                      <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">{t.work.labels.decisions}</dt>
                      <dd className="mt-2">
                        <ul className="space-y-2 text-sm">
                          {p.caseStudy.decisions.map((d) => (
                            <li key={d} className="flex gap-2">
                              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                              <span className="leading-relaxed text-fg/85">{d}</span>
                            </li>
                          ))}
                        </ul>
                      </dd>
                    </div>
                    <div className="bg-surface p-6">
                      <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">{t.work.labels.outcome}</dt>
                      <dd className="mt-2 text-sm leading-relaxed text-fg/85">{p.caseStudy.outcome}</dd>
                    </div>
                  </dl>
                )}
              </article>
            ))}
          </div>

          <h3 className="mt-16 font-mono text-xs uppercase tracking-[0.2em] text-muted">{t.work.more}</h3>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {t.work.others.map((p) => (
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
                  <ProjectLinks p={p} t={t.work} />
                </div>
              </article>
            ))}
          </div>
        </Section>

        {/* Experience */}
        <Section id="experience" eyebrow={t.experience.eyebrow} title={t.experience.title}>
          <div className="grid gap-10 md:grid-cols-5">
            <ol className="relative space-y-8 border-l border-line pl-6 md:col-span-3">
              {t.experience.items.map((e) => (
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
              <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-muted">{t.experience.educationLabel}</h3>
              <ul className="mt-4 divide-y divide-line">
                {t.experience.education.map((ed) => (
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
        <Section id="stack" eyebrow={t.stack.eyebrow} title={t.stack.title}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {t.stack.groups.map((s) => (
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
              <p className="eyebrow">{t.contact.eyebrow}</p>
              <h2 className="mt-3 max-w-xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl">{t.contact.title}</h2>
              <p className="mt-4 max-w-xl text-muted">{t.contact.body}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <External href={links.upwork} className="btn-primary">
                  <Briefcase className="h-4 w-4" /> {t.contact.upwork}
                </External>
                <a href={`mailto:${links.email}`} className="btn-ghost max-w-full">
                  <Mail className="h-4 w-4 shrink-0" /> <span className="truncate">{links.email}</span>
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
          <p className="font-mono text-xs">{t.footer.built}</p>
        </div>
      </footer>
    </>
  );
}
