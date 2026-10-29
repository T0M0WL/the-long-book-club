---
name: tlbc-content-engine
description: >-
  End-to-end content pipeline and implementation runbook for The Long Book Club (thelongbookclub.com).
  Use this skill whenever adding, researching, drafting, or updating audiobooks, Curator Reviews,
  Audio Soundchecks, Collections, Niche Genre landing pages, or Journal (blog) posts.
---

# The Long Book Club — Content Engine Skill (`tlbc-content-engine`)

This skill governs how Antigravity (and any spawned `research` or `self` sub-agents) researches, drafts, validates, and integrates new content into **The Long Book Club** (`https://thelongbookclub.com`).

---

## 🎯 The Core Editorial Philosophy: Subgenre Discovery & The Curation Moat

- **Tastemaker Over Database:** Audible's native "sort by length" is famously flooded with public-domain dumps, AI audio, and filler. We do not compete as a crude length filter; we compete as **the premier curated magazine for immersive audiobooks**.
- **The 10+ Hour Rule:** All featured audiobooks must be **10+ hours** (ensuring high return on a single Audible credit or token), but our true differentiator is **Editorial Taste, Subgenre Discovery, and Narrator Soundchecks**.
- **Weekly Release Cadence:** The site targets publishing **one new curated subgenre collection / trending niche spotlight every week** (e.g. Silkpunk, Grimdark, Romantasy, Cozy Fantasy, LitRPG) with accompanying Journal deep-dives, establishing TLBC as the definitive tastemaker for audio trends.

---

## 1. Reference Files in This Workspace

Before drafting or integrating new content, consult:
- **Content Specification & Templates**: [gemini-docs/TLBC_Gemini_Agent_Content_Spec.md](../../../gemini-docs/TLBC_Gemini_Agent_Content_Spec.md)
- **Brand Voice & Gold-Standard Reviews (59 Full Reviews + 3 Journal Posts)**: [gemini-docs/TLBC_Full_Reviews_For_NotebookLM.md](../../../gemini-docs/TLBC_Full_Reviews_For_NotebookLM.md)
- **Site Architecture & Deployment Rules**: [AI_KNOWLEDGE_BASE.md](../../../AI_KNOWLEDGE_BASE.md)
- **Live Data Files**:
  - Books (`Tier 1–3 copy + metadata`): [src/data/books.ts](../../../src/data/books.ts)
  - Reviews (`Tier 4 full Curator Review + Soundcheck`): [src/data/reviews.ts](../../../src/data/reviews.ts)
  - Collections: [src/data/collections.ts](../../../src/data/collections.ts)
  - Niche Genre SEO Intros: [src/data/genreData.ts](../../../src/data/genreData.ts)
  - Journal (Blog) Posts: [src/data/journal.ts](../../../src/data/journal.ts)

---

## 2. Automated Widgets (Do NOT Manually Calculate)

- **Audiobook Commute Calculator** ([`AudiobookCommuteCalculator.tsx`](../../../src/components/AudiobookCommuteCalculator.tsx)) and **Audiobook Value Calculator** ([`AudiobookValueCalculator.tsx`](../../../src/components/AudiobookValueCalculator.tsx)) are interactive React components on every `/book/:slug/` page.
- They automatically calculate commute weeks and price-per-hour from `book.length` (e.g., `'45h 30m'`). Never hardcode commute math tables into review text.

---

## 3. The 3-Stage "Department Store" Funnel Architecture

Every page on `thelongbookclub.com` plays a specific role in guiding visitors toward the **Dedicated Book Pages (`/book/:slug/`)**, which are the **only** pages containing external Audible UK/US affiliate links:

1. **Top of Funnel — Discovery & Ingress ("The Magazine" & "The Kiosk")**:
   - **The Journal (`/journal/:slug/`)**: Captures informational and social search traffic. **Golden Rule:** Never put external Amazon/Audible links in Journal posts; always link internally to `/collections/:slug/`, `/genre/:slug/`, and `/book/:slug/` (with trailing slashes) to pass SEO link equity and move readers down the funnel.
   - **Homepage & Long Book Finder (`/long-book-finder/`)**: Dynamic filtering tools whose cards (`BookCard.tsx`) route every click to `/book/:slug/` via the *"Read Full Review →"* button.
