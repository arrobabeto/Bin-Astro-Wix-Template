import type { APIRoute } from "astro"

import { routes } from "../config/routes"
import { site } from "../config/site"

function location(path: string): string {
  if (!site.url) return path
  return new URL(path, site.url).href
}

export const GET: APIRoute = () => {
  const urls = routes
    .map((route) => `  <url><loc>${location(route.path)}</loc></url>`)
    .join("\n")
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`
  return new Response(body, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  })
}
