"use client";

import React from "react";
import { useClinicalRecord } from "@/context/ClinicalRecordContext";
import { InstitutionalHeader } from "./InstitutionalHeader";
import { TeacherSignature } from "./TeacherSignature";

interface SheetOclusalProps {
  isBlank?: boolean;
}

export function SheetOclusalRecord({ isBlank = false }: SheetOclusalProps) {
  const { document: doc } = useClinicalRecord();
  const { patient, student, photos, diagnosisAndPlan } = doc;

  const currentDate = isBlank
    ? ""
    : new Date().toLocaleDateString("es-MX", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });

  const oclusalSlots = [
    {
      label: "Oclusal Superior (Arcada Maxilar)",
      watermark: "OCLUSAL SUPERIOR",
      key: "intraoralUpper" as const,
      photo: photos.intraoralUpper,
    },
    {
      label: "Oclusal Inferior (Arcada Mandibular)",
      watermark: "OCLUSAL INFERIOR",
      key: "intraoralLower" as const,
      photo: photos.intraoralLower,
    },
  ];

  return (
    <article className="clinical-sheet p-6 sm:p-8 bg-white text-black font-sans text-[11px] leading-normal border border-slate-300 shadow-md sm:rounded-lg max-w-[215.9mm] mx-auto min-h-[268mm] flex flex-col justify-between mb-8 print:border-none print:shadow-none print:rounded-none print:m-0 print:p-4 print:min-h-[260mm] print:bg-white">
      <div>
        {/* Institutional UJAT DACS Header with Crests */}
        <InstitutionalHeader sheetTitle="NOTA MEDICA: REGISTRO FOTOGRAFICO CLINICO DE ARCADAS OCLUSALES" />

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

        {/* Section: Fotografías Clínicas Oclusales (2 Tomas Exclusivas) */}
        <div className="mb-4">
          <h5 className="font-bold uppercase text-[11px] mb-2 tracking-wide text-black">
            FOTOGRAFIAS CLINICAS OCLUSALES:
          </h5>
          <div className="grid grid-cols-2 gap-2 border border-black rounded-lg p-2 bg-white print:bg-white">
            {oclusalSlots.map((slot) => (
              <div
                key={slot.key}
                className="flex flex-col items-center justify-between border border-slate-300 rounded p-1 bg-white min-h-[105px] overflow-hidden"
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
                    <div className="w-full h-full flex items-center justify-center text-center p-1">
                      <span className="text-[8px] font-bold text-slate-400 uppercase tracking-tight leading-tight">
                        {slot.watermark}
                      </span>
                    </div>
                  )}
                </div>
                <span className="text-[8px] font-bold text-black text-center mt-1 border-t border-slate-100 w-full pt-0.5 truncate">
                  {slot.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Section: Evaluación de Arcadas Oclusales */}
        <div className="mb-2">
          <h5 className="font-bold uppercase text-[11px] mb-2 tracking-wide text-black">
            EVALUACION CLINICA DE ARCADAS OCLUSALES:
          </h5>

          {isBlank ? (
            <div className="space-y-3.5 pt-1">
              {Array.from({ length: 10 }).map((_, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="text-black font-bold text-xs">•</span>
                  <div className="border-b border-slate-400 h-3 w-full" />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-[10.5px] leading-relaxed space-y-2">
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <strong>Arcada Maxilar Superior: </strong>
                  Evaluación de forma de arco, simetría transversal, bóveda palatina, rugas palatinas e integridad de caras oclusales y bordes incisales superiores.
                </li>
                <li>
                  <strong>Arcada Mandibular Inferior: </strong>
                  Evaluación de forma de arco inferior, alineación dentaria, piso de boca, tabla lingual e integridad de caras oclusales y bordes incisales inferiores.
                </li>
                {diagnosisAndPlan.generalDiagnosis && (
                  <li>
                    <strong>Observaciones Diagnósticas Asociadas: </strong>
                    {diagnosisAndPlan.generalDiagnosis}
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Official Signature Line aligned to right */}
      <TeacherSignature supervisorName={student.supervisorName} isBlank={isBlank} />
    </article>
  );
}
