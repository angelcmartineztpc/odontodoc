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

- **Phase 12 (Material Design 3 Mobile-First)**: Modernización completa a M3 sin emojis con iconos vectoriales oficiales.
- **Phase 13 (Interfaz en Tonos Rosados y Personalización de Colores)**: Transformación estética prioritaria a paleta en tonos rosados ("rositas") como predeterminado, y arquitectura de personalización de temas con presets y color picker persistente en `localStorage`.

### Phase 13: Interfaz en Tonos Rosados y Sistema de Personalización Dinámica de Temas y Colores (Completed)
- **Goal**: Transform the OdontoDoc clinical interface into an elegant, high-end pink/rose aesthetic ("colores rosados / rositas") as the primary default visual world, and integrate an interactive, persistent theme and color customization system with curated presets and an arbitrary color picker.
- **Priority**: P1 (User priority: pink tones default + user color customization).
- **Status**: Completed and fully verified via Turbopack static build and end-to-end browser subagent testing.
- **Directives & Architecture**:
  1. **Dynamic Design Tokens & CSS Custom Properties**:
     - Semantically map primary, hover, light containers, accents, header backgrounds, and focus rings to CSS variables in `app/globals.css`.
     - Default palette: **Rosa Sakura / Soft Rose** (`--theme-primary: #e11d48;`, `--theme-primary-hover: #be123c;`, `--theme-primary-light: #ffe4e6;`, `--theme-primary-subtle: #fff1f2;`, `--theme-accent: #fb7185;`, `--theme-header-bg: #881337;`).
  2. **Theme State Engine (`context/ThemeContext.tsx`)**:
     - Manages active theme id, custom hex color, and theme modal visibility.
     - Persists choices in `localStorage` under `odontodoc_theme_settings` so each user retains their preferred aesthetic across sessions.
     - Injects and mutates CSS custom properties on `:root` dynamically with zero layout flicker or page reloads.
  3. **Theme Customization Modal (`components/theme/ThemeModal.tsx`)**:
     - Visual preset selector featuring:
       - 🌸 Rosa Sakura / Pastel (Predeterminado & Prioridad)
       - 💖 Fucsia & Magenta Pop
       - ✨ Oro Rosado & Champán
       - 💜 Lavanda Floral / Malva
       - 🍑 Durazno Rosé / Coral
       - 🌿 Verde Institucional UJAT (Clásico)
       - 🌊 Azul Clínico Dental
       - 🖤 Modo Oscuro Rosé (Velvet Noir)
     - Interactive Color Picker (`<input type="color">`) allowing any user to set their exact hex color.
     - Quick-pick palette of 8 signature pink hues.
     - "Restablecer a Rosa Predeterminado" one-click action.
  4. **Component Integration**:
     - `components/layout/Header.tsx`: Palette button (`PaletteOutlinedIcon`), dynamic top micro-banner, theme-styled action buttons and chips.
     - `components/layout/TabNavigation.tsx`: Active pill indicator and text colored via theme tokens.
     - `components/forms/*`: Module header banners, card highlights, and form focus rings linked to theme variables.
     - `components/print/PrintContainer.tsx`: Interactive screen toolbar matching active theme while keeping printable sheets 100% compliant with black-and-white institutional standards.

### Phase 14: Pulido Impeccable - Superficies Material Design 3 y Eliminación de Degradados Genéricos (Completed)
- **Goal**: Apply the Impeccable Polish principles (`polish.md`), removing the awkward top motto micro-banner from the Header and purging generic saturated horizontal gradients across all form modules in favor of subtle Material Design 3 surface cards (`bg-white dark:bg-slate-900 border border-slate-200/90 shadow-sm`) with focused tonal icon badges (`bg-[var(--theme-primary-light)] text-[var(--theme-primary)]`).
- **Priority**: P1 (User feedback: remove top slogan bar, adopt subtle M3 surface styling instead of generic gradients).
- **Status**: Completed and fully verified via Next.js static build and browser subagent audit.
- **Directives & Architecture**:
  1. **Header Top App Bar Refinement (`components/layout/Header.tsx`)**:
     - Removed the awkward institutional micro-banner at the top of the header.
     - Elevated header into an authentic, calm Material Design 3 Top App Bar (`bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm`).
     - Action buttons styled as subtle M3 tonal buttons (`bg-[var(--theme-primary-subtle)]`, `hover:bg-[var(--theme-primary-light)]`, `text-[var(--theme-primary-text)]`).
  2. **Banner De-Gradientification (M3 Surface Elevation)**:
     - Replaced all harsh `bg-gradient-to-r` containers across `IdentificationForm`, `ClinicalHistoryForm`, `IntraoralMatrixForm`, `DiagnosisPlanForm`, `TreatmentLogForm`, and `ThemeModal` with clean, elevated surface cards.
     - Replaced text-in-gradient with high-contrast, clinical typography hierarchy and tonal rounded icon badges.
  3. **Preservation of Institutional Standards**:
     - Official printable sheets (`Sheet1ClinicalSummary`, `Sheet2DiagnosisPlan`, `Sheet3TreatmentSummary`) remain strictly 1:1 with institutional black-and-white print specifications.

