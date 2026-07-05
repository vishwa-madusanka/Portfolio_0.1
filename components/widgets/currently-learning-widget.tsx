"use client"

import { motion } from "framer-motion"

const LEARNING = [
  { name: "WebAssembly",      progress: 75 },
  { name: "Rust",             progress: 60 },
  { name: "Machine Learning", progress: 45 },
  { name: "Blockchain",       progress: 30 },
]

export default function CurrentlyLearningWidget() {
  return (
    <div
      className="border border-[#7FA8C9] rounded-sm"
      style={{ backgroundColor: "var(--blueprint-navy)" }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[#7FA8C9]">
        <span className="font-mono text-xs text-[#E8F1F8]">learning.progress</span>
        <span className="ml-auto font-mono text-[10px] text-[#FF6B35]">in-progress</span>
      </div>

      {/* Progress items */}
      <div className="px-4 py-4 space-y-4">
        {LEARNING.map((item, i) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-mono text-xs text-[#E8F1F8]">{item.name}</span>
              <span className="font-mono text-[10px] text-[#7FA8C9]">{item.progress}%</span>
            </div>
            {/* Flat progress bar */}
            <div className="h-1 w-full bg-[#7FA8C9] bg-opacity-20 rounded-sm overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${item.progress}%` }}
                transition={{ delay: i * 0.08 + 0.2, duration: 0.7 }}
                className="h-full"
                style={{ backgroundColor: "var(--steel-blue)" }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer note */}
      <div className="border-t border-[#7FA8C9] px-4 py-3">
        <p className="font-mono text-[10px] text-[#7FA8C9]">
          <span className="text-[#FF6B35]">next:</span> distributed tracing with OpenTelemetry
        </p>
      </div>
    </div>
  )
}
