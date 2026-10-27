import { books as defaultBooks, type Book } from '../data/books';
import { slugify } from './slugify';

export interface CreatorItem {
    name: string;
    slug: string;
    bookCount: number;
    totalHours: number;
    books: Book[];
}

export const CREATOR_THRESHOLD = 2;

/**
 * Splits and cleans narrator strings into individual narrator names,
 * stripping regional/audio edition tags like (UK), (US), (Unabridged), etc.
 */
export const cleanNarrators = (raw?: string): string[] => {
    if (!raw) return [];
    // Remove (UK), (US), (Unabridged), (GraphicAudio), (Anniversary...)
    let text = raw.replace(/\((UK|US|Unabridged|GraphicAudio|Anniversary[^\)]*)\)/gi, '');
    // Replace slash, 'and', and '&' with comma
    text = text.replace(/\s*\/\s*/g, ',');
    text = text.replace(/\s+and\s+/gi, ',');
    text = text.replace(/\s*&\s*/g, ',');
    text = text.replace(/Full Cast\s*\(/gi, '').replace(/\)/g, '');

    const parts = text.split(',');
    const results: string[] = [];

    for (const part of parts) {
        const p = part
            .trim()
            .replace(/\bet al\.?\b/gi, '')
            .replace(/^Full Cast$/i, '')
            .replace(/^[,\s]+|[,\s]+$/g, '');
        if (
            p.length > 2 &&
            !p.toLowerCase().includes('full cast') &&
            !p.toLowerCase().includes('graphicaudio')
        ) {
            if (!results.includes(p)) {
                results.push(p);
            }
        }
    }
    // If 4 or more narrators are credited, this is an ensemble cast / full-cast dramatization.
    // We treat it as a Full Cast ensemble rather than generating individual solo narrator hubs.
    if (results.length >= 4) {
        return [];
    }
    return results;
};

/**
 * Returns all authors having at least CREATOR_THRESHOLD qualifying books in the catalog,
 * sorted by book count descending, then total listening hours descending.
 */
export const getAuthorStats = (allBooks: Book[] = defaultBooks): CreatorItem[] => {
    const map = new Map<string, Book[]>();

    allBooks.forEach(b => {
        const author = b.author?.trim();
        if (!author) return;
        if (!map.has(author)) {
            map.set(author, []);
        }
        map.get(author)!.push(b);
    });

    const items: CreatorItem[] = [];

    map.forEach((bookList, name) => {
        if (bookList.length >= CREATOR_THRESHOLD) {
            const totalHours = Math.round(
                bookList.reduce((acc, b) => acc + (b.lengthHours || 0), 0) * 10
            ) / 10;
            // Sort author's books by length descending
            const sortedBooks = [...bookList].sort((a, b) => (b.lengthHours || 0) - (a.lengthHours || 0));
            items.push({
                name,
                slug: slugify(name),
                bookCount: bookList.length,
                totalHours,
                books: sortedBooks
            });
        }
    });

    return items.sort((a, b) => {
        if (b.bookCount !== a.bookCount) return b.bookCount - a.bookCount;
        if (b.totalHours !== a.totalHours) return b.totalHours - a.totalHours;
        return a.name.localeCompare(b.name);
    });
};

/**
 * Returns all narrators having at least CREATOR_THRESHOLD qualifying books in the catalog,
 * sorted by book count descending, then total listening hours descending.
 */
export const getNarratorStats = (allBooks: Book[] = defaultBooks): CreatorItem[] => {
    const map = new Map<string, Book[]>();

    allBooks.forEach(b => {
        const names = cleanNarrators(b.narrator);
        names.forEach(name => {
            if (!map.has(name)) {
                map.set(name, []);
            }
            const list = map.get(name)!;
            if (!list.some(existing => existing.id === b.id)) {
                list.push(b);
            }
        });
    });

    const items: CreatorItem[] = [];

    map.forEach((bookList, name) => {
        if (bookList.length >= CREATOR_THRESHOLD) {
            const totalHours = Math.round(
                bookList.reduce((acc, b) => acc + (b.lengthHours || 0), 0) * 10
            ) / 10;
            const sortedBooks = [...bookList].sort((a, b) => (b.lengthHours || 0) - (a.lengthHours || 0));
            items.push({
                name,
                slug: slugify(name),
                bookCount: bookList.length,
                totalHours,
                books: sortedBooks
            });
        }
    });

    return items.sort((a, b) => {
        if (b.bookCount !== a.bookCount) return b.bookCount - a.bookCount;
        if (b.totalHours !== a.totalHours) return b.totalHours - a.totalHours;
        return a.name.localeCompare(b.name);
    });
};

export const getAuthorBySlug = (slug: string, allBooks: Book[] = defaultBooks): CreatorItem | undefined => {
    const authors = getAuthorStats(allBooks);
    return authors.find(a => a.slug === slug);
};

export const getNarratorBySlug = (slug: string, allBooks: Book[] = defaultBooks): CreatorItem | undefined => {
    const narrators = getNarratorStats(allBooks);
    return narrators.find(n => n.slug === slug);
};

export const isQualifyingAuthor = (authorName: string, allBooks: Book[] = defaultBooks): boolean => {
    if (!authorName) return false;
    const authorSlug = slugify(authorName);
    return getAuthorStats(allBooks).some(a => a.slug === authorSlug);
};

export const isQualifyingNarrator = (narratorName: string, allBooks: Book[] = defaultBooks): boolean => {
    if (!narratorName) return false;
    const narratorSlug = slugify(narratorName);
    return getNarratorStats(allBooks).some(n => n.slug === narratorSlug);
};
