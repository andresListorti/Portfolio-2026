"use client";

import { FileText } from "lucide-react";
import { useEffect, useState } from "react";

type NavProps = {
  name: string;
  shortName: string;
  role: string;
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

  // Highlight the nav link of the section currently in view.
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
        <a href="#top" aria-label={p.topLabel} className="group flex min-w-0 items-center gap-3">
          <span className="relative grid h-9 w-9 shrink-0 place-items-center rounded-md bg-verdict text-[13px] font-bold tracking-tight text-ink transition-transform duration-300 group-hover:rotate-[-6deg]">
            AAL
            <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full border-2 border-ink bg-trace" aria-hidden />
          </span>
          <span className="min-w-0 leading-tight">
            <span className="block truncate text-[15px] font-semibold tracking-tight">
              <span className="sm:hidden">{p.shortName}</span>
              <span className="hidden sm:inline">{p.name}</span>
            </span>
            <span className="hidden truncate text-xs text-muted sm:block">{p.role}</span>
          </span>
        </a>
        <nav className="ml-auto hidden items-center gap-5 text-sm xl:flex" aria-label={p.sectionsLabel}>
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
        <div className="ml-auto flex shrink-0 items-center gap-2 xl:ml-2">
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
