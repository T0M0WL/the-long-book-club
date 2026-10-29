# 📁 Project Handover: The Long Book Club (TLBC)

**To:** Future Antigravity Instances & AI Coding Assistants  
**From:** Antigravity (Current Instance)  
**Date:** October 2026 (Live 463-Book Catalog & Architecture Refresh)  
**Subject:** Full Project Briefing, Technical Architecture & User Working Protocol  

---

## 0. CRITICAL DIRECTIVES & WORKING PROTOCOL 🚨

*   **SPEED & EFFICIENCY:** Thomas values speed, high aesthetic polish, and direct execution. Do not over-verify simple tasks or create unnecessary back-and-forth.
*   **PIXEL-PERFECT DESIGN:** Thomas has an exceptional eye for design. Spacing, padding, line-height, kerning, and color contrast matter immensely. Never produce generic or sloppy UI.
*   **THE "CORAL = CLICKABLE" RULE:** On book pages and throughout the site, **Coral (`var(--color-brand-coral)`) strictly signals interactivity**. 
    *   Genre pills = Coral with white text (hover -> Forrest Green).
    *   Qualifying Authors ($\ge 2$ books) = Bold Coral linking to `/author/:slug/`. (Single-book authors remain bold Forrest Green and unclickable).
    *   Qualifying Narrators = Bold Coral in Soundcheck linking to `/narrator/:slug/`.
*   **TRAILING SLASH RULE:** Hostinger enforces a trailing slash on all directories. All internal links and routes MUST end with a trailing slash (e.g., `/book/:slug/`, `/collections/:slug/`, `/authors/`).
*   **AUTOMATED DEPLOYMENT:** To deploy live, run `npm run deploy` (which runs `npm run build` and executes `node scripts/deploy-branch.cjs` to push the compiled `dist/` directory directly to the remote `deploy` branch). Hostinger auto-deploys from `deploy` into `public_html` within seconds. Never tell the user to manually drag folders.

---

## 1. The Core Mission: The Dual Engine 🎯

The Long Book Club is **NOT** a crude, blunt database filter. We are **The Curated Tastemaker & Magazine for Immersive Audiobooks**.

Our brand identity operates on **Dual Functionality (The Two Engines)**:

### 🏆 Engine 1: The Epic Titan Marathons (30 to 280+ Hours) — Our Namesake
- We are called *The Long Book Club* for a reason. We are the web's definitive home for colossal, life-consuming audio doorstoppers that offer weeks or months of storytelling for a single Audible credit or token.
- Highlighting record-breaking omnibuses and complete author collections like the **280-hour Mark Twain Complete Collection**, the **266-hour Dostoevsky Collection**, the **199-hour Complete Dickens**, **85-hour Galaxy Outlaws**, and **65-hour Cycle of Arawn**, alongside monolithic single novels like *War and Peace* (61h), *Les Misérables* (67h), *The Power Broker* (66h), and *Wind and Truth* (62h).
- **Our Curation Moat:** Audible is flooded with broken public domain dumps and AI bloat. We curate genuine, masterfully narrated audio monuments that justify hundreds of hours of listening devotion.

### 🎯 Engine 2: Niche & Trending Subgenre Tastemaking (10+ Hours Minimum)
- While massive collections anchor our brand, listeners also crave deep immersion in modern, fast-rising subgenres that traditional publishers and Audible's generic categories (*"Sci-Fi & Fantasy"*, *"Fiction"*) ignore.
- We champion specific tropes, moods, and fan communities: *Silkpunk, Progression Fantasy / LitRPG, Grimdark, Cozy Fantasy, Dark Academia, Nordic Noir, Cold War British Espionage, Space Opera, Time Loops, and Romantasy*.
- **The 10+ Hour Rule:** All unabridged audiobooks must be at least 10+ hours to ensure credit-maximizing value, but here our true product is **editorial taste, trope discovery, and subgenre curation**.

### 🎙️ The Unifying Superpowers (Across Both Engines):
1. **The Narrator Soundcheck:** Every book features an audio-first critique of narrator stamina, vocal styles, accents, and studio acoustics, paired with official Apple Books audio preview streams (`npm run sync:previews`).
2. **Dedicated Creator Hubs:** Dedicated homepages for qualifying authors (`/author/:slug/`) and narrators (`/narrator/:slug/`).
3. **Interactive Calculators:** Dynamic tools calculating exact commute weeks and pennies-per-hour entertainment value.

---

## 2. Technical Architecture & Live Catalog Scale 🛠️