2. **Middle of Funnel — "The Window Displays / SEO Honey Traps"**:
   - **Curated Collections (`/collections/:slug/`) & Niche Genres (`/genre/:slug/`)**: Rank for broad & niche discovery keywords (e.g., *"Best Long Magical Realism Audiobooks"*).
   - **Curiosity Gap Rule (Funnel Gateway, NOT Plot Endpoint):** Collection teasers (`teaserTitle` + `teaser`) sit directly above the **"Read Full Review + Soundcheck →"** button. Giving a complete plot synopsis satisfies curiosity prematurely and causes users to leave and search Audible directly. Instead, Tier 3 teasers must have **ZERO plot summaries** and open an irresistible **Information Gap / Zeigarnik Open Loop** about the *listening experience* (pacing, narrator stamina, runtime value, or edition pitfalls) while withholding the final verdict.
3. **Bottom of Funnel — "The Product Boxes / Conversion Engine"**:
   - **Dedicated Book Pages (`/book/:slug/`)**: The final destination where affiliate conversions happen.
   - Houses the **300+ word `curatorNote`** (hard-sell editorial review that resolves the curiosity gap and justifies spending 1 Audible credit) and the signature **`soundCheck`** (narrator performance evaluation), right beside the prominent Audible US & UK CTA buttons and interactive Value/Commute calculators.

---

## 4. The 4-Tier Anti-Duplicate Copy Hierarchy (Mandatory for Every Book)

Every audiobook added to the site MUST have 4 completely distinct copy blocks (0% copied Amazon publisher blurbs, 0% copy-pasting between tiers):

1. **Tier 1 — `description` (`src/data/books.ts`)**:
   - **1–2 original sentences (~25–45 words).**
   - *Purpose:* Injected by `scripts/prerender.cjs` into the raw static HTML (`#no-js-content` in `dist/book/:slug/index.html`) for Googlebot crawlers.
2. **Tier 2 — `cardOverview` (`src/data/books.ts`)**:
   - **Strict maximum 120 characters (1–2 short sentences).**
   - *Purpose:* Displayed on `BookCard.tsx` across the Homepage *Hall of Fame*, `/long-book-finder/`, `/genre/:slug/`, and *You Might Also Like*. Must act as a punchy micro-hook that drives clicks on *"Read Full Review →"*.
3. **Tier 3 — `teaserTitle` + `teaser` (`src/data/books.ts`) — The 35–45 Word "Lean Hook" (Strict 2-Sentence Cap)**:
   - **Psychological Foundations**:
     - *Loewenstein’s Information Gap Theory:* Plot summaries close cognitive gaps, letting users leave and buy on Audible directly. A listening-friction hook opens an information gap about audio quality, narration, or stamina that only the full review resolves.
     - *Zeigarnik Effect (Open Loops):* Creating an unresolved tension around narrator fatigue or marathon pacing compels the reader to achieve closure by clicking through.
   - **Strict Rules**:
     - **ZERO Plot Summaries:** Never describe plot events, premise setup, or character backstories. Focus 100% on the **listening experience** and friction.
     - **ZERO Concept Overload:** Do not stack 4–6 concepts into one card. Single out ONE primary dilemma for lightning-fast mobile scanning (low cognitive load, high information scent).
     - **Word Count & Structure:** Strict 2-sentence cap, ~35–45 words max.
   - **`teaserTitle`:** 4–8 words (H4 sub-headline framing the core listening dilemma or curiosity trigger, e.g., *"22 Hours of Cat-and-Mouse Precision"* or *"Better Than the Screen Version?"*).
   - **`teaser`:** Strictly 2 punchy sentences (~35–45 words max) following the **Lean Curiosity Gap Formula**:
     1. *Sentence 1 (The Dilemma / Listening Question):* Poses a single, sharp question about narrator stamina, pacing burnout, print-to-audio complexity, adaptation comparisons, or runtime value.
     2. *Sentence 2 (The Call-To-Action):* Directs the user to the dedicated book page to close the cognitive loop (*"Read our full review and Soundcheck to see our verdict."*).
   - *Purpose:* Displayed on `/collections/:slug/` (`CollectionDetail.tsx` and pre-rendered Collection HTML).
