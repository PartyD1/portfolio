# PR 00: schema and render foundation

Branch: `diagrams/00-schema-foundation`. Size: M. Motion skill: no (no visual content changes here, only the type and render path). `/polish`: yes. Depends on: nothing. Blocks: every other PR in this plan.

## 1. Why

`CaseStudy` today is `{ flow?: Flow; problem?: string[]; build?: string[]; outcome?: string[]; challenge?: string[]; limitations?: string[] }`, and `app/work/[slug]/page.tsx` renders `flow` then walks a `sections` array over the five prose keys. This plan deletes the five prose keys and lets a project carry more than one diagram, in more than one shape. Both changes are type-level and render-level before they are content-level, so they land first and everything else builds on top of them.

## 2. What changes

### `data/projects.ts`

Replace:

```ts
export type CaseStudy = {
  flow?: Flow;
  problem?: string[];
  build?: string[];
  outcome?: string[];
  challenge?: string[];
  limitations?: string[];
};
```

with a discriminated union of diagram shapes, and `CaseStudy` becomes an array of them:

```ts
export type StepperDiagram = { kind: "stepper" } & Flow; // the existing Flow type, unchanged

export type HubAndSpokeDiagram = {
  kind: "hub-and-spoke";
  hub: { title: string; detail?: string };
  spokes: { title: string; detail?: string; cadence?: string }[];
};

export type LoopDiagram = {
  kind: "loop";
  stages: { title: string; detail?: string }[];
  /** What exits the loop and where control goes next. */
  exit: { title: string; detail?: string };
};

export type TreeDiagram = {
  kind: "tree";
  root: { title: string; detail?: string };
  children: { title: string; detail?: string; isolated?: boolean }[];
};

export type GridDiagram = {
  kind: "grid";
  // Shape TBD at PR 06, once the mechanism is confirmed. Placeholder member
  // only so the union compiles; PR 06 replaces this with real fields or
  // removes the "grid" kind entirely if it turns out not to be needed.
  cells: { title: string; detail?: string }[];
};

export type Diagram =
  | StepperDiagram
  | HubAndSpokeDiagram
  | LoopDiagram
  | TreeDiagram
  | GridDiagram;

export type CaseStudy = {
  diagrams?: Diagram[];
};
```

A project can carry more than one diagram (Operations Agent needs three; WordPlay needs two). Order in the array is render order.

### `app/work/[slug]/page.tsx`

Remove the `sections` array and its render loop entirely. Replace the single `{s?.flow && <Flow flow={s.flow} />}` line with a map over `s?.diagrams`, dispatching each entry to the component matching its `kind`:

```tsx
{s?.diagrams?.map((d, i) => {
  switch (d.kind) {
    case "stepper": return <Flow key={i} flow={d} />;
    case "hub-and-spoke": return <HubAndSpoke key={i} data={d} />;
    case "loop": return <Loop key={i} data={d} />;
    case "tree": return <Tree key={i} data={d} />;
    case "grid": return <Grid key={i} data={d} />;
  }
})}
```

`HubAndSpoke`, `Loop`, `Tree`, `Grid` do not exist yet; this PR imports them as it builds them, or (more likely, given none has a consumer until PR 01) this PR stubs the switch with only the `"stepper"` case wired, and PR 01 adds the other three cases the same day it builds the components, since Operations Agent is the first project to need them. Either sequencing is fine; do not merge a switch case with no component behind it.

### What gets deleted, not just unused

- The `sections` constant and its type in `app/work/[slug]/page.tsx`.
- `CaseStudySection.tsx`'s import in that file (check whether the component is used anywhere else before deleting the file itself; if not, delete it).
- Every project's `problem`/`build`/`outcome`/`challenge`/`limitations` arrays in `data/projects.ts` — but only once the diagram that replaces them exists (PR 01 through 07 each do this for their own project). **This PR does not delete any project's prose yet** — it only makes the type able to hold `diagrams` alongside the old fields temporarily, or the build breaks for every project at once. See "Migration order" below.

## 3. Migration order (important)

Deleting the five prose fields from the `CaseStudy` type in this PR would break every project's data in the same commit, forcing PR 00 to also rewrite all seven projects' content, which defeats the point of doing this project by project. Instead:

1. PR 00 adds `diagrams?: Diagram[]` to `CaseStudy` **alongside** the existing five prose fields (additive, not breaking).
2. PR 00 updates `page.tsx` to render `diagrams` first, then still render any remaining prose sections below it (temporary, ugly, and gone by PR 08).
3. Each of PR 01 through 07 removes its own project's five prose fields from `data/projects.ts` the same commit it adds that project's `diagrams`.
4. PR 08 (records) removes the five prose fields from the `CaseStudy` type entirely, once every project has migrated, and removes the temporary prose-rendering path from `page.tsx`.

This is the same additive-then-subtractive pattern the mobile overhaul used for `--glass-solid` alongside the old glass tokens during its own migration.

## 4. Files

- `data/projects.ts`: the type changes above.
- `app/work/[slug]/page.tsx`: render path changes above.
- No CSS in this PR. Each diagram component's own PR owns its styles.

## 5. Gate

- [ ] `npm run build` passes with the additive type change; no project's existing data needs to change yet.
- [ ] The detector reports zero findings.
- [ ] Every existing case study page (`/work/operations-agent`, `/work/santaclaws`, `/work/gestura`, `/work/wordplay`) renders identically to before this PR (nothing removed yet, `diagrams` is empty on all seven projects until PR 01 onward).
- [ ] TypeScript's discriminated union narrows correctly in the `page.tsx` switch (no `as` casts needed to read shape-specific fields).

Commit title: `Case studies can carry more than one diagram, in more than one shape`.
