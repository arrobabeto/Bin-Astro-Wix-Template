# Diseñar desde Figma

El diseño está en Figma. Figma no despliega. El agente lo implementa con el plugin de Figma en Cursor y la skill `construir-desde-figma`.

Una página por `node-id`. Los assets se descargan al repo. No se dejan URLs temporales de Figma. No se maqueta con posición absoluta.

Los tokens van a `src/styles/global.css`. Si el archivo trae color, no se dejan los neutros de arranque.

Los datos que el diseño muestra y que son de negocio salen de los DTOs del vertical, no de strings fijos, en cuanto el vertical existe. Si todavía no está, primero `agregar-vertical`. No se maquetan fichas con datos falsos.

Imágenes: texto alternativo, nombre en minúsculas y con guiones, y peso dentro del presupuesto del check de assets (raster de más de 500 KB, SVG de más de 200 KB).

Al cerrar el home, `npm run demo:clear` quita el marcador de arranque.

Si el plugin de Figma no está, se para y se piden capturas y assets. No hay token de la API de Figma en `.env.example`.
