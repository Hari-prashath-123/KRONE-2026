'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Play, Pause, RotateCcw } from 'lucide-react'

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [timerRunning, setTimerRunning] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(24 * 60 * 60) // 24 hours in seconds
  const [hours, setHours] = useState(24)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const router = useRouter()

  // Check authentication on mount
  useEffect(() => {
    const auth = localStorage.getItem('admin_auth')
    if (auth === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  // Load timer state on mount
  useEffect(() => {
    if (isAuthenticated) {
      const savedEndTime = localStorage.getItem('timer_end_time')
      const savedRunning = localStorage.getItem('timer_running')
      
      if (savedEndTime && savedRunning === 'true') {
        const endTime = parseInt(savedEndTime)
        const now = Date.now()
        const remaining = Math.max(0, Math.floor((endTime - now) / 1000))
        setTimeRemaining(remaining)
        setTimerRunning(true)
      } else {
        const savedTime = localStorage.getItem('timer_remaining')
        if (savedTime) {
          const time = parseInt(savedTime)
          setTimeRemaining(time)
          // Update input fields based on saved time
          setHours(Math.floor(time / 3600))
          setMinutes(Math.floor((time % 3600) / 60))
          setSeconds(time % 60)
        }
      }
    }
  }, [isAuthenticated])

  // Timer countdown
  useEffect(() => {
    if (!timerRunning || timeRemaining <= 0) return

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        const newTime = Math.max(0, prev - 1)
        localStorage.setItem('timer_remaining', newTime.toString())
        
        if (newTime === 0) {
          setTimerRunning(false)
          localStorage.setItem('timer_running', 'false')
          localStorage.removeItem('timer_end_time')
        }
        
        return newTime
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [timerRunning, timeRemaining])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (username === 'hari' && password === '@Hulk3029s') {
      setIsAuthenticated(true)
      localStorage.setItem('admin_auth', 'true')
      setError('')
    } else {
      setError('Invalid credentials')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('admin_auth')
    router.push('/')
  }

  const updateTimeFromInputs = (h: number, m: number, s: number) => {
    const totalSeconds = (h * 3600) + (m * 60) + s
    setTimeRemaining(totalSeconds)
    localStorage.setItem('timer_remaining', totalSeconds.toString())
  }

  const handleHoursChange = (value: string) => {
    const h = Math.max(0, parseInt(value) || 0)
    setHours(h)
    updateTimeFromInputs(h, minutes, seconds)
  }

  const handleMinutesChange = (value: string) => {
    const m = Math.max(0, Math.min(59, parseInt(value) || 0))
    setMinutes(m)
    updateTimeFromInputs(hours, m, seconds)
  }

  const handleSecondsChange = (value: string) => {
    const s = Math.max(0, Math.min(59, parseInt(value) || 0))
    setSeconds(s)
    updateTimeFromInputs(hours, minutes, s)
  }

  const handleStart = () => {
    const endTime = Date.now() + (timeRemaining * 1000)
    localStorage.setItem('timer_end_time', endTime.toString())
    localStorage.setItem('timer_running', 'true')
    setTimerRunning(true)
  }

  const handleStop = () => {
    setTimerRunning(false)
    localStorage.setItem('timer_running', 'false')
    localStorage.removeItem('timer_end_time')
    localStorage.setItem('timer_remaining', timeRemaining.toString())
  }

  const handleReset = () => {
    setTimerRunning(false)
    const totalSeconds = (hours * 3600) + (minutes * 60) + seconds
    setTimeRemaining(totalSeconds)
    localStorage.setItem('timer_running', 'false')
    localStorage.setItem('timer_remaining', totalSeconds.toString())
    localStorage.removeItem('timer_end_time')
    localStorage.removeItem('timer_ended')  // Clear ended state on reset
  }

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-background to-black p-4">
        {/* Animated background grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(212,175,55,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,0.05)_1px,transparent_1px)] bg-[size:50px_50px] opacity-20 pointer-events-none" />
        
        <div className="w-full max-w-md space-y-8 relative z-10">
          <div className="text-center space-y-4">
            {/* Gold Ring Logo */}
            <div className="flex justify-center mb-6">
              <svg viewBox="0 0 100 100" className="h-20 w-20 animate-[spin_8s_linear_infinite]" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="goldGradientLogin" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="60%" stopColor="#FFD36E" />
                    <stop offset="100%" stopColor="#D4AF37" />
                  </linearGradient>
                </defs>
                <circle
                  cx="50"
                  cy="50"
                  r="32"
                  fill="none"
                  stroke="url(#goldGradientLogin)"
                  strokeWidth="13"
                  strokeDasharray="58 10"
                  strokeLinecap="butt"
                />
              </svg>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-[#D4AF37] via-[#FFD36E] to-[#F6E27A] bg-clip-text text-transparent">
              Admin Panel
            </h1>
            <p className="text-sm text-foreground/60">Sign in to access admin controls</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6 bg-black/40 backdrop-blur-sm p-8 rounded-xl border-2 border-[#D4AF37]/30 shadow-lg shadow-[#D4AF37]/10">
            <div className="space-y-5">
              <div>
                <label htmlFor="username" className="block text-sm font-semibold text-[#D4AF37] mb-2 tracking-wide">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 bg-black/50 border-2 border-[#D4AF37]/20 rounded-lg focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37] outline-none text-white placeholder-foreground/40 transition-all"
                  placeholder="Enter username"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-[#D4AF37] mb-2 tracking-wide">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-black/50 border-2 border-[#D4AF37]/20 rounded-lg focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37] outline-none text-white placeholder-foreground/40 transition-all"
                  placeholder="Enter password"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="text-red-400 text-sm text-center bg-red-500/10 py-3 rounded-lg border border-red-500/30">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-[#D4AF37] to-[#FFD36E] hover:from-[#FFD36E] hover:to-[#D4AF37] text-black font-bold rounded-lg transition-all shadow-lg shadow-[#D4AF37]/20 hover:shadow-[#D4AF37]/40"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-background to-black p-4">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(212,175,55,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,0.05)_1px,transparent_1px)] bg-[size:50px_50px] opacity-20 pointer-events-none" />
      
      <div className="max-w-4xl mx-auto space-y-8 py-8 relative z-10">
        <div className="flex items-center justify-between bg-black/40 backdrop-blur-sm p-6 rounded-xl border-2 border-[#D4AF37]/30 shadow-lg">
          <div className="flex items-center gap-4">
            {/* Gold Ring Logo */}
            <svg viewBox="0 0 100 100" className="h-12 w-12 animate-[spin_8s_linear_infinite]" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="goldGradientAdmin" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="60%" stopColor="#FFD36E" />
                  <stop offset="100%" stopColor="#D4AF37" />
                </linearGradient>
              </defs>
              <circle
                cx="50"
                cy="50"
                r="32"
                fill="none"
                stroke="url(#goldGradientAdmin)"
                strokeWidth="13"
                strokeDasharray="58 10"
                strokeLinecap="butt"
              />
            </svg>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#D4AF37] via-[#FFD36E] to-[#F6E27A] bg-clip-text text-transparent">
              Admin Panel
            </h1>
          </div>
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-red-500/20 text-red-400 border-2 border-red-500/40 rounded-lg hover:bg-red-500/30 hover:border-red-500/60 transition-all font-semibold"
          >
            Logout
          </button>
        </div>

        <div className="bg-black/40 backdrop-blur-sm p-8 rounded-xl border-2 border-[#D4AF37] shadow-lg shadow-[#D4AF37]/20">
          <h2 className="text-2xl font-bold text-[#FFD36E] mb-6 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></span>
            Countdown Timer Control
          </h2>
          
          <div className="space-y-8">
            {/* Time Input Controls */}
            <div className="bg-[#D4AF37]/10 rounded-lg p-6 border border-[#D4AF37]/30">
              <h3 className="text-lg font-semibold text-[#FFD36E] mb-4 text-center">Set Timer Duration</h3>
              <div className="flex items-center justify-center gap-4 flex-wrap">
                <div className="flex flex-col items-center">
                  <label className="text-xs uppercase tracking-wider text-foreground/60 mb-2">Hours</label>
                  <input
                    type="number"
                    min="0"
                    value={hours}
                    onChange={(e) => handleHoursChange(e.target.value)}
                    disabled={timerRunning}
                    className="w-20 px-3 py-2 text-center text-2xl font-bold bg-black/50 border-2 border-[#D4AF37]/40 rounded-lg focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37] outline-none text-[#FFD36E] disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>

                <span className="text-3xl text-[#D4AF37] font-bold mt-6">:</span>

                <div className="flex flex-col items-center">
                  <label className="text-xs uppercase tracking-wider text-foreground/60 mb-2">Minutes</label>
                  <input
                    type="number"
                    min="0"
                    max="59"
                    value={minutes}
                    onChange={(e) => handleMinutesChange(e.target.value)}
                    disabled={timerRunning}
                    className="w-20 px-3 py-2 text-center text-2xl font-bold bg-black/50 border-2 border-[#D4AF37]/40 rounded-lg focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37] outline-none text-[#FFD36E] disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>

                <span className="text-3xl text-[#D4AF37] font-bold mt-6">:</span>

                <div className="flex flex-col items-center">
                  <label className="text-xs uppercase tracking-wider text-foreground/60 mb-2">Seconds</label>
                  <input
                    type="number"
                    min="0"
                    max="59"
                    value={seconds}
                    onChange={(e) => handleSecondsChange(e.target.value)}
                    disabled={timerRunning}
                    className="w-20 px-3 py-2 text-center text-2xl font-bold bg-black/50 border-2 border-[#D4AF37]/40 rounded-lg focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37] outline-none text-[#FFD36E] disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
              </div>
              {timerRunning && (
                <p className="text-xs text-center text-foreground/60 mt-3">Stop the timer to edit duration</p>
              )}
            </div>

            {/* Timer Display */}
            <div className="flex items-center justify-center">
              <div className="text-6xl md:text-8xl font-mono font-bold text-[#FFD36E] bg-black/60 px-8 py-6 rounded-xl border-2 border-[#D4AF37]/40 shadow-inner">
                {formatTime(timeRemaining)}
              </div>
            </div>

            {/* Status */}
            <div className="text-center">
              <span className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold border-2 ${
                timerRunning 
                  ? 'bg-green-500/20 text-green-400 border-green-500/40' 
                  : 'bg-gray-500/20 text-gray-400 border-gray-500/40'
              }`}>
                <span className="relative flex h-2 w-2">
                  {timerRunning && (
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  )}
                  <span className={`relative inline-flex rounded-full h-2 w-2 ${timerRunning ? 'bg-green-400' : 'bg-gray-400'}`}></span>
                </span>
                {timerRunning ? 'Running' : 'Stopped'}
              </span>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <button
                onClick={handleStart}
                disabled={timerRunning || timeRemaining === 0}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all shadow-lg border-2 border-green-400/30 disabled:border-gray-500/30"
              >
                <Play className="w-5 h-5" />
                Start
              </button>

              <button
                onClick={handleStop}
                disabled={!timerRunning}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all shadow-lg border-2 border-yellow-400/30 disabled:border-gray-500/30"
              >
                <Pause className="w-5 h-5" />
                Stop
              </button>

              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-semibold rounded-lg transition-all shadow-lg border-2 border-red-400/30"
              >
                <RotateCcw className="w-5 h-5" />
                Reset
              </button>
            </div>

            {/* Info */}
            <div className="text-center text-sm bg-[#D4AF37]/10 rounded-lg p-4 border border-[#D4AF37]/20">
              {timeRemaining === 0 ? (
                <p className="text-[#FFD36E] font-semibold text-lg">⏰ Timer has ended!</p>
              ) : (
                <div>
                  <p className="text-foreground/70">Timer will appear on the homepage once started</p>
                  <p className="text-foreground/50 text-xs mt-1">Customize duration above before starting</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
