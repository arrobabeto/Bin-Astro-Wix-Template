# 0012 — Self-hosted fonts

**Status:** Accepted

## Context

A Google Fonts stylesheet notifies a third party on every visit and blocks render. In the trial that was a design decision of that site, not of the stack. The template cannot inherit that URL.

## Decision

The starter CSS imports no external URL. When a project needs fonts, they come in through `@fontsource` or files in the repo, decided by the design, not by the template. `npm run check:google-fonts` fails if `fonts.googleapis.com` or `fonts.gstatic.com` appear in `src/` or `public/`.

## Alternatives

- **Leave the Google stylesheet "until the design brings its own".** The template would publish the third-party notice on the day of the clone.
- **Declare `@fontsource` in the empty template.** Picks a family the design has not asked for yet.

## Consequences

- The home uses the system stack.
- `@fontsource` is not a v1 dependency. It enters the project when the design brings a font.
