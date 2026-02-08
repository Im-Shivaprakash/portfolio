"use client";

import { useState, useEffect } from "react";
import { useWindows } from "../contexts/WindowContext";

export default function Taskbar() {
  const { windows, focusWindow, minimizeWindow } = useWindows();
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleTaskbarClick = (id: string, minimized: boolean) => {
    if (minimized) {
      focusWindow(id);
    } else {
      const topWindow = windows.reduce(
        (top, w) => (w.zIndex > top.zIndex && !w.minimized ? w : top),
        windows[0]
      );
      if (topWindow?.id === id) {
        minimizeWindow(id);
      } else {
        focusWindow(id);
      }
    }
  };

  return (
    <div className="taskbar">
      {/* Start Button */}
      <button className="taskbar-btn" style={{ fontWeight: "bold" }}>
        <span style={{ fontSize: "14px" }}>🪟</span>
        Start
      </button>

      {/* Separator */}
      <div
        style={{
          width: "2px",
          height: "24px",
          borderLeft: "1px solid #808080",
          borderRight: "1px solid #ffffff",
        }}
      />

      {/* Window Buttons */}
      {windows.map((win) => {
        const isTop =
          !win.minimized &&
          windows.reduce(
            (top, w) => (w.zIndex > top.zIndex && !w.minimized ? w : top),
            windows[0]
          )?.id === win.id;

        return (
          <button
            key={win.id}
            className={`taskbar-btn ${isTop ? "active" : ""}`}
            onClick={() => handleTaskbarClick(win.id, win.minimized)}
          >
            {win.title.length > 20 ? win.title.slice(0, 20) + "..." : win.title}
          </button>
        );
      })}

      {/* Clock */}
      <div className="taskbar-clock">{time}</div>
    </div>
  );
}
