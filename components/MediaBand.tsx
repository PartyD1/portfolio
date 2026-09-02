import Image from "next/image";
import Artifact from "@/components/Artifact";
import type { ProjectMedia } from "@/data/projects";

/**
 * The media well.
 *
 * OPAQUE, not glass, and that is a named amendment to The Blur-Is-Legibility
 * Rule rather than an oversight. Blur exists to keep TEXT legible over the
 * animated wash; a screenshot has no such job, so blurring behind it would be
 * finish rather than function. The opaque well is also the only surface allowed
 * to travel under scroll motion — a moving backdrop-filter element re-samples
 * and re-blurs its backdrop every frame, over a blob wash, under a
 * mix-blend-mode grain layer, which is the single worst thing this page could
 * ask a compositor to do.
 *
 * With no media supplied the frame renders the project's authored Artifact mark
 * as its DESIGNED EMPTY STATE — not a soft-shadowed grey rectangle standing in
 * for content. When a screenshot arrives it replaces the mark inside an
 * identical frame, so nothing about the layout or the choreography changes.
 */
export default function MediaBand({
  slug,
  media,
}: {
  slug: string;
  media: ProjectMedia[];
}) {
  const first = media[0];

  return (
    <div className="case__band">
      <figure className="case__media">
        <div className="case__media__inner">
          {first?.src ? (
            <Image
              src={first.src}
              alt={first.alt}
              width={first.width}
              height={first.height}
              className="case__media__img"
              priority
            />
          ) : (
            <Artifact slug={slug} className="case__media__mark" />
          )}
        </div>
      </figure>
      {first?.caption && (
        <figcaption className="case__media__cap">{first.caption}</figcaption>
      )}
    </div>
  );
}
