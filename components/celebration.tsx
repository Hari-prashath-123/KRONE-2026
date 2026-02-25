'use client'

import { useEffect, useState } from 'react'

export function Celebration() {
  const [bootPhase, setBootPhase] = useState(0)
  const [showMessage, setShowMessage] = useState(false)

  useEffect(() => {
    // Boot sequence timing
    const timers = [
      setTimeout(() => setBootPhase(1), 300),     // Phase 1: O appears and spins slowly
      setTimeout(() => setBootPhase(2), 1800),    // Phase 2: O accelerates to fast spin
      setTimeout(() => setBootPhase(3), 2300),    // Phase 3: KR and NE eject while spinning
      setTimeout(() => setBootPhase(4), 4000),    // Phase 4: O stops, glow effect
      setTimeout(() => {
        setBootPhase(5)                            // Phase 5: Show message
        setShowMessage(true)
      }, 4800),
      // Don't auto-hide - keep showing until page reload
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center">
      {!showMessage ? (
        <div className="relative">
          {/* KRONE Boot Animation */}
          <div className="space-y-4">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-tight">
              <span className="block mb-2 relative">
                <span className="inline-flex items-center justify-center gap-1">
                  {/* KR - slides from left */}
                  <span
                    className="bg-gradient-to-r from-[#D4AF37] via-[#FFD36E] to-[#F6E27A] bg-clip-text text-transparent font-extrabold transition-all duration-700"
                    style={{
                      opacity: bootPhase >= 3 ? 1 : 0,
                      transform: bootPhase >= 3 ? 'translateX(0)' : 'translateX(-100px)',
                      filter: bootPhase === 4 ? 'drop-shadow(0 0 15px rgba(255, 211, 110, 0.8)) drop-shadow(0 0 30px rgba(212, 175, 55, 0.5))' : 'none',
                    }}
                  >
                    KR
                  </span>
                  
                  {/* O - SVG ring with 3 cuts */}
                  <span className="relative inline-flex items-center justify-center" style={{ width: '1em', height: '1em' }}>
                    <svg
                      viewBox="0 0 100 100"
                      className="absolute inset-0 w-full h-full transition-all duration-500"
                      style={{
                        opacity: bootPhase >= 1 ? 1 : 0,
                        animation: bootPhase === 1 ? 'spin 1s linear infinite' :
                                  bootPhase === 2 || bootPhase === 3 ? 'spin 0.2s linear infinite' :
                                  'none',
                        transform: bootPhase >= 4 ? 'rotate(90deg)' : 'rotate(0deg)',
                        filter: bootPhase === 4 ? 'drop-shadow(0 0 20px #D4AF37) drop-shadow(0 0 40px rgba(96, 165, 250, 0.6)) drop-shadow(0 0 60px rgba(96, 165, 250, 0.4))' : 'none',
                      }}
                    >
                      <defs>
                        <linearGradient id="goldGradientCelebration" x1="0%" y1="0%" x2="100%" y2="100%">
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
                        stroke="url(#goldGradientCelebration)"
                        strokeWidth="13"
                        strokeDasharray="58 10"
                        strokeLinecap="butt"
                      />
                    </svg>
                  </span>
                  
                  {/* NE - slides from right */}
                  <span
                    className="bg-gradient-to-r from-white to-[#C0C0C0] bg-clip-text text-transparent font-extrabold transition-all duration-700"
                    style={{
                      opacity: bootPhase >= 3 ? 1 : 0,
                      transform: bootPhase >= 3 ? 'translateX(0)' : 'translateX(100px)',
                      filter: bootPhase === 4 ? 'drop-shadow(0 0 15px rgba(255, 255, 255, 0.8)) drop-shadow(0 0 30px rgba(192, 192, 192, 0.5))' : 'none',
                    }}
                  >
                    NE
                  </span>
                </span>
              </span>
            </h1>
          </div>
        </div>
      ) : (
        <div 
          className="max-w-4xl px-8 text-center animate-fade-in"
          style={{
            animation: 'fadeIn 1s ease-in-out'
          }}
        >
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-[#D4AF37] via-[#FFD36E] to-[#F6E27A] bg-clip-text text-transparent mb-4">
            Ctrl+S one last time!
          </h2>
          <p className="text-2xl md:text-3xl text-white/90 mb-4">
            The 24-hour marathon is officially over!
          </p>
          <div className="mt-4 inline-flex items-center justify-center px-6 py-3 rounded-full border-2 border-[#D4AF37] bg-white/5">
            <span className="text-3xl md:text-4xl font-mono tracking-[0.3em] text-[#FFD36E]">
              00:00:00
            </span>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}
