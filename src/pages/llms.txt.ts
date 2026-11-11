import type { APIRoute } from "astro"

import { routes } from "../config/routes"
import { site } from "../config/site"

export const GET: APIRoute = () => {
  const lines = [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    ...routes.map((route) => `- ${route.path}`),
    "",
  ]
  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  })
}
