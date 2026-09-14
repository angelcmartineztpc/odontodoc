import {
  OdontoDocument,
  PatientData,
  StudentData,
  MedicalHistory,
  VitalSigns,
  PhotographicMatrix,
  DiagnosisAndPlan,
  LogEntry,
  TreatmentSession,
} from "@/lib/types";
import { createEmptyOdontoDocument } from "./initialClinicalState";

export type ClinicalAction =
  | { type: "UPDATE_PATIENT"; payload: Partial<PatientData> }
  | { type: "UPDATE_STUDENT"; payload: Partial<StudentData> }
  | { type: "UPDATE_MEDICAL_HISTORY"; payload: Partial<Omit<MedicalHistory, "vitalSigns">> }
  | { type: "UPDATE_VITAL_SIGNS"; payload: Partial<VitalSigns> }
  | { type: "UPDATE_PHOTO"; payload: { slot: keyof PhotographicMatrix; dataUrl: string | null } }
  | { type: "UPDATE_DIAGNOSIS_PLAN"; payload: Partial<DiagnosisAndPlan> }
  | { type: "SET_TOOTH_DIAGNOSIS"; payload: { tooth: string; diagnosis: string } }
  | { type: "ADD_LOG_ENTRY"; payload: LogEntry }
  | { type: "UPDATE_LOG_ENTRY"; payload: LogEntry }
  | { type: "DELETE_LOG_ENTRY"; payload: { id: string } }
  | { type: "UPDATE_TREATMENT_SESSION"; payload: Partial<TreatmentSession> }
  | { type: "ADD_SESSION_PHOTO"; payload: { section: "before" | "during" | "after" | "xray"; dataUrl: string } }
  | { type: "REMOVE_SESSION_PHOTO"; payload: { section: "before" | "during" | "after" | "xray"; index: number } }
  | { type: "LOAD_DOCUMENT"; payload: OdontoDocument }
  | { type: "RESET_DOCUMENT" };

export function clinicalRecordReducer(
  state: OdontoDocument,
  action: ClinicalAction
): OdontoDocument {
  const timestamp = new Date().toISOString();

  switch (action.type) {
    case "UPDATE_PATIENT":
      return {
        ...state,
        metadata: { ...state.metadata, updatedAt: timestamp },
        patient: { ...state.patient, ...action.payload },
      };

    case "UPDATE_STUDENT":
      return {
        ...state,
        metadata: { ...state.metadata, updatedAt: timestamp },
        student: { ...state.student, ...action.payload },
      };

    case "UPDATE_MEDICAL_HISTORY":
      return {
        ...state,
        metadata: { ...state.metadata, updatedAt: timestamp },
        medicalHistory: { ...state.medicalHistory, ...action.payload },
      };

    case "UPDATE_VITAL_SIGNS":
      return {
        ...state,
        metadata: { ...state.metadata, updatedAt: timestamp },
        medicalHistory: {
          ...state.medicalHistory,
          vitalSigns: { ...state.medicalHistory.vitalSigns, ...action.payload },
        },
      };

    case "UPDATE_PHOTO":
      return {
        ...state,
        metadata: { ...state.metadata, updatedAt: timestamp },
        photos: {
          ...state.photos,
          [action.payload.slot]: action.payload.dataUrl,
        },
      };

    case "UPDATE_DIAGNOSIS_PLAN":
      return {
        ...state,
        metadata: { ...state.metadata, updatedAt: timestamp },
        diagnosisAndPlan: { ...state.diagnosisAndPlan, ...action.payload },
      };

    case "SET_TOOTH_DIAGNOSIS":
      return {
        ...state,
        metadata: { ...state.metadata, updatedAt: timestamp },
        diagnosisAndPlan: {
          ...state.diagnosisAndPlan,
          teethRecords: {
            ...state.diagnosisAndPlan.teethRecords,
            [action.payload.tooth]: action.payload.diagnosis,
          },
        },
      };

    case "ADD_LOG_ENTRY":
      return {
        ...state,
        metadata: { ...state.metadata, updatedAt: timestamp },
        treatmentLog: {
          ...state.treatmentLog,
          entries: [...state.treatmentLog.entries, action.payload],
        },
      };

    case "UPDATE_LOG_ENTRY":
      return {
        ...state,
        metadata: { ...state.metadata, updatedAt: timestamp },
        treatmentLog: {
          ...state.treatmentLog,
          entries: state.treatmentLog.entries.map((entry) =>
            entry.id === action.payload.id ? action.payload : entry
          ),
        },
      };

    case "DELETE_LOG_ENTRY":
      return {
        ...state,
        metadata: { ...state.metadata, updatedAt: timestamp },
        treatmentLog: {
          ...state.treatmentLog,
          entries: state.treatmentLog.entries.filter(
            (entry) => entry.id !== action.payload.id
          ),
        },
      };

    case "UPDATE_TREATMENT_SESSION":
      return {
        ...state,
        metadata: { ...state.metadata, updatedAt: timestamp },
        treatmentSession: {
          ...(state.treatmentSession || createEmptyOdontoDocument().treatmentSession!),
          ...action.payload,
        },
      };

    case "ADD_SESSION_PHOTO": {
      const currentSession = state.treatmentSession || createEmptyOdontoDocument().treatmentSession!;
      const sectionKey = action.payload.section;
      const currentList = Array.isArray(currentSession.photos?.[sectionKey])
        ? currentSession.photos[sectionKey]
        : [];

      return {
        ...state,
        metadata: { ...state.metadata, updatedAt: timestamp },
        treatmentSession: {
          ...currentSession,
          photos: {
            ...currentSession.photos,
            [sectionKey]: [...currentList, action.payload.dataUrl],
          },
        },
      };
    }

    case "REMOVE_SESSION_PHOTO": {
      const currentSession = state.treatmentSession || createEmptyOdontoDocument().treatmentSession!;
      const sectionKey = action.payload.section;
      const currentList = Array.isArray(currentSession.photos?.[sectionKey])
        ? currentSession.photos[sectionKey]
        : [];

      return {
        ...state,
        metadata: { ...state.metadata, updatedAt: timestamp },
        treatmentSession: {
          ...currentSession,
          photos: {
            ...currentSession.photos,
            [sectionKey]: currentList.filter((_, i) => i !== action.payload.index),
          },
        },
      };
    }

    case "LOAD_DOCUMENT": {
      const loaded = action.payload;
      const defaultDoc = createEmptyOdontoDocument();
      const normalizedPhotos: PhotographicMatrix = {
        ...defaultDoc.photos,
        ...(loaded.photos || {}),
      };
      const loadedSession = loaded.treatmentSession || defaultDoc.treatmentSession!;
      const rawPhotos = loadedSession.photos as unknown as Record<string, unknown> | undefined;
      const toArray = (val: unknown): string[] => {
        if (Array.isArray(val)) return val.filter((item): item is string => typeof item === "string");
        if (typeof val === "string" && val.length > 0) return [val];
        return [];
      };
      const normalizedSession = {
        ...loadedSession,
        photos: {
          before: toArray(rawPhotos?.before),
          during: toArray(rawPhotos?.during),
          after: toArray(rawPhotos?.after),
          xray: toArray(rawPhotos?.xray),
        },
      };

      return {
        ...loaded,
        photos: normalizedPhotos,
        treatmentSession: normalizedSession,
        metadata: {
          ...loaded.metadata,
          updatedAt: timestamp,
        },
      };
    }

    case "RESET_DOCUMENT":
      return createEmptyOdontoDocument();

    default:
      return state;
  }
}
