"use client";
import { useEffect, useState } from "react";

const KEY = "theme";

/** light by default; dark only after the reader picks it here (stored in localStorage) */
export default function ThemeToggle({ className = "" }) {
  const [theme, setTheme] = useState("light");

  useEffect(() => { setTheme(document.documentElement.dataset.theme === "dark" ? "dark" : "light"); }, []);

  const flip = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    if (next === "dark") document.documentElement.dataset.theme = "dark";
    else delete document.documentElement.dataset.theme;
    try { localStorage.setItem(KEY, next); } catch { /* private mode: the choice just isn't remembered */ }
  };

  return (
    <button type="button" onClick={flip} aria-pressed={theme === "dark"} aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      className={`inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border border-line px-3 py-1.5 text-sm text-muted-foreground hover:border-fg hover:text-fg ${className}`}>
      <span aria-hidden className="inline-block size-3 rounded-full border border-fg" style={{ background: theme === "dark" ? "#F2F3F5" : "#17191D" }} />
      {theme === "dark" ? "Light" : "Dark"}
    </button>
  );
}
