# 0014 — New pages ship through Git

**Status:** Accepted

## Context

Someone who used to describe a page in a prompt, then paste HTML into a page builder, now works in this stack. The prompt stays. The paste does not: a page here is Astro in the repo, and the public site changes when `main` is released. They also need a way back if the new page is wrong, and a way to keep that change from deleting a page that already exists.

## Decision

`create-page` implements one page on the layout and tokens already in the repo. It does not call Figma and it does not run `wix release`. After an explicit approval it opens a pull request on `page/<slug>` and merges only when Quality is green.

`check:page-scope` rejects a deleted file under `src/pages/` and a removed path in `src/config/routes.ts`, unless a commit in the range carries `Allow-Page-Delete:`. On `page/*` the diff may only add that page's files, edit `routes.ts` without removing a path, or edit one existing page named by `Page-Edit:`.

Publish and rollback are the Release workflow on `main`. A revert of the merge publishes the previous tree.

## Alternatives

- **A free HTML block inside the page.** Skips the layout, the checks, and SEO. That is the paste this flow replaces.
- **Trust the skill text alone.** A model can ignore it. The check is what stops the deletion.
- **Publish from the laptop with `wix release`.** Bypasses the commit that rollback needs.

## Consequences

- The client repo protects `main` (no direct push, Quality required). The template cannot commit that GitHub setting. The publish guide records it.
- A layout that does not exist yet is still a dev change on `feature/*`, or `build-from-figma` when there is a file. `create-page` does not invent a design system.
