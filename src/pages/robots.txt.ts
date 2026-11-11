import type { APIRoute } from "astro"

import { site } from "../config/site"

// El host de `wix preview` no se distinguió al armar el template: no hubo
// captura. No se inventa un sufijo de dominio. Hasta confirmarlo, se permite
// el rastreo. Cuando se sepa distinguir el preview, si el host de la petición
// no es el de site.url, la respuesta debe ser `Disallow: /`.

export const GET: APIRoute = () => {
  const lines = ["User-agent: *", "Allow: /"]
  if (site.url) {
    lines.push("", `Sitemap: ${new URL("/sitemap.xml", site.url).href}`)
  }
  return new Response(`${lines.join("\n")}\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  })
}
