#!/usr/bin/env node
/**
 * Node 22 en .nvmrc, .node-version y el proceso actual.
 * No exige el mismo patch: .nvmrc puede decir solo la mayor.
 */
import fs from "node:fs"

import { reporter } from "./lib/output.mjs"

const MAJOR = "22"
const r = reporter()

function majorOf(value) {
  return value.trim().replace(/^v/, "").split(".")[0]
}

const pins = {}
for (const file of [".nvmrc", ".node-version"]) {
  const value = fs.existsSync(file) ? fs.readFileSync(file, "utf8") : ""
  pins[file] = majorOf(value)
  if (pins[file] === MAJOR) r.ok(`${file}: ${value.trim()}`)
  else r.fail(`${file} debe fijar Node ${MAJOR} (tiene "${value.trim()}")`)
}

if (pins[".nvmrc"] && pins[".nvmrc"] !== pins[".node-version"]) {
  r.fail(".nvmrc y .node-version no fijan la misma mayor")
}

const running = majorOf(process.versions.node)
if (running === MAJOR) r.ok(`proceso: Node ${process.versions.node}`)
else
  r.fail(
    `estás corriendo Node ${process.versions.node}; este template usa Node ${MAJOR}`,
  )

const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"))
const engines = String(pkg.engines?.node ?? "")
if (engines.includes(MAJOR) && !/\b24\b/.test(engines))
  r.ok(`engines.node: ${engines}`)
else
  r.fail(
    `package.json#engines.node debe pedir Node ${MAJOR} (tiene "${engines}")`,
  )

const workflow = ".github/workflows/ci.yml"
if (fs.existsSync(workflow)) {
  const content = fs.readFileSync(workflow, "utf8")
  if (/node-version-file:\s*\.nvmrc/.test(content))
    r.ok(`${workflow} usa .nvmrc`)
  else r.fail(`${workflow} debe usar node-version-file: .nvmrc`)
} else r.fail(`falta ${workflow}`)

r.done(`Node ${MAJOR} fijado`)
