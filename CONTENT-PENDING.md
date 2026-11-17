# ASTRADALE — integraciones pendientes

En el inicio, PRIVATE CLIENTS aparece solo como una descripción breve con enlace. La experiencia completa está en `/private-clients/`: presentación, capacidades, proceso y formulario. La navbar principal abre esa ruta. La guía con diez explicaciones detalladas está en `/private-clients/servicios/`; sus enlaces abren otra pestaña para conservar el estado de la página de origen.

## Paquetes y cotizador

La copia actual del repositorio no contiene los paquetes ESSENTIAL, SIGNATURE, PRIVATE DIRECTION, la calculadora BESPOKE ni un resumen de cotización. Por eso la guía no asigna servicios a esos paquetes ni publica una composición. La inclusión y cantidad deben confirmarse por escrito. No se modificaron precios ni se añadieron los importes indicados en el brief, porque no aparecen en las tarjetas o el cotizador de esta versión y no hay una matriz de alcance que permita presentarlos correctamente.

Cuando esos componentes estén presentes, se podrán añadir enlaces contextuales a sus líneas, opciones y resumen. Actualmente no hay componentes donde insertarlos.

## Recepción de solicitudes

El formulario PRIVATE CLIENTS no transmite ni almacena datos. Faltan un receptor HTTPS seguro, método/formato, protección contra spam y un aviso de privacidad real publicado. La casilla de consentimiento permanece deshabilitada. El formulario general de contacto también carece de destino y permanece bloqueado.

No se encontró fotografía automotriz propia identificable; la página usa un espacio rotulado para reemplazar por material ASTRADALE. Las cuatro cuentas externas en la guía son referencias de inspiración, no clientes ni portafolio.

## Implementación y validación

Ambas rutas usan HTML estático y funcionan con el hosting de GitHub Pages mediante archivos `index.html`; no necesitan fallback SPA ni dependencias. Los enlaces explicativos abren otra pestaña; los CTA regresan a la solicitud en `/private-clients/#private-application`, sin datos en la URL. El marcado y los destinos se verifican estáticamente. No se validó el render visual: la política del navegador bloqueó la vista previa local.
