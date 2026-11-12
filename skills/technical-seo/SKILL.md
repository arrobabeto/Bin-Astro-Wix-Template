---
name: technical-seo
description: >-
  Reviews technical SEO for a new page or before publishing: vertical metadata
  on records, BaseHead and routes.ts on own pages. Use it with "/technical-seo".
  It does not invent a score and it does not do keyword research.
---

# Technical SEO

## Shipped item page

Check that `wixMetadata`, the `SEO.Tags` component, and the read of `x-wix-forwarded-url` are still there, with a fallback to `Astro.url.href`. Do not remove that block: the shipped file's comment says so. The owner edits those metadata in the dashboard.

The vertical's tag page warns that the Wix sitemap does not list tags. Do not invent an endpoint to merge sitemaps. If the Wix sitemap must be touched, read [skills/wix-docs/SKILL.md](../wix-docs/SKILL.md) in that session before proposing code.

## Own page

Check [src/components/seo/BaseHead.astro](../../src/components/seo/BaseHead.astro), an entry in [src/config/routes.ts](../../src/config/routes.ts), and a title and description that are not the placeholders. The canonical URL comes from [src/lib/public-url.ts](../../src/lib/public-url.ts): `x-wix-forwarded-url` when it is http(s); otherwise `site.url` plus the path; if `site.url` is empty, there is no canonical.

`og:image` only if `site.ogImage` has a value. Do not invent an image.

The repo sitemap lists only `routes.ts`. It does not dump the CMS. `llms.txt` does not query the CMS on every request either.

## Does not

- Does not invent a score.
- Does not write a Yoast or Rank Math report.
- Does not create `llms-full.txt`.
- Does not do keyword research.
