
const fs = require('fs');
const path = require('path');

const booksPath = path.join(__dirname, '../src/data/books.ts');
const booksContent = fs.readFileSync(booksPath, 'utf8');

// 1. Extract existing books to get ID mapping
// Simple regex to find objects. This assumes the format in books.ts is consistent.
const bookRegex = /\{\s*id:\s*'([^']+)',\s*title:\s*'([^']+)'/g;
const titleToId = {};
let match;

while ((match = bookRegex.exec(booksContent)) !== null) {
    const id = match[1];
    const title = match[2];
    titleToId[title] = id;
}

console.log('Loaded ' + Object.keys(titleToId).length + ' books.');

// 2. Define Groups (pasted from user)
const groups = [
    // Series
    ["The Way of Kings", "Words of Radiance", "Oathbringer", "Rhythm of War"],
    ["A Game of Thrones", "A Clash of Kings", "A Storm of Swords", "A Feast for Crows", "A Dance with Dragons"],
    ["The Eye of the World", "The Great Hunt", "The Dragon Reborn", "The Shadow Rising"],
    ["The Fellowship of the Ring", "The Two Towers", "The Return of the King"],
    ["The Final Empire", "The Well of Ascension", "The Hero of Ages"],
    ["Dune", "Dune Messiah", "Children of Dune"],
    ["Hyperion", "The Fall of Hyperion"],
    ["Pandora's Star", "Judas Unchained"],

    // Author (Selected)
    ["It", "The Stand", "Under the Dome", "11/22/63"],
    ["The Way of Kings", "Words of Radiance", "Oathbringer", "Rhythm of War", "The Final Empire", "The Well of Ascension", "The Hero of Ages"],
    ["Hamilton", "Grant", "Titan"],
    ["Steve Jobs", "Leonardo da Vinci", "Benjamin Franklin: An American Life"],
    ["Cryptonomicon", "Seveneves", "Anathem"],
    ["David Copperfield", "Bleak House", "Great Expectations"],
    ["War and Peace", "Anna Karenina"],
    ["Crime and Punishment", "The Brothers Karamazov"],
    ["Les Misérables", "The Hunchback of Notre-Dame"],
    ["The Eye of the World", "The Great Hunt", "The Dragon Reborn", "The Shadow Rising"],
    ["East of Eden", "The Grapes of Wrath"],
    ["Peter the Great", "Catherine the Great"],

    // Themes / Genre
    ["The Power Broker", "Hamilton", "Grant", "Titan", "Steve Jobs", "Leonardo da Vinci", "Benjamin Franklin: An American Life", "Peter the Great", "Catherine the Great", "Team of Rivals", "The Rise and Fall of the Third Reich"],
    ["The Fellowship of the Ring", "The Two Towers", "The Return of the King", "A Game of Thrones", "A Clash of Kings", "A Storm of Swords", "A Feast for Crows", "A Dance with Dragons", "The Way of Kings", "Words of Radiance", "Oathbringer", "Rhythm of War", "The Eye of the World", "The Great Hunt", "The Dragon Reborn", "The Shadow Rising", "The Final Empire", "The Well of Ascension", "The Hero of Ages", "The Name of the Wind", "The Priory of the Orange Tree", "Babel", "Jonathan Strange & Mr Norrell", "American Gods"],
    ["Dune", "Dune Messiah", "Children of Dune", "Hyperion", "The Fall of Hyperion", "Pandora's Star", "Judas Unchained", "Seveneves", "Anathem", "Cryptonomicon", "Leviathan Wakes", "Stranger in a Strange Land", "Atlas Shrugged"],
    ["Les Misérables", "The Hunchback of Notre-Dame", "The Count of Monte Cristo", "David Copperfield", "Bleak House", "Great Expectations", "Jane Eyre", "Wuthering Heights", "Middlemarch", "Vanity Fair", "Moby Dick", "Don Quixote", "Sherlock Holmes: The Definitive Collection"],
    ["War and Peace", "Anna Karenina", "Crime and Punishment", "The Brothers Karamazov", "Doctor Zhivago"],
    ["Infinite Jest", "The Goldfinch", "A Little Life", "The Amazing Adventures of Kavalier & Clay", "2666", "1Q84", "Shantaram", "Demon Copperhead", "Ulysses", "The Magic Mountain"],
    ["The Pillars of the Earth", "Gone with the Wind", "Outlander"],
    ["It", "The Stand", "Under the Dome", "11/22/63"]
];

const relatedMap = {};

groups.forEach(group => {
    // Resolve IDs
    const ids = group.map(title => titleToId[title]).filter(id => id); // filter undefined (if typo)

    ids.forEach(id => {
        if (!relatedMap[id]) relatedMap[id] = new Set();
        ids.forEach(relatedId => {
            if (id !== relatedId) {
                relatedMap[id].add(relatedId);
            }
        });
    });
});

// 3. Rewrite Content
// First, add the interface field
let newContent = booksContent.replace(
    /    affiliateLinkUS\?: string;\n\}/,
    "    affiliateLinkUS?: string;\n    relatedBookIds?: string[];\n}"
);

// Second, iterate and insert properties
// We need to match each object in the array and inject the field before the closing brace
// Regex replacement is tricky for nested objects. 
// Better approach: We know the structure is:
// {
//    id: '...',
//    ...
//    affiliateLink...
// }
// We can find `id: 'X'` and then look for the next `},` or `}` and insert before it? 
// No, that's brittle.
// Robust way: Find each block starting with `{` inside `baseBooks`.
// Actually, since we are using JS, let's just use string replacement on IDs.
// Find `id: 'ID',` ... find next `affiliateLink...` line ... append after it.

Object.keys(relatedMap).forEach(id => {
    const relatedIds = Array.from(relatedMap[id]);
    const relatedString = `        relatedBookIds: [${relatedIds.map(rid => `'${rid}'`).join(', ')}],`;

    // Find the book block
    // We look for `id: 'ID',`
    const idRegex = new RegExp(`id: '${id}',`);
    const match = newContent.match(idRegex);
    if (match) {
        // We want to insert this field at the end of the object, usually after affiliateLink or affiliateLinkUS
        // Let's look for the affiliateLink line for this specific book context
        // This is getting parsing-heavy.

        // Alternative: Replace `id: '${id}',` with `id: '${id}',\n${relatedString}`
        // This puts it at the TOP of the object. TS doesn't care about order. JSON doesn't either.
        // This is easiest!
        newContent = newContent.replace(idRegex, `id: '${id}',\n${relatedString}`);
    }
});

fs.writeFileSync(booksPath, newContent);
console.log('Updated books.ts with relatedBookIds');
