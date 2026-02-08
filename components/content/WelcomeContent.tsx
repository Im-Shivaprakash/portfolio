"use client";

export default function WelcomeContent() {
  return (
    <div style={{
      height: "100%",
      padding: "16px 20px",
      fontFamily: "'Courier New', Courier, monospace",
      fontSize: "13px",
      color: "#5C4813",
      lineHeight: 1.6,
      whiteSpace: "pre-wrap",
      overflowY: "auto",
      userSelect: "text",
    }}>
      {`C:\\> welcome.exe

========================================
  Welcome to Shiva's Portfolio v2.5
========================================

> Hello, World! I'm Shiva.
> AI Engineer | Builder | Problem Solver

I build intelligent systems that learn,
adapt, and make life a little easier.

From training neural networks to shipping
production ML pipelines — I turn data
into something useful.

========================================

  Double-click the folders on the left
  to explore my work and get in touch.

  aboutme!    → who I am
  experience  → where I've been
  projects    → what I've built
  blogs       → what I'm thinking
  contacts    → let's connect

========================================

> Status: Online and ready to collaborate
> Last updated: 2025

C:\\> _`}
    </div>
  );
}
