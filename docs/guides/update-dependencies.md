# Update dependencies

The stack versions that have already run together are pinned in `package-lock.json`. Do not bump the project to "latest" in the same change as something else.

`package.json` allows `astro` at `^7.3.2`. The lockfile installs `astro@7.4.11`. `npm ci` on Node 22 rejected the previous lock (`astro@7.3.3`): the hosting adapter's `@astrojs/cloudflare` peers `astro@^7.4.0`. When that check fails, refresh the lock with one `npm install` on Node 22 and commit `package-lock.json`.

A new vertical may touch `package.json` through `deploy.mjs`. After that there is a single `npm install`, and the lock is committed. Do not launch a second install in parallel: the kit insists on one, and two at once break the tree.

Node stays on 22. The package manager is npm. Do not switch to pnpm: the kit installs with npm.

`npm run verify` does not build with Wix. The Wix build is the release, on the machine or in the workflow.
