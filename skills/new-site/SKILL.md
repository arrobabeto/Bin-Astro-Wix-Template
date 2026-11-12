---
name: new-site
description: >-
  Sets up a BAWT clone: connects a new or existing Wix site, picks verticals,
  and writes template.lock.json. Use it right after cloning, when they ask
  for "new site", "start this template", or "/new-site".
---

# New site

Turns the clone into one business's project. It does not design the home and it does not publish.

## When

The first job after cloning. If `template.lock.json` exists, stop and say which skill is next: `add-vertical`, `edit-wix-content`, `build-from-figma`, or `create-page`.

## Ask only this

- Business name.
- A one-line description. Do not leave the template's example text.
- Whether the Wix site is new or already exists.
- Verticals. None yet is allowed. Do not assume CMS or Blog.
- `locale`, only if it is not `es`.
- Contact email.
- Public URL, only if it is already known. Do not invent a domain.

Do not ask about colors or sections.

## Preflight

1. Read [skills/wix-headless-kit/SKILL.md](../wix-headless-kit/SKILL.md) before running anything.
2. From the repo root. Do not use `--subfolder`.
3. Do not pass `--plan`. Do not draft filler content.
4. `npx @wix/cli@latest whoami`. If it fails, show the URL and the code from `wix login` and wait. Do not read the token.

## New site

The template already has `package.json`. Do not delete it to force a scaffold: that would overwrite this repo.

- With at least one vertical:

```bash
node skills/wix-headless-kit/install/setup.mjs --stack astro --vertical <list> --business-name "<name>"
```

The list is comma-separated. No `--plan`. No `--subfolder`.

- With no verticals, only the `init` that setup itself uses in adopt mode:

```bash
CI=1 npm create @wix/new@latest -- init
```

That command writes `wix.config.json` and `.env.local`. It must not rewrite `package.json`, `astro.config.mjs`, or `AGENTS.md`. If it does, stop and show it.

## Existing site

Do not run `init`: it would create another site. Read the output of:

```bash
node skills/wix-headless-kit/install/context.mjs
```

Follow the `next` it prints. If the path is `attach`, use [skills/wix-headless-kit/install/attach.mjs](../wix-headless-kit/install/attach.mjs). Do not invent a `--site` when the context already has the id.

The deploy site (`wix.config.json`) and the content site (`.env.local`) are the same in a normal project. In a migration preview they are not. Say that out loud and do not guess the site from the config if `context.mjs` says otherwise.

## After

1. `npx @wix/cli@latest env pull` if `.env.local` does not exist.
2. Write [src/config/site.ts](../../src/config/site.ts) with the name, description, email, locale, and the URL if it is known.
3. Write `template.lock.json` with `name`, `siteId`, `verticals`, `createdAt`, and the Node version (`process.version`).
4. The home `<title>` must use `site.name`. Leave the `bawt:demo` marker until they ask for the design.
5. Run `npm test`. Run `npm run check:source`.
6. Do not run `wix release`. Publishing is a different step.

If `check:placeholders` fails only because the home still has the demo marker, because the legal Markdown is still the example, or because the public URL is not known yet, do not "fix" it by inventing text, a domain, or deleting the home. Report it. Design removes it with `demo:clear` or `build-from-figma`. Legal text is written by `legal-text`.

## Does not

- Does not seed content.
- Does not change `src/wix/sdk.ts` or put `WIX_CLIENT_ID` in a string.
- Does not commit `.env.local`.
