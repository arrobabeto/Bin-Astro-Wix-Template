# Create a page

The short guide for the person who writes the page is [Make a page](make-a-page.html). This page is for whoever maintains the repo.

This is the path for someone who already describes pages in a prompt and does not have a Figma file. Claude Code is connected to the client repo. The same prompt is the brief. The skill `create-page` turns it into one Astro page on the layout and tokens already in the repo.

Figma stays the path when there is a file. See [Design from Figma](design-from-figma.md).

## What the person does

1. Open Claude Code in the repo.
2. Paste the usual prompt: the page, the sections, the copy.
3. Look at it on `wix dev`.
4. Ask for changes, or say it is approved.
5. After that word, Claude opens a pull request on `page/<slug>` and merges it only when Quality is green.
6. The push to `main` runs Release. The public URL is in that job's log.

Nothing is published from the laptop. Silence is not approval.

## What the branch may change

On `page/*`, `check:page-scope` allows:

- new files under `src/pages/`, `src/components/pages/<slug>/`, and `public/` (or src/assets/ once that folder exists)
- a change to `src/config/routes.ts` that does not remove a path
- one existing page, and only when the commit message has `Page-Edit: src/pages/<file>.astro`

Any other path fails the check. Deleting a file under `src/pages/`, or removing a route, fails on every branch unless a commit in the range has the trailer `Allow-Page-Delete:`. That trailer is not part of this flow.

## If the page is wrong after it ships

Revert the merge on `main`. Release publishes that revert. See [Publish](publish.md).
