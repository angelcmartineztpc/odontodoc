"use client";

import React from "react";
import { useClinicalRecord } from "@/context/ClinicalRecordContext";
import { CameraCaptureInput } from "./CameraCaptureInput";
import PhotoCameraOutlinedIcon from "@mui/icons-material/PhotoCameraOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";

export function OclusalMatrixForm() {
  const { document: doc, updatePhoto, setActiveTab } = useClinicalRecord();
  const { photos } = doc;

  const extraoralPhotosCount = [
    photos.extraoralFrontal,
    photos.extraoralRightProfile,
    photos.extraoralLeftProfile,
    photos.extraoralSmile,
  ].filter(Boolean).length;

  const intraoralPhotosCount = [
    photos.intraoralFrontal,
    photos.intraoralRight,
    photos.intraoralLeft,
  ].filter(Boolean).length;

  const oclusalPhotosCount = [
    photos.intraoralUpper,
    photos.intraoralLower,
  ].filter(Boolean).length;

  return (
    <div className="space-y-6 pb-40 sm:pb-48 max-w-3xl mx-auto px-4 pt-4">
      {/* Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200/90 dark:border-slate-800 shadow-sm flex items-start sm:items-center justify-between gap-3.5 transition-all">
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="w-10 h-10 rounded-2xl bg-[var(--theme-primary-light)] text-[var(--theme-primary)] flex items-center justify-center shrink-0 shadow-inner">
            <PhotoCameraOutlinedIcon sx={{ fontSize: 22 }} />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 tracking-tight leading-snug">
              Módulo D: Formato de Fotografías Clínicas Oclusales (2 Tomas)
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
              Captura exclusiva de las arcadas dentarias completas mediante espejo intraoral (Oclusal Superior Maxilar y Oclusal Inferior Mandibular).
            </p>
          </div>
        </div>
        <div className="shrink-0 text-right">
          <span className="text-xs font-semibold bg-[var(--theme-primary-light)] text-[var(--theme-primary-text)] dark:text-[var(--theme-accent)] px-2.5 py-1 rounded-full border border-[var(--theme-primary-border)] font-mono">
            {oclusalPhotosCount} / 2
          </span>
        </div>
      </div>

      {/* Selector de los 3 Formatos Fotográficos Independientes */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-2 border border-slate-200 dark:border-slate-800 shadow-sm grid grid-cols-3 gap-2">
        <button
          type="button"
          onClick={() => setActiveTab("history")}
          className="min-h-[42px] px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200/80 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all"
        >
          <span>1. EXTRAORALES</span>
          <span className="font-mono text-[10px] bg-slate-200 dark:bg-slate-700 px-1.5 py-0.5 rounded-full">
            {extraoralPhotosCount}/4
          </span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("photos")}
          className="min-h-[42px] px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200/80 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all"
        >
          <span>2. INTRAORALES</span>
          <span className="font-mono text-[10px] bg-slate-200 dark:bg-slate-700 px-1.5 py-0.5 rounded-full">
            {intraoralPhotosCount}/3
          </span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("occlusal")}
          className="min-h-[42px] px-3 py-2 rounded-xl bg-[var(--theme-primary)] text-white font-bold text-xs shadow-sm flex items-center justify-center gap-1.5 cursor-pointer transition-all"
        >
          <span>3. OCLUSALES</span>
          <span className="font-mono text-[10px] bg-white/20 px-1.5 py-0.5 rounded-full">
            {oclusalPhotosCount}/2
          </span>
        </button>
      </div>

      {/* Formato 3: Fotografías Clínicas Oclusales (2 Tomas Exclusivas) */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--theme-primary-text)] dark:text-[var(--theme-accent)] flex items-center gap-2">
            <PhotoCameraOutlinedIcon sx={{ fontSize: 19 }} />
            <span>Formato 3: Fotografías Clínicas Oclusales (2 Tomas)</span>
          </h3>
          <span className="text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-[var(--theme-primary-light)] text-[var(--theme-primary-text)] border border-[var(--theme-primary-border)] w-fit">
            {oclusalPhotosCount} / 2 tomas
          </span>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          Registro fotográfico oclusal superior e inferior con espejo intraoral y retractor labial para evaluación de forma de arco, caras oclusales y paladar/piso de boca.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* 1. Oclusal Superior */}
          <div>
            <CameraCaptureInput
              label="1. Oclusal Superior (Arcada Maxilar)"
              description="Arcada maxilar superior completa tomada con espejo oclusal reflejando caras oclusales y bóveda palatina"
              value={photos.intraoralUpper}
              onChange={(dataUrl) => updatePhoto("intraoralUpper", dataUrl)}
              aspectRatioLabel="Maxilar 4:3"
              watermarkText="OCLUSAL SUPERIOR"
              enableBioethicsAnonymization={false}
            />
          </div>

          {/* 2. Oclusal Inferior */}
          <div>
            <CameraCaptureInput
              label="2. Oclusal Inferior (Arcada Mandibular)"
              description="Arcada mandibular inferior completa tomada con espejo oclusal separando lengua hacia lingual"
              value={photos.intraoralLower}
              onChange={(dataUrl) => updatePhoto("intraoralLower", dataUrl)}
              aspectRatioLabel="Mandibular 4:3"
              watermarkText="OCLUSAL INFERIOR"
              enableBioethicsAnonymization={false}
            />
          </div>
        </div>
      </section>

      {/* Navigation Action Card (Material Design 3 Surface with High Clearance) */}
      <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-slate-200/90 dark:border-slate-800 shadow-sm flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 transition-all">
        <button
          type="button"
          onClick={() => setActiveTab("photos")}
          className="min-h-[48px] px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-300/80 dark:border-slate-700 font-semibold text-sm transition-colors flex items-center justify-center gap-2 touch-manipulation cursor-pointer"
        >
          <ArrowBackOutlinedIcon sx={{ fontSize: 18 }} />
          <span>Fotos Intraorales</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("diagnosis")}
          className="min-h-[48px] px-6 py-2.5 rounded-xl bg-[var(--theme-primary)] hover:bg-[var(--theme-primary-hover)] text-white font-bold text-sm shadow-sm flex items-center justify-center gap-2.5 transition-all active:scale-95 touch-manipulation cursor-pointer"
        >
          <span>Continuar a Diagnóstico y Plan</span>
          <ArrowForwardOutlinedIcon sx={{ fontSize: 19 }} />
        </button>
      </div>
    </div>
  );
}
