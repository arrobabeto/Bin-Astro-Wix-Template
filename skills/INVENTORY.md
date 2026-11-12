# Skill inventory

Official list of this project's skills. Update it in the same change that adds,
edits, or removes a skill (`npm run check:skills` requires it). What a skill is
and how to use one: [README.md](README.md).

The three Wix skills are pinned. Do not edit them.

Statuses: **stable** (the procedure for this version), **third-party** (from Wix, pinned).

## Summary

| Skill              | Invocation                 | What it is for                                           | Status      |
| ------------------ | -------------------------- | -------------------------------------------------------- | ----------- |
| `new-site`         | `/new-site`                | Connect the clone to a Wix site and finish setup         | stable      |
| `add-vertical`     | `/add-vertical`            | Add cms, blog, forms, or another kit vertical            | stable      |
| `seed-content`     | `/seed-content`            | Load real content the person supplied                    | stable      |
| `edit-wix-content` | `/edit-wix-content`        | Change a Wix value or the chrome in site.ts              | stable      |
| `build-from-figma` | `/build-from-figma`        | Implement a Figma node in Astro                          | stable      |
| `create-page`      | `/create-page`             | New page from a prompt, published through a pull request | stable      |
| `technical-seo`    | `/technical-seo`           | Review metadata of an own page or a shipped item         | stable      |
| `legal-text`       | `/legal-text`              | Privacy and terms from real details                      | stable      |
| `wix-headless-kit` | read it before Wix         | Shipped code, deploy, and kit setup                      | third-party |
| `wix-docs`         | read it before the API     | Confirm an endpoint in the Wix docs                      | third-party |
| `wix-manage`       | read the vertical's recipe | Operate the live site without writing the token to disk  | third-party |

## Entries

### `new-site`

- **Invocation:** `/new-site`.
- **Purpose:** connects the clone to a new or existing Wix site, writes `site.ts` and `template.lock.json`, and does not publish.
- **Use cases:** "start a site for this business", right after cloning the template.
- **When not to use it:** if `template.lock.json` already exists.
- **Inputs:** name, description, new or existing site, verticals, locale if it is not `es`, email, and public URL if it is already known.
- **Outputs:** `wix.config.json`, `.env.local` (not committed), `src/config/site.ts`, `template.lock.json`.
- **Requirements:** Node 22, `npm install`, a `wix login` session.
- **Origin:** own to the template.
- **Status:** stable · v1 · 2026-11-11.

### `add-vertical`

- **Invocation:** `/add-vertical`.
- **Purpose:** runs a kit vertical's `deploy.mjs` and a single `npm install`.
- **Use cases:** "add the blog", "the CMS is needed", "I want the Wix form".
- **When not to use it:** the site is not connected yet (`new-site` first). To load data, `seed-content`.
- **Inputs:** the vertical name, as the kit lists it.
- **Outputs:** shipped code under `src/wix/`, dependencies in the lock, `template.lock.json` updated.
- **Requirements:** `wix.config.json`. `templates/` is downloaded in the session and is not committed.
- **Origin:** own to the template. The code comes from `wix-headless-kit`.
- **Status:** stable · v1 · 2026-11-11.

### `seed-content`

- **Invocation:** `/seed-content`.
- **Purpose:** writes a plan from the supplied content and runs the vertical's seed.
- **Use cases:** "load these mugs", "these posts are already written".
- **When not to use it:** if they ask to invent examples. If the change is a single field, `edit-wix-content`.
- **Inputs:** real JSON, CSV, a list, or photos, and the destination vertical.
- **Outputs:** `plans/<vertical>.json`. `seed-result.json` is reviewed and not committed.
- **Requirements:** read `SEED.md` in that session. Site connected.
- **Origin:** own to the template.
- **Status:** stable · v1 · 2026-11-11.

### `edit-wix-content`

- **Invocation:** `/edit-wix-content`.
- **Purpose:** changes a value the owner edits in Wix, or the chrome in `site.ts`.
- **Use cases:** "change this post's title", "update the site email".
- **When not to use it:** to lay out a page (`build-from-figma` or `create-page`) or to draft legal text (`legal-text`).
- **Inputs:** which value changes and the new value.
- **Outputs:** a `wix-manage` recipe run, or a change in `src/config/site.ts`.
- **Requirements:** read the recipe in that session. Do not store the token.
- **Origin:** own to the template.
- **Status:** stable · v1 · 2026-11-11.

### `build-from-figma`

