# SEO

Hay dos clases de página.

**Ítem de un vertical** (un post, una ficha shipped). Trae `wixMetadata`, el componente de tags de `@wix/seo` y la URL pública leída de `x-wix-forwarded-url`. No se quita. Esos metadatos los edita el dueño en el dashboard. El sitemap de Wix no lista las páginas de tag. No se inventa un endpoint para fusionar sitemaps. Si hay que tocar el de Wix, primero se lee la doc con `wix-docs`.

**Página propia** (home, legales, un listado que el proyecto inventa). Usa `BaseHead`: title, description, canonical, Open Graph. La canonical sale de `src/lib/public-url.ts`. Si no hay URL pública, no se emite canonical y, después del alta, el check de placeholders lo señala. `og:image` solo si `site.ogImage` tiene valor.

Esas rutas se registran en `src/config/routes.ts`. El sitemap y `llms.txt` del repo listan solo esa tabla. No vuelcan el CMS.

JSON-LD de sitio solo se emite cuando el nombre y la descripción ya no son los de ejemplo.
