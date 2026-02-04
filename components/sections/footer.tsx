'use client'

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
          {/* About */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">KRONE</h3>
            <p className="text-foreground/70 text-sm leading-relaxed">
              A 24-hour national level hackathon bringing together brilliant minds to solve real-world problems using AI and emerging technologies.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Contact</h3>
            <div className="space-y-3 text-sm text-foreground/70">
              <div className="flex items-center gap-2 hover:text-accent transition-colors">
                <Mail className="w-4 h-4" />
                <a href="mailto:contact@krct.ac.in">
                  hariprashath.ad23@krct.ac.in
                </a>
              </div>
              <div className="flex items-center gap-2 hover:text-accent transition-colors">
                <Phone className="w-4 h-4" />
                <a href="tel:+919876543210">
                  +91 9944227061
                </a>
              </div>
            </div>
          </div>

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
          <div className="flex items-center gap-4">
            <a href="#" className="p-2 hover:bg-accent/10 rounded-lg text-foreground/60 hover:text-accent transition-colors">
              <Facebook className="w-5 h-5" />
              <span className="sr-only">Facebook</span>
            </a>
            <a href="#" className="p-2 hover:bg-accent/10 rounded-lg text-foreground/60 hover:text-accent transition-colors">
              <Instagram className="w-5 h-5" />
              <span className="sr-only">Instagram</span>
            </a>
            <a href="#" className="p-2 hover:bg-accent/10 rounded-lg text-foreground/60 hover:text-accent transition-colors">
              <Linkedin className="w-5 h-5" />
              <span className="sr-only">LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
