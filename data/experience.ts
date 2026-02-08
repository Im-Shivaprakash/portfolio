export interface ExperienceEntry {
  title: string;
  company: string;
  period: string;
  description: string;
}

export const experience: ExperienceEntry[] = [
  {
    title: "Senior Software Developer",
    company: "Tech Company Inc.",
    period: "2022 - Present",
    description:
      "Leading frontend development for the main product.\nBuilding scalable React applications with TypeScript.\nMentoring junior developers and conducting code reviews.",
  },
  {
    title: "Software Developer",
    company: "Startup Co.",
    period: "2020 - 2022",
    description:
      "Developed full-stack web applications using React and Node.js.\nImplemented CI/CD pipelines and automated testing.\nCollaborated with design team on UI/UX improvements.",
  },
  {
    title: "Junior Developer",
    company: "Digital Agency",
    period: "2018 - 2020",
    description:
      "Built responsive websites for various clients.\nWorked with HTML, CSS, JavaScript, and WordPress.\nLearned agile development methodologies.",
  },
  {
    title: "Computer Science Degree",
    company: "University",
    period: "2014 - 2018",
    description:
      "Bachelor of Science in Computer Science.\nFocused on software engineering and web development.\nGraduated with honors.",
  },
];
