#!/usr/bin/env node
/**
 * Quita el marcador bawt:demo del home y deja una página que sigue compilando.
 * No toca los textos legales.
 *
 * Uso: node scripts/demo-clear.mjs
 *      node scripts/demo-clear.mjs --dry-run
 */
import { spawnSync } from "node:child_process"
import fs from "node:fs"
import os from "node:os"
import path from "node:path"

const FILE = "src/pages/index.astro"
const MARKER = "bawt:demo"
const dryRun = process.argv.includes("--dry-run")

const NEXT = `---
import BaseLayout from "../layouts/BaseLayout.astro"
import { site } from "../config/site"
---

<BaseLayout title={site.name} description={site.description}>
  <main class="mx-auto max-w-3xl px-6 py-16">
    <h1 class="text-4xl font-semibold">{site.name}</h1>
  </main>
</BaseLayout>
`

if (!fs.existsSync(FILE) || !fs.readFileSync(FILE, "utf8").includes(MARKER)) {
  console.error(
    `FAIL  ${FILE} no tiene el marcador ${MARKER}. El home ya es del proyecto: no lo reemplaces desde aquí.`,
  )
  process.exit(1)
}

const dir = fs.mkdtempSync(path.join(os.tmpdir(), "bawt-demo-"))
const nextFile = path.join(dir, "index.astro")
fs.writeFileSync(nextFile, NEXT)
const diff = spawnSync("diff", ["-u", FILE, nextFile], { encoding: "utf8" })
process.stdout.write(diff.stdout || "")

if (dryRun) {
  console.log("\nSimulación: no se escribió nada.")
  process.exit(0)
}

fs.writeFileSync(FILE, NEXT)
console.log(`ok    ${FILE} ya no tiene ${MARKER}`)
