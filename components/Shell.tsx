"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Monogram from "@/components/Monogram";
import ThemeToggle from "@/components/ThemeToggle";
import ResumeLink from "@/components/ResumeLink";
import { links } from "@/data/site";

const items = [
  { id: "work", label: "Work", key: "1" },
  { id: "experience", label: "Experience", key: "2" },
  { id: "about", label: "About", key: "3" },
  { id: "contact", label: "Contact", key: "4" },
] as const;

/** Three short rules: the menu glyph beside the mark. Drawn, not set. */
function Lines() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M3 6h14M3 10h14M3 14h9" />
    </svg>
  );
}

/**
 * The PD mark IS the menu (Parth, 2026-09-02): one big pressable pill at the
 * top left, and the sheet opens from that same edge so it scales in from its
 * trigger rather than from nowhere.
 */
export default function Shell() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  // The numeric shortcuts survive leaving the homepage too.
  useEffect(() => {
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
      setOpen(false);
      // On a case-study route the section does not exist in this document, so
      // the shortcut has to cross routes rather than silently no-op.
      const el = document.getElementById(item.id);
      if (el) {
        // Keyboard-initiated actions are repeated often and never animate,
        // at any motion preference.
        el.scrollIntoView({ behavior: "auto", block: "start" });
      } else {
        router.push(`/#${item.id}`);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [router]);

  return (
    <header className="shell">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger className="shell__mark" aria-label="Open menu">
          <Monogram className="shell__mark-glyph" />
          <span className="shell__mark-lines">
            <Lines />
          </span>
        </SheetTrigger>
        <SheetContent side="left" className="menu">
          <SheetHeader className="sr-only">
            <SheetTitle>Menu</SheetTitle>
            <SheetDescription>Jump to a section of the page.</SheetDescription>
          </SheetHeader>

          <nav className="menu__nav" aria-label="Sections">
            {items.map((item, i) => (
              <a
                key={item.id}
                // Root-relative, so the menu works from a case-study route
                // as well as from the homepage.
                href={`/#${item.id}`}
                className="menu__link"
                style={{ ["--i" as string]: i }}
                onClick={() => setOpen(false)}
              >
                <span>{item.label}</span>
                <span className="menu__key" aria-hidden="true">
                  {item.key}
                </span>
              </a>
            ))}
          </nav>

          <div className="menu__foot">
            <a href={`mailto:${links.email}`}>{links.email}</a>
            <a href={links.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a href={links.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <ResumeLink className="menu__resume" />
          </div>
        </SheetContent>
      </Sheet>

      <div className="shell__tools">
        <ThemeToggle />
      </div>
    </header>
  );
}
