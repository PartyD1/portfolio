"use client";

import { useEffect, useRef, useState } from "react";

const R = 15;
const C = 2 * Math.PI * R;

/**
 * The reference's circled dot, made functional: the ring fills with scroll
 * progress and the whole thing is a back-to-top control.
 *
 * Progress is read on a passive scroll listener inside rAF — cheap, and it
 * degrades to a plain button under reduced motion (no ring animation).
 */
export default function ScrollRing() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const frame = useRef(0);

  useEffect(() => {
    const read = () => {
      frame.current = 0;
      const max =
        document.documentElement.scrollHeight - window.innerHeight || 1;
      const p = Math.min(1, Math.max(0, window.scrollY / max));
      setProgress(p);
      setVisible(window.scrollY > window.innerHeight * 0.4);
    };
    const onScroll = () => {
      if (frame.current) return;
      frame.current = requestAnimationFrame(read);
    };
    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, []);

  return (
    <button
      type="button"
      className="scroll-ring"
      data-visible={visible}
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "auto"
            : "smooth",
        })
      }
    >
      <svg viewBox="0 0 36 36" aria-hidden="true">
        <circle className="scroll-ring__track" cx="18" cy="18" r={R} />
        <circle
          className="scroll-ring__fill"
          cx="18"
          cy="18"
          r={R}
          strokeDasharray={C}
          strokeDashoffset={C * (1 - progress)}
        />
        <circle className="scroll-ring__dot" cx="18" cy="18" r="3" />
      </svg>
    </button>
  );
}
