"use client";

import React, { useRef, useState } from "react";
import { useClinicalRecord } from "@/context/ClinicalRecordContext";
import { exportOdontoFile, readOdontoFile } from "@/lib/fileStorage";
import FolderOpenOutlinedIcon from "@mui/icons-material/FolderOpenOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";
import RestartAltOutlinedIcon from "@mui/icons-material/RestartAltOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutlineOutlined";

export function Header() {
  const { document: doc, loadDocument, resetDocument, setActiveTab } = useClinicalRecord();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [feedback, setFeedback] = useState<{ text: string; isError?: boolean } | null>(null);

  const showFeedback = (text: string, isError = false) => {
    setFeedback({ text, isError });
    setTimeout(() => setFeedback(null), 3500);
  };

  const handleExport = () => {
    try {
      exportOdontoFile(doc);
      showFeedback("Expediente .odonto exportado con éxito.");
    } catch (err: unknown) {
      showFeedback(err instanceof Error ? err.message : "Error al exportar expediente.", true);
    }
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const loadedDoc = await readOdontoFile(file);
      loadDocument(loadedDoc);
      showFeedback("Expediente .odonto cargado exitosamente.");
    } catch (err: unknown) {
      showFeedback(err instanceof Error ? err.message : "Error al importar el archivo.", true);
    } finally {
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleReset = () => {
    if (confirm("¿Estás seguro de iniciar un nuevo expediente? Los cambios no exportados se perderán.")) {
      resetDocument();
      showFeedback("Nuevo expediente en blanco preparado.");
    }
  };

  const handlePrintClick = () => {
    setActiveTab("print");
    setTimeout(() => {
      window.print();
    }, 150);
  };

  const patientName = doc.patient.fullName.trim() || "Sin nombre asignado";
  const folio = doc.patient.recordNumber.trim() ? `Folio: ${doc.patient.recordNumber}` : "Borrador";

  return (
    <header className="no-print bg-slate-900 text-white shadow-md border-b border-slate-800 sticky top-0 z-30">
      {/* Top micro-banner with official UJAT motto */}
      <div className="bg-[#1C8443] text-white text-[10px] py-0.5 px-4 text-center font-serif tracking-wider font-semibold border-b border-[#156533] flex items-center justify-center gap-2">
        <span>“ESTUDIO EN LA DUDA. ACCIÓN EN LA FE”</span>
        <span className="text-emerald-200 font-bold">·</span>
        <span className="hidden sm:inline">UNIVERSIDAD JUÁREZ AUTÓNOMA DE TABASCO</span>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-2.5 flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Brand & Institutional Identity */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-white p-1 flex items-center justify-center shadow-md border border-slate-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logos/ujat-escudo-oficial.png"
                alt="Escudo Oficial UJAT"
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-caecilia font-bold text-base tracking-tight leading-none text-white">
                  OdontoDoc
                </h1>
                <span className="text-[9.5px] font-semibold bg-[#1C8443]/30 text-[#8DC642] px-1.5 py-0.5 rounded border border-[#1C8443]/50">
                  Local-First
                </span>
              </div>
              <p className="text-[11px] text-slate-300 leading-tight mt-0.5 font-medium">
                UJAT DACS · Cirujano Dentista
              </p>
            </div>
          </div>

          {/* Current Patient Chip for Quick Mobile Context */}
          <div className="sm:hidden text-right">
            <p className="text-xs font-semibold text-slate-200 truncate max-w-[130px]">
              {patientName}
            </p>
            <span className="text-[10px] text-[#8DC642] font-mono">{folio}</span>
          </div>
        </div>

        {/* Hidden File Input for .odonto import */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".odonto,application/json"
          className="hidden"
          aria-hidden="true"
        />

        {/* Action Controls (Material Design Buttons >=44px) */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end overflow-x-auto pb-1 sm:pb-0">
          <button
            type="button"
            onClick={handleImportClick}
            className="min-h-[44px] px-3.5 py-2 text-xs font-medium rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5 transition-colors active:scale-95 shadow-sm"
            title="Importar expediente (.odonto)"
          >
            <FolderOpenOutlinedIcon sx={{ fontSize: 18 }} />
            <span>Importar</span>
          </button>

          <button
            type="button"
            onClick={handleExport}
            className="min-h-[44px] px-4 py-2 text-xs font-bold rounded-xl bg-[#1C8443] hover:bg-[#156533] text-white flex items-center gap-1.5 shadow transition-colors active:scale-95 border border-[#41AD49]/40"
            title="Guardar archivo local .odonto"
          >
            <SaveOutlinedIcon sx={{ fontSize: 18 }} />
            <span>Guardar .odonto</span>
          </button>

          <button
            type="button"
            onClick={handlePrintClick}
            className="min-h-[44px] px-3.5 py-2 text-xs font-semibold rounded-xl bg-blue-600 hover:bg-blue-500 text-white flex items-center gap-1.5 shadow transition-colors active:scale-95"
            title="Imprimir o guardar PDF de las 3 hojas UJAT"
          >
            <PrintOutlinedIcon sx={{ fontSize: 18 }} />
            <span>Imprimir PDF</span>
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="min-h-[44px] min-w-[44px] px-2.5 py-2 rounded-xl bg-slate-800 hover:bg-red-950/40 text-slate-400 hover:text-red-300 border border-slate-800 transition-colors flex items-center justify-center"
            title="Limpiar y crear nuevo expediente"
          >
            <RestartAltOutlinedIcon sx={{ fontSize: 20 }} />
          </button>
        </div>
      </div>

      {/* Material Feedback Toast */}
      {feedback && (
        <div
          className={`text-xs font-medium py-1.5 px-4 text-center transition-all flex items-center justify-center gap-1.5 ${
            feedback.isError
              ? "bg-red-600 text-white"
              : "bg-[#1C8443] text-white shadow-inner"
          }`}
        >
          {feedback.isError ? (
            <ErrorOutlineIcon sx={{ fontSize: 16 }} />
          ) : (
            <CheckCircleOutlineIcon sx={{ fontSize: 16 }} />
          )}
          <span>{feedback.text}</span>
        </div>
      )}
    </header>
  );
}
