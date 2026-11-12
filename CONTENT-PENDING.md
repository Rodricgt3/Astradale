# ASTRADALE — estado de integración

La localización es-MX está aplicada en index.html. Las cinco FAQ tienen respuestas en español y funcionan con clic, Enter y barra espaciadora en escritorio, tablet y móvil. No hay respuestas pendientes de insertar.

## Conexión del formulario

Falta proporcionar la URL HTTPS real del receptor (proveedor de formularios o API propia), el método y formato que acepta, y la configuración de autenticación si corresponde. No se debe insertar una clave secreta en JavaScript público.

Los campos existentes son Name, Email, Message y Attachment (opcional). Antes de activar el envío hay que mapearlos al proveedor, definir POST y multipart/form-data si acepta adjuntos, permitir el receptor exacto en la CSP y retirar el bloqueo de envío de assets/interactions.js y aria-disabled del botón. No se creó un endpoint, no hay backend y no se simula una respuesta exitosa.

La página muestra Formulario sin conexión y El envío aún no está disponible. El adjunto abre el selector local; seleccionar un archivo no lo transmite.

## Límites heredados

La captura no incluye todas las variantes móviles de navegación, servicios y otras secciones. Sus reglas responsive se conservan porque reconstruirlas modificaría la UX/UI. Únicamente se recuperó la variante existente de las FAQ, que ya usa medidas fluidas. Se revisaron 1440, 1024 y 390 px: no se detectaron nuevos desbordamientos de texto frente a la captura. Persisten las medidas y recortes propios del wordmark y titulares originales.

No se reconstruyeron animaciones de Framer ni estados de hover de imágenes. Las imágenes y el logo original no se tradujeron ni modificaron. El archivo HTML histórico de AgencyIO se conserva como fuente, separado de la entrada publicada index.html.

Siguen pendientes los datos reales de correo, teléfono, dominio y perfiles sociales. Los enlaces de contacto existentes conservan sus destinos y etiquetas en español.

VALIDATION.json contiene el resultado de las comprobaciones.
