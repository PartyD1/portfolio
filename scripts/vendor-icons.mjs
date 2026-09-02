/**
 * Vendors Simple Icons path data into components/tech-marks.generated.ts.
 *
 * Same shape as scripts/make-grain.mjs: a committed generator, a generated
 * artifact, provenance in the header, regenerate rather than hand-edit.
 *
 *   node scripts/vendor-icons.mjs
 *
 * The slug list is read from data/stack.ts — THE ONE LIST. There is no second
 * tool vocabulary anywhere in this repo, and there must not be one: data/stack.ts
 * documents that you add a tool by adding it to a group, and a parallel list
 * would silently break that contract.
 *
 * simple-icons is pulled through a one-shot `npx` at a PINNED version and is
 * never added to package.json. It is a build-time data source, not a runtime
 * dependency, and 3,000+ icons have no business in the dependency tree to ship
 * about 25.
 *
 * PATH DATA ONLY, NEVER A BRAND HEX. Simple Icons ships a `hex` for every icon
 * and this deliberately drops it: ~25 uncontrolled brand accents would blow The
 * One Accent Rule on a page whose whole identity is having exactly one accent
 * colour. Brand GEOMETRY ships; brand COLOUR does not. There is a grep gate on
 * the generated file for six-digit hex.
 *
 * Icon data is CC0-1.0. The marks themselves remain the trademarks of their
 * respective owners.
 */
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

const PINNED = "simple-icons@16.29.0";

/* --- the one list --------------------------------------------------------- */
const src = readFileSync(new URL("../data/stack.ts", import.meta.url), "utf8");
const slugs = [...src.matchAll(/slug:\s*"([a-z0-9]+)"/g)].map((m) => m[1]);
const unique = [...new Set(slugs)].sort();
if (!unique.length) {
  console.error("No slugs found in data/stack.ts — refusing to write an empty file.");
  process.exit(1);
}
console.log(`Reading ${unique.length} slugs from data/stack.ts`);

/* --- pull the paths ------------------------------------------------------
 * Installed into a throwaway prefix and imported by ABSOLUTE path. `npx -p X
 * node -e` does not work here: -e resolves specifiers from the cwd, not from
 * npx's temporary prefix, so the import fails with ERR_MODULE_NOT_FOUND. */
const tmp = mkdtempSync(join(tmpdir(), "vendor-icons-"));
console.log(`Installing ${PINNED} into ${tmp}`);
execFileSync("npm", ["install", "--no-save", "--silent", "--prefix", tmp, PINNED], {
  stdio: ["ignore", "ignore", "inherit"],
});

const pkgDir = join(tmp, "node_modules", "simple-icons");
const version = JSON.parse(readFileSync(join(pkgDir, "package.json"), "utf8")).version;
const si = await import(pathToFileURL(join(pkgDir, "index.mjs")).href);

const out = {};
const missing = [];
for (const s of unique) {
  const icon = si["si" + s.charAt(0).toUpperCase() + s.slice(1)];
  if (icon?.path) out[s] = { path: icon.path, title: icon.title };
  else missing.push(s);
}
rmSync(tmp, { recursive: true, force: true });

if (missing.length) {
  console.error(
    `\nThese slugs have no Simple Icons mark: ${missing.join(", ")}\n` +
      `Fix the slug in data/stack.ts, or drop it so the tool renders as a text ` +
      `pill. Refusing to write a partial file.`,
  );
  process.exit(1);
}

/* --- emit ----------------------------------------------------------------- */
const entries = Object.keys(out)
  .sort()
  .map((s) => `  ${s}: ${JSON.stringify(out[s].path)},`)
  .join("\n");

const titles = Object.keys(out)
  .sort()
  .map((s) => `  ${s}: ${JSON.stringify(out[s].title)},`)
  .join("\n");

const file = `/**
 * GENERATED FILE — DO NOT HAND-EDIT.
 *
 * Regenerate with:  node scripts/vendor-icons.mjs
 *
 *   source:      simple-icons v${version} (pinned as ${PINNED}; installed into a
 *                throwaway prefix at build time and never added to package.json)
 *   resolved:    ${new Date().toISOString().slice(0, 10)}
 *   slugs:       read from data/stack.ts, the one tool list
 *   licence:     icon DATA is CC0-1.0. The marks themselves remain the
 *                trademarks of their respective owners, used here to identify
 *                the technologies used — not as endorsement.
 *
 * Path data only. No brand hex is emitted, deliberately: every mark renders in
 * currentColor so the page keeps exactly one accent colour. See
 * scripts/vendor-icons.mjs for the full reasoning.
 */

/** 24x24 viewBox, single path, fill (never stroke). */
export const techMarks: Record<string, string> = {
${entries}
};

/** Official display names, for the accessible label. */
export const techTitles: Record<string, string> = {
${titles}
};
`;

const dest = new URL("../components/tech-marks.generated.ts", import.meta.url);
writeFileSync(dest, file);
console.log(`Wrote ${Object.keys(out).length} marks to components/tech-marks.generated.ts`);
