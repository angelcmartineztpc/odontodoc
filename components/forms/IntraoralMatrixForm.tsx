"use client";

import React from "react";
import { useClinicalRecord } from "@/context/ClinicalRecordContext";
import { CameraCaptureInput } from "./CameraCaptureInput";
import PhotoCameraOutlinedIcon from "@mui/icons-material/PhotoCameraOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";

export function IntraoralMatrixForm() {
  const { document: doc, updatePhoto, setActiveTab } = useClinicalRecord();
  const { photos } = doc;

  const totalPhotosCount = [
    photos.intraoralFrontal,
    photos.intraoralUpper,
    photos.intraoralLower,
    photos.intraoralRight,
    photos.intraoralLeft,
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
              Módulo C: Matriz Fotográfica Intraoral (5 Tomas Clínicas)
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
              Captura con compresión en Canvas en memoria. Alimenta la matriz de la Hoja 2 oficial UJAT.
            </p>
          </div>
        </div>
        <div className="shrink-0 text-right">
          <span className="text-xs font-semibold bg-[var(--theme-primary-light)] text-[var(--theme-primary-text)] dark:text-[var(--theme-accent)] px-2.5 py-1 rounded-full border border-[var(--theme-primary-border)] font-mono">
            {totalPhotosCount} / 5
          </span>
        </div>
      </div>

      {/* 5 Views Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* 1. Oclusión Frontal */}
        <div className="sm:col-span-2">
          <CameraCaptureInput
            label="1. Oclusión Frontal Anterior"
            description="Enfoque centrado en línea media con retractores de labios"
            value={photos.intraoralFrontal}
            onChange={(dataUrl) => updatePhoto("intraoralFrontal", dataUrl)}
            aspectRatioLabel="Frontal"
          />
        </div>

        {/* 2. Arcada Superior */}
        <div>
          <CameraCaptureInput
            label="2. Arcada Maxilar Superior"
            description="Toma oclusal con espejo intraoral reflejando caras oclusales y paladar"
            value={photos.intraoralUpper}
            onChange={(dataUrl) => updatePhoto("intraoralUpper", dataUrl)}
            aspectRatioLabel="Oclusal Superior"
          />
        </div>

        {/* 3. Arcada Inferior */}
        <div>
          <CameraCaptureInput
            label="3. Arcada Mandibular Inferior"
            description="Toma oclusal inferior separando lengua hacia lingual/atrás"
            value={photos.intraoralLower}
            onChange={(dataUrl) => updatePhoto("intraoralLower", dataUrl)}
            aspectRatioLabel="Oclusal Inferior"
          />
        </div>

        {/* 4. Lateral Derecha */}
        <div>
          <CameraCaptureInput
            label="4. Lateral Derecha en Oclusión"
            description="Relación molar y canina derecha (Clase molar I, II o III)"
            value={photos.intraoralRight}
            onChange={(dataUrl) => updatePhoto("intraoralRight", dataUrl)}
            aspectRatioLabel="Molar Derecha"
          />
        </div>

        {/* 5. Lateral Izquierda */}
        <div>
          <CameraCaptureInput
            label="5. Lateral Izquierda en Oclusión"
            description="Relación molar y canina izquierda (Clase molar I, II o III)"
            value={photos.intraoralLeft}
            onChange={(dataUrl) => updatePhoto("intraoralLeft", dataUrl)}
            aspectRatioLabel="Molar Izquierda"
          />
        </div>
      </div>

      {/* Navigation Action Card (Material Design 3 Surface with High Clearance) */}
      <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-slate-200/90 dark:border-slate-800 shadow-sm flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 transition-all">
        <button
          type="button"
          onClick={() => setActiveTab("history")}
          className="min-h-[48px] px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-300/80 dark:border-slate-700 font-semibold text-sm transition-colors flex items-center justify-center gap-2 touch-manipulation cursor-pointer"
        >
          <ArrowBackOutlinedIcon sx={{ fontSize: 18 }} />
          <span>Historial y Foto Extraoral</span>
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
