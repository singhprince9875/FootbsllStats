import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { getPlayerBySlug, getAllPlayerSlugs, players } from "@/data/players"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

/**
 * DYNAMIC PLAYER PAGES - Core of Programmatic SEO
 *
 * URL format: /players/[slug] (e.g., /players/lionel-messi)
 *
 * WHY THIS URL STRUCTURE IS IMPORTANT FOR SEO:
 * - Clean, readable URLs that contain the player's name (keyword-rich)
 * - Hyphens as word separators (Google-recommended)
 * - Logical hierarchy: /players/[name] tells crawlers the page is about a specific player
 *
 * SSR (Server-Side Rendering) with generateMetadata:
 * - Meta tags are generated server-side, so crawlers see them in the initial HTML
 * - Each page gets unique title, description, and OG tags
 * - JSON-LD structured data is embedded for rich search results
 */

interface PlayerPageProps {
  params: Promise<{ slug: string }>
}

/**
 * generateMetadata - Dynamic SEO Meta Tags
 *
 * This function runs on the server and generates unique meta tags for each player page.
 * Search engines use these tags to understand what the page is about and
 * to display rich snippets in search results.
 */
export async function generateMetadata({
  params,
}: PlayerPageProps): Promise<Metadata> {
  const { slug } = await params
  const player = getPlayerBySlug(slug)

  if (!player) {
    return {
      title: "Player Not Found - FootballStats",
      description: "The requested player profile could not be found.",
    }
  }

  /**
   * KEYWORD TARGETING IN META TAGS:
   * - Title includes player name + team + "Stats & Profile" (targets long-tail searches)
   * - Description includes key stats and natural language for search intent
   * - This targets queries like "Lionel Messi Inter Miami stats"
   */
  return {
    title: `${player.name} - ${player.team} | Stats & Profile | FootballStats`,
    description: `${player.name} plays ${player.position} for ${player.team}. Career stats: ${player.goals} goals, ${player.assists} assists in ${player.appearances} appearances. Detailed football player profile and performance analysis.`,
    keywords: [
      `${player.name} stats`,
      `${player.name} ${player.team}`,
      `${player.name} goals assists`,
      "football player stats",
      "soccer player profile",
    ],
    openGraph: {
      title: `${player.name} - ${player.team} Stats & Profile`,
      description: `${player.name} plays ${player.position} for ${player.team}. ${player.goals} goals, ${player.assists} assists in ${player.appearances} appearances.`,
      type: "profile",
      url: `https://footballstats.vercel.app/players/${player.slug}`,
      images: [
        {
          url: player.image,
          width: 600,
          height: 750,
          alt: `${player.name} - ${player.team}`,
        },
      ],
    },
  }
}

/**
 * Generate static params for all player pages.
 * This tells Next.js about all possible [slug] values at build time.
 */
export async function generateStaticParams() {
  return getAllPlayerSlugs().map((slug) => ({ slug }))
}

/**
 * Player Profile Page Component
 *
 * HOW PROGRAMMATIC SEO WORKS HERE:
 * 1. The [slug] in the URL determines which player data to load
 * 2. generateMetadata creates unique SEO tags for each player
 * 3. JSON-LD structured data (SportsPerson schema) is embedded for rich results
 * 4. The page content is fully rendered server-side for crawler accessibility
 * 5. Internal links to other players keep crawlers moving through the site
 */
