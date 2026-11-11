#!/usr/bin/env node
/**
 * Antes de template.lock.json el template puede traer placeholders.
 * Cuando el archivo existe, el sitio ya se dio de alta y esos textos tienen
 * que haber salido de src/.
 */
import fs from "node:fs"
import path from "node:path"

import { reporter, walk } from "./lib/output.mjs"

const LOCK = "template.lock.json"
const TOKENS = [
  "bawt:demo",
  "Sitio nuevo",
  "Descripción pendiente",
  "contacto@example.com",
]
const LEGAL_TOKEN = "bawt:legal-pendiente"

const r = reporter()

if (!fs.existsSync(LOCK)) {
  r.ok("sin template.lock.json: los placeholders del template están permitidos")
  r.done("placeholders en orden")
  process.exit(0)
}

for (const file of walk("src")) {
  const rel = file.split(path.sep).join("/")
  const lines = fs.readFileSync(file, "utf8").split("\n")
  lines.forEach((line, index) => {
    for (const token of TOKENS) {
      if (line.includes(token)) r.fail(`${rel}:${index + 1}: sigue "${token}"`)
    }
    if (rel.startsWith("src/content/legal/") && line.includes(LEGAL_TOKEN)) {
      r.fail(`${rel}:${index + 1}: sigue el marcador legal`)
    }
  })
}

const site = fs.readFileSync("src/config/site.ts", "utf8")
if (/url:\s*["']["']/.test(site)) {
  r.fail(
    "src/config/site.ts: url está vacía; sin ella no hay canonical. Rellénala con la URL pública.",
  )
}

r.done("placeholders en orden")
