/**
 * In-Memory HTMLCanvasElement Image Compression Pipeline
 * Conforms to specs/001-odontodoc-core/contracts/compression-service-contract.md
 * 
 * Ensures that high-resolution photos taken on smartphones (12MP-48MP)
 * are downscaled in memory to <= 1000px and JPEG 0.8 quality before touching state.
 * Releases object URLs immediately to prevent mobile browser Out-Of-Memory (OOM) crashes.
 */

import { processBioethicsClinicalPhoto, BioethicsVisionResult } from "./bioethicsVision";

export interface CompressionOptions {
  maxWidth?: number; // Default: 1000
  maxHeight?: number; // Default: 1000
  quality?: number; // Default: 0.8
  mimeType?: string; // Default: "image/jpeg"
  enableBioethicsAnonymization?: boolean; // Default: true
}

export interface CompressionResult {
  dataUrl: string;
  originalDataUrl?: string;
  width: number;
  height: number;
  approxSizeBytes: number;
  bioethics?: BioethicsVisionResult;
}

export function compressClinicalPhoto(
  file: File | Blob,
  options: CompressionOptions = {}
): Promise<CompressionResult> {
  const maxWidth = options.maxWidth ?? 1000;
  const maxHeight = options.maxHeight ?? 1000;
  const quality = options.quality ?? 0.8;
  const mimeType = options.mimeType ?? "image/jpeg";
  const enableBioethicsAnonymization = options.enableBioethicsAnonymization ?? true;

  return new Promise((resolve, reject) => {
    let objectUrl: string | null = null;

    try {
      objectUrl = URL.createObjectURL(file);
      const img = new Image();

      img.onload = async () => {
        try {
          let { width, height } = img;

          // Maintain aspect ratio while bounding within maxWidth x maxHeight
          if (width > maxWidth || height > maxHeight) {
            const widthRatio = maxWidth / width;
            const heightRatio = maxHeight / height;
            const bestRatio = Math.min(widthRatio, heightRatio);

            width = Math.round(width * bestRatio);
            height = Math.round(height * bestRatio);
          }

          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext("2d");
          if (!ctx) {
            throw new Error("Unable to create 2D canvas rendering context");
          }

          // Draw image scaled
          ctx.drawImage(img, 0, 0, width, height);

          // Capture raw scaled data URL before any modifications
          const originalDataUrl = canvas.toDataURL(mimeType, quality);

          let bioethics: BioethicsVisionResult | undefined = undefined;

          // Run client-side bioethics face detection, background removal and eye censor
          if (enableBioethicsAnonymization) {
            try {
              bioethics = await processBioethicsClinicalPhoto(canvas, {
                applyWhiteBackground: true,
                applyEyeCensor: true,
              });
            } catch (bioErr) {
              console.warn("Bioethics vision processing warning (fallback to original):", bioErr);
            }
          }

          // Export final Data URI (if bioethics modified canvas, it exports the anonymized version)
          const dataUrl = bioethics?.faceDetected
            ? canvas.toDataURL(mimeType, quality)
            : originalDataUrl;

          // Calculate approximate byte size (Base64 is ~4/3 of binary size)
          const approxSizeBytes = Math.round((dataUrl.length * 3) / 4);

          // Clear canvas memory
          ctx.clearRect(0, 0, width, height);
          canvas.width = 0;
          canvas.height = 0;

          resolve({
            dataUrl,
            originalDataUrl: bioethics?.faceDetected ? originalDataUrl : undefined,
            width,
            height,
            approxSizeBytes,
            bioethics,
          });
        } catch (error) {
          reject(error);
        } finally {
          if (objectUrl) {
            URL.revokeObjectURL(objectUrl);
          }
        }
      };

      img.onerror = () => {
        if (objectUrl) {
          URL.revokeObjectURL(objectUrl);
        }
        reject(new Error("Failed to load image file into Image object"));
      };

      img.src = objectUrl;
    } catch (err) {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
      reject(err);
    }
  });
}
