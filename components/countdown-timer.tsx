'use client'

import { useState, useEffect, useRef } from 'react'
import { Clock } from 'lucide-react'

interface TimeDisplay {
  hours: string
  minutes: string
  seconds: string
}

export function CountdownTimer() {
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null)
  const [isRunning, setIsRunning] = useState(false)
  const [displayTime, setDisplayTime] = useState<TimeDisplay>({ hours: '00', minutes: '00', seconds: '00' })
  const prevTimeRef = useRef<TimeDisplay>({ hours: '00', minutes: '00', seconds: '00' })
  const [hasReloaded, setHasReloaded] = useState(false)

  // Check if timer ended (celebration mode) - only once on mount
  useEffect(() => {
    const timerEnded = localStorage.getItem('timer_ended')
    if (timerEnded === 'true') {
      // We're in celebration mode - don't do any timer logic
      setTimeRemaining(0)
      setIsRunning(false)
      setHasReloaded(true)
    }
  }, [])

  useEffect(() => {
    // Don't run timer logic if we're in celebration mode
    if (hasReloaded) return

    const checkTimer = () => {
      // Double-check we haven't entered celebration mode
      const timerEnded = localStorage.getItem('timer_ended')
      if (timerEnded === 'true') return

      const savedEndTime = localStorage.getItem('timer_end_time')
      const savedRunning = localStorage.getItem('timer_running')
      
      if (savedEndTime && savedRunning === 'true') {
        const endTime = parseInt(savedEndTime)
        const now = Date.now()
        const remaining = Math.max(0, Math.floor((endTime - now) / 1000))
        
        setTimeRemaining(remaining)
        setIsRunning(true)
        
        if (remaining === 0) {
          // Timer reached 0 - set flag and reload ONCE
          localStorage.setItem('timer_ended', 'true')
          localStorage.setItem('timer_running', 'false')
          window.location.reload()
          return
        }
      } else {
        // Timer is not running 
        const savedTime = localStorage.getItem('timer_remaining')
        const timeValue = savedTime ? parseInt(savedTime) : (24 * 60 * 60)
        
        setTimeRemaining(timeValue)
        setIsRunning(false)
      }
    }

    // Check immediately
    checkTimer()

    // Poll every second
    const interval = setInterval(checkTimer, 1000)

    return () => clearInterval(interval)
  }, [hasReloaded])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return {
      hours: hours.toString().padStart(2, '0'),
      minutes: minutes.toString().padStart(2, '0'),
      seconds: secs.toString().padStart(2, '0')
    }
  }

  // Update display time with animation trigger
  useEffect(() => {
    if (timeRemaining !== null) {
      const newTime = formatTime(timeRemaining)
      prevTimeRef.current = displayTime
      setDisplayTime(newTime)
    }
  }, [timeRemaining])

  const NumberFlip = ({ value, prevValue }: { value: string; prevValue: string }) => {
    // Only animate when timer is actively running
    const hasChanged = isRunning && value !== prevValue
    
    return (
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        {hasChanged ? (
          <>
            <span 
              className="absolute text-6xl md:text-7xl font-black text-accent tabular-nums animate-slide-up"
              key={`prev-${prevValue}`}
            >
              {prevValue}
            </span>
            <span 
              className="text-6xl md:text-7xl font-black text-accent tabular-nums animate-slide-in"
              key={`curr-${value}`}
            >
              {value}
            </span>
          </>
        ) : (
          <span className="text-6xl md:text-7xl font-black text-accent tabular-nums">
            {value}
          </span>
        )}
      </div>
    )
  }

  // Don't render until we have initial time value
  if (timeRemaining === null) {
    return null
  }

  return (
    <div className="w-full max-w-2xl mx-auto mt-8">
      <style jsx>{`
        @keyframes slide-up {
          0% {
            transform: translateY(0);
            opacity: 1;
          }
          100% {
            transform: translateY(-100%);
            opacity: 0;
          }
        }

        @keyframes slide-in {
          0% {
            transform: translateY(100%);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }

        :global(.animate-slide-up) {
          animation: slide-up 0.4s ease-out forwards;
        }

        :global(.animate-slide-in) {
          animation: slide-in 0.4s ease-out forwards;
        }
      `}</style>
      
      <div className="bg-gradient-to-r from-card/30 via-card/20 to-card/30 rounded-xl border-2 border-[#D4AF37] p-6 shadow-lg">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Clock className={`w-5 h-5 text-accent ${isRunning ? 'animate-pulse' : ''}`} />
          <h3 className="text-lg font-semibold text-accent">Hackathon Countdown</h3>
          {!isRunning && (
            <span className="ml-2 text-xs px-2 py-1 rounded-full bg-accent/20 text-accent/80 border border-accent/30">
              Paused
            </span>
          )}
        </div>
        
        <div className="flex items-center justify-center gap-4 flex-wrap">
          {/* Hours */}
          <div className="flex flex-col items-center">
            <div className="bg-black/30 rounded-lg border-2 border-accent/30 px-6 py-5 min-w-[110px] h-[110px] flex items-center justify-center relative overflow-hidden">
              <NumberFlip value={displayTime.hours} prevValue={prevTimeRef.current.hours} />
            </div>
            <span className="text-xs uppercase tracking-wider text-foreground/60 mt-3 font-semibold">Hours</span>
          </div>

          <span className="text-6xl text-accent font-black mb-10">:</span>

          {/* Minutes */}
          <div className="flex flex-col items-center">
            <div className="bg-black/30 rounded-lg border-2 border-accent/30 px-6 py-5 min-w-[110px] h-[110px] flex items-center justify-center relative overflow-hidden">
              <NumberFlip value={displayTime.minutes} prevValue={prevTimeRef.current.minutes} />
            </div>
            <span className="text-xs uppercase tracking-wider text-foreground/60 mt-3 font-semibold">Minutes</span>
          </div>

          <span className="text-6xl text-accent font-black mb-10">:</span>

          {/* Seconds */}
          <div className="flex flex-col items-center">
            <div className="bg-black/30 rounded-lg border-2 border-accent/30 px-6 py-5 min-w-[110px] h-[110px] flex items-center justify-center relative overflow-hidden">
              <NumberFlip value={displayTime.seconds} prevValue={prevTimeRef.current.seconds} />
            </div>
            <span className="text-xs uppercase tracking-wider text-foreground/60 mt-3 font-semibold">Seconds</span>
          </div>
        </div>

        <div className="mt-4 text-center">
          <p className="text-sm text-foreground/60">
            {timeRemaining === 0 ? 'Hackathon countdown completed!' : 'Time remaining until event conclusion'}
          </p>
        </div>
      </div>
    </div>
  )
}
