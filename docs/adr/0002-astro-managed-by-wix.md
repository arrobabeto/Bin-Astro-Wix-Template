# 0002 — Astro managed by Wix, on the server

**Status:** Accepted

## Context

Content changes in the dashboard, not on commit. A static site would have to be rebuilt to see a new title, and a release is not a reindex. The trial that approved the stack ran Astro 7 with the Wix hosting adapter.

## Decision

`output: "server"`, the Wix adapter, and the commands `wix dev`, `wix build`, and `wix release`. The dev server that counts is Wix's: ambient auth and the proxy do not exist in `astro dev`.

## Alternatives

- **A static site on another host.** Contradicts the approved stack: here the page has to read the CMS on the request.
- **An SPA served as loose files.** Wix would not give it the fallback or the ambient auth of this adapter.

## Consequences

- Every page runs on the Worker. There is no static-page CDN, no ISR, and no application cache layer in v1.
- A page requests what it is going to render, with an explicit `limit`.
- Redis, a backup CMS, and static generation of records are not added.
