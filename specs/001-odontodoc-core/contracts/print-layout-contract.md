# Contract: WYSIWYG Print Layout & CSS Specifications

**Feature Branch**: `001-odontodoc-core`  
**Date**: 2026-09-05  

---

## 1. Page Dimensions & CSS Paging Rules

```css
@page {
  size: letter portrait;
  margin: 10mm 10mm 10mm 10mm;
}

@media print {
  /* Hide all interactive UI elements */
  nav, header, footer, button, .no-print, [role="tablist"], [role="toolbar"], input[type="file"] {
    display: none !important;
  }

  /* Force physical pages */
  .clinical-sheet {
    page-break-after: always;
    break-after: page;
    width: 100%;
    min-height: 250mm;
    box-sizing: border-box;
    background: white !important;
    color: black !important;
  }

  .clinical-sheet:last-child {
    page-break-after: auto;
    break-after: auto;
  }

  body {
    background: white !important;
    color: black !important;
    font-size: 10pt;
    line-height: 1.2;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
}
```

---

## 2. Institutional Sheet Specifications (Exact 1:1 Replica from Official UJAT DACS PDF)

*Source: `public/templates/Hoja para Notas medicas ejemplo de redaccion (1).pdf`*

### Institutional Header (Common to all 3 sheets)
- **Left Emblem**: Official UJAT Crest (`/logos/ujat-logo.jpg`, $22\times 28\text{mm}$).
- **Right Emblem**: Official DACS Crest (`/logos/dacs-logo.png`, $20\times 28\text{mm}$).
- **Center Text Block**:
  ```text
  UNIVERSIDAD JUÁREZ AUTÓNOMA DE TABASCO
  DIVISIÓN ACADÉMICA DE CIENCIAS DE LA SALUD
  LICENCIATURA EN CIRUJANO DENTISTA
  Dirección: Av. Gregorio Méndez Magaña No. 2838-A Colonia Tamulté, C.P: 86150, Villahermosa, Tabasco. México.
  ```
- **Document Title Banner**:
  - Sheet 1: `NOTA MEDICA: RESUMEN CLÍNICO GENERAL.`
  - Sheet 2: `NOTA MEDICA: DIAGNOSTICO Y PLAN DE TRATAMIENTO CLINICO ODONTOLOGICO`
  - Sheet 3: `NOTA MEDICA: RESUMEN CLINICO ODONTOLOGICO DEL TRATAMIENTO REALIZADO`

### Identification Frame (Rounded Border Box)
- **Sheets 1 & 2**:
  - Line 1: `Nombre del Usuario: [valor]` | `Expediente: [valor]` | `Fecha: [valor]`
  - Line 2: `Nombre del alumno: [valor]` | `Matricula: [valor]`
- **Sheet 3 (Detailed Clinical Session)**:
  - Line 1: `Nombre del Usuario: [valor]` | `Expediente: [valor]` | `Fecha: [valor]`
  - Line 2: `Nombre del alumno: [valor]` | `Matricula: [valor]`
  - Line 3: `Diagnóstico: [valor]` | `Tratamiento: [valor]`
  - Line 4: `N. Recibo: [valor]` | `Signos vitales: Tensión arterial: [valor]` | `Frecuencias cardiaca: [valor]` | `Temperatura: [valor]`

### Sheet 1: Resumen Clínico General
- **Section 1**: `FOTOGRAFIAS CLINICAS EXTRAORALES:`
  - Extraoral photographs container with support for frontal smile and profile views.
- **Section 2**: `RESUMEN CLINICO GENERAL:`
  - Narrative clinical summary including: Motivo de consulta, padecimiento actual, antecedentes patológicos y heredofamiliares, aparatos y sistemas, signos vitales generales (T/A, F/C, TEMP, TALLA, Peso), exploración de ATM, tejidos blandos/periodontales y conclusión médica de aptitud clínica.
- **Footer**:
  - Solid signature line aligned to right: `Nombre y Firma del profesor`.

### Sheet 2: Diagnóstico y Plan de Tratamiento Clínico Odontológico
- **Section 1**: `FOTOGRAFIAS CLINICAS INTRAORALES:`
  - 5-view standard intraoral matrix (Frontal, Lateral Derecha, Lateral Izquierda, Oclusal Superior, Oclusal Inferior).
- **Section 2**: `DIAGNOSTICO Y PLAN DE TRATAMIENTO:`
  - Standard bulleted list grouping diagnosis by tooth organ (FDI), classification (Class 1, Class 2, etc.) and phased treatment (Preventive, Curative, Surgical, Orthodontic).
- **Footer**:
  - Solid signature line aligned to right: `Nombre y Firma del profesor`.

### Sheet 3: Resumen Clínico Odontológico del Tratamiento Realizado
- **Extended Header Box**: Includes session diagnosis, treatment name, receipt number, and vital signs.
- **Section 1**: `RESUMEN DEL TRATAMIENTO:`
  - Numbered clinical protocol steps:
    1. Aislamiento (anestesia tópica/infiltrativa, dique y grapa)
    2. Apertura de cavidad (fresas de diamante/carburo, eliminación de caries)
    3. Acondicionamiento de la cavidad (limpieza, clorhexidina, desensibilizante)
    4. Preparación de base cavitaria (hidróxido de calcio, ionómero de vidrio)
    5. Restauración (grabado ácido, adhesivo, fotopolimerización, resina por capas)
    6. Ajuste oclusal y pulido final (papel de articular, hules, pasta diamantada, glicerina)
- **Section 2**: Procedural Photographic Sequence (3 photos):
  - `Antes` | `Durante` | `Después`
- **Footer**:
  - Solid signature line aligned to right: `Nombre y Firma del profesor`.

### Dual Export Modes
1. **Modo Expediente (Relleno / Fillable)**: Renders live clinical state data directly into the layout.
2. **Modo Formato Oficial en Blanco (Blank Form)**: Reproduces exact blank form layout with dashed underline guides `____________________` matching pages 2, 4, and 6 of the official PDF for manual paper documentation.
