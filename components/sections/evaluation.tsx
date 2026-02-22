'use client'

import { Card } from '@/components/ui/card'
import { Lightbulb, Wrench, Sparkles, Zap, Target } from 'lucide-react'

export function Evaluation() {
  const rounds = [
    {
      number: 1,
      title: 'Idea Presentation',
      description: 'Present your innovative idea to the judges. This round focuses on the novelty, feasibility, and potential impact of your proposed solution.',
      icon: Lightbulb
    },
    {
      number: 2,
      title: 'Project Prototype Demo',
      description: 'Showcase your complete working prototype.',
      icon: Wrench
    },
    {
      number: 3,
      title: 'Final Project Presentation',
      description: 'Showcase your complete working Project. Demonstrate how your solution addresses real-world problems using AI and emerging technologies.',
      icon: Wrench
    },
  ]

  const criteria = [
    {
      title: 'Innovation',
      description: 'Creativity and novelty of the solution approach',
      icon: Sparkles
    },
    {
      title: 'Implementation',
      description: 'Quality and completeness of the prototype',
      icon: Zap
    },
    {
      title: 'Impact',
      description: 'Potential real-world application and benefits',
      icon: Target
    },
  ]

  return (
    <section id="rules" className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-3 mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold">
            Evaluation <span className="text-accent">Process</span>
          </h2>
          <p className="text-foreground/60">Three intensive rounds of competition and expert judging</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {rounds.map((round) => {
            const IconComponent = round.icon
            return (
              <Card
                key={round.number}
                className="relative overflow-hidden border border-border/50 bg-card/20 hover:bg-card/40 transition-all hover:border-accent/50 group"
              >
                <div className="p-10 space-y-6">
                  {/* Round number circle */}
                  <div className="inline-flex">
                    <div className="w-14 h-14 rounded-full border-2 border-accent/30 group-hover:border-accent flex items-center justify-center transition-colors bg-accent/5 group-hover:bg-accent/10">
                      <span className="text-2xl font-bold text-accent">{round.number}</span>
                    </div>
                  </div>

                  {/* Icon */}
                  <div className="p-3 rounded-lg bg-accent/10 w-fit group-hover:bg-accent/20 transition-colors">
                    <IconComponent className="w-6 h-6 text-accent" />
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="text-2xl font-bold mb-2 text-white">{round.title}</h3>
                    <p className="text-foreground/70 text-sm leading-relaxed">{round.description}</p>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        {/* Judging Criteria */}
        <div className="space-y-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold">
              Judging <span className="text-accent">Criteria</span>
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {criteria.map((criterion, index) => {
              const CriterionIcon = criterion.icon
              return (
                <div
                  key={index}
                  className="bg-card/20 border border-border/50 rounded-lg p-8 text-center hover:border-accent/50 hover:bg-card/30 transition-all group"
                >
                  <div className="flex justify-center mb-4">
                    <div className="p-3 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors">
                      <CriterionIcon className="w-6 h-6 text-accent" />
                    </div>
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">{criterion.title}</h4>
                  <p className="text-foreground/60 text-sm">{criterion.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
