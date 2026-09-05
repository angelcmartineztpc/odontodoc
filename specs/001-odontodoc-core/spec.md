# Feature Specification: OdontoDoc Core Clinical Workflow

**Feature Branch**: `001-odontodoc-core`

**Created**: 2026-09-05

**Status**: Ready for Planning

**Input**: User description: "Herramienta digital de apoyo clínico para estudiantes y docentes de la Licenciatura en Cirujano Dentista (UJAT), orientada a agilizar la captura de expedientes, fotografías médicas y notas de evolución desde dispositivos móviles directamente en el área de clínica o consultorio, garantizando la generación fidedigna de los formatos impresos institucionales."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Ficha de Identificación y Datos Generales (Priority: P1)

Como estudiante o docente de Odontología de la UJAT en el sillón dental, quiero registrar los datos de identificación del paciente y del alumno en un formulario móvil ágil para que queden vinculados de forma unívoca a todo el expediente clínico.

**Why this priority**: Es la base informativa mandatoria de cualquier expediente clínico; sin identificación no es posible emitir ningún documento institucional oficial.

**Independent Test**: Puede probarse de forma independiente completando el formulario de identificación y comprobando que los datos persisten en el estado y se reflejan en el membrete de las hojas clínicas.

**Acceptance Scenarios**:

1. **Given** que el usuario abre la aplicación en el dispositivo móvil, **When** accede a la sección "Ficha de Identificación", **Then** los campos de paciente (nombre, edad, sexo, domicilio, teléfono) y de alumno/operador (nombre, semestre, matrícula, docente supervisor) están visibles y editables con teclado táctil optimizado.
2. **Given** que el usuario ingresa los datos y pulsa "Guardar", **When** se valida la captura, **Then** los datos quedan registrados en el expediente activo y se reflejan inmediatamente en la previsualización documental sin requerir recargar.

---

### User Story 2 - Captura Fotográfica Extraoral e Intraoral con Compresión (Priority: P1)

Como operador clínico en el sillón dental, quiero capturar con la cámara de mi smartphone la fotografía extraoral (frente/sonrisa) y las 5 tomas intraorales estándar, con compresión automática en el dispositivo, para documentar gráficamente el estado del paciente sin agotar la memoria del teléfono ni generar archivos pesados.

**Why this priority**: La documentación visual es crítica para el diagnóstico y el seguimiento médico-legal. Además, previene fallos por Out-Of-Memory en smartphones durante la atención clínica.

**Independent Test**: Puede probarse abriendo el disparador de cámara, tomando una foto de alta resolución y verificando que la imagen se comprime a máx 1000px de ancho y formato JPEG 0.8 en memoria.

**Acceptance Scenarios**:

1. **Given** que el usuario está en el módulo de fotografía extraoral o intraoral, **When** pulsa el botón de captura de una toma, **Then** el sistema invoca de forma directa la cámara trasera nativa del dispositivo (`<input type="file" accept="image/*" capture="environment">`).
2. **Given** que la cámara entrega una imagen de alta resolución (ej. 12MP-48MP), **When** el sistema la recibe, **Then** la imagen es procesada en memoria mediante un canvas antes de ingresar al estado, reduciendo su dimensión máxima a 1000px y comprimiendo a JPEG calidad 0.8 en Base64.
3. **Given** la captura de las 5 tomas intraorales (frontal, oclusal superior, oclusal inferior, lateral derecha, lateral izquierda), **When** se completan las tomas, **Then** cada imagen queda asignada a su cuadrante/proyección respectiva y visible en la galería de previsualización.

---

### User Story 3 - Diagnóstico, Odontograma y Plan de Tratamiento (Priority: P2)

Como alumno/docente, quiero registrar el diagnóstico integral (dental, pulpar, periodontal, oclusal) y desglosar el plan de tratamiento por fases prioritarias para estructurar la intervención del paciente.

**Why this priority**: Permite estructurar la ruta clínica y sustenta la Hoja 2 institucional requerida para la autorización docente.

**Independent Test**: Puede probarse registrando diagnósticos y fases de tratamiento en el formulario correspondiente y validando su reflejo en la Hoja 2.

**Acceptance Scenarios**:

1. **Given** que el usuario accede al módulo de Diagnóstico y Plan de Tratamiento, **When** captura los diagnósticos por órgano dentario y las fases de tratamiento (preventiva, curativa, rehabilitadora), **Then** la información queda vinculada al expediente activo y formateada según el estándar UJAT.

---

### User Story 4 - Bitácora de Tratamientos y Notas de Evolución (Priority: P2)

Como operador clínico, quiero asentar en una bitácora cronológica cada procedimiento realizado por cita, especificando órgano dentario, estado pre/durante/post operatorio y observaciones, para generar el resumen del tratamiento y control de firmas.

