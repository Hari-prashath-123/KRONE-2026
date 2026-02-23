'use client'

import Image from 'next/image'
import { MetallicCard } from '@/components/ui/metallic-card'
import { Trophy, CreditCard, Users, Zap, Utensils, Clock, Coffee, Check } from 'lucide-react'
import { useState } from 'react'

export function EventDetails() {
  const details = [
    {
      title: 'Prize Pool',
      value: '₹14,000',
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

  const shortlisted = [
    { no: 1, team: 'Info-tech innovators', college: "J.J.College of engineering and technology" },
    { no: 2, team: 'TEAM ANTAGONIST', college: 'Kongunadu arts and science college' },
    { no: 3, team: "Panda’s", college: 'Sudharsan engineering college' },
    { no: 4, team: 'cloud tech', college: 'saranathan college of engineering' },
    { no: 5, team: 'GRIFFINS', college: 'Saranathan College Of Engineering' },
    { no: 6, team: 'Dracarys', college: 'Saranathan College of Engineering' },
    { no: 7, team: 'InfiniX', college: 'Saranathan College of Engineering' },
    { no: 8, team: 'Rage Coders', college: 'SNS College of Engineering' },
    { no: 9, team: 'BaitBlockers', college: 'Saranathan College of Engineering' },
    { no: 10, team: 'PHOENIX', college: 'Saranathan College of Engineering' },
    { no: 11, team: 'PlinkX', college: 'Kalasalingam Academy of Research And Education' },
    { no: 12, team: 'TechVengers', college: 'M.I.E.T. Engineering College' },
    { no: 13, team: 'CODEVENGERS', college: 'Dhanalakshmi srinivasan university' },
    { no: 14, team: 'QUANTUM  FIVE', college: 'DHANALAKSHMI SRINIVASAN UNIVERSITY SCHOOL OF ENGINEERING AND TECHNOLOGY' },
    { no: 15, team: 'AI Avengers', college: 'KALASALINGAM ACADEMY OF RESEARCH AND EDUCATION' },
    { no: 16, team: 'Syntax Squad', college: 'kalasalingam University' },
    { no: 17, team: 'Intellivium', college: 'Saranathan College of Engineering' },
    { no: 18, team: 'Tri-coders', college: 'Dhanalakshmi srinivasan university' },
    { no: 19, team: 'Tech Dudes', college: 'Saranathan College of Engineering' },
    { no: 20, team: 'Innovibe', college: 'Dhanalakshmi Srinivasan Engineering College' },
    { no: 21, team: 'Team Undefeatable 2.0', college: 'Sudharshan Engineering College' },
    { no: 22, team: 'Innovtech', college: 'Kalasalingam academy of research and education' },
    { no: 23, team: 'Rzx', college: 'Kalasalingam university' },
    { no: 24, team: 'team impactx', college: 'Kalasalingam university' },
    { no: 25, team: 'Error 404', college: 'M.I.E.T ENGINEERING COLLEGE TRICHY' },
    { no: 26, team: 'Coders', college: 'Kalasalingam of research academy' },
    { no: 27, team: 'Team kage', college: 'KALASALINGAM ACADEMEY OF RESEARCH AND EDUCATION' },
    { no: 28, team: 'PushPullProphecy', college: 'Sudharsan Engineering College' },
    { no: 29, team: 'Tech titans', college: 'Alagappa Chettiar Government College of Engineering and Technology' },
    { no: 30, team: 'Ethical Hackers', college: 'Dhanalakshmi Srinivasan University' },
  ]
  const [showShortlisted, setShowShortlisted] = useState(false)
  return (
    <section id="about" className="py-24 bg-background relative z-0">
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
                  className="relative z-0"
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
                KRONE 2026 is a 24-hour national hackathon beginning February 27th at 9:00 AM. From the initial Idea Selection to the grueling All-Night Coding Marathon, participants will be pushed to their creative limits. Supported by continuous meals and midnight refreshments, teams will race against the clock to present their Final Prototypes by the morning of Day 2. The event culminates in a grand Closing Ceremony on February 28th. Registration Ends at 23/02/2026. No Sleep. Pure Innovation.
              </div>
            )}
          </div>
          <center>
          <div className="mt-6">
              <a href="/poster.jpeg" target="_blank" rel="noopener noreferrer" className="block">
                <Image
                  src="/poster.jpeg"
                  alt="KRONE 2026 Poster"
                  width={900}
                  height={1200}
                  className="w-full max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl object-contain rounded-lg shadow-md border border-border/20"
                />
              </a>
            </div>
            </center>
        </div>

        {/* Shortlisted Teams */}
        <div className="mb-12">
          <div className="space-y-3 mb-6 text-center">
            <h3 className="text-3xl md:text-4xl font-bold">
              <span className="text-accent">Shortlisted</span> Teams
            </h3>
            <p className="text-foreground/60">Top 30 teams shortlisted for KRONE 2026</p>
          </div>
          <div className="flex items-center justify-center mb-4">
            <button
              onClick={() => setShowShortlisted(s => !s)}
              className="px-5 py-2 rounded-full bg-accent text-accent-foreground font-semibold shadow hover:bg-accent/90 transition-colors"
            >
              {showShortlisted ? 'Hide shortlisted teams' : 'View shortlisted teams'}
            </button>
          </div>

          {showShortlisted && (
            <div className="overflow-x-auto rounded-xl border-2 border-[#D4AF37] bg-card/10 shadow-lg">
              <table className="min-w-full table-auto border-collapse">
                <thead className="bg-card/20">
                  <tr className="border-b-2 border-[#D4AF37]">
                    <th className="px-4 py-3 text-left text-sm font-semibold text-[#D4AF37] tracking-wide border-r border-[#D4AF37]/30">S.No</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-[#D4AF37] tracking-wide border-r border-[#D4AF37]/30">Team Name</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-[#D4AF37] tracking-wide">College</th>
                  </tr>
                </thead>
                <tbody className="bg-transparent">
                  {shortlisted.map((row) => (
                    <tr key={row.no} className="odd:bg-card/10 even:bg-transparent hover:bg-card/30 transition-colors border-b border-[#D4AF37]/10">
                      <td className="px-4 py-3 text-sm text-foreground/80 border-r border-[#D4AF37]/20">{row.no}</td>
                      <td className="px-4 py-3 text-sm font-semibold text-white border-r border-[#D4AF37]/20">{row.team}</td>
                      <td className="px-4 py-3 text-sm text-foreground/80">{row.college}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
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
                <div key={index} className="space-y-6 p-6 rounded-lg border border-border/50 bg-card/20 hover:bg-card/30 transition-colors relative z-0">
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
