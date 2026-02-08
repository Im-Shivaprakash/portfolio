"use client";

import { useState, useCallback, useRef } from "react";
import { iconMap } from "./Win95Icon";

interface DesktopIconProps {
  icon: string;
  label: string;
  onDoubleClick: () => void;
}

export default function DesktopIcon({ icon, label, onDoubleClick }: DesktopIconProps) {
  const [selected, setSelected] = useState(false);
  const clickTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleClick = useCallback(() => {
    if (clickTimer.current) {
      clearTimeout(clickTimer.current);
      clickTimer.current = null;
      onDoubleClick();
      setSelected(false);
    } else {
      setSelected(true);
      clickTimer.current = setTimeout(() => {
        clickTimer.current = null;
      }, 300);
    }
  }, [onDoubleClick]);

  const handleBlur = () => setSelected(false);

  const IconComponent = iconMap[icon];

  return (
    <button
      className={`desktop-icon ${selected ? "selected" : ""}`}
      onClick={handleClick}
      onBlur={handleBlur}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter") onDoubleClick();
      }}
    >
      <div className="icon-image">
        {IconComponent ? <IconComponent /> : <span style={{ fontSize: "32px" }}>{icon}</span>}
      </div>
      <span
        className="icon-label"
        style={{
          background: selected ? "#000080" : "#ffffff",
          color: selected ? "#ffffff" : "#000000",
          padding: "2px 5px",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          fontSize: "15px",
          fontWeight: 500,
          lineHeight: 1.3,
          borderRadius: "6px",
          textShadow: "none",
          border: "1px solid #000000",
          boxShadow: "2px 2px 0px rgba(0,0,0,0.4)",
        }}
      >
        {label}
      </span>
    </button>
  );
}
