# Tasks: OdontoDoc Core Clinical Workflow

**Branch**: `001-odontodoc-core` | **Date**: 2026-09-05 | **Spec**: [spec.md](./spec.md) | **Plan**: [plan.md](./plan.md)

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project configuration, dependencies, and core TypeScript contracts.

- [x] T001 Configure Next.js static export settings (`output: 'export'`) in next.config.ts
- [x] T002 [P] Configure Tailwind CSS v4 and core print utilities in app/globals.css
- [x] T003 [P] Define domain TypeScript interfaces matching data model and JSON schema in lib/types.ts

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core state management, image compression pipeline, and portable file storage that all user stories depend on.

**⚠️ CRITICAL**: Must complete before any user story can begin.

- [x] T004 Create blank clinical dossier template and initial state in context/initialClinicalState.ts
- [x] T005 Implement pure reducer for clinical record state mutations in context/clinicalRecordReducer.ts
- [x] T006 Implement centralized SSoT React Context Provider and useClinicalRecord hook in context/ClinicalRecordContext.tsx
- [x] T007 [P] Implement in-memory Canvas image compression utility (max 1000px, JPEG 0.8) with URL.revokeObjectURL cleanup in lib/compression.ts
- [x] T008 [P] Implement .odonto file export Blob download and JSON import validator in lib/fileStorage.ts
- [x] T009 Implement base application shell layout and mobile navigation bar in components/layout/Header.tsx, components/layout/TabNavigation.tsx, and app/page.tsx

**Checkpoint**: Foundation ready — state store, file I/O, compression pipeline, and application shell active.

---

## Phase 3: User Story 1 - Ficha de Identificación y Datos Generales (Priority: P1) 🎯 MVP Core

**Goal**: Allow dental students and faculty to capture patient demographics and operator identification chairside with real-time SSoT reactivity.

**Independent Test**: Enter patient/student details in the identification form and verify that the data immediately persists in state and displays in the institutional document header without page reloads.

- [x] T010 [P] [US1] Implement IdentificationForm component with touch-friendly inputs (>=44x44px) in components/forms/IdentificationForm.tsx
- [x] T011 [US1] Connect IdentificationForm to ClinicalRecordContext dispatching patient and student updates in components/forms/IdentificationForm.tsx
- [x] T012 [US1] Integrate IdentificationForm into the main view switcher in app/page.tsx

**Checkpoint**: User Story 1 functional — patient and student data can be captured and maintained in state.

---

## Phase 4: User Story 5 - Portabilidad de Expediente Local .odonto (Priority: P1)

**Goal**: Sovereign persistence allowing students to export complete clinical files to .odonto format and re-import them offline with full data restoration.

**Independent Test**: Populate a record, click "Exportar Expediente", download the .odonto file, clear the browser state, and import the file back, validating 100% data recovery.

- [x] T013 [P] [US5] Implement file export trigger button generating .odonto download in components/layout/Header.tsx
- [x] T014 [US5] Implement file picker import button and schema validator in components/layout/Header.tsx
- [x] T015 [US5] Connect file import handler to ClinicalRecordContext dispatching atomic state replacement in components/layout/Header.tsx

**Checkpoint**: Local-First persistence active — dossiers can be saved and loaded locally without any cloud server.

---

## Phase 5: User Story 2 - Captura Fotográfica Extraoral e Intraoral con Compresión (Priority: P1)

**Goal**: Native camera capture for extraoral and 5 intraoral views with automatic in-memory Canvas compression (<1000px, JPEG 0.8) to prevent mobile browser memory exhaustion.

**Independent Test**: Take a high-resolution photo (>12MP) with the device camera and confirm it compresses to <=1000px JPEG quality 0.8 in Base64 without crashing browser RAM.

