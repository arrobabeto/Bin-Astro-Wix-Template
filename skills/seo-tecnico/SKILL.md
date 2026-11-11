---
name: seo-tecnico
description: >-
  Revisa el SEO técnico de una página nueva o antes de publicar: metadatos del
  vertical en las fichas, BaseHead y routes.ts en las páginas propias. Úsala
  con "/seo-tecnico". No inventa una puntuación ni hace keyword research.
---

# SEO técnico

## Página de ítem shipped

Verifica que siguen `wixMetadata`, el componente `SEO.Tags` y la lectura de `x-wix-forwarded-url`, con fallback a `Astro.url.href`. No quites ese bloque: el comentario del archivo shipped lo dice. El dueño edita esos metadatos en el dashboard.

La página de tag del vertical avisa que el sitemap de Wix no lista tags. No inventes un endpoint para fusionar sitemaps. Si hay que tocar el sitemap de Wix, lee [skills/wix-docs/SKILL.md](../wix-docs/SKILL.md) en esa sesión antes de proponer código.

## Página propia

Verifica [src/components/seo/BaseHead.astro](../../src/components/seo/BaseHead.astro), una entrada en [src/config/routes.ts](../../src/config/routes.ts), y un title y una description que no sean los placeholders. La URL canónica sale de [src/lib/public-url.ts](../../src/lib/public-url.ts): `x-wix-forwarded-url` si es http(s); si no, `site.url` más la ruta; si `site.url` está vacía, no hay canonical.

`og:image` solo si `site.ogImage` tiene valor. No inventes una imagen.

El sitemap del repo lista solo `routes.ts`. No vuelca el CMS. `llms.txt` tampoco consulta el CMS en cada request.

## No hace

- No inventa una puntuación.
- No escribe un informe de Yoast ni Rank Math.
- No crea `llms-full.txt`.
- No hace keyword research.
