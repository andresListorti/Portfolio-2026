"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

type HireMenuProps = {
  label: string;
  options: { label: string; href: string }[];
  className?: string;
  align?: "left" | "right";
};

// "Hire me" button that lets the visitor pick the freelance platform.
export default function HireMenu({ label, options, className = "", align = "left" }: HireMenuProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((o) => !o)}
        className={`btn-verdict ${className}`}
      >
        {label}
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} aria-hidden />
      </button>
      {open && (
        <ul
          id={menuId}
          role="menu"
          className={`absolute top-full z-50 mt-2 min-w-[11rem] overflow-hidden rounded-md border border-line bg-ink/95 py-1 shadow-xl backdrop-blur-xl ${align === "right" ? "right-0" : "left-0"}`}
        >
          {options.map((o) => (
            <li key={o.href} role="none">
              <a
                role="menuitem"
                href={o.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="block whitespace-nowrap px-4 py-2.5 text-sm text-fg/85 transition hover:bg-line/40 hover:text-fg"
              >
                {o.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
