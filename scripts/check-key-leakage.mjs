#!/usr/bin/env node
/**
 * Fails if a secret is assigned a value, or if key material appears.
 * Naming WIX_CLIENT_SECRET or WIX_API_KEY in the guide is allowed. Pasting a value is not.
 * A GitHub Actions secret reference is not a pasted value.
 * The environment guide may mention the strings this check looks for.
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

import { reporter, walk } from "./lib/output.mjs"

const CLIENT_ASSIGN =
  /(?:WIX_CLIENT_SECRET|WIX_CLIENT_PUBLIC_KEY)[ \t]*=[ \t]*([^\n]*)/g
const API_KEY_ASSIGN = /WIX_API_KEY[ \t]*[=:][ \t]*([^\n]*)/g
const GITHUB_API_KEY = /^\$\{\{\s*secrets\.WIX_API_KEY\s*}}$/
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

function isEmptyValue(value) {
  const trimmed = value.trim()
  return trimmed === "" || trimmed === '""' || trimmed === "''"
}

function isApiKeyReference(value) {
  const unquoted = value.trim().replace(/^(['"])(.*)\1$/, "$2")
  return GITHUB_API_KEY.test(unquoted)
}

export function leakageFindings(file, line) {
  const found = []
  if (!PINNED_SKILL.test(file)) {
    CLIENT_ASSIGN.lastIndex = 0
    for (const match of line.matchAll(CLIENT_ASSIGN)) {
      if (!isEmptyValue(match[1]))
        found.push(`${match[0].split("=")[0].trim()} has a value`)
    }
  }
  API_KEY_ASSIGN.lastIndex = 0
  for (const match of line.matchAll(API_KEY_ASSIGN)) {
    if (!isEmptyValue(match[1]) && !isApiKeyReference(match[1]))
      found.push(`${match[0].split(/[=:]/)[0].trim()} has a value`)
  }
  if (DOCUMENTATION.has(file)) return found
  for (const { name, regex } of LITERALS) {
    regex.lastIndex = 0
    if (regex.test(line)) found.push(`found ${name}`)
  }
  return found
}

function files() {
  const roots = ["src", "public", "docs", "skills", "scripts", ".github"]
  const found = roots.flatMap((dir) => walk(dir))
  if (fs.existsSync("dist/client")) found.push(...walk("dist/client"))
  return found
    .map((file) => file.split(path.sep).join("/"))
    .filter((file) => !file.includes("skills/wix-headless-kit/templates"))
    .filter((file) => !SKIP_EXT.test(file))
}

const isMain =
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)

if (isMain) {
  const r = reporter()
  let scanned = 0
  for (const file of files()) {
    scanned += 1
    const lines = fs.readFileSync(file, "utf8").split("\n")
    lines.forEach((line, index) => {
      const where = `${file}:${index + 1}`
      for (const problem of leakageFindings(file, line)) {
        r.fail(`${where}: ${problem}`)
      }
    })
  }

  r.ok(`${scanned} files scanned`)
  r.done("no secret leaks")
}
