import { slugify } from '../utils/slugify';

export type NarratorStyleBadgeId =
    | 'character-chameleon'
    | 'historical-gravitas'
    | 'fireside-warmth'
    | 'propulsive-momentum'
    | 'satirical-bite'
    | 'dialect-immersion'
    | 'dual-pov-synergy';

export type NarratorMarathonBadgeId =
    | '50-club'
    | '100-club'
    | '200-club'
    | '300-club'
    | '500-club'
    | '1000-club';

export type NarratorBadgeId = NarratorStyleBadgeId | NarratorMarathonBadgeId;

export interface NarratorBadgeDef {
    id: NarratorBadgeId;
    name: string;
    labelLines: [string, string];
    imageUrl: string;
    heroGraphicUrl?: string;
    tooltip: string;
}

export const NARRATOR_BADGES: Record<NarratorBadgeId, NarratorBadgeDef> = {
    'character-chameleon': {
        id: 'character-chameleon',
        name: 'Character Chameleon',
        labelLines: ['Character', 'Chameleon'],
        imageUrl: '/assets/narration-badges/Character-Chameleon.png',
        heroGraphicUrl: '/assets/narration-badges/character-chameleon.svg',
        tooltip: 'Awarded to voice actors who seamlessly inhabit dozens of distinct character voices, ages, and timbres within a single marathon epic.'
    },
    'historical-gravitas': {
        id: 'historical-gravitas',
        name: 'Historical Gravitas',
        labelLines: ['Historical', 'Gravitas'],
        imageUrl: '/assets/narration-badges/Historical-Gravitas.png',
        heroGraphicUrl: '/assets/narration-badges/historical-gravitas.svg',
        tooltip: 'Recognizes commanding vocal weight, classical authority, and statesmanship suited to grand historical and epic world-building.'
    },
    'fireside-warmth': {
        id: 'fireside-warmth',
        name: 'Fireside Warmth',
        labelLines: ['Fireside', 'Warmth'],
        imageUrl: '/assets/narration-badges/Fireside-Warmth.png',
        heroGraphicUrl: '/assets/narration-badges/fireside-warmth.svg',
        tooltip: 'Celebrates an inviting, intimate, and deeply comforting storytelling cadence that makes 30+ hour listens feel effortless.'
    },
    'propulsive-momentum': {
        id: 'propulsive-momentum',
        name: 'Propulsive Momentum',
        labelLines: ['Propulsive', 'Momentum'],
        imageUrl: '/assets/narration-badges/Propulsive-Momentum.png',
        heroGraphicUrl: '/assets/narration-badges/propulsive-momentum.svg',
        tooltip: 'Honors high-energy pacing and razor-sharp narrative drive that keeps massive action and thriller epics moving at breakneck speed.'
    },
    'satirical-bite': {
        id: 'satirical-bite',
        name: 'Satirical Bite',
        labelLines: ['Satirical', 'Bite'],
        imageUrl: '/assets/narration-badges/Satirical-Bite.png',
        heroGraphicUrl: '/assets/narration-badges/satirical-bite.svg',
        tooltip: 'Awarded for masterclass comedic timing, dry wit, and sardonic irony across complex literary and genre fiction.'
    },
    'dialect-immersion': {
        id: 'dialect-immersion',
        name: 'Dialect Immersion',
        labelLines: ['Dialect', 'Immersion'],
        imageUrl: '/assets/narration-badges/Dialect-Immersion.png',
        heroGraphicUrl: '/assets/narration-badges/dialect-immersion.svg',
        tooltip: 'Recognizes authentic mastery of regional accents, global dialects, and linguistic nuance across sprawling casts.'
    },
    'dual-pov-synergy': {
        id: 'dual-pov-synergy',
        name: 'Dual-POV Synergy',
        labelLines: ['Dual-POV', 'Synergy'],
        imageUrl: '/assets/narration-badges/Dual-POV-Energy.png',
        heroGraphicUrl: '/assets/narration-badges/dual-pov-synergy.svg',
        tooltip: 'Celebrates seamless multi-narrator chemistry and unified world-building across alternating perspective chapters.'
    },
    '50-club': {
        id: '50-club',
        name: '50+ Hour Club',
        labelLines: ['50+ hrs', 'Narration'],
        imageUrl: '/assets/narration-badges/50-Hour-club.png',
        tooltip: 'Earned by narrators with over 50 hours of curated marathon audiobooks in The Long Book Club catalog.'
    },
    '100-club': {
        id: '100-club',
        name: '100+ Hour Club',
        labelLines: ['100+ hrs', 'Narration'],
        imageUrl: '/assets/narration-badges/100-club.png',
        tooltip: 'Earned by narrators surpassing 100 hours of curated long-form audiobooks in The Long Book Club catalog.'
    },
    '200-club': {
        id: '200-club',
        name: '200+ Hour Club',
        labelLines: ['200+ hrs', 'Narration'],
        imageUrl: '/assets/narration-badges/200-club.png',
        tooltip: 'Earned by narrators surpassing 200 hours of curated long-form audiobooks in The Long Book Club catalog.'
    },
    '300-club': {
        id: '300-club',
        name: '300+ Hour Club',
        labelLines: ['300+ hrs', 'Narration'],
        imageUrl: '/assets/narration-badges/300-club.png',
        tooltip: 'Earned by narrators surpassing 300 hours of curated long-form audiobooks in The Long Book Club catalog.'
    },
    '500-club': {
        id: '500-club',
        name: '500+ Hour Club',
        labelLines: ['500+ hrs', 'Narration'],
        imageUrl: '/assets/narration-badges/500-club.png',
        tooltip: 'Silver Tier: Awarded to elite marathon narrators surpassing 500 hours of curated audiobooks in The Long Book Club catalog.'
    },
    '1000-club': {
        id: '1000-club',
        name: '1000+ Hour Club',
        labelLines: ['1000+ hrs', 'Narration'],
        imageUrl: '/assets/narration-badges/1000-club.png',
        tooltip: 'Gold Tier: Our highest endurance honor, reserved for legendary narrators with over 1,000 hours in The Long Book Club catalog.'
    }
};

export interface NarratorStyleHubDef {
    id: NarratorStyleBadgeId;
    name: string;
    tagline: string;
    seoTitle: string;
    metaDescription: string;
    description: string;
    honoredTitle?: string;
    hallmarkTraits: string[];
}

export const NARRATOR_STYLE_HUBS: Record<NarratorStyleBadgeId, NarratorStyleHubDef> = {
    'fireside-warmth': {
        id: 'fireside-warmth',
        name: 'Fireside Warmth',
        tagline: 'Warm, Intimate & Deeply Comforting Storytelling',
        seoTitle: 'Fireside Warmth: Comforting & Cozy Audiobook Narrators',
        metaDescription: 'Discover the warmest, most comforting audiobook narrators in long-form literature. Explore epic audiobooks narrated with intimate fireside warmth.',
        description: 'Vocal performances that feel like pulling up an armchair beside a crackling hearth on a stormy evening. Characterized by rich, reassuring timbres, patient and musical cadence, and an unmistakable sense of literary companionship that makes 30+ hour journeys feel effortless.',
        honoredTitle: 'Narrators Honored with Intimate Cadence and Comforting Warmth',
        hallmarkTraits: ['Comforting Timbres', 'Intimate Pacing', 'Reassuring Presence', 'Story-Hour Richness']
    },
    'historical-gravitas': {
        id: 'historical-gravitas',
        name: 'Historical Gravitas',
        tagline: 'Scholarly, Epic & Authoritative Classical Presence',
        seoTitle: 'Historical Gravitas: Epic & Authoritative Audiobook Narrators',
        metaDescription: 'Explore the most authoritative, classically commanding voice actors in historical fiction, feudal fantasy, and timeless literary epics.',
        description: 'Vocal mastery crafted for sweeping dynastic chronicles, ancient battlegrounds, and monumental literary classics. An aristocratic, commanding acoustic presence that lends scholarly weight, dignified statesmanship, and timeless nobility to colossal narratives.',
        honoredTitle: 'Narrators Honored with Weight of History and Epic Stories',
        hallmarkTraits: ['Classical Authority', 'Aristocratic Diction', 'Epic Statesmanship', 'Scholarly Weight']
    },
    'propulsive-momentum': {
        id: 'propulsive-momentum',
        name: 'Propulsive Momentum',
        tagline: 'High-Velocity, Breathless & Kinetic Pacing',
        seoTitle: 'Propulsive Momentum: High-Energy & Action Audiobook Narrators',
        metaDescription: 'Find high-octane, breathless audiobooks driven by relentless narrative momentum. Discover voice artists who command massive action and sci-fi epics.',
        description: 'Adrenaline-fueled narration built for frantic battlefields, high-stakes space opera dogfights, and relentless thriller pacing. Narrators who maintain blistering kinetic velocity and electric suspense without sacrificing emotional clarity or character heart.',
        honoredTitle: 'Narrators Honored with High Velocity and Relentless Pacing',
        hallmarkTraits: ['Kinetic Energy', 'Relentless Drive', 'High-Stakes Tension', 'Breathless Velocity']
    },
    'character-chameleon': {
        id: 'character-chameleon',
        name: 'Character Chameleon',
        tagline: 'Elastic Vocal Range & Dazzling Multi-Voice Ensembles',
        seoTitle: 'Character Chameleon: Multi-Voice Ensemble Audiobook Narrators',
        metaDescription: 'Meet the greatest vocal chameleons in audiobook narration. Voice artists who inhabit dozens of distinct accents, ages, and creatures in a single epic.',
        description: 'Acoustic virtuosos who transform their vocal cords into bustling, living worlds. Instantly distinguishable accents, physical postures, ages, and non-human timbres that turn a single microphone into a full-cast theatrical performance.',
        honoredTitle: 'Narrators Honored with Elastic Range and Multi-Voice Virtuosity',
        hallmarkTraits: ['Elastic Range', 'Distinctive Timbres', 'Ensemble Virtuosity', 'Idiosyncratic Dialects']
    },
    'dual-pov-synergy': {
        id: 'dual-pov-synergy',
        name: 'Dual-POV Energy',
        tagline: 'Crackling Romantic Chemistry & Alternating Perspectives',
        seoTitle: 'Dual-POV Energy: Best Multi-Narrator Fantasy & Romance Audiobooks',
        metaDescription: 'Explore sensationally popular dual-narrated audiobooks featuring sizzling romantic tension, alternating chapters, and powerhouse vocal duos.',
        description: 'Electric vocal partnerships where alternating narrators bring contrasting male and female, rival, or lovers’ perspectives to life. Balanced dramatic tension, complementary pacing, and sizzling acoustic chemistry that elevate romantasy and epic dual sagas.',
        honoredTitle: 'Narrators Honored with Crackling Chemistry and Dual Perspectives',
        hallmarkTraits: ['Electric Chemistry', 'Alternating Perspectives', 'Romantic Tension', 'Balanced Energy']
    },
    'satirical-bite': {
        id: 'satirical-bite',
        name: 'Satirical Bite',
        tagline: 'Razor-Sharp Irony, Dry Wit & Comedic Timing',
        seoTitle: 'Satirical Bite: Witty, Dry & Comedic Audiobook Narrators',
        metaDescription: 'Experience dry British wit, sardonic irony, and comedic audiobooks narrated by masters of deadpan delivery and razor-sharp satire.',
        description: 'Narrators who excel at deadpan delivery, sardonic Cold War understatements, and joyful absurdism. Delivering dialogue with an acoustic wink that makes biting social satire, dark comedy, and cynical antiheroes crackle with life.',
        honoredTitle: 'Narrators Honored with Razor-Sharp Irony and Comedic Timing',
        hallmarkTraits: ['Sardonic Irony', 'Deadpan Delivery', 'Comedic Timing', 'Wry Understatement']
    },
    'dialect-immersion': {
        id: 'dialect-immersion',
        name: 'Dialect Immersion',
        tagline: 'Flawless Regional Accents & Cultural Fidelity',
        seoTitle: 'Dialect Immersion: Authentic Regional & International Audiobook Accents',
        metaDescription: 'Discover audiobook narrators renowned for authentic regional dialects, cultural fidelity, and linguistics across massive world-spanning casts.',
        description: 'Performances where regional accents, intricate world languages, and foreign dialects are executed with dialect-coach precision and deep cultural fidelity. Grounding the listener in authentic acoustic geography across centuries and continents.',
        honoredTitle: 'Narrators Honored with Flawless Accents and Linguistic Immersion',
        hallmarkTraits: ['Regional Authenticity', 'Dialect Precision', 'Linguistic Nuance', 'Cultural Fidelity']
    }
};

/**
 * Returns only the single highest marathon hours badge earned by a narrator.
 */
export function getHighestMarathonBadge(totalHours: number): NarratorBadgeDef | null {
    if (totalHours >= 1000) return NARRATOR_BADGES['1000-club'];
    if (totalHours >= 500) return NARRATOR_BADGES['500-club'];
    if (totalHours >= 300) return NARRATOR_BADGES['300-club'];
    if (totalHours >= 200) return NARRATOR_BADGES['200-club'];
    if (totalHours >= 100) return NARRATOR_BADGES['100-club'];
    if (totalHours >= 50) return NARRATOR_BADGES['50-club'];
    return null;
}

export function getNarratorsByStyle(styleId: NarratorStyleBadgeId): NarratorProfile[] {
    return Object.values(narratorData).filter(p => p.styleBadges.includes(styleId));
}

export const CURATED_SINGLE_STYLES: Record<string, NarratorStyleBadgeId> = {
    'sean-pratt': 'satirical-bite',          // Infinite Jest - dry wit, ironic detachment
    'robertson-dean': 'historical-gravitas', // The Power Broker - deep bass-baritone, moral authority
    'raul-esparza': 'propulsive-momentum',   // Under the Dome - breathless, high-octane tension
    'bill-homewood': 'historical-gravitas',  // Les Misérables - theatrical flair, gravitas
    'humphrey-bower': 'dialect-immersion',   // Shantaram - masterclass Australian/Indian dialects
    'joanne-froggatt': 'dialect-immersion',  // Wuthering Heights - authentic Yorkshire dialect
    'david-timson': 'historical-gravitas',   // Decline and Fall of the Roman Empire - monumental classical authority
    'steven-weber': 'character-chameleon',   // It - extraordinary vocal range for Pennywise and Derry cast
    'craig-wasson': 'fireside-warmth',       // 11/22/63 - intimate, nostalgic, deeply empathetic
    'david-pittu': 'character-chameleon',    // The Goldfinch - Audie-winning character distinctions (Boris, Hobie)
    'anthony-heald': 'historical-gravitas',  // Crime and Punishment - psychological weight and Russian depth
    'maggie-gyllenhaal': 'fireside-warmth',  // Anna Karenina - intimate, emotionally vulnerable warmth
    'luke-thompson': 'historical-gravitas',  // The Brothers Karamazov - philosophical Russian gravitas
    'maureen-obrien': 'fireside-warmth',     // Middlemarch - refined, comforting Victorian companionship
    'miriam-margolyes': 'character-chameleon' // Bleak House - dazzling Dickensian caricature and character voices
};

const STYLE_KEYWORDS: Record<NarratorStyleBadgeId, string[]> = {
    'dual-pov-synergy': [
        'dual narration', 'dual pov', 'split pov', 'alternating pov', 'alternating chapter',
        'trio', 'co-narrator', 'vocal chemistry', 'shared narration', 'full cast', 'ensemble cast', 'pairing'
    ],
    'dialect-immersion': [
        'dialect', 'accent', 'brogue', 'drawl', 'regional', 'vernacular', 'slang',
        'australian', 'irish', 'scottish', 'welsh', 'southern', 'cockney', 'yorkshire',
        'caribbean', 'linguistic', 'cultural authenticity', 'inflection'
    ],
    'satirical-bite': [
        'satir', 'sardonic', 'deadpan', 'irony', 'ironic', 'dry wit', 'humor', 'humour',
        'wry', 'wit and', 'comedic', 'absurd', 'black comedy', 'parody', 'cynical', 'tongue-in-cheek'
    ],
    'propulsive-momentum': [
        'propulsive', 'kinetic', 'high-octane', 'breathless', 'urgency',
        'relentless', 'adrenaline', 'fast-paced', 'driving momentum',
        'suspense', 'frenetic', 'breakneck', 'rollercoaster', 'blistering'
    ],
    'character-chameleon': [
        'chameleon', 'dozens of distinct', 'distinct character voices', 'vocal range', 'elastic',
        'multitude of voices', 'each character distinct', 'voice for every', 'character differentiation',
        'character distinction', 'flawless vocal distinction', 'huge cast', 'sprawling cast of voices',
        'characterization', 'caricature'
    ],
    'historical-gravitas': [
        'gravitas', 'classical', 'aristocratic', 'stately', 'majesty', 'nobility', 'commanding',
        'weight', 'monumental', 'oratorical', 'dignified', 'scholarly', 'epic scope', 'statesmanship',
        'authoritative', 'formal', 'sonorous', 'bass-baritone'
    ],
    'fireside-warmth': [
        'warm', 'warmth', 'fireside', 'cozy', 'comfort', 'intimate', 'gentle', 'reassuring',
        'hearth', 'bedtime', 'armchair', 'soothing', 'companion', 'storyteller', 'unhurried',
        'friendly', 'velvety', 'conversational', 'empathy', 'empathetic', 'heartfelt'
    ]
};