4. **Tier 4 — `curatorTitle` + `curatorNote` + `soundCheck` (`src/data/reviews.ts`)**:
   - **`curatorTitle`:** 6–12 words (H2 headline on `/book/:slug/`, distinct from `teaserTitle`).
   - **`curatorNote`:** **3 paragraphs (300+ words, separated by `\n\n`)** acting as the **Bottom-of-Funnel Conversion Engine**. Written in The Long Book Club's warm, intelligent, value-conscious editorial voice:
     - *Paragraph 1:* Immersive hook & premise—why this world is worth stepping into for 10–60+ hours.
     - *Paragraph 2:* Why the **audio format** specifically elevates the book over print, plus 1–2 natural internal links formatted as HTML `<a href="/book/slug/">Title</a>` or `<a href="/collections/slug/">Collection Name</a>` (**always with a trailing slash `/`**). *(Note: Both `BookDetails.tsx` and `scripts/prerender.cjs` now also auto-convert Markdown `[Title](/book/slug/)` into crawlable HTML `<a>` tags with trailing slashes as a safeguard).*
     - *Paragraph 3 (The Credit Conversion Close):* Explicit value verdict explaining why this runtime is an unbeatable return on a single Audible credit or free-trial token.
   - **`soundCheck`:** **1 paragraph (~70–110 words)** evaluating the narrator's vocal performance, character voices, pacing, and audio production over 10+ hours, reinforcing confidence right above/beside the Audible CTA buttons.

---

## 4. Workflow for Adding Content

### Mode A: User Provides Draft Content from Gemini Web App / NotebookLM
1. Verify all 18 required book/review fields (or Collection/Journal fields) are present.
2. Check that `book.title` in `src/data/books.ts` matches the review key in `src/data/reviews.ts` **character-for-character** (including colons, subtitles, and apostrophes).
3. Verify `cardOverview` is $\le 120$ characters.
4. Confirm Thomas has provided (or left placeholders for) `coverUrl` (`/covers/[slug].webp`) and `affiliateLink` (UK `?tag=thelongbookclub-21`). The US affiliate account is defunct; Amazon OneLink handles all international referrals automatically via the primary UK tag.
5. If any new niche genre tags are introduced in `book.genre`, add a matching `{ genre, metaTitle, intro }` entry in `src/data/genreData.ts`.
6. **Sync Audio Previews:** Run `npm run sync:previews` (or `python3 scripts/sync-audio-previews.py --id <newId1,newId2>`) to query the Apple Books / iTunes Search API. This automatically discovers and injects verified `audioPreviewUrl` direct `.m4a` audio sample streams into `src/data/books.ts` so the Narrator Soundcheck audio player renders on the new book pages.

### Mode B: Autonomous Research & Drafting Inside Antigravity
1. First inspect `src/data/books.ts` to get the current list of all existing book titles and IDs so you never propose a duplicate book.
2. Spawn a `research` sub-agent (or use `search_web`) to identify trending **10+ hour** unabridged audiobooks (prioritizing the longest, highest-value listens available in each niche genre), verify exact UK/US Audible runtimes (`XXh YYm`), and confirm narrator names.
3. Query the **UK iTunes Search API** (`https://itunes.apple.com/search?term=<Title+Author>&media=audiobook&country=GB`) via `read_url_content` or run `npm run sync:previews` to pull the exact edition's 30-second `previewUrl` (`audioPreviewUrl`) and high-res square cover art (`artworkUrl100` with `100x100bb.jpg` replaced by `600x600bb.jpg`).
4. Once Thomas approves the covers and provides his Amazon/Audible link (using UK tag `thelongbookclub-21`; Amazon OneLink routes international visitors automatically), download the `600x600bb.jpg` covers directly into `public/covers/<slug>.jpg` and wire `/covers/<slug>.jpg` into `src/data/books.ts` and `src/data/collections.ts`.

### The 3-Tier Collection Content Framework (Anti-Duplicate Copy Standard)
Every collection added or updated in `src/data/collections.ts` MUST adhere to this strict 3-tier content hierarchy to prevent duplicate content flags on Google and ensure uniform card heights across `/collections/`:
1. **Title (`collection.title`) — Strict $\le 10$ Words:**
   - Punchy, high-impact heading used for the page H1 and card title.
2. **Card Overview (`collection.cardOverview`) — ~25 Words:**
   - Displayed exclusively on `CollectionCard.tsx` in `/collections/`.
   - Acts as an enticing browse-mode teaser that invites clicks while maintaining uniform card heights across grid rows.
3. **Hero Subtitle (`collection.heroSubtitle`) — Strict $\le 25$ Words:**
   - Displayed as the semantic `<h2>` in the edge-to-edge Hero on `/collections/:slug/`.
   - High-value, SEO-optimized hook targeting search intent, matching the optimal 140–160 character meta description length for Google search snippets.
