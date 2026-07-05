"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ExternalLink, Github } from "lucide-react"

const PROJECTS = [
  {
    id: 1,
    name: "medicare-platform",
    displayName: "MediCare",
    category: "backend",
    status: "RUNNING",
    description:
      "Event-driven healthcare platform. Spring Boot microservices, Kafka message bus, AI-powered symptom checker, appointment management, and telemedicine — orchestrated via Docker Compose.",
    technologies: ["Spring Boot", "Kafka", "Docker", "PostgreSQL", "React"],
    github: "https://github.com/vishwa-madusanka",
    demo: "#",
  },
  {
    id: 2,
    name: "meet-mind-ai",
    displayName: "Meet Mind AI",
    category: "ai",
    status: "RUNNING",
    description:
      "Real-time communication app with live video and chat built on Next.js and serverless PostgreSQL. OpenAI + Inngest background agents auto-generate PDF meeting reports.",
    technologies: ["Next.js", "PostgreSQL", "Stream SDK", "OpenAI", "Inngest"],
    github: "https://github.com/vishwa-madusanka",
    demo: "#",
  },
  {
    id: 3,
    name: "civic-platform",
    displayName: "Civic Engagement Platform",
    category: "fullstack",
    status: "RUNNING",
    description:
      "Scalable MERN stack web app for civic participation — issue tracking, community marketplace, green initiative management, CI/CD via GitHub Actions, Cloudinary media layer.",
    technologies: ["React", "Node.js", "MongoDB", "GitHub Actions", "Nginx", "Cloudinary"],
    github: "https://github.com/vishwa-madusanka",
    demo: "#",
  },
  {
    id: 4,
    name: "habit360",
    displayName: "Habit360",
    category: "mobile",
    status: "RUNNING",
    description:
      "Native Android lifestyle-tracking app in Kotlin — habit management, mood journaling, home-screen widgets, automated hydration reminders, and secure Firebase authentication.",
    technologies: ["Kotlin", "Android SDK", "Broadcast Receivers", "Firebase"],
    github: "https://github.com/vishwa-madusanka",
    demo: "#",
  },
]

const FILTERS = [
  { value: "all",      label: "all"      },
  { value: "backend",  label: "backend"  },
  { value: "ai",       label: "ai"       },
  { value: "fullstack",label: "fullstack"},
  { value: "mobile",   label: "mobile"   },
]

export default function ProjectsSection() {
  const [filter, setFilter] = useState("all")

  const visible = filter === "all"
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === filter)

  return (
    <section id="projects" className="py-24 graph-paper-bg relative">
      <div className="container mx-auto px-6">

        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="font-mono text-sm text-[#7FA8C9] mb-1">// projects</h2>
          <p className="font-display text-3xl font-semibold text-[#E8F1F8]">Things I've Built</p>
          <p className="font-sans text-[#7FA8C9] mt-2 max-w-2xl">
            A selection of backend-heavy and full-stack projects. All production-wired with CI/CD, containerisation, or both.
          </p>

          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2 mt-6" role="group" aria-label="Filter projects">
            {FILTERS.map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                aria-pressed={filter === f.value}
                className={`font-mono text-xs px-3 py-1.5 border rounded-sm transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#FF6B35] focus-visible:outline-offset-2 ${
                  filter === f.value
                    ? "border-[#FF6B35] text-[#FF6B35] bg-transparent"
                    : "border-[#7FA8C9] text-[#7FA8C9] hover:border-[#E8F1F8] hover:text-[#E8F1F8]"
                }`}
              >
                [{f.label}]
              </button>
            ))}
          </div>
        </motion.div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-2 gap-5">
          {visible.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
            >
              {/* Service manifest card */}
              <div
                className="group h-full flex flex-col border border-[#7FA8C9] hover:border-[#FF6B35] transition-colors duration-200 rounded-sm overflow-hidden"
                style={{ backgroundColor: "var(--blueprint-navy)" }}
              >
                {/* Header bar */}
                <div
                  className="flex items-center justify-between px-4 py-2.5 border-b border-[#7FA8C9] group-hover:border-[#FF6B35] transition-colors"
                  style={{ borderLeft: "3px solid var(--schematic-orange)" }}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80] animate-status-pulse flex-shrink-0" />
                    <span className="font-mono text-xs text-[#E8F1F8]">{project.name}</span>
                  </div>
                  <span className="font-mono text-[10px] text-[#7FA8C9] border border-[#7FA8C9] px-1.5 py-0.5 rounded-sm">
                    {project.category}
                  </span>
                </div>

                {/* Body */}
                <div className="flex-1 px-5 py-4">
                  <h3 className="font-display text-lg font-semibold text-[#E8F1F8] mb-2">
                    {project.displayName}
                  </h3>
                  <p className="font-sans text-sm text-[#7FA8C9] leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Tech stack */}
                <div className="px-5 pb-4 flex flex-wrap gap-1.5">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-[10px] text-[#7FA8C9] border border-[#7FA8C9] px-1.5 py-0.5 rounded-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Footer links */}
                <div className="px-5 pb-4 flex items-center gap-4 border-t border-[#7FA8C9] group-hover:border-[#FF6B35] transition-colors pt-3">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 font-mono text-xs text-[#7FA8C9] hover:text-[#FF6B35] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#FF6B35]"
                    aria-label={`${project.displayName} GitHub repository`}
                  >
                    <Github className="h-3.5 w-3.5" />
                    github
                  </a>
                  {project.demo !== "#" && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 font-mono text-xs text-[#7FA8C9] hover:text-[#FF6B35] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#FF6B35]"
                      aria-label={`${project.displayName} live demo`}
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      live demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
