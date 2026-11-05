export interface AuthorProfile {
    slug: string;
    name: string;
    editorialBio?: string;
    relatedCollectionSlugs?: string[];
    recommendedBookIds?: string[];
}

export const authorProfiles: Record<string, AuthorProfile> = {
    'mary-shelley': {
        slug: 'mary-shelley',
        name: 'Mary Shelley',
        editorialBio: "At just eighteen years old during the volcanic 'Year Without a Summer' of 1816, Mary Wollstonecraft Shelley invented modern science fiction with *Frankenstein*—replacing divine creation with human hubris and moral reckoning. A decade later in 1826, she performed an equally astonishing feat by publishing *The Last Man*, inventing the secular post-apocalyptic novel and following a solitary wanderer across a plague-emptied Europe. In audio format, Shelley's sweeping Romantic prose sheds its nineteenth-century schoolroom intimidation, transforming into intimate, psychologically devastating marathons of isolation, ambition, and humanity.",
        relatedCollectionSlugs: ['post-apocalyptic-survival'],
        recommendedBookIds: ['487', '3', '105'] // Wool (487), The Stand (3), Dracula (105)
    }
};
