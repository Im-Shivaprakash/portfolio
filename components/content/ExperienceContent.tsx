"use client";

import { experience } from "@/data/experience";

export default function ExperienceContent() {
  const text = experience
    .map(
      (entry) =>
        `${entry.title}
${entry.company}
${entry.period}
${"─".repeat(40)}
${entry.description}
`
    )
    .join("\n");

  return (
    <div className="notepad-content h-full">
      {`WORK EXPERIENCE & EDUCATION
${"═".repeat(40)}

${text}`}
    </div>
  );
}
