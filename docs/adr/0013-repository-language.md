# 0013 — Repository working language is English

**Status:** Accepted

Supersedes the working-language sentence of [0009](0009-one-locale.md). It does not change `site.locale`.

## Context

ADR 0009 set the repository working language (guides, skills, check messages) to Spanish, and the default site locale to `es`. The people who add pages work from English skills. One language still applies: the repository does not grow a second copy of the guides.

## Decision

Guides, ADRs, own skills, agent rules, and check messages are English. Skill folder names and guide slugs are English. `site.locale` stays `es` until a project changes it.

These stay in Spanish. They are site content, not the working language:

- `src/content/legal/` and the visitor-facing chrome around it (`src/pages/legal/`, `src/pages/404.astro`)
- The example strings in `src/config/site.ts` (`Sitio nuevo`, `Descripción pendiente`), which match the default locale

Pinned Wix skills are not edited.

## Alternatives

- **Keep the Spanish guides and add English copies.** Two sources of truth. ADR 0009 already rejected parallel languages.
- **Translate the legal example.** The default locale is still `es`, and those pages are site content.

## Consequences

- Agents reply in English. The rule lives in `AGENTS.md`.
- `npm run check:skills` looks for English labels in the inventory.
