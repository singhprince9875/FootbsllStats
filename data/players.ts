/**
 * Players Dataset for Programmatic SEO
 *
 * KEYWORD RESEARCH (Programmatic SEO Strategy):
 * - Primary keywords: "football player stats", "soccer player profile"
 * - Secondary keywords: "player performance analysis", "[player name] stats"
 * - Long-tail keywords: "[player name] goals assists", "[player name] [team] stats"
 *
 * Each player page targets long-tail keywords like "Lionel Messi Inter Miami stats"
 * which have high search intent and lower competition. This is the core of
 * programmatic SEO — generating hundreds of optimized pages from structured data.
 *
 * WHY SSR (Server-Side Rendering) FOR SEO:
 * - Search engine crawlers receive fully rendered HTML on every request
 * - Dynamic meta tags (title, description, OG tags) are present in the initial HTML
 * - JSON-LD structured data is embedded server-side, ensuring Google can parse it
 * - No client-side JavaScript execution needed for crawlers to index content
 * - Fresh data on every request means search engines always see up-to-date stats
 */

export interface Player {
  name: string
  slug: string
  team: string
  position: string
  nationality: string
  age: number
  goals: number
  assists: number
  appearances: number
  image: string
  description: string
}

/**
 * HOW PROGRAMMATIC SEO WORKS:
 * Each player object below generates a unique, SEO-optimized page at /players/[slug].
 * The slug is used for clean, keyword-rich URLs (e.g., /players/lionel-messi).
 * Meta tags, JSON-LD schema, and page content are all generated dynamically
 * from this data, allowing us to scale to hundreds or thousands of pages
 * with minimal effort while maintaining SEO best practices.
 */
export const players: Player[] = [
  {
    name: "Lionel Messi",
    slug: "lionel-messi",
    team: "Inter Miami CF",
    position: "Forward",
    nationality: "Argentina",
    age: 38,
    goals: 838,
    assists: 377,
    appearances: 1068,
    image: "https://upload.wikimedia.org/wikipedia/commons/8/89/Lionel_Messi_2022.jpg",
    description:
      "Widely regarded as one of the greatest football players of all time, Lionel Messi has broken countless records throughout his illustrious career. An eight-time Ballon d'Or winner, Messi led Argentina to World Cup glory in 2022. He now plays for Inter Miami CF in MLS, continuing to showcase his extraordinary vision, dribbling, and finishing ability.",
  },
  {
    name: "Cristiano Ronaldo",
    slug: "cristiano-ronaldo",
    team: "Al Nassr",
    position: "Forward",
    nationality: "Portugal",
    age: 41,
    goals: 921,
    assists: 264,
    appearances: 1257,
    image: "/images/players/cristiano-ronaldo.jpg",
    description:
      "Cristiano Ronaldo is a footballing phenomenon whose relentless drive and physical prowess have earned him five Ballon d'Or awards. With a record-breaking career spanning Manchester United, Real Madrid, Juventus, and now Al Nassr, Ronaldo holds the record for most international goals scored. His aerial ability, pace, and lethal finishing make him one of the most complete forwards ever.",
  },
  {
    name: "Kylian Mbappe",
    slug: "kylian-mbappe",
    team: "Real Madrid",
    position: "Forward",
    nationality: "France",
    age: 27,
    goals: 312,
    assists: 138,
    appearances: 484,
    image: "/images/players/kylian-mbappe.jpg",
    description:
      "Kylian Mbappe is one of the most exciting young talents in world football. The French superstar became a World Cup winner at just 19 years old and has since established himself as one of the most prolific forwards in the game. Now at Real Madrid, Mbappe combines electrifying pace with clinical finishing and exceptional dribbling skills.",
  },
  {
    name: "Erling Haaland",
    slug: "erling-haaland",
    team: "Manchester City",
    position: "Striker",
    nationality: "Norway",
    age: 25,
    goals: 287,
    assists: 58,
    appearances: 331,
    image: "/images/players/erling-haaland.jpg",
    description:
      "Erling Haaland is a goal-scoring machine who has redefined the modern striker role. Standing at 6'4\", the Norwegian powerhouse combines raw physicality with remarkable technique and lightning pace. Since joining Manchester City, Haaland has shattered Premier League scoring records and continues to terrorize defenses across Europe with his extraordinary finishing instincts.",
  },
  {
    name: "Jude Bellingham",
    slug: "jude-bellingham",
    team: "Real Madrid",
    position: "Midfielder",
    nationality: "England",
    age: 22,
    goals: 68,
    assists: 54,
    appearances: 289,
    image: "/images/players/jude-bellingham.jpg",
    description:
      "Jude Bellingham burst onto the world stage as a teenager at Birmingham City before starring at Borussia Dortmund and earning a blockbuster move to Real Madrid. The English midfielder is known for his box-to-box dynamism, technical skill, and remarkable composure under pressure. He has quickly become one of the most complete midfielders in world football.",
  },
  {
    name: "Vinicius Junior",
    slug: "vinicius-junior",
    team: "Real Madrid",
    position: "Winger",
    nationality: "Brazil",
    age: 25,
    goals: 108,
    assists: 97,
    appearances: 316,
    image: "/images/players/vinicius-junior.jpg",
    description:
      "Vinicius Junior is a Brazilian winger whose dazzling dribbling and explosive pace make him one of the most thrilling players to watch. A key player for Real Madrid, Vinicius scored the winning goal in the 2022 Champions League final and has established himself as one of the best wide players in world football. His ability to beat defenders one-on-one is virtually unmatched.",
  },
]

/**
 * Utility function to find a player by their URL slug.
 * Used in dynamic route pages for programmatic SEO page generation.
 */
export function getPlayerBySlug(slug: string): Player | undefined {
  return players.find((player) => player.slug === slug)
}

/**
 * Get all player slugs for generating static paths or sitemap entries.
 * Essential for programmatic SEO - tells search engines about all available pages.
 */
export function getAllPlayerSlugs(): string[] {
  return players.map((player) => player.slug)
}
