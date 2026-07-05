"use client"

import { useState, useEffect } from "react"
import { Github, GitCommit } from "lucide-react"

interface GitHubData {
  commits: number
  stars: number
  repos: number
  lastCommit: string
}

export default function LiveGitHubWidget() {
  const [data, setData] = useState<GitHubData>({
    commits: 1247,
    stars: 89,
    repos: 42,
    lastCommit: "2 hours ago",
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => ({
        ...prev,
        commits: prev.commits + Math.floor(Math.random() * 3),
        lastCommit: Math.random() > 0.5 ? "just now" : "1 hour ago",
      }))
    }, 30000)
    return () => clearInterval(interval)
  }, [])

  const stats = [
    { label: "commits",  value: data.commits },
    { label: "stars",    value: data.stars   },
    { label: "repos",    value: data.repos   },
  ]

  const recentActivity = [
    "feat: updated portfolio design system",
    "fix: optimised Kafka consumer throughput",
    "chore: bump Spring Boot to 3.3",
  ]

  return (
    <div
      className="border border-[#7FA8C9] rounded-sm"
      style={{ backgroundColor: "var(--blueprint-navy)" }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[#7FA8C9]">
        <Github className="h-3.5 w-3.5 text-[#7FA8C9]" />
        <span className="font-mono text-xs text-[#E8F1F8]">github.activity</span>
        <span className="ml-auto font-mono text-[10px] text-[#4ADE80]">● live</span>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 divide-x divide-[#7FA8C9] divide-opacity-25 px-0 py-0">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col items-center py-4 px-3">
            <span className="font-mono text-lg font-medium text-[#E8F1F8]">{s.value}</span>
            <span className="font-mono text-[10px] text-[#7FA8C9]">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Recent activity */}
      <div className="border-t border-[#7FA8C9] px-4 py-3 space-y-2">
        <div className="flex items-center gap-1.5 mb-2">
          <GitCommit className="h-3 w-3 text-[#7FA8C9]" />
          <span className="font-mono text-[10px] text-[#7FA8C9]">recent commits</span>
          <span className="ml-auto font-mono text-[10px] text-[#7FA8C9]">{data.lastCommit}</span>
        </div>
        {recentActivity.map((line, i) => (
          <p key={i} className="font-mono text-[11px] text-[#E8F1F8] opacity-80 leading-tight">
            <span className="text-[#FF6B35]">$</span> git commit -m &quot;{line}&quot;
          </p>
        ))}
      </div>
    </div>
  )
}
