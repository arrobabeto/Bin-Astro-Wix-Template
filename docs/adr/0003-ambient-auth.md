# 0003 — Ambient auth and checkOrigin false

**Status:** Accepted

## Context

In Astro managed by Wix, `@wix/astro` authenticates SDK calls on the server and in islands. The kit sets `WIX_CLIENT_ID` to `null` and `security.checkOrigin` to `false`. That is not an open finding: it is the stack contract.

With Origin off, an own form that trusts the `Origin` header is not a CSRF control. This template ships no own POST endpoints. If a form is needed, it comes in through the kit's Forms vertical.

## Decision

`src/wix/config.ts` is committed with `WIX_CLIENT_ID` and `WIX_MEMBERS_CLIENT_ID` set to `null`. Nobody changes them to a string by hand. `astro.config.mjs` leaves `checkOrigin: false`. No middleware is added to compensate with an invented origin list.

`src/wix/sdk.ts` is the kit's seam. It is copied and not reformatted. Manual mode (OAuth and `localStorage`) stays in the file because it is the same seam; this stack does not turn it on.

## Observed headers

This pass did not capture the headers of `wix preview` or of a published site. CSP, `Referrer-Policy`, and the rest are not invented. When there is a real capture, it is noted here as an observed fact.

`src/pages/.well-known/security.txt.ts` publishes the contact from `src/config/site.ts`. While that contact is the example, the placeholder check fails after setup.

## Alternatives

- **A manual OAuth client in the browser.** Fits another stack. This project is already managed Astro.
- **Turn checkOrigin on "to close the finding".** Breaks the kit contract.

## Consequences

- `image.domains` includes only `static.wixstatic.com`. Widening it is a conscious change.
- The site's OAuth secret is not used to publish and does not enter GitHub. See ADR 0008.
