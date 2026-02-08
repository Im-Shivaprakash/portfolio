"use client";

import { useState, useEffect, useRef } from "react";

const BIOS_LINES = [
  "NeuralBIOS (C) 1998 Neural Megatrends Inc.",
  "AI Portfolio System v2.5",
  "",
  "Initializing Neural Cores... 8 Cores OK",
  "Loading VRAM... 48GB GDDR6X OK",
  "Tensor Units... Detected",
  "CUDA Toolkit... v12.4 Ready",
  "GPU Status... NVIDIA RTX OK",
  "Training Data... 1.2TB Indexed",
  "Model Weights... Loaded",
  "",
  "All systems nominal.",
  "Booting NeuralOS 95...",
];

type Phase = "bios" | "starting" | "splash" | "done";

export default function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<Phase>("bios");
  const [displayedText, setDisplayedText] = useState("");
  const [progressWidth, setProgressWidth] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Phase 1: BIOS typewriter
  useEffect(() => {
    if (phase !== "bios") return;

    const fullText = BIOS_LINES.join("\n");
    let charIndex = 0;

    intervalRef.current = setInterval(() => {
      charIndex++;
      setDisplayedText(fullText.slice(0, charIndex));

      if (charIndex >= fullText.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setTimeout(() => setPhase("starting"), 800);
      }
    }, 25);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [phase]);

  // Phase 2: "Starting NeuralOS 95..."
  useEffect(() => {
    if (phase !== "starting") return;
    const timer = setTimeout(() => setPhase("splash"), 2000);
    return () => clearTimeout(timer);
  }, [phase]);

  // Phase 3: Splash with progress bar
  useEffect(() => {
    if (phase !== "splash") return;

    let progress = 0;
    const interval = setInterval(() => {
      progress += 2;
      setProgressWidth(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => setPhase("done"), 500);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [phase]);

  // Phase 4: Done - notify parent
  useEffect(() => {
    if (phase === "done") onComplete();
  }, [phase, onComplete]);

  const skipButton = (
    <button
      onClick={() => setPhase("done")}
      style={{
        position: "absolute",
        bottom: "12px",
        right: "16px",
        fontFamily: "'Courier New', Courier, monospace",
        fontSize: "11px",
        color: "#808080",
        background: "none",
        border: "1px solid #808080",
        borderRadius: "3px",
        padding: "2px 10px",
        cursor: "pointer",
      }}
    >
      Skip &gt;&gt;
    </button>
  );

  // BIOS screen
  if (phase === "bios") {
    return (
      <div style={{
        width: "100%",
        height: "100%",
        background: "#000000",
        padding: "20px",
        fontFamily: "'Courier New', Courier, monospace",
        fontSize: "13px",
        color: "#E8C36A",
        whiteSpace: "pre-wrap",
        lineHeight: 1.6,
        overflow: "hidden",
        position: "relative",
      }}>
        {displayedText}
        <span style={{
          display: "inline-block",
          width: "8px",
          height: "14px",
          background: "#E8C36A",
          marginLeft: "2px",
          animation: "blink 0.5s step-end infinite",
        }} />
        {skipButton}
      </div>
    );
  }

  // "Starting NeuralOS..." screen
  if (phase === "starting") {
    return (
      <div style={{
        width: "100%",
        height: "100%",
        background: "#000000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}>
        <span style={{
          fontFamily: "'Courier New', Courier, monospace",
          fontSize: "16px",
          color: "#FFFFFF",
        }}>
          Starting NeuralOS 95...
        </span>
        {skipButton}
      </div>
    );
  }

  // Splash screen
  if (phase === "splash") {
    return (
      <div style={{
        width: "100%",
        height: "100%",
        background: "#000000",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "40px",
        position: "relative",
      }}>
        {/* NeuralOS branding */}
        <div style={{ textAlign: "center" }}>
          <div style={{
            fontFamily: "Arial, Helvetica, sans-serif",
            fontSize: "12px",
            color: "#808080",
            letterSpacing: "4px",
            textTransform: "uppercase",
            marginBottom: "6px",
          }}>
            AI Engineer Portfolio
          </div>
          <div style={{
            fontFamily: "Arial, Helvetica, sans-serif",
            fontSize: "44px",
            fontWeight: "bold",
            color: "#FFFFFF",
            letterSpacing: "-1px",
          }}>
            Neural
            <span style={{ color: "#D4534B" }}>OS</span>
            <span style={{
              fontSize: "26px",
              fontWeight: "normal",
              verticalAlign: "super",
              marginLeft: "4px",
              color: "#808080",
            }}>
              95
            </span>
          </div>
          {/* Neural network node dots */}
          <div style={{
            display: "flex",
            justifyContent: "center",
            gap: "6px",
            marginTop: "10px",
            alignItems: "center",
          }}>
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#D4534B" }} />
            <div style={{ width: "24px", height: "2px", background: "#D4534B", opacity: 0.5 }} />
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#E8C36A" }} />
            <div style={{ width: "24px", height: "2px", background: "#E8C36A", opacity: 0.5 }} />
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#5BA4E6" }} />
            <div style={{ width: "24px", height: "2px", background: "#5BA4E6", opacity: 0.5 }} />
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#E8DCC8" }} />
          </div>
        </div>

        {/* Progress bar */}
        <div>
          <div style={{
            width: "220px",
            height: "18px",
            background: "#000000",
            border: "2px solid",
            borderColor: "#808080 #FFFFFF #FFFFFF #808080",
            padding: "2px",
          }}>
            <div style={{
              height: "100%",
              width: `${progressWidth}%`,
              background: "repeating-linear-gradient(90deg, #E8C36A 0px, #E8C36A 8px, #000000 8px, #000000 10px)",
              transition: "width 0.05s linear",
            }} />
          </div>
          <div style={{
            fontFamily: "'Courier New', Courier, monospace",
            fontSize: "10px",
            color: "#808080",
            textAlign: "center",
            marginTop: "6px",
          }}>
            Loading neural weights...
          </div>
        </div>
        {skipButton}
      </div>
    );
  }

  return null;
}
