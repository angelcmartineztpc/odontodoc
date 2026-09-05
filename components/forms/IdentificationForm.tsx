"use client";

import React from "react";
import { useClinicalRecord } from "@/context/ClinicalRecordContext";
import { Gender } from "@/lib/types";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";

export function IdentificationForm() {
  const { document: doc, updatePatient, updateStudent, setActiveTab } = useClinicalRecord();
  const { patient, student } = doc;

  return (
    <div className="space-y-6 pb-24 max-w-3xl mx-auto px-4 pt-4">
      {/* Module Title Banner */}
      <div className="bg-gradient-to-r from-[#1C8443] to-[#13592E] text-white p-4 rounded-2xl shadow-sm border border-[#41AD49]/30">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <AssignmentIndOutlinedIcon sx={{ fontSize: 22 }} />
          <span>Módulo A: Ficha de Identificación del Paciente y Alumno</span>
        </h2>
        <p className="text-xs text-emerald-100 mt-1">
          Captura los datos del paciente y del operador clínico universitario. Se sincroniza en tiempo real en la Hoja 1 oficial.
        </p>
      </div>

      {/* Patient Information Section */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400 flex items-center gap-1.5 border-b border-slate-100 dark:border-slate-800 pb-2">
          <PersonOutlinedIcon sx={{ fontSize: 19 }} />
          <span>Datos Generales del Paciente</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1 sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Nombre Completo del Paciente *
            </label>
            <input
              type="text"
              value={patient.fullName}
              onChange={(e) => updatePatient({ fullName: e.target.value })}
              placeholder="Ej. Juan Pérez Hernández"
              className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-[#1C8443] focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              No. de Expediente / Folio
            </label>
            <input
              type="text"
              value={patient.recordNumber}
              onChange={(e) => updatePatient({ recordNumber: e.target.value })}
              placeholder="Ej. EXP-2026-042"
              className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-[#1C8443] focus:outline-none font-mono"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Edad
              </label>
              <input
                type="number"
                min="0"
                max="120"
                value={patient.age}
                onChange={(e) => updatePatient({ age: e.target.value ? Number(e.target.value) : "" })}
                placeholder="Años"
                className="w-full min-h-[44px] px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-[#1C8443] focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Sexo
              </label>
              <select
                value={patient.gender}
                onChange={(e) => updatePatient({ gender: e.target.value as Gender })}
                className="w-full min-h-[44px] px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-[#1C8443] focus:outline-none"
              >
                <option value="M">Masculino (M)</option>
                <option value="F">Femenino (F)</option>
                <option value="Otro">Otro</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Fecha de Nacimiento
            </label>
            <input
              type="date"
              value={patient.dateOfBirth}
              onChange={(e) => updatePatient({ dateOfBirth: e.target.value })}
              className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-[#1C8443] focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Teléfono de Contacto
            </label>
            <input
              type="tel"
              value={patient.phone}
              onChange={(e) => updatePatient({ phone: e.target.value })}
              placeholder="993 123 4567"
              className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-[#1C8443] focus:outline-none"
            />
          </div>

          <div className="space-y-1 sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Ocupación
            </label>
            <input
              type="text"
              value={patient.occupation}
              onChange={(e) => updatePatient({ occupation: e.target.value })}
              placeholder="Ej. Estudiante, Empleado, Comerciante"
              className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-[#1C8443] focus:outline-none"
            />
          </div>

          <div className="space-y-1 sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Domicilio
            </label>
            <input
              type="text"
              value={patient.address}
              onChange={(e) => updatePatient({ address: e.target.value })}
              placeholder="Calle, Número, Colonia, Municipio"
              className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-[#1C8443] focus:outline-none"
            />
          </div>

          <div className="space-y-1 sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Motivo Principal de la Consulta *
            </label>
            <textarea
              rows={3}
              value={patient.consultationReason}
              onChange={(e) => updatePatient({ consultationReason: e.target.value })}
              placeholder="Describa textualmente el motivo por el cual acude el paciente..."
              className="w-full min-h-[64px] px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-[#1C8443] focus:outline-none resize-none"
            />
          </div>
        </div>
      </section>

      {/* Academic & Supervisor Section */}

      <section className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-[#1C8443] dark:text-[#8DC642] flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
          <SchoolOutlinedIcon sx={{ fontSize: 19 }} />
          <span>Datos Institucionales UJAT (Alumno y Docente)</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Nombre del Alumno Operador *
            </label>
            <input
              type="text"
              value={student.studentName}
              onChange={(e) => updateStudent({ studentName: e.target.value })}
              placeholder="Ej. Ana Lucía Morales"
              className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-[#1C8443] focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Matrícula UJAT *
            </label>
            <input
              type="text"
              value={student.enrollmentId}
              onChange={(e) => updateStudent({ enrollmentId: e.target.value })}
              placeholder="Ej. 202E18055"
              className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-[#1C8443] focus:outline-none font-mono"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Semestre y Grupo
            </label>
            <input
              type="text"
              value={student.semester}
              onChange={(e) => updateStudent({ semester: e.target.value })}
              placeholder="Ej. 8vo Semestre Grupo A"
              className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-[#1C8443] focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Asignatura Clínica
            </label>
            <input
              type="text"
              value={student.subject}
              onChange={(e) => updateStudent({ subject: e.target.value })}
              placeholder="Ej. Clínica Integral del Adulto"
              className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-[#1C8443] focus:outline-none"
            />
          </div>

          <div className="space-y-1 sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Docente Clínico Supervisor *
            </label>
            <input
              type="text"
              value={student.supervisorName}
              onChange={(e) => updateStudent({ supervisorName: e.target.value })}
              placeholder="Ej. C.D. Roberto Gómez Jiménez"
              className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-[#1C8443] focus:outline-none"
            />
          </div>
        </div>
      </section>


      {/* Forward Action Button */}
      <div className="flex justify-end pt-2">
        <button
          type="button"
          onClick={() => setActiveTab("history")}
          className="min-h-[44px] px-5 py-2.5 rounded-xl bg-[#1C8443] hover:bg-[#156533] text-white font-semibold text-sm shadow flex items-center gap-2 transition-all active:scale-95"
        >
          <span>Continuar a Historial Clínico</span>
          <ArrowForwardOutlinedIcon sx={{ fontSize: 18 }} />
        </button>
      </div>
    </div>
  );
}
