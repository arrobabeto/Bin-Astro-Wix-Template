# 0008 — Secrets and release

**Status:** Accepted

## Context

There are two different credentials. `WIX_API_KEY` is the account API key: `wix login --api-key` in CI. `WIX_CLIENT_SECRET` is the site app's OAuth secret: the Wix runtime authenticates visitors. It does not publish, it is not copied to GitHub, and it does not enter the bundle.

`.env.local` is written by `wix env pull`. It contains the OAuth secret. It is not committed.

## Decision

The Quality workflow uses no secrets. The Release workflow runs on `main` only if `wix.config.json` exists, logs in with `WIX_API_KEY`, then `env pull`, `build`, and `release`. It does not print the secret. The template repo has neither that file nor that secret, and it does not publish.

`wix token` is minted per command and is not stored in a file.

## Alternatives

- **Publish by hand forever.** The defined flow puts the release behind CI. The first release of a site can be local; the workflow takes the next merge.
- **Put `WIX_CLIENT_SECRET` in GitHub Actions.** It does not publish, and it must not leave the machine or the runner that generates it.

## Consequences

- `.env.example` names the keys with empty values. It does not ship a sample API key.
- `npm run check:leakage` fails if a secret is assigned a value in the reviewed tree.
