'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowRight, Mail, Linkedin } from 'lucide-react'

export function Sponsors() {
  return (
    <section id="sponsors" className="py-24 bg-gradient-to-b from-background to-card/10 border-t border-border/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-3 mb-16 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent">
            Our Partners
          </p>
          <h2 className="text-4xl md:text-5xl font-bold">
            Proud <span className="text-accent">Sponsors</span>
          </h2>
          <p className="text-foreground/60 max-w-2xl mx-auto">
            Organizations supporting innovation and excellence
          </p>
        </div>

        <div className="flex items-center justify-center mb-16">
          <div className="bg-card/20 border border-border/50 rounded-lg p-8 hover:border-accent/30 transition-colors backdrop-blur">
            <div className="relative h-28 w-full max-w-3xl mx-auto flex items-center justify-center space-x-8">
              <div className="flex flex-col items-center">
                <a href="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sponsor%20logo-pb9Iunkvu51X6shVoFprkbbsosa2S8.jpg" target="_blank" rel="noopener noreferrer" className="block">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sponsor%20logo-pb9Iunkvu51X6shVoFprkbbsosa2S8.jpg"
                    alt="Sponsor Logos"
                    width={240}
                    height={72}
                    className="h-16 object-contain"
                  />
                </a>

                <div className="w-full flex justify-center mt-2">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-accent/30 hover:border-accent hover:bg-accent/5 text-foreground font-semibold rounded-full gap-2 group bg-transparent"
                    asChild
                  >
                    <a href="https://www.linkedin.com/company/isysway/" target="_blank" rel="noopener noreferrer">
                      <Linkedin className="w-4 h-4" />
                      LinkedIn
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                </div>
              </div>

              <div className="flex flex-col items-center">
                <a href="https://www.linkedin.com/company/moraiscity/" target="_blank" rel="noopener noreferrer" className="block">
                  <Image
                    src="/Sponsor 2.png"
                    alt="MoraisCity"
                    width={160}
                    height={72}
                    className="h-16 object-contain"
                  />
                </a>
                <div className="w-full flex justify-center mt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-accent/30 hover:border-accent hover:bg-accent/5 text-foreground font-semibold rounded-full gap-2 group bg-transparent"
                    asChild
                  >
                    <a href="https://www.linkedin.com/company/moraiscity/" target="_blank" rel="noopener noreferrer">
                      <Linkedin className="w-4 h-4" />
                      LinkedIn
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                </div>
              </div>

              <div className="flex flex-col items-center">
                <Image
                  src="/sponsor 3.png"
                  alt="Sponsor 3"
                  width={160}
                  height={72}
                  className="h-16 object-contain"
                />
                <div className="flex gap-2 mt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-accent/30 hover:border-accent hover:bg-accent/5 text-foreground font-semibold rounded-full gap-2 group bg-transparent"
                    asChild
                  >
                    <a href="https://www.miphi.in" target="_blank" rel="noopener noreferrer">
                      <ArrowRight className="w-4 h-4" />
                      miphi.in
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-accent/30 hover:border-accent hover:bg-accent/5 text-foreground font-semibold rounded-full gap-2 group bg-transparent"
                    asChild
                  >
                    <a href="https://www.hyco.ai" target="_blank" rel="noopener noreferrer">
                      <ArrowRight className="w-4 h-4" />
                      hyco.ai
                    </a>
                  </Button>
                </div>
              </div>
            </div>
            
          </div>
        </div>
        {/* Call to Action */}
        <div className="text-center space-y-6">
          <p className="text-foreground/70 max-w-lg mx-auto">
            Interested in sponsoring KRONE and reaching 100+ brilliant innovators?
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button
              variant="outline"
              size="lg"
              className="border-accent/30 hover:border-accent hover:bg-accent/5 text-foreground font-semibold rounded-full gap-2 group bg-transparent"
              asChild
            >
              <a href="mailto:agenclub.krct@gmail.com">
                <Mail className="w-4 h-4" />
                Contact Organizers
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>

          
          </div>
        </div>
      </div>
    </section>
  )
}
