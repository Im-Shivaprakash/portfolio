export interface Project {
  id: string;
  name: string;
  fileName: string;
  year: string;
  description: string;
  technologies: string[];
  details: string;
}

export const projects: Project[] = [
  {
    id: "project-1",
    name: "E-Commerce Platform",
    fileName: "ecommerce_platform.txt",
    year: "2023",
    description: "A full-stack e-commerce platform with real-time inventory management.",
    technologies: ["React", "Node.js", "PostgreSQL", "Redis", "Stripe"],
    details: `E-Commerce Platform
====================
Year: 2023

A comprehensive e-commerce solution featuring:

- Product catalog with search and filtering
- Shopping cart and checkout flow
- Real-time inventory tracking
- Payment processing via Stripe
- Admin dashboard for order management
- Responsive design for all devices

Tech Stack: React, Node.js, PostgreSQL, Redis, Stripe

This project handles 1000+ daily transactions and
serves customers across multiple regions.`,
  },
  {
    id: "project-2",
    name: "Task Management App",
    fileName: "task_manager.txt",
    year: "2023",
    description: "A collaborative task management application with real-time updates.",
    technologies: ["Next.js", "TypeScript", "Prisma", "WebSockets"],
    details: `Task Management App
=====================
Year: 2023

A collaborative project management tool featuring:

- Kanban board with drag-and-drop
- Real-time collaboration via WebSockets
- Team workspaces and permissions
- Due dates, labels, and priority levels
- Activity feed and notifications
- Dark mode support

Tech Stack: Next.js, TypeScript, Prisma, WebSockets

Used by 50+ teams for daily project coordination.`,
  },
  {
    id: "project-3",
    name: "Weather Dashboard",
    fileName: "weather_dashboard.txt",
    year: "2022",
    description: "An interactive weather dashboard with forecasts and data visualization.",
    technologies: ["React", "D3.js", "OpenWeather API", "Tailwind CSS"],
    details: `Weather Dashboard
==================
Year: 2022

An interactive weather application featuring:

- Current weather for any city worldwide
- 7-day and hourly forecasts
- Interactive charts and data visualization
- Weather maps with radar overlay
- Saved locations and favorites
- Responsive mobile-first design

Tech Stack: React, D3.js, OpenWeather API, Tailwind CSS

Features beautiful data visualizations built
with D3.js for temperature, humidity, and wind data.`,
  },
  {
    id: "project-4",
    name: "Portfolio Website",
    fileName: "portfolio_win95.txt",
    year: "2025",
    description: "This Windows 95/98 themed portfolio website you're looking at right now!",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    details: `Portfolio Website (Win95 Edition)
==================================
Year: 2025

A retro Windows 95/98 themed portfolio featuring:

- Authentic Windows 95 desktop experience
- Interactive folder icons and windows
- Notepad-style content viewers
- File explorer-style project listing
- Taskbar with window management
- Responsive design for all devices

Tech Stack: Next.js, TypeScript, Tailwind CSS, Framer Motion

You're looking at it right now! Meta, isn't it?`,
  },
];
