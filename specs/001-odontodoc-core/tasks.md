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

## Phase 13: Interfaz en Tonos Rosados y Sistema de Personalización de Colores (Priority: P1)

**Goal**: Transform the OdontoDoc interface into a modern, refined pink/rose aesthetic ("colores rosados / rositas") as the primary default experience, and implement a flexible, persistent theme customization system allowing each user to choose among 8 curated presets or dial in a custom hex color.

- [x] T062 [P] Configure dynamic theme CSS custom properties and pink default tokens in app/globals.css
- [x] T063 [P] Implement ThemeContext and ThemeProvider with localStorage persistence and CSS variable injection in context/ThemeContext.tsx
- [x] T064 [P] Implement interactive ThemeModal component with 8 presets, color picker, and quick swatches in components/theme/ThemeModal.tsx
- [x] T065 [P] Integrate ThemeProvider in app/layout.tsx and app/page.tsx
- [x] T066 [P] Update components/layout/Header.tsx with theme customizer trigger button, dynamic banner, and pink styling
- [x] T067 [P] Update components/layout/TabNavigation.tsx with theme-driven active indicator and labels
- [x] T068 [P] Update components/forms/IdentificationForm.tsx and components/forms/ClinicalHistoryForm.tsx with dynamic theme banners and focus rings
- [x] T069 [P] Update components/forms/IntraoralMatrixForm.tsx, components/forms/DiagnosisPlanForm.tsx, and components/forms/TreatmentLogForm.tsx with dynamic theme banners and accents
- [x] T070 [P] Update components/forms/CameraCaptureInput.tsx and components/print/PrintContainer.tsx controls while preserving print black & white sheets
- [x] T071 [P] Update DESIGN.md to register theme architecture and pink primary design system tokens
- [x] T072 Run automated TypeScript and Next.js static export build (bun run build) to ensure 0 type errors or bundle issues
- [x] T073 Conduct visual audit in browser verifying pink default theme, theme switcher modal, and custom color picker

---

## Phase 14: Pulido Impeccable - Superficies Material Design 3 y Eliminación de Degradados Genéricos (Priority: P1)

**Goal**: Apply Impeccable Polish principles (`polish.md`), removing the awkward top slogan banner in `Header.tsx` and eliminating generic horizontal gradients across all form modules in favor of subtle Material Design 3 surface cards with tonal containers and high-contrast clinical typography.

- [x] T074 [P] Remove institutional micro-banner at the top of Header.tsx and elevate into a clean Material Design 3 Top App Bar
- [x] T075 [P] Replace generic gradient banners with M3 surface cards and tonal icon containers in components/forms/IdentificationForm.tsx and components/forms/ClinicalHistoryForm.tsx
- [x] T076 [P] Replace generic gradient banners with M3 surface cards and tonal badges in components/forms/IntraoralMatrixForm.tsx, components/forms/DiagnosisPlanForm.tsx, and components/forms/TreatmentLogForm.tsx
- [x] T077 [P] Refactor dialog header in components/theme/ThemeModal.tsx into a subtle M3 elevated card header
- [x] T078 Run automated TypeScript and Next.js static export build (bun run build) to ensure 0 type errors or bundle issues
- [x] T079 Conduct visual audit in browser verifying removal of top banner, subtle M3 surfaces across tabs, and theme modal

---

## Phase 15: Etiquetas Informativas en Header y Splash de Primer Uso (Guía de Ayuda) (Priority: P1)

**Goal**: Implement clear explicit labels and sub-labels on all Header buttons, an interactive quick-explanation banner, and a first-use Onboarding Splash Guide modal explaining what each control does and the clinical workflow, adhering strictly to `/impeccable polish.md` without generic gradients.

- [x] T080 [P] Implement OnboardingSplashModal component with M3 surfaces, control explanations, workflow steps, and localStorage persistence in components/guide/OnboardingSplashModal.tsx
- [x] T081 [P] Wire isGuideOpen, openGuideModal, and closeGuideModal state into context/ClinicalRecordContext.tsx
- [x] T082 [P] Refactor components/layout/Header.tsx with 2-tier explicit button labels (Guía, Colores, Abrir, Guardar, Formatos, Nuevo), active patient chip, and interactive (i) explanation bar
- [x] T083 [P] Mount OnboardingSplashModal in app/page.tsx
- [x] T084 Run automated TypeScript and Next.js static export build (bun run build) to ensure 0 type errors or bundle issues
- [x] T085 Conduct visual audit in browser verifying first-run splash guide, header button labels/sub-labels, explanation bar, and guide reopening

---

