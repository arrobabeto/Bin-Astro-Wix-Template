#!/usr/bin/env node
/**
 * Before template.lock.json the template may ship placeholders.
 * Once that file exists, the site is set up and those strings must be
 * gone from src/.
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
  r.ok("no template.lock.json: template placeholders are allowed")
  r.done("placeholders ok")
  process.exit(0)
}

for (const file of walk("src")) {
  const rel = file.split(path.sep).join("/")
  const lines = fs.readFileSync(file, "utf8").split("\n")
  lines.forEach((line, index) => {
    for (const token of TOKENS) {
      if (line.includes(token))
        r.fail(`${rel}:${index + 1}: still has "${token}"`)
    }
    if (rel.startsWith("src/content/legal/") && line.includes(LEGAL_TOKEN)) {
      r.fail(`${rel}:${index + 1}: legal marker still present`)
    }
  })
}

const site = fs.readFileSync("src/config/site.ts", "utf8")
if (/url:\s*["']["']/.test(site)) {
  r.fail(
    "src/config/site.ts: url is empty; without it there is no canonical. Fill it with the public URL.",
  )
}

r.done("placeholders ok")
