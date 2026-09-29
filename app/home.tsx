import { ArrowUpRight, Download, FileText, Github, Linkedin, Lock, Mail, MessageCircle } from "lucide-react";
import Image from "next/image";
import type React from "react";
import NeuralField from "./components/neural-field";
import OrchestratorConsole from "./components/orchestrator-console";
import Pipeline from "./components/pipeline";
import ReviewDiff from "./components/review-diff";
import SiteNav from "./components/site-nav";
import SmoothScroll from "./components/smooth-scroll";
import { NAME, SITE_URL, content, links, localePath, type Locale, type Project } from "./data";

function External({
  href,
  children,
  className,
  label,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  label?: string;
}) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className} aria-label={label}>
      {children}
    </a>
  );
}

// Each section is addressed like a directory in the console metaphor: ~/process, ~/work...
function Section({
  id,
  title,
  intro,
  children,
  className = "",
}: {
  id: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`border-t border-line/60 py-20 md:py-28 ${className}`}>
      <div className="mx-auto max-w-page px-4 sm:px-6">
        <div className="grid gap-4 md:grid-cols-[10rem_1fr] md:gap-10">
          <p className="pt-2 font-mono text-[13px] text-trace/80" aria-hidden>
            ~/{id}
          </p>
          <div>
            <h2 className="max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight text-balance sm:text-5xl">
              {title}
            </h2>
            {intro && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{intro}</p>}
          </div>
        </div>
      </div>
      <div className="mt-12 md:mt-16">{children}</div>
    </section>
  );
}

