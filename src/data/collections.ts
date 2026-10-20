export interface Collection {
    id: string;
    slug: string;
    title: string;
    description: string;
    coverUrl: string; // Placeholder for now or re-use a book cover
    bookIds: string[];
    topGraphic?: string; // Card header background graphic
    iconSvg?: string; // Dynamic SVG icon overlaid on topGraphic
    iconColor?: string; // Paired hex color for the SVG icon overlay
    collectionNumber?: string; // e.g., '008'
}

export const collections: Collection[] = [
    {
        id: 'mythology-epics',
        title: 'Best Long Mythological Retellings & Ancient World Epics',
        slug: 'mythology-epics',
        coverUrl: '/covers/circe.jpg',
        description: 'From Olympian halls and the blood-soaked beaches of Troy to ancient Vedic chariots and the primeval Watchers of Enoch. Explore 9 monumental, 10+ hour audiobooks that resurrect ancient mythology and pre-flood lore with fierce modern agency, philosophical depth, and world-class vocal performances.',
        bookIds: ['197', '198', '199', '200', '201', '202', '203', '204', '205'],
        topGraphic: '/assets/Collections-Cards-Gfx/Collection-Card-Top-Sage-Green.gif',
        iconSvg: '/assets/collections-hero-images/Collections Icons SVGs/mythology-icon.svg',
        iconColor: '#2c5143',
        collectionNumber: '013'
    },
    {
        id: 'cozy-fantasy',
        title: 'Best Long Cozy Fantasy & Slice-of-Life Audiobooks: Warm Teacups, Low Stakes & Gentle Magic',
        slug: 'cozy-fantasy',
        coverUrl: '/covers/the-house-in-the-cerulean-sea-tj-klune.jpg',
        description: 'Warm teacups, quiet cottage hearths, low-stakes comfort, and found-family sanctuaries. Cozy fantasy strips away world-ending apocalyptic stress in favor of seaside orphanages, artisanal bakeries, bureaucratic holidays, and gentle magic. These 8 definitive series-launch audiobooks deliver over 130 hours of soul-soothing, credit-worthy listening performed by award-winning voice talents.',
        bookIds: ['189', '190', '191', '192', '193', '194', '195', '196'],
        topGraphic: '/assets/Collections-Cards-Gfx/Collection-Card-Top-Purple.gif',
        iconSvg: '/assets/collections-hero-images/Collections Icons SVGs/cozy-fantasy-icon.svg',
        iconColor: '#bba08f',
        collectionNumber: '012'
    },
    {
        id: 'grimdark-fantasy',
        title: 'Best Long Grimdark Fantasy Audiobooks: Blood, Mud & Moral Ambiguity',
        slug: 'grimdark-fantasy',
        coverUrl: '/covers/the-blade-itself-joe-abercrombie.jpg',
        description: 'Blood-slicked battlefields, cynical mercenaries, razor-sharp con games, and flawed antiheroes who refuse to die. Grimdark fantasy stripped away high-fantasy chivalry to forge a visceral, morally ambiguous realism. These 8 definitive series-launch audiobooks deliver over 149 hours of unputdownable, credit-worthy epic audio performed by the industry’s greatest voice talents.',
        bookIds: ['181', '182', '183', '184', '185', '186', '187', '188'],
        topGraphic: '/assets/Collections-Cards-Gfx/Collection-Card-Top-Green.gif',
        iconSvg: '/assets/collections-hero-images/Collections Icons SVGs/grimdark-fantasy-icon.svg',
        iconColor: '#ed835e',
        collectionNumber: '011'
    },
    {
        id: 'nordic-noir',
        title: 'Best Long Nordic Noir & Scandi Crime Audiobooks: Chilling Northern Mysteries',
        slug: 'nordic-noir',
        coverUrl: '/covers/the-girl-with-the-dragon-tattoo-stieg-larsson.jpg',
        description: 'Sub-zero temperatures, isolated fjords, morally bruised detectives, and unflinching societal autopsies. Nordic Noir transformed modern crime fiction by marrying slow-burn procedural grit with bleak atmospheric immersion. These 8 definitive series-launch audiobooks deliver over 107 hours of bone-chilling, credit-worthy suspense performed by world-class narrators.',
        bookIds: ['173', '174', '175', '176', '177', '178', '179', '180'],
        topGraphic: '/assets/Collections-Cards-Gfx/Collection-Card-Top-DarkGrey.gif',
        iconSvg: '/assets/collections-hero-images/Collections Icons SVGs/nordic-noir-icon.svg',
        iconColor: '#e56a4e',
        collectionNumber: '010'
    },
    {
        id: 'litrpg-gamelit',
        title: 'Best Long LitRPG & GameLit Audiobooks: Level Up Your Listening',
        slug: 'litrpg-gamelit',
        coverUrl: '/covers/dungeon-crawler-carl-matt-dinniman.jpg',
        description: 'Stat screens, dungeon crawls, snarky sentient weapons, and zero-to-godhood progression. LitRPG is the undisputed champion of Audible credit value—delivering 15 to 45+ hours of adrenaline-fuelled entertainment per credit, powered by the finest voice-acting talents in the industry.',
        bookIds: ['166', '167', '122', '168', '169', '170', '171', '172'],
        topGraphic: '/assets/Collections-Cards-Gfx/Collection-Card-Top-Coral-Red.gif',
        iconSvg: '/assets/collections-hero-images/Collections Icons SVGs/litrpg-icon.svg',
        iconColor: '#c0c39a',
        collectionNumber: '009'
    },
    {
        id: 'magical-realism',
        title: 'Best Long Magical Realism Audiobooks: Immersive Fever Dreams',
        slug: 'magical-realism',
        coverUrl: '/covers/one-hundred-years-of-solitude-gabriel-garcia-marquez.jpg',
        description: 'Step into worlds where the impossible is woven seamlessly into everyday life. From Haruki Murakami’s parallel Tokyos to Gabriel García Márquez’s mythical Macondo, these lush, multi-generational epics and surreal mysteries are even more hypnotic when performed aloud.',
        bookIds: ['160', '17', '161', '162', '163', '99', '164', '165'],
        topGraphic: '/assets/Collections-Cards-Gfx/Collection-Card-Top-Sage-Green.gif',
        iconSvg: '/assets/collections-hero-images/Collections Icons SVGs/magical-realism-icon.svg',
        iconColor: '#2c5143',
        collectionNumber: '008'
    },
    {
        id: 'graphic-audio',
        title: 'The Best, Longest Cinematic Audiobooks (Full-Cast & Graphic Audio)',
        slug: 'graphic-audio',
        coverUrl: '/covers/harry-potter-and-the-philosopher-s-stone-j-k-rowling.jpg',
        description: 'Experience audiobooks like movies for your ears. Our curated collection of the best, most immersive cinematic audio productions featuring full casts, sound effects, and scoring.',
        bookIds: ['20', '152', '157', '158', '29', '153', '154', '156', '150', '151', '155'],
        topGraphic: '/assets/Collections-Cards-Gfx/cc2-cinematic-top-gfx.gif'
    },
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
        bookIds: ['159', '55', '113', '127', '111', '128', '112', '129', '130', '114', '147', '148'], // Romantasy additions: This Kingdom, Priory, Kushiel, Empyrean (3), Crescent City (3), Moon Hatched, Quicksilver/Brimstone
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
