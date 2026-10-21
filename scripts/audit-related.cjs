
const fs = require('fs');
const path = require('path');

const booksPath = path.join(__dirname, '../src/data/books.ts');
const booksContent = fs.readFileSync(booksPath, 'utf8');

// 1. Extract existing books to get ID set
const idRegex = /id:\s*['"]([^'"]+)['"]/g;
const validIds = new Set();
let match;

while ((match = idRegex.exec(booksContent)) !== null) {
    validIds.add(match[1]);
}

console.log(`Loaded ${validIds.size} valid Book IDs.`);

// 2. Extract relatedBookIds and verify per book block
const bookBlocks = booksContent.split(/(?=\n    \{)/).slice(1);
let issueCount = 0;

for (const block of bookBlocks) {
    const idMatch = block.match(/id:\s*['"]([^'"]+)['"]/);
    const relatedMatch = block.match(/relatedBookIds:\s*\[([^\]]*)\]/);
    if (!idMatch || !relatedMatch) continue;

    const bookId = idMatch[1];
    const relatedRaw = relatedMatch[1];

    const cleanIds = relatedRaw
        .split(',')
        .map(s => s.trim().replace(/['"]/g, ''))
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
