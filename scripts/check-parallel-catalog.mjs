#!/usr/bin/env node
/**
 * Un array de objetos en src/data o src/lib que además importa src/wix
 * es un catálogo paralelo: el CMS deja de ser la fuente.
 */
import fs from "node:fs"
import path from "node:path"

import { reporter, walk } from "./lib/output.mjs"

const IMPORTS_WIX =
  /from\s+["'][^"']*(?:\/wix(?:\/[^"']*)?|src\/wix(?:\/[^"']*)?)["']/
const EXPORTS_OBJECT_ARRAY = /export\s+const\s+\w+[^=]*=\s*\[[\s\S]*?\{/

export function findParallelCatalog(root) {
  const hits = []
  for (const dir of ["src/data", "src/lib"]) {
    const full = path.join(root, dir)
    for (const file of walk(full)) {
      if (!/\.(ts|tsx|js|mjs|astro)$/.test(file)) continue
      const source = fs.readFileSync(file, "utf8")
      if (IMPORTS_WIX.test(source) && EXPORTS_OBJECT_ARRAY.test(source)) {
        hits.push(path.relative(root, file).split(path.sep).join("/"))
      }
    }
  }
  return hits
}

const isMain =
  process.argv[1] &&
  path.resolve(process.argv[1]) === path.resolve(fileURLToPath())

function fileURLToPath() {
  return new URL(import.meta.url).pathname
}

if (isMain) {
  const r = reporter()
  for (const file of findParallelCatalog(process.cwd())) {
    r.fail(
      `${file}: exporta un array de objetos e importa src/wix. El CMS es la fuente; no rellenes huecos desde el repo.`,
    )
  }
  r.done("sin catálogo paralelo")
}
