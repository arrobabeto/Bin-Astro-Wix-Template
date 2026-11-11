import type { APIRoute } from "astro"

import { site } from "../../config/site"

export const GET: APIRoute = () => {
  const lines = [
    `Contact: mailto:${site.contactEmail}`,
    `Preferred-Languages: ${site.locale}`,
  ]
  if (site.url) {
    lines.push(
      `Canonical: ${new URL("/.well-known/security.txt", site.url).href}`,
    )
  }
  lines.push("")
  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  })
}
