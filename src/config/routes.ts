export const routes = [
  { path: "/" },
  { path: "/legal/privacidad" },
  { path: "/legal/terminos" },
] as const

export type SiteRoute = (typeof routes)[number]

export function pageFileForRoute(path: string): string {
  if (path === "/") return "src/pages/index.astro"
  return `src/pages${path}.astro`
}
