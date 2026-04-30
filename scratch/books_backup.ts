import { reviews } from './reviews';

export interface Book {
    id: string;
    title: string;
    author: string;
    coverUrl: string;
    length: string; // e.g., "48h 12m"
    lengthHours: number; // for sorting/filtering
    genre: string | string[];
    description: string;
    curatorNote?: string; // "Why this is the best..." section
    curatorTitle?: string; // Optional: Overrides the default "Why this is the best..." header
    affiliateLink: string;
    affiliateLinkUS?: string;
    relatedBookIds?: string[];
    narrator?: string;
    longBookClubTake?: string;
    soundCheck?: string;
    slug?: string;
    // Curator content fields
    cardOverview?: string;  // Max 120 chars. Book card excerpt on Home Page
    teaser?: string;        // SEO summary paragraph on Collection Pages
    teaserTitle?: string;   // H4 headline on Collection Pages
    audioPreviewUrl?: string; // Direct link to iTunes .m4a preview
}

export const baseBooks: Book[] = [
    {
        id: "150",
        slug: "i-am-pilgrim-terry-hayes",
        title: "I Am Pilgrim",
        author: "Terry Hayes",
        coverUrl: "/covers/i-am-pilgrim-terry-hayes.jpg",
        length: "22h 40m",
        lengthHours: 22.7,
        genre: ["Spy Thriller", "Espionage", "Crime", "Terrorism", "Mystery", "Action"],
        affiliateLink: "https://www.amazon.co.uk/dp/B00E67KWXI?tag=thelongbookclub-21",
        affiliateLinkUS: "https://www.amazon.com/dp/B00E652E72?tag=thelongbookcl-20",
        cardOverview: "23 hours chasing the Saracen. The ultimate modern spy thriller that never lets up.",
        narrator: "Christopher Ragland"
    },



    {
        narrator: "Morag Sims, Will Watt",
        genre: ['Fantasy','Dark Academia','Mythology','Literary Fiction','Adventure'],
        description: "Two rival PhD students at Cambridge must descend into Hell to rescue their deceased thesis advisor in this dark academia fantasy that blends Dante’s Inferno with academic satire.",
        id: '126',
        slug: 'katabasis-rf-kuang',
        title: "Katabasis",
        author: "R.F. Kuang",
        coverUrl: '/covers/katabasis.jpg',
        length: '18h 33m',
        lengthHours: 18.55,
        audioPreviewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/21/2d/33/212d33fc-f797-4216-063e-739a2f3ed8e4/mzaf_1870623268567030153.std.aac.p.m4a',
        affiliateLink: 'https://www.amazon.co.uk/dp/B0CYTD95YH?tag=thelongbookclub-21',
        affiliateLinkUS: 'https://www.amazon.com/dp/B0CYTD8DGP?tag=thelongbookcl-20',
    },
    {
        cardOverview: "At nearly 24 hours, the stakes have never been higher. The longest entry in the Empyrean saga yet.",
        narrator: "Jasmin Walker, Justis Bolding, Teddy Hamilton, Rebecca Soler",
        teaserTitle: "The High-Stakes Expansion",
        teaser: "At nearly 24 hours, the stakes have never been higher for Violet Sorrengail. The longest entry in the Empyrean saga yet, delivering the epic scale and emotional intensity fans have come to expect.",
        genre: ['Fantasy','Romantasy','High Fantasy','Dragons','War','Magic'],
        description: "The third book in the Empyrean series. Violet Sorrengail knows that the true battle has only just begun. The stakes have never been higher, and she must find allies beyond the borders of Navarre to save everything she loves.",
        id: '128',
        slug: 'onyx-storm-rebecca-yarros',
        title: "Onyx Storm",
        author: "Rebecca Yarros",
        coverUrl: '/covers/onyx-storm.jpg',
        length: '23h 52m',
        lengthHours: 23.87,
        audioPreviewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/1d/e7/25/1de7255c-deac-8850-0288-4e51ad304f11/mzaf_12578303137952599504.std.aac.p.m4a',
        affiliateLink: 'https://www.amazon.co.uk/dp/B0CZF79X5G?tag=thelongbookclub-21',
        affiliateLinkUS: 'https://www.amazon.com/dp/B0CZF874CW?tag=thelongbookcl-20',
    },
    {
        cardOverview: "37 hours of space opera. The scope of this universe is breathtaking, setting the stage for Judas Unchained.",
        narrator: "John Lee",
        genre: 'Science Fiction',
        description: "The year is 2380. The Intersolar Commonwealth, a sphere of stars, contains more than six hundred worlds.",
        id: '62',
        slug: 'pandoras-star-peter-f-hamilton',
        title: "Pandora's Star",
        author: "Peter F. Hamilton",
        coverUrl: '/covers/pandoras-star.jpg',
        length: '37h 16m',
        lengthHours: 37.3,
        audioPreviewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview122/v4/54/44/0c/54440c05-8dce-c333-b0fa-06b78704e13f/mzaf_15310668458089656201.std.aac.p.m4a',
        affiliateLink: 'https://www.amazon.co.uk/dp/B0041SYV5W?tag=thelongbookclub-21',
        affiliateLinkUS: 'https://www.amazon.com/dp/B005NDFK6S?tag=thelongbookcl-20',
    },
    {
        relatedBookIds: ['148'],
        cardOverview: "20 hours of Fae & Alchemy. An addictive enemies-to-lovers phenomenon full of banter and blistering heat.",
        narrator: "Stella Bloom, Anthony Palmini",
        teaserTitle: "The Fae & Alchemy Phenomenon",
        teaser: "An addictive 20-hour enemies-to-lovers epic. Saeris Fane's journey through a land of ice and snow, bound to a mysterious Fae warrior, is pure high-fantasy escapism.",
        genre: ['Fantasy','Dark Romance','Romantasy','Urban Fantasy','Magic','Fae'],
        description: "Saeris Fane inadvertently reopens a gateway between realms, transporting her to a land of ice and snow. There, she binds herself to Kingfisher, a Fae warrior with his own secrets, in this addictive enemies-to-lovers phenomenon.",
        id: '147',
        slug: 'quicksilver-callie-hart',
        title: "Quicksilver",
        author: "Callie Hart",
        coverUrl: '/covers/quicksilver.jpg',
        length: '20h 41m',
        lengthHours: 20.7,
        audioPreviewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/f2/1f/45/f21f4503-0b54-7d8a-8aa8-3481adb38ad2/mzaf_5145146264065395483.std.aac.p.m4a',
        affiliateLink: 'https://www.amazon.co.uk/dp/B0DBJB1Q4L?tag=thelongbookclub-21',
        affiliateLinkUS: 'https://www.amazon.com/dp/B0DBJBFHGT?tag=thelongbookcl-20',
    },
    {
        cardOverview: "38 hours of global chaos. A high-tech thriller involving MMORPGs, terrorists, and the Russian mob.",
        narrator: "Malcolm Hillgartner",
        genre: ['Techno-thriller','Action','Crime','MMORPG','Adventure','Global'],
        description: "A wealthy tech entrepreneur gets caught up in a global chase involving Russian mobsters, Islamic terrorists, and Chinese hackers after a ransomware virus infects his MMORPG.",
        id: '140',
        slug: 'reamde-neal-stephenson',
        title: "Reamde",
        author: "Neal Stephenson",
        coverUrl: '/covers/reamde.jpg',
        length: '38h',
        lengthHours: 38,
        audioPreviewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview113/v4/ba/84/c9/ba84c939-d512-e0e2-fce6-a1df8b9bd1a5/mzaf_6726698043095802034.std.aac.p.m4a',
        affiliateLink: 'https://www.amazon.co.uk/dp/B005QBI6LS?tag=thelongbookclub-21',
        affiliateLinkUS: 'https://www.amazon.com/dp/B005Q20OBM?tag=thelongbookcl-20',
    },
    {
        cardOverview: "31 hours of WWIII. Clancy's tactical masterpiece imagines a conventional war in the 1980s.",
        narrator: "Michael Prichard",
        genre: ['Techno-thriller','War','Cold War','Military','Action','Alternate History'],
        description: "When Muslim fundamentalists destroy a vital Soviet oil complex, the USSR decides to seize the Persian Gulf. To prevent NATO from intervening, they launch a massive deception campaign that leads to World War III.",
        id: '139',
        slug: 'red-storm-rising-tom-clancy',
        title: "Red Storm Rising",
        author: "Tom Clancy",
        coverUrl: '/covers/red-storm-rising.jpg',
        length: '31h 12m',
        lengthHours: 31.2,
        audioPreviewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/ec/c9/61/ecc9619b-a052-5693-872b-13fc81049f0a/mzaf_6639800279962325763.std.aac.p.m4a',
        affiliateLink: 'https://www.amazon.co.uk/dp/B00I2TS9BS?tag=thelongbookclub-21',
        affiliateLinkUS: 'https://www.amazon.com/dp/B00I54G188?tag=thelongbookcl-20',
    },
    {
        cardOverview: '34 hours of nuclear horror. Often compared to "The Stand," but grittier and more magical.',
        narrator: "Tom Stechschulte",
        genre: ['Horror','Post-Apocalyptic','Dark Fantasy','Science Fiction','Good vs Evil','Survival'],
        description: "Facing down an unprecedented malevolent force, Swan, a young girl with the ability to heal the earth, and an unlikely mix of survivors must traverse a nuclear wasteland to save humanity.",
        id: '131',
        slug: 'swan-song-robert-mccammon',
        title: "Swan Song",
        author: "Robert McCammon",
        coverUrl: '/covers/swan-song.jpg',
        length: '34h 19m',
        lengthHours: 34.3,
        audioPreviewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/44/05/4b/44054b55-1b27-2bd1-636c-0931691a1f35/mzaf_7571670261636386290.std.aac.p.m4a',
        affiliateLink: 'https://www.amazon.co.uk/dp/B00684FLDI?tag=thelongbookclub-21',
        affiliateLinkUS: 'https://www.amazon.com/dp/B0067VJ2DM?tag=thelongbookcl-20',
    },
    {
        cardOverview: "23 hours of cosmic silence. The sequel introduces the terrifying Fermi Paradox solution that will haunt you.",
        narrator: "Jess Hong, Daniel York Loh, P.J. Ochlan",
        genre: ['Science Fiction','Hard Sci-Fi','Cosmic Horror','Sociology','Space Opera','Aliens'],
        description: "The Trisolaran fleet is on its way. In response, Earth forms the Wallfacer Project, granting four individuals near-infinite resources to design secret strategies hidden from the sophons that monitor all human communication.",
        id: '142',
        slug: 'the-dark-forest-cixin-liu',
        title: "The Dark Forest",
        author: "Cixin Liu",
        coverUrl: '/covers/the-dark-forest.jpg',
        length: '22h 36m',
        lengthHours: 22.6,
        audioPreviewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/03/01/07/03010791-4340-841e-e7e6-4d071891c243/mzaf_8368278246344199440.std.aac.p.m4a',
        affiliateLink: 'https://www.amazon.co.uk/dp/B0CFYK53C1?tag=thelongbookclub-21',
        affiliateLinkUS: 'https://www.amazon.com/dp/B0BVW68DMG?tag=thelongbookcl-20',
    },
    {
        cardOverview: "37 hours of the viral apocalypse. A literary blockbuster that spans a century of survival.",
        narrator: "Scott Brick",
        genre: ['Horror','Post-Apocalyptic','Science Fiction','Vampires','Survival','Epic'],
        description: "A government experiment goes wrong, unleashing a viral apocalypse of vampire-like beings. A century later, a colony of survivors must leave their sanctuary to save the world, guided by a girl who has been alive since it all began.",
        id: '134',
        slug: 'the-passage-justin-cronin',
        title: "The Passage",
        author: "Justin Cronin",
        coverUrl: '/covers/the-passage.jpg',
        length: '36h 49m',
        lengthHours: 36.8,
        audioPreviewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/02/03/37/0203374e-68ec-eb29-df70-23f731fc5050/mzaf_1395886314835586371.std.aac.p.m4a',
        affiliateLink: 'https://www.amazon.co.uk/dp/B003TXKQQ8?tag=thelongbookclub-21',
        affiliateLinkUS: 'https://www.amazon.com/dp/B005WJSSXU?tag=thelongbookcl-20',
    },
    {
        cardOverview: "12 hours exploring the gaps. A fan-favorite expansion of the Three Body universe.",
        narrator: "P. J. Ochlan, Bruno Roubicek",
        genre: ['Science Fiction','Hard Sci-Fi','Fan Sequel','Space Opera','Physics','Time'],
        description: "Set in the universe of the Three-Body Problem, this authorized fan-sequel (paraquel) follows Yun Tianming's journey after the end of the original trilogy. It explores the mysteries of the Entities and the ultimate nature of the universe.",
        id: '144',
        slug: 'the-redemption-of-time-baoshu',
        title: "The Redemption of Time",
        author: "Baoshu",
        coverUrl: '/covers/the-redemption-of-time.jpg',
        length: '12h 17m',
        lengthHours: 12.3,
        audioPreviewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview123/v4/2f/8d/2d/2f8d2d77-4f14-3128-0050-0f3f655f3ca0/mzaf_10360669029368662834.std.aac.p.m4a',
        affiliateLink: 'https://www.amazon.co.uk/dp/B07TD6S8SS?tag=thelongbookclub-21',
        affiliateLinkUS: 'https://www.amazon.com/dp/B07THG2JCC?tag=thelongbookcl-20',
    },
    {
        cardOverview: "28 hours suspended in ice. A chilling mix of historical survival and supernatural horror.",
        narrator: "Tom Sellwood",
        genre: ['Horror','Historical Horror','Survival','Supernatural','Sea Story','History'],
        description: "The men on board the HMS Terror have every right to be scared: their ship is stuck in the Arctic ice, rations are low, and there is a thing out there in the dark that is stalking them. Based on the true story of the lost Franklin Expedition.",
        id: '132',
        slug: 'the-terror-dan-simmons',
        title: "The Terror",
        author: "Dan Simmons",
        coverUrl: '/covers/the-terror.jpg',
        length: '28h 28m',
        lengthHours: 28.5,
        audioPreviewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/d6/87/bc/d687bc39-7670-0533-74bb-555ac5dd1cf8/mzaf_18249250901957733543.std.aac.p.m4a',
        affiliateLink: 'https://www.amazon.co.uk/dp/B07BNSH1LY?tag=thelongbookclub-21',
        affiliateLinkUS: 'https://www.amazon.com/dp/B07BNMN6CZ?tag=thelongbookcl-20',
    },
    {
        cardOverview: "13 hours of hard sci-fi. First contact like you've never seen it before, grounded in physics and history.",
        narrator: "Daniel York Loh, P.J. Ochlan, Bruno Roubicek",
        genre: ['Science Fiction','Hard Sci-Fi','First Contact','Physics','China','Mystery'],
        description: "Set against the backdrop of China's Cultural Revolution, a secret military project sends signals into space to establish contact with aliens. An alien civilization on the brink of destruction captures the signal and plans to invade Earth.",
        id: '141',
        slug: 'the-three-body-problem-cixin-liu',
        title: "The Three-Body Problem",
        author: "Cixin Liu",
        coverUrl: '/covers/three-body-problem.jpg',
        length: '13h 24m',
        lengthHours: 13.4,
        audioPreviewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/de/8e/f3/de8ef31e-afd2-4981-fdc9-77a17bbd1809/mzaf_18272327604325928808.std.aac.p.m4a',
        affiliateLink: 'https://www.amazon.co.uk/dp/B0BVWJ3X7B?tag=thelongbookclub-21',
        affiliateLinkUS: 'https://www.amazon.com/dp/B005NDFK6S?tag=thelongbookcl-20',
    },
    {
        cardOverview: "43 hours opening the Inn. The start of the viral LitRPG phenomenon that changes how you see fantasy.",
        narrator: "Andrea Parsneau",
        genre: ['Fantasy','LitRPG','Slice of Life','Cozy Fantasy','Portal Fantasy','Adventure'],
        description: "An inn is a place to rest, a place to talk and share stories, or a place to find adventure. Or it’s just a place to hide from the goblins and tourists. Erin Solstice, an innkeeper with an unusual clientele, must navigate a world of magic, monsters, and more than a few annoyances in this massive slice-of-life fantasy epic.",
        id: '122',
        slug: 'the-wandering-inn-book-1-pirateaba',
        title: "The Wandering Inn: Book 1",
        author: "Pirateaba",
        coverUrl: '/covers/the-wandering-inn-book-1.jpg',
        length: '43h 10m',
        lengthHours: 43.1,
        audioPreviewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/c8/49/c4/c849c408-6255-6528-e9fb-7f406abe5c34/mzaf_4295061209433330897.std.aac.p.m4a',
        affiliateLink: 'https://www.amazon.co.uk/dp/B07X4LZ3QC?tag=thelongbookclub-21',
        affiliateLinkUS: 'https://www.amazon.com/dp/B07X3MVKQ7?tag=thelongbookcl-20',
    },
    {
        cardOverview: "43 hours in exile. Kvothe's journey continues in this massive sequel to The Name of the Wind.",
        narrator: "Rupert Degas",
        genre: 'Fantasy',
        description: "Picking up the tale of Kvothe Kingkiller once again, we follow him into exile, into political intrigue, courtship, adventure, love and magic... and further along the path that has turned Kvothe, the mightiest magician of his age, a legend in his own time, into Kote, the unassuming pub landlord.",
        id: '125',
        slug: 'the-wise-mans-fear-patrick-rothfuss',
        title: "The Wise Man's Fear",
        author: "Patrick Rothfuss",
        coverUrl: '/covers/the-wise-mans-fear.jpg',
        length: '42h 49m',
        lengthHours: 42.8,
        audioPreviewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview123/v4/81/9c/01/819c0197-ae15-4c9d-366b-428824a8db6f/mzaf_4153961436389682026.std.aac.p.m4a',
        affiliateLink: 'https://www.amazon.co.uk/dp/B007QDSAL0?tag=thelongbookclub-21',
        affiliateLinkUS: 'https://www.amazon.com/dp/B007Q726XE?tag=thelongbookcl-20',
    },
    {
        cardOverview: "34 hours of winter. A massive, cozy Christmas special that turns into an epic battle.",
        narrator: "Andrea Parsneau",
        genre: ['Fantasy','LitRPG','Slice of Life','Cozy Fantasy','Portal Fantasy','Magic'],
        description: "Winter has come to Innworld. Erin Solstice tries to bring the joy of Christmas to a world that has never heard of it, while Rags the Goblin heads north to face a new threat, and Ryoka Griffin meets the Deadly Flower of the North.",
        id: '124',
        slug: 'winter-solstice-the-wandering-inn-book-4-pirateaba',
        title: "Winter Solstice: The Wandering Inn, Book 4",
        author: "Pirateaba",
        coverUrl: '/covers/winter-solstice.jpg',
        length: '34h 14m',
        lengthHours: 34.2,
        audioPreviewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/a4/24/51/a42451cf-4f3b-b825-8158-8ed128528499/mzaf_13443640183708048583.std.aac.p.m4a',
        affiliateLink: 'https://www.amazon.co.uk/dp/B093QYS1F2?tag=thelongbookclub-21',
        affiliateLinkUS: 'https://www.amazon.com/dp/B093QNBCGJ?tag=thelongbookcl-20',    },
    {
        id: "149",
        slug: "the-mark-twain-complete-collection-mark-twain",
        title: "The Mark Twain Complete Collection",
        author: "Mark Twain",
        coverUrl: "/covers/the-mark-twain-complete-collection-mark-twain.jpg",
        length: "280 hours and 21 minutes",
        lengthHours: 280.4,
        genre: ["Adventure", "American History", "Americana", "Classics", "Coming of Age", "Historical Adventure", "Historical Fiction", "Travel"],
        audioPreviewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview113/v4/8e/d1/fc/8ed1fc2c-c6a6-91d2-71ba-2cf46876f763/mzaf_9143985957611907840.std.aac.p.m4a',
        affiliateLink: "https://www.amazon.co.uk/dp/B0CPYRFKVV?tag=thelongbookclub-21",
        affiliateLinkUS: "https://www.amazon.com/dp/B0CPYSMDLK?tag=thelongbookcl-20",
        description: "Experience the definitive Mark Twain collection in this staggering 280-hour audiobook epic. Featuring every major novel and essay, this long listen offers incredible value and total immersion for your daily commute or a year of deep listening.",
        teaserTitle: "The 280-Hour Masterclass in American Satire",
        teaser: "Experience the definitive Mark Twain collection in this staggering 280-hour audiobook epic. Featuring every major novel and essay, this long listen offers incredible value and total immersion for your daily commute or a year of deep listening.",
        cardOverview: "A legendary 280-hour archive. The ultimate credit-to-hour king. A massive Americana-core library in one download.",
        narrator: "Nathan Osgood, Ian Porter, Kenneth Jay, Todd Kramer"
    }
];

// Merge curator reviews from reviews.ts
export const books: Book[] = baseBooks.map(book => {
    const review = reviews[book.title];
    return {
        ...book,
        ...(review ? review : {})
    };
});

export const genres = Array.from(new Set(
    books.flatMap(b => Array.isArray(b.genre) ? b.genre : [b.genre])
)).sort();
