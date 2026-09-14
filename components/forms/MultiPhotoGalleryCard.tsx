"use client";

import React, { useRef, useState } from "react";
import PhotoCameraOutlinedIcon from "@mui/icons-material/PhotoCameraOutlined";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import CropOutlinedIcon from "@mui/icons-material/CropOutlined";
import { ImageEditorModal } from "./ImageEditorModal";
import { compressClinicalPhoto, CompressionResult } from "@/lib/compression";

interface MultiPhotoGalleryCardProps {
  title: string;
  subtitle?: string;
  watermarkText: string;
  images: string[];
  onAddImage: (dataUrl: string) => void;
  onRemoveImage: (index: number) => void;
  onUpdateImage?: (index: number, dataUrl: string) => void;
}

export function MultiPhotoGalleryCard({
  title,
  subtitle,
  watermarkText,
  images = [],
  onAddImage,
  onRemoveImage,
  onUpdateImage,
}: MultiPhotoGalleryCardProps) {
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editorRawSrc, setEditorRawSrc] = useState<string | null>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleTriggerCamera = () => {
    setEditingIndex(null);
    cameraInputRef.current?.click();
  };

  const handleTriggerFile = () => {
    setEditingIndex(null);
    fileInputRef.current?.click();
  };

  const handleProcessFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setErrorMessage("Por favor selecciona un archivo de imagen válido.");
      return;
    }

    setIsCompressing(true);
    setErrorMessage(null);

    try {
      const result: CompressionResult = await compressClinicalPhoto(file, {
        maxWidth: 1000,
        maxHeight: 1000,
        quality: 0.85,
        enableBioethicsAnonymization: false, // Intraoral / procedural photos are non-facial
      });

      onAddImage(result.dataUrl);
    } catch (err: unknown) {
      setErrorMessage(
        err instanceof Error ? err.message : "Error al procesar y comprimir la fotografía."
      );
    } finally {
      setIsCompressing(false);
      if (cameraInputRef.current) cameraInputRef.current.value = "";
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleEditExisting = (index: number) => {
    const existing = images[index];
    if (!existing) return;
    setEditingIndex(index);
    setEditorRawSrc(existing);
    setIsEditorOpen(true);
  };

  const handleSaveEditor = async (croppedDataUrl: string) => {
    setIsEditorOpen(false);
    setIsCompressing(true);
    setErrorMessage(null);

    try {
      const response = await fetch(croppedDataUrl);
      const blob = await response.blob();

      const result: CompressionResult = await compressClinicalPhoto(blob, {
        maxWidth: 1000,
        maxHeight: 1000,
        quality: 0.85,
        enableBioethicsAnonymization: false, // Intraoral / procedural photos are non-facial
      });

      if (editingIndex !== null && onUpdateImage) {
        onUpdateImage(editingIndex, result.dataUrl);
      } else {
        onAddImage(result.dataUrl);
      }
    } catch (err: unknown) {
      setErrorMessage(
        err instanceof Error ? err.message : "Error al procesar la fotografía."
      );
    } finally {
      setIsCompressing(false);
      setEditingIndex(null);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col gap-3 transition-all">
      {/* Hidden inputs */}
      <input
        type="file"
        ref={cameraInputRef}
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) handleProcessFile(f);
        }}
        accept="image/*"
        capture="environment"
        className="hidden"
        aria-hidden="true"
      />
      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) handleProcessFile(f);
        }}
        accept="image/*"
        className="hidden"
        aria-hidden="true"
      />

      {/* Card Header */}
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
            <span>{title}</span>
          </h4>
          {subtitle && (
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
              {subtitle}
            </p>
          )}
        </div>
        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
          {images.length} {images.length === 1 ? "foto" : "fotos"}
        </span>
      </div>

      {/* Visual Area: Empty State OR Grid of Thumbnails */}
      {images.length === 0 ? (
        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-slate-700/60 bg-slate-950 shadow-inner flex flex-col items-center justify-center p-3 text-center">
          {isCompressing ? (
            <div className="relative z-10 flex flex-col items-center gap-2">
              <span className="w-6 h-6 border-2 border-[var(--theme-primary)] border-t-transparent rounded-full animate-spin" />
              <span className="text-xs text-[var(--theme-accent)]">Procesando...</span>
            </div>
          ) : (
            <div className="relative z-10 grid grid-cols-2 gap-2.5 w-full h-full p-2">
              <button
                type="button"
                onClick={handleTriggerCamera}
                disabled={isCompressing}
                className="group flex flex-col items-center justify-center gap-1.5 p-2 rounded-xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 hover:from-slate-850 hover:to-slate-900 border border-slate-800 hover:border-[var(--theme-primary)] transition-all cursor-pointer touch-manipulation active:scale-95 backdrop-blur-sm"
              >
                <div className="w-9 h-9 rounded-xl bg-[var(--theme-primary)] text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                  <PhotoCameraOutlinedIcon sx={{ fontSize: 20 }} />
                </div>
                <span className="text-[11px] font-bold text-slate-100">Tomar Foto</span>
              </button>

              <button
                type="button"
                onClick={handleTriggerFile}
                disabled={isCompressing}
                className="group flex flex-col items-center justify-center gap-1.5 p-2 rounded-xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 hover:from-slate-850 hover:to-slate-900 border border-slate-800 hover:border-slate-600 transition-all cursor-pointer touch-manipulation active:scale-95 backdrop-blur-sm"
              >
                <div className="w-9 h-9 rounded-xl bg-slate-800 text-slate-200 group-hover:text-white border border-slate-700 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                  <AddPhotoAlternateOutlinedIcon sx={{ fontSize: 20 }} />
                </div>
                <span className="text-[11px] font-bold text-slate-100">Subir Archivo</span>
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-2.5">
          {/* Thumbnails grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {images.map((src, index) => (
              <div
                key={index}
                className="group relative aspect-[4/3] rounded-xl overflow-hidden border border-slate-700/80 bg-slate-950 shadow-sm"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={`${title} foto ${index + 1}`}
                  className="w-full h-full object-cover"
                />

                {/* Index badge */}
                <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-black/75 text-white backdrop-blur-sm">
                  #{index + 1}
                </span>

                {/* Overlay actions */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent sm:bg-black/60 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity flex items-end sm:items-center justify-center gap-1.5 p-1.5">
                  <button
                    type="button"
                    onClick={() => handleEditExisting(index)}
                    className="p-1.5 min-h-[36px] min-w-[36px] rounded-lg bg-slate-800/90 hover:bg-slate-700 text-white transition-colors cursor-pointer flex items-center justify-center shadow-sm"
                    title="Editar encuadre"
                  >
                    <CropOutlinedIcon sx={{ fontSize: 16 }} />
                  </button>
                  <button
                    type="button"
                    onClick={() => onRemoveImage(index)}
                    className="p-1.5 min-h-[36px] min-w-[36px] rounded-lg bg-red-950/90 hover:bg-red-800 text-red-200 transition-colors cursor-pointer flex items-center justify-center shadow-sm"
                    title="Eliminar foto"
                  >
                    <DeleteOutlineOutlinedIcon sx={{ fontSize: 16 }} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Add row */}
          <div className="flex items-center gap-2 pt-1">
            <button
              type="button"
              onClick={handleTriggerCamera}
              disabled={isCompressing}
              className="flex-1 min-h-[38px] px-3 py-1.5 rounded-xl bg-[var(--theme-primary)] text-white text-xs font-semibold hover:bg-[var(--theme-primary-hover)] transition-all flex items-center justify-center gap-1.5 active:scale-95 shadow-sm touch-manipulation cursor-pointer"
            >
              <PhotoCameraOutlinedIcon sx={{ fontSize: 16 }} />
              <span>Tomar otra foto</span>
            </button>
            <button
              type="button"
              onClick={handleTriggerFile}
              disabled={isCompressing}
              className="flex-1 min-h-[38px] px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-xs font-semibold transition-all flex items-center justify-center gap-1.5 active:scale-95 touch-manipulation cursor-pointer"
            >
              <AddPhotoAlternateOutlinedIcon sx={{ fontSize: 16 }} />
              <span>Subir archivo</span>
            </button>
          </div>
        </div>
      )}

      {errorMessage && (
        <div className="p-2 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-xs text-red-600 dark:text-red-400 font-medium">
          {errorMessage}
        </div>
      )}

      {/* Editor Modal */}
      {isEditorOpen && editorRawSrc && (
        <ImageEditorModal
          isOpen={isEditorOpen}
          imageSrc={editorRawSrc}
          photoLabel={`${title} - ${watermarkText}`}
          onSave={handleSaveEditor}
          onCancel={() => {
            setIsEditorOpen(false);
            setEditingIndex(null);
          }}
        />
      )}
    </div>
  );
}
