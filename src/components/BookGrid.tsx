import type { Book } from '../data/books';
import { BookCard } from './BookCard';
import { CollectionCard } from './CollectionCard';
import { collections } from '../data/collections';
import { Fragment } from 'react';

interface BookGridProps {
    books: Book[];
    showCollections?: boolean;
}

export const BookGrid = ({ books, showCollections = false }: BookGridProps) => {
    if (books.length === 0) {
        return (
            <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--color-text-muted)' }}>
                <h3 style={{
                    fontFamily: 'var(--font-serif-accent)',
                    fontSize: 'clamp(1.4rem, 3vw, 1.75rem)', // Reduced by ~30%
                    color: 'var(--color-brand-forrest)',
                    fontWeight: 400,
                    marginBottom: '0.5rem' // Reduced margin
                }}>
                    No books found
                </h3>
                <p style={{
                    fontFamily: 'var(--font-serif-accent)', // Match title
                    fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)', // Similar scale
                    color: 'var(--color-brand-forrest)', // Match title
                    opacity: 0.9 // Slight hierarchy
                }}>
                    Try adjusting the genre or length requirements.
                </p>
            </div>
        );
    }

    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '2rem',
            padding: '1rem 0'
        }}>
            {books.map((book, index) => {
                // Render the book card
                const bookCard = (
                    <div key={book.id} style={{
                        animation: 'fadeIn 0.5s ease backwards',
                        animationDelay: `${index * 0.05}s`
                    }}>
                        <BookCard book={book} />
                    </div>
                );

                // Inject Collection Card logic
                // Inject after every 6th book (indices 5, 11, 17...)
                // Only if showCollections is true
                if (showCollections && (index + 1) % 6 === 0) {
                    const collectionIndex = Math.floor((index + 1) / 6) - 1;
                    // Cycle through collections if we run out
                    const collectionToRender = collections[collectionIndex % collections.length];

                    return (
                        <Fragment key={`fragment-${book.id}`}>
                            {bookCard}
                            <div key={`collection-${collectionToRender.id}`} style={{
                                animation: 'fadeIn 0.5s ease backwards',
                                animationDelay: `${(index + 0.5) * 0.05}s`
                            }}>
                                <CollectionCard collection={collectionToRender} />
                            </div>
                        </Fragment>
                    );
                }

                return bookCard;
            })}
        </div>
    );
};
