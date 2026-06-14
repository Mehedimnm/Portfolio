import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "90px",
          backgroundColor: "#0a0a0b",
          backgroundImage:
            "radial-gradient(900px circle at 80% 20%, rgba(245,158,11,0.35), transparent 55%), radial-gradient(800px circle at 10% 90%, rgba(220,38,38,0.3), transparent 55%)",
          color: "#f5f3ee",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            color: "#fbbf24",
            fontSize: 30,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          <div
            style={{
              width: 40,
              height: 6,
              backgroundColor: "#f59e0b",
              borderRadius: 999,
            }}
          />
          {site.role}
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 120,
            fontWeight: 700,
            lineHeight: 1.05,
            marginTop: 24,
          }}
        >
          {site.name}
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 34,
            color: "#a1a1aa",
            marginTop: 28,
            maxWidth: 900,
          }}
        >
          Building fast, scalable web apps with React, Next.js, Node.js, PHP &
          WordPress.
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 30,
            color: "#f59e0b",
            marginTop: 50,
          }}
        >
          www.mehedihasanbd.tech
        </div>
      </div>
    ),
    { ...size }
  );
}
