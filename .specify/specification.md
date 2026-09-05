# OdontoDoc – User Specification (Qué y Por Qué)

---

## 1. Visión del Producto y Propósito (El Por Qué)

### 1.1 Problema actual
- En los laboratorios y consultorios de la Licenciatura en Cirujano Dentista (UJAT) la captura de datos del paciente/alumno en el sillón dental es manual, lenta y propensa a errores.
- Los formularios oficiales (hojas clínicas institucionales) deben ser llenados a mano, fotocopiados o escaneados, lo que genera retrabajo, pérdida de tiempo y riesgos de inconsistencia en la información.
- La gestión de fotografías clínicas (extra‑orales e intraorales) queda fuera del expediente digital, obligando a almacenar imágenes en dispositivos externos o impresas, comprometiendo la trazabilidad y la privacidad.

### 1.2 Propósito central y propuesta de valor
OdontoDoc es una **herramienta digital offline** que permite a estudiantes y docentes capturar, organizar y exportar expedientes clínicos completos **desde el propio dispositivo móvil** en el área de clínica, garantizando:

- **Velocidad y ergonomía**: captura de datos y fotos con una sola interacción táctil.
- **Privacidad absoluta**: toda la información permanece en el dispositivo del usuario, sin tráfico a servidores externos.
- **Fidelidad institucional**: generación automática de los tres formularios oficiales de la UJAT (Resumen Clínico, Diagnóstico/Plan de Tratamiento y Resumen del Tratamiento) con exactitud de formato para impresión o PDF.
- **Portabilidad**: los expedientes se exportan/importan mediante un archivo propio `.odonto` (JSON + imágenes en Base64), facilitando su archivo y revisión posterior.

---

## 2. Requisitos Funcionales por Módulo (El Qué)

| Módulo | Descripción funcional (qué) |
|--------|-----------------------------|
| **A – Ficha de Identificación Única** | Permite registrar los datos básicos del paciente y del alumno (nombre, matrícula, número de control, etc.) en un formulario único que queda almacenado en el expediente. |
| **B – Resumen Clínico General y Fotografías Extraorales** | Captura del historial médico básico y de una fotografía frontal/sorriso del paciente. La foto se comprime en‑memoria antes de guardarse. |
| **C – Evaluación Intraoral y Plan de Tratamiento** | Permite registrar cinco fotografías intraorales (una por cuadrante) y asociar a cada una un diagnóstico y/o observación. Incluye la definición del plan de tratamiento con etapas y objetivos. |
| **D – Bitácora de Tratamientos Realizados** | Registro cronológico de cada sesión clínica: procedimiento ejecutado, estado pre‑/post‑operatorio, notas de evolución y generación automática de un recibo/firma docente. |
| **E – Gestión de Expedientes Portátiles** | Funcionalidad de **exportar** el expediente completo a un archivo `.odonto` y **importar** uno existente, sobrescribiendo los datos actuales del paciente. |
| **F – Vista Previa e Impresión de Notas Oficiales** | Simulación visual 1:1 de los tres formularios institucionales, con opción de **descargar** como PDF o **imprimir** directamente, garantizando que la salida impresa coincide con los formatos oficiales (Letter/A4). |

---

## 3. Lista de Criterios de Aceptación Verificables (Acceptance Criteria)

Cada criterio está expresado en formato **Given – When – Then** para que pueda ser validado por pruebas de comportamiento.

### 3.1 Módulo A – Ficha de Identificación Única
1. **Dado** que el usuario abre la aplicación en un dispositivo móvil, **cuando** accede al formulario “Ficha de Identificación”, **entonces** los campos de nombre, matrícula y número de control están visibles y son editables.
2. **Dado** que el usuario completa todos los campos obligatorios y pulsa “Guardar”, **cuando** se confirma la acción, **entonces** la información se almacena en el estado interno y aparece en la vista de previsualización del expediente.

