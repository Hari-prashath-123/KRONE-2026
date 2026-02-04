'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface MetallicCardProps {
  children: React.ReactNode
  className?: string
  icon?: React.ReactNode
  title?: string
  description?: string
}

export const MetallicCard: React.FC<MetallicCardProps> = ({
  children,
  className = '',
  icon,
  title,
  description,
}) => {
  return (
    <div className={cn('relative overflow-hidden rounded-xl group', className)}>
      {/* Metallic silver border effect */}
      <div className="absolute inset-0 rounded-xl border-2 border-transparent bg-gradient-to-br from-secondary/40 via-secondary/10 to-background bg-clip-padding pointer-events-none" />
      
      {/* Inner metallic glow */}
      <div className="absolute inset-1 rounded-lg bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Outer glow effect on hover */}
      <div className="absolute -inset-0.5 bg-gradient-to-br from-secondary/30 to-transparent rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
      
      {/* Content */}
      <div className="relative z-10 p-8 space-y-4 bg-card/40 backdrop-blur-sm">
        {icon && (
          <div className="p-3 w-fit rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors">
            {icon}
          </div>
        )}
        {title && (
          <h3 className="text-xl font-bold text-white">{title}</h3>
        )}
        {description && (
          <p className="text-sm text-foreground/70">{description}</p>
        )}
        {children && !title && !description && children}
      </div>
    </div>
  )
}
