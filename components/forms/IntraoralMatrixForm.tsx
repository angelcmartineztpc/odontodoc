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
    <div className="space-y-6 pb-24 max-w-3xl mx-auto px-4 pt-4">
      {/* Banner */}
      <div className="bg-gradient-to-r from-emerald-700 to-teal-800 text-white p-4 rounded-2xl shadow-sm flex items-center justify-between border border-emerald-600/30">
        <div>
          <h2 className="text-lg font-bold flex items-center gap-2">
            <PhotoCameraOutlinedIcon sx={{ fontSize: 22 }} />
            <span>Módulo C: Matriz Fotográfica Intraoral (5 Tomas Clínicas)</span>
          </h2>
          <p className="text-xs text-emerald-100 mt-1">
            Captura con compresión automática en Canvas en memoria. Alimenta la matriz fotográfica de la Hoja 2 oficial UJAT.
          </p>
        </div>
        <div className="text-right">
          <span className="text-xs font-semibold bg-emerald-900/60 px-2.5 py-1 rounded-full border border-emerald-400/30 font-mono">
            {totalPhotosCount} / 5 capturadas
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

      {/* Navigation Controls */}
      <div className="flex justify-between pt-2">
        <button
          type="button"
          onClick={() => setActiveTab("history")}
          className="min-h-[44px] px-4 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-sm hover:bg-slate-300 transition-colors flex items-center gap-2"
        >
          <ArrowBackOutlinedIcon sx={{ fontSize: 18 }} />
          <span>Historial y Foto Extraoral</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("diagnosis")}
          className="min-h-[44px] px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-semibold text-sm shadow flex items-center gap-2 transition-all active:scale-95"
        >
          <span>Continuar a Diagnóstico y Plan</span>
          <ArrowForwardOutlinedIcon sx={{ fontSize: 18 }} />
        </button>
      </div>
    </div>
  );
}
