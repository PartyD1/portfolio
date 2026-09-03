"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";

/**
 * The diagram's node list, with the pointer wired to --mx/--my on whichever
 * node is under it (see .flow__node::after). The nodes are the same frosted
 * glass the project cards are, so they take the same specular highlight and
 * the case study reads as one material under the cursor.
 *
 * One listener on the list rather than one per node: the chain can run to
 * half a dozen steps and a diagram does not need six client boundaries.
 * Delegation via closest() keeps it to a single component.
 *
 * Highlight only — no tilt. The connectors between nodes are pseudo-elements
 * aligned to the grid, and rotating a node in 3D would pull its edge off the
 * arrow that points at it.
 *
 * Mouse only, and only where hover is real. The glow is a light rather than a
 * movement, so reduced motion keeps it, exactly as the cards do.
 */
export default function FlowGlow({
  className,
  children,
  ...rest
}: {
  className: string;
  children: ReactNode;
} & React.OlHTMLAttributes<HTMLOListElement>) {
  // Resolved once, on first use, so the render path stays free of matchMedia.
  const fine = useRef<boolean | null>(null);

  const onMove = (e: PointerEvent<HTMLOListElement>) => {
    if (e.pointerType !== "mouse") return;
    if (fine.current === null) {
      fine.current = window.matchMedia(
        "(hover: hover) and (pointer: fine)",
      ).matches;
    }
    if (!fine.current) return;
    const node = (e.target as HTMLElement).closest<HTMLElement>(".flow__node");
    if (!node) return;
    const r = node.getBoundingClientRect();
    const px = ((e.clientX - r.left) / r.width) * 100;
    const py = ((e.clientY - r.top) / r.height) * 100;
    node.style.setProperty("--mx", `${px.toFixed(1)}%`);
    node.style.setProperty("--my", `${py.toFixed(1)}%`);
  };

  return (
    <ol className={className} onPointerMove={onMove} {...rest}>
      {children}
    </ol>
  );
}
