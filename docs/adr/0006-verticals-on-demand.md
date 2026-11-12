# 0006 — Verticals on demand

**Status:** Accepted

## Context

CMS, Blog, Forms, and the rest of the kit install large packages and shipped pages. An informational site may not want Blog. Loading Ricos and empty collections into the template punishes the first client who does not use them.

## Decision

The base `package.json` does not include `@wix/data`, `@wix/blog`, `@wix/ricos`, `@wix/seo`, or `@wix/dashboard`. `deploy.mjs` adds them when `add-vertical` installs that solution. `new-site` asks which ones are needed and may answer none.

React 18 is in the contract even before there are islands: managed Astro includes it for when a shipped vertical requires it.

## Alternatives

- **Install CMS and Blog in the template "so it arrives ready".** The first project that does not want them still loads them.
- **Reimplement collections by hand.** The kit already brings the data layer, the seed, and the item pages. Rewriting them is the failure the skills forbid.

## Consequences

- A new vertical may touch `package.json`. After that there is a single `npm install` and the lock is committed.
- No demo content in Wix. If the client did not deliver data, the collection is born empty.
