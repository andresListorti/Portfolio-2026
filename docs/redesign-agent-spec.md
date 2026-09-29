# Portfolio redesign — component spec (for delegated agents)

Stack: Next.js 15 App Router, React 19, TypeScript strict, Tailwind 3, `motion` v12 (import from "motion/react"), `lenis`. All already installed. Do NOT run npm install, do NOT touch files outside the ones assigned to you.

## Design tokens (already defined in app/globals.css + tailwind.config.ts)
Tailwind colors: `ink` (#070A12 page bg), `panel` (#0E1322 surfaces), `line` (#1D2538 hairlines), `fg` (#E7EAF3 text), `muted` (#8B93A7), `trace` (#5EEAD4 = machine/agent output), `verdict` (#F5B544 = human approval), `reject` (#FB7185 = returned by review). All support alpha: `bg-trace/10`.
CSS vars hold RGB triplets: `rgb(var(--trace))`, `rgb(var(--line) / 0.5)` — use these inside canvas code via getComputedStyle, or hardcode the hex values above.
Fonts: `font-sans` (Bricolage Grotesque), `font-mono` (JetBrains Mono). Mono ONLY for terminal/code content.
Components classes: `.panel` (rounded-lg border bg-panel/80), `.tag`, `.code-block`, `.btn-verdict`, `.btn-line`.
Radii: rounded-md / rounded-lg only. No shadows except subtle glows in trace/verdict. No gradient text. No ALL-CAPS labels.

## Hard rules
- Every component file starts with "use client" and has a default export.
- Respect `prefers-reduced-motion` (use `useReducedMotion` from "motion/react"): no autoplay/typing/particles moving; render a meaningful static state.
- Pause animation loops when off-screen (IntersectionObserver) and when `document.hidden`.
- No layout shift: fixed heights for animated areas.
- Clean up every listener, timer, rAF and observer on unmount.
- SSR safe: no window/document access during render.
- Accessible: decorative animation `aria-hidden`; provide an sr-only text equivalent where content matters.
- Match comment density of a clean codebase: few, useful comments. No console.log.
- When done, run `npx tsc --noEmit` from the repo root and fix any error in YOUR files.

---

## A. app/components/orchestrator-console.tsx  (hero centerpiece)

```ts
export type ConsoleTask = {
  agent: string;          // e.g. "claude-code", "codex", "muse-spark", "nemotron"
  task: string;           // short instruction, e.g. "add idempotent Mercado Pago webhook"
  log: string[];          // 2-3 short output lines the agent "streams"
  verdict: "approved" | "returned";
  note: string;           // reviewer note, e.g. "signature checked before parse"
};
export type ConsoleCopy = {
  ariaLabel: string;
  title: string;          // window title, e.g. "orchestrator.run"
  agentsLabel: string;    // "Agents"
  reviewLabel: string;    // "review"
  approved: string;       // "approved"
  returned: string;       // "returned"
  idle: string; working: string; // lane status words
  tasks: ConsoleTask[];
};
export default function OrchestratorConsole({ copy }: { copy: ConsoleCopy })
```
Look: a `.panel` window, fixed height `h-[27rem]`, overflow hidden, subtle trace glow (box-shadow 0 0 80px -30px rgb(var(--trace)/.35)).
- Title bar: three small `bg-line` dots, title in mono muted text, and at the right a live counter "✓ N  ↺ M" (N approved in verdict color, M returned in reject color). Numbers animate when they change (motion, small y slide).
- Body: grid `sm:grid-cols-[9.5rem_1fr]`.
  - Left column (hidden below sm): heading `agentsLabel` in small muted sans; list of unique agents from tasks. Each row: status dot + agent name mono 12px. Dot: idle = bg-line, working = bg-trace with pulsing ring (motion scale/opacity loop), done-last = bg-verdict. Status word small muted.
  - Right column: the log stream, mono 12.5px, leading-relaxed. Sequence per task, looping through tasks forever:
    1. line `› dispatch <agent> — <task>` (fg; agent name in trace).
    2. each `log` line typed char-by-char (~18ms/char) in trace/80, prefixed with `  │ `.
    3. after 500ms a review line: approved → `  ⚖ review: approved — <note>` in verdict; returned → `  ↺ review: returned — <note>` in reject. Update counters.
    4. 900ms pause, next task.
  - Keep only the last ~14 lines; lines enter with motion (opacity 0→1, y 6→0, 0.25s). Older lines above the last 6 fade to 45% opacity. A blinking block caret (class `caret`) sits after the currently typing line.
- Reduced motion: render all tasks fully (first 3 tasks worth of lines), counters static, no caret blink.
- Wrap the animated visual in `aria-hidden`, and render an sr-only `<ul>` listing each task as "<agent>: <task> — <verdict>, <note>". Outer element is `<figure aria-label={copy.ariaLabel}>`.

## B. app/components/pipeline.tsx  (scroll-pinned "how I work" process)

```ts
export type PipelineStep = { name: string; body: string; detail: string[] }; // detail = 2-3 short mono lines
export type PipelineCopy = { steps: PipelineStep[]; progressLabel: string }; // progressLabel e.g. "step"
export default function Pipeline({ copy }: { copy: PipelineCopy })
```
- Desktop (lg+) and motion allowed: outer `div` with height `${steps.length * 75}vh` and `relative`; inner `sticky top-0 h-screen flex items-center`. Use `useScroll({ target: outerRef, offset: ["start start","end end"] })` to get progress 0..1; active index = floor(progress * steps.length) clamped (use useMotionValueEvent to set state).
  - Layout inside sticky: `mx-auto max-w-page px-6 grid grid-cols-[1fr_1.2fr] gap-16 w-full`.
  - Left: a huge step number (text-[9rem] font-semibold leading-none, `text-fg/10`, the active number crossfades via AnimatePresence) with, overlapping at its baseline, the step name (text-5xl font-semibold tracking-tight) swapping with a y-slide. Under it, `progressLabel N / total` in mono muted.
  - Right: vertical list of all steps; a 2px rail on the left in bg-line with an overlay filling in bg-verdict using `scaleY` bound to scroll progress (origin top). Each step row: name (text-xl) + body (muted). Active row fg + full opacity and its `detail` lines expand (height auto animation) rendered mono 12px in trace/80 prefixed by `› `; inactive rows opacity-40, detail collapsed.
- Below lg OR reduced motion: plain `<ol>` with each step as a block: number (mono, verdict), name, body, detail lines visible. No sticky.
- Numbers are legit here: the content is a real sequence.

---

## C. app/components/neural-field.tsx  (hero background canvas)

```ts
export default function NeuralField({ className }: { className?: string })
```
- Renders `<canvas aria-hidden className={className}/>` that fills its positioned parent (caller gives `absolute inset-0`). Handle devicePixelRatio (cap at 2) and resize via ResizeObserver.
- Node count = clamp(area / 16000, 28, 90). Nodes drift slowly (speed 0.05–0.25 px/frame), wrap or bounce at edges. Radius 1–1.8px, color `#8B93A7` at 0.5 alpha; ~12% of nodes are "agents" drawn in trace `#5EEAD4` with a faint 6px glow.
- Links between nodes closer than 140px: stroke `#1D2538`-ish (use rgba(94,234,212, alpha) where alpha = 0.10 * (1 - d/140)), lineWidth 1.
- Pointer: nodes within 170px of the pointer are gently attracted (max 0.6px/frame) and links near the pointer brighten; pointer tracked on window (pointermove), coordinates made relative to the canvas rect. No pointer on touch → ignore.
- Pulses: every ~700ms spawn a pulse travelling along an existing link from one node to another over ~900ms, drawn as a 2.2px dot in verdict `#F5B544` with a short trail. Max 6 pulses alive.
- Pause when off-screen / document hidden. Reduced motion: draw ONE static frame (nodes + links, no pulses) and stop.
- Keep it cheap: single rAF loop, no allocations per frame inside hot loops beyond what's necessary, O(n²) link check is fine for n ≤ 90.

## D. app/components/smooth-scroll.tsx

```ts
export default function SmoothScroll()  // renders null
```
- On mount (unless prefers-reduced-motion) create `new Lenis({ lerp: 0.1, smoothWheel: true })` from "lenis", drive it with a rAF loop, destroy on unmount.
- Intercept clicks on same-page anchors (`a[href^="#"]`, via a document click listener with event delegation): preventDefault, `lenis.scrollTo(target, { offset: -72 })`, and update the URL hash with history.replaceState. If reduced motion, do nothing (native behavior).

## E. app/components/review-diff.tsx  (code review sample viewer)

```ts
import type { Review } from "../data";
export type ReviewLabels = { context: string; before: string; after: string; issues: string; why: string; source: string };
export default function ReviewDiff({ review, labels, index }: { review: Review; labels: ReviewLabels; index: number })
```
`Review` = { file, repo, repoUrl, lang, context, before, issues: string[], after, why } (see app/data.ts).
- `<article className="panel overflow-hidden">`. Header row: `#index+1` mono verdict, file name mono semibold, `.tag` with lang, and at right a link `source: repo ↗` (lucide ArrowUpRight, target _blank rel noopener noreferrer) muted→fg on hover.
- Body grid lg:grid-cols-[1fr_1.15fr] gap-8 p-6:
  - Left: context label (small muted sans, sentence case) + context paragraph; issues label + list where each issue has a reject-colored `!` mono marker.
  - Right: a two-tab switch (role="tablist", buttons role="tab" aria-selected, arrow-key navigation between the two tabs) "before" / "after". The active tab has an underline indicator that slides between tabs with motion `layoutId` (make layoutId unique per review index). Code panel below uses `.code-block`, fixed min-height `min-h-[17rem]`; content crossfades with AnimatePresence mode="wait" (opacity + 4px x). Before-tab accent = reject, after-tab accent = trace. Default tab: "before".
  - Under the code, the `why` box: border-verdict/30 bg-verdict/[0.06] rounded-md p-4, label in verdict small, text fg/90 text-sm.
- Reduced motion: no slide/crossfade (instant swap).
