---
name: legal-text
description: >-
  Drafts privacy and terms with the controller's real details and removes the
  example marker. Use it with "/legal-text". Do not draft statutes from memory.
---

# Legal text

Privacy and terms live in the repository, not in the CMS. That is the explicit exception: the owner does not edit them in the dashboard.

## Ask

- Legal name.
- Address.
- Email.
- What data the site collects. In v1, if there is no analytics and no form, the list is short: what the hosting and the CMS record. Do not invent marketing cookies.

## Does

1. Write [src/content/legal/privacidad.md](../../src/content/legal/privacidad.md) and [src/content/legal/terminos.md](../../src/content/legal/terminos.md).
2. Remove the `bawt:legal-pendiente` marker.
3. Do not draft statutes from memory. Write from the details the person supplied. If a law must be cited, they provide the current text in that session. Ask, or leave a marked gap the check still sees.

The `/.well-known/security.txt` contact comes from [src/config/site.ts](../../src/config/site.ts). If the email is still the example, the placeholder check fails once `template.lock.json` exists.

## Does not

- Does not add a cookie banner. There is no measurement. ADR 0010 forbids it until a tracker exists, and the banner is born in the same change as the tracker.
