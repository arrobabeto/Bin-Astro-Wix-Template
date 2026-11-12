# Skills

Invoke one by name (`/new-site`) or by asking for the task in English. The agent reads `skills/<name>/SKILL.md` before acting. The required list is [../../skills/INVENTORY.md](../../skills/INVENTORY.md). If you add a skill, update the inventory in the same change. The mold is in `skills/_template/`.

`wix-headless-kit`, `wix-docs`, and `wix-manage` are pinned. Do not edit them. Their hash lives in `skills-lock.json`. If they are updated from the Wix repository on purpose, regenerate the hash with `node scripts/check-skills.mjs --update-lock` and review the diff. Do not update them in passing.

`.cursor/skills`, `.claude/skills`, `.codex/skills`, and `.agents/skills` point at `../skills`. On Windows, before cloning:

```bash
git config --global core.symlinks true
```

Without that, Git leaves the symlinks as text files and `npm run check:skills` fails. Clone again after turning the option on.

The Wix plugin in Cursor is required for MCP. The Figma plugin, when there is a design file. Messaging plugins are not required for the template to work.

`create-page` is the skill for a new page from a prompt, without Figma. The guide is [create-a-page.md](create-a-page.md).
