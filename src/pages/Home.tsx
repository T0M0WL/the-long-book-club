import { useState, useMemo } from 'react';
import { Hero } from '../components/Hero';
import { FilterBar } from '../components/FilterBar';
import { BookGrid } from '../components/BookGrid';
import { books } from '../data/books';
import { Helmet } from 'react-helmet-async';

export const Home = () => {
    const [selectedGenre, setSelectedGenre] = useState('All');
    const [minLength, setMinLength] = useState(10);
    const [sortBy, setSortBy] = useState<'default' | 'length-desc' | 'length-asc'>('default');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredBooks = useMemo(() => {
        let result = books.filter(book => {
            const matchesGenre = selectedGenre === 'All' || book.genre === selectedGenre;
            const matchesLength = book.lengthHours >= minLength;
            const matchesSearch =
                book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                book.author.toLowerCase().includes(searchTerm.toLowerCase());

            return matchesGenre && matchesLength && matchesSearch;
        });

        if (sortBy === 'length-desc') {
            result.sort((a, b) => b.lengthHours - a.lengthHours);
        } else if (sortBy === 'length-asc') {
            result.sort((a, b) => a.lengthHours - b.lengthHours);
        }

        return result;
    }, [selectedGenre, minLength, sortBy, searchTerm]);

    return (
        <>
            <Helmet>
                <title>The Long Book Club - Curated Epic Audiobooks</title>
                <meta name="description" content="Discover the best long audiobooks to maximize your monthly credits. Curated selection of 40+ hour epics across all genres." />
            </Helmet>
            <Hero />
            <FilterBar
                selectedGenre={selectedGenre}
                onGenreChange={setSelectedGenre}
                minLength={minLength}
                onLengthChange={setMinLength}
                sortBy={sortBy}
                onSortChange={setSortBy}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
            />
            <BookGrid books={filteredBooks} />
        </>
    );
};
