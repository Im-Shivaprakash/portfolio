"use client";

import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { AnimatePresence } from "framer-motion";
import { useWindows } from "./contexts/WindowContext";
import Window from "./core/Window";
import WindowLoader from "./core/WindowLoader";
import FolderWindow, { FolderFile } from "./core/FolderWindow";
import MdxRenderer from "./content/MdxRenderer";
import { ContentMeta } from "@/lib/content";

interface SerializedEntry {
  meta: ContentMeta;
  slug: string;
  mdx: MDXRemoteSerializeResult;
}

interface WindowRendererProps {
  bio: MDXRemoteSerializeResult;
  contacts: MDXRemoteSerializeResult;
  projects: SerializedEntry[];
  experience: SerializedEntry[];
  blogs: SerializedEntry[];
}

const PANEL_POS = { left: "350px", top: "4%", right: "10%", bottom: "7%" };

const warmPanelStyle = {
  height: "100%",
  overflowY: "auto" as const,
  padding: "24px 28px",
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  fontSize: "14px",
  fontWeight: 400,
  lineHeight: 1.8,
  color: "#5C4813",
};

export default function WindowRenderer({
  bio,
  contacts,
  projects,
  experience,
  blogs,
}: WindowRendererProps) {
  const { windows } = useWindows();

  const projectFiles: FolderFile[] = projects.map((p) => ({
    id: p.slug,
    name: p.meta.fileName ?? `${p.slug}.txt`,
    icon: (p.meta.icon as "document" | "folder" | "notepad") ?? "document",
    content: <MdxRenderer source={p.mdx} />,
  }));

  const experienceFiles: FolderFile[] = experience.map((e) => ({
    id: e.slug,
    name: e.meta.fileName ?? `${e.slug}.txt`,
    icon: (e.meta.icon as "document" | "folder" | "notepad") ?? "notepad",
    content: <MdxRenderer source={e.mdx} />,
  }));

  const blogFiles: FolderFile[] = blogs.map((b) => ({
    id: b.slug,
    name: b.meta.fileName ?? `${b.slug}.txt`,
    icon: (b.meta.icon as "document" | "folder" | "notepad") ?? "document",
    content: <MdxRenderer source={b.mdx} />,
  }));

  const renderContent = (win: (typeof windows)[0]) => {
    switch (win.type) {
      case "bio":
        return (
          <Window windowState={win} variant="warm" panelPosition={PANEL_POS}>
            <WindowLoader>
              <div style={warmPanelStyle}>
                <MdxRenderer source={bio} />
              </div>
            </WindowLoader>
          </Window>
        );
      case "contacts":
        return (
          <Window windowState={win} variant="warm" panelPosition={PANEL_POS}>
            <WindowLoader>
              <div style={warmPanelStyle}>
                <MdxRenderer source={contacts} />
              </div>
            </WindowLoader>
          </Window>
        );
      case "projects":
        return (
          <FolderWindow
            windowState={win}
            folderPath="C:\\Projects\\"
            files={projectFiles}
            panelPosition={PANEL_POS}
          />
        );
      case "experience":
        return (
          <FolderWindow
            windowState={win}
            folderPath="C:\\Experience\\"
            files={experienceFiles}
            panelPosition={PANEL_POS}
          />
        );
      case "blogs":
        return (
          <FolderWindow
            windowState={win}
            folderPath="C:\\Blogs\\"
            files={blogFiles}
            panelPosition={PANEL_POS}
          />
        );
      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      {windows.map((win) => (
        <div key={win.id}>{renderContent(win)}</div>
      ))}
    </AnimatePresence>
  );
}
