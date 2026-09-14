"use client";

import React, { useRef, useState } from "react";
import PhotoCameraOutlinedIcon from "@mui/icons-material/PhotoCameraOutlined";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import CropOutlinedIcon from "@mui/icons-material/CropOutlined";
import { compressClinicalPhoto, CompressionResult } from "@/lib/compression";
import { ImageEditorModal } from "./ImageEditorModal";

interface CameraCaptureInputProps {
  label: string;
  description?: string;
  value?: string | null;
  onChange: (dataUrl: string | null) => void;
  aspectRatioLabel?: string;
  enableBioethicsAnonymization?: boolean;
  watermarkText?: string;
}

export function CameraCaptureInput({
  label,
  description,
  value,
  onChange,
  aspectRatioLabel = "Frente / Oclusal",
  enableBioethicsAnonymization = true,
  watermarkText,
}: CameraCaptureInputProps) {
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // WhatsApp-style Image Editor state
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editorRawSrc, setEditorRawSrc] = useState<string | null>(null);

  // Bioethics dual version tracking
  const [anonymizedVersion, setAnonymizedVersion] = useState<string | null>(null);
  const [originalVersion, setOriginalVersion] = useState<string | null>(null);
  const [isShowingOriginal, setIsShowingOriginal] = useState(false);
  const [faceDetected, setFaceDetected] = useState(false);

  const handleTriggerCamera = () => {
    cameraInputRef.current?.click();
  };

  const handleTriggerFile = () => {
    fileInputRef.current?.click();
  };

  const handleOpenEditor = (src: string) => {
    setEditorRawSrc(src);
    setIsEditorOpen(true);
  };

  const processImageFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setErrorMessage("Por favor selecciona un archivo de imagen válido (JPG, PNG, WebP o HEIC).");
      return;
    }

    setIsCompressing(true);
    setErrorMessage(null);

    try {
      // In-Memory Canvas Compression & Bioethics Anonymization pipeline (<1000px, JPEG 0.85)
      const result: CompressionResult = await compressClinicalPhoto(file, {
        maxWidth: 1000,
        maxHeight: 1000,
        quality: 0.85,
        enableBioethicsAnonymization,
      });

      if (result.bioethics?.faceDetected && result.originalDataUrl) {
        setFaceDetected(true);
        setAnonymizedVersion(result.dataUrl);
        setOriginalVersion(result.originalDataUrl);
        setIsShowingOriginal(false);
        onChange(result.dataUrl);
      } else {
        // Dental intraoral photo (0 faces detected) or no face found
        setFaceDetected(false);
        setAnonymizedVersion(null);
        setOriginalVersion(null);
        setIsShowingOriginal(false);
        onChange(result.dataUrl);
      }
    } catch (err: unknown) {
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "Error al procesar y anonimizar la fotografía en el canvas."
      );
    } finally {
      setIsCompressing(false);
      if (cameraInputRef.current) cameraInputRef.current.value = "";
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleSaveEditor = async (croppedDataUrl: string) => {
    setIsEditorOpen(false);
    setIsCompressing(true);
    setErrorMessage(null);

    try {
      // Convert cropped data URL to blob for compression pipeline
      const response = await fetch(croppedDataUrl);
      const blob = await response.blob();

      const result: CompressionResult = await compressClinicalPhoto(blob, {
        maxWidth: 1000,
        maxHeight: 1000,
        quality: 0.85,
        enableBioethicsAnonymization,
      });

      if (result.bioethics?.faceDetected && result.originalDataUrl) {
        setFaceDetected(true);
        setAnonymizedVersion(result.dataUrl);
        setOriginalVersion(result.originalDataUrl);
        setIsShowingOriginal(false);
        onChange(result.dataUrl);
      } else {
        setFaceDetected(false);
        setAnonymizedVersion(null);
        setOriginalVersion(null);
        setIsShowingOriginal(false);
        onChange(result.dataUrl);
      }
    } catch (err: unknown) {
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "Error al procesar y recortar la fotografía."
      );
    } finally {
      setIsCompressing(false);
    }
  };

  const handleToggleBioethicsView = () => {
    if (!faceDetected || !anonymizedVersion || !originalVersion) return;
    const nextShowOriginal = !isShowingOriginal;
    setIsShowingOriginal(nextShowOriginal);
    onChange(nextShowOriginal ? originalVersion : anonymizedVersion);
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
    setFaceDetected(false);
    setAnonymizedVersion(null);
    setOriginalVersion(null);
    setIsShowingOriginal(false);
    onChange(null);
  };

  return (

    <div className="relative bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-4.5 border border-slate-200/90 dark:border-slate-800 shadow-sm flex flex-col gap-3.5 transition-all">
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

      {/* Card Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2.5 w-2.5">
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                value ? "bg-[var(--theme-primary)]" : "hidden"
              }`}
            />
            <span
              className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                value ? "bg-[var(--theme-primary)]" : "bg-slate-300 dark:bg-slate-700"
              }`}
            />
          </span>
          <div>
            <span className="text-[10px] font-bold tracking-wider uppercase text-slate-400 dark:text-slate-500 block leading-none mb-1">
              Captura Clínica
            </span>
            <h4 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 leading-none">
              {label}
            </h4>
          </div>
        </div>
        <span className="px-2.5 py-1 rounded-lg text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 font-mono tracking-tight">
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

            {/* Bioethics Clinical Status Indicator Badge */}
            {faceDetected && (
              <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-start pointer-events-none z-10">
                <span
                  className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide flex items-center gap-1.5 shadow-md backdrop-blur-md border ${
                    isShowingOriginal
                      ? "bg-amber-950/85 text-amber-200 border-amber-500/40"
                      : "bg-emerald-950/85 text-emerald-200 border-emerald-500/40"
                  }`}
                >
                  <VerifiedUserOutlinedIcon sx={{ fontSize: 13 }} />
                  <span>
                    {isShowingOriginal
                      ? "Vista Original (Sin censura)"
                      : "Anonimización Bioética Activa"}
                  </span>
                </span>
              </div>
            )}

            {/* HUD Reticles */}
            <span className="absolute top-2.5 left-2.5 w-3.5 h-3.5 border-t-2 border-l-2 border-[var(--theme-accent)] pointer-events-none" />
            <span className="absolute top-2.5 right-2.5 w-3.5 h-3.5 border-t-2 border-r-2 border-[var(--theme-accent)] pointer-events-none" />
            <span className="absolute bottom-2.5 left-2.5 w-3.5 h-3.5 border-b-2 border-l-2 border-[var(--theme-accent)] pointer-events-none" />
            <span className="absolute bottom-2.5 right-2.5 w-3.5 h-3.5 border-b-2 border-r-2 border-[var(--theme-accent)] pointer-events-none" />

            <span className="absolute bottom-2.5 right-2.5 bg-black/80 backdrop-blur-md text-[var(--theme-accent)] text-[10px] px-2 py-0.5 rounded-md font-mono border border-white/10 pointer-events-none z-10">
              Canvas JPG 0.8
            </span>

            {/* Floating Action Dock inside Viewport */}
            <div className="absolute bottom-3 inset-x-3 bg-slate-900/85 backdrop-blur-md p-2 rounded-2xl border border-white/10 shadow-xl z-20 flex flex-col gap-2">
              {faceDetected && (
                <button
                  type="button"
                  onClick={handleToggleBioethicsView}
                  className={`w-full min-h-[38px] px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-2 active:scale-95 shadow-sm touch-manipulation cursor-pointer border ${
                    isShowingOriginal
                      ? "bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-500"
                      : "bg-slate-800/90 text-slate-200 hover:bg-slate-700 border-slate-700"
                  }`}
                  title={
                    isShowingOriginal
                      ? "Activar recuadro negro en ojos y fondo blanco"
                      : "Ver fotografía original sin censura"
                  }
                >
                  {isShowingOriginal ? (
                    <>
                      <VisibilityOffOutlinedIcon sx={{ fontSize: 16 }} />
                      <span>Reactivar Anonimización</span>
                    </>
                  ) : (
                    <>
                      <VisibilityOutlinedIcon sx={{ fontSize: 16 }} />
                      <span>Ver Original Clínico</span>
                    </>
                  )}
                </button>
              )}

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => value && handleOpenEditor(originalVersion || value)}
                  className="px-3 min-h-[42px] rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 text-xs font-semibold transition-all flex items-center justify-center gap-1.5 active:scale-95 touch-manipulation cursor-pointer"
                  title="Ajustar encuadre, zoom y rotación"
                >
                  <CropOutlinedIcon sx={{ fontSize: 16 }} />
                  <span>Encuadre</span>
                </button>

                <button
                  type="button"
                  onClick={handleTriggerCamera}
                  disabled={isCompressing}
                  className="flex-1 min-h-[42px] px-3 py-1.5 rounded-xl bg-[var(--theme-primary)] text-white text-xs font-semibold hover:bg-[var(--theme-primary-hover)] transition-all flex items-center justify-center gap-1.5 active:scale-95 shadow-sm touch-manipulation cursor-pointer"
                >
                  <PhotoCameraOutlinedIcon sx={{ fontSize: 16 }} />
                  <span>Nueva Foto</span>
                </button>

                <button
                  type="button"
                  onClick={handleTriggerFile}
                  disabled={isCompressing}
                  className="flex-1 min-h-[42px] px-3 py-1.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-all flex items-center justify-center gap-1.5 active:scale-95 touch-manipulation cursor-pointer"
                >
                  <AddPhotoAlternateOutlinedIcon sx={{ fontSize: 16 }} />
                  <span>Cambiar</span>
                </button>

                <button
                  type="button"
                  onClick={handleRemove}
                  className="min-h-[42px] px-3 py-1.5 rounded-xl border border-red-500/40 bg-red-950/20 text-red-400 hover:bg-red-900/30 text-xs font-semibold transition-all flex items-center justify-center gap-1 active:scale-95 touch-manipulation cursor-pointer"
                  title="Quitar esta foto"
                >
                  <DeleteOutlineOutlinedIcon sx={{ fontSize: 16 }} />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="relative w-full h-full flex flex-col items-center justify-center p-3 text-center">
            {isCompressing ? (
              <div className="relative z-10 flex flex-col items-center gap-2.5">
                <span className="w-7 h-7 border-2 border-[var(--theme-primary)] border-t-transparent rounded-full animate-spin" />
                <span className="text-xs text-[var(--theme-accent)] font-medium">
                  Procesando fotografía y bioética...
                </span>
              </div>
            ) : (
              <div className="relative z-10 grid grid-cols-2 gap-3 w-full h-full p-2">
                <button
                  type="button"
                  onClick={handleTriggerCamera}
                  disabled={isCompressing}
                  className="group flex flex-col items-center justify-center gap-2 p-3 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 hover:from-slate-850 hover:to-slate-900 border border-slate-800 hover:border-[var(--theme-primary)] transition-all cursor-pointer touch-manipulation active:scale-95 shadow-sm backdrop-blur-sm"
                >
                  <div className="w-11 h-11 rounded-2xl bg-[var(--theme-primary)] text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                    <PhotoCameraOutlinedIcon sx={{ fontSize: 24 }} />
                  </div>
                  <div className="text-center">
                    <span className="block text-xs font-bold text-slate-100">Tomar Foto</span>
                    <span className="block text-[10px] text-slate-400 mt-0.5">En sillón dental</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={handleTriggerFile}
                  disabled={isCompressing}
                  className="group flex flex-col items-center justify-center gap-2 p-3 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 hover:from-slate-850 hover:to-slate-900 border border-slate-800 hover:border-slate-600 transition-all cursor-pointer touch-manipulation active:scale-95 shadow-sm backdrop-blur-sm"
                >
                  <div className="w-11 h-11 rounded-2xl bg-slate-800 text-slate-200 group-hover:text-white border border-slate-700 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                    <AddPhotoAlternateOutlinedIcon sx={{ fontSize: 24 }} />
                  </div>
                  <div className="text-center">
                    <span className="block text-xs font-bold text-slate-100">Subir Archivo</span>
                    <span className="block text-[10px] text-slate-400 mt-0.5">Galería / Memoria</span>
                  </div>
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {errorMessage && (
        <div className="p-2.5 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-xs text-red-600 dark:text-red-400 font-medium">
          {errorMessage}
        </div>
      )}

      {/* WhatsApp-style Image Editor Modal */}
      {isEditorOpen && editorRawSrc && (
        <ImageEditorModal
          isOpen={isEditorOpen}
          imageSrc={editorRawSrc}
          photoLabel={watermarkText || label}
          onSave={handleSaveEditor}
          onCancel={() => setIsEditorOpen(false)}
        />
      )}
    </div>
  );
}
