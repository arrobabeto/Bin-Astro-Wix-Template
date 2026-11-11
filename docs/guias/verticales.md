# Verticales

El template no despliega ninguno. `nuevo-sitio` pregunta cuáles hacen falta. `agregar-vertical` suma uno más tarde.

| Vertical | Cuándo                                                                  | Qué no editar                                                            |
| -------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| `cms`    | Colecciones que el dueño edita                                          | El data layer que copia `deploy.mjs`                                     |
| `blog`   | Posts. El visor de rich content va en isla y no se monta en el servidor | El comentario del archivo shipped que separa el visor de los comentarios |
| `forms`  | Formularios. No hay un segundo sistema de email en este template        | Los endpoints del vertical                                               |

Storefront, bookings, events, members y el resto existen en el kit y se agregan con la misma skill.

`deploy.mjs` instala el vertical para `--stack astro` y puede tocar `package.json`. Después hay un solo `npm install`. La guía de dependencias explica por qué no se lanza otro en paralelo.

Después de `templates.mjs`, las instrucciones del vertical quedan en la carpeta que el kit descarga y que `.gitignore` excluye. Léelas en esa sesión antes de tocar la presentación. No se commitean.

`@wix/dashboard` no se declara hasta que un vertical lo pida.
