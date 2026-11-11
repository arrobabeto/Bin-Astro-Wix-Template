# 0005 — Un stack, no un diseño

**Estado:** Aceptada

## Contexto

Un template que trae paleta, tipografía y secciones de muestra enseña un sitio, no una forma de trabajar. El próximo proyecto copiaría esa identidad. El diseño de cada cliente está en Figma y entra por el plugin de Cursor.

## Decisión

La portada de arranque es `src/pages/index.astro` con el marcador `bawt:demo`. `npm run demo:clear` la deja en un home que sigue compilando y muestra `site.name`. No hay secciones de muestra, ni paleta de un proyecto anterior, ni un sistema de diseño propio del template.

`src/styles/global.css` trae tokens neutros de trabajo. `check:placeholders` no exige cambiarlos: un sitio puede ser neutro. La skill `construir-desde-figma` sí exige que los tokens salgan del archivo si el diseño trae color.

## Alternativas

- **Ocho tipos de sección de ejemplo.** Obligan a mantener un registro que este stack no necesita, porque el contenido no vive en Git.
- **Un lector REST de Figma dentro del repo.** Duplica el plugin y pide un token. El flujo aprobado es el plugin de Figma en Cursor.

## Consecuencias

- Después de `template.lock.json`, el marcador de demo, el nombre de ejemplo y los legales de ejemplo hacen fallar `check:placeholders`.
- No hay header ni footer diseñados en el template.