## Phase 16: Auditoría WCAG de Accesibilidad y Corrección de Hidratación Next.js (Priority: P0)

**Goal**: Eliminate Next.js SSR hydration mismatch in `OnboardingSplashModal.tsx` and elevate dark mode contrast on the welcome card "¿Qué es OdontoDoc y cómo funciona?" to WCAG AAA standards (> 12:1 contrast ratio) with decoupled Tailwind v4 dark mode class tokens.

- [x] T086 [P] Standardize isGuideOpen initialization and post-mount localStorage check in context/ClinicalRecordContext.tsx to eliminate Next.js hydration mismatch
- [x] T087 [P] Add mounted hydration guard in components/guide/OnboardingSplashModal.tsx to prevent client/server HTML divergence
- [x] T088 [P] Synchronize Tailwind v4 dark variant with .dark class in app/globals.css and context/ThemeContext.tsx
- [x] T089 [P] Re-architect welcome note and header labels with WCAG AAA contrast tokens (> 12:1) across Light and Dark modes in components/guide/OnboardingSplashModal.tsx and components/layout/Header.tsx
- [x] T090 Conduct browser subagent visual audit verifying 0 hydration errors on reload and WCAG AAA contrast in both Rosa Sakura and Velvet Noir dark mode

---

## Phase 17: Auditoría Impeccable de Ergonomía Táctil y Espaciado de Botones Inferiores (Priority: P1)

**Goal**: Eliminate bottom button crowding and accidental touches by expanding bottom clearance across all forms (`pb-40 sm:pb-48`), enclosing navigation actions in dedicated Material Design 3 surface cards with 48px touch targets, and adding safe-area padding to `TabNavigation.tsx`.

- [x] T091 [P] Update components/layout/TabNavigation.tsx with safe area bottom padding, increased hit targets (min 48px), and touch-manipulation
- [x] T092 [P] Refactor IdentificationForm.tsx and ClinicalHistoryForm.tsx with expanded bottom clearance (pb-44), dedicated M3 action surface cards, and 48px touch targets
- [x] T093 [P] Refactor IntraoralMatrixForm.tsx, DiagnosisPlanForm.tsx, and TreatmentLogForm.tsx with expanded bottom clearance (pb-44), dedicated M3 action surface cards, and 48px touch targets
- [x] T094 [P] Update PrintContainer.tsx and Header.tsx ensuring adequate bottom clearance and 44px min touch target sizes
- [x] T095 Run automated TypeScript and Next.js static export build (bun run build) to ensure 0 type errors or bundle issues
- [x] T096 Conduct visual audit in browser verifying generous bottom clearance, zero overlap with TabNavigation, and ergonomic touch targets

---

## Phase 18: Sincronización Determinista de Hidratación de Temas y Navegación Automática al Inicio (Priority: P0)

**Goal**: Eliminate Next.js SSR hydration text mismatch in `Header.tsx` by standardizing initial state and post-mount localStorage loading in `ThemeContext.tsx`, and automatically scroll the viewport to the top (`window.scrollTo({ top: 0, left: 0 })`) upon any tab navigation in `app/page.tsx`.

- [x] T097 [P] Refactor context/ThemeContext.tsx with deterministic initial state, isThemeLoaded guard, and post-mount localStorage loading to eliminate hydration mismatch
- [x] T098 [P] Add suppressHydrationWarning and ensure consistent dynamic chip rendering in components/layout/Header.tsx
- [x] T099 [P] Implement reactive automatic scroll-to-top on activeTab changes in app/page.tsx
- [x] T100 Run automated TypeScript and Next.js static export build (bun run build) to ensure 0 type errors or bundle issues
- [x] T101 Conduct visual audit in browser verifying 0 hydration mismatch errors on reload and verified instant top-scrolling on step navigation

---

## Phase 19: Nomenclatura Inteligente de Archivos Clínicos `.odonto` (Priority: P1)

**Goal**: Eliminate generic file download names (e.g. `expediente-clinico.odonto`) and implement an intelligent, deterministic file naming convention incorporating patient folio, sanitized patient name, and export timestamp (`paciente-[FOLIO]-[NOMBRE]-[FECHA].odonto`).

- [x] T102 [P] Implement `generateOdontoFilename(doc)` with Unicode NFD normalization, diacritic stripping, and folio/name/date composition in `lib/fileStorage.ts`
- [x] T103 [P] Update `exportOdontoFile(doc)` to return the generated filename string in `lib/fileStorage.ts`
- [x] T104 [P] Update `handleExport` in `components/layout/Header.tsx` to display the exact generated filename in the feedback toast
- [x] T105 Run automated TypeScript and Next.js static export build (`bun run build`) to ensure 0 type errors or bundle issues

