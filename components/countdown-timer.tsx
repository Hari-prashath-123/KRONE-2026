'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { supabase, type CountdownState } from '@/lib/supabase'

const COUNTDOWN_ID = 'krone-2026-countdown'

interface TimeDisplay {
  hours: string
  minutes: string
  seconds: string
}

/**
 * View-only countdown timer.
 * Reads the shared timer from Supabase and counts down locally using end_time.
 * No start/stop controls — those live on /admin only.
 */
const ENDED_KEY = 'krone_timer_ended'

interface CountdownTimerProps {
  onTimerStart?: () => void
}

export function CountdownTimer({ onTimerStart }: CountdownTimerProps = {}) {
  const [displayTime, setDisplayTime] = useState<TimeDisplay>({ hours: '24', minutes: '00', seconds: '00' })
  const prevTimeRef = useRef<TimeDisplay>({ hours: '24', minutes: '00', seconds: '00' })
  const [isRunning, setIsRunning] = useState(false)
  const [mounted, setMounted] = useState(false)
  const endTimeRef = useRef<number | null>(null)
  const rafRef = useRef<NodeJS.Timeout | null>(null)
  // Track whether the initial fetch is done (so we don't fire onTimerStart on page load)
  const initialFetchDoneRef = useRef(false)
  // Track whether the timer was running before the latest applyState call
  const prevIsRunningRef = useRef(false)
  // Stable ref for the callback (avoids re-subscribing on parent re-renders)
  const onTimerStartRef = useRef(onTimerStart)
  useEffect(() => { onTimerStartRef.current = onTimerStart }, [onTimerStart])

  const formatTime = useCallback((s: number): TimeDisplay => {
    const hours = Math.floor(s / 3600)
    const minutes = Math.floor((s % 3600) / 60)
    const secs = s % 60
    return {
      hours: String(hours).padStart(2, '0'),
      minutes: String(minutes).padStart(2, '0'),
      seconds: String(secs).padStart(2, '0'),
    }
  }, [])

  // Tick function: calculates remaining from endTimeRef using local clock
  const tick = useCallback(() => {
    if (!endTimeRef.current) return

    const now = Date.now()
    const remaining = Math.max(0, Math.floor((endTimeRef.current - now) / 1000))
    const newTime = formatTime(remaining)

    setDisplayTime(prev => {
      prevTimeRef.current = prev
      return newTime
    })

    if (remaining <= 0) {
      setIsRunning(false)
      endTimeRef.current = null
      // Reload the page once so the boot animation plays, then show the ended state
      if (typeof window !== 'undefined' && sessionStorage.getItem(ENDED_KEY) !== '1') {
        sessionStorage.setItem(ENDED_KEY, '1')
        window.scrollTo(0, 0)
        window.location.reload()
      }
    }
  }, [formatTime])

  // Apply state from a database record
  const applyState = useCallback((data: CountdownState) => {
    if (data.is_running && data.end_time) {
      const endTime = new Date(data.end_time).getTime()
      const now = Date.now()
      const remaining = Math.max(0, Math.floor((endTime - now) / 1000))

      if (remaining > 0) {
        endTimeRef.current = endTime
        setIsRunning(true)

        // Detect stopped → running transition (only after initial load)
        if (initialFetchDoneRef.current && !prevIsRunningRef.current) {
          onTimerStartRef.current?.()
        }
        prevIsRunningRef.current = true

        const newTime = formatTime(remaining)
        setDisplayTime(prev => {
          prevTimeRef.current = prev
          return newTime
        })
      } else {
        endTimeRef.current = null
        setIsRunning(false)
        prevIsRunningRef.current = false
        setDisplayTime(prev => {
          prevTimeRef.current = prev
          return formatTime(0)
        })
      }
    } else {
      // Timer is stopped
      endTimeRef.current = null
      setIsRunning(false)
      prevIsRunningRef.current = false

      const newTime = formatTime(data.time_remaining)
      setDisplayTime(prev => {
        prevTimeRef.current = prev
        return newTime
      })
    }
  }, [formatTime])

  // 1. Mount + initial fetch + realtime subscription + polling fallback
  useEffect(() => {
    setMounted(true)
    let subscription: ReturnType<typeof supabase.channel> | null = null
    let pollInterval: NodeJS.Timeout | null = null

    const fetchAndApply = async () => {
      const { data, error } = await supabase
        .from('countdown_timers')
        .select('*')
        .eq('id', COUNTDOWN_ID)
        .single()

      if (data && !error) {
        applyState(data)
      }
    }

    const init = async () => {
      // Fetch current state immediately
      await fetchAndApply()
      // Mark initial load done — transitions detected after this point
      initialFetchDoneRef.current = true

      // Subscribe to real-time changes
      subscription = supabase
        .channel('countdown-viewer')
        .on('postgres_changes', {
          event: '*',
          schema: 'public',
          table: 'countdown_timers',
          filter: `id=eq.${COUNTDOWN_ID}`,
        }, (payload) => {
          const record = payload.new as CountdownState
          if (record) {
            applyState(record)
          }
        })
        .subscribe()

      // Polling fallback every 3 seconds to catch missed realtime events
      pollInterval = setInterval(fetchAndApply, 3000)
    }

    init()

    return () => {
      if (subscription) supabase.removeChannel(subscription)
      if (pollInterval) clearInterval(pollInterval)
    }
  }, [applyState])

  // 2. Local tick loop — runs only when isRunning
  useEffect(() => {
    if (!isRunning) {
      if (rafRef.current) clearInterval(rafRef.current)
      return
    }

    // Tick immediately, then every second
    tick()
    rafRef.current = setInterval(tick, 1000)

    return () => {
      if (rafRef.current) clearInterval(rafRef.current)
    }
  }, [isRunning, tick])

  // Digit component with vertical animations
  const Digit = ({ char, prevChar, animate }: { char: string; prevChar: string; animate: boolean }) => {
    const changed = animate && char !== prevChar && prevChar !== undefined
    return (
      <span className="inline-block relative overflow-hidden align-middle" style={{ width: '1.2ch', height: '1.2em' }}>
        {!changed ? (
          <span
            className="block font-black bg-gradient-to-r from-[#D4AF37] via-[#FFD36E] to-[#F6E27A] bg-clip-text text-transparent tabular-nums leading-none"
            style={{ fontSize: 'inherit', lineHeight: 'inherit' }}
          >
            {char}
          </span>
        ) : (
          <>
            <span
              className="absolute inset-0 block font-black tabular-nums leading-none animate-digit-up bg-gradient-to-r from-[#D4AF37] via-[#FFD36E] to-[#F6E27A] bg-clip-text text-transparent"
              style={{ fontSize: 'inherit', lineHeight: 'inherit' }}
            >
              {prevChar}
            </span>
            <span
              className="absolute inset-0 block font-black tabular-nums leading-none animate-digit-in bg-gradient-to-r from-[#D4AF37] via-[#FFD36E] to-[#F6E27A] bg-clip-text text-transparent"
              style={{ fontSize: 'inherit', lineHeight: 'inherit' }}
            >
              {char}
            </span>
          </>
        )}
      </span>
    )
  }

  if (!mounted) return null

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <style jsx>{`
        @keyframes digit-up {
          0% { transform: translateY(0); opacity: 1; }
          70% { opacity: 0.6; }
          100% { transform: translateY(-100%); opacity: 0; }
        }
        @keyframes digit-in {
          0% { transform: translateY(100%); opacity: 0; }
          60% { opacity: 0.6; }
          100% { transform: translateY(0); opacity: 1; }
        }
        :global(.animate-digit-up) { animation: digit-up 0.45s cubic-bezier(.2,.9,.3,1) forwards; }
        :global(.animate-digit-in) { animation: digit-in 0.45s cubic-bezier(.2,.9,.3,1) forwards; }
      `}</style>

      {/* KR-O-NE Header */}
      <div className="flex items-center gap-1 mb-10" style={{ fontSize: 'clamp(3rem, 8vw, 5rem)' }}>
        <span className="font-extrabold bg-gradient-to-r from-[#D4AF37] via-[#FFD36E] to-[#F6E27A] bg-clip-text text-transparent" style={{ fontSize: 'inherit' }}>
          KR
        </span>
        {/* Spinning O */}
        <span className="relative inline-flex items-center justify-center" style={{ width: '1em', height: '1em' }}>
          <svg
            viewBox="0 0 100 100"
            className="absolute inset-0 w-full h-full"
            style={{ animation: 'spin 8s linear infinite' }}
          >
            <defs>
              <linearGradient id="goldGradientTimer" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="90%" stopColor="#FFD36E" />
                <stop offset="100%" stopColor="#D4AF37" />
              </linearGradient>
            </defs>
            <circle
              cx="50" cy="50" r="32"
              fill="none"
              stroke="url(#goldGradientTimer)"
              strokeWidth="13"
              strokeDasharray="58 10"
              strokeLinecap="butt"
            />
          </svg>
        </span>
        <span className="font-extrabold bg-gradient-to-r from-white to-[#C0C0C0] bg-clip-text text-transparent" style={{ fontSize: 'inherit' }}>NE</span>
      </div>

      {/* Countdown digits */}
      <div className="text-[5rem] sm:text-[7rem] md:text-[10rem] leading-none font-extrabold tabular-nums text-center">
        {displayTime.hours !== '00' && (
          <>
            {displayTime.hours.split('').map((c, i) => (
              <Digit key={`h-${i}`} char={c} prevChar={prevTimeRef.current.hours[i] || '0'} animate={isRunning} />
            ))}
            <span className="inline-block mx-3 md:mx-6 bg-gradient-to-r from-[#D4AF37] via-[#FFD36E] to-[#F6E27A] bg-clip-text text-transparent">
              :
            </span>
          </>
        )}
        {displayTime.minutes.split('').map((c, i) => (
          <Digit key={`m-${i}`} char={c} prevChar={prevTimeRef.current.minutes[i] || '0'} animate={isRunning} />
        ))}
        <span className="inline-block mx-3 md:mx-6 bg-gradient-to-r from-[#D4AF37] via-[#FFD36E] to-[#F6E27A] bg-clip-text text-transparent">
          :
        </span>
        {displayTime.seconds.split('').map((c, i) => (
          <Digit key={`s-${i}`} char={c} prevChar={prevTimeRef.current.seconds[i] || '0'} animate={isRunning} />
        ))}
      </div>

      {/* Status text */}
      {!isRunning && displayTime.hours === '00' && displayTime.minutes === '00' && displayTime.seconds === '00' && (
        <p className="mt-8 text-xl text-gray-500 font-medium tracking-wide">Timer ended</p>
      )}
    </div>
  )
}