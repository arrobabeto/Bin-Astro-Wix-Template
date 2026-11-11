# 0012 — Fuentes propias

**Estado:** Aceptada

## Contexto

Una hoja de Google Fonts avisa a un tercero en cada visita y bloquea el render. En la prueba eso era decisión de diseño de aquel sitio, no del stack. El template no puede heredar esa URL.

## Decisión

El CSS de arranque no importa ninguna URL externa. Cuando un proyecto necesite fuentes, entran con `@fontsource` o con archivos en el repo, decididas por el diseño, no por el template. `npm run check:google-fonts` falla si `fonts.googleapis.com` o `fonts.gstatic.com` aparecen en `src/` o `public/`.

## Alternativas

- **Dejar la hoja de Google "hasta que el diseño traiga las suyas".** El template publicaría el aviso a un tercero el día del clon.
- **Declarar `@fontsource` en el template vacío.** Elige una familia que el diseño todavía no pidió.

## Consecuencias

- El home usa la pila del sistema.
- `@fontsource` no está en las dependencias de la v1. Entra en el proyecto cuando el diseño trae una fuente.
