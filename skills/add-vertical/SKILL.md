---
name: add-vertical
description: >-
  Adds a Wix kit vertical (cms, blog, forms, or another) to a site that is
  already connected, with deploy.mjs and a single npm install. Use it with
  "/add-vertical" or when they ask for a Wix blog, collections, or forms.
---

# Add a vertical

<!-- check:docs examples: skills/wix-headless-kit/templates/ -->

The site is already connected (`wix.config.json` and `template.lock.json`). Add a kit vertical. Do not reimplement it.

## Preflight

1. Read [skills/wix-headless-kit/SKILL.md](../wix-headless-kit/SKILL.md).
2. If `skills/wix-headless-kit/templates/` is missing, run:

```bash
node skills/wix-headless-kit/install/templates.mjs
```

That folder is not committed. 3. Read all of `templates/<vertical>/INSTRUCTIONS.md` before touching presentation.

## Does

```bash
node skills/wix-headless-kit/install/deploy.mjs <vertical> --stack astro
```

One `npm install` after that. Do not launch another install in parallel.

Update `verticals` in `template.lock.json`.

Do not run the seed unless the same request asks for `seed-content` and there is real content.

When installing Blog, leave the shipped file's comment visible: the Ricos viewer goes in `client:only` and is not used to paint comments. Do not unify the render.

## Does not

- Do not rewrite `src/wix/**` that deploy just copied.
- Do not "improve" the hooks or change [src/wix/sdk.ts](../../src/wix/sdk.ts).
- Do not declare `@wix/dashboard` if the vertical did not ask for it.
- Do not invent items so the page does not look empty. The empty state is the vertical's.
