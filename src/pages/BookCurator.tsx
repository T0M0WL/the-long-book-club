import { useState, useEffect } from 'react';
import { books, genres as existingGenres } from '../data/books';
import { SEO } from '../components/SEO';

export const BookCurator = () => {
    // --- App Mode State ---
    const [mode, setMode] = useState<'create' | 'edit'>('create');
    const [selectedBookSlug, setSelectedBookSlug] = useState('');

    // --- Book Metadata State ---
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [lengthStr, setLengthStr] = useState('');
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
    
    const [affiliateLink, setAffiliateLink] = useState('');
    const [affiliateLinkUS, setAffiliateLinkUS] = useState('');
    const [cardOverview, setCardOverview] = useState('');
    const [teaserTitle, setTeaserTitle] = useState('');
    const [teaser, setTeaser] = useState('');

    // --- Media ---
    const [coverImageBase64, setCoverImageBase64] = useState('');
    
    // --- Curator / Review State ---
    const [curatorTitle, setCuratorTitle] = useState('');
    const [curatorNote, setCuratorNote] = useState('');
    const [narrator, setNarrator] = useState('');
    const [soundCheck, setSoundCheck] = useState('');
    
    // --- App Status State ---
    const [saveSuccess, setSaveSuccess] = useState('');

    // --- Auto Computed State ---
    const [slug, setSlug] = useState('');
    const [nextId, setNextId] = useState('');
    const [lengthHours, setLengthHours] = useState<number>(0);
    const [coverUrl, setCoverUrl] = useState('');

    // Init the next available ID
    useEffect(() => {
        const maxId = books.reduce((max, b) => {
            const num = parseInt(b.id);
            return (!isNaN(num) && num > max) ? num : max;
        }, 0);
        setNextId((maxId + 1).toString());
    }, []);

    // Handle Edit Mode Population
    useEffect(() => {
        if (mode === 'edit' && selectedBookSlug) {
            const book = books.find(b => b.slug === selectedBookSlug);
            if (book) {
                setTitle(book.title || '');
                setAuthor(book.author || '');
                setLengthStr(book.length || '');
                setSelectedGenres(Array.isArray(book.genre) ? book.genre : (book.genre ? [book.genre] : []));
                
                // Extract ASIN from affiliateLink
                const extractAsin = (link?: string) => {
                    if (!link) return '';
                    const match = link.match(/dp\/([A-Z0-9]+)/i);
                    return match ? match[1] : link;
                };
                
                setAffiliateLink(extractAsin(book.affiliateLink));
                setAffiliateLinkUS(extractAsin(book.affiliateLinkUS));
                
                setCardOverview(book.cardOverview || '');
                setTeaserTitle(book.teaserTitle || '');
                setTeaser(book.teaser || '');
                setCoverUrl(book.coverUrl || '');
                
                setCuratorTitle(book.curatorTitle || '');
                setCuratorNote(book.curatorNote || '');
                setNarrator(book.narrator || '');
                setSoundCheck(book.soundCheck || '');
            }
        } else if (mode === 'create') {
            setTitle('');
            setAuthor('');
            setLengthStr('');
            setSelectedGenres([]);
            setAffiliateLink('');
            setAffiliateLinkUS('');
            setCardOverview('');
            setTeaserTitle('');
            setTeaser('');
            setCuratorTitle('');
            setCuratorNote('');
            setNarrator('');
            setSoundCheck('');
            setCoverImageBase64('');
        }
    }, [mode, selectedBookSlug]);

    // Auto-generate slug and coverUrl based on title
    useEffect(() => {
        if (title) {
            let generatedSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
            if (author) {
                generatedSlug += '-' + author.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
            }
            setSlug(generatedSlug);
            setCoverUrl(`/covers/${generatedSlug}.jpg`);
        } else {
            setSlug('');
            setCoverUrl('');
        }
    }, [title, author]);

    // Auto-calculate length hours
    useEffect(() => {
        if (lengthStr) {
            const hMatch = lengthStr.match(/(\d+)\s*h/i);
            const mMatch = lengthStr.match(/(\d+)\s*m/i);
            const hrs = hMatch ? parseInt(hMatch[1]) : 0;
            const mins = mMatch ? parseInt(mMatch[1]) : 0;
            if (hrs || mins) {
                const decimal = Math.round((hrs + (mins / 60)) * 10) / 10;
                setLengthHours(decimal);
            }
        }
    }, [lengthStr]);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setCoverImageBase64(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const toggleGenre = (g: string) => {
        if (selectedGenres.includes(g)) {
            setSelectedGenres(selectedGenres.filter(i => i !== g));
        } else {
            setSelectedGenres([...selectedGenres, g]);
        }
    };

    const generateBaseBookCode = () => {
        const safeString = (str: string) => JSON.stringify(str.trim());
        const lines = [];
        
        lines.push(`        id: ${safeString(nextId)}`);
        lines.push(`        slug: ${safeString(slug)}`);
        lines.push(`        title: ${safeString(title)}`);
        lines.push(`        author: ${safeString(author)}`);
        lines.push(`        coverUrl: ${safeString(coverUrl)}`);
        lines.push(`        length: ${safeString(lengthStr)}`);
        lines.push(`        lengthHours: ${lengthHours}`);
        
        if (selectedGenres.length > 0) {
            lines.push(`        genre: [${selectedGenres.map(safeString).join(', ')}]`);
        }
        
        // Smart Affiliate Link Parser
        let finalUkLink = affiliateLink.trim();
        if (finalUkLink && !finalUkLink.startsWith('http')) {
            finalUkLink = `https://www.amazon.co.uk/dp/${finalUkLink}?tag=thelongbookclub-21`;
        }
        
        let finalUsLink = affiliateLinkUS.trim();
        if (finalUsLink && !finalUsLink.startsWith('http')) {
            finalUsLink = `https://www.amazon.com/dp/${finalUsLink}?tag=thelongbookcl-20`;
        }
        
        if (finalUkLink) lines.push(`        affiliateLink: ${safeString(finalUkLink)}`);
        if (finalUsLink) lines.push(`        affiliateLinkUS: ${safeString(finalUsLink)}`);
        
        if (teaserTitle) lines.push(`        teaserTitle: ${safeString(teaserTitle)}`);
        if (teaser) lines.push(`        teaser: ${safeString(teaser)}`);
        if (cardOverview) lines.push(`        cardOverview: ${safeString(cardOverview)}`);
        if (narrator) lines.push(`        narrator: ${safeString(narrator)}`);

        return lines.join(',\n');
    };

    const generateReviewCode = () => {
        if (!curatorTitle && !curatorNote && !soundCheck && !narrator) return '';

        const safeString = (str: string) => JSON.stringify(str.trim());
        const lines = [];
        
        if (curatorTitle) lines.push(`        curatorTitle: ${safeString(curatorTitle)}`);
        if (curatorNote) lines.push(`        curatorNote: ${safeString(curatorNote)}`);
        if (narrator) lines.push(`        narrator: ${safeString(narrator)}`);
        if (soundCheck) lines.push(`        soundCheck: ${safeString(soundCheck)}`);

        return `    ${safeString(title)}: {\n` + lines.join(',\n') + `\n    }`;
    };

    const handleSave = async () => {
        if (!title || !author) {
            setSaveSuccess('❌ Error: Title and Author are required!');
            return;
        }

        setSaveSuccess('Saving...');
        try {
            const res = await fetch('/api/save-book', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    bookTitle: title,
                    slug: slug,
                    baseBookSnippet: generateBaseBookCode(),
                    reviewSnippet: generateReviewCode(),
                    coverImageBase64: coverImageBase64,
                    isEdit: mode === 'edit',
                    originalSlug: mode === 'edit' ? selectedBookSlug : null
                })
            });
            const data = await res.json();
            
            if (res.ok && data.success) {
                setSaveSuccess('✅ Saved to Project! (Refresh Vite if needed)');
            } else {
                setSaveSuccess('❌ Failed to save');
                console.error(data.error);
            }
        } catch (err) {
            setSaveSuccess('❌ Network error');
            console.error(err);
        }
        setTimeout(() => setSaveSuccess(''), 4000);
    };

    const inputStyle = { width: '100%', padding: '0.5rem', fontSize: '1rem', marginBottom: '1rem', border: '1px solid #ccc', borderRadius: '4px' };
    const labelStyle = { display: 'block', marginBottom: '0.3rem', fontWeight: 'bold' };
    const sectionStyle = { background: '#f9f9f9', padding: '2rem', borderRadius: '8px', marginBottom: '2rem', border: '1px solid #eee' };

    return (
        <div style={{
            maxWidth: '900px',
            margin: '0 auto',
            padding: '8rem 2rem',
            fontFamily: 'sans-serif'
        }}>
            <SEO title="Book Curator Mega-Tool" />
            <h1 style={{ marginBottom: '1rem', color: 'var(--color-brand-forrest)' }}>Book Curator Mega-Tool</h1>
            <p style={{ marginBottom: '2rem', fontSize: '1.1rem' }}>
                Fill out the details below to add a new book or edit an existing one.
            </p>

            {/* MODE TOGGLE */}
            <div style={{...sectionStyle, display: 'flex', gap: '1rem', alignItems: 'center', background: '#eef8f1'}}>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button 
                        onClick={() => setMode('create')}
                        style={{ padding: '0.5rem 1rem', background: mode === 'create' ? 'var(--color-brand-forrest)' : '#ccc', color: 'white', borderRadius: '4px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>
                        ✨ Add New Book
                    </button>
                    <button 
                        onClick={() => setMode('edit')}
                        style={{ padding: '0.5rem 1rem', background: mode === 'edit' ? 'var(--color-brand-coral)' : '#ccc', color: 'white', borderRadius: '4px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>
                        ✏️ Edit Existing Book
                    </button>
                </div>
                
                {mode === 'edit' && (
                    <div style={{ flex: 1, marginLeft: '1rem' }}>
                        <select 
                            value={selectedBookSlug} 
                            onChange={(e) => setSelectedBookSlug(e.target.value)}
                            style={{ width: '100%', padding: '0.5rem', fontSize: '1rem', borderRadius: '4px', border: '1px solid #ccc' }}
                        >
                            <option value="">-- Select a book to edit --</option>
                            {[...books].sort((a,b) => a.title.localeCompare(b.title)).map(b => (
                                <option key={b.slug} value={b.slug}>{b.title} by {b.author}</option>
                            ))}
                        </select>
                    </div>
                )}
            </div>

            {/* SECTION 1: METADATA */}
            <div style={sectionStyle}>
                <h2 style={{ borderBottom: '2px solid #ccc', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>1. Core Metadata</h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                        <label style={labelStyle}>Title *</label>
                        <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. The Way of Kings" style={inputStyle} />
                    </div>
                    <div>
                        <label style={labelStyle}>Author *</label>
                        <input type="text" value={author} onChange={e => setAuthor(e.target.value)} placeholder="e.g. Brandon Sanderson" style={inputStyle} />
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', opacity: 0.7 }}>
                    <div><label style={labelStyle}>ID (Auto)</label><input type="text" readOnly value={nextId} style={{...inputStyle, background: '#eee'}} /></div>
                    <div><label style={labelStyle}>Slug (Auto)</label><input type="text" readOnly value={slug} style={{...inputStyle, background: '#eee'}} /></div>
                    <div><label style={labelStyle}>Cover URL (Auto)</label><input type="text" readOnly value={coverUrl} style={{...inputStyle, background: '#eee'}} /></div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                        <label style={labelStyle}>Length (e.g. "45h 37m")</label>
                        <input type="text" value={lengthStr} onChange={e => setLengthStr(e.target.value)} placeholder="45h 37m" style={inputStyle} />
                        {lengthHours > 0 && <span style={{ fontSize: '0.8rem', color: 'green' }}>Calculated: {lengthHours} hours</span>}
                    </div>
                    <div>
                        <label style={labelStyle}>Cover Image Upload (.jpg)</label>
                        <input type="file" accept="image/jpeg, image/jpg" onChange={handleImageUpload} style={{...inputStyle, padding: '0.25rem'}} />
                    </div>
                </div>

                <label style={labelStyle}>Genres</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
                    {existingGenres.map(g => (
                        <button 
                            key={g} 
                            onClick={() => toggleGenre(g)}
                            style={{
                                padding: '0.3rem 0.6rem',
                                borderRadius: '15px',
                                border: '1px solid var(--color-brand-coral)',
                                background: selectedGenres.includes(g) ? 'var(--color-brand-coral)' : 'transparent',
                                color: selectedGenres.includes(g) ? 'white' : 'var(--color-brand-coral)',
                                cursor: 'pointer',
                                fontSize: '0.9rem'
                            }}
                        >
                            {g}
                        </button>
                    ))}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                        <label style={labelStyle}>UK ASIN <span style={{fontWeight: 'normal', color: '#666', fontSize: '0.85rem'}}>(or full link)</span></label>
                        <input type="text" value={affiliateLink} onChange={e => setAffiliateLink(e.target.value)} placeholder="e.g. B0FBSCF8N3" style={inputStyle} />
                    </div>
                    <div>
                        <label style={labelStyle}>US ASIN <span style={{fontWeight: 'normal', color: '#666', fontSize: '0.85rem'}}>(or full link)</span></label>
                        <input type="text" value={affiliateLinkUS} onChange={e => setAffiliateLinkUS(e.target.value)} placeholder="e.g. B0FBS7GCTV" style={inputStyle} />
                    </div>
                </div>
            </div>

            {/* SECTION 2: AI CURATION */}
            <div style={sectionStyle}>
                <h2 style={{ borderBottom: '2px solid #ccc', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>2. AI Generated Curation</h2>
                
                <label style={labelStyle}>Card Overview <span style={{fontWeight: 'normal', color: '#666', fontSize: '0.85rem'}}>(Max 120 chars. Displays as the 3-line excerpt on standard Book Cards / Home Page)</span></label>
                <textarea rows={2} value={cardOverview} onChange={e => setCardOverview(e.target.value)} placeholder="1-2 sentences hook." style={inputStyle}></textarea>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '1rem' }}>
                    <div>
                        <label style={labelStyle}>Teaser Title <span style={{fontWeight: 'normal', color: '#666', fontSize: '0.85rem'}}>(Displays as H4 headline on Collection Pages)</span></label>
                        <input type="text" value={teaserTitle} onChange={e => setTeaserTitle(e.target.value)} placeholder="A Whodunnit for the Soul" style={inputStyle} />
                    </div>
                    <div>
                        <label style={labelStyle}>Teaser <span style={{fontWeight: 'normal', color: '#666', fontSize: '0.85rem'}}>(Displays as book preview paragraph on Collection Pages)</span></label>
                        <textarea rows={2} value={teaser} onChange={e => setTeaser(e.target.value)} placeholder="2-3 sentence SEO friendly hook..." style={inputStyle}></textarea>
                    </div>
                </div>

                <label style={labelStyle}>Curator Title <span style={{fontWeight: 'normal', color: '#666', fontSize: '0.85rem'}}>(Displays as H2 headline on the individual Book Details page)</span></label>
                <input type="text" value={curatorTitle} onChange={e => setCuratorTitle(e.target.value)} placeholder="A sprawling saga..." style={inputStyle} />

                <label style={labelStyle}>The Long Book Club Take <span style={{fontWeight: 'normal', color: '#666', fontSize: '0.85rem'}}>(The main review body on individual Book Details page)</span></label>
                <textarea rows={6} value={curatorNote} onChange={e => setCuratorNote(e.target.value)} placeholder="1-2 paragraphs reviewing the book..." style={{...inputStyle, fontFamily: 'monospace'}}></textarea>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1rem' }}>
                    <div>
                        <label style={labelStyle}>Narrator Name(s)</label>
                        <input type="text" value={narrator} onChange={e => setNarrator(e.target.value)} placeholder="e.g. John Doe, Jane Smith" style={inputStyle} />
                    </div>
                    <div>
                        <label style={labelStyle}>Soundcheck (Narration Review)</label>
                        <textarea rows={3} value={soundCheck} onChange={e => setSoundCheck(e.target.value)} placeholder="Review of the narration performance..." style={inputStyle}></textarea>
                    </div>
                </div>
            </div>

            {/* SAVE BUTTON */}
            <div style={{ position: 'sticky', bottom: '2rem', textAlign: 'center', marginTop: '2rem', padding: '1rem', background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(5px)', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                 <button
                    onClick={handleSave}
                    style={{
                        backgroundColor: saveSuccess.includes('Error') || saveSuccess.includes('❌') ? 'red' : (saveSuccess.includes('✅') ? 'green' : 'var(--color-brand-forrest)'),
                        color: 'white',
                        border: 'none',
                        padding: '1rem 3rem',
                        borderRadius: '30px',
                        fontSize: '1.2rem',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        transition: 'all 0.3s'
                    }}
                >
                    {saveSuccess || (mode === 'edit' ? '💾 Update Existing Book' : '💾 Save New Book')}
                </button>
            </div>
        </div>
    );
};
