"use client";

import { useEffect, useRef, useState } from "react";
import type {
  PDFDocumentLoadingTask,
  PDFPageProxy,
  PageViewport,
  RenderTask,
} from "pdfjs-dist/legacy/build/pdf.mjs";

type Sheet = {
  page: PDFPageProxy;
  base: PageViewport;
  el: HTMLDivElement;
  canvas: HTMLCanvasElement;
  task?: RenderTask;
  drawnAt?: number;
};

/**
 * The résumé, drawn from the real PDF rather than retyped, so the page and
 * the download can never disagree: replacing public/resume.pdf updates both.
 *
 * Each page is three layers on one sheet of paper: the canvas (what you see,
 * aria-hidden), pdf.js's transparent text layer on top (so the text selects,
 * copies, finds with Cmd-F and reads to a screen reader), and the PDF's own
 * link annotations as real anchors (so the email, GitHub and project links
 * still work). The two DOM layers are laid out in percentages against
 * --total-scale-factor, so a resize only repaints the canvas.
 *
 * Why not an <iframe> of the PDF: iOS Safari renders page one as a flat image
 * that does not scroll, and the browser's PDF toolbar is a foreign object on
 * this site. pdf.js is loaded on this route only, after first paint.
 */
export default function ResumeDocument({
  src,
  label,
}: {
  src: string;
  label: string;
}) {
  const host = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    const root = host.current;
    if (!root) return;

    let cancelled = false;
    let loading: PDFDocumentLoadingTask | undefined;
    let observer: ResizeObserver | undefined;
    let frame = 0;
    const sheets: Sheet[] = [];

    /*
     * Canvas pixels = CSS width × device pixel ratio, and twice that again on
     * a phone: a Letter page at 350px wide sets 10pt type at about 6px, so a
     * reader WILL pinch, and the zoomed page should still be sharp. Capped so
     * an extreme DPR cannot ask for a canvas iOS refuses to allocate.
     */
    const draw = () => {
      for (const s of sheets) {
        const width = s.el.clientWidth;
        if (!width || width === s.drawnAt) continue;
        s.drawnAt = width;

        const scale = width / s.base.width;
        s.el.style.setProperty("--total-scale-factor", String(scale));

        const oversample = width < 600 ? 2 : 1;
        const ratio = Math.min((window.devicePixelRatio || 1) * oversample, 4);
        const viewport = s.page.getViewport({ scale: scale * ratio });

        s.task?.cancel();
        s.canvas.width = Math.floor(viewport.width);
        s.canvas.height = Math.floor(viewport.height);
        s.task = s.page.render({ canvas: s.canvas, viewport });
        s.task.promise.then(
          () => {
            if (!cancelled) setState("ready");
          },
          () => {
            // Cancelled by a newer draw. That draw owns the canvas now.
          },
        );
      }
    };

    (async () => {
      try {
        const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs");
        pdfjs.GlobalWorkerOptions.workerSrc = new URL(
          "pdfjs-dist/legacy/build/pdf.worker.min.mjs",
          import.meta.url,
        ).toString();

        loading = pdfjs.getDocument({ url: src });
        const doc = await loading.promise;

        for (let n = 1; n <= doc.numPages; n++) {
          const page = await doc.getPage(n);
          if (cancelled) return;
          const base = page.getViewport({ scale: 1 });

          const el = document.createElement("div");
          el.className = "resume__page";
          el.style.aspectRatio = `${base.width} / ${base.height}`;

          const canvas = document.createElement("canvas");
          canvas.setAttribute("aria-hidden", "true");

          const text = document.createElement("div");
          text.className = "textLayer";

          const links = document.createElement("div");
          links.className = "resume__links";

          el.append(canvas, text, links);
          root.append(el);

          await new pdfjs.TextLayer({
            textContentSource: page.streamTextContent(),
            container: text,
            viewport: base,
          }).render();

          for (const a of await page.getAnnotations()) {
            if (a.subtype !== "Link" || typeof a.url !== "string") continue;
            // PDF space is y-up; the viewport flips it. Two corners, then
            // sorted, since the flip swaps which one is on top.
            const [ax, ay] = base.convertToViewportPoint(a.rect[0], a.rect[1]);
            const [bx, by] = base.convertToViewportPoint(a.rect[2], a.rect[3]);
            const [x1, x2] = [Math.min(ax, bx), Math.max(ax, bx)];
            const [y1, y2] = [Math.min(ay, by), Math.max(ay, by)];
            const link = document.createElement("a");
            link.href = a.url;
            // The résumé links to this site too; those stay in the tab.
            const external =
              !a.url.startsWith("mailto:") &&
              new URL(a.url, location.href).host !== location.host;
            if (external) {
              link.target = "_blank";
              link.rel = "noreferrer";
            }
            // The text layer already reads the words under the link; the
            // name says where it goes.
            link.setAttribute(
              "aria-label",
              a.url.replace(/^mailto:|^https?:\/\/(www\.)?/, "").replace(/\/$/, ""),
            );
            link.style.left = `${(x1 / base.width) * 100}%`;
            link.style.top = `${(y1 / base.height) * 100}%`;
            link.style.width = `${((x2 - x1) / base.width) * 100}%`;
            link.style.height = `${((y2 - y1) / base.height) * 100}%`;
            links.append(link);
          }

          sheets.push({ page, base, el, canvas });
        }
        if (cancelled) return;

        draw();
        observer = new ResizeObserver(() => {
          cancelAnimationFrame(frame);
          frame = requestAnimationFrame(draw);
        });
        observer.observe(root);
      } catch {
        if (!cancelled) setState("error");
      }
    })();

    return () => {
      cancelled = true;
      observer?.disconnect();
      cancelAnimationFrame(frame);
      for (const s of sheets) s.task?.cancel();
      loading?.destroy();
      root.replaceChildren();
    };
  }, [src]);

  return (
    <section className="resume__doc" aria-label={label} data-state={state}>
      <div ref={host} className="resume__pages" />
      {state === "error" && (
        <p className="resume__fallback">
          The résumé did not load here.{" "}
          <a href={src}>Open the PDF instead.</a>
        </p>
      )}
      <noscript>
        <p className="resume__fallback">
          <a href={src}>Open the résumé as a PDF.</a>
        </p>
      </noscript>
    </section>
  );
}
