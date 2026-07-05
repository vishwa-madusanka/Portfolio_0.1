"use client"

import { useCallback } from "react"
import { motion } from "framer-motion"
import { Download } from "lucide-react"

/* ─── Service node data ───────────────────────────────────────────────────── */
const SERVICES = [
  { id: "about",    label: "about-service",    port: ":8081", href: "#about",    angle: 225 },
  { id: "projects", label: "projects-service", port: ":8082", href: "#projects", angle: 315 },
  { id: "skills",   label: "skills-service",   port: ":8083", href: "#skills",   angle: 45  },
  { id: "contact",  label: "contact-service",  port: ":8084", href: "#contact",  angle: 135 },
]

/* ─── Geometry constants (SVG viewport: 800 × 500) ─────────────────────────── */
const CX = 400   // centre X
const CY = 250   // centre Y
const ORBIT = 175 // radius to peripheral node centres
const W_C = 220  // central node width
const H_C = 90   // central node height
const W_P = 170  // peripheral node width
const H_P = 72   // peripheral node height

function polarToXY(angleDeg: number, radius: number) {
  const rad = (angleDeg * Math.PI) / 180
  return { x: CX + radius * Math.cos(rad), y: CY + radius * Math.sin(rad) }
}

/* ─── Connector path between central rect edge → peripheral rect edge ──────── */
function connectorPath(angleDeg: number): string {
  const { x, y } = polarToXY(angleDeg, ORBIT)
  // Start from centre rect border, end at peripheral rect border
  const startRadius = Math.max(W_C, H_C) / 2 + 2
  const endRadius   = Math.min(W_P, H_P) / 2 + 4
  const s = polarToXY(angleDeg, startRadius)
  const e = polarToXY(angleDeg, ORBIT - endRadius)
  return `M ${s.x} ${s.y} L ${e.x} ${e.y}`
}

function smoothScroll(href: string) {
  const el = document.querySelector(href)
  if (el) el.scrollIntoView({ behavior: "smooth" })
}

/* ─── Sub-components ─────────────────────────────────────────────────────── */

function StatusDot({ x, y }: { x: number; y: number }) {
  return (
    <>
      {/* Static base dot */}
      <circle cx={x} cy={y} r={4} fill="#4ADE80" />
      {/* Pulsing ring via CSS animation */}
      <circle
        cx={x}
        cy={y}
        r={4}
        fill="#4ADE80"
        className="animate-status-pulse"
        style={{ transformOrigin: `${x}px ${y}px` }}
      />
    </>
  )
}

function PeripheralNode({
  service,
  onActivate,
}: {
  service: (typeof SERVICES)[0]
  onActivate: () => void
}) {
  const { x, y } = polarToXY(service.angle, ORBIT)
  const rx = x - W_P / 2
  const ry = y - H_P / 2

  return (
    <g
      className="cursor-pointer group"
      role="button"
      aria-label={`Navigate to ${service.id} section`}
      tabIndex={0}
      onClick={onActivate}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          onActivate()
        }
      }}
    >
      {/* Hit area (larger invisible rect for easier clicking) */}
      <rect
        x={rx - 10} y={ry - 10}
        width={W_P + 20} height={H_P + 20}
        fill="transparent"
      />
      {/* Node border — steel-blue, turns schematic-orange on hover */}
      <rect
        x={rx} y={ry}
        width={W_P} height={H_P}
        rx={3}
        fill="var(--blueprint-navy)"
        stroke="var(--steel-blue)"
        strokeWidth={1}
        className="transition-all duration-200 group-hover:stroke-[var(--schematic-orange)] group-focus-visible:stroke-[var(--schematic-orange)]"
      />
      {/* Corner accent strip — top edge, lights orange on hover */}
      <rect
        x={rx} y={ry}
        width={4} height={H_P}
        rx={2}
        fill="var(--steel-blue)"
        className="transition-all duration-200 group-hover:fill-[var(--schematic-orange)]"
      />
      {/* Service label */}
      <text
        x={x + 4} y={y - 10}
        textAnchor="middle"
        fontSize={11}
        fontFamily="var(--font-ibm-plex-mono)"
        fill="var(--blueprint-white)"
        className="pointer-events-none select-none"
      >
        {service.label}
      </text>
      {/* Port number */}
      <text
        x={x + 4} y={y + 8}
        textAnchor="middle"
        fontSize={10}
        fontFamily="var(--font-ibm-plex-mono)"
        fill="var(--steel-blue)"
        className="pointer-events-none select-none transition-all duration-200 group-hover:fill-[var(--schematic-orange)]"
      >
        {service.port}
      </text>
      {/* Status dot — top-right of node */}
      <StatusDot x={rx + W_P - 10} y={ry + 10} />
    </g>
  )
}

