import type { MDXComponents } from "mdx/types";

export const retroMdxComponents: MDXComponents = {
  h1: (props) => (
    <h1
      style={{
        fontSize: "18px",
        fontWeight: 700,
        marginBottom: "8px",
        borderBottom: "2px solid #5C4813",
        paddingBottom: "6px",
      }}
      {...props}
    />
  ),
  h2: (props) => (
    <h2
      style={{
        fontSize: "16px",
        fontWeight: 600,
        marginTop: "16px",
        marginBottom: "6px",
      }}
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      style={{
        fontSize: "15px",
        fontWeight: 600,
        marginTop: "12px",
        marginBottom: "4px",
      }}
      {...props}
    />
  ),
  p: (props) => (
    <p style={{ marginBottom: "12px" }} {...props} />
  ),
  ul: (props) => (
    <ul style={{ paddingLeft: "20px", marginBottom: "12px" }} {...props} />
  ),
  ol: (props) => (
    <ol style={{ paddingLeft: "20px", marginBottom: "12px" }} {...props} />
  ),
  li: (props) => (
    <li style={{ marginBottom: "4px" }} {...props} />
  ),
  a: (props) => (
    <a
      style={{
        color: "#5C4813",
        fontWeight: 600,
        textDecoration: "underline",
      }}
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  ),
  hr: () => (
    <hr
      style={{
        border: "none",
        borderTop: "1px solid #5C4813",
        opacity: 0.4,
        margin: "12px 0",
      }}
    />
  ),
  strong: (props) => (
    <strong style={{ fontWeight: 700 }} {...props} />
  ),
  em: (props) => (
    <em {...props} />
  ),
  blockquote: (props) => (
    <blockquote
      style={{
        borderLeft: "3px solid #5C4813",
        paddingLeft: "12px",
        marginLeft: "0",
        marginBottom: "12px",
        opacity: 0.8,
      }}
      {...props}
    />
  ),
};