export default async function PlayerPage({ params }: PlayerPageProps) {
  const { slug } = await params
  const player = getPlayerBySlug(slug)

  if (!player) {
    notFound()
  }

  /**
   * JSON-LD STRUCTURED DATA - SportsPerson Schema
   *
   * This tells Google exactly what this page is about in a machine-readable format.
   * Benefits for SEO:
   * - Enables rich snippets in search results (player info directly in SERP)
   * - Helps Google understand entity relationships (person → team → sport)
   * - Improves chances of appearing in Knowledge Graph
   * - Required for some rich result types in Google Search
   */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: player.name,
    jobTitle: `Professional Football Player - ${player.position}`,
    memberOf: {
      "@type": "SportsTeam",
      name: player.team,
    },
    nationality: {
      "@type": "Country",
      name: player.nationality,
    },
    url: `https://footballstats.vercel.app/players/${player.slug}`,
    image: player.image,
    description: player.description,
  }

  // Get other players for the "More Players" section (internal linking)
  const otherPlayers = players.filter((p) => p.slug !== player.slug)

  return (
    <>
      <SiteHeader />
      <main>
        {/* JSON-LD structured data embedded in the page head */}
        <script
          type="application/ld+json"
          // biome-ignore lint: JSON-LD needs dangerouslySetInnerHTML
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Breadcrumb Navigation - improves UX and SEO */}
        <nav
          aria-label="Breadcrumb"
          className="border-b border-border bg-muted/30"
        >
          <div className="mx-auto max-w-6xl px-4 py-3">
            <ol className="flex items-center gap-2 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/"
                  className="transition-colors hover:text-foreground"
                >
                  Home
                </Link>
              </li>
              <li aria-hidden="true">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-3.5 w-3.5"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </li>
              <li>
                <Link
                  href="/#players"
                  className="transition-colors hover:text-foreground"
                >
                  Players
                </Link>
              </li>
              <li aria-hidden="true">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-3.5 w-3.5"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </li>
              <li>
                <span className="font-medium text-foreground">
                  {player.name}
                </span>
              </li>
            </ol>
          </div>
        </nav>

        {/* Player Hero Section */}
        <section className="py-10 md:py-16">
          <div className="mx-auto max-w-6xl px-4">
            <div className="grid gap-8 md:grid-cols-[350px_1fr] lg:grid-cols-[400px_1fr]">
              {/* Player Image */}
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-border bg-muted">
                <Image
                  src={player.image || "/placeholder.svg"}
                  alt={`${player.name} - ${player.team} ${player.position}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 400px"
                  priority
                />
              </div>

              {/* Player Info */}
              <div className="flex flex-col gap-6">
                {/* Name and quick info */}
                <div>
                  <div className="mb-2 inline-block rounded-md bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                    {player.position}
                  </div>
                  <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
                    {player.name}
                  </h1>
                  <p className="mt-2 text-lg text-muted-foreground">
                    {player.team} &middot; {player.nationality}
                  </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                  <div className="flex flex-col gap-1 rounded-lg border border-border bg-card p-4">
                    <span className="text-3xl font-bold text-foreground">
                      {player.goals}
                    </span>
                    <span className="text-sm text-muted-foreground">Goals</span>
                  </div>
                  <div className="flex flex-col gap-1 rounded-lg border border-border bg-card p-4">
                    <span className="text-3xl font-bold text-foreground">
                      {player.assists}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      Assists
                    </span>
                  </div>
                  <div className="flex flex-col gap-1 rounded-lg border border-border bg-card p-4">
                    <span className="text-3xl font-bold text-foreground">
                      {player.appearances}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      Appearances
                    </span>
                  </div>
                  <div className="flex flex-col gap-1 rounded-lg border border-border bg-card p-4">
                    <span className="text-3xl font-bold text-foreground">
                      {player.age}
                    </span>
                    <span className="text-sm text-muted-foreground">Age</span>
                  </div>
                </div>

                {/* Goals per appearance ratio */}
                <div className="rounded-lg border border-border bg-muted/30 p-4">
                  <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                    Performance Ratios
                  </h2>
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                    <div>
                      <span className="text-xl font-bold text-foreground">
                        {(player.goals / player.appearances).toFixed(2)}
                      </span>
                      <p className="text-xs text-muted-foreground">
                        Goals per App
                      </p>
                    </div>
                    <div>
                      <span className="text-xl font-bold text-foreground">
                        {(player.assists / player.appearances).toFixed(2)}
                      </span>
                      <p className="text-xs text-muted-foreground">
                        Assists per App
                      </p>
                    </div>
                    <div>
                      <span className="text-xl font-bold text-foreground">
                        {(
                          (player.goals + player.assists) /
                          player.appearances
                        ).toFixed(2)}
                      </span>
                      <p className="text-xs text-muted-foreground">
                        G+A per App
                      </p>
                    </div>
                  </div>
                </div>

                {/* Player Description */}
                <div>
                  <h2 className="mb-2 text-lg font-semibold text-foreground">
                    About {player.name}
                  </h2>
                  <p className="text-pretty leading-relaxed text-muted-foreground">
                    {player.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/*
         * "More Players" Section - Internal Linking for SEO
         * Cross-linking between player pages is crucial for programmatic SEO:
         * - Helps search engine crawlers discover all pages
         * - Distributes link equity across the site
         * - Reduces bounce rate by encouraging users to explore more content
         * - Signals to Google that these pages are topically related
         */}
        <section className="border-t border-border bg-muted/30 py-16">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="mb-8 text-center text-2xl font-bold tracking-tight text-foreground">
              More Player Profiles
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {otherPlayers.slice(0, 3).map((p) => (
                <Link
                  key={p.slug}
                  href={`/players/${p.slug}`}
                  className="flex items-center gap-4 rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/30 hover:shadow-md"
                >
                  <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full bg-muted">
                    <Image
                      src={p.image || "/placeholder.svg"}
                      alt={`${p.name} - ${p.team}`}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-card-foreground">
                      {p.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {p.team} &middot; {p.goals} goals
                    </p>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link
                href="/#players"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-6 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
              >
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
                  <path d="m15 18-6-6 6-6" />
                </svg>
                View All Players
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
