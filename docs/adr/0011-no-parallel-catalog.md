# 0011 — No parallel catalog

<!-- check:docs examples: src/data/ -->

**Status:** Accepted

## Context

In an earlier trial, a cities file filled in region, color, and copy when the CMS was missing a field. A new item in Wix inherited data from a file the editor cannot see. The CMS stopped being the source.

## Decision

An array of items in the repo that fills gaps in the CMS is a defect, not a fallback. The empty state and the error state are designed on the page. `npm run check:parallel-catalog` fails if a file under `src/data/` or `src/lib/` exports an array of objects and imports `src/wix/`.

## Alternatives

- **A local fallback "in case the API fails".** Hides the failure and publishes data nobody edited.
- **Duplicate the items in the component so it does not depend on the network.** The same problem, harder to see.

## Consequences

- `src/data/` is not created in the template.
- Presentation does not import the CMS write functions.
- An operation the data layer does not have is added in a new file, after reading the shipped code and the docs.