- **Invocation:** `/build-from-figma`.
- **Purpose:** implements a Figma node in Astro and Tailwind and offers to remove the demo home.
- **Use cases:** "build this page from the Figma file", with a URL or a `node-id`.
- **When not to use it:** if there is no file and no captures. A prompt with no Figma file is `create-page`. It does not replace the Figma plugin with the REST API.
- **Inputs:** Figma URL or `node-id`, and the vertical if the page shows business data.
- **Outputs:** components in `src/`, tokens in `src/styles/global.css`, assets in the repo.
- **Requirements:** Figma plugin in Cursor. `npm run verify` at the end.
- **Origin:** own to the template.
- **Status:** stable · v1 · 2026-11-11.

### `create-page`

- **Invocation:** `/create-page`.
- **Purpose:** turns a page prompt into one Astro page and, after an explicit approval, merges a `page/*` pull request.
- **Use cases:** "make this page from the usual prompt", with no Figma file.
- **When not to use it:** when there is a Figma URL or `node-id` (`build-from-figma`). It does not publish from the laptop.
- **Inputs:** the brief or the HTML they used to paste, and an explicit approval before the pull request.
- **Outputs:** `src/pages/<slug>.astro`, optional `src/components/pages/<slug>/`, a route in `src/config/routes.ts`, and a merged pull request.
- **Requirements:** layout and tokens already in the repo. Quality green before merge. No `wix release`.
- **Origin:** own to the template.
- **Status:** stable · v1 · 2026-11-12.

### `technical-seo`

- **Invocation:** `/technical-seo`.
- **Purpose:** checks metadata of a shipped item page or an own page.
- **Use cases:** "review this page's SEO before publishing".
- **When not to use it:** to research keywords or to write the content.
- **Inputs:** the route or the page file.
- **Outputs:** corrections on the page, in `BaseHead`, or in `routes.ts`. No scored report.
- **Requirements:** on a shipped record, do not remove `wixMetadata` or `SEO.Tags`.
- **Origin:** own to the template.
- **Status:** stable · v1 · 2026-11-11.

### `legal-text`

- **Invocation:** `/legal-text`.
- **Purpose:** writes privacy and terms from the controller's details and removes the example marker.
- **Use cases:** "we have the legal name and address; draft the legal pages".
- **When not to use it:** for a cookie banner. There is no measurement in v1.
- **Inputs:** legal name, address, email, and what data the site collects.
- **Outputs:** `src/content/legal/privacidad.md` and `src/content/legal/terminos.md`.
- **Requirements:** for Mexico, `skills/legal-text/references/mexico.md`. For another country, do not draft statutes from memory.
- **Origin:** own to the template. The Mexico reference comes from Bin Astro Template.
- **Status:** stable · v1 · 2026-11-11.

### `wix-headless-kit`

- **Invocation:** read it before setup, deploy, seed, or any change to shipped code.
- **Purpose:** the kit that copies verticals, the auth seam, and each solution's instructions.
- **Use cases:** connect a site, add a vertical, understand why `WIX_CLIENT_ID` stays null.
- **When not to use it:** do not edit it. Do not use it to operate site data: that is `wix-manage`.
- **Inputs:** the vertical and the `astro` stack.
- **Outputs:** files under `src/wix/` and, in each project, `templates/` (gitignored).
- **Requirements:** pinned in `skills-lock.json`. The Wix plugin in Cursor is still required for MCP.
- **Origin:** third-party, `wix/skills`, pinned. Do not edit.
- **Status:** third-party · pinned · 2026-11-11.

### `wix-docs`

- **Invocation:** read it before writing an API call the shipped code does not cover.
- **Purpose:** find and read the docs page for the endpoint, the body, and the enum.
- **Use cases:** "what is the path of this operation?". A 400 does not authorize trying another shape from memory.
- **When not to use it:** if the shipped file or a `wix-manage` recipe already has the call.
- **Inputs:** which operation is needed.
- **Outputs:** the path and the body copied from the page read in that session.
- **Requirements:** network to read the docs, or the Wix plugin's docs tools.
- **Origin:** third-party, `wix/skills`, pinned. Do not edit.
- **Status:** third-party · pinned · 2026-11-11.

### `wix-manage`

- **Invocation:** read the area's recipe (CMS, blog, media, SEO) before changing live data.
- **Purpose:** REST recipes for the site, with the token minted inside the command.
- **Use cases:** "change this price", "publish this post", "read what is in the collection".
- **When not to use it:** to design pages or to commit the token.
- **Inputs:** the `siteId` and the requested change.
- **Outputs:** the call the recipe describes. The token does not touch disk or the client.
- **Requirements:** a CLI session. Do not write the token in the project, in `/tmp`, or in client code.
- **Origin:** third-party, `wix/skills`, pinned. Do not edit.
- **Status:** third-party · pinned · 2026-11-11.
