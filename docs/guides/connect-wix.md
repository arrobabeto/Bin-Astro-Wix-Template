# Connect Wix

From the project root:

```bash
npx @wix/cli@latest whoami
```

If there is no session, `npx @wix/cli@latest login`. The CLI shows a URL and a code. Open them in the browser. Whoever automates the setup shows that URL and that code, and waits. They do not read the token into the context.

## New site

The `new-site` skill runs the kit setup with `--stack astro` when there are verticals, or only `init` when there are none yet. `init` writes `wix.config.json` and `.env.local` and should not touch the rest. Do not use `--subfolder`: the repo is the project.

Do not pass `--plan`. A fake catalog is not written.

## A site that already exists

Do not run `init`: it would create another site. The skill reads the kit's `context.mjs` and follows the step it prints. If the project needs to be attached, use the kit's attach script. Do not invent a site id when the context already has one.

## What appears

| File                 | Committed | What it is                                               |
| -------------------- | --------- | -------------------------------------------------------- |
| `wix.config.json`    | Yes       | `siteId` and `appId`. They are identifiers, not secrets. |
| `.env.local`         | No        | Written by `wix env pull`.                               |
| `template.lock.json` | Yes       | Written by `new-site`. If it exists, that skill stops.   |

After connecting, if `.env.local` is missing:

```bash
npx @wix/cli@latest env pull
```

Do not commit `.env.local`, seed logs, or the kit's `templates/` folder.
