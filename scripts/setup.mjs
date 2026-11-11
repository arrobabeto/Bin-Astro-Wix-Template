#!/usr/bin/env node
/**
 * Primer arranque. No crea el sitio de Wix: eso es la skill nuevo-sitio.
 */
import { spawnSync } from "node:child_process"
import { existsSync } from "node:fs"

const major = process.versions.node.split(".")[0]
if (major !== "22") {
  console.error(
    `Este template necesita Node 22 (tienes ${process.versions.node}). Instala Node 22 y no sigas con esta versión.`,
  )
  process.exit(1)
}

const required = [
  "skills/wix-headless-kit/SKILL.md",
  "skills/wix-docs/SKILL.md",
  "skills/wix-manage/SKILL.md",
]
const missing = required.filter((file) => !existsSync(file))
if (missing.length > 0) {
  console.error(
    "El clone está incompleto. Faltan skills de Wix que el template ya trae:",
  )
  for (const file of missing) console.error(`  ${file}`)
  console.error("No se descargan en silencio. Vuelve a clonar el template.")
  process.exit(1)
}

if (!existsSync("node_modules")) {
  console.error("Primero va npm install.")
  process.exit(1)
}

const sync = spawnSync("npx", ["astro", "sync"], {
  stdio: "inherit",
  env: {
    ...process.env,
    // La integración exige la variable para cargar el config. Vacía no es un
    // secreto: el client id commiteado sigue en null. Si `wix env pull` ya la
    // definió, se conserva.
    WIX_CLIENT_ID: process.env.WIX_CLIENT_ID ?? "",
  },
})
if (sync.status !== 0) process.exit(sync.status ?? 1)

const husky = spawnSync("npx", ["husky"], { stdio: "inherit" })
if (husky.status !== 0) process.exit(husky.status ?? 1)

console.log(
  "Siguiente paso: pide nuevo-sitio, o lee docs/guias/crear-sitio-nuevo.md.",
)
