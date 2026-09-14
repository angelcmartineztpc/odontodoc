"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Rotate90DegreesCwOutlinedIcon from "@mui/icons-material/Rotate90DegreesCwOutlined";
import ZoomInOutlinedIcon from "@mui/icons-material/ZoomInOutlined";
import ZoomOutOutlinedIcon from "@mui/icons-material/ZoomOutOutlined";
import RestartAltOutlinedIcon from "@mui/icons-material/RestartAltOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import CropOutlinedIcon from "@mui/icons-material/CropOutlined";

interface ImageEditorModalProps {
  isOpen: boolean;
  imageSrc: string;
  photoLabel: string;
  aspectRatio?: number; // width / height (default 4/3 = 1.333)
  onSave: (croppedDataUrl: string) => void;
  onCancel: () => void;
}

export function ImageEditorModal({
  isOpen,
  imageSrc,
  photoLabel,
  aspectRatio = 4 / 3,
  onSave,
  onCancel,
}: ImageEditorModalProps) {
  const [rotation, setRotation] = useState<number>(0); // 0, 90, 180, 270
  const [zoom, setZoom] = useState<number>(1.0); // 1.0 to 3.0
  const [offset, setOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const initialOffsetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const imageRef = useRef<HTMLImageElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Reset state when opening with a new image
  useEffect(() => {
    if (isOpen) {
      setRotation(0);
      setZoom(1.0);
      setOffset({ x: 0, y: 0 });
    }
  }, [isOpen, imageSrc]);

  // Rotate 90 degrees clockwise
  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
    setOffset({ x: 0, y: 0 });
  };

  // Zoom controls
  const handleZoomChange = (newZoom: number) => {
    const clamped = Math.min(3.0, Math.max(1.0, newZoom));
    setZoom(clamped);
  };

  const handleReset = () => {
    setRotation(0);
    setZoom(1.0);
    setOffset({ x: 0, y: 0 });
  };

  // Mouse / Touch Drag Handlers
  const handleStartDrag = (clientX: number, clientY: number) => {
    setIsDragging(true);
    dragStartRef.current = { x: clientX, y: clientY };
    initialOffsetRef.current = { ...offset };
  };

  const handleMoveDrag = useCallback((clientX: number, clientY: number) => {
    if (!isDragging) return;
    const dx = clientX - dragStartRef.current.x;
    const dy = clientY - dragStartRef.current.y;
    setOffset({
      x: initialOffsetRef.current.x + dx,
      y: initialOffsetRef.current.y + dy,
    });
  }, [isDragging]);

  const handleEndDrag = () => {
    setIsDragging(false);
  };

  // Wheel zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    handleZoomChange(zoom + delta);
  };

  // Export cropped canvas
  const handleConfirmCrop = () => {
    const img = imageRef.current;
    if (!img) return;

    // Target output dimensions (e.g. 1000px width maintaining aspectRatio)
    const targetWidth = 1000;
    const targetHeight = Math.round(targetWidth / aspectRatio);

    const canvas = document.createElement("canvas");
    canvas.width = targetWidth;
    canvas.height = targetHeight;
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    // Viewport box dimensions in DOM
    const container = containerRef.current;
    const boxWidth = container?.clientWidth || 360;
    const boxHeight = container?.clientHeight || 270;

    // Scale factor from preview box to full output canvas
    const scaleFactor = targetWidth / boxWidth;

    ctx.save();
    // Move origin to center of output canvas
    ctx.translate(targetWidth / 2, targetHeight / 2);

    // Apply rotation
    ctx.rotate((rotation * Math.PI) / 180);

    // Apply user pan translated to canvas space
    const rad = (-rotation * Math.PI) / 180;
    const rotatedOffsetX = offset.x * Math.cos(rad) - offset.y * Math.sin(rad);
    const rotatedOffsetY = offset.x * Math.sin(rad) + offset.y * Math.cos(rad);

    ctx.translate(rotatedOffsetX * scaleFactor, rotatedOffsetY * scaleFactor);

    // Compute base scale so image fills the crop box without empty borders
    const isSideways = rotation === 90 || rotation === 270;
    const effectiveImgWidth = isSideways ? img.naturalHeight : img.naturalWidth;
    const effectiveImgHeight = isSideways ? img.naturalWidth : img.naturalHeight;

    const baseScale = Math.max(
      targetWidth / effectiveImgWidth,
      targetHeight / effectiveImgHeight
    );

    const finalScale = baseScale * zoom;

    const drawWidth = img.naturalWidth * finalScale;
    const drawHeight = img.naturalHeight * finalScale;

    // Draw centered
    ctx.drawImage(img, -drawWidth / 2, -drawHeight / 2, drawWidth, drawHeight);
    ctx.restore();

    const croppedDataUrl = canvas.toDataURL("image/jpeg", 0.9);
    onSave(croppedDataUrl);
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Editor de Imagen Odontológica"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in touch-none select-none"
    >
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700/80 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[95vh]">
        {/* Header */}
        <div className="px-4 py-3 sm:py-3.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[var(--theme-primary)] flex items-center justify-center text-white">
              <CropOutlinedIcon sx={{ fontSize: 18 }} />
            </div>
            <div>
              <h3 className="text-sm font-bold leading-none">Editor de Encuadre</h3>
              <p className="text-[11px] text-slate-400 mt-0.5">{photoLabel}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onCancel}
            aria-label="Cerrar editor"
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <CloseOutlinedIcon sx={{ fontSize: 18 }} />
          </button>
        </div>

        {/* Viewport Framing Area */}
        <div className="p-4 sm:p-5 flex flex-col items-center justify-center bg-black/60 overflow-hidden relative">
          <div
            ref={containerRef}
            onWheel={handleWheel}
            onMouseDown={(e) => handleStartDrag(e.clientX, e.clientY)}
            onMouseMove={(e) => handleMoveDrag(e.clientX, e.clientY)}
            onMouseUp={handleEndDrag}
            onMouseLeave={handleEndDrag}
            onTouchStart={(e) => {
              if (e.touches.length === 1) {
                handleStartDrag(e.touches[0].clientX, e.touches[0].clientY);
              }
            }}
            onTouchMove={(e) => {
              if (e.touches.length === 1) {
                handleMoveDrag(e.touches[0].clientX, e.touches[0].clientY);
              }
            }}
            onTouchEnd={handleEndDrag}
            className="relative w-full max-w-[380px] aspect-[4/3] rounded-2xl overflow-hidden border-2 border-[var(--theme-accent)] shadow-2xl flex items-center justify-center cursor-grab active:cursor-grabbing bg-slate-950"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={imageRef}
              src={imageSrc}
              alt={photoLabel}
              draggable={false}
              style={{
                transform: `translate(${offset.x}px, ${offset.y}px) rotate(${rotation}deg) scale(${zoom})`,
                transition: isDragging ? "none" : "transform 0.15s ease-out",
                maxHeight: rotation % 180 === 0 ? "100%" : "none",
                maxWidth: rotation % 180 === 0 ? "none" : "100%",
                objectFit: "cover",
              }}
              className="w-full h-full pointer-events-none select-none"
            />

            {/* Rule of Thirds Reticle for Clinical Centering */}
            <div className="absolute inset-0 pointer-events-none grid grid-cols-3 grid-rows-3 border border-white/20">
              <div className="border-r border-b border-white/20" />
              <div className="border-r border-b border-white/20" />
              <div className="border-b border-white/20" />
              <div className="border-r border-b border-white/20" />
              <div className="border-r border-b border-white/20" />
              <div className="border-b border-white/20" />
              <div className="border-r border-b border-white/20" />
              <div className="border-r border-b border-white/20" />
              <div />
            </div>

            {/* Corner Bracket Accents */}
            <span className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[var(--theme-accent)] pointer-events-none" />
            <span className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[var(--theme-accent)] pointer-events-none" />
            <span className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[var(--theme-accent)] pointer-events-none" />
            <span className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[var(--theme-accent)] pointer-events-none" />

            {/* Badge overlay */}
            <div className="absolute top-2 right-2 pointer-events-none">
              <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-black/75 text-white backdrop-blur-md border border-white/10">
                {rotation}° | {Math.round(zoom * 100)}%
              </span>
            </div>
          </div>

          <p className="text-[11px] text-slate-400 mt-2.5 text-center">
            Arrastra para centrar • Usa la barra para zoom o rota con el botón
          </p>
        </div>

        {/* Toolbar Controls */}
        <div className="p-4 bg-slate-900 border-t border-slate-800 space-y-3">
          {/* Zoom Slider */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => handleZoomChange(zoom - 0.2)}
              aria-label="Reducir zoom"
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
            >
              <ZoomOutOutlinedIcon sx={{ fontSize: 20 }} />
            </button>
            <input
              type="range"
              min="1.0"
              max="3.0"
              step="0.05"
              value={zoom}
              onChange={(e) => handleZoomChange(parseFloat(e.target.value))}
              aria-label="Control de zoom"
              className="flex-1 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[var(--theme-primary)]"
            />
            <button
              type="button"
              onClick={() => handleZoomChange(zoom + 0.2)}
              aria-label="Aumentar zoom"
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
            >
              <ZoomInOutlinedIcon sx={{ fontSize: 20 }} />
            </button>
            <span className="text-xs font-mono font-semibold text-slate-300 w-10 text-right">
              {Math.round(zoom * 100)}%
            </span>
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-between gap-2 pt-1">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleRotate}
                className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 hover:text-white border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Girar 90° en sentido horario"
              >
                <Rotate90DegreesCwOutlinedIcon sx={{ fontSize: 16 }} />
                <span>Girar 90°</span>
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="px-2.5 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-700/60 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                title="Restablecer encuadre original"
              >
                <RestartAltOutlinedIcon sx={{ fontSize: 16 }} />
                <span className="hidden sm:inline">Restablecer</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onCancel}
                className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                Cancelar
              </button>

              <button
                type="button"
                onClick={handleConfirmCrop}
                className="px-4 py-2 rounded-xl bg-[var(--theme-primary)] hover:bg-[var(--theme-primary-hover)] text-white text-xs font-bold shadow-md flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
              >
                <CheckOutlinedIcon sx={{ fontSize: 17 }} />
                <span>Recortar y Guardar</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
