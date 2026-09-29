"use client";

import { useEffect } from "react";
import { useReducedMotion } from "motion/react";
import Lenis from "lenis";

export default function SmoothScroll() {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;

    let lenis: Lenis | null = null;
    let rafId: number;

    lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis?.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    function onClick(e: MouseEvent) {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;

      const id = href.slice(1);
      const el = document.getElementById(id);
      if (!el) return;

      if (lenis) {
        e.preventDefault();
        lenis.scrollTo(el, { offset: -72 });
        history.replaceState(null, "", href);
      }
    }

    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(rafId);
      lenis?.destroy();
      document.removeEventListener("click", onClick);
    };
  }, [reduced]);

  return null;
}