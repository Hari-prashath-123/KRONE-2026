'use client'

import { useEffect, useRef, useState } from 'react'

// Inline type — no supabase-js dependency on the client
type CountdownState = {
  id: string
  time_remaining: number
  is_running: boolean
  end_time: string | null
  timer_ended: boolean
  updated_at: string
}

const COUNTDOWN_ID = 'krone-2026-countdown'
const ADMIN_USER = 'hari'
const ADMIN_PASS = '@Hulk3029s'

// ─── Login Gate ────────────────────────────────────────────────────
function LoginPage({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      if (username === ADMIN_USER && password === ADMIN_PASS) {
        sessionStorage.setItem('admin_auth', '1')
        onLogin()
      } else {
        setError('Invalid username or password')
        setLoading(false)
      }
    }, 400)
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-[#D4AF37] via-[#FFD36E] to-[#F6E27A] bg-clip-text text-transparent">
            KRONE 2026
          </h1>
          <p className="text-gray-500 text-sm mt-2">Admin Panel</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-zinc-900 rounded-2xl border border-zinc-800 p-8 space-y-5">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Username</label>
            <input
              type="text"
              autoComplete="username"
              value={username}
              onChange={e => { setUsername(e.target.value); setError('') }}
              placeholder="Enter username"
              className="w-full px-4 py-3 bg-black border border-zinc-700 rounded-xl text-white placeholder-gray-600 focus:border-[#D4AF37] focus:outline-none transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Password</label>
            <div className="relative">
              <input
                type={showPass ? 'text' : 'password'}
                autoComplete="current-password"
                value={password}
                onChange={e => { setPassword(e.target.value); setError('') }}
                placeholder="Enter password"
                className="w-full px-4 py-3 bg-black border border-zinc-700 rounded-xl text-white placeholder-gray-600 focus:border-[#D4AF37] focus:outline-none transition-colors pr-12"
                required
              />
              <button
                type="button"
                onClick={() => setShowPass(p => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 text-sm"
                tabIndex={-1}
              >
                {showPass ? '🙈' : '👁'}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-[#D4AF37] to-[#FFD36E] text-black font-bold text-base rounded-xl hover:opacity-90 disabled:opacity-50 transition-opacity"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  )
}

// ─── Admin Panel ────────────────────────────────────────────────────
export default function AdminPage() {
  const [authed, setAuthed] = useState(false)
  const [checking, setChecking] = useState(true)
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(5)
  const [seconds, setSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [remaining, setRemaining] = useState(0)
  const [dbStatus, setDbStatus] = useState<string>('...')
  const [error, setError] = useState<string | null>(null)
  const [log, setLog] = useState<string[]>([])
  const [rowExists, setRowExists] = useState(false)
  // Network connectivity state
  const [connectionLost, setConnectionLost] = useState(false)

  // Offset (ms) between server clock and local clock — corrects skew
  const timeOffsetRef = useRef<number>(0)

  const syncClock = async () => {
    try {
      const res = await fetch('/', { method: 'HEAD', cache: 'no-store' })
      const serverDate = res.headers.get('Date')
      if (serverDate) {
        const serverTime = new Date(serverDate).getTime()
        timeOffsetRef.current = serverTime - Date.now()
      }
    } catch {
      // fall back to zero offset on error
    }
  }

  // Check if already logged in
  useEffect(() => {
    if (sessionStorage.getItem('admin_auth') === '1') setAuthed(true)
    setChecking(false)
  }, [])

  const handleLogout = () => {
    sessionStorage.removeItem('admin_auth')
    setAuthed(false)
  }

  // suppressBanner: pass true for network errors so the red error banner
  // does NOT override the running-timer state in the UI
  const addLog = (msg: string, isErr = false, suppressBanner = false) => {
    const line = `[${new Date().toLocaleTimeString()}] ${isErr ? '❌ ' : '✅ '}${msg}`
    setLog(prev => [line, ...prev].slice(0, 100))
    if (isErr && !suppressBanner) setError(msg)
  }

  const clearError = () => setError(null)

  // Returns true for network / timeout error messages
  const isNetworkError = (msg: string): boolean =>
    /failed to fetch|networkerror|network request failed|err_connection|timed.?out|etimedout/i.test(msg)

  const fmt = (s: number) => {
    const h = Math.floor(s / 3600)
    const m = Math.floor((s % 3600) / 60)
    const sec = s % 60
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
  }

  // ─── Fetch current DB state ───────────────────────────────────────
  const fetchState = async () => {
    setDbStatus('Fetching...')
    try {
      const res = await fetch('/api/timer')
      const json = await res.json()

      if (!res.ok || json.error) {
        const msg = json.error ?? `HTTP ${res.status}`
        if (isNetworkError(msg)) {
          addLog(`Network error: ${msg}`, true, true)
          setConnectionLost(true)
          setDbStatus('Connection lost. Reconnecting...')
        } else {
          addLog(`fetchState error: ${msg}`, true)
          setDbStatus(`Error: ${msg}`)
        }
        return
      }

      setConnectionLost(false)
      const data: CountdownState = json

      setRowExists(true)
      setIsRunning(data.is_running)

      if (data.is_running && data.end_time) {
        const endTime = new Date(data.end_time).getTime()
        const rem = Math.max(0, Math.floor((endTime - (Date.now() + timeOffsetRef.current)) / 1000))
        setRemaining(rem)
        setDbStatus(`RUNNING — ${fmt(rem)} remaining | end_time: ${data.end_time}`)
      } else {
        setRemaining(data.time_remaining)
        setDbStatus(`STOPPED — time_remaining: ${data.time_remaining}s | end_time: ${data.end_time ?? 'null'}`)
      }
      addLog(`Fetched: is_running=${data.is_running}, end_time=${data.end_time ?? 'null'}`)
    } catch (err: any) {
      const msg = err?.message ?? String(err)
      addLog(`Network error: ${msg}`, true, true)
      setConnectionLost(true)
      setDbStatus('Connection lost. Reconnecting...')
    }
  }

  // ─── Create initial row ───────────────────────────────────────────
  const handleCreateRow = async () => {
    addLog('Creating initial DB row...')
    try {
      const res = await fetch('/api/timer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          time_remaining: 86400,
          is_running: false,
          end_time: null,
          timer_ended: false,
          updated_at: new Date().toISOString(),
        }),
      })
      const json = await res.json()
      if (!res.ok || json.error) {
        const msg = json.error ?? `HTTP ${res.status}`
        isNetworkError(msg)
          ? (addLog(`Network error: ${msg}`, true, true), setConnectionLost(true))
          : addLog(`CREATE error: ${msg}`, true)
      } else {
        setConnectionLost(false)
        addLog('Row created')
        await fetchState()
      }
    } catch (err: any) {
      const msg = err?.message ?? String(err)
      addLog(`Network error: ${msg}`, true, true)
      setConnectionLost(true)
    }
  }

  // ─── Start ────────────────────────────────────────────────────────
  const handleStart = async () => {
    clearError()
    const totalSeconds = hours * 3600 + minutes * 60 + seconds
    if (totalSeconds <= 0) {
      addLog('Set a valid time (> 0)', true)
      return
    }

    const endTime = new Date(Date.now() + timeOffsetRef.current + totalSeconds * 1000).toISOString()
    addLog(`Writing to DB: is_running=true, end_time=${endTime}`)

    try {
      const res = await fetch('/api/timer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          time_remaining: totalSeconds,
          is_running: true,
          end_time: endTime,
          timer_ended: false,
          updated_at: new Date().toISOString(),
        }),
      })
      const json = await res.json()
      if (!res.ok || json.error) {
        const msg = json.error ?? `HTTP ${res.status}`
        isNetworkError(msg)
          ? (addLog(`Network error: ${msg}`, true, true), setConnectionLost(true))
          : addLog(`START error: ${msg}`, true)
        return
      }
      setConnectionLost(false)
      addLog(`START success — DB row updated: ${JSON.stringify(json)}`)
      setIsRunning(true)
      setRemaining(totalSeconds)
      setDbStatus(`RUNNING — ${fmt(totalSeconds)} remaining`)
    } catch (err: any) {
      const msg = err?.message ?? String(err)
      addLog(`Network error: ${msg}`, true, true)
      setConnectionLost(true)
    }
  }

  // ─── Stop ─────────────────────────────────────────────────────────
  const handleStop = async () => {
    clearError()
    addLog('Writing to DB: is_running=false')

    try {
      const res = await fetch('/api/timer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          is_running: false,
          end_time: null,
          time_remaining: remaining,
          updated_at: new Date().toISOString(),
        }),
      })
      const json = await res.json()
      if (!res.ok || json.error) {
        const msg = json.error ?? `HTTP ${res.status}`
        isNetworkError(msg)
          ? (addLog(`Network error: ${msg}`, true, true), setConnectionLost(true))
          : addLog(`STOP error: ${msg}`, true)
        return
      }
      setConnectionLost(false)
      addLog('STOP success')
      setIsRunning(false)
      setDbStatus(`STOPPED — ${fmt(remaining)} remaining`)
    } catch (err: any) {
      const msg = err?.message ?? String(err)
      addLog(`Network error: ${msg}`, true, true)
      setConnectionLost(true)
    }
  }

  // ─── Reset ────────────────────────────────────────────────────────
  const handleReset = async () => {
    clearError()
    const totalSeconds = hours * 3600 + minutes * 60 + seconds

    try {
      const res = await fetch('/api/timer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          time_remaining: totalSeconds,
          is_running: false,
          end_time: null,
          timer_ended: false,
          updated_at: new Date().toISOString(),
        }),
      })
      const json = await res.json()
      if (!res.ok || json.error) {
        const msg = json.error ?? `HTTP ${res.status}`
        isNetworkError(msg)
          ? (addLog(`Network error: ${msg}`, true, true), setConnectionLost(true))
          : addLog(`RESET error: ${msg}`, true)
        return
      }
      setConnectionLost(false)
      addLog(`RESET success — set to ${fmt(totalSeconds)}`)
      setIsRunning(false)
      setRemaining(totalSeconds)
      setDbStatus(`STOPPED — ${fmt(totalSeconds)} set`)
    } catch (err: any) {
      const msg = err?.message ?? String(err)
      addLog(`Network error: ${msg}`, true, true)
      setConnectionLost(true)
    }
  }

  useEffect(() => {
    const init = async () => {
      // Sync client clock with server before the first fetch
      await syncClock()
      // Fetch initial state
      await fetchState()
    }
    init()

    // Poll every 5 s so the admin status panel stays in sync
    const pollInterval = setInterval(fetchState, 5000)

    return () => {
      clearInterval(pollInterval)
    }
  }, [])

  // Poll remaining when running
  useEffect(() => {
    if (!isRunning) return
    const id = setInterval(() => {
      setRemaining(prev => {
        const next = Math.max(0, prev - 1)
        if (next === 0) setIsRunning(false)
        return next
      })
    }, 1000)
    return () => clearInterval(id)
  }, [isRunning])

  // Auth gate
  if (checking) return <div className="min-h-screen bg-black flex items-center justify-center"><p className="text-gray-500">Loading...</p></div>
  if (!authed) return <LoginPage onLogin={() => setAuthed(true)} />

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-2xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-[#D4AF37] via-[#FFD36E] to-[#F6E27A] bg-clip-text text-transparent">
              KRONE 2026 — Admin
            </h1>
            <p className="text-gray-500 text-sm mt-1">Only this page controls the timer. All devices view live.</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-gray-400 hover:text-white rounded-lg transition-colors mt-1"
          >
            Logout
          </button>
        </div>

        {/* Connection lost banner */}
        {connectionLost && (
          <div className="bg-amber-950 border border-amber-600 rounded-xl p-3 flex items-center gap-3">
            <span className="text-amber-400 text-base animate-spin inline-block">↻</span>
            <p className="text-amber-300 text-sm font-medium">Connection lost. Reconnecting...</p>
          </div>
        )}

        {/* Error banner */}
        {error && (
          <div className="bg-red-900 border border-red-500 rounded-xl p-4 flex justify-between items-start">
            <div>
              <p className="font-bold text-red-300">Error</p>
              <p className="text-sm text-red-200 mt-1">{error}</p>
            </div>
            <button onClick={clearError} className="text-red-400 hover:text-white text-xl leading-none ml-4">✕</button>
          </div>
        )}

        {/* DB Status */}
        <div className="bg-zinc-900 rounded-xl p-5 border border-zinc-700">
          <div className="flex justify-between items-center mb-3">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Database Status</p>
            <button onClick={fetchState} className="text-xs px-3 py-1 bg-zinc-700 rounded-lg hover:bg-zinc-600">↻ Refresh</button>
          </div>
          <p className="font-mono text-sm text-yellow-300 break-all">{dbStatus}</p>
          {isRunning && (
            <p className="text-5xl font-black mt-3 bg-gradient-to-r from-[#D4AF37] via-[#FFD36E] to-[#F6E27A] bg-clip-text text-transparent tabular-nums">
              {fmt(remaining)}
            </p>
          )}
        </div>

        {/* Create row if missing */}
        {!rowExists && (
          <div className="bg-yellow-950 border border-yellow-600 rounded-xl p-4">
            <p className="text-yellow-300 font-bold mb-2">⚠ No row in database</p>
            <p className="text-yellow-200 text-sm mb-3">The timer record doesn't exist yet. Create it first.</p>
            <button
              onClick={handleCreateRow}
              className="px-5 py-3 bg-yellow-600 hover:bg-yellow-500 text-black font-bold rounded-lg"
            >
              Create DB Row
            </button>
          </div>
        )}

        {/* Set time */}
        <div className="bg-zinc-900 rounded-xl p-5 border border-zinc-700">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Set Countdown Time</p>
          <div className="flex gap-3 items-end flex-wrap">
            {[
              { label: 'Hours', val: hours, set: setHours, max: 99 },
              { label: 'Minutes', val: minutes, set: setMinutes, max: 59 },
              { label: 'Seconds', val: seconds, set: setSeconds, max: 59 },
            ].map(({ label, val, set, max }, idx) => (
              <div key={label} className="flex items-end gap-2">
                {idx > 0 && <span className="text-2xl font-bold text-gray-600 pb-3">:</span>}
                <div>
                  <label className="block text-xs text-gray-500 mb-1">{label}</label>
                  <input
                    type="number"
                    min="0"
                    max={max}
                    value={val}
                    onChange={e => set(Math.max(0, Math.min(max, parseInt(e.target.value) || 0)))}
                    className="w-20 px-2 py-3 bg-black border border-zinc-600 rounded-lg text-2xl font-mono text-center focus:border-[#D4AF37] focus:outline-none disabled:opacity-40"
                    disabled={isRunning}
                  />
                </div>
              </div>
            ))}
          </div>
          <p className="text-gray-600 text-sm mt-3">= {fmt(hours * 3600 + minutes * 60 + seconds)} total</p>
        </div>

        {/* Controls */}
        <div className="flex gap-3 flex-wrap">
          {!isRunning ? (
            <button
              onClick={handleStart}
              disabled={!rowExists}
              className="flex-1 min-w-[140px] px-6 py-4 bg-green-600 hover:bg-green-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-lg rounded-xl transition-colors"
            >
              ▶ Start
            </button>
          ) : (
            <button
              onClick={handleStop}
              className="flex-1 min-w-[140px] px-6 py-4 bg-red-600 hover:bg-red-500 text-white font-bold text-lg rounded-xl transition-colors"
            >
              ⏸ Stop
            </button>
          )}
          <button
            onClick={handleReset}
            disabled={!rowExists}
            className="px-6 py-4 bg-zinc-700 hover:bg-zinc-600 disabled:opacity-40 text-white font-bold rounded-xl transition-colors"
          >
            ↺ Reset
          </button>
        </div>

        {/* Log */}
        <div className="bg-zinc-900 rounded-xl p-5 border border-zinc-700">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Activity Log</p>
          <div className="h-52 overflow-y-auto space-y-1">
            {log.length === 0
              ? <p className="text-gray-600 text-xs font-mono">No activity yet</p>
              : log.map((entry, i) => (
                  <p key={i} className={`text-xs font-mono ${entry.includes('❌') ? 'text-red-400' : 'text-green-400'}`}>
                    {entry}
                  </p>
                ))}
          </div>
        </div>

        {/* SQL to fix RLS if needed */}
        <details className="bg-zinc-900 rounded-xl border border-zinc-700">
          <summary className="p-4 cursor-pointer text-gray-400 text-sm hover:text-white">
            SQL — Fix Supabase RLS if writes fail
          </summary>
          <div className="p-4 pt-0">
            <pre className="text-xs text-yellow-300 bg-black rounded p-3 overflow-x-auto whitespace-pre-wrap">{`-- Run this in Supabase SQL Editor if you see UPDATE errors:

DROP POLICY IF EXISTS "Allow all operations for countdown_timers" ON countdown_timers;

ALTER TABLE countdown_timers DISABLE ROW LEVEL SECURITY;

-- OR re-create policies:
ALTER TABLE countdown_timers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "allow_all" ON countdown_timers FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

ALTER PUBLICATION supabase_realtime ADD TABLE countdown_timers;`}</pre>
          </div>
        </details>

      </div>
    </div>
  )
}