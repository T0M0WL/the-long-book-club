# The Long Book Club — Gemini Agent Content Specification & Training Guide (Master Strategy & SOP)

> **Last Updated:** October 2026 (Live 463-Book Catalog Sync)  
> **Target Audience:** Gemini Research & Content Agent, NotebookLM, Editorial Assistants  
> **Live Site:** https://thelongbookclub.com

Use this reference to instruct the **Gemini Research & Content Agent** (and **NotebookLM**) on the exact fields, character limits, anti-duplicate-content rules, and formatting needed whenever we add new **Books & Reviews**, **Collections**, **Niche Genres**, or **Journal (Blog) Posts** to `https://thelongbookclub.com`.

---

## 0. The Core Strategic Pivot: From "Just Long Books" to Niche & Trending Subgenre Leadership

### A. Why We Pivoted (The Curation Moat)
Initially, The Long Book Club began with a simple criterion: highlighting audiobooks that are simply very long. However, competing as a raw length filter is a race to the bottom—Audible's native catalog is already flooded with 280-hour public domain dumps, Bible recordings, sleep tracks, and AI bloat that offer zero editorial curation.

### B. Our True Identity: The Tastemaker for Niche & Trending Subgenres
We have deliberately pivoted our master strategy: **Runtime (10+ hours minimum) is merely the entry qualifier** to guarantee listeners maximum return on their monthly Audible credit. Our true competitive moat, traffic driver, and brand authority is **Niche, Emerging & Trending Subgenre Leadership**:

1. **Surfacing What Audible & Traditional Publishers Ignore**:
   Audible lumps titles into clumsy, generic categories (*"Sci-Fi & Fantasy"*, *"Literature & Fiction"*). But modern listeners and communities on Reddit, BookTok, and Discord search by ultra-specific micro-genres, tropes, and aesthetics:
   - **Silkpunk & Asian Fantasy** (Ken Liu, Andrea Stewart)
   - **Progression Fantasy & LitRPG / GameLit** (Matt Dinniman, Domagoj Kurmaić, Shirtaloon)
   - **Grimdark & Moral Ambiguity** (Joe Abercrombie, Jay Kristoff, Steven Erikson)
   - **Cozy Fantasy & Slice-of-Life** (Travis Baldree, Pirateaba, TJ Klune)
   - **Dark Academia & Gothic Lore** (Donna Tartt, R.F. Kuang, Elizabeth Kostova)
   - **Nordic Noir & Scandi Crime** (Stieg Larsson, Jo Nesbø)
   - **Cold War British Espionage** (Mick Herron, John le Carré)
   - **Time Loops & Alternate Histories** (Domagoj Kurmaić, Stephen King, Connie Willis)
   - **Epic Romantasy & Slow-Burn High Fantasy** (Sarah J. Maas, Rebecca Yarros, Jacqueline Carey)
   - **Cinematic Dramatisations & Full-Cast Audio** (GraphicAudio, Neil Gaiman, Travis Beacham)

2. **The Dual Superpower: Niche Discovery + Narrator Craft**:
   By pairing **niche subgenre expertise** with our **Narrator Soundchecks & Hubs**, we solve the two biggest pain points in modern audio fiction:
   - *"I love this exact subgenre trope—what's an epic, credit-worthy listen that will last me weeks?"*
   - *"Is the narrator's vocal acting, pacing, and stamina good enough to keep me hooked for 20 to 60+ hours?"*

3. **Mandatory Instruction for Gemini Agents & NotebookLM**:
   Whenever researching new books, curating collections, or drafting journal articles, **never just hunt for whatever happens to be long on Audible**. Actively identify **exceptional, high-craft audiobooks within specific trending subgenres and passionate fan communities** that meet our 10+ hour qualifier.

---

## 1. Core Architectural Rules: The 3-Stage Funnel & 4-Tier Anti-Duplicate Copy Hierarchy

### A. The 3-Stage "Department Store" Funnel
Every page on `thelongbookclub.com` is engineered to guide visitors smoothly toward the **Dedicated Book Pages (`/book/:slug/`)**, which are the **only** pages containing external Audible UK/US affiliate links:
1. **Top of Funnel ("The Magazine" & "The Kiosk")**:
   - **The Journal (`/journal/:slug/`)**: Captures informational and social search traffic. **Golden Rule:** Never place external Amazon/Audible links in Journal posts—always link internally to `/collections/:slug/`, `/genre/:slug/`, and `/book/:slug/` (with trailing slashes).
   - **Homepage & Long Book Finder (`/long-book-finder/`)**: Dynamic filtering tools whose cards route every click straight to `/book/:slug/`.
   - **Author & Narrator Directories (`/authors/`, `/narrators/`, `/narrators/leaderboard/`)**: Discovery hubs celebrating vocal craft and literary catalogs.
2. **Middle of Funnel ("The Window Displays / SEO Honey Traps")**:
   - **Curated Collections (`/collections/:slug/`) & Niche Genres (`/genre/:slug/`)**: Rank for discovery keywords (e.g., *"Best Long Magical Realism Audiobooks"*).
   - **The Curiosity Gap Rule:** Collection teasers (`teaserTitle` + `teaser`) sit directly above the **"Read Full Review + Soundcheck →"** button. They must explain *why* the book belongs in the collection and **open an irresistible question** about narrator stamina, pacing, or adaptation comparison **without revealing the final verdict**, compelling the user to click through to `/book/:slug/`.
3. **Bottom of Funnel ("The Product Boxes / Conversion Engine")**:
   - **Dedicated Book Pages (`/book/:slug/`)**: Houses the **300+ word `curatorNote`** (conversion review that resolves the curiosity gap and justifies spending 1 Audible credit) and the signature **`soundCheck`** (narrator performance review with Apple Books sample player), right beside the prominent Audible US & UK affiliate buttons.

### B. The 4-Tier Anti-Duplicate Copy Table
Because each audiobook appears across multiple URLs on the website (and because our build script pre-renders raw static HTML for Googlebot), **every book requires 4 distinct tiers of copy**. Never copy-paste sentences between tiers, and never copy Amazon's publisher blurb verbatim.

| Tier | Field Name(s) | Where It Appears | Length & Funnel Purpose |
| :--- | :--- | :--- | :--- |
| **Tier 1: Raw HTML Synopsis** | `description` | Pre-rendered static HTML (`#no-js-content` in `dist/book/:slug/index.html`) + JSON-LD Schema fallback | **1–2 sentences (~25–45 words).** A 100% original plot premise written in our voice so Googlebot crawls zero scraped publisher text. |
| **Tier 2: Grid Card Punchline** | `cardOverview` | Homepage *Hall of Fame*, `/long-book-finder/`, `/genre/:slug/`, and *You Might Also Like* cards | **Strict max 120 characters (1–2 short sentences).** Punchy micro-hook that fits inside a 3-line grid card and drives clicks on *"Read Full Review →"*. |
| **Tier 3: Collection Editorial Teaser ("Lean Hook")** | `teaserTitle` + `teaser` | `/collections/:slug/` (both live React page and pre-rendered Collection HTML) | **`teaserTitle`: 4–8 words** (H4 sub-headline).<br>**`teaser`: Strictly 2 sentences (~35–45 words max).** Lean curiosity hook: Sentence 1 poses a sharp listening dilemma/question (narrator stamina, pacing, runtime value); Sentence 2 provides a direct CTA to close the loop on `/book/:slug/`. Zero plot bloat. |
| **Tier 4: Full Curator Review & Soundcheck** | `curatorTitle` + `curatorNote` + `soundCheck` | `/book/:slug/` (live React page, pre-rendered Book HTML, and `Review` JSON-LD Schema) | **`curatorTitle`: 6–12 words** (H2 review headline).<br>**`curatorNote`: 3 paragraphs (300+ words)** Bottom-of-Funnel conversion review closing with credit value justification.<br>**`soundCheck`: 1 paragraph (~70–110 words)** dedicated strictly to the narrator's vocal performance, stamina, accents, and studio mastering. |

---

## 2. Element-by-Element Breakdown: Adding a New Book & Review

For every new audiobook (must be **10+ hours minimum unabridged**, prioritizing the longest, highest-value listens available in each genre or niche), Gemini/NotebookLM should output the following fields:

### A. Book Metadata (`src/data/books.ts`)
1. **`title`** *(string)*:
   - Exact audiobook title. *(Critical rule: Must match the key in `reviews.ts` character-for-character, including colons and apostrophes).*
2. **`slug`** *(string)*:
   - URL-safe lowercase hyphenated slug, usually `title-author` (e.g., `the-pillars-of-the-earth-ken-follett`).
3. **`author`** *(string)*:
   - Author's full name (e.g., `Ken Follett`).
   - *Rule:* If the author has $\ge 2$ books in our library, the site automatically links their name in **Coral** (`var(--color-brand-coral)`) to `/author/:slug/`. Single-book authors remain unclickable Forrest Green.
4. **`narrator`** *(string)*:
   - Narrator's full name(s) (e.g., `John Lee` or `Michael Kramer, Kate Reading`).
   - *Rule:* If the narrator has $\ge 2$ books in our library, `SoundCheckCard.tsx` automatically links their name in **Coral** to `/narrator/:slug/`.
5. **`length`** *(string)*:
   - Runtime formatted as `XXh YYm` or `XXh` (e.g., `40h 55m` or `14h 20m` — minimum `10h`).
   - *Note:* Our build script automatically converts this into ISO 8601 (`PT40H55M`) for Google's `Audiobook` structured data, and our interactive calculators calculate commute weeks and value-per-hour dynamically.
6. **`genre`** *(array of 4–6 strings)*:
   - **Tag 1:** Broad primary category (e.g., `Sci-Fi & Fantasy`, `Historical Fiction`, `Thrillers`, `History & Biographies`, `Classic Literature`, `Epic Fiction`).
   - **Tags 2–6:** Specific searchable sub-genres, tropes, and trending niches (e.g., `Progression Fantasy`, `Space Opera`, `Post-Apocalyptic`, `Slow Burn`, `Full-Cast Audio`).
   - *Note:* Every tag in this array automatically generates or populates a `/genre/:slug/` landing page and renders as a Coral interactive filter pill.
7. **`rating`** *(number)*:
   - Editorial/community rating out of 5 (typically `4.6` to `5.0`).
8. **`featured`** *(boolean, optional)*:
   - Set `true` only if the book should appear in the 6-book *Hall of Fame* on the Homepage.

### B. Retail Assets & Audio Previews (`src/data/books.ts`)
9. **`coverUrl`** *(string)*:
   - Path in `/covers/` (e.g., `/covers/[slug].jpg` or `/covers/[slug].webp`).
10. **`affiliateLink`** *(string — UK Audible/Amazon)*:
    - Format: `https://www.amazon.co.uk/dp/[UK_ASIN]?tag=thelongbookclub-21`
11. **`affiliateLinkUS`** *(string — US Audible/Amazon)*:
    - Format: `https://www.amazon.com/dp/[US_ASIN]?tag=thelongbookcl-20`
12. **`audioPreviewUrl`** *(string, automated via `npm run sync:previews`)*:
    - Official Apple Books 30–90 second `.m4a` preview stream that powers the interactive audio player inside the Narrator Soundcheck card.

### C. Book Copy Tiers 1–3 (`src/data/books.ts`)
13. **`description`** *(string — Tier 1)*:
    - **1–2 sentences (~25–45 words).** Original, non-scraped plot synopsis for static HTML crawlers.
14. **`cardOverview`** *(string — Tier 2)*:
    - **Max 120 characters.** Ultra-concise 1–2 sentence hook for grid cards driving clicks to `/book/:slug/`.
15. **`teaserTitle`** *(string — Tier 3 Headline)*:
    - **4–8 words.** Sharp, provocative sub-headline for Collection cards posing the listening dilemma.
16. **`teaser`** *(string — Tier 3 Body — The 35–45 Word "Lean Hook")*:
    - **Strictly 2 sentences (~35–45 words max). ZERO plot summaries.**
      - *Sentence 1 (The Dilemma/Question):* Poses a single, sharp question about narrator stamina, pacing burnout, complexity in audio, adaptation comparison, or credit value.
      - *Sentence 2 (The Call-To-Action):* Directs the user to the dedicated book page to close the information gap (e.g., *"Read our full review and Soundcheck to see our verdict."*).

### D. Full Review Copy Tier 4 (`src/data/reviews.ts` — Bottom-of-Funnel Conversion Engine)
17. **`curatorTitle`** *(string)*:
    - **6–12 words.** Evocative H2 headline for the main review on `/book/:slug/` (must be different from `teaserTitle`).
18. **`curatorNote`** *(string)*:
    - **3 paragraphs (300+ words, separated by `\n\n`).**
    - Written in The Long Book Club's signature voice: warm, intelligent, enthusiastic about immersive world-building, resolving the Collection curiosity gap, and closing with an explicit pitch on *why* spending 1 Audible credit on this marathon is extraordinary value.
    - **Internal Linking Rule (Critical for Googlebot):** Include 1–2 natural internal links formatted as markdown `[The Way of Kings](/book/the-way-of-kings-brandon-sanderson/)` or `[Magical Realism](/collections/magical-realism/)` (**always include the trailing slash `/`**).
    - **Series Reading Order Standard:** When a book belongs to a series or connected universe, append the official reading order at the very bottom of `curatorNote`:
      ```
      **[Series Name] Reading Order:**
      • [Book 1 Title](/book/slug-1/) (Book 1 – 28h 14m)
      • [Book 2 Title](/book/slug-2/) (Book 2 – 32h 45m)
      • [Book 3 Title](/book/slug-3/) (Book 3 – 41h 10m)
      ```
      *(Our site styling automatically formats these items at `0.75em` with hanging indents to keep multi-series lists neat and compact).*
19. **`soundCheck`** *(string)*:
    - **1 paragraph (~70–110 words).**
    - Specific critique of the narrator's vocal acting, character differentiation, cadence, emotional range, and listening comfort over 10+ hours.

---

## 3. Element-by-Element Breakdown: Adding a New Collection (`src/data/collections.ts`)

Collections live in `src/data/collections.ts` and render at `/collections/:slug/`. Each Collection groups **6 to 14+ audiobooks** around a compelling theme, mood, or listening scenario.

To prevent duplicate content flags on Google and keep card heights visually balanced across the directory, every Collection follows the **3-Tier Collection Content Framework**:

1. **`id`** *(string)*: Unique identifier (e.g., `'silkpunk'` or `'time-travel'`).
2. **`slug`** *(string)*: URL-safe keyword-rich slug (e.g., `silkpunk`).
3. **`title`** *(string — Strict $\le 10$ Words)*: Punchy collection H1 title (e.g., `'Best Long Silkpunk & Asian Fantasy Audiobooks'`).
4. **`cardOverview`** *(string — ~25 Words)*: Displayed exclusively on `CollectionCard.tsx` on `/collections/`. Enticing browse-mode teaser that invites clicks while keeping all cards uniform in height.
5. **`heroSubtitle`** *(string — Strict $\le 25$ Words)*: Displayed as the semantic `<h2>` in the edge-to-edge Hero on `/collections/:slug/` and injected into `<meta name="description">`.
6. **`editorialHeading`** *(optional string — 2–5 Words)*: Eyebrow tag above the editorial intro, defaults to `'Curator's Briefing'`.
7. **`editorialIntro`** *(string — Strict $\le 60$ Words)*: Displayed in the **Curator's Briefing** block directly between the Hero and the 3-column book grid. Deep-dives into subgenre traits, origins, or audio signatures with markdown links.
8. **`bookIds`** *(array of strings)*: Array of book IDs from `books.ts`. New additions are placed at index 0.
9. **`coverUrl`** *(string)*: Primary cover art used for social sharing and OpenGraph.
10. **`topGraphic`**, **`iconSvg`**, **`iconColor`**, **`collectionNumber`** *(optional)*: Card arch graphic, SVG icon, accent hex color, and 3-digit padded number (e.g., `'016'`).

