'use client'

import { useState, useEffect } from 'react'
import { Github, Lock, Send, Trophy } from 'lucide-react'

type Submission = {
  id: string
  team_name: string
  project_name: string
  repo_link: string
  created_at: string
}

export function ProjectsDone() {
  const [isLocked, setIsLocked] = useState(true)
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [loading, setLoading] = useState(true)

  const [teamName, setTeamName] = useState('')
  const [projectName, setProjectName] = useState('')
  const [repoLink, setRepoLink] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      const res = await fetch('/api/projects')
      const json = await res.json()
      if (json.error) return
      setIsLocked(json.is_locked)
      setSubmissions(json.submissions ?? [])
    } catch {
      // silently fail
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
    // Poll every 15s to pick up lock changes
    const id = setInterval(fetchData, 15000)
    return () => clearInterval(id)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'submit',
          team_name: teamName.trim(),
          project_name: projectName.trim(),
          repo_link: repoLink.trim(),
        }),
      })
      const json = await res.json()
      if (!res.ok || json.error) {
        setError(json.error ?? 'Submission failed. Try again.')
      } else {
        setSuccess(true)
        setTeamName('')
        setProjectName('')
        setRepoLink('')
        await fetchData()
      }
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="projects" className="py-24 bg-gradient-to-b from-card/10 to-background">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="space-y-3 mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold">
            Projects Done <span className="text-accent">2026</span>
          </h2>
          <p className="text-foreground/60">Submit your team's project and GitHub repository link</p>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
          </div>
        ) : isLocked ? (
          /* ── Locked state ── */
          <div className="flex flex-col items-center justify-center py-12 gap-4">
            <div className="w-16 h-16 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center">
              <Lock className="w-7 h-7 text-accent" />
            </div>
            <p className="text-lg font-semibold text-foreground/70">Submissions are currently closed</p>
            <p className="text-sm text-foreground/40">The organizers will open submissions when the event begins.</p>
          </div>
        ) : (
          /* ── Open state ── */
          <div className="grid gap-10 lg:grid-cols-2">
            {/* Submit form */}
            <div className="bg-card/40 backdrop-blur-sm border border-border rounded-2xl p-6 space-y-5">
              <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                <Send className="w-5 h-5 text-accent" />
                Submit Your Project
              </h3>

              {success && (
                <div className="bg-green-900/40 border border-green-600 rounded-xl p-3 text-green-300 text-sm font-medium">
                  ✅ Project submitted successfully!
                </div>
              )}
              {error && (
                <div className="bg-red-900/40 border border-red-600 rounded-xl p-3 text-red-300 text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-foreground/50 uppercase tracking-wider mb-2">
                    Team Name
                  </label>
                  <input
                    type="text"
                    value={teamName}
                    onChange={e => { setTeamName(e.target.value); setSuccess(false); setError(null) }}
                    placeholder="e.g. Team Phoenix"
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder-foreground/30 focus:border-accent focus:outline-none transition-colors text-sm"
                    required
                    maxLength={100}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-foreground/50 uppercase tracking-wider mb-2">
                    Project Name
                  </label>
                  <input
                    type="text"
                    value={projectName}
                    onChange={e => { setProjectName(e.target.value); setSuccess(false); setError(null) }}
                    placeholder="e.g. AgriSmart AI"
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder-foreground/30 focus:border-accent focus:outline-none transition-colors text-sm"
                    required
                    maxLength={150}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-foreground/50 uppercase tracking-wider mb-2">
                    Repo Link
                  </label>
                  <input
                    type="url"
                    value={repoLink}
                    onChange={e => { setRepoLink(e.target.value); setSuccess(false); setError(null) }}
                    placeholder="https://github.com/your-team/project"
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder-foreground/30 focus:border-accent focus:outline-none transition-colors text-sm"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 bg-gradient-to-r from-[#D4AF37] to-[#FFD36E] text-black font-bold text-sm rounded-xl hover:opacity-90 disabled:opacity-50 transition-opacity flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <><span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" /> Submitting…</>
                  ) : (
                    <><Send className="w-4 h-4" /> Submit Project</>
                  )}
                </button>
              </form>
            </div>

            {/* Submissions list */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                <Trophy className="w-5 h-5 text-accent" />
                Submitted Projects
                <span className="ml-auto text-xs font-normal text-foreground/40 bg-card border border-border rounded-full px-3 py-1">
                  {submissions.length} team{submissions.length !== 1 ? 's' : ''}
                </span>
              </h3>

              {submissions.length === 0 ? (
                <p className="text-foreground/40 text-sm py-6 text-center">No submissions yet. Be the first!</p>
              ) : (
                <div className="space-y-3 max-h-[480px] overflow-y-auto pr-1">
                  {submissions.map((s, i) => (
                    <div
                      key={s.id}
                      className="bg-card/40 border border-border rounded-xl p-4 flex items-start gap-4 hover:border-accent/50 transition-colors"
                    >
                      <span className="text-accent font-black text-sm tabular-nums w-6 shrink-0 pt-0.5">
                        {String(submissions.length - i).padStart(2, '0')}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-foreground text-sm truncate">{s.project_name}</p>
                        <p className="text-foreground/50 text-xs mt-0.5">{s.team_name}</p>
                      </div>
                      <a
                        href={s.repo_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 text-foreground/40 hover:text-accent transition-colors"
                        title="Open repository"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
