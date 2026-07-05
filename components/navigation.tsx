"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"

const NAV_ITEMS = [
  { label: "about",    href: "#about"          },
  { label: "projects", href: "#projects"       },
  { label: "skills",   href: "#skills"         },
  { label: "credentials", href: "#certifications" },
  { label: "contact",  href: "#contact"        },
]

function smoothScroll(href: string) {
  const el = document.querySelector(href)
  if (el) el.scrollIntoView({ behavior: "smooth" })
}

export default function Navigation() {
  const [isOpen, setIsOpen]   = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-colors duration-300"
      style={{
        backgroundColor: scrolled ? "var(--blueprint-navy)" : "transparent",
        borderBottom: scrolled ? "1px solid rgba(127,168,201,0.25)" : "1px solid transparent",
      }}
      aria-label="Primary navigation"
    >
      <div className="container mx-auto px-6 py-3 flex items-center justify-between">

        {/* Logo + status dot */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => smoothScroll("#home")}
            className="font-mono text-sm text-[#7FA8C9] hover:text-[#E8F1F8] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#FF6B35] focus-visible:outline-offset-3"
          >
            vishwa.dev
          </button>
          {/* Online indicator */}
          <span
            className="w-1.5 h-1.5 rounded-full bg-[#4ADE80] animate-status-pulse"
            aria-label="Online"
            title="Online"
          />
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.label}
              onClick={() => smoothScroll(item.href)}
              className="font-mono text-xs text-[#7FA8C9] hover:text-[#FF6B35] transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#FF6B35] focus-visible:outline-offset-3 rounded-sm"
            >
              {item.label}
            </button>
          ))}
          <a
            href="https://github.com/vishwa-madusanka"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-[#7FA8C9] hover:text-[#FF6B35] transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#FF6B35] focus-visible:outline-offset-3 rounded-sm"
            aria-label="GitHub profile"
          >
            github ↗
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-[#7FA8C9] hover:text-[#E8F1F8] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#FF6B35]"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="md:hidden border-t"
            style={{
              backgroundColor: "var(--blueprint-navy)",
              borderColor: "rgba(127,168,201,0.25)",
            }}
          >
            <div className="container mx-auto px-6 py-4 flex flex-col gap-4">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.label}
                  onClick={() => { smoothScroll(item.href); setIsOpen(false) }}
                  className="font-mono text-sm text-[#7FA8C9] hover:text-[#FF6B35] transition-colors text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#FF6B35] focus-visible:outline-offset-3"
                >
                  {item.label}
                </button>
              ))}
              <a
                href="https://github.com/vishwa-madusanka"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-sm text-[#7FA8C9] hover:text-[#FF6B35] transition-colors"
              >
                github ↗
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
