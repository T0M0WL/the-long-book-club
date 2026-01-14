
const fs = require('fs');
const path = require('path');

// Configuration
const BASE_URL = 'https://thelongbookclub.com';
const BOOKS_FILE_PATH = path.join(__dirname, '../src/data/books.ts');
const OUTPUT_FILE_PATH = path.join(__dirname, '../public/sitemap.xml');

// Static Routes
const staticRoutes = [
    { url: '/', changefreq: 'weekly', priority: 1.0 },
    { url: '/collections', changefreq: 'weekly', priority: 0.9 },
    { url: '/about', changefreq: 'monthly', priority: 0.7 },
    { url: '/generator', changefreq: 'monthly', priority: 0.7 },
    { url: '/privacy', changefreq: 'yearly', priority: 0.5 },
    { url: '/thank-you', changefreq: 'yearly', priority: 0.3 }
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
                url: `/book/${match[1]}`, // Use the captured slug
                changefreq: 'monthly',
                priority: 0.8
            });
            bookCount++;
        }
        console.log(`   Found ${bookCount} books.`);

        // 2. Genres
        const uniqueGenres = new Set();
        // Regex to match genre: 'Value' OR genre: ['Value', 'Value']
        // This is a simple approximation.
        // It captures the content after genre: until the end of the line or comma
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
                parts.forEach(p => uniqueGenres.add(p.trim()));
            } else {
                // String: 'A'
                uniqueGenres.add(raw.replace(/['"]/g, '').trim());
            }
        }

        uniqueGenres.forEach(genre => {
            urls.push({
                url: `/genre/${slugify(genre)}`,
                changefreq: 'weekly',
                priority: 0.8
            });
        });
        console.log(`   Found ${uniqueGenres.size} unique genres.`);

    } catch (err) {
        console.error('   ❌ Error reading books file:', err);
        process.exit(1);
    }

    // 3. Build XML
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(route => `  <url>
    <loc>${BASE_URL}${route.url}</loc>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

    // 4. Write to file
    fs.writeFileSync(OUTPUT_FILE_PATH, xml);
    console.log(`✅ Sitemap generated at ${OUTPUT_FILE_PATH} with ${urls.length} URLs.`);
}

generateSitemap();
