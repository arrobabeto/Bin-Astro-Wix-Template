# Create a site

1. On GitHub, use **Use this template** on the template repository, or clone it and create the client repo. The BAWT remote is https://github.com/arrobabeto/Bin-Astro-Wix-Template
2. Node 22 (`nvm use`). The floor is 22.12.
3. `npm install`
4. `npm run setup`
5. Open the project in Cursor or Claude Code.
6. Ask for `new-site`.

Have the business name, a one-line description, whether the Wix site already exists or must be created, which verticals are needed (none is allowed), the contact email, and, if it is already known, the public URL. If there is a Figma file, design comes after the setup, not during it.

`setup` does not create the Wix site. It checks Node, that the Wix skills came with the clone, syncs types, and installs the git hook. The skill does the setup, because it asks for the name and the verticals.

On `main` of the client repo, require the **Quality** check on the pull request. Do not require **Release** on the PR: it does not run there. Without `wix.config.json`, Release is skipped.

Work goes on `feature/*`, `fix/*`, `content/*`, or `page/*`. The hook blocks a direct commit to `main`.

Protect `main` in the client repo: no direct push, and Quality required before merge. That setting lives in GitHub, not in this template. The page-author flow depends on it. See [Publish](publish.md).
