import { resume } from "@/data/site";
import { ArrowUpRight } from "@/components/Icon";

/**
 * One flag, two states. Pending is a designed state, not a stopgap: it reads
 * as deliberate, states its own status inline, and is inert to pointer,
 * keyboard and screen reader alike.
 */
export default function ResumeLink({
  className = "link-arrow",
}: {
  className?: string;
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
    <a
      className={className}
      href={resume.path}
      target="_blank"
      rel="noreferrer"
      aria-label="Résumé (PDF, opens in a new tab)"
    >
      Résumé
      <ArrowUpRight />
    </a>
  );
}
