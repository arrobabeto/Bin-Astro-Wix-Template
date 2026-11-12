import type { APIRoute } from "astro"

import { site } from "../../config/site"

// The Expires date must be renewed before it passes.
const ISSUED = new Date("2026-11-12T00:00:00.000Z")

export const GET: APIRoute = () => {
  const expires = new Date(ISSUED.getTime())
  expires.setUTCFullYear(expires.getUTCFullYear() + 1)
  const lines = [
    `Contact: mailto:${site.contactEmail}`,
    `Expires: ${expires.toISOString()}`,
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
