export interface Collection {
    id: string;
    slug: string;
    title: string;
    cardTitle?: string;
    cardOverview: string;
    heroSubtitle: string;
    editorialHeading?: string;
    editorialIntro: string;
    description?: string; // Kept for backwards compatibility
    coverUrl: string; // Placeholder for now or re-use a book cover
    bookIds: string[];
    topGraphic?: string; // Card header background graphic
    iconSvg?: string; // Dynamic SVG icon overlaid on topGraphic
    iconColor?: string; // Paired hex color for the SVG icon overlay
    collectionNumber?: string; // e.g., '008'
}

export const collections: Collection[] = [
    {
        id: 'silkpunk',
        title: 'Best Long Silkpunk & Asian Fantasy Audiobooks',
        slug: 'silkpunk',
        coverUrl: '/covers/the-grace-of-kings-ken-liu.jpg',
        cardOverview: 'Bamboo airships, bio-mechanical jade, and dynastic rebellions. Coined by Ken Liu, silkpunk blends Asian antiquity with organic engineering across monumental 20+ hour audio sagas.',
        heroSubtitle: 'Immerse yourself in sprawling East Asian fantasy epics featuring living engineering, philosophical warfare, and peerless vocal performances that maximize your Audible credits.',
        editorialHeading: 'The Art of Organic Technology',
        editorialIntro: 'Coined by author Ken Liu in [The Grace of Kings](/book/the-grace-of-kings-ken-liu/), silkpunk melds historical East Asian antiquity with biomechanical engineering—ox-sinew ballistas, bamboo airships, and bio-enhanced jade. Narrated by masters like Kevin Shen and Natalie Naudus, these sweeping sagas prioritize philosophical statecraft, rebellion, and cultural depth over standard Western medieval tropes.',
        description: 'Bamboo airships, bio-mechanical jade, and dynastic rebellions. Coined by Ken Liu, silkpunk blends Asian antiquity with organic engineering across monumental 20+ hour audio sagas.',
        bookIds: ['454', '185', '464', '466', '467', '468'],
        topGraphic: '/assets/Collections-Cards-Gfx/Collection-Card-Top-Green.gif',
        iconSvg: '/assets/collections-hero-images/Collections Icons SVGs/silkpunk-icon.svg',
        iconColor: '#ed835e',
        collectionNumber: '016'
    },
    {
        id: 'british-espionage',
        title: 'Best Long British Espionage Audiobooks: Cold War Thrillers',
        slug: 'british-espionage',
        coverUrl: '/covers/tinker-tailor-soldier-spy.jpg',
        cardOverview: 'Damp London alleys, cynical handlers, bureaucratic paranoia, and slow-burn mole hunts. Explore masterworks of British tradecraft spanning 120+ hours of premier narrated suspense.',
        heroSubtitle: 'Uncompromising, slow-burn British spycraft and Cold War counterintelligence epics where quiet intellect, compromised loyalties, and devastating tradecraft outshine Hollywood gunfire.',
        editorialHeading: 'Tradecraft Over Pyrotechnics',
        editorialIntro: 'From John le Carré’s legendary George Smiley mole-hunts in [Tinker Tailor Soldier Spy](/book/tinker-tailor-soldier-spy/) to Mick Herron’s cynical Slough House rejects, British espionage thrives on bureaucratic dread and moral ambiguity. Narrators like Michael Jayston and Rosamund Pike deliver masterclasses in psychological tension, turning patient procedural detail into pulse-pounding audio gold.',
        description: 'Damp London alleys, cynical handlers, bureaucratic paranoia, and slow-burn mole hunts. Explore masterworks of British tradecraft spanning 120+ hours of premier narrated suspense.',
        bookIds: ['137', '214', '215', '216', '217', '218', '219', '220', '221', '222'],
        topGraphic: '/assets/Collections-Cards-Gfx/Collection-Card-Top-DarkGrey.gif',
        iconSvg: '/assets/collections-hero-images/Collections Icons SVGs/british-espionage-icon.svg',
        iconColor: '#e56a4e',
        collectionNumber: '015'
    },
    {
        id: 'space-opera',
        title: 'Best Long Space Opera & Galactic Empire Audiobooks',
        slug: 'space-opera',
        coverUrl: '/covers/leviathan-wakes.jpg',
        cardOverview: 'Colossal starfleets, warring interstellar dynasties, sentient warships, and ancient alien mysteries. Grand sci-fi canvases delivering 190+ hours of premier credit-worthy listening.',
        heroSubtitle: 'Journey across light-years of sweeping interstellar warfare, vast Dyson spheres, and intricate planetary politics in audio\'s most expansive science fiction epics.',
        editorialHeading: 'The Grandest Canvas in Sci-Fi',
        editorialIntro: 'Space opera demands grand scale and marathon commitment. From the geopolitical grit of James S.A. Corey’s [Leviathan Wakes](/book/leviathan-wakes-james-sa-corey/) to Peter F. Hamilton’s commonwealth sagas, these productions build living universes. Anchored by legendary voices like Jefferson Mays and John Lee, they turn massive cosmic conflicts and hard-science mysteries into effortless, addictive marathons.',
        description: 'Colossal starfleets, warring interstellar dynasties, sentient warships, and ancient alien mysteries. Grand sci-fi canvases delivering 190+ hours of premier credit-worthy listening.',
        bookIds: ['64', '62', '206', '207', '208', '209', '210', '211', '212', '213'],
        topGraphic: '/assets/Collections-Cards-Gfx/Collection-Card-Top-Coral-Red.gif',
        iconSvg: '/assets/collections-hero-images/Collections Icons SVGs/space-opera-icon.svg',
        iconColor: '#c0c39a',
        collectionNumber: '014'
    },
    {
        id: 'mythology-epics',
        title: 'Best Long Mythological Retellings & Ancient Epics',
        slug: 'mythology-epics',
        coverUrl: '/covers/circe.jpg',
        cardOverview: 'Olympian halls, Trojan beaches, and ancient lore resurrected with modern agency. Explore monumental 10+ hour audiobooks celebrating gods, monsters, and classical epics.',
        heroSubtitle: 'Rediscover ancient myths and heroic legends through immersive audio retellings that pair timeless classical lore with contemporary psychological depth and world-class narration.',
        editorialHeading: 'Ancient Lore, Modern Resonance',
        editorialIntro: 'Classical mythology has found its modern golden age in audio. Authors like Madeline Miller in [Circe](/book/circe/) strip away centuries of dust to give ancient figures fierce agency, emotional complexity, and poetic resonance. Brought to life by voices like Perdita Weeks, these 10+ hour recordings honor ancient oral traditions while delivering profound contemporary resonance.',
        description: 'Olympian halls, Trojan beaches, and ancient lore resurrected with modern agency. Explore monumental 10+ hour audiobooks celebrating gods, monsters, and classical epics.',
        bookIds: ['197', '198', '199', '200', '201', '202', '203', '204', '205'],
        topGraphic: '/assets/Collections-Cards-Gfx/Collection-Card-Top-Sage-Green.gif',
        iconSvg: '/assets/collections-hero-images/Collections Icons SVGs/mythology-icon.svg',
        iconColor: '#2c5143',
        collectionNumber: '013'
    },
    {
        id: 'cozy-fantasy',
        title: 'Best Long Cozy Fantasy & Slice-of-Life Audiobooks',
        slug: 'cozy-fantasy',
        coverUrl: '/covers/the-house-in-the-cerulean-sea-tj-klune.jpg',
        cardOverview: 'Warm teacups, seaside cottages, low-stakes comfort, and found-family sanctuaries. Soothing series-launch audiobooks delivering over 130 hours of stress-free, heart-warming escapism.',
        heroSubtitle: 'Escape apocalyptic stress with heartwarming low-stakes fantasy, charming magical sanctuaries, and soothing vocal performances that soothe your daily commute.',
        editorialHeading: 'Low Stakes, High Comfort',
        editorialIntro: 'Cozy fantasy strips away world-ending perils in favor of seaside orphanages, magical bakeries, and gentle communal healing. Pioneered by novels like TJ Klune’s [The House in the Cerulean Sea](/book/the-house-in-the-cerulean-sea-tj-klune/), these slice-of-life listens prioritize warmth, eccentric found families, and comforting humor—proving that emotional stakes can be just as compelling as battlefield clashes.',
        description: 'Warm teacups, seaside cottages, low-stakes comfort, and found-family sanctuaries. Soothing series-launch audiobooks delivering over 130 hours of stress-free, heart-warming escapism.',
        bookIds: ['189', '190', '191', '192', '193', '194', '195', '196'],
        topGraphic: '/assets/Collections-Cards-Gfx/Collection-Card-Top-Purple.gif',
        iconSvg: '/assets/collections-hero-images/Collections Icons SVGs/cozy-fantasy-icon.svg',
        iconColor: '#bba08f',
        collectionNumber: '012'
    },
    {
        id: 'grimdark-fantasy',
        title: 'Best Long Grimdark Fantasy Audiobooks: Blood & Moral Ambiguity',
        slug: 'grimdark-fantasy',
        coverUrl: '/covers/the-blade-itself-joe-abercrombie.jpg',
        cardOverview: 'Blood-slicked mud, cynical mercenaries, razor-sharp con games, and flawed antiheroes. Definitive grimdark series starters delivering 149+ hours of visceral, credit-worthy fantasy audio.',
        heroSubtitle: 'Step into unforgiving worlds of moral grey, brutal skirmishes, and razor-sharp wit where survival replaces chivalry across audio\'s most gripping dark fantasies.',
        editorialHeading: 'Survival Over Chivalry',
        editorialIntro: 'Grimdark fantasy shattered high-fantasy idealism by plunging into visceral realism, political rot, and flawed antiheroes who refuse to die quietly. Anchored by Joe Abercrombie’s [The Blade Itself](/book/the-blade-itself-joe-abercrombie/)—performed with iconic bravura by Steven Pacey—these unflinching audio epics combine black humor, razor-sharp dialogue, and relentless tension for an unbeatable return on your credit.',
        description: 'Blood-slicked mud, cynical mercenaries, razor-sharp con games, and flawed antiheroes. Definitive grimdark series starters delivering 149+ hours of visceral, credit-worthy fantasy audio.',
        bookIds: ['181', '182', '183', '184', '185', '186', '187', '188'],
        topGraphic: '/assets/Collections-Cards-Gfx/Collection-Card-Top-Green.gif',
        iconSvg: '/assets/collections-hero-images/Collections Icons SVGs/grimdark-fantasy-icon.svg',
        iconColor: '#ed835e',
        collectionNumber: '011'
    },
    {
        id: 'nordic-noir',
        title: 'Best Long Nordic Noir & Scandi Crime Audiobooks',
        slug: 'nordic-noir',
        coverUrl: '/covers/the-girl-with-the-dragon-tattoo-stieg-larsson.jpg',
        cardOverview: 'Sub-zero procedural grit, isolated fjords, and bruised detectives uncovering dark secrets. Explore 107+ hours of bone-chilling Scandinavian suspense performed by world-class narrators.',
        heroSubtitle: 'Immerse yourself in bleak, atmospheric Scandinavian mysteries where slow-burn police procedurals, harsh landscapes, and social critiques combine into gripping marathon listens.',
        editorialHeading: 'Bleak Landscapes, Chilling Truths',
        editorialIntro: 'Nordic Noir redefined international crime fiction by combining chilling sub-zero atmospheres with uncompromising social critique. From Stieg Larsson’s [The Girl with the Dragon Tattoo](/book/the-girl-with-the-dragon-tattoo-stieg-larsson/) to Jo Nesbø’s brooding detectives, these methodical investigations unfold with measured, atmospheric pacing. In audio, world-class narrators evoke every icy gust and silent interrogation with chilling, addictive precision.',
        description: 'Sub-zero procedural grit, isolated fjords, and bruised detectives uncovering dark secrets. Explore 107+ hours of bone-chilling Scandinavian suspense performed by world-class narrators.',
        bookIds: ['173', '174', '175', '176', '177', '178', '179', '180'],
        topGraphic: '/assets/Collections-Cards-Gfx/Collection-Card-Top-DarkGrey.gif',
        iconSvg: '/assets/collections-hero-images/Collections Icons SVGs/nordic-noir-icon.svg',
        iconColor: '#e56a4e',
        collectionNumber: '010'
    },
    {
        id: 'litrpg-gamelit',
        title: 'Best Long LitRPG & GameLit Audiobooks: Level Up',
        slug: 'litrpg-gamelit',
        coverUrl: '/covers/dungeon-crawler-carl-matt-dinniman.jpg',
        cardOverview: 'Stat screens, dungeon crawls, sentient gear, and zero-to-godhood progression. The undisputed champions of Audible credit value, offering 15 to 45+ hours per credit.',
        heroSubtitle: 'Level up your audio library with fast-paced LitRPG adventures featuring addictive game mechanics, witty dialogue, and unbeatable hour-per-credit audio entertainment.',
        editorialHeading: 'The Credit-Value Heavyweights',
        editorialIntro: 'LitRPG has transformed modern audiobooks into high-octane gaming marathons. Blending dungeon crawls, snarky sentient weapons, and satisfying level-ups, series like Matt Dinniman’s [Dungeon Crawler Carl](/book/dungeon-crawler-carl-matt-dinniman/) deliver unmatched runtime value. Powered by vocal chameleons like Jeff Hays, these 20-to-45+ hour epics turn RPG stat blocks into theatrical, laugh-out-loud auditory spectacle.',
        description: 'Stat screens, dungeon crawls, sentient gear, and zero-to-godhood progression. The undisputed champions of Audible credit value, offering 15 to 45+ hours per credit.',
        bookIds: ['166', '167', '122', '168', '169', '170', '171', '172'],
        topGraphic: '/assets/Collections-Cards-Gfx/Collection-Card-Top-Coral-Red.gif',
        iconSvg: '/assets/collections-hero-images/Collections Icons SVGs/litrpg-icon.svg',
        iconColor: '#c0c39a',
        collectionNumber: '009'
    },
    {
        id: 'magical-realism',
        title: 'Best Long Magical Realism Audiobooks: Surreal Dreams',
        slug: 'magical-realism',
        coverUrl: '/covers/one-hundred-years-of-solitude-gabriel-garcia-marquez.jpg',
        cardOverview: 'Surreal mysteries, parallel Tokyos, and mythical dynasties where the impossible blends into everyday life. Hypnotic, multi-generational sagas that truly mesmerize when heard aloud.',
        heroSubtitle: 'Wander through enchanted realities and dreamlike family dynasties where everyday life weaves seamlessly with the supernatural across audio\'s most lyrical epics.',
        editorialHeading: 'Where Myth Weaves Into Reality',
        editorialIntro: 'Magical realism treats the wondrous as ordinary and the mundane as mystical. From Gabriel García Márquez’s multigenerational Macondo in [One Hundred Years of Solitude](/book/one-hundred-years-of-solitude-gabriel-garcia-marquez/) to Haruki Murakami’s parallel dimensions, these sprawling narratives become even more hypnotic spoken aloud. Their rhythmic prose and surreal beauty create deeply contemplative, immersive escapes from modern noise.',
        description: 'Surreal mysteries, parallel Tokyos, and mythical dynasties where the impossible blends into everyday life. Hypnotic, multi-generational sagas that truly mesmerize when heard aloud.',
        bookIds: ['160', '17', '161', '162', '163', '99', '164', '165'],
        topGraphic: '/assets/Collections-Cards-Gfx/Collection-Card-Top-Sage-Green.gif',
        iconSvg: '/assets/collections-hero-images/Collections Icons SVGs/magical-realism-icon.svg',
        iconColor: '#2c5143',
        collectionNumber: '008'
    },
    {
        id: 'graphic-audio',
        title: 'The Best, Longest Cinematic Audiobooks (Full-Cast Productions)',
        slug: 'graphic-audio',
        coverUrl: '/covers/harry-potter-and-the-philosopher-s-stone-j-k-rowling.jpg',
        cardOverview: 'Experience audiobooks like movies for your ears. Our curated collection of the best, most immersive cinematic audio productions featuring full casts, sound effects, and scoring.',
        heroSubtitle: 'Transform your listening with cinematic full-cast dramatizations, atmospheric soundscapes, and orchestral scores designed for total immersion across massive multi-hour audio productions.',
        editorialHeading: 'A Movie In Your Mind',
        editorialIntro: 'Cinematic audiobooks transcend traditional single-narrator reads to create fully staged theatre for the ears. Pioneered by GraphicAudio and premier dramatized ensembles, these productions fuse diverse voice casts, bespoke orchestral scores, and meticulous Foley sound effects. From fantasy blockbusters like [Fourth Wing](/book/fourth-wing-rebecca-yarros/) to expansive space adventures, they offer pure auditory spectacle.',
        description: 'Experience audiobooks like movies for your ears. Our curated collection of the best, most immersive cinematic audio productions featuring full casts, sound effects, and scoring.',
        bookIds: ['224', '20', '152', '157', '158', '29', '153', '154', '156', '150', '151', '155', '223'],
        topGraphic: '/assets/Collections-Cards-Gfx/cc2-cinematic-top-gfx.gif'
    },
    {
        id: '1',
        slug: 'best-long-books-2025',
        title: 'The Best Long Audiobooks from 2025',
        cardOverview: 'Our curated showcase of the most immersive, critically acclaimed long-form audiobooks released or celebrated throughout 2025, offering premier marathon credit value.',
        heroSubtitle: 'Discover the standout 20+ hour audiobooks of 2025, celebrated for peerless storytelling, extraordinary voice narration, and massive credit-worthy listening depth.',
        editorialHeading: 'The Year\'s Standout Marathons',
        editorialIntro: '2025 was a landmark year for marathon listening, marked by celebrated literary achievements and ambitious genre world-building. From Paul Murray’s tragicomic Irish saga [The Bee Sting](/book/the-bee-sting-paul-murray/) to expansive historical epics, this hand-picked showcase represents the finest recent investments in runtime, vocal stamina, and lasting literary satisfaction in the audiobook medium.',
        description: 'Our curated showcase of the most immersive, critically acclaimed long-form audiobooks released or celebrated throughout 2025, offering premier marathon credit value.',
        coverUrl: '/covers/the-bee-sting-paul-murray.jpg',
        bookIds: ['97', '98', '99', '121', '100', '101', '102', '103', '106', '107', '105'],
        topGraphic: '/assets/Collections-Cards-Gfx/cc2-bestof25-top-gfx.gif'
    },
    {
        id: 'dark-academia',
        title: 'Long, Atmospheric Dark Academia Audiobook Listens',
        slug: 'dark-academia',
        coverUrl: '/covers/the-secret-history.jpg',
        cardOverview: 'Gothic campuses, intellectual obsessions, ancient languages, and dark collegiate secrets. The moodiest, most atmospheric long listens in modern audio, perfect for rainy afternoons.',
        heroSubtitle: 'Immerse yourself in brooding collegiate gothic mysteries, scholarly obsessions, and shadowy campus secrets where intellectual ambition sparks dangerous consequences.',
        editorialHeading: 'Scholarly Ambition, Gothic Shadows',
        editorialIntro: 'Dark academia marries gothic romanticism with intellectual fever dreams. Anchored by Donna Tartt’s modern classic [The Secret History](/book/the-secret-history-donna-tartt/) and R.F. Kuang’s linguistically razor-sharp [Babel](/book/babel-rf-kuang/), these atmospheric audiobooks lure listeners into cloistered libraries, obsessive Greek societies, and moral ruin. Their slow-burn tension and rich vocabulary reward attentive, marathon listening.',
        description: 'Gothic campuses, intellectual obsessions, ancient languages, and dark collegiate secrets. The moodiest, most atmospheric long listens in modern audio, perfect for rainy afternoons.',
        bookIds: ['108', '56', '109', '38', '110'],
        topGraphic: '/assets/Collections-Cards-Gfx/cc2-dark-academia-top-gfx.gif'
    },
    {
        id: 'romantasy',
        title: 'Epic Romantasy Long Audiobook Listens',
        slug: 'romantasy',
        coverUrl: '/covers/iron-flame.jpg',
        cardOverview: 'High fantasy stakes meet scorching romance. Warring courts, deadly trials, and fierce enemies-to-lovers tension across immersive 20+ hour series-launch audio sagas.',
        heroSubtitle: 'Indulge in expansive fantasy romances packed with court intrigue, winged warriors, slow-burn tension, and fierce heroines fighting for empire and heart.',
        editorialHeading: 'High Magic, Scorching Stakes',
        editorialIntro: 'Romantasy has revolutionized speculative fiction by infusing high-stakes epic fantasy with fierce romantic tension. From Sarah J. Maas’s court rivalries to Rebecca Yarros’s dragon-rider academies, these 20+ hour audiobooks deliver relentless pacing and emotional fireworks. Dynamic voice performances heighten every whispered bargain and battlefield clash into pure, binge-worthy audio addiction.',
        description: 'High fantasy stakes meet scorching romance. Warring courts, deadly trials, and fierce enemies-to-lovers tension across immersive 20+ hour series-launch audio sagas.',
        bookIds: ['224', '225', '159', '55', '113', '127', '111', '128', '112', '129', '130', '114', '147', '148'],
        topGraphic: '/assets/Collections-Cards-Gfx/cc2-romantasy-top-gfx.gif'
    },
    {
        id: 'longest-ever',
        title: 'The Longest Ever Audiobooks (60+ Hours)',
        slug: 'longest-ever',
        coverUrl: '/covers/galaxy-outlaws.jpg',
        cardOverview: 'For listeners demanding ultimate credit value. Complete collections, omnibus editions, and monumental sagas spanning 60 to 200+ hours of continuous, immersive audio.',
        heroSubtitle: 'Maximize your Audible credit with these gargantuan 60-to-200+ hour audio titans, built for cross-country commutes, marathon projects, and limitless immersion.',
        editorialHeading: 'The Ultimate Credit Return',
        editorialIntro: 'If maximum hour-per-credit value is your primary goal, these behemoths are undisputed champions. Spanning 60 to over 200 hours, these omnibus editions and complete series—like J.S. Morin’s sprawling space western [Galaxy Outlaws](/book/galaxy-outlaws-js-morin/)—deliver months of continuous entertainment. They transform a single monthly token into an almost endless listening journey.',
        description: 'For listeners demanding ultimate credit value. Complete collections, omnibus editions, and monumental sagas spanning 60 to 200+ hours of continuous, immersive audio.',
        bookIds: ['149', '146', '145', '115', '116', '10', '117', '118'],
        topGraphic: '/assets/Collections-Cards-Gfx/cc2-best-longbooks-top-gfx.gif'
    },
    {
        id: 'long-life-stories',
        title: 'Long Life Stories: Definitive Biography Audiobooks',
        slug: 'long-life-stories',
        coverUrl: '/covers/the-power-broker.jpg',
        cardOverview: 'Dive deep into the lives of history\'s most influential and complex figures. Massive, authoritative biographies delivering 25 to 60+ hours of captivating life journeys.',
        heroSubtitle: 'Experience the definitive, unabridged life chronicles of history\'s titans, innovators, and leaders through monumental multi-hour biographical audio achievements.',
        editorialHeading: 'The Weight of History',
        editorialIntro: 'Great biographies require time to capture the messy, triumphs and catastrophic flaws of monumental figures. Anchored by Robert Caro’s legendary masterpiece [The Power Broker](/book/the-power-broker-robert-a-caro/) and Ron Chernow’s definitive portraits, these 30-to-66-hour audiobooks reveal how visionaries reshape civilizations. Master narrators like Robertson Dean give these historical epics the urgency of living drama.',
        description: 'Dive deep into the lives of history\'s most influential and complex figures. Massive, authoritative biographies delivering 25 to 60+ hours of captivating life journeys.',
        bookIds: ['2', '4', '16', '18', '33', '34', '106', '119'],
        topGraphic: '/assets/Collections-Cards-Gfx/cc2-long-life-stories-gfx.gif'
    },
    {
        id: 'bucket-list',
        title: 'Bucket List Classic Long Listens',
        slug: 'bucket-list',
        coverUrl: '/covers/the-count-of-monte-cristo.jpg',
        cardOverview: 'The monumental classics everyone wants to have read, made effortless by legendary narrators. Timeless literary epics transformed from daunting tasks into unforgettable journeys.',
        heroSubtitle: 'Conquer the greatest literary epics of all time through extraordinary vocal performances that make massive classics effortless, entertaining, and deeply rewarding to finish.',
        editorialHeading: 'Timeless Epics Made Effortless',
        editorialIntro: 'We all have monumental classics we promise ourselves we’ll finish "one day." In audio, daunting literary mountains like Alexandre Dumas’s [The Count of Monte Cristo](/book/the-count-of-monte-cristo-alexandre-dumas/) and Tolstoy’s *War and Peace* become captivating, effortless pleasures. Guided by legendary voices like John Lee, these timeless sagas reveal why they have enthralled readers for centuries.',
        description: 'The monumental classics everyone wants to have read, made effortless by legendary narrators. Timeless literary epics transformed from daunting tasks into unforgettable journeys.',
        bookIds: ['6', '15', '22', '30', '32', '37', '31', '40', '87'],
        topGraphic: '/assets/Collections-Cards-Gfx/cc2-bucket-list-gfx.gif'
    }
];