- [x] T016 [P] [US2] Implement reusable tactile camera input component invoking device camera (<input type="file" capture="environment">) in components/forms/CameraCaptureInput.tsx
- [x] T017 [US2] Connect CameraCaptureInput with compressClinicalPhoto utility before dispatching to state in components/forms/CameraCaptureInput.tsx
- [x] T018 [P] [US2] Implement Medical History and Extraoral Photo form in components/forms/ClinicalHistoryForm.tsx
- [x] T019 [P] [US2] Implement 5-view Intraoral Photographic Matrix form in components/forms/IntraoralMatrixForm.tsx
- [x] T020 [US2] Integrate clinical history and photo capture views into main view switcher in app/page.tsx

**Checkpoint**: Complete photographic capture operational with mobile-safe memory footprint.

---

## Phase 6: User Story 6 - Previsualización e Impresión Fiel WYSIWYG UJAT (Priority: P1)

**Goal**: 1:1 official replica of UJAT DACS clinical formats for on-screen preview and physical Letter/A4 printing or PDF export with all UI chrome purged.

**Independent Test**: Trigger print view and verify that 3 distinct UJAT sheets render cleanly in Letter dimensions and window.print() completely hides navigation buttons and toolbars.

- [x] T021 [P] [US6] Implement Sheet 1 (Resumen Clínico) 1:1 UJAT layout in components/print/Sheet1ClinicalSummary.tsx
- [x] T022 [P] [US6] Implement Sheet 2 (Diagnóstico y Plan) 1:1 UJAT layout with intraoral photo matrix in components/print/Sheet2DiagnosisPlan.tsx
- [x] T023 [P] [US6] Implement Sheet 3 (Resumen del Tratamiento) 1:1 UJAT layout with signature boxes in components/print/Sheet3TreatmentSummary.tsx
- [x] T024 [US6] Implement PrintContainer wrapper managing preview and print modal triggers in components/print/PrintContainer.tsx
- [x] T025 [US6] Configure strict CSS @media print and @page rules hiding UI chrome and enforcing page breaks in app/globals.css

**Checkpoint**: Full WYSIWYG print pipeline operational — official UJAT sheets ready for physical and PDF output.

---

## Phase 7: User Story 3 - Diagnóstico, Odontograma y Plan de Tratamiento (Priority: P2)

**Goal**: Register general stomatological diagnosis, tooth-by-tooth diagnoses (FDI notation), and phased treatment plan.

**Independent Test**: Enter diagnoses and phase activities, verifying that Sheet 2 immediately populates all diagnostic sections.

- [x] T026 [P] [US3] Implement Diagnosis and Phased Treatment Plan form component in components/forms/DiagnosisPlanForm.tsx
- [x] T027 [US3] Connect DiagnosisPlanForm to ClinicalRecordContext dispatching diagnosis updates in components/forms/DiagnosisPlanForm.tsx
- [x] T028 [US3] Wire real-time diagnosis and phase data into components/print/Sheet2DiagnosisPlan.tsx

**Checkpoint**: Diagnosis and treatment planning fully integrated into state and printable Hoja 2.

---

## Phase 8: User Story 4 - Bitácora de Tratamientos y Notas de Evolución (Priority: P2)

**Goal**: Chronological tracking of clinical sessions, procedures performed, evolution notes, and instructor verification.

**Independent Test**: Add entries to the treatment log and confirm they appear in chronological order in the table of Hoja 3.

- [x] T029 [P] [US4] Implement Treatment Log table and entry form in components/forms/TreatmentLogForm.tsx
- [x] T030 [US4] Connect TreatmentLogForm to ClinicalRecordContext dispatching add/edit/delete entry actions in components/forms/TreatmentLogForm.tsx
- [x] T031 [US4] Wire dynamic log rows and instructor signature verification into components/print/Sheet3TreatmentSummary.tsx

**Checkpoint**: Full clinical evolution log operational and reflected in Hoja 3.

---

## Phase 9: Polish & Cross-Cutting Concerns

**Purpose**: Cross-cutting quality checks, performance audits, and end-to-end validation.

