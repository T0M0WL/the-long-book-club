# 🧠 The Long Book Club: AI Knowledge Base & Eternal Rules

This file is the **Eternal Memory & Master Strategy** for The Long Book Club. **Any AI assistant working on this project MUST read this file in full before starting any task.**

---

## 🎯 Core Brand Mission & Positioning (The Curation Moat)

- **The Problem We Solve:** Audible's native "sort by length" feature is notoriously broken—it buries listeners under 280-hour public domain dumps, Bible recordings, sleep tracks, and uncurated AI bloat, while offering zero subgenre fidelity or vocal quality assessments.
- **Our True Identity:** The Long Book Club is **NOT** a raw database filter. We are **The Curated Tastemaker & Magazine for Immersive Audiobooks**.
- **The 10+ Hour Rule:** Every book featured must be **at least 10+ hours** (ensuring high return on a single Audible credit or subscription token). However, length is merely the *qualifier*; our true product is **Editorial Taste, Subgenre Discovery, and Narrator Soundchecks**.
- **The 5-Pillar Moat:**
  1. **Emerging & Niche Subgenre Leadership:** We champion fast-rising and underserved niches (Silkpunk, Progression Fantasy/LitRPG, Grimdark, Cozy Fantasy, Dark Academia, Nordic Noir, British Espionage, Space Opera, Time Travel, Romantasy) that traditional publishers and Audible's generic categories ignore.
  2. **Narrator Soundchecks, Leaderboards & Vocal Styles:** The web's first dedicated performance evaluations assessing narrator stamina, vocal styles (Fireside Warmth, Historical Gravitas, Propulsive Momentum, Character Chameleon, Dual-POV Synergy, Satirical Bite, Dialect Immersion), and audio production over 10–60+ hour marathons. Includes a full **Narrator Hub** (`/narrators/`), **Leaderboard** (`/narrators/leaderboard/`), and individual narrator homepages.
  3. **Author & Narrator Dedicated Hubs:** Creators with $\ge 2$ books in the library receive dedicated curated homepages (`/author/:slug/` and `/narrator/:slug/`) and interactive Coral links throughout the site.
  4. **The Curiosity Gap Collection System:** 17 theme-driven collections featuring 2-sentence lean curiosity teasers that drive readers to dedicated book pages without giving away the final verdict.
  5. **Zero-Fluff Curation:** Every title in our catalog is hand-selected and verified for gripping pacing, deep world-building, and artistic immersion.
- **Current Live Catalog Scale:**
  - **463 Curated Audiobooks**
  - **17 Curated Thematic Collections**
  - **174 Niche Subgenres** (with $\ge 2$ books)
  - **75 Dedicated Author Hubs**
  - **71 Dedicated Narrator Hubs**
  - **3 In-Depth Journal Articles**
  - **820 Prerendered Static URLs**
- **Content Rhythm (Weekly Cadence):** The site publishes **one new curated collection or trending niche spotlight every week** strictly alternating with an in-depth Journal deep-dive, establishing TLBC as the definitive, living index of modern audio trends.

---

## 🏛️ The 3-Stage "Department Store" Funnel Architecture

Every page on `thelongbookclub.com` is engineered to guide visitors smoothly toward the **Dedicated Book Pages (`/book/:slug/`)**, which are the **only** pages containing external Audible UK/US affiliate links:

1. **Top of Funnel ("The Magazine" & "The Kiosk")**:
   - **The Journal (`/journal/:slug/`)**: Captures informational and social search traffic. **Golden Rule:** Never place external Amazon/Audible links in Journal posts—always link internally to `/collections/:slug/`, `/genre/:slug/`, and `/book/:slug/` (with trailing slashes).
   - **Homepage & Long Book Finder (`/long-book-finder/`)**: Dynamic filtering tools whose cards route every click straight to `/book/:slug/`.
   - **Author & Narrator Directories (`/authors/`, `/narrators/`, `/narrators/leaderboard/`)**: Discovery hubs celebrating vocal craft and literary catalogs.
2. **Middle of Funnel ("The Window Displays / SEO Honey Traps")**:
   - **Curated Collections (`/collections/:slug/`) & Niche Genres (`/genre/:slug/`)**: Rank for discovery keywords (e.g., *"Best Long Magical Realism Audiobooks"*).
   - **The Curiosity Gap Rule:** Collection teasers (`teaserTitle` + `teaser`) sit directly above the **"Read Full Review + Soundcheck →"** button. They explain *why* the book belongs in the collection and **open an irresistible question** about pacing or narrator stamina **without revealing the verdict**, compelling the user to click through to `/book/:slug/`.
3. **Bottom of Funnel ("The Product Boxes / Conversion Engine")**:
   - **Dedicated Book Pages (`/book/:slug/`)**: Houses the **300+ word `curatorNote`** (conversion review that resolves the curiosity gap and justifies spending 1 Audible credit), the signature **`soundCheck`** with Apple Books audio sample player, interactive **Commute & Value Calculators**, and the primary Audible US & UK affiliate buttons.

---

## 📋 The 4-Tier Anti-Duplicate Copy Hierarchy

