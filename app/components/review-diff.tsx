"use client";

import { useState, useCallback } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import type { Review } from "../data";
import type { KeyboardEvent } from "react";

export type ReviewLabels = {
  context: string;
  before: string;
  after: string;
  issues: string;
  why: string;
  source: string;
};

export default function ReviewDiff({
  review,
  labels,
  index,
}: {
  review: Review;
  labels: ReviewLabels;
  index: number;
}) {
  const reduced = useReducedMotion();
  const [activeTab, setActiveTab] = useState<"before" | "after">("before");

  const handleKeyDown = useCallback(
    (e: KeyboardEvent, tab: "before" | "after") => {
      if (e.key === "ArrowRight" && tab === "before") {
        e.preventDefault();
        setActiveTab("after");
      } else if (e.key === "ArrowLeft" && tab === "after") {
        e.preventDefault();
        setActiveTab("before");
      }
    },
    []
  );

  return (
    <article className="panel overflow-hidden">
      <header className="flex flex-wrap items-center gap-4 gap-y-2 px-6 py-4 border-b border-line">
        <span className="font-mono text-verdict text-sm">#{index + 1}</span>
        <span className="font-mono font-semibold text-fg min-w-0 break-all">{review.file}</span>
        <span className="tag">{review.lang}</span>
        <a
          href={review.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto flex items-center gap-1.5 text-muted hover:text-fg transition-colors text-sm"
        >
          <span>{labels.source}: {review.repo}</span>
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
        </a>
      </header>

      <div className="grid lg:grid-cols-[1fr_1.15fr] gap-8 p-6">
        <div className="space-y-6">
          <div>
            <p className="text-xs text-muted mb-2">{labels.context}</p>
            <p className="text-fg/90 text-sm leading-relaxed">{review.context}</p>
          </div>

          <div>
            <p className="text-xs text-muted mb-3">{labels.issues}</p>
            <ul className="space-y-2" role="list">
              {review.issues.map((issue, i) => (
                <li key={i} className="flex gap-2 text-sm text-fg/90">
                  <span className="font-mono text-reject" aria-hidden>!</span>
                  <span>{issue}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          <div
            role="tablist"
            className="flex gap-1 bg-panel rounded-md p-1"
            aria-label={`${labels.before} / ${labels.after}`}
          >
            <button
              role="tab"
              aria-selected={activeTab === "before"}
              aria-controls={`review-${index}-before`}
              id={`review-${index}-tab-before`}
              tabIndex={activeTab === "before" ? 0 : -1}
              onClick={() => setActiveTab("before")}
              onKeyDown={(e) => handleKeyDown(e, "before")}
              className={`relative px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === "before"
                  ? "text-reject"
                  : "text-muted hover:text-fg"
              }`}
            >
              {labels.before}
              {activeTab === "before" && (
                <motion.span
                  layoutId={`review-tab-indicator-${index}`}
                  className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-reject"
                  transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </button>
            <button
              role="tab"
              aria-selected={activeTab === "after"}
              aria-controls={`review-${index}-after`}
              id={`review-${index}-tab-after`}
              tabIndex={activeTab === "after" ? 0 : -1}
              onClick={() => setActiveTab("after")}
              onKeyDown={(e) => handleKeyDown(e, "after")}
              className={`relative px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === "after"
                  ? "text-trace"
                  : "text-muted hover:text-fg"
              }`}
            >
              {labels.after}
              {activeTab === "after" && (
                <motion.span
                  layoutId={`review-tab-indicator-${index}`}
                  className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-trace"
                  transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: activeTab === "before" ? -4 : 4 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: activeTab === "before" ? 4 : -4 }}
              transition={reduced ? { duration: 0 } : { duration: 0.15, ease: "easeOut" }}
            >
              <div
                role="tabpanel"
                id={activeTab === "before" ? `review-${index}-before` : `review-${index}-after`}
                aria-labelledby={
                  activeTab === "before"
                    ? `review-${index}-tab-before`
                    : `review-${index}-tab-after`
                }
                className="code-block min-h-[17rem] relative"
              >
                <pre className="m-0 overflow-x-auto"><code className="font-mono text-xs leading-relaxed text-fg/90 whitespace-pre">
                  {activeTab === "before" ? review.before : review.after}
                </code></pre>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="border border-verdict/30 bg-verdict/[0.06] rounded-md p-4">
            <p className="text-xs text-verdict font-medium mb-1">{labels.why}</p>
            <p className="text-fg/90 text-sm leading-relaxed">{review.why}</p>
          </div>
        </div>
      </div>
    </article>
  );
}