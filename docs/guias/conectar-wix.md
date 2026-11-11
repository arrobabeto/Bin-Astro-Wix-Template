# Conectar Wix

Desde la raíz del proyecto:

```bash
npx @wix/cli@latest whoami
```

Si no hay sesión, `npx @wix/cli@latest login`. El CLI muestra una URL y un código. Ábrelos en el navegador. Quien automatiza el alta muestra esa URL y ese código, y espera. No lee el token al contexto.

## Sitio nuevo

La skill `nuevo-sitio` corre el setup del kit con `--stack astro` si hay verticales, o solo `init` si todavía no hay ninguno. `init` escribe `wix.config.json` y `.env.local` y no debería tocar el resto. No uses `--subfolder`: el repo es el proyecto.

No pases `--plan`. No se redacta un catálogo de mentira.

## Sitio que ya existe

No corras `init`: crearía otro sitio. La skill lee `context.mjs` del kit y sigue el paso que imprima. Si hace falta enganchar el proyecto, usa el script de attach del kit. No inventes un id de sitio si el contexto ya lo trae.

## Qué aparece

| Archivo              | Se commitea | Qué es                                                     |
| -------------------- | ----------- | ---------------------------------------------------------- |
| `wix.config.json`    | Sí          | `siteId` y `appId`. Son identificadores, no secretos.      |
| `.env.local`         | No          | Lo escribe `wix env pull`.                                 |
| `template.lock.json` | Sí          | Lo escribe `nuevo-sitio`. Si existe, esa skill se detiene. |

Después de conectar, si falta `.env.local`:

```bash
npx @wix/cli@latest env pull
```

No commitees `.env.local`, logs de seed ni la carpeta `templates/` del kit.