- [x] T032 [P] Verify zero outgoing network calls and complete offline operation in app/page.tsx
- [x] T033 [P] Review tactile touch targets (>=44x44px) and mobile responsiveness across all components
- [x] T034 Run TypeScript compilation and ESLint verification (bun run build) to ensure zero errors
- [x] T035 Execute end-to-end verification scenarios against specs/001-odontodoc-core/quickstart.md
- [x] T036 [P] Document UI design system tokens, typography scales, and component specs in DESIGN.md and .impeccable/design.json
- [x] T037 [P] Export and elevate UI design system in DESIGN.md and .impeccable/design.json incorporating Better Care & Mayo Clinic clinical tokens

---

## Phase 10: Réplica Fidedigna 1:1 de Formatos Oficiales UJAT DACS y Hojas Rellenables / Descargables (Priority: P1)

**Goal**: Transform the print rendering layer to be an exact 1:1 visual replica of the official 6-page institutional PDF template (`public/templates/Hoja para Notas medicas ejemplo de redaccion (1).pdf`), with support for official crests, 4-row session frames, standard 6-step treatment sequence, procedure photos (`Antes`/`Durante`/`Después`), right-aligned teacher signature lines, and dual export modes (`Modo Expediente Relleno` vs `Modo Formato Oficial en Blanco`).

**Independent Test**: Switch between "Modo Expediente (Relleno)" and "Modo Formato Oficial en Blanco" in the print container; trigger `window.print()` and confirm that both modes render 1:1 against the official PDF template with official logos and without web UI chrome.

- [x] T038 [P] Extract official high-resolution logos from PDF to public/logos/ujat-logo.jpg and public/logos/dacs-logo.png
- [x] T039 [P] Update domain TypeScript interfaces in lib/types.ts and default state in context/initialClinicalState.ts with somatometry (height, weight), receipt number (receiptNumber), session diagnosis/treatment, 6 procedure steps, and procedure photos (before, during, after)
- [x] T040 [P] Refactor components/print/Sheet1ClinicalSummary.tsx with official logos, exact UJAT DACS header, rounded ID frame, FOTOGRAFIAS CLINICAS EXTRAORALES, RESUMEN CLINICO GENERAL narrative, right-aligned signature line, and dual mode (isBlank dotted lines matching pages 1 & 2)
- [x] T041 [P] Refactor components/print/Sheet2DiagnosisPlan.tsx with official logos, exact ID frame, 5-view intraoral photo matrix, structured DIAGNOSTICO Y PLAN DE TRATAMIENTO, right-aligned signature line, and dual mode (matching pages 3 & 4)
- [x] T042 [P] Refactor components/print/Sheet3TreatmentSummary.tsx with official logos, 4-row expanded session frame, 6-step treatment sequence, 3 procedural photos (Antes, Durante, Después), right-aligned signature line, and dual mode (matching pages 5 & 6)
- [x] T043 [P] Update components/print/PrintContainer.tsx with dual mode toggle (Modo Expediente Relleno vs Modo Formato Oficial en Blanco), individual sheet filter (Hoja 1, Hoja 2, Hoja 3, Todas), and native print dialog trigger
- [x] T044 Update chairside capture forms (ClinicalHistoryForm.tsx, TreatmentLogForm.tsx) to support chairside input of somatometry (height, weight), receipt number (receiptNumber), and session procedure steps
- [x] T045 Run automated TypeScript and Next.js static export build (bun run build) to ensure 0 type errors or bundle issues
- [x] T046 Conduct visual fidelity audit comparing rendered print sheets against public/templates/Hoja para Notas medicas ejemplo de redaccion (1).pdf

---

## Phase 11: Integración de Identidad Visual Institucional UJAT (Manual de Marca Oficial) (Priority: P1)

**Goal**: Apply the official UJAT Brand Guidelines (`public/brandguidelines/ilide.info-guia-de-uso-ujat-pr_5b5632ce10ba9d466a4b6d4f30c88b24.pdf`), configuring the 3 official greens (Pantone 356 C, 362 C, 376 C), Caecilia typography, official university motto, and vector emblems across UI and print templates.

