
import fs from 'fs';
import path from 'path';

// Read files as text
const booksContent = fs.readFileSync('src/data/books.ts', 'utf8');
const reviewsContent = fs.readFileSync('src/data/reviews.ts', 'utf8');

// Regex to extract ALL titles from books.ts
// Matches: title: 'The Name of the Wind',
const titleRegex = /title:\s*['"](.+?)['"]/g;
const bookTitles = [];
let match;
while ((match = titleRegex.exec(booksContent)) !== null) {
    bookTitles.push(match[1]);
}

// Regex to find books with narrator in books.ts
// We need to parse objects. Since strict parsing is hard with regex, let's identify blocks.
// Alternative: Just check which titles don't have a nearby "narrator" field?
// Actually, let's just find all titles, then check if they have a "narrator" field in the same object block.
// This is tricky with regex. 
// Simpler: Split by "    {" (start of object) and check each block.

const bookBlocks = booksContent.split(/^\s*\{/gm).slice(1); // Split by object start
const missingNarrator = [];

bookBlocks.forEach(block => {
    const titleMatch = block.match(/title:\s*['"](.+?)['"]/);
    if (titleMatch) {
        const title = titleMatch[1];
        if (!block.includes('narrator:')) {
            missingNarrator.push(title);
        }
    }
});

// Parse reviews.ts
// It's a big object: "Title": { ... }
const reviewBlocks = reviewsContent.split(/^\s*['"](.+?)['"]:\s*\{/gm);
// This split is messy.
// Let's just Regex for "Title": { ... soundCheck: ... } ?
// Better: Check which of the `bookTitles` are NOT associated with a `soundCheck` in reviewsContent.

const missingSoundCheck = [];

bookTitles.forEach(title => {
    // Look for the title as a key in reviews.ts
    // Regex: "Title":\s*{[^}]*soundCheck:
    // We need to escape the title for regex
    const safeTitle = title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    // Check if title exists as a key
    const titleKeyRegex = new RegExp(`['"]${safeTitle}['"]\\s*:\\s*\\{`, 'm');
    const hasEntry = titleKeyRegex.test(reviewsContent);

    if (!hasEntry) {
        missingSoundCheck.push(title + " (No review entry)");
        return;
    }

    // If entry exists, check if it has soundCheck
    // This is hard to ensure we are searching INSIDE that specific block without a parser.
    // However, we know `reviews.ts` structure is fairly flat.
    // Let's assume unique titles.

    // Find the block starting with "Title": {
    const blockStart = reviewsContent.indexOf(`"${title}": {`) !== -1 ? reviewsContent.indexOf(`"${title}": {`)
        : reviewsContent.indexOf(`'${title}': {`);

    if (blockStart === -1) {
        // Should have been caught by regex above, but double check
        missingSoundCheck.push(title + " (No review entry)");
        return;
    }

    // Find the end of this block "},"
    // This is brittle but reviews.ts is consistent.
    const blockEnd = reviewsContent.indexOf('},', blockStart);
    const blockContent = reviewsContent.substring(blockStart, blockEnd);

    if (!blockContent.includes('soundCheck:')) {
        missingSoundCheck.push(title);
    }
});

console.log("--- BOOKS MISSING NARRATOR (in books.ts) ---");
console.log(JSON.stringify(missingNarrator, null, 2));

console.log("\n--- BOOKS MISSING SOUNDCHECK ---");
console.log(JSON.stringify(missingSoundCheck, null, 2));
