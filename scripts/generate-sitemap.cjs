
const fs = require('fs');
const path = require('path');

// Configuration
const BASE_URL = 'https://thelongbookclub.com';
const BOOKS_FILE_PATH = path.join(__dirname, '../src/data/books.ts');
const JOURNAL_FILE_PATH = path.join(__dirname, '../src/data/journal.ts');
const OUTPUT_FILE_PATH = path.join(__dirname, '../public/sitemap.xml');

const staticRoutes = [
    { url: '/', changefreq: 'weekly', priority: 1.0 },
    { url: '/collections/', changefreq: 'weekly', priority: 0.9 },
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
        const slugify = (text) => text.toString().toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w-]+/g, '').replace(/--+/g, '-');

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