- [x] T047 [P] Register official UJAT brand tokens, green palette (Verde 1, 2, 3), and Caecilia font stack in DESIGN.md and .impeccable/design.json
- [x] T048 [P] Configure official UJAT green CSS variables and Caecilia slab-serif font stack in app/globals.css
- [x] T049 [P] Update components/layout/Header.tsx with official UJAT branding, emblem v1/v2, university motto, and institutional green theme
- [x] T050 [P] Upgrade components/print/InstitutionalHeader.tsx to use the HD vector shield (ujat-escudo-oficial.png), official motto ("ESTUDIO EN LA DUDA. ACCIÓN EN LA FE"), and Caecilia typography hierarchy
- [x] T051 [P] Enhance components/layout/TabNavigation.tsx with tactile UJAT green active indicator and micro-interactions
- [x] T052 Run automated TypeScript and Next.js static export build (bun run build) to ensure 0 type errors or bundle issues
- [x] T053 Conduct visual audit in browser verifying that brand colors, emblems, and typography render flawlessly

---

## Phase 12: Modernización UX/UI Material Design 3 Mobile-First (Priority: P1)

**Goal**: Purge all informal emojis across the entire UI and navigation, adopting Google's Material Design 3 (M3) design system and `@mui/icons-material` for an uncompromising, professional mobile-first clinical experience.

- [x] T054 [P] Install @mui/icons-material, @mui/material, @emotion/react, @emotion/styled
- [x] T055 [P] Refactor components/layout/TabNavigation.tsx implementing a canonical Material Design 3 NavigationBar with active pill container and vector Material icons
- [x] T056 [P] Refactor components/layout/Header.tsx implementing a Material Design 3 Top App Bar with vector Material icons and UJAT institutional styling
- [x] T057 [P] Purge emojis and introduce Material icons in components/forms/IdentificationForm.tsx and components/forms/ClinicalHistoryForm.tsx
- [x] T058 [P] Purge emojis and introduce Material icons in components/forms/IntraoralMatrixForm.tsx, components/forms/DiagnosisPlanForm.tsx, and components/forms/TreatmentLogForm.tsx
- [x] T059 [P] Purge emojis and introduce Material icons in components/forms/CameraCaptureInput.tsx and components/print/PrintContainer.tsx
- [x] T060 Run automated TypeScript and Next.js static export build (bun run build) to ensure 0 type errors or bundle issues
- [x] T061 Conduct visual audit in browser verifying that all emojis are replaced with Material icons and M3 mobile ergonomics are active

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — completed.
- **Foundational (Phase 2)**: Depends on Setup (Phase 1) — completed.
- **User Story 1 (Phase 3)**: Depends on Foundational (Phase 2) — completed.
- **User Story 5 (Phase 4)**: Depends on Foundational (Phase 2) — completed.
- **User Story 2 (Phase 5)**: Depends on Foundational (Phase 2) — completed.
- **User Story 6 (Phase 6)**: Depends on Foundational (Phase 2) and US1 — completed.
- **User Story 3 (Phase 7)**: Depends on Foundational (Phase 2) — completed.
- **User Story 4 (Phase 8)**: Depends on Foundational (Phase 2) — completed.
- **Polish (Phase 9)**: Quality gates, design system documentation, and builds verified — completed.
- **Phase 10 (Formatos Oficiales UJAT 1:1)**: Depends on Phase 6 & Phase 8 — completed.
- **Phase 11 (Identidad Visual UJAT Oficial)**: Depends on Phase 10 — completed.
- **Phase 12 (Material Design 3 Mobile-First)**: Depends on Phase 11; executes T054 through T061 — completed.

---

## Implementation Status Summary

- **Total Tasks**: 61 / 61 completadas (100%)
- **Static Export**: Generado con éxito en `out/`
- **Lint & TypeScript**: 0 errores, 0 advertencias
- **Material Design 3 & Ergonomía Mobile-First**: 100% libre de emojis, iconos vectoriales oficiales `@mui/icons-material` en navegación, cabeceras y formularios.

