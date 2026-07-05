"use client"

import { motion } from "framer-motion"
import InteractiveTimeline from "@/components/interactive-timeline"
import LiveGitHubWidget from "@/components/widgets/live-github-widget"
import CurrentlyLearningWidget from "@/components/widgets/currently-learning-widget"

export default function AboutSection() {
  return (
    <section id="about" className="py-24 graph-paper-bg relative">
      <div className="container mx-auto px-6">

        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="font-mono text-sm text-[#7FA8C9] mb-1">// about</h2>
          <p className="font-display text-3xl font-semibold text-[#E8F1F8]">Who I Am</p>
        </motion.div>

        {/* Bio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="max-w-3xl mb-16 border-l-2 border-[#FF6B35] pl-5"
        >
          <p className="font-sans text-[#E8F1F8] leading-relaxed">
            I'm Vishwa — a software engineering student from Bandarawela, Sri Lanka.
            I spend most of my time building things with Spring Boot, React, and Docker,
            usually breaking them first and fixing them later.
          </p>
          <p className="font-sans text-[#7FA8C9] leading-relaxed mt-3">
            Outside of code, I'm a Visharad-qualified violinist and I've passed the IBSL
            banking exam — which I find equally useful and equally surprising.
          </p>
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
            <LiveGitHubWidget />
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
