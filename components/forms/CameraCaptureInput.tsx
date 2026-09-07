"use client";

import React, { useRef, useState } from "react";
import PhotoCameraOutlinedIcon from "@mui/icons-material/PhotoCameraOutlined";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
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
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleTriggerCamera = () => {
    cameraInputRef.current?.click();
  };

  const handleTriggerFile = () => {
    fileInputRef.current?.click();
  };

  const processImageFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setErrorMessage("Por favor selecciona un archivo de imagen válido (JPG, PNG, WebP o HEIC).");
      return;
    }

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
          : "Error al procesar y comprimir la fotografía en el canvas."
      );
    } finally {
      setIsCompressing(false);
      if (cameraInputRef.current) cameraInputRef.current.value = "";
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await processImageFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      await processImageFile(file);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(null);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-4.5 border border-slate-200/90 dark:border-slate-800 shadow-sm flex flex-col gap-3.5 transition-all">
      {/* Hidden input 1: Native Camera trigger (capture="environment") */}
      <input
        type="file"
        ref={cameraInputRef}
        onChange={handleFileChange}
        accept="image/*"
        capture="environment"
        className="hidden"
        aria-hidden="true"
      />

      {/* Hidden input 2: File Browser / Gallery trigger (no capture, opens photo library or local files) */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
        aria-hidden="true"
      />

      {/* Card Header: Label and Aspect Ratio Badge */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className={`w-2.5 h-2.5 rounded-full shadow-sm transition-colors ${
              value ? "bg-[var(--theme-primary)]" : "bg-slate-300 dark:bg-slate-700"
            }`}
          />
          <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100">
            {label}
          </span>
        </div>
        <span className="px-2.5 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 font-mono">
          {aspectRatioLabel}
        </span>
      </div>

      {description && (
        <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 leading-snug">
          {description}
        </p>
      )}

      {/* Viewport Frame with Dropzone Support */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative w-full aspect-[4/3] rounded-2xl overflow-hidden border transition-all flex items-center justify-center ${
          isDragOver
            ? "border-2 border-dashed border-[var(--theme-primary)] bg-[var(--theme-primary-light)]/40 scale-[1.01]"
            : "border-slate-700/60 bg-slate-950 shadow-inner"
        }`}
      >
        {value ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={value} alt={label} className="w-full h-full object-cover" />
            <span className="corner-reticle absolute top-2.5 left-2.5 w-3.5 h-3.5 border-t-2 border-l-2 border-[var(--theme-accent)] pointer-events-none" />
            <span className="corner-reticle absolute top-2.5 right-2.5 w-3.5 h-3.5 border-t-2 border-r-2 border-[var(--theme-accent)] pointer-events-none" />
            <span className="corner-reticle absolute bottom-2.5 left-2.5 w-3.5 h-3.5 border-b-2 border-l-2 border-[var(--theme-accent)] pointer-events-none" />
            <span className="corner-reticle absolute bottom-2.5 right-2.5 w-3.5 h-3.5 border-b-2 border-r-2 border-[var(--theme-accent)] pointer-events-none" />
            <span className="absolute bottom-2.5 right-2.5 bg-black/80 backdrop-blur-md text-[var(--theme-accent)] text-[10px] px-2 py-0.5 rounded-md font-mono border border-white/10 pointer-events-none">
              Canvas JPG 0.8
            </span>
          </>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center">
            {isCompressing ? (
              <div className="flex flex-col items-center gap-2.5">
                <span className="w-7 h-7 border-2 border-[var(--theme-primary)] border-t-transparent rounded-full animate-spin" />
                <span className="text-xs text-[var(--theme-accent)] font-medium">
                  Comprimiendo y ajustando foto en canvas...
                </span>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3 w-full max-w-xs">
                {/* Visual Viewfinder Icon */}
                <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 text-slate-400 flex items-center justify-center shadow-sm">
                  <PhotoCameraOutlinedIcon sx={{ fontSize: 26 }} className="text-[var(--theme-primary)]" />
                </div>

                <div className="space-y-0.5">
                  <p className="text-xs font-semibold text-slate-200">
                    Captura en vivo o sube foto existente
                  </p>
                  <p className="text-[10px] text-slate-400">
                    Puedes documentar con el paciente en el sillón o cargar fotos ya tomadas
                  </p>
                </div>

                {/* Dual Action Buttons */}
                <div className="grid grid-cols-2 gap-2 w-full pt-1">
                  <button
                    type="button"
                    onClick={handleTriggerCamera}
                    disabled={isCompressing}
                    className="min-h-[44px] px-3 py-2 rounded-xl bg-[var(--theme-primary)] hover:bg-[var(--theme-primary-hover)] text-white text-xs font-semibold transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-95 touch-manipulation cursor-pointer"
                  >
                    <PhotoCameraOutlinedIcon sx={{ fontSize: 16 }} />
                    <span>Tomar Foto</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleTriggerFile}
                    disabled={isCompressing}
                    className="min-h-[44px] px-3 py-2 rounded-xl bg-slate-800/90 hover:bg-slate-750 text-slate-100 hover:text-white border border-slate-700 text-xs font-semibold transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-95 touch-manipulation cursor-pointer"
                  >
                    <AddPhotoAlternateOutlinedIcon sx={{ fontSize: 16 }} />
                    <span>Subir Archivo</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Filled State Action Bar */}
      {value && (
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
          <button
            type="button"
            onClick={handleTriggerCamera}
            disabled={isCompressing}
            className="flex-1 min-h-[44px] px-3 py-2 rounded-xl bg-[var(--theme-primary)] text-white text-xs font-semibold hover:bg-[var(--theme-primary-hover)] transition-all flex items-center justify-center gap-1.5 active:scale-95 shadow-sm touch-manipulation cursor-pointer"
          >
            <PhotoCameraOutlinedIcon sx={{ fontSize: 16 }} />
            <span>Nueva Foto</span>
          </button>

          <button
            type="button"
            onClick={handleTriggerFile}
            disabled={isCompressing}
            className="flex-1 min-h-[44px] px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-750 border border-slate-200 dark:border-slate-700 text-xs font-semibold transition-all flex items-center justify-center gap-1.5 active:scale-95 touch-manipulation cursor-pointer"
          >
            <AddPhotoAlternateOutlinedIcon sx={{ fontSize: 16 }} />
            <span>Cambiar Archivo</span>
          </button>

          <button
            type="button"
            onClick={handleRemove}
            className="min-h-[44px] px-3.5 py-2 rounded-xl border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 text-xs font-semibold transition-all flex items-center justify-center gap-1.5 active:scale-95 touch-manipulation cursor-pointer"
            title="Quitar esta foto"
          >
            <DeleteOutlineOutlinedIcon sx={{ fontSize: 16 }} />
            <span>Quitar</span>
          </button>
        </div>
      )}

      {errorMessage && (
        <div className="p-2.5 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-xs text-red-600 dark:text-red-400 font-medium">
          {errorMessage}
        </div>
      )}
    </div>
  );
}
