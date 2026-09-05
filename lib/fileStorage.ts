import { OdontoDocument } from "./types";

/**
 * Validates the basic structural integrity of an imported .odonto JSON payload.
 */
export function validateOdontoDocument(data: unknown): data is OdontoDocument {
  if (typeof data !== "object" || data === null) {
    throw new Error("El archivo no contiene un objeto JSON válido.");
  }

  const doc = data as Partial<OdontoDocument>;

  if (!doc.schemaVersion) {
    throw new Error("El archivo no especifica 'schemaVersion'. Formato incompatible.");
  }

  if (!doc.metadata || typeof doc.metadata !== "object") {
    throw new Error("El archivo carece de la sección requerida 'metadata'.");
  }

  if (!doc.patient || typeof doc.patient !== "object") {
    throw new Error("El archivo carece de la sección requerida 'patient'.");
  }

  if (!doc.student || typeof doc.student !== "object") {
    throw new Error("El archivo carece de la sección requerida 'student'.");
  }

  if (!doc.medicalHistory || typeof doc.medicalHistory !== "object") {
    throw new Error("El archivo carece de la sección requerida 'medicalHistory'.");
  }

  if (!doc.photos || typeof doc.photos !== "object") {
    throw new Error("El archivo carece de la sección requerida 'photos'.");
  }

  if (!doc.diagnosisAndPlan || typeof doc.diagnosisAndPlan !== "object") {
    throw new Error("El archivo carece de la sección requerida 'diagnosisAndPlan'.");
  }

  if (!doc.treatmentLog || !Array.isArray(doc.treatmentLog.entries)) {
    throw new Error("El archivo carece de la lista requerida 'treatmentLog.entries'.");
  }

  return true;
}

/**
 * Exports the entire clinical document to a local .odonto file download.
 */
export function exportOdontoFile(doc: OdontoDocument): void {
  const jsonContent = JSON.stringify(doc, null, 2);
  const blob = new Blob([jsonContent], { type: "application/json;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  const cleanName = (doc.patient.fullName || doc.patient.recordNumber || "clinico")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_-]/g, "_");

  const filename = `expediente-${cleanName}.odonto`;

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}

/**
 * Reads and validates an imported .odonto file from the user's device.
 */
export function readOdontoFile(file: File): Promise<OdontoDocument> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const text = event.target?.result;
        if (typeof text !== "string") {
          throw new Error("No se pudo leer el archivo como texto.");
        }

        const parsed = JSON.parse(text);
        if (validateOdontoDocument(parsed)) {
          resolve(parsed);
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          reject(new Error(`Error al procesar archivo .odonto: ${err.message}`));
        } else {
          reject(new Error("Error desconocido al leer archivo .odonto"));
        }
      }
    };

    reader.onerror = () => {
      reject(new Error("Error de lectura en el explorador de archivos local."));
    };

    reader.readAsText(file, "UTF-8");
  });
}
