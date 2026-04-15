
const fs = require('fs');
const path = require('path');

const DIST_DIR = path.join(__dirname, '../dist');
const BOOKS_FILE = path.join(__dirname, '../src/data/books.ts');
const REVIEWS_FILE = path.join(__dirname, '../src/data/reviews.ts');
const TEMPLATE_FILE = path.join(DIST_DIR, 'index.html');
const BASE_URL = 'https://thelongbookclub.com';

/**
 * Robustly extracts field values from a TypeScript-like object string.
 * This handles single quotes, double quotes, and backticks, including escaped quotes (e.g. O\'Hara).
 */
function extractField(content, fieldName) {
    // Regex matches field name followed by a quoted string with escape support
    // Group 1: opening quote, Group 2: content, Group 3: closing quote
    const regex = new RegExp(`${fieldName}:\\s*(['"\`])((?:\\\\.|(?!\\1)[\\s\\S])*?)\\1`, 'm');
    const match = content.match(regex);
    if (!match) return null;
    
    let val = match[2];
    // Unescape common characters (simplified)
    val = val.replace(/\\(['"`])/g, '$1')
             .replace(/\\n/g, '\n')
             .replace(/\\t/g, '\t');
             
    // Strip HTML for meta tags
    return val.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

async function prerender() {
    console.log('🚀 Starting Robust Prerender for SEO & Social Sharing...');

    if (!fs.existsSync(TEMPLATE_FILE)) {
        console.error('❌ dist/index.html not found. Run build first.');
        process.exit(1);
    }

    const template = fs.readFileSync(TEMPLATE_FILE, 'utf-8');
    const booksContent = fs.readFileSync(BOOKS_FILE, 'utf-8');
    const reviewsContent = fs.existsSync(REVIEWS_FILE) ? fs.readFileSync(REVIEWS_FILE, 'utf-8') : '';

    // 1. Parse Reviews into a Map (Title -> Review Object)
    const reviewsMap = new Map();
    if (reviewsContent) {
        // Split by major keys (usually "Title": {)
        // This is a simple split for a structure like "Title": { ... }
        const rBlocks = reviewsContent.split(/^\s*["']([^"']+)["']\s*:\s*\{/gm).slice(1);
        for (let i = 0; i < rBlocks.length; i += 2) {
            const title = rBlocks[i];
            const block = rBlocks[i + 1].split(/^\s*\}/gm)[0]; // get inside content
            reviewsMap.set(title, {
                curatorNote: extractField(block, 'curatorNote'),
                curatorTitle: extractField(block, 'curatorTitle')
            });
        }
    }

    // 2. Parse Books and Prerender
    const startIndex = booksContent.indexOf('const baseBooks: Book[] = [');
    if (startIndex === -1) {
        console.error('❌ Could not find baseBooks array in books.ts');
        process.exit(1);
    }

    const arrayContent = booksContent.substring(startIndex);
    const bookBlocks = arrayContent.split(/^\s*\{/gm).slice(1);

    let count = 0;
    for (const block of bookBlocks) {
        const cleanBlock = block.split(/^\s*\}/gm)[0];
        
        const slug = extractField(cleanBlock, 'slug');
        if (!slug) continue;

        const title = extractField(cleanBlock, 'title') || 'The Long Book Club';
        const bookDesc = extractField(cleanBlock, 'description');
        const coverUrl = extractField(cleanBlock, 'coverUrl') || '/assets/social-share.jpg';

        // 3. Merging Logic: Prioritize the 200-word review (curatorNote) for the meta description
        const review = reviewsMap.get(title);
        let finalDescription = 'Curated long audiobooks for deep listening.';
        
        if (review && review.curatorNote && review.curatorNote.length > 5) {
            finalDescription = review.curatorNote;
        } else if (bookDesc) {
            finalDescription = bookDesc;
        }

        // Limit description length for meta tags (approx 250 chars)
        if (finalDescription.length > 250) {
            finalDescription = finalDescription.substring(0, 247) + '...';
        }

        const absoluteCoverUrl = coverUrl.startsWith('http') ? coverUrl : BASE_URL + coverUrl;
        const absoluteUrl = BASE_URL + '/book/' + slug + '/';

        // Create Directory
        const outDir = path.join(DIST_DIR, 'book', slug);
        if (!fs.existsSync(outDir)) {
            fs.mkdirSync(outDir, { recursive: true });
        }

        // 4. Inject Meta Tags
        let html = template;
        const safeDesc = finalDescription.replace(/"/g, '&quot;');
        const safeTitle = title.replace(/"/g, '&quot;');

        html = html.replace(/<title>.*?<\/title>/, `<title>${safeTitle} | The Long Book Club</title>`);
        html = html.replace(/<meta property="og:title" content="[^"]+" \/>/, `<meta property="og:title" content="${safeTitle}" />`);
        html = html.replace(/<meta name="twitter:title" content="[^"]+" \/>/, `<meta name="twitter:title" content="${safeTitle}" />`);

        html = html.replace(/<meta name="description" content="[^"]+" \/>/, `<meta name="description" content="${safeDesc}" />`);
        html = html.replace(/<meta property="og:description" content="[^"]+" \/>/, `<meta property="og:description" content="${safeDesc}" />`);
        html = html.replace(/<meta name="twitter:description" content="[^"]+" \/>/, `<meta name="twitter:description" content="${safeDesc}" />`);

        html = html.replace(/<meta property="og:image" content="[^"]+" \/>/, `<meta property="og:image" content="${absoluteCoverUrl}" />`);
        html = html.replace(/<meta name="twitter:image" content="[^"]+" \/>/, `<meta name="twitter:image" content="${absoluteCoverUrl}" />`);
        html = html.replace(/<meta property="og:url" content="[^"]+" \/>/, `<meta property="og:url" content="${absoluteUrl}" />`);
        html = html.replace(/<link rel="canonical" href="[^"]+" \/>/, `<link rel="canonical" href="${absoluteUrl}" />`);

        fs.writeFileSync(path.join(outDir, 'index.html'), html);
        count++;
    }

    console.log(`✅ Prerendered ${count} book pages with robust metadata.`);

    // --- Prerender Journal Pages (Similar robust logic) ---
    const JOURNAL_FILE = path.join(__dirname, '../src/data/journal.ts');
    if (fs.existsSync(JOURNAL_FILE)) {
        const journalContent = fs.readFileSync(JOURNAL_FILE, 'utf-8');
        const jStartMarker = 'const journalPosts: JournalPost[] = [';
        const jStartIndex = journalContent.indexOf(jStartMarker);

        if (jStartIndex !== -1) {
            const jBlocks = journalContent.substring(jStartIndex).split(/^\s*\{/gm).slice(1);
            let jCount = 0;

            for (const block of jBlocks) {
                const cleanBlock = block.split(/^\s*\}/gm)[0];
                const slug = extractField(cleanBlock, 'slug');
                if (!slug) continue;

                const title = extractField(cleanBlock, 'title') || 'Journal | The Long Book Club';
                const description = extractField(cleanBlock, 'excerpt') || 'Deep dives into long audiobooks.';
                const coverUrl = extractField(cleanBlock, 'coverUrl') || '/assets/social-share.jpg';

                const absoluteCoverUrl = coverUrl.startsWith('http') ? coverUrl : BASE_URL + coverUrl;
                const absoluteUrl = BASE_URL + '/journal/' + slug + '/';

                const outDir = path.join(DIST_DIR, 'journal', slug);
                if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

                let html = template;
                const safeDesc = description.replace(/"/g, '&quot;');
                const safeTitle = title.replace(/"/g, '&quot;');

                html = html.replace(/<title>.*?<\/title>/, `<title>${safeTitle} | The Long Book Club</title>`);
                html = html.replace(/<meta property="og:title" content="[^"]+" \/>/, `<meta property="og:title" content="${safeTitle}" />`);
                html = html.replace(/<meta name="twitter:title" content="[^"]+" \/>/, `<meta name="twitter:title" content="${safeTitle}" />`);
                html = html.replace(/<meta name="description" content="[^"]+" \/>/, `<meta name="description" content="${safeDesc}" />`);
                html = html.replace(/<meta property="og:description" content="[^"]+" \/>/, `<meta property="og:description" content="${safeDesc}" />`);
                html = html.replace(/<meta name="twitter:description" content="[^"]+" \/>/, `<meta name="twitter:description" content="${safeDesc}" />`);
                html = html.replace(/<meta property="og:image" content="[^"]+" \/>/, `<meta property="og:image" content="${absoluteCoverUrl}" />`);
                html = html.replace(/<meta name="twitter:image" content="[^"]+" \/>/, `<meta name="twitter:image" content="${absoluteCoverUrl}" />`);
                html = html.replace(/<meta property="og:url" content="[^"]+" \/>/, `<meta property="og:url" content="${absoluteUrl}" />`);
                html = html.replace(/<link rel="canonical" href="[^"]+" \/>/, `<link rel="canonical" href="${absoluteUrl}" />`);

                fs.writeFileSync(path.join(outDir, 'index.html'), html);
                jCount++;
            }
            
            // Journal Index
            const journalIndexDir = path.join(DIST_DIR, 'journal');
            if (!fs.existsSync(journalIndexDir)) fs.mkdirSync(journalIndexDir, { recursive: true });
            let jIndexHtml = template;
            jIndexHtml = jIndexHtml.replace(/<title>.*?<\/title>/, `<title>The Journal | The Long Book Club</title>`);
            jIndexHtml = jIndexHtml.replace(/<meta property="og:title" content="[^"]+" \/>/, `<meta property="og:title" content="The Journal | The Long Book Club" />`);
            jIndexHtml = jIndexHtml.replace(/<meta name="description" content="[^"]+" \/>/, `<meta name="description" content="Deep dives, curated lists, and thoughts on the world of long audiobooks." />`);
            jIndexHtml = jIndexHtml.replace(/<meta property="og:description" content="[^"]+" \/>/, `<meta property="og:description" content="Deep dives, curated lists, and thoughts on the world of long audiobooks." />`);
            jIndexHtml = jIndexHtml.replace(/<meta property="og:url" content="[^"]+" \/>/, `<meta property="og:url" content="${BASE_URL}/journal/" />`);
            jIndexHtml = jIndexHtml.replace(/<link rel="canonical" href="[^"]+" \/>/, `<link rel="canonical" href="${BASE_URL}/journal/" />`);
            fs.writeFileSync(path.join(journalIndexDir, 'index.html'), jIndexHtml);

            console.log(`✅ Prerendered ${jCount} journal pages.`);
        }
    }

    // --- Prerender Collections Pages ---
    const COLLECTIONS_FILE = path.join(__dirname, '../src/data/collections.ts');
    if (fs.existsSync(COLLECTIONS_FILE)) {
        const collectionsContent = fs.readFileSync(COLLECTIONS_FILE, 'utf-8');
        
        const cStartMarker = 'export const collections: Collection[] = [';
        const cStartIndex = collectionsContent.indexOf(cStartMarker);

        if (cStartIndex !== -1) {
            const cBlocks = collectionsContent.substring(cStartIndex).split(/^\s*\{/gm).slice(1);
            let cCount = 0;

            for (const block of cBlocks) {
                const cleanBlock = block.split(/^\s*\}/gm)[0];
                const slug = extractField(cleanBlock, 'slug');
                if (!slug) continue;

                const title = extractField(cleanBlock, 'title') || 'Collections | The Long Book Club';
                const description = extractField(cleanBlock, 'description') || 'Curated collections of the best long audiobooks.';
                const coverUrl = extractField(cleanBlock, 'coverUrl') || '/assets/social-share.jpg';

                const absoluteCoverUrl = coverUrl.startsWith('http') ? coverUrl : BASE_URL + coverUrl;
                const absoluteUrl = BASE_URL + '/collections/' + slug + '/';

                const outDir = path.join(DIST_DIR, 'collections', slug);
                if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

                let html = template;
                const safeDesc = description.replace(/"/g, '&quot;');
                const safeTitle = title.replace(/"/g, '&quot;');

                html = html.replace(/<title>.*?<\/title>/, `<title>${safeTitle} | The Long Book Club</title>`);
                html = html.replace(/<meta property="og:title" content="[^"]+" \/>/, `<meta property="og:title" content="${safeTitle}" />`);
                html = html.replace(/<meta name="twitter:title" content="[^"]+" \/>/, `<meta name="twitter:title" content="${safeTitle}" />`);
                html = html.replace(/<meta name="description" content="[^"]+" \/>/, `<meta name="description" content="${safeDesc}" />`);
                html = html.replace(/<meta property="og:description" content="[^"]+" \/>/, `<meta property="og:description" content="${safeDesc}" />`);
                html = html.replace(/<meta name="twitter:description" content="[^"]+" \/>/, `<meta name="twitter:description" content="${safeDesc}" />`);
                html = html.replace(/<meta property="og:image" content="[^"]+" \/>/, `<meta property="og:image" content="${absoluteCoverUrl}" />`);
                html = html.replace(/<meta name="twitter:image" content="[^"]+" \/>/, `<meta name="twitter:image" content="${absoluteCoverUrl}" />`);
                html = html.replace(/<meta property="og:url" content="[^"]+" \/>/, `<meta property="og:url" content="${absoluteUrl}" />`);
                html = html.replace(/<link rel="canonical" href="[^"]+" \/>/, `<link rel="canonical" href="${absoluteUrl}" />`);

                fs.writeFileSync(path.join(outDir, 'index.html'), html);
                cCount++;
            }
            
            // Collections Index
            const collectionsIndexDir = path.join(DIST_DIR, 'collections');
            if (!fs.existsSync(collectionsIndexDir)) fs.mkdirSync(collectionsIndexDir, { recursive: true });
            let cIndexHtml = template;
            cIndexHtml = cIndexHtml.replace(/<title>.*?<\/title>/, `<title>Curated Long Audiobook Collections | The Long Book Club</title>`);
            cIndexHtml = cIndexHtml.replace(/<meta property="og:title" content="[^"]+" \/>/, `<meta property="og:title" content="Curated Long Audiobook Collections | The Long Book Club" />`);
            cIndexHtml = cIndexHtml.replace(/<meta name="description" content="[^"]+" \/>/, `<meta name="description" content="Explore our hand-picked collections of the best long audiobooks, featuring epic sci-fi, immense romantasy, deep-dive biographies, and massive bucket-list classics." />`);
            cIndexHtml = cIndexHtml.replace(/<meta property="og:description" content="[^"]+" \/>/, `<meta property="og:description" content="Explore our hand-picked collections of the best long audiobooks, featuring epic sci-fi, immense romantasy, deep-dive biographies, and massive bucket-list classics." />`);
            cIndexHtml = cIndexHtml.replace(/<meta property="og:url" content="[^"]+" \/>/, `<meta property="og:url" content="${BASE_URL}/collections/" />`);
            cIndexHtml = cIndexHtml.replace(/<link rel="canonical" href="[^"]+" \/>/, `<link rel="canonical" href="${BASE_URL}/collections/" />`);
            fs.writeFileSync(path.join(collectionsIndexDir, 'index.html'), cIndexHtml);

            console.log(`✅ Prerendered Collections Index and ${cCount} individual collection pages.`);
        }
    }

    // --- Prerender Long Book Finder ---
    const finderDir = path.join(DIST_DIR, 'long-book-finder');
    if (!fs.existsSync(finderDir)) fs.mkdirSync(finderDir, { recursive: true });
    
    let fHtml = template;
    const fTitle = 'Long Audiobook Finder Tool | Filter 20+ Hour Epic Scif-Fi & Fantasy | The Long Book Club';
    const fDesc = 'Filter, sort, and search our entire catalog of long audiobooks. Find your next massive 20+ hour epic listen by genre, length, author, or narrator to maximize your Audible credits.';
    const fUrl = BASE_URL + '/long-book-finder/';
    
    fHtml = fHtml.replace(/<title>.*?<\/title>/, `<title>${fTitle}</title>`);
    fHtml = fHtml.replace(/<meta property="og:title" content="[^"]+" \/>/, `<meta property="og:title" content="${fTitle}" />`);
    fHtml = fHtml.replace(/<meta name="twitter:title" content="[^"]+" \/>/, `<meta name="twitter:title" content="${fTitle}" />`);
    fHtml = fHtml.replace(/<meta name="description" content="[^"]+" \/>/, `<meta name="description" content="${fDesc}" />`);
    fHtml = fHtml.replace(/<meta property="og:description" content="[^"]+" \/>/, `<meta property="og:description" content="${fDesc}" />`);
    fHtml = fHtml.replace(/<meta name="twitter:description" content="[^"]+" \/>/, `<meta name="twitter:description" content="${fDesc}" />`);
    fHtml = fHtml.replace(/<meta property="og:url" content="[^"]+" \/>/, `<meta property="og:url" content="${fUrl}" />`);
    fHtml = fHtml.replace(/<link rel="canonical" href="[^"]+" \/>/, `<link rel="canonical" href="${fUrl}" />`);

    fs.writeFileSync(path.join(finderDir, 'index.html'), fHtml);
    console.log(`✅ Prerendered Long Book Finder to dist/long-book-finder/index.html`);

    // --- Prerender Static Pages ---
    const staticPages = [
        { slug: 'about', title: 'About | The Long Book Club', desc: 'About The Long Book Club and our mission to find the most epic audiobooks.' },
        { slug: 'privacy', title: 'Privacy Policy | The Long Book Club', desc: 'Privacy policy for The Long Book Club.' },
        { slug: 'thank-you', title: 'Thank You | The Long Book Club', desc: 'Thank you for connecting with us.' }
    ];
    for (const page of staticPages) {
        const pageDir = path.join(DIST_DIR, page.slug);
        if (!fs.existsSync(pageDir)) fs.mkdirSync(pageDir, { recursive: true });
        let pHtml = template;
        const pUrl = BASE_URL + '/' + page.slug + '/';
        pHtml = pHtml.replace(/<title>.*?<\/title>/, `<title>${page.title}</title>`);
        pHtml = pHtml.replace(/<meta property="og:title" content="[^"]+" \/>/, `<meta property="og:title" content="${page.title}" />`);
        pHtml = pHtml.replace(/<meta name="twitter:title" content="[^"]+" \/>/, `<meta name="twitter:title" content="${page.title}" />`);
        pHtml = pHtml.replace(/<meta name="description" content="[^"]+" \/>/, `<meta name="description" content="${page.desc}" />`);
        pHtml = pHtml.replace(/<meta property="og:description" content="[^"]+" \/>/, `<meta property="og:description" content="${page.desc}" />`);
        pHtml = pHtml.replace(/<meta name="twitter:description" content="[^"]+" \/>/, `<meta name="twitter:description" content="${page.desc}" />`);
        pHtml = pHtml.replace(/<meta property="og:url" content="[^"]+" \/>/, `<meta property="og:url" content="${pUrl}" />`);
        pHtml = pHtml.replace(/<link rel="canonical" href="[^"]+" \/>/, `<link rel="canonical" href="${pUrl}" />`);
        fs.writeFileSync(path.join(pageDir, 'index.html'), pHtml);
    }
    console.log(`✅ Prerendered ${staticPages.length} static pages.`);

    // --- Prerender Genre Pages ---
    const uniqueGenres = new Set();
    const genreRegex = /genre:\s*(\[[^\]]+\]|'[^']+'|"[^"]+")/g;
    const slugify = (text) => text.toString().toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w-]+/g, '').replace(/--+/g, '-');
    
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
    
    let gCount = 0;
    uniqueGenres.forEach(genre => {
        const slug = slugify(genre);
        const gDir = path.join(DIST_DIR, 'genre', slug);
        if (!fs.existsSync(gDir)) fs.mkdirSync(gDir, { recursive: true });
        
        let gHtml = template;
        const gTitle = `${genre} Audiobooks Over 20 Hours | The Long Book Club`;
        const gDesc = `Explore epic and massive ${genre} audiobooks longer than 20 hours. Complete with reviews, total listening times, and curated lists.`;
        const gUrl = BASE_URL + '/genre/' + slug + '/';
        
        gHtml = gHtml.replace(/<title>.*?<\/title>/, `<title>${gTitle}</title>`);
        gHtml = gHtml.replace(/<meta property="og:title" content="[^"]+" \/>/, `<meta property="og:title" content="${gTitle}" />`);
        gHtml = gHtml.replace(/<meta name="twitter:title" content="[^"]+" \/>/, `<meta name="twitter:title" content="${gTitle}" />`);
        gHtml = gHtml.replace(/<meta name="description" content="[^"]+" \/>/, `<meta name="description" content="${gDesc}" />`);
        gHtml = gHtml.replace(/<meta property="og:description" content="[^"]+" \/>/, `<meta property="og:description" content="${gDesc}" />`);
        gHtml = gHtml.replace(/<meta name="twitter:description" content="[^"]+" \/>/, `<meta name="twitter:description" content="${gDesc}" />`);
        gHtml = gHtml.replace(/<meta property="og:url" content="[^"]+" \/>/, `<meta property="og:url" content="${gUrl}" />`);
        gHtml = gHtml.replace(/<link rel="canonical" href="[^"]+" \/>/, `<link rel="canonical" href="${gUrl}" />`);
        
        fs.writeFileSync(path.join(gDir, 'index.html'), gHtml);
        gCount++;
    });
    console.log(`✅ Prerendered ${gCount} Genre pages.`);
}

prerender();
