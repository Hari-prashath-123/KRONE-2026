'use client'

import Image from 'next/image'
import { Mail, MapPin, Phone, Facebook, Instagram, Linkedin } from 'lucide-react'

export function Footer() {
  const coordinators = [
    { name: 'M.A. Reetha Jeyarani', role: 'Event Coordinator' },
    { name: 'P.B. Aravind Prasad', role: 'Technical Lead' },
    { name: 'Vasunthara Devi', role: 'Logistics Coordinator' },
    { name: 'A. Joshua Issac', role: 'Student Coordinator' },
    { name: 'D. Deena Rose', role: 'Support Coordinator' },
  ]

  return (
    <footer className="bg-card/30 border-t border-border/50 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          

          {/* Location */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Location</h3>
            <div className="flex gap-2">
              <MapPin className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
              <p className="text-foreground/70 text-sm leading-relaxed">
                K. Ramakrishnan College of Technology
                <br />
                Samayapuram, Tiruchirappalli
                <br />
                Tamil Nadu, India
              </p>
            </div>
          </div>
        </div>

        {/* Clubs / Partners (compact side-by-side profiles) */}
        <div className="py-6 border-t border-border/50">
          <h3 className="text-lg font-bold mb-4 text-white">Clubs</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Agen */}
            <div className="flex items-center justify-between gap-4 p-3 rounded-lg bg-background/10 border border-border/30">
              <div className="flex items-center gap-3">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/agen%20club%20logo-Mya05gG6Cn7o7p4sh5QDCjDDH48sjG.jpg"
                  alt="Agen Club"
                  width={40}
                  height={40}
                  className="h-8 w-8 object-contain rounded-full border border-accent/20"
                />
                <div>
                  <p className="font-semibold text-white">Agen Club</p>
                  <p className="text-xs text-foreground/60">AI community</p>
                  <div className="mt-2 text-xs text-foreground/60 flex flex-col gap-1">
                    <a href="mailto:hariprashath.ad23@krct.ac.in" className="flex items-center gap-2 hover:text-accent">
                      <Mail className="w-4 h-4" />
                      <span>hariprashath.ad23@krct.ac.in</span>
                    </a>
                    <a href="tel:+919944227061" className="flex items-center gap-2 hover:text-accent">
                      <Phone className="w-4 h-4" />
                      <span>+91 9944227061</span>
                    </a>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href="https://www.instagram.com/_agen_club"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/60 hover:text-accent transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/agen-club-296843394"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/60 hover:text-accent transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Aegis */}
            <div className="flex items-center justify-between gap-4 p-3 rounded-lg bg-background/10 border border-border/30">
              <div className="flex items-center gap-3">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Aegis%20club%20logo-yMYVAwB5oZQj39FR6ZNY9jiXu7HPLN.jpeg"
                  alt="Aegis Club"
                  width={40}
                  height={40}
                  className="h-8 w-8 object-contain rounded-full border border-accent/20"
                />
                <div>
                  <p className="font-semibold text-white">Aegis Club</p>
                  <p className="text-xs text-foreground/60">Security & tech</p>
                  <div className="mt-2 text-xs text-foreground/60 flex flex-col gap-1">
                    <a href="mailto:dharshini.ad23@krct.ac.in" className="flex items-center gap-2 hover:text-accent">
                      <Mail className="w-4 h-4" />
                      <span>dharshini.ad23@krct.ac.in</span>
                    </a>
                    <a href="tel:+916374149654" className="flex items-center gap-2 hover:text-accent">
                      <Phone className="w-4 h-4" />
                      <span>+91 6374149654</span>
                    </a>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href="https://www.instagram.com/aegis.krct/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/60 hover:text-accent transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/aegis-krct/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/60 hover:text-accent transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
            <div className="flex items-center justify-between gap-4 p-3 rounded-lg bg-background/10 border border-border/30">
              <div className="flex items-center gap-3">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/brainiac%20club%20logo-imkB55WSgCU2UBy8PryHmyFgpBKwxe.jpeg"
                  alt="Brainiac Syndicate"
                  width={40}
                  height={40}
                  className="h-8 w-8 object-contain rounded-full border border-accent/20"
                />
                <div>
                  <p className="font-semibold text-white">Brainiac Syndicate</p>
                  <p className="text-xs text-foreground/60">AI & IoT</p>
                  <div className="mt-2 text-xs text-foreground/60 flex flex-col gap-1">
                    <a href="mailto:sibichakkaravarthi.ad23@krct.ac.in" className="flex items-center gap-2 hover:text-accent">
                      <Mail className="w-4 h-4" />
                      <span>sibichakkaravarthi.ad23@krct.ac.in</span>
                    </a>
                    <a href="tel:+919943948315" className="flex items-center gap-2 hover:text-accent">
                      <Phone className="w-4 h-4" />
                      <span>+91 9943948315</span>
                    </a>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href="https://www.instagram.com/brainiacsyndicate"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/60 hover:text-accent transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/brainiacsyndicate/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/60 hover:text-accent transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Coordinators */}
        <div className="py-12 border-t border-border/50">
          <h3 className="text-lg font-bold mb-6 text-white">Event Team</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {coordinators.map((coordinator, index) => (
              <div
                key={index}
                className="bg-background/30 border border-border/50 rounded-lg p-4 text-center hover:border-accent/50 hover:bg-background/50 transition-all group"
              >
                <p className="font-semibold text-sm text-white mb-1 group-hover:text-accent transition-colors">{coordinator.name}</p>
                
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-foreground/60">
            © 2026 KRONE - Department of Artificial Intelligence. All rights reserved.
          </p>
          
        </div>
      </div>
    </footer>
  )
}
