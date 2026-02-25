'use client'

import { useEffect, useState } from 'react'

export function TimerEndedPage() {
  const [bootPhase, setBootPhase] = useState(0)

  // Same boot sequence timing as SpotlightHero
  useEffect(() => {
    const timers = [
      setTimeout(() => setBootPhase(1), 300),   // O appears & spins slowly
      setTimeout(() => setBootPhase(2), 1800),  // O fast spin
      setTimeout(() => setBootPhase(3), 2300),  // KR and NE eject in
      setTimeout(() => setBootPhase(4), 4000),  // O stops, glow
      setTimeout(() => setBootPhase(5), 4800),  // Message + digits fade in
      setTimeout(() => setBootPhase(6), 5200),  // O spins slowly forever
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <div className="min-h-screen w-full bg-black flex flex-col items-center justify-center overflow-hidden">
      <style jsx>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>

      {/* KRONE logo with animated O — matches hero boot phases */}
      <div
        className="font-bold tracking-tighter flex items-center gap-0"
        style={{ fontSize: 'clamp(3.5rem, 12vw, 9rem)' }}
      >
        {/* KR — slides from left */}
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

        {/* O — spinning SVG ring with 3 cuts */}
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
                  : bootPhase >= 6
                  ? 'spin 8s linear infinite'
                  : 'none',
              transform: bootPhase === 4 ? 'rotate(90deg)' : undefined,
              transition: bootPhase === 4 ? 'transform 0.5s ease' : undefined,
              filter:
                bootPhase === 4
                  ? 'drop-shadow(0 0 20px #D4AF37) drop-shadow(0 0 40px rgba(96,165,250,0.6))'
                  : 'none',
            }}
          >
            <defs>
              <linearGradient id="goldGradientEnded" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="90%" stopColor="#FFD36E" />
                <stop offset="100%" stopColor="#D4AF37" />
              </linearGradient>
            </defs>
            <circle
              cx="50"
              cy="50"
              r="32"
              fill="none"
              stroke="url(#goldGradientEnded)"
              strokeWidth="13"
              strokeDasharray="58 10"
              strokeLinecap="butt"
            />
          </svg>
        </span>

        {/* NE — slides from right */}
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

      {/* Message + 00:00:00 — fades in after boot */}
      <div
        className="flex flex-col items-center gap-10 mt-14 transition-all duration-700"
        style={{
          opacity: bootPhase >= 5 ? 1 : 0,
          transform: bootPhase >= 5 ? 'translateY(0)' : 'translateY(24px)',
        }}
      >
        <p className="text-lg sm:text-2xl text-center font-semibold tracking-wide leading-relaxed bg-gradient-to-r from-[#D4AF37] via-[#FFD36E] to-[#F6E27A] bg-clip-text text-transparent max-w-lg px-6">
          Ctrl+S one last time!
          <br />
          The 24&#8209;hour marathon is officially over!
        </p>

        <div className="text-[5rem] sm:text-[7rem] md:text-[10rem] leading-none font-extrabold tabular-nums text-center bg-gradient-to-r from-[#D4AF37] via-[#FFD36E] to-[#F6E27A] bg-clip-text text-transparent">
          00:00:00
        </div>
      </div>
    </div>
  )
}
