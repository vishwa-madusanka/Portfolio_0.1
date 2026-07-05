"use client"

import { motion } from "framer-motion"

const CREDENTIALS = [
  {
    id: "java",
    label: "oracle-java-se17-professional",
    title: "Oracle Java SE 17 Developer Professional",
    issuer: "Udemy / Oracle (1Z0-829)",
    status: "CERTIFIED",
  },
  {
    id: "python",
    label: "python-fundamentals",
    title: "Python for Beginners",
    issuer: "University of Moratuwa",
    status: "CERTIFIED",
  },
  {
    id: "banking",
    label: "ibsl-examination",
    title: "IBSL Examination",
    issuer: "Institute of Bankers of Sri Lanka",
    status: "CERTIFIED",
  },
  {
    id: "violin",
    label: "visharad-pt2-violin",
    title: "Visharad Part 2 — Instrumental Violin",
    issuer: "Music Examination Board",
    status: "CERTIFIED",
  },
]

export default function CertificationsSection() {
  return (
    <section id="certifications" className="py-24 graph-paper-bg relative">
      <div className="container mx-auto px-6">

        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="font-mono text-sm text-[#7FA8C9] mb-1">// credentials</h2>
          <p className="font-display text-3xl font-semibold text-[#E8F1F8]">Certifications</p>
          <p className="font-sans text-[#7FA8C9] mt-2">
            A mix of technical certifications and a couple of things that surprised even me.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-5 max-w-4xl">
          {CREDENTIALS.map((cert, i) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
            >
              <div
                className="border border-[#7FA8C9] rounded-sm overflow-hidden hover:border-[#FF6B35] transition-colors duration-200"
                style={{ backgroundColor: "var(--blueprint-navy)" }}
              >
                {/* Header bar */}
                <div
                  className="flex items-center justify-between px-4 py-2.5 border-b border-[#7FA8C9]"
                  style={{ borderLeft: "3px solid var(--steel-blue)" }}
                >
                  <span className="font-mono text-[10px] text-[#7FA8C9] truncate pr-2">
                    {cert.label}
                  </span>
                  <span className="font-mono text-[9px] text-[#4ADE80] border border-[#4ADE80] px-1.5 py-0.5 rounded-sm flex-shrink-0">
                    {cert.status}
                  </span>
                </div>

                {/* Body */}
                <div className="px-5 py-4">
                  <h3 className="font-display text-base font-semibold text-[#E8F1F8] leading-snug">
                    {cert.title}
                  </h3>
                  <p className="font-mono text-xs text-[#7FA8C9] mt-1.5">
                    {cert.issuer}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
