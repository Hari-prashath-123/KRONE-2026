'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Calendar, MapPin, ArrowRight } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-24">
        <div className="space-y-8 text-center">
          {/* AI Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/20 bg-accent/5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            <span className="text-sm text-accent font-medium">Introducing AI-Powered Hackathon</span>
          </div>

          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight">
              <span className="block">Build. Innovate.</span>
              <span className="block bg-gradient-to-r from-accent via-secondary to-accent bg-clip-text text-transparent">
                Win Big.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto">
              Join KRONE, a 24-hour national level hackathon powered by AI. Solve real-world problems, showcase your skills, and compete for amazing prizes.
            </p>
          </div>

          {/* Event Info */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-base pt-8">
            <div className="flex items-center gap-2 text-foreground/80">
              <Calendar className="w-5 h-5 text-accent" />
              <span>February 27-28, 2026</span>
            </div>
            <div className="hidden sm:block w-px h-6 bg-border"></div>
            <div className="flex items-center gap-2 text-foreground/80">
              <MapPin className="w-5 h-5 text-accent" />
              <span>Tiruchirappalli, India</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-base px-8 py-3 rounded-full gap-2 group"
            >
              Register Now
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => document.getElementById('schedule')?.scrollIntoView({ behavior: 'smooth' })}
              className="border border-accent/30 hover:border-accent hover:bg-accent/5 text-foreground font-semibold text-base px-8 py-3 rounded-full gap-2 group bg-transparent"
            >
              Learn More
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Logos Section */}
          <div className="pt-20 space-y-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Organized By & In Association With
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-10 flex-wrap">
              {/* College Logo */}
              <Image
                src="/images/college-logo.jpg"
                alt="K. Ramakrishnan College of Technology"
                width={100}
                height={100}
                className="h-20 w-auto object-contain"
              />

              {/* Club Logos */}
              <Image
                src="/images/aegis-20club-20logo.jpeg"
                alt="Aegis Club"
                width={100}
                height={100}
                className="h-20 w-20 object-contain rounded-full border border-accent/20"
              />

              <Image
                src="/images/agen-20club-20logo.jpg"
                alt="Agen Club"
                width={100}
                height={100}
                className="h-20 w-20 object-contain rounded-full border border-accent/20"
              />

              <Image
                src="/images/brainiac-20club-20logo.jpeg"
                alt="Brainiac Club"
                width={100}
                height={100}
                className="h-20 w-20 object-contain rounded-full border border-accent/20"
              />
            </div>
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
    </section>
  )
}
