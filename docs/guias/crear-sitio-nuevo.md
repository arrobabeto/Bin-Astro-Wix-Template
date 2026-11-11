# Crear un sitio nuevo

1. En GitHub, usa **Use this template** sobre el repositorio del template, o clona y crea el repo del cliente. El remoto de BAWT es https://github.com/arrobabeto/Bin-Astro-Wix-Template
2. Node 22 (`nvm use`). El piso es 22.12.
3. `npm install`
4. `npm run setup`
5. Abre el proyecto en Cursor.
6. Pide `nuevo-sitio`.

Ten a mano el nombre del negocio, una descripción de una línea, si el sitio Wix ya existe o hay que crearlo, qué verticales hacen falta (puede ser ninguno), el email de contacto y, si ya se conoce, la URL pública. Si hay Figma, el diseño va después, no en el alta.

`setup` no crea el sitio de Wix. Comprueba Node, que las skills de Wix vinieron en el clone, sincroniza los tipos y deja el hook de git. El alta la hace la skill, porque pide el nombre y los verticales.

En `main` del repo del cliente, exige el check **Calidad** en el pull request. **Release** no se exige en el PR: no corre ahí. Sin `wix.config.json`, Release se salta.

El trabajo va en `feature/*`, `fix/*` o `contenido/*`. El hook impide el commit directo a `main`.
