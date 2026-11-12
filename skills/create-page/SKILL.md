---
name: create-page
description: >-
  Turns the usual page prompt into one new Astro page on the existing layout,
  then opens a page/* pull request after an explicit approval. Use it with
  "/create-page" or when someone asks to create or publish a page without Figma.
---

# Create a page

The person describes the page the way they already do: a brief, or HTML they used to paste into a page builder. There is no Figma step. The result is one Astro page that uses the layout and tokens already in the repo. The guide is [docs/guides/create-a-page.md](../../docs/guides/create-a-page.md).

## Does

1. Read [src/layouts/BaseLayout.astro](../../src/layouts/BaseLayout.astro), [src/styles/global.css](../../src/styles/global.css), and the components that already exist. Reuse them. Do not invent a second visual system.
2. Create `src/pages/<slug>.astro`. Add pieces only under `src/components/pages/<slug>/`. New images go in `public/`, or in src/assets/ when that folder already exists.
3. Add the path to [src/config/routes.ts](../../src/config/routes.ts). Do not remove a path.
4. Copy the owner should change without a developer stays in Wix. Do not invent items, prices, testimonials, or posts. If the vertical is missing, stop and ask for `add-vertical`.
5. Show the page with `wix dev`. `astro dev` is not the preview: it has no ambient auth. Wait for an explicit approval. "Approved" or "publish" counts. Silence does not.
6. After approval, and only then:
   - Branch `page/<slug>` from `main`.
   - Commit only the new page, its components, new assets, and `src/config/routes.ts`.
   - Push and open a pull request with `gh pr create`.
   - Wait until the Quality check is green. It runs `check:page-scope`.
   - `gh pr merge`. If the check fails, do not merge and do not push to `main`.
7. Do not run `wix release`. The Release workflow publishes when the merge reaches `main`. Read the public URL from that job's log.

## Editing a page that already exists

Only when the person names that page. The commit message includes one trailer:

```
Page-Edit: src/pages/<file>.astro
```

That is the only existing page file the diff may change, plus new files under `src/components/pages/<slug>/`. Do not touch any other page.

## Does not

- Does not delete a page, a route, or any other file. A deletion needs a commit trailer `Allow-Page-Delete:` and is not this skill.
- Does not edit `src/wix/`, `src/layouts/`, skills, workflows, or another page.
- Does not call Figma and does not leave a raw HTML file to paste somewhere.
- Does not publish from the laptop.

Rollback is a revert of the merge on `main`. The same Release workflow publishes that commit. See [docs/guides/publish.md](../../docs/guides/publish.md).
