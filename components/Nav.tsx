"use client";

import { useEffect, useState } from "react";

const items = [
  { id: "work", label: "Work", key: "1" },
  { id: "about", label: "About", key: "2" },
  { id: "contact", label: "Contact", key: "3" },
] as const;

export default function Nav() {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const visible = new Set<string>();
    const sections = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => el !== null);

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.add(e.target.id);
          else visible.delete(e.target.id);
        }
        const next = items.find((i) => visible.has(i.id))?.id ?? null;
        setActive(next);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0 },
    );
    sections.forEach((s) => io.observe(s));

    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target as HTMLElement | null;
      if (
        t &&
        (t.tagName === "INPUT" ||
          t.tagName === "TEXTAREA" ||
          t.isContentEditable)
      )
        return;
      const item = items.find((i) => i.key === e.key);
      if (!item) return;
      document
        .getElementById(item.id)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    window.addEventListener("keydown", onKey);

    return () => {
      io.disconnect();
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <nav className="nav" aria-label="Sections">
      {items.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className="nav__link"
          aria-current={active === item.id ? "true" : undefined}
        >
          {item.label}
          <span className="nav__key" aria-hidden="true">
            {item.key}
          </span>
        </a>
      ))}
    </nav>
  );
}
