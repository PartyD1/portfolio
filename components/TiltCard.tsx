"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";

/* Peak tilt, in degrees, at the card's edge. Enough to read as a glass tile
 * catching the light; not enough to make the type hard to read. */
const TILT = 4;

/**
 * The card's <article>, with the pointer wired to four custom properties:
 * --mx/--my place the specular highlight (see .card::after), --rx/--ry tilt
 * the card toward the pointer (see .card's composed transform).
 *
 * Only the variables are written here. The motion itself is a CSS transition
 * on .card, retargeted on every move, so it trails the pointer and interrupts
 * cleanly — no rAF, no spring library, nothing on the main thread between
 * events.
 *
 * Mouse only, and only where hover is real: a touch device gets no tilt (the
 * card would tilt under the finger that is trying to press it) and the
 * :active press remains its acknowledgement. Under reduced motion the tilt is
 * dropped and the highlight — a light, not a movement — stays.
 */
export default function TiltCard({
  className,
  children,
}: {
  className: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  // Resolved once, on first use, so the render path stays free of matchMedia.
  const mode = useRef<"off" | "glow" | "tilt" | null>(null);

  const resolve = () => {
    if (mode.current === null) {
      const fine = window.matchMedia("(hover: hover) and (pointer: fine)")
        .matches;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)")
        .matches;
      mode.current = !fine ? "off" : reduce ? "glow" : "tilt";
    }
    return mode.current;
  };

  const onMove = (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse") return;
    const m = resolve();
    if (m === "off") return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty("--mx", `${(px * 100).toFixed(1)}%`);
    el.style.setProperty("--my", `${(py * 100).toFixed(1)}%`);
    if (m === "tilt") {
      // Pointer at the top edge tips the top away (rotateX +), at the right
      // edge tips the right away (rotateY +): the card leans toward the hand.
      el.style.setProperty("--rx", `${((0.5 - py) * 2 * TILT).toFixed(2)}deg`);
      el.style.setProperty("--ry", `${((px - 0.5) * 2 * TILT).toFixed(2)}deg`);
    }
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    // Back to flat through the same transition. --mx/--my are left where they
    // were so the highlight fades out in place rather than jumping to centre.
    el.style.removeProperty("--rx");
    el.style.removeProperty("--ry");
  };

  return (
    <article
      ref={ref}
      className={className}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      {children}
    </article>
  );
}
