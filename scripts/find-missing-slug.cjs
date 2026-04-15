const fs = require('fs');
const path = require('path');

const booksPath = path.join(__dirname, '../src/data/books.ts');
const content = fs.readFileSync(booksPath, 'utf-8');

// Primitive parsing by splitting by `id:` which is likely always present
const entries = content.split('id:');

console.log('Total potential entries found (by split):', entries.length);

entries.forEach((chunk, index) => {
    // Skip the first chunk (imports/interface)
    if (index === 0) return;

    // Check for title
    const titleMatch = chunk.match(/title:\s*['"](.*?)['"]/);
    if (titleMatch) {
        const title = titleMatch[1];
        // Check for slug
        const slugMatch = chunk.match(/slug:\s*['"](.*?)['"]/);

        if (!slugMatch) {
            console.log(`❌ Book missing slug: "${title}" (Chunk index ${index})`);
        }
    }
});
