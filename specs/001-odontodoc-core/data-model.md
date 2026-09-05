# Data Model: OdontoDoc Core Clinical Record

**Feature Branch**: `001-odontodoc-core`  
**Date**: 2026-09-05  
**Context**: Schema and entity relationships for the offline `.odonto` data model.

---

## 1. Entity Relationship Overview

```text
+-------------------------------------------------------------+
|                     OdontoDocument (Root)                   |
|  - schemaVersion: string ("1.0.0")                          |
|  - metadata: DocumentMetadata                               |
+-------------------------------------------------------------+
        |                  |                 |             |
        v                  v                 v             v
+---------------+  +---------------+  +---------------+  +---------------+
| PatientData   |  | StudentData   |  | MedicalHistory|  | PhotosMatrix  |
+---------------+  +---------------+  +---------------+  +---------------+
        |                                                  |
        +--------------------------------------------------+
        |                                                  |
        v                                                  v
+-----------------------------+              +---------------------------+
| DiagnosisAndPlan            |              | TreatmentLog              |
| - dentalDiagnoses: Record[] |              | - entries: LogEntry[]     |
| - phases: TreatmentPhase[]  |              +---------------------------+
+-----------------------------+
```

---

## 2. Entity Definitions

### 2.1 `OdontoDocument` (Root Aggregate)
The root object that encapsulates the entire clinical dossier for a single patient. Serialized directly to and from `.odonto` files.

| Field | Type | Description | Validation / Constraints |
| :--- | :--- | :--- | :--- |
| `schemaVersion` | `string` | Semantic version of the document schema | MUST be valid SemVer (e.g. `"1.0.0"`) |
| `metadata` | `DocumentMetadata` | Audit timestamps and application information | Mandatory |
| `patient` | `PatientData` | Patient demographic and identification data | Mandatory |
| `student` | `StudentData` | Dental student/operator & supervisor data | Mandatory |
| `medicalHistory` | `MedicalHistory` | General health anamnesis and vital signs | Mandatory (Hoja 1) |
| `photos` | `PhotographicMatrix` | Extraoral and intraoral photographic set | Compressed Base64 Data URIs |
| `diagnosisAndPlan` | `DiagnosisAndPlan` | Clinical diagnosis and phased treatment plan | Mandatory (Hoja 2) |
| `treatmentLog` | `TreatmentLog` | Chronological session-by-session clinical log | Array of entries (Hoja 3) |

---

### 2.2 `DocumentMetadata`
Auditing and version tracking metadata.

| Field | Type | Description | Validation / Constraints |
| :--- | :--- | :--- | :--- |
| `id` | `string` | Unique document identifier | UUID v4 |
| `createdAt` | `string` | Creation timestamp | ISO-8601 UTC string |
| `updatedAt` | `string` | Last modification timestamp | ISO-8601 UTC string |
| `appVersion` | `string` | Version of the OdontoDoc application used | E.g. `"0.1.0"` |

---

### 2.3 `PatientData` (Ficha de Identificación)
Demographic and primary contact information of the patient.

| Field | Type | Description | Validation / Constraints |
| :--- | :--- | :--- | :--- |
| `recordNumber` | `string` | Expediente / Folio institucional | Optional / User-assigned string |
| `fullName` | `string` | Nombre completo del paciente | Mandatory, non-empty |
| `age` | `number` | Edad en años cumplidos | Integer, $0 \le \text{age} \le 120$ |
| `gender` | `"M" \| "F" \| "Otro"` | Sexo / Género del paciente | Mandatory enum |
| `dateOfBirth` | `string` | Fecha de nacimiento | YYYY-MM-DD |
| `occupation` | `string` | Ocupación laboral | Optional string |
| `phone` | `string` | Teléfono de contacto | Optional string |
| `address` | `string` | Domicilio habitual | Optional string |
| `consultationReason`| `string` | Motivo principal de la consulta | Mandatory, non-empty |

---

### 2.4 `StudentData` (Datos del Operador Universitario)
Academic identification of the student practitioner and faculty supervisor.

| Field | Type | Description | Validation / Constraints |
| :--- | :--- | :--- | :--- |
| `studentName` | `string` | Nombre del alumno operador | Mandatory |
| `enrollmentId` | `string` | Matrícula de la UJAT | Mandatory string |
| `semester` | `string` | Semestre y grupo clínico | E.g. `"8vo A"` |
| `subject` | `string` | Asignatura clínica cursada | E.g. `"Clínica Integral del Adulto"` |
| `supervisorName`| `string` | Nombre del docente / instructor clínico | Mandatory |

