export interface Collection {
    id: string;
    slug: string;
    title: string;
    description: string;
    coverUrl: string; // Placeholder for now or re-use a book cover
    bookIds: string[];
    topGraphic?: string; // New field for custom card header
}

export const collections: Collection[] = [
    {
        id: '1',
        slug: 'best-long-books-2025',
        title: 'The Best Long Books from 2025',
        description: 'A curated selection of the most immersive and standout long-form audiobooks released or celebrated in 2025.',
        coverUrl: '/covers/the-bee-sting-paul-murray.jpg', // Using the first book as a placeholder cover
        bookIds: ['97', '98', '99', '121', '100', '101', '102', '103', '106', '107', '105'],
        topGraphic: '/assets/Collections-Cards-Gfx/cc2-bestof25-top-gfx.gif'
    },
    {
        id: 'dark-academia',
        title: 'Long, Dark Academia Listens',
        slug: 'dark-academia',
        coverUrl: '/covers/the-secret-history.jpg',
        description: 'Atmospheric campuses, obsessively intellectual characters, and dark secrets lurking in libraries. These are the moodiest long listens for a rainy day.',
        bookIds: ['108', '56', '109', '38', '110'], // Secret History, Babel, Historian, Jonathan Strange, Discovery of Witches
        topGraphic: '/assets/Collections-Cards-Gfx/cc2-dark-academia-top-gfx.gif'
    },
    {
        id: 'romantasy',
        title: 'Epic Romantasy Long Listens',
        slug: 'romantasy',
        coverUrl: '/covers/iron-flame.jpg',
        description: 'Where high fantasy meets high stakes romance. Dragons, fae, and ancient curses, all with a generous dose of enemies-to-lovers tension.',
        bookIds: ['55', '113', '127', '111', '128', '112', '129', '130', '114', '147', '148'], // Priory, Kushiel, Empyrean (3), Crescent City (3), Moon Hatched, Quicksilver/Brimstone
        topGraphic: '/assets/Collections-Cards-Gfx/cc2-romantasy-top-gfx.gif'
    },
    {
        id: 'longest-ever',
        title: 'The Longest Ever Audiobooks (60+ Hours)',
        slug: 'longest-ever',
        coverUrl: '/covers/galaxy-outlaws.jpg',
        description: 'For those who want maximum value for their credit. These behemoths are all over 60 hours long—some spanning over 100 hours! Best served with a long commute.',
        bookIds: ['149', '146', '145', '115', '116', '10', '117', '118'], // Mark Twain (280h), Dostoyevsky (266h), Dickens (199h), plus Galaxy, mess hall etc
        topGraphic: '/assets/Collections-Cards-Gfx/cc2-best-longbooks-top-gfx.gif' // Updated
    },
    {
        id: 'long-life-stories',
        title: 'Long Life Stories',
        slug: 'long-life-stories',
        coverUrl: '/covers/the-power-broker.jpg',
        description: 'Here’s a selection of the best Life Story long-listens available. Dive deep into the lives of the most influential figures of all time. These massive biographies offer hours of immersive learning and listening.',
        bookIds: ['2', '4', '16', '18', '33', '34', '106', '119'], // Power Broker, Hamilton, Team of Rivals, Grant, Steve Jobs, Titan, Barbra, Churchill
        topGraphic: '/assets/Collections-Cards-Gfx/cc2-long-life-stories-gfx.gif'
    },
    {
        id: 'bucket-list',
        title: 'Bucket List Long Listens',
        slug: 'bucket-list',
        coverUrl: '/covers/the-count-of-monte-cristo.jpg', // Count of Monte Cristo
        description: 'A curated selection of the books everyone wants to have read, but few have finished. Guided by legendary narrators, these timeless epics become effortless listens rather than daunting tasks.',
        bookIds: ['6', '15', '22', '30', '32', '37', '31', '40', '87'], // Monte Cristo, Les Mis, War & Peace, Anna Karenina, Bros Karamazov, Middlemarch, Don Quixote, Gone with the Wind, East of Eden
        topGraphic: '/assets/Collections-Cards-Gfx/cc2-bucket-list-gfx.gif'
    }
];
