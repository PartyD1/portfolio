"use client";

import { useEffect, useRef, useState } from "react";

type State = "idle" | "pending" | "in";

/**
 * Rises an element into view once, the first time it scrolls in.
 * Server-rendered visible; only elements below the fold at load get hidden,
 * so nothing ever flashes and reduced-motion users see everything at once.
 */
export default function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
  ...rest
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  /**
   * The element to render. Defaults to a div; the timeline passes "li" so the
   * items stay direct children of their <ol> and assistive tech still hears
   * the sequence the section is built around.
   */
  as?: "div" | "li";
} & React.HTMLAttributes<HTMLElement>) {
  const ref = useRef<HTMLElement>(null);
  const [state, setState] = useState<State>("idle");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    setState("pending");
    // A phone's rounded corner and browser toolbar hide the very edge of the
    // viewport, so an element there rises once it is 8% in rather than at
    // the geometric edge. One read, no listener: a rotation changes the
    // number by 8% of very little.
    const phone = window.matchMedia("(max-width: 760px)").matches;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState("in");
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: phone ? "0px 0px -8% 0px" : "0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      {...rest}
      ref={ref as React.RefObject<HTMLDivElement & HTMLLIElement>}
      className={className}
      data-reveal={state === "idle" ? undefined : state}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
