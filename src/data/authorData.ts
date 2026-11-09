export interface AuthorProfile {
    slug: string;
    name: string;
    editorialBio?: string;
    relatedCollectionSlugs?: string[];
    recommendedBookIds?: string[];
}

export const authorProfiles: Record<string, AuthorProfile> = {
    'neil-gaiman': {
        slug: 'neil-gaiman',
        name: 'Neil Gaiman',
        editorialBio: "Literary icon, master mythologist, and celebrated narrator Neil Gaiman crafts darkly whimsical, folkloric masterpieces that reawaken ancient oral traditions. Renowned for his distinctively warm, hypnotic British vocal cadence, Gaiman brings timeless vitality, sly wit, and profound poetic gravity to the gods, monsters, and mortal mortals of ancient Norse myth and modern fantasy.",
        relatedCollectionSlugs: ['mythology-epics'],
        recommendedBookIds: ['508', '197', '205']
    },
    'james-islington': {
        slug: 'james-islington',
        name: 'James Islington',
        editorialBio: "Australian fantasy sensation James Islington constructs monumental, labyrinthine epics defined by clockwork plotting, ancient mysteries, and morally complex protagonists. His acclaimed Hierarchy saga—anchored by *The Will of the Many* and *The Strength of the Few*—blends Roman-inspired academy intrigue with terrifying pyramidal power systems, brought to life through Euan Morton's aristocratic vocal brilliance.",
        relatedCollectionSlugs: ['hard-magic-systems', 'grimdark-fantasy'],
        recommendedBookIds: ['492', '493', '13']
    },
    'brent-weeks': {
        slug: 'brent-weeks',
        name: 'Brent Weeks',
        editorialBio: "New York Times bestselling titan Brent Weeks is a master of relentless pacing, gritty tactical warfare, and innovative, rule-driven magic systems. Across his celebrated five-volume Lightbringer quintet—narrated with peerless versatility by Audie Award winner Simon Vance—Weeks crafts a kaleidoscopic world where light itself is transformed into weaponized matter through the science of Chromaturgy.",
        relatedCollectionSlugs: ['hard-magic-systems', 'grimdark-fantasy'],
        recommendedBookIds: ['494', '495', '496']
    },
    'robert-jackson-bennett': {
        slug: 'robert-jackson-bennett',
        name: 'Robert Jackson Bennett',
        editorialBio: "Shirley Jackson and World Fantasy Award winner Robert Jackson Bennett writes high-octane speculative fiction featuring razor-sharp social commentary, cyberpunk sensibilities, and inventive industrial magic. His acclaimed Founders Trilogy—narrated with gritty underworld energy by Tara Sands—imagines a world where reality itself is hacked through the ancient programming language of scriving.",
        relatedCollectionSlugs: ['hard-magic-systems'],
        recommendedBookIds: ['499', '500', '501']
    },
    'andrew-rowe': {
        slug: 'andrew-rowe',
        name: 'Andrew Rowe',
        editorialBio: "Game designer and progression fantasy pioneer Andrew Rowe crafts deeply analytical, puzzle-solving audio epics where magic operates with the systematic precision of computer code and tactical RPGs. His beloved Arcane Ascension saga—brought to life with infectious comedic charm and emotional sincerity by Nick Podehl—turns tower climbing, enchanting, and spire survival into an addictive modern listening obsession.",
        relatedCollectionSlugs: ['hard-magic-systems', 'litrpg-gamelit'],
        recommendedBookIds: ['502', '503', '504']
    },
    'alexandre-dumas': {
        slug: 'alexandre-dumas',
        name: 'Alexandre Dumas',
        editorialBio: "The undisputed titan of nineteenth-century French serial adventure, Alexandre Dumas transformed high-stakes political intrigue, swashbuckling swordplay, and elaborate vendettas into immortal epics. In unabridged audio performed with aristocratic flair by John Lee, masterworks like *The Count of Monte Cristo* and *The Three Musketeers* become breathtaking, marathon listening experiences filled with unforgettable duelists, palace conspiracies, and fierce brotherhood.",
        relatedCollectionSlugs: ['bucket-list'],
        recommendedBookIds: ['15', '31', '21'] // Les Misérables (15), Don Quixote (31), The Pillars of the Earth (21)
    },
    'doris-kearns-goodwin': {
        slug: 'doris-kearns-goodwin',
        name: 'Doris Kearns Goodwin',
        editorialBio: "Pulitzer Prize-winning presidential historian Doris Kearns Goodwin crafts monumental biographical tapestries that reveal the human relationships, political rivalries, and moral convictions driving America's most transformative leadership eras. In exhaustive, narrative-driven epics like *Team of Rivals* and *The Bully Pulpit*, executive statecraft becomes an intimate, gripping masterclass in moral courage, coalition building, and national resilience.",
        relatedCollectionSlugs: ['bucket-list'],
        recommendedBookIds: ['2', '232', '444'] // The Power Broker (2), Nicholas and Alexandra (232), The Romanovs (444)
    },
    'patrick-rothfuss': {
        slug: 'patrick-rothfuss',
        name: 'Patrick Rothfuss',
        editorialBio: "Patrick Rothfuss redefined modern heroic fantasy with The Kingkiller Chronicle, weaving lyrical prose, intricate sympathy magic, and an unforgettable unreliable narrator in Kvothe the Bloodless. Revered across the audiobook community for Nick Podehl's emotive pacing and Rupert Degas's chameleonic characterizations, Rothfuss's expansive audio editions reward immersive, patient listening with poetic resonance and deep narrative craft.",
        relatedCollectionSlugs: ['grimdark-fantasy'],
        recommendedBookIds: ['13', '182', '181'] // The Way of Kings (13), The Lies of Locke Lamora (182), The Blade Itself (181)
    },
    'samantha-shannon': {
        slug: 'samantha-shannon',
        name: 'Samantha Shannon',
        editorialBio: "Samantha Shannon crafts ambitious, richly feminist high fantasy set across the sweeping tapestry of the Roots of Chaos universe. Featuring complex political alliances, distinct dragon cultures, and profound sapphic relationships, her standalone epics—such as *The Priory of the Orange Tree* and *A Day of Fallen Night*—deliver expansive, mythic audio journeys narrated with breathtaking grandeur by Liyah Summers.",
        relatedCollectionSlugs: ['dark-academia'],
        recommendedBookIds: ['56', '108', '464'] // Babel (56), The Secret History (108), She Who Became the Sun (464)
    },
    'callie-hart': {
        slug: 'callie-hart',
        name: 'Callie Hart',
        editorialBio: "Callie Hart delivers scorching, dark-edged romantasy propelled by fierce heroines, morally gray fae warriors, and relentless enemies-to-lovers tension. Set against brutal elemental trials and ancient blood magic in the Fae & Alchemy saga, her expansive audio editions combine breathless emotional stakes with magnetic chemistry for an addictive marathon listen.",
        relatedCollectionSlugs: ['romantasy'],
        recommendedBookIds: ['127', '111', '225'] // Fourth Wing (127), Iron Flame (111), A Court of Thorns and Roses (225)
    },
    'bryce-oconnor-luke-chmilenko': {
        slug: 'bryce-oconnor-luke-chmilenko',
        name: "Bryce O'Connor & Luke Chmilenko",
        editorialBio: "Collaborating on the blockbuster Warformed: Stormweaver saga, Bryce O'Connor and Luke Chmilenko engineered a benchmark in military sci-fi progression fantasy. Brought to life through Luke Daniels's kinetic, multi-voiced vocal delivery, Rei Keidon's underdog journey through the Astra Academy blends high-octane CAD cybernetic arena combat with fiercely loyal squad camaraderie.",
        relatedCollectionSlugs: ['litrpg-gamelit'],
        recommendedBookIds: ['166', '168', '167'] // Dungeon Crawler Carl (166), Defiance of the Fall (168), He Who Fights with Monsters (167)
    },
    'victoria-goddard': {
        slug: 'victoria-goddard',
        name: 'Victoria Goddard',
        editorialBio: "Victoria Goddard writes quiet, monumental masterpieces of cozy political fantasy and found family across the Nine Worlds. Chronicling the life and service of Kip, the diligent Lord Chancellor who gently reforms an entire world-spanning empire, Goddard's audiobooks celebrate platonic love, administrative heroism, and deep cultural bridge-building, narrated with immense dignity and warmth by Michael Page.",
        relatedCollectionSlugs: ['cozy-fantasy'],
        recommendedBookIds: ['192', '194', '193'] // Legends & Lattes (192), Can't Spell Treason Without Tea (194), The Goblin Emperor (193)
    },
    'travis-baldree': {
        slug: 'travis-baldree',
        name: 'Travis Baldree',
        editorialBio: "Both a prolific, award-winning audiobook narrator and the New York Times bestselling author who ignited the global cozy fantasy movement, Travis Baldree crafts low-stakes, high-comfort stories of found family and reinvention. Narrating his own work with signature comedic timing and gravelly warmth, Viv the orc's journey from veteran warrior to coffeehouse pioneer is the ultimate warm-hug listening experience.",
        relatedCollectionSlugs: ['cozy-fantasy'],
        recommendedBookIds: ['190', '194', '193'] // The Hands of the Emperor (190), Can't Spell Treason Without Tea (194), The Goblin Emperor (193)
    },
    'rebecca-thorne': {
        slug: 'rebecca-thorne',
        name: 'Rebecca Thorne',
        editorialBio: "Rebecca Thorne blends cozy fantasy charm with witty banter, small-town sleuthing, and cozy sapphic romance in the beloved Tomes & Tea series. Following a royal battle-mage and the queen's chief bodyguard who leave palace intrigue behind to open a quiet remote tea shop, Thorne's audiobooks deliver delightful escapism brimming with tea magic, grumpy townsfolk, and sweet domestic bliss.",
        relatedCollectionSlugs: ['cozy-fantasy'],
        recommendedBookIds: ['192', '190', '193'] // Legends & Lattes (192), The Hands of the Emperor (190), The Goblin Emperor (193)
    },
    'madeline-miller': {
        slug: 'madeline-miller',
        name: 'Madeline Miller',
        editorialBio: "Madeline Miller transforms ancient classical mythology into luminous, deeply human modern audio epics. With peerless lyrical precision, *The Song of Achilles* and *Circe* unearth the intimate emotional vulnerabilities and fiercely enduring loves beneath legendary epics, brought to transcendent life through award-winning, hypnotic narration by Frazer Douglas and Perdita Weeks.",
        relatedCollectionSlugs: ['mythology-epics'],
        recommendedBookIds: ['204', '199', '200'] // Ithaca (204), Mythos (199), Clytemnestra (200)
    },
    'claire-north': {
        slug: 'claire-north',
        name: 'Claire North',
        editorialBio: "Writing under the pen name Claire North, Catherine Webb crafts fiercely original speculative fiction exploring the emotional and moral weight of memory, immortality, and agency. From the time-looping, mnemonic brilliance of *The First Fifteen Lives of Harry August* to the mythic, matriarchal cunning of *Ithaca*, North's audiobooks challenge perception with razor-sharp philosophical wit and rich atmosphere.",
        relatedCollectionSlugs: ['time-travel'],
        recommendedBookIds: ['7', '475', '472'] // 11/22/63 (7), Doomsday Book (475), The Ministry of Time (472)
    },
    'arkady-martine': {
        slug: 'arkady-martine',
        name: 'Arkady Martine',
        editorialBio: "Historian and city planner Arkady Martine made science fiction history by winning back-to-back Hugo Awards for Best Novel with her Teixcalaan space opera duology. Navigating the treacherous poetry, neural memories, and imperial court intrigues of a rapacious galactic empire, Martine's razor-sharp prose—performed with crystalline elegance by Amy Landon—is a masterclass in political intrigue and cultural identity.",
        relatedCollectionSlugs: ['space-opera'],
        recommendedBookIds: ['212', '64', '213'] // Ancillary Justice (212), Leviathan Wakes (64), Children of Time (213)
    },
    'karin-smirnoff': {
        slug: 'karin-smirnoff',
        name: 'Karin Smirnoff',
        editorialBio: "Selected by the Stieg Larsson estate to carry forward the worldwide Millennium phenomenon, Swedish literary author Karin Smirnoff injects fierce Nordic noir grit and sharp environmental urgency into Lisbeth Salander and Mikael Blomkvist's contemporary investigations. Set against the freezing, wind-scoured expanses of northern Sweden, Smirnoff's audiobooks deliver uncompromising suspense, corruption, and righteous vengeance.",
        relatedCollectionSlugs: ['nordic-noir'],
        recommendedBookIds: ['173', '175', '176'] // The Girl with the Dragon Tattoo (173), The Chestnut Man (175), The Hypnotist (176)
    },
    'shelley-parker-chan': {
        slug: 'shelley-parker-chan',
        name: 'Shelley Parker-Chan',
        editorialBio: "Shelley Parker-Chan reimagines the rise of China's Ming Dynasty in the extraordinary, queer silkpunk duology *The Radiant Emperor*. Through intense psychological examinations of ruthless political ambition, bodily autonomy, and prophesied greatness, Parker-Chan's gripping audiobooks—narrated with dramatic gravitas by Natalie Naudus—deliver a ferocious epic of survival and imperial destiny.",
        relatedCollectionSlugs: ['silkpunk'],
        recommendedBookIds: ['454', '185', '468'] // The Grace of Kings (454), The Poppy War (185), Jade City (468)
    },
    'mary-shelley': {
        slug: 'mary-shelley',
        name: 'Mary Shelley',
        editorialBio: "At just eighteen years old during the volcanic 'Year Without a Summer' of 1816, Mary Wollstonecraft Shelley invented modern science fiction with *Frankenstein*—replacing divine creation with human hubris and moral reckoning. A decade later in 1826, she performed an equally astonishing feat by publishing *The Last Man*, inventing the secular post-apocalyptic novel and following a solitary wanderer across a plague-emptied Europe. In audio format, Shelley's sweeping Romantic prose sheds its nineteenth-century schoolroom intimidation, transforming into intimate, psychologically devastating marathons of isolation, ambition, and humanity.",
        relatedCollectionSlugs: ['post-apocalyptic-survival'],
        recommendedBookIds: ['487', '3', '155'] // Wool (487), The Stand (3), Dracula (155)
    }
};
