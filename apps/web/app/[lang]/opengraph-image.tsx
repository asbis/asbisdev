import { ImageResponse } from "next/og";
import { CONTENT, L, type Lang } from "@/lib/content";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateImageMetadata() {
  return [
    { id: "en", size, contentType, alt: "Asbjørn Rørvik — Fullstack Developer" },
    { id: "no", size, contentType, alt: "Asbjørn Rørvik — Fullstack-utvikler" },
  ];
}

export default async function OgImage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const l = (lang === "no" ? "no" : "en") as Lang;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#f5f1ea",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          fontFamily: "serif",
          color: "#1a1814",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            fontSize: 18,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#6b6257",
          }}
        >
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: 5,
              background: "#2a8f4f",
              display: "block",
            }}
          />
          <span>{L(CONTENT.labels.availability, l)}</span>
          <span style={{ opacity: 0.5 }}>·</span>
          <span>{L(CONTENT.role, l)}</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", lineHeight: 0.9 }}>
          <span style={{ fontSize: 170, fontStyle: "italic", letterSpacing: -4 }}>Asbjørn</span>
          <span
            style={{
              fontSize: 170,
              fontStyle: "italic",
              letterSpacing: -4,
              color: "#2b5d4f",
            }}
          >
            Rørvik.
          </span>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 22,
            color: "#6b6257",
          }}
        >
          <span style={{ maxWidth: 720 }}>{L(CONTENT.tagline, l)}</span>
          <span style={{ fontSize: 16, letterSpacing: 3, textTransform: "uppercase" }}>
            asbjornrorvik.com
          </span>
        </div>
      </div>
    ),
    size,
  );
}
