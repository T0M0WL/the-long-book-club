
import fs from 'fs';

const booksContent = fs.readFileSync('src/data/books.ts', 'utf8');
const reviewsContent = fs.readFileSync('src/data/reviews.ts', 'utf8');

// 1. Parse reviews.ts to get a map of Title -> { hasNarrator, hasSoundCheck }
// We'll use a regex to find blocks: "Title": { ... }
// This is still slightly brittle but better if we look for keys.

const reviewMap = new Map();
// Regex to capture "Title": { ...content... } matches
// We'll do a simpler pass: split by `    },` or similar indentation in reviews.ts
const reviewBlocks = reviewsContent.split(/^\s*\},/gm);

reviewBlocks.forEach(block => {
    // Regex using backreference \1 to match the same opening quote
    // and allowing escaped quotes within: (?:\\\1|.)*?
    // Removed ^ anchor to allow for comments/headers before the key
    const titleMatch = block.match(/(['"])((?:\\\1|.)*?)\1:\s*\{/);
    if (titleMatch) {
        // Unescape the title (remove backslashes before the quote type)
        // e.g. 'Pandora\'s Star' -> "Pandora's Star"
        const rawTitle = titleMatch[2];
        const title = rawTitle.replace(new RegExp(`\\\\${titleMatch[1]}`, 'g'), titleMatch[1]);

        const hasNarrator = block.includes('narrator:');
        const hasSoundCheck = block.includes('soundCheck:');
        reviewMap.set(title, { hasNarrator, hasSoundCheck });
    }
});

// 2. Parse books.ts to find Base Narrators
const bookObjects = booksContent.split(/^\s*\},/gm);
const missingNarrator = [];
const missingSoundCheck = [];

bookObjects.forEach(block => {
    // Extract title
    const titleMatch = block.match(/title:\s*(['"])((?:\\\1|.)*?)\1/);
    if (titleMatch) {
        const rawTitle = titleMatch[2];
        const title = rawTitle.replace(new RegExp(`\\\\${titleMatch[1]}`, 'g'), titleMatch[1]);

        // Check base narrator
        const baseHasNarrator = block.includes('narrator:');

        // Check review data
        const reviewData = reviewMap.get(title);
        const reviewHasNarrator = reviewData ? reviewData.hasNarrator : false;
        const reviewHasSoundCheck = reviewData ? reviewData.hasSoundCheck : false;

        // Logic
        if (!baseHasNarrator && !reviewHasNarrator) {
            // Check for specific exclusion (e.g. newly added books might be weird formatted)
            // But generally valid.
            missingNarrator.push(title);
        }

        if (!reviewHasSoundCheck) {
            missingSoundCheck.push(title);
        }
    }
});

console.log("--- TRULY MISSING NARRATORS ---");
console.log(JSON.stringify(missingNarrator, null, 2));

console.log("\n--- TRULY MISSING SOUNDCHECKS ---");
console.log(JSON.stringify(missingSoundCheck, null, 2));
