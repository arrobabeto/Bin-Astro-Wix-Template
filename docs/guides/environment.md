# Environment variables

`wix env pull` writes `.env.local`. That file is not committed. `.env.example` is, and its values are empty.

| Key                      | Where                             | Secret                                                 | What it is for                                                                                    |
| ------------------------ | --------------------------------- | ------------------------------------------------------ | ------------------------------------------------------------------------------------------------- |
| `WIX_CLIENT_ID`          | `.env.local`                      | No. It is a public id                                  | Unused in this stack: auth is ambient and the committed config stays null                         |
| `WIX_CLIENT_INSTANCE_ID` | `.env.local`                      | No                                                     | Identifier the CLI writes                                                                         |
| `WIX_CLIENT_PUBLIC_KEY`  | `.env.local`                      | Treat it as app material. Do not copy it into the repo | Written by the CLI. The check fails if it is assigned a value in the reviewed tree                |
| `WIX_CLIENT_SECRET`      | `.env.local`                      | Yes                                                    | The site's OAuth secret. It does not publish. It does not enter GitHub or the bundle              |
| `WIX_CLOUD_PROVIDER`     | `.env.local`                      | No                                                     | Written by the CLI                                                                                |
| `WIX_API_KEY`            | GitHub Secrets of the client repo | Yes                                                    | `wix login --api-key` in the Release workflow. It does not live in `.env.example` or `.env.local` |

The leakage check allows naming these keys. It does not allow a pasted value. It also fails if private-key material, a payment key starting with `sk_live`, or an `AKIA` prefix shows up. This sentence is the documented mention of those strings: do not paste a real example.

`wix token` is minted per command. It is not stored in the project or in `/tmp`.

`astro check` and `astro sync` load the Wix integration, and that integration does not start if the variable is missing from the environment. The typecheck script and `npm run setup` set it to empty when it is undefined. That is not a test client id and it is not written to a file. The value in `src/wix/config.ts` stays null.
