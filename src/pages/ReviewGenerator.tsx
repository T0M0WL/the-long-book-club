import { useState, useEffect } from 'react';
import { books } from '../data/books';
import { reviews } from '../data/reviews';
import { SEO } from '../components/SEO';

export const ReviewGenerator = () => {
    const [selectedBookTitle, setSelectedBookTitle] = useState('');
    const [curatorTitle, setCuratorTitle] = useState('');
    const [curatorNote, setCuratorNote] = useState('');
    const [narrator, setNarrator] = useState('');
    const [soundCheck, setSoundCheck] = useState('');
    const [longBookClubTake, setLongBookClubTake] = useState('');
    const [copySuccess, setCopySuccess] = useState('');

    // Pre-fill data when a book is selected
    useEffect(() => {
        if (selectedBookTitle && reviews[selectedBookTitle]) {
            const review = reviews[selectedBookTitle];
            setCuratorTitle(review.curatorTitle || '');
            // Map curatorNote to both states to maintain current UI logic
            const note = review.curatorNote || review.longBookClubTake || '';
            setCuratorNote(note);
            setLongBookClubTake(note);
            setNarrator(review.narrator || '');
            setSoundCheck(review.soundCheck || '');
        } else {
            // Reset fields if no review exists or no book selected
            setCuratorTitle('');
            setCuratorNote('');
            setLongBookClubTake('');
            setNarrator('');
            setSoundCheck('');
        }
    }, [selectedBookTitle]);

    // Sort books alphabetically for easier finding
    const sortedBooks = [...books].sort((a, b) => a.title.localeCompare(b.title));

    const generateCode = () => {
        if (!selectedBookTitle) return '// Select a book first';

        // Escape double quotes in content
        const escape = (str: string) => str.replace(/"/g, '\\"');

        const lines = [];
        if (curatorTitle) lines.push(`        curatorTitle: "${escape(curatorTitle)}"`);

        // Prefer curatorNote logic from input
        const noteContent = longBookClubTake || curatorNote;
        if (noteContent) lines.push(`        curatorNote: "${escape(noteContent)}"`);

        if (narrator) lines.push(`        narrator: "${escape(narrator)}"`);
        if (soundCheck) lines.push(`        soundCheck: "${escape(soundCheck)}"`);

        return `    "${selectedBookTitle}": {\n` + lines.join(',\n') + `\n    },`;
    };

    const copyToClipboard = () => {
        const code = generateCode();
        navigator.clipboard.writeText(code).then(() => {
            setCopySuccess('Copied!');
            setTimeout(() => setCopySuccess(''), 2000);
        });
    };

    return (
        <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            padding: '8rem 2rem',
            fontFamily: 'sans-serif'
        }}>
            <SEO title="Review Generator" />
            <h1 style={{ marginBottom: '2rem', color: 'var(--color-brand-forrest)' }}>Review Generator</h1>
            <p style={{ marginBottom: '2rem' }}>Use this tool to generate error-free code for <code>src/data/reviews.ts</code>.</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                {/* Book Selector */}
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>1. Select Book</label>
                    <select
                        value={selectedBookTitle}
                        onChange={(e) => setSelectedBookTitle(e.target.value)}
                        style={{ width: '100%', padding: '0.5rem', fontSize: '1rem' }}
                    >
                        <option value="">-- Choose a Book --</option>
                        {sortedBooks.map(book => (
                            <option key={book.id} value={book.title}>{book.title}</option>
                        ))}
                    </select>
                </div>

                {/* Curator Title */}
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>2. Curator Title (Headline)</label>
                    <input
                        type="text"
                        value={curatorTitle}
                        onChange={(e) => setCuratorTitle(e.target.value)}
                        placeholder="e.g. A sprawling saga..."
                        style={{ width: '100%', padding: '0.5rem', fontSize: '1rem' }}
                    />
                </div>

                {/* Main Review (Long Book Club Take) */}
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>3. The Long Book Club Take (Review)</label>
                    <textarea
                        value={longBookClubTake || curatorNote}
                        onChange={(e) => {
                            setLongBookClubTake(e.target.value);
                            setCuratorNote(e.target.value);
                        }}
                        rows={6}
                        placeholder="Paste the full review here..."
                        style={{ width: '100%', padding: '0.5rem', fontSize: '1rem' }}
                    />
                </div>

                {/* Narrator */}
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>4. Narrator</label>
                    <input
                        type="text"
                        value={narrator}
                        onChange={(e) => setNarrator(e.target.value)}
                        placeholder="e.g. John Doe"
                        style={{ width: '100%', padding: '0.5rem', fontSize: '1rem' }}
                    />
                </div>

                {/* Sound Check */}
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>5. Sound Check</label>
                    <textarea
                        value={soundCheck}
                        onChange={(e) => setSoundCheck(e.target.value)}
                        rows={3}
                        placeholder="Audio details..."
                        style={{ width: '100%', padding: '0.5rem', fontSize: '1rem' }}
                    />
                </div>

                {/* Output Area */}
                <div style={{ marginTop: '3rem', borderTop: '2px solid #eee', paddingTop: '2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <h2 style={{ margin: 0 }}>Generated Code</h2>
                        <button
                            onClick={copyToClipboard}
                            style={{
                                backgroundColor: copySuccess ? 'green' : 'var(--color-brand-coral)',
                                color: 'white',
                                border: 'none',
                                padding: '0.5rem 1rem',
                                borderRadius: '4px',
                                fontSize: '1rem',
                                fontWeight: 'bold'
                            }}
                        >
                            {copySuccess || 'Copy Code'}
                        </button>
                    </div>

                    <pre style={{
                        background: '#f4f4f4',
                        padding: '1.5rem',
                        borderRadius: '8px',
                        overflowX: 'auto',
                        fontFamily: 'monospace',
                        fontSize: '0.9rem',
                        whiteSpace: 'pre-wrap'
                    }}>
                        {generateCode()}
                    </pre>

                    <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#666' }}>
                        <strong>Instructions:</strong> Copy the code above and paste it into <code>src/data/reviews.ts</code> inside the main list.
                    </p>
                </div>

            </div>
        </div>
    );
};
