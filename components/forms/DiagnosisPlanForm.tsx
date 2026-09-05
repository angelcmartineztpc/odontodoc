"use client";

import React, { useState } from "react";
import { useClinicalRecord } from "@/context/ClinicalRecordContext";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import MedicalInformationOutlinedIcon from "@mui/icons-material/MedicalInformationOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import CloseIcon from "@mui/icons-material/Close";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";

export function DiagnosisPlanForm() {
  const {
    document: doc,
    updateDiagnosisPlan,
    setToothDiagnosis,
    setActiveTab,
  } = useClinicalRecord();
  const { diagnosisAndPlan } = doc;

  const [newTooth, setNewTooth] = useState("");
  const [newDiagnosis, setNewDiagnosis] = useState("");

  const handleAddToothRecord = (e: React.FormEvent) => {
    e.preventDefault();
    const toothTrimmed = newTooth.trim();
    const diagTrimmed = newDiagnosis.trim();
    if (!toothTrimmed || !diagTrimmed) return;

    setToothDiagnosis(toothTrimmed, diagTrimmed);
    setNewTooth("");
    setNewDiagnosis("");
  };

  const handleRemoveToothRecord = (tooth: string) => {
    const updated = { ...diagnosisAndPlan.teethRecords };
    delete updated[tooth];
    updateDiagnosisPlan({ teethRecords: updated });
  };

  const teethEntries = Object.entries(diagnosisAndPlan.teethRecords);

  return (
    <div className="space-y-6 pb-24 max-w-3xl mx-auto px-4 pt-4">
      {/* Banner */}
      <div className="bg-gradient-to-r from-purple-700 to-indigo-800 text-white p-4 rounded-2xl shadow-sm border border-purple-600/30">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <FactCheckOutlinedIcon sx={{ fontSize: 22 }} />
          <span>Módulo C: Diagnóstico Integral y Plan de Tratamiento Odontológico</span>
        </h2>
        <p className="text-xs text-purple-100 mt-1">
          Diagnóstico integral estomatológico, desglose por órgano dentario (FDI) y fases clínicas para la Hoja 2 oficial UJAT.
        </p>
      </div>

      {/* General Diagnosis */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <h3 className="text-sm font-bold uppercase tracking-wider text-purple-700 dark:text-purple-400 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
          <MedicalInformationOutlinedIcon sx={{ fontSize: 19 }} />
          <span>Diagnóstico Estomatológico General</span>
        </h3>
        <textarea
          rows={3}
          value={diagnosisAndPlan.generalDiagnosis}
          onChange={(e) => updateDiagnosisPlan({ generalDiagnosis: e.target.value })}
          placeholder="Diagnóstico integral: dental (caries), pulpar, periodontal (gingivitis/periodontitis), oclusal y de tejidos blandos..."
          className="w-full min-h-[72px] px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none resize-none"
        />
      </section>

      {/* Tooth-by-tooth diagnosis registry */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
          <h3 className="text-sm font-bold uppercase tracking-wider text-purple-700 dark:text-purple-400 flex items-center gap-2">
            <SearchOutlinedIcon sx={{ fontSize: 19 }} />
            <span>Hallazgos por Órgano Dentario (FDI)</span>
          </h3>
          <span className="text-xs text-slate-400 font-mono">
            {teethEntries.length} piezas registradas
          </span>
        </div>

        {/* Quick add tooth finding */}
        <form onSubmit={handleAddToothRecord} className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={newTooth}
            onChange={(e) => setNewTooth(e.target.value)}
            placeholder="O.D. (ej. 16, 21)"
            className="w-full sm:w-32 min-h-[44px] px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none font-mono"
          />
          <input
            type="text"
            value={newDiagnosis}
            onChange={(e) => setNewDiagnosis(e.target.value)}
            placeholder="Diagnóstico (ej. Caries oclusal profunda, resina desajustada)"
            className="flex-1 min-h-[44px] px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
          />
          <button
            type="submit"
            className="min-h-[44px] px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-sm font-semibold shadow transition-colors active:scale-95 flex items-center justify-center gap-1.5"
          >
            <AddCircleOutlineIcon sx={{ fontSize: 18 }} />
            <span>Agregar</span>
          </button>
        </form>

        {/* Teeth List */}
        {teethEntries.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
            {teethEntries.map(([tooth, diagnosis]) => (
              <div
                key={tooth}
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 text-xs"
              >
                <div className="flex items-center gap-2 overflow-hidden">
                  <span className="font-mono font-bold bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 px-2 py-0.5 rounded">
                    OD {tooth}
                  </span>
                  <span className="text-slate-700 dark:text-slate-200 truncate">
                    {diagnosis}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveToothRecord(tooth)}
                  className="min-w-[32px] min-h-[32px] flex items-center justify-center text-slate-400 hover:text-red-500 rounded transition-colors ml-2"
                  title="Eliminar registro"
                >
                  <CloseIcon sx={{ fontSize: 16 }} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-slate-400 italic text-center py-2">
            No se han registrado hallazgos específicos por pieza dental aún.
          </p>
        )}
      </section>

      {/* Phased Treatment Plan Section */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-purple-700 dark:text-purple-400 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
          <FormatListBulletedOutlinedIcon sx={{ fontSize: 19 }} />
          <span>Plan de Tratamiento por Fases</span>
        </h3>

        <div className="space-y-3">
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Fase I: Preventiva / Profilaxis / Educación</span>
            </label>
            <textarea
              rows={2}
              value={diagnosisAndPlan.phase1Preventive}
              onChange={(e) => updateDiagnosisPlan({ phase1Preventive: e.target.value })}
              placeholder="Profilaxis, control de placa dentobacteriana, técnica de cepillado, aplicación tópica de flúor..."
              className="w-full min-h-[56px] px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none resize-none"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              <span>Fase II: Curativa / Operatoria / Endodoncia / Exodoncias</span>
            </label>
            <textarea
              rows={2}
              value={diagnosisAndPlan.phase2Curative}
              onChange={(e) => updateDiagnosisPlan({ phase2Curative: e.target.value })}
              placeholder="Resinas compuestas, ionómeros, tratamientos de conductos, extracciones simples..."
              className="w-full min-h-[56px] px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none resize-none"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-purple-500" />
              <span>Fase III: Rehabilitadora / Prótesis Fija o Removible</span>
            </label>
            <textarea
              rows={2}
              value={diagnosisAndPlan.phase3Rehabilitative}
              onChange={(e) => updateDiagnosisPlan({ phase3Rehabilitative: e.target.value })}
              placeholder="Incrustaciones, coronas cerámicas, prótesis parcial fija/removible..."
              className="w-full min-h-[56px] px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none resize-none"
            />
          </div>

          <div className="space-y-1 pt-1">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Pronóstico Clínico
            </label>
            <select
              value={diagnosisAndPlan.prognosis}
              onChange={(e) => updateDiagnosisPlan({ prognosis: e.target.value })}
              className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
            >
              <option value="Favorable">Favorable</option>
              <option value="Reservado">Reservado</option>
              <option value="Desfavorable">Desfavorable</option>
            </select>
          </div>
        </div>
      </section>

      {/* Navigation Controls */}
      <div className="flex justify-between pt-2">
        <button
          type="button"
          onClick={() => setActiveTab("photos")}
          className="min-h-[44px] px-4 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-sm hover:bg-slate-300 transition-colors flex items-center gap-2"
        >
          <ArrowBackOutlinedIcon sx={{ fontSize: 18 }} />
          <span>Fotos Intraorales</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("log")}
          className="min-h-[44px] px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm shadow flex items-center gap-2 transition-all active:scale-95"
        >
          <span>Continuar a Bitácora</span>
          <ArrowForwardOutlinedIcon sx={{ fontSize: 18 }} />
        </button>
      </div>
    </div>
  );
}
