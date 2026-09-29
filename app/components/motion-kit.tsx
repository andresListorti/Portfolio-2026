"use client";

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useEffect, useRef, type PointerEvent, type ReactNode } from "react";

const EASE = [0.2, 0.7, 0.2, 1] as const;

const tags = {
  div: motion.div,
  li: motion.li,
  article: motion.article,
};

/** Fades and un-blurs content in when it enters the viewport, and back out when it leaves. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: keyof typeof tags;
}) {
  const reduce = useReducedMotion();
  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }
  const M = tags[as];
  return (
    <M
      className={className}
      initial={{ opacity: 0, y, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ amount: 0.15, once: false }}
      transition={{ duration: 0.8, ease: EASE, delay }}
    >
      {children}
    </M>
  );
}

/** Headline whose words slide up out of a mask, one after another. */
export function RevealText({
  text,
  className,
  as = "h2",
  delay = 0,
}: {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p";
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { amount: 0.4, once: true });
  const Tag = as;
  if (reduce) return <Tag className={className}>{text}</Tag>;

  const words = text.split(" ");
  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {words.map((word, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.1em] align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            animate={inView ? { y: 0 } : { y: "110%" }}
            transition={{ duration: 0.7, ease: EASE, delay: delay + i * 0.045 }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && " "}
        </span>
      ))}
    </Tag>
  );
}

/** Infinite ticker; pauses on hover. */
export function Marquee({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  const reduce = useReducedMotion();
  const row = (key: string) => (
    <div key={key} className="flex shrink-0 items-center gap-8 pr-8">
      {items.map((item) => (
        <span key={item} className="flex items-center gap-8 whitespace-nowrap text-3xl font-semibold tracking-tight text-fg/20 sm:text-5xl">
          {item}
          <span className="text-base text-trace/70">◆</span>
        </span>
      ))}
    </div>
  );

  return (
    <div className="relative">
      <p className="sr-only">{items.join(", ")}</p>
      <div
        aria-hidden
        className="group flex overflow-hidden"
        style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}
      >
        {reduce ? (
          <div className="flex flex-wrap">{row("a")}</div>
        ) : (
          <div
            className="marquee-track flex w-max group-hover:[animation-play-state:paused]"
            style={{ animationDuration: `${items.length * 3}s`, animationDirection: reverse ? "reverse" : "normal" }}
          >
            {row("a")}
            {row("b")}
          </div>
        )}
      </div>
    </div>
  );
}

/** Number that counts up from zero the first time it scrolls into view. */
export function CountUp({ to, suffix = "", duration = 1.6, className = "" }: { to: number; suffix?: string; duration?: number; className?: string }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { amount: 0.6, once: true });
  const value = useMotionValue(0);
  const text = useTransform(value, (v) => `${Math.round(v)}${suffix}`);

  useEffect(() => {
    if (reduce) {
      value.set(to);
      return;
    }
    if (!inView) return;
    const controls = animate(value, to, { duration, ease: "easeOut" });
    return () => controls.stop();
  }, [inView, reduce, to, duration, value]);

  return (
    <motion.span ref={ref} className={`tabular-nums ${className}`}>
      {text}
    </motion.span>
  );
}

export function ScrollProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-verdict"
      style={{ scaleX: reduce ? scrollYProgress : smooth }}
    />
  );
}

/** Moves its content vertically while the wrapper crosses the viewport. */
export function Parallax({ children, amount = 60, className = "" }: { children: ReactNode; amount?: number; className?: string }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-amount, amount]);
  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div className="absolute inset-x-0" style={{ top: -amount, bottom: -amount, y: reduce ? 0 : y }}>
        {children}
      </motion.div>
    </div>
  );
}

/** Container with a soft glow that follows the pointer. */
export function Spotlight({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  function onMove(e: PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--x", `${e.clientX - r.left}px`);
    el.style.setProperty("--y", `${e.clientY - r.top}px`);
  }

  return (
    <div ref={ref} onPointerMove={onMove} className={`group relative overflow-hidden ${className}`}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: "radial-gradient(420px circle at var(--x, 50%) var(--y, 50%), rgb(var(--trace) / 0.12), transparent 60%)" }}
      />
      {children}
    </div>
  );
}
