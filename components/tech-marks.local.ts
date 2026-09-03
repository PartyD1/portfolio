/**
 * Marks drawn in this repo for tools Simple Icons does not carry.
 *
 * Same contract as the generated file: a single filled path in currentColor,
 * no brand hex, so the page keeps exactly one accent colour. Each carries its
 * own viewBox because the geometry was traced at the source's native size.
 *
 *  - openclaw: traced from openclaw.ai/favicon.svg (the lobster). Body and
 *    both claws as one silhouette; the eyes are even-odd knockouts so the
 *    face still reads at 20px.
 *  - twilio: the ring-and-four-dots mark, drawn from its geometry.
 */
export type LocalMark = { d: string; viewBox: string; title: string };

export const localMarks: Record<string, LocalMark> = {
  openclaw: {
    viewBox: "0 0 120 120",
    title: "OpenClaw",
    d:
      "M60 10C30 10 15 35 15 55c0 20 15 40 30 45v10h10V100c0 0 5 2 10 0v10h10V100c15-5 30-25 30-45 0-20-15-45-45-45Z" +
      "M20 45C5 40 0 50 5 60c5 10 15 5 20-5 3-7 0-10-5-10Z" +
      "M100 45c15-5 20 5 15 15-5 10-15 5-20-5-3-7 0-10 5-10Z" +
      "M45 29a6 6 0 1 0 0 12 6 6 0 1 0 0-12Z" +
      "M75 29a6 6 0 1 0 0 12 6 6 0 1 0 0-12Z" +
      "M46.5 12.3a1.8 1.8 0 0 0-2.2-2.8c-3.4 1.6-7.6 1-11.7-1.6a1.8 1.8 0 0 0-1.9 3.1c4.9 3.1 10.4 3.9 15.8 1.3Z" +
      "M73.5 12.3a1.8 1.8 0 0 1 2.2-2.8c3.4 1.6 7.6 1 11.7-1.6a1.8 1.8 0 0 1 1.9 3.1c-4.9 3.1-10.4 3.9-15.8 1.3Z",
  },
  twilio: {
    viewBox: "0 0 24 24",
    title: "Twilio",
    d:
      "M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0Zm0 3.2a8.8 8.8 0 1 1 0 17.6 8.8 8.8 0 0 1 0-17.6Z" +
      "M9.05 6.5a2.55 2.55 0 1 0 0 5.1 2.55 2.55 0 0 0 0-5.1Z" +
      "M14.95 6.5a2.55 2.55 0 1 0 0 5.1 2.55 2.55 0 0 0 0-5.1Z" +
      "M9.05 12.4a2.55 2.55 0 1 0 0 5.1 2.55 2.55 0 0 0 0-5.1Z" +
      "M14.95 12.4a2.55 2.55 0 1 0 0 5.1 2.55 2.55 0 0 0 0-5.1Z",
  },
};
