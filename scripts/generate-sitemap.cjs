
const fs = require('fs');
const path = require('path');

// Configuration
const BASE_URL = 'https://thelongbookclub.com';
const BOOKS_FILE_PATH = path.join(__dirname, '../src/data/books.ts');
const OUTPUT_FILE_PATH = path.join(__dirname, '../public/sitemap.xml');

// Static Routes
const staticRoutes = [
    { url: '/', changefreq: 'weekly', priority: 1.0 },
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
        // Regex to find all id: 'X' patterns
        // Matches: id: '123' or id: "123"
        const idRegex = /id:\s*['"](\d+)['"]/g;

        let match;
        let bookCount = 0;

        while ((match = idRegex.exec(booksContent)) !== null) {
            urls.push({
                url: `/book/${match[1]}`,
                changefreq: 'monthly',
                priority: 0.8
            });
            bookCount++;
        }

        console.log(`   Found ${bookCount} books.`);

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
