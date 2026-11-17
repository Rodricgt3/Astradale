# ASTRADALE — integraciones pendientes

PRIVATE CLIENTS cuenta con una guía estática de diez explicaciones en `/private-clients/servicios/`, con índice, entregables, proceso, límites y CTA de regreso a la solicitud. Los enlaces contextuales abren una pestaña nueva para preservar el estado de la página de origen.

## Paquetes y cotizador

La copia actual del repositorio no contiene los paquetes ESSENTIAL, SIGNATURE, PRIVATE DIRECTION, la calculadora BESPOKE ni un resumen de cotización. Por eso la guía no asigna servicios a esos paquetes ni publica una composición. La inclusión y cantidad deben confirmarse por escrito. No se modificaron precios ni se añadieron los importes indicados en el brief, porque no aparecen en las tarjetas o el cotizador de esta versión y no hay una matriz de alcance que permita presentarlos correctamente.

Cuando esos componentes estén presentes, se podrán añadir enlaces contextuales a sus líneas, opciones y resumen. Actualmente no hay componentes donde insertarlos.

## Recepción de solicitudes

El formulario PRIVATE CLIENTS no transmite ni almacena datos. Faltan un receptor HTTPS seguro, método/formato, protección contra spam y un aviso de privacidad real publicado. La casilla de consentimiento permanece deshabilitada. El formulario general de contacto también carece de destino y permanece bloqueado.

No se encontró fotografía automotriz propia identificable; la sección usa un espacio rotulado para reemplazar por material ASTRADALE. Las cuatro cuentas externas se muestran solo como inspiración; no se presentan como clientes ni portafolio.

## Implementación y validación

La ruta usa `private-clients/servicios/index.html`, compatible con hosting estático de GitHub Pages y sin fallback SPA ni dependencias. Los enlaces de conceptos abren otra pestaña; los CTA regresan a `#private-application` sin añadir datos a la URL. El marcado y los destinos se verifican estáticamente. No se validó el render visual: la política del navegador bloqueó la vista previa local.
