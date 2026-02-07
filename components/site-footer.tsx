import Link from "next/link"
import { players } from "@/data/players"

/**
 * SiteFooter component - site-wide footer with internal links.
 * Internal linking in the footer helps SEO by:
 * 1. Providing crawlers with paths to all important pages
 * 2. Distributing link equity (PageRank) across the site
 * 3. Improving discoverability of deeper pages
 */
export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-muted/50">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div className="flex flex-col gap-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 text-primary-foreground"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                  <path d="M2 12h20" />
                </svg>
              </div>
              <span className="text-lg font-bold tracking-tight text-foreground">
                FootballStats
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Comprehensive football player statistics, profiles, and
              performance analysis. Your go-to source for soccer player data.
            </p>
          </div>

          {/* Player Links - critical for internal linking SEO strategy */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-foreground">
              Player Profiles
            </h3>
            <ul className="flex flex-col gap-2">
              {players.map((player) => (
                <li key={player.slug}>
                  <Link
                    href={`/players/${player.slug}`}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {player.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-foreground">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-2">
              <li>
                <Link
                  href="/"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/#players"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  All Players
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            {"FootballStats. Football player stats and soccer player profiles."}
          </p>
        </div>
      </div>
    </footer>
  )
}