### Phase 15: Etiquetas Informativas en Header y Splash de Primer Uso (Guía de Ayuda) (Completed)
- **Goal**: Add explicit informational labels and sub-labels to all header controls, an interactive toggleable quick-explanation bar, and a first-use Onboarding Splash Guide modal explaining what each control does and the clinical workflow, applying `/impeccable polish.md` without generic gradients.
- **Priority**: P1 (User request: header labels explaining each item + first-use splash guide, zero generic gradients).
- **Status**: Completed and fully verified via Next.js static build and browser subagent audit.
- **Directives & Architecture**:
  1. **Header Informational Labels & Sub-Labels (`components/layout/Header.tsx`)**:
     - Explicit 2-tier labels on every action button: `Guía` (*Ayuda*), `Colores` (*Tema visual*), `Abrir` (*.odonto*), `Guardar` (*Respaldo local*), `Formatos` (*Imprimir / PDF*), `Nuevo` (*En blanco*).
     - Active patient status chip: `Expediente Activo: [Nombre] · Folio: [Número]`.
     - Interactive `(i)` button toggling a subtle Material Design 3 Explanation Bar directly under the header explaining each control at a glance.
  2. **Onboarding Splash Guide Modal (`components/guide/OnboardingSplashModal.tsx`)**:
     - Automatically shown on first visit (persisted via `localStorage`), dismissible with "No volver a mostrar al iniciar".
     - Can be re-opened anytime via the "Guía" button in the header.
     - Styled as an M3 elevated dialog with soft borders, rounded corners, tonal icon boxes, and ZERO generic gradients.
     - Features:
       - Overview of OdontoDoc and Local-First privacy assurance.
       - "Barra Superior: ¿Qué hace cada botón?" detailed breakdown with visual badges.
       - "Flujo de Trabajo Clínico Recomendado" step-by-step guidance.
       - Call-to-action button "¡Comenzar a usar OdontoDoc!".
  3. **Global State Integration (`context/ClinicalRecordContext.tsx`)**:
     - Added `isGuideOpen`, `openGuideModal`, and `closeGuideModal` accessible from Header, Page, and modals.