**Why this priority**: Es el registro legal de lo efectivamente realizado en cada sesión clínica universitaria.

**Independent Test**: Puede probarse agregando entradas cronológicas en la bitácora y verificando que se listan ordenadas en la Hoja 3 institucional.

**Acceptance Scenarios**:

1. **Given** que el usuario finaliza una sesión de atención, **When** registra una nueva fila en la bitácora con fecha, diente/zona, procedimiento y observaciones, **Then** la entrada se agrega a la lista cronológica del expediente y queda disponible para la firma del docente.

---

### User Story 5 - Portabilidad de Expediente Local `.odonto` (Priority: P1)

Como usuario de OdontoDoc, quiero exportar e importar el expediente completo como un archivo local `.odonto` sin depender de internet ni de servidores externos, para respaldar y compartir el expediente de forma soberana y privada.

**Why this priority**: Cumple con el principio constitucional no negociable de Local-First y Privacidad Absoluta.

**Independent Test**: Puede probarse exportando un expediente con datos y fotos a un archivo `.odonto`, reiniciando la aplicación e importando dicho archivo, comprobando la restauración exacta al 100% de la información.

**Acceptance Scenarios**:

1. **Given** un expediente con datos clínicos y fotografías capturadas, **When** el usuario pulsa "Exportar Expediente", **Then** el navegador descarga de forma inmediata un archivo con extensión `.odonto` conteniendo el JSON estructurado con metadatos e imágenes Base64.
2. **Given** un archivo `.odonto` previamente guardado, **When** el usuario pulsa "Importar Expediente" y lo selecciona desde su explorador de archivos local, **Then** el sistema valida el esquema, carga los datos al estado y actualiza todas las vistas y previsualizaciones instantáneamente.

---

### User Story 6 - Previsualización e Impresión Fiel WYSIWYG de Hojas Oficiales UJAT (Priority: P1)

Como estudiante que debe entregar la documentación física al docente supervisor, quiero previsualizar y mandar a imprimir o guardar en PDF las 3 hojas clínicas oficiales de la UJAT (Resumen Clínico, Diagnóstico/Plan de Tratamiento y Resumen del Tratamiento) con fidelidad 1:1 y sin elementos de la interfaz web.

**Why this priority**: Requisito institucional indispensable para la aprobación de clínicas en la DACS / Cirujano Dentista de la UJAT.

**Independent Test**: Puede probarse activando la vista previa y la orden de impresión del navegador (`Ctrl+P` / `window.print()`), verificando que los estilos `@media print` en tamaño Carta/A4 ocultan la UI de la app y replican el formato oficial.

**Acceptance Scenarios**:

1. **Given** que el usuario accede a la vista de impresión, **When** revisa las 3 hojas clínicas, **Then** cada una refleja fielmente el membrete, tipografía, tablas y espacios de firma institucionales de la UJAT DACS.
2. **Given** que el usuario pulsa "Imprimir / Guardar PDF", **When** se abre el cuadro de diálogo de impresión del navegador, **Then** se ocultan todas las barras de navegación, botones y herramientas táctiles, imprimiendo únicamente las hojas clínicas limpias en hojas Letter o A4.

---

### Edge Cases

