# The Long Book Club — Gemini Agent Content Specification & Training Guide

Use this reference to instruct the **Gemini Research & Content Agent** (and **NotebookLM**) on the exact fields, character limits, anti-duplicate-content rules, and formatting needed whenever we add new **Books & Reviews**, **Collections**, **Niche Genres**, or **Journal (Blog) Posts** to `https://thelongbookclub.com`.

---

## 1. Core Architectural Rules: The 3-Stage Funnel & 4-Tier Anti-Duplicate Copy Hierarchy

### A. The 3-Stage "Department Store" Funnel
Every page on `thelongbookclub.com` is engineered to guide visitors smoothly toward the **Dedicated Book Pages (`/book/:slug/`)**, which are the **only** pages containing external Audible UK/US affiliate links:
1. **Top of Funnel ("The Magazine" & "The Kiosk")**:
   - **The Journal (`/journal/:slug/`)**: Captures informational and social search traffic. **Golden Rule:** Never place external Amazon/Audible links in Journal posts—always link internally to `/collections/:slug/`, `/genre/:slug/`, and `/book/:slug/` (with trailing slashes).
   - **Homepage & Long Book Finder (`/long-book-finder/`)**: Dynamic filtering tools whose cards route every click straight to `/book/:slug/`.
2. **Middle of Funnel ("The Window Displays / SEO Honey Traps")**:
   - **Curated Collections (`/collections/:slug/`) & Niche Genres (`/genre/:slug/`)**: Rank for discovery keywords (e.g., *"Best Long Magical Realism Audiobooks"*).
   - **The Curiosity Gap Rule:** Collection teasers (`teaserTitle` + `teaser`) sit directly above the **"Read Full Review + Soundcheck →"** button. They must explain *why* the book belongs in the collection and **open a curiosity loop** about the plot or audio performance **without giving away the final verdict**, compelling the user to click through to `/book/:slug/`.
3. **Bottom of Funnel ("The Product Boxes / Conversion Engine")**:
   - **Dedicated Book Pages (`/book/:slug/`)**: Houses the **300+ word `curatorNote`** (hard-sell review that resolves the curiosity gap and justifies spending 1 Audible credit) and the signature **`soundCheck`** (narrator evaluation), right beside the prominent Audible US & UK affiliate buttons.

### B. The 4-Tier Anti-Duplicate Copy Table
Because each audiobook appears across multiple URLs on the website (and because our build script pre-renders raw static HTML for Googlebot), **every book requires 4 distinct tiers of copy**. Never copy-paste sentences between tiers, and never copy Amazon's publisher blurb verbatim.

| Tier | Field Name(s) | Where It Appears | Length & Funnel Purpose |
| :--- | :--- | :--- | :--- |
| **Tier 1: Raw HTML Synopsis** | `description` | Pre-rendered static HTML (`#no-js-content` in `dist/book/:slug/index.html`) + JSON-LD Schema fallback | **1–2 sentences (~25–45 words).** A 100% original plot premise written in our voice so Googlebot crawls zero scraped publisher text. |
| **Tier 2: Grid Card Punchline** | `cardOverview` | Homepage *Hall of Fame*, `/long-book-finder/`, `/genre/:slug/`, and *You Might Also Like* cards | **Strict max 120 characters (1–2 short sentences).** Punchy micro-hook that fits inside a 3-line grid card and drives clicks on *"Read Full Review →"*. |
| **Tier 3: Collection Editorial Teaser ("Lean Hook")** | `teaserTitle` + `teaser` | `/collections/:slug/` (both live React page and pre-rendered Collection HTML) | **`teaserTitle`: 4–8 words** (H4 sub-headline).<br>**`teaser`: Strictly 2 sentences (~35–45 words max).** Lean curiosity hook: Sentence 1 poses a sharp listening dilemma/question (narrator stamina, pacing, abridgment, runtime value); Sentence 2 provides a direct CTA to close the loop on `/book/:slug/`. Zero plot bloat. |
| **Tier 4: Full Curator Review & Soundcheck** | `curatorTitle` + `curatorNote` + `soundCheck` | `/book/:slug/` (live React page, pre-rendered Book HTML, and `Review` JSON-LD Schema) | **`curatorTitle`: 6–12 words** (H2 review headline).<br>**`curatorNote`: 3 paragraphs (300+ words)** Bottom-of-Funnel conversion review.<br>**`soundCheck`: 1 paragraph (~70–110 words)** dedicated strictly to the narrator's vocal performance, pacing, accents, and audio production. |

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
4. **`narrator`** *(string)*:
   - Narrator's full name(s) (e.g., `John Lee` or `Michael Kramer, Kate Reading`).