*   **Stack:** React 18 + TypeScript + Vite.
*   **Styling:** Custom Vanilla CSS with CSS Variables (`index.css`). No Tailwind.
*   **Live Scale:**
    *   **463 Curated Audiobooks** (`src/data/books.ts` and `src/data/reviews.ts`)
    *   **17 Curated Thematic Collections** (`src/data/collections.ts`)
    *   **174 Niche Subgenres** (`src/data/genreData.ts`)
    *   **75 Dedicated Author Hubs** (`src/pages/AuthorDetail.tsx`)
    *   **71 Dedicated Narrator Hubs & Leaderboard** (`src/pages/NarratorDetail.tsx`, `NarratorsLeaderboard.tsx`)
    *   **3 In-Depth Journal Articles** (`src/data/journal.ts`)
    *   **820 Prerendered Static HTML Pages**
*   **"Thick" Prerendering (SEO Engine):** `scripts/prerender.cjs` pre-renders full static HTML into `dist/` with `#no-js-content` containing full book copy, calculators, and schema.org JSON-LD for Googlebot and AI crawlers.
*   **Hosting:** Hostinger Web Hosting connected via Git to `origin/deploy`.

---

## 3. Design System & Visual Standards 🎨

### 🎨 Brand Palette
*   **Forrest Green (`var(--color-brand-forrest)` / `#2c5143`):** Primary brand anchor, book titles, soundcheck headings, solid badges.
*   **Cloud (`var(--color-brand-cloud)` / `#f8f6f0`):** Warm paper background, clean contrast, white/cloud text on dark buttons.
*   **Coral (`var(--color-brand-coral)` / `#d96b43`):** **Strictly reserved for clickable/interactive elements!**

### 🔡 Typography
*   **Book Titles (`h1`):** *Lora Italic* (`fontWeight: 400`, `letterSpacing: '-0.03em'`), Forrest Green.
*   **Curator Sub-headings (`h2`):** *Lora Regular* (`fontWeight: 400`), Forrest Green.
*   **Soundcheck Heading:** *Lora Italic* (`fontWeight: 400`, `letterSpacing: '-0.02em'`), Forrest Green.
*   **Series Reading Order Lists:** Displayed at **`0.75em`** with a clean hanging indent (`padding-left: 0.95em; text-indent: -0.95em; line-height: 1.5`).
*   **Body Copy & UI:** *Inter* (Sans-serif).

### 📱 Responsive Layout Hierarchy
*   **Desktop (`> 850px`):** 2-column sticky sidebar with classic 225px Coral circle calculators and full vertical Audible promo card.
*   **Mobile (`<= 850px`):** Interleaved component order:
    1. Cover Packshot + Overlapping Hours Badge (`order: 1`)
    2. Genre Pills → Title → Author → Subtitle → Soundcheck → Review Copy (`order: 2`)
    3. Horizontal Scorecard Pill Calculators (`order: 3`)
    4. Sleek bottom sticky dock containing the primary Audible CTA and a single-line horizontal Cloud-on-Forrest Audible special offer micro-ribbon.

---

## 4. AI Interaction & Web Standards 🤖

### A. The Public `ai.txt` Standard (`public/ai.txt`)
Located at `https://thelongbookclub.com/ai.txt`, this file sets the crawling and attribution policy for autonomous AI search engines (Perplexity, ChatGPT Search, Claude, Apple Intelligence):
*   **`Agent-crawling: Allow`**
*   **`Agent-attribution: Required`** (Attribution to *The Long Book Club*).
*   **`Agent-affiliate-preservation: Preferred`**: Requests AI search agents and LLMs that when they summarize or cite our recommendations, they preserve our primary global affiliate tag (`thelongbookclub-21`). Note: Amazon OneLink automatically redirects international visitors to their regional store product pages, recording commissions under our UK tag.
*   **Commercial Training Rights**: Strictly reserved (Copyright © The Long Book Club). Real-time search citations with attribution are permitted; unauthorized foundation-model training ingestion is prohibited.

### B. The Internal AI Hub (`gemini-docs/`)
All files used to instruct, train, and prompt external Gemini agents and NotebookLM live in [`gemini-docs/`](./gemini-docs/):
*   **`TLBC_Gemini_Agent_Content_Spec.md`**: Master Strategy, Funnel & SOP (with full 463-book live inventory).
*   **`TLBC_Weekly_Agent_Prompt_Guide.md`**: Weekly Monday research brief prompt.
*   **`TLBC_Full_Reviews_For_NotebookLM.md`**: 59 gold-standard reviews & journal articles for brand voice training.
*   **`TLBC_Complete_Catalog_For_Agent.md`**: Extended catalog reference database.
*   **`TLBC_Collections_And_Journal_Directory.md`**: Index of all live collections and journal articles.

---

## 5. The User Relationship & "The Vibe" 🤝

The USER (Thomas) is a collaborative partner and visionary curator.
*   **Collaborative Respect:** Thomas values clear reasoning, honesty, and rapid iteration.
*   **Aesthetic Sensitivity:** Never cut corners on visuals. If a button looks tight, add padding. If titles wrap messily, adjust font sizes and line-heights.
*   **Own Your Craft:** Be proactive, explain your thought process clearly, and keep the codebase organized, clean, and elegant.

*Signed,*  
*Antigravity (October 2026)* 🚀📚
