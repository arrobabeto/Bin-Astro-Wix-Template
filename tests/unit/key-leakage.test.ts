import { describe, expect, it } from "vitest"

import { leakageFindings } from "../../scripts/check-key-leakage.mjs"

const workflow = ".github/workflows/release.yml"
const guide = "docs/guides/environment.md"
const pinned = "skills/wix-headless-kit/install/setup.mjs"
const src = "src/wix/config.ts"

describe("leakageFindings", () => {
  it("allows an empty WIX_API_KEY and a GitHub secret reference", () => {
    expect(leakageFindings(workflow, "WIX_API_KEY=")).toEqual([])
    expect(leakageFindings(workflow, 'WIX_API_KEY: ""')).toEqual([])
    expect(leakageFindings(workflow, "WIX_API_KEY: ''")).toEqual([])
    expect(
      leakageFindings(workflow, "WIX_API_KEY: ${{ secrets.WIX_API_KEY }}"),
    ).toEqual([])
    expect(
      leakageFindings(workflow, 'WIX_API_KEY: "${{ secrets.WIX_API_KEY }}"'),
    ).toEqual([])
  })

  it("rejects a pasted WIX_API_KEY", () => {
    expect(leakageFindings(workflow, "WIX_API_KEY=abc")).toEqual([
      "WIX_API_KEY has a value",
    ])
    expect(leakageFindings(workflow, 'WIX_API_KEY: "abc"')).toEqual([
      "WIX_API_KEY has a value",
    ])
    expect(leakageFindings(guide, "WIX_API_KEY=abc")).toEqual([
      "WIX_API_KEY has a value",
    ])
  })

  it("allows naming WIX_API_KEY in the environment guide", () => {
    expect(
      leakageFindings(
        guide,
        "| `WIX_API_KEY` | GitHub Secrets of the client repo |",
      ),
    ).toEqual([])
    expect(leakageFindings(guide, "BEGIN PRIVATE KEY")).toEqual([])
  })

  it("keeps the pinned-skill exception for client secret assignments", () => {
    const line = 'WIX_CLIENT_SECRET="set-at-release"'
    expect(leakageFindings(pinned, line)).toEqual([])
    expect(leakageFindings(src, line)).toEqual([
      "WIX_CLIENT_SECRET has a value",
    ])
  })

  it("still flags an empty-exempt client key only when it has a value", () => {
    expect(leakageFindings(src, "WIX_CLIENT_PUBLIC_KEY=")).toEqual([])
    expect(leakageFindings(src, 'WIX_CLIENT_SECRET=""')).toEqual([])
    expect(leakageFindings(src, 'WIX_CLIENT_PUBLIC_KEY="not-empty"')).toEqual([
      "WIX_CLIENT_PUBLIC_KEY has a value",
    ])
  })

  it("still flags key material outside the guide", () => {
    expect(leakageFindings(src, "BEGIN PRIVATE KEY")).toEqual([
      "found BEGIN PRIVATE KEY",
    ])
    expect(leakageFindings(src, "sk_live_example")).toEqual(["found sk_live"])
    expect(leakageFindings(src, "AKIAEXAMPLE")).toEqual(["found AKIA"])
    expect(
      leakageFindings("docs/adr/0008-secrets-and-release.md", "AKIA"),
    ).toEqual(["found AKIA"])
  })
})