5. **`length`** *(string)*:
   - Runtime formatted as `XXh YYm` or `XXh` (e.g., `40h 55m` or `14h 20m` — minimum `10h`).
   - *Note:* Our build script automatically converts this into ISO 8601 (`PT40H55M`) for Google's `Audiobook` structured data, and the Long Book Finder slider already starts at `10h`.
6. **`genre`** *(array of 4–6 strings)*:
   - **Tag 1:** Broad primary category (e.g., `Sci-Fi & Fantasy`, `Historical Fiction`, `Thrillers`, `History & Biographies`, `Classic Literature`, `Epic Fiction`).
   - **Tags 2–6:** Specific searchable sub-genres, tropes, and trending niches (e.g., `Progression Fantasy`, `Space Opera`, `Post-Apocalyptic`, `Slow Burn`, `Full-Cast Audio`).
   - *Note:* Every tag in this array automatically generates or populates a `/genre/:slug/` landing page.
7. **`rating`** *(number)*:
   - Editorial/community rating out of 5 (typically `4.6` to `5.0`).
8. **`featured`** *(boolean, optional)*:
   - Set `true` only if the book should appear in the 6-book *Hall of Fame* on the Homepage.

### B. Manual Assets Provided by Thomas (`src/data/books.ts`)
9. **`coverUrl`** *(string)*:
   - Local WebP path (`/covers/[slug].webp`) provided by Thomas.
10. **`affiliateLink`** *(string — UK Audible/Amazon)*:
    - Format: `https://www.amazon.co.uk/dp/[UK_ASIN]?tag=thelongbookcl-21`
11. **`affiliateLinkUS`** *(string — US Audible/Amazon)*:
    - Format: `https://www.amazon.com/dp/[US_ASIN]?tag=thelongbookcl-20` *(Note: US tag to be verified/updated once the new US Associates account is active).*
11b. **`audioPreviewUrl`** *(string, optional but strongly recommended — Apple Books .m4a audio sample stream)*:
    - Automatically retrieved and populated via `npm run sync:previews` (or `python3 scripts/sync-audio-previews.py --id <newId>`). Powers the interactive audio player preview inside the Narrator Soundcheck card on `/book/:slug/`.

### C. Book Copy Tiers 1–3 (`src/data/books.ts`)
12. **`description`** *(string — Tier 1)*:
    - **1–2 sentences (~25–45 words).** Original, non-scraped plot synopsis for static HTML crawlers.
13. **`cardOverview`** *(string — Tier 2)*:
    - **Max 120 characters.** Ultra-concise 1–2 sentence hook for grid cards driving clicks to `/book/:slug/`.
14. **`teaserTitle`** *(string — Tier 3 Headline)*:
    - **4–8 words.** Sharp, provocative sub-headline for Collection cards posing or hinting at the listening dilemma (e.g., `"22 Hours of Cat-and-Mouse Precision"` or `"Better Than the Screen Version?"`).
15. **`teaser`** *(string — Tier 3 Body — The 35–45 Word "Lean Hook")*:
    - **Strictly 2 sentences (~35–45 words max). ZERO plot summaries.** Designed for rapid mobile scanning and maximum curiosity:
      - *Sentence 1 (The Dilemma/Question):* Poses a single, sharp question about narrator stamina, pacing burnout, complexity in audio, adaptation comparison, or credit value.
      - *Sentence 2 (The Call-To-Action):* Directs the user to the dedicated book page to close the information gap (e.g., *"Read our full review and Soundcheck to see our verdict."*).

### D. Full Review Copy Tier 4 (`src/data/reviews.ts` — Bottom-of-Funnel Conversion Engine)
16. **`curatorTitle`** *(string)*:
    - **6–12 words.** Evocative H2 headline for the main review on `/book/:slug/` (must be different from `teaserTitle`).
17. **`curatorNote`** *(string)*:
    - **3 paragraphs (300+ words, separated by `\n\n`).**
    - Written in The Long Book Club's signature voice: warm, intelligent, enthusiastic about immersive world-building, resolving the Collection curiosity gap, and closing with an explicit Bottom-of-Funnel pitch on *why* spending 1 Audible credit on this marathon is extraordinary value.
    - **Internal Linking Rule (Critical for Googlebot):** Include 1–2 natural internal links formatted as HTML `<a href="/book/the-way-of-kings-brandon-sanderson/">The Way of Kings</a>` or `<a href="/collections/magical-realism/">Magical Realism</a>` (**always include the trailing slash `/`**).
