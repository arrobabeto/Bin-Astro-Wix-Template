#!/usr/bin/env node
/** Las fuentes entran con @fontsource o archivos del repo, no desde Google. */
import fs from "node:fs"
import path from "node:path"

import { reporter, walk } from "./lib/output.mjs"

const r = reporter()
const pattern = /fonts\.googleapis\.com|fonts\.gstatic\.com/

for (const dir of ["src", "public"]) {
  for (const file of walk(dir)) {
    if (/\.(png|jpe?g|gif|webp|ico|woff2?)$/i.test(file)) continue
    const rel = file.split(path.sep).join("/")
    const text = fs.readFileSync(file, "utf8")
    if (pattern.test(text)) r.fail(`${rel}: no importes Google Fonts`)
  }
}

r.done("sin Google Fonts")
