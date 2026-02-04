'use client'

import React, { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import { ShaderButton } from '@/components/ui/shader-button'
import { GlowMenu } from '@/components/ui/glow-menu'
import { MetallicCard } from '@/components/ui/metallic-card'
import { Calendar, MapPin, ArrowRight, Sparkles } from 'lucide-react'

interface SpotlightHeroProps {
  onBootComplete?: () => void
}

export function SpotlightHero({ onBootComplete }: SpotlightHeroProps) {
  const [bootPhase, setBootPhase] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  // Boot sequence timing
  useEffect(() => {
    const timers = [
      setTimeout(() => setBootPhase(1), 300),     // Phase 1: O appears and spins slowly
      setTimeout(() => setBootPhase(2), 1800),    // Phase 2: O accelerates to fast spin (shorter slow spin)
      setTimeout(() => setBootPhase(3), 2300),    // Phase 3: KR and NE eject while spinning
      setTimeout(() => setBootPhase(4), 4000),    // Phase 4: O stops, glow effect
      setTimeout(() => {
        setBootPhase(5)                            // Phase 5: Rest of UI fades in
        onBootComplete?.()
      }, 4800),
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const menuItems = [
    { label: 'Details', href: '#about' },
    { label: 'Schedule', href: '#schedule' },
    { label: 'Evaluation', href: '#rules' },
    { label: 'Sponsors', href: '#sponsors' },
  ]

  const scrollToNextSection = () => {
    if (!containerRef.current) return
    const next = containerRef.current.nextElementSibling as HTMLElement | null
    if (next) {
      next.scrollIntoView({ behavior: 'smooth' })
    } else {
      // fallback: scroll down one viewport height
      window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })
    }
  }

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-background pt-0"
    >
      {/* Spotlight effect */}
      <div
        className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(212,175,55,0.15), transparent 80%)`,
        }}
      />

      {/* Animated background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(212,175,55,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,0.05)_1px,transparent_1px)] bg-[size:50px_50px] opacity-20 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 w-full space-y-16">
        {/* Navigation */}
        <div
          className="flex items-center justify-between pt-2 transition-opacity duration-500"
          style={{ opacity: bootPhase >= 5 ? 1 : 0 }}
        >
          <div className="flex items-center gap-2">
            <Image
              src="/KRONE%20LOGO.jpg"
              alt="KRONE"
              width={96}
              height={96}
              className="h-40 w-40 object-contain"
            />
            
          </div>

          {/* Glow Menu */}
          <GlowMenu items={menuItems} className="hidden lg:flex" />

          {/* Mobile menu indicator */}
          <div className="lg:hidden text-accent text-sm font-medium">Menu</div>
        </div>

        {/* Hero Content */}
        <div className="space-y-8 text-center pt-2 pb-12">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/20 bg-accent/5 backdrop-blur-sm transition-opacity duration-500"
            style={{ opacity: bootPhase >= 5 ? 1 : 0 }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            <span className="text-sm text-accent font-medium">National Level Hackathon</span>
          </div>

          {/* Main Title with Boot Animation */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-tight">
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
                                  bootPhase === 2 || bootPhase === 3 ? 'spin 0.2s linear infinite' : 'none',
                        transform: bootPhase >= 4 ? 'rotate(90deg)' : 'rotate(0deg)',
                        filter: bootPhase === 4 ? 'drop-shadow(0 0 20px rgba(96, 165, 250, 0.9)) drop-shadow(0 0 40px rgba(96, 165, 250, 0.6)) drop-shadow(0 0 60px rgba(96, 165, 250, 0.4))' : 'none',
                      }}
                    >
                      <defs>
                        <linearGradient id="silverGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#F0F0F0" />
                          <stop offset="25%" stopColor="#D0E8F2" />
                          <stop offset="50%" stopColor="#C0C0C0" />
                          <stop offset="75%" stopColor="#60A5FA" />
                          <stop offset="100%" stopColor="#A0A0A0" />
                        </linearGradient>
                      </defs>
                      <circle
                        cx="50"
                        cy="50"
                        r="32"
                        fill="none"
                        stroke="url(#silverGradient)"
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
              <span
                className="text-2xl md:text-4xl font-light text-accent tracking-widest transition-opacity duration-500"
                style={{ opacity: bootPhase >= 5 ? 1 : 0 }}
              >
                Build. Innovate. Win Big.
              </span>
            </h1>
          </div>

          {/* Description */}
          <p
            className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto leading-relaxed transition-opacity duration-500"
            style={{ opacity: bootPhase >= 5 ? 1 : 0 }}
          >
            A 24-hour national level hackathon organized by the Department of Artificial Intelligence. 
            Solve real-world problems, showcase your skills, and compete for amazing prizes.
          </p>
{/* Down arrow button (moved here after organizers logos) */}
          <div
            className="flex justify-center pt-6 transition-opacity duration-500"
            style={{ opacity: bootPhase >= 5 ? 1 : 0 }}
          >
            <button
              onClick={scrollToNextSection}
              aria-label="Scroll down"
              className="p-3 rounded-full border border-accent/20 bg-background/50 hover:bg-accent/5 transition-shadow shadow-sm flex items-center justify-center"
            >
              <svg
                className="h-6 w-6 text-accent/60 animate-bounce"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </button>
          </div>
        </div>
          {/* Event Info Cards */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto mt-10 pt-4 transition-opacity duration-500"
            style={{ opacity: bootPhase >= 5 ? 1 : 0 }}
          >
            <MetallicCard
              icon={<Calendar className="w-5 h-5 text-accent" />}
              title="February 27-28, 2026"
              description="24-hour continuous"
            />
            <MetallicCard
              icon={<MapPin className="w-5 h-5 text-accent" />}
              title="Tiruchirappalli"
              description="K. Ramakrishnan College"
            />
          </div>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8 transition-opacity duration-500"
            style={{ opacity: bootPhase >= 5 ? 1 : 0 }}
          >
            <a
              href="https://forms.gle/eLGi9R2VE3jxFJVp6"
              target="_blank"
              rel="noopener noreferrer"
              className="text-base px-8 py-3 inline-flex items-center gap-2 rounded-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold transition-colors"
            >
              Register Now
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              onClick={() => document.getElementById('schedule')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3 font-semibold rounded-full border-2 border-secondary/30 hover:border-secondary/60 text-foreground hover:text-secondary transition-all flex items-center gap-2 group"
            >
              Learn More
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Logos Section */}
          <div
            className="pt-16 space-y-8 transition-opacity duration-500"
            style={{ opacity: bootPhase >= 5 ? 1 : 0 }}
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground text-center">
              Organized By & In Association With
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 flex-wrap">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/college-logo-dD6b8jEBNU7UplCct4L4mjWcuV0Scr.jpg"
                alt="K. Ramakrishnan College"
                width={100}
                height={100}
                className="h-20 w-auto object-contain"
              />
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Aegis%20club%20logo-yMYVAwB5oZQj39FR6ZNY9jiXu7HPLN.jpeg"
                alt="Aegis Club"
                width={100}
                height={100}
                className="h-20 w-20 object-contain rounded-full border border-accent/20 text-center"
              />
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/agen%20club%20logo-Mya05gG6Cn7o7p4sh5QDCjDDH48sjG.jpg"
                alt="Agen Club"
                width={100}
                height={100}
                className="h-20 w-20 object-contain rounded-full border border-accent/20"
              />
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/brainiac%20club%20logo-imkB55WSgCU2UBy8PryHmyFgpBKwxe.jpeg"
                alt="Brainiac Club"
                width={100}
                height={100}
                className="h-20 w-20 object-contain rounded-full border border-accent/20"
              />
            </div>
          </div>

          

        
      </div>
    </section>
  )
}