18. **`soundCheck`** *(string)*:
    - **1 paragraph (~70–110 words).**
    - Specific critique of the narrator's vocal acting, character differentiation, cadence, emotional range, and listening comfort over 10+ hours.

---

## 3. Element-by-Element Breakdown: Adding a New Collection

Collections live in `src/data/collections.ts` and render at `/collections/:slug/`. Each Collection groups **4 to 12+ books** around a compelling theme, mood, or listening scenario.

To prevent duplicate content flags on Google and keep card heights visually balanced across the directory, every Collection follows the **3-Tier Collection Content Framework**:

1. **`id`** *(string)*:
   - Unique identifier (e.g., `'silkpunk'` or `'016'`).
2. **`slug`** *(string)*:
   - URL-safe keyword-rich slug (e.g., `'silkpunk'`).
3. **`title`** *(string)* — **Strict $\le 10$ Words:**
   - Punchy collection H1 title (e.g., `'Best Long Silkpunk & Asian Fantasy Audiobooks'`).
4. **`cardOverview`** *(string)* — **~25 Words:**
   - Displayed exclusively on `CollectionCard.tsx` on `/collections/`.
   - Enticing browse-mode teaser that invites clicks while keeping all cards uniform in height.
5. **`heroSubtitle`** *(string)* — **Strict $\le 25$ Words:**
   - Displayed as the semantic `<h2>` in the edge-to-edge Hero on `/collections/:slug/`.
   - High-value SEO hook confirming search intent, also used for the page `<meta name="description">` (140–160 chars).
6. **`editorialHeading`** *(optional string)* — **2–5 Words:**
   - Eyebrow tag above the editorial intro (e.g., `'The Art of Organic Technology'`), defaults to `'Curator's Briefing'`.
7. **`editorialIntro`** *(string)* — **Strict $\le 60$ Words:**
   - Displayed in the **Curator's Briefing** block directly between the Hero and the 3-column book grid.
   - Deep-dive into subgenre qualities, origin stories, signature audio traits, or unsung heroes, with markdown links to books/creators (e.g., `[The Grace of Kings](/book/the-grace-of-kings-ken-liu/)`).
8. **`bookIds`** *(array of strings)*:
   - Array of book IDs from `books.ts`. New additions are always placed at index 0 (`[newId, ...existingIds]`).
9. **`coverUrl`** *(string)*:
   - Primary cover art used for social sharing and OpenGraph.
10. **`topGraphic`**, **`iconSvg`**, **`iconColor`**, **`collectionNumber`** *(optional)*:
    - 5-color cycle arch graphic, custom heavy-weight SVG icon, accent hex color, and 3-digit padded number (e.g., `'016'`).

---

## 4. Element-by-Element Breakdown: Adding New Niche Genres (`src/data/genreData.ts`)

Whenever the Gemini Research Agent identifies a high-opportunity niche genre tag (e.g., `Progression Fantasy`, `Space Opera`, `Cozy Fantasy`, `Grimdark`) and assigns it to books in `books.ts`:

1. **`genre`** *(string)*:
   - Exact name of the genre tag as used in `book.genre` (e.g., `'Progression Fantasy'`).
2. **`metaTitle`** *(string)*:
   - SEO title for `/genre/:slug/` (e.g., `'Best Long Progression Fantasy Audiobooks | The Long Book Club'`).
3. **`intro`** *(string)*:
   - **2–3 sentences (~40–70 words).** Editorial introduction displayed at the top of `/genre/:slug/` and injected into the static HTML `<meta name="description">` and `#no-js-content` block.

---

## 5. Element-by-Element Breakdown: Adding a New Journal (Blog) Post (`src/data/journal.ts`)

Journal posts live in `src/data/journal.ts` and render at `/journal/:slug/`. They target long-tail informational search queries (e.g., *"How to get the best value from Audible credits"*, *"Best audiobooks for a cross-country road trip"*).

1. **`id`** *(string)*:
   - Sequential numeric string (e.g., `'4'`).
2. **`slug`** *(string)*:
   - URL-safe slug (e.g., `best-audiobooks-for-long-road-trips`).
3. **`title`** *(string)*:
   - Article H1 headline.
4. **`date`** *(string)*:
   - Publication date in human-readable format (e.g., `'October 20, 2026'`).
5. **`author`** *(string)*:
   - Default: `'The Long Book Club'`.
6. **`excerpt`** *(string)*:
   - **1–2 sentences (~25–45 words, max 160 chars recommended).** Used on `/journal/` index cards and as the `<meta name="description">` for SEO.
