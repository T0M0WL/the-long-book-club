const fs = require('fs');
const path = require('path');

const booksPath = path.join(__dirname, '../src/data/books.ts');
let content = fs.readFileSync(booksPath, 'utf8');

const updates = [
    { "title": "11/22/63", "primary": "Thriller", "secondary": "Historical Fiction" },
    { "title": "1Q84", "primary": "Fantasy", "secondary": "Literary Fiction" },
    { "title": "A Discovery of Witches", "primary": "Fantasy", "secondary": "Dark Academia" },
    { "title": "Anna Karenina", "primary": "Classic", "secondary": "Literary Fiction" },
    { "title": "Babel", "primary": "Fantasy", "secondary": "Dark Academia" },
    { "title": "Cryptonomicon", "primary": "Science Fiction", "secondary": "Historical Fiction" },
    { "title": "Doctor Zhivago", "primary": "Classic", "secondary": "Historical Fiction" },
    { "title": "Don Quixote", "primary": "Classic", "secondary": "Adventure" },
    { "title": "Dune", "primary": "Science Fiction", "secondary": "Adventure" },
    { "title": "Gone with the Wind", "primary": "Historical Fiction", "secondary": "Classic" },
    { "title": "It", "primary": "Horror", "secondary": "Fantasy" },
    { "title": "Jonathan Strange & Mr Norrell", "primary": "Fantasy", "secondary": "Historical Fiction" },
    { "title": "Les Misérables", "primary": "Classic", "secondary": "Historical Fiction" },
    { "title": "Moby Dick", "primary": "Classic", "secondary": "Adventure" },
    { "title": "Outlander", "primary": "Historical Fiction", "secondary": "Fantasy" },
    { "title": "Shantaram", "primary": "Fiction", "secondary": "Adventure" },
    { "title": "Shōgun", "primary": "Historical Fiction", "secondary": "Adventure" },
    { "title": "The Amazing Adventures of Kavalier & Clay", "primary": "Fiction", "secondary": "Historical Fiction" },
    { "title": "The Brothers Karamazov", "primary": "Classic", "secondary": "Literary Fiction" },
    { "title": "The Count of Monte Cristo", "primary": "Classic", "secondary": "Adventure" },
    { "title": "The Covenant of Water", "primary": "Historical Fiction", "secondary": "Literary Fiction" },
    { "title": "The Decline and Fall of the Roman Empire", "primary": "History", "secondary": "Nonfiction" },
    { "title": "The Historian", "primary": "Dark Academia", "secondary": "Historical Fiction" },
    { "title": "The Hunchback of Notre-Dame", "primary": "Classic", "secondary": "Historical Fiction" },
    { "title": "The Pillars of the Earth", "primary": "Historical Fiction", "secondary": "Adventure" },
    { "title": "The Rise and Fall of the Third Reich", "primary": "History", "secondary": "Nonfiction" },
    { "title": "The Secret History", "primary": "Dark Academia", "secondary": "Thriller" },
    { "title": "The Stand", "primary": "Horror", "secondary": "Fantasy" },
    { "title": "War and Peace", "primary": "Classic", "secondary": "Historical Fiction" }
];

let updateCount = 0;

updates.forEach(update => {
    // Regex matches: title: 'Title' ... genre: 'Genre'
    const cleanTitle = update.title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(title:\\s*['"]${cleanTitle}['"][\\s\\S]+?genre:\\s*)(['"][^'"]+['"])`, 'g');

    if (regex.test(content)) {
        content = content.replace(regex, `$1['${update.primary}', '${update.secondary}']`);
        updateCount++;
        console.log(`✅ Updated: ${update.title}`);
    } else {
        console.log(`❌ Failed to update: ${update.title}`);
    }
});

fs.writeFileSync(booksPath, content, 'utf8');
console.log(`\nSuccess! Updated ${updateCount} books.`);
