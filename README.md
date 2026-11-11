# BAWT

Bin Astro and Wix Template. Es un stack, no un sitio: Astro 7 en hosting de Wix, Tailwind 4 y el seam de autenticación del kit. El contenido de negocio vive en el dashboard de Wix.

Empieza por [docs/guias/empieza-aqui.md](docs/guias/empieza-aqui.md).

Repositorio: https://github.com/arrobabeto/Bin-Astro-Wix-Template

El workflow **Calidad** corre en cada pull request y no usa secretos. El workflow **Release** solo corre en `main` si el repositorio ya tiene `wix.config.json`. En este template ese archivo no está, y el job se salta: un check skipped no es un fallo. Publicar empieza en el repo del cliente, después de `nuevo-sitio`.

## Licencia

MIT. Copyright (c) 2026 arrobabeto. Ver [LICENSE](LICENSE).

El nombre BAWT no se licencia para marcar otro producto.
