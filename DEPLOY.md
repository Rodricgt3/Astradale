# ASTRADALE: publicación desde GitHub Desktop

Sitio estático: HTML, CSS, imágenes y fuentes locales. Sin React, hidratación, paquetes npm, build ni servicios de Framer. Los archivos assets/interactions.js y assets/mobile.js controlan las FAQ, los controles existentes y el menú móvil. assets/mobile.css adapta los componentes originales a pantallas pequeñas. assets/private-clients.css y assets/private-clients.js contienen únicamente PRIVATE CLIENTS y su validación local. La guía estática se sirve desde private-clients/servicios/index.html; no requiere rutas SPA ni build. Las clases CSS generadas conservan su nombre para mantener el diseño; no ejecutan Framer.

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
- El formulario de contacto existente carece de destino y continúa sin enviar mensajes. PRIVATE CLIENTS valida campos solo en el navegador; no envía ni almacena solicitudes. Para habilitarlo faltan un receptor HTTPS seguro y un aviso de privacidad real.
- La captura SingleFile tenía los scripts vacíos. Se restauraron las cinco FAQ, el botón de volver al inicio y el acceso por teclado al adjunto con JavaScript local. Se añadió un menú móvil nativo reutilizando los enlaces originales. No se reconstruyen carruseles ni animaciones ausentes del original.
- La capa móvil recupera 29 bloques ocultos de la captura y adapta sus rejillas. El escritorio desde 1440 px conserva sus dimensiones originales.
- Se comprobaron 11 anchos entre 320 y 1440 px en Chrome con servidor local, además de controles en horizontal. Las cinco FAQ funcionan con clic y teclado. No se realizaron pruebas en teléfonos físicos ni Safari iOS real. VALIDATION.json recoge los resultados.
- Se sustituyeron cifras, personas, premios, testimonio, precios y direcciones de demostración por contenido descriptivo. Las fotografías y mockups siguen siendo recursos de la plantilla, no evidencia de equipo, clientes o proyectos de ASTRADALE.
- El logo completo se conserva en los metadatos sociales como recurso local. Navegación y footer usan el wordmark textual astradale.; no se alteraron contenedores para insertar el logo vertical.
