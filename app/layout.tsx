import React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Space_Mono } from "next/font/google"

import "./globals.css"

const _inter = Inter({ subsets: ["latin"] })
const _spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
})

/**
 * ROOT LAYOUT - Global SEO Configuration
 *
 * The metadata here provides default SEO tags for all pages.
 * Individual pages can override these with their own metadata.
 * This is important for:
 * - Setting a consistent site name for brand recognition
 * - Providing fallback meta tags for pages without custom metadata
 * - Configuring robots directives for crawler behavior
 */
export const metadata: Metadata = {
  title: {
    default: "FootballStats - Football Player Stats & Performance Analysis",
    template: "%s | FootballStats",
  },
  description:
    "Explore comprehensive football player statistics, profiles, and performance analysis for top soccer players worldwide.",
  keywords: [
    "football player stats",
    "soccer player profile",
    "player performance analysis",
  ],
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased min-h-screen bg-background text-foreground">
        {children}
      </body>
    </html>
  )
}
