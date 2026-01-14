const fs = require('fs');
const path = require('path');

const booksPath = path.join(__dirname, '../src/data/books.ts');
const content = fs.readFileSync(booksPath, 'utf8');

// Regex to capture title and genre
// Matches: title: 'Title', ... genre: 'Genre' OR genre: ['G1', 'G2']
const bookRegex = /title:\s*['"](.+?)['"][\s\S]+?genre:\s*(\[[^\]]+\]|'[^']+'|"[^"]+")/g;

let match;
const books = [];

while ((match = bookRegex.exec(content)) !== null) {
    const title = match[1];
    let genre = match[2];

    // Clean up quotes
    if (genre.startsWith('\'') || genre.startsWith('"')) {
        genre = genre.slice(1, -1);
    }

    books.push({ title, genre });
}

// Sort by title
books.sort((a, b) => a.title.localeCompare(b.title));

// Generate Markdown Table
console.log('| Book Title | Current Genre(s) |');
console.log('|------------|------------------|');
books.forEach(b => {
    console.log(`| ${b.title} | \`${b.genre}\` |`);
});
