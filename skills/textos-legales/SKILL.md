---
name: textos-legales
description: >-
  Redacta privacidad y términos con los datos reales del responsable y quita el
  marcador de ejemplo. Úsala con "/textos-legales". Para México lee la referencia
  del repo; para otro país no redacta artículos de memoria.
---

# Textos legales

Privacidad y términos viven en el repositorio, no en el CMS. Es la excepción explícita: el dueño no los edita en el dashboard.

## Pregunta

- Razón social.
- Domicilio.
- Email.
- Qué datos recoge el sitio. En la v1, si no hay analytics ni formulario, la lista es corta: lo que el hosting y el CMS registran. No inventes cookies de marketing.

## Hace

1. Escribe [src/content/legal/privacidad.md](../../src/content/legal/privacidad.md) y [src/content/legal/terminos.md](../../src/content/legal/terminos.md).
2. Quita el marcador `bawt:legal-pendiente`.
3. Para México, lee [references/mexico.md](references/mexico.md) y abre el texto vigente antes de citar artículos. Si encontraste una reforma, actualiza la referencia en el mismo cambio.
4. Para otro país no redactes artículos de ley de memoria. Pregunta o deja un hueco marcado que el check sigue viendo.

El contacto de `/.well-known/security.txt` sale de [src/config/site.ts](../../src/config/site.ts). Si el email sigue siendo el de ejemplo, el check de placeholders falla cuando ya existe `template.lock.json`.

## No hace

- No agrega un banner de cookies. No hay medición. El ADR 0010 lo prohíbe hasta que exista un tracker, y el banner nace en el mismo cambio que el tracker.
