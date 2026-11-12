import { existsSync, mkdtempSync, mkdirSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import path from "node:path"
import { describe, expect, it } from "vitest"

import { pageFileForRoute, routes } from "../../src/config/routes"
import { findParallelCatalog } from "../../scripts/check-parallel-catalog.mjs"

describe("routes", () => {
  it("each registered route has a page", () => {
    for (const route of routes) {
      expect(existsSync(pageFileForRoute(route.path)), route.path).toBe(true)
    }
  })
})

describe("findParallelCatalog", () => {
  it("detects an object array that imports the data layer", () => {
    const root = mkdtempSync(path.join(tmpdir(), "bawt-catalog-"))
    const dir = path.join(root, "src/lib")
    mkdirSync(dir, { recursive: true })
    writeFileSync(
      path.join(dir, "cities.ts"),
      `import { queryItems } from "../wix/cms/items"

export const cities = [
  { name: "Ejemplo", region: "Ninguna" },
]
`,
    )
    expect(findParallelCatalog(root)).toEqual(["src/lib/cities.ts"])
  })

  it("allows an array that does not import Wix", () => {
    const root = mkdtempSync(path.join(tmpdir(), "bawt-catalog-"))
    const dir = path.join(root, "src/lib")
    mkdirSync(dir, { recursive: true })
    writeFileSync(
      path.join(dir, "notes.ts"),
      `export const notes = [{ id: "a" }]
`,
    )
    expect(findParallelCatalog(root)).toEqual([])
  })
})
