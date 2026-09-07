---
name: OdontoDoc
description: Sistema clínico y arquitectónico UI de precisión para captura odontológica y expedientes institucionales UJAT
colors:
  primary: "#e11d48"
  primary-hover: "#be123c"
  primary-surface: "#fff1f2"
  primary-light: "#ffe4e6"
  pink-sakura: "#e11d48"
  pink-accent: "#fb7185"
  header-bg: "#881337"
  ujat-green-1: "#1c8443"
  ujat-green-2: "#41ad49"
  ujat-green-3: "#8dc642"
  institutional-navy: "#002b49"
  clinical-blue: "#026fd0"
  clinical-critical: "#cf2e2e"
  clinical-warning: "#ff6900"
  clinical-caution: "#fcb900"
  clinical-healthy: "#00d084"
  surface-dark: "#1e1014"
  surface-muted: "#475569"
  border-lines: "#fecdd3"
  bg-app: "#fff5f7"
  bg-surface: "#ffffff"
  canvas-surface: "#ffffff"
  canvas-text: "#111827"
typography:
  display:
    fontFamily: "'Caecilia', 'PMN Caecilia', 'Roboto Slab', Georgia, serif"
    fontSize: "16px"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    fontSize: "14px"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    fontSize: "13px"
    fontWeight: 700
    lineHeight: 1.4
    letterSpacing: "normal"
  body:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  label:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    fontSize: "11px"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "0.02em"
rounded:
  sm: "8px"
  md: "12px"
  lg: "16px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.canvas-surface}"
    rounded: "{rounded.sm}"
    padding: "10px 16px"
    height: "44px"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
  button-institutional:
    backgroundColor: "{colors.institutional-navy}"
    textColor: "{colors.canvas-surface}"
    rounded: "{rounded.sm}"
    padding: "10px 14px"
    height: "44px"
  input-field:
    backgroundColor: "{colors.bg-surface}"
    textColor: "{colors.surface-dark}"
    rounded: "{rounded.md}"
    padding: "10px 14px"
    height: "44px"
  card-module:
    backgroundColor: "{colors.bg-surface}"
    rounded: "{rounded.lg}"
    padding: "20px"
---

# Design System: OdontoDoc

## Overview

**Creative North Star: "El Cuaderno Clínico de Precisión"**

OdontoDoc concibe el expediente dental no como un formulario web pasivo, sino como un instrumento quirúrgico digital de alta fidelidad. Su lenguaje visual fusiona la autoridad institucional y sobriedad empática de centros médicos de referencia internacional (inspirado en la arquitectura visual de **Mayo Clinic**) con la ergonomía modular, reducción de fatiga de alerta y visualización clínica de datos estandarizada (incorporando los principios de **Better Care Design System**).

Diseñado específicamente para el área de clínicas de la Universidad Juárez Autónoma de Tabasco (UJAT - DACS), el sistema resuelve la captura odontológica táctil al lado del sillón dental con guantes clínicos ($\ge 44\times 44\text{px}$), integrando una doble vía de documentación médica: disparo directo de cámara nativa (`capture="environment"`) y carga de archivos locales para registro retrospectivo cuando el procedimiento no permite la captura en tiempo real.

La arquitectura del sistema vive en dos planos complementarios:
1. **Interfaz Móvil Operativa**: Anclaje institucional en azul marino profundo (`#002B49`), acentos verde azulado médico (`#0D9488`), superficies claras de alto contraste (`#F8FAFC`) y una escala semafórica clínica estandarizada para diagnósticos dentales (sano `#00D084`, observación `#FCB900`, advertencia `#FF6900`, patología aguda `#CF2E2E`).
2. **Lienzo Documental Oficial**: Simulación física 1:1 en tamaño Carta (`#FFFFFF`) que reproduce milimétricamente las hojas clínicas oficiales UJAT en tinta negra estricta (`#111827`), con purga total de la interfaz web en impresión y exportación PDF.