4. **Editorial Intro (`collection.editorialIntro`) — Strict $\le 60$ Words:**
   - Displayed in the dedicated **Curator's Briefing** section between the Hero and the 3-column book grid.
   - Deep-dive into subgenre qualities, origin stories (e.g. Ken Liu coining silkpunk), signature audio characteristics, or unsung heroes.
   - Embeds natural markdown internal links (e.g. `[Book Title](/book/slug/)`) formatted into crawlable HTML links for SEO entity clustering.
5. **Editorial Heading (`collection.editorialHeading`, optional) — 2–5 Words:**
   - Crisp eyebrow tag above the editorial intro (e.g., `"The Art of Organic Technology"`), defaulting to `"Curator's Briefing"`.

### Collection Ordering & Additions Rule
- **New Additions Always Feature First (Index 0):** When adding books to `collection.bookIds` in `src/data/collections.ts`, always place new additions at the **beginning of the array (`[newId, ...existingIds]`)**. This ensures returning visitors and readers immediately see the freshest releases/additions as the first item on collection pages, rather than scrolling to the bottom.

### Collection Card Top Graphics (5-Colour Cycle) & Heavy-Weight Material Icons
- **5-Colour Card Top Graphic Cycle (`public/assets/Collections-Cards-Gfx/`):**
  Cycle through these 5 blank textured arch graphics in this exact order (and loop back to #1 once all 5 are used), pairing each with its exact `iconColor`:
  1. **Sage Green:** `/assets/Collections-Cards-Gfx/Collection-Card-Top-Sage-Green.gif` $\rightarrow$ `iconColor: '#2c5143'` *(used by `008` Magical Realism)*
  2. **Coral-Red:** `/assets/Collections-Cards-Gfx/Collection-Card-Top-Coral-Red.gif` $\rightarrow$ `iconColor: '#c0c39a'` *(next in cycle: `009`)*
  3. **Dark Grey:** `/assets/Collections-Cards-Gfx/Collection-Card-Top-DarkGrey.gif` $\rightarrow$ `iconColor: '#e56a4e'` *(next in cycle: `010`)*
  4. **Green:** `/assets/Collections-Cards-Gfx/Collection-Card-Top-Green.gif` $\rightarrow$ `iconColor: '#ed835e'` *(next in cycle: `011`)*
  5. **Purple:** `/assets/Collections-Cards-Gfx/Collection-Card-Top-Purple.gif` $\rightarrow$ `iconColor: '#bba08f'` *(next in cycle: `012`)*
- **Dynamic Icon & Stamp Overlay (`CollectionCard.tsx` & `CollectionDetail.tsx`):**
  - Generate the collection's SVG icon from `node_modules/react-icons/md` (`MdOutline...` with `fill: #fff; stroke: #fff; stroke-width: 0.75px; stroke-linejoin: round;` on `viewBox="-1 -1 26 26"`) into `/public/assets/collections-hero-images/Collections Icons SVGs/<slug>-icon.svg`.
  - Set `topGraphic`, `iconSvg`, `iconColor`, and `collectionNumber` (e.g., `'008'`) in `src/data/collections.ts`. `CollectionCard.tsx` automatically overlays the central icon, the bottom-left `"LBC CURATED COLLECTION"`, and the bottom-right [`NUMBER-BOOK-ICON.svg`](file:///Users/thomas/Desktop/The%20Long%20Book%20Club%20Project/TLBC%20Project%20Folder/public/assets/Collections-Cards-Gfx/NUMBER-BOOK-ICON.svg) + collection number in `iconColor`!

---

## 5. Mandatory Build & SEO Verification Step

After any edit to `src/data/books.ts`, `src/data/reviews.ts`, `src/data/collections.ts`, `src/data/genreData.ts`, or `src/data/journal.ts`:

1. Ensure all new books have audio preview streams synced:
   ```bash
   npm run sync:previews
   ```
2. Verify related book IDs:
   ```bash
   npm run audit:related
   ```
3. Run the full production build and pre-render pipeline:
   ```bash
   npm run build
   ```
4. Verify that:
   - `scripts/generate-sitemap.cjs` updates `public/sitemap.xml` with trailing slashes on all URLs.
   - `tsc -b && vite build` succeeds with zero TypeScript errors.
   - `scripts/prerender.cjs` generates thick static HTML (`<div id="no-js-content">`) and JSON-LD schema for all Book, Collection, Genre, Hub, and Journal pages in `dist/`, plus `.htaccess` and `htaccess.txt`.

