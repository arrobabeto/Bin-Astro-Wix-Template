# 0004 — Canonical skills and pinned Wix skills

**Status:** Accepted

## Context

The same request can arrive from Cursor, Claude Code, or Codex. If each tool reads a different copy of the instructions, site setup diverges. The Wix kit also changes: the version this template has already read has to stay fixed.

## Decision

Skills live in `skills/`. `.cursor/skills`, `.claude/skills`, `.codex/skills`, and `.agents/skills` are symlinks to that folder. `skills/INVENTORY.md` lists the own skills and the Wix ones. `npm run check:skills` requires the entry, the frontmatter, and the symlinks.

`wix-headless-kit`, `wix-docs`, and `wix-manage` are committed pinned. They are not edited. Their hash is in `skills-lock.json`. `templates/` is downloaded by `templates.mjs` in each project and is in `.gitignore`.

## Alternatives

- **Depend only on the Wix plugin cache on the machine that clones.** An agent without the plugin does not see the instructions, and the version is not pinned.
- **Commit `templates/`.** That is code the kit generates in each project, not part of the empty template.

## Consequences

- The Wix plugin in Cursor is still required for MCP. The repo skills do not replace it: they cover an agent that does not have the plugin open.
- On Windows, symlinks require `git config core.symlinks true` before cloning. The skills guide says so.
