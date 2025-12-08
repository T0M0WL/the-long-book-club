export interface Book {
    id: string;
    title: string;
    author: string;
    coverUrl: string;
    length: string; // e.g., "48h 12m"
    lengthHours: number; // for sorting/filtering
    genre: string;
    description: string;
    affiliateLink: string;
}

export const books: Book[] = [
    {
        id: '1',
        title: 'Shogun',
        author: 'James Clavell',
        coverUrl: 'https://covers.openlibrary.org/b/isbn/0440178002-L.jpg',
        length: '53h 10m',
        lengthHours: 53.1,
        genre: 'Historical Fiction',
        description: 'A quote from the book: "Karma is the beginning of knowledge. Next is patience. Patience is very important. The strong are the patient ones, Anjin-san. Patience means restraining one\'s inclinations."',
        affiliateLink: 'https://www.audible.com/pd/Shogun-Audiobook/B0036N4U68'
    },
    {
        id: '11',
        title: 'It',
        author: 'Stephen King',
        coverUrl: 'https://covers.openlibrary.org/b/isbn/9780451169518-L.jpg',
        length: '44h 57m',
        lengthHours: 44.9,
        genre: 'Horror',
        description: 'The story follows the experiences of seven children as they are terrorized by an evil entity that exploits the fears of its victims to disguise itself while hunting its prey.',
        affiliateLink: 'https://www.audible.com/pd/It-Audiobook/B019WPM4ZM'
    },
    {
        id: '12',
        title: 'Under the Dome',
        author: 'Stephen King',
        coverUrl: 'https://covers.openlibrary.org/b/isbn/9781442365490-L.jpg',
        length: '34h 24m',
        lengthHours: 34.4,
        genre: 'Science Fiction',
        description: 'On an entirely normal, beautiful fall day in Chester\'s Mill, Maine, the town is inexplicably and suddenly sealed off from the rest of the world by an invisible force field.',
        affiliateLink: 'https://www.audible.com/pd/Under-the-Dome-Audiobook/B002V8HA30'
    },
    {
        id: '13',
        title: 'The Way of Kings',
        author: 'Brandon Sanderson',
        coverUrl: 'https://covers.openlibrary.org/b/isbn/9780765326355-L.jpg',
        length: '45h 37m',
        lengthHours: 45.6,
        genre: 'Fantasy',
        description: 'Roshar is a world of stone and storms. Uncanny tempests of incredible power sweep across the rocky terrain so frequently that they have shaped ecology and civilization alike.',
        affiliateLink: 'https://www.audible.com/pd/The-Way-of-Kings-Audiobook/B003ZWFO7E'
    },
    {
        id: '14',
        title: 'Lonesome Dove',
        author: 'Larry McMurtry',
        coverUrl: 'https://covers.openlibrary.org/b/isbn/9781476735399-L.jpg',
        length: '36h 47m',
        lengthHours: 36.8,
        genre: 'Western',
        description: 'A love story, an adventure, and an epic of the frontier, Lonesome Dove is the grandest novel ever written about the last defiant wilderness of America.',
        affiliateLink: 'https://www.audible.com/pd/Lonesome-Dove-Audiobook/B002V0Q86Q'
    },
    {
        id: '15',
        title: 'Les Misérables',
        author: 'Victor Hugo',
        coverUrl: 'https://covers.openlibrary.org/b/isbn/9780451419439-L.jpg',
        length: '60h',
        lengthHours: 60,
        genre: 'Classic',
        description: 'Introducing one of the most famous characters in literature, Jean Valjean—the noble peasant imprisoned for stealing a loaf of bread.',
        affiliateLink: 'https://www.audible.com/pd/Les-Miserables-Audiobook/B002V8K70S'
    },
    {
        id: '2',
        title: 'The Power Broker',
        author: 'Robert A. Caro',
        coverUrl: 'https://covers.openlibrary.org/b/isbn/0394720245-L.jpg',
        length: '66h 6m',
        lengthHours: 66.1,
        genre: 'Biography',
        description: 'The story of Robert Moses and the fall of New York. A masterpiece of modern reporting.',
        affiliateLink: 'https://www.audible.com/pd/The-Power-Broker-Audiobook/B0108J8P0E'
    },
    {
        id: '3',
        title: 'The Stand',
        author: 'Stephen King',
        coverUrl: 'https://covers.openlibrary.org/b/isbn/9780451169532-L.jpg',
        length: '47h 47m',
        lengthHours: 47.8,
        genre: 'Horror',
        description: 'A patient escapes from a biological testing facility, unknowingly carrying a deadly weapon: a mutated strain of super-flu that will wipe out 99 percent of the world\'s population within a few weeks.',
        affiliateLink: 'https://www.audible.com/pd/The-Stand-Audiobook/B007R8W832'
    },
    {
        id: '4',
        title: 'Hamilton',
        author: 'Ron Chernow',
        coverUrl: 'https://covers.openlibrary.org/b/isbn/9781594200090-L.jpg',
        length: '36h',
        lengthHours: 36,
        genre: 'Biography',
        description: 'The biography that inspired the hit musical. A sweeping look at the life of Alexander Hamilton.',
        affiliateLink: 'https://www.audible.com/pd/Alexander-Hamilton-Audiobook/B003V1B8A0'
    },
    {
        id: '5',
        title: 'Infinite Jest',
        author: 'David Foster Wallace',
        coverUrl: 'https://covers.openlibrary.org/b/isbn/9780316066525-L.jpg',
        length: '56h 11m',
        lengthHours: 56.2,
        genre: 'Fiction',
        description: 'A gargantuan, mind-altering comedy about the Pursuit of Happiness in America.',
        affiliateLink: 'https://www.audible.com/pd/Infinite-Jest-Audiobook/B007204U5Y'
    },
    {
        id: '6',
        title: 'The Count of Monte Cristo',
        author: 'Alexandre Dumas',
        coverUrl: 'https://covers.openlibrary.org/b/isbn/9780140449266-L.jpg',
        length: '52h 41m',
        lengthHours: 52.7,
        genre: 'Classic',
        description: 'Thrown in prison for a crime he has not committed, Edmond Dantes is confined to the grim fortress of If. There he learns of a great hoard of treasure hidden on the Isle of Monte Cristo.',
        affiliateLink: 'https://www.audible.com/pd/The-Count-of-Monte-Cristo-Audiobook/B003V1L8B6'
    },
    {
        id: '7',
        title: '11/22/63',
        author: 'Stephen King',
        coverUrl: 'https://covers.openlibrary.org/b/isbn/9781451627282-L.jpg',
        length: '30h 40m',
        lengthHours: 30.6,
        genre: 'Thiller',
        description: 'Life can turn on a dime—or miss it, but what if you could change it all?',
        affiliateLink: 'https://www.audible.com/pd/11-22-63-Audiobook/B005VR3VBI'
    },
    {
        id: '8',
        title: 'Atlas Shrugged',
        author: 'Ayn Rand',
        coverUrl: 'https://covers.openlibrary.org/b/isbn/9780451191144-L.jpg',
        length: '63h',
        lengthHours: 63,
        genre: 'Fiction',
        description: 'Who is John Galt? When he says that he will stop the motor of the world, is he a destroyer or a liberator?',
        affiliateLink: 'https://www.audible.com/pd/Atlas-Shrugged-Audiobook/B002VAW61Y'
    },
    {
        id: '9',
        title: 'A Game of Thrones',
        author: 'George R.R. Martin',
        coverUrl: 'https://covers.openlibrary.org/b/isbn/9780553103540-L.jpg',
        length: '33h 46m',
        lengthHours: 33.7,
        genre: 'Fantasy',
        description: 'Summers span decades. Winter can last a lifetime. And the struggle for the Iron Throne has begun.',
        affiliateLink: 'https://www.audible.com/pd/A-Game-of-Thrones-Audiobook/B002UZZ93G'
    },
    {
        id: '10',
        title: 'Sherlock Holmes: The Definitive Collection',
        author: 'Arthur Conan Doyle',
        coverUrl: 'https://covers.openlibrary.org/b/isbn/9780553212419-L.jpg',
        length: '71h 57m',
        lengthHours: 71.9,
        genre: 'Mystery',
        description: 'Stephen Fry presents a complete and unabridged collection of the stories of Sherlock Holmes.',
        affiliateLink: 'https://www.audible.com/pd/Sherlock-Holmes-The-Definitive-Collection-Audiobook/B06WLMWF2S'
    }
];

export const genres = Array.from(new Set(books.map(b => b.genre))).sort();
