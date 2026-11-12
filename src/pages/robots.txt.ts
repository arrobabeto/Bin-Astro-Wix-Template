import type { APIRoute } from "astro"

import { site } from "../config/site"

// The `wix preview` host was not identified when the template was built:
// there was no capture. No domain suffix is invented. Until that is confirmed,
// crawling is allowed. Once preview can be told apart, if the request host
// is not site.url, the response must be `Disallow: /`.

export const GET: APIRoute = () => {
  const lines = ["User-agent: *", "Allow: /"]
  if (site.url) {
    lines.push("", `Sitemap: ${new URL("/sitemap.xml", site.url).href}`)
  }
  return new Response(`${lines.join("\n")}\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  })
}