**Key Characteristics:**
- Ergonomía táctil para sillón dental: objetivos mínimos garantizados $\ge 44\times 44\text{px}$.
- Captura dual de imagen médica: cámara nativa trasera directa o carga de archivos locales, con compresión inmediata en Canvas en memoria ($\le 1000\text{px}$, JPEG 0.8).
- Reducción de fatiga de alerta (*Alert Fatigue*): uso controlado de color reservando saturación para hallazgos clínicos críticos.
- Sistema bicéfalo: UI táctil ágil de alta densidad y réplica documental institucional 1:1 WYSIWYG en papel Carta.
- Notación Dental Estándar: compatibilidad con codificación FDI / ISO 3950 (11-48 adultos, 51-85 infantil) y modelo de 5 caras por órgano dentario.

## Colors

La paleta combina la estabilidad y confianza del azul médico institucional con tonos de instrumental aséptico y una escala cromática de diagnóstico clínico.

### Primary
- **Teal Medical Core** (`#0D9488`): Tono de acción y énfasis clínico. Utilizado en botones primarios de guardado, selección activa de pestañas y loaders.
- **Teal Deep Hover** (`#0F766E`): Estado presionado y hover para controles primarios.
- **Teal Light Surface** (`#F0FDFA`): Fondo de acento suave para chips de navegación activa y áreas de carga seleccionadas.

### Secondary & Institutional
- **Mayo Institutional Navy** (`#002B49` / `#1D4056`): Tono de máxima autoridad y estabilidad institucional. Fondo del encabezado superior (Header), membretes principales y botones de jerarquía institucional.
- **Clinical Action Blue** (`#026FD0`): Azul clínico de interacción rápida para impresión, generación de PDF y selectores de herramientas.

### Clinical Diagnostic Scale (Better Care Standard)
- **Clinical Critical / Caries** (`#CF2E2E`): Alerta alta, patología pulpar irreversible, caries activa o urgencia.
- **Clinical Warning / Endodontic** (`#FF6900`): Tratamiento en curso, procedimiento invasivo pendiente o complicación moderada.
- **Clinical Caution / Watch** (`#FCB900`): Diente en observación, lesión incipiente o control de higiene.
- **Clinical Healthy / Complete** (`#00D084`): Órgano dentario sano, sellador íntegro o procedimiento concluido satisfactoriamente.
- **Clinical Info / Restored** (`#8ED1FC`): Restauración existente (amalgama, resina previa, corona protésica).

### Neutral
- **Deep Slate Canvas** (`#0F172A`): Tipografía principal de lectura de datos clínicos en pantalla.
- **Muted Slate** (`#475569`): Etiquetas de campo, subtítulos, horas y metadatos secundarios.
- **Subtle Slate Border** (`#E2E8F0`): Líneas delimitadoras de inputs, tablas clínicas y tarjetas.
- **Clean App Background** (`#F8FAFC`): Fondo general de la aplicación en modo claro.
- **Pure Document White** (`#FFFFFF`): Superficie de tarjetas interactivas y lienzo exclusivo de las hojas oficiales UJAT.
- **Document Ink Black** (`#111827`): Tinta monocromática de máximo contraste para impresión láser institucional.

### Named Rules
**The Clinical High-Contrast Rule.** Todo texto explicativo, valor clínico o campo de entrada debe garantizar un contraste mínimo de 4.5:1 contra su fondo para asegurar legibilidad inmediata bajo la luz del sillón dental.

**The Alert Fatigue Prevention Rule.** Los tonos semafóricos de alerta (`#CF2E2E`, `#FF6900`) quedan prohibidos para propósitos decorativos; solo se activan cuando existe un diagnóstico, hallazgo o error que requiera la intervención del operador.

**The Monochromatic Paper Rule.** Toda hoja en la vista previa de impresión o PDF debe renderizarse en blanco y negro puro (`#FFFFFF` y `#111827` / `#000000`), reservando el color únicamente para las fotografías clínicas o diagramas odontológicos explícitos.

## Typography

**Display Font:** `Inter`, `-apple-system`, `BlinkMacSystemFont`, `Segoe UI`, sans-serif.  
**Body Font:** `Inter`, `-apple-system`, `BlinkMacSystemFont`, `Segoe UI`, sans-serif.  
**Label/Mono Font:** `ui-monospace`, `SFMono-Regular`, `Menlo`, `Monaco`, monospace (para folios, horas y números de diente FDI).

