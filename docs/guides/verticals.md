# Verticals

The template deploys none. `new-site` asks which ones are needed. `add-vertical` adds one later.

| Vertical | When                                                                         | What not to edit                                                 |
| -------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| `cms`    | Collections the owner edits                                                  | The data layer `deploy.mjs` copies                               |
| `blog`   | Posts. The rich-content viewer is an island and is not mounted on the server | The shipped-file comment that separates the viewer from comments |
| `forms`  | Forms. There is no second email system in this template                      | The vertical's endpoints                                         |

Storefront, bookings, events, members, and the rest exist in the kit and are added with the same skill.

`deploy.mjs` installs the vertical for `--stack astro` and may touch `package.json`. After that there is a single `npm install`. The dependencies guide explains why a second one is not launched in parallel.

After `templates.mjs`, the vertical's instructions sit in the folder the kit downloads and `.gitignore` excludes. Read them in that session before touching presentation. They are not committed.

`@wix/dashboard` is not declared until a vertical asks for it.
