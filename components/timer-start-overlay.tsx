'use client'

import { useEffect, useState } from 'react'

interface TimerStartOverlayProps {
  onDone: () => void
}

export function TimerStartOverlay({ onDone }: TimerStartOverlayProps) {
  const [bootPhase, setBootPhase] = useState(0)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const timers = [
      setTimeout(() => setBootPhase(1), 300),   // O appears, slow spin
      setTimeout(() => setBootPhase(2), 1800),  // fast spin
      setTimeout(() => setBootPhase(3), 2300),  // KR + NE eject in
      setTimeout(() => setBootPhase(4), 4000),  // O stops, glow
      setTimeout(() => setBootPhase(5), 4800),  // O slow-spins forever
      setTimeout(() => setBootPhase(6), 5200),
      // Fade-out and signal parent
      setTimeout(() => setFading(true), 5800),
      setTimeout(() => onDone(), 6600),
    ]
    return () => timers.forEach(clearTimeout)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black transition-opacity duration-700"
      style={{ opacity: fading ? 0 : 1, pointerEvents: fading ? 'none' : 'auto' }}
    >
      <style jsx>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>

      {/* KRONE title — same as SpotlightHero boot */}
      <div
        className="font-bold tracking-tighter flex items-center gap-0"
        style={{ fontSize: 'clamp(3.5rem, 12vw, 9rem)' }}
      >
        {/* KR */}
        <span
          className="font-extrabold bg-gradient-to-r from-[#D4AF37] via-[#FFD36E] to-[#F6E27A] bg-clip-text text-transparent transition-all duration-700"
          style={{
            fontSize: 'inherit',
            opacity: bootPhase >= 3 ? 1 : 0,
            transform: bootPhase >= 3 ? 'translateX(0)' : 'translateX(-120px)',
            filter:
              bootPhase === 4
                ? 'drop-shadow(0 0 15px rgba(255,211,110,0.8)) drop-shadow(0 0 30px rgba(212,175,55,0.5))'
                : 'none',
          }}
        >
          KR
        </span>

        {/* Spinning O */}
        <span
          className="relative inline-flex items-center justify-center"
          style={{ width: '1em', height: '1em', flexShrink: 0 }}
        >
          <svg
            viewBox="0 0 100 100"
            className="absolute inset-0 w-full h-full"
            style={{
              opacity: bootPhase >= 1 ? 1 : 0,
              animation:
                bootPhase === 1
                  ? 'spin 1s linear infinite'
                  : bootPhase === 2 || bootPhase === 3
                  ? 'spin 0.2s linear infinite'
                  : bootPhase >= 5
                  ? 'spin 8s linear infinite'
                  : 'none',
              filter:
                bootPhase === 4
                  ? 'drop-shadow(0 0 20px #D4AF37) drop-shadow(0 0 40px rgba(96,165,250,0.6))'
                  : 'none',
            }}
          >
            <defs>
              <linearGradient id="goldGradientStart" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="90%" stopColor="#FFD36E" />
                <stop offset="100%" stopColor="#D4AF37" />
              </linearGradient>
            </defs>
            <circle
              cx="50" cy="50" r="32"
              fill="none"
              stroke="url(#goldGradientStart)"
              strokeWidth="13"
              strokeDasharray="58 10"
              strokeLinecap="butt"
            />
          </svg>
        </span>

        {/* NE */}
        <span
          className="font-extrabold bg-gradient-to-r from-white to-[#C0C0C0] bg-clip-text text-transparent transition-all duration-700"
          style={{
            fontSize: 'inherit',
            opacity: bootPhase >= 3 ? 1 : 0,
            transform: bootPhase >= 3 ? 'translateX(0)' : 'translateX(120px)',
            filter:
              bootPhase === 4
                ? 'drop-shadow(0 0 15px rgba(255,255,255,0.8)) drop-shadow(0 0 30px rgba(192,192,192,0.5))'
                : 'none',
          }}
        >
          NE
        </span>
      </div>

      {/* Tagline — fades in after boot */}
      <p
        className="mt-6 text-sm md:text-base font-medium tracking-widest text-accent uppercase transition-opacity duration-700"
        style={{ opacity: bootPhase >= 5 ? 0.7 : 0 }}
      >
        Build. Innovate. Make Impact.
      </p>
    </div>
  )
}