---

## 4. Element-by-Element Breakdown: Adding New Niche Genres (`src/data/genreData.ts`)

Whenever the Gemini Research Agent identifies a high-opportunity niche genre tag (e.g., `Progression Fantasy`, `Space Opera`, `Cozy Fantasy`, `Grimdark`) and assigns it to books in `books.ts`:

1. **`genre`** *(string)*: Exact name of the genre tag as used in `book.genre` (e.g., `'Progression Fantasy'`).
2. **`metaTitle`** *(string)*: SEO title for `/genre/:slug/` (e.g., `'Best Long Progression Fantasy Audiobooks | The Long Book Club'`).
3. **`intro`** *(string)*: **2–3 sentences (~40–70 words).** Editorial introduction displayed at the top of `/genre/:slug/` and injected into the static HTML `<meta name="description">` and `#no-js-content` block.

---

## 5. Element-by-Element Breakdown: Adding a New Journal (Blog) Post (`src/data/journal.ts`)

Journal posts live in `src/data/journal.ts` and render at `/journal/:slug/`. They target long-tail informational search queries (e.g., *"How to get the best value from Audible credits"*, *"Best audiobooks for a cross-country road trip"*).

1. **`id`** *(string)*: Sequential numeric string (e.g., `'4'`).
2. **`slug`** *(string)*: URL-safe slug (e.g., `best-audiobooks-for-long-road-trips`).
3. **`title`** *(string)*: Article H1 headline.
4. **`date`** *(string)*: Publication date in human-readable format (e.g., `'October 20, 2026'`).
5. **`author`** *(string)*: Default: `'The Long Book Club'`.
6. **`excerpt`** *(string)*: **1–2 sentences (~25–45 words, max 160 chars).** Used on `/journal/` index cards and as `<meta name="description">`.
7. **`coverUrl`** *(string)*: Image path in `/public/journal/`.
8. **`content`** *(multi-line markdown string)*: **600–1,500+ words** formatted in clean Markdown with internal links to `/book/:slug/`, `/collections/:slug/`, and `/genre/:slug/`.

---

## 6. Copy-Paste Output Template for Gemini Agent & NotebookLM

When prompting your Gemini Agent + NotebookLM to generate a new batch of books, ask it to return each book in this exact structured template:

```markdown
### BOOK ENTRY
- **Title**: 
- **Author**: 
- **Narrator**: 
- **Length**: 
- **Rating**: 
- **Genres (4–6 tags)**: 
- **UK ASIN / Link (Thomas)**: [PASTE UK LINK/ASIN]
- **US ASIN / Link (Thomas)**: [PASTE US LINK/ASIN]
- **Cover Filename (Thomas)**: /covers/[slug].jpg

#### Tier 1: Static HTML Plot Synopsis (`description` — 1–2 original sentences, 0% Amazon blurb)
> 

#### Tier 2: Grid Card Overview (`cardOverview` — STRICT MAX 120 CHARACTERS)
> 

#### Tier 3: Collection Editorial Teaser (`teaserTitle` + `teaser` — Strict 2-Sentence Lean Hook, 35–45 words max)
- **Teaser Headline (`teaserTitle` — 4–8 words)**: 
- **Teaser Paragraph (`teaser` — 2 sentences: Sentence 1 Dilemma, Sentence 2 CTA)**: 

#### Tier 4: Full Book Page Review (`reviews.ts`)
- **Curator Review Headline (`curatorTitle`)**: 
- **Curator Review Body (`curatorNote` — 2–3 paragraphs, 300+ words closing with Audible credit value pitch)**:

- **Series Reading Order (if applicable)**:
**[Series Name] Reading Order:**
• [Book 1 Title](/book/slug-1/) (Book 1 – XXh YYm)
• [Book 2 Title](/book/slug-2/) (Book 2 – XXh YYm)

- **Audio Soundcheck (`soundCheck` — 1 paragraph, 70–110 words evaluating narrator stamina, accents, and audio production)**:
```

---

## 7. Automated Site Widgets (No Manual Calculation Required)

Every book page (`/book/:slug/`) automatically renders two interactive React widgets using the `length` field (e.g., `"45h 30m"`):
1. **Audiobook Commute Calculator (`AudiobookCommuteCalculator.tsx`)**: Automatically calculates how many weeks of daily commuting the audiobook will last (displayed as a classic 225px Coral circle on desktop, and a sleek Horizontal Scorecard Pill on mobile).
2. **Audiobook Value Calculator (`AudiobookValueCalculator.tsx`)**: Automatically calculates the £/$ cost-per-hour of entertainment for 1 Audible credit and compares it against cinema costs.

**Instruction for Gemini:** Do **NOT** manually calculate commute tables or math in your review text—the site handles this automatically.

---

## 8. Existing Site Inventory (Complete 463-Book Catalog Reference)

Below is the complete reference of all **463 Audiobooks**, **17 Curated Collections**, **75 Qualifying Authors**, **71 Qualifying Narrators**, and **3 Journal Posts** currently live on `https://thelongbookclub.com`.

- **For Research:** Do **NOT** propose any of these 463 audiobooks as "new additions" to the library (unless creating a new Collection that gathers existing titles).
- **For Internal Linking:** When writing reviews, articles, or teasers, always use these exact `/book/:slug/`, `/collections/:slug/`, `/author/:slug/`, and `/narrator/:slug/` paths (always include the trailing slash `/`).

### A. Existing Curated Collections (17)
1. **Best Long Time Travel Audiobooks: Time Loops and Alternate Histories** — `/collections/time-travel/` (ID: `time-travel`)
2. **Best Long Silkpunk & Asian Fantasy Audiobooks** — `/collections/silkpunk/` (ID: `silkpunk`)
3. **Best Long British Espionage Audiobooks: Cold War Thrillers** — `/collections/british-espionage/` (ID: `british-espionage`)
4. **Best Long Space Opera & Galactic Empire Audiobooks** — `/collections/space-opera/` (ID: `space-opera`)
5. **Best Long Mythological Retellings & Ancient Epics** — `/collections/mythology-epics/` (ID: `mythology-epics`)
6. **Best Long Cozy Fantasy & Slice-of-Life Audiobooks** — `/collections/cozy-fantasy/` (ID: `cozy-fantasy`)
7. **Best Long Grimdark Fantasy Audiobooks: Blood & Moral Ambiguity** — `/collections/grimdark-fantasy/` (ID: `grimdark-fantasy`)
8. **Best Long Nordic Noir & Scandi Crime Audiobooks** — `/collections/nordic-noir/` (ID: `nordic-noir`)
9. **Best Long LitRPG & GameLit Audiobooks: Level Up** — `/collections/litrpg-gamelit/` (ID: `litrpg-gamelit`)
10. **Best Long Magical Realism Audiobooks: Surreal Dreams** — `/collections/magical-realism/` (ID: `magical-realism`)
11. **The Best, Longest Cinematic Audiobooks (Full-Cast Productions)** — `/collections/graphic-audio/` (ID: `graphic-audio`)
12. **The Best Long Audiobooks from 2025** — `/collections/best-long-books-2025/` (ID: `1`)
13. **Long, Atmospheric Dark Academia Audiobook Listens** — `/collections/dark-academia/` (ID: `dark-academia`)
14. **Epic Romantasy Long Audiobook Listens** — `/collections/romantasy/` (ID: `romantasy`)
15. **The Longest Ever Audiobooks (60+ Hours)** — `/collections/longest-ever/` (ID: `longest-ever`)
16. **Long Life Stories: Definitive Biography Audiobooks** — `/collections/long-life-stories/` (ID: `long-life-stories`)
17. **Bucket List Classic Long Listens** — `/collections/bucket-list/` (ID: `bucket-list`)

### B. Existing Journal Posts (3)
1. **The "Single Credit" Survival Kit: Audiobooks That Last an Entire Month** — `/journal/the-single-credit-survival-kit-audiobooks-that-last-an-entire-month/`
2. **How to Squeeze Every Drop of Value Out of Your Audible Credits (and Free Trials)** — `/journal/how-to-squeeze-every-drop-of-value-out-of-your-audible-credits-and-free-trials/`
3. **The Art of the Slow Burn: Why the Best Romantasy Requires a 20+ Hour Commitment** — `/journal/the-art-of-the-slow-burn-why-the-best-romantasy-requires-a-20-hour-commitment/`

