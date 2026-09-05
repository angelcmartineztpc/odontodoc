<!--
Sync Impact Report:
- Version change: 1.0.1 → 1.0.2 (PATCH)
- Modified Principles: stripped auxiliary sections (Technical Constraints, Quality Gates) for a lean minimal constitution.
- Updated Governance wording for succinctness.
- No placeholders remain.
-->

# OdontoDoc Constitution

## Core Principles

### I. Local-First & Absolute Data Privacy (NON-NEGOTIABLE)
- **100% Offline SPA/PWA**: The app MUST run entirely client‑side with zero backend services.
- **Zero Cloud Leakage**: No transmission of clinical data, PII, or images to any external server or third‑party service.
- **File‑Based Persistence**: All data MUST be stored and retrieved exclusively via local `.odonto` files (UTF‑8 JSON containing Base64‑encoded images).

### II. Mobile‑First Ergonomics & Camera Pipeline (NON‑NEGOTIABLE)
- **Touch‑First UI**: Interfaces are designed for mobile touchscreens (≥44×44 px hit targets), suitable for chair‑side use.
- **Native Camera Access**: Photo inputs MUST use `<input type="file" accept="image/*" capture="environment">` to invoke the device rear camera.
- **Canvas Compression**: Captured images MUST be compressed in‑memory with an `HTMLCanvasElement` (max width 1000 px, JPEG quality 0.8) before entering app state.

### III. WYSIWYG Institutional Print Fidelity (NON‑NEGOTIABLE)
- **1:1 Official Replica**: Rendered clinical documents MUST match the official UJAT (DACS) forms for the three required sheets (Clinical Summary, Diagnosis & Treatment Plan, Treatment Summary).
- **Strict `@media print` Styles**: Print CSS must target Letter/A4 pages and hide all UI chrome, guaranteeing visual parity between on‑screen preview and printed/PDF output.

### IV. Single Source of Truth & Static Architecture (NON‑NEGOTIABLE)
- **Tech Stack**: React + Tailwind CSS with modern JavaScript/TypeScript.
- **Decoupled Components**: Capture forms and printable document views MUST be separate, modular components.
- **Real‑Time Sync**: A single reactive state store MUST keep capture data and print preview in perfect sync without manual refresh.

## Governance

- **Supremacy**: This Constitution overrides any informal decisions; code violating any of the four principles MUST be rejected.
- **Amendments**: Require documented justification, impact assessment on `.odonto` compatibility, and a semantic version bump.
- **Versioning Policy**:
  - **MAJOR**: Breaks offline architecture, privacy model, or `.odonto` format.
  - **MINOR**: Adds new clinical sheets or substantial features.
  - **PATCH**: Clarifications, streamlining, or non‑breaking updates.

**Version**: 1.0.2 | **Ratified**: 2026-09-05 | **Last Amended**: 2026-09-05
