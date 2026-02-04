'use client'

import { SpotlightHero } from '@/components/sections/spotlight-hero'
import { EventDetails } from '@/components/sections/event-details'
import { Timeline } from '@/components/sections/timeline'
import { Evaluation } from '@/components/sections/evaluation'
import { Sponsors } from '@/components/sections/sponsors'
import { Footer } from '@/components/sections/footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground dark">
      <SpotlightHero />
      <EventDetails />
      <Timeline />
      <Evaluation />
      <Sponsors />
      <Footer />
    </div>
  )
}
