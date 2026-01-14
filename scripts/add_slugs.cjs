
const fs = require('fs');
const path = require('path');

const booksPath = path.join(__dirname, '../src/data/books.ts');
let booksContent = fs.readFileSync(booksPath, 'utf8');

// Helper to slugify text
function slugify(text) {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')        // Replace spaces with -
        .replace(/[^\w\-]+/g, '')    // Remove all non-word chars
        .replace(/\-\-+/g, '-')      // Replace multiple - with single -
        .replace(/^-+/, '')          // Trim - from start
        .replace(/-+$/, '');         // Trim - from end
}

// 1. Add slug to Interface if not present
if (!booksContent.includes('slug?: string;')) {
    booksContent = booksContent.replace(
        /relatedBookIds\?: string\[\];\n\}/,
        "relatedBookIds?: string[];\n    slug?: string;\n}"
    );
    console.log('Added slug to Book interface.');
}

// 2. Iterate and add slug to each book
// Strategy: We will iterate over the whole string, finding blocks that contain title and author.
// Since we want to insert 'slug' near the top, let's look for `title: '...'`.
// We can find `title: 'Ti'`, `author: 'Au'`.
// Then we find the `id` belonging to that block? 
// No, simpler: 
// The books are in an array `baseBooks`.
// We can just regex replace `title: 'The Title',` with `slug: 'the-slug', \n title: 'The Title',`?
// That puts the slug right before the title. That is valid and clean.

const titleAuthorRegex = /title:\s*'([^']+)',\s*\n\s*author:\s*'([^']+)'/gm;

// We need to be careful not to double add if we run this multiple times.
// We can check if `slug:` is already preceding the title.

updatedContent = booksContent.replace(titleAuthorRegex, (match, title, author) => {
    // Check if slug is surely not there? 
    // The match is just the title and author lines.
    // If the line BEFORE the match contains 'slug:', we skip?
    // But `replace` doesn't give us context easily.

    // However, if we blindly replace, we might duplicate if we run twice.
    // But we are running this as a one-off task.

    const slug = slugify(`${title}-${author}`);
    return `slug: '${slug}',\n        title: '${title}',\n        author: '${author}'`;
});

fs.writeFileSync(booksPath, updatedContent);
console.log('Updated books.ts with slugs (inserted before title).');
