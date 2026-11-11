# Actualizar dependencias

Las versiones del stack que ya corrieron juntas están fijadas en `package-lock.json`. No se sube el proyecto a "lo último" en el mismo cambio que otra cosa.

Un vertical nuevo puede tocar `package.json` a través de `deploy.mjs`. Después hay un solo `npm install`, y se commitea el lock. No se lanza un segundo install en paralelo: el kit insiste en uno solo, y dos a la vez rompen el árbol.

Node se queda en 22. El gestor es npm. No se cambia a pnpm: el kit instala con npm.

`npm run verify` no construye con Wix. El build de Wix es el release, en la máquina o en el workflow.
