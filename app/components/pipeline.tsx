"use client";

import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";

export type PipelineStep = {
  name: string;
  body: string;
  detail: string[];
};

export type PipelineCopy = {
  steps: PipelineStep[];
  progressLabel: string;
};

const pad = (n: number) => String(n).padStart(2, "0");

function StepList({ copy }: { copy: PipelineCopy }) {
  return (
    <ol className="space-y-10">
      {copy.steps.map((step, i) => (
        <li key={i}>
          <span className="font-mono text-xs text-verdict">{pad(i + 1)}</span>
          <h3 className="mt-1 text-xl font-semibold tracking-tight">{step.name}</h3>
          <p className="mt-1 text-muted">{step.body}</p>
          <ul className="mt-2 space-y-1">
            {step.detail.map((d, j) => (
              <li key={j} className="font-mono text-xs text-trace/80">
                &#8250; {d}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
}

export default function Pipeline({ copy }: { copy: PipelineCopy }) {
  const reduce = useReducedMotion();
  const outerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ["start start", "end end"],
  });
  const [active, setActive] = useState(0);
  const total = copy.steps.length;

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (total === 0) return;
    setActive(Math.min(total - 1, Math.max(0, Math.floor(v * total))));
  });

  if (reduce || total === 0)
    return (
      <div className="mx-auto max-w-page px-4 sm:px-6">
        <StepList copy={copy} />
      </div>
    );

  const current = copy.steps[active];

  return (
    <>
      <div
        ref={outerRef}
        className="relative hidden lg:block"
        style={{ height: `${total * 75}vh` }}
      >
        <div className="sticky top-0 flex h-screen items-center">
          <div className="mx-auto grid w-full max-w-page grid-cols-[1fr_1.2fr] gap-16 px-6">
            <div className="self-center">
              <div className="relative">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={active}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="block text-[11rem] font-semibold leading-none text-fg/10"
                  >
                    {pad(active + 1)}
                  </motion.span>
                </AnimatePresence>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.h3
                    key={active}
                    initial={{ y: 24, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -24, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute bottom-3 left-1 text-5xl font-semibold tracking-tight"
                  >
                    {current.name}
                  </motion.h3>
                </AnimatePresence>
              </div>
              <p className="mt-4 font-mono text-xs text-muted">
                {copy.progressLabel} {active + 1} / {total}
              </p>
            </div>

            <div className="relative pl-8">
              <div className="absolute bottom-0 left-0 top-0 w-[2px] bg-line">
                <motion.div
                  className="absolute inset-0 origin-top bg-verdict"
                  style={{ scaleY: scrollYProgress }}
                />
              </div>
              {copy.steps.map((step, i) => {
                const isActive = i === active;
                return (
                  <div
                    key={i}
                    className={`py-5 transition-opacity duration-300 ${
                      isActive ? "opacity-100" : "opacity-40"
                    }`}
                  >
                    <h4
                      className={`text-xl font-semibold tracking-tight ${
                        isActive ? "text-fg" : "text-fg/70"
                      }`}
                    >
                      {step.name}
                    </h4>
                    <p className="mt-1 text-muted">{step.body}</p>
                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          key="detail"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="space-y-1 pt-2">
                            {step.detail.map((d, j) => (
                              <p key={j} className="font-mono text-[12px] text-trace/80">
                                &#8250; {d}
                              </p>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-page px-4 sm:px-6 lg:hidden">
        <StepList copy={copy} />
      </div>
    </>
  );
}
