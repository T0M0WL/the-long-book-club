
import fs from 'fs';
import readline from 'readline';

const fileStream = fs.createReadStream('src/data/books.ts');
const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
});

let currentTitle = null;
let hasNarrator = false;
let missingNarrators = [];

rl.on('line', (line) => {
    if (line.includes("title: '") || line.includes('title: "')) {
        const match = line.match(/title:\s*['"](.+?)['"]/);
        if (match) currentTitle = match[1];
        hasNarrator = false; // Reset for new book
    }

    if (line.includes('narrator:')) {
        hasNarrator = true;
    }

    if (line.includes('},')) {
        if (currentTitle && !hasNarrator) {
            missingNarrators.push(currentTitle);
        }
        // Don't nullify currentTitle immediately, wait for next title or ensure we don't duplicate
        // Actually, distinct blocks usually mean check at end of block.
    }
});

rl.on('close', () => {
    console.log("--- MISSING NARRATORS ---");
    missingNarrators.forEach(t => console.log(t));
});
