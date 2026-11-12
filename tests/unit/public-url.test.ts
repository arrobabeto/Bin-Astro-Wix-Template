import { describe, expect, it } from "vitest"

import { resolvePublicUrl } from "../../src/lib/public-url"

describe("resolvePublicUrl", () => {
  it("uses x-wix-forwarded-url when it is http(s)", () => {
    expect(
      resolvePublicUrl({
        forwardedUrl: "https://preview.example/ruta",
        siteUrl: "https://publico.example",
        pathname: "/otra",
      }),
    ).toBe("https://preview.example/ruta")
  })

  it("accepts http", () => {
    expect(
      resolvePublicUrl({
        forwardedUrl: "http://preview.example/",
        siteUrl: "",
        pathname: "/",
      }),
    ).toBe("http://preview.example/")
  })

  it("ignores a scheme that is not http(s) and builds the public URL", () => {
    expect(
      resolvePublicUrl({
        forwardedUrl: "javascript:alert(1)",
        siteUrl: "https://publico.example/",
        pathname: "/legal/privacidad",
      }),
    ).toBe("https://publico.example/legal/privacidad")
  })

  it("does not duplicate the slash between the origin and the path", () => {
    expect(
      resolvePublicUrl({
        forwardedUrl: "   ",
        siteUrl: "https://publico.example/",
        pathname: "/legal/terminos",
      }),
    ).toBe("https://publico.example/legal/terminos")
  })

  it("adds the slash when the path does not include it", () => {
    expect(
      resolvePublicUrl({
        forwardedUrl: null,
        siteUrl: "https://publico.example",
        pathname: "aviso",
      }),
    ).toBe("https://publico.example/aviso")
  })

  it("does not emit a canonical when there is no public URL and no forwarded http(s)", () => {
    expect(
      resolvePublicUrl({
        forwardedUrl: undefined,
        siteUrl: "",
        pathname: "/",
      }),
    ).toBeNull()
  })
})
