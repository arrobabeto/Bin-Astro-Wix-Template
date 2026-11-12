#!/usr/bin/env node
/**
 * Skills in skills/, agent symlinks, inventory, and the hash of the Wix ones.
 * Usage: node scripts/check-skills.mjs
 *        node scripts/check-skills.mjs --update-lock
 */
import { createHash } from "node:crypto"
import fs from "node:fs"
import path from "node:path"

import { reporter, walk } from "./lib/output.mjs"

const SKILLS_DIR = "skills"
const LINKS = [
  ".agents/skills",
  ".cursor/skills",
  ".claude/skills",
  ".codex/skills",
]
const INVENTORY = "skills/INVENTORY.md"
const LOCK = "skills-lock.json"
const PINNED = ["wix-headless-kit", "wix-docs", "wix-manage"]
const FICHA_FIELDS = [
  "Invocation",
  "Purpose",
  "Use cases",
  "When not to use it",
  "Inputs",
  "Outputs",
  "Requirements",
  "Origin",
  "Status",
]

const r = reporter()

export function skillHash(dir) {
  const lines = walk(dir)
    .map((file) => file.split(path.sep).join("/"))
    .filter((file) => !file.split("/").includes("templates"))
    .filter((file) => !/(^|\/)(LICENSE|\.DS_Store)$/.test(file))
    .map((file) => path.relative(dir, file).split(path.sep).join("/"))
    .sort()
    .map((rel) => {
      const hash = createHash("sha256")
        .update(fs.readFileSync(path.join(dir, rel)))
        .digest("hex")
      return `${hash}  ${rel}`
    })
  return createHash("sha256").update(lines.join("\n")).digest("hex")
}

function frontmatter(text) {
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!match) return null
  const data = {}
  let key = null
  let folding = false
  for (const line of match[1].split("\n")) {
    if (folding) {
      if (/^\s+\S/.test(line)) {
        data[key] = `${data[key]} ${line.trim()}`.trim()
        continue
      }
      folding = false
    }
    const field = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/)
    if (!field) continue
    key = field[1]
    const value = field[2].trim()
    if (value === ">-" || value === ">" || value === "|") {
      data[key] = ""
      folding = true
    } else {
      data[key] = value.replace(/^["']|["']$/g, "")
    }
  }
  return data
}

for (const link of LINKS) {
  let target = null
  try {
    target = fs.readlinkSync(link)
  } catch {
    target = null
  }
  if (target === "../skills") r.ok(`${link} → ../skills`)
  else {
    r.fail(
      `${link} must be a symlink to ../skills` +
        (fs.existsSync(link)
          ? " (on Windows: git config core.symlinks true, then clone again)"
          : ""),
    )
  }
}

const skills = fs
  .readdirSync(SKILLS_DIR, { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && !/^[_.]/.test(entry.name))
  .map((entry) => entry.name)
  .sort()

for (const name of skills) {
  const file = path.join(SKILLS_DIR, name, "SKILL.md")
  if (!fs.existsSync(file)) {
    r.fail(`${name}: missing SKILL.md`)
    continue
  }
  const meta = frontmatter(fs.readFileSync(file, "utf8"))
  if (!meta) r.fail(`${file}: missing frontmatter (--- name / description ---)`)
  else {
    if (meta.name !== name)
      r.fail(`${file}: name "${meta.name}" must be "${name}"`)
    if (!meta.description || meta.description.trim().length < 40) {
      r.fail(`${file}: description empty or too short`)
    }
  }
}

if (!fs.existsSync(INVENTORY)) r.fail(`missing ${INVENTORY}`)
else {
  const inventory = fs.readFileSync(INVENTORY, "utf8")
  const fichas = new Map()
  for (const block of inventory.split(/^### /m).slice(1)) {
    const name = block.split("\n")[0].match(/`([^`]+)`/)?.[1]
    if (name) fichas.set(name, block)
  }
  const tableRows = new Set(
    [...inventory.matchAll(/^\|\s*`([a-z0-9-]+)`/gm)].map((match) => match[1]),
  )
  for (const name of skills) {
    if (!tableRows.has(name))
      r.fail(`${INVENTORY}: missing summary row for \`${name}\``)
    const ficha = fichas.get(name)
    if (!ficha) {
      r.fail(`${INVENTORY}: missing entry "### \`${name}\`"`)
      continue
    }
    const missing = FICHA_FIELDS.filter(
      (field) => !ficha.includes(`**${field}:**`),
    )
    if (missing.length > 0)
      r.fail(`${INVENTORY} › ${name}: missing ${missing.join(", ")}`)
  }
  for (const name of new Set([...fichas.keys(), ...tableRows])) {
    if (!skills.includes(name))
      r.fail(`${INVENTORY}: \`${name}\` does not exist in skills/`)
  }
  r.ok(`${skills.length} skills with an inventory entry`)
}

if (!fs.existsSync(LOCK)) r.fail(`missing ${LOCK}`)
else {
  const lock = JSON.parse(fs.readFileSync(LOCK, "utf8"))
  const update = process.argv.includes("--update-lock")
  for (const name of PINNED) {
    const entry = lock.skills?.[name]
    const dir = path.join(SKILLS_DIR, name)
    if (!entry) {
      r.fail(`${LOCK}: missing ${name}`)
      continue
    }
    if (!fs.existsSync(dir)) {
      r.fail(`${LOCK}: ${name} does not exist in skills/`)
      continue
    }
    const hash = skillHash(dir)
    if (update) entry.computedHash = hash
    else if (hash !== entry.computedHash) {
      r.fail(
        `${name}: content does not match ${LOCK} (do not edit Wix skills; if you updated one, run node scripts/check-skills.mjs --update-lock)`,
      )
    } else r.ok(`${name}: hash matches ${LOCK}`)
  }
  if (update) {
    fs.writeFileSync(LOCK, `${JSON.stringify(lock, null, 2)}\n`)
    r.ok(`${LOCK} updated`)
  }
}

r.done("skills ok")
