import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

// --- Configuration ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_FILE = path.join(__dirname, 'src', 'data', 'books.ts');
const OUTPUT_DIR = path.join(__dirname, 'public', 'covers');

// --- Helpers ---
function downloadImage(url, filepath) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(filepath);
        https.get(url, (response) => {
            if (response.statusCode !== 200) {
                return reject(new Error(`Failed to download: ${response.statusCode}`));
            }
            response.pipe(file);
            file.on('finish', () => {
                file.close(() => resolve());
            });
        }).on('error', (err) => {
            fs.unlink(filepath, () => { });
            reject(err);
        });
    });
}

function searchItunes(term) {
    return new Promise((resolve, reject) => {
        const url = `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&media=audiobook&limit=1`;
        https.get(url, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                try {
                    const json = JSON.parse(data);
                    if (json.resultCount > 0) {
                        resolve(json.results[0]);
                    } else {
                        resolve(null);
                    }
                } catch (e) {
                    reject(e);
                }
            });
        }).on('error', reject);
    });
}

// --- Main ---
async function main() {
    console.log('📖 Reading book data...');

    let content;
    try {
        content = fs.readFileSync(DATA_FILE, 'utf-8');
    } catch (e) {
        console.error(`❌ Could not read ${DATA_FILE}. Are you running this from the project root?`);
        process.exit(1);
    }

    // Naive Regex Parsing to extract books
    // Matches { ... title: 'X', author: 'Y', coverUrl: 'Z' ... }
    // Note: This relies on the specific formatting of books.ts
    const bookRegex = /{[^}]*?title:\s*'([^']*)'[^}]*?author:\s*'([^']*)'[^}]*?coverUrl:\s*'([^']*)'[^}]*?}/gs;

    let match;
    const books = [];
    while ((match = bookRegex.exec(content)) !== null) {
        books.push({
            title: match[1],
            author: match[2],
            coverUrl: match[3]
        });
    }

    console.log(`Found ${books.length} books in code.`);

    for (const book of books) {
        const filename = book.coverUrl.split('/').pop();
        const filepath = path.join(OUTPUT_DIR, filename);

        if (fs.existsSync(filepath)) {
            // console.log(`✅ Exists: ${book.title}`); // Verbose
            continue;
        }

        console.log(`🔍 Searching: ${book.title} by ${book.author}...`);

        try {
            const result = await searchItunes(`${book.title} ${book.author}`);

            if (result && result.artworkUrl100) {
                // Resize to high res
                const highResUrl = result.artworkUrl100.replace('100x100', '600x600');

                await downloadImage(highResUrl, filepath);
                console.log(`⬇️  Downloaded: ${filename}`);

                // Be nice to the API
                await new Promise(r => setTimeout(r, 500));
            } else {
                console.log(`⚠️  Not Found: ${book.title}`);
            }
        } catch (e) {
            console.error(`❌ Error fetching ${book.title}:`, e.message);
        }
    }

    console.log('\n✨ All Done! Refresh your app to see the covers.');
}

main();
