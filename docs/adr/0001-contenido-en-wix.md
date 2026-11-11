# 0001 — El contenido de negocio vive en Wix

**Estado:** Aceptada

## Contexto

Un template hermano guarda páginas en YAML dentro de Git, con schemas y un registro de secciones. Eso encaja cuando el contenido cambia al publicar y no hay CMS. Aquí el dueño edita colecciones, posts, taxonomía y media en el dashboard de Wix, y la página tiene que leerlos en cada request.

## Decisión

Colecciones, posts, media editable y fichas se leen por el SDK, a través del código shipped en `src/wix/`. Git guarda código, `src/config/site.ts`, los textos legales y, si hace falta repetir un alta, el plan de seed en `plans/`.

## Alternativas

- **Páginas YAML con schemas, como el template sin CMS.** Empuja a cada sitio a duplicar el contenido y a parecerse a un modelo que este stack no usa.
- **Copiar el catálogo a TypeScript como fallback.** Un ítem nuevo en Wix hereda datos que el editor no ve. Lo prohíbe el ADR 0011.

## Consecuencias

- No hay content collections.
- Cambiar un título en el CMS no requiere commit ni release.
- El repositorio no trae CMS ni Blog de fábrica. Se agregan con `agregar-vertical`.
