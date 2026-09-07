"use client";

import React, { useState } from "react";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { useClinicalRecord } from "@/context/ClinicalRecordContext";
import { Sheet1ClinicalSummary } from "./Sheet1ClinicalSummary";
import { Sheet2DiagnosisPlan } from "./Sheet2DiagnosisPlan";
import { Sheet3TreatmentSummary } from "./Sheet3TreatmentSummary";

export function PrintContainer() {
  const { setActiveTab } = useClinicalRecord();
  const [selectedSheet, setSelectedSheet] = useState<"all" | "sheet1" | "sheet2" | "sheet3">("all");
  const [outputMode, setOutputMode] = useState<"filled" | "blank">("filled");

  const isBlank = outputMode === "blank";

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="pb-40 sm:pb-48 max-w-5xl mx-auto px-2 sm:px-4 pt-4">
      {/* Screen Control Bar (Hidden on Print) */}
      <div className="no-print bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 mb-6 shadow-md flex flex-col lg:flex-row items-center justify-between gap-4 sticky top-16 z-20 backdrop-blur-md">
        <div>
          <h2 className="text-base font-bold flex items-center gap-2 text-slate-800 dark:text-slate-100">
            <DescriptionOutlinedIcon className="text-[var(--theme-primary)]" />
            <span>Formatos Institucionales UJAT DACS (1:1 Oficial)</span>
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
            Réplica fiel Carta/Letter del documento oficial de Clínicas Odontológicas.
          </p>
        </div>

        {/* Action & Filter buttons */}
        <div className="flex items-center gap-2.5 w-full lg:w-auto justify-end flex-wrap">
          {/* Dual Mode Selector (Relleno vs En Blanco) */}
          <div className="inline-flex rounded-xl p-1 bg-slate-100 dark:bg-slate-800 text-xs font-medium border border-slate-200 dark:border-slate-700">
            <button
              type="button"
              onClick={() => setOutputMode("filled")}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                outputMode === "filled"
                  ? "bg-[var(--theme-primary)] text-white font-bold shadow-sm"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900"
              }`}
            >
              <EditNoteOutlinedIcon sx={{ fontSize: 16 }} />
              <span>Expediente (Relleno)</span>
            </button>
            <button
              type="button"
              onClick={() => setOutputMode("blank")}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                outputMode === "blank"
                  ? "bg-[var(--theme-primary)] text-white font-bold shadow-sm"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900"
              }`}
            >
              <FeedOutlinedIcon sx={{ fontSize: 16 }} />
              <span>Formato en Blanco</span>
            </button>
          </div>

          {/* Sheet Selector */}
          <div className="inline-flex rounded-xl p-1 bg-slate-100 dark:bg-slate-800 text-xs font-medium border border-slate-200 dark:border-slate-700">
            <button
              type="button"
              onClick={() => setSelectedSheet("all")}
              className={`px-2.5 py-1.5 rounded-lg transition-colors ${
                selectedSheet === "all"
                  ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white font-bold shadow-sm"
                  : "text-slate-600 dark:text-slate-400"
              }`}
            >
              Las 3 Hojas
            </button>
            <button
              type="button"
              onClick={() => setSelectedSheet("sheet1")}
              className={`px-2.5 py-1.5 rounded-lg transition-colors ${
                selectedSheet === "sheet1"
                  ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white font-bold shadow-sm"
                  : "text-slate-600 dark:text-slate-400"
              }`}
            >
              Hoja 1
            </button>
            <button
              type="button"
              onClick={() => setSelectedSheet("sheet2")}
              className={`px-2.5 py-1.5 rounded-lg transition-colors ${
                selectedSheet === "sheet2"
                  ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white font-bold shadow-sm"
                  : "text-slate-600 dark:text-slate-400"
              }`}
            >
              Hoja 2
            </button>
            <button
              type="button"
              onClick={() => setSelectedSheet("sheet3")}
              className={`px-2.5 py-1.5 rounded-lg transition-colors ${
                selectedSheet === "sheet3"
                  ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white font-bold shadow-sm"
                  : "text-slate-600 dark:text-slate-400"
              }`}
            >
              Hoja 3
            </button>
          </div>

          {/* Print Trigger */}
          <button
            type="button"
            onClick={handlePrint}
            className="min-h-[38px] px-4 py-2 rounded-xl bg-[var(--theme-primary)] hover:bg-[var(--theme-primary-hover)] text-white font-bold text-xs shadow-md flex items-center gap-1.5 active:scale-95 transition-all"
          >
            <PrintOutlinedIcon sx={{ fontSize: 16 }} />
            <span>Imprimir / PDF</span>
          </button>
        </div>
      </div>

      {/* Mode Information Banner */}
      <div className="no-print mb-4 p-3 rounded-xl bg-[var(--theme-primary-subtle)] border border-[var(--theme-primary-border)] text-xs text-[var(--theme-primary-text)] dark:text-[var(--theme-accent)] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-bold">Modo activo:</span>
          <span>
            {outputMode === "filled"
              ? "Expediente Relleno — Visualizando los datos, fotografías y procedimientos del paciente en curso."
              : "Formato Oficial en Blanco — Renglones y recuadros limpios con guías punteadas listos para llenado manual."}
          </span>
        </div>
        <span className="font-mono text-[10px] uppercase px-2 py-0.5 rounded bg-[var(--theme-primary-light)] text-[var(--theme-primary-text)] font-semibold">
          {outputMode === "filled" ? "Relleno" : "En Blanco"}
        </span>
      </div>

      {/* Printable Documents Container */}
      <div className="printable-container space-y-6">
        {(selectedSheet === "all" || selectedSheet === "sheet1") && (
          <Sheet1ClinicalSummary isBlank={isBlank} />
        )}
        {(selectedSheet === "all" || selectedSheet === "sheet2") && (
          <Sheet2DiagnosisPlan isBlank={isBlank} />
        )}
        {(selectedSheet === "all" || selectedSheet === "sheet3") && (
          <Sheet3TreatmentSummary isBlank={isBlank} />
        )}
      </div>

      {/* Screen Bottom Navigation Return Card */}
      <div className="no-print mt-6 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-slate-200/90 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3 transition-all">
        <span className="text-xs text-slate-500 dark:text-slate-400">
          ¿Deseas modificar algún dato antes de la entrega clínica oficial?
        </span>
        <button
          type="button"
          onClick={() => setActiveTab("identification")}
          className="min-h-[48px] px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-300/80 dark:border-slate-700 font-semibold text-sm transition-colors flex items-center justify-center gap-2 touch-manipulation cursor-pointer"
        >
          <ArrowBackOutlinedIcon sx={{ fontSize: 18 }} />
          <span>Volver a Ficha de Identificación</span>
        </button>
      </div>
    </div>
  );
}