### C. Qualifying Author Hubs (75 Authors with $\ge 2$ Books)
[Pirateaba](/author/pirateaba/) (18), [TheFirstDefier & JF Brink](/author/thefirstdefier-jf-brink/) (17), [Zogarth](/author/zogarth/) (15), [Brandon Sanderson](/author/brandon-sanderson/) (14), [Shirtaloon & Travis Deverell](/author/shirtaloon-travis-deverell/) (13), [Robert Jordan](/author/robert-jordan/) (12), [Mick Herron](/author/mick-herron/) (10), [Diana Gabaldon](/author/diana-gabaldon/) (9), [James S.A. Corey](/author/james-sa-corey/) (9), [Joe Abercrombie](/author/joe-abercrombie/) (9), [Sarah J. Maas](/author/sarah-j-maas/) (8), [Matt Dinniman](/author/matt-dinniman/) (8), [J.K. Rowling](/author/jk-rowling/) (7), [Christopher Ruocchio](/author/christopher-ruocchio/) (7), [Frank Herbert](/author/frank-herbert/) (6), [Ken Follett](/author/ken-follett/) (6), [Neal Stephenson](/author/neal-stephenson/) (6), [Dan Simmons](/author/dan-simmons/) (6), [Kyle Kirrin](/author/kyle-kirrin/) (6), [Pierce Brown](/author/pierce-brown/) (6), [Adrian Tchaikovsky](/author/adrian-tchaikovsky/) (6), [Shemer Kuznits](/author/shemer-kuznits/) (6), [George R.R. Martin](/author/george-rr-martin/) (5), [R.F. Kuang](/author/rf-kuang/) (5), [Peter F. Hamilton](/author/peter-f-hamilton/) (5), [Deborah Harkness](/author/deborah-harkness/) (5), [Peter McLean](/author/peter-mclean/) (5), [Victor Hugo](/author/victor-hugo/) (4), [Stephen King](/author/stephen-king/) (4), [Charles Dickens](/author/charles-dickens/) (4), [Neil Gaiman](/author/neil-gaiman/) (4), [Carlos Ruiz Zafón](/author/carlos-ruiz-zafn/) (4), [Stephen Fry](/author/stephen-fry/) (4), [John le Carré](/author/john-le-carr/) (4), [Ken Liu](/author/ken-liu/) (4), [Domagoj Kurmaić](/author/domagoj-kurmai/) (4), [Ron Chernow](/author/ron-chernow/) (3), [Haruki Murakami](/author/haruki-murakami/) (3), [Leo Tolstoy](/author/leo-tolstoy/) (3), [Donna Tartt](/author/donna-tartt/) (3), [Fyodor Dostoevsky](/author/fyodor-dostoevsky/) (3), [Walter Isaacson](/author/walter-isaacson/) (3), [J.R.R. Tolkien](/author/jrr-tolkien/) (3), [Robert K. Massie](/author/robert-k-massie/) (3), [John Steinbeck](/author/john-steinbeck/) (3), [Jay Kristoff](/author/jay-kristoff/) (3), [Rebecca Yarros](/author/rebecca-yarros/) (3), [Cixin Liu](/author/cixin-liu/) (3), [Justin Cronin](/author/justin-cronin/) (3), [Stieg Larsson](/author/stieg-larsson/) (3), [Scott Lynch](/author/scott-lynch/) (3), [Brian McClellan](/author/brian-mcclellan/) (3), [Mark Lawrence](/author/mark-lawrence/) (3), [TJ Klune](/author/tj-klune/) (3), [Ann Leckie](/author/ann-leckie/) (3), [Len Deighton](/author/len-deighton/) (3), [David Lagercrantz](/author/david-lagercrantz/) (3), [Robert Jordan, Brandon Sanderson](/author/robert-jordan-brandon-sanderson/) (3), [Robin Hobb](/author/robin-hobb/) (3), [James Islington](/author/james-islington/) (3), [Fonda Lee](/author/fonda-lee/) (3), [Alexandre Dumas](/author/alexandre-dumas/) (2), [Doris Kearns Goodwin](/author/doris-kearns-goodwin/) (2), [Patrick Rothfuss](/author/patrick-rothfuss/) (2), [Samantha Shannon](/author/samantha-shannon/) (2), [Callie Hart](/author/callie-hart/) (2), [Bryce O'Connor & Luke Chmilenko](/author/bryce-oconnor-luke-chmilenko/) (2), [Victoria Goddard](/author/victoria-goddard/) (2), [Travis Baldree](/author/travis-baldree/) (2), [Rebecca Thorne](/author/rebecca-thorne/) (2), [Madeline Miller](/author/madeline-miller/) (2), [Claire North](/author/claire-north/) (2), [Arkady Martine](/author/arkady-martine/) (2), [Karin Smirnoff](/author/karin-smirnoff/) (2), [Shelley Parker-Chan](/author/shelley-parker-chan/) (2)

### D. Qualifying Narrator Hubs (71 Narrators with $\ge 2$ Books)
[Michael Kramer](/narrator/michael-kramer/) (29), [Travis Baldree](/narrator/travis-baldree/) (24), [Kate Reading](/narrator/kate-reading/) (17), [Pavi Proczko](/narrator/pavi-proczko/) (17), [John Lee](/narrator/john-lee/) (15), [Andrea Parsneau](/narrator/andrea-parsneau/) (14), [Heath Miller](/narrator/heath-miller/) (13), [Scott Brick](/narrator/scott-brick/) (11), [Jeff Hays](/narrator/jeff-hays/) (11), [Sean Barrett](/narrator/sean-barrett/) (11), [Davina Porter](/narrator/davina-porter/) (9), [Jefferson Mays](/narrator/jefferson-mays/) (9), [Steven Pacey](/narrator/steven-pacey/) (9), [Simon Vance](/narrator/simon-vance/) (8), [Riz Ahmed](/narrator/riz-ahmed/) (8), [Indira Varma](/narrator/indira-varma/) (8), [Sacha Dhawan](/narrator/sacha-dhawan/) (8), [Hugh Laurie](/narrator/hugh-laurie/) (7), [Matthew Macfadyen](/narrator/matthew-macfadyen/) (7), [Michelle Gomez](/narrator/michelle-gomez/) (7), [Cush Jumbo](/narrator/cush-jumbo/) (7), [Frankie Treadaway](/narrator/frankie-treadaway/) (7), [Max Lester](/narrator/max-lester/) (7), [Arabella Stanton](/narrator/arabella-stanton/) (7), [Mark Addy](/narrator/mark-addy/) (7), [Nina Wadia](/narrator/nina-wadia/) (7), [Joel Fry](/narrator/joel-fry/) (7), [Adeel Akhtar](/narrator/adeel-akhtar/) (7), [Tracy Ann Oberman](/narrator/tracy-ann-oberman/) (7), [Samuel Roukin](/narrator/samuel-roukin/) (7), [Tim Gerard Reynolds](/narrator/tim-gerard-reynolds/) (6), [Stephen Fry](/narrator/stephen-fry/) (5), [David Rintoul](/narrator/david-rintoul/) (5), [David Morley Hale](/narrator/david-morley-hale/) (5), [Bill Homewood](/narrator/bill-homewood/) (4), [Grover Gardner](/narrator/grover-gardner/) (4), [Andy Serkis](/narrator/andy-serkis/) (4), [Elizabeth Evans](/narrator/elizabeth-evans/) (4), [Daniel Weyman](/narrator/daniel-weyman/) (4), [Saul Reichlin](/narrator/saul-reichlin/) (4), [Jennifer Ikeda](/narrator/jennifer-ikeda/) (4), [Kevin Shen](/narrator/kevin-shen/) (4), [Jack Voraces](/narrator/jack-voraces/) (4), [Mark Deakins](/narrator/mark-deakins/) (3), [Rupert Degas](/narrator/rupert-degas/) (3), [Oliver Wyman](/narrator/oliver-wyman/) (3), [William Dufris](/narrator/william-dufris/) (3), [Neil Gaiman](/narrator/neil-gaiman/) (3), [Dylan Baker](/narrator/dylan-baker/) (3), [Rob Inglis](/narrator/rob-inglis/) (3), [Victor Bevine](/narrator/victor-bevine/) (3), [Jonathan Keeble](/narrator/jonathan-keeble/) (3), [Malk Williams](/narrator/malk-williams/) (3), [Daniel York Loh](/narrator/daniel-york-loh/) (3), [P.J. Ochlan](/narrator/pj-ochlan/) (3), [Bruno Roubicek](/narrator/bruno-roubicek/) (3), [Saul Reichlin (UK) / Simon Vance (US)](/narrator/saul-reichlin-uk-simon-vance-us/) (3), [Michael Page](/narrator/michael-page/) (3), [Emily Woo Zeller](/narrator/emily-woo-zeller/) (3), [Christian Rodska](/narrator/christian-rodska/) (3), [Helen Duff](/narrator/helen-duff/) (3), [Daniel Henning](/narrator/daniel-henning/) (3), [Amy Landon](/narrator/amy-landon/) (3), [Sophie Aldred](/narrator/sophie-aldred/) (3), [Adjoa Andoh](/narrator/adjoa-andoh/) (3), [Mel Hudson](/narrator/mel-hudson/) (3), [Simon Russell Beale](/narrator/simon-russell-beale/) (3), [James Lailey](/narrator/james-lailey/) (3), [Jeff Hays & Annie Ellicott](/narrator/jeff-hays-annie-ellicott/) (3), [Erin Bennett](/narrator/erin-bennett/) (3), [Anne Flosnik](/narrator/anne-flosnik/) (3), [Andrew Kishino](/narrator/andrew-kishino/) (3), [Marc Vietor](/narrator/marc-vietor/) (2), [et al.](/narrator/et-al/) (2), [Martin Jarvis](/narrator/martin-jarvis/) (2), [Donna Tartt](/narrator/donna-tartt/) (2), [Charlton Griffin](/narrator/charlton-griffin/) (2), [Damian Lynch](/narrator/damian-lynch/) (2), [Stella Bloom](/narrator/stella-bloom/) (2), [Anthony Palmini](/narrator/anthony-palmini/) (2), [Ben Allen](/narrator/ben-allen/) (2), [Rebecca Soler](/narrator/rebecca-soler/) (2), [Teddy Hamilton](/narrator/teddy-hamilton/) (2), [Christopher Ragland](/narrator/christopher-ragland/) (2), [Ralph Lister](/narrator/ralph-lister/) (2), [Katherine Kellgren](/narrator/katherine-kellgren/) (2), [Peter Kenny](/narrator/peter-kenny/) (2), [Moira Quirk](/narrator/moira-quirk/) (2), [Sarah Lyddon Powell](/narrator/sarah-lyddon-powell/) (2), [Saskia Maarleveld](/narrator/saskia-maarleveld/) (2), [Natalie Naudus](/narrator/natalie-naudus/) (2)

### E. Complete Catalog of 463 Live Audiobooks

| ID | Title | Author | Length | URL Path (`/book/:slug/`) | Primary Genres |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 15 | Les Misérables | Victor Hugo | 67h | `/book/les-misrables-victor-hugo/` | Classics, Historical Fiction, Social Commentary |
| 11 | It | Stephen King | 44h 57m | `/book/it-stephen-king/` | Horror, Thriller, Supernatural |
| 12 | Under the Dome | Stephen King | 34h 24m | `/book/under-the-dome-stephen-king/` | Science Fiction, Horror, Thriller |
| 13 | The Way of Kings | Brandon Sanderson | 45h 37m | `/book/the-way-of-kings-brandon-sanderson/` | Fantasy, Epic Fantasy, High Fantasy |
| 2 | The Power Broker | Robert A. Caro | 66h 6m | `/book/the-power-broker-robert-a-caro/` | Biography, History, Politics |
| 3 | The Stand | Stephen King | 47h 47m | `/book/the-stand-stephen-king/` | Horror, Post-Apocalyptic, Science Fiction |
| 4 | Hamilton | Ron Chernow | 36h | `/book/hamilton-ron-chernow/` | Biography, History, American History |
| 5 | Infinite Jest | David Foster Wallace | 56h 11m | `/book/infinite-jest-david-foster-wallace/` | Literary Fiction, Satire, Science Fiction |
| 6 | The Count of Monte Cristo | Alexandre Dumas | 52h 41m | `/book/the-count-of-monte-cristo-alexandre-dumas/` | Classics, Revenge, Historical Fiction |
| 7 | 11/22/63 | Stephen King | 30h 40m | `/book/112263-stephen-king/` | Science Fiction, Time Travel, Historical Fiction |
| 8 | Atlas Shrugged | Ayn Rand | 63h | `/book/atlas-shrugged-ayn-rand/` | Science Fiction, Philosophical Fiction, Mystery |
| 9 | A Game of Thrones | George R.R. Martin | 33h 46m | `/book/a-game-of-thrones-george-rr-martin/` | Fantasy, Epic Fantasy, Grimdark |
| 10 | Sherlock Holmes: The Definitive Collection | Arthur Conan Doyle | 71h 57m | `/book/sherlock-holmes-the-definitive-collection-arthur-conan-doyle/` | Mystery, Classics, Short Stories |
| 16 | Team of Rivals | Doris Kearns Goodwin | 41h 32m | `/book/team-of-rivals-doris-kearns-goodwin/` | History, Biography, Politics |
| 17 | 1Q84 | Haruki Murakami | 46h 50m | `/book/1q84-haruki-murakami/` | Fantasy, Magical Realism, Dystopian |
| 18 | Grant | Ron Chernow | 48h | `/book/grant-ron-chernow/` | Biography, History, American Civil War |
| 19 | David Copperfield | Charles Dickens | 36h 30m | `/book/david-copperfield-charles-dickens/` | Classics, Bildungsroman, Victorian |
| 20 | Dune | Frank Herbert | 21h 2m | `/book/dune-frank-herbert/` | Science Fiction, Space Opera, Philosophy |
| 21 | The Pillars of the Earth | Ken Follett | 40h 55m | `/book/the-pillars-of-the-earth-ken-follett/` | Historical Fiction, Religion, War |
| 22 | War and Peace | Leo Tolstoy | 61h 8m | `/book/war-and-peace-leo-tolstoy/` | Classics, Historical Fiction, War |
| 23 | The Name of the Wind | Patrick Rothfuss | 28h | `/book/the-name-of-the-wind-patrick-rothfuss/` | Fantasy, Epic Fantasy, High Fantasy |
| 24 | Shantaram | Gregory David Roberts | 43h | `/book/shantaram-gregory-david-roberts/` | Literary Fiction, Adventure, Travel |
| 25 | The Goldfinch | Donna Tartt | 32h 24m | `/book/the-goldfinch-donna-tartt/` | Literary Fiction, Coming of Age, Mystery |
| 26 | A Little Life | Hanya Yanagihara | 32h 51m | `/book/a-little-life-hanya-yanagihara/` | Literary Fiction, Contemporary Fiction, Tragedy |
| 27 | Cryptonomicon | Neal Stephenson | 42h 53m | `/book/cryptonomicon-neal-stephenson/` | Science Fiction, Historical Fiction, Techno-thriller |
| 28 | Crime and Punishment | Fyodor Dostoevsky | 26h 11m | `/book/crime-and-punishment-fyodor-dostoevsky/` | Classics, Psychological Thriller, Philosophy |
| 29 | American Gods | Neil Gaiman | 19h 36 hours | `/book/american-gods-neil-gaiman/` | Full-Cast, Urban Fantasy, Mythology |
| 30 | Anna Karenina | Leo Tolstoy | 35h 35m | `/book/anna-karenina-leo-tolstoy/` | Classics, Romance, Social Commentary |
| 31 | Don Quixote | Miguel de Cervantes | 39h 42m | `/book/don-quixote-miguel-de-cervantes/` | Classics, Satire, Adventure |
| 32 | The Brothers Karamazov | Fyodor Dostoevsky | 37h 5m | `/book/the-brothers-karamazov-fyodor-dostoevsky/` | Classics, Philosophical Fiction, Family Saga |
| 33 | Steve Jobs | Walter Isaacson | 25h 18m | `/book/steve-jobs-walter-isaacson/` | Biography, Non-Fiction |
| 34 | Titan | Ron Chernow | 35h | `/book/titan-ron-chernow/` | Biography, History, Non-Fiction |
| 35 | The Rise and Fall of the Third Reich | William L. Shirer | 57h 11m | `/book/the-rise-and-fall-of-the-third-reich-william-l-shirer/` | History, World War II, Non-Fiction |
| 36 | Outlander | Diana Gabaldon | 32h 38m | `/book/outlander-diana-gabaldon/` | Historical Fiction, Romance, Time Travel |
| 37 | Middlemarch | George Eliot | 32h | `/book/middlemarch-george-eliot/` | Classics, Victorian, Social Commentary |
| 38 | Jonathan Strange & Mr Norrell | Susanna Clarke | 32h 30m | `/book/jonathan-strange-mr-norrell-susanna-clarke/` | Fantasy, Historical Fantasy, Alternate History |
| 39 | Bleak House | Charles Dickens | 35h | `/book/bleak-house-charles-dickens/` | Classics, Mystery, Victorian |
| 40 | Gone with the Wind | Margaret Mitchell | 49h 7m | `/book/gone-with-the-wind-margaret-mitchell/` | Historical Fiction, Romance, American Civil War |
| 41 | The Eye of the World | Robert Jordan | 29h 57m | `/book/the-eye-of-the-world-robert-jordan/` | Fantasy, Epic Fantasy, High Fantasy |
| 42 | The Great Hunt | Robert Jordan | 26h 34m | `/book/the-great-hunt-robert-jordan/` | Fantasy, Epic Fantasy, High Fantasy |
| 43 | The Dragon Reborn | Robert Jordan | 26h 4m | `/book/the-dragon-reborn-robert-jordan/` | Fantasy, Epic Fantasy, High Fantasy |
| 44 | The Shadow Rising | Robert Jordan | 40h 57m | `/book/the-shadow-rising-robert-jordan/` | Fantasy, Epic Fantasy, High Fantasy |
| 45 | The Fellowship of the Ring | J.R.R. Tolkien | 19h 7m | `/book/the-fellowship-of-the-ring-jrr-tolkien/` | Fantasy, Epic Fantasy, High Fantasy |
| 46 | The Two Towers | J.R.R. Tolkien | 16h 44m | `/book/the-two-towers-jrr-tolkien/` | Fantasy, Epic Fantasy, High Fantasy |
| 47 | The Return of the King | J.R.R. Tolkien | 18h 12m | `/book/the-return-of-the-king-jrr-tolkien/` | Fantasy, Epic Fantasy, High Fantasy |
| 48 | Words of Radiance | Brandon Sanderson | 48h 14m | `/book/words-of-radiance-brandon-sanderson/` | Fantasy, Epic Fantasy, High Fantasy |
| 49 | Oathbringer | Brandon Sanderson | 55h 5m | `/book/oathbringer-brandon-sanderson/` | Fantasy, Epic Fantasy, High Fantasy |
| 50 | Rhythm of War | Brandon Sanderson | 57h 26m | `/book/rhythm-of-war-brandon-sanderson/` | Fantasy, Epic Fantasy, High Fantasy |
| 51 | A Clash of Kings | George R.R. Martin | 37h 16m | `/book/a-clash-of-kings-george-rr-martin/` | Fantasy, Epic Fantasy, Grimdark |
| 52 | A Storm of Swords | George R.R. Martin | 47h 34m | `/book/a-storm-of-swords-george-rr-martin/` | Fantasy, Epic Fantasy, Grimdark |
| 53 | A Feast for Crows | George R.R. Martin | 31h 10m | `/book/a-feast-for-crows-george-rr-martin/` | Fantasy, Epic Fantasy, Grimdark |
| 54 | A Dance with Dragons | George R.R. Martin | 48h 55m | `/book/a-dance-with-dragons-george-rr-martin/` | Fantasy, Epic Fantasy, Grimdark |
| 55 | The Priory of the Orange Tree | Samantha Shannon | 25h 52m | `/book/the-priory-of-the-orange-tree-samantha-shannon/` | Fantasy, High Fantasy, Romantasy |
| 56 | Babel | R.F. Kuang | 21h 38m | `/book/babel-rf-kuang/` | Fantasy, Dark Academia, Historical Fantasy |
| 57 | The Final Empire | Brandon Sanderson | 24h 39m | `/book/the-final-empire-brandon-sanderson/` | Fantasy, High Fantasy, Heist |
| 58 | The Well of Ascension | Brandon Sanderson | 27h 14m | `/book/the-well-of-ascension-brandon-sanderson/` | Fantasy, High Fantasy, Political Intrigue |
| 59 | The Hero of Ages | Brandon Sanderson | 26h 18m | `/book/the-hero-of-ages-brandon-sanderson/` | Fantasy, High Fantasy, Epic Fantasy |
| 60 | Hyperion | Dan Simmons | 20h 44m | `/book/hyperion-dan-simmons/` | Science Fiction, Space Opera, Literary Sci-Fi |
| 61 | The Fall of Hyperion | Dan Simmons | 19h 54m | `/book/the-fall-of-hyperion-dan-simmons/` | Science Fiction, Space Opera, Philosophy |
| 63 | Judas Unchained | Peter F. Hamilton | 41h 22m | `/book/judas-unchained-peter-f-hamilton/` | Science Fiction, Space Opera, Hard Sci-Fi |
| 64 | Leviathan Wakes | James S.A. Corey | 19h 9m | `/book/leviathan-wakes-james-sa-corey/` | Space Opera, Science Fiction, Sci-Fi Mystery |
| 65 | Seveneves | Neal Stephenson | 31h 55m | `/book/seveneves-neal-stephenson/` | Science Fiction, Hard Sci-Fi, Post-Apocalyptic |
| 66 | Anathem | Neal Stephenson | 32h 45m | `/book/anathem-neal-stephenson/` | Science Fiction, Speculative Fiction, Philosophy |
| 67 | Stranger in a Strange Land | Robert A. Heinlein | 16h 3m | `/book/stranger-in-a-strange-land-robert-a-heinlein/` | Science Fiction, Philosophy, Satire |
| 68 | Dune Messiah | Frank Herbert | 9h 7m | `/book/dune-messiah-frank-herbert/` | Science Fiction, Space Opera, Political Intrigue |
| 69 | Children of Dune | Frank Herbert | 19h 42m | `/book/children-of-dune-frank-herbert/` | Science Fiction, Space Opera, Ecology |
| 70 | Moby Dick | Herman Melville | 24h 23m | `/book/moby-dick-herman-melville/` | Classics, Adventure, Philosophical Fiction |
| 71 | Great Expectations | Charles Dickens | 18h 44m | `/book/great-expectations-charles-dickens/` | Classics, Bildungsroman, Victorian |
| 72 | Jane Eyre | Charlotte Brontë | 19h 11m | `/book/jane-eyre-charlotte-bront/` | Classics, Gothic, Bildungsroman |
| 73 | Wuthering Heights | Emily Brontë | 14h 2m | `/book/wuthering-heights-emily-bront/` | Classics, Gothic, Tragedy |
| 74 | Vanity Fair | William Makepeace Thackeray | 31h 22m | `/book/vanity-fair-william-makepeace-thackeray/` | Classics, Satire, Historical Fiction |
| 75 | The Hunchback of Notre-Dame | Victor Hugo | 19h 2m | `/book/the-hunchback-of-notre-dame-victor-hugo/` | Classics, Historical Fiction, Gothic |
| 76 | Ulysses | James Joyce | 27h 15m | `/book/ulysses-james-joyce/` | Modernist, Literary Fiction, Classics |
| 77 | Doctor Zhivago | Boris Pasternak | 21h 56m | `/book/doctor-zhivago-boris-pasternak/` | Classics, Historical Fiction, Romance |
| 78 | The Magic Mountain | Thomas Mann | 35h 15m | `/book/the-magic-mountain-thomas-mann/` | Classics, Philosophical Fiction, Modernist |
| 81 | Leonardo da Vinci | Walter Isaacson | 18h 35m | `/book/leonardo-da-vinci-walter-isaacson/` | Biography, Non-Fiction |
| 82 | Benjamin Franklin: An American Life | Walter Isaacson | 20h 3m | `/book/benjamin-franklin-an-american-life-walter-isaacson/` | Biography, American History, Politics |
| 84 | Peter the Great | Robert K. Massie | 35h 27m | `/book/peter-the-great-robert-k-massie/` | Biography, Politics, Non-Fiction |
| 85 | Catherine the Great | Robert K. Massie | 23h 24m | `/book/catherine-the-great-robert-k-massie/` | Biography, Politics, Non-Fiction |
| 87 | East of Eden | John Steinbeck | 25h 32m | `/book/east-of-eden-john-steinbeck/` | Classics, Family Saga, Historical Fiction |
| 88 | The Grapes of Wrath | John Steinbeck | 21h 10m | `/book/the-grapes-of-wrath-john-steinbeck/` | Classics, Historical Fiction, Social Commentary |
| 89 | Demon Copperhead | Barbara Kingsolver | 21h 3m | `/book/demon-copperhead-barbara-kingsolver/` | Contemporary Fiction, Coming of Age, Retelling |
| 90 | The Amazing Adventures of Kavalier & Clay | Michael Chabon | 26h 15m | `/book/the-amazing-adventures-of-kavalier-clay-michael-chabon/` | Historical Fiction, Literary Fiction, LGBTQ+ |
| 96 | 2666 | Roberto Bolaño | 39h 15m | `/book/2666-roberto-bolao/` | Literary Fiction, Mystery, Postmodernism |
| 97 | The Bee Sting | Paul Murray | 26h 10m | `/book/the-bee-sting-paul-murray/` | Contemporary Fiction, Family Drama, Literary Fiction |
| 98 | Polostan | Neal Stephenson | 11h 41m | `/book/polostan-neal-stephenson/` | Historical Fiction, Thriller, Espionage |
| 99 | The City and Its Uncertain Walls | Haruki Murakami | 17h 26m | `/book/the-city-and-its-uncertain-walls-haruki-murakami/` | Fantasy, Magical Realism, Literary Fiction |
| 100 | Caledonian Road | Andrew O\'Hagan | 22h 51m | `/book/caledonian-road-andrew-ohagan/` | Contemporary Fiction, London, Crime |
| 101 | Nexus: A Brief History of Information Networks | Yuval Noah Harari | 17h 52m | `/book/nexus-yuval-noah-harari/` | Non-Fiction, History, AI |
| 102 | Wind and Truth | Brandon Sanderson | 62h 48m | `/book/wind-and-truth-brandon-sanderson/` | Fantasy, Epic Fantasy, High Fantasy |
| 103 | Shōgun | James Clavell | 53h 33m | `/book/shogun-james-clavell/` | Historical Fiction, Adventure, War |
| 104 | Empire of the Damned | Jay Kristoff | 31h 34m | `/book/empire-of-the-damned-jay-kristoff/` | Fantasy, Dark Fantasy, Grimdark |
| 105 | The Covenant of Water | Abraham Verghese | 31h 16m | `/book/the-covenant-of-water-abraham-verghese/` | Historical Fiction, Family Saga, India |
| 106 | My Name is Barbra | Barbra Streisand | 48h 7m | `/book/my-name-is-barbra-barbra-streisand/` | Biography, Non-Fiction |
| 107 | Alchemised | SenLinYu | 36h 15m | `/book/alchemised-senlinyu/` | Fantasy, Dark Fantasy, Romance |
| 108 | The Secret History | Donna Tartt | 22h 4m | `/book/the-secret-history-donna-tartt/` | Dark Academia, Psychological Thriller, Literary Fiction |
| 109 | The Historian | Elizabeth Kostova | 26h 5m | `/book/the-historian-elizabeth-kostova/` | Historical Fiction, Horror, Dark Academia |
| 110 | A Discovery of Witches | Deborah Harkness | 23h 59m | `/book/a-discovery-of-witches-deborah-harkness/` | Fantasy, Urban Fantasy, Romance |
| 111 | Iron Flame | Rebecca Yarros | 28h 16m | `/book/iron-flame-rebecca-yarros/` | Fantasy, Romantasy, High Fantasy |
| 112 | House of Earth and Blood | Sarah J. Maas | 27h 50m | `/book/house-of-earth-and-blood-sarah-j-maas/` | Fantasy, Urban Fantasy, Romantasy |
| 113 | Kushiel\'s Dart | Jacqueline Carey | 31h 5m | `/book/kushiels-dart-jacqueline-carey/` | Fantasy, Romantasy, Epic Fantasy |
| 114 | When the Moon Hatched | Sarah A. Parker | 20h 13m | `/book/when-the-moon-hatched-sarah-a-parker/` | Fantasy, Romantasy, High Fantasy |
| 115 | Galaxy Outlaws: The Complete Black Ocean Mobius Missions | J.S. Morin | 85h 6m | `/book/galaxy-outlaws-js-morin/` | Science Fiction, Space Opera, Comedy |
| 116 | The Decline and Fall of the Roman Empire | Edward Gibbon | 126h 37m | `/book/the-decline-and-fall-of-the-roman-empire-edward-gibbon/` | History, Classics, Non-Fiction |
| 117 | The Cycle of Arawn: The Complete Trilogy | Edward W. Robertson | 65h 54m | `/book/the-cycle-of-arawn-edward-w-robertson/` | Fantasy, Epic Fantasy, Sword and Sorcery |
| 118 | The Wandering Inn: Book 2 | Pirateaba | 61h 4m | `/book/the-wandering-inn-book-2-pirateaba/` | Fantasy, LitRPG, Slice of Life |
| 119 | Churchill: Walking with Destiny | Andrew Roberts | 50h 28m | `/book/churchill-walking-with-destiny-andrew-roberts/` | Biography, History, War |
| 120 | Empire of the Vampire | Jay Kristoff | 27h 10m | `/book/empire-of-the-vampire-jay-kristoff/` | Fantasy, Dark Fantasy, Grimdark |
| 121 | Empire of the Dawn | Jay Kristoff | 34h 41m | `/book/empire-of-the-dawn-jay-kristoff/` | Fantasy, Dark Fantasy, Grimdark |
| 148 | Brimstone | Callie Hart | 24h 30m | `/book/brimstone-callie-hart/` | Fantasy, Dark Romance, Romantasy |
| 133 | Carrion Comfort | Dan Simmons | 39h 27m | `/book/carrion-comfort-dan-simmons/` | Horror, Thriller, Supernatural |
| 145 | The Complete Novels of Charles Dickens: Part One | Charles Dickens | 199h 26m | `/book/complete-dickens-part-one/` | Classics, Victorian, Short Stories |
| 143 | Death's End | Cixin Liu | 29h 59m | `/book/deaths-end-cixin-liu/` | Science Fiction, Hard Sci-Fi, Space Survival |
| 146 | The Fyodor Dostoyevsky Complete Collection | Fyodor Dostoyevsky | 266h 4m | `/book/dostoyevsky-complete-collection/` | Classics, Philosophy, Short Stories |
| 123 | Flowers of Esthelm: The Wandering Inn, Book 3 | Pirateaba | 37h 37m | `/book/flowers-of-esthelm-the-wandering-inn-book-3-pirateaba/` | Fantasy, LitRPG, Slice of Life |
| 127 | Fourth Wing | Rebecca Yarros | 22h 2m | `/book/fourth-wing-rebecca-yarros/` | Fantasy, Romantasy, High Fantasy |
| 130 | House of Flame and Shadow | Sarah J. Maas | 29h 42m | `/book/house-of-flame-and-shadow-sarah-j-maas/` | Fantasy, Urban Fantasy, Romantasy |
| 129 | House of Sky and Breath | Sarah J. Maas | 27h 42m | `/book/house-of-sky-and-breath-sarah-j-maas/` | Fantasy, Urban Fantasy, Romantasy |
| 137 | I Am Pilgrim | Terry Hayes | 22h 41m | `/book/i-am-pilgrim-terry-hayes/` | British Espionage, Espionage, Spy Thriller |
| 126 | Katabasis | R.F. Kuang | 18h 33m | `/book/katabasis-rf-kuang/` | Fantasy, Dark Academia, Mythology |
| 128 | Onyx Storm | Rebecca Yarros | 23h 52m | `/book/onyx-storm-rebecca-yarros/` | Fantasy, Romantasy, High Fantasy |
| 62 | Pandora's Star | Peter F. Hamilton | 37h 30m | `/book/pandoras-star-peter-f-hamilton/` | Space Opera, Science Fiction, Galactic Empire |
| 147 | Quicksilver | Callie Hart | 20h 41m | `/book/quicksilver-callie-hart/` | Fantasy, Dark Romance, Romantasy |
| 140 | Reamde | Neal Stephenson | 38h | `/book/reamde-neal-stephenson/` | Techno-thriller, Action, Crime |
| 139 | Red Storm Rising | Tom Clancy | 31h 12m | `/book/red-storm-rising-tom-clancy/` | Techno-thriller, War, Cold War |
| 131 | Swan Song | Robert McCammon | 34h 19m | `/book/swan-song-robert-mccammon/` | Horror, Post-Apocalyptic, Dark Fantasy |
| 142 | The Dark Forest | Cixin Liu | 22h 36m | `/book/the-dark-forest-cixin-liu/` | Science Fiction, Hard Sci-Fi, Cosmic Horror |
| 134 | The Passage | Justin Cronin | 36h 49m | `/book/the-passage-justin-cronin/` | Horror, Post-Apocalyptic, Science Fiction |
| 144 | The Redemption of Time | Baoshu | 12h 17m | `/book/the-redemption-of-time-baoshu/` | Science Fiction, Hard Sci-Fi, Space Opera |
| 132 | The Terror | Dan Simmons | 28h 28m | `/book/the-terror-dan-simmons/` | Horror, Survival, Supernatural |
| 141 | The Three-Body Problem | Cixin Liu | 13h 24m | `/book/the-three-body-problem-cixin-liu/` | Science Fiction, Hard Sci-Fi, First Contact |
| 122 | The Wandering Inn: Book 1 | Pirateaba | 43h 10m | `/book/the-wandering-inn-book-1-pirateaba/` | Fantasy, LitRPG, Slice of Life |
| 125 | The Wise Man's Fear | Patrick Rothfuss | 42h 49m | `/book/the-wise-mans-fear-patrick-rothfuss/` | Fantasy |
| 124 | Winter Solstice: The Wandering Inn, Book 4 | Pirateaba | 34h 14m | `/book/winter-solstice-the-wandering-inn-book-4-pirateaba/` | Fantasy, LitRPG, Slice of Life |
| 149 | The Mark Twain Complete Collection | Mark Twain | 280 hours and 21 minutes | `/book/the-mark-twain-complete-collection-mark-twain/` | Adventure, American History, Americana |
| 151 | The Jane Austen Collection | Jane Austen | 45 hours | `/book/the-jane-austen-collection-jane-austen/` | Cinematic Audio, Romance, Classics |
| 150 | Battlefield Earth | L. Ron Hubbard | 45 hours 53 mins | `/book/battlefield-earth-l-ron-hubbard/` | Science Fiction, Full-Cast, Aliens |
| 152 | Harry Potter and the Philosopher’s Stone | J.K. Rowling | 8 hours and 41 minutes | `/book/harry-potter-and-the-philosopher-s-stone-j-k-rowling/` | Full-Cast, Magic School, Fantasy |
| 153 | Impact Winter | Travis Beacham | 4 hours and 55 minutes | `/book/impact-winter-travis-beacham/` | Post-Apocalyptic, Full-Cast, Vampires |
| 154 | World War Z | Max Brooks | 13 hours 56 mins | `/book/world-war-z-max-brooks/` | Full-Cast, Post-Apocalyptic, Horror |
| 155 | Dracula | Bram Stoker | 15 hours 27 mins | `/book/dracula-audible-edition-bram-stoker/` | Full-Cast, Vampires, Horror |
| 156 | Locke & Key | Joe Hill | 13 hours and 23 minutes | `/book/locke-key-joe-hill/` | Full-Cast, Graphic Audio, Dark Fantasy |
| 157 | The Sandman | Neil Gaiman | 11h 2m | `/book/the-sandman-neil-gaiman/` | Cinematic Audio, Fantasy, Full-Cast |
| 158 | The Complete Chronicles of Narnia: The Classic BBC Full-Cast Dramatisations | C. S. Lewis | 15h 7m | `/book/the-complete-chronicles-of-narnia-the-classic-bbc-radio-4-full-cast-dramatisations-c-s-lewis/` | Cinematic Audio, Classics, Fantasy |
| 159 | This Kingdom Will Not Kill Me: Maggie the Undying | Ilona Andrews | 21h 33m | `/book/this-kingdom-will-not-kill-me-maggie-the-undying-ilona-andrews/` | Fantasy, Portal Fantasy, Epic Fantasy |
| 160 | One Hundred Years of Solitude | Gabriel García Márquez | 17h 56m | `/book/one-hundred-years-of-solitude-gabriel-garcia-marquez/` | Magical Realism, Literary Fiction, Classic |
| 161 | The Wind-Up Bird Chronicle | Haruki Murakami | 26h 11m | `/book/the-wind-up-bird-chronicle-haruki-murakami/` | Magical Realism, Literary Fiction, Mystery |
| 162 | Midnight's Children | Salman Rushdie | 25h 39m | `/book/midnights-children-salman-rushdie/` | Magical Realism, Historical Fiction, Literary Fiction |
| 163 | The Shadow of the Wind | Carlos Ruiz Zafón | 17h 13m | `/book/the-shadow-of-the-wind-carlos-ruiz-zafon/` | Magical Realism, Historical Fiction, Mystery |
| 164 | The House of the Spirits | Isabel Allende | 18h 51m | `/book/the-house-of-the-spirits-isabel-allende/` | Magical Realism, Historical Fiction, Literary Fiction |
| 165 | The Night Circus | Erin Morgenstern | 13h 40m | `/book/the-night-circus-erin-morgenstern/` | Magical Realism, Fantasy, Romance |
| 166 | Dungeon Crawler Carl | Matt Dinniman | 13h 31m | `/book/dungeon-crawler-carl-matt-dinniman/` | LitRPG, GameLit, Sci-Fi |
| 167 | He Who Fights with Monsters: A LitRPG Adventure | Shirtaloon & Travis Deverell | 28h 54m | `/book/he-who-fights-with-monsters-shirtaloon-travis-deverell/` | LitRPG, Fantasy, Isekai |
| 168 | Defiance of the Fall: A LitRPG Adventure | TheFirstDefier & JF Brink | 24h 53m | `/book/defiance-of-the-fall-jf-brink-thefirstdefier/` | LitRPG, Progression Fantasy, Cultivation |
| 169 | The Primal Hunter: A LitRPG Adventure | Zogarth | 25h 5m | `/book/the-primal-hunter-zogarth/` | LitRPG, Progression Fantasy, Action |
| 170 | Iron Prince: Warformed: Stormweaver, Book 1 | Bryce O'Connor & Luke Chmilenko | 33h 56m | `/book/iron-prince-bryce-oconnor-luke-chmilenko/` | Sci-Fi, Progression Fantasy, LitRPG |
| 171 | Shadeslinger: The Ripple System, Book 1 | Kyle Kirrin | 17h 41m | `/book/shadeslinger-kyle-kirrin/` | LitRPG, GameLit, Fantasy |
| 172 | Awaken Online: Catharsis | Travis Bagwell | 16h 25m | `/book/awaken-online-catharsis-travis-bagwell/` | LitRPG, GameLit, Dark Fantasy |
| 173 | The Girl with the Dragon Tattoo | Stieg Larsson | 16h 14m | `/book/the-girl-with-the-dragon-tattoo-stieg-larsson/` | Nordic Noir, Mystery, Psychological Thriller |
| 174 | Mercy (The Keeper of Lost Causes) | Jussi Adler-Olsen | 13h 1m | `/book/mercy-jussi-adler-olsen/` | Nordic Noir, Mystery, Crime |
| 175 | The Chestnut Man | S\u00f8ren Sveistrup | 17h 5m | `/book/the-chestnut-man-soren-sveistrup/` | Nordic Noir, Psychological Thriller, Mystery |
| 176 | The Hypnotist | Lars Kepler | 15h 50m | `/book/the-hypnotist-lars-kepler/` | Nordic Noir, Psychological Thriller, Mystery |
| 177 | The Ice Princess | Camilla L\u00e4ckberg | 11h 50m | `/book/the-ice-princess-camilla-lackberg/` | Nordic Noir, Mystery, Crime |
| 178 | The Bat | Jo Nesb\u00f8 | 10h 46m | `/book/the-bat-jo-nesbo/` | Nordic Noir, Detective, Crime |
| 179 | Faceless Killers | Henning Mankell | 9h 45m | `/book/faceless-killers-henning-mankell/` | Nordic Noir, Police Procedural, Mystery |
| 180 | I'm Travelling Alone | Samuel Bj\u00f8rk | 12h 45m | `/book/im-travelling-alone-samuel-bjork/` | Nordic Noir, Psychological Thriller, Mystery |
| 181 | The Blade Itself | Joe Abercrombie | 22h 15m | `/book/the-blade-itself-joe-abercrombie/` | Grimdark Fantasy, Epic Fantasy, Dark Fantasy |
| 182 | The Lies of Locke Lamora | Scott Lynch | 21h 59m | `/book/the-lies-of-locke-lamora-scott-lynch/` | Grimdark Fantasy, Heist, Low Fantasy |
| 183 | Gardens of the Moon | Steven Erikson | 26h 4m | `/book/gardens-of-the-moon-steven-erikson/` | Grimdark Fantasy, Epic Fantasy, Military Fantasy |
| 184 | The Black Company | Glen Cook | 10h 19m | `/book/the-black-company-glen-cook/` | Grimdark Fantasy, Military Fantasy, Sword and Sorcery |
| 185 | The Poppy War | R.F. Kuang | 19h 15m | `/book/the-poppy-war-rf-kuang/` | Grimdark Fantasy, Historical Fantasy, Military Fantasy |
| 186 | Promise of Blood | Brian McClellan | 19h 28m | `/book/promise-of-blood-brian-mcclellan/` | Grimdark Fantasy, Military Fantasy, Mystery |
| 187 | Priest of Bones | Peter McLean | 10h 5m | `/book/priest-of-bones-peter-mclean/` | Grimdark Fantasy, Crime, Low Fantasy |
| 188 | Red Sister | Mark Lawrence | 19h 45m | `/book/red-sister-mark-lawrence/` | Grimdark Fantasy, Dark Fantasy, Epic Fantasy |
| 189 | The House in the Cerulean Sea | TJ Klune | 12h 12m | `/book/the-house-in-the-cerulean-sea-tj-klune/` | Cozy Fantasy, Found Family, LGBTQ+ |
| 190 | The Hands of the Emperor | Victoria Goddard | 31h 37m | `/book/the-hands-of-the-emperor-victoria-goddard/` | Cozy Fantasy, Slice of Life, Epic Fantasy |
| 191 | The Spellshop | Sarah Beth Durst | 12h 19m | `/book/the-spellshop-sarah-beth-durst/` | Cozy Fantasy, Romance, Slice of Life |
| 192 | Legends & Lattes | Travis Baldree | 8h 35m | `/book/legends-and-lattes-travis-baldree/` | Cozy Fantasy, Romance, Slice of Life |
| 193 | The Goblin Emperor | Katherine Addison | 11h 36m | `/book/the-goblin-emperor-katherine-addison/` | Cozy Fantasy, Court Intrigue, High Fantasy |
| 194 | Can't Spell Treason Without Tea | Rebecca Thorne | 11h 25m | `/book/cant-spell-treason-without-tea-rebecca-thorne/` | Cozy Fantasy, Romance, LGBTQ+ |
| 195 | Tress of the Emerald Sea | Brandon Sanderson | 12h 31m | `/book/tress-of-the-emerald-sea-brandon-sanderson/` | Cozy Fantasy, Adventure, Fairy Tale |
| 196 | Between | L.L. Starling | 30h 17m | `/book/between-ll-starling/` | Cozy Fantasy, Romance, Humour |
| 197 | Circe | Madeline Miller | 12h 8m | `/book/circe/` | Mythology, Fantasy, Historical Fiction |
| 198 | The Song of Achilles | Madeline Miller | 11h 15m | `/book/the-song-of-achilles/` | Mythology, Historical Fiction, Ancient World |
| 199 | Mythos | Stephen Fry | 15h 25m | `/book/mythos/` | Mythology, History, Ancient World |
| 200 | Clytemnestra | Costanza Casati | 13h 24m | `/book/clytemnestra/` | Mythology, Historical Fiction, Ancient World |
| 201 | Kaikeyi | Vaishnavi Patel | 15h 11m | `/book/kaikeyi/` | Mythology, Fantasy, Ancient World |
| 202 | A Thousand Ships | Natalie Haynes | 10h 5m | `/book/a-thousand-ships/` | Mythology, Historical Fiction, Ancient World |
| 203 | The Witch’s Heart | Genevieve Gornichec | 11h 40m | `/book/the-witchs-heart/` | Mythology, Fantasy, Historical Fiction |
| 204 | Ithaca | Claire North | 12h 45m | `/book/ithaca/` | Mythology, Historical Fiction, Ancient World |
| 205 | The Books of Enoch: The Angels, The Watchers and The Nephilim | Joseph Lumpkin | 11h 18m | `/book/the-books-of-enoch/` | Ancient World, History, Non-Fiction |
| 206 | Red Rising | Pierce Brown | 16h 12m | `/book/red-rising/` | Space Opera, Science Fiction, Dystopian |
| 207 | Empire of Silence | Christopher Ruocchio | 25h 58m | `/book/empire-of-silence/` | Space Opera, Science Fiction, Galactic Empire |
| 208 | A Memory Called Empire | Arkady Martine | 15h 37m | `/book/a-memory-called-empire/` | Space Opera, Science Fiction, Political |
| 209 | Shards of Earth | Adrian Tchaikovsky | 18h 41m | `/book/shards-of-earth/` | Space Opera, Science Fiction, Cosmic Horror |
| 210 | The Player of Games | Iain M. Banks | 11h 26m | `/book/the-player-of-games/` | Space Opera, Science Fiction, Philosophy |
| 211 | House of Suns | Alastair Reynolds | 18h 17m | `/book/house-of-suns/` | Space Opera, Science Fiction, Hard Sci-Fi |
| 212 | Ancillary Justice | Ann Leckie | 12h 40m | `/book/ancillary-justice/` | Space Opera, Science Fiction, AI |
| 213 | Children of Time | Adrian Tchaikovsky | 16h 31m | `/book/children-of-time/` | Space Opera, Science Fiction, Aliens |
| 214 | Slow Horses | Mick Herron | 9h 44m | `/book/slow-horses/` | British Espionage, Spy Thriller, Satire |
| 215 | Tinker Tailor Soldier Spy | John le Carré | 12h 8m | `/book/tinker-tailor-soldier-spy/` | British Espionage, Cold War, Classic |
| 216 | Berlin Game | Len Deighton | 10h 29m | `/book/berlin-game/` | British Espionage, Cold War, Historical Fiction |
| 217 | The Day of the Jackal | Frederick Forsyth | 13h 2m | `/book/the-day-of-the-jackal/` | British Espionage, Spy Thriller, Historical Fiction |
| 218 | Eye of the Needle | Ken Follett | 11h 1m | `/book/eye-of-the-needle/` | British Espionage, World War II, Historical Fiction |
| 219 | Restless | William Boyd | 10h 11m | `/book/restless/` | British Espionage, World War II, Historical Fiction |
| 220 | The Human Factor | Graham Greene | 9h 36m | `/book/the-human-factor/` | British Espionage, Cold War, Classic |
| 221 | A Perfect Spy | John le Carré | 19h 59m | `/book/a-perfect-spy/` | British Espionage, Cold War, Classic |
| 222 | An Officer and a Spy | Robert Harris | 16h 4m | `/book/an-officer-and-a-spy/` | British Espionage, Historical Fiction, Military |
| 223 | Project Hail Mary | Andy Weir | 16h 10m | `/book/project-hail-mary/` | Science Fiction, Space Survival, Hard Sci-Fi |
| 225 | A Court of Thorns and Roses | Sarah J. Maas | 16h 07m | `/book/a-court-of-thorns-and-roses-sarah-j-maas/` | Romantasy, Epic Fantasy, Fantasy |
| 226 | A Court of Mist and Fury | Sarah J. Maas | 23h 05m | `/book/a-court-of-mist-and-fury-sarah-j-maas/` | Romantasy, Epic Fantasy, Fantasy |
| 227 | A Court of Wings and Ruin | Sarah J. Maas | 25h 08m | `/book/a-court-of-wings-and-ruin-sarah-j-maas/` | Romantasy, Epic Fantasy, Fantasy |
| 228 | A Court of Silver Flames | Sarah J. Maas | 21h 48m | `/book/a-court-of-silver-flames-sarah-j-maas/` | Romantasy, Epic Fantasy, Fantasy |
| 224 | A Court of Splintered Harmony | Sarah J. Maas | 12h 01m | `/book/a-court-of-splintered-harmony-sarah-j-maas/` | Romantasy, Fantasy, Graphic Audio |
| 229 | World Without End | Ken Follett | 45h 34m | `/book/world-without-end-ken-follett/` | Historical Fiction, Classics, Medieval History |
| 230 | The Little Friend | Donna Tartt | 24h 22m | `/book/the-little-friend-donna-tartt/` | Southern Gothic, Literary Fiction, Mystery |
| 231 | The Reality Dysfunction | Peter F. Hamilton | 41h 6m | `/book/the-reality-dysfunction-peter-f-hamilton/` | Space Opera, Science Fiction, Hard Sci-Fi |
| 232 | Nicholas and Alexandra | Robert K. Massie | 27h 2m | `/book/nicholas-and-alexandra-robert-k-massie/` | Biography, Russian History, Non-Fiction |
| 233 | The Idiot | Fyodor Dostoevsky | 24h 56m | `/book/the-idiot-fyodor-dostoevsky/` | Classics, Russian Literature, Philosophical Fiction |
| 234 | The Honourable Schoolboy | John le Carré | 20h 31m | `/book/the-honourable-schoolboy-john-le-carre/` | British Espionage, Cold War, Espionage |
| 235 | Eyes of the Void | Adrian Tchaikovsky | 20h 44m | `/book/eyes-of-the-void-adrian-tchaikovsky/` | Space Opera, Science Fiction, Cosmic Horror |
| 236 | Resurrection | Leo Tolstoy | 19h 24m | `/book/resurrection-leo-tolstoy/` | Classics, Russian Literature, Philosophical Fiction |
| 237 | Carl's Doomsday Scenario: Dungeon Crawler Carl, Book 2 | Matt Dinniman | 11h 28m | `/book/carls-doomsday-scenario-matt-dinniman/` | LitRPG, GameLit, Sci-Fi |
| 238 | The Dungeon Anarchist's Cookbook: Dungeon Crawler Carl, Book 3 | Matt Dinniman | 16h 54m | `/book/the-dungeon-anarchists-cookbook-matt-dinniman/` | LitRPG, GameLit, Sci-Fi |
| 239 | The Gate of the Feral Gods: Dungeon Crawler Carl, Book 4 | Matt Dinniman | 18h 3m | `/book/the-gate-of-the-feral-gods-matt-dinniman/` | LitRPG, GameLit, Sci-Fi |
| 240 | The Butcher's Masquerade: Dungeon Crawler Carl, Book 5 | Matt Dinniman | 23h 33m | `/book/the-butchers-masquerade-matt-dinniman/` | LitRPG, GameLit, Sci-Fi |
| 241 | The Eye of the Bedlam Bride: Dungeon Crawler Carl, Book 6 | Matt Dinniman | 26h 46m | `/book/the-eye-of-the-bedlam-bride-matt-dinniman/` | LitRPG, GameLit, Sci-Fi |
| 242 | This Inevitable Ruin: Dungeon Crawler Carl, Book 7 | Matt Dinniman | 28h 40m | `/book/this-inevitable-ruin-matt-dinniman/` | LitRPG, GameLit, Sci-Fi |
| 243 | Chrysalis, Books 1-3: A LitRPG Adventure Box Set | RinoZ | 54h 41m | `/book/chrysalis-books-1-3-rinoz/` | LitRPG, GameLit, Progression Fantasy |
| 244 | Life Reset: A LitRPG Novel: New Era Online, Book 1 | Shemer Kuznits | 24h 41m | `/book/life-reset-shemer-kuznits/` | LitRPG, GameLit, Fantasy |
| 245 | Life Reset: EvP: (Environment vs. Player): New Era Online, Book 2 | Shemer Kuznits | 21h 53m | `/book/life-reset-evp-shemer-kuznits/` | LitRPG, GameLit, Fantasy |
| 246 | Life Reset: Hobnobbing: New Era Online, Book 3 | Shemer Kuznits | 15h 23m | `/book/life-reset-hobnobbing-shemer-kuznits/` | LitRPG, GameLit, Fantasy |
| 247 | Life Reset: Human Resource: New Era Online, Book 4 | Shemer Kuznits | 16h 15m | `/book/life-reset-human-resource-shemer-kuznits/` | LitRPG, GameLit, Fantasy |
| 248 | Life Reset: Conquest: Life Reset - Neo, Book 5 | Shemer Kuznits | 13h 18m | `/book/life-reset-conquest-shemer-kuznits/` | LitRPG, GameLit, Fantasy |
| 249 | Life Reset: Salvation: New Era Online, Book 6 | Shemer Kuznits | 16h 47m | `/book/life-reset-salvation-shemer-kuznits/` | LitRPG, GameLit, Fantasy |
| 250 | The Winter of Our Discontent | John Steinbeck | 10h 22m | `/book/the-winter-of-our-discontent-john-steinbeck/` | Classics, Literary Fiction, Historical Fiction |
| 251 | The Toilers of the Sea | Victor Hugo | 15h 57m | `/book/the-toilers-of-the-sea-victor-hugo/` | Classics, Literary Fiction, Historical Fiction |
| 252 | The Man Who Laughs | Victor Hugo | 22h 28m | `/book/the-man-who-laughs-victor-hugo/` | Classics, Literary Fiction, Historical Fiction |
| 253 | Anansi Boys | Neil Gaiman | 10h 03m | `/book/anansi-boys-neil-gaiman/` | Urban Fantasy, Mythology, Comedy |
| 254 | Neverwhere: Author's Preferred Text | Neil Gaiman | 12h 33m | `/book/neverwhere-neil-gaiman/` | Urban Fantasy, Dark Fantasy, Magical Realism |
| 255 | Heroes: Mortals and Monsters, Quests and Adventures | Stephen Fry | 15h 10m | `/book/heroes-stephen-fry/` | Mythology, Classics, History |
| 256 | Jurassic Park: A Novel | Michael Crichton | 15h 10m | `/book/jurassic-park-michael-crichton/` | Sci-Fi, Technothriller, Horror |
| 257 | Pillar to the Sky | William R. Forstchen | 15h 30m | `/book/pillar-to-the-sky-william-r-forstchen/` | Sci-Fi, Hard Sci-Fi, Technothriller |
| 258 | A Parade of Horribles: Dungeon Crawler Carl, Book 8 | Matt Dinniman | 20h 27m | `/book/a-parade-of-horribles-matt-dinniman/` | LitRPG, GameLit, Dark Comedy |
| 259 | Troy: Stephen Fry's Greek Myths, Book 3 | Stephen Fry | 11h 10m | `/book/troy-stephen-fry/` | Mythology, Classics, History |
| 260 | Odyssey: Stephen Fry's Greek Myths, Book 4 | Stephen Fry | 10h 36m | `/book/odyssey-stephen-fry/` | Mythology, Classics, History |
| 261 | Harry Potter and the Chamber of Secrets | J.K. Rowling | 9h 37m | `/book/harry-potter-and-the-chamber-of-secrets-j-k-rowling/` | Full-Cast, Magic School, Fantasy |
| 262 | Harry Potter and the Prisoner of Azkaban | J.K. Rowling | 11h 32m | `/book/harry-potter-and-the-prisoner-of-azkaban-j-k-rowling/` | Full-Cast, Magic School, Fantasy |
| 263 | Harry Potter and the Goblet of Fire | J.K. Rowling | 20h 13m | `/book/harry-potter-and-the-goblet-of-fire-j-k-rowling/` | Full-Cast, Magic School, Fantasy |
| 264 | Harry Potter and the Order of the Phoenix | J.K. Rowling | 26h 39m | `/book/harry-potter-and-the-order-of-the-phoenix-j-k-rowling/` | Full-Cast, Magic School, Fantasy |
| 265 | Harry Potter and the Half-Blood Prince | J.K. Rowling | 17h 24m | `/book/harry-potter-and-the-half-blood-prince-j-k-rowling/` | Full-Cast, Magic School, Fantasy |
| 266 | Harry Potter and the Deathly Hallows | J.K. Rowling | 20h 30m | `/book/harry-potter-and-the-deathly-hallows-j-k-rowling/` | Full-Cast, Magic School, Fantasy |
| 267 | Before They Are Hanged | Joe Abercrombie | 22h 38m | `/book/before-they-are-hanged-joe-abercrombie/` | Fantasy, Grimdark, Dark Fantasy |
| 268 | Last Argument of Kings | Joe Abercrombie | 27h 3m | `/book/last-argument-of-kings-joe-abercrombie/` | Fantasy, Grimdark, Dark Fantasy |
| 269 | Smiley’s People | John le Carré | 14h 12m | `/book/smileys-people-john-le-carre/` | Thriller, Classics, Historical Fiction |
| 270 | Lords of Uncreation | Adrian Tchaikovsky | 20h 49m | `/book/lords-of-uncreation-adrian-tchaikovsky/` | Sci-Fi, Space Opera, Science Fiction |
| 271 | Children of Ruin | Adrian Tchaikovsky | 15h 25m | `/book/children-of-ruin-adrian-tchaikovsky/` | Sci-Fi, Space Opera, Speculative Fiction |
| 272 | Children of Memory | Adrian Tchaikovsky | 13h 25m | `/book/children-of-memory-adrian-tchaikovsky/` | Sci-Fi, Space Opera, Speculative Fiction |
| 273 | Red Seas Under Red Skies | Scott Lynch | 25h 34m | `/book/red-seas-under-red-skies-scott-lynch/` | Fantasy, Heist, Low Fantasy |
| 274 | The Republic of Thieves | Scott Lynch | 23h 43m | `/book/the-republic-of-thieves-scott-lynch/` | Fantasy, Heist, Low Fantasy |
| 275 | The Dragon Republic | R.F. Kuang | 23h 46m | `/book/the-dragon-republic-rf-kuang/` | Fantasy, Historical Fantasy, Military Fantasy |
| 276 | The Burning God | R.F. Kuang | 23h 46m | `/book/the-burning-god-rf-kuang/` | Fantasy, Historical Fantasy, Military Fantasy |
| 277 | The Twelve | Justin Cronin | 26h 22m | `/book/the-twelve-justin-cronin/` | Horror, Sci-Fi, Post-Apocalyptic |
| 278 | The City of Mirrors | Justin Cronin | 29h 29m | `/book/the-city-of-mirrors-justin-cronin/` | Horror, Sci-Fi, Post-Apocalyptic |
| 279 | Fire and Song: Warformed: Stormweaver, Book 2 | Bryce O'Connor & Luke Chmilenko | 32h 37m | `/book/fire-and-song-bryce-oconnor-luke-chmilenko/` | Sci-Fi, Progression Fantasy, LitRPG |
| 280 | Golden Son | Pierce Brown | 19h 3m | `/book/golden-son-pierce-brown/` | Sci-Fi, Dystopian, Space Opera |
| 281 | Morning Star | Pierce Brown | 21h 50m | `/book/morning-star-pierce-brown/` | Sci-Fi, Dystopian, Space Opera |
| 282 | Iron Gold | Pierce Brown | 23h 23m | `/book/iron-gold-pierce-brown/` | Sci-Fi, Dystopian, Space Opera |
| 283 | Dark Age | Pierce Brown | 33h 58m | `/book/dark-age-pierce-brown/` | Sci-Fi, Dystopian, Space Opera |
| 284 | Light Bringer | Pierce Brown | 30h 8m | `/book/light-bringer-pierce-brown/` | Sci-Fi, Dystopian, Space Opera |
| 285 | The Evening and the Morning | Ken Follett | 24h 19m | `/book/the-evening-and-the-morning-ken-follett/` | Historical Fiction, Classics, Epic |
| 286 | A Column of Fire | Ken Follett | 30h 19m | `/book/a-column-of-fire-ken-follett/` | Historical Fiction, Classics, Epic |
| 287 | The Armor of Light | Ken Follett | 21h 39m | `/book/the-armor-of-light-ken-follett/` | Historical Fiction, Classics, Epic |
| 288 | Howling Dark | Christopher Ruocchio | 31h 25m | `/book/howling-dark-christopher-ruocchio/` | Sci-Fi, Space Opera, Epic Fantasy |
| 289 | Demon in White | Christopher Ruocchio | 35h 59m | `/book/demon-in-white-christopher-ruocchio/` | Sci-Fi, Space Opera, Epic Fantasy |
| 290 | Kingdoms of Death | Christopher Ruocchio | 22h 50m | `/book/kingdoms-of-death-christopher-ruocchio/` | Sci-Fi, Space Opera, Epic Fantasy |
| 291 | Ashes of Man | Christopher Ruocchio | 22h 33m | `/book/ashes-of-man-christopher-ruocchio/` | Sci-Fi, Space Opera, Epic Fantasy |
| 292 | Disquiet Gods | Christopher Ruocchio | 31h 38m | `/book/disquiet-gods-christopher-ruocchio/` | Sci-Fi, Space Opera, Epic Fantasy |
| 293 | Shadows Upon Time | Christopher Ruocchio | 44h 26m | `/book/shadows-upon-time-christopher-ruocchio/` | Sci-Fi, Space Opera, Epic Fantasy |
| 294 | Caliban's War | James S.A. Corey | 21h 0m | `/book/calibans-war-james-sa-corey/` | Sci-Fi, Space Opera, Hard Sci-Fi |
| 295 | Abaddon's Gate | James S.A. Corey | 19h 42m | `/book/abaddons-gate-james-sa-corey/` | Sci-Fi, Space Opera, Hard Sci-Fi |
| 296 | Cibola Burn | James S.A. Corey | 20h 7m | `/book/cibola-burn-james-sa-corey/` | Sci-Fi, Space Opera, Hard Sci-Fi |
| 297 | Nemesis Games | James S.A. Corey | 18h 6m | `/book/nemesis-games-james-sa-corey/` | Sci-Fi, Space Opera, Hard Sci-Fi |
| 298 | Babylon's Ashes | James S.A. Corey | 19h 58m | `/book/babylons-ashes-james-sa-corey/` | Sci-Fi, Space Opera, Hard Sci-Fi |
| 299 | Persepolis Rising | James S.A. Corey | 20h 34m | `/book/persepolis-rising-james-sa-corey/` | Sci-Fi, Space Opera, Hard Sci-Fi |
| 300 | Tiamat's Wrath | James S.A. Corey | 19h 8m | `/book/tiamats-wrath-james-sa-corey/` | Sci-Fi, Space Opera, Hard Sci-Fi |
| 301 | Leviathan Falls | James S.A. Corey | 19h 39m | `/book/leviathan-falls-james-sa-corey/` | Sci-Fi, Space Opera, Hard Sci-Fi |
| 302 | God Emperor of Dune | Frank Herbert | 15h 48m | `/book/god-emperor-of-dune-frank-herbert/` | Sci-Fi, Space Opera, Philosophical Fiction |
| 303 | Heretics of Dune | Frank Herbert | 18h 4m | `/book/heretics-of-dune-frank-herbert/` | Sci-Fi, Space Opera, Philosophical Fiction |
| 304 | Chapterhouse: Dune | Frank Herbert | 16h 42m | `/book/chapterhouse-dune-frank-herbert/` | Sci-Fi, Space Opera, Philosophical Fiction |
| 305 | Best Served Cold | Joe Abercrombie | 26h 28m | `/book/best-served-cold-joe-abercrombie/` | Grimdark, Epic Fantasy, Dark Fantasy |
| 306 | The Heroes | Joe Abercrombie | 23h 5m | `/book/the-heroes-joe-abercrombie/` | Grimdark, Epic Fantasy, Military Fantasy |
| 307 | Red Country | Joe Abercrombie | 19h 52m | `/book/red-country-joe-abercrombie/` | Grimdark, Epic Fantasy, Western |
| 308 | The Crimson Campaign | Brian McClellan | 20h 2m | `/book/the-crimson-campaign-brian-mcclellan/` | Flintlock Fantasy, Military Fantasy, Epic Fantasy |
| 309 | The Autumn Republic | Brian McClellan | 19h 23m | `/book/the-autumn-republic-brian-mcclellan/` | Flintlock Fantasy, Military Fantasy, Epic Fantasy |
| 310 | The Girl Who Played with Fire | Stieg Larsson | 20h 49m | `/book/the-girl-who-played-with-fire-stieg-larsson/` | Nordic Noir, Mystery, Psychological Thriller |
| 311 | The Girl Who Kicked the Hornets' Nest | Stieg Larsson | 25h 6m | `/book/the-girl-who-kicked-the-hornets-nest-stieg-larsson/` | Nordic Noir, Mystery, Psychological Thriller |
| 312 | The Girl in the Spider's Web | David Lagercrantz | 16h 46m | `/book/the-girl-in-the-spiders-web-david-lagercrantz/` | Nordic Noir, Mystery, Cyber Thriller |
| 313 | The Girl Who Takes an Eye for an Eye | David Lagercrantz | 13h 32m | `/book/the-girl-who-takes-an-eye-for-an-eye-david-lagercrantz/` | Nordic Noir, Mystery, Crime |
| 314 | The Girl Who Lived Twice | David Lagercrantz | 11h 47m | `/book/the-girl-who-lived-twice-david-lagercrantz/` | Nordic Noir, Mystery, Crime |
| 315 | The Girl in the Eagle's Talons | Karin Smirnoff | 12h 21m | `/book/the-girl-in-the-eagles-talons-karin-smirnoff/` | Nordic Noir, Mystery, Crime |
| 316 | The Girl with Ice in Her Veins | Karin Smirnoff | 11h 32m | `/book/the-girl-with-ice-in-her-veins-karin-smirnoff/` | Nordic Noir, Mystery, Crime |
| 317 | Bookshops & Bonedust | Travis Baldree | 8h 1m | `/book/bookshops-and-bonedust-travis-baldree/` | Cozy Fantasy, High Fantasy, Fantasy Romance |
| 318 | He Who Fights with Monsters 2 | Shirtaloon & Travis Deverell | 22h 1m | `/book/he-who-fights-with-monsters-2-shirtaloon-travis-deverell/` | LitRPG, Fantasy, Isekai |
| 319 | He Who Fights with Monsters 3 | Shirtaloon & Travis Deverell | 24h 39m | `/book/he-who-fights-with-monsters-3-shirtaloon-travis-deverell/` | LitRPG, Fantasy, Isekai |
| 320 | He Who Fights with Monsters 4 | Shirtaloon & Travis Deverell | 22h 20m | `/book/he-who-fights-with-monsters-4-shirtaloon-travis-deverell/` | LitRPG, Fantasy, Isekai |
| 321 | He Who Fights with Monsters 5 | Shirtaloon & Travis Deverell | 20h 5m | `/book/he-who-fights-with-monsters-5-shirtaloon-travis-deverell/` | LitRPG, Fantasy, Isekai |
| 322 | He Who Fights with Monsters 6 | Shirtaloon & Travis Deverell | 15h 49m | `/book/he-who-fights-with-monsters-6-shirtaloon-travis-deverell/` | LitRPG, Fantasy, Isekai |
| 323 | He Who Fights with Monsters 7 | Shirtaloon & Travis Deverell | 18h 39m | `/book/he-who-fights-with-monsters-7-shirtaloon-travis-deverell/` | LitRPG, Fantasy, Isekai |
| 324 | He Who Fights with Monsters 8 | Shirtaloon & Travis Deverell | 18h 12m | `/book/he-who-fights-with-monsters-8-shirtaloon-travis-deverell/` | LitRPG, Fantasy, Isekai |
| 325 | He Who Fights with Monsters 9 | Shirtaloon & Travis Deverell | 28h 3m | `/book/he-who-fights-with-monsters-9-shirtaloon-travis-deverell/` | LitRPG, Fantasy, Isekai |
| 326 | He Who Fights with Monsters 10 | Shirtaloon & Travis Deverell | 25h 18m | `/book/he-who-fights-with-monsters-10-shirtaloon-travis-deverell/` | LitRPG, Fantasy, Isekai |
| 327 | He Who Fights with Monsters 11 | Shirtaloon & Travis Deverell | 26h 19m | `/book/he-who-fights-with-monsters-11-shirtaloon-travis-deverell/` | LitRPG, Fantasy, Isekai |
| 328 | He Who Fights with Monsters 12 | Shirtaloon & Travis Deverell | 19h 26m | `/book/he-who-fights-with-monsters-12-shirtaloon-travis-deverell/` | LitRPG, Fantasy, Isekai |
| 329 | He Who Fights with Monsters 13 | Shirtaloon & Travis Deverell | 22h 21m | `/book/he-who-fights-with-monsters-13-shirtaloon-travis-deverell/` | LitRPG, Fantasy, Isekai |
| 330 | The Primal Hunter 2 | Zogarth | 19h 25m | `/book/the-primal-hunter-2-zogarth/` | LitRPG, Progression Fantasy, Action |
| 331 | The Primal Hunter 3 | Zogarth | 18h 23m | `/book/the-primal-hunter-3-zogarth/` | LitRPG, Progression Fantasy, Action |
| 332 | The Primal Hunter 4 | Zogarth | 20h 28m | `/book/the-primal-hunter-4-zogarth/` | LitRPG, Progression Fantasy, Action |
| 333 | The Primal Hunter 5 | Zogarth | 17h 47m | `/book/the-primal-hunter-5-zogarth/` | LitRPG, Progression Fantasy, Action |
| 334 | The Primal Hunter 6 | Zogarth | 20h 8m | `/book/the-primal-hunter-6-zogarth/` | LitRPG, Progression Fantasy, Action |
| 335 | The Primal Hunter 7 | Zogarth | 17h 49m | `/book/the-primal-hunter-7-zogarth/` | LitRPG, Progression Fantasy, Action |
| 336 | The Primal Hunter 8 | Zogarth | 19h 50m | `/book/the-primal-hunter-8-zogarth/` | LitRPG, Progression Fantasy, Action |
| 337 | The Primal Hunter 9 | Zogarth | 20h 23m | `/book/the-primal-hunter-9-zogarth/` | LitRPG, Progression Fantasy, Action |
| 338 | The Primal Hunter 10 | Zogarth | 20h 23m | `/book/the-primal-hunter-10-zogarth/` | LitRPG, Progression Fantasy, Action |
| 339 | The Primal Hunter 11 | Zogarth | 23h 31m | `/book/the-primal-hunter-11-zogarth/` | LitRPG, Progression Fantasy, Action |
| 340 | The Primal Hunter 12 | Zogarth | 20h 7m | `/book/the-primal-hunter-12-zogarth/` | LitRPG, Progression Fantasy, Action |
| 341 | The Primal Hunter 13 | Zogarth | 20h 10m | `/book/the-primal-hunter-13-zogarth/` | LitRPG, Progression Fantasy, Action |
| 342 | The Primal Hunter 14 | Zogarth | 18h 38m | `/book/the-primal-hunter-14-zogarth/` | LitRPG, Progression Fantasy, Action |
| 343 | The Primal Hunter 15 | Zogarth | 21h 3m | `/book/the-primal-hunter-15-zogarth/` | LitRPG, Progression Fantasy, Action |
| 344 | Defiance of the Fall 2 | TheFirstDefier & JF Brink | 24h 30m | `/book/defiance-of-the-fall-2-jf-brink-thefirstdefier/` | LitRPG, Progression Fantasy, Cultivation |
| 345 | Defiance of the Fall 3 | TheFirstDefier & JF Brink | 24h 34m | `/book/defiance-of-the-fall-3-jf-brink-thefirstdefier/` | LitRPG, Progression Fantasy, Cultivation |
| 346 | Defiance of the Fall 4 | TheFirstDefier & JF Brink | 22h 47m | `/book/defiance-of-the-fall-4-jf-brink-thefirstdefier/` | LitRPG, Progression Fantasy, Cultivation |
| 347 | Defiance of the Fall 5 | TheFirstDefier & JF Brink | 24h 11m | `/book/defiance-of-the-fall-5-jf-brink-thefirstdefier/` | LitRPG, Progression Fantasy, Cultivation |
| 348 | Defiance of the Fall 6 | TheFirstDefier & JF Brink | 23h 1m | `/book/defiance-of-the-fall-6-jf-brink-thefirstdefier/` | LitRPG, Progression Fantasy, Cultivation |
| 349 | Defiance of the Fall 7 | TheFirstDefier & JF Brink | 23h 3m | `/book/defiance-of-the-fall-7-jf-brink-thefirstdefier/` | LitRPG, Progression Fantasy, Cultivation |
| 350 | Defiance of the Fall 8 | TheFirstDefier & JF Brink | 23h 22m | `/book/defiance-of-the-fall-8-jf-brink-thefirstdefier/` | LitRPG, Progression Fantasy, Cultivation |
| 351 | Defiance of the Fall 9 | TheFirstDefier & JF Brink | 22h 34m | `/book/defiance-of-the-fall-9-jf-brink-thefirstdefier/` | LitRPG, Progression Fantasy, Cultivation |
| 352 | Defiance of the Fall 10 | TheFirstDefier & JF Brink | 20h 8m | `/book/defiance-of-the-fall-10-jf-brink-thefirstdefier/` | LitRPG, Progression Fantasy, Cultivation |
| 353 | Defiance of the Fall 11 | TheFirstDefier & JF Brink | 24h 47m | `/book/defiance-of-the-fall-11-jf-brink-thefirstdefier/` | LitRPG, Progression Fantasy, Cultivation |
| 354 | Defiance of the Fall 12 | TheFirstDefier & JF Brink | 26h 24m | `/book/defiance-of-the-fall-12-jf-brink-thefirstdefier/` | LitRPG, Progression Fantasy, Cultivation |
| 355 | Defiance of the Fall 13 | TheFirstDefier & JF Brink | 24h 35m | `/book/defiance-of-the-fall-13-jf-brink-thefirstdefier/` | LitRPG, Progression Fantasy, Cultivation |
| 356 | Defiance of the Fall 14 | TheFirstDefier & JF Brink | 21h 54m | `/book/defiance-of-the-fall-14-jf-brink-thefirstdefier/` | LitRPG, Progression Fantasy, Cultivation |
| 357 | Defiance of the Fall 15 | TheFirstDefier & JF Brink | 21h 38m | `/book/defiance-of-the-fall-15-jf-brink-thefirstdefier/` | LitRPG, Progression Fantasy, Cultivation |
| 358 | Defiance of the Fall 16 | TheFirstDefier & JF Brink | 22h 17m | `/book/defiance-of-the-fall-16-jf-brink-thefirstdefier/` | LitRPG, Progression Fantasy, Cultivation |
| 359 | Defiance of the Fall 17 | TheFirstDefier & JF Brink | 24h 45m | `/book/defiance-of-the-fall-17-jf-brink-thefirstdefier/` | LitRPG, Progression Fantasy, Cultivation |
| 360 | Black Sand Baron: The Ripple System, Book 2 | Kyle Kirrin | 20h 1m | `/book/black-sand-baron-kyle-kirrin/` | LitRPG, GameLit, Fantasy |
| 361 | Gilded Ghost: The Ripple System, Book 3 | Kyle Kirrin | 21h 28m | `/book/gilded-ghost-kyle-kirrin/` | LitRPG, GameLit, Fantasy |
| 362 | Shattersoul: The Ripple System, Book 4 | Kyle Kirrin | 20h 15m | `/book/shattersoul-kyle-kirrin/` | LitRPG, GameLit, Fantasy |
| 363 | Emperor's End: The Ripple System, Book 5 | Kyle Kirrin | 16h 18m | `/book/emperors-end-kyle-kirrin/` | LitRPG, GameLit, Fantasy |
| 364 | Lunatic's Landing: The Ripple System, Book 6 | Kyle Kirrin | 16h 28m | `/book/lunatics-landing-kyle-kirrin/` | LitRPG, GameLit, Fantasy |
| 365 | The Fires of Heaven | Robert Jordan | 36h 27m | `/book/the-fires-of-heaven-robert-jordan/` | Fantasy, Epic Fantasy, High Fantasy |
| 366 | Lord of Chaos | Robert Jordan | 41h 32m | `/book/lord-of-chaos-robert-jordan/` | Fantasy, Epic Fantasy, High Fantasy |
| 367 | A Crown of Swords | Robert Jordan | 30h 24m | `/book/a-crown-of-swords-robert-jordan/` | Fantasy, Epic Fantasy, High Fantasy |
| 368 | The Path of Daggers | Robert Jordan | 23h 25m | `/book/the-path-of-daggers-robert-jordan/` | Fantasy, Epic Fantasy, High Fantasy |
| 369 | Winter's Heart | Robert Jordan | 24h 12m | `/book/winters-heart-robert-jordan/` | Fantasy, Epic Fantasy, High Fantasy |
| 370 | Crossroads of Twilight | Robert Jordan | 26h 4m | `/book/crossroads-of-twilight-robert-jordan/` | Fantasy, Epic Fantasy, High Fantasy |
| 371 | Knife of Dreams | Robert Jordan | 32h 19m | `/book/knife-of-dreams-robert-jordan/` | Fantasy, Epic Fantasy, High Fantasy |
| 372 | The Gathering Storm | Robert Jordan, Brandon Sanderson | 33h 3m | `/book/the-gathering-storm-robert-jordan-brandon-sanderson/` | Fantasy, Epic Fantasy, High Fantasy |
| 373 | Towers of Midnight | Robert Jordan, Brandon Sanderson | 38h 23m | `/book/towers-of-midnight-robert-jordan-brandon-sanderson/` | Fantasy, Epic Fantasy, High Fantasy |
| 374 | A Memory of Light | Robert Jordan, Brandon Sanderson | 41h 47m | `/book/a-memory-of-light-robert-jordan-brandon-sanderson/` | Fantasy, Epic Fantasy, High Fantasy |
| 375 | New Spring | Robert Jordan | 12h 37m | `/book/new-spring-robert-jordan/` | Fantasy, Epic Fantasy, High Fantasy |
| 376 | The Last Light: The Wandering Inn, Book 5 | Pirateaba | 52h 17m | `/book/the-last-light-the-wandering-inn-book-5-pirateaba/` | Fantasy, LitRPG, Slice of Life |
| 377 | The General of Izril: The Wandering Inn, Book 6 | Pirateaba | 34h 1m | `/book/the-general-of-izril-the-wandering-inn-book-6-pirateaba/` | Fantasy, LitRPG, Slice of Life |
| 378 | Rains of Liscor: The Wandering Inn, Book 7 | Pirateaba | 33h 52m | `/book/rains-of-liscor-the-wandering-inn-book-7-pirateaba/` | Fantasy, LitRPG, Slice of Life |
| 379 | Blood of Liscor: The Wandering Inn, Book 8 | Pirateaba | 43h 0m | `/book/blood-of-liscor-the-wandering-inn-book-8-pirateaba/` | Fantasy, LitRPG, Slice of Life |
| 380 | Tears of Liscor: The Wandering Inn, Book 9 | Pirateaba | 45h 21m | `/book/tears-of-liscor-the-wandering-inn-book-9-pirateaba/` | Fantasy, LitRPG, Slice of Life |
| 381 | The Wind Runner: The Wandering Inn, Book 10 | Pirateaba | 36h 30m | `/book/the-wind-runner-the-wandering-inn-book-10-pirateaba/` | Fantasy, LitRPG, Slice of Life |
| 382 | The Titan of Baleros: The Wandering Inn, Book 11 | Pirateaba | 40h 55m | `/book/the-titan-of-baleros-the-wandering-inn-book-11-pirateaba/` | Fantasy, LitRPG, Slice of Life |
| 383 | Witch of Webs: The Wandering Inn, Book 12 | Pirateaba | 45h 53m | `/book/witch-of-webs-the-wandering-inn-book-12-pirateaba/` | Fantasy, LitRPG, Slice of Life |
| 384 | The Empress of Beasts: The Wandering Inn, Book 13 | Pirateaba | 28h 59m | `/book/the-empress-of-beasts-the-wandering-inn-book-13-pirateaba/` | Fantasy, LitRPG, Slice of Life |
| 385 | Hell's Wardens: The Wandering Inn, Book 14 | Pirateaba | 26h 32m | `/book/hells-wardens-the-wandering-inn-book-14-pirateaba/` | Fantasy, LitRPG, Slice of Life |
| 386 | Garden of Sanctuary: The Wandering Inn, Book 15 | Pirateaba | 31h 13m | `/book/garden-of-sanctuary-the-wandering-inn-book-15-pirateaba/` | Fantasy, LitRPG, Slice of Life |
| 387 | King of Duels: The Wandering Inn, Book 16 | Pirateaba | 39h 30m | `/book/king-of-duels-the-wandering-inn-book-16-pirateaba/` | Fantasy, LitRPG, Slice of Life |
| 388 | Lady of Fire: The Wandering Inn, Book 17 | Pirateaba | 46h 21m | `/book/lady-of-fire-the-wandering-inn-book-17-pirateaba/` | Fantasy, LitRPG, Slice of Life |
| 389 | Archmage's Ire: The Wandering Inn, Book 18 | Pirateaba | 48h 16m | `/book/archmages-ire-the-wandering-inn-book-18-pirateaba/` | Fantasy, LitRPG, Slice of Life |
| 390 | Dead Lions: Slough House, Book 2 | Mick Herron | 11h 03m | `/book/dead-lions-mick-herron/` | British Espionage, Spy Thriller, Satire |
| 391 | Real Tigers: Slough House, Book 3 | Mick Herron | 10h 50m | `/book/real-tigers-mick-herron/` | British Espionage, Spy Thriller, Satire |
| 392 | Spook Street: Slough House, Book 4 | Mick Herron | 10h 21m | `/book/spook-street-mick-herron/` | British Espionage, Spy Thriller, Satire |
| 393 | London Rules: Slough House, Book 5 | Mick Herron | 10h 57m | `/book/london-rules-mick-herron/` | British Espionage, Spy Thriller, Satire |
| 394 | Joe Country: Slough House, Book 6 | Mick Herron | 10h 46m | `/book/joe-country-mick-herron/` | British Espionage, Spy Thriller, Satire |
| 395 | Slough House: Slough House, Book 7 | Mick Herron | 9h 48m | `/book/slough-house-mick-herron/` | British Espionage, Spy Thriller, Satire |
| 396 | Bad Actors: Slough House, Book 8 | Mick Herron | 10h 28m | `/book/bad-actors-mick-herron/` | British Espionage, Spy Thriller, Satire |
| 397 | Clown Town: Slough House, Book 9 | Mick Herron | 12h 06m | `/book/clown-town-mick-herron/` | British Espionage, Spy Thriller, Satire |
| 398 | The Secret Hours | Mick Herron | 12h 41m | `/book/the-secret-hours-mick-herron/` | British Espionage, Spy Thriller, Satire |
| 399 | Somewhere Beyond the Sea | TJ Klune | 15h 47m | `/book/somewhere-beyond-the-sea-tj-klune/` | Cozy Fantasy, Found Family, LGBTQ+ |
| 400 | A Day of Fallen Night | Samantha Shannon | 38h 48m | `/book/a-day-of-fallen-night-samantha-shannon/` | Fantasy, High Fantasy, Romantasy |
| 401 | A Desolation Called Peace | Arkady Martine | 17h 32m | `/book/a-desolation-called-peace-arkady-martine/` | Space Opera, Science Fiction, Political |
| 402 | A Pirate's Life for Tea | Rebecca Thorne | 13h 04m | `/book/a-pirates-life-for-tea-rebecca-thorne/` | Cozy Fantasy, Romance, LGBTQ+ |
| 403 | At the Feet of the Sun | Victoria Goddard | 38h 00m | `/book/at-the-feet-of-the-sun-victoria-goddard/` | Cozy Fantasy, Slice of Life, Epic Fantasy |
| 405 | Endymion: Hyperion Cantos, Book 3 | Dan Simmons | 23h 17m | `/book/endymion-dan-simmons/` | Space Opera, Science Fiction, Classic Sci-Fi |
| 406 | The Rise of Endymion: Hyperion Cantos, Book 4 | Dan Simmons | 29h 47m | `/book/the-rise-of-endymion-dan-simmons/` | Space Opera, Science Fiction, Classic Sci-Fi |
| 407 | Grey Sister: Book of the Ancestor, Book 2 | Mark Lawrence | 16h 02m | `/book/grey-sister-mark-lawrence/` | Grimdark Fantasy, Dark Fantasy, Epic Fantasy |
| 408 | Holy Sister: Book of the Ancestor, Book 3 | Mark Lawrence | 13h 54m | `/book/holy-sister-mark-lawrence/` | Grimdark Fantasy, Dark Fantasy, Epic Fantasy |
| 409 | Ancillary Sword: Imperial Radch, Book 2 | Ann Leckie | 11h 43m | `/book/ancillary-sword-ann-leckie/` | Space Opera, Science Fiction, AI |
| 410 | Ancillary Mercy: Imperial Radch, Book 3 | Ann Leckie | 10h 53m | `/book/ancillary-mercy-ann-leckie/` | Space Opera, Science Fiction, AI |
| 411 | Mexico Set: Bernard Samson, Book 2 | Len Deighton | 13h 26m | `/book/mexico-set-len-deighton/` | British Espionage, Cold War, Historical Fiction |
| 412 | London Match: Bernard Samson, Book 3 | Len Deighton | 14h 46m | `/book/london-match-len-deighton/` | British Espionage, Cold War, Historical Fiction |
| 413 | The Neutronium Alchemist: Night's Dawn, Book 2 | Peter F. Hamilton | 40h 21m | `/book/the-neutronium-alchemist-peter-f-hamilton/` | Space Opera, Science Fiction, Hard Sci-Fi |
| 414 | The Naked God: Night's Dawn, Book 3 | Peter F. Hamilton | 48h 37m | `/book/the-naked-god-peter-f-hamilton/` | Space Opera, Science Fiction, Hard Sci-Fi |
| 415 | A Little Hatred | Joe Abercrombie | 22h 32m | `/book/a-little-hatred-joe-abercrombie/` | Grimdark Fantasy, Epic Fantasy, Dark Fantasy |
| 416 | The Trouble with Peace | Joe Abercrombie | 22h 55m | `/book/the-trouble-with-peace-joe-abercrombie/` | Grimdark Fantasy, Epic Fantasy, Dark Fantasy |
| 417 | The Wisdom of Crowds | Joe Abercrombie | 23h 48m | `/book/the-wisdom-of-crowds-joe-abercrombie/` | Grimdark Fantasy, Epic Fantasy, Dark Fantasy |
| 418 | Shadow of Night | Deborah Harkness | 24h 50m | `/book/shadow-of-night-deborah-harkness/` | Fantasy, Urban Fantasy, Romance |
| 419 | The Book of Life | Deborah Harkness | 23h 30m | `/book/the-book-of-life-deborah-harkness/` | Fantasy, Urban Fantasy, Romance |
| 420 | Time's Convert | Deborah Harkness | 17h 45m | `/book/times-convert-deborah-harkness/` | Fantasy, Urban Fantasy, Romance |
| 421 | The Black Bird Oracle | Deborah Harkness | 17h 30m | `/book/the-black-bird-oracle-deborah-harkness/` | Fantasy, Urban Fantasy, Romance |
| 422 | The Angel's Game | Carlos Ruiz Zafón | 18h 15m | `/book/the-angels-game-carlos-ruiz-zafon/` | Magical Realism, Historical Fiction, Gothic Mystery |
| 423 | The Prisoner of Heaven | Carlos Ruiz Zafón | 8h 30m | `/book/the-prisoner-of-heaven-carlos-ruiz-zafon/` | Magical Realism, Historical Fiction, Gothic Mystery |
| 424 | The Labyrinth of the Spirits | Carlos Ruiz Zafón | 28h 15m | `/book/the-labyrinth-of-the-spirits-carlos-ruiz-zafon/` | Magical Realism, Historical Fiction, Gothic Mystery |
| 425 | Dragonfly in Amber | Diana Gabaldon | 43h 27m | `/book/dragonfly-in-amber-diana-gabaldon/` | Historical Fiction, Romance, Time Travel |
| 426 | Voyager | Diana Gabaldon | 43h 49m | `/book/voyager-diana-gabaldon/` | Historical Fiction, Romance, Time Travel |
| 427 | Drums of Autumn | Diana Gabaldon | 44h 47m | `/book/drums-of-autumn-diana-gabaldon/` | Historical Fiction, Romance, Time Travel |
| 428 | The Fiery Cross | Diana Gabaldon | 55h 32m | `/book/the-fiery-cross-diana-gabaldon/` | Historical Fiction, Romance, Time Travel |
| 429 | A Breath of Snow and Ashes | Diana Gabaldon | 57h 48m | `/book/a-breath-of-snow-and-ashes-diana-gabaldon/` | Historical Fiction, Romance, Time Travel |
| 430 | An Echo in the Bone | Diana Gabaldon | 46h 00m | `/book/an-echo-in-the-bone-diana-gabaldon/` | Historical Fiction, Romance, Time Travel |
| 431 | Written in My Own Heart's Blood | Diana Gabaldon | 45h 00m | `/book/written-in-my-own-hearts-blood-diana-gabaldon/` | Historical Fiction, Romance, Time Travel |
| 432 | Go Tell the Bees That I Am Gone | Diana Gabaldon | 49h 27m | `/book/go-tell-the-bees-that-i-am-gone-diana-gabaldon/` | Historical Fiction, Romance, Time Travel |
| 433 | The Alloy of Law | Brandon Sanderson | 10h 48m | `/book/the-alloy-of-law-brandon-sanderson/` | Fantasy, Steampunk, Urban Fantasy |
| 434 | Shadows of Self | Brandon Sanderson | 12h 37m | `/book/shadows-of-self-brandon-sanderson/` | Fantasy, Steampunk, Urban Fantasy |
| 435 | The Bands of Mourning | Brandon Sanderson | 14h 42m | `/book/the-bands-of-mourning-brandon-sanderson/` | Fantasy, Steampunk, Urban Fantasy |
| 436 | The Lost Metal | Brandon Sanderson | 19h 12m | `/book/the-lost-metal-brandon-sanderson/` | Fantasy, Steampunk, Urban Fantasy |
| 437 | Ship of Magic | Robin Hobb | 35h 21m | `/book/ship-of-magic-robin-hobb/` | Fantasy, Epic Fantasy, Seafaring Fantasy |
| 438 | Mad Ship | Robin Hobb | 35h 19m | `/book/mad-ship-robin-hobb/` | Fantasy, Epic Fantasy, Seafaring Fantasy |
| 439 | Ship of Destiny | Robin Hobb | 38h 24m | `/book/ship-of-destiny-robin-hobb/` | Fantasy, Epic Fantasy, Seafaring Fantasy |
| 440 | Priest of Lies | Peter McLean | 11h 25m | `/book/priest-of-lies-peter-mclean/` | Grimdark Fantasy, Crime, Low Fantasy |
| 441 | Priest of Gallows | Peter McLean | 11h 05m | `/book/priest-of-gallows-peter-mclean/` | Grimdark Fantasy, Crime, Low Fantasy |
| 442 | Priest of Crowns | Peter McLean | 11h 50m | `/book/priest-of-crowns-peter-mclean/` | Grimdark Fantasy, Crime, Low Fantasy |
| 443 | Paved with Good Intentions | Peter McLean | 10h 30m | `/book/paved-with-good-intentions-peter-mclean/` | Grimdark Fantasy, Crime, Low Fantasy |
| 444 | The Romanovs: 1613–1918 | Simon Sebag Montefiore | 27h 12m | `/book/the-romanovs-1613-1918-simon-sebag-montefiore/` | Non-Fiction, History, Biography |
| 445 | Quicksilver: The Baroque Cycle, Book 1 | Neal Stephenson | 39h 42m | `/book/quicksilver-neal-stephenson/` | Historical Fiction, Sci-Fi, Speculative Fiction |
| 446 | In the Lives of Puppets | TJ Klune | 13h 25m | `/book/in-the-lives-of-puppets-tj-klune/` | Cozy Fantasy, Sci-Fi, Retelling |
| 447 | The Winter King | Bernard Cornwell | 15h 25m | `/book/the-winter-king-bernard-cornwell/` | Historical Fiction, Arthurian, Military Fiction |
| 448 | The Bully Pulpit | Doris Kearns Goodwin | 39h 12m | `/book/the-bully-pulpit-doris-kearns-goodwin/` | Non-Fiction, Biography, American History |
| 449 | The History of the Peloponnesian War | Thucydides | 24h 15m | `/book/the-history-of-the-peloponnesian-war-thucydides/` | Classics, History, Ancient Greece |
| 450 | Monster Hunter International | Larry Correia | 23h 48m | `/book/monster-hunter-international-larry-correia/` | Urban Fantasy, Action, Monsters |
| 451 | The Space Between Worlds | Micaiah Johnson | 10h 38m | `/book/the-space-between-worlds-micaiah-johnson/` | Sci-Fi, Multiverse, Dystopian |
| 452 | Flash Boys | Michael Lewis | 10h 13m | `/book/flash-boys-michael-lewis/` | Non-Fiction, History, Thriller |
| 453 | The Three Musketeers | Alexandre Dumas | 26h 11m | `/book/the-three-musketeers-alexandre-dumas/` | Classics, Adventure, Historical Fiction |
| 454 | The Grace of Kings | Ken Liu | 21h 37m | `/book/the-grace-of-kings-ken-liu/` | Silkpunk, Fantasy, Court Intrigue |
| 455 | The Wall of Storms | Ken Liu | 28h 57m | `/book/the-wall-of-storms-ken-liu/` | Silkpunk, Fantasy, Court Intrigue |
| 456 | The Veiled Throne | Ken Liu | 38h 37m | `/book/the-veiled-throne-ken-liu/` | Silkpunk, Fantasy, Court Intrigue |
| 457 | Speaking Bones | Ken Liu | 41h 5m | `/book/speaking-bones-ken-liu/` | Silkpunk, Fantasy, Court Intrigue |
| 458 | The Shadow of What Was Lost | James Islington | 25h 28m | `/book/the-shadow-of-what-was-lost-james-islington/` | Fantasy, Epic Fantasy, Magic Systems |
| 459 | An Echo of Things to Come | James Islington | 27h 35m | `/book/an-echo-of-things-to-come-james-islington/` | Fantasy, Epic Fantasy, Magic Systems |
| 460 | The Light of All That Falls | James Islington | 33h 36m | `/book/the-light-of-all-that-falls-james-islington/` | Fantasy, Epic Fantasy, Magic Systems |
| 461 | Arcanum Unbounded: The Cosmere Collection | Brandon Sanderson | 22h 31m | `/book/arcanum-unbounded-the-cosmere-collection-brandon-sanderson/` | Fantasy, Epic Fantasy, Magic Systems |
| 462 | Eden's Rise: The Empire Under the Mountains | O.E. Bruening | 13h 17m | `/book/edens-rise-the-empire-under-the-mountains-oe-bruening/` | Fantasy, Epic Fantasy, Court Intrigue |
| 463 | A History of Fascism, 1914–1945 | Stanley G. Payne | 21h 35m | `/book/a-history-of-fascism-1914-1945-stanley-g-payne/` | History, Non-Fiction, World War II |
| 464 | She Who Became the Sun | Shelley Parker-Chan | 14h 8m | `/book/she-who-became-the-sun-shelley-parker-chan/` | Silkpunk, Fantasy, Historical Fantasy |
| 465 | He Who Drowned the World | Shelley Parker-Chan | 15h 25m | `/book/he-who-drowned-the-world-shelley-parker-chan/` | Silkpunk, Fantasy, Historical Fantasy |
| 466 | Iron Widow | Xiran Jay Zhao | 11h 47m | `/book/iron-widow-xiran-jay-zhao/` | Silkpunk, Sci-Fi, Young Adult |
| 467 | The Sword of Kaigen | M.L. Wang | 26h 6m | `/book/the-sword-of-kaigen-ml-wang/` | Silkpunk, Military Fantasy, Epic Fantasy |
| 468 | Jade City | Fonda Lee | 19h 14m | `/book/jade-city-fonda-lee/` | Silkpunk, Urban Fantasy, Crime |
| 469 | Jade War | Fonda Lee | 20h 30m | `/book/jade-war-fonda-lee/` | Silkpunk, Urban Fantasy, Crime |
| 470 | Jade Legacy | Fonda Lee | 26h 41m | `/book/jade-legacy-fonda-lee/` | Silkpunk, Urban Fantasy, Crime |
| 471 | The Everlasting | Alix E. Harrow | 13h 41m | `/book/the-everlasting-alix-e-harrow/` | Fantasy, Time Travel, Romance |
| 472 | The Ministry of Time | Kaliane Bradley | 10h 23m | `/book/the-ministry-of-time-kaliane-bradley/` | Science Fiction, Time Travel, Romance |
| 473 | Mother of Learning: Arc 1 | Domagoj Kurmaić | 22h 55m | `/book/mother-of-learning-arc-1-domagoj-kurmaic/` | Fantasy, Progression Fantasy, Time Travel |
| 474 | The First Fifteen Lives of Harry August | Claire North | 12h 10m | `/book/the-first-fifteen-lives-of-harry-august-claire-north/` | Science Fiction, Time Travel, Thriller |
| 475 | Doomsday Book | Connie Willis | 26h 20m | `/book/doomsday-book-connie-willis/` | Science Fiction, Time Travel, Historical Fiction |
| 476 | Mother of Learning: Arc 2 | Domagoj Kurmaić | 25h 11m | `/book/mother-of-learning-arc-2-domagoj-kurmaic/` | Fantasy, Progression Fantasy, Time Travel |
| 477 | Mother of Learning: Arc 3 | Domagoj Kurmaić | 27h 12m | `/book/mother-of-learning-arc-3-domagoj-kurmaic/` | Fantasy, Progression Fantasy, Time Travel |
| 478 | Mother of Learning: Arc 4 | Domagoj Kurmaić | 22h 12m | `/book/mother-of-learning-arc-4-domagoj-kurmaic/` | Fantasy, Progression Fantasy, Time Travel |
