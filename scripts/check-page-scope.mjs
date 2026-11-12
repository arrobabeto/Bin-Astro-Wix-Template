#!/usr/bin/env node
/**
 * Rejects deleting an existing page. On page/* the diff may only add that page.
 *
 * PAGE_SCOPE_BASE   commit or ref to diff against (CI sets the PR base SHA)
 * PAGE_SCOPE_BRANCH branch name (CI sets the PR head; local uses git)
 */
import { spawnSync } from "node:child_process"
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

import { reporter } from "./lib/output.mjs"

const PAGE_PREFIX = "src/pages/"
const COMPONENT_PREFIX = "src/components/pages/"
const ASSET_PREFIXES = ["public/", "src/assets/"]
const ROUTES_FILE = "src/config/routes.ts"

export function parseRoutePaths(source) {
  return [...source.matchAll(/path:\s*["']([^"']+)["']/g)].map(
    (match) => match[1],
  )
}

export function findPageScopeViolations({
  branch,
  changes,
  messages,
  routesBefore,
  routesAfter,
}) {
  const violations = []
  const text = messages.join("\n")
  const allowDelete = /^Allow-Page-Delete:/m.test(text)
  const pageEdits = new Set(
    [...text.matchAll(/^Page-Edit:\s*(\S+)/gm)].map((match) => match[1]),
  )
  const removedRoutes = routesBefore.filter(
    (route) => !routesAfter.includes(route),
  )
  if (removedRoutes.length > 0 && !allowDelete) {
    violations.push(
      `removed route ${removedRoutes.join(", ")} from ${ROUTES_FILE}`,
    )
  }

  const onPageBranch = branch.startsWith("page/")
  for (const change of changes) {
    const { status, file } = change
    const deletedPage = status === "D" && file.startsWith(PAGE_PREFIX)
    if (deletedPage && !allowDelete) {
      violations.push(`deleted ${file}`)
      continue
    }
    if (!onPageBranch) continue
    if (allowedOnPageBranch(change, pageEdits, allowDelete)) continue
    violations.push(`${status} ${file} is outside the page/* allowlist`)
  }
  return violations
}

function allowedOnPageBranch(change, pageEdits, allowDelete) {
  const { status, file } = change
  if (status === "D") return allowDelete
  if (status === "M" && file === ROUTES_FILE) return true
  if (status === "M" && file.startsWith(PAGE_PREFIX) && pageEdits.has(file))
    return true
  if (status !== "A") return false
  return (
    file.startsWith(PAGE_PREFIX) ||
    file.startsWith(COMPONENT_PREFIX) ||
    ASSET_PREFIXES.some((prefix) => file.startsWith(prefix))
  )
}

function git(args) {
  return spawnSync("git", args, { encoding: "utf8" })
}

function parseNameStatus(text) {
  const changes = []
  for (const line of text.split("\n")) {
    if (!line.trim()) continue
    const [raw, ...rest] = line.split("\t")
    if (raw.startsWith("R") || raw.startsWith("C")) {
      changes.push({ status: "D", file: rest[0] })
      changes.push({ status: "A", file: rest[1] })
    } else {
      changes.push({ status: raw[0], file: rest.join("\t") })
    }
  }
  return changes
}

function resolveBase() {
  const fromEnv = process.env.PAGE_SCOPE_BASE?.trim()
  if (fromEnv && !/^0+$/.test(fromEnv)) return fromEnv
  return null
}

function resolveBranch() {
  if (process.env.PAGE_SCOPE_BRANCH?.trim())
    return process.env.PAGE_SCOPE_BRANCH.trim()
  const result = git(["rev-parse", "--abbrev-ref", "HEAD"])
  return result.status === 0 ? result.stdout.trim() : "HEAD"
}

function collect(base, branch) {
  const diff = git(["diff", "--name-status", "--find-renames", base])
  if (diff.status !== 0) {
    return { error: (diff.stderr || "git diff failed").trim() }
  }
  const changes = parseNameStatus(diff.stdout)
  const untracked = git(["ls-files", "--others", "--exclude-standard"])
  if (untracked.status !== 0) {
    return { error: (untracked.stderr || "git ls-files failed").trim() }
  }
  for (const file of untracked.stdout.split("\n")) {
    if (file) changes.push({ status: "A", file })
  }
  const log = git(["log", "--format=%B%x1e", `${base}..HEAD`])
  const messages =
    log.status === 0
      ? log.stdout.split("\x1e").filter((part) => part.trim())
      : []
  const before = git(["show", `${base}:${ROUTES_FILE}`])
  const routesBefore = before.status === 0 ? parseRoutePaths(before.stdout) : []
  const afterPath = path.join(process.cwd(), ROUTES_FILE)
  const routesAfter = fs.existsSync(afterPath)
    ? parseRoutePaths(fs.readFileSync(afterPath, "utf8"))
    : []
  return {
    changes,
    messages,
    routesBefore,
    routesAfter,
    branch,
  }
}

const isMain =
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)

if (isMain) {
  const r = reporter()
  const branch = resolveBranch()
  const base =
    resolveBase() ?? (branch === "main" || branch === "HEAD" ? "HEAD" : "main")
  const known = git(["rev-parse", "--verify", "--quiet", base])
  if (known.status !== 0) {
    r.fail(`cannot resolve page-scope base "${base}"`)
    r.done("page scope ok")
  } else {
    const collected = collect(base, branch)
    if (collected.error) {
      r.fail(collected.error)
    } else {
      for (const violation of findPageScopeViolations(collected)) {
        r.fail(violation)
      }
    }
    r.done("page scope ok")
  }
}
