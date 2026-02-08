"use client";

export default function BlogsContent() {
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
          C:\Blogs\
        </div>
      </div>

      {/* File list */}
      <div className="flex flex-wrap gap-2 p-4">
        <div className="file-item">
          <span style={{ fontSize: "32px", lineHeight: 1 }}>📄</span>
          <span>coming_soon.txt</span>
        </div>
      </div>

      <div
        className="px-4 mt-4"
        style={{ fontFamily: "'Courier New', monospace", fontSize: "12px", color: "#808080" }}
      >
        Blog posts coming soon! Stay tuned...
      </div>
    </div>
  );
}
