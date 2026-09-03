"use client";

import { useEffect, useRef } from "react";

/*
 * Spring constants. omega = sqrt(K) ~ 12.6 rad/s, zeta = D / (2 sqrt(K)) ~ 0.87:
 * just under critical, so the light trails the pointer and settles in roughly
 * a third of a second with no visible overshoot. Tuned by eye, like every
 * spring; the numbers are here so the next person can retune rather than guess.
 */
const K = 160;
const D = 22;
/* Below this the spring is at rest and the loop stops. */
const REST_DIST = 0.15;
const REST_SPEED = 2;

/**
 * A lit patch of ground that follows the pointer on a spring.
 *
 * Decorative, and therefore a spring: a glow tied one-to-one to the cursor
 * position reads as a cursor, not a light. It renders nothing that can be read
 * and intercepts nothing (the wash is pointer-events: none).
 *
 * It exists only for a fine pointer with hover, and not under reduced motion —
 * it is movement with no job other than looking good, which is exactly what
 * that preference asks to remove. Touch devices never see it.
 *
 * The loop runs only while the spring is moving. At pointer rest it is not a
 * running animation, which is what keeps the ambient budget (three families at
 * rest) honest.
 */
export default function Spotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduce.matches) return;

    let x = 0;
    let y = 0;
    let vx = 0;
    let vy = 0;
    let tx = 0;
    let ty = 0;
    let frame = 0;
    let last = 0;
    let seeded = false;

    const paint = () => {
      // transform written directly on the one element, never a CSS variable
      // on an ancestor: a variable recalculates every descendant's style.
      el.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
    };

    const step = (now: number) => {
      // Clamp dt so a tab that was hidden does not fire the spring across the
      // whole screen in one frame when it wakes.
      const dt = Math.min(0.032, (now - last) / 1000 || 0.016);
      last = now;
      // Semi-implicit Euler: stable at these constants and 60-120Hz.
      vx += (-K * (x - tx) - D * vx) * dt;
      vy += (-K * (y - ty) - D * vy) * dt;
      x += vx * dt;
      y += vy * dt;

      const rest =
        Math.abs(x - tx) < REST_DIST &&
        Math.abs(y - ty) < REST_DIST &&
        Math.abs(vx) < REST_SPEED &&
        Math.abs(vy) < REST_SPEED;
      if (rest) {
        x = tx;
        y = ty;
        vx = 0;
        vy = 0;
        paint();
        frame = 0;
        return;
      }
      paint();
      frame = requestAnimationFrame(step);
    };

    const show = () => {
      if (!el.hasAttribute("data-on")) el.setAttribute("data-on", "");
    };
    const hide = () => {
      el.removeAttribute("data-on");
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      tx = e.clientX;
      ty = e.clientY;
      if (!seeded) {
        // First sighting: appear where the pointer is rather than flying in
        // from the corner.
        seeded = true;
        x = tx;
        y = ty;
        paint();
      }
      show();
      if (!frame) {
        last = performance.now();
        frame = requestAnimationFrame(step);
      }
    };

    // pointerout with no relatedTarget is the pointer leaving the window.
    const onOut = (e: PointerEvent) => {
      if (e.pointerType === "mouse" && e.relatedTarget === null) hide();
    };
    const onVisibility = () => {
      if (document.hidden) hide();
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerout", onOut, { passive: true });
    window.addEventListener("blur", hide);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerout", onOut);
      window.removeEventListener("blur", hide);
      document.removeEventListener("visibilitychange", onVisibility);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return <div ref={ref} className="wash__spot" aria-hidden="true" />;
}
