'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface GlowMenuProps {
  items: Array<{
    label: string
    href: string
  }>
  className?: string
}

export const GlowMenu: React.FC<GlowMenuProps> = ({ items, className }) => {
  return (
    <div className={cn('relative', className)}>
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-accent/5 to-transparent blur-xl rounded-full pointer-events-none" />
      
      {/* Border glow */}
      <div className="absolute inset-0 rounded-full border border-accent/20 shadow-[0_0_20px_rgba(212,175,55,0.3)]" />
      
      {/* Menu items */}
      <div className="relative flex items-center gap-2 px-6 py-3 backdrop-blur-sm">
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <a
              href={item.href}
              className="text-sm font-medium text-foreground/80 hover:text-accent transition-colors relative group px-3 py-1"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-accent to-transparent group-hover:w-full transition-all duration-300" />
            </a>
            {index < items.length - 1 && (
              <div className="w-px h-4 bg-gradient-to-b from-transparent via-accent/30 to-transparent" />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}
