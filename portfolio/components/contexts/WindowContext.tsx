"use client";

import React, { createContext, useContext, useReducer, ReactNode } from "react";

export type WindowType =
  | "welcome"
  | "bio"
  | "experience"
  | "projects"
  | "project-detail"
  | "blogs"
  | "contacts";

export interface WindowState {
  id: string;
  title: string;
  type: WindowType;
  zIndex: number;
  minimized: boolean;
  data?: Record<string, unknown>;
}

interface State {
  windows: WindowState[];
  nextZIndex: number;
}

type Action =
  | { type: "OPEN_WINDOW"; payload: { id: string; title: string; windowType: WindowType; data?: Record<string, unknown> } }
  | { type: "CLOSE_WINDOW"; payload: string }
  | { type: "FOCUS_WINDOW"; payload: string }
  | { type: "MINIMIZE_WINDOW"; payload: string };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "OPEN_WINDOW": {
      const existing = state.windows.find((w) => w.id === action.payload.id);
      if (existing) {
        return {
          ...state,
          nextZIndex: state.nextZIndex + 1,
          windows: state.windows.map((w) =>
            w.id === action.payload.id
              ? { ...w, zIndex: state.nextZIndex, minimized: false }
              : w
          ),
        };
      }
      return {
        ...state,
        nextZIndex: state.nextZIndex + 1,
        windows: [
          ...state.windows,
          {
            id: action.payload.id,
            title: action.payload.title,
            type: action.payload.windowType,
            zIndex: state.nextZIndex,
            minimized: false,
            data: action.payload.data,
          },
        ],
      };
    }
    case "CLOSE_WINDOW":
      return {
        ...state,
        windows: state.windows.filter((w) => w.id !== action.payload),
      };
    case "FOCUS_WINDOW":
      return {
        ...state,
        nextZIndex: state.nextZIndex + 1,
        windows: state.windows.map((w) =>
          w.id === action.payload
            ? { ...w, zIndex: state.nextZIndex, minimized: false }
            : w
        ),
      };
    case "MINIMIZE_WINDOW":
      return {
        ...state,
        windows: state.windows.map((w) =>
          w.id === action.payload ? { ...w, minimized: true } : w
        ),
      };
    default:
      return state;
  }
}

interface WindowContextType {
  windows: WindowState[];
  openWindow: (id: string, title: string, type: WindowType, data?: Record<string, unknown>) => void;
  closeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
}

const WindowContext = createContext<WindowContextType | null>(null);

export function WindowProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, {
    windows: [],
    nextZIndex: 10,
  });

  const openWindow = (id: string, title: string, type: WindowType, data?: Record<string, unknown>) => {
    dispatch({ type: "OPEN_WINDOW", payload: { id, title, windowType: type, data } });
  };

  const closeWindow = (id: string) => {
    dispatch({ type: "CLOSE_WINDOW", payload: id });
  };

  const focusWindow = (id: string) => {
    dispatch({ type: "FOCUS_WINDOW", payload: id });
  };

  const minimizeWindow = (id: string) => {
    dispatch({ type: "MINIMIZE_WINDOW", payload: id });
  };

  return (
    <WindowContext.Provider
      value={{ windows: state.windows, openWindow, closeWindow, focusWindow, minimizeWindow }}
    >
      {children}
    </WindowContext.Provider>
  );
}

export function useWindows() {
  const context = useContext(WindowContext);
  if (!context) throw new Error("useWindows must be used within WindowProvider");
  return context;
}
