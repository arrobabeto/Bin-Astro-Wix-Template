# 0011 — Prohibido el catálogo paralelo

<!-- check:docs ejemplos: src/data/ -->

**Estado:** Aceptada

## Contexto

En una prueba anterior, un archivo de ciudades rellenaba región, color y copy cuando al CMS le faltaba un campo. Un ítem nuevo en Wix heredaba datos de un archivo que el editor no ve. El CMS dejaba de ser la fuente.

## Decisión

Un array de ítems en el repo que rellene huecos del CMS es un defecto, no un fallback. El estado vacío y el estado de error se diseñan en la página. `npm run check:parallel-catalog` falla si un archivo bajo `src/data/` o `src/lib/` exporta un array de objetos e importa `src/wix/`.

## Alternativas

- **Fallback local "por si la API falla".** Esconde el fallo y publica datos que nadie editó.
- **Duplicar los ítems en el componente para no depender de la red.** El mismo problema, más difícil de ver.

## Consecuencias

- No se crea `src/data/` en el template.
- La presentación no importa las funciones de escritura del CMS.
- Una operación que el data layer no tiene se agrega en un archivo nuevo, después de leer el shipped y la doc.
