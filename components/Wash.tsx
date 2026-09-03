import Blob from "@/components/Blob";
import Spotlight from "@/components/Spotlight";

/**
 * The ground: four iridescent blobs drifting behind everything, the pointer
 * spotlight over them, plus the film grain tile over all of it. Fixed,
 * aria-hidden, and inert — it never intercepts a pointer.
 */
export default function Wash() {
  return (
    <div className="wash" aria-hidden="true">
      <Blob name="a" className="wash__blob wash__blob--a" />
      <Blob name="b" className="wash__blob wash__blob--b" />
      <Blob name="c" className="wash__blob wash__blob--c" />
      <Blob name="d" className="wash__blob wash__blob--d" />
      <Spotlight />
      <div className="grain" />
    </div>
  );
}
