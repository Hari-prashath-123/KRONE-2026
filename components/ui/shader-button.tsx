'use client'

import React from 'react'

interface ShaderButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
}

export const ShaderButton: React.FC<ShaderButtonProps> = ({
  children,
  onClick,
  className = '',
}) => {
  return (
    <button
      onClick={onClick}
      className={`relative px-8 py-3 font-semibold text-accent-foreground bg-gradient-to-r from-accent via-accent to-secondary rounded-full overflow-hidden group ${className}`}
    >
      {/* Shader effect background */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      
      {/* Glow effect */}
      <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 blur-xl bg-accent/50 transition-opacity duration-300" />
      
      {/* Content */}
      <span className="relative flex items-center justify-center gap-2">
        {children}
      </span>
    </button>
  )
}
