## Qué cambia

<!-- Presentación, una colección de Wix, o las dos. -->

## Cómo se probó

- [ ] `npm run verify` pasa en local (o el check Calidad está en verde).

## Publicar

- [ ] Hay que publicar: merge a `main` (o `wix release` local).
- [ ] No hay que publicar: el cambio no se ve en el sitio, o el repo todavía no tiene `wix.config.json`.

El workflow Release no corre en el pull request. En el repositorio del template, sin `wix.config.json`, el job se salta.
