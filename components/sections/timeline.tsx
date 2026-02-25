'use client'

import { Clock } from 'lucide-react'

export function Timeline() {
  const events = [
    { time: '10:00 AM - 11:00 AM', day: 'Day 1', title: 'Registration', description: 'Welcome check-in and hackathon orientation' },
    { time: '11:00 AM - 11:30 AM', day: 'Day 1', title: 'Inauguration', description: 'Opening remarks and welcome' },
    { time: '11:30 AM - 11:45 AM', day: 'Day 1', title: 'Refreshment', description: 'Snacks and beverages provided' },
    { time: '12:00 PM', day: 'Day 1', title: 'Event Kick-Off', description: 'First challenge - Choose your Idea and working model' },
    { time: '1:00 PM - 2:00 PM', day: 'Day 1', title: 'Round 1 Evaluation', description: 'Evaluation of first round projects (Abstracts) and feedback' },
    { time: '2:00 PM - 3:00 PM', day: 'Day 1', title: 'LUNCH', description: 'Complimentary meal provided' },
    { time: '2:00 PM - 3:00 PM', day: 'Day 1', title: 'Side Quest 1', description: 'Side Quest 1 Begins with Some Games' },
    { time: '7:30 PM - 8:30 PM', day: 'Day 1', title: 'Dinner', description: 'Evening meal will be provided' },
    { time: '10:00 PM - 11:00 PM', day: 'Day 1', title: 'Round 2 Evaluation', description: 'Present your solutions and Prototypes' },
    { time: '11:00 PM - 1:00 AM', day: 'Day 1-2', title: 'Side Quest 2 ', description: 'Side Quest 2 Begins with new Games' },
    { time: '8:30 AM - 9:30 AM', day: 'Day 2', title: 'Breakfast', description: 'Morning Breakfast will be provided' },
    { time: '12:00 PM', day: 'Day 2', title: 'Event Conclusion', description: 'Final Project Submission and Judging' },
    { time: '12:00 PM - 1:00 PM', day: 'Day 2', title: 'Round 3 Evaluation', description: 'Present Your Final Project to the Jury and get evaluated' },
    { time: '1:00 PM - 2:00 PM', day: 'Day 2', title: 'Closing Ceremony', description: 'Winner Announcement and Certificate Distributions' },
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
