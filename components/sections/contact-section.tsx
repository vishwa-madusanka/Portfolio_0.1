"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Send } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const CONTACT_INFO = [
  { icon: Mail,    label: "email",    value: "vishwamadusanka1022@gmail.com" },
  { icon: Phone,   label: "phone",    value: "+94 76 7923 741"               },
  { icon: MapPin,  label: "location", value: "Bandarawela, Sri Lanka"        },
]

const SOCIALS = [
  { label: "github",   href: "https://github.com/vishwa-madusanka" },
  { label: "linkedin", href: "#"                                    },
]

const inputClass =
  "w-full font-mono text-sm text-[#E8F1F8] placeholder:text-[#7FA8C9] bg-transparent border border-[#7FA8C9] rounded-sm px-3 py-2.5 focus:outline-none focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35] transition-colors"

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [sending, setSending] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    await new Promise((r) => setTimeout(r, 900))
    setSending(false)
    toast({
      title: "Message sent",
      description: "I'll get back to you soon.",
    })
    setFormData({ name: "", email: "", message: "" })
  }

  return (
    <section id="contact" className="py-24 relative">
      <div className="container mx-auto px-6">

        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="font-mono text-sm text-[#7FA8C9] mb-1">// contact</h2>
          <p className="font-display text-3xl font-semibold text-[#E8F1F8]">Reach Out</p>
          <p className="font-sans text-[#7FA8C9] mt-2 max-w-2xl">
            Have a project in mind or want to talk distributed systems? I'm usually reachable.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 max-w-5xl">

          {/* ── Contact form ─────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <div
              className="border border-[#7FA8C9] rounded-sm"
              style={{ backgroundColor: "var(--blueprint-navy)" }}
            >
              {/* Panel header */}
              <div className="flex items-center px-4 py-2.5 border-b border-[#7FA8C9]">
                <span className="font-mono text-xs text-[#E8F1F8]">message.send</span>
              </div>

              <form onSubmit={handleSubmit} className="px-5 py-5 space-y-4">
                <div>
                  <label htmlFor="contact-name" className="font-mono text-[10px] text-[#7FA8C9] block mb-1.5">
                    name
                  </label>
                  <input
                    id="contact-name"
                    className={inputClass}
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className="font-mono text-[10px] text-[#7FA8C9] block mb-1.5">
                    email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    className={inputClass}
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="contact-message" className="font-mono text-[10px] text-[#7FA8C9] block mb-1.5">
                    message
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    className={`${inputClass} resize-none`}
                    placeholder="What's on your mind?"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="w-full font-mono text-sm px-4 py-2.5 border border-[#FF6B35] text-[#FF6B35] bg-transparent rounded-sm hover:bg-[#FF6B35] hover:text-[#0A2F4E] transition-colors duration-200 disabled:opacity-50 flex items-center justify-center gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#FF6B35] focus-visible:outline-offset-2"
                >
                  <Send className="h-3.5 w-3.5" />
                  {sending ? "sending..." : "send message"}
                </button>
              </form>
            </div>
          </motion.div>

          {/* ── Contact info + socials ────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="space-y-5"
          >
            {/* Contact info panel */}
            <div
              className="border border-[#7FA8C9] rounded-sm"
              style={{ backgroundColor: "var(--blueprint-navy)" }}
            >
              <div className="flex items-center px-4 py-2.5 border-b border-[#7FA8C9]">
                <span className="font-mono text-xs text-[#E8F1F8]">contact.info</span>
              </div>
              <div className="px-5 py-4 space-y-3">
                {CONTACT_INFO.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center gap-3">
                    <Icon className="h-3.5 w-3.5 text-[#7FA8C9] flex-shrink-0" />
                    <span className="font-mono text-[10px] text-[#7FA8C9] w-14 flex-shrink-0">
                      {label}:
                    </span>
                    <span className="font-sans text-sm text-[#E8F1F8]">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Social links panel */}
            <div
              className="border border-[#7FA8C9] rounded-sm"
              style={{ backgroundColor: "var(--blueprint-navy)" }}
            >
              <div className="flex items-center px-4 py-2.5 border-b border-[#7FA8C9]">
                <span className="font-mono text-xs text-[#E8F1F8]">links.external</span>
              </div>
              <div className="px-5 py-4 flex flex-col gap-2">
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs text-[#7FA8C9] hover:text-[#FF6B35] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#FF6B35] focus-visible:outline-offset-2 flex items-center gap-2 w-fit"
                  >
                    <span className="text-[#FF6B35]">→</span>
                    {s.label} ↗
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Footer ───────────────────────────────────────────────────── */}
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-20 pt-6 border-t flex flex-col md:flex-row items-center justify-between gap-3"
          style={{ borderColor: "rgba(127,168,201,0.25)" }}
        >
          <span className="font-sans text-sm text-[#7FA8C9]">
            © 2025 Vishwa Wijekoon
          </span>
          <span className="font-mono text-xs text-[#7FA8C9] opacity-60">
            // built at SLIIT · Sri Lanka
          </span>
        </motion.footer>
      </div>
    </section>
  )
}
