import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { FilterBar } from '../components/FilterBar';
import { BookGrid } from '../components/BookGrid';
import { books } from '../data/books';
import { SEO } from '../components/SEO';

export const Home = () => {
    const [searchParams] = useSearchParams();
    const initialGenre = searchParams.get('genre') || 'All';
    const [selectedGenre, setSelectedGenre] = useState(initialGenre);

    // Update state if URL changes (e.g. back navigation)
    useEffect(() => {
        const genreFromUrl = searchParams.get('genre');
        if (genreFromUrl) {
            setSelectedGenre(genreFromUrl);
            // Scroll to filter bar if genre is selected via URL
            document.getElementById('scroll-target')?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [searchParams]);

    const [minLength, setMinLength] = useState(10);
    const [sortBy, setSortBy] = useState<'default' | 'length-desc' | 'length-asc'>('default');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredBooks = useMemo(() => {
        const result = books.filter(book => {
            const matchesGenre = selectedGenre === 'All' ||
                (Array.isArray(book.genre)
                    ? book.genre.includes(selectedGenre)
                    : book.genre === selectedGenre);

            const matchesLength = book.lengthHours >= minLength;
            const matchesSearch =
                book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (book.narrator && book.narrator.toLowerCase().includes(searchTerm.toLowerCase()));

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
            <SEO
                title="Curated Epic Audiobooks"
                description="Discover the best long audiobooks to maximize your monthly credits. Curated selection of 40+ hour epics across all genres."
                canonical="https://thelongbookclub.com"
            />
            <Hero />
            <div className="page-container">
                <div id="scroll-target" style={{ scrollMarginTop: '2rem', height: 0 }} />
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
            </div>
        </>
    );
};
