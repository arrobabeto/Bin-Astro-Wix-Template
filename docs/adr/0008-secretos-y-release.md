# 0008 — Secretos y release

**Estado:** Aceptada

## Contexto

Hay dos credenciales distintas. `WIX_API_KEY` es la API key de cuenta: `wix login --api-key` en CI. `WIX_CLIENT_SECRET` es el secreto OAuth de la app del sitio: el runtime de Wix autentica visitantes. No publica, no se copia a GitHub y no entra al bundle.

`.env.local` lo escribe `wix env pull`. Contiene el secreto OAuth. No se commitea.

## Decisión

El workflow Calidad no usa secretos. El workflow Release corre en `main` solo si existe `wix.config.json`, hace login con `WIX_API_KEY`, luego `env pull`, `build` y `release`. No imprime el secreto. El repo del template no tiene ese archivo ni ese secreto, y no publica.

`wix token` se acuña por comando y no se guarda en archivo.

## Alternativas

- **Publicar a mano para siempre.** El flujo definido pone el release detrás de CI. El primer release de un sitio puede ser local; el workflow queda para el siguiente merge.
- **Meter `WIX_CLIENT_SECRET` en GitHub Actions.** No sirve para publicar y no debe salir de la máquina o del runner que lo genera.

## Consecuencias

- `.env.example` nombra las claves con valor vacío. No trae una API key de ejemplo.
- `npm run check:leakage` falla si un secreto queda asignado con valor en el árbol revisado.
