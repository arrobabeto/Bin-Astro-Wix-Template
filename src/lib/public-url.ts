const HTTP_URL = /^https?:\/\//i

export function resolvePublicUrl(input: {
  forwardedUrl?: string | null
  siteUrl: string
  pathname: string
}): string | null {
  const forwarded = input.forwardedUrl?.trim() ?? ""
  if (HTTP_URL.test(forwarded)) return forwarded

  const base = input.siteUrl.trim().replace(/\/$/, "")
  if (!base) return null

  const pathname = input.pathname.startsWith("/")
    ? input.pathname
    : `/${input.pathname}`
  return `${base}${pathname}`
}
