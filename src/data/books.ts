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
        id: '15',
        title: 'Les Misérables',
        author: 'Victor Hugo',
        coverUrl: '/covers/les-miserables.jpg',
        length: '60h',
        lengthHours: 60,
        genre: 'Classic',
        description: 'Introducing one of the most famous characters in literature, Jean Valjean—the noble peasant imprisoned for stealing a loaf of bread.',
        affiliateLink: 'https://www.amazon.co.uk/hz/audible/mlp/mfpdp/B00WKWJW5A?actionCode=AMN30DFT1Bk06604291990WX&tag=thelongbookclub-21'
    },
    {
        id: '11',
        title: 'It',
        author: 'Stephen King',
        coverUrl: '/covers/it.jpg',
        length: '44h 57m',
        lengthHours: 44.9,
        genre: 'Horror',
        description: 'The story follows the experiences of seven children as they are terrorized by an evil entity that exploits the fears of its victims to disguise itself while hunting its prey.',
        affiliateLink: 'https://www.amazon.co.uk/hz/audible/mlp/mfpdp/B01H0IF7MA?actionCode=AMN30DFT1Bk06604291990WX&tag=thelongbookclub-21'
    },
    {
        id: '12',
        title: 'Under the Dome',
        author: 'Stephen King',
        coverUrl: '/covers/under-the-dome.jpg',
        length: '34h 24m',
        lengthHours: 34.4,
        genre: 'Science Fiction',
        description: 'On an entirely normal, beautiful fall day in Chester\'s Mill, Maine, the town is inexplicably and suddenly sealed off from the rest of the world by an invisible force field.',
        affiliateLink: 'https://www.amazon.co.uk/hz/audible/mlp/mfpdp/B0030MK9LU?actionCode=AMN30DFT1Bk06604291990WX&tag=thelongbookclub-21'
    },
    {
        id: '13',
        title: 'The Way of Kings',
        author: 'Brandon Sanderson',
        coverUrl: '/covers/the-way-of-kings.jpg',
        length: '45h 37m',
        lengthHours: 45.6,
        genre: 'Fantasy',
        description: 'Roshar is a world of stone and storms. Uncanny tempests of incredible power sweep across the rocky terrain so frequently that they have shaped ecology and civilization alike.',
        affiliateLink: 'https://www.amazon.co.uk/hz/audible/mlp/mfpdp/B0052TNVN2?actionCode=AMN30DFT1Bk06604291990WX&tag=thelongbookclub-21'
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
        affiliateLink: 'https://www.amazon.co.uk/hz/audible/mlp/mfpdp/B0DKG7DCG5?actionCode=AMN30DFT1Bk06604291990WX&tag=thelongbookclub-21'
    },
    {
        id: '3',
        title: 'The Stand',
        author: 'Stephen King',
        coverUrl: '/covers/the-stand.jpg',
        length: '47h 47m',
        lengthHours: 47.8,
        genre: 'Horror',
        description: 'A patient escapes from a biological testing facility, unknowingly carrying a deadly weapon: a mutated strain of super-flu that will wipe out 99 percent of the world\'s population within a few weeks.',
        affiliateLink: 'https://www.amazon.co.uk/hz/audible/mlp/mfpdp/B008MZT1V4?actionCode=AMN30DFT1Bk06604291990WX&tag=thelongbookclub-21'
    },
    {
        id: '4',
        title: 'Hamilton',
        author: 'Ron Chernow',
        coverUrl: '/covers/hamilton.jpg',
        length: '36h',
        lengthHours: 36,
        genre: 'Biography',
        description: 'The biography that inspired the hit musical. A sweeping look at the life of Alexander Hamilton.',
        affiliateLink: 'https://www.amazon.co.uk/hz/audible/mlp/mfpdp/B077DS3W25?actionCode=AMN30DFT1Bk06604291990WX&tag=thelongbookclub-21'
    },
    {
        id: '5',
        title: 'Infinite Jest',
        author: 'David Foster Wallace',
        coverUrl: '/covers/infinite-jest.jpg',
        length: '56h 11m',
        lengthHours: 56.2,
        genre: 'Fiction',
        description: 'A gargantuan, mind-altering comedy about the Pursuit of Happiness in America.',
        affiliateLink: 'https://www.amazon.co.uk/hz/audible/mlp/mfpdp/B07L8KNKDG?actionCode=AMN30DFT1Bk06604291990WX&tag=thelongbookclub-21'
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
        affiliateLink: 'https://www.amazon.co.uk/hz/audible/mlp/mfpdp/B008QZBHPI?actionCode=AMN30DFT1Bk06604291990WX&tag=thelongbookclub-21'
    },
    {
        id: '7',
        title: '11/22/63',
        author: 'Stephen King',
        coverUrl: '/covers/11-22-63.jpg',
        length: '30h 40m',
        lengthHours: 30.6,
        genre: 'Thiller',
        description: 'Life can turn on a dime—or miss it, but what if you could change it all?',
        affiliateLink: 'https://www.amazon.co.uk/hz/audible/mlp/mfpdp/B0064P650E?actionCode=AMN30DFT1Bk06604291990WX&tag=thelongbookclub-21'
    },
    {
        id: '8',
        title: 'Atlas Shrugged',
        author: 'Ayn Rand',
        coverUrl: '/covers/atlas-shrugged.jpg',
        length: '63h',
        lengthHours: 63,
        genre: 'Fiction',
        description: 'Who is John Galt? When he says that he will stop the motor of the world, is he a destroyer or a liberator?',
        affiliateLink: 'https://www.amazon.co.uk/hz/audible/mlp/mfpdp/B009T9SYQK?actionCode=AMN30DFT1Bk06604291990WX&tag=thelongbookclub-21'
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
        affiliateLink: 'https://www.amazon.co.uk/hz/audible/mlp/mfpdp/B005CB5HTG?actionCode=AMN30DFT1Bk06604291990WX&tag=thelongbookclub-21'
    },
    {
        id: '10',
        title: 'Sherlock Holmes: The Definitive Collection',
        author: 'Arthur Conan Doyle',
        coverUrl: '/covers/sherlock-holmes.jpg',
        length: '71h 57m',
        lengthHours: 71.9,
        genre: 'Mystery',
        description: 'Stephen Fry presents a complete and unabridged collection of the stories of Sherlock Holmes.',
        affiliateLink: 'https://www.amazon.co.uk/hz/audible/mlp/mfpdp/B06X3XG5Y6?actionCode=AMN30DFT1Bk06604291990WX&tag=thelongbookclub-21'
    },
    {
        id: '16',
        title: 'Team of Rivals',
        author: 'Doris Kearns Goodwin',
        coverUrl: '/covers/team-of-rivals.jpg',
        length: '41h 32m',
        lengthHours: 41.5,
        genre: 'Biography',
        description: 'The monumental history of Abraham Lincoln and his cabinet. A masterpiece of political biography.',
        affiliateLink: 'https://www.amazon.co.uk/hz/audible/mlp/mfpdp/B093TBNFWK?actionCode=AMN30DFT1Bk06604291990WX&tag=thelongbookclub-21'
    },
    {
        id: '17',
        title: '1Q84',
        author: 'Haruki Murakami',
        coverUrl: '/covers/1q84.jpg',
        length: '46h 50m',
        lengthHours: 46.8,
        genre: 'Fantasy',
        description: 'A young woman named Aomame follows a taxi driver\'s enigmatic suggestion and begins to notice puzzling discrepancies in the world around her.',
        affiliateLink: 'https://www.amazon.co.uk/hz/audible/mlp/mfpdp/B0060MI0T0?actionCode=AMN30DFT1Bk06604291990WX&tag=thelongbookclub-21'
    },
    {
        id: '18',
        title: 'Grant',
        author: 'Ron Chernow',
        coverUrl: '/covers/grant.jpg',
        length: '48h',
        lengthHours: 48,
        genre: 'Biography',
        description: 'The definitive biography of Ulysses S. Grant, confirming his stature as one of history\'s greatest generals and presidents.',
        affiliateLink: 'https://www.amazon.co.uk/hz/audible/mlp/mfpdp/B07WV5K96L?actionCode=AMN30DFT1Bk06604291990WX&tag=thelongbookclub-21'
    },
    {
        id: '19',
        title: 'David Copperfield',
        author: 'Charles Dickens',
        coverUrl: '/covers/david-copperfield.jpg',
        length: '36h 30m',
        lengthHours: 36.5,
        genre: 'Classic',
        description: 'David Copperfield is the story of a young man\'s adventures on his journey from an unhappy and impoverished childhood to the discovery of his vocation as a successful novelist.',
        affiliateLink: 'https://www.amazon.co.uk/hz/audible/mlp/mfpdp/B0CQZ6P3K1?actionCode=AMN30DFT1Bk06604291990WX&tag=thelongbookclub-21'
    },
    {
        id: '20',
        title: 'Dune',
        author: 'Frank Herbert',
        coverUrl: '/covers/dune.jpg',
        length: '21h 2m',
        lengthHours: 21.0,
        genre: 'Science Fiction',
        description: 'Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, who would become the mysterious man known as Muad\'Dib. He would avenge the traitorous plot against his noble family.',
        affiliateLink: 'https://www.amazon.co.uk/hz/audible/mlp/mfpdp/B002SQ5UD6?actionCode=AMN30DFT1Bk06604291990WX&tag=thelongbookclub-21'
    },
    {
        id: '21',
        title: 'The Pillars of the Earth',
        author: 'Ken Follett',
        coverUrl: '/covers/the-pillars-of-earth.jpg',
        length: '40h 55m',
        lengthHours: 40.9,
        genre: 'Historical Fiction',
        description: 'A spellbinding epic tale of ambition, anarchy, and absolute power set against the sprawling medieval canvas of twelfth-century England.',
        affiliateLink: 'https://www.amazon.co.uk/hz/audible/mlp/mfpdp/B0047VIL0O?actionCode=AMN30DFT1Bk06604291990WX&tag=thelongbookclub-21'
    },
    {
        id: '22',
        title: 'War and Peace',
        author: 'Leo Tolstoy',
        coverUrl: '/covers/war-and-peace.png',
        length: '61h 8m',
        lengthHours: 61.1,
        genre: 'Classic',
        description: 'Tolstoy\'s epic masterpiece that intertwines the lives of private and public individuals during the time of the Napoleonic wars.',
        affiliateLink: 'https://www.amazon.co.uk/hz/audible/mlp/mfpdp/B095V1SM5H?actionCode=AMN30DFT1Bk06604291990WX&tag=thelongbookclub-21'
    },
    {
        id: '23',
        title: 'The Name of the Wind',
        author: 'Patrick Rothfuss',
        coverUrl: '/covers/the-name-of-the-wind.jpg',
        length: '28h',
        lengthHours: 28,
        genre: 'Fantasy',
        description: 'I have stolen princesses back from sleeping barrow kings. I burned down the town of Trebon. I have spent the night with Felurian and left with both my sanity and my life.',
        affiliateLink: 'https://www.amazon.co.uk/hz/audible/mlp/mfpdp/B007HOLTHU?actionCode=AMN30DFT1Bk06604291990WX&tag=thelongbookclub-21'
    },
    {
        id: '24',
        title: 'Shantaram',
        author: 'Gregory David Roberts',
        coverUrl: '/covers/shantaram.jpg',
        length: '43h',
        lengthHours: 43,
        genre: 'Fiction',
        description: 'A novel of high adventure, deep love, and unforgettable characters, set in the underbelly of contemporary Bombay.',
        affiliateLink: 'https://www.amazon.co.uk/hz/audible/mlp/mfpdp/B00KOIRNLW?actionCode=AMN30DFT1Bk06604291990WX&tag=thelongbookclub-21'
    },
    {
        id: '25',
        title: 'The Goldfinch',
        author: 'Donna Tartt',
        coverUrl: '/covers/the_goldfinch.jpg',
        length: '32h 24m',
        lengthHours: 32.4,
        genre: 'Fiction',
        description: 'A young New Yorker grieving his mother\'s death is pulled into a gritty underworld of art and wealth.',
        affiliateLink: 'https://www.amazon.co.uk/hz/audible/mlp/mfpdp/B00FR6TIQE?actionCode=AMN30DFT1Bk06604291990WX&tag=thelongbookclub-21'
    },
    {
        id: '26',
        title: 'A Little Life',
        author: 'Hanya Yanagihara',
        coverUrl: '/covers/a-little-life.jpg',
        length: '32h 51m',
        lengthHours: 32.8,
        genre: 'Fiction',
        description: 'A profound and powerful story of brotherly love and the limits of human endurance.',
        affiliateLink: 'https://www.amazon.co.uk/hz/audible/mlp/mfpdp/B0DT7DB8KL?actionCode=AMN30DFT1Bk06604291990WX&tag=thelongbookclub-21'
    },
    {
        id: '27',
        title: 'Cryptonomicon',
        author: 'Neal Stephenson',
        coverUrl: '/covers/cryptonomicon.jpg',
        length: '42h 53m',
        lengthHours: 42.9,
        genre: 'Science Fiction',
        description: 'A tour de force of code-breaking, WWII espionage, and modern computing.',
        affiliateLink: 'https://www.amazon.co.uk/hz/audible/mlp/mfpdp/B086WMM52D?actionCode=AMN30DFT1Bk06604291990WX&tag=thelongbookclub-21'
    },
    {
        id: '28',
        title: 'Crime and Punishment',
        author: 'Fyodor Dostoevsky',
        coverUrl: '/covers/crime-and-punishment.jpg',
        length: '26h 11m',
        lengthHours: 26.2,
        genre: 'Classic',
        description: 'Raskolnikov, an impoverished student, formulates a plan to kill an unscrupulous pawnbroker for her cash.',
        affiliateLink: 'https://www.amazon.co.uk/hz/audible/mlp/mfpdp/B085F2N7KG?actionCode=AMN30DFT1Bk06604291990WX&tag=thelongbookclub-21'
    },
    {
        id: '29',
        title: 'American Gods',
        author: 'Neil Gaiman',
        coverUrl: 'https://covers.openlibrary.org/b/isbn/9780380973651-L.jpg',
        length: '19h 40m',
        lengthHours: 19.7,
        genre: 'Fantasy',
        description: 'Shadow Moon is released from prison and recruited by the mysterious Mr. Wednesday.',
        affiliateLink: 'https://www.amazon.co.uk/hz/audible/mlp/mfpdp/B0080HPAK0?actionCode=AMN30DFT1Bk06604291990WX&tag=thelongbookclub-21'
    },
    {
        id: '30',
        title: 'Anna Karenina',
        author: 'Leo Tolstoy',
        coverUrl: 'https://covers.openlibrary.org/b/isbn/9780140449174-L.jpg',
        length: '35h 35m',
        lengthHours: 35.6,
        genre: 'Classic',
        description: 'A complex novel of families, romance, and Russian society in the 19th century.',
        affiliateLink: 'https://www.amazon.co.uk/hz/audible/mlp/mfpdp/B01FN8BL6A?actionCode=AMN30DFT1Bk06604291990WX&tag=thelongbookclub-21'
    },
    {
        id: '31',
        title: 'Don Quixote',
        author: 'Miguel de Cervantes',
        coverUrl: '/covers/don-quixote.jpg',
        length: '39h 42m',
        lengthHours: 39.7,
        genre: 'Classic',
        description: 'The adventures of a noble (but deluded) knight and his faithful squire, Sancho Panza.',
        affiliateLink: 'https://www.amazon.co.uk/hz/audible/mlp/mfpdp/B083JK2J89?actionCode=AMN30DFT1Bk06604291990WX&tag=thelongbookclub-21'
    },
    {
        id: '32',
        title: 'The Brothers Karamazov',
        author: 'Fyodor Dostoevsky',
        coverUrl: '/covers/the-brothers-karamazov.jpg',
        length: '37h 5m',
        lengthHours: 37.1,
        genre: 'Classic',
        description: 'A passionate philosophical novel that enters deeply into the ethical debates of God, free will, and morality.',
        affiliateLink: 'https://www.amazon.co.uk/hz/audible/mlp/mfpdp/B08YRWH6V3?actionCode=AMN30DFT1Bk06604291990WX&tag=thelongbookclub-21'
    },
    {
        id: '33',
        title: 'Steve Jobs',
        author: 'Walter Isaacson',
        coverUrl: 'https://covers.openlibrary.org/b/isbn/9781451648539-L.jpg',
        length: '25h 18m',
        lengthHours: 25.3,
        genre: 'Biography',
        description: 'The exclusive biography of Steve Jobs. Based on more than forty interviews with Jobs conducted over two years.',
        affiliateLink: 'https://www.amazon.co.uk/hz/audible/mlp/mfpdp/B005Z267BO?actionCode=AMN30DFT1Bk06604291990WX&tag=thelongbookclub-21'
    },
    {
        id: '34',
        title: 'Titan',
        author: 'Ron Chernow',
        coverUrl: 'https://covers.openlibrary.org/b/isbn/9781400077304-L.jpg',
        length: '35h',
        lengthHours: 35,
        genre: 'Biography',
        description: 'The Life of John D. Rockefeller, Sr. A detailed portrait of the ruthless industrialist and generous philanthropist.',
        affiliateLink: 'https://www.amazon.co.uk/hz/audible/mlp/mfpdp/B00EE0TV20?actionCode=AMN30DFT1Bk06604291990WX&tag=thelongbookclub-21'
    },
    {
        id: '35',
        title: 'The Rise and Fall of the Third Reich',
        author: 'William L. Shirer',
        coverUrl: '/covers/the-rise-and-fall-of-the-third-reich.jpg',
        length: '57h 11m',
        lengthHours: 57.2,
        genre: 'History',
        description: 'A history of Nazi Germany. One of the most important historical works of the 20th century.',
        affiliateLink: 'https://www.amazon.co.uk/hz/audible/mlp/mfpdp/B003W5VXPG?actionCode=AMN30DFT1Bk06604291990WX&tag=thelongbookclub-21'
    },
    {
        id: '36',
        title: 'Outlander',
        author: 'Diana Gabaldon',
        coverUrl: '/covers/outlander.jpg',
        length: '32h 38m',
        lengthHours: 32.6,
        genre: 'Historical Fiction',
        description: 'Claire Randall is a British combat nurse who is mysteriously swept back in time to 1743 Scotland.',
        affiliateLink: 'https://www.amazon.co.uk/hz/audible/mlp/mfpdp/B08JGG6H1C?actionCode=AMN30DFT1Bk06604291990WX&tag=thelongbookclub-21'
    },
    {
        id: '37',
        title: 'Middlemarch',
        author: 'George Eliot',
        coverUrl: '/covers/middlemarch.jpg',
        length: '32h',
        lengthHours: 32,
        genre: 'Classic',
        description: 'A study of provincial life in the town of Middlemarch, exploring the status of women, the nature of marriage, and religion.',
        affiliateLink: 'https://www.amazon.co.uk/hz/audible/mlp/mfpdp/B0030H21JS?actionCode=AMN30DFT1Bk06604291990WX&tag=thelongbookclub-21'
    },
    {
        id: '38',
        title: 'Jonathan Strange & Mr Norrell',
        author: 'Susanna Clarke',
        coverUrl: '/covers/jonathan-strange-&-mr-norrell.jpg',
        length: '32h 30m',
        lengthHours: 32.5,
        genre: 'Fantasy',
        description: 'In the midst of the Napoleonic Wars in 1806, most people believe magic to have long since disappeared from England - until the reclusive Mr Norrell reveals his powers.',
        affiliateLink: 'https://www.amazon.co.uk/hz/audible/mlp/mfpdp/B0DFCVV8LB?actionCode=AMN30DFT1Bk06604291990WX&tag=thelongbookclub-21'
    },
    {
        id: '39',
        title: 'Bleak House',
        author: 'Charles Dickens',
        coverUrl: '/covers/bleak-house.jpg',
        length: '35h',
        lengthHours: 35,
        genre: 'Classic',
        description: 'A satire of the English judicial system, centered on the endless legal case of Jarndyce and Jarndyce.',
        affiliateLink: 'https://www.amazon.co.uk/hz/audible/mlp/mfpdp/B079LPF5YN?actionCode=AMN30DFT1Bk06604291990WX&tag=thelongbookclub-21'
    },
    }
];

export const genres = Array.from(new Set(books.map(b => b.genre))).sort();
