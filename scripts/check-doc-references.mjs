#!/usr/bin/env node
/**
 * Enlaces relativos de Markdown y rutas de código entre backticks.
 * Las skills de Wix pinneadas no se editan: sus enlaces no se revisan aquí.
 *
 * Un documento puede declarar ejemplos que no existen:
 *   <!-- check:docs ejemplos: src/no-existe.ts -->
 */
import fs from "node:fs"
import path from "node:path"

import { reporter, walk } from "./lib/output.mjs"

const SOURCES = [
  "README.md",
  "AGENTS.md",
  "CLAUDE.md",
  "CHANGELOG.md",
  "docs",
  "skills",
  ".cursor/rules",
  ".github",
]
const IGNORE = [/^skills\/wix-(headless-kit|docs|manage)\//]
const ROOTS =
  "src|scripts|docs|skills|public|tests|\\.cursor|\\.github|\\.husky"
const ROOT_FILES =
  "astro\\.config\\.mjs|package\\.json|\\.env\\.example|AGENTS\\.md|CLAUDE\\.md|README\\.md|CHANGELOG\\.md|skills-lock\\.json|vitest\\.config\\.ts|eslint\\.config\\.js|tsconfig\\.json"
const CODE_PATH = new RegExp(
  `\`((?:(?:${ROOTS})/[A-Za-z0-9_./[\\]-]*[A-Za-z0-9_\\]/-])|(?:${ROOT_FILES}))\``,
  "g",
)
const MD_LINK = /\]\(([^)\s]+)\)/g
const PLACEHOLDER = /[*<>{}]|AAAA|nombre-skill|\.\.\.$/
const EXAMPLES = /<!--\s*check:docs ejemplos:([^>]*)-->/g

const r = reporter()

function examplesOf(content) {
  const list = [...content.matchAll(EXAMPLES)].flatMap(([, paths]) =>
    paths.trim().split(/\s+/),
  )
  return (ref) =>
    list.some((example) =>
      example.endsWith("/") ? ref.startsWith(example) : ref === example,
    )
}

const files = SOURCES.flatMap((source) =>
  !fs.existsSync(source)
    ? []
    : fs.statSync(source).isFile()
      ? [source]
      : walk(source).filter((file) => /\.(md|mdc|ya?ml)$/.test(file)),
)
  .map((file) => file.split(path.sep).join("/"))
  .filter((file) => !IGNORE.some((regex) => regex.test(file)))

let checked = 0
for (const file of files) {
  const content = fs.readFileSync(file, "utf8")
  const isExample = examplesOf(content)
  for (const match of content.matchAll(CODE_PATH)) {
    const ref = match[1]
    if (PLACEHOLDER.test(ref) || isExample(ref)) continue
    checked += 1
    if (!fs.existsSync(ref.replace(/\/$/, "")))
      r.fail(`${file}: no existe \`${ref}\``)
  }
  for (const match of content.matchAll(MD_LINK)) {
    const href = match[1]
    if (/^(https?:|mailto:|tel:|#)/.test(href) || PLACEHOLDER.test(href))
      continue
    const clean = href.split("#")[0]
    if (!clean) continue
    const target = clean.startsWith("mdc:")
      ? path.normalize(clean.slice(4))
      : path.normalize(path.join(path.dirname(file), clean))
    if (!target || target === ".") continue
    checked += 1
    if (!fs.existsSync(target)) r.fail(`${file}: enlace roto → ${href}`)
  }
}

r.ok(`${checked} referencias revisadas en ${files.length} documentos`)
r.done("referencias de la documentación válidas")
