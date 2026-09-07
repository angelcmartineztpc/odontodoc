"use client";

import React, { useRef, useState } from "react";
import PhotoCameraOutlinedIcon from "@mui/icons-material/PhotoCameraOutlined";
import AutorenewOutlinedIcon from "@mui/icons-material/AutorenewOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { compressClinicalPhoto } from "@/lib/compression";

interface CameraCaptureInputProps {
  label: string;
  description?: string;
  value: string | null;
  onChange: (dataUrl: string | null) => void;
  aspectRatioLabel?: string;
}

export function CameraCaptureInput({
  label,
  description,
  value,
  onChange,
  aspectRatioLabel = "Frente / Oclusal",
}: CameraCaptureInputProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleTriggerCapture = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsCompressing(true);
    setErrorMessage(null);

    try {
      // In-Memory Canvas Compression pipeline (<1000px, JPEG 0.8)
      const result = await compressClinicalPhoto(file, {
        maxWidth: 1000,
        maxHeight: 1000,
        quality: 0.8,
      });

      onChange(result.dataUrl);
    } catch (err: unknown) {
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "Error al procesar la fotografía en el canvas."
      );
    } finally {
      setIsCompressing(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(null);
  };

  return (

    <div className="bg-white dark:bg-slate-900 rounded-xl p-3.5 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col gap-3">
      {/* Hidden native camera trigger */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        capture="environment"
        className="hidden"
        aria-hidden="true"
      />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className={`w-2.5 h-2.5 rounded-full shadow-sm transition-colors ${
              value ? "bg-[var(--theme-primary)]" : "bg-slate-300 dark:bg-slate-700"
            }`}
          />
          <span className="text-xs font-bold text-slate-800 dark:text-slate-100">
            {label}
          </span>
        </div>
        <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 font-mono">
          {aspectRatioLabel}
        </span>
      </div>

      {description && (
        <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
          {description}
        </p>
      )}

      {/* Viewport Frame */}
      <div className="relative w-full aspect-[4/3] bg-slate-950 rounded-2xl overflow-hidden border border-slate-700/60 shadow-inner flex items-center justify-center">
        {value ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={value} alt={label} className="w-full h-full object-cover" />
            <span className="corner-reticle absolute top-2 left-2 w-3.5 h-3.5 border-t-2 border-l-2 border-[var(--theme-accent)] pointer-events-none" />
            <span className="corner-reticle absolute top-2 right-2 w-3.5 h-3.5 border-t-2 border-r-2 border-[var(--theme-accent)] pointer-events-none" />
            <span className="corner-reticle absolute bottom-2 left-2 w-3.5 h-3.5 border-b-2 border-l-2 border-[var(--theme-accent)] pointer-events-none" />
            <span className="corner-reticle absolute bottom-2 right-2 w-3.5 h-3.5 border-b-2 border-r-2 border-[var(--theme-accent)] pointer-events-none" />
            <span className="absolute bottom-2 right-2 bg-black/75 backdrop-blur-sm text-[var(--theme-accent)] text-[10px] px-2 py-0.5 rounded font-mono pointer-events-none">
              Canvas JPG 0.8
            </span>
          </>
        ) : (
          <button
            type="button"
            onClick={handleTriggerCapture}
            disabled={isCompressing}
            className="w-full h-full flex flex-col items-center justify-center gap-1.5 p-4 text-slate-300 hover:text-[var(--theme-primary)] transition-colors"
          >
            {isCompressing ? (
              <div className="flex flex-col items-center gap-2">
                <span className="w-6 h-6 border-2 border-[var(--theme-primary)] border-t-transparent rounded-full animate-spin" />
                <span className="text-[11px] text-[var(--theme-accent)] font-medium">Procesando imagen...</span>
              </div>
            ) : (
              <>
                <PhotoCameraOutlinedIcon sx={{ fontSize: 32 }} className="text-[var(--theme-primary)]" />
                <span className="text-xs font-semibold">Tocar para capturar encuadre</span>
                <span className="text-[10px] text-slate-400">Ajuste automático a estándar Carta</span>
              </>
            )}
          </button>
        )}
      </div>

      {value && (
        <div className="flex items-center gap-2 pt-1 border-t border-slate-100 dark:border-slate-800">
          <button
            type="button"
            onClick={handleTriggerCapture}
            className="flex-1 min-h-[44px] px-3 py-2 rounded-lg bg-[var(--theme-primary)] text-white text-xs font-semibold hover:bg-[var(--theme-primary-hover)] transition-colors flex items-center justify-center gap-1.5 active:scale-95 shadow-sm"
          >
            <AutorenewOutlinedIcon sx={{ fontSize: 16 }} />
            <span>Reemplazar toma</span>
          </button>
          <button
            type="button"
            onClick={handleRemove}
            className="min-h-[44px] px-3.5 py-2 rounded-lg border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 active:scale-95"
          >
            <DeleteOutlineOutlinedIcon sx={{ fontSize: 16 }} />
            <span>Quitar</span>
          </button>
        </div>
      )}

      {errorMessage && (
        <p className="text-[11px] text-red-500 font-medium">{errorMessage}</p>
      )}
    </div>

  );
}
