'use client'

import { Clock } from 'lucide-react'

export function Timeline() {
  const events = [
    {
      time: '9:00 AM - 10:00 AM',
      day: 'Day 1',
      title: 'Registration & Introduction',
      description: 'Welcome check-in and hackathon orientation'
    },
    {
      time: '10:00 AM - 11:00 AM',
      day: 'Day 1',
      title: 'Event Kickoff & Challenge Announcement',
      description: 'First challenge - Choose your Idea and working model'
    },
    {
      time: '11:00 AM - 11:15 AM',
      day: 'Day 1',
      title: 'Refreshment Break',
      description: 'Snacks and beverages provided'
    },
    {
      time: '12:30 PM - 1:30 PM',
      day: 'Day 1',
      title: 'Round 1 Evaluation',
      description: 'Evaluation of first round projects (Abstracts) and feedback'
    },
    {
      time: '2:00 PM - 3:00 PM',
      day: 'Day 1',
      title: 'Lunch Break',
      description: 'Complimentary meal provided'
    },
    
    {
      time: '6:00 PM - 8:00 PM',
      day: 'Day 1',
      title: 'Explanation Round 2',
      description: 'Present your solutions and Prototypes'
    },
    {
      time: '9:00 PM - 10:00 PM',
      day: 'Day 1',
      title: 'Dinner',
      description: 'Evening meal will be provided'
    },
    {
      time: '10:00 PM - 9:00 AM',
      day: 'Day 2',
      title: 'Continuous Night Developing',
      description: 'No sleep night for developers'
    },
    {
      time: '2:45 AM - 3:15 AM',
      day: 'Day 2',
      title: 'Mid Night Refreshment',
      description: 'Mid Night Refreshment will be Provided'
    },
    {
      time: '9:00 AM - 10:00 AM',
      day: 'Day 2',
      title: 'BreakFast',
      description: 'Morning Breakfast will be provided'
    },
    {
      time: '10:00 AM - 12:00 PM',
      day: 'Day 2',
      title: 'Round 3 Evaluation',
      description: 'Present Your Final Project to the Jury and get evaluated'
    },
    {
      time: '12:00 PM - 1:00 PM',
      day: 'Day 2',
      title: 'Closing Ceremony',
      description: 'Winner Announcement and Certificate Distributions'
    },
  ]

  return (
    <section id="schedule" className="py-24 bg-gradient-to-b from-background to-card/10">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-3 mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold">
            Event <span className="text-accent">Timeline</span>
          </h2>
          <p className="text-foreground/60">24-hour continuous hackathon with structured challenges</p>
        </div>

        <div className="space-y-0">
          {events.map((event, index) => (
            <div key={index} className="relative">
              {/* Timeline line */}
              {index !== events.length - 1 && (
                <div className="absolute left-8 top-20 bottom-0 w-0.5 bg-gradient-to-b from-accent/50 to-transparent z-0" />
              )}

              <div className="flex gap-6 pb-12">
                {/* Timeline dot - gold 3-cut ring */}
                <div className="flex flex-col items-center pt-1">
                  <div className="relative z-0 w-16 h-16 flex items-center justify-center group">
                    <svg
                      viewBox="0 0 100 100"
                      className="w-14 h-14 animate-[spin_5s_linear_infinite]"
                      aria-hidden
                    >
                      <defs>
                        <linearGradient id={`goldTimelineGradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#D4AF37" />
                          <stop offset="45%" stopColor="#FFD36E" />
                          <stop offset="100%" stopColor="#F6E27A" />
                        </linearGradient>
                      </defs>
                      <circle
                        cx="50"
                        cy="50"
                        r="34"
                        fill="none"
                        stroke={`url(#goldTimelineGradient-${index})`}
                        strokeWidth="9"
                        strokeDasharray="50 12 50 12 50 12"
                        strokeLinecap="butt"
                      />
                    </svg>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 pt-2 pb-2">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-bold uppercase tracking-widest text-accent">
                      {event.day}
                    </span>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="w-3.5 h-3.5" />
                      {event.time}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">{event.title}</h3>
                  <p className="text-foreground/60 text-sm">{event.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
