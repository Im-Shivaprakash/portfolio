"use client";

import { projects } from "@/data/projects";

interface ProjectDetailProps {
  projectId: string;
}

export default function ProjectDetail({ projectId }: ProjectDetailProps) {
  const project = projects.find((p) => p.id === projectId);
  if (!project) return <div className="notepad-content h-full">Project not found.</div>;
  return <div className="notepad-content h-full">{project.details}</div>;
}
