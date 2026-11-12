# 0001 — Business content lives in Wix

**Status:** Accepted

## Context

A sibling template stores pages as YAML in Git, with schemas and a section registry. That fits when content changes on publish and there is no CMS. Here the owner edits collections, posts, taxonomy, and media in the Wix dashboard, and the page has to read them on every request.

## Decision

Collections, posts, editable media, and records are read through the SDK, via the shipped code in `src/wix/`. Git stores code, `src/config/site.ts`, the legal texts, and, when a setup must be repeated, the seed plan in `plans/`.

## Alternatives

- **YAML pages with schemas, like the template without a CMS.** Pushes every site to duplicate content and to look like a model this stack does not use.
- **Copy the catalog to TypeScript as a fallback.** A new item in Wix inherits data the editor cannot see. ADR 0011 forbids it.

## Consequences

- There are no content collections.
- Changing a title in the CMS does not require a commit or a release.
- The repository does not ship CMS or Blog. They are added with `add-vertical`.
