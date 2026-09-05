# Quickstart Validation Guide: OdontoDoc Core Feature

**Feature Branch**: `001-odontodoc-core`  
**Date**: 2026-09-05  

This guide provides end-to-end manual and automated validation scenarios to verify that the OdontoDoc Core Clinical Workflow functions properly against the requirements defined in [spec.md](./spec.md) and the [OdontoDoc Constitution](../../.specify/memory/constitution.md).

---

## 1. Prerequisites & Environment Setup

1. **Runtime**: Node.js 20+ or Bun 1.2+ installed.
2. **Dependencies**:
   ```bash
   bun install # or npm install
   ```
3. **Run Dev Server**:
   ```bash
   bun run dev # or npm run dev
   ```
4. **Access Application**:
   Open browser at `http://localhost:3000` (or mobile emulator/phone connected to local network).

---

## 2. Validation Scenarios

### Scenario 1: Offline Verification & Zero Network Leaks (Principle I)
- **Objective**: Prove that the application works without internet connectivity and makes zero external network calls.
- **Steps**:
  1. Open Chrome DevTools (`F12`) -> Network tab.
  2. Filter by `Fetch/XHR`.
  3. Set network throttling to **Offline**.
  4. Navigate through all modules (Ficha, Fotografías, Diagnóstico, Bitácora, Vista Previa).
- **Expected Outcome**:
  - All tabs and views load instantaneously.
  - Zero outgoing requests appear in the Network tab.
  - No errors or network failure toasts are triggered.

---

### Scenario 2: Chairside Touch Data Entry & Single Source of Truth (Principle IV)
- **Objective**: Verify that editing form fields immediately updates the print preview in real time.
- **Steps**:
  1. Go to "Ficha de Identificación".
  2. Input:
     - Nombre del Paciente: `"Carlos Méndez López"`
     - Edad: `28`
     - Alumno: `"María Fernanda Silva"`
     - Matrícula: `"212E45012"`
  3. Open the "Vista Previa" (Hoja 1: Resumen Clínico) side-by-side or switch to the Preview tab.
- **Expected Outcome**:
  - The institutional header and identification table in Hoja 1 display `"Carlos Méndez López"`, `"28"`, and `"María Fernanda Silva"` immediately without clicking any "Guardar" or "Sincronizar" button.

---

### Scenario 3: Native Camera & Canvas Compression Pipeline (Principle II)
- **Objective**: Confirm that photo inputs compress raw camera images in memory before updating state.
- **Steps**:
  1. In "Resumen Clínico", click the camera trigger for "Fotografía Extraoral".
  2. Select/take a high-resolution sample image (e.g. 12MP-48MP JPEG, ~5MB+).
  3. Inspect the resulting preview thumbnail.
- **Expected Outcome**:
  - The image compresses in $<1.5\text{s}$.
  - The Base64 data URI generated in state reflects dimensions bounded to $\le 1000\text{px}$ width.
  - Memory usage remains stable without mobile browser crashes.

---

### Scenario 4: Export and Import of `.odonto` File (Principle I)
- **Objective**: Prove full fidelity roundtrip persistence using the custom `.odonto` format.
- **Steps**:
  1. Complete patient data, capture at least 1 photo, and add 1 entry in the Bitácora.
  2. Click **"Exportar Expediente (.odonto)"**.
  3. Verify that a file named `expediente-[folio].odonto` downloads.
  4. Inspect the file in a text editor to confirm it is valid UTF-8 JSON complying with [odonto-file-schema.json](./contracts/odonto-file-schema.json).
  5. Refresh/clear the application state.
  6. Click **"Importar Expediente (.odonto)"** and select the exported file.
- **Expected Outcome**:
  - 100% of patient data, photos, diagnosis notes, and session logs are restored into the form and the print preview.

---

### Scenario 5: Institutional WYSIWYG Print & PDF Export (Principle III)
- **Objective**: Validate that physical print or browser PDF export produces exact 1:1 UJAT formats without UI chrome.
- **Steps**:
  1. Switch to "Vista Previa de Notas Oficiales".
  2. Click "Imprimir / Exportar PDF" (or press `Ctrl+P` / `Cmd+P`).
  3. Inspect the print preview modal.
- **Expected Outcome**:
  - All application buttons, tabs, navigation bars, and inputs are completely invisible (`display: none`).
  - Exactly 3 structured pages (Letter / Carta) are displayed, matching official UJAT DACS formats:
    - Página 1: Resumen Clínico con foto extraoral.
    - Página 2: Diagnóstico y Plan de Tratamiento con matriz intraoral.
    - Página 3: Resumen del Tratamiento (Bitácora de Citas).