function Inner({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-page px-4 sm:px-6 ${className}`}>{children}</div>;
}

function Tags({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((s) => (
        <span key={s} className="tag">
          {s}
        </span>
      ))}
    </div>
  );
}

function ProjectLinks({ p, t }: { p: Project; t: (typeof content)[Locale]["work"] }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {p.live && (
        <External href={p.live} className="btn-line !px-4 !py-2">
          {p.isPrivate ? t.productSite : t.live} <ArrowUpRight className="h-4 w-4" />
        </External>
      )}
      {p.code && (
        <External href={p.code} className="btn-line !px-4 !py-2">
          <Github className="h-4 w-4" /> {t.code}
        </External>
      )}
      {p.isPrivate && (
        <span className="tag gap-1.5">
          <Lock className="h-3 w-3" /> {t.privateNote}
        </span>
      )}
    </div>
  );
}

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: NAME,
    url: SITE_URL,
    jobTitle: ["AI-Native Software Engineer", "Full-Stack Developer", "Lawyer"],
    email: `mailto:${links.email}`,
    address: { "@type": "PostalAddress", addressLocality: "Buenos Aires", addressCountry: "AR" },
    alumniOf: [
      { "@type": "CollegeOrUniversity", name: "Universidad de Belgrano" },
      { "@type": "EducationalOrganization", name: "Coderhouse" },
    ],
    knowsLanguage: ["en", "es"],
    knowsAbout: ["AI agents", "Claude Code", "Next.js", "React", "Node.js", "TypeScript", "Java", "Spring Boot", "Code review", "Business law"],
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
      <SmoothScroll />
      <SiteNav
        items={t.nav}
        sectionsLabel={t.ui.sectionsLabel}
        topLabel={`${NAME}, ${t.ui.toTop}`}
        hireMe={t.ui.hireMe}
        hireHref={links.upwork}
        resumeHref={links.resume}
        resumeLabel={t.contact.resumeLabel}
        langHref={localePath(other)}
        langLabel={t.ui.langSwitch}
        langSwitchLabel={t.ui.langSwitchLabel}
        langCode={other}
      />

      <main id="top">
        {/* Hero: the orchestration console is the one loud element on the page */}
        <section className="relative overflow-hidden pt-16">
          <NeuralField className="pointer-events-none absolute inset-0 opacity-70" />
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: "radial-gradient(70rem 40rem at 70% 40%, transparent 30%, rgb(var(--ink)) 85%)" }}
            aria-hidden
          />
          <div className="relative mx-auto grid max-w-page items-center gap-12 px-4 pb-20 pt-14 sm:px-6 md:pt-24 lg:min-h-[calc(100svh-4rem)] lg:grid-cols-[1fr_1.1fr] lg:pb-24">
            <div className="hero-in">
              <p className="inline-flex items-center gap-2 text-sm text-muted">
                <span className="h-2 w-2 rounded-full bg-verdict shadow-[0_0_12px_rgb(var(--verdict))]" aria-hidden />
                {t.hero.badge}
              </p>
              <h1 className="mt-6 text-[3.1rem] font-semibold leading-[0.95] tracking-[-0.035em] text-balance sm:text-7xl lg:text-[4.1rem] xl:text-[4.6rem]">
                {NAME}
              </h1>
              <p className="mt-5 text-xl font-medium text-fg/85 sm:text-2xl">{t.hero.role}</p>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">{t.hero.lead}</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <External href={links.upwork} className="btn-verdict">
                  {t.hero.upwork}
                </External>
                <a href={`mailto:${links.email}`} className="btn-line">
                  <Mail className="h-4 w-4" /> {t.hero.email}
                </a>
                <External href={links.resume} className="btn-line">
                  <FileText className="h-4 w-4" /> {t.hero.resume}
                </External>
              </div>
              <div className="mt-7 flex items-center gap-2 text-muted">
                <External href={links.github} label="GitHub" className="grid h-10 w-10 place-items-center rounded-md border border-line transition hover:text-fg">
                  <Github className="h-4 w-4" />
                </External>
                <External href={links.linkedin} label="LinkedIn" className="grid h-10 w-10 place-items-center rounded-md border border-line transition hover:text-fg">
                  <Linkedin className="h-4 w-4" />
                </External>
                <External href={links.whatsapp} label="WhatsApp" className="grid h-10 w-10 place-items-center rounded-md border border-line transition hover:text-fg">
                  <MessageCircle className="h-4 w-4" />
                </External>
                <span className="ml-3 font-mono text-xs">{t.hero.location}</span>
              </div>
            </div>
            <div className="hero-in hero-in-late">
              <OrchestratorConsole copy={t.console} />
            </div>
          </div>
        </section>

        {/* Process */}
        <Section id="process" title={t.pipeline.title} intro={t.pipeline.intro}>
          <Pipeline copy={t.pipeline} />
        </Section>

        {/* Recent AI work */}
        <Section id="lab" title={t.lab.title} intro={t.lab.intro}>
          <Inner>
            <ul className="border-t border-line">
              {t.lab.items.map((item) => (
                <li key={item.name} className="grid gap-4 border-b border-line py-8 md:grid-cols-[10rem_1fr] md:gap-10">
                  <p className="font-mono text-xs text-muted md:pt-2">{item.kind}</p>
                  <div className="grid gap-5 lg:grid-cols-[1fr_16rem] lg:gap-10">
                    <div>
                      <h3 className="text-2xl font-semibold tracking-tight">{item.name}</h3>
                      <p className="mt-3 max-w-2xl leading-relaxed text-fg/80">{item.body}</p>
                    </div>
                    <div className="flex flex-col gap-4 lg:items-end">
                      <div className="lg:justify-end">
                        <Tags items={item.stack} />
                      </div>
                      {item.href && (
                        <External href={item.href} className="inline-flex items-center gap-1 text-sm text-trace transition hover:text-fg">
                          {item.linkLabel} <ArrowUpRight className="h-4 w-4" />
                        </External>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </Inner>
        </Section>

        {/* Projects */}
        <Section id="work" title={t.work.title}>
          <Inner className="space-y-10">
            {t.work.featured.map((p) => (
              <article key={p.title} className="panel overflow-hidden">
                <div className="lg:grid lg:grid-cols-[1.35fr_1fr]">
                  {p.image && (
                    <div className="group relative aspect-[16/10] overflow-hidden border-b border-line lg:m-5 lg:rounded-md lg:border">
                      <Image
                        src={p.image}
                        alt={`${p.title} — ${t.work.screenshotAlt}`}
                        fill
                        sizes="(min-width: 1024px) 55vw, 100vw"
                        className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      />
                    </div>
                  )}
                  <div className="flex flex-col p-6 lg:p-8">
                    <p className="font-mono text-xs text-muted">
                      {p.kind}, {p.year}
                    </p>
                    <h3 className="mt-2 text-3xl font-semibold tracking-tight">{p.title}</h3>
                    <p className="mt-3 leading-relaxed text-fg/80">{p.summary}</p>
                    <div className="mt-5">
                      <Tags items={p.stack} />
                    </div>
                    <div className="mt-6 lg:mt-auto lg:pt-6">
                      <ProjectLinks p={p} t={t.work} />
                    </div>
                  </div>
                </div>
                {p.caseStudy && (
                  <dl className="grid gap-px border-t border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
                    {(
                      [
                        [t.work.labels.problem, p.caseStudy.problem],
                        [t.work.labels.approach, p.caseStudy.approach],
                      ] as const
                    ).map(([label, text]) => (
                      <div key={label} className="bg-panel p-6">
                        <dt className="text-sm font-semibold text-verdict">{label}</dt>
                        <dd className="mt-2 text-sm leading-relaxed text-fg/80">{text}</dd>
                      </div>
                    ))}
                    <div className="bg-panel p-6">
                      <dt className="text-sm font-semibold text-verdict">{t.work.labels.decisions}</dt>
                      <dd className="mt-2">
                        <ul className="space-y-2 text-sm">
                          {p.caseStudy.decisions.map((d) => (
                            <li key={d} className="flex gap-2">
                              <span className="font-mono text-trace" aria-hidden>
                                ›
                              </span>
                              <span className="leading-relaxed text-fg/80">{d}</span>
                            </li>
                          ))}
                        </ul>
                      </dd>
                    </div>
                    <div className="bg-panel p-6">
                      <dt className="text-sm font-semibold text-verdict">{t.work.labels.outcome}</dt>
                      <dd className="mt-2 text-sm leading-relaxed text-fg/80">{p.caseStudy.outcome}</dd>
                    </div>
                  </dl>
                )}
              </article>
            ))}

            <div>
              <h3 className="text-xl font-semibold">{t.work.more}</h3>
              <div className="mt-5 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2">
                {t.work.others.map((p) => (
                  <article key={p.title} className="flex flex-col bg-ink p-6 transition-colors hover:bg-panel">
                    <p className="font-mono text-xs text-muted">
                      {p.kind}, {p.year}
                    </p>
                    <h4 className="mt-2 text-lg font-semibold">{p.title}</h4>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{p.summary}</p>
                    <div className="mt-4">
                      <Tags items={p.stack} />
                    </div>
                    <div className="mt-5 md:mt-auto md:pt-5">
                      <ProjectLinks p={p} t={t.work} />
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </Inner>
        </Section>

        {/* Code review samples */}
        <Section id="reviews" title={t.reviews.title} intro={t.reviews.intro}>
          <Inner className="space-y-8">
            {t.reviews.items.map((r, i) => (
              <ReviewDiff
                key={r.file}
                review={r}
                index={i}
                labels={{
                  context: t.reviews.context,
                  before: t.reviews.before,
                  after: t.reviews.after,
                  issues: t.reviews.issues,
                  why: t.reviews.why,
                  source: t.reviews.source,
                }}
              />
            ))}
          </Inner>
        </Section>

        {/* AI + Law */}
        <Section id="law" title={t.law.title} intro={t.law.intro}>
          <Inner>
            <div className="grid gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-2">
              {t.law.points.map((p) => (
                <div key={p.title} className="bg-ink p-7">
                  <h3 className="text-lg font-semibold text-verdict">{p.title}</h3>
                  <p className="mt-3 leading-relaxed text-fg/80">{p.body}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 max-w-3xl text-sm text-muted">{t.law.note}</p>
          </Inner>
        </Section>

        {/* About, experience and stack */}
        <Section id="about" title={t.about.title}>
          <Inner>
            <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr]">
              <div>
                <p className="text-xl leading-relaxed text-fg/90">{t.about.p1}</p>
                <p className="mt-5 text-lg leading-relaxed text-muted">{t.about.p2}</p>
              </div>
              <dl className="grid grid-cols-2 gap-px self-start overflow-hidden rounded-lg border border-line bg-line">
                {t.about.tiles.map((tile) => (
                  <div key={tile.label} className="bg-ink p-5">
                    <dt className="text-sm text-muted">{tile.label}</dt>
                    <dd className="mt-1 font-semibold">{tile.value}</dd>
                    {tile.sub && <dd className="mt-1 text-sm text-muted">{tile.sub}</dd>}
                  </div>
                ))}
              </dl>
            </div>

            <div className="mt-20 grid gap-12 lg:grid-cols-[1.3fr_1fr]">
              <div>
                <h3 className="text-xl font-semibold">{t.experience.title}</h3>
                <ol className="mt-6 space-y-8 border-l border-line pl-6">
                  {t.experience.items.map((e) => (
                    <li key={e.title} className="relative">
                      <span className="absolute -left-[1.85rem] top-1.5 h-3 w-3 rounded-full border-2 border-ink bg-verdict" aria-hidden />
                      <p className="font-mono text-xs text-muted">{e.period}</p>
                      <h4 className="mt-1 text-lg font-semibold">{e.title}</h4>
                      <p className="text-sm text-muted">{e.org}</p>
                      <p className="mt-2 leading-relaxed text-fg/80">{e.body}</p>
                    </li>
                  ))}
                </ol>
              </div>
              <div>
                <h3 className="text-xl font-semibold">{t.experience.educationLabel}</h3>
                <ul className="mt-6 divide-y divide-line border-y border-line">
                  {t.experience.education.map((ed) => (
                    <li key={ed.title} className="py-3">
                      <p className="font-medium">{ed.title}</p>
                      <p className="text-sm text-muted">
                        {ed.org}, {ed.period}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-20">
              <h3 className="text-xl font-semibold">{t.stack.title}</h3>
              <dl className="mt-6 divide-y divide-line border-y border-line">
                {t.stack.groups.map((s) => (
                  <div key={s.group} className="grid gap-3 py-4 sm:grid-cols-[10rem_1fr]">
                    <dt className="text-sm text-muted sm:pt-0.5">{s.group}</dt>
                    <dd>
                      <Tags items={s.items} />
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </Inner>
        </Section>

        {/* Contact */}
        <Section id="contact" title={t.contact.title} intro={t.contact.body} className="pb-28">
          <Inner>
            <ul className="border-t border-line font-mono">
              {t.contact.channels.map((c) => {
                const isMail = c.href.startsWith("mailto:");
                const cls =
                  "group grid grid-cols-[6.5rem_1fr_auto] items-center gap-4 border-b border-line py-5 text-sm transition-colors hover:bg-panel sm:grid-cols-[10rem_1fr_auto] sm:px-4 sm:text-base";
                const inner = (
                  <>
                    <span className="text-muted">{c.label}</span>
                    <span className="min-w-0 truncate text-fg group-hover:text-verdict">{c.value}</span>
                    <ArrowUpRight className="h-4 w-4 text-muted transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-verdict" />
                  </>
                );
                return (
                  <li key={c.label}>
                    {isMail ? (
                      <a href={c.href} className={cls}>
                        {inner}
                      </a>
                    ) : (
                      <External href={c.href} className={cls}>
                        {inner}
                      </External>
                    )}
                  </li>
                );
              })}
            </ul>
            <External href={links.resume} className="btn-verdict mt-10">
              <Download className="h-4 w-4" /> {t.contact.resumeLabel}
            </External>
          </Inner>
        </Section>
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
