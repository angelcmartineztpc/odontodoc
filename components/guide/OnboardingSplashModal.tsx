"use client";

import React, { useEffect, useState } from "react";
import { useClinicalRecord } from "@/context/ClinicalRecordContext";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import PaletteOutlinedIcon from "@mui/icons-material/PaletteOutlined";
import FolderOpenOutlinedIcon from "@mui/icons-material/FolderOpenOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";
import RestartAltOutlinedIcon from "@mui/icons-material/RestartAltOutlined";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import MedicalServicesOutlinedIcon from "@mui/icons-material/MedicalServicesOutlined";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";

export function OnboardingSplashModal() {
  const { isGuideOpen, closeGuideModal } = useClinicalRecord();
  const [mounted, setMounted] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Guarantee matching SSR and initial client hydration to prevent hydration mismatch
  if (!mounted || !isGuideOpen) return null;

  const handleDismiss = () => {
    if (typeof window !== "undefined" && dontShowAgain) {
      try {
        localStorage.setItem("odontodoc_guide_dismissed", "true");
      } catch {
        // Ignore
      }
    }
    closeGuideModal();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="guide-modal-title"
    >
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden text-slate-900 dark:text-slate-100 transition-all">
        {/* Modal Header (Subtle Material Design 3 Surface) */}
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4 bg-slate-50/80 dark:bg-slate-800/70">
          <div className="flex items-center gap-3">
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
                <h2 id="guide-modal-title" className="font-caecilia font-bold text-base sm:text-lg text-slate-900 dark:text-white leading-tight">
                  Bienvenido a OdontoDoc
                </h2>
                <span className="text-[10px] font-bold bg-[var(--theme-primary-light)] text-[var(--theme-primary-text)] dark:bg-rose-950/60 dark:text-rose-200 px-2.5 py-0.5 rounded-full border border-[var(--theme-primary-border)] dark:border-rose-800/80">
                  Guía Rápida
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 font-medium mt-0.5">
                Sistema Clínico Odontológico UJAT DACS · Local-First
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleDismiss}
            className="p-1.5 rounded-xl text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200/70 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            title="Cerrar guía"
            aria-label="Cerrar ventana de bienvenida"
          >
            <CloseOutlinedIcon sx={{ fontSize: 20 }} />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto px-5 sm:px-7 py-5 space-y-6 text-sm">
          {/* Welcome Note - High Contrast WCAG AAA Compliant in both Light and Dark modes */}
          <div className="p-4 rounded-2xl bg-rose-50/90 dark:bg-slate-800/90 border border-rose-200 dark:border-slate-700 flex items-start gap-3.5 shadow-xs">
            <div className="w-8 h-8 rounded-xl bg-white dark:bg-slate-700 flex items-center justify-center text-[var(--theme-primary)] dark:text-rose-300 shrink-0 shadow-xs border border-rose-200 dark:border-slate-600">
              <HelpOutlineOutlinedIcon sx={{ fontSize: 19 }} />
            </div>
            <div className="space-y-1.5">
              <h3 className="font-bold text-xs uppercase tracking-wider text-rose-900 dark:text-rose-200">
                ¿Qué es OdontoDoc y cómo funciona?
              </h3>
              <p className="text-xs text-slate-800 dark:text-slate-100 leading-relaxed font-normal">
                Herramienta digital diseñada para alumnos y docentes de Cirujano Dentista en clínicas universitarias. 
                Funciona <strong className="font-semibold text-slate-950 dark:text-white underline decoration-rose-300 dark:decoration-rose-500 underline-offset-2">100% en tu dispositivo</strong> (local-first): no requiere internet permanente, no sube datos a servidores externos y garantiza la privacidad total de tus pacientes.
              </p>
            </div>
          </div>

          {/* Header Controls Explanation ("Etiquetas que dicen qué hace cada cosa") */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-4 rounded-full bg-[var(--theme-primary)]" />
              <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white uppercase tracking-wide">
                Barra Superior: ¿Qué hace cada botón?
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {/* Colores */}
              <div className="p-3 rounded-xl bg-white dark:bg-slate-800/90 border border-slate-200/90 dark:border-slate-700 flex items-start gap-2.5 shadow-2xs">
                <div className="p-1.5 rounded-lg bg-[var(--theme-primary-light)] text-[var(--theme-primary)] dark:bg-rose-950/60 dark:text-rose-300 shrink-0">
                  <PaletteOutlinedIcon sx={{ fontSize: 18 }} />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-1.5">
                    Colores (Tema)
                    <span className="text-[9.5px] font-medium text-slate-500 dark:text-slate-300">Personalización</span>
                  </h4>
                  <p className="text-[11.5px] text-slate-700 dark:text-slate-200 mt-0.5 leading-snug">
                    Permite cambiar entre tonos rositas suaves, verde UJAT, fucsia, azul o crear tu propio color personalizado.
                  </p>
                </div>
              </div>

              {/* Importar */}
              <div className="p-3 rounded-xl bg-white dark:bg-slate-800/90 border border-slate-200/90 dark:border-slate-700 flex items-start gap-2.5 shadow-2xs">
                <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-100 shrink-0">
                  <FolderOpenOutlinedIcon sx={{ fontSize: 18 }} />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-1.5">
                    Abrir .odonto
                    <span className="text-[9.5px] font-medium text-slate-500 dark:text-slate-300">Importar</span>
                  </h4>
                  <p className="text-[11.5px] text-slate-700 dark:text-slate-200 mt-0.5 leading-snug">
                    Carga un archivo <code className="bg-slate-100 dark:bg-slate-700 px-1 py-0.5 rounded font-mono text-slate-800 dark:text-slate-100">.odonto</code> guardado previamente para reanudar el expediente sin perder datos.
                  </p>
                </div>
              </div>

              {/* Guardar .odonto */}
              <div className="p-3 rounded-xl bg-white dark:bg-slate-800/90 border border-slate-200/90 dark:border-slate-700 flex items-start gap-2.5 shadow-2xs">
                <div className="p-1.5 rounded-lg bg-[var(--theme-primary)] text-white shrink-0">
                  <SaveOutlinedIcon sx={{ fontSize: 18 }} />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-1.5">
                    Guardar .odonto
                    <span className="text-[9.5px] font-medium text-[var(--theme-primary)] dark:text-rose-300">Respaldo</span>
                  </h4>
                  <p className="text-[11.5px] text-slate-700 dark:text-slate-200 mt-0.5 leading-snug">
                    Descarga tu expediente actual con todas sus fotos y notas en tu computadora. ¡Úsalo para respaldar cada sesión!
                  </p>
                </div>
              </div>

              {/* Formatos UJAT */}
              <div className="p-3 rounded-xl bg-white dark:bg-slate-800/90 border border-slate-200/90 dark:border-slate-700 flex items-start gap-2.5 shadow-2xs">
                <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-100 shrink-0">
                  <PrintOutlinedIcon sx={{ fontSize: 18 }} />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-1.5">
                    Formatos UJAT
                    <span className="text-[9.5px] font-medium text-slate-500 dark:text-slate-300">Imprimir / PDF</span>
                  </h4>
                  <p className="text-[11.5px] text-slate-700 dark:text-slate-200 mt-0.5 leading-snug">
                    Genera las 3 hojas oficiales UJAT (Hoja 1, Hoja 2 y Hoja 3) fidedignas al formato institucional para imprimir o PDF.
                  </p>
                </div>
              </div>

              {/* Nuevo */}
              <div className="p-3 rounded-xl bg-white dark:bg-slate-800/90 border border-slate-200/90 dark:border-slate-700 flex items-start gap-2.5 shadow-2xs">
                <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 shrink-0">
                  <RestartAltOutlinedIcon sx={{ fontSize: 18 }} />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-1.5">
                    Nuevo Expediente
                    <span className="text-[9.5px] font-medium text-slate-500 dark:text-slate-300">En blanco</span>
                  </h4>
                  <p className="text-[11.5px] text-slate-700 dark:text-slate-200 mt-0.5 leading-snug">
                    Limpia los campos para comenzar la captura de un paciente nuevo desde cero (te solicitará confirmación).
                  </p>
                </div>
              </div>

              {/* Guía */}
              <div className="p-3 rounded-xl bg-white dark:bg-slate-800/90 border border-slate-200/90 dark:border-slate-700 flex items-start gap-2.5 shadow-2xs">
                <div className="p-1.5 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-200 shrink-0">
                  <HelpOutlineOutlinedIcon sx={{ fontSize: 18 }} />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-1.5">
                    Guía de Ayuda
                    <span className="text-[9.5px] font-medium text-slate-500 dark:text-slate-300">Manual</span>
                  </h4>
                  <p className="text-[11.5px] text-slate-700 dark:text-slate-200 mt-0.5 leading-snug">
                    Vuelve a abrir esta ventana en cualquier momento para revisar atajos, módulos e instrucciones.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Workflow Steps */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-4 rounded-full bg-[var(--theme-primary)]" />
              <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white uppercase tracking-wide">
                Flujo de Trabajo Clínico Recomendado
              </h3>
            </div>
            <div className="space-y-2.5">
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700 flex items-center gap-3">
                <div className="w-7 h-7 rounded-xl bg-[var(--theme-primary-light)] text-[var(--theme-primary)] dark:bg-rose-950/60 dark:text-rose-300 flex items-center justify-center shrink-0">
                  <AssignmentIndOutlinedIcon sx={{ fontSize: 16 }} />
                </div>
                <div className="text-xs text-slate-700 dark:text-slate-200">
                  <span className="font-bold text-slate-900 dark:text-white">1. Pestaña Ficha:</span> Captura nombre del paciente, número de folio, datos del alumno, docente supervisor y somatometría (peso y talla).
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700 flex items-center gap-3">
                <div className="w-7 h-7 rounded-xl bg-[var(--theme-primary-light)] text-[var(--theme-primary)] dark:bg-rose-950/60 dark:text-rose-300 flex items-center justify-center shrink-0">
                  <MedicalServicesOutlinedIcon sx={{ fontSize: 16 }} />
                </div>
                <div className="text-xs text-slate-700 dark:text-slate-200">
                  <span className="font-bold text-slate-900 dark:text-white">2. Pestaña Historial:</span> Completa antecedentes patológicos, signos vitales y marca hallazgos clínicos en el odontograma interactivo.
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700 flex items-center gap-3">
                <div className="w-7 h-7 rounded-xl bg-[var(--theme-primary-light)] text-[var(--theme-primary)] dark:bg-rose-950/60 dark:text-rose-300 flex items-center justify-center shrink-0">
                  <CameraAltOutlinedIcon sx={{ fontSize: 16 }} />
                </div>
                <div className="text-xs text-slate-700 dark:text-slate-200">
                  <span className="font-bold text-slate-900 dark:text-white">3. Pestaña Fotos:</span> Sube o captura con la cámara de tu celular o laptop las fotos extraorales e intraorales requeridas.
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700 flex items-center gap-3">
                <div className="w-7 h-7 rounded-xl bg-[var(--theme-primary-light)] text-[var(--theme-primary)] dark:bg-rose-950/60 dark:text-rose-300 flex items-center justify-center shrink-0">
                  <DescriptionOutlinedIcon sx={{ fontSize: 16 }} />
                </div>
                <div className="text-xs text-slate-700 dark:text-slate-200">
                  <span className="font-bold text-slate-900 dark:text-white">4. Formatos e Impresión:</span> Ve a la pestaña Formatos, pulsa <strong className="font-bold text-slate-900 dark:text-white">&quot;Imprimir Formatos Oficiales&quot;</strong> y firma o guarda en PDF para entregar en clínica.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200/90 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-3">
          <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-700 dark:text-slate-200 select-none font-medium hover:text-slate-950 dark:hover:text-white">
            <input
              type="checkbox"
              checked={dontShowAgain}
              onChange={(e) => setDontShowAgain(e.target.checked)}
              className="rounded text-[var(--theme-primary)] focus:ring-[var(--theme-primary)] w-4 h-4 border-slate-300 dark:border-slate-600 cursor-pointer"
            />
            <span>No volver a mostrar automáticamente al iniciar</span>
          </label>

          <button
            type="button"
            onClick={handleDismiss}
            className="w-full sm:w-auto px-5 py-2 text-xs font-bold rounded-xl bg-[var(--theme-primary)] hover:bg-[var(--theme-primary-hover)] text-white shadow-sm flex items-center justify-center gap-2 transition-transform active:scale-95 cursor-pointer"
          >
            <CheckCircleOutlineOutlinedIcon sx={{ fontSize: 17 }} />
            <span>¡Comenzar a usar OdontoDoc!</span>
            <ArrowForwardOutlinedIcon sx={{ fontSize: 16 }} />
          </button>
        </div>
      </div>
    </div>
  );
}