### 3.2 Módulo B – Resumen Clínico General y Fotografías Extraorales
3. **Dado** que el usuario está en la sección “Resumen Clínico”, **cuando** pulsa el botón “Agregar foto extraoral”, **entonces** se abre el selector de cámara nativa (`<input type="file" capture="environment">`).
4. **Dado** que el usuario toma una foto, **cuando** la foto se procesa, **entonces** el algoritmo de compresión en Canvas genera una imagen JPG ≤ 1000 px de ancho y calidad 0.8, y la muestra en la previsualización.
5. **Dado** que el usuario guarda el formulario, **cuando** revisa el expediente, **entonces** la foto aparece adjunta al historial clínico y está incluida en el archivo `.odonto` exportado.

### 3.3 Módulo C – Evaluación Intraoral y Plan de Tratamiento
6. **Dado** que el usuario abre “Evaluación Intraoral”, **cuando** captura cada una de las 5 fotos intraorales, **entonces** cada foto se compressa automáticamente y se asocia al cuadrante correspondiente.
7. **Dado** que el usuario ingresa diagnóstico y plan de tratamiento para cada foto, **cuando** pulsa “Guardar”, **entonces** los datos quedan vinculados al expediente y son visibles en la vista de previsualización del formulario de diagnóstico.

### 3.4 Módulo D – Bitácora de Tratamientos Realizados
8. **Dado** que el usuario finaliza una sesión clínica, **cuando** abre “Bitácora”, **entonces** puede crear un nuevo registro ingresando: fecha, procedimiento, estado pre‑/post‑operatorio y notas.
9. **Dado** que el registro se guarda, **cuando** el usuario visualiza la bitácora, **entonces** el nuevo ítem aparece en orden cronológico y puede exportarse como recibo PDF.

### 3.5 Módulo E – Gestión de Expedientes Portátiles
10. **Dado** que el usuario desea compartir su expediente, **cuando** pulsa “Exportar”, **entonces** se descarga un archivo `.odonto` con la estructura JSON completa (metadatos, datos clínicos y fotos en Base64).
11. **Dado** que el usuario tiene un archivo `.odonto` propio, **cuando** pulsa “Importar` y selecciona el archivo, **entonces** la aplicación reemplaza los datos actuales del expediente con el contenido del archivo y actualiza la vista de previsualización.

### 3.6 Módulo F – Vista Previa e Impresión de Notas Oficiales
12. **Dado** que el usuario abre “Vista Previa de Notas”, **cuando** selecciona “Descargar PDF”, **entonces** se genera un PDF que reproduce fielmente los tres formularios institucionales (Letter/A4, márgenes, tipografía) sin elementos de la UI.
13. **Dado** que el usuario elige “Imprimir”, **cuando** se envía la orden al motor de impresión del navegador, **entón** la salida impresa coincide pixel‑a‑pixel con la vista en pantalla y no contiene botones, menús ni barras de navegación.

### 3.7 Reglas transversales (aplicables a todos los módulos)
14. **Dado** que la aplicación está en modo offline, **cuando** el usuario navega entre módulos, **entón** no se realiza ninguna solicitud HTTP externa.
15. **Dado** que el usuario abre la aplicación en un dispositivo con menos de 2 GB de RAM disponible, **cuando** captura una foto, **entón** la compresión se completa sin provocar errores de “out‑of‑memory”.
16. **Dado** que el archivo `.odonto` contiene datos de versiones anteriores, **cuando** se importa, **entón** la aplicación valida la compatibilidad de esquema y avisa al usuario en caso de incompatibilidad.

---

**Cómo usar esta especificación**
- *Product Owner / Stakeholders*: revisen la visión y los requisitos para validar que el producto satisface las necesidades clínicas y académicas.
- *Equipo de QA*: conviertan cada criterio de aceptación en casos de prueba automatizados o manuales.
- *Desarrolladores*: utilicen esta especificación como guía de “qué” y “por qué”; la implementación del “cómo” (React, Tailwind, compresión en Canvas, etc.) se definirá por separado en los artefactos técnicos.

---

*Fin del documento*
