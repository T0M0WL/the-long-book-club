import { useState, useMemo } from 'react';
import { Hero } from '../components/Hero';
import { FilterBar } from '../components/FilterBar';
import { BookGrid } from '../components/BookGrid';
import { books } from '../data/books';
import { Helmet } from 'react-helmet-async';

export const Home = () => {
    const [selectedGenre, setSelectedGenre] = useState('All');
    const [minLength, setMinLength] = useState(10);
    const [sortBy, setSortBy] = useState('default');

    const filteredBooks = useMemo(() => {
        const result = books.filter(book => {
            const matchesGenre = selectedGenre === 'All' || book.genre === selectedGenre;
            const matchesLength = book.lengthHours >= minLength;
            return matchesGenre && matchesLength;
        });

        if (sortBy === 'longest') {
            return result.sort((a, b) => b.lengthHours - a.lengthHours);
        } else if (sortBy === 'shortest') {
            return result.sort((a, b) => a.lengthHours - b.lengthHours);
        }

        return result;
    }, [selectedGenre, minLength, sortBy]);

    return (
        <>
            <Helmet>
                <title>The Long Book Club - Curated Epic Audiobooks</title>
                <meta name="description" content="Discover the best long audiobooks to maximize your monthly credits. Curated selection of 40+ hour epics across all genres." />
            </Helmet>
            <Hero />
            <FilterBar
                selectedGenre={selectedGenre}
                onSelectGenre={setSelectedGenre}
                minLength={minLength}
                onSetMinLength={setMinLength}
                sortBy={sortBy}
                onSortChange={setSortBy}
            />
            <BookGrid books={filteredBooks} />
        </>
    );
};
