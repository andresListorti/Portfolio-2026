import { ImageResponse } from "next/og";
import { NAME, ROLE } from "./data";

export const alt = `${NAME} — ${ROLE}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "radial-gradient(circle at 20% 0%, #064e3b 0%, #09090b 55%)",
          color: "#f4f4f5",
        }}
      >
        <div
          style={{
            display: "flex",
            width: 88,
            height: 88,
            borderRadius: 20,
            background: "#f4f4f5",
            color: "#09090b",
            fontSize: 30,
            fontWeight: 700,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          AAL
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 700, letterSpacing: -2 }}>{NAME}</div>
          <div style={{ marginTop: 16, fontSize: 34, color: "#34d399" }}>{ROLE}</div>
          <div style={{ marginTop: 28, fontSize: 26, color: "#a1a1aa" }}>
            Next.js · Node · Java/Spring · AI code review · Buenos Aires
          </div>
        </div>
      </div>
    ),
    size,
  );
}
