---
name: edit-wix-content
description: >-
  Changes a text, image, item, post, or menu whose data lives in Wix, or the
  chrome in site.ts. Use it with "/edit-wix-content". Do not copy the CMS into
  TypeScript or paste the copy into the component to avoid the network.
---

# Edit Wix content

<!-- check:docs examples: src/data/ -->

## Does

- If the owner edits the value (item, post, media, collection title), use a recipe from [skills/wix-manage/SKILL.md](../wix-manage/SKILL.md) or name the dashboard screen and the field. Read the recipe in that session. Do not build the body from memory.
- If the value is chrome in [src/config/site.ts](../../src/config/site.ts) (name, email, locale, description, URL, social image), change it there.

`wix-manage` mints the token with `npx -y @wix/cli@latest token --site <siteId>` inside the command. The token is not written to the project, to `/tmp`, or to the client.

## Does not

- Do not create `src/data/<collection>.ts` with the items.
- Do not paste CMS copy into the `.astro` file "so it does not depend on the network".
- Do not edit the data layer to transform a field the DTO already brings.
- The reference failure is a file that exports an array of cities and, if the CMS is missing a field, fills it from that array. A new item would inherit data the editor cannot see. The empty state and the error state are designed on the page.

Presentation does not import `insertItem`, `updateItem`, or `removeItem`. Whoever imports those writes from an island sends the operation with the visitor's token. The real gate is the collection permission in Wix.