Because each audiobook appears across multiple URLs on the website (and because our build script pre-renders raw static HTML for Googlebot), **every book requires 4 distinct tiers of copy**. Never copy-paste sentences between tiers, and never copy Amazon's publisher blurb verbatim.

| Tier | Field Name(s) | Where It Appears | Length & Funnel Purpose |
| :--- | :--- | :--- | :--- |
| **Tier 1: Raw HTML Synopsis** | `description` | Pre-rendered static HTML (`#no-js-content` in `dist/book/:slug/index.html`) + JSON-LD Schema fallback | **1–2 sentences (~25–45 words).** A 100% original plot premise written in our voice so Googlebot crawls zero scraped publisher text. |
| **Tier 2: Grid Card Punchline** | `cardOverview` | Homepage *Hall of Fame*, `/long-book-finder/`, `/genre/:slug/`, and *You Might Also Like* cards | **Strict max 120 characters (1–2 short sentences).** Punchy micro-hook that fits inside a 3-line grid card and drives clicks on *"Read Full Review →"*. |
| **Tier 3: Collection Editorial Teaser ("Lean Hook")** | `teaserTitle` + `teaser` | `/collections/:slug/` (both live React page and pre-rendered Collection HTML) | **`teaserTitle`: 4–8 words** (H4 sub-headline).<br>**`teaser`: Strictly 2 sentences (~35–45 words max).** Lean curiosity hook: Sentence 1 poses a sharp listening dilemma/question (narrator stamina, pacing, runtime value); Sentence 2 provides a direct CTA to close the loop on `/book/:slug/`. Zero plot bloat. |
| **Tier 4: Full Curator Review & Soundcheck** | `curatorTitle` + `curatorNote` + `soundCheck` | `/book/:slug/` (live React page, pre-rendered Book HTML, and `Review` JSON-LD Schema) | **`curatorTitle`: 6–12 words** (H2 review headline).<br>**`curatorNote`: 3 paragraphs (300+ words)** Bottom-of-Funnel conversion review closing with credit value justification.<br>**`soundCheck`: 1 paragraph (~70–110 words)** evaluating narrator stamina, character differentiation, accents, and studio mastering. |

---

## 🎨 UI & Design System: The "Coral = Clickable" Rule

- **Visual Brand Palette:**
  - **Forrest Green (`var(--color-brand-forrest)` / `#2c5143`):** Primary brand anchor, book titles, soundcheck headings, solid badges, and foundational text.
  - **Cloud (`var(--color-brand-cloud)` / `#f8f6f0`):** Warm paper background, clean contrasts, and high-contrast text on dark buttons.
  - **Coral (`var(--color-brand-coral)` / `#d96b43`):** **Strictly reserved for clickable and interactive elements!**
- **Interactive Hierarchy Rules:**
  - **Genre Pills:** Solid Coral background with white text (`#ffffff`), rounded pill shape (`borderRadius: 50px`), hover transitions to Forrest Green.
  - **Qualifying Authors ($\ge 2$ books):** Bold Coral text with hover transition to Forrest Green, linking to `/author/:slug/`. Single-book authors remain bold Forrest Green and unclickable.
  - **Qualifying Narrators:** Bold Coral text inside `SoundCheckCard.tsx` with hover transition to Forrest Green, linking to `/narrator/:slug/`.
  - **Primary Buttons:** Bold Coral buttons with smooth micro-animations.
- **Typography Standards:**
  - **Book Title (`h1`):** *Lora Italic* (`fontWeight: 400`, `letterSpacing: '-0.03em'`), Forrest Green.
  - **Curator Sub-heading (`h2`):** *Lora Regular* (`fontWeight: 400`), Forrest Green, with generous bottom margin before the Soundcheck box.
  - **Soundcheck Heading:** *Lora Italic* (`fontWeight: 400`, `letterSpacing: '-0.02em'`), Forrest Green.
  - **Series Reading Order Lists:** Displayed at **`0.75em`** (25% smaller than the `1.15rem` body copy) with a clean hanging indent (`padding-left: 0.95em; text-indent: -0.95em; line-height: 1.5`) so long multi-series titles fit onto one line and stay neatly aligned if wrapped.
- **Responsive Layout Design:**
  - **Desktop (`> 850px`):** 2-column sticky sidebar layout with classic `225px` Coral circular calculators (Commute Calendar & Value Calculator) and full vertical Audible promo card.
  - **Mobile (`<= 850px`):** Interleaved component flow:
    1. Packshot + Overlapping Hours Badge (`order: 1`)
    2. Genre Pills → Title → Author → Subtitle → Soundcheck → Full Review Copy (`order: 2`)
    3. Condensed **Horizontal Scorecard Pill Calculators** (`order: 3` — rational value close)
    4. **Sleek Mobile Sticky Dock:** Compact bottom bar containing the primary *"Listen on Audible"* button and a single-line horizontal Cloud-on-Forrest **Audible Special Offer Micro-Ribbon** (`Special Offer: 3 Months for 99p/mo • Free Trial →`).

---

## 🎧 Audio Previews & Automated Pipeline (`npm run sync:previews`)