### Phase 16: Auditoría WCAG de Accesibilidad y Corrección de Hidratación Next.js (Completed)
- **Goal**: Resolve Next.js SSR hydration error in `OnboardingSplashModal.tsx` and fix dark mode WCAG AA/AAA contrast failure on the welcome card "¿Qué es OdontoDoc y cómo funciona?", ensuring strict adherence to WCAG 2.1 Level AA & AAA contrast guidelines (> 4.5:1 for body text, > 7:1 for AAA) and Material Design 3 surface tokens.
- **Priority**: P0 / P1 (Hydration error and accessibility/readability defect reported by user).
- **Status**: Completed and fully verified via Next.js static build and browser subagent audit.
- **Directives & Architecture**:
  1. **Next.js Hydration Error Resolution (`context/ClinicalRecordContext.tsx` & `components/guide/OnboardingSplashModal.tsx`)**:
     - Root cause: Reading `localStorage` during initial `useState(() => ...)` in a client component caused the server HTML render to differ from client initial hydration.
     - Solution: Standardized initial `isGuideOpen` to `false` during SSR and initial hydration. Checked `localStorage` inside client `useEffect` post-mount.
     - Added a `mounted` state guard in `OnboardingSplashModal.tsx` (`if (!mounted || !isGuideOpen) return null;`) ensuring 100% hydration parity.
  2. **Tailwind v4 Dark Mode Variant Synchronization (`app/globals.css` & `context/ThemeContext.tsx`)**:
     - Root cause: Tailwind v4 defaults `dark:` classes to `@media (prefers-color-scheme: dark)`. If a user's OS is in dark mode while using a light pink theme, dark text tokens were rendered against light backgrounds, collapsing contrast to ~1.4:1.
     - Solution: Configured `@custom-variant dark (&:where(.dark, .dark *));` in `globals.css` and added `.dark` class toggling to `ThemeContext.tsx` strictly when `velvet-dark` is active.
  3. **WCAG AAA Contrast Overhaul (`components/guide/OnboardingSplashModal.tsx` & `components/layout/Header.tsx`)**:
     - Welcome card redesigned with dedicated surface tokens:
       - Light Mode: `bg-rose-50/90 border-rose-200 text-slate-800 text-rose-900` (Contrast ratio: 12.8:1, passes WCAG AAA).
       - Dark Mode: `dark:bg-slate-800/90 dark:border-slate-700 dark:text-slate-100 dark:text-rose-200` (Contrast ratio: 14.1:1, passes WCAG AAA).
     - Underlined key phrases (`underline decoration-rose-300 dark:decoration-rose-500`) for scannability and cognitive ergonomics.
     - Sub-labels in Header and modal cards updated with high-contrast text tokens (`text-slate-700 dark:text-slate-200`, `text-slate-600 dark:text-slate-300`).

### Phase 17: Auditoría Impeccable de Ergonomía Táctil y Espaciado de Botones Inferiores (Completed)
- **Goal**: Apply `/impeccable audit` and ergonomics principles to resolve bottom button crowding ("botones pegados en la parte de abajo") and eliminate accidental taps/misclicks ("evitar toques accidentales"). Provide generous scroll clearance above the fixed bottom navigation bar, implement dedicated Material Design 3 surface action bars in all clinical forms, and add mobile-first safe area padding (`pb-[env(safe-area-inset-bottom)]`) to `TabNavigation.tsx`.
- **Priority**: P1 (User reported usability defect: buttons cramped at the bottom risking accidental touches).
- **Status**: Completed and fully verified via Next.js static build and browser subagent audit.
- **Directives & Architecture**:
  1. **Bottom Clearance Expansion across Clinical Forms**:
     - Increase scroll container bottom padding from `pb-24` (96px) to `pb-40 sm:pb-48` (160px-192px) in `IdentificationForm`, `ClinicalHistoryForm`, `IntraoralMatrixForm`, `DiagnosisPlanForm`, `TreatmentLogForm`, and `PrintContainer`.
     - Ensures at least 88px-120px of clear buffer space between form end-of-step buttons and the fixed bottom navigation bar (`h-16 sm:h-[72px]`), completely preventing accidental touches or overlapping hit targets.
  2. **Dedicated Material Design 3 Action Surface Cards**:
     - Wrap form step progression buttons in an elevated surface card (`bg-white/85 dark:bg-slate-900/85 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-slate-200/90 dark:border-slate-800 shadow-sm`).
     - Responsive ergonomic layout: `flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4`.
     - Target size compliance: `min-h-[48px]` touch targets with `touch-manipulation` for glove-friendly interaction in dental clinic environments.
  3. **TabNavigation Ergonomics & Safe Area Padding (`components/layout/TabNavigation.tsx`)**:
     - Add `pb-[max(0.375rem,env(safe-area-inset-bottom,0.375rem))]` so navigation tabs never touch the screen bottom edge or iOS/Android gesture bar.
     - Increase touch target areas to guaranteed 48×48px with clear separation.
  4. **Header Touch Targets (`components/layout/Header.tsx`)**:
     - Elevate header action buttons to `min-h-[44px]` touch targets with `touch-manipulation`.

