# Contenido

El dueño edita colecciones, posts, taxonomía y media en el dashboard de Wix. Cambiar un título no requiere commit ni release: la página lo lee en runtime.

El desarrollador no copia esos ítems a una carpeta de datos del repo ni los pega en el componente para que la página no dependa de la red. Si falta un campo, se diseña el estado vacío o el de error. No se rellena desde un array del repo.

Un seed es legítimo cuando alguien aporta o describe contenido real: un JSON, un CSV, una lista, textos, fotos. La skill `sembrar-contenido` lo escribe en `plans/` y corre el script del vertical. Si el encargo es inventar ejemplos, la skill se niega.

Los textos legales sí viven en Git, en `src/content/legal/`. El nombre del sitio, el locale, la descripción, la URL, el email y la imagen social viven en `src/config/site.ts`.
