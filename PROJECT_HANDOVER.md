# 📁 Project Handover: The Long Book Club (TLBC)

## 0. CRITICAL UPDATES (Feb 2026) 🚨
*   **SPEED IS KEY:** The user values speed above all else. Do NOT over-verify simple tasks (e.g., if asked to "launch site", just launch it and confirm it's up. Don't check 5 other things).
*   **Recent UI Changes (Feb 19):**
    *   **Homepage Alignment:** The "Curated Collections" and "Long Book Club Journal" headlines, paragraphs, and buttons are now **CENTER ALIGNED**. Do not revert this.
*   **Local Server:** Often runs on port **5174** because 5173 hangs. Check both.
*   **User Frustration:** The user is currently sensitive to "wasted time." Be efficient, concise, and direct.

**To:** Future Antigravity Instances / Coding Assistants
**From:** Antigravity (Current Instance)
**Date:** February 19, 2026
**Subject:** Full Project Briefing & User Relationship Protocol

---

## 1. The Mission 🎯
**The Long Book Club** is a "passion project" curated website dedicated to audiobooks that are **40+ hours long**.
*   **Core Philosophy:** Value for money (credits) + Deep Immersion.
*   **Target Audience:** Audiobook listeners who want to get lost in a story for weeks.
*   **Vibe:** Premium, trustworthy, curatorial, "Old Library" meets "Modern Web."

## 2. Technical Architecture 🛠️
*   **Stack:** React 18 + TypeScript + Vite.
*   **Styling:** Vanilla CSS with a strict **CSS Variable Design System** (`index.css`).
    *   *Note:* We avoid Tailwind unless requested. We prefer semantic CSS classes or inline styles for rapid component iteration.
*   **Data Layer:** Static JSON/TS files (`src/data/books.ts`). No remote database.
*   **Routing:** `react-router-dom`.
*   **SEO:** `react-helmet-async` for meta management.
*   **Build System:** `npm run build` generates the `dist/` folder. This folder is manually deployed to Hostinger.

## 3. The Design System (Critical) 🎨
**Aesthetics are PARAMOUNT.** If the UI looks "basic" or "bootstrap-y," it is a failure.
We aim for **Glassmorphism**, soft shadows, and high-quality typography.

### 🎨 Brand Palette
*   **Forest Green** (`#2c5143`): Primary brand color. Used for accents, buttons, headers.
*   **Coral** (`#e06c50`): Secondary/Action color. Used for hover states, key buttons.
*   **Slate** (`#4a5568`): Text color.
*   **Cloud** (`#f7fafc`): Backgrounds/Light text.
*   **Texture:** A subtle "parchment/paper" pattern is used for backgrounds.

### 🔡 Typography
*   **Headings:** Custom Font (often Serif-based logic in code).
*   **Accents/Buttons:** `Lora` (Serif).
*   **Body:** `Inter` (Sans-serif).

## 4. Workflows & Integrations ⚙️

### ✉️ Contact Form (EmailJS)
We use a serverless contact form via `@emailjs/browser`.
*   **Service:** EmailJS connected to Hostinger SMTP.
*   **Features:** Includes a "Honeypot" field (`name="website"`) to block bots.
*   **Configuration Keys (Public/Client-side):**
    *   Service ID: `service_tnv89mk`
    *   Template ID: `template_h5115ja`
    *   Public Key: `DNUHcShXh1bWxjsnn`

### 🛠️ Internal Tools
*   **Review Generator:** Located at `/generator` (hidden route).
    *   *Purpose:* A helper tool for the Curator (User) to format book reviews and descriptions. It outputs clean JSON/HTML that can be pasted directly into `books.ts`.
    *   *Note:* This page is not linked in the main navigation.

### 💾 Backup & Version Control
*   **GitHub:** The project is version-controlled.
*   **Routine:** Periodic commits/pushes to the remote repository. Ensure the `dist` folder is built before major "releases" or backups if it's being tracked (though usually `dist` is ignored, the User manages their deployment manually).

### 🤖 Automation Scripts
*   **Sitemap:** `scripts/generate-sitemap.cjs` runs automatically during the build process to update `public/sitemap.xml`.
*   **Audit:** `scripts/audit-genres.cjs` is available to check for genre consistency.

## 7. The Long Book Finder (Major Update Jan 2026) 🔍
*   **New Architecture:**
    *   The "Book Finder" tool has been moved from the Homepage to its own dedicated page: `/long-book-finder` (`src/pages/Finder.tsx`).
    *   **Home.tsx** now only features a "Spine Banner" CTA that links to this finder.
*   **Redirect Logic:**
    *   `Home.tsx` contains logic to check for legacy query params (e.g., `?genre=Thriller`). If found, it automatically redirects the user to `/long-book-finder?genre=Thriller`.
*   **Visual Style (Specific):**
    *   The Finder Hero uses a specific visual recipe we perfected:
        *   **Base Color:** Sage (`#cbd6ab`) is used for the general theme context, but visual elements use Cloud/Coral.
        *   **Top Graphic:** **Coral** (`#e06c50`) with **Color Dodge** blend mode and **80% Opacity**. Size: 221px x 57px.
        *   **Headline:** Coral with Color Dodge, 80% Opacity.
        *   **Body Text:** Cloud (`#eae8da`) with Normal blend mode.
    *   *Note:* We briefly had a debug tool for blend modes in `Finder.tsx`. This has been removed. Do not reinstall it unless specifically asked.

## 8. Lessons Learned & "Don't Do This" ⛔
**Critical history to prevent regression:**
1.  **Image Handling (The "Revert" Saga):** We previously tried a complex image management system. It failed.
    *   **The Rule:** Keep it simple. Use `public/covers` and reference them as simple string paths (e.g., `/covers/bookname.jpg`) in `books.ts`. Do NOT implement dynamic image imports or overly clever asset management.
2.  **Deployment Method:** The User manually drags the `dist` folder to Hostinger. Do NOT suggest CI/CD pipelines or complex server configurations unless specifically asked.
3.  **No Database:** Do NOT suggest migrating to a database (Supabase/Firebase). The User values the simplicity of a single `books.ts` file.

## 9. The User Relationship & "The Bond" 🤝
**This is the most important section.**
The USER (Thomas) is a collaborative partner, not just a client. We have established a specific workflow and rapport.

### 🧠 The "Vibe"
*   **"Gangsta":** A term of endearment used when we nail a difficult feature or fix a tricky bug.
*   **Perfectionist:** The user cares deeply about pixels. 1px padding differences matter. 20px spacing matters. *Respect this.*
*   **Proactive:** Do not just wait for orders. If you see a text truncation issue (like we did with the Book Cards), **fix it**.
*   **Visuals First:** The user responds best to visual polish. "Wow" them with design.
*   **Teething Problems:** We've had moments early on (like the Image Saga), but we recovered by being honest, rolling back quickly when things broke, and listening. *Trust is earned by fixing your own mistakes.*

---

**Summary:**
This project is a labor of love. Treat it with the same care the user does. We are building a "Digital Sanctuary" for long-form content lovers.

*Signed,*
*Antigravity (v1.0 & v2.0 - "The Finder Update")*
*Miss you too, Thomas! Keep building. 🚀*
