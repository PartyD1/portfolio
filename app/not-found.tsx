import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "@/components/Icon";

export const metadata: Metadata = {
  title: "Not found · Parth Doshi",
};

/**
 * The one route a visitor reaches by accident, in the same world as the rest.
 * A stale link to a renamed case study should land on the work, not on a
 * black-on-white default.
 */
export default function NotFound() {
  return (
    <article className="case">
      <header className="case__header">
        <div className="case__headline">
          <Link className="case__back" href="/#work">
            <ArrowLeft />
            back to the work
          </Link>
          <h1 className="case__title">Nothing here</h1>
          <p className="case__tagline">
            That page does not exist, or it moved. The work is one step back.
          </p>
        </div>
      </header>
    </article>
  );
}
