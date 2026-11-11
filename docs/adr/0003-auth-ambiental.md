# 0003 — Auth ambiental y checkOrigin en false

**Estado:** Aceptada

## Contexto

En Astro gestionado por Wix, `@wix/astro` autentica las llamadas del SDK en el servidor y en las islas. El kit fija `WIX_CLIENT_ID` en `null` y `security.checkOrigin` en `false`. No es un hallazgo abierto: es el contrato del stack.

Con Origin desactivado, un formulario propio que confíe en la cabecera `Origin` no es un control CSRF. Este template no trae endpoints POST propios. Si hace falta un formulario, entra por el vertical Forms del kit.

## Decisión

`src/wix/config.ts` se commitea con `WIX_CLIENT_ID` y `WIX_MEMBERS_CLIENT_ID` en `null`. Nadie los cambia a un string a mano. `astro.config.mjs` deja `checkOrigin: false`. No se añade un middleware que compense con una lista de orígenes inventada.

`src/wix/sdk.ts` es el seam del kit. Se copia y no se reformatea. El modo manual (OAuth y `localStorage`) sigue en el archivo porque es el mismo seam; en este stack no se activa.

## Cabeceras observadas

Esta pasada no capturó las cabeceras de `wix preview` ni de un sitio publicado. No se inventan valores de CSP, `Referrer-Policy` ni el resto. Cuando haya una captura real, se anota aquí como hecho observado.

`src/pages/.well-known/security.txt.ts` publica el contacto de `src/config/site.ts`. Mientras ese contacto sea el de ejemplo, el check de placeholders falla después del alta.

## Alternativas

- **Cliente OAuth manual en el navegador.** Sirve para otro stack. Este proyecto ya es Astro gestionado.
- **Activar checkOrigin "para cerrar el hallazgo".** Rompe el contrato del kit.

## Consecuencias

- `image.domains` solo incluye `static.wixstatic.com`. Ampliarla es un cambio consciente.
- El secreto OAuth del sitio no se usa para publicar y no entra a GitHub. Ver el ADR 0008.