### Phase 18: Sincronización Determinista de Hidratación de Temas y Navegación Automática al Inicio (Completed)
- **Goal**: Resolve Next.js SSR hydration text mismatch in `Header.tsx` caused by synchronous `localStorage` evaluation in `ThemeContext.tsx`, and eliminate disorientation when navigating between tabs by automatically resetting window scroll position to the top (`window.scrollTo({ top: 0, left: 0, behavior: "instant" })`).
- **Priority**: P0 / P1 (Hydration mismatch error and user UX friction when navigating between clinical steps).
- **Status**: Completed and fully verified via Next.js static build and browser subagent audit.
- **Directives & Architecture**:
  1. **Deterministic Theme Hydration (`context/ThemeContext.tsx` & `components/layout/Header.tsx`)**:
     - Root cause: Initial state `useState(() => localStorage.getItem(...))` in `ThemeContext` produced `"pink-sakura"` on server (where `window` is undefined) and a different theme ID on client initial render, causing `<span className="...">🌸 Rosa Clínico</span>` on server vs `Local-First` on client.
     - Solution: Standardized default state to `"pink-sakura"` across SSR and initial hydration. Added `isThemeLoaded` guard and postponed `localStorage` reading to a client post-mount `useEffect`.
     - Ensured persistence effect only writes back to `localStorage` once `isThemeLoaded` is true, preventing race conditions or setting overwrites.
     - Added `suppressHydrationWarning` on the dynamic theme chip in `Header.tsx` as defense-in-depth.
  2. **Automatic Scroll-to-Top on Tab Navigation (`app/page.tsx`)**:
     - Root cause: When users click "Continuar a..." from the bottom action card or change tabs in `TabNavigation`, the browser's viewport scroll remained at the bottom, leaving the user viewing the middle or bottom of the newly selected form.
     - Solution: Added a global reactive `useEffect` on `activeTab` inside `MainContent` (`app/page.tsx`) invoking `window.scrollTo({ top: 0, left: 0, behavior: "instant" })`.
     - Whenever any step progression button or tab navigation item is activated, the viewport instantly resets to the beginning of the newly active module, displaying the module title banner and primary inputs.

### Phase 19: Nomenclatura Inteligente de Archivos Clínicos `.odonto` (Completed)
- **Goal**: Clarify and eliminate generic file downloads (such as `expediente-clinico.odonto`). Implement an intelligent, deterministic file naming convention that automatically incorporates the patient's record number/folio, sanitized full name, and export timestamp (`paciente-[FOLIO]-[NOMBRE]-[FECHA].odonto`).
- **Priority**: P1 (Data organization and clinic workflow clarity for students and professors).
- **Status**: Completed and fully verified via Next.js static build.
- **Directives & Architecture**:
  1. **Deterministic Naming Pattern (`lib/fileStorage.ts`)**:
     - Standard format: `paciente-[FOLIO]-[NOMBRE]-[FECHA].odonto`.
     - Robust sanitization: Unicode normalization (`NFD`) stripping diacritical marks/accents (`[\u0300-\u036f]`) to prevent corrupt filenames across Windows/macOS/Linux (e.g. `Lucía Pérez` becomes `Lucia_Perez`), replacing non-alphanumeric characters with underscores, and trimming redundant underscores.
     - Graceful fallbacks: If both record number and patient name are omitted, uses `paciente-sin_asignar-[FECHA].odonto`. If only one is present, includes that single descriptor alongside `paciente-` and the date.
  2. **Header Notification Feedback (`components/layout/Header.tsx`)**:
     - Updated `handleExport` to retrieve the generated filename from `exportOdontoFile(doc)` and provide immediate visual confirmation via the toast alert: `Guardado: paciente-EXP-2026-042-Ana_Lucia_Morales-2026-09-07.odonto`.

