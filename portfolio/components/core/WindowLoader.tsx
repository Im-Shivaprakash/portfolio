"use client";

import { useState, useEffect } from "react";

export default function WindowLoader({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let p = 0;
    const interval = setInterval(() => {
      p += 5;
      setProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setTimeout(() => setLoading(false), 150);
      }
    }, 25);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "12px",
        background: "#E8DCC8",
      }}>
        <div style={{
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          fontSize: "12px",
          fontWeight: 500,
          color: "#5C4813",
        }}>
          Loading...
        </div>
        <div style={{
          width: "160px",
          height: "16px",
          background: "#E8DCC8",
          border: "2px solid #5C4813",
          borderRadius: "3px",
          padding: "2px",
          overflow: "hidden",
        }}>
          <div style={{
            height: "100%",
            width: `${progress}%`,
            background: "repeating-linear-gradient(90deg, #D4534B 0px, #D4534B 6px, #E8DCC8 6px, #E8DCC8 8px)",
            borderRadius: "1px",
            transition: "width 0.025s linear",
          }} />
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
