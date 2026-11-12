import { describe, expect, it } from "vitest"

import {
  findPageScopeViolations,
  parseRoutePaths,
} from "../../scripts/check-page-scope.mjs"

const routes = ['{ path: "/" }', '{ path: "/legal/privacidad" }']

function check(overrides) {
  return findPageScopeViolations({
    branch: "feature/home",
    changes: [],
    messages: [],
    routesBefore: ["/", "/legal/privacidad"],
    routesAfter: ["/", "/legal/privacidad"],
    ...overrides,
  })
}

describe("parseRoutePaths", () => {
  it("reads path strings", () => {
    expect(parseRoutePaths(routes.join("\n"))).toEqual([
      "/",
      "/legal/privacidad",
    ])
  })
})

describe("findPageScopeViolations", () => {
  it("passes an empty diff", () => {
    expect(check({})).toEqual([])
  })

  it("rejects deleting a page", () => {
    expect(
      check({
        changes: [{ status: "D", file: "src/pages/index.astro" }],
      }),
    ).toEqual(["deleted src/pages/index.astro"])
  })

  it("allows a page deletion when the trailer is present", () => {
    expect(
      check({
        changes: [{ status: "D", file: "src/pages/index.astro" }],
        messages: ["Allow-Page-Delete: replaced the starter home\n"],
      }),
    ).toEqual([])
  })

  it("rejects a removed route", () => {
    expect(check({ routesAfter: ["/"] })).toEqual([
      "removed route /legal/privacidad from src/config/routes.ts",
    ])
  })

  it("allows a new page on page/*", () => {
    expect(
      check({
        branch: "page/promo",
        changes: [
          { status: "A", file: "src/pages/promo.astro" },
          { status: "A", file: "src/components/pages/promo/Hero.astro" },
          { status: "A", file: "public/promo/hero.webp" },
          { status: "M", file: "src/config/routes.ts" },
        ],
        routesAfter: ["/", "/legal/privacidad", "/promo"],
      }),
    ).toEqual([])
  })

  it("rejects editing another page on page/*", () => {
    expect(
      check({
        branch: "page/promo",
        changes: [{ status: "M", file: "src/pages/index.astro" }],
      }),
    ).toEqual(["M src/pages/index.astro is outside the page/* allowlist"])
  })

  it("allows the page named by Page-Edit", () => {
    expect(
      check({
        branch: "page/home",
        changes: [{ status: "M", file: "src/pages/index.astro" }],
        messages: ["Page-Edit: src/pages/index.astro\n"],
      }),
    ).toEqual([])
  })

  it("rejects a protected path on page/*", () => {
    expect(
      check({
        branch: "page/promo",
        changes: [{ status: "M", file: "src/wix/sdk.ts" }],
      }),
    ).toEqual(["M src/wix/sdk.ts is outside the page/* allowlist"])
  })

  it("allows editing an existing page on a feature branch", () => {
    expect(
      check({
        changes: [{ status: "M", file: "src/pages/index.astro" }],
      }),
    ).toEqual([])
  })
})
