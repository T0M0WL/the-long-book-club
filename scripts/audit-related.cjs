
const fs = require('fs');
const path = require('path');

const booksPath = path.join(__dirname, '../src/data/books.ts');
const booksContent = fs.readFileSync(booksPath, 'utf8');

// 1. Extract existing books to get ID set
const bookRegex = /\{\s*id:\s*'([^']+)',/g;
const validIds = new Set();
let match;

while ((match = bookRegex.exec(booksContent)) !== null) {
    validIds.add(match[1]);
}

console.log(`Loaded ${validIds.size} valid Book IDs.`);

// 2. Extract relatedBookIds and verify
// refined regex to capture the array content
// This assumes format: relatedBookIds: ['1', '2', ...],
const relatedRegex = /id:\s*'([^']+)',[\s\S]*?relatedBookIds:\s*\[([^\]]*)\]/g;
let issueCount = 0;

while ((match = relatedRegex.exec(booksContent)) !== null) {
    const bookId = match[1];
    const relatedRaw = match[2];

    // Parse the array content
    // content is like: '15', '75', '6'
    const cleanIds = relatedRaw
        .split(',')
        .map(s => s.trim().replace(/'/g, ''))
        .filter(s => s.length > 0);

    cleanIds.forEach(relatedId => {
        if (!validIds.has(relatedId)) {
            console.error(`[ERROR] Book ID '${bookId}' references missing ID: '${relatedId}'`);
            issueCount++;
        }
    });
}

if (issueCount === 0) {
    console.log('✅ All relatedBookIds are valid!');
    process.exit(0);
} else {
    console.error(`❌ Found ${issueCount} invalid references.`);
    process.exit(1);
}