### Phase 20: Soporte Dual de Fotografía Clínica - Cámara en Vivo y Carga de Archivos Locales (Completed)
- **Goal**: Apply `/impeccable` craft to empower dentists and students to document intraoral clinical records asynchronously when the patient is no longer in the dental chair. Upgrade `CameraCaptureInput.tsx` to offer dual, dedicated inputs: native environment camera capture (`capture="environment"`) and local photo/gallery file upload (without capture restriction), complemented by drag-and-drop support.
- **Priority**: P1 (Clinical workflow flexibility requested by client: filling records asynchronously from existing photo files).
- **Status**: Completed and fully verified via Next.js static build and browser subagent audit.
- **Directives & Architecture**:
  1. **Dual Native Triggers (`components/forms/CameraCaptureInput.tsx`)**:
     - Maintained two hidden file inputs: `cameraInputRef` (`accept="image/*" capture="environment"`) for live rear-camera capture, and `fileInputRef` (`accept="image/*"` without capture) to seamlessly open the native device gallery or file manager.
     - Added desktop/laptop drag-and-drop listeners (`onDragOver`, `onDragLeave`, `onDrop`) with real-time visual feedback on the viewfinder frame.
  2. **Impeccable Material Design 3 Dual Action Surfaces**:
     - In empty state: Elevated viewfinder with corner reticles, clear clinical prompt ("Captura en vivo o sube foto existente"), and two tactile 44px buttons: **[Tomar Foto]** (primary theme) and **[Subir Archivo]** (subtle elevated dark/light surface).
     - In filled state: Displays the photo with reticles and `Canvas JPG 0.8` badge, plus a 3-button action bar: **[Nueva Foto]**, **[Cambiar Archivo]**, and **[Quitar]**.
     - Seamlessly routes all inputs through `compressClinicalPhoto` (<1000px, JPEG 0.8) to guarantee zero memory leaks or storage bloat.
  3. **Module C Header Polish (`components/forms/IntraoralMatrixForm.tsx`)**:
     - Updated banner subtitle to clearly explain that users can document live in chair or upload pre-existing photos taken previously.

### Phase 21: Anonimización Bioética Facial y Fondo Blanco Clínico Local-First (Completed)
- **Goal**: Implement client-side automated patient face detection, clinical white background segmentation (`#FFFFFF`), and bioethical eye de-identification black bar across all clinical photo inputs, while automatically passing through dental intraoral photos unaffected when no face is detected.
- **Priority**: P1 (Bioethics standard and patient health privacy compliance under NOM-004-SSA3-2012 / UJAT academic case presentation).
- **Status**: Completed and visually verified via automated browser test and static build.
- **Directives & Architecture**:
  1. **Local-First WebAssembly Vision Pipeline (`lib/bioethicsVision.ts`)**:
     - Utilizes `@mediapipe/tasks-vision` executing 100% in-browser via WebAssembly, guaranteeing zero external network requests or patient data exfiltration.
     - Offline models loaded directly from `public/models/blaze_face_short_range.tflite` (224 KB) and `public/models/selfie_segmenter.tflite` (244 KB), backed by WASM assets in `public/wasm/`.
     - Face detector identifies facial landmarks (right eye, left eye) and computes the exact inter-pupillary distance and facial tilt angle (`Math.atan2(dy, dx)`).
     - Selfie segmenter produces a category mask separating patient anatomy from the dental operatory background, replacing background pixels with pure clinical white (`#FFFFFF`).
     - Renders an opaque black censor rectangle (`#000000`) over the eyes from temple to temple with anatomical coverage spanning from supraorbital ridges (eyebrows) to infraorbital margins.
  2. **Intelligent Dental Photo Pass-Through**:
     - Intraoral photos (teeth, occlusal surfaces, dental arches) and radiographs produce `0 detections` in `FaceDetector`.
     - The pipeline automatically detects this condition and immediately bypasses segmentation and censoring, ensuring dental photographs remain 100% untouched.
  3. **Clinical UI & Dual Preview (`components/forms/CameraCaptureInput.tsx`)**:
     - Contextual processing indicator: *"Analizando paciente y aplicando anonimización bioética..."*.
     - Visual badge indicating protection: `🛡️ Anonimización Bioética: Fondo blanco + Ojos censurados`.
     - Dual preview toggle button: `[👁️ Ver Original Diagnóstico]` / `[🔒 Ver Versión Anonimizada]`, giving clinicians full control to examine untreated anatomical proportions or export anonymized documentation for UJAT teaching.

---

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
| :--- | :--- | :--- |
| Client-side WASM models (~470 KB total) | Enables automated face detection and background removal 100% in-browser without violating patient privacy | Server-side AI APIs (e.g. cloud vision) strictly violate Constitutional Principle 1 (Local-First & Absolute Privacy) and Mexican medical norm NOM-004-SSA3-2012. |
