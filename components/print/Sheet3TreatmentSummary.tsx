"use client";

import React from "react";
import { useClinicalRecord } from "@/context/ClinicalRecordContext";
import { InstitutionalHeader } from "./InstitutionalHeader";
import { TeacherSignature } from "./TeacherSignature";

interface Sheet3Props {
  isBlank?: boolean;
}

export function Sheet3TreatmentSummary({ isBlank = false }: Sheet3Props) {
  const { document: doc } = useClinicalRecord();
  const { patient, student, medicalHistory, treatmentSession, treatmentLog, diagnosisAndPlan } = doc;

  const currentDate = isBlank
    ? ""
    : treatmentSession?.date ||
      new Date().toLocaleDateString("es-MX", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });

  // Extract diagnosis & treatment: prioritize treatmentSession, fallback to first log entry or diagnosisAndPlan
  const latestLogEntry = treatmentLog.entries[treatmentLog.entries.length - 1];
  const activeDiagnosis = isBlank
    ? ""
    : treatmentSession?.diagnosis ||
      latestLogEntry?.diagnosis ||
      diagnosisAndPlan.generalDiagnosis ||
      "Caries de esmalte y dentina (K02.1)";

  const activeTreatment = isBlank
    ? ""
    : treatmentSession?.treatmentName ||
      latestLogEntry?.procedure ||
      "Restauración clase I con resina compuesta";

  const activeReceipt = isBlank
    ? ""
    : treatmentSession?.receiptNumber ||
      latestLogEntry?.receiptNumber ||
      "—";

  // Protocol steps
  const steps = treatmentSession?.steps || [
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
  ];

  const sessionPhotos = treatmentSession?.photos || {
    before: null,
    during: null,
    after: null,
  };

  return (
    <article className="clinical-sheet p-6 sm:p-8 bg-white text-black font-sans text-[11px] leading-normal border border-slate-300 shadow-md sm:rounded-lg max-w-[215.9mm] mx-auto min-h-[268mm] flex flex-col justify-between mb-8 print:border-none print:shadow-none print:m-0 print:p-6 print:min-h-[260mm]">
      <div>
        {/* Institutional UJAT DACS Header with Crests */}
        <InstitutionalHeader sheetTitle="NOTA MEDICA: RESUMEN CLINICO ODONTOLOGICO DEL TRATAMIENTO REALIZADO" />

        {/* 4-Row Expanded Rounded Identification & Session Box (1:1 from PDF) */}
        <div className="border border-black rounded-xl p-3 mb-3 text-[10px]">
          {/* Row 1: Usuario, Expediente, Fecha */}
          <div className="flex flex-wrap items-center justify-between gap-y-1 mb-1.5">
            <div className="flex-1 min-w-[200px]">
              <span className="font-bold text-black">Nombre del Usuario: </span>
              {isBlank ? (
                <span className="inline-block border-b border-black w-44 min-h-[14px]" />
              ) : (
                <span className="font-medium">{patient.fullName || "—"}</span>
              )}
            </div>
            <div className="w-44">
              <span className="font-bold text-black">Expediente: </span>
              {isBlank ? (
                <span className="inline-block border-b border-black w-24 min-h-[14px]" />
              ) : (
                <span className="font-medium">{patient.recordNumber || "—"}</span>
              )}
            </div>
            <div className="w-36">
              <span className="font-bold text-black">Fecha: </span>
              {isBlank ? (
                <span className="inline-block border-b border-black w-20 min-h-[14px]" />
              ) : (
                <span className="font-medium">{currentDate}</span>
              )}
            </div>
          </div>

          {/* Row 2: Alumno, Matrícula */}
          <div className="flex flex-wrap items-center justify-between gap-y-1 mb-1.5 border-t border-slate-200 pt-1.5">
            <div className="flex-1 min-w-[200px]">
              <span className="font-bold text-black">Nombre del alumno: </span>
              {isBlank ? (
                <span className="inline-block border-b border-black w-60 min-h-[14px]" />
              ) : (
                <span className="font-medium">{student.studentName || "—"}</span>
              )}
            </div>
            <div className="w-44">
              <span className="font-bold text-black">Matricula: </span>
              {isBlank ? (
                <span className="inline-block border-b border-black w-24 min-h-[14px]" />
              ) : (
                <span className="font-mono font-medium">{student.enrollmentId || "—"}</span>
              )}
            </div>
          </div>

          {/* Row 3: Diagnóstico, Tratamiento */}
          <div className="flex flex-wrap items-center justify-between gap-y-1 mb-1.5 border-t border-slate-200 pt-1.5">
            <div className="flex-1 min-w-[200px]">
              <span className="font-bold text-black">Diagnóstico: </span>
              {isBlank ? (
                <span className="inline-block border-b border-black w-60 min-h-[14px]" />
              ) : (
                <span className="font-medium">{activeDiagnosis}</span>
              )}
            </div>
            <div className="flex-1 min-w-[200px]">
              <span className="font-bold text-black">Tratamiento: </span>
              {isBlank ? (
                <span className="inline-block border-b border-black w-60 min-h-[14px]" />
              ) : (
                <span className="font-medium">{activeTreatment}</span>
              )}
            </div>
          </div>

          {/* Row 4: N. Recibo, Signos vitales */}
          <div className="flex flex-wrap items-center justify-between gap-y-1 border-t border-slate-200 pt-1.5">
            <div className="w-36">
              <span className="font-bold text-black">N. Recibo: </span>
              {isBlank ? (
                <span className="inline-block border-b border-black w-16 min-h-[14px]" />
              ) : (
                <span className="font-mono">{activeReceipt}</span>
              )}
            </div>
            <div className="flex-1 flex flex-wrap items-center gap-x-3">
              <span className="font-bold text-black">Signos vitales:</span>
              <span>
                Tensión arterial:{" "}
                {isBlank ? (
                  <span className="inline-block border-b border-black w-14 min-h-[12px]" />
                ) : (
                  <strong className="font-mono">{medicalHistory.vitalSigns.bloodPressure || "120/80"}</strong>
                )}
              </span>
              <span>
                Frecuencias cardiaca:{" "}
                {isBlank ? (
                  <span className="inline-block border-b border-black w-10 min-h-[12px]" />
                ) : (
                  <strong className="font-mono">{medicalHistory.vitalSigns.heartRate || "75"}</strong>
                )}
              </span>
              <span>
                Temperatura:{" "}
                {isBlank ? (
                  <span className="inline-block border-b border-black w-10 min-h-[12px]" />
                ) : (
                  <strong className="font-mono">{medicalHistory.vitalSigns.temperature || "36.5"}°C</strong>
                )}
              </span>
            </div>
          </div>
        </div>

        {/* Section: Resumen del Tratamiento (6 Clinical Steps) */}
        <div className="mb-4">
          <h5 className="font-bold uppercase text-[11px] mb-2 tracking-wide text-black">
            RESUMEN DEL TRATAMIENTO:
          </h5>

          {isBlank ? (
            /* Blank Form Mode: 6 numbered steps with blank lines matching page 6 of the PDF */
            <div className="space-y-3 pt-1">
              {[
                "Aislamiento",
                "Apertura de cavidad",
                "Acondicionamiento de la cavidad",
                "Preparación de base cavitaria",
                "Restauración",
                "Ajuste oclusal y pulido final",
              ].map((title, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="font-bold text-black min-w-[20px]">{idx + 1}.</span>
                  <div className="w-full">
                    <span className="font-bold text-black text-[10.5px]">{title}: </span>
                    <div className="border-b border-slate-400 h-3 w-full mt-1" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Filled Clinical Mode: Detailed numbered steps */
            <div className="space-y-1.5 text-[10px] leading-relaxed">
              {steps.map((step) => (
                <div key={step.stepNumber} className="flex items-start gap-1.5">
                  <span className="font-bold text-black min-w-[16px]">{step.stepNumber}.</span>
                  <p>
                    <strong className="font-bold text-black">{step.title}: </strong>
                    <span className="text-slate-800">{step.description}</span>
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Section: Fotografías del Procedimiento (Antes, Durante, Después) */}
        <div className="mb-2">
          <div className="grid grid-cols-3 gap-3 border border-black rounded-lg p-2.5 bg-slate-50/50">
            {/* Antes */}
            <div className="flex flex-col items-center border border-slate-300 rounded p-1 bg-white min-h-[110px]">
              <div className="w-full flex-1 flex items-center justify-center overflow-hidden">
                {!isBlank && sessionPhotos.before ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={sessionPhotos.before}
                    alt="Foto Antes"
                    className="max-h-[90px] w-full object-contain rounded"
                  />
                ) : (
                  <div className="text-[9px] text-slate-400 italic text-center p-2">
                    {isBlank ? "Fotografía clínica previa" : "Sin foto previa"}
                  </div>
                )}
              </div>
              <span className="text-[9px] font-bold text-black uppercase mt-1 border-t border-slate-100 w-full text-center pt-0.5">
                Antes
              </span>
            </div>

            {/* Durante */}
            <div className="flex flex-col items-center border border-slate-300 rounded p-1 bg-white min-h-[110px]">
              <div className="w-full flex-1 flex items-center justify-center overflow-hidden">
                {!isBlank && sessionPhotos.during ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={sessionPhotos.during}
                    alt="Foto Durante"
                    className="max-h-[90px] w-full object-contain rounded"
                  />
                ) : (
                  <div className="text-[9px] text-slate-400 italic text-center p-2">
                    {isBlank ? "Fotografía transoperatoria" : "Sin foto durante"}
                  </div>
                )}
              </div>
              <span className="text-[9px] font-bold text-black uppercase mt-1 border-t border-slate-100 w-full text-center pt-0.5">
                Durante
              </span>
            </div>

            {/* Después */}
            <div className="flex flex-col items-center border border-slate-300 rounded p-1 bg-white min-h-[110px]">
              <div className="w-full flex-1 flex items-center justify-center overflow-hidden">
                {!isBlank && sessionPhotos.after ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={sessionPhotos.after}
                    alt="Foto Después"
                    className="max-h-[90px] w-full object-contain rounded"
                  />
                ) : (
                  <div className="text-[9px] text-slate-400 italic text-center p-2">
                    {isBlank ? "Fotografía postoperatoria" : "Sin foto posterior"}
                  </div>
                )}
              </div>
              <span className="text-[9px] font-bold text-black uppercase mt-1 border-t border-slate-100 w-full text-center pt-0.5">
                Después
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Official Signature Line aligned to right */}
      <TeacherSignature supervisorName={student.supervisorName} isBlank={isBlank} />
    </article>
  );
}
