'use client'

import { MetallicCard } from '@/components/ui/metallic-card'
import { Trophy, CreditCard, Users, Zap, Utensils, Clock, Coffee, Check } from 'lucide-react'

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
      value: '₹1,500',
      icon: CreditCard,
      description: 'Per Team'
    },
    {
      title: 'Team Size',
      value: '3-5 Members',
      icon: Users,
      description: 'Min: 3 | Max: 5'
    },
    {
      title: 'Theme',
      value: 'AI Solutions',
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
