# Design from Figma

The design is in Figma. Figma does not deploy. The agent implements it with the Figma plugin in Cursor and the `build-from-figma` skill.

One page per `node-id`. Assets are downloaded into the repo. Temporary Figma URLs are not left in. Layout is not done with absolute position.

Tokens go in `src/styles/global.css`. If the file brings color, the starter neutrals are not left in place.

Business data the design shows comes from the vertical's DTOs, not from fixed strings, once the vertical exists. If it does not yet, run `add-vertical` first. Do not mock records with fake data.

Images: alternative text, lowercase hyphenated file names, and weight inside the asset-check budget (raster over 500 KB, SVG over 200 KB).

When the home is done, `npm run demo:clear` removes the starter marker.

If the Figma plugin is not installed, stop and ask for screenshots and assets. There is no Figma API token in `.env.example`.

A person who already has a prompt and does not have a Figma file uses [Create a page](create-a-page.md) instead. That flow reuses the layout and tokens already in the repo.
