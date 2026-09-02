"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

/** Authored to match Icon.tsx: 2.25 stroke, round caps, currentColor. */
function Sun() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="10" cy="10" r="3.6" />
      <path d="M10 1.5v1.8M10 16.7v1.8M3.99 3.99l1.27 1.27M14.74 14.74l1.27 1.27M1.5 10h1.8M16.7 10h1.8M3.99 16.01l1.27-1.27M14.74 5.26l1.27-1.27" />
    </svg>
  );
}

function Moon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M17 12.2A7.6 7.6 0 0 1 7.8 3a7.6 7.6 0 1 0 9.2 9.2Z" />
    </svg>
  );
}

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  // The server cannot know the theme; render the shell, fill in after mount.
  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={
        mounted
          ? `Switch to ${isDark ? "light" : "dark"} theme`
          : "Switch theme"
      }
      aria-pressed={mounted ? isDark : undefined}
    >
      <span className="theme-toggle__icon" data-visible={mounted && !isDark}>
        <Sun />
      </span>
      <span className="theme-toggle__icon" data-visible={isDark}>
        <Moon />
      </span>
    </button>
  );
}
