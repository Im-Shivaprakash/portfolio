"use client";

import { useState, useCallback } from "react";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { WindowProvider, useWindows } from "@/components/contexts/WindowContext";
import DesktopIcon from "@/components/core/DesktopIcon";
import WindowRenderer from "@/components/WindowRenderer";
import BootSequence from "@/components/BootSequence";
import { ContentMeta } from "@/lib/content";

export interface SerializedEntry {
  meta: ContentMeta;
  slug: string;
  mdx: MDXRemoteSerializeResult;
}

export interface SiteContent {
  bio: MDXRemoteSerializeResult;
  contacts: MDXRemoteSerializeResult;
  projects: SerializedEntry[];
  experience: SerializedEntry[];
  blogs: SerializedEntry[];
}

function Desktop({ content }: { content: SiteContent }) {
  const { openWindow } = useWindows();
  const [booted, setBooted] = useState(false);

  const handleBootComplete = useCallback(() => {
    setBooted(true);
  }, []);

  return (
    <div className="monitor-outer">
      <div className="monitor-body">
        <div className="monitor-bezel">
          <div className="monitor-screen">
            {!booted ? (
              <BootSequence onComplete={handleBootComplete} />
            ) : (
              <div
                className="relative w-full h-full overflow-hidden"
                style={{ background: "#8A7D7D", animation: "fadeIn 0.5s ease-in" }}
              >
                {/* Desktop Icons - 4 rows x 2 columns grid */}
                <div
                  className="absolute top-2 left-8 bottom-4 p-3"
                  style={{
                    display: "grid",
                    gridTemplateRows: "repeat(4, 1fr)",
                    gridTemplateColumns: "auto auto",
                    gap: "4px 20px",
                    alignItems: "center",
                    justifyItems: "center",
                  }}
                >
                  {/* Row 1 */}
                  <DesktopIcon icon="document" label="aboutme!" onDoubleClick={() => openWindow("bio", "readme.txt - Notepad", "bio")} />
                  <DesktopIcon icon="notepad" label="experience" onDoubleClick={() => openWindow("experience", "experience.txt - Notepad", "experience")} />
                  {/* Row 2 */}
                  <DesktopIcon icon="folder" label="projects" onDoubleClick={() => openWindow("projects", "Projects - Exploring", "projects")} />
                  <DesktopIcon icon="globe" label="blogs" onDoubleClick={() => openWindow("blogs", "Blogs - Exploring", "blogs")} />
                  {/* Row 3 */}
                  <DesktopIcon icon="mail" label="contacts" onDoubleClick={() => openWindow("contacts", "contact_info.txt - Notepad", "contacts")} />
                  <div />
                  {/* Row 4 - empty */}
                  <div />
                  <div />
                </div>

                {/* Welcome Panel - permanent */}
                <div
                  className="absolute"
                  style={{
                    left: "350px",
                    top: "4%",
                    right: "10%",
                    bottom: "7%",
                    border: "2px solid #5C4813",
                    borderRadius: "6px",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {/* Title bar */}
                  <div style={{
                    background: "#D4534B",
                    color: "#ffffff",
                    padding: "4px 10px",
                    fontSize: "13px",
                    fontWeight: "bold",
                    borderRadius: "4px 4px 0 0",
                    height: "28px",
                    display: "flex",
                    alignItems: "center",
                  }}>
                    C:\welcome.exe
                  </div>
                  {/* Chrome */}
                  <div style={{
                    background: "#E8DCC8",
                    flex: 1,
                    padding: "6px",
                    display: "flex",
                    flexDirection: "column",
                  }}>
                    {/* Content */}
                    <div style={{
                      background: "#E8C36A",
                      border: "2px solid #5C4813",
                      borderRadius: "4px",
                      flex: 1,
                      padding: "24px 28px",
                      overflowY: "auto",
                      display: "flex",
                      flexDirection: "column",
                      gap: "16px",
                    }}>
                      <div style={{
                        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                        color: "#5C4813",
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                      }}>
                        {/* Header */}
                        <div style={{ marginBottom: "20px" }}>
                          <div style={{
                            fontSize: "26px",
                            fontWeight: 700,
                            lineHeight: 1.3,
                            marginBottom: "6px",
                          }}>
                            Hey! I&apos;m Shivaprakash Srinivasan...
                          </div>
                          <div style={{
                            fontSize: "15px",
                            fontWeight: 500,
                            opacity: 0.75,
                            display: "flex",
                            gap: "8px",
                            alignItems: "center",
                          }}>
                            <span>AI Engineer</span>
                            <span style={{ fontSize: "8px" }}>&#9679;</span>
                            <span>Builder</span>
                            <span style={{ fontSize: "8px" }}>&#9679;</span>
                            <span>Problem Solver</span>
                          </div>
                        </div>

                        {/* Bio */}
                        <div style={{
                          fontSize: "14px",
                          fontWeight: 400,
                          lineHeight: 1.8,
                          marginBottom: "20px",
                        }}>
                          I build intelligent systems that learn, adapt, and
                          make life a little easier. From training neural networks
                          to shipping production ML pipelines — I turn messy data
                          into something useful.
                        </div>

                        {/* Divider */}
                        <div style={{
                          height: "2px",
                          background: "#5C4813",
                          opacity: 0.3,
                          marginBottom: "16px",
                        }} />

                        {/* Navigation guide */}
                        <div style={{ marginBottom: "20px" }}>
                          <div style={{
                            fontSize: "13px",
                            fontWeight: 600,
                            marginBottom: "10px",
                            textTransform: "uppercase",
                            letterSpacing: "1px",
                            opacity: 0.6,
                          }}>
                            Explore My Desktop
                          </div>
                          <div style={{
                            display: "grid",
                            gridTemplateColumns: "auto 1fr",
                            gap: "6px 16px",
                            fontSize: "14px",
                            fontWeight: 500,
                            lineHeight: 1.6,
                          }}>
                            <span style={{ fontWeight: 600 }}>aboutme!</span>
                            <span style={{ opacity: 0.7 }}>Who I am</span>
                            <span style={{ fontWeight: 600 }}>experience</span>
                            <span style={{ opacity: 0.7 }}>Where I&apos;ve been</span>
                            <span style={{ fontWeight: 600 }}>projects</span>
                            <span style={{ opacity: 0.7 }}>What I&apos;ve built</span>
                            <span style={{ fontWeight: 600 }}>blogs</span>
                            <span style={{ opacity: 0.7 }}>What I&apos;m thinking</span>
                            <span style={{ fontWeight: 600 }}>contacts</span>
                            <span style={{ opacity: 0.7 }}>Let&apos;s connect</span>
                          </div>
                        </div>

                        {/* Footer */}
                        <div style={{ marginTop: "auto" }}>
                          <div style={{
                            height: "2px",
                            background: "#5C4813",
                            opacity: 0.3,
                            marginBottom: "10px",
                          }} />
                          <div style={{
                            fontSize: "11px",
                            opacity: 0.5,
                            fontWeight: 400,
                            display: "flex",
                            justifyContent: "space-between",
                          }}>
                            <span><span style={{ color: "#2ecc40", fontSize: "10px" }}>&#9679;</span> Status: Online</span>
                            <span>Double-click a folder to begin</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Windows */}
                <WindowRenderer
                  bio={content.bio}
                  contacts={content.contacts}
                  projects={content.projects}
                  experience={content.experience}
                  blogs={content.blogs}
                />
              </div>
            )}
          </div>
        </div>

        {/* Monitor chin with brand and power LED */}
        <div className="monitor-chin">
          <span className="monitor-brand">Portfolio</span>
          <div className="monitor-power-led" />
        </div>
      </div>
    </div>
  );
}

export default function DesktopClient({ content }: { content: SiteContent }) {
  return (
    <WindowProvider>
      <Desktop content={content} />
    </WindowProvider>
  );
}
