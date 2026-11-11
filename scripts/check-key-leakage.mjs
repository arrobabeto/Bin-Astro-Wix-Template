#!/usr/bin/env node
/**
 * Falla si un secreto aparece con valor, o si hay material de llave.
 * Nombrar WIX_CLIENT_SECRET en la guía está permitido. Pegar un valor, no.
 * La guía de entorno puede mencionar las cadenas que este check busca.
 */
import fs from "node:fs"
import path from "node:path"

import { reporter, walk } from "./lib/output.mjs"

const ASSIGN =
  /(?:WIX_CLIENT_SECRET|WIX_CLIENT_PUBLIC_KEY)[ \t]*=[ \t]*([^\n]*)/g
const LITERALS = [
  { name: "BEGIN PRIVATE KEY", regex: /BEGIN PRIVATE KEY/g },
  { name: "sk_live", regex: /sk_live/g },
  { name: "AKIA", regex: /AKIA/g },
]
const DOCUMENTATION = new Set([
  "scripts/check-key-leakage.mjs",
  "docs/guias/variables-de-entorno.md",
])
const PINNED_SKILL = /^skills\/wix-(headless-kit|docs|manage)\//
const SKIP_EXT = /\.(png|jpe?g|gif|webp|svg|ico|woff2?)$/i

const r = reporter()

function isEmptyValue(value) {
  const trimmed = value.trim()
  return trimmed === "" || trimmed === '""' || trimmed === "''"
}

function files() {
  const roots = ["src", "public", "docs", "skills", "scripts"]
  const found = roots.flatMap((dir) => walk(dir))
  if (fs.existsSync("dist/client")) found.push(...walk("dist/client"))
  return found
    .map((file) => file.split(path.sep).join("/"))
    .filter((file) => !file.includes("skills/wix-headless-kit/templates"))
    .filter((file) => !SKIP_EXT.test(file))
}

let scanned = 0
for (const file of files()) {
  scanned += 1
  const lines = fs.readFileSync(file, "utf8").split("\n")
  lines.forEach((line, index) => {
    const where = `${file}:${index + 1}`
    ASSIGN.lastIndex = 0
    // Las skills pinneadas escriben .env.local desde valores que ya tienen.
    // No se editan, y ese código no es un secreto pegado en el template.
    if (!PINNED_SKILL.test(file)) {
      for (const match of line.matchAll(ASSIGN)) {
        if (!isEmptyValue(match[1]))
          r.fail(`${where}: ${match[0].split("=")[0].trim()} tiene un valor`)
      }
    }
    if (DOCUMENTATION.has(file)) return
    for (const { name, regex } of LITERALS) {
      regex.lastIndex = 0
      if (regex.test(line)) r.fail(`${where}: aparece ${name}`)
    }
  })
}

r.ok(`${scanned} archivos revisados`)
r.done("sin fugas de secretos")
