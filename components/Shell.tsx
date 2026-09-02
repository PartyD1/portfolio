"use client";

import { useEffect, useState } from "react";
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
import { links } from "@/data/projects";

const items = [
  { id: "work", label: "Work", key: "1" },
  { id: "about", label: "About", key: "2" },
  { id: "contact", label: "Contact", key: "3" },
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

  // The 1/2/3 shortcuts survive the nav's retirement.
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
      document
        .getElementById(item.id)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

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
                  href={`#${item.id}`}
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
