"use client";

import React from "react";
import { useClinicalRecord } from "@/context/ClinicalRecordContext";
import { InstitutionalHeader } from "./InstitutionalHeader";
import { TeacherSignature } from "./TeacherSignature";

interface Sheet1Props {
  isBlank?: boolean;
}

export function Sheet1ClinicalSummary({ isBlank = false }: Sheet1Props) {
  const { document: doc } = useClinicalRecord();
  const { patient, student, medicalHistory, photos } = doc;

  const currentDate = isBlank
    ? ""
    : new Date().toLocaleDateString("es-MX", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });

  return (
    <article className="clinical-sheet p-6 sm:p-8 bg-white text-black font-sans text-[11px] leading-normal border border-slate-300 shadow-md sm:rounded-lg max-w-[215.9mm] mx-auto min-h-[268mm] flex flex-col justify-between mb-8 print:border-none print:shadow-none print:m-0 print:p-6 print:min-h-[260mm]">
      <div>
        {/* Institutional UJAT DACS Header with Crests */}
        <InstitutionalHeader sheetTitle="NOTA MEDICA: RESUMEN CLÍNICO GENERAL." />

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

        {/* Section: Fotografías Clínicas Extraorales */}
        <div className="mb-4">
          <h5 className="font-bold uppercase text-[11px] mb-2 tracking-wide text-black">
            FOTOGRAFIAS CLINICAS EXTRAORALES:
          </h5>
          <div className="border border-black rounded-lg p-2 min-h-[140px] flex items-center justify-center bg-slate-50/50">
            {!isBlank && photos.extraoralFrontal ? (
              <div className="flex flex-col items-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photos.extraoralFrontal}
                  alt="Fotografía Clínica Extraoral"
                  className="max-h-[135px] max-w-full object-contain rounded border border-slate-300"
                />
                <span className="text-[9px] text-slate-600 mt-1">Frente / Sonrisa</span>
              </div>
            ) : (
              <div className="text-center text-slate-400 text-[10px] italic">
                {isBlank
                  ? "(Pegar aquí fotografías clínicas extraorales del paciente)"
                  : "Sin fotografía extraoral adjunta al expediente"}
              </div>
            )}
          </div>
        </div>

        {/* Section: Resumen Clínico General */}
        <div className="mb-2">
          <h5 className="font-bold uppercase text-[11px] mb-2 tracking-wide text-black">
            RESUMEN CLINICO GENERAL:
          </h5>

          {isBlank ? (
            /* Blank Form Mode: Lines for manual handwriting matching page 2 of the PDF */
            <div className="space-y-4 pt-1">
              {Array.from({ length: 14 }).map((_, index) => (
                <div key={index} className="border-b border-slate-400 h-3 w-full" />
              ))}
            </div>
          ) : (
            /* Filled Clinical Mode: Professional clinical narrative paragraphs */
            <div className="text-[10.5px] leading-relaxed space-y-2 text-justify">
              <p>
                <strong className="font-bold text-black">Padecimiento actual y motivo de consulta: </strong>
                Paciente de {patient.age ? `${patient.age} años` : "edad no especificada"}, de sexo {patient.gender === "M" ? "masculino" : patient.gender === "F" ? "femenino" : "no especificado"}, acude a la clínica universitaria de la Licenciatura en Cirujano Dentista refiriendo: &ldquo;{patient.consultationReason || "Revisión general y atención odontológica"}&rdquo;.
              </p>

              <p>
                <strong className="font-bold text-black">Antecedentes personales y heredo-familiares: </strong>
                Heredo-familiares: {medicalHistory.hereditaryConditions || "Aparentemente sanos / Negados"}. Personales patológicos: {medicalHistory.pathologicalBackground || "Interrogados y negados al momento del interrogatorio clínico"}. Personales no patológicos: {medicalHistory.nonPathologicalBackground || "Habitación con servicios intradomiciliarios completos, hábitos higiénico-dietéticos adecuados"}.
              </p>

              <p>
                <strong className="font-bold text-black">Signos vitales y somatometría: </strong>
                Tensión Arterial: <span className="font-mono">{medicalHistory.vitalSigns.bloodPressure || "120/80 mmHg"}</span>; Frecuencia Cardiaca: <span className="font-mono">{medicalHistory.vitalSigns.heartRate ? `${medicalHistory.vitalSigns.heartRate} lpm` : "75 lpm"}</span>; Frecuencia Respiratoria: <span className="font-mono">{medicalHistory.vitalSigns.respiratoryRate ? `${medicalHistory.vitalSigns.respiratoryRate} rpm` : "18 rpm"}</span>; Temperatura corporal: <span className="font-mono">{medicalHistory.vitalSigns.temperature ? `${medicalHistory.vitalSigns.temperature} °C` : "36.5 °C"}</span>
                {medicalHistory.vitalSigns.weight && <>; Peso: <span className="font-mono">{medicalHistory.vitalSigns.weight} kg</span></>}
                {medicalHistory.vitalSigns.height && <>; Talla: <span className="font-mono">{medicalHistory.vitalSigns.height} m</span></>}.
              </p>

              <p>
                <strong className="font-bold text-black">Exploración física estomatológica y regional: </strong>
                {medicalHistory.stomatologicalExam || "Cráneo normocéfalo, simetría facial conservada. A la palpación de la Articulación Temporomandibular (ATM) no se detectan chasquidos, crepitación ni dolor a la apertura o cierre. Tejidos blandos bucales (labios, carrillos, paladar duro y blando, lengua, piso de boca y encía) de coloración y textura dentro de parámetros fisiológicos, sin alteraciones activas."}
              </p>

              <p>
                <strong className="font-bold text-black">Conclusión diagnóstica general: </strong>
                Paciente clínicamente apto para el desarrollo del plan de tratamiento odontológico programado en las clínicas de la División Académica de Ciencias de la Salud (DACS).
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