7. **`coverUrl`** *(string)*:
   - Image path in `/public/journal/` (e.g., `'/journal/road-trip-audio.webp'`).
8. **`content`** *(multi-line markdown string)*:
   - **600–1,200+ words** formatted in clean Markdown (`###` subheadings, bullet points, bold callouts).
   - Must include internal markdown links to relevant `/book/:slug/`, `/collections/:slug/`, and `/genre/:slug/` pages (with trailing slashes) so link equity flows into your affiliate pages.
   - Our upgraded `scripts/prerender.cjs` automatically injects the full article text into static HTML so Googlebot crawls every word.

---

## 6. Copy-Paste Output Template for Gemini Agent

When prompting your Gemini Agent + NotebookLM to generate a new batch of books, ask it to return each book in this exact structured template so you can easily review it and paste in the ASINs/packshots:

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
- **Cover Filename (Thomas)**: /covers/[slug].webp

#### Tier 1: Static HTML Plot Synopsis (`description` — 1–2 original sentences, 0% Amazon blurb)
> 

#### Tier 2: Grid Card Overview (`cardOverview` — STRICT MAX 120 CHARACTERS)
> 

#### Tier 3: Collection Editorial Teaser (`teaserTitle` + `teaser` — Strict 2-Sentence Lean Hook, 35–45 words max)
- **Teaser Headline (`teaserTitle` — 4–8 words)**: 
- **Teaser Paragraph (`teaser` — 2 sentences: Sentence 1 Dilemma, Sentence 2 CTA)**: 

#### Tier 4: Full Book Page Review (`reviews.ts`)
- **Curator Review Headline (`curatorTitle`)**: 
- **Curator Review Body (`curatorNote` — 2–3 paragraphs, 180–300 words)**:

- **Audio Soundcheck (`soundCheck` — 1 paragraph, 60–110 words on narrator performance)**:
```


---

## 7. Automated Site Widgets (No Manual Calculation Required)

Every book page (`/book/:slug/`) automatically renders two interactive React widgets in the left sidebar using the `length` field (e.g., `"45h 30m"`):
1. **Audiobook Commute Calculator (`AudiobookCommuteCalculator.tsx`)**: Automatically calculates how many weeks of daily commuting the audiobook will last.
2. **Audiobook Value Calculator (`AudiobookValueCalculator.tsx`)**: Automatically calculates the £/$ cost-per-hour of entertainment for 1 Audible credit.

**Important Instruction for Gemini & NotebookLM:** You do **NOT** need to manually calculate Commute Calendar math or output a separate commute table—Antigravity automates this on the website from the `length` string.

---

## 8. Existing Site Inventory (Do Not Duplicate + Use for Internal Links)

Below is the complete list of **145 Audiobooks**, **7 Curated Collections**, and **3 Journal Posts** already live on `https://thelongbookclub.com`.
- **For Research:** Do **not** propose these 145 books as "new additions" (unless we are specifically creating a new Collection or Journal post that features existing books).
- **For Internal Linking:** When writing `curatorNote` reviews or `journal` articles, use these exact `/book/:slug/` and `/collections/:slug/` paths (always include the trailing slash `/`).

### A. Existing Collections (7)
- **The Best, Longest Cinematic Audiobooks (Full-Cast & Graphic Audio)** — `/collections/graphic-audio/` (ID: `graphic-audio`)
- **The Best Long Books from 2025** — `/collections/best-long-books-2025/` (ID: `1`)
- **Long, Dark Academia Listens** — `/collections/dark-academia/` (ID: `dark-academia`)
- **Epic Romantasy Long Listens** — `/collections/romantasy/` (ID: `romantasy`)
- **The Longest Ever Audiobooks (60+ Hours)** — `/collections/longest-ever/` (ID: `longest-ever`)
- **Long Life Stories** — `/collections/long-life-stories/` (ID: `long-life-stories`)
- **Bucket List Long Listens** — `/collections/bucket-list/` (ID: `bucket-list`)

### B. Existing Journal Posts (3)
- **The "Single Credit" Survival Kit: Audiobooks That Last an Entire Month** — `/journal/the-single-credit-survival-kit-audiobooks-that-last-an-entire-month/` (ID: `1770317893347`)
- **How to Squeeze Every Drop of Value Out of Your Audible Credits (and Free Trials)** — `/journal/how-to-squeeze-every-drop-of-value-out-of-your-audible-credits-and-free-trials/` (ID: `1770309815102`)
- **The Art of the Slow Burn: Why the Best Romantasy Requires a 20+ Hour Commitment** — `/journal/the-art-of-the-slow-burn-why-the-best-romantasy-requires-a-20-hour-commitment/` (ID: `1770317169939`)

