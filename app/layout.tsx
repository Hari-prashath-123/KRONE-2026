import React from "react"
import type { Metadata } from 'next'
// Removed font imports from `next/font/google` to avoid Turbopack internal import errors
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

// font setup removed — fonts can be added via CSS or a stable font loader

export const metadata: Metadata = {
  title: 'KRONE - 24-Hour National Level Hackathon',
  description: 'Join KRONE, a 24-hour national level hackathon organized by the Department of Artificial Intelligence at K. Ramakrishnan College of Technology. Solve real-world problems using AI & emerging technologies.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
