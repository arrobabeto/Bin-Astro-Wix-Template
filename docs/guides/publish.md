# Publish

`wix dev` does not publish. The public site is the URL `wix release` prints. Do not rewrite that URL from memory: read it from the log.

## On the machine

With a session already started, after `npm ci`:

```bash
npx wix build
npx wix release
```

These commands use the `wix` binary from the lockfile. The first release of a new site can be this one. The workflow takes the next merge.

The `create-page` skill does not run these commands. It merges to `main`, and the workflow below publishes.

## In GitHub Actions

The Release workflow starts from `workflow_run` after the Quality workflow completes. The job runs only when the conclusion is success, the Quality event was `push`, and the head branch is `main`. It checks out that commit. A pull request branch is not published. `workflow_run` starts working only once this workflow file is on `main`.

After checkout, the job checks for `wix.config.json`. In the template repository that file is absent: the job ends successfully and does not log in, build, or release. A missing file means the job does not publish. A skip is not a failure.

In the client repo, the secret is `WIX_API_KEY`: an account API key created for CI. Paste it in Settings → Secrets and variables → Actions. Do not paste it in the code, in chat, or in `.env.local`.

Do not use `WIX_CLIENT_SECRET` for this workflow. That secret authenticates visitors. It does not publish.

If the secret is missing, the job fails with a fixed message and does not print the value. The steps, when the config file exists, are login with the API key, `env pull`, `build`, and `release` with the checked-out commit SHA in the comment. Those commands are `npx wix` after `npm ci`. The job log is the record of the URL. It does not need to be parsed.

The Quality workflow does not log in and needs no secrets.

## Protect main

In the client repo, once, in GitHub:

- No direct push to `main`.
- Quality required before merge.

This template cannot commit that setting. Without it, a `page/*` change can reach the site without the page-scope check.

## Rollback

Each release comment is `ci` plus the commit SHA. To undo a page that already shipped:

1. Revert the merge commit on `main` (`gh pr revert`, or `git revert` of that merge).
2. Push the revert to `main`.

Release runs again and publishes the previous tree. Read the public URL from that job's log. Do not edit the live site by hand to "undo" the page.
