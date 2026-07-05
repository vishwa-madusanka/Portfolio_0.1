"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const LOG_ENTRIES = [
  {
    id: 1,
    timestamp: "2023 – present",
    title: "BSc (Hons) in Software Engineering",
    institution: "Sri Lanka Institute of Information Technology (SLIIT)",
    location: "Sri Lanka",
    description:
      "Focusing on software architecture, full-stack development, distributed systems, and system engineering.",
    tags: ["Spring Boot", "React", "Docker", "Kafka", "PostgreSQL", "Kubernetes"],
    highlights: [
      "Built AI-enabled healthcare microservices platform (MediCare)",
      "Developed real-time communication app with OpenAI integration (Meet Mind AI)",
      "Led civic engagement platform with full CI/CD pipeline",
    ],
  },
  {
    id: 2,
    timestamp: "2020 – 2022",
    title: "G.C.E. Advanced Level — Physical Science",
    institution: "Bandarawela Central College",
    location: "Bandarawela, Sri Lanka",
    description:
      "Physical Science stream. Strong results in Chemistry, Physics, and Combined Mathematics.",
    tags: ["Chemistry (A)", "Physics (C)", "Combined Maths (S)"],
    highlights: [
      "Grade A in Chemistry",
      "Physical Science stream graduate",
      "Foundation for engineering studies",
    ],
  },
  {
    id: 3,
    timestamp: "2009 – 2019",
    title: "G.C.E. Ordinary Level — English Medium",
    institution: "Bandarawela Central College",
    location: "Bandarawela, Sri Lanka",
    description:
      "Completed O/L in English medium with outstanding results including an 'A' for English Literature.",
    tags: ["English Literature (A)", "5 × A", "3 × B", "1 × C"],
    highlights: [
      "5 A grades including English Literature",
      "English medium throughout",
      "Strong foundation in sciences and humanities",
    ],
  },
]

export default function InteractiveTimeline() {
  const [expanded, setExpanded] = useState<number | null>(null)

  return (
    <div className="relative">
      {/* Vertical backbone line */}
      <div
        className="absolute left-[90px] top-0 bottom-0 w-px"
        style={{ backgroundColor: "rgba(127,168,201,0.25)" }}
        aria-hidden="true"
      />

      <div className="space-y-0">
        {LOG_ENTRIES.map((entry, i) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12, duration: 0.5 }}
            className="relative flex gap-6"
          >
            {/* Timestamp column */}
            <div className="w-[90px] flex-shrink-0 pt-1 text-right pr-5">
              <span className="font-mono text-[10px] text-[#7FA8C9] leading-tight block">
                {entry.timestamp}
              </span>
            </div>

            {/* Node on the line */}
            <div
              className="absolute left-[90px] top-[6px] w-2 h-2 rounded-full border -translate-x-1/2"
              style={{
                backgroundColor: "var(--blueprint-navy)",
                borderColor: "var(--schematic-orange)",
              }}
              aria-hidden="true"
            />

            {/* Entry content */}
            <div className="flex-1 pb-10 pl-2">
              <button
                onClick={() => setExpanded(expanded === entry.id ? null : entry.id)}
                className="text-left w-full group focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#FF6B35] focus-visible:outline-offset-2 rounded-sm"
                aria-expanded={expanded === entry.id}
              >
                <h3 className="font-display text-base font-semibold text-[#E8F1F8] group-hover:text-[#FF6B35] transition-colors leading-snug">
                  {entry.title}
                </h3>
                <p className="font-sans text-sm text-[#7FA8C9] mt-0.5">
                  {entry.institution}
                </p>
              </button>

              {/* Tags always visible */}
              <div className="flex flex-wrap gap-1.5 mt-2">
                {entry.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[10px] text-[#7FA8C9] border border-[#7FA8C9] px-1.5 py-0.5 rounded-sm opacity-70"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Expandable details */}
              <AnimatePresence>
                {expanded === entry.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <p className="font-sans text-sm text-[#7FA8C9] mt-3 leading-relaxed">
                      {entry.description}
                    </p>
                    <ul className="mt-3 space-y-1.5">
                      {entry.highlights.map((h, hi) => (
                        <li key={hi} className="flex items-start gap-2">
                          <span className="font-mono text-[10px] text-[#FF6B35] mt-1 flex-shrink-0">→</span>
                          <span className="font-sans text-sm text-[#E8F1F8]">{h}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
