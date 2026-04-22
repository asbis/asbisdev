"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="h-7 w-7" />;

  return (
    <button
      aria-label="Toggle theme"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="flex h-7 w-7 items-center justify-center rounded-full border border-[color:var(--hairline)] text-[color:var(--ink)] transition-colors hover:text-[color:var(--accent)]"
    >
      <span className="text-xs">{theme === "dark" ? "☾" : "☀"}</span>
    </button>
  );
}
