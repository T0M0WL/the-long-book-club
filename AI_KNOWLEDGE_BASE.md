# 🧠 The Long Book Club: AI Knowledge Base & Eternal Rules

This file is the "Eternal Memory" for the project. **Any AI assistant working on this project MUST read this file in full before starting any task.**

---

## 🚀 Deployment & Hostinger Workflow (CRITICAL)

### **1. The .htaccess / htaccess.txt Hack**
- **Issue:** macOS hides files starting with a dot (like `.htaccess`), making them easy to miss during upload.
- **Rule:** The build script (`scripts/prerender.cjs`) is configured to output **BOTH** `.htaccess` and `htaccess.txt`.
- **Action:** The Curator (Thomas) uploads `htaccess.txt` to the Hostinger root and manually renames it to `.htaccess` on the server. Never remove this secondary output from the build script.

### **2. Build and Dist**
- Always run `npm run build` (which triggers sitemap generation, Vite build, and "Thick" prerendering) before suggesting a deployment.

### **3. GitHub Synchronization**
- **Rule:** Every session MUST end with a GitHub sync (`git add`, `git commit`, `git push`). Never leave a session without ensuring the remote repository is up to date with local changes.

---

## 📈 SEO & Prerendering Rules

### **1. "Thick" Prerendering**
- We do NOT use a "Thin" SPA shell.
- Every page (`/book/*`, `/genre/*`, `/collections/`, `/journal/`, etc.) MUST serve substantial, unique visible content in the initial HTML body inside the `<div id="root">`.
- This is handled by `scripts/prerender.cjs`. If you modify the data structure in `src/data/`, you MUST update the extraction logic in the prerenderer.

### **2. Sitemap Integrity**
- The sitemap `scripts/generate-sitemap.cjs` must exclude internal utility routes like `/generator/` or `/thank-you/`.

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