export function getSingleNarratorDominantStyle(
    narratorName: string,
    book?: { title?: string; soundCheck?: string; narrator?: string; genre?: string | string[] }
): NarratorStyleBadgeId {
    const slug = slugify(narratorName);
    if (CURATED_SINGLE_STYLES[slug]) {
        return CURATED_SINGLE_STYLES[slug];
    }

    const sc = book?.soundCheck || '';
    const lower = sc.toLowerCase();
    const isMulti = (book?.narrator || '').includes(',') || (book?.narrator || '').includes('&') || (book?.narrator || '').includes(' and ');

    const scores: Record<NarratorStyleBadgeId, number> = {
        'dual-pov-synergy': 0,
        'dialect-immersion': 0,
        'satirical-bite': 0,
        'propulsive-momentum': 0,
        'character-chameleon': 0,
        'historical-gravitas': 0,
        'fireside-warmth': 0
    };

    if (isMulti) {
        scores['dual-pov-synergy'] += 4;
    }

    for (const [style, keywords] of Object.entries(STYLE_KEYWORDS) as [NarratorStyleBadgeId, string[]][]) {
        for (const kw of keywords) {
            const matches = (lower.match(new RegExp('\\b' + kw, 'g')) || []).length;
            scores[style] += matches * 2;
        }
    }

    const sorted = (Object.entries(scores) as [NarratorStyleBadgeId, number][]).sort((a, b) => b[1] - a[1]);
    if (sorted[0][1] > 0) {
        return sorted[0][0];
    }

    // Fallback based on genre
    const gList = Array.isArray(book?.genre) ? book.genre.join(' ') : (book?.genre || '');
    const gLower = gList.toLowerCase();
    if (gLower.includes('history') || gLower.includes('classic') || gLower.includes('war') || gLower.includes('biography')) {
        return 'historical-gravitas';
    }
    if (gLower.includes('comedy') || gLower.includes('satire') || gLower.includes('humour') || gLower.includes('humor')) {
        return 'satirical-bite';
    }
    if (gLower.includes('cozy') || gLower.includes('slice of life') || gLower.includes('romance')) {
        return 'fireside-warmth';
    }
    return 'propulsive-momentum';
}

export function getNarratorVocalStyles(
    narratorName: string,
    books?: Array<{ title?: string; soundCheck?: string; narrator?: string; genre?: string | string[] }>
): NarratorStyleBadgeId[] {
    const slug = slugify(narratorName);
    const profile = narratorData[slug];

    // Multi-book narrators with curated profiles in narratorData retain their 2 style badges
    if (profile?.styleBadges && profile.styleBadges.length > 0) {
        return profile.styleBadges;
    }

    // Single-book narrators receive exactly ONE dominant style badge from their SoundCheck
    const dominantStyle = getSingleNarratorDominantStyle(narratorName, books?.[0]);
    return [dominantStyle];
}

export interface NarratorProfile {
    slug: string;
    name: string;
    /**
     * 25-30 word bespoke overview in the Hero section.
     * Supports Markdown links [Label](/author/slug/) for internal creator linking.
     */
    heroBio: string;
    /**
     * Earned vocal style badges (displayed alongside their highest marathon hours badge).
     */
    styleBadges: NarratorStyleBadgeId[];
    /**
     * Amazon/Audible UK link with affiliate tag (?tag=thelongbookclub-21) for OneLink routing.
     */
    audibleUrl: string;
    /**
     * External Wikipedia or official reference link.
     */
    referenceUrl?: string;
    /**
     * Custom label for the 3rd top pill (defaults to `${name} Wiki`).
     */
    referenceLabel?: string;
    /**
     * Optional override for the 4 genre lozenges in Block 4.
     */
    topGenres?: string[];
    /**
     * Large Lora Italic keywords in Block 5 (Vocal Hallmarks).
     */
    vocalHallmarksKeywords: string[];
    /**
     * ~17-word sentence summarizing the narrator's hallmark qualities in Block 5.
     */
    vocalHallmarksSummary: string;
    /**
     * Pull quote from TLBC Soundcheck archive for Block 6.
     */
    archiveQuote: {
        quote: string;
        bookTitle: string;
        bookSlug: string;
    };
    /**
     * Optional slug of the book whose audioPreviewUrl should be featured in Block 7.
     */
    soundcheckBookSlug?: string;
    /**
     * Optional list of 3 book slugs to feature in Block 8 (Top Audio Books).
     */
    topBookSlugs?: string[];
}

