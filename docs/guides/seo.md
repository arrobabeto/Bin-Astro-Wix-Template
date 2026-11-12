# SEO

There are two kinds of page.

**A vertical's item** (a post, a shipped record). It brings `wixMetadata`, the `@wix/seo` tags component, and the public URL read from `x-wix-forwarded-url`. Do not remove that. The owner edits those metadata in the dashboard. The Wix sitemap does not list tag pages. Do not invent an endpoint to merge sitemaps. If the Wix sitemap must change, read the docs with `wix-docs` first.

**An own page** (home, legal, a listing the project adds). It uses `BaseHead`: title, description, canonical, Open Graph. The canonical comes from `src/lib/public-url.ts`. If there is no public URL, no canonical is emitted and, after setup, the placeholder check points at it. `og:image` only if `site.ogImage` has a value.

Those routes are registered in `src/config/routes.ts`. The repo sitemap and `llms.txt` list only that table. They do not dump the CMS.

Site JSON-LD is emitted only when the name and the description are no longer the examples.
