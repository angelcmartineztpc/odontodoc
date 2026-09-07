"use client";

import React, { useRef, useState } from "react";
import { useClinicalRecord } from "@/context/ClinicalRecordContext";
import { useTheme } from "@/context/ThemeContext";
import { exportOdontoFile, readOdontoFile } from "@/lib/fileStorage";
import FolderOpenOutlinedIcon from "@mui/icons-material/FolderOpenOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";
import RestartAltOutlinedIcon from "@mui/icons-material/RestartAltOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutlineOutlined";
import PaletteOutlinedIcon from "@mui/icons-material/PaletteOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

export function Header() {
  const { document: doc, loadDocument, resetDocument, setActiveTab, openGuideModal } = useClinicalRecord();
  const { openThemeModal, activeThemeId } = useTheme();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [feedback, setFeedback] = useState<{ text: string; isError?: boolean } | null>(null);
  const [showExplanationBar, setShowExplanationBar] = useState(false);

  const showFeedback = (text: string, isError = false) => {
    setFeedback({ text, isError });
    setTimeout(() => setFeedback(null), 3500);
  };

  const handleExport = () => {
    try {
      const filename = exportOdontoFile(doc);
      showFeedback(`Guardado: ${filename}`);
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
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handlePrintClick = () => {
    setActiveTab("print");
    showFeedback("Navegando a módulo de formatos e impresión oficial...");
  };

  const handleReset = () => {
    if (
      window.confirm(
        "¿Deseas reiniciar y crear un nuevo expediente? Se limpiarán los datos actuales no exportados."
      )
    ) {
      resetDocument();
      showFeedback("Expediente clínico reiniciado a plantilla en blanco.");
    }
  };

  const patientName = doc.patient.fullName.trim() || "Sin paciente asignado";
  const folio = doc.patient.recordNumber.trim() ? `Folio: ${doc.patient.recordNumber}` : "Borrador";

  return (
    <header className="no-print bg-white/95 dark:bg-slate-900/95 backdrop-blur-md text-slate-900 dark:text-slate-100 shadow-sm border-b border-slate-200/80 dark:border-slate-800 sticky top-0 z-30 transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 py-2 flex flex-col md:flex-row items-center justify-between gap-2.5">
        {/* Brand & Institutional Identity */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-white p-1 flex items-center justify-center shadow-xs border border-slate-200 shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logos/ujat-escudo-oficial.png"
                alt="Escudo Oficial UJAT"
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-caecilia font-bold text-base tracking-tight leading-none text-slate-900 dark:text-white">
                  OdontoDoc
                </h1>
                <span
                  suppressHydrationWarning
                  className="text-[9.5px] font-bold bg-[var(--theme-primary-light)] text-[var(--theme-primary-text)] dark:text-[var(--theme-accent)] px-2 py-0.5 rounded-full border border-[var(--theme-primary-border)]"
                >
                  {activeThemeId.startsWith("pink") ? "🌸 Rosa Clínico" : "Local-First"}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5 font-medium">
                UJAT DACS · Cirujano Dentista
              </p>
            </div>
          </div>

          {/* Active Patient Indicator & Help Info Toggle */}
          <div className="flex items-center gap-2">
            <div className="text-right pl-2 border-l border-slate-200 dark:border-slate-800">
              <span className="text-[9.5px] uppercase font-bold text-slate-400 block leading-tight">
                Expediente Activo
              </span>
              <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate max-w-[140px] sm:max-w-[180px]">
                {patientName}
              </p>
              <span className="text-[10px] text-[var(--theme-primary)] font-mono block leading-tight">{folio}</span>
            </div>

            {/* Quick explanation toggle button */}
            <button
              type="button"
              onClick={() => setShowExplanationBar((prev) => !prev)}
              className={`p-1.5 rounded-xl border transition-colors ${
                showExplanationBar
                  ? "bg-[var(--theme-primary-light)] text-[var(--theme-primary)] border-[var(--theme-primary)]"
                  : "bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700"
              }`}
              title="Mostrar u ocultar explicación de cada botón"
              aria-label="Ver etiquetas y explicación de botones"
            >
              <InfoOutlinedIcon sx={{ fontSize: 18 }} />
            </button>
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

        {/* Action Controls with Explicit Labels and Sub-Labels (Material Design 3) */}
        <div className="flex items-center gap-1.5 sm:gap-2 w-full md:w-auto justify-start sm:justify-end overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {/* Guía de Ayuda (Splash Onboarding) */}
          <button
            type="button"
            onClick={openGuideModal}
            className="min-h-[44px] px-2.5 py-1.5 text-xs font-semibold rounded-xl bg-amber-50 hover:bg-amber-100/90 dark:bg-amber-950/40 dark:hover:bg-amber-900/60 text-amber-900 dark:text-amber-200 border border-amber-200/90 dark:border-amber-800/70 flex items-center gap-2 transition-all active:scale-95 shrink-0 touch-manipulation cursor-pointer"
            title="Guía de ayuda de primer uso y funciones del sistema"
            aria-label="Abrir guía interactiva de primer uso"
          >
            <HelpOutlineOutlinedIcon sx={{ fontSize: 18 }} className="text-amber-600 dark:text-amber-400" />
            <div className="flex flex-col text-left leading-tight">
              <span className="font-bold text-[11px]">Guía</span>
              <span className="text-[9px] text-amber-700/80 dark:text-amber-400/80 font-normal">Ayuda</span>
            </div>
          </button>

          {/* Theme Customizer Trigger */}
          <button
            type="button"
            onClick={openThemeModal}
            className="min-h-[44px] px-2.5 py-1.5 text-xs font-semibold rounded-xl bg-[var(--theme-primary-subtle)] hover:bg-[var(--theme-primary-light)] text-[var(--theme-primary-text)] dark:text-[var(--theme-accent)] border border-[var(--theme-primary-border)] flex items-center gap-2 transition-all active:scale-95 shrink-0 touch-manipulation cursor-pointer"
            title="Personalizar colores y tema del sistema (prioridad tonos rosados)"
            aria-label="Personalizar colores y tema del sistema"
          >
            <PaletteOutlinedIcon sx={{ fontSize: 18 }} className="text-[var(--theme-primary)]" />
            <div className="flex flex-col text-left leading-tight">
              <span className="font-bold text-[11px]">Colores</span>
              <span className="text-[9px] text-[var(--theme-primary)]/80 font-normal">Tema visual</span>
            </div>
          </button>

          {/* Import .odonto */}
          <button
            type="button"
            onClick={handleImportClick}
            className="min-h-[44px] px-2.5 py-1.5 text-xs font-medium rounded-xl bg-slate-100 hover:bg-slate-200/80 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 flex items-center gap-2 transition-colors active:scale-95 shrink-0 touch-manipulation cursor-pointer"
            title="Importar y abrir un expediente clínico guardado (.odonto)"
            aria-label="Cargar archivo .odonto"
          >
            <FolderOpenOutlinedIcon sx={{ fontSize: 18 }} className="text-slate-600 dark:text-slate-300" />
            <div className="flex flex-col text-left leading-tight">
              <span className="font-bold text-[11px]">Abrir</span>
              <span className="text-[9px] text-slate-500 dark:text-slate-400 font-normal">.odonto</span>
            </div>
          </button>

          {/* Export .odonto */}
          <button
            type="button"
            onClick={handleExport}
            className="min-h-[44px] px-3 py-1.5 text-xs font-bold rounded-xl bg-[var(--theme-primary)] hover:bg-[var(--theme-primary-hover)] text-white flex items-center gap-2 shadow-2xs transition-colors active:scale-95 shrink-0 touch-manipulation cursor-pointer"
            title="Guardar y descargar el expediente actual en archivo local .odonto"
            aria-label="Guardar expediente localmente (.odonto)"
          >
            <SaveOutlinedIcon sx={{ fontSize: 18 }} />
            <div className="flex flex-col text-left leading-tight">
              <span className="font-bold text-[11px] text-white">Guardar</span>
              <span className="text-[9px] text-white/85 font-normal">Respaldo local</span>
            </div>
          </button>

          {/* Formatos / Print */}
          <button
            type="button"
            onClick={handlePrintClick}
            className="min-h-[44px] px-2.5 py-1.5 text-xs font-semibold rounded-xl bg-slate-100 hover:bg-slate-200/80 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 flex items-center gap-2 transition-colors active:scale-95 shrink-0 touch-manipulation cursor-pointer"
            title="Ver y descargar PDF de las 3 hojas oficiales UJAT listas para firmar"
            aria-label="Imprimir o guardar PDF de formatos oficiales UJAT"
          >
            <PrintOutlinedIcon sx={{ fontSize: 18 }} className="text-slate-600 dark:text-slate-300" />
            <div className="flex flex-col text-left leading-tight">
              <span className="font-bold text-[11px]">Formatos</span>
              <span className="text-[9px] text-slate-600 dark:text-slate-300 font-normal">Imprimir / PDF</span>
            </div>
          </button>

          {/* Reset / New record */}
          <button
            type="button"
            onClick={handleReset}
            className="min-h-[44px] px-2.5 py-1.5 text-xs font-medium rounded-xl bg-slate-100 hover:bg-red-50 dark:bg-slate-800 dark:hover:bg-red-950/40 text-slate-600 hover:text-red-600 dark:text-slate-200 dark:hover:text-red-300 border border-slate-200 dark:border-slate-700 transition-colors flex items-center gap-2 active:scale-95 shrink-0 touch-manipulation cursor-pointer"
            title="Limpiar campos para iniciar un nuevo expediente en blanco"
            aria-label="Crear nuevo expediente en blanco"
          >
            <RestartAltOutlinedIcon sx={{ fontSize: 18 }} />
            <div className="flex flex-col text-left leading-tight">
              <span className="font-bold text-[11px]">Nuevo</span>
              <span className="text-[9px] text-slate-600 dark:text-slate-300 font-normal">En blanco</span>
            </div>
          </button>
        </div>
      </div>

      {/* Interactive Explanation Bar (Subtle M3 Surface Banner - High WCAG Contrast) */}
      {showExplanationBar && (
        <div className="bg-slate-50 dark:bg-slate-800/95 border-t border-slate-200/80 dark:border-slate-700 px-4 py-2 text-xs text-slate-700 dark:text-slate-200 flex items-center justify-between gap-3 animate-fade-in shadow-xs">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className="font-bold text-[var(--theme-primary)] dark:text-rose-300 flex items-center gap-1">
              <InfoOutlinedIcon sx={{ fontSize: 15 }} />
              Etiquetas de la barra:
            </span>
            <span><strong className="text-slate-900 dark:text-white font-semibold">Guía:</strong> Manual de uso interactivo</span>
            <span><strong className="text-slate-900 dark:text-white font-semibold">Colores:</strong> Cambia la paleta de colores y tema</span>
            <span><strong className="text-slate-900 dark:text-white font-semibold">Abrir:</strong> Carga un archivo .odonto previo</span>
            <span><strong className="text-slate-900 dark:text-white font-semibold">Guardar:</strong> Descarga el archivo de respaldo seguro</span>
            <span><strong className="text-slate-900 dark:text-white font-semibold">Formatos:</strong> Visualiza las 3 hojas oficiales UJAT</span>
            <span><strong className="text-slate-900 dark:text-white font-semibold">Nuevo:</strong> Inicia un paciente nuevo</span>
          </div>
          <button
            type="button"
            onClick={() => setShowExplanationBar(false)}
            className="text-slate-400 hover:text-slate-700 dark:hover:text-white p-1 text-xs cursor-pointer"
            title="Ocultar barra informativa"
          >
            ✕
          </button>
        </div>
      )}

      {/* Feedback Toast */}
      {feedback && (
        <div
          className={`text-xs font-medium py-1.5 px-4 text-center transition-all flex items-center justify-center gap-1.5 ${
            feedback.isError
              ? "bg-red-600 text-white"
              : "bg-[var(--theme-primary)] text-white shadow-sm"
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

