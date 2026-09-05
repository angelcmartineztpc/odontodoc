# Implementation Plan: OdontoDoc Core Clinical Workflow

**Branch**: `001-odontodoc-core` | **Date**: 2026-09-05 | **Spec**: [specs/001-odontodoc-core/spec.md](file:///Users/administrador/odontodoc/specs/001-odontodoc-core/spec.md)

**Input**: Feature specification from `specs/001-odontodoc-core/spec.md` and official institutional template from `public/templates/Hoja para Notas medicas ejemplo de redaccion (1).pdf`.

---

## Summary

OdontoDoc is a static, local-first clinical support tool for dental students and faculty at Universidad Juárez Autónoma de Tabasco (UJAT - DACS, Licenciatura en Cirujano Dentista). It enables rapid, tactile chairside data and photographic capture, strictly client-side Canvas image compression, sovereign persistence via local `.odonto` files, and real-time WYSIWYG rendering of the 3 official UJAT clinical formats for Letter/A4 printing and PDF generation.

Following the analysis of the official institutional PDF ([`Hoja para Notas medicas ejemplo de redaccion (1).pdf`](file:///Users/administrador/odontodoc/public/templates/Hoja%20para%20Notas%20medicas%20ejemplo%20de%20redaccion%20(1).pdf)), the system is enhanced to:
1. Integrate extracted high-resolution official crests: [`public/logos/ujat-logo.jpg`](file:///Users/administrador/odontodoc/public/logos/ujat-logo.jpg) and [`public/logos/dacs-logo.png`](file:///Users/administrador/odontodoc/public/logos/dacs-logo.png).
2. Achieve 1:1 visual parity with the official 6-page institutional template across the 3 clinical notes (`Sheet1ClinicalSummary`, `Sheet2DiagnosisPlan`, `Sheet3TreatmentSummary`).
3. Support a **Dual Output Mode**:
   - **Modo Expediente (Relleno / Fillable)**: Renders live clinical data, narrative, photos, and procedures from the active state.
   - **Modo Formato Oficial en Blanco (Blank Form)**: Reproduces exact blank form layout with dashed underline guides `____________________` matching pages 2, 4, and 6 of the official PDF for manual paper documentation.

---

## Technical Context

**Language/Version**: TypeScript 5.x / Modern JavaScript ES6+  
**Primary Dependencies**: React 19, Next.js 16 (Static Export), Tailwind CSS v4  
**Storage**: Client-side only; local `.odonto` files (UTF-8 JSON containing metadata, clinical records, and Base64 JPEG data URIs)  
**Testing**: Static type safety (`tsc --noEmit`), ESLint, and manual end-to-end verification scenarios documented in [quickstart.md](file:///Users/administrador/odontodoc/specs/001-odontodoc-core/quickstart.md)  
**Target Platform**: Mobile touchscreens (iOS Safari, Android Chrome) and modern desktop browsers  
**Project Type**: Static Local-First Single Page Application (SPA / PWA)  
**Performance Goals**: Image compression in $<1.5\text{s}$ per capture; $<100\text{ms}$ latency for real-time print preview updates; total `.odonto` record size $<2.5\text{MB}$ with 6 photos  
**Constraints**: 100% offline operation; strictly 0 outgoing network requests / cloud dependencies; Letter/A4 1:1 print fidelity  
**Scale/Scope**: 6 functional modules (A through F), 3 official UJAT institutional sheets, 1 root aggregate data model, dual export modes  

---

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-checked post-Phase 1 design.*

| Principle | Requirement | Plan Alignment & Gate Evaluation | Status |
| :--- | :--- | :--- | :--- |
| **I. Local-First & Privacy** | 100% offline SPA with zero backend. No PII/photo transmission to cloud. Persistence solely via `.odonto` files. | Next.js configured as static export. Zero API routes, zero external fetch calls. File export/import via browser Blob URLs. | **PASS** |
| **II. Mobile-First & Camera UX** | Chairside touch targets $\ge 44\times 44\text{px}$. Native camera via `<input capture="environment">`. Canvas compression (max 1000px, JPEG 0.8) before state. | UI components use dedicated mobile layout. Camera utility implements strict `HTMLCanvasElement` scaling and immediate `URL.revokeObjectURL` cleanup. | **PASS** |
| **III. Institutional Print Fidelity** | 1:1 official replica of 3 UJAT sheets. Letter/A4 print styles purging all UI chrome. | Pure CSS `@media print` and `@page` styles. Specific UJAT DACS templates for Hojas 1, 2, and 3 matching official PDF pages 1-6. | **PASS** |
| **IV. SSoT & Architecture** | React + Tailwind CSS. Decoupled capture forms vs print renderers. Real-time bidirectional sync. | Centralized React Context with pure `useReducer` serving as single source of truth. Form mutations reflect immediately in preview. | **PASS** |

---

## Project Structure

### Documentation (this feature)

```text
specs/001-odontodoc-core/
├── spec.md              # User requirements and acceptance criteria
├── plan.md              # Implementation plan (this document - Speckit SSoT)
├── research.md          # Technical decisions and rationale (Phase 0)
├── data-model.md        # Schema, entity definitions and lifecycle (Phase 1)
├── quickstart.md        # Runnable end-to-end validation scenarios (Phase 1)
├── contracts/           # Interfaces and technical specifications (Phase 1)
│   ├── odonto-file-schema.json
│   ├── compression-service-contract.md
│   └── print-layout-contract.md   # Exact 1:1 UJAT DACS PDF layout specifications
└── tasks.md             # Actionable dependency-ordered tasks (Phases 1 - 10)

PRODUCT.md               # Durable product truth, user personas, institutional context
DESIGN.md                # UI design system tokens, visual rules and canonical specs (elevated with Mayo Clinic & Better Care tokens)
.impeccable/design.json  # Impeccable sidecar (schemaVersion 2) with HTML/CSS snippets and diagnostic clinical color ramps
```

### Source Code (repository root)

```text
app/
├── globals.css                   # Tailwind CSS v4 import + strict @media print styles
├── layout.tsx                    # Root HTML shell with viewport and metadata
└── page.tsx                      # Main SPA application view (Tab manager & view switcher)

components/
├── layout/
│   ├── Header.tsx                # Mobile header with patient name, folio, and action buttons
│   └── TabNavigation.tsx         # Tactile bottom navigation bar (Ficha, Fotos, Plan, Bitácora, Imprimir)
├── forms/
│   ├── IdentificationForm.tsx    # Módulo A: Ficha de Identificación del Paciente y Alumno
│   ├── ClinicalHistoryForm.tsx   # Módulo B: Antecedentes patológicos, somatometría y examen estomatológico
│   ├── CameraCaptureInput.tsx    # Reusable camera trigger (<input capture="environment"> + thumbnail)
│   ├── IntraoralMatrixForm.tsx   # Módulo C: Matriz fotográfica de 5 tomas intraorales
│   ├── DiagnosisPlanForm.tsx     # Módulo C: Diagnóstico integral y fases de tratamiento
│   └── TreatmentLogForm.tsx      # Módulo D: Bitácora cronológica, sesión detallada y fotos de procedimiento
└── print/
    ├── PrintContainer.tsx        # Container managing preview, sheet selection, print triggers, and dual blank/filled mode
    ├── Sheet1ClinicalSummary.tsx # Hoja 1: Resumen Clínico UJAT DACS (1:1 layout matching pages 1-2)
    ├── Sheet2DiagnosisPlan.tsx   # Hoja 2: Diagnóstico y Plan de Tratamiento UJAT DACS (1:1 layout matching pages 3-4)
    └── Sheet3TreatmentSummary.tsx# Hoja 3: Resumen del Tratamiento / Sesión UJAT DACS (1:1 layout matching pages 5-6)

context/
├── ClinicalRecordContext.tsx     # Centralized SSoT React Context Provider & hook
├── clinicalRecordReducer.ts      # Pure action reducer handling all document mutations
└── initialClinicalState.ts       # Default empty clinical dossier adhering to data-model.md

lib/
├── compression.ts                # In-memory HTMLCanvasElement image compression utility
├── fileStorage.ts                # .odonto file import/export Blob handlers & validator
└── types.ts                      # TypeScript contracts matching odonto-file-schema.json

public/
├── logos/
│   ├── ujat-logo.jpg             # Official UJAT crest extracted from PDF
│   └── dacs-logo.png             # Official DACS crest extracted from PDF
└── templates/
    └── Hoja para Notas medicas ejemplo de redaccion (1).pdf # Official reference PDF
```

---

## Phases & Execution Roadmap

### Completed Phases (1-9)
- **Phase 1: Setup**: Project setup, Next.js static export, Tailwind CSS v4, core TypeScript types.
- **Phase 2: Foundational**: Reducer, React Context SSoT, Canvas compression, Blob `.odonto` import/export, application shell.
- **Phase 3: User Story 1**: Patient & student identification forms.
- **Phase 4: User Story 5**: Local-First `.odonto` file portability.
- **Phase 5: User Story 2**: Extraoral & intraoral camera capture with Canvas compression.
- **Phase 6: User Story 6**: Initial WYSIWYG print preview container.
- **Phase 7: User Story 3**: Diagnosis & treatment plan form and teeth record.
- **Phase 8: User Story 4**: Treatment log & clinical evolution notes.
- **Phase 9: Polish & Design System**: Mayo Clinic + Better Care clinical color ramps, `PRODUCT.md`, `DESIGN.md`.

### Phase 10: Réplica Fidedigna 1:1 de Formatos Oficiales UJAT DACS y Hojas Rellenables / Descargables (Completed)
- **Goal**: Transform the print rendering layer to be an exact 1:1 visual replica of the official 6-page PDF template, with support for official logos, 4-row session frames, standard 6-step treatment sequence, procedure photos (`Antes`/`Durante`/`Después`), and dual mode (Filled Record vs Blank Form with dotted guides).
- **Status**: Completed and verified via `bun run build` and browser testing.

### Phase 11: Integración de Identidad Visual Institucional UJAT (Manual de Marca Oficial) (Completed)
- **Goal**: Apply the official UJAT Brand Guidelines (`public/brandguidelines/ilide.info-guia-de-uso-ujat-pr_5b5632ce10ba9d466a4b6d4f30c88b24.pdf`), configuring the 3 official greens (Pantone 356 C, 362 C, 376 C), Caecilia typography, official university motto, and vector emblems across UI and print templates.
- **Status**: Completed and verified via `bun run build` and browser testing.

### Phase 12: Modernización UX/UI Material Design 3 Mobile-First (Completed)
- **Goal**: Eliminate all informal emojis across the entire UI and navigation, adopting Google's Material Design 3 (M3) design system and `@mui/icons-material` for an uncompromising, professional mobile-first clinical experience.
- **Status**: Completed, 0 emojis across entire application, verified with `bun run build` and browser subagent.
- **Architectural & Design Directives**:
  1. **Material Design 3 NavigationBar**:
     - Replace ad-hoc bottom bar with canonical M3 NavigationBar.
     - Implement pill-shaped active indicator (`rounded-full`, tonal container `#1C8443`/15 with `#1C8443` active icon).
     - Standard touch target height ($80\text{px}$ container, $44\times 44\text{px}$ minimum interactive zone).
     - Vector Material Icons: `AssignmentIndOutlined` (Ficha), `MedicalServicesOutlined` (Historial), `PhotoCameraOutlined` (Fotos), `FactCheckOutlined` (Plan), `HistoryEduOutlined` (Bitácora), `PrintOutlined` (Formatos).
  2. **Material Design 3 Top App Bar**:
     - Clean institutional elevation and typography.
     - Action buttons with vector Material Icons: `FolderOpenOutlined` (Importar), `SaveOutlined` (Guardar .odonto), `PrintOutlined` (Imprimir PDF), `RestartAltOutlined` (Reiniciar).
  3. **Material Clinical Cards & Forms**:
     - Replace all emojis in section banners and card headers with crisp Material Design vector icons.
     - Consistent M3 surface elevation, subtle borders, and tonal container backgrounds.
- **Artifacts**:
  - `specs/001-odontodoc-core/plan.md` (This document)
  - `specs/001-odontodoc-core/tasks.md` (Phase 12 tasks)
  - `DESIGN.md` & `.impeccable/design.json` (Elevated with M3 component specifications)
  - `components/layout/TabNavigation.tsx` (Canonical M3 NavigationBar)
  - `components/layout/Header.tsx` (M3 Top App Bar)
  - `components/forms/*` and `components/print/PrintContainer.tsx` (0 emojis, pure Material vector icons)

---

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
| :--- | :--- | :--- |
| *None* | Architecture strictly adheres to all 4 constitutional principles. | N/A |