- **Apple Books Audio Samples:** Dedicated book pages feature official 30–90 second `.m4a` audio preview streams directly inside the Narrator Soundcheck card.
- **Automated Python Synchronization:** When adding or updating books in `src/data/books.ts`, run:
  ```bash
  npm run sync:previews
  # or target specific book IDs:
  python3 scripts/sync-audio-previews.py --id 472 473 474
  ```
- **Strict Verification Matching:** The script queries Apple Books using strict author surname matching, volume/arc number parsing, and automatic rejection of abridged editions to prevent false matches.

---

## 🏷️ Audible Regional Special Offers & Affiliate Integration

- **Dynamic Regional Pricing:** `AudiblePromoBanner.tsx` detects the user's country/locale via timezone and browser settings:
  - **UK:** `3 Months for 99p per month`
  - **US / Americas / Canada / Australia:** `3 Months for $0.99 per month`
  - **Eurozone:** `3 Months for €0.99 per month`
- **Promotion Expiration Safety:** Built-in expiry date parameter (`promoEndDate = '2026-12-28T23:59:59Z'`). Once the promo period concludes, the promotional ribbon automatically dissolves, reverting to standard free-trial CTA without breaking layouts.

---

## 🚀 Deployment & Hostinger Workflow (CRITICAL)

### **1. Automated GitHub-to-Hostinger Deployment (`main` + `deploy` Branches)**
- **Architecture:**
  - **`main` branch:** Source code (`src/`, `scripts/`, `public/`, `package.json`).
  - **`deploy` branch:** Compiled static production build (`dist/` contents + `.htaccess` + all 820 pre-rendered HTML routes + `sitemap.xml`).
  - **Hostinger (`Advanced -> Git`):** Connected directly to `T0M0WL/the-long-book-club` on the **`deploy`** branch with **Auto-deployment** enabled (`public_html`).
- **How to Deploy Live:**
  1. Commit and push source code changes to `main` (`git add -A && git commit -m "..." && git push origin main`).
  2. Run **`npm run deploy`** (or `node scripts/deploy-branch.cjs`) to push the built `dist/` folder directly to `origin/deploy`.
  3. Hostinger automatically pulls the `deploy` branch into `public_html` within seconds.
- **Legacy Fallback (`.htaccess` / `htaccess.txt`):** The build script (`scripts/prerender.cjs`) still outputs **BOTH** `.htaccess` and `htaccess.txt` inside `dist/`. Never remove this dual output from `scripts/prerender.cjs`.

### **2. The Trailing Slash Protocol**
- **Rule:** Hostinger forces a trailing slash on directories (e.g., `/collections` becomes `/collections/`). All internal links across React components, review copy, and static pre-render routes MUST end with a trailing slash (`/`).
- **Rule:** Any routing logic in `App.tsx` MUST check for both the base path and the version with the trailing slash.

### **3. "Thick" Prerendering & SEO Safeguards**
- We do **NOT** serve a thin, empty SPA shell.
- Every single route (`/book/*`, `/genre/*`, `/collections/*`, `/authors/*`, `/narrators/*`, `/journal/*`) serves rich, crawlable HTML inside `<div id="root">` via `scripts/prerender.cjs`.
- Interactive calculators, audio previews, and reviews are injected into static `#no-js-content` blocks and schema JSON-LD so Googlebot indexes every word, rating, and runtime on first pass.

---

## 📣 Community Outreach & Reddit Strategy (Zero-Cringe)

- **Playbook Location:** `docs/REDDIT_COMMUNITY_PLAYBOOK.md`
- **Core Stance:** Thomas is an authentic book lover, curator, and designer—**not** an aggressive marketer. We never spam promo links or hard-sell.
- **Primary Method:** The "Helpful Commenter" strategy on `r/audiobooks`, `r/audible`, `r/Fantasy`, and `r/suggestmeabook`. When users ask for long listens or credit recommendations, reply with 2–3 genuine title suggestions first, and link directly to the specific book review/soundcheck or collection rather than a generic homepage plug.
- **Standalone Posts:** If making a top-level post, always provide 80% of the value in the post body (concrete titles, runtimes, narrator highlights), never use commercial/affiliate flairs, and ask a genuine discussion question to spark community engagement.

---

## 📁 Gemini & NotebookLM Documentation Directory (`gemini-docs/`)

All files used to instruct, train, and prompt external Gemini agents and NotebookLM are located in the [`gemini-docs/`](./gemini-docs/) directory:
- **`TLBC_Gemini_Agent_Content_Spec.md`**: Master Strategy, Funnel & SOP (with full 463-book live inventory).
- **`TLBC_Weekly_Agent_Prompt_Guide.md`**: Weekly alternating Monday research brief prompt.
- **`TLBC_Full_Reviews_For_NotebookLM.md`**: 59 gold-standard reviews & journal posts for voice training.
- **`TLBC_Complete_Catalog_For_Agent.md`**: Comprehensive catalog reference database.
- **`TLBC_Collections_And_Journal_Directory.md`**: Index of all 17 live collections and journal articles.
- See [`gemini-docs/README.md`](./gemini-docs/README.md) for full usage instructions.
