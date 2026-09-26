import Link from "next/link";
import { resume } from "@/data/site";
import { ArrowRight } from "@/components/Icon";

/**
 * One flag, two states. Pending is a designed state, not a stopgap: it reads
 * as deliberate, states its own status inline, and is inert to pointer,
 * keyboard and screen reader alike.
 *
 * Ready, it goes to /resume, the résumé hosted inside the site, not to the
 * bare PDF: a link that leaves for a file strands the reader outside the
 * portfolio. So it stays in the same tab, and the arrow is a trailing
 * ArrowRight (on-site) rather than ArrowUpRight (leaves). The PDF is one
 * Download button away on that page.
 */
export default function ResumeLink({
  className = "link-arrow",
  onClick,
}: {
  className?: string;
  /** The menu passes its own close, so the sheet does not stay open over the
   * page it just navigated to. */
  onClick?: () => void;
}) {
  if (!resume.ready) {
    return (
      <span className={`${className} is-pending`} aria-disabled="true">
        Résumé
        <span className="pending-note">coming soon</span>
      </span>
    );
  }

  return (
    <Link className={className} href={resume.page} onClick={onClick}>
      Résumé
      <ArrowRight />
    </Link>
  );
}
