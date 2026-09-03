import Image from "next/image";
import type { ProjectMedia } from "@/data/projects";

/**
 * The media well.
 *
 * OPAQUE, not glass, and that is a named amendment to The Blur-Is-Legibility
 * Rule rather than an oversight. Blur exists to keep TEXT legible over the
 * animated wash; a screenshot has no such job. The opaque well is also the
 * only surface allowed to travel under scroll motion, because a moving
 * backdrop-filter re-samples its backdrop every frame.
 *
 * With no media supplied the band does not render AT ALL. It used to fall
 * back to the project's geometric mark at 520px, which was the first thing a
 * visitor saw on every case study and, in Parth's words, a giant useless icon.
 * Absent, not decorated.
 */
function Frame({ item, priority }: { item: ProjectMedia; priority?: boolean }) {
  const tall = item.height > item.width;
  return (
    <figure
      className="case__media"
      data-tall={tall ? "" : undefined}
      // A landscape frame takes the screenshot's own ratio, so nothing is
      // cropped; a portrait one keeps the 16/10 frame and shows its top.
      style={tall ? undefined : { aspectRatio: `${item.width} / ${item.height}` }}
    >
      <div className="case__media__inner">
        <Image
          src={item.src}
          alt={item.alt}
          width={item.width}
          height={item.height}
          className="case__media__img"
          sizes="(max-width: 760px) 100vw, 1140px"
          priority={priority}
        />
      </div>
    </figure>
  );
}

/**
 * The route's ONE pin allowance, spent here. The pin renders only at >= 2
 * media items and caps at 3 beats; any further media render as a static strip
 * below it. Below two, a single frame with its scroll drift is what ships.
 */
export default function MediaBand({ media }: { media: ProjectMedia[] }) {
  if (media.length === 0) return null;

  if (media.length === 1) {
    const first = media[0];
    return (
      <div className="case__band">
        <Frame item={first} priority />
        {first.caption && (
          <figcaption className="case__media__cap">{first.caption}</figcaption>
        )}
      </div>
    );
  }

  const beats = media.slice(0, 3);
  const rest = media.slice(3);

  return (
    <div className="case__band case__band--pinned">
      {/* No focusable element ever goes inside .case__stage: that is what
          licenses a beat's opacity reaching 0 without hiding a control from a
          keyboard user. Frames carry captions, never links. */}
      <div className="case__pin" data-beats={beats.length}>
        <div className="case__stage">
          {beats.map((m, i) => (
            <div className="case__beat" key={m.src}>
              <Frame item={m} priority={i === 0} />
              {m.caption && (
                <figcaption className="case__media__cap">{m.caption}</figcaption>
              )}
            </div>
          ))}
        </div>
      </div>

      {rest.length > 0 && (
        <div className="case__strip">
          {rest.map((m) => (
            <div key={m.src}>
              <Frame item={m} />
              {m.caption && (
                <figcaption className="case__media__cap">{m.caption}</figcaption>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
