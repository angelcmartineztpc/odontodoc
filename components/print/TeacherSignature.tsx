"use client";

import React from "react";

interface TeacherSignatureProps {
  supervisorName?: string;
  isBlank?: boolean;
}

export function TeacherSignature({ supervisorName, isBlank = false }: TeacherSignatureProps) {
  return (
    <footer className="w-full mt-auto pt-6 flex justify-end">
      <div className="w-64 text-center">
        <div className="border-b border-black h-8 mb-1 flex items-end justify-center pb-0.5">
          {!isBlank && supervisorName && (
            <span className="text-[10px] font-medium text-black">
              {supervisorName}
            </span>
          )}
        </div>
        <p className="text-[10px] font-serif text-black">
          Nombre y Firma del profesor
        </p>
      </div>
    </footer>
  );
}
