"use client";

import { Moon, Sun } from "lucide-react";

export default function ThemeToggle({ label }: { label: string }) {
  function toggle() {
    const isDark = document.documentElement.classList.toggle("dark");
    try {
      localStorage.setItem("theme", isDark ? "dark" : "light");
    } catch {}
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      className="grid h-9 w-9 place-items-center rounded-full border border-line text-muted transition hover:text-fg"
    >
      <Sun className="hidden h-4 w-4 dark:block" />
      <Moon className="h-4 w-4 dark:hidden" />
    </button>
  );
}