**Character:** Tipografía sans-serif de trazo geométrico y neutro con alta legibilidad tabular, asegurando consistencia entre la vista táctil y las proporciones milimétricas del documento en papel.

### Hierarchy (Mobile UI)
- **Display** (Bold 700, 16px, line-height 1.2, tracking -0.02em): Membrete del encabezado principal de la app y títulos mayores.
- **Headline** (Bold 700, 14px, line-height 1.3, tracking -0.01em): Encabezados de módulos clínicos y banners informativos.
- **Title** (Bold 700, 13px, line-height 1.4): Títulos de tarjetas, subtítulos de cuadrantes y tablas de diagnóstico.
- **Body** (Regular 400, 12px, line-height 1.5): Texto de notas de evolución, antecedentes patológicos y valores de campos.
- **Label** (SemiBold 600, 11px, line-height 1.3, tracking 0.02em): Etiquetas de inputs, botones de acción y badges de estado.

### Hierarchy (Official Institutional Sheet)
- **Membrete Universitario:** ExtraBold 800, 10px, Mayúsculas obligatorias (UJAT / DACS).
- **Subencabezados Institucionales:** Bold 700, 8.5px, mayúsculas compactas.
- **Cuerpo Clínico Oficial:** Regular 400, 9.5px, interlineado ajustado a 1.35.
- **Firmas y Pies de Página:** Bold 700, 9px, con líneas sólidas para firma autógrafa docente.

### Named Rules
**The Strict Case Rule.** En el documento impreso oficial, las siglas institucionales (UJAT, DACS) y los títulos de hoja se mantienen en mayúsculas fijas; en la interfaz móvil táctil se emplea capitalización estándar de interfaz para agilizar la lectura.

**The FDI Tooth Standard Rule.** Los órganos dentarios deben nombrarse y referenciarse siempre bajo la nomenclatura FDI de dos dígitos (ej. 11, 26, 38, 45) para asegurar trazabilidad estomatológica unívoca.

## Layout

El layout opera bajo un modelo adaptativo móvil con ancho máximo de lectura contenido (`max-w-3xl` en captura y `max-w-4xl` en previsualización documental).

- **Encabezado Superior Sticky (`Header`):** Barra fija en `top: 0` con fondo Deep Navy (`#002B49`), visualizador de paciente activo y acciones directas de exportar `.odonto`, importar e imprimir.
- **Área Central Dinámica:** Espaciador inferior generoso (`pb-24`) que evita la superposición de campos con la barra de navegación.
- **Barra de Navegación Inferior (`TabNavigation`):** Barra fija en `bottom: 0` accesible con el pulgar, dividida en 6 secciones funcionales con objetivos táctiles de 48px de altura.
- **Lienzo de Impresión (`@media print`):** Formato estricto tamaño Carta (`size: letter portrait; margin: 8mm`), con salto de página forzado entre hojas (`break-after: page`) y purga completa e incondicional de todo botón, barra o elemento de navegación web.

## Elevation & Depth

La interfaz adopta una filosofía de **superficies planas con elevación funcional**. Los contenedores en reposo no compiten con sombras densas; el orden se establece mediante jerarquía tonal y bordes nítidos (`1px solid #E2E8F0`). La elevación tridimensional se reserva para elementos flotantes de navegación, modales y la hoja física de previsualización.

### Shadow Vocabulary
- **elevation-header** (`0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px -1px rgba(0,0,0,0.1)`): Separación limpia del encabezado superior sticky contra el scroll.
- **elevation-tabnav** (`0 -4px 6px -1px rgba(0, 0, 0, 0.05)`): Anclaje de la barra inferior táctil sobre la superficie de captura.
- **elevation-canvas** (`0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)`): Simulación física de la hoja de papel Carta en la vista previa.

### Named Rules
**The Flat-at-Rest Rule.** Todo formulario, tarjeta y campo de entrada es plano en estado de reposo. Ningún input o celda de tabla debe usar sombras internas o externas que distraigan de los datos médicos.

## Shapes

