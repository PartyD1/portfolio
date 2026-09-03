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
/** One frame. Identical markup whether it holds a screenshot or the mark. */
function Frame({
  item,
  slug,
  priority,
}: {
  item?: ProjectMedia;
  slug: string;
  priority?: boolean;
}) {
  return (
    <figure className="case__media">
      <div className="case__media__inner">
        {item?.src ? (
          <Image
            src={item.src}
            alt={item.alt}
            width={item.width}
            height={item.height}
            className="case__media__img"
            priority={priority}
          />
        ) : (
          <Artifact slug={slug} className="case__media__mark" />
        )}
      </div>
    </figure>
  );
}

/**
 * The route's ONE pin allowance, and it is spent here — on the media band,
 * never on Problem & context, What I built & how, or Outcome & impact, which
 * are read, not watched. There are ZERO pins on the homepage, by rule: the
 * hero -> cards -> email path is the conversion path and nothing choreographed
 * may lengthen it.
 *
 * The pin renders only at >= 2 media items and caps at 3 beats; any further
 * media render as a static strip below it. Below two, the single frame and its
 * C9 drift are what ship.
 */
export default function MediaBand({
  slug,
  media,
}: {
  slug: string;
  media: ProjectMedia[];
}) {
  const pinned = media.length >= 2;

  if (!pinned) {
    const first = media[0];
    return (
      <div className="case__band">
        <Frame item={first} slug={slug} priority />
        {first?.caption && (
          <figcaption className="case__media__cap">{first.caption}</figcaption>
        )}
      </div>
    );
  }

  const beats = media.slice(0, 3);
  const rest = media.slice(3);

  return (
    <div className="case__band case__band--pinned">
      {/*
        No focusable element ever goes inside .case__stage. That is what
        licenses a beat's opacity reaching 0 without hiding a control from a
        keyboard user — frames carry captions, never links. It is asserted, not
        assumed.
      */}
      <div className="case__pin" data-beats={beats.length}>
        <div className="case__stage">
          {beats.map((m, i) => (
            <div className="case__beat" key={m.alt + i}>
              <Frame item={m} slug={slug} priority={i === 0} />
              {m.caption && (
                <figcaption className="case__media__cap">{m.caption}</figcaption>
              )}
            </div>
          ))}
        </div>
      </div>

      {rest.length > 0 && (
        <div className="case__strip">
          {rest.map((m, i) => (
            <div key={m.alt + i}>
              <Frame item={m} slug={slug} />
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
