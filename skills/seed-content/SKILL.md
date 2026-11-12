---
name: seed-content
description: >-
  Loads content the person supplied (JSON, CSV, a list, or photos) into Wix,
  reading the vertical's SEED.md. Use it with "/seed-content". Refuse if they
  ask to invent sample posts or products.
---

# Seed content

<!-- check:docs examples: skills/wix-headless-kit/templates/ src/data/ -->

Only when content was supplied or described with real data. If the request is "invent three sample posts", refuse and say so.

## Does

1. In that session, read `templates/<vertical>/seed/SEED.md` and `templates/shared/SUPPLIED-CONTENT.md`. If `templates/` is missing, run `node skills/wix-headless-kit/install/templates.mjs` first.
2. Write `plans/<vertical>.json` with the person's literal values. That plan can be committed. It is not a secret.
3. Run that vertical's `seed-*.mjs`, as `SEED.md` says. Do not recall the command.
4. Review `seed-result.json`. Do not commit it: it is in `.gitignore`.
5. If the site already existed, read `read-site.mjs` first and do not duplicate by name what is already there.

## Permissions

Copy them from `SEED.md`. Do not recall them. The intent, without inventing the API enum: public read for what the site shows; non-public write, except the visitor operation the vertical itself documents (comments, likes). If `SEED.md` does not bring the field, ask. Do not use `auth.elevate`.

## Does not

- Does not create a parallel catalog in `src/data/`.
- Does not publish the site. A release does not refresh data: content is read at runtime.
