import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#2b5d4f",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#f5f1ea",
          fontFamily: "serif",
          fontStyle: "italic",
          fontSize: 130,
          fontWeight: 500,
          letterSpacing: -3,
          position: "relative",
        }}
      >
        <span style={{ display: "flex", lineHeight: 1 }}>R</span>
        <span
          style={{
            position: "absolute",
            right: 40,
            bottom: 48,
            width: 8,
            height: 8,
            borderRadius: 4,
            background: "#f5f1ea",
          }}
        />
      </div>
    ),
    size,
  );
}
