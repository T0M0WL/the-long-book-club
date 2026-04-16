# 📜 The Long Book Club: Historical Record & Maintenance Log

This document serves as the official "black box" recording of the site's evolution, technical procedures, and critical fixes made between February and April 2026.

## 🏛️ System Architecture Overview
The Long Book Club (TLBC) follows a **"Source-of-Truth" Flat-File Architecture**.

- **Database:** `src/data/books.ts` and `src/data/reviews.ts`.
- **Logic:** React 19 + TypeScript + Vite.
- **SEO/Deployment:** A robust pre-rendering system (`scripts/prerender.cjs`) turns the static data into SEO-perfect HTML pages during the build.
- **Build Command:** `npm run build` (Generates sitemap -> Compiles TS -> Bundles Vite -> Pre-renders 350+ pages).

---

## 🛠️ Major Milestones & Features

### 1. The "Social Hub" Page (`/links`) - *April 14, 2026*
Created a high-contrast, mobile-first landing page for Instagram/TikTok traffic. 
- **Tech Detail:** Specifically designed to exclude the global Header/Footer/Newsletter to maintain a focused "link-in-bio" experience.
- **Route:** `https://thelongbookclub.com/links`

### 2. The Book Curator Mega-Tool (`/generator`) - *April 15, 2026*
A custom-built internal GUI for the curator to add/edit books without touching raw code.
- **Mechanism:** Uses a custom Vite plugin (`saveBookDataPlugin`) that intercepts POST requests and writes changes directly to your local `.ts` files on the Mac.
- **Security Logic:** As of April 16, this route is **shielded**. It only exists in your local development environment and is automatically culled from the live production build for security.

### 3. Hero Section Standardization - *April 10, 2026*
Unified the editorial aesthetic across Finder, Journal, and Collections.
- **Typography:** Enforced a `4.5rem` headline size and consistent `100px` (desktop) / `50px` (mobile) breadcrumb spacing.
- **Animation:** Implemented the "Scale-Out Zoom" (`hero-intro-scale`) for all hero backgrounds.

---

## 🌪️ The "April Sync Drama" & Recovery Record
On **April 15-16, 2026**, a discrepancy was discovered between the live site (134 books) and the local environment (137 books).

### **Issues Identified:**
1.  **Duplicate Data:** A bug in the generator tool created two entries for *Pandora's Star* (ID 62), one of which was missing a required "slug."
2.  **TypeScript Build Failure:** The recently added *Mark Twain Collection* (ID 149) was missing a `description` field, causing the build process to crash.
3.  **Route Exposure:** The internal Curator tools were publicly visible on the live web.

### **The Fixes Applied:**
- ✅ **Sanitized `books.ts`:** Deleted the duplicate ID 62 and added the missing description to ID 149.
- ✅ **Synchronized Removal:** Confirmed *The Power of the Dog* was intentionally removed from local data to match live site deletions.
- ✅ **Implemented Route Protection:** Wrapped admin routes in `import.meta.env.DEV` check.
- ✅ **Verified Build:** Successfully ran a clean build with **135 unique books** indexed.

---

## 📋 Standard Operating Procedures (SOPs)

### **How to Add a New Book Safely**
1.  Launch the local site: `npm run dev`.
2.  Navigate to `http://localhost:5173/generator`.
3.  Fill in the details. **Tip:** Ensure every book has a "description" and a "slug" (e.g., `book-title-author-name`).
4.  The tool writes directly to your local `src/data/books.ts`.
5.  **Run a test build:** `npm run build` to ensure there are no TypeScript errors.

### **How to Recover from a Build Failure**
If `npm run build` fails:
1.  **Read the ID:** Look at the console output; it will usually tell you which book ID is causing the problem.
2.  **Check missing fields:** Common culprits are missing `description`, `slug`, or `genre`.
3.  **Restore Backup:** I have left a legacy backup at `src/data/books.ts.bak`.

### **Backup Strategy**
- **Gold Standard:** Your local file system (Time Machine/Manual copies) of the `src/` folder.
- **Silver Standard:** The GitHub repository. 
- **⚠️ Warning:** The "public" folder on Hostinger is **NOT** a data backup; it is only a functional backup of the compiled website.

---

## 🚀 The April SEO Restoration & Indexing Fix - *April 16, 2026*

A critical indexing drop was identified where Google Search Console "Discovered" pages plummeted from **373 to 18** on April 11, 2026.

### **The Problem:**
The site was previously a pure "Thin" SPA. While meta tags were in the `<head>`, the `<body>` was just an empty `<div id="root"></div>`. Google concluded that all book URLs were duplicates of each other because their raw HTML was identical.

### **The Fix: "Thick Prerendering"**
We upgraded the build process to inject unique, visible content into the HTML before it ever leaves the server.
- **Body Injection:** Every `.html` file in `dist/` now contains a readable `<h1>`, `<p>`, and the full `curatorNote` text inside the root div.
- **Structured Data:** Injected **JSON-LD (Schema.org)** into the head of every book page, explicitly defining them as "Book" and "Audiobook" entities.
- **Sitemap Sanitation:** Removed non-public routes (`/generator`, `/thank-you`) from `sitemap.xml` to prevent "Conflicting Signal" errors in Search Console.

### **Files Modified:**
- `scripts/prerender.cjs` (Complete logic overhaul for content extraction).
- `scripts/generate-sitemap.cjs` (Route filtering).
- `index.html` (Added `<!-- SEO_CONTENT_HOLDER -->` marker).

### **Verification Status:**
- ✅ **Sitemap:** 364 clean URLs.
- ✅ **Books:** 135 "Thick" pages generated.
- ✅ **Genres:** 221 unique category pages generated.
- ✅ **Journal:** 3 posts correctly captured (Fixed regex bug).

*Refer to the session walkthrough for technical code diffs and Search Console screenshots.*

---

*This log is intended for the Curator, Thomas. Keep building, keep reading.* 📚✨
