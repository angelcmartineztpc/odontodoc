"use client";

import React from "react";

interface InstitutionalHeaderProps {
  sheetTitle: string;
}

export function InstitutionalHeader({ sheetTitle }: InstitutionalHeaderProps) {
  return (
    <header className="w-full mb-3">
      {/* Logos and University Entity Information */}
      <div className="flex items-center justify-between gap-3 pb-2 border-b border-black">
        {/* Left: Official UJAT HD Vector Shield */}
        <div className="w-16 h-20 flex-shrink-0 flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logos/ujat-escudo-oficial.png"
            alt="Escudo Oficial UJAT"
            className="max-h-20 max-w-full object-contain"
          />
        </div>

        {/* Center: University Entity & School of Dentistry with Official Caecilia Slab Font */}
        <div className="flex-1 text-center leading-tight">
          <h1 className="font-caecilia text-[13.5px] sm:text-[14.5px] font-bold tracking-wide uppercase text-black">
            UNIVERSIDAD JUÁREZ AUTÓNOMA DE TABASCO
          </h1>
          <h2 className="text-[11px] sm:text-[12px] font-bold uppercase text-black mt-0.5">
            DIVISIÓN ACADÉMICA DE CIENCIAS DE LA SALUD
          </h2>
          <h3 className="text-[10px] sm:text-[11px] font-bold uppercase text-black">
            LICENCIATURA EN CIRUJANO DENTISTA
          </h3>
          <p className="text-[8px] sm:text-[8.5px] text-black font-serif italic tracking-wider mt-0.5">
            “ESTUDIO EN LA DUDA. ACCIÓN EN LA FE”
          </p>
          <p className="text-[7.5px] sm:text-[8px] text-black font-sans mt-0.5">
            Dirección: Av. Gregorio Méndez Magaña No. 2838-A Colonia Tamulté, C.P: 86150, Villahermosa, Tabasco. México.
          </p>
        </div>

        {/* Right: Official DACS Logo */}
        <div className="w-16 h-20 flex-shrink-0 flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logos/dacs-logo.png"
            alt="Escudo Oficial DACS"
            className="max-h-20 max-w-full object-contain"
          />
        </div>
      </div>

      {/* Official Note Title Banner */}
      <div className="text-center mt-2 mb-2">
        <h4 className="font-caecilia text-[11.5px] sm:text-[12.5px] font-extrabold uppercase tracking-wide text-black underline underline-offset-2">
          {sheetTitle}
        </h4>
      </div>
    </header>
  );
}
