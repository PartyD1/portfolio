"use client";

import { useEffect, useRef } from "react";

/**
 * Keeps the orbit an orbit on a phone.
 *
 * The diagram holds its size and scrolls inside this container rather than
 * collapsing into stacked runs — a list is the one shape this section exists
 * to avoid. `safe center` aligns to the start once the content overflows, so
 * the first view is centred here instead, and the diagram is never cut off
 * from the middle out.
 */
export default function OrbitScroller({
  children,
}: {
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const centre = () => {
      const overflow = el.scrollWidth - el.clientWidth;
      if (overflow > 0) el.scrollLeft = overflow / 2;
    };
    centre();
    window.addEventListener("resize", centre, { passive: true });
    return () => window.removeEventListener("resize", centre);
  }, []);

  return (
    <div className="orbit-scroll" ref={ref}>
      {children}
    </div>
  );
}
