import Image from "next/image"
import Link from "next/link"
import type { Player } from "@/data/players"

/**
 * PlayerCard component - displays a player summary in a card format.
 * Each card links to the player's dedicated SEO-optimized page.
 * Uses semantic HTML and proper alt text for accessibility.
 *
 * The internal link structure from these cards is important for SEO:
 * - Passes link equity to individual player pages
 * - Uses descriptive anchor text (player name) for context
 * - Clean URL structure: /players/[slug]
 */
export function PlayerCard({ player }: { player: Player }) {
  return (
    <Link
      href={`/players/${player.slug}`}
      className="group block overflow-hidden rounded-lg border border-border bg-card transition-all hover:border-primary/30 hover:shadow-lg"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
        <Image
          src={player.image || "/placeholder.svg"}
          alt={`${player.name} - ${player.team} ${player.position}`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Position badge */}
        <div className="absolute left-3 top-3 rounded-md bg-primary px-2.5 py-1 text-xs font-semibold text-primary-foreground">
          {player.position}
        </div>
      </div>

      <div className="flex flex-col gap-3 p-4">
        {/* Player name and team */}
        <div>
          <h3 className="text-lg font-bold tracking-tight text-card-foreground group-hover:text-primary transition-colors">
            {player.name}
          </h3>
          <p className="text-sm text-muted-foreground">{player.team}</p>
        </div>

        {/* Stats row */}
        <div className="flex items-center gap-4 rounded-md bg-muted/60 px-3 py-2">
          <div className="flex flex-col items-center">
            <span className="text-lg font-bold text-foreground">
              {player.goals}
            </span>
            <span className="text-xs text-muted-foreground">Goals</span>
          </div>
          <div className="h-8 w-px bg-border" />
          <div className="flex flex-col items-center">
            <span className="text-lg font-bold text-foreground">
              {player.assists}
            </span>
            <span className="text-xs text-muted-foreground">Assists</span>
          </div>
          <div className="h-8 w-px bg-border" />
          <div className="flex flex-col items-center">
            <span className="text-lg font-bold text-foreground">
              {player.appearances}
            </span>
            <span className="text-xs text-muted-foreground">Apps</span>
          </div>
        </div>

        {/* Nationality */}
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-3.5 w-3.5"
            aria-hidden="true"
          >
            <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          {player.nationality}
        </div>
      </div>
    </Link>
  )
}
