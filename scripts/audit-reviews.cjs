const fs = require('fs');
const path = require('path');

const booksPath = path.join(__dirname, '../src/data/books.ts');
const reviewsPath = path.join(__dirname, '../src/data/reviews.ts');

try {
    const booksContent = fs.readFileSync(booksPath, 'utf8');
    const reviewsContent = fs.readFileSync(reviewsPath, 'utf8');

    // Looking for title: 'Title Here' or title: "Title Here", handling escaped quotes
    // Matches: title: followed by quote, then content (allowing escaped chars), then matching quote
    const bookTitleRegex = /title:\s*(['"])((?:\\.|[^\\])*?)\1/g;
    const books = [];
    let match;
    while ((match = bookTitleRegex.exec(booksContent)) !== null) {
        // Unescape the captured string (e.g. \' -> ')
        const title = match[2].replace(/\\(['"])/g, '$1');
        books.push(title);
    }

    // Extract keys from reviews.ts
    // Looking for "Title Here": {
    const reviewKeyRegex = /^\s*["'](.+?)["']\s*:\s*\{/gm;
    const reviewKeys = new Set();
    while ((match = reviewKeyRegex.exec(reviewsContent)) !== null) {
        reviewKeys.add(match[1]);
    }

    console.log(`Found ${books.length} books.`);
    console.log(`Found ${reviewKeys.size} review entries.`);

    const missing = books.filter(title => !reviewKeys.has(title));

    if (missing.length > 0) {
        console.error('\n❌ The following books are missing entries in reviews.ts:');
        missing.forEach(title => console.error(` - ${title}`));
        process.exit(1);
    } else {
        console.log('\n✅ All books have review entries!');
    }

} catch (err) {
    console.error('Error reading files:', err);
    process.exit(1);
}
