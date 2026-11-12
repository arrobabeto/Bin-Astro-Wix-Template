#!/usr/bin/env node
/**
 * Rejects deleting an existing page. On page/* the diff may only add that
 * one slug, add its route paths, or edit the single Page-Edit target.
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
const ROUTES_FILE = "src/config/routes.ts"

export function parseRoutePaths(source) {
  return [...source.matchAll(/path:\s*["']([^"']+)["']/g)].map(
    (match) => match[1],
  )
}

function pageBranchSlug(branch) {
  const rest = branch.slice("page/".length).replace(/\/+$/, "")
  if (!rest || rest.includes("/")) return null
  return rest
}

function routeMatchesSlug(route, slug) {
  const base = `/${slug}`
  return route === base || route.startsWith(`${base}/`)
}

function isNewFileForSlug(file, slug) {
  return (
    file === `${PAGE_PREFIX}${slug}.astro` ||
    file.startsWith(`${PAGE_PREFIX}${slug}/`) ||
    file.startsWith(`${COMPONENT_PREFIX}${slug}/`) ||
    file.startsWith(`public/${slug}/`) ||
    file.startsWith(`src/assets/${slug}/`)
  )
}

function pathOnLine(line) {
  const match = line.match(/path:\s*["']([^"']+)["']/)
  return match ? match[1] : null
}

function withoutAddedSlugPathLines(source, slug, previousPaths) {
  return source
    .split("\n")
    .filter((line) => {
      const route = pathOnLine(line)
      if (!route || !routeMatchesSlug(route, slug)) return true
      return previousPaths.includes(route)
    })
    .join("\n")
}

function sameAsideFromWhitespace(left, right) {
  return left.replace(/\s+/g, "") === right.replace(/\s+/g, "")
}

export function findPageScopeViolations({
  branch,
  changes,
  messages,
  routesBefore,
  routesAfter,
  routesBeforeSource,
  routesAfterSource,
}) {
  const violations = []
  const text = messages.join("\n")
  const allowDelete = /^Allow-Page-Delete:/m.test(text)
  const pageEditLines = [...text.matchAll(/^Page-Edit:\s*(\S+)/gm)]
  const onPageBranch = branch.startsWith("page/")
  const pageEditTarget = pageEditLines.length === 1 ? pageEditLines[0][1] : null
  if (onPageBranch && pageEditLines.length > 1) {
    violations.push("more than one Page-Edit trailer")
  }

  const removedRoutes = routesBefore.filter(
    (route) => !routesAfter.includes(route),
  )
  if (removedRoutes.length > 0 && !allowDelete) {
    violations.push(
      `removed route ${removedRoutes.join(", ")} from ${ROUTES_FILE}`,
    )
  }

  const slug = onPageBranch ? pageBranchSlug(branch) : null
  if (onPageBranch && !slug) {
    violations.push(`branch ${branch} is not a single page slug`)
  }

  if (slug) {
    const addedRoutes = routesAfter.filter(
      (route) => !routesBefore.includes(route),
    )
    const outside = addedRoutes.filter(
      (route) => !routeMatchesSlug(route, slug),
    )
    if (outside.length > 0) {
      violations.push(`added route ${outside.join(", ")} is outside /${slug}`)
    }
    if (
      typeof routesBeforeSource === "string" &&
      typeof routesAfterSource === "string" &&
      !sameAsideFromWhitespace(
        routesBeforeSource,
        withoutAddedSlugPathLines(routesAfterSource, slug, routesBefore),
      )
    ) {
      violations.push(`changed ${ROUTES_FILE} beyond added path entries`)
    }
  }

  for (const change of changes) {
    const { status, file } = change
    const deletedPage = status === "D" && file.startsWith(PAGE_PREFIX)
    if (deletedPage && !allowDelete) {
      violations.push(`deleted ${file}`)
      continue
    }
    if (!onPageBranch) continue
    if (allowedOnPageBranch(change, pageEditTarget, allowDelete, slug)) continue
    violations.push(`${status} ${file} is outside the page/* allowlist`)
  }
  return violations
}

function allowedOnPageBranch(change, pageEditTarget, allowDelete, slug) {
  const { status, file } = change
  if (status === "D") return allowDelete
  if (status === "M" && file === ROUTES_FILE) return true
  if (status === "M" && file.startsWith(PAGE_PREFIX) && pageEditTarget === file)
    return true
  if (status !== "A" || !slug) return false
  return isNewFileForSlug(file, slug)
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
  const routesBeforeSource = before.status === 0 ? before.stdout : ""
  const routesBefore = parseRoutePaths(routesBeforeSource)
  const afterPath = path.join(process.cwd(), ROUTES_FILE)
  const routesAfterSource = fs.existsSync(afterPath)
    ? fs.readFileSync(afterPath, "utf8")
    : ""
  const routesAfter = parseRoutePaths(routesAfterSource)
  return {
    changes,
    messages,
    routesBefore,
    routesAfter,
    routesBeforeSource,
    routesAfterSource,
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
