"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/*
 * A hand-written MIRROR of @keyframes recede in globals.css, for engines that
 * have WAAPI but not `animation-timeline`. Change both together. The blur is
 * read from the element's own --recede-blur so the 761px rule holds here too.
 */
function recedeFrames(el: HTMLElement): Keyframe[] {
  const blur = getComputedStyle(el).getPropertyValue("--recede-blur").trim();
  return [
    { opacity: 1, scale: "1", translate: "0 0", filter: "blur(0px)" },
    {
      opacity: 0,
      scale: "0.9",
      translate: "0 22%",
      filter: `blur(${blur || "0px"})`,
    },
  ];
}

/**
 * Scroll-linked animation for browsers without CSS scroll-driven animations.
 *
 * NOT a polyfill and not a library: it knows exactly one range (`exit`) and
 * one set of keyframes, and it exists so the hero handoff is the same motion
 * everywhere rather than a feature some visitors get. It builds a paused WAAPI
 * animation per `[data-scrub]` element and sets its currentTime from the
 * element's position, on a passive scroll listener inside a single rAF — the
 * same mechanism the scroll ring already uses. WAAPI keeps the interpolation on
 * the compositor; this file only writes a number.
 *
 * Inert where the CSS version runs, under reduced motion, and where WAAPI is
 * missing (the finished state is the default, so those visitors see a still,
 * complete page). Re-runs on route change because the layout outlives the
 * page.
 */
export default function ScrollScrub() {
  const pathname = usePathname();

  useEffect(() => {
    if (
      typeof CSS === "undefined" ||
      CSS.supports("animation-timeline: view()") ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      typeof Element.prototype.animate !== "function"
    ) {
      return;
    }

    const targets = Array.from(
      document.querySelectorAll<HTMLElement>("[data-scrub]"),
    );
    if (targets.length === 0) return;

    const DURATION = 1000;
    const items = targets.map((el) => {
      const end = Number(el.dataset.scrubEnd) || 1;
      const anim = el.animate(recedeFrames(el), {
        duration: DURATION,
        fill: "both",
        easing: "linear",
      });
      anim.pause();
      return { el, anim, end };
    });

    let frame = 0;
    const read = () => {
      frame = 0;
      for (const { el, anim, end } of items) {
        const r = el.getBoundingClientRect();
        // `exit` range: 0 when the top edge meets the viewport top, 1 when the
        // bottom edge does. Scaled by the authored end (exit 85% -> 0.85).
        const p = Math.min(1, Math.max(0, -r.top / r.height / end));
        anim.currentTime = p * DURATION;
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(read);
    };

    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
      for (const { anim } of items) anim.cancel();
    };
  }, [pathname]);

  return null;
}
