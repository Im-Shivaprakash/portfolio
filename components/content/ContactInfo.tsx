"use client";

export default function ContactInfo() {
  return (
    <div style={{
      height: "100%",
      overflowY: "auto",
      padding: "24px 28px",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      fontSize: "14px",
      fontWeight: 400,
      lineHeight: 1.8,
      color: "#5C4813",
      whiteSpace: "pre-wrap",
    }}>
      {`CONTACT INFORMATION
${"═".repeat(35)}

Email:    your.email@example.com
GitHub:   github.com/yourusername
LinkedIn: linkedin.com/in/yourusername
Twitter:  @yourusername

${"─".repeat(35)}

Feel free to reach out! I'm always
open to discussing new projects,
creative ideas, or opportunities.

${"─".repeat(35)}

Location: Your City, Country
Timezone: UTC+0

${"═".repeat(35)}
Thank you for visiting my portfolio!`}
    </div>
  );
}