/* ─── Main component ────────────────────────────────────────────────────────── */
export default function HeroSection() {
  const handleNodeClick = useCallback((href: string) => {
    smoothScroll(href)
  }, [])

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center graph-paper-bg overflow-hidden"
    >
      {/* ── Desktop / tablet diagram ─────────────────────────────────────── */}
      <div className="hidden sm:block w-full max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <svg
            viewBox="0 0 800 500"
            width="100%"
            aria-label="System architecture diagram of Vishwa Wijekoon's portfolio services"
            role="img"
          >
            {/* ── Connector lines ──────────────────────────────────────── */}
            {SERVICES.map((svc) => (
              <path
                key={svc.id + "-line"}
                d={connectorPath(svc.angle)}
                stroke="var(--steel-blue)"
                strokeWidth={1}
                strokeDasharray="6 4"
                fill="none"
                className="animate-dash-flow"
              />
            ))}

            {/* ── Central node ─────────────────────────────────────────── */}
            <rect
              x={CX - W_C / 2}
              y={CY - H_C / 2}
              width={W_C}
              height={H_C}
              rx={4}
              fill="var(--blueprint-navy)"
              stroke="var(--steel-blue)"
              strokeWidth={1.5}
            />
            {/* Online status dot on central node */}
            <StatusDot x={CX + W_C / 2 - 12} y={CY - H_C / 2 + 12} />
            {/* Name */}
            <text
              x={CX}
              y={CY - 10}
              textAnchor="middle"
              fontSize={22}
              fontFamily="var(--font-space-grotesk)"
              fontWeight={600}
              fill="var(--blueprint-white)"
            >
              VISHWA WIJEKOON
            </text>
            {/* Role sub-label */}
            <text
              x={CX}
              y={CY + 14}
              textAnchor="middle"
              fontSize={11}
              fontFamily="var(--font-ibm-plex-mono)"
              fill="var(--steel-blue)"
            >
              vishwa-service · Backend Engineer
            </text>

            {/* ── Peripheral nodes ─────────────────────────────────────── */}
            {SERVICES.map((svc) => (
              <PeripheralNode
                key={svc.id}
                service={svc}
                onActivate={() => handleNodeClick(svc.href)}
              />
            ))}
          </svg>
        </motion.div>

        {/* ── CTA buttons below diagram ──────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-2"
        >
          <button
            onClick={() => smoothScroll("#projects")}
            className="font-mono text-sm px-6 py-2.5 border border-[#FF6B35] text-[#FF6B35] bg-transparent rounded-sm hover:bg-[#FF6B35] hover:text-[#0A2F4E] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#FF6B35] focus-visible:outline-offset-3"
          >
            View projects →
          </button>
          <a
            href="/cv.pdf"
            download="Vishwa_Wijekoon_CV.pdf"
            className="font-mono text-sm px-6 py-2.5 border border-[#7FA8C9] text-[#7FA8C9] bg-transparent rounded-sm inline-flex items-center gap-2 hover:border-[#E8F1F8] hover:text-[#E8F1F8] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#FF6B35] focus-visible:outline-offset-3"
          >
            <Download className="h-3.5 w-3.5" />
            Download CV
          </a>
        </motion.div>
      </div>

      {/* ── Mobile layout — stacked nodes ────────────────────────────────── */}
      <div className="sm:hidden w-full max-w-sm mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center gap-3"
        >
          {/* Central node */}
          <div className="w-full border border-[#7FA8C9] rounded-sm p-4 text-center relative">
            {/* Online dot */}
            <span className="absolute top-3 right-3 inline-flex">
              <span className="w-2 h-2 rounded-full bg-[#4ADE80] animate-status-pulse" />
            </span>
            <p className="font-display text-lg font-semibold text-[#E8F1F8] leading-tight">
              VISHWA WIJEKOON
            </p>
            <p className="font-mono text-[10px] text-[#7FA8C9] mt-1">
              vishwa-service · Backend Engineer
            </p>
          </div>

          {/* Vertical connector line */}
          <div className="w-px h-6 border-l border-dashed border-[#7FA8C9]" />

          {/* Peripheral nodes as 2×2 grid */}
          <div className="grid grid-cols-2 gap-3 w-full">
            {SERVICES.map((svc) => (
              <button
                key={svc.id}
                onClick={() => handleNodeClick(svc.href)}
                className="border border-[#7FA8C9] rounded-sm p-3 text-left relative group hover:border-[#FF6B35] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#FF6B35]"
              >
                <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#4ADE80] animate-status-pulse" />
                <p className="font-mono text-[10px] text-[#E8F1F8] leading-tight break-all">
                  {svc.label}
                </p>
                <p className="font-mono text-[9px] text-[#7FA8C9] mt-1 group-hover:text-[#FF6B35] transition-colors">
                  {svc.port}
                </p>
              </button>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col gap-3 w-full mt-3">
            <button
              onClick={() => smoothScroll("#projects")}
              className="font-mono text-sm px-6 py-2.5 border border-[#FF6B35] text-[#FF6B35] bg-transparent rounded-sm hover:bg-[#FF6B35] hover:text-[#0A2F4E] transition-colors duration-200 w-full"
            >
              View projects →
            </button>
            <a
              href="/cv.pdf"
              download="Vishwa_Wijekoon_CV.pdf"
              className="font-mono text-sm px-6 py-2.5 border border-[#7FA8C9] text-[#7FA8C9] bg-transparent rounded-sm inline-flex items-center justify-center gap-2 hover:border-[#E8F1F8] hover:text-[#E8F1F8] transition-colors duration-200 w-full"
            >
              <Download className="h-3.5 w-3.5" />
              Download CV
            </a>
          </div>
        </motion.div>
      </div>

      {/* ── Scroll indicator ────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        aria-hidden="true"
      >
        <div className="flex flex-col items-center gap-1">
          <span className="font-mono text-[10px] text-[#7FA8C9] tracking-widest">SCROLL</span>
          <div className="w-px h-8 border-l border-dashed border-[#7FA8C9]" />
        </div>
      </motion.div>
    </section>
  )
}
