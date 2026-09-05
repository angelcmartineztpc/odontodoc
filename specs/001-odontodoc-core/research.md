# Research & Technical Decisions: OdontoDoc Core Clinical Workflow

**Feature Branch**: `001-odontodoc-core`  
**Date**: 2026-09-05  
**Context**: Static Local-First Clinical Web App for UJAT Dental Students & Faculty  

---

## 1. Local-First Static Architecture & Runtime Hosting

### Decision
Deploy OdontoDoc as a **100% static client-side Single Page Application (SPA)** utilizing React 19 and Next.js static HTML export (`output: 'export'`) with Tailwind CSS v4.

### Rationale
- **Zero Backend / Complete Privacy**: No patient data or clinical imagery can ever touch a server, adhering strictly to Constitution Principle I (Non-Negotiable).
- **Offline Reliability in Clinic**: Dental clinic areas and chairside stations at UJAT DACS often have intermittent or absent Wi-Fi; static hosting bundled with PWA service worker caching ensures the entire application loads and functions indefinitely without connectivity.
- **Next.js Static Export Compatibility**: Existing Next.js 16 + React 19 scaffold can generate a static HTML/JS/CSS bundle (`next build` with `output: 'export'`), producing purely static assets deployable anywhere or run locally with `npx serve` or any static file server.

### Alternatives Considered
- *Full-stack Next.js with Server Actions / API Routes*: Rejected because it introduces a backend requirement, violating Constitution Principle I and creating privacy/cloud liability.
- *Vanilla JS without Framework*: Rejected due to complex state synchronization requirements between tactile capture forms and 3 real-time institutional print sheets.
- *Desktop-only Electron application*: Rejected because it prevents students from using their smartphones at the dental chairside.

---

## 2. In-Memory Canvas Photographic Compression Pipeline

### Decision
Implement an offscreen `HTMLCanvasElement` processing utility (`compressClinicalPhoto(file: File): Promise<string>`) that takes raw image inputs from `<input type="file" accept="image/*" capture="environment">`, downscales to a bounding box of max 1000px width/height while preserving aspect ratio, encodes to JPEG quality 0.8, and releases object URLs via `URL.revokeObjectURL`.

### Rationale
- **RAM Protection on Mobile**: Modern smartphone cameras produce raw images between 12MP and 48MP (4MB to 20MB per photo). Storing 6 raw photos in React state or Base64 causes mobile Safari/Chrome to exceed memory thresholds, leading to browser crashes (OOM - Out Of Memory).
- **Deterministic File Size**: At 1000px max width and JPEG 0.8, each image compresses to ~120KB - 250KB. A full `.odonto` record containing all 6 photos consumes <1.5MB total.
- **Client-Side Pure Execution**: Operates synchronously or via promises using standard browser Canvas APIs without external heavy libraries (e.g. OpenCV, WebAssembly).

### Alternatives Considered
- *Browser-image-compression / external npm library*: Rejected to avoid third-party dependencies, potential network telemetry risks, and bundle bloat.
- *WebP Encoding*: Rejected in favor of JPEG (`image/jpeg`) because JPEG 0.8 offers universal Base64 rendering across all mobile webviews, PDF export engines, and legacy print engines without decoding glitches.
- *Storing uncompressed originals*: Rejected by Constitution Principle II.

---

## 3. Single Source of Truth (SSoT) Reactive State Architecture

### Decision
Utilize a centralized React Context with a pure `useReducer` pattern (`ClinicalRecordProvider` and `useClinicalRecord`), exposing typed action dispatchers for atomic state mutations, coupled with a real-time reactive subscriber for the print view preview.

### Rationale
- **Bidirectional Consistency**: When a student enters blood pressure, a tooth diagnosis, or captures an intraoral photo, the change must immediately reflect in the print preview without manual "Sync" buttons.
- **Predictable Serialization**: The reducer's state tree matches the exact JSON schema of the `.odonto` file format, making serialization (`JSON.stringify(state)`) and deserialization (`JSON.parse(fileContent)`) instant and deterministic.
- **Undo / Redo Readiness**: Pure reducer state transitions allow simple snapshotting if clinical history rollbacks are needed.

### Alternatives Considered
- *External state managers (Redux Toolkit, Zustand, MobX)*: Unnecessary external dependency overhead; React's built-in `useReducer` and Context API handle the required single-document scope cleanly with zero added bundle weight.
- *Uncontrolled form refs*: Leads to state drift and prevents real-time WYSIWYG preview synchronization.

---

## 4. WYSIWYG Print & Institutional Document Generation

### Decision
Implement the 3 official UJAT DACS clinical sheets using pure semantic HTML and Tailwind CSS with explicit `@media print` rules, `@page` dimension declarations (Letter: `215.9mm x 279.4mm`), and `break-after: page` separators.

### Rationale
- **Pixel-Perfect Institutional Replication**: UJAT clinical formats require exact institutional logos, tabular arrangements, tooth grid numbers, and supervisor signature boxes. CSS print stylesheets guarantee 1:1 fidelity matching physical photocopies.
- **Native Browser Engine**: Triggering `window.print()` allows the user to directly output to a physical clinic printer or export to vector-sharp PDF using the native Chromium/WebKit PDF engine, with zero server-side rendering latency.
- **Elimination of UI Chrome**: `@media print` explicitly applies `display: none !important` to headers, bottom navigation bars, tactile input triggers, and modal overlays.

### Alternatives Considered
- *Client-side PDF generators (jsPDF, pdfmake)*: Generating complex dental charts, tables, and typography via canvas/vector drawing APIs often results in font clipping, blurry borders, and difficult maintenance compared to standard HTML/CSS.
- *Server-side Puppeteer/Headless Chrome*: Violates offline and zero-backend constitution constraints.

---

## 5. `.odonto` File Structure & Local File System I/O

### Decision
Adopt a standardized UTF-8 JSON document format encapsulated under the `.odonto` file extension. The browser's native `<input type="file" accept=".odonto,application/json">` handles file ingestion, and dynamically generated Blob URL downloads (`<a download="expediente-[folio].odonto">`) handle export.

### Rationale
- **Cross-Platform Portability**: Files can be AirDropped, emailed, backed up on flash drives, or saved to device local files without proprietary databases.
- **Integrity Verification**: The schema includes `schemaVersion`, `createdAt`, `updatedAt`, `appVersion`, and an optional checksum, ensuring that incompatible or corrupted files are detected before state mutation.
- **Human & Machine Readable**: JSON ensures longevity; if OdontoDoc updates in future semesters, migration scripts can easily transform past `.odonto` records.

### Alternatives Considered
- *IndexedDB / LocalStorage as sole persistence*: Volatile on iOS Safari (which purges client storage after 7 days of inactivity without PWA installation). File export provides permanent student sovereignty over patient records.
- *SQLite WASM*: Overkill for single-patient clinical dossiers; introduces unnecessary WASM payload and binary opacity.
