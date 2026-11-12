# Create a page

The short guide for the person who writes the page is [Make a page](make-a-page.html). This page is for whoever maintains the repo.

This is the path for someone who already describes pages in a prompt and does not have a Figma file. Cursor or Claude Code is open on the client repo. The same prompt is the brief. The skill `create-page` turns it into one Astro page on the layout and tokens already in the repo.

Figma stays the path when there is a file. See [Design from Figma](design-from-figma.md).

## What the person does

1. Open Cursor or Claude Code in the repo.
2. Paste the usual prompt, starting with `/create-page`: the page, the sections, the copy.
3. Look at it on `wix dev`.
4. Ask for changes, or say it is approved.
5. After that word, Cursor or Claude Code opens a pull request on `page/<slug>` and merges it only when Quality is green.
6. The push to `main` runs Quality. Release runs only after that check succeeds. The public URL is in that job's log.

Nothing is published until the person says it is approved. Silence is not approval. Nothing is published from the laptop.

## What the branch may change

On `page/*`, `check:page-scope` allows:

- one slug, taken from the branch name `page/<slug>`
- new files only at `src/pages/<slug>.astro` or under `src/pages/<slug>/`, under `src/components/pages/<slug>/`, and under `public/<slug>/` or `src/assets/<slug>/`
- a change to `src/config/routes.ts` that only adds paths for that slug and does not remove a path or rewrite the file
- one existing page, and only when the commit message has a single trailer `Page-Edit: src/pages/<file>.astro`

Any other path fails. Deleting a file under `src/pages/`, or removing a route, fails on every branch unless a commit has `Allow-Page-Delete:`. That trailer is not part of this flow.

## If the page is wrong after it ships

Revert the merge on `main`. Release publishes that revert. See [Publish](publish.md).
