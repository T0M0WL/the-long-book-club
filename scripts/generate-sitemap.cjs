
const fs = require('fs');
const path = require('path');

// Configuration
const BASE_URL = 'https://thelongbookclub.com';
const BOOKS_FILE_PATH = path.join(__dirname, '../src/data/books.ts');
const REVIEWS_FILE_PATH = path.join(__dirname, '../src/data/reviews.ts');
const JOURNAL_FILE_PATH = path.join(__dirname, '../src/data/journal.ts');
const OUTPUT_FILE_PATH = path.join(__dirname, '../public/sitemap.xml');

const staticRoutes = [
    { url: '/', changefreq: 'weekly', priority: 1.0 },
    { url: '/collections/', changefreq: 'weekly', priority: 0.9 },
    { url: '/authors/', changefreq: 'weekly', priority: 0.9 },
    { url: '/narrators/', changefreq: 'weekly', priority: 0.9 },
    { url: '/narrators/leaderboard/', changefreq: 'weekly', priority: 0.9 },
    { url: '/narrator-styles/fireside-warmth/', changefreq: 'weekly', priority: 0.8 },
    { url: '/narrator-styles/historical-gravitas/', changefreq: 'weekly', priority: 0.8 },
    { url: '/narrator-styles/propulsive-momentum/', changefreq: 'weekly', priority: 0.8 },
    { url: '/narrator-styles/character-chameleon/', changefreq: 'weekly', priority: 0.8 },
    { url: '/narrator-styles/dual-pov-synergy/', changefreq: 'weekly', priority: 0.8 },
    { url: '/narrator-styles/satirical-bite/', changefreq: 'weekly', priority: 0.8 },
    { url: '/narrator-styles/dialect-immersion/', changefreq: 'weekly', priority: 0.8 },
    { url: '/journal/', changefreq: 'weekly', priority: 0.9 },
    { url: '/long-book-finder/', changefreq: 'weekly', priority: 0.9 },
    { url: '/links/', changefreq: 'monthly', priority: 0.6 },
    { url: '/about/', changefreq: 'monthly', priority: 0.7 },
    { url: '/privacy/', changefreq: 'yearly', priority: 0.5 }
];

