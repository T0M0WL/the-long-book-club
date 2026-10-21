const fs = require('fs');
const path = require('path');

const BOOKS_FILE = path.join(__dirname, '../src/data/books.ts');
const content = fs.readFileSync(BOOKS_FILE, 'utf8');

// 1. Exact canonical genre renames/merges
const GENRE_RENAMES = {
    'Alternative History': 'Alternate History',
    'NYC': 'New York',
    'Sword & Sorcery': 'Sword and Sorcery',
    'Civil War': 'American Civil War',
    'Feminist': 'Feminism',
    'Alien': 'Aliens',
    'Spy Fiction': 'Espionage',
    'Women Spies': 'Espionage',
    'WWII': 'World War II',
    'Apocalyptic': 'Post-Apocalyptic',
    'Gothic Romance': 'Gothic',
    'Philosophical': 'Philosophy',
    'Anthology': 'Short Stories',
    'Small Town Mystery': 'Mystery',
    'MMORPG': 'GameLit',
    'VRMMO': 'GameLit',
    'Political Satire': 'Satire',
};

// 2. Micro-tags and non-genres to remove completely
const TAGS_TO_REMOVE = new Set([
    'Academy',
    'Allegory',
    'Alternative World',
    'Anti-Colonialism',
    'Appalachia',
    'Atmospheric',
    'Audiobook of the Year',
    'Autobiographical',
    'Barcelona',
    'Berlin',
    'Biblical Retelling',
    'Booker Prize',
    'Buddy',
    'China',
    'Circus',
    'Class',
    'College',
    'Comics',
    'Conspiracy',
    'Cosmere',
    'Counterculture',
    'Cozy Mystery',
    'Crossover',
    'Cryptography',
    'Diplomacy',
    'Dublin',
    'Enlightenment',
    'Entertainment',
    'Evolutionary Sci-Fi',
    'Faerie',
    'Fallen Angels',
    'Fan Sequel',
    'Fanfiction Roots',
    'Flintlock Fantasy',
    'Founding Fathers',
    'Genetics',
    'Gilded Age',
    'Global',
    'Great Depression',
    'Health',
    'Hollywood',
    'Irish Lit',
    'Japan',
    'Jewish History',
    'Legal Satire',
    'Lincoln',
    'Linguistics',
    'Low Stakes',
    'Mathematics',
    'Medical Fiction',
    'Medieval History',
    'Memoir',
    'Metafiction',
    'Military History',
    'Mind Control',
    'Modernization',
    'Monasticism',
    'Monsters',
    'Murder',
    'Nature',
    'Nazis',
    'Nobel Prize',
    'Noir',
    'Objectivism',
    'Oxford',
    'Paris',
    'Prison',
    'Prophecy',
    'Psychic',
    'Psychology',
    'Quest',
    'Rebellion',
    'Renaissance',
    'Rome',
    'Russia',
    'Samurai',
    'Science',
    'Siege',
    'Small Town',
    'Social Satire',
    'Sociology',
    'Spain',
    'Sports',
    'Spycraft',
    'Stream of Consciousness',
    'Terrorism',
    'Time',
    'Urban Planning',
    'World Building',
    'Addiction',
    'Architecture',
    'Art History',
    'Business',
    'Drama',
    'Experimental',
    'France',
    'Friendship',
    'Future',
    'Germany',
    'Historical Adventure',
    'Historical Horror',
    'Historical Mystery',
    'Historical Saga',
    'Innovation',
    'Mental Health',
    'Music',
    'Obsession',
    'Realism',
    'Redemption',
    'Regency',
    'Revolution',
    'Royalty',
    'Russian History',
    'Science Fantasy',
    'Scotland',
    'Technology',
    'Theology',
    'Tragicomedy',
    'Good vs Evil',
]);