---

## Phase 20: Soporte Dual de Fotografía Clínica - Cámara en Vivo y Carga de Archivos Locales (Priority: P1)

**Goal**: Apply `/impeccable` craft to empower dentists and students to document intraoral clinical records asynchronously when the patient is no longer in the dental chair. Upgrade `CameraCaptureInput.tsx` to offer dual, dedicated inputs: native environment camera capture (`capture="environment"`) and local photo/gallery file upload (without capture restriction), complemented by drag-and-drop support.

- [x] T106 [P] Implement dual hidden native file inputs (`cameraInputRef` with `capture="environment"` and `fileInputRef` without capture) in `components/forms/CameraCaptureInput.tsx`
- [x] T107 [P] Implement drag-and-drop event listeners (`onDragOver`, `onDragLeave`, `onDrop`) and interactive border styling in `components/forms/CameraCaptureInput.tsx`
- [x] T108 [P] Design Material Design 3 dual action buttons (Tomar Foto / Subir Archivo, and 3-button filled state) with 44px touch targets in `components/forms/CameraCaptureInput.tsx`
- [x] T109 [P] Update Module C header banner in `components/forms/IntraoralMatrixForm.tsx` to communicate dual live/deferred capture capability
- [x] T110 Run automated TypeScript and Next.js static export build (`bun run build`) and conduct visual audit in browser verifying dual camera/file inputs

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
- **Phase 13 (Interfaz Rosada & Personalización)**: Depends on Phase 12; executes T062 through T073 — completed.
- **Phase 14 (Pulido Impeccable M3 & Eliminación de Degradados)**: Depends on Phase 13; executes T074 through T079 — completed.
- **Phase 15 (Etiquetas en Header y Splash Guía de Primer Uso)**: Depends on Phase 14; executes T080 through T085 — completed.
- **Phase 16 (Auditoría WCAG de Accesibilidad y Corrección de Hidratación)**: Depends on Phase 15; executes T086 through T090 — completed.
- **Phase 17 (Ergonomía Táctil y Espaciado de Botones Inferiores)**: Depends on Phase 16; executes T091 through T096 — completed.
- **Phase 18 (Hidratación de Temas y Scroll al Inicio)**: Depends on Phase 17; executes T097 through T101 — completed.
- **Phase 19 (Nomenclatura Inteligente de Archivos .odonto)**: Depends on Phase 2 & Phase 18; executes T102 through T105 — completed.
- **Phase 20 (Soporte Dual de Fotografía Clínica)**: Depends on Phase 2 & Phase 14; executes T106 through T110 — completed.

---

## Implementation Status Summary

- **Total Tasks**: 110 / 110 completadas (100%)
- **Static Export**: Generado con éxito en `out/`
- **Lint & TypeScript**: 0 errores, 0 advertencias
- **Fotografía Clínica Dual**: Soporte simultáneo para disparo en vivo con cámara nativa o carga de fotos previas desde archivos/galería, con drag-and-drop y compresión en Canvas
- **Nomenclatura de Archivos**: Nombres inteligentes `paciente-[FOLIO]-[NOMBRE]-[FECHA].odonto` con saneamiento Unicode NFD y confirmación visual en el Header
- **Hidratación Next.js**: 0 errores o desajustes de SSR/hidratación en consola (determinista en ThemeContext y Header)
- **Navegación al Inicio (Scroll-to-top)**: 100% reactiva y automática en app/page.tsx al cambiar de pestaña
- **Accesibilidad & Contraste WCAG**: Cumplimiento estricto WCAG AA y AAA (> 12:1) en modo claro y modo oscuro
- **Ergonomía Táctil & Touch Targets**: 100% completado; holgura inferior ampliada a `pb-40 sm:pb-48` (> 100px de margen respecto a TabNavigation), tarjetas M3 y botones táctiles de 48px libres de colisión
- **Material Design 3 & Ergonomía Mobile-First**: 100% libre de emojis, iconos vectoriales oficiales `@mui/icons-material`.
- **Tema Rosado y Personalización**: 100% completado; paleta rosa sakura activa por defecto con persistencia en localStorage y modal interactivo de temas/colores.
- **Pulido Impeccable M3**: Header limpio sin cintillo incómodo, sustitución total de degradados horizontales genéricos por tarjetas de superficie M3 y contenedores tonales sutiles.
- **Etiquetas y Splash Guía de Ayuda**: Botones con etiquetas y sub-etiquetas descriptivas, barra interactiva de explicación, y modal de bienvenida con guía de primer uso persistente en localStorage.




