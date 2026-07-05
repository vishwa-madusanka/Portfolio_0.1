"use client"

import { motion } from "framer-motion"
import { ExternalLink, Calendar, Clock } from "lucide-react"

const blogPosts = [
  {
    id: 1,
    title: "Building Healthcare Microservices with Spring Boot and Kafka",
    excerpt:
      "How I wired an event-driven healthcare platform using Spring Boot microservices, Apache Kafka, and Docker — lessons from MediCare.",
    date: "2024-01-15",
    readTime: "8 min",
    tags: ["Spring Boot", "Kafka", "Docker", "Microservices"],
  },
  {
    id: 2,
    title: "Keycloak as an IAM Layer for Distributed Systems",
    excerpt:
      "Setting up Keycloak for service-to-service auth and user identity management in a multi-service architecture.",
    date: "2024-01-10",
    readTime: "12 min",
    tags: ["Keycloak", "IAM", "Security", "Spring Boot"],
  },
  {
    id: 3,
    title: "PlantUML for Engineering Teams: Diagrams as Code",
    excerpt:
      "Why PlantUML beats every GUI-based diagramming tool for teams that version-control their architecture.",
    date: "2024-01-05",
    readTime: "6 min",
    tags: ["PlantUML", "Architecture", "Documentation"],
  },
]

export default function BlogSection() {
  return (
    <section id="blog" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="font-mono text-sm text-[#7FA8C9] mb-1">// blog</h2>
          <p className="font-display text-3xl font-semibold text-[#E8F1F8]">Writing</p>
          <p className="font-sans text-[#7FA8C9] mt-2">
            Notes on distributed systems, architecture, and backend engineering.
          </p>
        </motion.div>

        <div className="space-y-5 max-w-3xl">
          {blogPosts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
            >
              <div
                className="border border-[#7FA8C9] rounded-sm hover:border-[#FF6B35] transition-colors duration-200 overflow-hidden"
                style={{ backgroundColor: "var(--blueprint-navy)" }}
              >
                {/* Header */}
                <div className="flex items-center gap-4 px-4 py-2.5 border-b border-[#7FA8C9]">
                  <div className="flex items-center gap-1.5 text-[#7FA8C9]">
                    <Calendar className="h-3 w-3" />
                    <span className="font-mono text-[10px]">
                      {new Date(post.date).toLocaleDateString("en-GB", {
                        day: "2-digit", month: "short", year: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[#7FA8C9]">
                    <Clock className="h-3 w-3" />
                    <span className="font-mono text-[10px]">{post.readTime}</span>
                  </div>
                </div>

                {/* Body */}
                <div className="px-5 py-4">
                  <h3 className="font-display text-base font-semibold text-[#E8F1F8] leading-snug mb-2">
                    {post.title}
                  </h3>
                  <p className="font-sans text-sm text-[#7FA8C9] leading-relaxed mb-3">
                    {post.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[10px] text-[#7FA8C9] border border-[#7FA8C9] px-1.5 py-0.5 rounded-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button className="flex items-center gap-1.5 font-mono text-xs text-[#FF6B35] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#FF6B35]">
                    Read more
                    <ExternalLink className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
