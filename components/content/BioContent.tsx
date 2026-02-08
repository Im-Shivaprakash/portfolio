"use client";

import { bio } from "@/data/bio";

export default function BioContent() {
  return (
    <div style={{
      height: "100%",
      overflowY: "auto",
      padding: "24px 28px",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      fontSize: "14px",
      fontWeight: 400,
      lineHeight: 1.8,
      color: "#5C4813",
      whiteSpace: "pre-wrap",
    }}>
      {bio.content}
    </div>
  );
}
