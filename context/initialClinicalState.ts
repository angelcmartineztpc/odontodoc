import { OdontoDocument } from "@/lib/types";

export function createEmptyOdontoDocument(): OdontoDocument {
  const now = new Date().toISOString();
  const id = typeof crypto !== "undefined" && crypto.randomUUID 
    ? crypto.randomUUID() 
    : `doc-${Date.now()}`;

  return {
    schemaVersion: "1.0.0",
    metadata: {
      id,
      createdAt: now,
      updatedAt: now,
      appVersion: "0.1.0",
    },
    patient: {
      recordNumber: "",
      fullName: "",
      age: "",
      gender: "M",
      dateOfBirth: "",
      occupation: "",
      phone: "",
      address: "",
      consultationReason: "",
    },
    student: {
      studentName: "",
      enrollmentId: "",
      semester: "",
      subject: "Clínica Integral",
      supervisorName: "",
    },
    medicalHistory: {
      hereditaryConditions: "",
      pathologicalBackground: "",
      nonPathologicalBackground: "",
      vitalSigns: {
        bloodPressure: "",
        heartRate: "",
        respiratoryRate: "",
        temperature: "",
        weight: "",
        height: "",
      },
      stomatologicalExam: "",
    },
    photos: {
      extraoralFrontal: null,
      intraoralFrontal: null,
      intraoralUpper: null,
      intraoralLower: null,
      intraoralRight: null,
      intraoralLeft: null,
    },
    diagnosisAndPlan: {
      generalDiagnosis: "",
      teethRecords: {},
      phase1Preventive: "",
      phase2Curative: "",
      phase3Rehabilitative: "",
      prognosis: "Favorable",
    },
    treatmentLog: {
      entries: [],
    },
    treatmentSession: {
      diagnosis: "",
      treatmentName: "",
      receiptNumber: "",
      date: "",
      steps: [
        {
          stepNumber: 1,
          title: "Aislamiento",
          description: "Anestesia tópica e infiltrativa, aislamiento absoluto con dique de hule, grapa y arco de Young.",
        },
        {
          stepNumber: 2,
          title: "Apertura de cavidad",
          description: "Acceso con fresa de diamante y eliminación de dentina desmineralizada con fresa de bola a baja velocidad.",
        },
        {
          stepNumber: 3,
          title: "Acondicionamiento de la cavidad",
          description: "Limpieza cavitaria, lavado con clorhexidina al 2% y secado controlado.",
        },
        {
          stepNumber: 4,
          title: "Preparación de base cavitaria",
          description: "Protección pulpar indirecta mediante base cavitaria con ionómero de vidrio.",
        },
        {
          stepNumber: 5,
          title: "Restauración",
          description: "Grabado ácido esmalte/dentina, agente adhesivo, fotopolimerización e inserción incremental de resina compuesta.",
        },
        {
          stepNumber: 6,
          title: "Ajuste oclusal y pulido final",
          description: "Verificación de puntos de contacto con papel de articular, pulido con fresas de acabado y pastas diamantadas.",
        },
      ],
      photos: {
        before: null,
        during: null,
        after: null,
      },
    },
  };
}
