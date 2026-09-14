"use client";

import React from "react";
import { useClinicalRecord } from "@/context/ClinicalRecordContext";
import { CameraCaptureInput } from "./CameraCaptureInput";
import MedicalServicesOutlinedIcon from "@mui/icons-material/MedicalServicesOutlined";
import PhotoCameraOutlinedIcon from "@mui/icons-material/PhotoCameraOutlined";
import MonitorHeartOutlinedIcon from "@mui/icons-material/MonitorHeartOutlined";
import HistoryEduOutlinedIcon from "@mui/icons-material/HistoryEduOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";

export function ClinicalHistoryForm() {
  const {
    document: doc,
    updateMedicalHistory,
    updateVitalSigns,
    updatePhoto,
    setActiveTab,
  } = useClinicalRecord();
  const { medicalHistory, photos } = doc;

  const weightNum = parseFloat(String(medicalHistory.vitalSigns.weight || "0"));
  const heightNum = parseFloat(String(medicalHistory.vitalSigns.height || "0"));
  const imcVal = weightNum > 0 && heightNum > 0 ? (weightNum / (heightNum * heightNum)).toFixed(1) : null;
  const imcCategory = imcVal
    ? parseFloat(imcVal) < 18.5
      ? "Bajo peso"
      : parseFloat(imcVal) < 25
      ? "Normal"
      : parseFloat(imcVal) < 30
      ? "Sobrepeso"
      : "Obesidad"
    : null;

  return (
    <div className="space-y-6 pb-40 sm:pb-48 max-w-3xl mx-auto px-4 pt-4">
      {/* Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200/90 dark:border-slate-800 shadow-sm flex items-start sm:items-center gap-3.5 transition-all">
        <div className="w-10 h-10 rounded-2xl bg-[var(--theme-primary-light)] text-[var(--theme-primary)] flex items-center justify-center shrink-0 shadow-inner">
          <MedicalServicesOutlinedIcon sx={{ fontSize: 22 }} />
        </div>
        <div>
          <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 tracking-tight leading-snug">
            Módulo B: Resumen Clínico General y Serie Fotográfica Clínica (6 Tomas)
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
            Antecedentes patológicos, somatometría, constantes vitales y serie clínica estándar (Frontal, Perfiles, Sonrisa y Oclusales). Alimenta la Hoja 1 oficial UJAT.
          </p>
        </div>
      </div>

      {/* 6-Photo Clinical Dental Series Section */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--theme-primary-text)] dark:text-[var(--theme-accent)] flex items-center gap-2">
            <PhotoCameraOutlinedIcon sx={{ fontSize: 19 }} />
            <span>Serie Fotográfica Clínica Estándar (6 Tomas)</span>
          </h3>
          <span className="text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-[var(--theme-primary-light)] text-[var(--theme-primary-text)] border border-[var(--theme-primary-border)] w-fit">
            {[
              photos.extraoralFrontal,
              photos.extraoralRightProfile,
              photos.extraoralLeftProfile,
              photos.extraoralSmile,
              photos.intraoralUpper,
              photos.intraoralLower,
            ].filter(Boolean).length} / 6 tomas
          </span>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          Serie fotográfica odontológica estándar de valoración estomatológica. Cada recuadro incluye editor táctil estilo WhatsApp (zoom, rotación de 90°, paneo y recorte para eliminar bordes vacíos).
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {/* 1. Frontal en Reposo */}
          <CameraCaptureInput
            label="1. Frontal (Reposo)"
            description="Rostro completo de frente, labios en reposo a la altura de los ojos"
            value={photos.extraoralFrontal}
            onChange={(dataUrl) => updatePhoto("extraoralFrontal", dataUrl)}
            aspectRatioLabel="Facial 4:3"
            watermarkText="FRONTAL"
          />

          {/* 2. Perfil Derecho */}
          <CameraCaptureInput
            label="2. Perfil Derecho"
            description="Perfil estricto a 90°, plano de Frankfort horizontal paralelo al piso"
            value={photos.extraoralRightProfile || null}
            onChange={(dataUrl) => updatePhoto("extraoralRightProfile", dataUrl)}
            aspectRatioLabel="Perfil 4:3"
            watermarkText="PERFIL DERECHO"
          />

          {/* 3. Perfil Izquierdo */}
          <CameraCaptureInput
            label="3. Perfil Izquierdo"
            description="Perfil estricto a 90°, plano de Frankfort horizontal"
            value={photos.extraoralLeftProfile || null}
            onChange={(dataUrl) => updatePhoto("extraoralLeftProfile", dataUrl)}
            aspectRatioLabel="Perfil 4:3"
            watermarkText="PERFIL IZQUIERDO"
          />

          {/* 4. Sonrisa */}
          <CameraCaptureInput
            label="4. Sonrisa Frontal"
            description="Sonrisa amplia y espontánea evaluando línea de sonrisa y corredores"
            value={photos.extraoralSmile || null}
            onChange={(dataUrl) => updatePhoto("extraoralSmile", dataUrl)}
            aspectRatioLabel="Sonrisa 4:3"
            watermarkText="SONRISA"
          />

          {/* 5. Oclusal Superior */}
          <CameraCaptureInput
            label="5. Oclusal Superior"
            description="Arcada maxilar superior completa tomada con espejo oclusal y retractor"
            value={photos.intraoralUpper}
            onChange={(dataUrl) => updatePhoto("intraoralUpper", dataUrl)}
            aspectRatioLabel="Maxilar 4:3"
            watermarkText="OCLUSAL SUPERIOR"
            enableBioethicsAnonymization={false}
          />

          {/* 6. Oclusal Inferior */}
          <CameraCaptureInput
            label="6. Oclusal Inferior"
            description="Arcada mandibular inferior completa separando lengua con espejo"
            value={photos.intraoralLower}
            onChange={(dataUrl) => updatePhoto("intraoralLower", dataUrl)}
            aspectRatioLabel="Mandibular 4:3"
            watermarkText="OCLUSAL INFERIOR"
            enableBioethicsAnonymization={false}
          />
        </div>
      </section>

      {/* Vital Signs Section */}
      {/* Vital Signs Section */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
          <MonitorHeartOutlinedIcon sx={{ fontSize: 20 }} className="text-blue-600" />
          <span>Evaluación Fisiológica y Somatometría</span>
        </h3>

        <div className="space-y-3">
          {/* Tier 1: Hemodinámico */}
          <div className="tier-card rounded-xl bg-blue-50/40 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/50 p-3.5 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-900 dark:text-blue-200 uppercase tracking-wide">
                1. Constantes Hemodinámicas
              </span>
              <span className="text-[10px] text-blue-600 dark:text-blue-400 font-medium">
                Monitor Cardiorrespiratorio
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div className="space-y-1">
                <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                  Presión Arterial
                </label>
                <input
                  type="text"
                  value={medicalHistory.vitalSigns.bloodPressure}
                  onChange={(e) => updateVitalSigns({ bloodPressure: e.target.value })}
                  placeholder="120/80 mmHg"
                  className="w-full min-h-[42px] px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-[var(--theme-primary)] focus:outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                  Frec. Cardíaca
                </label>
                <input
                  type="text"
                  value={medicalHistory.vitalSigns.heartRate}
                  onChange={(e) => updateVitalSigns({ heartRate: e.target.value })}
                  placeholder="72 bpm"
                  className="w-full min-h-[42px] px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-[var(--theme-primary)] focus:outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                  Frec. Respiratoria
                </label>
                <input
                  type="text"
                  value={medicalHistory.vitalSigns.respiratoryRate}
                  onChange={(e) => updateVitalSigns({ respiratoryRate: e.target.value })}
                  placeholder="18 rpm"
                  className="w-full min-h-[42px] px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-[var(--theme-primary)] focus:outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                  Temperatura
                </label>
                <input
                  type="text"
                  value={medicalHistory.vitalSigns.temperature}
                  onChange={(e) => updateVitalSigns({ temperature: e.target.value })}
                  placeholder="36.5 °C"
                  className="w-full min-h-[42px] px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-[var(--theme-primary)] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Tier 2: Antropometría */}
          <div className="tier-card rounded-xl bg-emerald-50/40 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/50 p-3.5 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-900 dark:text-emerald-200 uppercase tracking-wide">
                2. Somatometría y Estado Nutricional
              </span>
              <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-medium">
                Parámetros Físicos
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 items-end">
              <div className="space-y-1">
                <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                  Peso Corporal (kg)
                </label>
                <input
                  type="text"
                  value={medicalHistory.vitalSigns.weight || ""}
                  onChange={(e) => updateVitalSigns({ weight: e.target.value })}
                  placeholder="Ej. 74"
                  className="w-full min-h-[42px] px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-[var(--theme-primary)] focus:outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                  Talla / Estatura (m)
                </label>
                <input
                  type="text"
                  value={medicalHistory.vitalSigns.height || ""}
                  onChange={(e) => updateVitalSigns({ height: e.target.value })}
                  placeholder="Ej. 1.62"
                  className="w-full min-h-[42px] px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-[var(--theme-primary)] focus:outline-none"
                />
              </div>
              <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-emerald-200 dark:border-emerald-800/60 flex items-center justify-between min-h-[42px]">
                <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                  Índice Masa Corporal:
                </span>
                <span className="text-xs font-bold font-mono text-emerald-700 dark:text-emerald-400">
                  {imcVal ? `${imcVal} (${imcCategory})` : "Pendiente"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Anamnesis / Background Section */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
          <HistoryEduOutlinedIcon sx={{ fontSize: 19 }} />
          <span>Antecedentes Médicos y Exploración</span>
        </h3>

        <div className="space-y-4">
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Antecedentes Heredo-Familiares
            </label>
            <textarea
              rows={2}
              value={medicalHistory.hereditaryConditions}
              onChange={(e) => updateMedicalHistory({ hereditaryConditions: e.target.value })}
              placeholder="Diabetes, hipertensión, cardiopatías, neoplasias en familiares directos..."
              className="w-full min-h-[56px] px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-[var(--theme-primary)] focus:outline-none resize-none"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Antecedentes Personales Patológicos
            </label>
            <textarea
              rows={2}
              value={medicalHistory.pathologicalBackground}
              onChange={(e) => updateMedicalHistory({ pathologicalBackground: e.target.value })}
              placeholder="Alergias a fármacos/anestésicos, cirugías, hospitalizaciones, hemorragias..."
              className="w-full min-h-[56px] px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-[var(--theme-primary)] focus:outline-none resize-none"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Antecedentes Personales No Patológicos
            </label>
            <textarea
              rows={2}
              value={medicalHistory.nonPathologicalBackground}
              onChange={(e) => updateMedicalHistory({ nonPathologicalBackground: e.target.value })}
              placeholder="Higiene bucal, frecuencia de cepillado, hábitos (tabaquismo, alcoholismo, bruxismo)..."
              className="w-full min-h-[56px] px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-[var(--theme-primary)] focus:outline-none resize-none"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Examen Estomatológico Regional
            </label>
            <textarea
              rows={3}
              value={medicalHistory.stomatologicalExam}
              onChange={(e) => updateMedicalHistory({ stomatologicalExam: e.target.value })}
              placeholder="Exploración de labios, carrillos, paladar duro/blando, lengua, piso de boca, encías, ATM y cadenas ganglionares..."
              className="w-full min-h-[64px] px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-[var(--theme-primary)] focus:outline-none resize-none"
            />
          </div>
        </div>
      </section>

      {/* Navigation Action Card (Material Design 3 Surface with High Clearance) */}
      <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-slate-200/90 dark:border-slate-800 shadow-sm flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 transition-all">
        <button
          type="button"
          onClick={() => setActiveTab("identification")}
          className="min-h-[48px] px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-300/80 dark:border-slate-700 font-semibold text-sm transition-colors flex items-center justify-center gap-2 touch-manipulation cursor-pointer"
        >
          <ArrowBackOutlinedIcon sx={{ fontSize: 18 }} />
          <span>Ficha de Identificación</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("photos")}
          className="min-h-[48px] px-6 py-2.5 rounded-xl bg-[var(--theme-primary)] hover:bg-[var(--theme-primary-hover)] text-white font-bold text-sm shadow-sm flex items-center justify-center gap-2.5 transition-all active:scale-95 touch-manipulation cursor-pointer"
        >
          <span>Continuar a Fotos Intraorales</span>
          <ArrowForwardOutlinedIcon sx={{ fontSize: 19 }} />
        </button>
      </div>
    </div>
  );
}
