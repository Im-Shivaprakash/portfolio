"use client";

import { useState } from "react";
import { projects } from "@/data/projects";
import { useWindows } from "../contexts/WindowContext";

export default function ProjectsList() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { openWindow } = useWindows();
  const clickTimers = useState<Record<string, ReturnType<typeof setTimeout> | null>>(() => ({}))[0];

  const handleClick = (projectId: string) => {
    if (clickTimers[projectId]) {
      clearTimeout(clickTimers[projectId]!);
      clickTimers[projectId] = null;
      const project = projects.find((p) => p.id === projectId);
      if (project) {
        openWindow(
          `project-${project.id}`,
          `${project.fileName} - Notepad`,
          "project-detail",
          { projectId: project.id }
        );
      }
    } else {
      setSelectedId(projectId);
      clickTimers[projectId] = setTimeout(() => {
        clickTimers[projectId] = null;
      }, 300);
    }
  };

  return (
    <div className="h-full" style={{ background: "#ffffff" }}>
      {/* Address bar */}
      <div
        className="flex items-center gap-1 px-1 py-0.5"
        style={{ background: "#c0c0c0", borderBottom: "1px solid #808080", fontSize: "11px" }}
      >
        <span>Address</span>
        <div
          className="flex-1 px-1 win-border-inset"
          style={{ background: "#ffffff", height: "20px", lineHeight: "20px" }}
        >
          C:\Projects\
        </div>
      </div>

      {/* File list */}
      <div className="flex flex-wrap gap-2 p-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className={`file-item ${selectedId === project.id ? "selected" : ""}`}
            onClick={() => handleClick(project.id)}
          >
            <span style={{ fontSize: "32px", lineHeight: 1 }}>📄</span>
            <span>{project.fileName}</span>
          </div>
        ))}
      </div>

      {/* Status bar info */}
      <div
        className="absolute bottom-0 left-0 right-0 px-2"
        style={{ fontSize: "11px", color: "#808080" }}
      >
        {projects.length} object(s)
      </div>
    </div>
  );
}
