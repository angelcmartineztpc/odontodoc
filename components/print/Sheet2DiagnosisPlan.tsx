"use client";

import React from "react";
import { useClinicalRecord } from "@/context/ClinicalRecordContext";
import { InstitutionalHeader } from "./InstitutionalHeader";
import { TeacherSignature } from "./TeacherSignature";

interface Sheet2Props {
  isBlank?: boolean;
}

export function Sheet2DiagnosisPlan({ isBlank = false }: Sheet2Props) {
  const { document: doc } = useClinicalRecord();
  const { patient, student, photos, diagnosisAndPlan } = doc;

  const currentDate = isBlank
    ? ""
    : new Date().toLocaleDateString("es-MX", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });

  const teethEntries = Object.entries(diagnosisAndPlan.teethRecords);

  const intraoralSlots = [
    { label: "Frontal", key: "intraoralFrontal" as const, photo: photos.intraoralFrontal },
    { label: "Lateral Derecha", key: "intraoralRight" as const, photo: photos.intraoralRight },
    { label: "Lateral Izquierda", key: "intraoralLeft" as const, photo: photos.intraoralLeft },
    { label: "Oclusal Superior", key: "intraoralUpper" as const, photo: photos.intraoralUpper },
    { label: "Oclusal Inferior", key: "intraoralLower" as const, photo: photos.intraoralLower },
  ];

  return (
    <article className="clinical-sheet p-6 sm:p-8 bg-white text-black font-sans text-[11px] leading-normal border border-slate-300 shadow-md sm:rounded-lg max-w-[215.9mm] mx-auto min-h-[268mm] flex flex-col justify-between mb-8 print:border-none print:shadow-none print:m-0 print:p-6 print:min-h-[260mm]">
      <div>
        {/* Institutional UJAT DACS Header with Crests */}
        <InstitutionalHeader sheetTitle="NOTA MEDICA: DIAGNOSTICO Y PLAN DE TRATAMIENTO CLINICO ODONTOLOGICO" />

        {/* Identification Rounded Box (1:1 from PDF) */}
        <div className="border border-black rounded-xl p-3 mb-4 text-[10.5px]">
          <div className="flex flex-wrap items-center justify-between gap-y-2 mb-2">
            <div className="flex-1 min-w-[200px]">
              <span className="font-bold text-black">Nombre del Usuario: </span>
              {isBlank ? (
                <span className="inline-block border-b border-black w-44 min-h-[14px]" />
              ) : (
                <span className="font-medium">{patient.fullName || "—"}</span>
              )}
            </div>
            <div className="w-48">
              <span className="font-bold text-black">Expediente: </span>
              {isBlank ? (
                <span className="inline-block border-b border-black w-24 min-h-[14px]" />
              ) : (
                <span className="font-medium">{patient.recordNumber || "—"}</span>
              )}
            </div>
            <div className="w-40">
              <span className="font-bold text-black">Fecha: </span>
              {isBlank ? (
                <span className="inline-block border-b border-black w-24 min-h-[14px]" />
              ) : (
                <span className="font-medium">{currentDate}</span>
              )}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-y-2 border-t border-slate-200 pt-2">
            <div className="flex-1 min-w-[200px]">
              <span className="font-bold text-black">Nombre del alumno: </span>
              {isBlank ? (
                <span className="inline-block border-b border-black w-60 min-h-[14px]" />
              ) : (
                <span className="font-medium">{student.studentName || "—"}</span>
              )}
            </div>
            <div className="w-48">
              <span className="font-bold text-black">Matricula: </span>
              {isBlank ? (
                <span className="inline-block border-b border-black w-28 min-h-[14px]" />
              ) : (
                <span className="font-mono font-medium">{student.enrollmentId || "—"}</span>
              )}
            </div>
          </div>
        </div>

        {/* Section: Fotografías Clínicas Intraorales (5-view matrix) */}
        <div className="mb-4">
          <h5 className="font-bold uppercase text-[11px] mb-2 tracking-wide text-black">
            FOTOGRAFIAS CLINICAS INTRAORALES:
          </h5>
          <div className="grid grid-cols-5 gap-2 border border-black rounded-lg p-2 bg-slate-50/50">
            {intraoralSlots.map((slot) => (
              <div
                key={slot.key}
                className="flex flex-col items-center justify-between border border-slate-300 rounded p-1 bg-white min-h-[105px]"
              >
                <div className="w-full flex-1 flex items-center justify-center overflow-hidden">
                  {!isBlank && slot.photo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={slot.photo}
                      alt={slot.label}
                      className="max-h-[85px] w-full object-contain rounded"
                    />
                  ) : (
                    <div className="text-[8px] text-slate-400 italic text-center p-1">
                      {isBlank ? "Foto" : "Sin foto"}
                    </div>
                  )}
                </div>
                <span className="text-[8px] font-bold text-slate-800 text-center mt-1 border-t border-slate-100 w-full pt-0.5">
                  {slot.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Section: Diagnóstico y Plan de Tratamiento */}
        <div className="mb-2">
          <h5 className="font-bold uppercase text-[11px] mb-2 tracking-wide text-black">
            DIAGNOSTICO Y PLAN DE TRATAMIENTO:
          </h5>

          {isBlank ? (
            /* Blank Form Mode: Bullet lines matching page 4 of the official PDF */
            <div className="space-y-3.5 pt-1">
              {Array.from({ length: 12 }).map((_, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="text-black font-bold text-xs">•</span>
                  <div className="border-b border-slate-400 h-3 w-full" />
                </div>
              ))}
            </div>
          ) : (
            /* Filled Clinical Mode: Structured diagnoses and phased treatments */
            <div className="text-[10.5px] leading-relaxed space-y-2">
              {diagnosisAndPlan.generalDiagnosis && (
                <p className="font-medium text-black">
                  <strong className="font-bold">Diagnóstico Integral Presuntivo: </strong>
                  {diagnosisAndPlan.generalDiagnosis}
                </p>
              )}

              {/* Tooth by Tooth Diagnosis */}
              <div className="space-y-1 mt-1">
                <span className="font-bold text-black block">Hallazgos por Órgano Dentario (FDI):</span>
                {teethEntries.length > 0 ? (
                  <ul className="list-disc pl-5 space-y-1">
                    {teethEntries.map(([tooth, diag]) => (
                      <li key={tooth}>
                        <strong>Órgano Dentario {tooth}: </strong> {diag}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <ul className="list-disc pl-5 space-y-0.5 text-slate-700">
                    <li>Arcada superior e inferior sin pérdidas dentarias activas ni fracturas coronarias.</li>
                    <li>Presencia de lesiones cariosas en esmalte/dentina en sectores posteriores indicadas para operatoria dental directa.</li>
                  </ul>
                )}
              </div>

              {/* Phased Treatment Plan */}
              <div className="space-y-1 mt-2">
                <span className="font-bold text-black block">Plan de Tratamiento Odontológico por Fases:</span>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    <strong>Fase I (Preventiva): </strong>
                    {diagnosisAndPlan.phase1Preventive || "Control de placa bacteriana, técnica de cepillado Bass modificada, profilaxis y aplicación tópica de flúor barniz."}
                  </li>
                  <li>
                    <strong>Fase II (Curativa / Operatoria): </strong>
                    {diagnosisAndPlan.phase2Curative || "Eliminación de tejido cariado, preparación cavitaria y obturación con resina compuesta fotopolimerizable en órganos dentarios afectados."}
                  </li>
                  <li>
                    <strong>Fase III (Rehabilitadora / Mantenimiento): </strong>
                    {diagnosisAndPlan.phase3Rehabilitative || "Ajuste oclusal fino, pulido de restauraciones y citas periódicas de control semestral."}
                  </li>
                </ul>
              </div>

              <p className="text-[10px] text-slate-800 mt-2">
                <strong>Pronóstico Clínico: </strong>
                {diagnosisAndPlan.prognosis || "Favorable, sujeto al apego del paciente a las medidas de higiene oral y asistencia a citas clínicas."}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Official Signature Line aligned to right */}
      <TeacherSignature supervisorName={student.supervisorName} isBlank={isBlank} />
    </article>
  );
}
