# 🧠 The Long Book Club: AI Knowledge Base & Eternal Rules

This file is the "Eternal Memory" for the project. **Any AI assistant working on this project MUST read this file in full before starting any task.**

---

## 🚀 Deployment & Hostinger Workflow (CRITICAL)

### **1. Automated GitHub-to-Hostinger Deployment (`main` + `deploy` Branches)**
- **Architecture:**
  - **`main` branch:** Source code (`src/`, `scripts/`, `public/`, `package.json`).
  - **`deploy` branch:** Compiled static production build (`dist/` contents + `.htaccess` + all pre-rendered HTML routes + `sitemap.xml`).
  - **Hostinger (`Advanced -> Git`):** Connected directly to `T0M0WL/the-long-book-club` on the **`deploy`** branch with **Auto-deployment** enabled (`public_html`).
- **How to Deploy Live:**
  1. Commit and push source code changes to `main` (`git add -A && git commit -m "..." && git push origin main`).
  2. Run **`npm run deploy`** (which runs `npm run build` followed by `node scripts/deploy-branch.cjs` to push the built `dist/` folder directly to `origin/deploy`).
  3. Hostinger automatically pulls the `deploy` branch into `public_html` within seconds—no manual File Manager upload or `.htaccess` renaming required.
- **Legacy Fallback (`.htaccess` / `htaccess.txt`):** The build script (`scripts/prerender.cjs`) still outputs **BOTH** `.htaccess` and `htaccess.txt` inside `dist/`. Never remove this dual output from `scripts/prerender.cjs`.

### **2. The Trailing Slash Protocol**
- **Issue:** The Hostinger server forces a trailing slash (e.g., `/links` becomes `/links/`).
- **Rule:** Any routing logic (like hiding the Header/Footer in `App.tsx`) MUST check for both the base path and the version with the trailing slash. 
- **Rule:** The `prerender.cjs` script must output directories for all static pages to ensure the server finds the static `index.html` within the slashed path.
- Always run `npm run build` (or `npm run deploy`) before completing a deployment.

### **3. GitHub Synchronization**
- **Rule:** Every session MUST end with both `main` (source) and `deploy` (built static files via `npm run deploy`) synchronized to GitHub. Never leave a session without ensuring the remote repository is up to date with local changes.

---

## 📈 SEO & Prerendering Rules

### **1. "Thick" Prerendering**
- We do NOT use a "Thin" SPA shell.
- Every page (`/book/*`, `/genre/*`, `/collections/`, `/journal/`, etc.) MUST serve substantial, unique visible content in the initial HTML body inside the `<div id="root">`.
- This is handled by `scripts/prerender.cjs`. If you modify the data structure in `src/data/`, you MUST update the extraction logic in the prerenderer.

### **2. Sitemap & Hub Integrity**
- **Rule:** The sitemap `scripts/generate-sitemap.cjs` must exclude internal utility routes like `/generator/`, but MUST include all public hub pages (e.g., `/long-book-finder/`, `/links/`).
- **SEO Consistency Checklist (Run EVERY Build):**
    1. **Check `Header.tsx`:** Do all navigation `path` strings end with a trailing slash?
    2. **Check `generate-sitemap.cjs`:** Are all public hub pages listed in `staticRoutes`?
    3. **Check `prerender.cjs`:** Is the `RewriteCond` in the `.htaccess` template updated to include any new public paths?
    4. **Check `App.tsx`:** Does the Header/Footer visibility logic account for both the base and slashed version of any new paths?

---

## 🛠️ Data Management

### **1. Flat-File Database**
- The "Database" consists of TypeScript files in `src/data/` (e.g., `books.ts`, `collections.ts`, `journal.ts`).
- Any metadata synchronization (like Amazon/Audible price or description updates) should use the provided Python scripts in the root directory.

---

## 🎨 UI & Design Principles
- **Aesthetic:** Modern, premium, using the custom "Lora" and "Inter" typography.
- **CSS:** Custom Vanilla CSS in `index.css`. Minimal dependencies.
- **Interactive:** Hover states, micro-animations, and custom SVG dividers are key to the brand.