### C. Existing Audiobooks (145)
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
| 6 | The Count of Monte Cristo | Alexandre Dumas | 52h 41m | `/book/the-count-of-monte-cristo-alexandre-dumas/` | Classics, Historical Adventure, Revenge |
| 7 | 11/22/63 | Stephen King | 30h 40m | `/book/112263-stephen-king/` | Science Fiction, Time Travel, Historical Fiction |
| 8 | Atlas Shrugged | Ayn Rand | 63h | `/book/atlas-shrugged-ayn-rand/` | Science Fiction, Philosophical Fiction, Mystery |
| 9 | A Game of Thrones | George R.R. Martin | 33h 46m | `/book/a-game-of-thrones-george-rr-martin/` | Fantasy, Epic Fantasy, Grimdark |
| 10 | Sherlock Holmes: The Definitive Collection | Arthur Conan Doyle | 71h 57m | `/book/sherlock-holmes-the-definitive-collection-arthur-conan-doyle/` | Mystery, Classics, Short Stories |
| 16 | Team of Rivals | Doris Kearns Goodwin | 41h 32m | `/book/team-of-rivals-doris-kearns-goodwin/` | History, Biography, Politics |
| 17 | 1Q84 | Haruki Murakami | 46h 50m | `/book/1q84-haruki-murakami/` | Fantasy, Magical Realism, Dystopian |
| 18 | Grant | Ron Chernow | 48h | `/book/grant-ron-chernow/` | Biography, History, American Civil War |
| 19 | David Copperfield | Charles Dickens | 36h 30m | `/book/david-copperfield-charles-dickens/` | Classics, Bildungsroman, Victorian |
| 20 | Dune | Frank Herbert | 21h 2m | `/book/dune-frank-herbert/` | Science Fiction, Space Opera, Philosophy |
| 21 | The Pillars of the Earth | Ken Follett | 40h 55m | `/book/the-pillars-of-the-earth-ken-follett/` | Historical Fiction, Historical Saga, Medieval History |
| 22 | War and Peace | Leo Tolstoy | 61h 8m | `/book/war-and-peace-leo-tolstoy/` | Classics, Historical Fiction, War |
| 23 | The Name of the Wind | Patrick Rothfuss | 28h | `/book/the-name-of-the-wind-patrick-rothfuss/` | Fantasy, Epic Fantasy, High Fantasy |
| 24 | Shantaram | Gregory David Roberts | 43h | `/book/shantaram-gregory-david-roberts/` | Literary Fiction, Adventure, Travel |
| 25 | The Goldfinch | Donna Tartt | 32h 24m | `/book/the-goldfinch-donna-tartt/` | Literary Fiction, Coming of Age, Art History |
| 26 | A Little Life | Hanya Yanagihara | 32h 51m | `/book/a-little-life-hanya-yanagihara/` | Literary Fiction, Contemporary Fiction, Drama |
| 27 | Cryptonomicon | Neal Stephenson | 42h 53m | `/book/cryptonomicon-neal-stephenson/` | Science Fiction, Historical Fiction, Techno-thriller |
| 28 | Crime and Punishment | Fyodor Dostoevsky | 26h 11m | `/book/crime-and-punishment-fyodor-dostoevsky/` | Classics, Psychological Thriller, Philosophy |
| 29 | American Gods | Neil Gaiman | 19h 36 hours | `/book/american-gods-neil-gaiman/` | Full-Cast, Urban Fantasy, Mythology |
| 30 | Anna Karenina | Leo Tolstoy | 35h 35m | `/book/anna-karenina-leo-tolstoy/` | Classics, Romance, Realism |
| 31 | Don Quixote | Miguel de Cervantes | 39h 42m | `/book/don-quixote-miguel-de-cervantes/` | Classics, Satire, Adventure |
| 32 | The Brothers Karamazov | Fyodor Dostoevsky | 37h 5m | `/book/the-brothers-karamazov-fyodor-dostoevsky/` | Classics, Philosophical Fiction, Family Saga |
| 33 | Steve Jobs | Walter Isaacson | 25h 18m | `/book/steve-jobs-walter-isaacson/` | Biography, Technology, Business |
| 34 | Titan | Ron Chernow | 35h | `/book/titan-ron-chernow/` | Biography, History, Business |
| 35 | The Rise and Fall of the Third Reich | William L. Shirer | 57h 11m | `/book/the-rise-and-fall-of-the-third-reich-william-l-shirer/` | History, World War II, Non-Fiction |
| 36 | Outlander | Diana Gabaldon | 32h 38m | `/book/outlander-diana-gabaldon/` | Historical Fiction, Romance, Time Travel |
| 37 | Middlemarch | George Eliot | 32h | `/book/middlemarch-george-eliot/` | Classics, Realism, Victorian |
| 38 | Jonathan Strange & Mr Norrell | Susanna Clarke | 32h 30m | `/book/jonathan-strange-mr-norrell-susanna-clarke/` | Fantasy, Historical Fantasy, Alternative History |
| 39 | Bleak House | Charles Dickens | 35h | `/book/bleak-house-charles-dickens/` | Classics, Mystery, Legal Satire |
| 40 | Gone with the Wind | Margaret Mitchell | 49h 7m | `/book/gone-with-the-wind-margaret-mitchell/` | Historical Fiction, Romance, Civil War |
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
| 64 | Leviathan Wakes | James S.A. Corey | 20h 56m | `/book/leviathan-wakes-james-sa-corey/` | Science Fiction, Space Opera, Sci-Fi Mystery |
| 65 | Seveneves | Neal Stephenson | 31h 55m | `/book/seveneves-neal-stephenson/` | Science Fiction, Hard Sci-Fi, Post-Apocalyptic |
| 66 | Anathem | Neal Stephenson | 32h 45m | `/book/anathem-neal-stephenson/` | Science Fiction, Speculative Fiction, Philosophy |
| 67 | Stranger in a Strange Land | Robert A. Heinlein | 16h 3m | `/book/stranger-in-a-strange-land-robert-a-heinlein/` | Science Fiction, Philosophy, Satire |
| 68 | Dune Messiah | Frank Herbert | 9h 7m | `/book/dune-messiah-frank-herbert/` | Science Fiction, Space Opera, Political Intrigue |
| 69 | Children of Dune | Frank Herbert | 19h 42m | `/book/children-of-dune-frank-herbert/` | Science Fiction, Space Opera, Ecology |
| 70 | Moby Dick | Herman Melville | 24h 23m | `/book/moby-dick-herman-melville/` | Classics, Adventure, Philosophical Fiction |
| 71 | Great Expectations | Charles Dickens | 18h 44m | `/book/great-expectations-charles-dickens/` | Classics, Bildungsroman, Victorian |
| 72 | Jane Eyre | Charlotte Brontë | 19h 11m | `/book/jane-eyre-charlotte-bront/` | Classics, Gothic Romance, Bildungsroman |
| 73 | Wuthering Heights | Emily Brontë | 14h 2m | `/book/wuthering-heights-emily-bront/` | Classics, Gothic, Tragedy |
| 74 | Vanity Fair | William Makepeace Thackeray | 31h 22m | `/book/vanity-fair-william-makepeace-thackeray/` | Classics, Satire, Historical Fiction |
| 75 | The Hunchback of Notre-Dame | Victor Hugo | 19h 2m | `/book/the-hunchback-of-notre-dame-victor-hugo/` | Classics, Historical Fiction, Gothic |
| 76 | Ulysses | James Joyce | 27h 15m | `/book/ulysses-james-joyce/` | Modernist, Literary Fiction, Experimental |
| 77 | Doctor Zhivago | Boris Pasternak | 21h 56m | `/book/doctor-zhivago-boris-pasternak/` | Classics, Historical Fiction, Romance |
| 78 | The Magic Mountain | Thomas Mann | 35h 15m | `/book/the-magic-mountain-thomas-mann/` | Classics, Philosophical Fiction, Modernist |
| 81 | Leonardo da Vinci | Walter Isaacson | 18h 35m | `/book/leonardo-da-vinci-walter-isaacson/` | Biography, Art History, Science |
| 82 | Benjamin Franklin: An American Life | Walter Isaacson | 20h 3m | `/book/benjamin-franklin-an-american-life-walter-isaacson/` | Biography, American History, Politics |
| 84 | Peter the Great | Robert K. Massie | 35h 27m | `/book/peter-the-great-robert-k-massie/` | Biography, Russian History, Politics |
| 85 | Catherine the Great | Robert K. Massie | 23h 24m | `/book/catherine-the-great-robert-k-massie/` | Biography, Russian History, Politics |
| 87 | East of Eden | John Steinbeck | 25h 32m | `/book/east-of-eden-john-steinbeck/` | Classics, Family Saga, Historical Fiction |
| 88 | The Grapes of Wrath | John Steinbeck | 21h 10m | `/book/the-grapes-of-wrath-john-steinbeck/` | Classics, Historical Fiction, Social Commentary |
| 89 | Demon Copperhead | Barbara Kingsolver | 21h 3m | `/book/demon-copperhead-barbara-kingsolver/` | Contemporary Fiction, Coming of Age, Retelling |
| 90 | The Amazing Adventures of Kavalier & Clay | Michael Chabon | 26h 15m | `/book/the-amazing-adventures-of-kavalier-clay-michael-chabon/` | Historical Fiction, Comics, Jewish History |
| 96 | 2666 | Roberto Bolaño | 39h 15m | `/book/2666-roberto-bolao/` | Literary Fiction, Mystery, Postmodernism |
| 97 | The Bee Sting | Paul Murray | 26h 10m | `/book/the-bee-sting-paul-murray/` | Contemporary Fiction, Family Drama, Tragicomedy |
| 98 | Polostan | Neal Stephenson | 11h 41m | `/book/polostan-neal-stephenson/` | Historical Fiction, Thriller, Spy Fiction |
| 99 | The City and Its Uncertain Walls | Haruki Murakami | 17h 26m | `/book/the-city-and-its-uncertain-walls-haruki-murakami/` | Fantasy, Magical Realism, Literary Fiction |
| 100 | Caledonian Road | Andrew O'Hagan | 22h 51m | `/book/caledonian-road-andrew-ohagan/` | Contemporary Fiction, Social Satire, London |
| 101 | Nexus: A Brief History of Information Networks | Yuval Noah Harari | 17h 52m | `/book/nexus-yuval-noah-harari/` | Non-Fiction, History, Technology |
| 102 | Wind and Truth | Brandon Sanderson | 62h 48m | `/book/wind-and-truth-brandon-sanderson/` | Fantasy, Epic Fantasy, High Fantasy |
| 103 | Shōgun | James Clavell | 53h 33m | `/book/shogun-james-clavell/` | Historical Fiction, Adventure, War |
| 104 | Empire of the Damned | Jay Kristoff | 31h 34m | `/book/empire-of-the-damned-jay-kristoff/` | Fantasy, Dark Fantasy, Grimdark |
| 105 | The Covenant of Water | Abraham Verghese | 31h 16m | `/book/the-covenant-of-water-abraham-verghese/` | Historical Fiction, Family Saga, Medical Fiction |
| 106 | My Name is Barbra | Barbra Streisand | 48h 7m | `/book/my-name-is-barbra-barbra-streisand/` | Memoir, Biography, Entertainment |
| 107 | Alchemised | SenLinYu | 36h 15m | `/book/alchemised-senlinyu/` | Fantasy, Dark Fantasy, Romance |
| 108 | The Secret History | Donna Tartt | 22h 4m | `/book/the-secret-history-donna-tartt/` | Dark Academia, Psychological Thriller, Literary Fiction |
| 109 | The Historian | Elizabeth Kostova | 26h 5m | `/book/the-historian-elizabeth-kostova/` | Historical Fiction, Horror, Dark Academia |
| 110 | A Discovery of Witches | Deborah Harkness | 23h 59m | `/book/a-discovery-of-witches-deborah-harkness/` | Fantasy, Urban Fantasy, Romance |
| 111 | Iron Flame | Rebecca Yarros | 28h 16m | `/book/iron-flame-rebecca-yarros/` | Fantasy, Romantasy, High Fantasy |
| 112 | House of Earth and Blood | Sarah J. Maas | 27h 50m | `/book/house-of-earth-and-blood-sarah-j-maas/` | Fantasy, Urban Fantasy, Romantasy |
| 113 | Kushiel's Dart | Jacqueline Carey | 31h 5m | `/book/kushiels-dart-jacqueline-carey/` | Fantasy, Romantasy, Epic Fantasy |
| 114 | When the Moon Hatched | Sarah A. Parker | 20h 13m | `/book/when-the-moon-hatched-sarah-a-parker/` | Fantasy, Romantasy, High Fantasy |
| 115 | Galaxy Outlaws: The Complete Black Ocean Mobius Missions | J.S. Morin | 85h 6m | `/book/galaxy-outlaws-js-morin/` | Science Fiction, Space Opera, Science Fantasy |
| 116 | The Decline and Fall of the Roman Empire | Edward Gibbon | 126h 37m | `/book/the-decline-and-fall-of-the-roman-empire-edward-gibbon/` | History, Classics, Non-Fiction |
| 117 | The Cycle of Arawn: The Complete Trilogy | Edward W. Robertson | 65h 54m | `/book/the-cycle-of-arawn-edward-w-robertson/` | Fantasy, Epic Fantasy, Sword and Sorcery |
| 118 | The Wandering Inn: Book 2 | Pirateaba | 61h 4m | `/book/the-wandering-inn-book-2-pirateaba/` | Fantasy, LitRPG, Slice of Life |
| 119 | Churchill: Walking with Destiny | Andrew Roberts | 50h 28m | `/book/churchill-walking-with-destiny-andrew-roberts/` | Biography, History, War |
| 120 | Empire of the Vampire | Jay Kristoff | 27h 10m | `/book/empire-of-the-vampire-jay-kristoff/` | Fantasy, Dark Fantasy, Grimdark |
| 121 | Empire of the Dawn | Jay Kristoff | 34h 41m | `/book/empire-of-the-dawn-jay-kristoff/` | Fantasy, Dark Fantasy, Grimdark |
| 148 | Brimstone | Callie Hart | 24h 30m | `/book/brimstone-callie-hart/` | Fantasy, Dark Romance, Romantasy |
| 133 | Carrion Comfort | Dan Simmons | 39h 27m | `/book/carrion-comfort-dan-simmons/` | Horror, Thriller, Supernatural |
| 145 | The Complete Novels of Charles Dickens: Part One | Charles Dickens | 199h 26m | `/book/complete-dickens-part-one/` | Classics, Victorian, Anthology |
| 143 | Death's End | Cixin Liu | 29h 59m | `/book/deaths-end-cixin-liu/` | Science Fiction |
| 146 | The Fyodor Dostoyevsky Complete Collection | Fyodor Dostoyevsky | 266h 4m | `/book/dostoyevsky-complete-collection/` | Classics, Philosophy, Anthology |
| 123 | Flowers of Esthelm: The Wandering Inn, Book 3 | Pirateaba | 37h 37m | `/book/flowers-of-esthelm-the-wandering-inn-book-3-pirateaba/` | Fantasy, LitRPG, Slice of Life |
| 127 | Fourth Wing | Rebecca Yarros | 22h 2m | `/book/fourth-wing-rebecca-yarros/` | Fantasy, Romantasy, High Fantasy |
| 130 | House of Flame and Shadow | Sarah J. Maas | 29h 42m | `/book/house-of-flame-and-shadow-sarah-j-maas/` | Fantasy, Urban Fantasy, Romantasy |
| 129 | House of Sky and Breath | Sarah J. Maas | 27h 42m | `/book/house-of-sky-and-breath-sarah-j-maas/` | Fantasy, Urban Fantasy, Romantasy |
| 137 | I Am Pilgrim | Terry Hayes | 22h 40m | `/book/i-am-pilgrim-terry-hayes/` | Spy Thriller, Espionage, Crime |
| 126 | Katabasis | R.F. Kuang | 18h 33m | `/book/katabasis-rf-kuang/` | Fantasy, Dark Academia, Mythology |
| 128 | Onyx Storm | Rebecca Yarros | 23h 52m | `/book/onyx-storm-rebecca-yarros/` | Fantasy, Romantasy, High Fantasy |
| 62 | Pandora's Star | Peter F. Hamilton | 37h 16m | `/book/pandoras-star-peter-f-hamilton/` | Science Fiction |
| 147 | Quicksilver | Callie Hart | 20h 41m | `/book/quicksilver-callie-hart/` | Fantasy, Dark Romance, Romantasy |
| 140 | Reamde | Neal Stephenson | 38h | `/book/reamde-neal-stephenson/` | Techno-thriller, Action, Crime |
| 139 | Red Storm Rising | Tom Clancy | 31h 12m | `/book/red-storm-rising-tom-clancy/` | Techno-thriller, War, Cold War |
| 131 | Swan Song | Robert McCammon | 34h 19m | `/book/swan-song-robert-mccammon/` | Horror, Post-Apocalyptic, Dark Fantasy |
| 142 | The Dark Forest | Cixin Liu | 22h 36m | `/book/the-dark-forest-cixin-liu/` | Science Fiction, Hard Sci-Fi, Cosmic Horror |
| 134 | The Passage | Justin Cronin | 36h 49m | `/book/the-passage-justin-cronin/` | Horror, Post-Apocalyptic, Science Fiction |
| 144 | The Redemption of Time | Baoshu | 12h 17m | `/book/the-redemption-of-time-baoshu/` | Science Fiction, Hard Sci-Fi, Fan Sequel |
| 132 | The Terror | Dan Simmons | 28h 28m | `/book/the-terror-dan-simmons/` | Horror, Historical Horror, Survival |
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
