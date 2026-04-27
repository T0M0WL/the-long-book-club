
const fs = require('fs');
const path = require('path');

const DIST_DIR = path.join(__dirname, '../dist');
const BOOKS_FILE = path.join(__dirname, '../src/data/books.ts');
const REVIEWS_FILE = path.join(__dirname, '../src/data/reviews.ts');
const JOURNAL_FILE = path.join(__dirname, '../src/data/journal.ts');
const GENRE_DATA_FILE = path.join(__dirname, '../src/data/genreData.ts');
const COLLECTIONS_FILE = path.join(__dirname, '../src/data/collections.ts');
const TEMPLATE_FILE = path.join(DIST_DIR, 'index.html');
const BASE_URL = 'https://thelongbookclub.com';

/**
 * Extracts field values from a TypeScript block.
 * Enhanced to handle multi-line content for body injection.
 */
function extractField(content, fieldName, stripHtml = true) {
    const regex = new RegExp(`${fieldName}:\\s*(['"\`])((?:\\\\.|(?!\\1)[\\s\\S])*?)\\1`, 'm');
    const match = content.match(regex);
    if (!match) return null;
    
    let val = match[2];
    val = val.replace(/\\(['"`])/g, '$1')
             .replace(/\\n/g, '\n')
             .replace(/\\t/g, '\t');
             
    if (stripHtml) {
        return val.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    }
    return val.trim();
}

/**
 * Simple HTML escape
 */
function escapeHtml(text) {
    if (!text) return '';
    return text.replace(/&/g, '&amp;')
               .replace(/</g, '&lt;')
               .replace(/>/g, '&gt;')
               .replace(/"/g, '&quot;')
               .replace(/'/g, '&#039;');
}

async function prerender() {
    console.log('🚀 Starting "Thick" Prerender for SEO Restoration...');

    if (!fs.existsSync(TEMPLATE_FILE)) {
        console.error('❌ dist/index.html not found. Run build first.');
        process.exit(1);
    }

    const template = fs.readFileSync(TEMPLATE_FILE, 'utf-8');
    const booksContent = fs.readFileSync(BOOKS_FILE, 'utf-8');
    const reviewsContent = fs.existsSync(REVIEWS_FILE) ? fs.readFileSync(REVIEWS_FILE, 'utf-8') : '';
    const genreDataContent = fs.existsSync(GENRE_DATA_FILE) ? fs.readFileSync(GENRE_DATA_FILE, 'utf-8') : '';

    // 1. Parse Reviews into a Map
    const reviewsMap = new Map();
    if (reviewsContent) {
        const rBlocks = reviewsContent.split(/^\s*["']([^"']+)["']\s*:\s*\{/gm).slice(1);
        for (let i = 0; i < rBlocks.length; i += 2) {
            const title = rBlocks[i];
            const block = rBlocks[i + 1].split(/^\s*\}/gm)[0];
            reviewsMap.set(title, {
                curatorNote: extractField(block, 'curatorNote', false),
                curatorTitle: extractField(block, 'curatorTitle'),
                longBookClubTake: extractField(block, 'longBookClubTake', false)
            });
        }
    }

    // 2. Parse Genre Data into a Map
    const genreMetaMap = new Map();
    if (genreDataContent) {
        const gBlocks = genreDataContent.split(/^\s*\{/gm).slice(1);
        for (const block of gBlocks) {
            const cleanBlock = block.split(/^\s*\}/gm)[0];
            const genre = extractField(cleanBlock, 'genre');
            if (genre) {
                genreMetaMap.set(genre, {
                    metaTitle: extractField(cleanBlock, 'metaTitle'),
                    intro: extractField(cleanBlock, 'intro')
                });
            }
        }
    }

    // --- Book Prerendering ---
    const startIndex = booksContent.indexOf('const baseBooks: Book[] = [');
    if (startIndex !== -1) {
        const arrayContent = booksContent.substring(startIndex);
        // More robust splitting: matches { that are either at start of line OR preceded by a comma/bracket
        const bookBlocks = arrayContent.split(/(?:\s*\{)/gm).slice(1);
        let count = 0;

        for (const block of bookBlocks) {
            const cleanBlock = block.split(/^\s*\}/gm)[0];
            const slug = extractField(cleanBlock, 'slug');
            if (!slug) continue;

            const title = extractField(cleanBlock, 'title') || 'The Long Book Club';
            const author = extractField(cleanBlock, 'author');
            const bookDesc = extractField(cleanBlock, 'description', false);
            const coverUrl = extractField(cleanBlock, 'coverUrl') || '/assets/social-share-2.jpg';
            const narrator = extractField(cleanBlock, 'narrator');
            const length = extractField(cleanBlock, 'length');
            const genreRaw = extractField(cleanBlock, 'genre') || 'Fiction';

            const review = reviewsMap.get(title);
            let seoDescription = (review && review.curatorNote) ? review.curatorNote : (bookDesc || 'Curated long audiobooks.');
            seoDescription = seoDescription.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
            if (seoDescription.length > 250) seoDescription = seoDescription.substring(0, 247) + '...';

            const absoluteCoverUrl = coverUrl.startsWith('http') ? coverUrl : BASE_URL + coverUrl;
            const absoluteUrl = BASE_URL + '/book/' + slug + '/';

            // Injection Content (Visible Body)
            const bodyContent = `
                <div id="no-js-content" style="max-width: 800px; margin: 0 auto; padding: 20px; font-family: sans-serif;">
                    <h1>${escapeHtml(title)}</h1>
                    <p><strong>Author:</strong> ${escapeHtml(author)} | <strong>Narrator:</strong> ${escapeHtml(narrator)}</p>
                    <p><strong>Runtime:</strong> ${escapeHtml(length)} | <strong>Genre:</strong> ${escapeHtml(genreRaw)}</p>
                    <hr />
                    <div class="book-description">
                        <h2>About this Audiobook</h2>
                        <p>${escapeHtml(bookDesc)}</p>
                    </div>
                    ${review ? `
                    <div class="curator-review" style="background: #f9f9f9; padding: 15px; border-radius: 8px; margin-top: 20px;">
                        <h2>Our Curator's Review</h2>
                        <p>${escapeHtml(review.curatorNote)}</p>
                    </div>
                    ` : ''}
                </div>
            `;

            // JSON-LD
            const jsonLd = {
                "@context": "https://schema.org",
                "@type": "Book",
                "name": title,
                "author": { "@type": "Person", "name": author },
                "description": seoDescription,
                "image": absoluteCoverUrl,
                "genre": genreRaw,
                "readBy": { "@type": "Person", "name": narrator },
                "url": absoluteUrl
            };

            let html = template;
            html = html.replace(/<title>.*?<\/title>/, `<title>${escapeHtml(title)} | The Long Book Club</title>`);
            html = html.replace(/<meta name="description" content="[^"]+" \/>/, `<meta name="description" content="${escapeHtml(seoDescription)}" />`);
            // OG tags
            html = html.replace(/<meta property="og:title" content="[^"]+" \/>/, `<meta property="og:title" content="${escapeHtml(title)}" />`);
            html = html.replace(/<meta property="og:description" content="[^"]+" \/>/, `<meta property="og:description" content="${escapeHtml(seoDescription)}" />`);
            html = html.replace(/<meta property="og:image" content="[^"]+" \/>/, `<meta property="og:image" content="${absoluteCoverUrl}" />`);
            html = html.replace(/<meta property="og:url" content="[^"]+" \/>/, `<meta property="og:url" content="${absoluteUrl}" />`);
            html = html.replace(/<link rel="canonical" href="[^"]+" \/>/, `<link rel="canonical" href="${absoluteUrl}" />`);

            // Inject Body Content
            html = html.replace('<!-- SEO_CONTENT_HOLDER -->', bodyContent);
            
            // Inject JSON-LD
            html = html.replace('</head>', `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script></head>`);

            const outDir = path.join(DIST_DIR, 'book', slug);
            if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
            fs.writeFileSync(path.join(outDir, 'index.html'), html);
            count++;
        }
        console.log(`✅ Prerendered ${count} "Thick" book pages.`);
    }

    // --- Journal Prerendering ---
    if (fs.existsSync(JOURNAL_FILE)) {
        const journalContent = fs.readFileSync(JOURNAL_FILE, 'utf-8');
        const jBlocks = journalContent.split(/(?:\s*\{)/gm).slice(1);
        let jCount = 0;

        for (const block of jBlocks) {
            const cleanBlock = block.split(/^\s*\}/gm)[0];
            const slug = extractField(cleanBlock, 'slug');
            if (!slug) continue;

            const title = extractField(cleanBlock, 'title');
            const excerpt = extractField(cleanBlock, 'excerpt');
            const author = extractField(cleanBlock, 'author') || 'The Long Book Club';
            const date = extractField(cleanBlock, 'date');
            const coverUrl = extractField(cleanBlock, 'coverUrl') || '/assets/social-share-2.jpg';

            const absoluteUrl = BASE_URL + '/journal/' + slug + '/';
            const absoluteCoverUrl = coverUrl.startsWith('http') ? coverUrl : BASE_URL + coverUrl;

            const bodyContent = `
                <div id="no-js-content" style="max-width: 800px; margin: 0 auto; padding: 20px; font-family: sans-serif;">
                    <h1>${escapeHtml(title)}</h1>
                    <p><em>Published on ${escapeHtml(date)} by ${escapeHtml(author)}</em></p>
                    <hr />
                    <div class="journal-excerpt">
                        <p>${escapeHtml(excerpt)}</p>
                    </div>
                    <p>Read the full post at ${absoluteUrl}</p>
                </div>
            `;

            let html = template;
            html = html.replace(/<title>.*?<\/title>/, `<title>${escapeHtml(title)} | The Long Book Club Journal</title>`);
            html = html.replace(/<meta name="description" content="[^"]+" \/>/, `<meta name="description" content="${escapeHtml(excerpt)}" />`);
            html = html.replace('<!-- SEO_CONTENT_HOLDER -->', bodyContent);
            
            const outDir = path.join(DIST_DIR, 'journal', slug);
            if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
            fs.writeFileSync(path.join(outDir, 'index.html'), html);
            jCount++;
        }
        console.log(`✅ Prerendered ${jCount} "Thick" journal pages.`);
    }

    // --- Genre Prerendering ---
    const uniqueGenres = new Set();
    const genreRegex = /genre:\s*(\[[^\]]+\]|'[^']+'|"[^"]+")/g;
    let genreMatch;
    while ((genreMatch = genreRegex.exec(booksContent)) !== null) {
        let raw = genreMatch[1];
        if (raw.startsWith('[')) {
            const parts = raw.replace(/[\[\]'"]/g, '').split(',');
            parts.forEach(p => uniqueGenres.add(p.trim()));
        } else {
            uniqueGenres.add(raw.replace(/['"]/g, '').trim());
        }
    }

    const slugify = (text) => text.toString().toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w-]+/g, '').replace(/--+/g, '-');
    let gCount = 0;
    uniqueGenres.forEach(genre => {
        const slug = slugify(genre);
        const meta = genreMetaMap.get(genre) || { 
            metaTitle: `${genre} Audiobooks Over 20 Hours | The Long Book Club`,
            intro: `Explore our selection of epic ${genre} audiobooks.` 
        };

        const bodyContent = `
            <div id="no-js-content" style="max-width: 800px; margin: 0 auto; padding: 20px; font-family: sans-serif;">
                <h1>Best Long ${escapeHtml(genre)} Audiobooks</h1>
                <p>${escapeHtml(meta.intro)}</p>
                <p>Welcome to our curated collection of the best and longest ${escapeHtml(genre)} audiobooks, all 20+ hours in length.</p>
            </div>
        `;

        let html = template;
        html = html.replace(/<title>.*?<\/title>/, `<title>${escapeHtml(meta.metaTitle)}</title>`);
        html = html.replace(/<meta name="description" content="[^"]+" \/>/, `<meta name="description" content="${escapeHtml(meta.intro)}" />`);
        html = html.replace('<!-- SEO_CONTENT_HOLDER -->', bodyContent);

        const outDir = path.join(DIST_DIR, 'genre', slug);
        if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
        fs.writeFileSync(path.join(outDir, 'index.html'), html);
        gCount++;
    });
    console.log(`✅ Prerendered ${gCount} "Thick" genre pages.`);

    // --- Static Hub Prerendering (Enriched) ---
    const staticPages = [
        { slug: 'about', title: 'About | The Long Book Club', desc: 'About our mission to find the most epic audiobooks over 20 hours long.' },
        { slug: 'privacy', title: 'Privacy Policy | The Long Book Club', desc: 'Privacy policy for The Long Book Club.' },
        { slug: 'long-book-finder', title: 'Long Audiobook Finder | The Long Book Club', desc: 'Filter and discover 20+ hour epic audiobooks by length, author, and genre.' },
        { slug: 'collections', title: 'Curated Collections | The Long Book Club', desc: 'Explore hand-picked lists of the best long-form audiobooks, from Epic Fantasy to Non-Fiction Titans.' },
        { slug: 'journal', title: 'The Long Book Club Journal', desc: 'Latest insights, guides, and strategic listening tips for long-form audiobook fans.' }
    ];

    // Helper to extract all blocks from a file
    function extractAllBlocks(content) {
        return content.split(/(?:\s*\{)/gm).slice(1).map(b => b.split(/^\s*\}/gm)[0]);
    }

    const collectionsContent = fs.existsSync(COLLECTIONS_FILE) ? fs.readFileSync(COLLECTIONS_FILE, 'utf-8') : '';
    const journalContent = fs.existsSync(JOURNAL_FILE) ? fs.readFileSync(JOURNAL_FILE, 'utf-8') : '';

    for (const page of staticPages) {
        let bodyContent = `<div id="no-js-content" style="max-width: 800px; margin: 0 auto; padding: 20px; font-family: sans-serif;"><h1>${escapeHtml(page.title)}</h1><p>${escapeHtml(page.desc)}</p>`;

        if (page.slug === 'collections' && collectionsContent) {
            bodyContent += '<h2>Our Curated Lists</h2><ul>';
            const cBlocks = extractAllBlocks(collectionsContent);
            for (const b of cBlocks) {
                const cTitle = extractField(b, 'title');
                const cDesc = extractField(b, 'description');
                const cSlug = extractField(b, 'slug');
                if (cTitle && cSlug) {
                    bodyContent += `<li><strong><a href="/collections/${cSlug}">${escapeHtml(cTitle)}</a></strong>: ${escapeHtml(cDesc)}</li>`;
                }
            }
            bodyContent += '</ul>';
        } else if (page.slug === 'journal' && journalContent) {
            bodyContent += '<h2>Latest Insights & Guides</h2><ul>';
            const jBlocks = extractAllBlocks(journalContent);
            for (const b of jBlocks) {
                const jTitle = extractField(b, 'title');
                const jExcerpt = extractField(b, 'excerpt');
                const jSlug = extractField(b, 'slug');
                if (jTitle && jSlug) {
                    bodyContent += `<li><strong><a href="/journal/${jSlug}">${escapeHtml(jTitle)}</a></strong>: ${escapeHtml(jExcerpt)}</li>`;
                }
            }
            bodyContent += '</ul>';
        } else if (page.slug === 'long-book-finder') {
            bodyContent += '<h2>Top Long Audiobooks</h2><p>Our library contains over 130 epic audiobooks. Some of our favorites include:</p><ul>';
            // Just take first 10 for thickening
            const firstTen = extractAllBlocks(booksContent).slice(0, 10);
            for (const b of firstTen) {
                const bTitle = extractField(b, 'title');
                const bAuthor = extractField(b, 'author');
                const bSlug = extractField(b, 'slug');
                if (bTitle && bSlug) {
                    bodyContent += `<li><a href="/book/${bSlug}">${escapeHtml(bTitle)}</a> by ${escapeHtml(bAuthor)}</li>`;
                }
            }
            bodyContent += '</ul>';
        }

        bodyContent += '</div>';

        let html = template;
        html = html.replace(/<title>.*?<\/title>/, `<title>${escapeHtml(page.title)}</title>`);
        html = html.replace(/<meta name="description" content="[^"]+" \/>/, `<meta name="description" content="${escapeHtml(page.desc)}" />`);
        html = html.replace('<!-- SEO_CONTENT_HOLDER -->', bodyContent);
        
        const outDir = path.join(DIST_DIR, page.slug);
        if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
        fs.writeFileSync(path.join(outDir, 'index.html'), html);
    }
    console.log(`✅ Prerendered ${staticPages.length} "Thick" hub pages.`);
    
    // --- Collection Detail Prerendering (Enriched) ---
    if (collectionsContent) {
        const cBlocks = extractAllBlocks(collectionsContent);
        let cdCount = 0;
        for (const block of cBlocks) {
            const slug = extractField(block, 'slug');
            if (!slug) continue;

            const title = extractField(block, 'title');
            const desc = extractField(block, 'description');
            const bookIdsRaw = extractField(block, 'bookIds', false); // Get raw string like "['97', '98']"
            const coverUrl = extractField(block, 'coverUrl') || '/assets/social-share-2.jpg';

            const absoluteUrl = BASE_URL + '/collections/' + slug + '/';
            const absoluteCoverUrl = coverUrl.startsWith('http') ? coverUrl : BASE_URL + coverUrl;

            // Simple parse of book IDs from the string
            const bookIds = bookIdsRaw ? bookIdsRaw.replace(/[\[\]'"]/g, '').split(',').map(id => id.trim()) : [];
            
            // Build the list of books for injection
            let bookListHtml = '<ul>';
            for (const id of bookIds) {
                // Find book in booksContent (very basic search)
                const bookBlockRegex = new RegExp(`id:\\s*['"]${id}['"]([\\s\\S]*?)\\}`, 'm');
                const bMatch = booksContent.match(bookBlockRegex);
                if (bMatch) {
                    const bTitle = extractField(bMatch[1], 'title');
                    const bSlug = extractField(bMatch[1], 'slug');
                    if (bTitle && bSlug) {
                        bookListHtml += `<li><a href="/book/${bSlug}">${escapeHtml(bTitle)}</a></li>`;
                    }
                }
            }
            bookListHtml += '</ul>';

            const bodyContent = `
                <div id="no-js-content" style="max-width: 800px; margin: 0 auto; padding: 20px; font-family: sans-serif;">
                    <h1>${escapeHtml(title)}</h1>
                    <p>${escapeHtml(desc)}</p>
                    <hr />
                    <h2>Books in this Collection</h2>
                    ${bookListHtml}
                </div>
            `;

            let html = template;
            html = html.replace(/<title>.*?<\/title>/, `<title>${escapeHtml(title)} | The Long Book Club Collections</title>`);
            html = html.replace(/<meta name="description" content="[^"]+" \/>/, `<meta name="description" content="${escapeHtml(desc)}" />`);
            // OG tags
            html = html.replace(/<meta property="og:title" content="[^"]+" \/>/, `<meta property="og:title" content="${escapeHtml(title)}" />`);
            html = html.replace(/<meta property="og:description" content="[^"]+" \/>/, `<meta property="og:description" content="${escapeHtml(desc)}" />`);
            html = html.replace(/<meta property="og:image" content="[^"]+" \/>/, `<meta property="og:image" content="${absoluteCoverUrl}" />`);
            html = html.replace(/<meta property="og:url" content="[^"]+" \/>/, `<meta property="og:url" content="${absoluteUrl}" />`);
            html = html.replace(/<link rel="canonical" href="[^"]+" \/>/, `<link rel="canonical" href="${absoluteUrl}" />`);

            html = html.replace('<!-- SEO_CONTENT_HOLDER -->', bodyContent);
            
            const outDir = path.join(DIST_DIR, 'collections', slug);
            if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
            fs.writeFileSync(path.join(outDir, 'index.html'), html);
            cdCount++;
        }
        console.log(`✅ Prerendered ${cdCount} "Thick" collection detail pages.`);
    }

    // --- Legacy Redirect Map Generation (.htaccess) ---
    console.log('🔗 Generating Legacy Redirect Map for .htaccess...');
    let redirectRules = '\n# --- ID to Slug Legacy Redirects (Generated) ---\n';
    const allBookBlocks = extractAllBlocks(booksContent);
    for (const block of allBookBlocks) {
        const id = extractField(block, 'id');
        const slug = extractField(block, 'slug');
        if (id && slug) {
            // Support both /book/ID and /book/ID/ (trailing slash)
            redirectRules += `Redirect 301 /book/${id} /book/${slug}/\n`;
            redirectRules += `Redirect 301 /book/${id}/ /book/${slug}/\n`;
        }
    }

    const dotHtmlTemplate = `
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  
  # Force trailing slash on directories for SEO consistency and Prerender discovery
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_URI} !(.*)/$
  RewriteCond %{REQUEST_URI} ^/(book|genre|collections|journal|links) [NC]
  RewriteRule ^(.*)$ $1/ [L,R=301]

  ${redirectRules}
  
  # --- Genre Redirects (Manual) ---
  Redirect 301 /genre/nonfiction /genre/non-fiction/
  Redirect 301 /genre/nonfiction/ /genre/non-fiction/
  Redirect 301 /genre/contemporary /genre/contemporary-fiction/
  Redirect 301 /genre/contemporary/ /genre/contemporary-fiction/

  # Standard SPA Fallback
  DirectoryIndex index.html
  Options -MultiViews
  
  RewriteRule ^index\\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
`;

    fs.writeFileSync(path.join(DIST_DIR, '.htaccess'), dotHtmlTemplate);
    fs.writeFileSync(path.join(__dirname, '../public/.htaccess'), dotHtmlTemplate);
    
    // Convenience copy for user upload (non-hidden)
    fs.writeFileSync(path.join(DIST_DIR, 'htaccess.txt'), dotHtmlTemplate);
    fs.writeFileSync(path.join(__dirname, '../public/htaccess.txt'), dotHtmlTemplate);
    
    console.log('✅ Generated .htaccess and htaccess.txt with legacy redirect map.');
}

prerender();
