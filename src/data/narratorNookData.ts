export interface NookNarrator {
    name: string;
    bookTitle: string;
    bookSlug: string;
    audioPreviewUrl: string;
    defaultDuration: string;
}

export interface NookStyleSlide {
    id: string;
    name: string;
    slug: string;
    badgeSvg: string;
    description: string;
    narrators: NookNarrator[];
}

export const NOOK_STYLES: NookStyleSlide[] = [
    {
        id: 'fireside-warmth',
        name: 'Fireside Warmth',
        slug: 'fireside-warmth',
        badgeSvg: '/assets/narration-badges/fireside-warmth.svg',
        description: 'Vocal performances that feel like pulling up an armchair beside a crackling hearth. Characterized by rich, reassuring timbres and patient cadence that make 30+ hour journeys feel effortless.',
        narrators: [
            {
                name: 'Travis Baldree',
                bookTitle: 'Legends & Lattes',
                bookSlug: 'legends-and-lattes-travis-baldree',
                audioPreviewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview112/v4/f7/4f/e0/f74fe0f8-8106-d18c-efbf-33ecdfed0583/mzaf_12024181535094970785.std.aac.p.m4a',
                defaultDuration: '4.59'
            },
            {
                name: 'Stephen Fry',
                bookTitle: 'Mythos',
                bookSlug: 'mythos',
                audioPreviewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/54/29/3a/54293ae2-30fd-280a-d756-eaff6391eb12/mzaf_3173291034293181526.std.aac.p.m4a',
                defaultDuration: '4.59'
            },
            {
                name: 'Simon Vance',
                bookTitle: 'Dune',
                bookSlug: 'dune-frank-herbert',
                audioPreviewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview126/v4/fd/ea/d6/fdead65e-da84-0f3f-e39f-5ed24449f0dc/mzaf_11448145514866941022.std.aac.p.m4a',
                defaultDuration: '4.59'
            }
        ]
    },
    {
        id: 'character-chameleon',
        name: 'Character Chameleon',
        slug: 'character-chameleon',
        badgeSvg: '/assets/narration-badges/character-chameleon.svg',
        description: 'Acoustic virtuosos who inhabit dozens of distinct accents, ages, and non-human timbres in a single recording, transforming solo narration into an ensemble.',
        narrators: [
            {
                name: 'Rob Inglis',
                bookTitle: 'The Fellowship of the Ring',
                bookSlug: 'the-fellowship-of-the-ring-jrr-tolkien',
                audioPreviewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview122/v4/4b/21/e4/4b21e45d-0290-4a51-8dbb-bb5a5663f0f6/mzaf_5533151572874896967.std.aac.p.m4a',
                defaultDuration: '4.59'
            },
            {
                name: 'Steven Weber',
                bookTitle: 'It',
                bookSlug: 'it-stephen-king',
                audioPreviewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview126/v4/21/22/2e/21222ed6-d382-9b62-1a57-59b55add5d3e/mzaf_5794367686370882688.std.aac.p.m4a',
                defaultDuration: '4.59'
            },
            {
                name: 'Andrea Parsneau',
                bookTitle: 'The Last Light: The Wandering Inn, Book 5',
                bookSlug: 'the-last-light-the-wandering-inn-book-5-pirateaba',
                audioPreviewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/7c/18/71/7c187180-248d-e4fe-e649-de0a6b5bf4f1/mzaf_1518311293161939371.std.aac.p.m4a',
                defaultDuration: '4.59'
            }
        ]
    },
    {
        id: 'historical-gravitas',
        name: 'Historical Gravitas',
        slug: 'historical-gravitas',
        badgeSvg: '/assets/narration-badges/historical-gravitas.svg',
        description: 'Vocal mastery crafted for sweeping dynastic chronicles and monumental literary classics. An aristocratic acoustic presence that lends scholarly weight and nobility.',
        narrators: [
            {
                name: 'John Lee',
                bookTitle: 'World Without End',
                bookSlug: 'world-without-end-ken-follett',
                audioPreviewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/00/1f/63/001f63c6-6847-a6aa-2f2f-75f4924d6fd1/mzaf_12577335895571370348.std.aac.p.m4a',
                defaultDuration: '4.59'
            },
            {
                name: 'Davina Porter',
                bookTitle: 'Outlander',
                bookSlug: 'outlander-diana-gabaldon',
                audioPreviewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview112/v4/a1/83/1f/a1831f64-ed35-9a0e-67d6-8af2a9aa5ecc/mzaf_1641244748718287721.std.aac.p.m4a',
                defaultDuration: '4.59'
            },
            {
                name: 'Bill Homewood',
                bookTitle: 'The Three Musketeers',
                bookSlug: 'the-three-musketeers-alexandre-dumas',
                audioPreviewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview123/v4/df/21/a2/df21a249-8de9-0b52-d0cf-4ccbca8e9758/mzaf_17864712662794196810.std.aac.p.m4a',
                defaultDuration: '4.59'
            }
        ]
    },
    {
        id: 'propulsive-momentum',
        name: 'Propulsive Momentum',
        slug: 'propulsive-momentum',
        badgeSvg: '/assets/narration-badges/propulsive-momentum.svg',
        description: 'Adrenaline-fueled narration built for frantic battlefields, high-stakes space opera, and relentless thrillers. Blistering kinetic velocity and electric suspense.',
        narrators: [
            {
                name: 'Tim Gerard Reynolds',
                bookTitle: 'Red Rising',
                bookSlug: 'red-rising',
                audioPreviewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview112/v4/99/69/e0/9969e04e-748d-1805-905e-220202c7af13/mzaf_12928114902434950233.std.aac.p.m4a',
                defaultDuration: '4.59'
            },
            {
                name: 'Scott Brick',
                bookTitle: 'Jurassic Park: A Novel',
                bookSlug: 'jurassic-park-michael-crichton',
                audioPreviewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/de/5d/2d/de5d2d17-268a-3eed-e189-d0c515ef3822/mzaf_8300171163661841423.std.aac.p.m4a',
                defaultDuration: '4.59'
            },
            {
                name: 'Jefferson Mays',
                bookTitle: 'Judas Unchained',
                bookSlug: 'judas-unchained-peter-f-hamilton',
                audioPreviewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview112/v4/ef/ca/b5/efcab517-c9e9-1b43-a819-75030f7ff68d/mzaf_4701766184006568977.std.aac.p.m4a',
                defaultDuration: '4.59'
            }
        ]
    },
    {
        id: 'satirical-bite',
        name: 'Satirical Bite',
        slug: 'satirical-bite',
        badgeSvg: '/assets/narration-badges/satirical-bite.svg',
        description: 'Masters of deadpan delivery, sardonic wit, and joyful absurdism. Delivering dialogue with an acoustic wink that makes biting social satire and cynical antiheroes crackle.',
        narrators: [
            {
                name: 'Steven Pacey',
                bookTitle: 'The Blade Itself',
                bookSlug: 'the-blade-itself-joe-abercrombie',
                audioPreviewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/bd/c8/e3/bdc8e355-ad2f-53b4-90d5-42ecab58958f/mzaf_13223217077266085063.std.aac.p.m4a',
                defaultDuration: '4.59'
            },
            {
                name: 'Jeff Hays',
                bookTitle: 'Dungeon Crawler Carl',
                bookSlug: 'dungeon-crawler-carl-matt-dinniman',
                audioPreviewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/b2/8b/8c/b28b8c9f-43e5-537b-a90c-5b741ed33b72/mzaf_17269727664169868612.std.aac.p.m4a',
                defaultDuration: '4.59'
            },
            {
                name: 'Sean Barrett',
                bookTitle: 'Slow Horses',
                bookSlug: 'slow-horses',
                audioPreviewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/bb/de/00/bbde002c-5247-cc7b-1a2f-861c9acceabd/mzaf_12821094610153530489.std.aac.p.m4a',
                defaultDuration: '4.59'
            }
        ]
    },
    {
        id: 'dialect-immersion',
        name: 'Dialect Immersion',
        slug: 'dialect-immersion',
        badgeSvg: '/assets/narration-badges/dialect-immersion.svg',
        description: 'Performances where regional accents, intricate world languages, and foreign dialects are executed with dialect-coach precision and deep cultural fidelity.',
        narrators: [
            {
                name: 'Michael Page',
                bookTitle: 'The Lies of Locke Lamora',
                bookSlug: 'the-lies-of-locke-lamora-scott-lynch',
                audioPreviewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview113/v4/77/56/b4/7756b4ac-dcad-b032-b9bf-2a21b8b79ea8/mzaf_6568486364811724702.std.aac.p.m4a',
                defaultDuration: '4.59'
            },
            {
                name: 'Emily Woo Zeller',
                bookTitle: 'The Poppy War',
                bookSlug: 'the-poppy-war-rf-kuang',
                audioPreviewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview123/v4/e9/4e/34/e94e34ab-6acb-11c1-7482-023f35292615/mzaf_554599645715417128.std.aac.p.m4a',
                defaultDuration: '4.59'
            },
            {
                name: 'Heath Miller',
                bookTitle: 'He Who Fights with Monsters: A LitRPG Adventure',
                bookSlug: 'he-who-fights-with-monsters-shirtaloon-travis-deverell',
                audioPreviewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/ca/6c/e2/ca6ce2a9-4d6a-0b85-9967-0648268344b5/mzaf_7692692550407077818.std.aac.p.m4a',
                defaultDuration: '4.59'
            }
        ]
    },
    {
        id: 'dual-pov-synergy',
        name: 'Dual-POV Synergy',
        slug: 'dual-pov-synergy',
        badgeSvg: '/assets/narration-badges/dual-pov-synergy.svg',
        description: 'Electric vocal partnerships where alternating narrators bring contrasting perspectives to life. Balanced dramatic tension and sizzling chemistry across alternating chapters.',
        narrators: [
            {
                name: 'Michael Kramer & Kate Reading',
                bookTitle: 'The Way of Kings',
                bookSlug: 'the-way-of-kings-brandon-sanderson',
                audioPreviewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview116/v4/dd/b2/69/ddb2695f-0ced-413f-9928-74cf742d0331/mzaf_12813721420181694724.std.aac.p.m4a',
                defaultDuration: '4.59'
            }
        ]
    }
];
