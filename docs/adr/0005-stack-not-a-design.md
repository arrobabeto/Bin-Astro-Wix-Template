# 0005 — A stack, not a design

**Status:** Accepted

## Context

A template that ships a palette, type, and sample sections teaches a site, not a way of working. The next project would copy that identity. Each client's design is in Figma and comes in through the Cursor plugin.

## Decision

The starter home is `src/pages/index.astro` with the `bawt:demo` marker. `npm run demo:clear` leaves a home that still compiles and shows `site.name`. There are no sample sections, no palette from a previous project, and no design system of the template's own.

`src/styles/global.css` ships neutral working tokens. `check:placeholders` does not require changing them: a site may be neutral. The `build-from-figma` skill does require the tokens to come from the file when the design brings color.

## Alternatives

- **Eight sample section types.** They force a registry this stack does not need, because content does not live in Git.
- **A Figma REST reader inside the repo.** Duplicates the plugin and asks for a token. The approved flow is the Figma plugin in Cursor.

## Consequences

- After `template.lock.json`, the demo marker, the example name, and the example legal texts fail `check:placeholders`.
- There is no designed header or footer in the template.
