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
  { id: "stack", label: "Stack", key: "2" },
  { id: "about", label: "About", key: "3" },
  { id: "contact", label: "Contact", key: "4" },
] as const;

/** The reference's dot grid, drawn rather than set as a glyph. */
function DotGrid() {
  const c = [4, 12, 20];
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {c.map((y) => c.map((x) => <circle key={`${x}-${y}`} cx={x} cy={y} r="1.7" />))}
    </svg>
  );
}

export default function Shell() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  // The numeric shortcuts survive the nav's retirement — and now survive
  // leaving the homepage too.
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
        // Keyboard-initiated actions are repeated often and never animate —
        // at any motion preference. The house rule, extended to route jumps.
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
      <Monogram className="shell__mark" />

      <div className="shell__tools">
        <ThemeToggle />
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="shell__menu" aria-label="Open menu">
            <DotGrid />
          </SheetTrigger>
          <SheetContent side="right" className="menu">
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
      </div>
    </header>
  );
}