- **Contenedores y Tarjetas Modulares:** Radio amplio de 16px (`rounded-2xl`).
- **Inputs, Textareas y Visores Fotográficos:** Radio mediano de 12px (`rounded-xl`).
- **Botones y Controles de Acción:** Radio ergonómico de 8px (`rounded-lg`).
- **Badges de Diagnóstico y Selectores:** Píldora completa de 9999px (`rounded-full`).
- **Bordes:** Líneas nítidas de 1px (`border-slate-200` en modo claro, `border-slate-800` en modo oscuro).

## Components

### Buttons
- **Primary Action (Guardar .odonto):** Fondo Teal Core (`#0D9488`), texto blanco, altura mínima de 44px, esquinas de 8px (`rounded-lg`), padding horizontal de 16px. En `:active` responde con micro-escala táctil (`scale-95`).
- **Institutional Action (Importar / Navegación):** Fondo Deep Navy (`#002B49`), borde sutil (`#1E293B`), texto claro, altura mínima 44px.
- **Print Trigger (Imprimir / PDF):** Fondo Azul Clínico (`#026FD0`), texto blanco, destacado con icono descriptivo.

### Cards & Modules
- **Estructura:** Fondo blanco (`#FFFFFF`), bordes de 1px (`#E2E8F0`), esquinas redondeadas (`rounded-2xl`), espaciado interno de 20px (`p-5`).
- **Header Modular:** Banda de título con icono descriptivo y tipografía en mayúsculas pequeñas.

### Inputs & Fields
- **Geometría:** Altura mínima de 44px para garantizar interacción con guantes. Fondo blanco en claro, gris pizarra en oscuro. Borde de 1px.
- **Focus:** Anillo de foco definido de 2px en Teal Core (`focus:ring-2 focus:ring-teal-500 focus:outline-none`).

### Navigation
- **Barra de Pestañas Móvil:** 6 pestañas táctiles con iconos alusivos (Ficha, Historial, Fotos, Plan, Bitácora, Vista Previa).
- **Indicador Activo:** Fondo Teal suave (`#F0FDFA`) con texto e icono Teal Core (`#0D9488`) y tipografía en negrita (`font-bold`).

### Signature Components
- **CameraCaptureInput (Visor de Fotografía Médica Dual):** Componente táctil dual con área sensible de captura. Permite disparo instantáneo de cámara trasera nativa (`capture="environment"`) o selector de archivos locales para documentación diferida, con indicador de compresión en Canvas, visor de relación de aspecto y acciones de reemplazo/eliminación.
- **ToothSurfaceChip (Atom de Odontograma / Diagnóstico):** Indicador gráfico de diente o cara dental con codificación semafórica estandarizada (Sano `#00D084`, Observación `#FCB900`, Tratamiento Pendiente `#FF6900`, Caries/Patología `#CF2E2E`).
- **PrintContainer / ClinicalSheet:** Motor de renderizado documental que reproduce las 3 hojas oficiales UJAT respetando las proporciones métricas milimétricas de papel Carta.

## Do's and Don'ts

### Do:
- **Do** garantizar siempre un área mínima táctil de 44×44px en todo botón, selector o disparador de cámara.
- **Do** permitir indistintamente la captura con cámara nativa o la selección de fotos desde el archivo local en `CameraCaptureInput`.
- **Do** procesar y comprimir en memoria toda imagen a máx 1000px ancho y JPEG 0.8 antes de ingresarla al estado.
- **Do** aplicar la escala cromática semafórica Better Care únicamente en estados y hallazgos diagnósticos reales.
- **Do** purgar incondicionalmente todos los elementos de interfaz (`no-print`, `button`, `nav`, `header`) durante la impresión.
- **Do** mantener sincronía bidireccional inmediata en tiempo real entre la captura y la hoja previsualizada.

### Don't:
- **Don't** utilizar fondos de color o sombras decorativas en las hojas de impresión oficiales.
- **Don't** permitir que una imagen sin comprimir ingrese al estado de la aplicación ni al archivo `.odonto`.
- **Don't** realizar llamadas de red, analíticas o peticiones externas bajo ninguna circunstancia.
- **Don't** emplear colores de alerta crítica (`#CF2E2E`) para motivos decorativos de la interfaz.
- **Don't** comprimir texto en campos clínicos de impresión hasta provocar pérdida de legibilidad en papel.