export const narratorData: Record<string, NarratorProfile> = {
    'michael-kramer': {
        slug: 'michael-kramer',
        name: 'Michael Kramer',
        heroBio: 'The undisputed titan of modern epic fantasy narration, famed for bringing [Brandon Sanderson](/author/brandon-sanderson/)’s Cosmere and [Robert Jordan](/author/robert-jordan/)’s Wheel of Time to life alongside co-narrator [Kate Reading](/narrator/kate-reading/).',
        styleBadges: ['historical-gravitas', 'dual-pov-synergy'],
        audibleUrl: 'https://www.amazon.co.uk/s?k=Michael+Kramer&i=audible&tag=thelongbookclub-21',
        referenceUrl: 'https://en.wikipedia.org/wiki/Michael_Kramer_(narrator)',
        referenceLabel: 'Michael Kramer Wiki',
        topGenres: ['Fantasy', 'Epic Fantasy', 'High Fantasy', 'Magic Systems'],
        vocalHallmarksKeywords: [
            'Historical',
            'Gravitas,',
            'Ensemble',
            'Chameleon'
        ],
        vocalHallmarksSummary: "Kramer's cast of voices is vast and his delivery is imbued with the weight of historical authority.",
        archiveQuote: {
            quote: "Kramer’s deep, resonant voice adds a gravitas to the high-stakes battles, while Reading captures the wit and scholarly curiosity",
            bookTitle: 'Rhythm of War',
            bookSlug: 'rhythm-of-war-brandon-sanderson'
        },
        soundcheckBookSlug: 'rhythm-of-war-brandon-sanderson',
        topBookSlugs: [
            'wind-and-truth-brandon-sanderson',
            'rhythm-of-war-brandon-sanderson',
            'the-way-of-kings-brandon-sanderson'
        ]
    },
    'travis-baldree': {
        slug: 'travis-baldree',
        name: 'Travis Baldree',
        heroBio: 'A master of modern progression and cozy fantasy, acclaimed for narrating [Zogarth](/author/zogarth/)’s [The Primal Hunter](/book/the-primal-hunter-zogarth/) and writing and narrating his own bestselling [Legends & Lattes](/book/legends-and-lattes-travis-baldree/).',
        styleBadges: ['fireside-warmth', 'propulsive-momentum'],
        audibleUrl: 'https://www.amazon.co.uk/s?k=Travis+Baldree&i=audible&tag=thelongbookclub-21',
        referenceUrl: 'https://en.wikipedia.org/wiki/Travis_Baldree',
        referenceLabel: 'Travis Baldree Wiki',
        topGenres: ['Progression Fantasy', 'LitRPG', 'Cozy Fantasy', 'Epic Fantasy'],
        vocalHallmarksKeywords: [
            'Fireside',
            'Warmth,',
            'Kinetic',
            'Momentum'
        ],
        vocalHallmarksSummary: 'Baldree effortlessly balances intimate hearthside charm with the blistering, rhythmic precision needed for epic high-velocity progression battles.',
        archiveQuote: {
            quote: 'Travis Baldree is widely recognized as one of the elite voices in progression fantasy, and his performance here proves exactly why.',
            bookTitle: 'The Primal Hunter',
            bookSlug: 'the-primal-hunter-zogarth'
        },
        soundcheckBookSlug: 'the-primal-hunter-zogarth',
        topBookSlugs: [
            'the-primal-hunter-zogarth',
            'legends-and-lattes-travis-baldree',
            'fire-and-song-bryce-oconnor-luke-chmilenko'
        ]
    },
    'kate-reading': {
        slug: 'kate-reading',
        name: 'Kate Reading',
        heroBio: 'A legendary voice of high fantasy and Audie Award winner, celebrated for anchoring [Robert Jordan](/author/robert-jordan/)’s Wheel of Time and [Brandon Sanderson](/author/brandon-sanderson/)’s Stormlight Archive alongside [Michael Kramer](/narrator/michael-kramer/).',
        styleBadges: ['historical-gravitas', 'dual-pov-synergy'],
        audibleUrl: 'https://www.amazon.co.uk/s?k=Kate+Reading&i=audible&tag=thelongbookclub-21',
        referenceUrl: 'https://en.wikipedia.org/wiki/Kate_Reading',
        referenceLabel: 'Kate Reading Wiki',
        topGenres: ['Epic Fantasy', 'High Fantasy', 'Audiobook Classic', 'Magic Systems'],
        vocalHallmarksKeywords: [
            'Scholarly',
            'Poise,',
            'Regal',
            'Authority'
        ],
        vocalHallmarksSummary: 'Reading commands complex epics with impeccable aristocratic clarity, emotional restraint, and profound psychological insight across monumental ensemble casts.',
        archiveQuote: {
            quote: 'Michael Kramer and Kate Reading demonstrate once again why they are the undisputed gold standard in fantasy narration.',
            bookTitle: 'Wind and Truth',
            bookSlug: 'wind-and-truth-brandon-sanderson'
        },
        soundcheckBookSlug: 'wind-and-truth-brandon-sanderson',
        topBookSlugs: [
            'wind-and-truth-brandon-sanderson',
            'the-way-of-kings-brandon-sanderson',
            'the-eye-of-the-world-robert-jordan'
        ]
    },
    'pavi-proczko': {
        slug: 'pavi-proczko',
        name: 'Pavi Proczko',
        heroBio: 'The commanding baritone of progression fantasy and LitRPG, celebrated for narrating [TheFirstDefier & JF Brink](/author/thefirstdefier-jf-brink/)’s epic [Defiance of the Fall](/book/defiance-of-the-fall-jf-brink-thefirstdefier/) series across hundreds of continuous cultivation hours.',
        styleBadges: ['propulsive-momentum', 'historical-gravitas'],
        audibleUrl: 'https://www.amazon.co.uk/s?k=Pavi+Proczko&i=audible&tag=thelongbookclub-21',
        referenceUrl: 'https://paviproczko.com',
        referenceLabel: 'Pavi Proczko Official',
        topGenres: ['Progression Fantasy', 'LitRPG', 'Cultivation', 'Sci-Fi Fantasy'],
        vocalHallmarksKeywords: [
            'Resonant',
            'Baritone,',
            'Kinetic',
            'Stamina'
        ],
        vocalHallmarksSummary: 'Proczko infuses high-intensity martial arts combat and solitary survival with grounded physical gravity, relentless rhythm, and steady baritone power.',
        archiveQuote: {
            quote: 'Pavi Proczko delivers a gritty, authoritative narration that perfectly matches the brutal, visceral tone of Zac’s solitary survival ordeal.',
            bookTitle: 'Defiance of the Fall',
            bookSlug: 'defiance-of-the-fall-jf-brink-thefirstdefier'
        },
        soundcheckBookSlug: 'defiance-of-the-fall-jf-brink-thefirstdefier',
        topBookSlugs: [
            'defiance-of-the-fall-jf-brink-thefirstdefier',
            'defiance-of-the-fall-12-jf-brink-thefirstdefier',
            'defiance-of-the-fall-2-jf-brink-thefirstdefier'
        ]
    },
    'jeff-hays': {
        slug: 'jeff-hays',
        name: 'Jeff Hays',
        heroBio: 'Founder of Soundbooth Theater and virtuoso voice talent behind [Matt Dinniman](/author/matt-dinniman/)’s wildly acclaimed [Dungeon Crawler Carl](/book/dungeon-crawler-carl-matt-dinniman/) series, celebrated for peerless comedic timing and kinetic vocal pyrotechnics.',
        styleBadges: ['satirical-bite', 'propulsive-momentum'],
        audibleUrl: 'https://www.amazon.co.uk/s?k=Jeff+Hays&i=audible&tag=thelongbookclub-21',
        referenceUrl: 'https://www.jeffhaysnarrates.com',
        referenceLabel: 'Jeff Hays Official',
        topGenres: ['LitRPG', 'GameLit', 'Sci-Fi', 'Comedy'],
        vocalHallmarksKeywords: [
            'Satirical',
            'Bite,',
            'Virtuoso',
            'Timing'
        ],
        vocalHallmarksSummary: 'Hays delivers jaw-dropping character pyrotechnics, shifting seamlessly between gravelly deadpan antiheroes and high-pitched, aristocratic prima donnas.',
        archiveQuote: {
            quote: 'Jeff Hays delivers an astonishing, tour-de-force vocal performance that has earned legendary status across the entire audiobook community.',
            bookTitle: 'Dungeon Crawler Carl',
            bookSlug: 'dungeon-crawler-carl-matt-dinniman'
        },
        soundcheckBookSlug: 'dungeon-crawler-carl-matt-dinniman',
        topBookSlugs: [
            'dungeon-crawler-carl-matt-dinniman',
            'the-butchers-masquerade-matt-dinniman',
            'chrysalis-books-1-3-rinoz'
        ]
    },
    'andrea-parsneau': {
        slug: 'andrea-parsneau',
        name: 'Andrea Parsneau',
        heroBio: 'One of audio’s premier endurance talents, famed for breathing life into hundreds of distinct species and characters across [Pirateaba](/author/pirateaba/)’s monumental [The Wandering Inn](/book/the-wandering-inn-book-1-pirateaba/) saga.',
        styleBadges: ['dialect-immersion', 'fireside-warmth'],
        audibleUrl: 'https://www.amazon.co.uk/s?k=Andrea+Parsneau&i=audible&tag=thelongbookclub-21',
        referenceUrl: 'https://andreaparsneau.com',
        referenceLabel: 'Andrea Parsneau Official',
        topGenres: ['LitRPG', 'Epic Fantasy', 'Progression Fantasy', 'Portal Fantasy'],
        vocalHallmarksKeywords: [
            'Dialect',
            'Immersion,',
            'Emotional',
            'Range'
        ],
        vocalHallmarksSummary: 'Parsneau navigates colossal 50-hour tapestries with supernatural character differentiation, shifting effortlessly from goblin squeaks to regal drakonian majesty.',
        archiveQuote: {
            quote: 'Andrea Parsneau delivers what is widely recognized as one of the single greatest vocal achievements in fantasy audio history.',
            bookTitle: 'The Wandering Inn: Book 2',
            bookSlug: 'the-wandering-inn-book-2-pirateaba'
        },
        soundcheckBookSlug: 'the-wandering-inn-book-1-pirateaba',
        topBookSlugs: [
            'the-wandering-inn-book-1-pirateaba',
            'the-wandering-inn-book-2-pirateaba',
            'the-last-light-the-wandering-inn-book-5-pirateaba'
        ]
    },
    'heath-miller': {
        slug: 'heath-miller',
        name: 'Heath Miller',
        heroBio: 'Award-winning Australian actor and voice artist renowned for bringing Jason Asano’s witty, irreverent charisma to life across [Shirtaloon & Travis Deverell](/author/shirtaloon-travis-deverell/)’s blockbuster [He Who Fights with Monsters](/book/he-who-fights-with-monsters-shirtaloon-travis-deverell/) saga.',
        styleBadges: ['satirical-bite', 'dialect-immersion'],
        audibleUrl: 'https://www.amazon.co.uk/s?k=Heath+Miller&i=audible&tag=thelongbookclub-21',
        referenceUrl: 'https://en.wikipedia.org/wiki/Heath_Miller_(actor)',
        referenceLabel: 'Heath Miller Wiki',
        topGenres: ['Progression Fantasy', 'LitRPG', 'Satirical Fantasy', 'Isekai'],
        vocalHallmarksKeywords: [
            'Satirical',
            'Bite,',
            'Irreverent',
            'Wit'
        ],
        vocalHallmarksSummary: 'Miller fuses dry Aussie banter with cosmic high stakes, maintaining razor-sharp comedic timing and distinct regional vocal identities across massive battles.',
        archiveQuote: {
            quote: 'Heath Miller delivers a masterclass in vocal range and dry comedic timing, embodying Jason Asano with effortless swagger and caustic wit.',
            bookTitle: 'He Who Fights with Monsters',
            bookSlug: 'he-who-fights-with-monsters-shirtaloon-travis-deverell'
        },
        soundcheckBookSlug: 'he-who-fights-with-monsters-shirtaloon-travis-deverell',
        topBookSlugs: [
            'he-who-fights-with-monsters-shirtaloon-travis-deverell',
            'he-who-fights-with-monsters-9-shirtaloon-travis-deverell',
            'he-who-fights-with-monsters-10-shirtaloon-travis-deverell'
        ]
    },
    'sean-barrett': {
        slug: 'sean-barrett',
        name: 'Sean Barrett',
        heroBio: 'Veteran British screen and voice actor celebrated as the definitive gravelly voice of [Mick Herron](/author/mick-herron/)’s [Slough House](/book/slow-horses/) series and [Jo Nesbø](/book/the-bat-jo-nesbo/)’s Harry Hole crime thrillers.',
        styleBadges: ['satirical-bite', 'historical-gravitas'],
        audibleUrl: 'https://www.amazon.co.uk/s?k=Sean+Barrett&i=audible&tag=thelongbookclub-21',
        referenceUrl: 'https://en.wikipedia.org/wiki/Sean_Barrett_(actor)',
        referenceLabel: 'Sean Barrett Wiki',
        topGenres: ['Espionage', 'Spy Thriller', 'British Crime', 'Nordic Noir'],
        vocalHallmarksKeywords: [
            'Smoke-Cured',
            'Gravel,',
            'Sardonic',
            'Wit'
        ],
        vocalHallmarksSummary: 'Barrett’s raspy, tobacco-cured timbre oozes world-weary British cynicism, delivering caustic espionage dialogue with peerless deadpan timing.',
        archiveQuote: {
            quote: "Sean Barrett gives a masterclass in audiobook performance, defining Jackson Lamb's voice so definitively that you can practically smell the stale whisky.",
            bookTitle: 'Slow Horses',
            bookSlug: 'slow-horses'
        },
        soundcheckBookSlug: 'slow-horses',
        topBookSlugs: [
            'slow-horses',
            'dead-lions-mick-herron',
            'the-secret-hours-mick-herron'
        ]
    },
    'john-lee': {
        slug: 'john-lee',
        name: 'John Lee',
        heroBio: 'Golden Voice narrator and classical actor famed for lending stately grandeur and linguistic virtuosity to [Ken Follett](/author/ken-follett/)’s historical epics and [Peter F. Hamilton](/author/peter-f-hamilton/)’s monumental space operas.',
        styleBadges: ['historical-gravitas', 'dialect-immersion'],
        audibleUrl: 'https://www.amazon.co.uk/s?k=John+Lee&i=audible&tag=thelongbookclub-21',
        referenceUrl: 'https://en.wikipedia.org/wiki/John_Rafter_Lee',
        referenceLabel: 'John Lee Wiki',
        topGenres: ['Historical Fiction', 'Space Opera', 'Science Fiction', 'Literary Fiction'],
        vocalHallmarksKeywords: [
            'Aristocratic',
            'Elegance,',
            'Epic',
            'Breadth'
        ],
        vocalHallmarksSummary: 'Lee commands sweeping multi-generational sagas with grand operatic resonance, aristocratic cadence, and flawless distinction between dialects and social stations.',
        archiveQuote: {
            quote: 'John Lee delivers a characteristically authoritative and deeply engaging performance. His ability to distinguish between Anglo-Saxon commoners and Norman aristocrats is masterly.',
            bookTitle: 'The Evening and the Morning',
            bookSlug: 'the-evening-and-the-morning-ken-follett'
        },
        soundcheckBookSlug: 'the-evening-and-the-morning-ken-follett',
        topBookSlugs: [
            'the-evening-and-the-morning-ken-follett',
            'a-column-of-fire-ken-follett',
            'the-naked-god-peter-f-hamilton'
        ]
    },
    'scott-brick': {
        slug: 'scott-brick',
        name: 'Scott Brick',
        heroBio: 'One of the most prolific titans in audiobook history, celebrated for his cinematic intensity and emotional gravitas across [Justin Cronin](/author/justin-cronin/)’s [The Passage](/book/the-passage-justin-cronin/) and [Ron Chernow](/author/ron-chernow/)’s [Hamilton](/book/hamilton-ron-chernow/).',
        styleBadges: ['historical-gravitas', 'propulsive-momentum'],
        audibleUrl: 'https://www.amazon.co.uk/s?k=Scott+Brick&i=audible&tag=thelongbookclub-21',
        referenceUrl: 'https://en.wikipedia.org/wiki/Scott_Brick',
        referenceLabel: 'Scott Brick Wiki',
        topGenres: ['Science Fiction', 'Post-Apocalyptic', 'Biography', 'Techno-Thriller'],
        vocalHallmarksKeywords: [
            'Cinematic',
            'Tension,',
            'Whisper to',
            'Crescendo'
        ],
        vocalHallmarksSummary: 'Brick’s signature breathy intensity, dramatic modulation, and rhythmic build ratchet tension from whispered intimacy to shattering operatic climaxes.',
        archiveQuote: {
            quote: 'Scott Brick turns in a masterclass in suspense narration that makes Crichton’s techno-thriller terrifyingly immediate.',
            bookTitle: 'Jurassic Park',
            bookSlug: 'jurassic-park-michael-crichton'
        },
        soundcheckBookSlug: 'the-passage-justin-cronin',
        topBookSlugs: [
            'the-passage-justin-cronin',
            'hamilton-ron-chernow',
            'jurassic-park-michael-crichton'
        ]
    },
    'steven-pacey': {
        slug: 'steven-pacey',
        name: 'Steven Pacey',
        heroBio: 'Widely revered as the gold standard of fantasy voice acting, acclaimed for defining [Joe Abercrombie](/author/joe-abercrombie/)’s [The Blade Itself](/book/the-blade-itself-joe-abercrombie/) and the entire First Law universe with peerless character artistry.',
        styleBadges: ['dialect-immersion', 'satirical-bite'],
        audibleUrl: 'https://www.amazon.co.uk/s?k=Steven+Pacey&i=audible&tag=thelongbookclub-21',
        referenceUrl: 'https://en.wikipedia.org/wiki/Steven_Pacey',
        referenceLabel: 'Steven Pacey Wiki',
        topGenres: ['Grimdark Fantasy', 'Dark Fantasy', 'Military Fantasy', 'Nordic Noir'],
        vocalHallmarksKeywords: [
            'Dialect',
            'Immersion,',
            'Sardonic',
            'Bite'
        ],
        vocalHallmarksSummary: 'Pacey’s uncanny ability to shift between lisping inquisitors, grizzled berserkers, and haughty nobles remains the unmatched high-water mark of modern audio performance.',
        archiveQuote: {
            quote: 'Steven Pacey’s narration of The First Law is widely regarded as the benchmark against which all other fantasy audiobooks are measured.',
            bookTitle: 'The Blade Itself',
            bookSlug: 'the-blade-itself-joe-abercrombie'
        },
        soundcheckBookSlug: 'the-blade-itself-joe-abercrombie',
        topBookSlugs: [
            'the-blade-itself-joe-abercrombie',
            'best-served-cold-joe-abercrombie',
            'the-heroes-joe-abercrombie'
        ]
    },
    'davina-porter': {
        slug: 'davina-porter',
        name: 'Davina Porter',
        heroBio: 'Audible Hall of Fame legend and Audie Award winner, immortalized as the beloved definitive voice of [Diana Gabaldon](/author/diana-gabaldon/)’s monumental [Outlander](/book/outlander-diana-gabaldon/) saga across hundreds of hours of sweeping historical drama.',
        styleBadges: ['historical-gravitas', 'dialect-immersion'],
        audibleUrl: 'https://www.amazon.co.uk/s?k=Davina+Porter&i=audible&tag=thelongbookclub-21',
        referenceUrl: 'https://en.wikipedia.org/wiki/Davina_Porter',
        referenceLabel: 'Davina Porter Wiki',
        topGenres: ['Historical Fiction', 'Time Travel Romance', 'Scottish History', 'Audiobook Classic'],
        vocalHallmarksKeywords: [
            'Highland',
            'Brogue,',
            'Noble',
            'Warmth'
        ],
        vocalHallmarksSummary: 'Porter commands sprawling multi-generational epics with effortless Scottish brogues, aristocratic English poise, and deep, resonant emotional intimacy.',
        archiveQuote: {
            quote: 'Davina Porter’s narration of Outlander is widely celebrated as one of the greatest and most iconic audiobook performances ever recorded.',
            bookTitle: 'Outlander',
            bookSlug: 'outlander-diana-gabaldon'
        },
        soundcheckBookSlug: 'outlander-diana-gabaldon',
        topBookSlugs: [
            'outlander-diana-gabaldon',
            'dragonfly-in-amber-diana-gabaldon',
            'the-fiery-cross-diana-gabaldon'
        ]
    },
    'jefferson-mays': {
        slug: 'jefferson-mays',
        name: 'Jefferson Mays',
        heroBio: 'Tony Award-winning actor celebrated for setting the gold standard of modern sci-fi narration across all nine volumes of [James S.A. Corey](/author/james-sa-corey/)’s [The Expanse](/book/leviathan-wakes-james-sa-corey/) series.',
        styleBadges: ['propulsive-momentum', 'satirical-bite'],
        audibleUrl: 'https://www.amazon.co.uk/s?k=Jefferson+Mays&i=audible&tag=thelongbookclub-21',
        referenceUrl: 'https://en.wikipedia.org/wiki/Jefferson_Mays',
        referenceLabel: 'Jefferson Mays Wiki',
        topGenres: ['Hard Science Fiction', 'Space Opera', 'Sci-Fi Mystery', 'Audiobook Classic'],
        vocalHallmarksKeywords: [
            'Belter',
            'Patois,',
            'Razor',
            'Precision'
        ],
        vocalHallmarksSummary: 'Mays delivers masterclass character separation, moving effortlessly between raspy Belter patois, laconic pilots, and foul-mouthed UN diplomats with immaculate pacing.',
        archiveQuote: {
            quote: 'Jefferson Mays sets the gold standard for long-form science fiction performance, delivering a five-star masterclass in voice acting.',
            bookTitle: 'Leviathan Wakes',
            bookSlug: 'leviathan-wakes-james-sa-corey'
        },
        soundcheckBookSlug: 'leviathan-wakes-james-sa-corey',
        topBookSlugs: [
            'leviathan-wakes-james-sa-corey',
            'calibans-war-james-sa-corey',
            'nemesis-games-james-sa-corey'
        ]
    },
    'simon-vance': {
        slug: 'simon-vance',
        name: 'Simon Vance',
        heroBio: 'Sixteen-time Audie Award winner and Golden Voice titan, renowned for commanding [Frank Herbert](/author/frank-herbert/)’s [Dune](/book/dune-frank-herbert/) chronicles and towering nineteenth-century literary masterpieces with effortless classical authority.',
        styleBadges: ['historical-gravitas', 'fireside-warmth'],
        audibleUrl: 'https://www.amazon.co.uk/s?k=Simon+Vance&i=audible&tag=thelongbookclub-21',
        referenceUrl: 'https://en.wikipedia.org/wiki/Simon_Vance',
        referenceLabel: 'Simon Vance Wiki',
        topGenres: ['Classic Science Fiction', 'Space Opera', 'Gothic Classics', 'Philosophical Sci-Fi'],
        vocalHallmarksKeywords: [
            'Classical',
            'Authority,',
            'Erudite',
            'Grace'
        ],
        vocalHallmarksSummary: 'Vance’s rich, patrician baritone elevates dense philosophical speculation and epic world-building into mesmerizing, effortless audio drama.',
        archiveQuote: {
            quote: 'Simon Vance commands this complex philosophical masterpiece with impeccable vocal control, aristocratic timbre, and breathtaking emotional depth.',
            bookTitle: 'God Emperor of Dune',
            bookSlug: 'god-emperor-of-dune-frank-herbert'
        },
        soundcheckBookSlug: 'dune-frank-herbert',
        topBookSlugs: [
            'dune-frank-herbert',
            'god-emperor-of-dune-frank-herbert',
            'the-man-who-laughs-victor-hugo'
        ]
    },
    'samuel-roukin': {
        slug: 'samuel-roukin',
        name: 'Samuel Roukin',
        heroBio: 'English stage and screen actor celebrated for giving brooding aristocratic grandeur to Hadrian Marlowe across [Christopher Ruocchio](/author/christopher-ruocchio/)’s monumental [Empire of Silence](/book/empire-of-silence/) and Sun Eater saga.',
        styleBadges: ['historical-gravitas', 'propulsive-momentum'],
        audibleUrl: 'https://www.amazon.co.uk/s?k=Samuel+Roukin&i=audible&tag=thelongbookclub-21',
        referenceUrl: 'https://en.wikipedia.org/wiki/Samuel_Roukin',
        referenceLabel: 'Samuel Roukin Wiki',
        topGenres: ['Space Opera', 'Science Fiction', 'Epic Fantasy', 'Philosophical Sci-Fi'],
        vocalHallmarksKeywords: [
            'Aristocratic',
            'Grief,',
            'Melancholic',
            'Gravitas'
        ],
        vocalHallmarksSummary: 'Roukin captures the weary retrospective sorrow of an immortal warrior-philosopher, balancing hushed poetic intimacy with ferocious battlefield crescendos.',
        archiveQuote: {
            quote: 'Samuel Roukin gives an extraordinary, aristocratic performance that perfectly embodies the world-weary retrospective voice of Hadrian Marlowe.',
            bookTitle: 'Empire of Silence',
            bookSlug: 'empire-of-silence'
        },
        soundcheckBookSlug: 'empire-of-silence',
        topBookSlugs: [
            'empire-of-silence',
            'demon-in-white-christopher-ruocchio',
            'shadows-upon-time-christopher-ruocchio'
        ]
    },
    'saul-reichlin': {
        slug: 'saul-reichlin',
        name: 'Saul Reichlin',
        heroBio: 'Audiobook of the Year winner and veteran theatrical actor renowned as the definitive voice of [Stieg Larsson](/author/stieg-larsson/)’s [The Girl with the Dragon Tattoo](/book/the-girl-with-the-dragon-tattoo-stieg-larsson/) and the Millennium series.',
        styleBadges: ['dialect-immersion', 'historical-gravitas'],
        audibleUrl: 'https://www.amazon.co.uk/s?k=Saul+Reichlin&i=audible&tag=thelongbookclub-21',
        referenceUrl: 'https://www.imdb.com/name/nm0717104/',
        referenceLabel: 'Saul Reichlin IMDb',
        topGenres: ['Nordic Noir', 'Crime Thriller', 'Scandinavian Mystery', 'Psychological Suspense'],
        vocalHallmarksKeywords: [
            'Sonorous',
            'Restraint,',
            'Nordic',
            'Chill'
        ],
        vocalHallmarksSummary: 'Reichlin’s low-register, smoke-shaded baritone provides icy Scandinavian atmospheric tension, dry wit, and calibrated emotional restraint.',
        archiveQuote: {
            quote: 'Saul Reichlin’s narration is a masterclass in low-register gravity and calibrated restraint, creating an unforgettable auditory atmosphere.',
            bookTitle: 'The Girl with the Dragon Tattoo',
            bookSlug: 'the-girl-with-the-dragon-tattoo-stieg-larsson'
        },
        soundcheckBookSlug: 'the-girl-with-the-dragon-tattoo-stieg-larsson',
        topBookSlugs: [
            'the-girl-with-the-dragon-tattoo-stieg-larsson',
            'the-hypnotist-lars-kepler',
            'the-girl-in-the-spiders-web-david-lagercrantz'
        ]
    },
    'elizabeth-evans': {
        slug: 'elizabeth-evans',
        name: 'Elizabeth Evans',
        heroBio: 'Earphones Award-winning narrator celebrated across the globe as the iconic voice of [Sarah J. Maas](/author/sarah-j-maas/)’s [House of Earth and Blood](/book/house-of-earth-and-blood-sarah-j-maas/) and the Crescent City universe.',
        styleBadges: ['propulsive-momentum', 'dialect-immersion'],
        audibleUrl: 'https://www.amazon.co.uk/s?k=Elizabeth+Evans&i=audible&tag=thelongbookclub-21',
        referenceUrl: 'https://elizabeth-evans.com',
        referenceLabel: 'Elizabeth Evans Official',
        topGenres: ['Romantasy', 'Urban Fantasy', 'High Fantasy', 'Audiobook Classic'],
        vocalHallmarksKeywords: [
            'Dynamic',
            'Fire,',
            'Emotional',
            'Intensity'
        ],
        vocalHallmarksSummary: 'Evans combines fierce emotional vulnerability, snarky modern comedic cadence, and powerhouse stamina across massive multi-character fantasy showdowns.',
        archiveQuote: {
            quote: 'Elizabeth Evans delivers a tour de force, Audie-caliber solo performance that stands as one of the finest single-narrator achievements in modern fantasy audio.',
            bookTitle: 'House of Earth and Blood',
            bookSlug: 'house-of-earth-and-blood-sarah-j-maas'
        },
        soundcheckBookSlug: 'house-of-earth-and-blood-sarah-j-maas',
        topBookSlugs: [
            'house-of-earth-and-blood-sarah-j-maas',
            'house-of-flame-and-shadow-sarah-j-maas',
            'a-court-of-wings-and-ruin-sarah-j-maas'
        ]
    },
    'roy-dotrice': {
        slug: 'roy-dotrice',
        name: 'Roy Dotrice',
        heroBio: 'Guinness World Record holder and legendary British theatrical actor who immortalized [George R.R. Martin](/author/george-rr-martin/)’s [A Game of Thrones](/book/a-game-of-thrones-george-rr-martin/) with hundreds of distinct, irreplaceable character voices.',
        styleBadges: ['character-chameleon', 'historical-gravitas'],
        audibleUrl: 'https://www.amazon.co.uk/s?k=Roy+Dotrice&i=audible&tag=thelongbookclub-21',
        referenceUrl: 'https://en.wikipedia.org/wiki/Roy_Dotrice',
        referenceLabel: 'Roy Dotrice Wiki',
        topGenres: ['Grimdark Fantasy', 'Epic Fantasy', 'Medieval Drama', 'Audiobook Classic'],
        vocalHallmarksKeywords: [
            'Theatrical',
            'Gravel,',
            'Shakespearian',
            'Weight'
        ],
        vocalHallmarksSummary: 'Dotrice brought Shakespearean theatrical heft, raspy medieval realism, and unmatched vocal character separation to the sprawling continent of Westeros.',
        archiveQuote: {
            quote: 'The late Roy Dotrice—whose monumental performance earned a Guinness World Record—gives Martin’s masterpiece its definitive auditory identity.',
            bookTitle: 'A Storm of Swords',
            bookSlug: 'a-storm-of-swords-george-rr-martin'
        },
        soundcheckBookSlug: 'a-game-of-thrones-george-rr-martin',
        topBookSlugs: [
            'a-game-of-thrones-george-rr-martin',
            'a-storm-of-swords-george-rr-martin',
            'a-dance-with-dragons-george-rr-martin'
        ]
    },
    'tim-gerard-reynolds': {
        slug: 'tim-gerard-reynolds',
        name: 'Tim Gerard Reynolds',
        heroBio: 'Audie Award winner and beloved Irish actor renowned as the incandescent voice of Darrow of Lykos in [Pierce Brown](/author/pierce-brown/)’s explosive [Red Rising](/book/golden-son-pierce-brown/) saga.',
        styleBadges: ['propulsive-momentum', 'dialect-immersion'],
        audibleUrl: 'https://www.amazon.co.uk/s?k=Tim+Gerard+Reynolds&i=audible&tag=thelongbookclub-21',
        referenceUrl: 'https://www.timgerardreynolds.com',
        referenceLabel: 'Tim Gerard Reynolds Official',
        topGenres: ['Space Opera', 'Dystopian Sci-Fi', 'Military Sci-Fi', 'Audiobook Classic'],
        vocalHallmarksKeywords: [
            'Irish',
            'Brogue,',
            'Lyrical',
            'Fury'
        ],
        vocalHallmarksSummary: 'Reynolds translates revolutionary fury into pure auditory electricity, combining poetic Celtic cadence with heart-pounding battle momentum.',
        archiveQuote: {
            quote: 'Tim Gerard Reynolds delivers an auditory tour de force that cements his status as an audio legend, imbuing every battle with fierce emotional stakes.',
            bookTitle: 'Golden Son',
            bookSlug: 'golden-son-pierce-brown'
        },
        soundcheckBookSlug: 'golden-son-pierce-brown',
        topBookSlugs: [
            'golden-son-pierce-brown',
            'morning-star-pierce-brown',
            'light-bringer-pierce-brown'
        ]
    },
    'stephen-fry': {
        slug: 'stephen-fry',
        name: 'Stephen Fry',
        heroBio: 'Beloved British national treasure, author, and narrator celebrated for his definitive [Sherlock Holmes](/book/sherlock-holmes-the-definitive-collection-arthur-conan-doyle/) collection and his own witty mythological retellings beginning with [Mythos](/book/mythos/).',
        styleBadges: ['fireside-warmth', 'satirical-bite'],
        audibleUrl: 'https://www.amazon.co.uk/s?k=Stephen+Fry&i=audible&tag=thelongbookclub-21',
        referenceUrl: 'https://en.wikipedia.org/wiki/Stephen_Fry',
        referenceLabel: 'Stephen Fry Wiki',
        topGenres: ['Mythology', 'Classic Mystery', 'Ancient World', 'Historical Humour'],
        vocalHallmarksKeywords: [
            'Erudite',
            'Wit,',
            'Fireside',
            'Charm'
        ],
        vocalHallmarksSummary: 'Fry’s resonant, conversational baritone feels like an intimate fireside chat with the finest raconteur in Britain, rich with mischievous wit and scholarship.',
        archiveQuote: {
            quote: 'Stephen Fry narrating his own prose is a masterclass in vocal theatricality, warmth, and wit, making ancient cosmologies feel completely irresistible.',
            bookTitle: 'Mythos',
            bookSlug: 'mythos'
        },
        soundcheckBookSlug: 'mythos',
        topBookSlugs: [
            'sherlock-holmes-the-definitive-collection-arthur-conan-doyle',
            'mythos',
            'heroes-stephen-fry'
        ]
    },
    'jennifer-ikeda': {
        slug: 'jennifer-ikeda',
        name: 'Jennifer Ikeda',
        heroBio: 'Drama Desk Award-winning actress celebrated for anchoring [Deborah Harkness](/author/deborah-harkness/)’s [A Discovery of Witches](/book/a-discovery-of-witches-deborah-harkness/) trilogy and the original recordings of [Sarah J. Maas](/author/sarah-j-maas/)’s ACOTAR series.',
        styleBadges: ['dialect-immersion', 'fireside-warmth'],
        audibleUrl: 'https://www.amazon.co.uk/s?k=Jennifer+Ikeda&i=audible&tag=thelongbookclub-21',
        referenceUrl: 'https://en.wikipedia.org/wiki/Jennifer_Ikeda',
        referenceLabel: 'Jennifer Ikeda Wiki',
        topGenres: ['Romantasy', 'Historical Fantasy', 'Paranormal Mystery', 'Audiobook Classic'],
        vocalHallmarksKeywords: [
            'Academic',
            'Poise,',
            'Lyrical',
            'Nuance'
        ],
        vocalHallmarksSummary: 'Ikeda balances scholarly intellectual poise with simmering supernatural romance, shifting effortlessly across Oxford halls and sixteenth-century continental dialects.',
        archiveQuote: {
            quote: 'Jennifer Ikeda delivers a versatile, polished performance that anchors Harkness’s academic fantasy with effortless poise and emotional depth.',
            bookTitle: 'A Discovery of Witches',
            bookSlug: 'a-discovery-of-witches-deborah-harkness'
        },
        soundcheckBookSlug: 'a-discovery-of-witches-deborah-harkness',
        topBookSlugs: [
            'a-discovery-of-witches-deborah-harkness',
            'a-court-of-mist-and-fury-sarah-j-maas',
            'shadow-of-night-deborah-harkness'
        ]
    },
    'david-morley-hale': {
        slug: 'david-morley-hale',
        name: 'David Morley Hale',
        heroBio: 'British screen and voice actor celebrated for bringing swagger, smoke-cured grit, and street-level menace to [Peter McLean](/author/peter-mclean/)’s [Priest of Bones](/book/priest-of-bones-peter-mclean/) and the War for the Rose Throne saga.',
        styleBadges: ['dialect-immersion', 'historical-gravitas'],
        audibleUrl: 'https://www.amazon.co.uk/s?k=David+Morley+Hale&i=audible&tag=thelongbookclub-21',
        referenceUrl: 'https://davidmorleyhale.com',
        referenceLabel: 'David Morley Hale Official',
        topGenres: ['Grimdark Fantasy', 'Historical Fantasy', 'Low Fantasy', 'Crime Drama'],
        vocalHallmarksKeywords: [
            'Street-Level',
            'Grit,',
            'Menacing',
            'Swagger'
        ],
        vocalHallmarksSummary: 'Hale delivers an authentic, gravel-laced working-class British dialect that captures gangland underworld tension and razor-sharp military pragmatism.',
        archiveQuote: {
            quote: 'David Morley Hale turns in a pitch-perfect, raspy performance that brings Tomas Piety to life with swagger, weariness, and menacing charisma.',
            bookTitle: 'Priest of Bones',
            bookSlug: 'priest-of-bones-peter-mclean'
        },
        soundcheckBookSlug: 'priest-of-bones-peter-mclean',
        topBookSlugs: [
            'priest-of-bones-peter-mclean',
            'priest-of-lies-peter-mclean',
            'priest-of-crowns-peter-mclean'
        ]
    },
    'bill-homewood': {
        slug: 'bill-homewood',
        name: 'Bill Homewood',
        heroBio: 'Royal Shakespeare Company veteran and classical narration titan, revered for setting the benchmark recordings of [Alexandre Dumas](/author/alexandre-dumas/)’s [The Count of Monte Cristo](/book/the-count-of-monte-cristo-alexandre-dumas/) and [Victor Hugo](/author/victor-hugo/)’s [Les Misérables](/book/les-misrables-victor-hugo/).',
        styleBadges: ['historical-gravitas', 'fireside-warmth'],
        audibleUrl: 'https://www.amazon.co.uk/s?k=Bill+Homewood&i=audible&tag=thelongbookclub-21',
        referenceUrl: 'https://en.wikipedia.org/wiki/Bill_Homewood',
        referenceLabel: 'Bill Homewood Wiki',
        topGenres: ['French Classics', 'Historical Adventure', 'Literary Classics', 'Audiobook Classic'],
        vocalHallmarksKeywords: [
            'Theatrical',
            'Grandeur,',
            'Classical',
            'Poise'
        ],
        vocalHallmarksSummary: 'Homewood commands 50+ hour nineteenth-century epics with grand theatrical elegance, effortless French pronunciation, and magnificent emotional stamina.',
        archiveQuote: {
            quote: 'Bill Homewood delivers a tour de force performance that stands as the undisputed benchmark for Dumas audiobooks.',
            bookTitle: 'The Count of Monte Cristo',
            bookSlug: 'the-count-of-monte-cristo-alexandre-dumas'
        },
        soundcheckBookSlug: 'the-count-of-monte-cristo-alexandre-dumas',
        topBookSlugs: [
            'the-count-of-monte-cristo-alexandre-dumas',
            'les-misrables-victor-hugo',
            'the-three-musketeers-alexandre-dumas'
        ]
    },
    'grover-gardner': {
        slug: 'grover-gardner',
        name: 'Grover Gardner',
        heroBio: 'Audie Hall of Fame icon and Golden Voice legend, celebrated for anchoring [Stephen King](/author/stephen-king/)’s uncut [The Stand](/book/the-stand-stephen-king/) and William L. Shirer’s colossal Third Reich chronicle with effortless authority.',
        styleBadges: ['fireside-warmth', 'historical-gravitas'],
        audibleUrl: 'https://www.amazon.co.uk/s?k=Grover+Gardner&i=audible&tag=thelongbookclub-21',
        referenceUrl: 'https://en.wikipedia.org/wiki/Grover_Gardner',
        referenceLabel: 'Grover Gardner Wiki',
        topGenres: ['Post-Apocalyptic', 'Twentieth Century History', 'Biography', 'Audiobook Classic'],
        vocalHallmarksKeywords: [
            'Conversational',
            'Warmth,',
            'Quiet',
            'Authority'
        ],
        vocalHallmarksSummary: 'Gardner’s wry, intimate baritone carries the weight of a seasoned journalist or trusted confidant, making 40+ hour marathons feel effortless.',
        archiveQuote: {
            quote: 'Grover Gardner delivers an absolutely stellar performance, shouldering the immense weight of King’s uncut vision with veteran expertise.',
            bookTitle: 'The Stand',
            bookSlug: 'the-stand-stephen-king'
        },
        soundcheckBookSlug: 'the-stand-stephen-king',
        topBookSlugs: [
            'the-stand-stephen-king',
            'the-rise-and-fall-of-the-third-reich-william-l-shirer',
            'titan-ron-chernow'
        ]
    },
    'annie-ellicott': {
        slug: 'annie-ellicott',
        name: 'Annie Ellicott',
        heroBio: 'Soundbooth Theater co-star, jazz vocalist, and dynamic voice actress acclaimed for partnering with [Jeff Hays](/narrator/jeff-hays/) across the massive 54-hour [Chrysalis](/book/chrysalis-books-1-3-rinoz/) and Life Reset audio series.',
        styleBadges: ['satirical-bite', 'propulsive-momentum'],
        audibleUrl: 'https://www.amazon.co.uk/s?k=Annie+Ellicott&i=audible&tag=thelongbookclub-21',
        referenceUrl: 'https://annieellicott.com',
        referenceLabel: 'Annie Ellicott Official',
        topGenres: ['LitRPG', 'Progression Fantasy', 'Audio Drama', 'Comedy Fantasy'],
        vocalHallmarksKeywords: [
            'Playful',
            'Bite,',
            'Vocal',
            'Chameleon'
        ],
        vocalHallmarksSummary: 'Ellicott infuses fantasy audio dramas with sparkling comedic timing, agile vocal textures, and electric multi-character chemistry.',
        archiveQuote: {
            quote: 'Jeff Hays and Annie Ellicott deliver a pitch-perfect comedic and action performance across this colossal fifty-four-hour marathon.',
            bookTitle: 'Chrysalis, Books 1-3',
            bookSlug: 'chrysalis-books-1-3-rinoz'
        },
        soundcheckBookSlug: 'chrysalis-books-1-3-rinoz',
        topBookSlugs: [
            'chrysalis-books-1-3-rinoz',
            'life-reset-human-resource-shemer-kuznits',
            'life-reset-salvation-shemer-kuznits'
        ]
    },
    'daniel-weyman': {
        slug: 'daniel-weyman',
        name: 'Daniel Weyman',
        heroBio: 'Critically acclaimed British stage and screen actor celebrated for his haunting, poetic narration of [Carlos Ruiz Zafón](/author/carlos-ruiz-zafon/)’s [The Shadow of the Wind](/book/the-shadow-of-the-wind-carlos-ruiz-zafon/) and Cemetery of Forgotten Books sequence.',
        styleBadges: ['historical-gravitas', 'fireside-warmth'],
        audibleUrl: 'https://www.amazon.co.uk/s?k=Daniel+Weyman&i=audible&tag=thelongbookclub-21',
        referenceUrl: 'https://en.wikipedia.org/wiki/Daniel_Weyman',
        referenceLabel: 'Daniel Weyman Wiki',
        topGenres: ['Gothic Mystery', 'Magical Realism', 'Literary Fiction', 'Audiobook Classic'],
        vocalHallmarksKeywords: [
            'Gothic',
            'Atmosphere,',
            'Lyrical',
            'Poise'
        ],
        vocalHallmarksSummary: 'Weyman brings mist-shrouded Barcelona to life with smoky acoustic intimacy, melancholic pacing, and exquisite European character voices.',
        archiveQuote: {
            quote: 'Daniel Weyman’s narration on The Shadow of the Wind is an atmospheric masterclass of gothic mystery, elegance, and emotional tension.',
            bookTitle: 'The Shadow of the Wind',
            bookSlug: 'the-shadow-of-the-wind-carlos-ruiz-zafon'
        },
        soundcheckBookSlug: 'the-shadow-of-the-wind-carlos-ruiz-zafon',
        topBookSlugs: [
            'the-shadow-of-the-wind-carlos-ruiz-zafon',
            'the-labyrinth-of-the-spirits-carlos-ruiz-zafon',
            'the-angels-game-carlos-ruiz-zafon'
        ]
    },
    'charlton-griffin': {
        slug: 'charlton-griffin',
        name: 'Charlton Griffin',
        heroBio: 'Classical narration titan and Audio Connoisseur founder, famed for commanding the colossal 126-hour [The Decline and Fall of the Roman Empire](/book/the-decline-and-fall-of-the-roman-empire-edward-gibbon/) with incomparable sonorous dignity and intellectual poise.',
        styleBadges: ['historical-gravitas', 'dialect-immersion'],
        audibleUrl: 'https://www.amazon.co.uk/s?k=Charlton+Griffin&i=audible&tag=thelongbookclub-21',
        referenceUrl: 'https://en.wikipedia.org/wiki/Charlton_Griffin',
        referenceLabel: 'Charlton Griffin Wiki',
        topGenres: ['Ancient World', 'Roman History', 'Classical Historiography', 'Audiobook Classic'],
        vocalHallmarksKeywords: [
            'Stately',
            'Dignity,',
            'Sonorous',
            'Weight'
        ],
        vocalHallmarksSummary: 'Griffin’s resonant classical baritone and impeccable cadence transform massive hundred-hour historical tomes into clear, compelling oral histories.',
        archiveQuote: {
            quote: 'Charlton Griffin commands this colossal 126-hour historical opus with magnificent stamina, stately pacing, and authoritative classical gravitas.',
            bookTitle: 'The Decline and Fall of the Roman Empire',
            bookSlug: 'the-decline-and-fall-of-the-roman-empire-edward-gibbon'
        },
        soundcheckBookSlug: 'the-decline-and-fall-of-the-roman-empire-edward-gibbon',
        topBookSlugs: [
            'the-decline-and-fall-of-the-roman-empire-edward-gibbon',
            'the-history-of-the-peloponnesian-war-thucydides',
            'the-history-of-the-renaissance-world-susan-wise-bauer'
        ]
    },
    'erin-bennett': {
        slug: 'erin-bennett',
        name: 'Erin Bennett',
        heroBio: 'Audie Award finalist and Earphones Award-winning narrator celebrated for courageously taking up the mantle of [Pirateaba](/author/pirateaba/)’s [The Wandering Inn](/book/king-of-duels-the-wandering-inn-book-16-pirateaba/) saga across back-to-back 40+ hour marathon installments.',
        styleBadges: ['dialect-immersion', 'propulsive-momentum'],
        audibleUrl: 'https://www.amazon.co.uk/s?k=Erin+Bennett&i=audible&tag=thelongbookclub-21',
        referenceUrl: 'https://www.erinbennettvo.com',
        referenceLabel: 'Erin Bennett Official',
        topGenres: ['LitRPG', 'Epic Fantasy', 'Progression Fantasy', 'Portal Fantasy'],
        vocalHallmarksKeywords: [
            'Dynamic',
            'Range,',
            'Epic',
            'Stamina'
        ],
        vocalHallmarksSummary: 'Bennett navigates complex tactical magic, roaring battlefield chaos, and dozens of distinct alien and fantasy dialects with boundless vocal energy.',
        archiveQuote: {
            quote: 'Erin Bennett proves without doubt that she is the ideal custodian of The Wandering Inn, delivering a monumental tour-de-force performance.',
            bookTitle: 'Lady of Fire: The Wandering Inn, Book 17',
            bookSlug: 'lady-of-fire-the-wandering-inn-book-17-pirateaba'
        },
        soundcheckBookSlug: 'king-of-duels-the-wandering-inn-book-16-pirateaba',
        topBookSlugs: [
            'king-of-duels-the-wandering-inn-book-16-pirateaba',
            'lady-of-fire-the-wandering-inn-book-17-pirateaba',
            'archmages-ire-the-wandering-inn-book-18-pirateaba'
        ]
    },
    'mark-deakins': {
        slug: 'mark-deakins',
        name: 'Mark Deakins',
        heroBio: 'Stage and voice veteran praised for delivering definitive biographical recordings of [Ron Chernow](/author/ron-chernow/)’s [Grant](/book/grant-ron-chernow/) and Doris Kearns Goodwin’s [The Bully Pulpit](/book/the-bully-pulpit-doris-kearns-goodwin/) with quiet, stately strength.',
        styleBadges: ['historical-gravitas', 'fireside-warmth'],
        audibleUrl: 'https://www.amazon.co.uk/s?k=Mark+Deakins&i=audible&tag=thelongbookclub-21',
        referenceUrl: 'https://www.goodreads.com/author/show/2520160.Mark_Deakins',
        referenceLabel: 'Mark Deakins Goodreads',
        topGenres: ['Biography', 'American History', 'Political Biography', 'Nineteenth Century History'],
        vocalHallmarksKeywords: [
            'Quiet',
            'Strength,',
            'Stately',
            'Dignity'
        ],
        vocalHallmarksSummary: 'Deakins anchors monumental political and military canvases with measured pacing, understated emotional weight, and clear, intelligent phrasing.',
        archiveQuote: {
            quote: 'Mark Deakins delivers a masterful, authoritative narration that anchors Chernow’s expansive forty-eight-hour text with quiet strength and emotional depth.',
            bookTitle: 'Grant',
            bookSlug: 'grant-ron-chernow'
        },
        soundcheckBookSlug: 'grant-ron-chernow',
        topBookSlugs: [
            'grant-ron-chernow',
            'the-bully-pulpit-doris-kearns-goodwin',
            'catherine-the-great-robert-k-massie'
        ]
    },
    'anne-flosnik': {
        slug: 'anne-flosnik',
        name: 'Anne Flosnik',
        heroBio: 'British actress and Audie Award finalist famed for lending rich theatrical texture and haunting psychological depth to [Robin Hobb](/author/robin-hobb/)’s acclaimed [Liveship Traders](/book/ship-of-magic-robin-hobb/) seafaring trilogy.',
        styleBadges: ['dialect-immersion', 'historical-gravitas'],
        audibleUrl: 'https://www.amazon.co.uk/s?k=Anne+Flosnik&i=audible&tag=thelongbookclub-21',
        referenceUrl: 'https://anneflosnik.com',
        referenceLabel: 'Anne Flosnik Official',
        topGenres: ['Epic Fantasy', 'Nautical Fantasy', 'Seafaring Fantasy', 'Magic Systems'],
        vocalHallmarksKeywords: [
            'Seafaring',
            'Majesty,',
            'Theatrical',
            'Range'
        ],
        vocalHallmarksSummary: 'Flosnik’s expressive, classical delivery inhabits sentient ships, serpent sea beasts, and aristocratic merchant dynasties with distinct, atmospheric grandeur.',
        archiveQuote: {
            quote: 'Anne Flosnik’s narration on Ship of Magic is an atmospheric, deeply theatrical tour de force that brings Robin Hobb’s sentient ships to vivid life.',
            bookTitle: 'Ship of Magic',
            bookSlug: 'ship-of-magic-robin-hobb'
        },
        soundcheckBookSlug: 'ship-of-magic-robin-hobb',
        topBookSlugs: [
            'ship-of-magic-robin-hobb',
            'mad-ship-robin-hobb',
            'ship-of-destiny-robin-hobb'
        ]
    },
    'rupert-degas': {
        slug: 'rupert-degas',
        name: 'Rupert Degas',
        heroBio: 'Chameleon voice artist and Audie nominee celebrated for his legendary UK recordings of [Patrick Rothfuss](/author/patrick-rothfuss/)’s [The Name of the Wind](/book/the-name-of-the-wind-patrick-rothfuss/) and [Haruki Murakami](/author/haruki-murakami/)’s surreal masterpieces.',
        styleBadges: ['dialect-immersion', 'fireside-warmth'],
        audibleUrl: 'https://www.amazon.co.uk/s?k=Rupert+Degas&i=audible&tag=thelongbookclub-21',
        referenceUrl: 'https://en.wikipedia.org/wiki/Rupert_Degas',
        referenceLabel: 'Rupert Degas Wiki',
        topGenres: ['Epic Fantasy', 'Magical Realism', 'Literary Fantasy', 'Audiobook Classic'],
        vocalHallmarksKeywords: [
            'Vocal',
            'Chameleon,',
            'Lyrical',
            'Magic'
        ],
        vocalHallmarksSummary: 'Degas commands dozens of razor-sharp regional dialects, effortlessly blending tavern song lyricism with dark psychological mystery.',
        archiveQuote: {
            quote: 'Rupert Degas delivers a legendary, career-defining performance that stands as one of the finest audiobook narrations ever committed to digital audio.',
            bookTitle: 'The Name of the Wind',
            bookSlug: 'the-name-of-the-wind-patrick-rothfuss'
        },
        soundcheckBookSlug: 'the-name-of-the-wind-patrick-rothfuss',
        topBookSlugs: [
            'the-name-of-the-wind-patrick-rothfuss',
            'the-wise-mans-fear-patrick-rothfuss',
            'the-wind-up-bird-chronicle-haruki-murakami'
        ]
    },
    'damian-lynch': {
        slug: 'damian-lynch',
        name: 'Damian Lynch',
        heroBio: 'British stage and voice actor celebrated for bringing world-weary gravel, venomous bite, and tragic gravitas to [Jay Kristoff](/author/jay-kristoff/)’s blockbuster [Empire of the Vampire](/book/empire-of-the-vampire-jay-kristoff/) sequence.',
        styleBadges: ['historical-gravitas', 'propulsive-momentum'],
        audibleUrl: 'https://www.amazon.co.uk/s?k=Damian+Lynch&i=audible&tag=thelongbookclub-21',
        referenceUrl: 'https://www.advoice.co.uk/clients/damian-lynch/',
        referenceLabel: 'Damian Lynch AdVoice',
        topGenres: ['Dark Fantasy', 'Gothic Fantasy', 'Vampire Fiction', 'Grimdark'],
        vocalHallmarksKeywords: [
            'Gothic',
            'Gravel,',
            'Ferocious',
            'Bite'
        ],
        vocalHallmarksSummary: 'Lynch captures the tortured melancholy of a broken holy warrior, balancing caustic French-accented wit with blood-soaked battle fury.',
        archiveQuote: {
            quote: 'Damian Lynch turns in an absolute masterclass of dark fantasy narration, perfectly embodying the world-weary, tormented soul of Gabriel de León.',
            bookTitle: 'Empire of the Vampire',
            bookSlug: 'empire-of-the-vampire-jay-kristoff'
        },
        soundcheckBookSlug: 'empire-of-the-vampire-jay-kristoff',
        topBookSlugs: [
            'empire-of-the-vampire-jay-kristoff',
            'empire-of-the-damned-jay-kristoff',
            'empire-of-the-dawn-jay-kristoff'
        ]
    },
    'marc-vietor': {
        slug: 'marc-vietor',
        name: 'Marc Vietor',
        heroBio: 'Audie Award winner and Earphones recipient famed for giving gruff, laconic military authority to [The Black Company](/book/the-black-company-glen-cook/) and anchoring [Haruki Murakami](/author/haruki-murakami/)’s monumental [1Q84](/book/1q84-haruki-murakami/).',
        styleBadges: ['dialect-immersion', 'historical-gravitas'],
        audibleUrl: 'https://www.amazon.co.uk/s?k=Marc+Vietor&i=audible&tag=thelongbookclub-21',
        referenceUrl: 'https://narrator.page/n/marc_vietor',
        referenceLabel: 'Marc Vietor Profile',
        topGenres: ['Grimdark Fantasy', 'Surrealist Fiction', 'Literary Fiction', 'Audiobook Classic'],
        vocalHallmarksKeywords: [
            'Gruff',
            'Restraint,',
            'Laconic',
            'Grit'
        ],
        vocalHallmarksSummary: 'Vietor’s dry, world-weary baritone captures the exhausted realism of mercenary soldiers and the hypnotic strangeness of surrealist literature.',
        archiveQuote: {
            quote: 'Marc Vietor provides the definitive audio voice for Croaker, narrating with a gruff, dry, and laconic delivery that perfectly matches the tone.',
            bookTitle: 'The Black Company',
            bookSlug: 'the-black-company-glen-cook'
        },
        soundcheckBookSlug: 'the-black-company-glen-cook',
        topBookSlugs: [
            '1q84-haruki-murakami',
            'the-black-company-glen-cook'
        ]
    },
    'victor-bevine': {
        slug: 'victor-bevine',
        name: 'Victor Bevine',
        heroBio: 'Screen actor, screenwriter, and Audie-nominated narrator acclaimed for taking the helm of [Dan Simmons](/author/dan-simmons/)’s Hyperion Cantos across [The Fall of Hyperion](/book/the-fall-of-hyperion-dan-simmons/), [Endymion](/book/endymion-dan-simmons/), and [The Rise of Endymion](/book/the-rise-of-endymion-dan-simmons/).',
        styleBadges: ['historical-gravitas', 'propulsive-momentum'],
        audibleUrl: 'https://www.amazon.co.uk/s?k=Victor+Bevine&i=audible&tag=thelongbookclub-21',
        referenceUrl: 'https://en.wikipedia.org/wiki/Victor_Bevine',
        referenceLabel: 'Victor Bevine Wiki',
        topGenres: ['Space Opera', 'Science Fiction', 'Philosophical Sci-Fi', 'Audiobook Classic'],
        vocalHallmarksKeywords: [
            'Commanding',
            'Clarity,',
            'Philosophical',
            'Depth'
        ],
        vocalHallmarksSummary: 'Bevine commands Simmons’ visionary cosmic landscapes with resonant authority, grounded emotional clarity, and steady dramatic stamina.',
        archiveQuote: {
            quote: 'Victor Bevine’s vocal performance on The Rise of Endymion is a masterclass in long-form dramatic stamina, balancing philosophical wonder and heartbreak.',
            bookTitle: 'The Rise of Endymion',
            bookSlug: 'the-rise-of-endymion-dan-simmons'
        },
        soundcheckBookSlug: 'the-fall-of-hyperion-dan-simmons',
        topBookSlugs: [
            'the-fall-of-hyperion-dan-simmons',
            'endymion-dan-simmons',
            'the-rise-of-endymion-dan-simmons'
        ]
    },
    'saskia-maarleveld': {
        slug: 'saskia-maarleveld',
        name: 'Saskia Maarleveld',
        heroBio: 'Audie Award winner and Earphones recipient celebrated for commanding SenLinYu’s 36-hour [Alchemised](/book/alchemised-senlinyu/) and expanding [Deborah Harkness](/author/deborah-harkness/)’s All Souls universe with haunting poise.',
        styleBadges: ['dialect-immersion', 'fireside-warmth'],
        audibleUrl: 'https://www.amazon.co.uk/s?k=Saskia+Maarleveld&i=audible&tag=thelongbookclub-21',
        referenceUrl: 'https://www.instagram.com/saskiaaudio/?hl=en',
        referenceLabel: 'Saskia Maarleveld Instagram',
        topGenres: ['Dark Fantasy Romance', 'Paranormal Mystery', 'Historical Fantasy', 'Audiobook Classic'],
        vocalHallmarksKeywords: [
            'Emotional',
            'Poise,',
            'Lyrical',
            'Intensity'
        ],
        vocalHallmarksSummary: 'Maarleveld shifts seamlessly between modern American reserve and aristocratic European dialects, imbuing dark romances with visceral emotional vulnerability.',
        archiveQuote: {
            quote: 'Saskia Maarleveld delivers an astounding, emotionally charged performance that elevates the dark themes of SenLinYu’s epic to theatrical heights.',
            bookTitle: 'Alchemised',
            bookSlug: 'alchemised-senlinyu'
        },
        soundcheckBookSlug: 'alchemised-senlinyu',
        topBookSlugs: [
            'alchemised-senlinyu',
            'times-convert-deborah-harkness',
            'the-black-bird-oracle-deborah-harkness'
        ]
    },
    'michael-page': {
        slug: 'michael-page',
        name: 'Michael Page',
        heroBio: 'Theatrical titan and multiple Audie nominee celebrated as the definitive voice of the Gentlemen Bastards in [Scott Lynch](/author/scott-lynch/)’s acclaimed [The Lies of Locke Lamora](/book/the-lies-of-locke-lamora-scott-lynch/) series.',
        styleBadges: ['satirical-bite', 'dialect-immersion'],
        audibleUrl: 'https://www.amazon.co.uk/s?k=Michael+Page&i=audible&tag=thelongbookclub-21',
        referenceUrl: 'https://narrator.page/n/michael_page',
        referenceLabel: 'Michael Page Profile',
        topGenres: ['Fantasy Heist', 'Swashbuckling Fantasy', 'Grimdark Humour', 'Audiobook Classic'],
        vocalHallmarksKeywords: [
            'Infectious',
            'Wit,',
            'Swashbuckling',
            'Flair'
        ],
        vocalHallmarksSummary: 'Page infuses fantasy underworlds with roguish charm, lightning-fast banter, and theatrical venom across unforgettable double-crossing heists.',
        archiveQuote: {
            quote: 'Michael Page delivers a theatrical, rip-roaring vocal tour de force that captures the grime, romance, and deadly danger of Camorr.',
            bookTitle: 'The Lies of Locke Lamora',
            bookSlug: 'the-lies-of-locke-lamora-scott-lynch'
        },
        soundcheckBookSlug: 'the-lies-of-locke-lamora-scott-lynch',
        topBookSlugs: [
            'the-lies-of-locke-lamora-scott-lynch',
            'red-seas-under-red-skies-scott-lynch',
            'the-republic-of-thieves-scott-lynch'
        ]
    },
    'daniel-york-loh': {
        slug: 'daniel-york-loh',
        name: 'Daniel York Loh',
        heroBio: 'Royal Shakespeare Company actor and playwright acclaimed for delivering the definitive English narration of [Cixin Liu](/author/cixin-liu/)’s Hugo Award-winning [The Three-Body Problem](/book/the-three-body-problem-cixin-liu/) trilogy.',
        styleBadges: ['historical-gravitas', 'propulsive-momentum'],
        audibleUrl: 'https://www.amazon.co.uk/s?k=Daniel+York+Loh&i=audible&tag=thelongbookclub-21',
        referenceUrl: 'https://www.danielyorkloh.com',
        referenceLabel: 'Daniel York Loh Official',
        topGenres: ['Hard Science Fiction', 'Cosmic Dread', 'Sci-Fi Epic', 'Audiobook Classic'],
        vocalHallmarksKeywords: [
            'Analytical',
            'Precision,',
            'Quiet',
            'Gravitas'
        ],
        vocalHallmarksSummary: 'Loh navigates dense theoretical physics, historical Chinese trauma, and cosmic existential dread with measured intellectual clarity and calm authority.',
        archiveQuote: {
            quote: 'Daniel York Loh delivers a crisp, intellectually engaging performance that navigates complex quantum theory and intimate historical trauma with equal authority.',
            bookTitle: 'The Three-Body Problem',
            bookSlug: 'the-three-body-problem-cixin-liu'
        },
        soundcheckBookSlug: 'the-three-body-problem-cixin-liu',
        topBookSlugs: [
            'the-three-body-problem-cixin-liu',
            'the-dark-forest-cixin-liu',
            'deaths-end-cixin-liu'
        ]
    },
    'pj-ochlan': {
        slug: 'pj-ochlan',
        name: 'P.J. Ochlan',
        heroBio: 'Multiple Audie Award winner and master dialect coach celebrated for co-narrating [Cixin Liu](/author/cixin-liu/)’s visionary [The Dark Forest](/book/the-dark-forest-cixin-liu/) and [Death’s End](/book/deaths-end-cixin-liu/) cosmic epics.',
        styleBadges: ['dialect-immersion', 'propulsive-momentum'],
        audibleUrl: 'https://www.amazon.co.uk/s?k=P.J.+Ochlan&i=audible&tag=thelongbookclub-21',
        referenceUrl: 'https://pjochlan.com',
        referenceLabel: 'P.J. Ochlan Official',
        topGenres: ['Hard Science Fiction', 'Cosmic Epic', 'Space Exploration', 'Audiobook Classic'],
        vocalHallmarksKeywords: [
            'Chameleon',
            'Accents,',
            'Dynamic',
            'Pacing'
        ],
        vocalHallmarksSummary: 'Ochlan brings unmatched vocal agility and dialect precision to expansive ensembles, anchoring grand scientific spectacles with effortless dramatic clarity.',
        archiveQuote: {
            quote: 'P.J. Ochlan and Daniel York Loh handle the staggering temporal and spatial leaps of this final volume with consummate vocal mastery.',
            bookTitle: "Death's End",
            bookSlug: 'deaths-end-cixin-liu'
        },
        soundcheckBookSlug: 'deaths-end-cixin-liu',
        topBookSlugs: [
            'deaths-end-cixin-liu',
            'the-dark-forest-cixin-liu',
            'the-three-body-problem-cixin-liu'
        ]
    },
    'emily-woo-zeller': {
        slug: 'emily-woo-zeller',
        name: 'Emily Woo Zeller',
        heroBio: 'Audie Award winner and Golden Voice honoree celebrated for her volcanic, heartbreaking vocal performance across [R.F. Kuang](/author/rf-kuang/)’s complete [The Poppy War](/book/the-poppy-war-rf-kuang/) trilogy.',
        styleBadges: ['propulsive-momentum', 'dialect-immersion'],
        audibleUrl: 'https://www.amazon.co.uk/s?k=Emily+Woo+Zeller&i=audible&tag=thelongbookclub-21',
        referenceUrl: 'https://www.emilywoozeller.com',
        referenceLabel: 'Emily Woo Zeller Official',
        topGenres: ['Military Fantasy', 'Grimdark Fantasy', 'Asian Fantasy', 'Audiobook Classic'],
        vocalHallmarksKeywords: [
            'Raw',
            'Vulnerability,',
            'Volcanic',
            'Power'
        ],
        vocalHallmarksSummary: 'Zeller’s fierce, emotionally raw delivery captures the shattering psychological transformation from desperate orphan soldier to vengeful shaman goddess.',
        archiveQuote: {
            quote: 'Emily Woo Zeller delivers an extraordinary, emotionally raw performance that captures every facet of Rin’s transformation with volcanic power.',
            bookTitle: 'The Poppy War',
            bookSlug: 'the-poppy-war-rf-kuang'
        },
        soundcheckBookSlug: 'the-poppy-war-rf-kuang',
        topBookSlugs: [
            'the-poppy-war-rf-kuang',
            'the-dragon-republic-rf-kuang',
            'the-burning-god-rf-kuang'
        ]
    },
    'david-rintoul': {
        slug: 'david-rintoul',
        name: 'David Rintoul',
        heroBio: 'Veteran Scottish classical actor renowned for his razor-sharp narration of Frederick Forsyth’s [The Day of the Jackal](/book/the-day-of-the-jackal/) and Thomas Mann’s 35-hour [The Magic Mountain](/book/the-magic-mountain-thomas-mann/).',
        styleBadges: ['historical-gravitas', 'dialect-immersion'],
        audibleUrl: 'https://www.amazon.co.uk/s?k=David+Rintoul&i=audible&tag=thelongbookclub-21',
        referenceUrl: 'https://en.wikipedia.org/wiki/David_Rintoul',
        referenceLabel: 'David Rintoul Wiki',
        topGenres: ['Espionage Thriller', 'Philosophical Classics', 'Literary Classics', 'Audiobook Classic'],
        vocalHallmarksKeywords: [
            'Clinical',
            'Precision,',
            'Scottish',
            'Authority'
        ],
        vocalHallmarksSummary: 'Rintoul’s authoritative Scottish baritone brings clinical procedural suspense to classic espionage and intellectual elegance to European masterpieces.',
        archiveQuote: {
            quote: 'David Rintoul gives a chillingly precise, razor-sharp narration that suits Forsyth’s clinical prose to perfection.',
            bookTitle: 'The Day of the Jackal',
            bookSlug: 'the-day-of-the-jackal'
        },
        soundcheckBookSlug: 'the-magic-mountain-thomas-mann',
        topBookSlugs: [
            'the-magic-mountain-thomas-mann',
            'the-day-of-the-jackal',
            'an-officer-and-a-spy'
        ]
    },
    'simon-russell-beale': {
        slug: 'simon-russell-beale',
        name: 'Simon Russell Beale',
        heroBio: 'Three-time Olivier Award and Tony Award-winning theatrical titan acclaimed as the definitive voice of George Smiley in [John le Carré](/author/john-le-carre/)’s [Tinker Tailor Soldier Spy](/book/tinker-tailor-soldier-spy/) and [The Honourable Schoolboy](/book/the-honourable-schoolboy-john-le-carre/).',
        styleBadges: ['historical-gravitas', 'fireside-warmth'],
        audibleUrl: 'https://www.amazon.co.uk/s?k=Simon+Russell+Beale&i=audible&tag=thelongbookclub-21',
        referenceUrl: 'https://en.wikipedia.org/wiki/Simon_Russell_Beale',
        referenceLabel: 'Simon Russell Beale Wiki',
        topGenres: ['Cold War Espionage', 'British Spy Fiction', 'Russian Imperial History', 'Audiobook Classic'],
        vocalHallmarksKeywords: [
            'Aristocratic',
            'Nuance,',
            'Quiet',
            'Cynicism'
        ],
        vocalHallmarksSummary: 'Beale inhabits the shadowy corridors of the Circus with incomparable nuance, conveying weary British intelligence tradecraft and melancholy dignity.',
        archiveQuote: {
            quote: 'Simon Russell Beale delivers a definitive, virtuoso vocal performance that captures George Smiley with extraordinary authenticity and depth.',
            bookTitle: 'Tinker Tailor Soldier Spy',
            bookSlug: 'tinker-tailor-soldier-spy'
        },
        soundcheckBookSlug: 'tinker-tailor-soldier-spy',
        topBookSlugs: [
            'tinker-tailor-soldier-spy',
            'the-honourable-schoolboy-john-le-carre',
            'the-romanovs-1613-1918-simon-sebag-montefiore'
        ]
    },
    'sophie-aldred': {
        slug: 'sophie-aldred',
        name: 'Sophie Aldred',
        heroBio: 'Beloved British screen and voice icon celebrated for narrating [Adrian Tchaikovsky](/author/adrian-tchaikovsky/)’s complete Final Architecture space opera trilogy, beginning with the award-winning [Shards of Earth](/book/shards-of-earth/).',
        styleBadges: ['propulsive-momentum', 'dialect-immersion'],
        audibleUrl: 'https://www.amazon.co.uk/s?k=Sophie+Aldred&i=audible&tag=thelongbookclub-21',
        referenceUrl: 'https://en.wikipedia.org/wiki/Sophie_Aldred',
        referenceLabel: 'Sophie Aldred Wiki',
        topGenres: ['Space Opera', 'Science Fiction', 'Alien Contact', 'Audiobook Classic'],
        vocalHallmarksKeywords: [
            'Dynamic',
            'Velocity,',
            'Alien',
            'Range'
        ],
        vocalHallmarksSummary: 'Aldred commands high-octane space battles and dozens of distinct extraterrestrial species with breathless velocity, sharp humor, and emotional heart.',
        archiveQuote: {
            quote: 'Sophie Aldred gives a vibrant, tour-de-force narration that brings Tchaikovsky’s multi-species universe roaring to life.',
            bookTitle: 'Shards of Earth',
            bookSlug: 'shards-of-earth'
        },
        soundcheckBookSlug: 'shards-of-earth',
        topBookSlugs: [
            'shards-of-earth',
            'eyes-of-the-void-adrian-tchaikovsky',
            'lords-of-uncreation-adrian-tchaikovsky'
        ]
    },
    'christian-rodska': {
        slug: 'christian-rodska',
        name: 'Christian Rodska',
        heroBio: 'The late British acting veteran acclaimed as the definitive weathered voice behind [Brian McClellan](/author/brian-mcclellan/)’s [Promise of Blood](/book/promise-of-blood-brian-mcclellan/) and the entire Powder Mage flintlock fantasy universe.',
        styleBadges: ['historical-gravitas', 'propulsive-momentum'],
        audibleUrl: 'https://www.amazon.co.uk/s?k=Christian+Rodska&i=audible&tag=thelongbookclub-21',
        referenceUrl: 'https://en.wikipedia.org/wiki/Christian_Rodska',
        referenceLabel: 'Christian Rodska Wiki',
        topGenres: ['Flintlock Fantasy', 'Military Fantasy', 'Epic Fantasy', 'Audiobook Classic'],
        vocalHallmarksKeywords: [
            'Weathered',
            'Gravel,',
            'Battlefield',
            'Command'
        ],
        vocalHallmarksSummary: 'Rodska’s raspy, smoke-cured baritone exudes authentic military authority, conveying the smoke, thunder, and tactical desperation of frontline warfare.',
        archiveQuote: {
            quote: 'Christian Rodska’s weathered, resonant baritone is the ultimate match for Brian McClellan’s flintlock universe, imbuing Field Marshal Tamas with gravelly authority.',
            bookTitle: 'Promise of Blood',
            bookSlug: 'promise-of-blood-brian-mcclellan'
        },
        soundcheckBookSlug: 'promise-of-blood-brian-mcclellan',
        topBookSlugs: [
            'promise-of-blood-brian-mcclellan',
            'the-crimson-campaign-brian-mcclellan',
            'the-autumn-republic-brian-mcclellan'
        ]
    },
    'dylan-baker': {
        slug: 'dylan-baker',
        name: 'Dylan Baker',
        heroBio: 'Emmy and Tony-nominated character actor celebrated for delivering the definitive 25-hour recording of Walter Isaacson’s [Steve Jobs](/book/steve-jobs-walter-isaacson/) and John Steinbeck’s [The Grapes of Wrath](/book/the-grapes-of-wrath-john-steinbeck/).',
        styleBadges: ['historical-gravitas', 'fireside-warmth'],
        audibleUrl: 'https://www.amazon.co.uk/s?k=Dylan+Baker&i=audible&tag=thelongbookclub-21',
        referenceUrl: 'https://en.wikipedia.org/wiki/Dylan_Baker',
        referenceLabel: 'Dylan Baker Wiki',
        topGenres: ['Biography', 'American Classics', 'Financial Thriller', 'Audiobook Classic'],
        vocalHallmarksKeywords: [
            'Mercurial',
            'Energy,',
            'Intimate',
            'Pathos'
        ],
        vocalHallmarksSummary: 'Baker combines razor-sharp journalistic momentum with profound emotional empathy, shifting effortlessly from high-stakes tech boardrooms to Dust Bowl tragedy.',
        archiveQuote: {
            quote: 'Dylan Baker delivers an exceptional, razor-sharp performance that perfectly mirrors the intense energy, biting wit, and mercurial temperament of Steve Jobs.',
            bookTitle: 'Steve Jobs',
            bookSlug: 'steve-jobs-walter-isaacson'
        },
        soundcheckBookSlug: 'steve-jobs-walter-isaacson',
        topBookSlugs: [
            'steve-jobs-walter-isaacson',
            'the-grapes-of-wrath-john-steinbeck',
            'flash-boys-michael-lewis'
        ]
    },
    'bruno-roubicek': {
        slug: 'bruno-roubicek',
        name: 'Bruno Roubicek',
        heroBio: 'Distinguished British voice actor and academic acclaimed for anchoring key perspectives across [Cixin Liu](/author/cixin-liu/)’s [The Three-Body Problem](/book/the-three-body-problem-cixin-liu/) and [Death’s End](/book/deaths-end-cixin-liu/) audio epics.',
        styleBadges: ['historical-gravitas', 'dialect-immersion'],
        audibleUrl: 'https://www.amazon.co.uk/s?k=Bruno+Roubicek&i=audible&tag=thelongbookclub-21',
        referenceUrl: 'https://narrator.page/n/bruno_roubicek',
        referenceLabel: 'Bruno Roubicek Profile',
        topGenres: ['Hard Science Fiction', 'Cosmic Dread', 'Sci-Fi Drama', 'Audiobook Classic'],
        vocalHallmarksKeywords: [
            'Measured',
            'Clarity,',
            'Scholarly',
            'Weight'
        ],
        vocalHallmarksSummary: 'Roubicek’s refined, intellectual delivery brings steady dramatic clarity to complex theoretical physics and sweeping multi-millennial galactic chronicles.',
        archiveQuote: {
            quote: 'Bruno Roubicek brings measured academic poise and crisp dramatic clarity to Cixin Liu’s sprawling cosmic universe.',
            bookTitle: 'The Three-Body Problem',
            bookSlug: 'the-three-body-problem-cixin-liu'
        },
        soundcheckBookSlug: 'the-three-body-problem-cixin-liu',
        topBookSlugs: [
            'deaths-end-cixin-liu',
            'the-three-body-problem-cixin-liu',
            'the-redemption-of-time-baoshu'
        ]
    },
    'andy-serkis': {
        slug: 'andy-serkis',
        name: 'Andy Serkis',
        heroBio: 'BAFTA and Audie Award-winning cinematic legend who brought [J.R.R. Tolkien](/author/jrr-tolkien/)’s [The Fellowship of the Ring](/book/the-fellowship-of-the-ring-jrr-tolkien/) and Middle-earth to life with incandescent, world-class theatrical virtuosity.',
        styleBadges: ['character-chameleon', 'dialect-immersion'],
        audibleUrl: 'https://www.amazon.co.uk/s?k=Andy+Serkis&i=audible&tag=thelongbookclub-21',
        referenceUrl: 'https://en.wikipedia.org/wiki/Andy_Serkis',
        referenceLabel: 'Andy Serkis Wiki',
        topGenres: ['High Fantasy', 'Epic Fantasy', 'Audiobook Classic', 'Literary Classics'],
        vocalHallmarksKeywords: [
            'Theatrical',
            'Virtuosity,',
            'Vocal',
            'Power'
        ],
        vocalHallmarksSummary: 'Serkis transforms Middle-earth into a living, breathing soundscape, inhabiting every Hobbit, Elf, and corrupted creature with jaw-dropping dramatic commitment.',
        archiveQuote: {
            quote: 'Andy Serkis delivers a vibrant, theatrical virtuosity that makes Tolkien’s world feel immediate, visceral, and utterly majestic.',
            bookTitle: 'The Fellowship of the Ring',
            bookSlug: 'the-fellowship-of-the-ring-jrr-tolkien'
        },
        soundcheckBookSlug: 'the-fellowship-of-the-ring-jrr-tolkien',
        topBookSlugs: [
            'the-fellowship-of-the-ring-jrr-tolkien',
            'the-two-towers-jrr-tolkien',
            'the-return-of-the-king-jrr-tolkien'
        ]
    },
    'rob-inglis': {
        slug: 'rob-inglis',
        name: 'Rob Inglis',
        heroBio: 'Pioneering Australian-born classical actor revered as the timeless original voice of [J.R.R. Tolkien](/author/jrr-tolkien/)’s [The Fellowship of the Ring](/book/the-fellowship-of-the-ring-jrr-tolkien/) and unabridged Middle-earth audiobooks.',
        styleBadges: ['fireside-warmth', 'historical-gravitas'],
        audibleUrl: 'https://www.amazon.co.uk/s?k=Rob+Inglis&i=audible&tag=thelongbookclub-21',
        referenceUrl: 'https://en.wikipedia.org/wiki/Rob_Inglis',
        referenceLabel: 'Rob Inglis Wiki',
        topGenres: ['High Fantasy', 'Audiobook Classic', 'Mythic Poetry', 'Epic Fantasy'],
        vocalHallmarksKeywords: [
            'Fireside',
            'Warmth,',
            'Mythic',
            'Song'
        ],
        vocalHallmarksSummary: 'Inglis delivers a grandfatherly, mythic hearthside narration, chanting Tolkien’s ancient songs and verses with profound folkloric reverence.',
        archiveQuote: {
            quote: 'Rob Inglis delivers classic, BBC-style warmth and stately authority that defined Tolkien’s auditory identity for generations of listeners.',
            bookTitle: 'The Two Towers',
            bookSlug: 'the-two-towers-jrr-tolkien'
        },
        soundcheckBookSlug: 'the-fellowship-of-the-ring-jrr-tolkien',
        topBookSlugs: [
            'the-fellowship-of-the-ring-jrr-tolkien',
            'the-two-towers-jrr-tolkien',
            'the-return-of-the-king-jrr-tolkien'
        ]
    },
    'helen-duff': {
        slug: 'helen-duff',
        name: 'Helen Duff',
        heroBio: 'LAMDA-trained actress and comedian celebrated for her ferocious, poetic performance as Nona Grey across [Mark Lawrence](/author/mark-lawrence/)’s [Red Sister](/book/red-sister-mark-lawrence/) and the complete Book of the Ancestor trilogy.',
        styleBadges: ['propulsive-momentum', 'dialect-immersion'],
        audibleUrl: 'https://www.amazon.co.uk/s?k=Helen+Duff&i=audible&tag=thelongbookclub-21',
        referenceUrl: 'https://helenduff.com',
        referenceLabel: 'Helen Duff Official',
        topGenres: ['Grimdark Fantasy', 'Assassin Fantasy', 'Dark Fantasy', 'Magic Systems'],
        vocalHallmarksKeywords: [
            'Ferocious',
            'Grit,',
            'Poetic',
            'Intensity'
        ],
        vocalHallmarksSummary: 'Duff balances razor-sharp martial combat urgency with deep convent sisterhood intimacy, portraying lethal assassin novitiates with incandescent emotional fire.',
        archiveQuote: {
            quote: 'Helen Duff delivers a magnificent, versatile narration that captures the fierce spirit of Nona Grey and the formidable presence of Sweet Mercy.',
            bookTitle: 'Red Sister',
            bookSlug: 'red-sister-mark-lawrence'
        },
        soundcheckBookSlug: 'red-sister-mark-lawrence',
        topBookSlugs: [
            'red-sister-mark-lawrence',
            'grey-sister-mark-lawrence',
            'holy-sister-mark-lawrence'
        ]
    },
    'mel-hudson': {
        slug: 'mel-hudson',
        name: 'Mel Hudson',
        heroBio: 'British voice actress and comedian renowned for giving crisp scientific authority and mind-bending alien presence to [Adrian Tchaikovsky](/author/adrian-tchaikovsky/)’s Arthur C. Clarke Award-winning [Children of Time](/book/children-of-time/) trilogy.',
        styleBadges: ['dialect-immersion', 'historical-gravitas'],
        audibleUrl: 'https://www.amazon.co.uk/s?k=Mel+Hudson&i=audible&tag=thelongbookclub-21',
        referenceUrl: 'https://en.wikipedia.org/wiki/Melanie_Hudson',
        referenceLabel: 'Melanie Hudson Wiki',
        topGenres: ['Hard Science Fiction', 'Evolutionary Sci-Fi', 'Space Exploration', 'Audiobook Classic'],
        vocalHallmarksKeywords: [
            'Scientific',
            'Poise,',
            'Alien',
            'Wonder'
        ],
        vocalHallmarksSummary: 'Hudson navigates disparate evolutionary physiologies with chilling precision, bridging arachnid cognition and human desperation across millions of years.',
        archiveQuote: {
            quote: 'Mel Hudson delivers a virtuoso performance that bridges human desperation with non-human wonder, maintaining pristine vocal consistency.',
            bookTitle: 'Children of Time',
            bookSlug: 'children-of-time'
        },
        soundcheckBookSlug: 'children-of-time',
        topBookSlugs: [
            'children-of-time',
            'children-of-ruin-adrian-tchaikovsky',
            'children-of-memory-adrian-tchaikovsky'
        ]
    },
    'amy-landon': {
        slug: 'amy-landon',
        name: 'Amy Landon',
        heroBio: 'Audie-nominated dialect coach and narrator celebrated for bringing incisive poise to [Arkady Martine](/author/arkady-martine/)’s Hugo-winning [A Memory Called Empire](/book/a-memory-called-empire/) and Micaiah Johnson’s [The Space Between Worlds](/book/the-space-between-worlds-micaiah-johnson/).',
        styleBadges: ['dialect-immersion', 'propulsive-momentum'],
        audibleUrl: 'https://www.amazon.co.uk/s?k=Amy+Landon&i=audible&tag=thelongbookclub-21',
        referenceUrl: 'https://www.landonamy.com/voiceover',
        referenceLabel: 'Amy Landon Voiceover',
        topGenres: ['Space Opera', 'Sci-Fi Mystery', 'Multiverse Sci-Fi', 'Audiobook Classic'],
        vocalHallmarksKeywords: [
            'Incisive',
            'Poise,',
            'Lyrical',
            'Precision'
        ],
        vocalHallmarksSummary: 'Landon commands intricate political court intrigue and gritty multiverse survival with immaculate diction, hypnotic pacing, and sharp emotional resonance.',
        archiveQuote: {
            quote: 'Amy Landon delivers an incisive, mesmerizing performance that brings the poetic and bureaucratic nuances of Teixcalaanli society into sharp focus.',
            bookTitle: 'A Memory Called Empire',
            bookSlug: 'a-memory-called-empire'
        },
        soundcheckBookSlug: 'a-memory-called-empire',
        topBookSlugs: [
            'a-memory-called-empire',
            'a-desolation-called-peace-arkady-martine',
            'the-space-between-worlds-micaiah-johnson'
        ]
    },
    'daniel-henning': {
        slug: 'daniel-henning',
        name: 'Daniel Henning',
        heroBio: 'Audie Award finalist and director praised for his heartwarming, deeply compassionate narration across [TJ Klune](/author/tj-klune/)’s beloved [The House in the Cerulean Sea](/book/the-house-in-the-cerulean-sea-tj-klune/) and Marsyas Island sequels.',
        styleBadges: ['fireside-warmth', 'satirical-bite'],
        audibleUrl: 'https://www.amazon.co.uk/s?k=Daniel+Henning&i=audible&tag=thelongbookclub-21',
        referenceUrl: 'https://www.danielhenning.net',
        referenceLabel: 'Daniel Henning Official',
        topGenres: ['Cozy Fantasy', 'Found Family', 'Magical Realism', 'Audiobook Classic'],
        vocalHallmarksKeywords: [
            'Hearthside',
            'Warmth,',
            'Joyful',
            'Whimsy'
        ],
        vocalHallmarksSummary: 'Henning infuses cozy fantasy with infectious warmth, giving each magical child and eccentric robotic companion an unforgettable, loveable acoustic identity.',
        archiveQuote: {
            quote: 'Daniel Henning delivers a phenomenal, deeply compassionate tour-de-force narration that brings Klune’s beloved cast of magical misfits to radiant life.',
            bookTitle: 'The House in the Cerulean Sea',
            bookSlug: 'the-house-in-the-cerulean-sea-tj-klune'
        },
        soundcheckBookSlug: 'the-house-in-the-cerulean-sea-tj-klune',
        topBookSlugs: [
            'the-house-in-the-cerulean-sea-tj-klune',
            'somewhere-beyond-the-sea-tj-klune',
            'in-the-lives-of-puppets-tj-klune'
        ]
    },
    'james-lailey': {
        slug: 'james-lailey',
        name: 'James Lailey',
        heroBio: 'Accomplished British stage and screen actor celebrated for narrating [Len Deighton](/author/len-deighton/)’s classic Bernard Samson Cold War espionage trilogy, beginning with the acclaimed [Berlin Game](/book/berlin-game/).',
        styleBadges: ['satirical-bite', 'dialect-immersion'],
        audibleUrl: 'https://www.amazon.co.uk/s?k=James+Lailey&i=audible&tag=thelongbookclub-21',
        referenceUrl: 'https://www.imdb.com/name/nm1490340/',
        referenceLabel: 'James Lailey IMDb',
        topGenres: ['Espionage', 'Cold War Thriller', 'Historical Fiction', 'British Mystery'],
        vocalHallmarksKeywords: [
            'Sardonic',
            'Irony,',
            'Espionage',
            'Tension'
        ],
        vocalHallmarksSummary: 'Lailey brings a dry, razor-sharp intelligence and sardonic understatement to complex Cold War espionage and character-driven historical intrigue.',
        archiveQuote: {
            quote: 'James Lailey captures the dry, sardonic personality of Bernard Samson with exceptional skill, balancing cold-blooded tradecraft with domestic weariness.',
            bookTitle: 'Berlin Game',
            bookSlug: 'berlin-game'
        },
        soundcheckBookSlug: 'berlin-game',
        topBookSlugs: [
            'berlin-game',
            'mexico-set-len-deighton',
            'london-match-len-deighton'
        ]
    },
    'adjoa-andoh': {
        slug: 'adjoa-andoh',
        name: 'Adjoa Andoh',
        heroBio: 'Acclaimed British screen and stage star celebrated for voicing [Ann Leckie](/author/ann-leckie/)’s Hugo and Nebula Award-winning Imperial Radch space opera trilogy, beginning with the groundbreaking [Ancillary Justice](/book/ancillary-justice/).',
        styleBadges: ['propulsive-momentum', 'dialect-immersion'],
        audibleUrl: 'https://www.amazon.co.uk/s?k=Adjoa+Andoh&i=audible&tag=thelongbookclub-21',
        referenceUrl: 'https://en.wikipedia.org/wiki/Adjoa_Andoh',
        referenceLabel: 'Adjoa Andoh Wiki',
        topGenres: ['Space Opera', 'Science Fiction', 'Military Sci-Fi', 'Audiobook Classic'],
        vocalHallmarksKeywords: [
            'Hypnotic',
            'Command,',
            'Crystalline',
            'Grace'
        ],
        vocalHallmarksSummary: 'Andoh crafts an acoustic tour de force across expansive science fiction realms with crystalline diction, imperial poise, and breathtaking emotional resonance.',
        archiveQuote: {
            quote: 'Adjoa Andoh gives a tour-de-force narration that turns Leckie’s challenging narrative architecture into pure audio gold.',
            bookTitle: 'Ancillary Justice',
            bookSlug: 'ancillary-justice'
        },
        soundcheckBookSlug: 'ancillary-justice',
        topBookSlugs: [
            'ancillary-justice',
            'ancillary-sword-ann-leckie',
            'ancillary-mercy-ann-leckie'
        ]
    },
    'william-dufris': {
        slug: 'william-dufris',
        name: 'William Dufris',
        heroBio: 'The late, legendary voice actor and Audie Award winner renowned for voicing [Neal Stephenson](/author/neal-stephenson/)’s sprawling intellectual epics, including the monumental tech-thriller masterpiece [Cryptonomicon](/book/cryptonomicon-neal-stephenson/).',
        styleBadges: ['character-chameleon', 'propulsive-momentum'],
        audibleUrl: 'https://www.amazon.co.uk/s?k=William+Dufris&i=audible&tag=thelongbookclub-21',
        referenceUrl: 'https://en.wikipedia.org/wiki/William_Dufris',
        referenceLabel: 'William Dufris Wiki',
        topGenres: ['Cyberpunk', 'Historical Fiction', 'Science Fiction', 'Techno-Thriller'],
        vocalHallmarksKeywords: [
            'Vibrant',
            'Genius,',
            'Manic',
            'Stamina'
        ],
        vocalHallmarksSummary: 'The late Dufris was a peerless vocal architect, effortlessly juggling cryptographic equations, frantic capers, and dozens of idiosyncratic voices with relentless gusto.',
        archiveQuote: {
            quote: 'The late William Dufris delivers a phenomenal, career-defining performance that turns Stephenson’s dense technological prose into high-velocity entertainment.',
            bookTitle: 'Cryptonomicon',
            bookSlug: 'cryptonomicon-neal-stephenson'
        },
        soundcheckBookSlug: 'cryptonomicon-neal-stephenson',
        topBookSlugs: [
            'cryptonomicon-neal-stephenson',
            'quicksilver-neal-stephenson',
            'anathem-neal-stephenson'
        ]
    },
    'thandiwe-newton': {
        slug: 'thandiwe-newton',
        name: 'Thandiwe Newton',
        heroBio: 'Emmy and BAFTA-winning actress celebrated for her tour-de-force narration of [Leo Tolstoy](/author/leo-tolstoy/)’s colossal Russian historical epic [War and Peace](/book/war-and-peace-leo-tolstoy/) and classic romantic literature.',
        styleBadges: ['historical-gravitas', 'fireside-warmth'],
        audibleUrl: 'https://www.amazon.co.uk/s?k=Thandiwe+Newton&i=audible&tag=thelongbookclub-21',
        referenceUrl: 'https://en.wikipedia.org/wiki/Thandiwe_Newton',
        referenceLabel: 'Thandiwe Newton Wiki',
        topGenres: ['Classic Literature', 'Historical Fiction', 'Russian Literature', 'Victorian Romance'],
        vocalHallmarksKeywords: [
            'Exquisite',
            'Grace,',
            'Luminous',
            'Intimacy'
        ],
        vocalHallmarksSummary: 'Newton delivers luminous, transcendent interpretations of sweeping classics, capturing both epic battlefield panoramas and aching personal heartbreak with effortless elegance.',
        archiveQuote: {
            quote: 'Thandiwe Newton delivers a breathtaking, Audie-caliber performance that breathes vibrant, contemporary life and emotional intimacy into Tolstoy’s epic.',
            bookTitle: 'War and Peace',
            bookSlug: 'war-and-peace-leo-tolstoy'
        },
        soundcheckBookSlug: 'war-and-peace-leo-tolstoy',
        topBookSlugs: [
            'war-and-peace-leo-tolstoy',
            'jane-eyre-charlotte-bront'
        ]
    },
    'ralph-lister': {
        slug: 'ralph-lister',
        name: 'Ralph Lister',
        heroBio: 'Distinguished British-American actor renowned for his towering 53-hour narration of James Clavell’s feudal masterpiece [Shōgun](/book/shogun-james-clavell/) and epic dark military fantasy sagas.',
        styleBadges: ['historical-gravitas', 'dialect-immersion'],
        audibleUrl: 'https://www.amazon.co.uk/s?k=Ralph+Lister&i=audible&tag=thelongbookclub-21',
        referenceUrl: 'https://www.beeaudio.com/narrator/ralph-lister',
        referenceLabel: 'Ralph Lister BeeAudio',
        topGenres: ['Historical Fiction', 'Epic Fantasy', 'Military Sci-Fi', 'Audiobook Classic'],
        vocalHallmarksKeywords: [
            'Theatrical',
            'Grandeur,',
            'Feudal',
            'Resonance'
        ],
        vocalHallmarksSummary: 'Lister commands sprawling fantasy empires and historic clash of cultures with classical theatrical vigor, commanding timbre, and astonishing character versatility.',
        archiveQuote: {
            quote: 'Ralph Lister delivers a masterly narration that brings the grandeur and deadly tension of feudal Japan to vivid life with astonishing character voices.',
            bookTitle: 'Shōgun',
            bookSlug: 'shogun-james-clavell'
        },
        soundcheckBookSlug: 'shogun-james-clavell',
        topBookSlugs: [
            'shogun-james-clavell',
            'gardens-of-the-moon-steven-erikson',
            'battlefield-earth-l-ron-hubbard'
        ]
    },
    'richard-armitage': {
        slug: 'richard-armitage',
        name: 'Richard Armitage',
        heroBio: 'Celebrated British screen and stage actor renowned for his commanding, Audie-nominated performance of [Charles Dickens](/author/charles-dickens/)’s Victorian coming-of-age classic [David Copperfield](/book/david-copperfield-charles-dickens/).',
        styleBadges: ['historical-gravitas', 'fireside-warmth'],
        audibleUrl: 'https://www.amazon.co.uk/s?k=Richard+Armitage&i=audible&tag=thelongbookclub-21',
        referenceUrl: 'https://en.wikipedia.org/wiki/Richard_Armitage_(actor)',
        referenceLabel: 'Richard Armitage Wiki',
        topGenres: ['Victorian Literature', 'Classic Fiction', 'Historical Fantasy', 'Audiobook Classic'],
        vocalHallmarksKeywords: [
            'Velvet',
            'Baritone,',
            'Literary',
            'Soul'
        ],
        vocalHallmarksSummary: 'Armitage’s velvety, resonant baritone pairs profound classical dignity with subtle, piercing vulnerability across Dickensian sagas and magical period epics.',
        archiveQuote: {
            quote: 'Richard Armitage delivers a tour-de-force performance of extraordinary theatrical range and vocal stamina, infusing Dickensian characters with rich psychological depth.',
            bookTitle: 'David Copperfield',
            bookSlug: 'david-copperfield-charles-dickens'
        },
        soundcheckBookSlug: 'david-copperfield-charles-dickens',
        topBookSlugs: [
            'david-copperfield-charles-dickens',
            'jonathan-strange-mr-norrell-susanna-clarke'
        ]
    },
    'shakira-shute': {
        slug: 'shakira-shute',
        name: 'Shakira Shute',
        heroBio: 'Prolific British voice artist celebrated for bringing fierce emotional power to [Jay Kristoff](/author/jay-kristoff/)’s gothic vampire fantasy sagas, including the sweeping dark epic [Empire of the Damned](/book/empire-of-the-damned-jay-kristoff/).',
        styleBadges: ['propulsive-momentum', 'dual-pov-synergy'],
        audibleUrl: 'https://www.amazon.co.uk/s?k=Shakira+Shute&i=audible&tag=thelongbookclub-21',
        referenceUrl: 'https://www.shakirashute.com',
        referenceLabel: 'Shakira Shute Official',
        topGenres: ['Gothic Fantasy', 'Dark Fantasy', 'Vampire Fiction', 'Action Fantasy'],
        vocalHallmarksKeywords: [
            'Ferocious',
            'Grit,',
            'Gothic',
            'Intensity'
        ],
        vocalHallmarksSummary: 'Shute channels visceral defiance and emotional vulnerability into sweeping dark fantasy epics, delivering edge-of-seat pacing and fierce character conviction.',
        archiveQuote: {
            quote: 'Shakira Shute provides a powerhouse performance that captures the raw ferocity and gothic tragedy of Jay Kristoff’s dark vampire realm.',
            bookTitle: 'Empire of the Damned',
            bookSlug: 'empire-of-the-damned-jay-kristoff'
        },
        soundcheckBookSlug: 'empire-of-the-damned-jay-kristoff',
        topBookSlugs: [
            'empire-of-the-damned-jay-kristoff',
            'empire-of-the-dawn-jay-kristoff'
        ]
    },
    'oliver-wyman': {
        slug: 'oliver-wyman',
        name: 'Oliver Wyman',
        heroBio: 'Prolific Audie Award-winning narrator renowned for his emotionally devastating, tour-de-force performance of Hanya Yanagihara’s acclaimed literary masterpiece [A Little Life](/book/a-little-life-hanya-yanagihara/).',
        styleBadges: ['character-chameleon', 'fireside-warmth'],
        audibleUrl: 'https://www.amazon.co.uk/s?k=Oliver+Wyman&i=audible&tag=thelongbookclub-21',
        referenceUrl: 'https://en.wikipedia.org/wiki/Oliver_Wyman_(actor)',
        referenceLabel: 'Oliver Wyman Wiki',
        topGenres: ['Literary Fiction', 'Contemporary Drama', 'Science Fiction', 'Urban Fantasy'],
        vocalHallmarksKeywords: [
            'Emotional',
            'Devastation,',
            'Dynamic',
            'Elasticity'
        ],
        vocalHallmarksSummary: 'Wyman is a master of acoustic empathy and elastic transformation, moving seamlessly from heart-wrenching emotional tragedy to blistering urban fantasy action.',
        archiveQuote: {
            quote: 'Oliver Wyman delivers an astonishing, emotionally devastating vocal performance that captures the delicate heartbreak and deep humanity of Yanagihara’s prose.',
            bookTitle: 'A Little Life',
            bookSlug: 'a-little-life-hanya-yanagihara'
        },
        soundcheckBookSlug: 'a-little-life-hanya-yanagihara',
        topBookSlugs: [
            'a-little-life-hanya-yanagihara',
            'monster-hunter-international-larry-correia',
            'anathem-neal-stephenson'
        ]
    },
    'rebecca-soler': {
        slug: 'rebecca-soler',
        name: 'Rebecca Soler',
        heroBio: 'Bestselling voice artist renowned for her high-octane dual narration of [Rebecca Yarros](/author/rebecca-yarros/)’s sensationally popular Empyrean dragon-riding fantasy series, beginning with [Fourth Wing](/book/fourth-wing-rebecca-yarros/).',
        styleBadges: ['propulsive-momentum', 'dual-pov-synergy'],
        audibleUrl: 'https://www.amazon.co.uk/s?k=Rebecca+Soler&i=audible&tag=thelongbookclub-21',
        referenceUrl: 'https://en.wikipedia.org/wiki/Rebecca_Soler',
        referenceLabel: 'Rebecca Soler Wiki',
        topGenres: ['Romantasy', 'Epic Fantasy', 'Dragons', 'Enemies to Lovers'],
        vocalHallmarksKeywords: [
            'Relentless',
            'Spitfire,',
            'Visceral',
            'Heat'
        ],
        vocalHallmarksSummary: 'Soler’s electric, passionate performance captures the razor-wire danger, emotional vulnerability, and defiance of epic dragon-riding romantasy heroines.',
        archiveQuote: {
            quote: 'Rebecca Soler delivers a high-octane, emotionally charged performance that perfectly captures the razor-wire danger and fierce defiance of the riders.',
            bookTitle: 'Fourth Wing',
            bookSlug: 'fourth-wing-rebecca-yarros'
        },
        soundcheckBookSlug: 'fourth-wing-rebecca-yarros',
        topBookSlugs: [
            'fourth-wing-rebecca-yarros',
            'iron-flame-rebecca-yarros',
            'onyx-storm-rebecca-yarros'
        ]
    },
    'teddy-hamilton': {
        slug: 'teddy-hamilton',
        name: 'Teddy Hamilton',
        heroBio: 'Prolific romance and fantasy narrator renowned for voicing the brooding dragon rider Xaden Riorson in [Rebecca Yarros](/author/rebecca-yarros/)’s blockbuster Empyrean series, beginning with [Fourth Wing](/book/fourth-wing-rebecca-yarros/).',
        styleBadges: ['dual-pov-synergy', 'fireside-warmth'],
        audibleUrl: 'https://www.amazon.co.uk/s?k=Teddy+Hamilton&i=audible&tag=thelongbookclub-21',
        referenceUrl: 'https://www.instagram.com/narratedbyteddyhamilton/',
        referenceLabel: 'Teddy Hamilton Instagram',
        topGenres: ['Romantasy', 'Epic Fantasy', 'Contemporary Romance', 'Enemies to Lovers'],
        vocalHallmarksKeywords: [
            'Smoldering',
            'Swagger,',
            'Commanding',
            'Depth'
        ],
        vocalHallmarksSummary: 'Hamilton delivers a rich, textured baritone infused with lethal authority and protective tenderness, anchoring modern romantasy audiobooks with explosive chemistry.',
        archiveQuote: {
            quote: 'Teddy Hamilton commands the microphone with brooding authority and lethal charisma, delivering a masterclass in modern romantasy tension.',
            bookTitle: 'Fourth Wing',
            bookSlug: 'fourth-wing-rebecca-yarros'
        },
        soundcheckBookSlug: 'fourth-wing-rebecca-yarros',
        topBookSlugs: [
            'fourth-wing-rebecca-yarros',
            'iron-flame-rebecca-yarros',
            'onyx-storm-rebecca-yarros'
        ]
    },
    'donna-tartt': {
        slug: 'donna-tartt',
        name: 'Donna Tartt',
        heroBio: 'Pulitzer Prize-winning novelist celebrated for narrating her own atmospheric literary masterworks, including the iconic dark academia classic [The Secret History](/book/the-secret-history-donna-tartt/).',
        styleBadges: ['fireside-warmth', 'dialect-immersion'],
        audibleUrl: 'https://www.amazon.co.uk/s?k=Donna+Tartt&i=audible&tag=thelongbookclub-21',
        referenceUrl: 'https://en.wikipedia.org/wiki/Donna_Tartt',
        referenceLabel: 'Donna Tartt Wiki',
        topGenres: ['Dark Academia', 'Literary Fiction', 'Southern Gothic', 'Psychological Thriller'],
        vocalHallmarksKeywords: [
            'Mesmerizing',
            'Cadence,',
            'Southern',
            'Gothic'
        ],
        vocalHallmarksSummary: 'Tartt’s unforgettable, melodic Mississippi drawl pulls listeners into an intimate literary spell, heightening the dark moral suspense of her masterworks.',
        archiveQuote: {
            quote: 'Donna Tartt takes the microphone herself, delivering an unforgettable, deeply atmospheric author narration that mirrors the hypnotic moral descent of her characters.',
            bookTitle: 'The Secret History',
            bookSlug: 'the-secret-history-donna-tartt'
        },
        soundcheckBookSlug: 'the-secret-history-donna-tartt',
        topBookSlugs: [
            'the-secret-history-donna-tartt',
            'the-little-friend-donna-tartt'
        ]
    },
    'anthony-palmini': {
        slug: 'anthony-palmini',
        name: 'Anthony Palmini',
        heroBio: 'Dynamic voice actor celebrated for his smoldering, high-voltage dual narration alongside Stella Bloom in [Callie Hart](/author/callie-hart/)’s runaway fantasy romance sensation [Quicksilver](/book/quicksilver-callie-hart/).',
        styleBadges: ['dual-pov-synergy', 'propulsive-momentum'],
        audibleUrl: 'https://www.amazon.co.uk/s?k=Anthony+Palmini&i=audible&tag=thelongbookclub-21',
        referenceUrl: 'https://www.antpalmini.com',
        referenceLabel: 'Anthony Palmini Official',
        topGenres: ['Romantasy', 'Fae Romance', 'Dark Fantasy', 'Enemies to Lovers'],
        vocalHallmarksKeywords: [
            'Charismatic',
            'Grit,',
            'Sensual',
            'Fire'
        ],
        vocalHallmarksSummary: 'Palmini brings an intoxicating blend of roguish wit, rough-edged magnetism, and high-octane momentum to modern romantic fantasy adventures.',
        archiveQuote: {
            quote: 'Anthony Palmini brings explosive romantic chemistry and rough-edged swagger to Callie Hart’s runaway dark fantasy universe.',
            bookTitle: 'Quicksilver',
            bookSlug: 'quicksilver-callie-hart'
        },
        soundcheckBookSlug: 'quicksilver-callie-hart',
        topBookSlugs: [
            'quicksilver-callie-hart',
            'brimstone-callie-hart'
        ]
    },
    'stella-bloom': {
        slug: 'stella-bloom',
        name: 'Stella Bloom',
        heroBio: 'Audie-nominated narrator celebrated for her fierce, emotionally magnetic dual performance alongside Anthony Palmini in [Callie Hart](/author/callie-hart/)’s bestselling fantasy romance phenomenon [Quicksilver](/book/quicksilver-callie-hart/).',
        styleBadges: ['dual-pov-synergy', 'fireside-warmth'],
        audibleUrl: 'https://www.amazon.co.uk/s?k=Stella+Bloom&i=audible&tag=thelongbookclub-21',
        referenceUrl: 'https://www.stellabloomnarration.com/',
        referenceLabel: 'Stella Bloom Official',
        topGenres: ['Romantasy', 'Fae Romance', 'Dark Fantasy', 'Enemies to Lovers'],
        vocalHallmarksKeywords: [
            'Luminous',
            'Chemistry,',
            'Defiant',
            'Grace'
        ],
        vocalHallmarksSummary: 'Bloom breathes fierce independence and tender acoustic warmth into fantasy heroines, pairing seamlessly with co-narrators in explosive audio partnerships.',
        archiveQuote: {
            quote: 'Stella Bloom delivers a tour de force dual narration that crackles with visceral emotion, fierce independence, and dangerous romantic tension.',
            bookTitle: 'Quicksilver',
            bookSlug: 'quicksilver-callie-hart'
        },
        soundcheckBookSlug: 'quicksilver-callie-hart',
        topBookSlugs: [
            'quicksilver-callie-hart',
            'brimstone-callie-hart'
        ]
    },
    'neil-gaiman': {
        slug: 'neil-gaiman',
        name: 'Neil Gaiman',
        heroBio: 'World-renowned author and master storyteller celebrated for narrating his own richly atmospheric mythic dark fantasies, including the definitive author’s preferred edition of [Neverwhere](/book/neverwhere-neil-gaiman/).',
        styleBadges: ['fireside-warmth', 'satirical-bite'],
        audibleUrl: 'https://www.amazon.co.uk/s?k=Neil+Gaiman&i=audible&tag=thelongbookclub-21',
        referenceUrl: 'https://en.wikipedia.org/wiki/Neil_Gaiman',
        referenceLabel: 'Neil Gaiman Wiki',
        topGenres: ['Urban Fantasy', 'Mythology', 'Dark Fantasy', 'Audiobook Classic'],
        vocalHallmarksKeywords: [
            'Mythic',
            'Whimsy,',
            'Spellbinding',
            'Baritone'
        ],
        vocalHallmarksSummary: 'Gaiman’s velvety British baritone weaves ancient folklore, playful dark wit, and spellbinding dreamscapes with the peerless authority of a master mythmaker.',
        archiveQuote: {
            quote: 'Neil Gaiman proves once again why he is one of the greatest author-narrators in modern publishing, weaving urban shadows and mythic wonders with effortless baritone magic.',
            bookTitle: 'Neverwhere',
            bookSlug: 'neverwhere-neil-gaiman'
        },
        soundcheckBookSlug: 'neverwhere-neil-gaiman',
        topBookSlugs: [
            'neverwhere-neil-gaiman',
            'american-gods-neil-gaiman',
            'the-sandman-neil-gaiman'
        ]
    },
    'sarah-lyddon-powell': {
        slug: 'sarah-lyddon-powell',
        name: 'Sarah Lyddon Powell',
        heroBio: 'Atmospheric audiobook narrator acclaimed for her chilling, sharp-edged vocal performance across [Karin Smirnoff](/author/karin-smirnoff/)’s Lisbeth Salander Millennium continuations, beginning with [The Girl in the Eagle\'s Talons](/book/the-girl-in-the-eagles-talons-karin-smirnoff/).',
        styleBadges: ['historical-gravitas', 'propulsive-momentum'],
        audibleUrl: 'https://www.amazon.co.uk/s?k=Sarah+Lyddon+Powell&i=audible&tag=thelongbookclub-21',
        referenceUrl: 'https://en.wikipedia.org/wiki/Sara_Powell',
        referenceLabel: 'Sara Powell Wiki',
        topGenres: ['Nordic Noir', 'Mystery', 'Crime Thriller', 'Psychological Suspense'],
        vocalHallmarksKeywords: [
            'Chilling',
            'Poise,',
            'Glacial',
            'Clarity'
        ],
        vocalHallmarksSummary: 'Powell navigates the bleak wilderness and brutal underworld of Nordic noir with cool, surgical precision and an unyielding undercurrent of suspense.',
        archiveQuote: {
            quote: 'Sarah Lyddon Powell makes an impressive debut in the Millennium audio universe, delivering a sharp, atmospheric narration that matches the icy northern tension.',
            bookTitle: 'The Girl in the Eagle\'s Talons',
            bookSlug: 'the-girl-in-the-eagles-talons-karin-smirnoff'
        },
        soundcheckBookSlug: 'the-girl-in-the-eagles-talons-karin-smirnoff',
        topBookSlugs: [
            'the-girl-in-the-eagles-talons-karin-smirnoff',
            'the-girl-with-ice-in-her-veins-karin-smirnoff'
        ]
    },
    'kevin-shen': {
        slug: 'kevin-shen',
        name: 'Kevin Shen',
        heroBio: 'A celebrated British-American actor and Speakies award nominee, acclaimed for anchoring [Ken Liu](/author/ken-liu/)’s monumental Dandelion Dynasty silkpunk saga with aristocratic poise and philosophical depth.',
        styleBadges: ['historical-gravitas', 'character-chameleon'],
        audibleUrl: 'https://www.amazon.co.uk/s?k=Kevin+Shen&i=audible&tag=thelongbookclub-21',
        referenceUrl: 'https://www.imdb.com/name/nm3867622/',
        referenceLabel: 'Kevin Shen IMDb',
        topGenres: ['Silkpunk', 'Epic Fantasy', 'Court Intrigue', 'High Fantasy'],
        vocalHallmarksKeywords: [
            'Imperial',
            'Poise,',
            'Philosophical',
            'Clarity'
        ],
        vocalHallmarksSummary: 'Shen delivers Liu’s silkpunk epics with classical oratorical elegance, effortless character distinctions, and a deep emotional resonance suited to generational statecraft.',
        archiveQuote: {
            quote: 'Kevin Shen brings an extraordinary, classical weight to Ken Liu’s grand silkpunk empire, guiding listeners through court intrigue and titanic battles with effortless clarity.',
            bookTitle: 'The Grace of Kings',
            bookSlug: 'the-grace-of-kings-ken-liu'
        },
        soundcheckBookSlug: 'the-grace-of-kings-ken-liu',
        topBookSlugs: [
            'the-grace-of-kings-ken-liu',
            'the-wall-of-storms-ken-liu',
            'the-veiled-throne-ken-liu',
            'speaking-bones-ken-liu'
        ]
    },
    'andrew-kishino': {
        slug: 'andrew-kishino',
        name: 'Andrew Kishino',
        heroBio: 'Acclaimed Japanese-Canadian actor and voice artist renowned for anchoring [Fonda Lee](/author/fonda-lee/)’s monumental Green Bone Saga, breathing gritty swagger and clan loyalty into the streets of Janloon.',
        styleBadges: ['character-chameleon', 'propulsive-momentum'],
        audibleUrl: 'https://www.amazon.co.uk/s?k=Andrew+Kishino&i=audible&tag=thelongbookclub-21',
        referenceUrl: 'https://en.wikipedia.org/wiki/Andrew_Kishino',
        referenceLabel: 'Andrew Kishino Wiki',
        topGenres: ['Silkpunk', 'Urban Fantasy', 'Crime Saga', 'Martial Arts'],
        vocalHallmarksKeywords: [
            'Visceral',
            'Swagger,',
            'Gritty',
            'Fidelity'
        ],
        vocalHallmarksSummary: 'Kishino brings ruthless clan violence and intimate brotherhood to life with kinetic intensity, authentic dialects, and flawless multi-character range.',
        archiveQuote: {
            quote: 'Andrew Kishino delivers a magnetic, gritty performance that captures the ruthless clan politics, brotherhood, and cinematic martial arts of Janloon with swagger.',
            bookTitle: 'Jade City',
            bookSlug: 'jade-city-fonda-lee'
        },
        soundcheckBookSlug: 'jade-city-fonda-lee',
        topBookSlugs: [
            'jade-city-fonda-lee',
            'jade-war-fonda-lee',
            'jade-legacy-fonda-lee'
        ]
    },
    'natalie-naudus': {
        slug: 'natalie-naudus',
        name: 'Natalie Naudus',
        heroBio: 'Award-winning voice talent acclaimed for her radiant, emotionally fearless narrations across [Shelley Parker-Chan](/author/shelley-parker-chan/)’s Radiant Emperor duology and [Xiran Jay Zhao](/author/xiran-jay-zhao/)’s [Iron Widow](/book/iron-widow-xiran-jay-zhao/).',
        styleBadges: ['historical-gravitas', 'fireside-warmth'],
        audibleUrl: 'https://www.amazon.co.uk/s?k=Natalie+Naudus&i=audible&tag=thelongbookclub-21',
        referenceUrl: 'https://www.natAlienAudus.com/',
        referenceLabel: 'Natalie Naudus Official',
        topGenres: ['Silkpunk', 'Historical Fantasy', 'Queer Fiction', 'Sci-Fi'],
        vocalHallmarksKeywords: [
            'Radiant',
            'Gravitas,',
            'Emotional',
            'Fierceness'
        ],
        vocalHallmarksSummary: 'Naudus weaves sweeping imperial ambition, intimate longing, and unyielding psychological fire with crystalline, heartbreaking acoustic clarity.',
        archiveQuote: {
            quote: 'Natalie Naudus commands Shelley Parker-Chan’s imperial saga with magnetic vulnerability, fierce ambition, and deeply felt emotional presence.',
            bookTitle: 'She Who Became the Sun',
            bookSlug: 'she-who-became-the-sun-shelley-parker-chan'
        },
        soundcheckBookSlug: 'she-who-became-the-sun-shelley-parker-chan',
        topBookSlugs: [
            'she-who-became-the-sun-shelley-parker-chan',
            'he-who-drowned-the-world-shelley-parker-chan',
            'iron-widow-xiran-jay-zhao'
        ]
    },
    'jack-voraces': {
        slug: 'jack-voraces',
        name: 'Jack Voraces',
        heroBio: 'A celebrated British voice actor and Audie Award nominee renowned for anchoring [Domagoj Kurmaić](/author/domagoj-kurmaic/)’s monumental 97-hour Mother of Learning time-loop epic with extraordinary character versatility and boundless vocal stamina.',
        styleBadges: ['character-chameleon', 'propulsive-momentum'],
        audibleUrl: 'https://www.amazon.co.uk/s?k=Jack+Voraces&i=audible&tag=thelongbookclub-21',
        referenceUrl: 'https://www.jackvoraces.com/',
        referenceLabel: 'Jack Voraces Official',
        topGenres: ['Progression Fantasy', 'Time Travel', 'LitRPG', 'Magic Academy'],
        vocalHallmarksKeywords: [
            'Dynamic',
            'Versatility,',
            'Comedic',
            'Timing'
        ],
        vocalHallmarksSummary: 'Voraces commands sprawling fantasy casts with rapid-fire comedic wit, distinct telepathic vocal modulation, and remarkable marathon stamina.',
        archiveQuote: {
            quote: 'Jack Voraces delivers a powerhouse, marathon performance that carries Domagoj Kurmaić’s expansive time-loop saga with breathtaking stamina and spot-on comedic timing.',
            bookTitle: 'Mother of Learning: Arc 1',
            bookSlug: 'mother-of-learning-arc-1-domagoj-kurmaic'
        },
        soundcheckBookSlug: 'mother-of-learning-arc-1-domagoj-kurmaic',
        topBookSlugs: [
            'mother-of-learning-arc-1-domagoj-kurmaic',
            'mother-of-learning-arc-2-domagoj-kurmaic',
            'mother-of-learning-arc-3-domagoj-kurmaic',
            'mother-of-learning-arc-4-domagoj-kurmaic'
        ]
    }
};
