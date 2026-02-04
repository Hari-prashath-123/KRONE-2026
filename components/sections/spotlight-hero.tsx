'use client'

import React, { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import { ShaderButton } from '@/components/ui/shader-button'
import { GlowMenu } from '@/components/ui/glow-menu'
import { MetallicCard } from '@/components/ui/metallic-card'
import { Calendar, MapPin, ArrowRight, Sparkles } from 'lucide-react'

export function SpotlightHero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

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
        <div className="flex items-center justify-between pt-2">
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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/20 bg-accent/5 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            <span className="text-sm text-accent font-medium">National Level Hackathon</span>
          </div>

          {/* Main Title */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-tight">
              <span className="block mb-2">
                <span className="inline-flex items-center gap-1">
                  <span className="bg-gradient-to-r from-[#D4AF37] via-[#FFD36E] to-[#F6E27A] bg-clip-text text-transparent font-extrabold">
                    KR
                  </span>
                  <span className="bg-gradient-to-r from-white to-[#C0C0C0] bg-clip-text text-transparent font-extrabold">
                    ONE
                  </span>
                </span>
              </span>
              <span className="text-2xl md:text-4xl font-light text-accent tracking-widest">
                Build. Innovate. Win Big.
              </span>
            </h1>
          </div>

          {/* Description */}
          <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto leading-relaxed">
            A 24-hour national level hackathon organized by the Department of Artificial Intelligence. 
            Solve real-world problems, showcase your skills, and compete for amazing prizes.
          </p>

          {/* Event Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto mt-10 pt-4">
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
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <ShaderButton className="text-base px-8 py-3">
              Register Now
              <ArrowRight className="w-4 h-4" />
            </ShaderButton>
            <button className="px-8 py-3 font-semibold rounded-full border-2 border-secondary/30 hover:border-secondary/60 text-foreground hover:text-secondary transition-all flex items-center gap-2 group">
              Learn More
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Logos Section */}
          <div className="pt-16 space-y-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
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

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg
            className="h-6 w-6 text-accent/50"
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
        </div>
      </div>
    </section>
  )
}
