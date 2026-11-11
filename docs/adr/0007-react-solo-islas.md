# 0007 — React solo para islas del kit

**Estado:** Aceptada

## Contexto

El visor de rich content rompe en SSR y pesa. Likes y comentarios leen estado del visitante. El resto de la página puede ser HTML de servidor con DTOs planos. React 18 está en el stack por ese contrato, no como forma de escribir la presentación.

## Decisión

La presentación nueva se escribe en `.astro`. Una isla de React se justifica cuando el componente shipped la exige (el visor en `client:only`, likes y comentarios en `client:load`) o cuando un estado de visitante no se puede resolver en el servidor.

La isla recibe los datos que el HTML ya tiene. No vuelve a pedir la primera página del CMS.

## Alternativas

- **Reescribir las islas shipped en Astro.** El kit las entrega en React y pide no reescribirlas.
- **Montar el visor en el servidor "para no partir el render".** La prueba ya separó eso porque el visor rompe en SSR.

## Consecuencias

- `check` de lint no exige React en `src/pages` ni en `src/components` de presentación.
- No se añade React a una página solo porque el proyecto ya tiene la dependencia.
