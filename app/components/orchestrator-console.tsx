"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

export type ConsoleTask = {
  agent: string;
  task: string;
  log: string[];
  verdict: "approved" | "returned";
  note: string;
};

export type ConsoleCopy = {
  ariaLabel: string;
  title: string;
  agentsLabel: string;
  reviewLabel: string;
  approved: string;
  returned: string;
  idle: string;
  working: string;
  tasks: ConsoleTask[];
};

type NewLine =
  | { kind: "dispatch"; agent: string; task: string }
  | { kind: "log"; text: string }
  | { kind: "review"; verdict: ConsoleTask["verdict"]; note: string };

type Line = NewLine & { id: number };

const MAX_LINES = 14;
const FADE_AFTER = 6;
const TYPE_MS = 18;

function AnimatedNumber({ value }: { value: number }) {
  return (
    <AnimatePresence mode="popLayout" initial={false}>
      <motion.span
        key={value}
        initial={{ y: 8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -8, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="inline-block"
      >
        {value}
      </motion.span>
    </AnimatePresence>
  );
}

export default function OrchestratorConsole({ copy }: { copy: ConsoleCopy }) {
  const reduce = useReducedMotion();
  const figRef = useRef<HTMLElement>(null);
  const [lines, setLines] = useState<Line[]>([]);
  const [typing, setTyping] = useState<string | null>(null);
  const [approved, setApproved] = useState(0);
  const [returned, setReturned] = useState(0);
  const [workingAgent, setWorkingAgent] = useState<string | null>(null);
  const [lastAgent, setLastAgent] = useState<string | null>(null);

  const agents = useMemo(
    () => Array.from(new Set(copy.tasks.map((t) => t.agent))),
    [copy.tasks],
  );

  // Static fallback: first 3 tasks fully rendered, totals in the counter.
  const staticLines = useMemo<Line[]>(() => {
    const out: Line[] = [];
    let id = 0;
    for (const t of copy.tasks.slice(0, 3)) {
      out.push({ id: ++id, kind: "dispatch", agent: t.agent, task: t.task });
      for (const text of t.log) out.push({ id: ++id, kind: "log", text });
      out.push({ id: ++id, kind: "review", verdict: t.verdict, note: t.note });
    }
    return out;
  }, [copy.tasks]);
  const staticApproved = useMemo(
    () => copy.tasks.filter((t) => t.verdict === "approved").length,
    [copy.tasks],
  );
  const staticReturned = useMemo(
    () => copy.tasks.filter((t) => t.verdict === "returned").length,
    [copy.tasks],
  );

  useEffect(() => {
    if (reduce || copy.tasks.length === 0) return;
    const tasks = copy.tasks;
    let mounted = true;
    let paused = false;
    let id = 0;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const sleep = (ms: number) =>
      new Promise<void>((resolve) => {
        if (!mounted) return resolve();
        const t = setTimeout(resolve, ms);
        timers.push(t);
      });
    const waitWhilePaused = async () => {
      while (mounted && (paused || document.hidden)) await sleep(200);
    };
    const push = (line: NewLine) => {
      if (!mounted) return;
      const entry = { ...line, id: ++id } as Line;
      setLines((prev) => [...prev, entry].slice(-MAX_LINES));
    };

    const run = async () => {
      let i = 0;
      while (mounted) {
        const task = tasks[i % tasks.length];
        await waitWhilePaused();
        if (!mounted) break;
        setWorkingAgent(task.agent);
        push({ kind: "dispatch", agent: task.agent, task: task.task });
        await sleep(600);
        for (const logLine of task.log) {
          await waitWhilePaused();
          if (!mounted) break;
          let cur = "";
          setTyping("");
          for (const ch of logLine) {
            await waitWhilePaused();
            if (!mounted) break;
            cur += ch;
            setTyping(cur);
            await sleep(TYPE_MS);
          }
          if (!mounted) break;
          push({ kind: "log", text: logLine });
          setTyping(null);
          await sleep(150);
        }
        if (!mounted) break;
        await waitWhilePaused();
        if (!mounted) break;
        await sleep(500);
        push({ kind: "review", verdict: task.verdict, note: task.note });
        if (task.verdict === "approved") setApproved((n) => n + 1);
        else setReturned((n) => n + 1);
        setLastAgent(task.agent);
        setWorkingAgent(null);
        await sleep(900);
        i += 1;
      }
    };
    run();

    const el = figRef.current;
    const io =
      typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver(([entry]) => {
            paused = !entry.isIntersecting;
          })
        : null;
    if (el && io) io.observe(el);

    return () => {
      mounted = false;
      timers.forEach(clearTimeout);
      io?.disconnect();
    };
  }, [reduce, copy.tasks]);

  const reviewText = (l: Extract<Line, { kind: "review" }>) =>
    l.verdict === "approved"
      ? `  \u2696 ${copy.reviewLabel}: ${copy.approved} \u2014 ${l.note}`
      : `  \u21BA ${copy.reviewLabel}: ${copy.returned} \u2014 ${l.note}`;

  const renderLine = (l: Line) => {
    if (l.kind === "dispatch") {
      return (
        <span>
          <span className="text-fg">&#8250; dispatch </span>
          <span className="text-trace">{l.agent}</span>
          <span className="text-fg"> — {l.task}</span>
        </span>
      );
    }
    if (l.kind === "log") {
      return (
        <span className="text-trace/80">
          <span className="text-muted/60">{"  \u2502 "}</span>
          {l.text}
        </span>
      );
    }
    return (
      <span className={l.verdict === "approved" ? "text-verdict" : "text-reject"}>
        {reviewText(l)}
      </span>
    );
  };

  const visible = reduce ? staticLines : lines;
  const shownApproved = reduce ? staticApproved : approved;
  const shownReturned = reduce ? staticReturned : returned;

  return (
    <figure
      ref={figRef}
      aria-label={copy.ariaLabel}
      className="panel flex h-[27rem] flex-col overflow-hidden"
      style={{ boxShadow: "0 0 80px -30px rgb(var(--trace) / .35)" }}
    >
      <div className="flex items-center gap-2 border-b border-line px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-line" />
        <span className="h-2.5 w-2.5 rounded-full bg-line" />
        <span className="h-2.5 w-2.5 rounded-full bg-line" />
        <span className="ml-2 flex-1 truncate font-mono text-xs text-muted">
          {copy.title}
        </span>
        <span className="flex items-center gap-3 font-mono text-xs">
          <span className="text-verdict">
            {"\u2713 "}
            {reduce ? shownApproved : <AnimatedNumber value={shownApproved} />}
          </span>
          <span className="text-reject">
            {"\u21BA "}
            {reduce ? shownReturned : <AnimatedNumber value={shownReturned} />}
          </span>
        </span>
      </div>

      <div aria-hidden="true" className="grid min-h-0 flex-1 sm:grid-cols-[11.5rem_1fr]">
        <div className="hidden min-h-0 flex-col gap-1 overflow-hidden border-r border-line/60 p-4 sm:flex">
          <p className="mb-2 text-xs text-muted">{copy.agentsLabel}</p>
          {agents.map((agent) => {
            const isWorking = !reduce && agent === workingAgent;
            const isLast = agent === lastAgent && !isWorking;
            return (
              <div key={agent} className="flex items-center gap-2 py-1">
                <span className="relative flex h-2 w-2 shrink-0">
                  {isWorking && (
                    <motion.span
                      aria-hidden="true"
                      className="absolute inline-flex h-full w-full rounded-full bg-trace"
                      animate={{ scale: [1, 2.2], opacity: [0.7, 0] }}
                      transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
                    />
                  )}
                  <span
                    className={`relative inline-flex h-2 w-2 rounded-full ${
                      isWorking ? "bg-trace" : isLast ? "bg-verdict" : "bg-line"
                    }`}
                  />
                </span>
                <span className="truncate font-mono text-[12px] text-fg/90">{agent}</span>
                <span className="ml-auto text-[11px] text-muted">
                  {isWorking ? copy.working : copy.idle}
                </span>
              </div>
            );
          })}
        </div>

        <div className="flex min-h-0 flex-col justify-end overflow-hidden p-4 font-mono text-[12.5px] leading-relaxed">
          {visible.map((l, idx) => {
            const dimmed = idx < visible.length - FADE_AFTER;
            if (reduce) {
              return (
                <div key={l.id} className={dimmed ? "opacity-[0.45]" : undefined}>
                  {renderLine(l)}
                </div>
              );
            }
            return (
              <motion.div
                key={l.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: dimmed ? 0.45 : 1, y: 0 }}
                transition={{ duration: 0.25 }}
              >
                {renderLine(l)}
              </motion.div>
            );
          })}
          {!reduce && typing !== null && (
            <div className="text-trace/80">
              <span className="text-muted/60">{"  \u2502 "}</span>
              {typing}
              <span className="caret ml-1 inline-block h-[1em] w-[0.55em] translate-y-[0.15em] bg-trace/80" />
            </div>
          )}
        </div>
      </div>

      <ul className="sr-only">
        {copy.tasks.map((t, i) => (
          <li key={i}>
            {`${t.agent}: ${t.task} — ${t.verdict === "approved" ? copy.approved : copy.returned}, ${t.note}`}
          </li>
        ))}
      </ul>
    </figure>
  );
}
