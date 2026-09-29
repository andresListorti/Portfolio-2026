# Portfolio redesign v2 — motion spec (for delegated agents)

Read `docs/redesign-agent-spec.md` first: the design tokens and HARD RULES there still apply
(use client, reduced motion, pause off-screen/hidden, cleanup, SSR-safe, no ALL-CAPS labels,
run `npx tsc --noEmit` at the end and fix errors in your files). Motion API: `import { ... } from "motion/react"`.
Do not modify files you were not assigned. Do not run npm install.

The client asked for MUCH more motion than v1: a lively background and fade in / fade out of content while scrolling.

---

## F. app/components/graph-field.tsx  (global animated knowledge-graph background) — replaces neural-field

```ts
export default function GraphField({ labels }: { labels: string[] })  // labels for hub nodes, e.g. ["Claude Code","React","MCP","Law",...]
```
Renders `<canvas aria-hidden className="pointer-events-none fixed inset-0 -z-10 h-full w-full" />` covering the viewport for the whole page (the page body has bg-ink; the canvas sits above the body background — use `-z-10` on the canvas and make sure it is visible: give the canvas `z-0` if -z-10 hides it behind body; the caller wraps content in `relative z-10`).
Look: an animated knowledge graph in the style of Graphify / Obsidian graph view. Clearly visible, not faint.
- Nodes: count = clamp(viewportArea / 11000, 45, 140). Two kinds:
  - regular nodes: radius 1.6–2.6px, fill rgba(139,147,167,0.75).
  - hub nodes: one per label (max 14), radius 4–5.5px, fill trace #5EEAD4 with a soft glow (radial gradient radius ~18px, alpha .25). Label drawn next to the hub in 11px `JetBrains Mono` (read the font family from getComputedStyle(document.body).getPropertyValue('--font-mono') or just use "ui-monospace, monospace"), color rgba(231,234,243,0.55). Hubs breathe: radius oscillates ±15% with a slow sine, each with its own phase.
- Motion: every node drifts (0.08–0.35 px/frame) along a slowly rotating heading (add small per-frame noise to the angle) so movement feels organic, wrapping around viewport edges with a 40px margin.
- Links: connect pairs closer than 150px; stroke rgba(94,234,212, 0.28 * (1 - d/150)), width 1. Hubs also connect to their 3 nearest regular nodes regardless of distance (≤ 320px) with rgba(94,234,212,0.18) — this makes clusters around hubs.
- Pointer as a node: when the pointer (mouse/pen, not touch) is on the page, draw links from the pointer to every node within 200px (rgba(245,181,68, 0.45*(1-d/200)), width 1) and gently push nodes away if closer than 60px (repel 1.2px/frame max) — like dragging through a graph.
- Pulses: every 250ms spawn a pulse along a random existing link (max 16 alive), duration 700–1300ms, drawn as a 2.4px dot with a 3-point fading trail; 70% are trace colored, 30% verdict #F5B544.
- Scroll parallax: offset the whole drawing vertically by `-(window.scrollY * 0.12) % viewportHeight` wrapped so the graph appears to move slower than content (draw nodes at (y + offset) mod height, keep link math on wrapped positions — simplest: apply offset when drawing and compute links on drawn positions).
- Performance: single rAF loop, dpr capped at 2, reuse arrays, O(n²) is fine for n ≤ 140 + hubs. Pause when document.hidden. Resize on window resize (re-seed nodes proportionally).
- Reduced motion: draw one static frame (nodes, hubs with labels, links; no pulses, no pointer) and redraw it on resize only.

---

## G. Motion primitives (all in app/components/motion.tsx, one file, several named exports)

```ts
export function Reveal({ children, delay = 0, y = 28, className, as = "div" }: { children: ReactNode; delay?: number; y?: number; className?: string; as?: "div" | "li" | "section" | "article" })
```
Fades + blurs in (opacity 0→1, y→0, filter blur(8px)→0) when entering the viewport and fades back OUT when it leaves (use `whileInView` with `viewport={{ amount: 0.2, once: false }}`, initial/exit states the same). Duration 0.8, ease [0.2, 0.7, 0.2, 1]. Reduced motion: render children in a plain element, no animation.

```ts
export function RevealText({ text, className, as = "h2", delay = 0 }: { text: string; className?: string; as?: "h1" | "h2" | "h3" | "p"; delay?: number })
```
Splits text into words; each word sits in an `inline-block overflow-hidden` wrapper and the inner span slides up from `y: "110%"` to 0 with stagger 0.045s when in view (once: true, amount 0.5). Keep real spaces between words so text wraps naturally and screen readers read the full text: put `aria-label={text}` on the element and `aria-hidden` on the word spans. Reduced motion: plain element with the text.

```ts
export function Marquee({ items, speed = 40, reverse = false }: { items: string[]; speed?: number; reverse?: boolean })
```
Infinite horizontal ticker: duplicate the item list twice in a flex row, animate `x` from 0 to -50% linearly forever (duration = content width / speed; simplest: duration = items.length * 2.2 seconds). Items rendered as `text-2xl sm:text-4xl font-semibold text-fg/15` separated by a small trace-colored ◆ (aria-hidden). Pause on hover (use motion `animate` controls or CSS animation with `animation-play-state`). Mask edges with `mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent)`. The whole marquee is `aria-hidden` and you render an sr-only `<p>` with `items.join(", ")`. Reduced motion: static wrapped list, no animation.

```ts
export function CountUp({ to, suffix = "", duration = 1.6, className }: { to: number; suffix?: string; duration?: number; className?: string })
```
Counts from 0 to `to` when it scrolls into view (once), easeOut, using `useMotionValue` + `animate` + `useTransform(Math.round)`, rendered in a `motion.span`. SSR/no-JS and reduced motion show the final value. Use `tabular-nums`.

```ts
export function ScrollProgress()
```
Fixed 2px bar at the very top (z-[70]) in bg-verdict, `scaleX` bound to `useSpring(useScroll().scrollYProgress, { stiffness: 120, damping: 30 })`, origin-left. Reduced motion: no spring, bind directly.

```ts
export function Parallax({ children, amount = 60, className }: { children: ReactNode; amount?: number; className?: string })
```
Wraps content (e.g. an image) and translates it on Y from `-amount` to `+amount` px as the wrapper crosses the viewport (`useScroll({ target, offset: ["start end", "end start"] })`). The wrapper must be `overflow-hidden relative`; the inner motion.div is `absolute inset-[-{amount}px_0]` sized to cover (use style top/bottom = -amount). Reduced motion: no transform.

```ts
export function Spotlight({ children, className }: { children: ReactNode; className?: string })
```
A container (`relative overflow-hidden`) that tracks the pointer and paints a radial glow `radial-gradient(420px circle at var(--x) var(--y), rgb(var(--trace) / 0.10), transparent 60%)` in an absolutely positioned pointer-events-none layer that fades in on pointerenter and out on pointerleave. Update CSS vars via ref (no React state per mousemove).
