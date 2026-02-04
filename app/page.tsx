'use client'

import { useState } from 'react'
import { SpotlightHero } from '@/components/sections/spotlight-hero'
import { EventDetails } from '@/components/sections/event-details'
import { Timeline } from '@/components/sections/timeline'
import { Evaluation } from '@/components/sections/evaluation'
import { Sponsors } from '@/components/sections/sponsors'
import { Footer } from '@/components/sections/footer'

export default function Home() {
  const [isBooted, setIsBooted] = useState(false)

  return (
    <div className="min-h-screen bg-background text-foreground dark">
      <SpotlightHero onBootComplete={() => setIsBooted(true)} />
      <div
        className="transition-all duration-500"
        style={{
          opacity: isBooted ? 1 : 0,
          height: isBooted ? 'auto' : 0,
          overflow: isBooted ? 'visible' : 'hidden',
        }}
      >
        <EventDetails />
        <Timeline />
        <Evaluation />
        <Sponsors />
        <Footer />
      </div>
    </div>
  )
}
