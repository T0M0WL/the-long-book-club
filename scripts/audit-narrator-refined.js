
import fs from 'fs';

const booksContent = fs.readFileSync('src/data/books.ts', 'utf8');

// Split by object close to likely capture the whole object context
// Assuming standard formatting where objects end with "    },"
const objects = booksContent.split(/^\s*\},/gm);

const missingNarrator = [];

objects.forEach(obj => {
    // Check if it has a title (to exclude garbage/header/footer)
    if (obj.includes("title: '") || obj.includes('title: "')) {
        // extract title
        const titleMatch = obj.match(/title:\s*['"](.+?)['"]/);
        if (titleMatch) {
            const title = titleMatch[1];
            // Check for narrator
            if (!obj.includes('narrator:')) {
                missingNarrator.push(title);
            }
        }
    }
});

console.log("--- REAL MISSING NARRATORS ---");
console.log(JSON.stringify(missingNarrator, null, 2));
