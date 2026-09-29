import { ImageResponse } from "next/og";
import { NAME, content } from "./data";

const ROLE = content.en.hero.role;

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
          background: "radial-gradient(circle at 80% 10%, #123a3a 0%, #070A12 55%)",
          color: "#E7EAF3",
        }}
      >
        <div
          style={{
            display: "flex",
            width: 88,
            height: 88,
            borderRadius: 20,
            background: "#F5B544",
            color: "#070A12",
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
          <div style={{ marginTop: 16, fontSize: 34, color: "#5EEAD4" }}>{ROLE}</div>
          <div style={{ marginTop: 28, fontSize: 26, color: "#8B93A7" }}>
            Next.js · Node · Java/Spring · AI code review · Buenos Aires
          </div>
        </div>
      </div>
    ),
    size,
  );
}
