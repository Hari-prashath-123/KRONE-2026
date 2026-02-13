'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Image
              src="/KRONE%20LOGO.jpg"
              alt="KRONE Logo"
              width={96}
              height={96}
              loading="eager"
              priority
              className="h-20 w-20 object-contain"
            />
            <span className="text-lg font-bold text-white hidden sm:inline">KRONE</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#about" className="text-sm font-medium text-foreground/80 hover:text-accent transition-colors">
              Details
            </a>
            <a href="#schedule" className="text-sm font-medium text-foreground/80 hover:text-accent transition-colors">
              Schedule
            </a>
            <a href="#rules" className="text-sm font-medium text-foreground/80 hover:text-accent transition-colors">
              Evaluation
            </a>
            <a href="#sponsors" className="text-sm font-medium text-foreground/80 hover:text-accent transition-colors">
              Sponsors
            </a>
          </div>

          {/* Register Button */}
          <div className="hidden md:flex gap-3">
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-sm px-6 py-2 rounded-full"
            >
              Register Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-card/50 rounded-lg transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-3 border-t border-border/50 pt-4">
            <a href="#about" className="block text-sm font-medium hover:text-accent transition-colors">
              Details
            </a>
            <a href="#schedule" className="block text-sm font-medium hover:text-accent transition-colors">
              Schedule
            </a>
            <a href="#rules" className="block text-sm font-medium hover:text-accent transition-colors">
              Evaluation
            </a>
            <a href="#sponsors" className="block text-sm font-medium hover:text-accent transition-colors">
              Sponsors
            </a>
            <Button
              size="sm"
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold rounded-full"
            >
              Register Now
            </Button>
          </div>
        )}
      </div>
    </nav>
  )
}
