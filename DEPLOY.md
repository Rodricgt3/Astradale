# ASTRADALE: publicación desde GitHub Desktop

Sitio estático: HTML, CSS, imágenes y fuentes locales. Sin React, hidratación, paquetes npm, build ni servicios de Framer. El archivo assets/interactions.js restaura únicamente las FAQ y los controles existentes autorizados. Las clases CSS generadas conservan su nombre para mantener el diseño; no ejecutan Framer.

## GitHub Desktop

1. Abre GitHub Desktop.
2. Selecciona **File > Add local repository**.
3. Elige esta carpeta: C:\Users\lrodr\OneDrive\Documentos\github gt3\Astradale.
4. Revisa los cambios. La entrada pública es **index.html**; **assets** contiene sus recursos.
5. Escribe un resumen del cambio y pulsa **Commit to main** (o el nombre de tu rama actual).
6. Pulsa **Publish repository** si es nuevo, o **Push origin** si ya está conectado. No se ha creado un commit ni enviado nada automáticamente.

## GitHub Pages

1. Abre el repositorio en GitHub con **Repository > View on GitHub**.
2. Entra en **Settings > Pages**.
3. En **Source**, elige **Deploy from a branch**.
4. Elige tu rama publicada y la carpeta **/ (root)**.
5. Pulsa **Save**. Cuando GitHub termine, la URL aparecerá en esa pantalla.

Las rutas de recursos son relativas y admiten la subcarpeta de un repositorio de GitHub Pages. No es necesario instalar Node ni ejecutar comandos para publicar.

## Archivos conservados

- El HTML de AgencyIO queda como copia fuente y no es la entrada del sitio.
- LOGO.png es el original sin cambios.
- favicon.png es un recorte técnico del isotipo original, con sus proporciones conservadas.
- Los estilos fueron extraídos manteniendo orden, reglas, breakpoints, fuentes y keyframes.
- Las imágenes y fuentes extraídas se verificaron mediante SHA-256.

## Información pendiente y límites

- Confirmar correo, teléfono, dominio y perfiles sociales reales. Los enlaces sociales apuntan a Contacto para no enviar visitas a terceros.
- El formulario carece de destino y la captura ya bloqueaba envíos mediante CSP. No envía mensajes.
- La captura SingleFile tenía los scripts vacíos. Se restauraron las cinco FAQ, el botón de volver al inicio y el acceso por teclado al adjunto con JavaScript local. No se reconstruyen los menús, carruseles ni animaciones ausentes del original.
- No se garantiza la equivalencia visual responsive sin revisar en navegador. Solo se conservan las variantes que existen en el archivo guardado.
- La versión es-MX se comprobó mediante servidor local en Chrome a 1440, 1024 y 390 px. Las cinco FAQ funcionan con clic y teclado. VALIDATION.json recoge los resultados y las limitaciones de la captura.
- Se sustituyeron cifras, personas, premios, testimonio, precios y direcciones de demostración por contenido descriptivo. Las fotografías y mockups siguen siendo recursos de la plantilla, no evidencia de equipo, clientes o proyectos de ASTRADALE.
- El logo completo se conserva en los metadatos sociales como recurso local. Navegación y footer usan el wordmark textual astradale.; no se alteraron contenedores para insertar el logo vertical.
