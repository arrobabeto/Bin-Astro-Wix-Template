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

  it("rejects a second new page on page/*", () => {
    expect(
      check({
        branch: "page/promo",
        changes: [
          { status: "A", file: "src/pages/promo.astro" },
          { status: "A", file: "src/pages/other.astro" },
        ],
        routesAfter: ["/", "/legal/privacidad", "/promo"],
      }),
    ).toEqual(["A src/pages/other.astro is outside the page/* allowlist"])
  })

  it("rejects two Page-Edit trailers", () => {
    expect(
      check({
        branch: "page/home",
        changes: [
          { status: "M", file: "src/pages/index.astro" },
          { status: "M", file: "src/pages/about.astro" },
        ],
        messages: [
          "Page-Edit: src/pages/index.astro\nPage-Edit: src/pages/about.astro\n",
        ],
      }),
    ).toEqual([
      "more than one Page-Edit trailer",
      "M src/pages/index.astro is outside the page/* allowlist",
      "M src/pages/about.astro is outside the page/* allowlist",
    ])
  })

  it("rejects a rewritten routes.ts that still contains the old path strings", () => {
    const before = [
      "export const routes = [",
      '  { path: "/" },',
      '  { path: "/legal/privacidad" },',
      "] as const",
      "",
    ].join("\n")
    const after = [
      "export const routes = [",
      '  { path: "/" },',
      '  { path: "/legal/privacidad" },',
      '  { path: "/promo" },',
      "] as const",
      "",
      "export async function loadRoutes() {",
      '  await fetch("/promo")',
      "}",
      "",
    ].join("\n")
    expect(
      check({
        branch: "page/promo",
        changes: [{ status: "M", file: "src/config/routes.ts" }],
        routesAfter: ["/", "/legal/privacidad", "/promo"],
        routesBeforeSource: before,
        routesAfterSource: after,
      }),
    ).toEqual(["changed src/config/routes.ts beyond added path entries"])
  })

  it("allows routes.ts when the only change is the slug path", () => {
    const before = [
      "export const routes = [",
      '  { path: "/" },',
      '  { path: "/legal/privacidad" },',
      "] as const",
      "",
    ].join("\n")
    const after = [
      "export const routes = [",
      '  { path: "/" },',
      '  { path: "/legal/privacidad" },',
      '  { path: "/promo" },',
      "] as const",
      "",
    ].join("\n")
    expect(
      check({
        branch: "page/promo",
        changes: [{ status: "M", file: "src/config/routes.ts" }],
        routesAfter: ["/", "/legal/privacidad", "/promo"],
        routesBeforeSource: before,
        routesAfterSource: after,
      }),
    ).toEqual([])
  })

  it("rejects a new route outside the page slug", () => {
    expect(
      check({
        branch: "page/promo",
        routesAfter: ["/", "/legal/privacidad", "/other"],
      }),
    ).toEqual(["added route /other is outside /promo"])
  })

  it("rejects a page branch with extra path segments", () => {
    expect(check({ branch: "page/a/b" })).toEqual([
      "branch page/a/b is not a single page slug",
    ])
  })

  it("ignores a trailing slash on the page branch", () => {
    expect(
      check({
        branch: "page/promo/",
        changes: [{ status: "A", file: "src/pages/promo.astro" }],
        routesAfter: ["/", "/legal/privacidad", "/promo"],
      }),
    ).toEqual([])
  })

  it("does not apply slug rules off page/*", () => {
    expect(
      check({
        routesAfter: ["/", "/legal/privacidad", "/other"],
        routesBeforeSource: 'export const routes = [{ path: "/" }]\n',
        routesAfterSource:
          'export const routes = [{ path: "/" }]\nexport const extra = true\n',
      }),
    ).toEqual([])
  })
})
