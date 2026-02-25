'use client'

import { useState, useEffect, useCallback } from 'react'
import { CountdownTimer } from '@/components/countdown-timer'

interface CountdownSectionProps {
  onTimerStart?: () => void
}

export function CountdownSection({ onTimerStart }: CountdownSectionProps = {}) {
  const [showBanner, setShowBanner] = useState(false)

  const handleTimerStart = useCallback(() => {
    setShowBanner(true)
    onTimerStart?.()
    // Auto-hide banner after 60 seconds
    setTimeout(() => setShowBanner(false), 60_000)
  }, [onTimerStart])

  return (
    <section
      id="countdown"
      className="relative w-full min-h-screen flex flex-col items-center justify-center bg-black py-20"
    >
      {/* 1-minute live banner */}
      <div
        className="absolute top-8 left-0 right-0 flex justify-center px-4 transition-all duration-700"
        style={{ opacity: showBanner ? 1 : 0, transform: showBanner ? 'translateY(0)' : 'translateY(-12px)', pointerEvents: 'none' }}
      >
        <p className="text-center text-sm sm:text-base md:text-lg font-semibold tracking-wide leading-relaxed bg-gradient-to-r from-[#D4AF37] via-[#FFD36E] to-[#F6E27A] bg-clip-text text-transparent max-w-2xl border border-[#D4AF37]/20 rounded-2xl px-6 py-3 backdrop-blur-sm bg-black/40">
          24 Hours on the clock. Infinite possibilities ahead.{' '}
          <span className="whitespace-nowrap">KRONE 2026 is officially LIVE—Let&#39;s build the future!</span>
        </p>
      </div>

      <CountdownTimer onTimerStart={handleTimerStart} />
    </section>
  )
}