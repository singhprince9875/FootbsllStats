import type { Metadata } from "next"
import { players } from "@/data/players"
import { PlayerCard } from "@/components/player-card"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import Link from "next/link"

/**
 * HOMEPAGE SEO METADATA
 *
 * Dynamic metadata for the homepage targeting primary keywords:
 * - "football player stats" (high search volume)
 * - "soccer player profiles" (targets US audience who say "soccer")
 *
 * OpenGraph tags ensure rich previews when shared on social media,
 * which drives traffic and improves click-through rates from social platforms.
 */
export const metadata: Metadata = {
  title: "FootballStats - Football Player Stats, Profiles & Performance Analysis",
  description:
    "Explore comprehensive football player statistics, profiles, and performance analysis. Get detailed stats on goals, assists, and more for top soccer players worldwide.",
  keywords: [
    "football player stats",
    "soccer player profile",
    "player performance analysis",
    "football statistics",
    "soccer player stats",
  ],
  openGraph: {
    title: "FootballStats - Football Player Stats & Profiles",
    description:
      "Explore comprehensive football player statistics, profiles, and performance analysis for top players worldwide.",
    type: "website",
    url: "https://footballstats.vercel.app",
    siteName: "FootballStats",
  },
}

/**
 * Homepage - SSR Landing Page
 *
 * WHY SSR FOR THE HOMEPAGE:
 * - Ensures search engines see fully rendered content with all player links
 * - Internal links to player pages help distribute PageRank
 * - Fresh data on every request (important if stats were from a live API)
 * - Meta tags are embedded server-side for proper indexing
 *
 * PROGRAMMATIC SEO STRATEGY:
 * The homepage acts as a hub page that links to all individual player pages.
 * This "hub and spoke" structure is a proven SEO architecture that:
 * 1. Helps crawlers discover all pages efficiently
 * 2. Concentrates topical authority on the main keyword cluster
 * 3. Distributes link equity to deeper pages
 */
export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-primary py-20 md:py-28">
          <div className="absolute inset-0 opacity-10">
            <svg
              className="h-full w-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <pattern
                id="grid"
                width="10"
                height="10"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 10 0 L 0 0 0 10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  className="text-primary-foreground"
                />
              </pattern>
              <rect width="100" height="100" fill="url(#grid)" />
            </svg>
          </div>
          <div className="relative mx-auto max-w-6xl px-4 text-center">
            <h1 className="text-balance text-4xl font-bold tracking-tight text-primary-foreground md:text-6xl lg:text-7xl">
              Football Player Stats
              <br />
              <span className="text-primary-foreground/80">
                {"& Performance Analysis"}
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-primary-foreground/70 md:text-xl">
              Comprehensive statistics, profiles, and performance data for the
              world's top football players. Explore detailed stats, career
              histories, and more.
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <Link
                href="#players"
                className="inline-flex items-center gap-2 rounded-lg bg-background px-6 py-3 text-sm font-semibold text-foreground shadow-lg transition-colors hover:bg-background/90"
              >
                Explore Players
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                  aria-hidden="true"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* Stats Overview */}
        <section className="border-b border-border bg-muted/30 py-12">
          <div className="mx-auto max-w-6xl px-4">
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
              <div className="flex flex-col items-center gap-1 text-center">
                <span className="text-3xl font-bold text-foreground md:text-4xl">
                  {players.length}
                </span>
                <span className="text-sm text-muted-foreground">
                  Player Profiles
                </span>
              </div>
              <div className="flex flex-col items-center gap-1 text-center">
                <span className="text-3xl font-bold text-foreground md:text-4xl">
                  {players.reduce((sum, p) => sum + p.goals, 0).toLocaleString()}
                </span>
                <span className="text-sm text-muted-foreground">
                  Total Goals
                </span>
              </div>
              <div className="flex flex-col items-center gap-1 text-center">
                <span className="text-3xl font-bold text-foreground md:text-4xl">
                  {players
                    .reduce((sum, p) => sum + p.assists, 0)
                    .toLocaleString()}
                </span>
                <span className="text-sm text-muted-foreground">
                  Total Assists
                </span>
              </div>
              <div className="flex flex-col items-center gap-1 text-center">
                <span className="text-3xl font-bold text-foreground md:text-4xl">
                  {players
                    .reduce((sum, p) => sum + p.appearances, 0)
                    .toLocaleString()}
                </span>
                <span className="text-sm text-muted-foreground">
                  Total Appearances
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Player Grid Section */}
        <section id="players" className="py-16 md:py-20">
          <div className="mx-auto max-w-6xl px-4">
            <div className="mb-10 text-center">
              <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                Featured Players
              </h2>
              <p className="mt-3 text-pretty text-muted-foreground">
                Explore detailed statistics and profiles for top football
                players from around the world.
              </p>
            </div>

            {/*
             * Player cards grid - each card links to a unique SEO-optimized page.
             * The grid uses responsive columns: 1 on mobile, 2 on tablet, 3 on desktop.
             */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {players.map((player) => (
                <PlayerCard key={player.slug} player={player} />
              ))}
            </div>
          </div>
        </section>

        {/* SEO Content Section - adds keyword-rich content for search engines */}
        <section className="border-t border-border bg-muted/30 py-16">
          <div className="mx-auto max-w-6xl px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-balance text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                Your Source for Football Player Statistics
              </h2>
              <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
                FootballStats provides comprehensive football player statistics
                and performance analysis. Whether you're looking for soccer
                player profiles, career stats, or performance data, our platform
                covers the top players in world football. From goal-scoring
                records to assist tallies, we offer detailed breakdowns of
                player performance across all major leagues and competitions.
              </p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
