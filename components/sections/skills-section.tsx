"use client"

import { motion } from "framer-motion"

const SKILL_GROUPS = [
  {
    group: "Backend",
    skills: [
      { name: "Java / Spring Boot", weight: "primary"   },
      { name: "Node.js",            weight: "primary"   },
      { name: "Python",             weight: "secondary" },
      { name: "REST API design",    weight: "secondary" },
    ],
  },
  {
    group: "Messaging & Streaming",
    skills: [
      { name: "Apache Kafka",    weight: "primary"   },
      { name: "Event-driven arch", weight: "primary" },
      { name: "WebSocket",       weight: "secondary" },
    ],
  },
  {
    group: "Infrastructure & DevOps",
    skills: [
      { name: "Docker",           weight: "primary"   },
      { name: "Docker Compose",   weight: "primary"   },
      { name: "Keycloak (IAM)",   weight: "primary"   },
      { name: "GitHub Actions",   weight: "secondary" },
      { name: "Nginx",            weight: "secondary" },
      { name: "Kubernetes",       weight: "secondary" },
    ],
  },
  {
    group: "Frontend",
    skills: [
      { name: "React",       weight: "primary"   },
      { name: "Next.js",     weight: "primary"   },
      { name: "TypeScript",  weight: "secondary" },
      { name: "Tailwind CSS",weight: "secondary" },
    ],
  },
  {
    group: "Mobile",
    skills: [
      { name: "Kotlin / Android SDK", weight: "primary"   },
      { name: "Firebase",             weight: "secondary" },
    ],
  },
  {
    group: "Data",
    skills: [
      { name: "PostgreSQL",  weight: "primary"   },
      { name: "MongoDB",     weight: "primary"   },
      { name: "MySQL",       weight: "secondary" },
      { name: "Redis",       weight: "secondary" },
    ],
  },
  {
    group: "Architecture & Tooling",
    skills: [
      { name: "Microservices",  weight: "primary"   },
      { name: "PlantUML",       weight: "primary"   },
      { name: "Git",            weight: "primary"   },
      { name: "OpenAI API",     weight: "secondary" },
      { name: "Inngest",        weight: "secondary" },
      { name: "Cloudinary",     weight: "secondary" },
    ],
  },
]

export default function SkillsSection() {
  return (
    <section id="skills" className="py-24 relative">
      <div className="container mx-auto px-6">

        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="font-mono text-sm text-[#7FA8C9] mb-1">// skills</h2>
          <p className="font-display text-3xl font-semibold text-[#E8F1F8]">Technology Stack</p>
          <p className="font-sans text-[#7FA8C9] mt-2">
            Tools used in production. Larger pills = primary proficiency.
          </p>
        </motion.div>

        {/* Skill groups */}
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
          {SKILL_GROUPS.map((group, gi) => (
            <motion.div
              key={group.group}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: gi * 0.06, duration: 0.5 }}
            >
              {/* Group label */}
              <div className="flex items-center gap-3 mb-3">
                <span className="font-mono text-xs text-[#FF6B35]">
                  {group.group.toLowerCase().replace(/[^a-z0-9]/g, "-")}
                </span>
                <div className="flex-1 h-px bg-[#7FA8C9] opacity-20" />
              </div>

              {/* Pills */}
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill.name}
                    className={`font-mono border border-[#7FA8C9] text-[#E8F1F8] rounded-sm transition-colors ${
                      skill.weight === "primary"
                        ? "text-xs px-2.5 py-1"
                        : "text-[10px] px-2 py-0.5 text-[#7FA8C9]"
                    }`}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
