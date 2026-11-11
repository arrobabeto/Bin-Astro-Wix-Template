import { describe, expect, it } from "vitest"

import { resolvePublicUrl } from "../../src/lib/public-url"

describe("resolvePublicUrl", () => {
  it("usa x-wix-forwarded-url cuando es http(s)", () => {
    expect(
      resolvePublicUrl({
        forwardedUrl: "https://preview.example/ruta",
        siteUrl: "https://publico.example",
        pathname: "/otra",
      }),
    ).toBe("https://preview.example/ruta")
  })

  it("acepta http", () => {
    expect(
      resolvePublicUrl({
        forwardedUrl: "http://preview.example/",
        siteUrl: "",
        pathname: "/",
      }),
    ).toBe("http://preview.example/")
  })

  it("ignora un esquema que no es http(s) y arma la URL pública", () => {
    expect(
      resolvePublicUrl({
        forwardedUrl: "javascript:alert(1)",
        siteUrl: "https://publico.example/",
        pathname: "/legal/privacidad",
      }),
    ).toBe("https://publico.example/legal/privacidad")
  })

  it("no duplica la barra entre el origen y la ruta", () => {
    expect(
      resolvePublicUrl({
        forwardedUrl: "   ",
        siteUrl: "https://publico.example/",
        pathname: "/legal/terminos",
      }),
    ).toBe("https://publico.example/legal/terminos")
  })

  it("agrega la barra si la ruta no la trae", () => {
    expect(
      resolvePublicUrl({
        forwardedUrl: null,
        siteUrl: "https://publico.example",
        pathname: "aviso",
      }),
    ).toBe("https://publico.example/aviso")
  })

  it("no emite canonical si no hay URL pública ni forwarded http(s)", () => {
    expect(
      resolvePublicUrl({
        forwardedUrl: undefined,
        siteUrl: "",
        pathname: "/",
      }),
    ).toBeNull()
  })
})
