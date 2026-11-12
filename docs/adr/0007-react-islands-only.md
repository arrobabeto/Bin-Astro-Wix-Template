# 0007 — React only for kit islands

**Status:** Accepted

## Context

The rich-content viewer breaks under SSR and is heavy. Likes and comments read visitor state. The rest of the page can be server HTML with flat DTOs. React 18 is in the stack for that contract, not as the way to write presentation.

## Decision

New presentation is written in `.astro`. A React island is justified when the shipped component requires it (the viewer in `client:only`, likes and comments in `client:load`) or when visitor state cannot be resolved on the server.

The island receives the data the HTML already has. It does not request the first page of the CMS again.

## Alternatives

- **Rewrite the shipped islands in Astro.** The kit delivers them in React and asks not to rewrite them.
- **Mount the viewer on the server "so the render is not split".** The trial already separated that because the viewer breaks under SSR.

## Consequences

- The lint check does not require React in `src/pages` or in presentation `src/components`.
- React is not added to a page only because the project already has the dependency.
