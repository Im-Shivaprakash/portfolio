"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useWindows, WindowState } from "../contexts/WindowContext";
import WindowLoader from "./WindowLoader";
import { DocumentIcon, FolderIcon, NotepadIcon } from "./Win95Icon";

export interface FolderFile {
  id: string;
  name: string;
  icon: "document" | "folder" | "notepad";
  content: React.ReactNode;
}

interface FolderWindowProps {
  windowState: WindowState;
  folderPath: string;
  files: FolderFile[];
  panelPosition: { left: string; top: string; right: string; bottom: string };
}

const iconComponents = {
  document: DocumentIcon,
  folder: FolderIcon,
  notepad: NotepadIcon,
};

export default function FolderWindow({
  windowState,
  folderPath,
  files,
  panelPosition,
}: FolderWindowProps) {
  const { closeWindow, focusWindow, windows } = useWindows();
  const [openFileId, setOpenFileId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const isTopWindow = windows.reduce(
    (top, w) => (w.zIndex > top.zIndex && !w.minimized ? w : top),
    windows[0]
  )?.id === windowState.id;

  if (windowState.minimized) return null;

  const openFile = files.find((f) => f.id === openFileId);
  const title = openFile ? `${openFile.name}` : folderPath;
  const isFileView = !!openFile;

  const handleFileOpen = (fileId: string) => {
    setLoading(true);
    setTimeout(() => {
      setOpenFileId(fileId);
      setLoading(false);
    }, 600);
  };

  const handleBack = () => {
    setOpenFileId(null);
    setSelectedId(null);
  };

  // Double-click detection for file icons
  const clickTimers: Record<string, ReturnType<typeof setTimeout> | null> = {};
  const handleFileClick = (fileId: string) => {
    if (clickTimers[fileId]) {
      clearTimeout(clickTimers[fileId]!);
      clickTimers[fileId] = null;
      handleFileOpen(fileId);
    } else {
      setSelectedId(fileId);
      clickTimers[fileId] = setTimeout(() => {
        clickTimers[fileId] = null;
      }, 300);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.15 }}
      className="absolute"
      style={{
        zIndex: windowState.zIndex,
        left: panelPosition.left,
        top: panelPosition.top,
        right: panelPosition.right,
        bottom: panelPosition.bottom,
      }}
      onMouseDown={() => focusWindow(windowState.id)}
    >
      <div style={{
        background: "#E8DCC8",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        border: "2px solid #5C4813",
        borderRadius: "6px",
        overflow: "hidden",
      }}>
        {/* Title Bar */}
        <div style={{
          background: isTopWindow ? "#D4534B" : "#B0928A",
          color: "#ffffff",
          padding: "4px 8px",
          fontSize: "13px",
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          userSelect: "none",
          height: "28px",
          borderRadius: "4px 4px 0 0",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", overflow: "hidden" }}>
            {isFileView && (
              <button
                onClick={handleBack}
                style={{
                  background: "#E8DCC8",
                  border: "2px solid #5C4813",
                  borderRadius: "3px",
                  width: "20px",
                  height: "18px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  fontSize: "12px",
                  fontWeight: "bold",
                  color: "#5C4813",
                  padding: 0,
                  flexShrink: 0,
                }}
                aria-label="Go back"
              >
                ←
              </button>
            )}
            <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {title}
            </span>
          </div>
          <button
            onClick={() => closeWindow(windowState.id)}
            aria-label="Close window"
            style={{
              background: "#E8DCC8",
              border: "2px solid #5C4813",
              width: "18px",
              height: "18px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              fontSize: "11px",
              fontWeight: "bold",
              lineHeight: 1,
              padding: 0,
              borderRadius: "3px",
              color: "#5C4813",
              flexShrink: 0,
            }}
          >
            ✕
          </button>
        </div>

        {/* Address Bar */}
        <div style={{
          background: "#E8DCC8",
          padding: "4px 8px",
          display: "flex",
          alignItems: "center",
          gap: "6px",
          fontSize: "11px",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          color: "#5C4813",
          borderBottom: "1px solid #5C4813",
        }}>
          <span style={{ fontWeight: 600, flexShrink: 0 }}>Address</span>
          <div style={{
            flex: 1,
            background: "#ffffff",
            border: "1px solid #5C4813",
            borderRadius: "3px",
            padding: "2px 6px",
            height: "20px",
            lineHeight: "20px",
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            fontSize: "11px",
          }}>
            {isFileView ? `${folderPath}${openFile?.name}` : folderPath}
          </div>
        </div>

        {/* Content Area */}
        <div style={{
          flex: 1,
          overflow: "hidden",
          margin: "6px",
          background: isFileView ? "#E8C36A" : "#F5EFE0",
          border: "2px solid #5C4813",
          borderRadius: "4px",
        }}>
          {loading ? (
            <WindowLoader>{null}</WindowLoader>
          ) : isFileView ? (
            /* File content view - styled like welcome panel */
            <div style={{
              height: "100%",
              overflowY: "auto",
              padding: "24px 28px",
              fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
              fontSize: "14px",
              fontWeight: 400,
              lineHeight: 1.8,
              color: "#5C4813",
              whiteSpace: "normal",
            }}>
              {openFile?.content}
            </div>
          ) : (
            /* Explorer view - white bg with file icons */
            <div style={{
              padding: "16px 20px",
              display: "flex",
              flexWrap: "wrap",
              gap: "12px",
              alignContent: "flex-start",
              height: "100%",
              overflowY: "auto",
            }}>
              {files.map((file) => {
                const IconComp = iconComponents[file.icon];
                return (
                  <button
                    key={file.id}
                    onClick={() => handleFileClick(file.id)}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "6px",
                      padding: "8px",
                      cursor: "pointer",
                      background: selectedId === file.id ? "#D4534B" : "transparent",
                      border: "none",
                      borderRadius: "4px",
                      width: "90px",
                      textAlign: "center",
                    }}
                  >
                    <IconComp />
                    <span style={{
                      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                      fontSize: "11px",
                      fontWeight: 500,
                      color: selectedId === file.id ? "#ffffff" : "#5C4813",
                      background: selectedId === file.id ? "transparent" : "#F5EFE0",
                      border: selectedId === file.id ? "none" : "1px solid #5C4813",
                      borderRadius: "4px",
                      padding: "1px 4px",
                      wordBreak: "break-word",
                    }}>
                      {file.name}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
