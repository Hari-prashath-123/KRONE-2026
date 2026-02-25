'use client'

import { useState, useEffect, useRef } from 'react'
import { SpotlightHero } from '@/components/sections/spotlight-hero'
import { EventDetails } from '@/components/sections/event-details'
import { CountdownSection } from '@/components/sections/countdown-section'
import { Timeline } from '@/components/sections/timeline'
import { Evaluation } from '@/components/sections/evaluation'
import { Sponsors } from '@/components/sections/sponsors'
import { Footer } from '@/components/sections/footer'
import { TimerEndedPage } from '@/components/timer-ended-page'
import { TimerStartOverlay } from '@/components/timer-start-overlay'

const ENDED_KEY = 'krone_timer_ended'

export default function Home() {
  const [isBooted, setIsBooted] = useState(false)
  const [showEnded, setShowEnded] = useState<boolean | null>(null)
  const [showStartOverlay, setShowStartOverlay] = useState(false)
  const isBootedRef = useRef(false)

  useEffect(() => {
    if (typeof window !== 'undefined' && sessionStorage.getItem(ENDED_KEY) === '1') {
      sessionStorage.removeItem(ENDED_KEY)
      setShowEnded(true)
    } else {
      setShowEnded(false)
    }
  }, [])

  const handleTimerStart = () => {
    // Scroll to top so boot animation starts from the top
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setShowStartOverlay(true)
  }

  const handleOverlayDone = () => {
    setShowStartOverlay(false)
    // After overlay, scroll smoothly to the countdown section
    setTimeout(() => {
      const el = document.getElementById('countdown')
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }, 200)
  }

  if (showEnded === null) return null
  if (showEnded) return <TimerEndedPage />

  return (
    <div className="min-h-screen bg-background text-foreground dark">
      {/* Boot animation overlay when timer starts */}
      {showStartOverlay && <TimerStartOverlay onDone={handleOverlayDone} />}

      <SpotlightHero onBootComplete={() => { setIsBooted(true); isBootedRef.current = true }} />
      <div
        className="transition-all duration-500"
        style={{
          opacity: isBooted ? 1 : 0,
          height: isBooted ? 'auto' : 0,
          overflow: isBooted ? 'visible' : 'hidden',
        }}
      >
        <CountdownSection onTimerStart={handleTimerStart} />
        <EventDetails />
        <Timeline />
        <Evaluation />
        <Sponsors />
        <Footer />
      </div>
    </div>
  )
}
