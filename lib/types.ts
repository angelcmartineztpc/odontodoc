/**
 * Domain TypeScript types for OdontoDoc Clinical System
 * Conforms to specs/001-odontodoc-core/data-model.md and odonto-file-schema.json
 */

export interface DocumentMetadata {
  id: string;
  createdAt: string;
  updatedAt: string;
  appVersion: string;
}

export type Gender = "M" | "F" | "Otro";

export interface PatientData {
  recordNumber: string; // Folio / No. Expediente
  fullName: string;
  age: number | string;
  gender: Gender;
  dateOfBirth: string;
  occupation: string;
  phone: string;
  address: string;
  consultationReason: string;
}

export interface StudentData {
  studentName: string;
  enrollmentId: string; // Matrícula UJAT
  semester: string;
  subject: string;
  supervisorName: string;
}

export interface VitalSigns {
  bloodPressure: string; // e.g. "120/80 mmHg"
  heartRate: number | string; // bpm
  respiratoryRate: number | string; // rpm
  temperature: number | string; // °C
  weight?: number | string; // kg (e.g. 74)
  height?: number | string; // m o cm (e.g. 1.62)
}

export interface MedicalHistory {
  hereditaryConditions: string;
  pathologicalBackground: string;
  nonPathologicalBackground: string;
  vitalSigns: VitalSigns;
  stomatologicalExam: string;
}

export interface PhotographicMatrix {
  extraoralFrontal: string | null;
  intraoralFrontal: string | null;
  intraoralUpper: string | null;
  intraoralLower: string | null;
  intraoralRight: string | null;
  intraoralLeft: string | null;
}

export interface DiagnosisAndPlan {
  generalDiagnosis: string;
  teethRecords: Record<string, string>; // FDI key -> diagnosis text (e.g. "16": "Caries oclusal")
  phase1Preventive: string;
  phase2Curative: string;
  phase3Rehabilitative: string;
  prognosis: string;
}

export type TreatmentStatus = "pre" | "durante" | "post" | "concluido";

export interface ProcedureStep {
  stepNumber: number;
  title: string;
  description: string;
}

export interface ProcedurePhotos {
  before: string | null;
  during: string | null;
  after: string | null;
}

export interface TreatmentSession {
  diagnosis: string;
  treatmentName: string;
  receiptNumber: string;
  date: string;
  steps: ProcedureStep[];
  photos: ProcedurePhotos;
}

export interface LogEntry {
  id: string;
  date: string;
  toothOrZone: string;
  procedure: string;
  evolutionNotes: string;
  status: TreatmentStatus;
  instructorSignatureConfirmed: boolean;
  receiptNumber?: string;
  diagnosis?: string;
}

export interface TreatmentLog {
  entries: LogEntry[];
}

export interface OdontoDocument {
  schemaVersion: string;
  metadata: DocumentMetadata;
  patient: PatientData;
  student: StudentData;
  medicalHistory: MedicalHistory;
  photos: PhotographicMatrix;
  diagnosisAndPlan: DiagnosisAndPlan;
  treatmentLog: TreatmentLog;
  treatmentSession?: TreatmentSession;
}

export type ActiveTab =
  | "identification"
  | "history"
  | "photos"
  | "diagnosis"
  | "log"
  | "print";
