# Contract: In-Memory Canvas Image Compression Pipeline

**Feature Branch**: `001-odontodoc-core`  
**Date**: 2026-09-05  

---

## 1. Interface Signature

```typescript
export interface CompressionOptions {
  maxWidth?: number;     // Default: 1000
  maxHeight?: number;    // Default: 1000
  quality?: number;      // Default: 0.8 (JPEG quality)
  mimeType?: string;     // Default: "image/jpeg"
}

export interface CompressionResult {
  dataUrl: string;       // "data:image/jpeg;base64,..."
  width: number;
  height: number;
  approxSizeBytes: number;
}

export function compressClinicalPhoto(
  file: File | Blob,
  options?: CompressionOptions
): Promise<CompressionResult>;
```

---

## 2. Invariants & Pre-Conditions

1. **Input**: Must be an `image/*` file or blob supplied from `<input type="file" accept="image/*" capture="environment">`.
2. **Dimension Bounding**: If input width or height exceeds `1000px`, the image MUST be scaled down proportionally such that $\max(\text{width}, \text{height}) \le 1000\text{px}$. If both dimensions are $\le 1000\text{px}$, the original dimensions are preserved.
3. **Format**: Output format MUST always be `image/jpeg` with quality factor `0.8` (`canvas.toDataURL('image/jpeg', 0.8)`).
4. **Memory Release (Zero Leakage)**:
   - Any temporary object URL created with `URL.createObjectURL(file)` MUST be revoked via `URL.revokeObjectURL(tempUrl)` inside a `finally` block immediately after image loading or on error.
   - Canvas context must be cleared (`context.clearRect(...)` or canvas dimensions set to 0 upon completion).
