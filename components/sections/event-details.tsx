'use client'

import { MetallicCard } from '@/components/ui/metallic-card'
import { Trophy, CreditCard, Users, Zap, Utensils, Clock, Coffee, Check } from 'lucide-react'
import { useState } from 'react'

export function EventDetails() {
  const details = [
    {
      title: 'Prize Pool',
      value: '₹18,000',
      icon: Trophy,
      description: 'Total Prize Pool'
    },
    {
      title: 'Registration Fee',
      value: '₹200',
      icon: CreditCard,
      description: 'Per Head'
    },
    {
      title: 'Team Size',
      value: '3-5 Members',
      icon: Users,
      description: 'Min: 3 | Max: 5'
    },
    {
      title: 'Theme',
      value: 'Student Innovation',
      icon: Zap,
      description: 'Real-world problems using AI'
    },
  ]

  const logistics = [
    {
      title: 'Food Provided',
      items: ['Day 1 Lunch', 'Day 1 Dinner', 'Day 2 Breakfast'],
      icon: Utensils
    },
    {
      title: 'Duration',
      items: ['Starts: Day 1 @ 10:00 AM', 'Ends: Day 2 @ 10:00 AM', '24 Continuous Hours'],
      icon: Clock
    },
    {
      title: 'Refreshments',
      items: ['2 Refreshment Breaks', 'Beverages Included', 'Snacks Provided'],
      icon: Coffee
    },
  ]

  const [showMore, setShowMore] = useState(false)

  return (
    <section id="about" className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Key Details Grid */}
        <div className="mb-20">
          <div className="space-y-3 mb-16 text-center">
            <h2 className="text-4xl md:text-5xl font-bold">
              Event <span className="text-accent">Details</span>
            </h2>
            <p className="text-foreground/60">Everything you need to know to get started</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {details.map((detail, index) => {
              const IconComponent = detail.icon
              return (
                <MetallicCard
                  key={index}
                  icon={<IconComponent className="w-6 h-6 text-accent" />}
                >
                  <div className="text-center space-y-3">
                    <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                      {detail.title}
                    </h3>
                    <p className="text-3xl font-bold text-white">{detail.value}</p>
                    <p className="text-sm text-foreground/60">{detail.description}</p>
                  </div>
                </MetallicCard>
              )
            })}
          </div>

          {/* More details button and Whatsapp group button */}
          <div className="mt-8 flex flex-col items-center">
            <div className="flex flex-row gap-4">
              <button
                onClick={() => setShowMore(v => !v)}
                className="px-6 py-2 rounded-full bg-accent text-accent-foreground font-semibold shadow hover:bg-accent/90 transition-colors"
              >
                {showMore ? 'Hide details' : 'More details'}
              </button>
              <a
                href="https://chat.whatsapp.com/Ddh57KVcVqz8MVBpnftBL1" // TODO: Replace with actual group link
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 rounded-full bg-white text-black font-semibold shadow border border-border/40 hover:bg-gray-100 transition-colors flex items-center"
              >
                Join Whatsapp group
              </a>
            </div>
            {showMore && (
              <div className="mt-6 max-w-2xl text-center text-foreground/80 text-base bg-card/30 rounded-xl p-6 border border-border/30 shadow">
                KRONE 2026 is a 24-hour national hackathon beginning February 27th at 9:00 AM. From the initial Idea Selection to the grueling All-Night Coding Marathon, participants will be pushed to their creative limits. Supported by continuous meals and midnight refreshments, teams will race against the clock to present their Final Prototypes by the morning of Day 2. The event culminates in a grand Closing Ceremony on February 28th. No Sleep. Pure Innovation.
              </div>
            )}
          </div>
        </div>

        {/* Hospitality & Logistics */}
        <div>
          <h3 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            <span className="text-accent">Hospitality</span> & Logistics
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {logistics.map((section, index) => {
              const IconComponent = section.icon
              return (
                <div key={index} className="space-y-6 p-6 rounded-lg border border-border/50 bg-card/20 hover:bg-card/30 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-accent/10">
                      <IconComponent className="w-5 h-5 text-accent" />
                    </div>
                    <h4 className="text-lg font-bold text-white">{section.title}</h4>
                  </div>
                  <ul className="space-y-3">
                    {section.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-3 text-foreground/80">
                        <Check className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
