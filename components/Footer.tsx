/**
 * One glass pill, so the footer's small text never sits directly on the two
 * bottom-corner blobs (measured 4.1:1 light and 2.9:1 dark at 390 before).
 */
export default function Footer() {
  return (
    <footer className="footer">
      <p className="pill footer__line">
        <span>© {new Date().getFullYear()} Parth Doshi</span>
        <span className="footer__sep" aria-hidden="true">
          ·
        </span>
        <a href="#top">Back to the top</a>
      </p>
    </footer>
  );
}
