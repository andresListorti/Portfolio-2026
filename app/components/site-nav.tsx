"use client";

import { FileText } from "lucide-react";
import { useEffect, useState } from "react";

type NavProps = {
  items: { href: string; label: string }[];
  sectionsLabel: string;
  topLabel: string;
  hireMe: string;
  hireHref: string;
  resumeHref: string;
  resumeLabel: string;
  langHref: string;
  langLabel: string;
  langSwitchLabel: string;
  langCode: string;
};

export default function SiteNav(p: NavProps) {
  const [active, setActive] = useState("");

  // The prompt shows the section currently in view, like a shell's working directory.
  useEffect(() => {
    const sections = p.items
      .map((i) => document.getElementById(i.href.slice(1)))
      .filter((el): el is HTMLElement => el !== null);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    const onScroll = () => {
      if (window.scrollY < 200) setActive("");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [p.items]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line/70 bg-ink/75 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-page items-center gap-4 px-4 sm:px-6">
        <a href="#top" aria-label={p.topLabel} className="min-w-0 truncate font-mono text-[13px]">
          <span className="text-trace">andres@listorti</span>
          <span className="text-muted">:~/</span>
          <span className="text-fg">{active}</span>
          <span className="caret ml-0.5 inline-block h-[1em] w-[0.5em] translate-y-[0.15em] bg-verdict" aria-hidden />
        </a>
        <nav className="ml-auto hidden items-center gap-5 text-sm lg:flex" aria-label={p.sectionsLabel}>
          {p.items.map((n) => (
            <a
              key={n.href}
              href={n.href}
              aria-current={active === n.href.slice(1) ? "location" : undefined}
              className={`transition-colors hover:text-fg ${active === n.href.slice(1) ? "text-fg" : "text-muted"}`}
            >
              {n.label}
            </a>
          ))}
        </nav>
        <div className="ml-auto flex shrink-0 items-center gap-2 lg:ml-2">
          <a
            href={p.langHref}
            hrefLang={p.langCode}
            aria-label={p.langSwitchLabel}
            className="grid h-9 min-w-9 place-items-center rounded-md border border-line px-2 font-mono text-xs text-muted transition hover:text-fg"
          >
            {p.langLabel}
          </a>
          <a
            href={p.resumeHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={p.resumeLabel}
            className="hidden h-9 w-9 place-items-center rounded-md border border-line text-muted transition hover:text-fg sm:grid"
          >
            <FileText className="h-4 w-4" />
          </a>
          <a href={p.hireHref} target="_blank" rel="noopener noreferrer" className="btn-verdict !px-4 !py-2">
            {p.hireMe}
          </a>
        </div>
      </div>
    </header>
  );
}
