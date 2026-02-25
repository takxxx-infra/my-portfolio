"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "portfolio-theme";

type Theme = "light" | "dark";

function applyTheme(theme: Theme): void {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
}

export function ThemeToggle(): JSX.Element {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const fallback = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    const initial = stored === "dark" || stored === "light" ? stored : fallback;

    setTheme(initial);
    applyTheme(initial);
    setMounted(true);
  }, []);

  const onToggle = (): void => {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    applyTheme(nextTheme);
    window.localStorage.setItem(STORAGE_KEY, nextTheme);
  };

  if (!mounted) {
    return <div className="h-10 w-10 rounded-full border border-[var(--line-soft)] bg-[var(--surface-inset)]" />;
  }

  return (
    <button
      type="button"
      onClick={onToggle}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line-soft)] bg-[var(--surface-inset)] text-[var(--text-secondary)] transition hover:-translate-y-0.5 hover:border-[var(--line-neon)] hover:text-[var(--text-primary)]"
      aria-label="テーマを切り替える"
    >
      <span className="text-base leading-none">{theme === "dark" ? "☀" : "◐"}</span>
    </button>
  );
}
