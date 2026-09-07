"use client";

import React, { createContext, useContext, useReducer, useState, ReactNode } from "react";
import {
  OdontoDocument,
  ActiveTab,
  PatientData,
  StudentData,
  MedicalHistory,
  VitalSigns,
  PhotographicMatrix,
  DiagnosisAndPlan,
  LogEntry,
} from "@/lib/types";
import { createEmptyOdontoDocument } from "./initialClinicalState";
import { clinicalRecordReducer, ClinicalAction } from "./clinicalRecordReducer";

interface ClinicalRecordContextType {
  document: OdontoDocument;
  dispatch: React.Dispatch<ClinicalAction>;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  isGuideOpen: boolean;
  openGuideModal: () => void;
  closeGuideModal: () => void;
  updatePatient: (data: Partial<PatientData>) => void;
  updateStudent: (data: Partial<StudentData>) => void;
  updateMedicalHistory: (data: Partial<Omit<MedicalHistory, "vitalSigns">>) => void;
  updateVitalSigns: (data: Partial<VitalSigns>) => void;
  updatePhoto: (slot: keyof PhotographicMatrix, dataUrl: string | null) => void;
  updateDiagnosisPlan: (data: Partial<DiagnosisAndPlan>) => void;
  setToothDiagnosis: (tooth: string, diagnosis: string) => void;
  addLogEntry: (entry: LogEntry) => void;
  updateLogEntry: (entry: LogEntry) => void;
  deleteLogEntry: (id: string) => void;
  updateTreatmentSession: (data: Partial<import("@/lib/types").TreatmentSession>) => void;
  loadDocument: (doc: OdontoDocument) => void;
  resetDocument: () => void;
}

const ClinicalRecordContext = createContext<ClinicalRecordContextType | undefined>(undefined);

export function ClinicalRecordProvider({ children }: { children: ReactNode }) {
  const [document, dispatch] = useReducer(clinicalRecordReducer, undefined, createEmptyOdontoDocument);
  const [activeTab, setActiveTab] = useState<ActiveTab>("identification");
  const [isGuideOpen, setIsGuideOpen] = useState<boolean>(false);

  React.useEffect(() => {
    try {
      const dismissed = localStorage.getItem("odontodoc_guide_dismissed");
      if (dismissed !== "true") {
        setIsGuideOpen(true);
      }
    } catch {
      // Ignore
    }
  }, []);

  const openGuideModal = () => setIsGuideOpen(true);
  const closeGuideModal = () => setIsGuideOpen(false);

  const updatePatient = (data: Partial<PatientData>) => {
    dispatch({ type: "UPDATE_PATIENT", payload: data });
  };

  const updateStudent = (data: Partial<StudentData>) => {
    dispatch({ type: "UPDATE_STUDENT", payload: data });
  };

  const updateMedicalHistory = (data: Partial<Omit<MedicalHistory, "vitalSigns">>) => {
    dispatch({ type: "UPDATE_MEDICAL_HISTORY", payload: data });
  };

  const updateVitalSigns = (data: Partial<VitalSigns>) => {
    dispatch({ type: "UPDATE_VITAL_SIGNS", payload: data });
  };

  const updatePhoto = (slot: keyof PhotographicMatrix, dataUrl: string | null) => {
    dispatch({ type: "UPDATE_PHOTO", payload: { slot, dataUrl } });
  };

  const updateDiagnosisPlan = (data: Partial<DiagnosisAndPlan>) => {
    dispatch({ type: "UPDATE_DIAGNOSIS_PLAN", payload: data });
  };

  const setToothDiagnosis = (tooth: string, diagnosis: string) => {
    dispatch({ type: "SET_TOOTH_DIAGNOSIS", payload: { tooth, diagnosis } });
  };

  const addLogEntry = (entry: LogEntry) => {
    dispatch({ type: "ADD_LOG_ENTRY", payload: entry });
  };

  const updateLogEntry = (entry: LogEntry) => {
    dispatch({ type: "UPDATE_LOG_ENTRY", payload: entry });
  };

  const deleteLogEntry = (id: string) => {
    dispatch({ type: "DELETE_LOG_ENTRY", payload: { id } });
  };

  const updateTreatmentSession = (data: Partial<import("@/lib/types").TreatmentSession>) => {
    dispatch({ type: "UPDATE_TREATMENT_SESSION", payload: data });
  };

  const loadDocument = (doc: OdontoDocument) => {
    dispatch({ type: "LOAD_DOCUMENT", payload: doc });
  };

  const resetDocument = () => {
    dispatch({ type: "RESET_DOCUMENT" });
  };

  return (
    <ClinicalRecordContext.Provider
      value={{
        document,
        dispatch,
        activeTab,
        setActiveTab,
        isGuideOpen,
        openGuideModal,
        closeGuideModal,
        updatePatient,
        updateStudent,
        updateMedicalHistory,
        updateVitalSigns,
        updatePhoto,
        updateDiagnosisPlan,
        setToothDiagnosis,
        addLogEntry,
        updateLogEntry,
        deleteLogEntry,
        updateTreatmentSession,
        loadDocument,
        resetDocument,
      }}
    >
      {children}
    </ClinicalRecordContext.Provider>
  );
}

export function useClinicalRecord() {
  const context = useContext(ClinicalRecordContext);
  if (!context) {
    throw new Error("useClinicalRecord must be used within a ClinicalRecordProvider");
  }
  return context;
}
