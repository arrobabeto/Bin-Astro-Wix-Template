# 0009 — One locale, no language routing

**Status:** Accepted

The sentence that set the repository working language to Spanish is superseded by [0013](0013-repository-language.md). The rest of this decision stands.

## Context

v1 of the sites from this template is written in one language. Wix multilingual is another vertical and another project. Per-language folders, as in the template without a CMS, would duplicate a model that does not exist here.

## Decision

`site.locale` (default `es`) is the `lang` of `<html>`. A project can change it. There is no per-language routing and no i18n skill.

## Alternatives

- **`es/` and `en/` folders from day one.** They would force duplicate content in Git, and business content is not in Git.
- **Turn on Wix multilingual inside the empty template.** It was not asked for and would ship another vertical by default.

## Consequences

- There is no `check:i18n`.
- The example legal texts are in Spanish. Another country is not drafted from memory: the skill asks.
