"use client"

import type { ReactNode } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import InteractiveTimeline from "@/components/interactive-timeline"
import CurrentlyLearningWidget from "@/components/widgets/currently-learning-widget"

interface AboutSectionProps {
  /** Passed from the parent Server Component so the async LiveGitHubWidget
   *  (a Server Component) can be slotted into this Client Component. */
  githubWidget: ReactNode
}

export default function AboutSection({ githubWidget }: AboutSectionProps) {
  return (
    <section id="about" className="py-24 graph-paper-bg relative">
      <div className="container mx-auto px-6">

        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <h2 className="font-mono text-sm text-[#7FA8C9] mb-1">// about</h2>
          <p className="font-display text-3xl font-semibold text-[#E8F1F8]">Who I Am</p>
        </motion.div>

        {/* Photo + bio — two-column on desktop, stacked on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-8 items-start mb-16"
        >
          {/* Profile photo — blueprint framed */}
          <div className="flex-shrink-0 mx-auto sm:mx-0">
            <div className="relative" style={{ width: 200, height: 200 }}>
              <div
                className="overflow-hidden rounded-sm"
                style={{
                  width: 200,
                  height: 200,
                  border: "1px solid #7FA8C9",
                  borderRadius: 4,
                }}
              >
                <Image
                  src="/profile.jpeg"
                  alt="Vishwa Wijekoon"
                  width={200}
                  height={200}
                  className="object-cover object-top w-full h-full"
                  priority
                />
              </div>
              {/* Filename caption — bottom-left overlay */}
              <span
                className="absolute bottom-0 left-0 font-mono text-[10px] leading-none px-1.5 py-1"
                style={{
                  color: "#7FA8C9",
                  backgroundColor: "rgba(10,47,78,0.82)",
                  borderTop: "1px solid #7FA8C9",
                  borderRight: "1px solid #7FA8C9",
                  borderRadius: "0 4px 0 0",
                  letterSpacing: "0.02em",
                }}
              >
                profile.jpg
              </span>
            </div>
          </div>

          {/* Bio text */}
          <div className="flex-1 border-l-2 border-[#FF6B35] pl-5 self-center">
            <p className="font-sans text-[#E8F1F8] leading-relaxed">
              I&apos;m Vishwa — a software engineering student from Bandarawela, Sri Lanka.
              I spend most of my time building things with Spring Boot, React, and Docker,
              usually breaking them first and fixing them later.
            </p>
            <p className="font-sans text-[#7FA8C9] leading-relaxed mt-3">
              Outside of code, I&apos;m a Visharad-qualified violinist and I&apos;ve passed the IBSL
              banking exam — which I find equally useful and equally surprising.
            </p>
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-16"
        >
          <p className="font-mono text-xs text-[#7FA8C9] mb-6">// deployment-log</p>
          <InteractiveTimeline />
        </motion.div>

        {/* Widgets row */}
        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {githubWidget}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <CurrentlyLearningWidget />
          </motion.div>
        </div>

      </div>
    </section>
  )
}