- **Entrada de fotografías en ultra-alta resolución (>48MP)**: El pipeline de compresión Canvas debe escalar adecuadamente la imagen sin desbordar la memoria del hilo principal ni generar cuelgues (OOM) en dispositivos con 2GB de RAM o menos.
- **Importación de archivos `.odonto` corruptos o incompatibles**: El sistema debe validar la estructura del JSON y el `schemaVersion`; si el archivo está dañado, debe mostrar un mensaje amigable de error sin romper la aplicación.
- **Uso sin conexión a internet (Offline puro)**: Todas las funcionalidades (captura, edición, compresión, exportación, importación e impresión) deben operar al 100% sin conexión a internet ni emitir peticiones de red.
- **Textos largos en campos clínicos**: Las celdas de las hojas de impresión deben gestionar el desbordamiento de texto (wrapping adecuado) para evitar que rompan los saltos de página del formato oficial institucional.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: La aplicación DEBE funcionar 100% en el cliente (Browser SPA/PWA) en modo offline sin backend ni servidores en la nube.
- **FR-002**: Queda estrictamente PROHIBIDO enviar datos personales, historias clínicas o fotografías a cualquier servicio o servidor externo.
- **FR-003**: El sistema DEBE proveer un formulario táctil optimizado para smartphone (área táctil $\ge 44\times 44\text{px}$) para la captura de Ficha de Identificación del paciente y del alumno.
- **FR-004**: El sistema DEBE invocar la cámara trasera nativa mediante `<input type="file" accept="image/*" capture="environment">` para todas las capturas fotográficas.
- **FR-005**: Toda fotografía capturada DEBE comprimirse en cliente vía `HTMLCanvasElement` a un ancho máximo de 1000px y formato JPEG con factor de calidad 0.8 antes de integrarse al estado.
- **FR-006**: El sistema DEBE permitir registrar y visualizar 1 fotografía extraoral de frente/sonrisa y una matriz de 5 fotografías intraorales estándar.
- **FR-007**: El sistema DEBE proveer captura de antecedentes médicos (heredo-familiares, patológicos, no patológicos) y exploración estomatológica para la Hoja 1.
- **FR-008**: El sistema DEBE permitir la captura del diagnóstico integral estomatológico y las fases de tratamiento para la Hoja 2.
- **FR-009**: El sistema DEBE permitir el registro cronológico de procedimientos clínicos en una bitácora con control de fechas, órganos dentarios y notas de evolución para la Hoja 3.
- **FR-010**: El sistema DEBE soportar la persistencia y recuperación de datos mediante exportación e importación de archivos locales con extensión `.odonto`.
- **FR-011**: El archivo `.odonto` DEBE estructurarse en formato JSON UTF-8 e incluir `schemaVersion`, metadatos de creación/actualización y las imágenes codificadas en Base64 Data URI.
- **FR-012**: El sistema DEBE proveer una vista previa en tiempo real de las 3 hojas oficiales UJAT (Resumen Clínico, Diagnóstico/Plan de Tratamiento y Resumen del Tratamiento).
- **FR-013**: Las hojas de impresión DEBEN replicar con fidelidad 1:1 los formatos oficiales de la UJAT DACS Licenciatura en Cirujano Dentista.
- **FR-014**: Los estilos `@media print` DEBEN purgar incondicionalmente todos los elementos de control de la interfaz web (botones, navegación, pestañas) y formatear el documento para papel estándar Letter / A4.
- **FR-015**: La arquitectura de estado DEBE garantizar sincronización bidireccional inmediata (Single Source of Truth) entre los formularios de captura y el documento previsualizado.
- **FR-016**: La aplicación DEBE validar la integridad de cualquier archivo `.odonto` importado antes de mutar el estado.

### Key Entities *(include if feature involves data)*

- **PatientData**: Representa los datos demográficos y de contacto del paciente (nombre, edad, sexo, ocupación, teléfono, motivo de consulta).
- **StudentData**: Representa la identificación del alumno operador y supervisor clínico (nombre, matrícula, semestre, grupo, docente a cargo).
- **ClinicalHistory**: Contiene los antecedentes patológicos, no patológicos, heredo-familiares y signos vitales.
- **ClinicalPhotos**: Contenedor de las imágenes comprimidas en Base64 (1 extraoral y 5 intraorales: frontal, superior, inferior, derecha, izquierda).
- **DiagnosisAndTreatment**: Registra el diagnóstico integral y las actividades por fases de tratamiento.
- **TreatmentLogEntry**: Registro individual de una sesión clínica (fecha, órgano dentario, procedimiento efectuado, notas de evolución, firma/visto bueno docente).
- **OdontoFile**: Documento raíz serializado para exportación/importación conteniendo metadatos (`schemaVersion`, `createdAt`, `updatedAt`, `appVersion`) y el estado clínico consolidado.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% de las funciones de captura, almacenamiento, compresión, exportación e impresión operan sin conexión de red (0 llamadas HTTP externas).
- **SC-002**: La compresión de cualquier imagen de cámara de smartphone se ejecuta en menos de 1.5 segundos en el navegador móvil sin provocar errores por falta de memoria (OOM).
- **SC-003**: El tamaño promedio de un archivo `.odonto` con las 6 fotografías clínicas completas se mantiene por debajo de 2.5 MB.
- **SC-004**: Los 3 formatos clínicos impresos o exportados a PDF replican con fidelidad 1:1 el diseño oficial de la UJAT en papel Letter/A4, con márgenes adecuados y sin elementos de la interfaz web.
- **SC-005**: La sincronización entre el formulario de captura y la vista previa del documento ocurre en tiempo real (<100ms de latencia percibida).

## Assumptions

- Los usuarios utilizan navegadores modernos en dispositivos móviles o de escritorio (Safari iOS, Chrome Android, navegadores basados en Chromium / Firefox).
- El dispositivo cuenta con hardware de cámara accesible mediante inputs estándar HTML5 de archivo.
- Los formatos institucionales de la UJAT DACS utilizados corresponden a las plantillas vigentes de la Licenciatura en Cirujano Dentista.
- No se requiere almacenamiento en servidor remoto; la responsabilidad de resguardo del archivo `.odonto` recae en el usuario local.