// 3. Mapping of Genre -> Books that should have this genre
const GENRE_ADDITIONS = {
    'Alternate History': [
        'Jonathan Strange & Mr Norrell',
        'Red Storm Rising',
        '11/22/63',
    ],
    'American Civil War': [
        'Grant',
        'Team of Rivals',
        'Gone with the Wind',
    ],
    'Ancient History': [
        'The Decline and Fall of the Roman Empire',
        'Circe',
        'The Song of Achilles',
        'Clytemnestra',
        'A Thousand Ships',
        'Ithaca',
        'Mythos',
        'The Books of Enoch: The Angels, The Watchers and The Nephilim',
    ],
    'Post-Apocalyptic': [
        'The Hero of Ages',
        'The Stand',
        'Swan Song',
        'The Passage',
        'Seveneves',
        'World War Z',
        'Impact Winter',
        'Defiance of the Fall: A LitRPG Adventure',
    ],
    'Books About Books': [
        'The Shadow of the Wind',
        'Can\'t Spell Treason Without Tea',
        'The Historian',
        'Babel',
        'The Goldfinch',
    ],
    'Court Intrigue': [
        'The Goblin Emperor',
        'A Game of Thrones',
        'A Clash of Kings',
        'A Storm of Swords',
        'Dune',
        'Shōgun',
        'Kushiel\'s Dart',
        'The Hands of the Emperor',
        'The Blade Itself',
    ],
    'Cultivation': [
        'Defiance of the Fall: A LitRPG Adventure',
        'He Who Fights with Monsters: A LitRPG Adventure',
        'The Primal Hunter: A LitRPG Adventure',
        'Iron Prince: Warformed: Stormweaver, Book 1',
    ],
    'Cyberpunk': [
        'Awaken Online: Catharsis',
        'Reamde',
        'Cryptonomicon',
        'Shadeslinger: The Ripple System, Book 1',
    ],
    'Dark Academia': [
        'The Secret History',
        'Babel',
        'The Shadow of the Wind',
        'The Historian',
        'The Name of the Wind',
    ],
    'Espionage': [
        'I Am Pilgrim',
        'Tinker Tailor Soldier Spy',
        'Slow Horses',
        'Berlin Game',
        'The Day of the Jackal',
        'Eye of the Needle',
        'Restless',
        'A Perfect Spy',
        'The Human Factor',
        'An Officer and a Spy',
        'Polostan',
    ],
    'Feminism': [
        'Jane Eyre',
        'The Priory of the Orange Tree',
        'Circe',
        'Clytemnestra',
        'A Thousand Ships',
    ],
    'Folklore': [
        'The Witch’s Heart',
        'Mythos',
        'Circe',
        'The Song of Achilles',
        'Kaikeyi',
        'American Gods',
    ],
    'Fairy Tale': [
        'Tress of the Emerald Sea',
        'The Night Circus',
        'The Complete Chronicles of Narnia: The Classic BBC Full-Cast Dramatisations',
        'Between',
    ],
    'Found Family': [
        'The House in the Cerulean Sea',
        'A Little Life',
        'The Hands of the Emperor',
        'Legends & Lattes',
        'Dungeon Crawler Carl',
        'The Fellowship of the Ring',
        'Galaxy Outlaws: The Complete Black Ocean Mobius Missions',
        'The Lies of Locke Lamora',
    ],
    'Isekai': [
        'He Who Fights with Monsters: A LitRPG Adventure',
        'Defiance of the Fall: A LitRPG Adventure',
        'Dungeon Crawler Carl',
        'The Wandering Inn: Book 1',
        'The Wandering Inn: Book 2',
        'Awaken Online: Catharsis',
    ],
    'Japanese Literature': [
        'The Wind-Up Bird Chronicle',
        '1Q84',
        'The City and Its Uncertain Walls',
    ],
    'Literary Sci-Fi': [
        'Hyperion',
        'The Fall of Hyperion',
        'Anathem',
        'Children of Time',
        'The Three-Body Problem',
        'House of Suns',
        'A Memory Called Empire',
    ],
    'New York': [
        'The Amazing Adventures of Kavalier & Clay',
        'The Power Broker',
        'A Little Life',
        'The Goldfinch',
        'American Gods',
        'Hamilton',
    ],
    'Picaresque': [
        'Don Quixote',
        'Shantaram',
        'The Mark Twain Complete Collection',
        'The Count of Monte Cristo',
    ],
    'Police Procedural': [
        'Faceless Killers',
        'The Bat',
        'The Hypnotist',
        'Mercy (The Keeper of Lost Causes)',
        'The Chestnut Man',
        'I\'m Travelling Alone',
        'The Girl with the Dragon Tattoo',
    ],
    'Postmodernism': [
        '2666',
        'Infinite Jest',
        'Ulysses',
        'The Wind-Up Bird Chronicle',
    ],
    'Retelling': [
        'Demon Copperhead',
        'Circe',
        'The Song of Achilles',
        'Clytemnestra',
        'A Thousand Ships',
        'The Witch’s Heart',
        'Ithaca',
    ],
    'Sapphic': [
        'The Priory of the Orange Tree',
        'Can\'t Spell Treason Without Tea',
        'This Kingdom Will Not Kill Me: Maggie the Undying',
    ],
    'Sci-Fi Mystery': [
        'Leviathan Wakes',
        'Children of Time',
        'The Three-Body Problem',
        'Project Hail Mary',
        'Pandora\'s Star',
        'Shards of Earth',
    ],
    'Southern Gothic': [
        'Gone with the Wind',
        'Demon Copperhead',
        'The Stand',
        'East of Eden',
    ],
    'Speculative Fiction': [
        'Anathem',
        '1Q84',
        'The Stand',
        'Seveneves',
        'Children of Time',
    ],
    'Surrealism': [
        'The Wind-Up Bird Chronicle',
        '1Q84',
        'The City and Its Uncertain Walls',
        'One Hundred Years of Solitude',
        '2666',
    ],
    'Sword & Sorcery': [
        'The Cycle of Arawn: The Complete Trilogy',
        'The Blade Itself',
        'The Black Company',
        'The Lies of Locke Lamora',
        'Priest of Bones',
    ],
    'Witches': [
        'A Discovery of Witches',
        'The Witch’s Heart',
        'Circe',
        'Between',
    ],
    'World War II': [
        'The Rise and Fall of the Third Reich',
        'Eye of the Needle',
        'Restless',
        'The Amazing Adventures of Kavalier & Clay',
        'Cryptonomicon',
        'Churchill: Walking with Destiny',
        'Carrion Comfort',
    ],
    'Aliens': [
        'Shards of Earth',
        'Children of Time',
        'The Dark Forest',
        'Battlefield Earth',
        'Project Hail Mary',
        'The Three-Body Problem',
        'Pandora\'s Star',
    ],
    'Hard Sci-Fi': [
        'House of Suns',
        'Project Hail Mary',
        'The Three-Body Problem',
        'The Dark Forest',
        'Death\'s End',
        'Seveneves',
        'Anathem',
        'Children of Time',
        'Pandora\'s Star',
        'Judas Unchained',
    ],
    'Military Sci-Fi': [
        'Iron Prince: Warformed: Stormweaver, Book 1',
        'Empire of Silence',
        'Red Rising',
        'Seveneves',
        'Red Storm Rising',
        'Galaxy Outlaws: The Complete Black Ocean Mobius Missions',
        'Battlefield Earth',
        'Ancillary Justice',
    ],
    'First Contact': [
        'The Three-Body Problem',
        'Project Hail Mary',
        'Children of Time',
        'Pandora\'s Star',
        'Anathem',
        'Stranger in a Strange Land',
        'Shards of Earth',
    ],
    'Space Survival': [
        'Project Hail Mary',
        'Seveneves',
        'Children of Time',
        'Hyperion',
        'The Dark Forest',
        'Death\'s End',
    ],
    'Cosmic Horror': [
        'The Dark Forest',
        'Shards of Earth',
        'The Terror',
        'Carrion Comfort',
        'It',
        'The Sandman',
    ],
    'Magic School': [
        'Harry Potter and the Philosopher’s Stone',
        'Iron Flame',
        'Fourth Wing',
        'Babel',
        'The Name of the Wind',
        'Iron Prince: Warformed: Stormweaver, Book 1',
    ],
    'Gothic': [
        'Dracula',
        'The Shadow of the Wind',
        'Jane Eyre',
        'Wuthering Heights',
        'The Historian',
        'The Hunchback of Notre-Dame',
    ],
    'Dark Romance': [
        'Dracula',
        'This Kingdom Will Not Kill Me: Maggie the Undying',
        'Wuthering Heights',
        'Kushiel\'s Dart',
        'Empire of the Vampire',
    ],
    'Low Fantasy': [
        'The Lies of Locke Lamora',
        'Priest of Bones',
        'The Blade Itself',
        'The Black Company',
        'The Goblin Emperor',
    ],
    'Sea Story': [
        'Moby Dick',
        'The Terror',
        'The Count of Monte Cristo',
        'Tress of the Emerald Sea',
        'Shōgun',
    ],
    'Survival': [
        'Impact Winter',
        'World War Z',
        'The Stand',
        'The Terror',
        'Project Hail Mary',
        'Swan Song',
        'The Passage',
    ],
    'Detective': [
        'Sherlock Holmes: The Definitive Collection',
        'The Bat',
        'Faceless Killers',
        'The Chestnut Man',
        'The Hypnotist',
        'Mercy (The Keeper of Lost Causes)',
        'I\'m Travelling Alone',
        'The Girl with the Dragon Tattoo',
    ],
    'Family Drama': [
        'The Jane Austen Collection',
        'Locke & Key',
        'East of Eden',
        'The Brothers Karamazov',
        'The House of the Spirits',
        'The Bee Sting',
        'A Little Life',
    ],
    'Latin American Literature': [
        'One Hundred Years of Solitude',
        'The House of the Spirits',
        '2666',
    ],
    'Modernist': [
        'Ulysses',
        'The Magic Mountain',
        'Infinite Jest',
        '2666',
    ],
    'Ecology': [
        'Dune',
        'Children of Dune',
        'Dune Messiah',
        'Seveneves',
        'Children of Time',
    ],
    'Philosophy': [
        'Dune',
        'The Human Factor',
        'Anathem',
        'The Brothers Karamazov',
        'Crime and Punishment',
        'Atlas Shrugged',
        'The Magic Mountain',
    ],
    'War': [
        'The Way of Kings',
        'World War Z',
        'War and Peace',
        'Red Storm Rising',
        'Les Misérables',
        'The Rise and Fall of the Third Reich',
        'Shōgun',
    ],
    'Vampires': [
        'Impact Winter',
        'Dracula',
        'Empire of the Vampire',
        'Empire of the Damned',
        'Empire of the Dawn',
        'Carrion Comfort',
        'The Historian',
        'The Passage',
    ],
    'Time Travel': [
        'Outlander',
        '11/22/63',
        'Hyperion',
        'The Redemption of Time',
    ],
    'Suspense': [
        'Mercy (The Keeper of Lost Causes)',
        'Eye of the Needle',
        'The Day of the Jackal',
        'I Am Pilgrim',
    ]
};

