"use client";

import React, { useState } from "react";
import HistoryEduOutlinedIcon from "@mui/icons-material/HistoryEduOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import PhotoCameraOutlinedIcon from "@mui/icons-material/PhotoCameraOutlined";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";
import { useClinicalRecord } from "@/context/ClinicalRecordContext";
import { LogEntry, TreatmentStatus } from "@/lib/types";
import { CameraCaptureInput } from "./CameraCaptureInput";
import { MultiPhotoGalleryCard } from "./MultiPhotoGalleryCard";

export function TreatmentLogForm() {
  const {
    document: doc,
    addLogEntry,
    updateLogEntry,
    deleteLogEntry,
    updateTreatmentSession,
    setActiveTab,
  } = useClinicalRecord();
  const { treatmentLog, treatmentSession } = doc;

  const todayStr = new Date().toISOString().split("T")[0];

  const [date, setDate] = useState(todayStr);
  const [toothOrZone, setToothOrZone] = useState("");
  const [procedure, setProcedure] = useState("");
  const [evolutionNotes, setEvolutionNotes] = useState("");
  const [status, setStatus] = useState<TreatmentStatus>("concluido");

  const session = treatmentSession || {
    diagnosis: "",
    treatmentName: "",
    receiptNumber: "",
    date: todayStr,
    steps: [],
    photos: { before: [], during: [], after: [], xray: [] },
  };

  const toArray = (val: unknown): string[] => {
    if (Array.isArray(val)) return val.filter((item): item is string => typeof item === "string");
    if (typeof val === "string" && val.length > 0) return [val];
    return [];
  };

  const beforeImages = toArray(session.photos?.before);
  const duringImages = toArray(session.photos?.during);
  const afterImages = toArray(session.photos?.after);
  const xrayImages = toArray(session.photos?.xray);

  const handleAddPhotoToSection = (section: "before" | "during" | "after" | "xray", dataUrl: string) => {
    const currentList = toArray(session.photos?.[section]);
    updateTreatmentSession({
      photos: {
        ...session.photos,
        before: beforeImages,
        during: duringImages,
        after: afterImages,
        xray: xrayImages,
        [section]: [...currentList, dataUrl],
      },
    });
  };

  const handleRemovePhotoFromSection = (section: "before" | "during" | "after" | "xray", index: number) => {
    const currentList = toArray(session.photos?.[section]);
    updateTreatmentSession({
      photos: {
        ...session.photos,
        before: beforeImages,
        during: duringImages,
        after: afterImages,
        xray: xrayImages,
        [section]: currentList.filter((_, i) => i !== index),
      },
    });
  };

  const handleUpdatePhotoInSection = (section: "before" | "during" | "after" | "xray", index: number, dataUrl: string) => {
    const currentList = [...toArray(session.photos?.[section])];
    currentList[index] = dataUrl;
    updateTreatmentSession({
      photos: {
        ...session.photos,
        before: beforeImages,
        during: duringImages,
        after: afterImages,
        xray: xrayImages,
        [section]: currentList,
      },
    });
  };

  const handleAddEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!procedure.trim()) return;

    const newEntry: LogEntry = {
      id: typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : `log-${Date.now()}`,
      date: date || todayStr,
      toothOrZone: toothOrZone.trim() || "General",
      procedure: procedure.trim(),
      evolutionNotes: evolutionNotes.trim(),
      status,
      instructorSignatureConfirmed: false,
    };

    addLogEntry(newEntry);
    setToothOrZone("");
    setProcedure("");
    setEvolutionNotes("");
    setStatus("concluido");
  };

  const handleToggleSignature = (entry: LogEntry) => {
    updateLogEntry({
      ...entry,
      instructorSignatureConfirmed: !entry.instructorSignatureConfirmed,
    });
  };

  return (
    <div className="space-y-6 pb-40 sm:pb-48 max-w-3xl mx-auto px-4 pt-4">
      {/* Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200/90 dark:border-slate-800 shadow-sm flex items-start sm:items-center justify-between gap-3.5 transition-all">
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="w-10 h-10 rounded-2xl bg-[var(--theme-primary-light)] text-[var(--theme-primary)] flex items-center justify-center shrink-0 shadow-inner">
            <HistoryEduOutlinedIcon sx={{ fontSize: 22 }} />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 tracking-tight leading-snug">
              Módulo D: Resumen del Tratamiento Realizado y Bitácora
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
              Datos de sesión, galerías operatorias (Antes/Durante/Después/Radiografía) y bitácora clínica para la Hoja 3 oficial.
            </p>
          </div>
        </div>
        <span className="text-xs font-semibold bg-[var(--theme-primary-light)] text-[var(--theme-primary-text)] dark:text-[var(--theme-accent)] px-2.5 py-1 rounded-full border border-[var(--theme-primary-border)] shrink-0 font-mono">
          {treatmentLog.entries.length} citas
        </span>
      </div>

      {/* Section 1: Session Details for Sheet 3 (Diagnóstico, Tratamiento, N. Recibo) */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--theme-primary-text)] dark:text-[var(--theme-accent)] flex items-center gap-1.5 border-b border-slate-100 dark:border-slate-800 pb-2">
          <AssignmentOutlinedIcon sx={{ fontSize: 18 }} />
          <span>Datos de la Sesión para Hoja 3 Oficial UJAT</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="space-y-1 sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Diagnóstico de la Sesión *
            </label>
            <input
              type="text"
              value={session.diagnosis}
              onChange={(e) => updateTreatmentSession({ diagnosis: e.target.value })}
              placeholder="Ej. Caries de esmalte y dentina en OD 16 (K02.1)"
              className="w-full min-h-[44px] px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-[var(--theme-primary)] focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              N. de Recibo UJAT
            </label>
            <input
              type="text"
              value={session.receiptNumber}
              onChange={(e) => updateTreatmentSession({ receiptNumber: e.target.value })}
              placeholder="Ej. REC-2026-084"
              className="w-full min-h-[44px] px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-[var(--theme-primary)] focus:outline-none font-mono"
            />
          </div>

          <div className="space-y-1 sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Tratamiento (Resumen del Plan a Realizar) *
            </label>
            <input
              type="text"
              value={session.treatmentName}
              onChange={(e) => updateTreatmentSession({ treatmentName: e.target.value })}
              placeholder="Ej. Restauración con resina compuesta en OD 46, profilaxis dental y fase 1 periodontal"
              className="w-full min-h-[44px] px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-[var(--theme-primary)] focus:outline-none"
            />
            <p className="text-[10.5px] text-slate-500 dark:text-slate-400 mt-0.5">
              Sintetiza el plan de tratamiento proyectado a realizar en la sesión clínica oficial UJAT.
            </p>
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Fecha del Procedimiento
            </label>
            <input
              type="date"
              value={session.date || todayStr}
              onChange={(e) => updateTreatmentSession({ date: e.target.value })}
              className="w-full min-h-[44px] px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-[var(--theme-primary)] focus:outline-none"
            />
          </div>
        </div>
      </section>

      {/* Section 2: Procedural Photos Galleries (Antes, Durante, Después y Radiografía) */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
          <h3 className="text-sm font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
            <PhotoCameraOutlinedIcon sx={{ fontSize: 18 }} />
            <span>Galerías del Procedimiento Clínico y Radiográfico (Hoja 3)</span>
          </h3>
          <span className="text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-900/50 w-fit">
            {beforeImages.length + duringImages.length + afterImages.length + xrayImages.length} fotos registradas
          </span>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Documenta los momentos clínicos operatorios y el respaldo radiográfico. Puedes adjuntar múltiples fotografías por sección con editor interactivo estilo WhatsApp (zoom, rotación de 90° y encuadre).
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <MultiPhotoGalleryCard
            title="1. Radiografía (RX / Gabinete)"
            subtitle="Radiografía periapical, oclusal o panorámica inicial"
            watermarkText="RADIOGRAFÍA"
            images={xrayImages}
            onAddImage={(dataUrl) => handleAddPhotoToSection("xray", dataUrl)}
            onRemoveImage={(index) => handleRemovePhotoFromSection("xray", index)}
            onUpdateImage={(index, dataUrl) => handleUpdatePhotoInSection("xray", index, dataUrl)}
          />

          <MultiPhotoGalleryCard
            title="2. Antes (Preoperatorio)"
            subtitle="Estado cavitario inicial / Diagnóstico clínico"
            watermarkText="ANTES"
            images={beforeImages}
            onAddImage={(dataUrl) => handleAddPhotoToSection("before", dataUrl)}
            onRemoveImage={(index) => handleRemovePhotoFromSection("before", index)}
            onUpdateImage={(index, dataUrl) => handleUpdatePhotoInSection("before", index, dataUrl)}
          />

          <MultiPhotoGalleryCard
            title="3. Durante (Transoperatorio)"
            subtitle="Aislamiento absoluto / Cavidad limpia"
            watermarkText="DURANTE"
            images={duringImages}
            onAddImage={(dataUrl) => handleAddPhotoToSection("during", dataUrl)}
            onRemoveImage={(index) => handleRemovePhotoFromSection("during", index)}
            onUpdateImage={(index, dataUrl) => handleUpdatePhotoInSection("during", index, dataUrl)}
          />

          <MultiPhotoGalleryCard
            title="4. Después (Postoperatorio)"
            subtitle="Restauración terminada, oclusión y pulido"
            watermarkText="DESPUÉS"
            images={afterImages}
            onAddImage={(dataUrl) => handleAddPhotoToSection("after", dataUrl)}
            onRemoveImage={(index) => handleRemovePhotoFromSection("after", index)}
            onUpdateImage={(index, dataUrl) => handleUpdatePhotoInSection("after", index, dataUrl)}
          />
        </div>
      </section>

      {/* Section 3: Add Chronological Entry to Log */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 flex items-center gap-1.5 border-b border-slate-100 dark:border-slate-800 pb-2">
          <AddCircleOutlineIcon sx={{ fontSize: 18 }} />
          <span>Registrar Cita en Bitácora General</span>
        </h3>

        <form onSubmit={handleAddEntry} className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Fecha de la Cita *
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="w-full min-h-[44px] px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-[var(--theme-primary)] focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Órgano Dentario / Zona
              </label>
              <input
                type="text"
                value={toothOrZone}
                onChange={(e) => setToothOrZone(e.target.value)}
                placeholder="Ej. O.D. 16 o General"
                className="w-full min-h-[44px] px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-[var(--theme-primary)] focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Estado Operatorio
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as TreatmentStatus)}
                className="w-full min-h-[44px] px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-[var(--theme-primary)] focus:outline-none"
              >
                <option value="concluido">Concluido en la cita</option>
                <option value="durante">En proceso / Cita subsecuente</option>
                <option value="pre">Fase pre-operatoria</option>
                <option value="post">Control post-operatorio</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Procedimiento Clínico Efectuado *
            </label>
            <input
              type="text"
              value={procedure}
              onChange={(e) => setProcedure(e.target.value)}
              placeholder="Ej. Apertura cavitaria, grabado ácido y resina compuesta..."
              required
              className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-[var(--theme-primary)] focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Notas de Evolución y Recomendaciones
            </label>
            <textarea
              rows={2}
              value={evolutionNotes}
              onChange={(e) => setEvolutionNotes(e.target.value)}
              placeholder="Evolución clínica, medicamentos prescritos, indicaciones al paciente..."
              className="w-full min-h-[56px] px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-[var(--theme-primary)] focus:outline-none resize-none"
            />
          </div>

          <div className="flex justify-end pt-1">
            <button
              type="submit"
              className="min-h-[44px] px-5 py-2.5 rounded-xl bg-[var(--theme-primary)] hover:bg-[var(--theme-primary-hover)] text-white font-semibold text-sm shadow-md transition-all active:scale-95 flex items-center gap-2"
            >
              <AddCircleOutlineIcon sx={{ fontSize: 18 }} />
              <span>Guardar Cita en Bitácora</span>
            </button>
          </div>
        </form>
      </section>

      {/* Section 4: Chronological List of Sessions */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--theme-primary-text)] dark:text-[var(--theme-accent)] flex items-center gap-1.5 border-b border-slate-100 dark:border-slate-800 pb-2">
          <ReceiptLongOutlinedIcon sx={{ fontSize: 18 }} />
          <span>Historial de Sesiones Registradas</span>
        </h3>

        {treatmentLog.entries.length === 0 ? (
          <p className="text-xs text-slate-400 italic text-center py-6">
            Aún no se han registrado sesiones en la bitácora para este expediente.
          </p>
        ) : (
          <div className="space-y-2.5">
            {treatmentLog.entries.map((entry, index) => (
              <div
                key={entry.id}
                className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-xs font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 px-2 py-0.5 rounded">
                      Cita #{index + 1}
                    </span>
                    <span className="text-xs text-slate-500 font-mono">
                      {entry.date}
                    </span>
                    <span className="text-xs font-semibold bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 px-2 py-0.5 rounded">
                      {entry.toothOrZone}
                    </span>
                    <span
                      className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                        entry.status === "concluido"
                          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                          : "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                      }`}
                    >
                      {entry.status}
                    </span>
                  </div>

                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    {entry.procedure}
                  </p>

                  {entry.evolutionNotes && (
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      {entry.evolutionNotes}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    type="button"
                    onClick={() => handleToggleSignature(entry)}
                    className={`min-h-[40px] px-3 py-1.5 rounded-lg text-xs font-semibold border flex items-center gap-1.5 transition-colors ${
                      entry.instructorSignatureConfirmed
                        ? "bg-emerald-50 text-emerald-700 border-emerald-300 dark:bg-emerald-950/40 dark:text-emerald-300"
                        : "bg-slate-100 text-slate-600 border-slate-300 dark:bg-slate-800 dark:text-slate-400"
                    }`}
                  >
                    {entry.instructorSignatureConfirmed ? (
                      <>
                        <CheckCircleOutlineIcon sx={{ fontSize: 16 }} />
                        <span>Firmado</span>
                      </>
                    ) : (
                      <>
                        <EditNoteOutlinedIcon sx={{ fontSize: 16 }} />
                        <span>Pendiente</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => deleteLogEntry(entry.id)}
                    className="min-h-[40px] min-w-[40px] flex items-center justify-center text-slate-400 hover:text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                    title="Eliminar cita"
                  >
                    <DeleteOutlineOutlinedIcon sx={{ fontSize: 18 }} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Navigation Action Card (Material Design 3 Surface with High Clearance) */}
      <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-slate-200/90 dark:border-slate-800 shadow-sm flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 transition-all">
        <button
          type="button"
          onClick={() => setActiveTab("diagnosis")}
          className="min-h-[48px] px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-300/80 dark:border-slate-700 font-semibold text-sm transition-colors flex items-center justify-center gap-2 touch-manipulation cursor-pointer"
        >
          <ArrowBackOutlinedIcon sx={{ fontSize: 18 }} />
          <span>Diagnóstico y Plan</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("print")}
          className="min-h-[48px] px-6 py-2.5 rounded-xl bg-[var(--theme-primary)] hover:bg-[var(--theme-primary-hover)] text-white font-bold text-sm shadow-sm flex items-center justify-center gap-2.5 transition-all active:scale-95 touch-manipulation cursor-pointer"
        >
          <span>Ver Formatos Oficiales UJAT 1:1</span>
          <PrintOutlinedIcon sx={{ fontSize: 19 }} />
        </button>
      </div>
    </div>
  );
}
