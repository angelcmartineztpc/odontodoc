# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Estudiantes de Odontología (UJAT - DACS)**: Alumnos de la Licenciatura en Cirujano Dentista que atienden pacientes en el sillón dental de las clínicas universitarias, necesitando capturar datos demográficos, antecedentes, fotografías clínicas y notas de evolución de forma rápida y ergonómica.
- **Docentes Supervisores Clínicos**: Profesores encargados de revisar diagnósticos integrales, validar planes de tratamiento por fases y autorizar procedimientos mediante firma física en hojas clínicas institucionales.

## Product Purpose

OdontoDoc es una herramienta digital clínica local-first diseñada para agilizar la documentación de expedientes clínicos odontológicos directamente en el sillón dental. Su propósito es erradicar el retraso y retrabajo del llenado manual en papel y fotocopiado, salvaguardar la privacidad absoluta de los datos y fotografías médicas sin depender de servidores en la nube, y generar impresiones y PDFs oficiales con fidelidad 1:1 respecto a los formatos institucionales de la UJAT.

## Positioning

A diferencia de los sistemas tradicionales de gestión odontológica o software clínico en la nube que requieren conexión a internet y centralizan datos confidenciales en servidores externos, OdontoDoc opera 100% en el cliente (Browser PWA offline), comprime las fotografías en el propio dispositivo para evitar saturación de memoria y utiliza un formato portátil soberano `.odonto`, asegurando fidelidad pixel-a-pixel con los formatos en papel exigidos por la UJAT DACS.

## Operating Context

- **Área de clínica odontológica universitaria**: Espacio de trabajo dinámico y aséptico; operadores con guantes de látex/nitrilo y barreras de protección física que interactúan con smartphones para captura de datos y fotografías.
- **Conectividad nula o intermitente**: Las clínicas universitarias frecuentemente carecen de acceso estable a internet, por lo que toda la operación debe ser 100% offline.
- **Flujo de entrega física**: Tras la atención clínica, los expedientes se imprimen en papel tamaño Carta (Letter) o se descargan como PDF para entrega, revisión y firma autógrafa docente.
- **Documentos normativos**: Formatos oficiales de la UJAT (Hoja 1: Resumen Clínico General y Antecedentes; Hoja 2: Diagnóstico Integral y Plan de Tratamiento; Hoja 3: Resumen del Tratamiento y Bitácora).

## Capabilities and Constraints

- **100% Local-First y Offline Puro**: Cero llamadas de red externas; ninguna dependencia de backend o almacenamiento en nube.
- **Captura y Compresión Fotográfica en Memoria**: Acceso directo a la cámara trasera nativa (`capture="environment"`) y compresión automática mediante Canvas HTML5 (máximo 1000px de ancho, JPEG 0.8 en Base64) para 1 foto extraoral y 5 fotos intraorales estandarizadas sin desbordar memoria (OOM).
- **Gestión de Expedientes Portátiles `.odonto`**: Exportación e importación atómica de expedientes completos en JSON UTF-8 estructurado con versionado de esquema (`schemaVersion`).
- **Fidelidad WYSIWYG de Impresión**: Formateo estricto `@media print` en tamaño Carta/A4 que purga todos los controles de navegación web y conserva exactamente el membrete, proporciones de celdas, tipografía y áreas de firma oficiales UJAT.
- **Terminología Médica Odontológica**: Diagnósticos odontológicos categorizados (dental, pulpar, periodontal, oclusal), fases de tratamiento (preventiva, curativa, rehabilitadora) y registro cronológico de sesiones.

## Brand Commitments

- **Nombre**: OdontoDoc.
- **Afiliación Institucional**: Diseñado para la Licenciatura en Cirujano Dentista, División Académica de Ciencias de la Salud (DACS), Universidad Juárez Autónoma de Tabasco (UJAT).
- **Tono y Voz**: Riguroso, clínico, académico, directo y funcional.

## Evidence on Hand

- Especificación de producto y criterios de aceptación estructurados en [.specify/specification.md](file:///Users/administrador/odontodoc/.specify/specification.md) y [specs/001-odontodoc-core/spec.md](file:///Users/administrador/odontodoc/specs/001-odontodoc-core/spec.md).
- Modelos de datos y contratos en [specs/001-odontodoc-core/data-model.md](file:///Users/administrador/odontodoc/specs/001-odontodoc-core/data-model.md).
- Implementación base de formularios en [components/forms/](file:///Users/administrador/odontodoc/components/forms/) y plantillas de impresión en [components/print/](file:///Users/administrador/odontodoc/components/print/).

## Product Principles

1. **Privacidad Absoluta y Soberanía Local**: Ningún dato médico o fotografía personal abandona el dispositivo del usuario sin una acción explícita de exportación local.
2. **Fidelidad Institucional Intransigente**: Los documentos impresos y PDFs deben coincidir exactamente con el formato oficial en papel de la UJAT DACS; la herramienta digital sirve al formato formal, no al revés.
3. **Ergonomía en Sillón Dental**: Interfaz táctil reactiva, contrastada y de rápida navegación que minimiza los toques necesarios durante la sesión clínica con guantes.
4. **Resiliencia Operativa**: Procesamiento eficiente en memoria que permite trabajar sin fallas en dispositivos móviles con recursos limitados (≤ 2GB RAM).

## Accessibility & Inclusion

- Elementos de interacción táctil con área mínima de 44×44 px.
- Elevado contraste visual para garantizar legibilidad bajo iluminación intensa de sillón dental.
- Soporte visual de modo claro y oscuro para mitigar fatiga visual en jornadas clínicas prolongadas.