// Invert additions map: book title -> array of genres to add
const additionsByBook = {};
for (const [genreName, titles] of Object.entries(GENRE_ADDITIONS)) {
    for (const title of titles) {
        if (!additionsByBook[title]) additionsByBook[title] = [];
        additionsByBook[title].push(genreName);
    }
}

// Split content by book objects
const parts = content.split(/(?=\n    \{)/);
const header = parts[0];
const bookBlocks = parts.slice(1);

console.log(`Processing ${bookBlocks.length} book blocks...`);

let modifiedCount = 0;
const newBookBlocks = bookBlocks.map((block, idx) => {
    // Extract title
    const titleMatch = block.match(/title:\s*(['"`])((?:\\.|(?!\1).)*?)\1/);
    if (!titleMatch) {
        console.warn(`Block ${idx} has no title match!`);
        return block;
    }
    const title = titleMatch[2].replace(/\\(['"`])/g, '$1');

    // Extract current genre match
    const genreRegex = /genre:\s*(\[[^\]]+\]|'[^']+'|"[^"]+")/;
    const genreMatch = block.match(genreRegex);
    if (!genreMatch) {
        console.warn(`Book "${title}" has no genre field!`);
        return block;
    }

    let genres = [];
    const raw = genreMatch[1];
    if (raw.startsWith('[')) {
        genres = raw.replace(/[\[\]'"]/g, '').split(',').map(g => g.trim()).filter(Boolean);
    } else {
        genres = [raw.replace(/['"]/g, '').trim()];
    }

    // 1. Rename
    genres = genres.map(g => GENRE_RENAMES[g] || g);

    // 2. Remove micro-tags
    genres = genres.filter(g => !TAGS_TO_REMOVE.has(g));

    // 3. Add enriched genres
    if (additionsByBook[title]) {
        for (const addG of additionsByBook[title]) {
            if (!genres.includes(addG)) {
                genres.push(addG);
            }
        }
    }

    // Deduplicate
    genres = [...new Set(genres)];

    const formattedGenre = `genre: [${genres.map(g => `'${g}'`).join(', ')}]`;
    const newBlock = block.replace(genreRegex, formattedGenre);
    if (newBlock !== block) {
        modifiedCount++;
    }
    return newBlock;
});

const newContent = header + newBookBlocks.join('');
fs.writeFileSync(BOOKS_FILE, newContent, 'utf8');
console.log(`Successfully updated ${modifiedCount} of ${bookBlocks.length} books in src/data/books.ts!`);
