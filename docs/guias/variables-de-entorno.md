# Variables de entorno

`wix env pull` escribe `.env.local`. Ese archivo no se commitea. `.env.example` sí, y sus valores van vacíos.

| Clave                    | Dónde                               | Secreta                                               | Para qué                                                                                   |
| ------------------------ | ----------------------------------- | ----------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `WIX_CLIENT_ID`          | `.env.local`                        | No. Es un id público                                  | En este stack no se usa: la auth es ambiental y el config commiteado queda en null         |
| `WIX_CLIENT_INSTANCE_ID` | `.env.local`                        | No                                                    | Identificador que escribe el CLI                                                           |
| `WIX_CLIENT_PUBLIC_KEY`  | `.env.local`                        | Trátala como material de la app. No la copies al repo | La escribe el CLI. El check falla si queda asignada con valor en el árbol revisado         |
| `WIX_CLIENT_SECRET`      | `.env.local`                        | Sí                                                    | Secreto OAuth del sitio. No publica. No entra a GitHub ni al bundle                        |
| `WIX_CLOUD_PROVIDER`     | `.env.local`                        | No                                                    | La escribe el CLI                                                                          |
| `WIX_API_KEY`            | GitHub Secrets del repo del cliente | Sí                                                    | `wix login --api-key` en el workflow Release. No vive en `.env.example` ni en `.env.local` |

El check de fugas permite nombrar estas claves. No permite un valor pegado. También falla si aparecen material de llave privada, una clave de pago que empiece por `sk_live` o un prefijo `AKIA`. Esta frase es la mención documental de esas cadenas: no pegues un ejemplo real.

`wix token` se acuña por comando. No se guarda en el proyecto ni en `/tmp`.

`astro check` y `astro sync` cargan la integración de Wix, y esa integración no arranca si la variable no existe en el entorno. El script de typecheck y `npm run setup` la ponen vacía cuando no está definida. No es un client id de prueba y no se escribe en un archivo. El valor de `src/wix/config.ts` sigue en null.
