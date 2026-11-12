---
name: skill-name
description: >-
  What the skill does, in one or two sentences, and WHEN to use it, with
  examples of how a person would ask. Agents decide to load it by reading
  only this description.
---

<!--
Mold for a new skill:
  1. Copy this folder: cp -R skills/_template skills/<name>
  2. Rename this file to SKILL.md and set `name` to the folder name.
  3. Delete this comment.
  4. Add the row and the entry in skills/INVENTORY.md.
  5. Run `npm run check:skills`.
Guide: docs/guides/skills.md
-->

# Skill name

One sentence about the result.

## Input

- **Required:** …
- **Optional:** …

If something required is missing, ask only for that.

## Preflight

1. `git status -sb`: do not mix this work with unrelated changes.
2. Read the files you are going to touch before editing them.
3. If the task talks to the Wix API, read the shipped code or `wix-docs` first. Do not write the path from memory.

## Steps

1. …

## Rules

- Business content is edited in Wix, not in an array in the repository.
- Do not invent items, prices, testimonials, or posts.
- Do not rewrite `src/wix/`. Extend it in a new file.
- Do not commit to `main`.

## Verify

```bash
npm run verify
```

## Handoff

Files changed, commands and result, and what is still open.
