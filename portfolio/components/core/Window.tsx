"use client";

import { motion } from "framer-motion";
import { useWindows, WindowState } from "../contexts/WindowContext";

interface WindowTheme {
  chrome: string;
  titleBar: string;
  titleBarInactive: string;
  titleText: string;
  contentBg: string;
  borderOuter: string;
  borderInner: string;
}

const defaultTheme: WindowTheme = {
  chrome: "#c0c0c0",
  titleBar: "linear-gradient(90deg, #000080, #1084d0)",
  titleBarInactive: "linear-gradient(90deg, #808080, #c0c0c0)",
  titleText: "#ffffff",
  contentBg: "#ffffff",
  borderOuter: "",
  borderInner: "",
};

const warmTheme: WindowTheme = {
  chrome: "#E8DCC8",
  titleBar: "#D4534B",
  titleBarInactive: "#B0928A",
  titleText: "#ffffff",
  contentBg: "#E8C36A",
  borderOuter: "2px solid #5C4813",
  borderInner: "2px solid #5C4813",
};

interface PanelPosition {
  left: string;
  top: string;
  right: string;
  bottom: string;
}

interface WindowProps {
  windowState: WindowState;
  showMenuBar?: boolean;
  children: React.ReactNode;
  width?: number;
  height?: number;
  offsetX?: number;
  offsetY?: number;
  variant?: "default" | "warm";
  panelPosition?: PanelPosition;
}

export default function Window({
  windowState,
  showMenuBar = false,
  children,
  width = 600,
  height = 400,
  offsetX = 0,
  offsetY = 0,
  variant = "default",
  panelPosition,
}: WindowProps) {
  const { closeWindow, focusWindow, windows } = useWindows();
  const theme = variant === "warm" ? warmTheme : defaultTheme;

  const isTopWindow = windows.reduce(
    (top, w) => (w.zIndex > top.zIndex && !w.minimized ? w : top),
    windows[0]
  )?.id === windowState.id;

  if (windowState.minimized) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.15 }}
      className="absolute"
      style={panelPosition ? {
        zIndex: windowState.zIndex,
        left: panelPosition.left,
        top: panelPosition.top,
        right: panelPosition.right,
        bottom: panelPosition.bottom,
      } : {
        zIndex: windowState.zIndex,
        width: `min(${width}px, calc(100% - 16px))`,
        height: `min(${height}px, calc(100% - 80px))`,
        left: `calc(50% + ${offsetX}px)`,
        top: `calc(50% - 18px + ${offsetY}px)`,
        transform: "translate(-50%, -50%)",
      }}
      onMouseDown={() => focusWindow(windowState.id)}
    >
      <div
        className={variant === "default" ? "win-border-outset" : ""}
        style={{
          background: theme.chrome,
          display: "flex",
          flexDirection: "column",
          height: "100%",
          border: theme.borderOuter || undefined,
          borderRadius: variant === "warm" ? "6px" : undefined,
          overflow: "hidden",
        }}
      >
        {/* Title Bar */}
        <div
          style={{
            background: isTopWindow ? theme.titleBar : theme.titleBarInactive,
            color: theme.titleText,
            padding: variant === "warm" ? "4px 8px" : "2px 3px",
            fontSize: variant === "warm" ? "13px" : "12px",
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            userSelect: "none",
            height: variant === "warm" ? "28px" : "22px",
            borderRadius: variant === "warm" ? "4px 4px 0 0" : undefined,
          }}
        >
          <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {windowState.title}
          </span>
          <div style={{ display: "flex", gap: "2px" }}>
            <button
              onClick={() => closeWindow(windowState.id)}
              aria-label="Close window"
              style={{
                background: variant === "warm" ? "#E8DCC8" : "#c0c0c0",
                border: variant === "warm" ? "2px solid #5C4813" : "2px solid",
                borderColor: variant === "warm" ? "#5C4813" : "#ffffff #808080 #808080 #ffffff",
                width: variant === "warm" ? "18px" : "16px",
                height: variant === "warm" ? "18px" : "14px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                fontSize: variant === "warm" ? "11px" : "9px",
                fontWeight: "bold",
                lineHeight: 1,
                padding: 0,
                borderRadius: variant === "warm" ? "3px" : undefined,
                color: variant === "warm" ? "#5C4813" : undefined,
              }}
            >
              ✕
            </button>
          </div>
        </div>

        {/* Menu Bar */}
        {showMenuBar && variant === "default" && (
          <div className="win-menubar">
            <span className="win-menubar-item"><u>F</u>ile</span>
            <span className="win-menubar-item"><u>E</u>dit</span>
            <span className="win-menubar-item">F<u>o</u>rmat</span>
            <span className="win-menubar-item"><u>V</u>iew</span>
            <span className="win-menubar-item"><u>H</u>elp</span>
          </div>
        )}

        {/* Content Area */}
        <div
          style={{
            flex: 1,
            overflow: "hidden",
            margin: variant === "warm" ? "6px" : "2px",
            background: theme.contentBg,
            border: theme.borderInner || undefined,
            borderRadius: variant === "warm" ? "4px" : undefined,
            ...(variant === "default" ? {
              borderWidth: "2px",
              borderStyle: "solid",
              borderColor: "#808080 #ffffff #ffffff #808080",
            } : {}),
          }}
        >
          {children}
        </div>

        {/* Status Bar */}
        {variant === "default" && (
          <div
            className="win-border-inset mx-0.5 mb-0.5 px-1"
            style={{ fontSize: "11px", height: "18px", lineHeight: "18px" }}
          >
            &nbsp;
          </div>
        )}
      </div>
    </motion.div>
  );
}
