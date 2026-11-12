# AGENTS.md

<!-- check:docs examples: src/data/ -->

Single source of rules for BAWT. `CLAUDE.md` only points here.

## What this is

BAWT (Bin Astro and Wix Template) is a stack, not a site. The decision is in [docs/adr/0005-stack-not-a-design.md](docs/adr/0005-stack-not-a-design.md) and the entry map is in [README.md](README.md).

Astro 7 runs on Wix hosting (`output: "server"`). Tailwind 4 comes in through `@tailwindcss/vite`. React 18 is for islands a shipped vertical requires, not for new presentation. Business content is read at runtime from Wix. A release does not refresh data.

## Map

- `src/pages`, `src/components`, `src/layouts`, `src/styles`: presentation.
- `src/config/site.ts`: name, locale, description, public URL, email, social image. Nothing else.
- `src/config/routes.ts`: own routes that enter the sitemap and `llms.txt`.
- `src/lib/public-url.ts`: the only platform logic with a test, and no Wix network.
- `src/wix/`: auth seam and, when a vertical is added, the shipped code. Do not rewrite it.
- `src/content/legal/`: privacy and terms. Exception: they do not live in the CMS.
- `skills/`: eight own skills and three pinned Wix skills. Inventory in [skills/INVENTORY.md](skills/INVENTORY.md).
- `docs/adr/`: decisions. `docs/guides/`: how the work is done. Index in [docs/guides/start-here.md](docs/guides/start-here.md).

There is no `src/data/`. There is no sample header or footer. There is no `wix.config.json` in the empty template.

## Skills

Read the skill before the task. The full entry is in the inventory.

| Skill              | What it is for                                   |
| ------------------ | ------------------------------------------------ |
| `new-site`         | Connect the clone to Wix                         |
| `add-vertical`     | Add cms, blog, forms, or another vertical        |
| `seed-content`     | Load real content                                |
| `edit-wix-content` | Change a Wix value or the chrome in `site.ts`    |
| `build-from-figma` | Implement a Figma node                           |
| `create-page`      | New page from a prompt, published through GitHub |
| `technical-seo`    | Metadata for a page                              |
| `legal-text`       | Privacy and terms                                |
| `wix-headless-kit` | Shipped code, setup, and deploy. Do not edit     |
| `wix-docs`         | Confirm an endpoint. Do not edit                 |
| `wix-manage`       | Operate the live site. Do not edit               |

## Wix rules

Do not work from memory on the Wix API. Not a path, not a header, not a field, not a body. Every call comes from a file read in that session: the shipped code or, if it does not cover the case, the docs opened with `wix-docs`. A 400 does not authorize trying another shape.

Shipped code is copied and not rewritten. `src/wix/sdk.ts` is the only seam. `WIX_CLIENT_ID` stays `null`: auth is ambient. A privileged operation does not go into an island. Do not use `auth.elevate`.

The release is `wix build` and then `wix release`. The `wix dev` server does not count as publishing. `astro dev` is not the path: it has neither ambient auth nor the proxy.

Feedback to Wix is sent only if the person says yes. The procedure is in [skills/wix-headless-kit/guides/feedback.md](skills/wix-headless-kit/guides/feedback.md).

CMS writes (`insertItem`, `updateItem`, `removeItem`) are not imported from presentation. The gate is the collection permission in Wix.

## Parallel catalog

An array of items in the repo that fills gaps in the CMS is a defect, not a fallback. Do not invent items, prices, testimonials, or posts. If there is no content, the page shows the vertical's empty state.

Text the owner must be able to change without a developer lives in Wix. Chrome (site name, email, locale) lives in `src/config/site.ts` or in the project component, never in a second catalog.

## Demo

If they ask for the home and the `bawt:demo` marker is still in `src/pages/index.astro`, run `npm run demo:clear` or the `build-from-figma` skill first. Do not restyle the placeholder so it looks like the site.

## Git

Branches `feature/*`, `fix/*`, `content/*`, or `page/*`. Do not commit directly to `main` (escape: `ALLOW_MAIN_COMMIT=1`). `git add` with paths. Do not include `.env.local`, `seed-result.json`, logs, or the kit's `templates/`.

A `page/*` branch only adds or edits the page that was asked for. `check:page-scope` rejects deleting an existing page. See [docs/guides/create-a-page.md](docs/guides/create-a-page.md).

`WIX_API_KEY` lives in GitHub Secrets of the client repo. `WIX_CLIENT_SECRET` does not enter GitHub or the bundle.

## Verification

`npm run verify` before calling the task done. If a check fails, fix the cause. Do not turn the check off.

Strict TypeScript. No `any` in presentation. Type imports use `import type`. Color tokens live in `src/styles/global.css`. Talk to the person in English.
