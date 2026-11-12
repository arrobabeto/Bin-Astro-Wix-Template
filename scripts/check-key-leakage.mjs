#!/usr/bin/env node
/**
 * Fails if a secret is assigned a value, or if key material appears.
 * Naming WIX_CLIENT_SECRET in the guide is allowed. Pasting a value is not.
 * The environment guide may mention the strings this check looks for.
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
  "docs/guides/environment.md",
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
    // Pinned skills write .env.local from values they already have.
    // They are not edited, and that code is not a secret pasted into the template.
    if (!PINNED_SKILL.test(file)) {
      for (const match of line.matchAll(ASSIGN)) {
        if (!isEmptyValue(match[1]))
          r.fail(`${where}: ${match[0].split("=")[0].trim()} has a value`)
      }
    }
    if (DOCUMENTATION.has(file)) return
    for (const { name, regex } of LITERALS) {
      regex.lastIndex = 0
      if (regex.test(line)) r.fail(`${where}: found ${name}`)
    }
  })
}

r.ok(`${scanned} files scanned`)
r.done("no secret leaks")
