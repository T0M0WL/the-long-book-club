import type { Book } from '../data/books';
import { BookCard } from './BookCard';

interface BookGridProps {
    books: Book[];
}

export const BookGrid = ({ books }: BookGridProps) => {
    if (books.length === 0) {
        return (
            <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--color-text-muted)' }}>
                <h3>No books found match your filters.</h3>
                <p>Try adjusting the genre or length requirements.</p>
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
            {books.map(book => (
                <BookCard key={book.id} book={book} />
            ))}
        </div>
    );
};
