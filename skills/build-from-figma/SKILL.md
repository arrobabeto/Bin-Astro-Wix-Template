---
name: build-from-figma
description: >-
  Implements a Figma page in Astro and Tailwind with the Cursor Figma plugin,
  downloads assets into the repo, and removes the demo home when the design
  is done. Use it with "/build-from-figma" or when there is a URL or a node-id.
---

# Build from Figma

There is a Figma URL or a `node-id`. One page per node.

## Does

1. Follow the Cursor skill `figma-design-to-code`: node context with a capture, assets downloaded into the repo.
2. No temporary Figma URLs. No layout by absolute coordinates.
3. Implement in `.astro` and Tailwind. Color tokens come from the Figma file and are written to [src/styles/global.css](../../src/styles/global.css). If the design brings color, do not leave the template's neutral tokens.
4. Business data comes from the vertical's DTOs, not from fixed strings, once the vertical exists. If it does not yet, stop and ask for `add-vertical` before mocking records with fake data.
5. Images: descriptive alt, lowercase hyphenated file names, weight inside `npm run check:assets`.
6. When finished, offer `npm run demo:clear` if the marker is still on the home, and run `npm run verify`.

## If the Figma plugin is not installed

Stop and ask for screenshots and assets. Do not call the Figma REST API and do not load an alternate REST reader. There is no `FIGMA_API_KEY` in `.env.example`.

A prompt with no Figma file is `create-page`, not this skill.

## Does not

- Does not copy another project's identity.
- Does not mount the rich-content viewer on the server.
- Does not raise a collection `limit` "just in case".