---

### 2.5 `MedicalHistory` (Historia Médica & Exploración - Hoja 1)
Clinical anamnesis, vital signs, and regional stomatological examination.

| Field | Type | Description | Validation / Constraints |
| :--- | :--- | :--- | :--- |
| `hereditaryConditions` | `string` | Antecedentes heredo-familiares | Multiline text |
| `pathologicalBackground` | `string` | Antecedentes personales patológicos | Multiline text (enfermedades, alergias, cx) |
| `nonPathologicalBackground`| `string` | Antecedentes personales no patológicos | Multiline text (higiene, hábitos) |
| `vitalSigns` | `VitalSigns` | Tensión arterial, FC, FR, temperatura | Sub-object |
| `stomatologicalExam` | `string` | Examen de tejidos blandos y articulación | Multiline text |

#### `VitalSigns`:
- `bloodPressure`: `string` (e.g. `"120/80 mmHg"`)
- `heartRate`: `number` (bpm)
- `respiratoryRate`: `number` (rpm)
- `temperature`: `number` (°C)

---

### 2.6 `PhotographicMatrix` (Galería Clínica)
Standardized photographic record. All photos MUST be stored as compressed Base64 JPEG data URIs (`data:image/jpeg;base64,...`) scaled to max 1000px.

| Field | Type | Description | Required View |
| :--- | :--- | :--- | :--- |
| `extraoralFrontal` | `string \| null` | Foto extraoral de frente / sonrisa | Facial frontal |
| `intraoralFrontal` | `string \| null` | Foto intraoral en oclusión frontal | Oclusión anterior |
| `intraoralUpper` | `string \| null` | Foto oclusal arcada superior | Arcada maxilar |
| `intraoralLower` | `string \| null` | Foto oclusal arcada inferior | Arcada mandibular |
| `intraoralRight` | `string \| null` | Foto lateral derecha en oclusión | Relación molar derecha |
| `intraoralLeft` | `string \| null` | Foto lateral izquierda en oclusión | Relación molar izquierda |

---

### 2.7 `DiagnosisAndPlan` (Diagnóstico y Plan de Tratamiento - Hoja 2)
Integrative diagnosis and treatment roadmap.

| Field | Type | Description |
| :--- | :--- | :--- |
| `generalDiagnosis` | `string` | Diagnóstico general estomatológico (dental, pulpar, periodontal, oclusal) |
| `teethRecords` | `Record<string, ToothDiagnosis>` | Mapeo de diagnóstico por órgano dentario (FDI: 11-48, 51-85) |
| `phase1Preventive` | `string` | Actividades Fase 1: Preventiva / Profilaxis |
| `phase2Curative` | `string` | Actividades Fase 2: Operatoria / Endodoncia / Cirugía |
| `phase3Rehabilitative`| `string` | Actividades Fase 3: Prótesis / Rehabilitación |
| `prognosis` | `string` | Pronóstico clínico (Favorable, Reservado, Desfavorable) |

---

### 2.8 `TreatmentLog` & `LogEntry` (Resumen del Tratamiento - Hoja 3)
Chronological record of clinical sessions.

| Field | Type | Description | Validation |
| :--- | :--- | :--- | :--- |
| `entries` | `LogEntry[]` | Lista secuencial de atenciones clínicas | Ordered chronologically |

#### `LogEntry`:
- `id`: `string` (UUID v4)
- `date`: `string` (YYYY-MM-DD)
- `toothOrZone`: `string` (e.g. `"O.D. 16"` o `"Arcada Superior"`)
- `procedure`: `string` (e.g. `"Resina compuesta clase II OD"`)
- `evolutionNotes`: `string` (Notas clínicas y recomendaciones)
- `status`: `"pre" \| "durante" \| "post" \| "concluido"`
- `instructorSignatureConfirmed`: `boolean` (Indica si cuenta con visto bueno del docente)

---

## 3. State Transitions & Lifecycle

```text
[Nuevo Expediente]
       |
       v
(Estado Inicial Vacio) <---+ (Importar archivo .odonto)
       |                   |
       +---> [Captura Táctil de Datos & Fotos (En memoria)]
       |            |
       |            +---> [Canvas Compression Pipeline] ---> [Actualizacion SSoT]
       |                                                            |
       +---> [Previsualizacion WYSIWYG en Tiempo Real] <------------+
       |            |
       |            +---> [Impresion / Descarga PDF (@media print)]
       |
       +---> [Exportar archivo .odonto (Descarga JSON)]
```