function generateSitemap() {
    console.log('🗺️  Generating sitemap...');

    // 1. Read static routes
    let urls = [...staticRoutes];

    // 2. Read dynamic routes (Books)
    try {
        const booksContent = fs.readFileSync(BOOKS_FILE_PATH, 'utf8');

        // 1. Books
        // Regex to find all slug: 'X' patterns
        const slugRegex = /slug:\s*['"]([^'"]+)['"]/g;

        let match;
        let bookCount = 0;

        while ((match = slugRegex.exec(booksContent)) !== null) {
            urls.push({
                url: `/book/${match[1]}/`, // Use the captured slug with trailing slash
                changefreq: 'monthly',
                priority: 0.8
            });
            bookCount++;
        }
        console.log(`   Found ${bookCount} books.`);

        // 2. Genres
        const genreCounts = new Map();
        // Regex to match genre: 'Value' OR genre: ['Value', 'Value']
        const genreRegex = /genre:\s*(\[[^\]]+\]|'[^']+'|"[^"]+")/g;

        // Helper slugify (duplicated to avoid import issues in CJS)
        const slugify = (text) => text.toString().normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w-]+/g, '').replace(/--+/g, '-');

        let genreMatch;
        while ((genreMatch = genreRegex.exec(booksContent)) !== null) {
            let raw = genreMatch[1];
            // Remove quotes and brackets
            if (raw.startsWith('[')) {
                // Array: ['A', 'B'] -> parse it safely-ish
                const parts = raw.replace(/[\[\]'"]/g, '').split(',');
                parts.forEach(p => {
                    const g = p.trim();
                    if (g) genreCounts.set(g, (genreCounts.get(g) || 0) + 1);
                });
            } else {
                const g = raw.replace(/['"]/g, '').trim();
                if (g) genreCounts.set(g, (genreCounts.get(g) || 0) + 1);
            }
        }

        // Only include genres with at least 2 books in sitemap to prevent thin content indexing
        let includedGenreCount = 0;
        genreCounts.forEach((count, genre) => {
            if (count >= 2) {
                urls.push({
                    url: `/genre/${slugify(genre)}/`,
                    changefreq: 'weekly',
                    priority: 0.8
                });
                includedGenreCount++;
            }
        });
        console.log(`   Found ${genreCounts.size} unique genres (${includedGenreCount} with >= 2 books included in sitemap).`);

        // 3. Authors (with >= 2 books)
        const authorCounts = new Map();
        const authorRegex = /author:\s*['"]([^'"]+)['"]/g;
        let authorMatch;
        while ((authorMatch = authorRegex.exec(booksContent)) !== null) {
            const a = authorMatch[1].trim();
            if (a) authorCounts.set(a, (authorCounts.get(a) || 0) + 1);
        }

        let includedAuthorCount = 0;
        authorCounts.forEach((count, author) => {
            if (count >= 2) {
                urls.push({
                    url: `/author/${slugify(author)}/`,
                    changefreq: 'weekly',
                    priority: 0.8
                });
                includedAuthorCount++;
            }
        });
        console.log(`   Found ${authorCounts.size} unique authors (${includedAuthorCount} with >= 2 books included in sitemap).`);

        // 4. Narrators (with >= 2 books, taking reviews.ts into account)
        const cleanNarrators = (raw) => {
            if (!raw) return [];
            let text = raw.replace(/\((UK|US|Unabridged|GraphicAudio|Anniversary[^\)]*)\)/gi, '');
            text = text.replace(/\s*\/\s*/g, ',');
            text = text.replace(/\s+and\s+/gi, ',');
            text = text.replace(/\s*&\s*/g, ',');
            text = text.replace(/Full Cast\s*\(/gi, '').replace(/\)/g, '');
            const parts = text.split(',');
            const results = [];
            for (const part of parts) {
                const p = part.trim().replace(/\bet al\.?\b/gi, '').replace(/^Full Cast$/i, '').replace(/^[,\s]+|[,\s]+$/g, '');
                if (p.length > 2 && !p.toLowerCase().includes('full cast') && !p.toLowerCase().includes('graphicaudio')) {
                    if (!results.includes(p)) results.push(p);
                }
            }
            if (results.length >= 4) return [];
            return results;
        };

        const reviewsMap = new Map();
        if (fs.existsSync(REVIEWS_FILE_PATH)) {
            const reviewsContent = fs.readFileSync(REVIEWS_FILE_PATH, 'utf8');
            const rBlocks = reviewsContent.split(/^\s*["']([^"']+)["']\s*:\s*\{/gm).slice(1);
            for (let i = 0; i < rBlocks.length; i += 2) {
                const title = rBlocks[i];
                const block = rBlocks[i + 1].split(/^\s*\}/gm)[0];
                const nMatch = block.match(/narrator:\s*['"]([^'"]+)['"]/);
                if (nMatch) {
                    reviewsMap.set(title, nMatch[1]);
                }
            }
        }

        const bBlocks = booksContent.split(/(?:\s*\{)/gm).slice(1);
        const narratorCounts = new Map();

        for (const b of bBlocks) {
            const cleanBlock = b.split(/^\s*\}/gm)[0];
            const tMatch = cleanBlock.match(/title:\s*['"]([^'"]+)['"]/);
            if (!tMatch) continue;
            const title = tMatch[1];
            const nMatch = cleanBlock.match(/narrator:\s*['"]([^'"]+)['"]/);
            const bookNarrator = nMatch ? nMatch[1] : null;
            const finalNarrator = reviewsMap.get(title) || bookNarrator;
            if (finalNarrator) {
                const names = cleanNarrators(finalNarrator);
                names.forEach(name => {
                    narratorCounts.set(name, (narratorCounts.get(name) || 0) + 1);
                });
            }
        }

        let includedNarratorCount = 0;
        narratorCounts.forEach((count, narrator) => {
            if (count >= 2) {
                urls.push({
                    url: `/narrator/${slugify(narrator)}/`,
                    changefreq: 'weekly',
                    priority: 0.8
                });
                includedNarratorCount++;
            }
        });
        console.log(`   Found ${narratorCounts.size} unique narrators (${includedNarratorCount} with >= 2 books included in sitemap).`);

    } catch (err) {
        console.error('   ❌ Error reading books file:', err);
        process.exit(1);
    }

    // 3. Read Journal Posts
    try {
        if (fs.existsSync(JOURNAL_FILE_PATH)) {
            const journalContent = fs.readFileSync(JOURNAL_FILE_PATH, 'utf8');
            const jSlugRegex = /slug:\s*['"]([^'"]+)['"]/g;

            let jMatch;
            let jCount = 0;

            while ((jMatch = jSlugRegex.exec(journalContent)) !== null) {
                urls.push({
                    url: `/journal/${jMatch[1]}/`,
                    changefreq: 'weekly', // Journals might update or be important
                    priority: 0.9 // High priority for shareable content
                });
                jCount++;
            }
            console.log(`   Found ${jCount} journal posts.`);
        }
    } catch (err) {
        console.error('   ❌ Error reading journal file:', err);
    }

    // 4. Read Collection Pages
    try {
        const COLLECTIONS_FILE_PATH = path.join(__dirname, '../src/data/collections.ts');
        if (fs.existsSync(COLLECTIONS_FILE_PATH)) {
            const collectionsContent = fs.readFileSync(COLLECTIONS_FILE_PATH, 'utf8');
            const cSlugRegex = /slug:\s*['"]([^'"]+)['"]/g;

            let cMatch;
            let cCount = 0;

            while ((cMatch = cSlugRegex.exec(collectionsContent)) !== null) {
                urls.push({
                    url: `/collections/${cMatch[1]}/`,
                    changefreq: 'weekly',
                    priority: 0.9
                });
                cCount++;
            }
            console.log(`   Found ${cCount} collection pages.`);
        }
    } catch (err) {
        console.error('   ❌ Error reading collections file:', err);
    }

    // 5. Build XML
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(route => `  <url>
    <loc>${BASE_URL}${route.url}</loc>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

    // 5. Write to file
    fs.writeFileSync(OUTPUT_FILE_PATH, xml);
    console.log(`✅ Sitemap generated at ${OUTPUT_FILE_PATH} with ${urls.length} URLs.`);
}

generateSitemap();
