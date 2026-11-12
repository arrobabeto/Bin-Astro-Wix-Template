# 0010 — Measurement off

**Status:** Accepted

## Context

Analytics, a tag container, and a consent banner are a project decision, not a stack decision. Copying the code "just in case" leaves a tracker off or, worse, a banner that matches nothing being measured.

## Decision

v1 includes no measurement. There is no analytics script and no banner. The day a tracker is added, the banner is born in the same change and not before.

## Alternatives

- **Leave the banner and the container commented out.** Dead code the next project turns on without checking which cookies exist.
- **A generic banner from the template.** Claims a data practice the site does not yet do.

## Consequences

- `legal-text` does not invent marketing cookies. The list, if there is no form and no tracker, is what the hosting and the CMS record.
- There is no analytics skill.
