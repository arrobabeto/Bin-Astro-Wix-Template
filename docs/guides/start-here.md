# Start here

BAWT is the Astro template on Wix hosting. Clone it, connect a site, and build from there. It does not ship a sample site.

Index:

- [Create a site](create-site.md)
- [Connect Wix](connect-wix.md)
- [Verticals](verticals.md)
- [Content](content.md)
- [Design from Figma](design-from-figma.md)
- [Create a page](create-a-page.md)
- [Make a page](make-a-page.html) — for the person who writes the page
- [SEO](seo.md)
- [Publish](publish.md)
- [Environment variables](environment.md)
- [Skills](skills.md)
- [Update dependencies](update-dependencies.md)

Decisions are in [../adr/README.md](../adr/README.md). Agent rules are in [../../AGENTS.md](../../AGENTS.md).

## Glossary

**Ambient auth.** `WIX_CLIENT_ID` stays `null`. `@wix/astro` authenticates SDK calls on the server and in islands. There is no client id to paste into the code.

**Deploy site.** The one named in `wix.config.json`. That is where `wix release` goes. The file is not in the empty template: it appears when the site is connected.

**Content site.** The one `.env.local` describes, written by `wix env pull`. In a normal project it is the same as the deploy site. In a migration preview it is not.

**Vertical.** A kit solution (cms, blog, forms, and others). Add one with the `add-vertical` skill. The template ships with none installed.

**Release.** `wix build` and then `wix release`. The URL the CLI prints is the public site. `wix dev` does not publish.

**Seed.** Load supplied content with the vertical's script. It is not a fake catalog. The plan, if kept, goes in `plans/` and can be committed. The seed result cannot.
