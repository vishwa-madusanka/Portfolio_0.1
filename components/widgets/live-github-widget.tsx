import { Github, GitCommit } from "lucide-react"

/* ─── Types ──────────────────────────────────────────────────────────────── */

interface GitHubUser {
  public_repos: number
  followers: number
}

interface GitHubRepo {
  stargazers_count: number
}

interface GitHubEvent {
  type: string
  created_at: string
  payload: {
    commits?: Array<{ message: string }>
  }
}

interface RecentPush {
  message: string
  ago: string
}

interface GitHubData {
  repos: number
  stars: number
  followers: number
  recentPushes: RecentPush[]
  error: boolean
}

/* ─── Helpers ────────────────────────────────────────────────────────────── */

function timeAgo(dateString: string): string {
  const seconds = Math.floor((Date.now() - new Date(dateString).getTime()) / 1000)
  if (seconds < 60) return "just now"
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 30) return `${days}d ago`
  const months = Math.floor(days / 30)
  return `${months}mo ago`
}

/* ─── Data fetcher (server-side, cached 1 hour) ──────────────────────────── */

async function getGitHubData(): Promise<GitHubData> {
  const EMPTY: GitHubData = { repos: 0, stars: 0, followers: 0, recentPushes: [], error: true }

  try {
    const [userRes, reposRes, eventsRes] = await Promise.all([
      fetch("https://api.github.com/users/vishwa-madusanka", {
        next: { revalidate: 3600 },
        headers: { Accept: "application/vnd.github+json" },
      }),
      fetch("https://api.github.com/users/vishwa-madusanka/repos?per_page=100&sort=updated", {
        next: { revalidate: 3600 },
        headers: { Accept: "application/vnd.github+json" },
      }),
      fetch("https://api.github.com/users/vishwa-madusanka/events/public?per_page=30", {
        next: { revalidate: 3600 },
        headers: { Accept: "application/vnd.github+json" },
      }),
    ])

    // User + repos are the critical calls — bail to error state if either fails
    if (!userRes.ok || !reposRes.ok) return EMPTY

    const user: GitHubUser = await userRes.json()
    const repos: GitHubRepo[] = await reposRes.json()

    // Events are best-effort — silently degrade if rate-limited
    const events: GitHubEvent[] = eventsRes.ok ? await eventsRes.json() : []

    const stars = Array.isArray(repos)
      ? repos.reduce((sum, r) => sum + (r.stargazers_count ?? 0), 0)
      : 0

    const recentPushes: RecentPush[] = Array.isArray(events)
      ? events
          .filter(
            (e) =>
              e.type === "PushEvent" &&
              Array.isArray(e.payload?.commits) &&
              e.payload.commits.length > 0,
          )
          .slice(0, 3)
          .map((e) => ({
            // Take only the first line of the commit message, cap at 72 chars
            message: (e.payload.commits![0].message ?? "")
              .split("\n")[0]
              .slice(0, 72),
            ago: timeAgo(e.created_at),
          }))
      : []

    return {
      repos: user.public_repos ?? 0,
      stars,
      followers: user.followers ?? 0,
      recentPushes,
      error: false,
    }
  } catch {
    // Network failure, parse error, etc. — return empty state, never fake data
    return EMPTY
  }
}

/* ─── Component ──────────────────────────────────────────────────────────── */

export default async function LiveGitHubWidget() {
  const data = await getGitHubData()

  const stats = [
    { label: "repos",     value: data.error ? "—" : String(data.repos)     },
    { label: "stars",     value: data.error ? "—" : String(data.stars)     },
    { label: "followers", value: data.error ? "—" : String(data.followers) },
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
        <span className="ml-auto font-mono text-[10px] text-[#7FA8C9] flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80] flex-shrink-0" />
          updated hourly
        </span>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-3 divide-x divide-[#7FA8C9]/25">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col items-center py-4 px-3">
            <span className="font-mono text-lg font-medium text-[#E8F1F8]">{s.value}</span>
            <span className="font-mono text-[10px] text-[#7FA8C9]">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Recent pushes */}
      <div className="border-t border-[#7FA8C9] px-4 py-3 space-y-2">
        <div className="flex items-center gap-1.5 mb-2">
          <GitCommit className="h-3 w-3 text-[#7FA8C9]" />
          <span className="font-mono text-[10px] text-[#7FA8C9]">recent pushes</span>
          <a
            href="https://github.com/vishwa-madusanka"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto font-mono text-[10px] text-[#7FA8C9] hover:text-[#FF6B35] transition-colors"
            aria-label="View GitHub profile"
          >
            github ↗
          </a>
        </div>

        {data.recentPushes.length > 0 ? (
          data.recentPushes.map((push, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="font-mono text-[10px] text-[#FF6B35] flex-shrink-0 mt-0.5">$</span>
              <p className="font-mono text-[11px] text-[#E8F1F8] leading-snug flex-1 min-w-0">
                <span className="text-[#7FA8C9]">{`git commit -m "`}</span>
                <span className="break-words">{push.message}</span>
                <span className="text-[#7FA8C9]">{`"`}</span>
                <span className="text-[#7FA8C9] ml-1.5">// {push.ago}</span>
              </p>
            </div>
          ))
        ) : (
          <p className="font-mono text-[11px] text-[#7FA8C9] opacity-60">
            {data.error ? "could not reach api.github.com" : "no recent public push events"}
          </p>
        )}
      </div>
    </div>
  )
}
