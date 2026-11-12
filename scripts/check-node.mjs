#!/usr/bin/env node
/**
 * Node 22 in .nvmrc, .node-version, and the current process.
 * Does not require the same patch: .nvmrc may name only the major.
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
  else r.fail(`${file} must pin Node ${MAJOR} (has "${value.trim()}")`)
}

if (pins[".nvmrc"] && pins[".nvmrc"] !== pins[".node-version"]) {
  r.fail(".nvmrc and .node-version do not pin the same major")
}

const running = majorOf(process.versions.node)
if (running === MAJOR) r.ok(`process: Node ${process.versions.node}`)
else
  r.fail(
    `running Node ${process.versions.node}; this template uses Node ${MAJOR}`,
  )

const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"))
const engines = String(pkg.engines?.node ?? "")
if (engines.includes(MAJOR) && !/\b24\b/.test(engines))
  r.ok(`engines.node: ${engines}`)
else
  r.fail(
    `package.json#engines.node must request Node ${MAJOR} (has "${engines}")`,
  )

const workflow = ".github/workflows/ci.yml"
if (fs.existsSync(workflow)) {
  const content = fs.readFileSync(workflow, "utf8")
  if (/node-version-file:\s*\.nvmrc/.test(content))
    r.ok(`${workflow} uses .nvmrc`)
  else r.fail(`${workflow} must use node-version-file: .nvmrc`)
} else r.fail(`missing ${workflow}`)

r.done(`Node ${MAJOR} pinned`)
