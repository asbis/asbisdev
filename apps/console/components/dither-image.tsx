"use client";

import { useEffect, useRef } from "react";

// Stills get the same treatment as the scenes: grayscale, then Bayer 8x8 between two tones.

const BAYER8 = [
  0, 32, 8, 40, 2, 34, 10, 42, 48, 16, 56, 24, 50, 18, 58, 26, 12, 44, 4, 36, 14, 46, 6, 38, 60, 28, 52, 20, 62,
  30, 54, 22, 3, 35, 11, 43, 1, 33, 9, 41, 51, 19, 59, 27, 49, 17, 57, 25, 15, 47, 7, 39, 13, 45, 5, 37, 63, 31,
  55, 23, 61, 29, 53, 21,
].map((v) => (v + 0.5) / 64);

const rgb = (hex: string) => {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};

type Props = {
  src: string;
  alt: string;
  width: number;
  height: number;
  tones: [string, string];
  /** dithered pixels across */
  resolution?: number;
  contrast?: number;
  /** added to luminance before dithering; lifts a busy background toward the light tone */
  brightness?: number;
  /** fade the edges into the light tone, so the image has no hard frame */
  vignette?: boolean;
  /** keep the source's transparency: cut-out pixels stay empty so the page shows through */
  transparent?: boolean;
  className?: string;
};

export function DitherImage({ src, alt, width, height, tones, resolution = 300, contrast = 1.25, brightness = 0, vignette = false, transparent = false, className = "" }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);
  const [dark, light] = tones;

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const img = new Image();
    img.decoding = "async";
    img.src = src;
    let cancelled = false;
    img.onload = () => {
      if (cancelled) return;
      const w = resolution;
      const h = Math.round((resolution * height) / width);
      cv.width = w;
      cv.height = h;
      const ctx = cv.getContext("2d", { willReadFrequently: true });
      if (!ctx) return;
      ctx.drawImage(img, 0, 0, w, h);
      const data = ctx.getImageData(0, 0, w, h);
      const px = data.data;
      const a = rgb(dark);
      const b = rgb(light);
      for (let y = 0, i = 0; y < h; y++) {
        for (let x = 0; x < w; x++, i += 4) {
          let l = (0.299 * px[i] + 0.587 * px[i + 1] + 0.114 * px[i + 2]) / 255;
          l = (l - 0.5) * contrast + 0.5 + brightness;
          if (vignette) {
            const dx = (x / w - 0.5) / 0.5;
            const dy = (y / h - 0.42) / 0.62;
            const d = Math.sqrt(dx * dx + dy * dy);
            const k = Math.min(1, Math.max(0, (d - 0.62) / 0.36));
            l = l + (1 - l) * k * k * (3 - 2 * k);
          }
          l = Math.min(1, Math.max(0, l));
          const on = l > BAYER8[((y & 7) << 3) | (x & 7)];
          const c = on ? b : a;
          px[i] = c[0];
          px[i + 1] = c[1];
          px[i + 2] = c[2];
          px[i + 3] = transparent && px[i + 3] < 128 ? 0 : 255;
        }
      }
      ctx.putImageData(data, 0, 0);
    };
    return () => {
      cancelled = true;
    };
  }, [src, width, height, dark, light, resolution, contrast, brightness, vignette, transparent]);

  return (
    <canvas
      ref={ref}
      role="img"
      aria-label={alt}
      className={`dither-img ${className}`}
      style={{ aspectRatio: `${width} / ${height}`, background: transparent ? undefined : dark }}
    />
  );
}
