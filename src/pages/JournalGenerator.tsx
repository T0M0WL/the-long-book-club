import { useState } from 'react';
import { SEO } from '../components/SEO';
import { journalPosts } from '../data/journal';
import { books } from '../data/books';

export const JournalGenerator = () => {
    // State for form fields
    const [title, setTitle] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [author, setAuthor] = useState('The Long Book Club');
    const [excerpt, setExcerpt] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState('');
    const [coverUrl, setCoverUrl] = useState('');

    const [id, setId] = useState(Date.now().toString());
    const [copySuccess, setCopySuccess] = useState('');

    // Book insertion state
    const [selectedBookId, setSelectedBookId] = useState('');


    // derived slug
    const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

    // Sort posts by date for the dropdown
    const sortedPosts = [...journalPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    // Sort books for dropdown
    const sortedBooks = [...books].sort((a, b) => a.title.localeCompare(b.title));


    const handleSelectPost = (postId: string) => {
        if (!postId) return;
        const post = journalPosts.find(p => p.id === postId);
        if (post) {
            setId(post.id);
            setTitle(post.title);
            setDate(post.date);
            setAuthor(post.author);
            setExcerpt(post.excerpt);
            setContent(post.content);
            setTags(post.tags ? post.tags.join(', ') : '');
            setCoverUrl(post.coverUrl || '');
        }
    };

    const handleNewJournal = () => {
        setId(Date.now().toString());
        setTitle('');
        setDate(new Date().toISOString().split('T')[0]);
        setAuthor('The Long Book Club');
        setExcerpt('');
        setContent('');
        setTags('');
        setCoverUrl('');
    };

    // Helper to insert markdown syntax
    const insertMarkdown = (prefix: string, suffix: string = '') => {
        const textarea = document.getElementById('content-editor') as HTMLTextAreaElement;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const scrollTop = textarea.scrollTop; // Capture scroll position
        const text = textarea.value;
        const selection = text.substring(start, end);

        const replacement = prefix + selection + suffix;
        const newText = text.substring(0, start) + replacement + text.substring(end);

        setContent(newText);

        // Restore focus, selection, and scroll position
        setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(start + prefix.length, end + prefix.length);
            textarea.scrollTop = scrollTop; // Restore scroll position
        }, 0);
    };

    const insertBook = () => {
        if (!selectedBookId) return;
        const book = books.find(b => b.id === selectedBookId);
        if (book && book.slug) {
            insertMarkdown(`\n[Book: ${book.slug}]\n`);
            setSelectedBookId(''); // Reset selection
        } else {
            alert('Selected book usually needs a slug. Check data.');
        }
    };


    const generateCode = () => {
        const safeString = (str: string) => JSON.stringify(str);

        const tagsArray = tags.split(',').map(t => t.trim()).filter(Boolean);
        const tagsString = tagsArray.length ? `[${tagsArray.map(t => `'${t}'`).join(', ')}]` : '[]';

        return `    {
        id: '${id}',
        slug: '${slug}',
        title: ${safeString(title)},
        date: '${date}',
        author: ${safeString(author)},
        excerpt: ${safeString(excerpt)},
        content: \`${content.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`,
        tags: ${tagsString},
        ${coverUrl ? `coverUrl: '${coverUrl}',` : ''}
    },`;
    };

    const handleCopy = () => {
        const code = generateCode();
        navigator.clipboard.writeText(code).then(() => {
            setCopySuccess('Copied!');
            setTimeout(() => setCopySuccess(''), 2000);
        });
    };

    const btnStyle = {
        padding: '0.25rem 0.5rem',
        marginRight: '0.5rem',
        marginBottom: '0.5rem',
        backgroundColor: '#eee',
        border: '1px solid #ccc',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '0.9rem'
    };

    return (
        <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '8rem 2rem',
            fontFamily: 'sans-serif'
        }}>
            <SEO title="Journal Post Generator" />
            <h1 style={{ marginBottom: '2rem', color: 'var(--color-brand-forrest)' }}>Journal Post Generator (Enhanced)</h1>

            {/* CONTROL BAR */}
            <div style={{
                marginBottom: '2.5rem',
                padding: '1.5rem',
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
            }}>
                <div>
                    <label style={{ marginRight: '1rem', fontWeight: 'bold', color: 'var(--color-brand-forrest)' }}>Load Existing Post:</label>
                    <select
                        onChange={(e) => handleSelectPost(e.target.value)}
                        style={{
                            padding: '0.5rem',
                            borderRadius: '4px',
                            border: '1px solid #ccc',
                            fontSize: '0.95rem',
                            minWidth: '250px'
                        }}
                        defaultValue=""
                    >
                        <option value="" disabled>-- Select a Post to Edit --</option>
                        {sortedPosts.map(p => (
                            <option key={p.id} value={p.id}>{p.date} - {p.title}</option>
                        ))}
                    </select>
                </div>
                <button
                    onClick={handleNewJournal}
                    style={{
                        padding: '0.6rem 1.2rem',
                        backgroundColor: 'var(--color-brand-coral)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        fontSize: '0.95rem'
                    }}
                >
                    + New Journal
                </button>
            </div>

            {/* FORM CONTAINER - GRID LAYOUT */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '3rem' }}>

                {/* LEFT COLUMN: METADATA */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                    {/* Left Side of Metadata */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {/* Title */}
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Title</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="e.g. The Art of the Long Read"
                                style={{ width: '100%', padding: '0.5rem', fontSize: '1rem' }}
                            />
                            <div style={{ fontSize: '0.8rem', color: '#666', marginTop: '0.25rem' }}>Slug: {slug}</div>
                        </div>

                        {/* Date & Author */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Date</label>
                                <input
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    style={{ width: '100%', padding: '0.5rem', fontSize: '1rem' }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Author</label>
                                <input
                                    type="text"
                                    value={author}
                                    onChange={(e) => setAuthor(e.target.value)}
                                    style={{ width: '100%', padding: '0.5rem', fontSize: '1rem' }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right Side of Metadata (in column now) */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {/* Tags */}
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Tags (comma separated)</label>
                            <input
                                type="text"
                                value={tags}
                                onChange={(e) => setTags(e.target.value)}
                                placeholder="e.g. Analysis, History, News"
                                style={{ width: '100%', padding: '0.5rem', fontSize: '1rem' }}
                            />
                        </div>

                        {/* Cover URL */}
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Cover Image URL</label>
                            <input
                                type="text"
                                value={coverUrl}
                                onChange={(e) => setCoverUrl(e.target.value)}
                                placeholder="/assets/journal/..."
                                style={{ width: '100%', padding: '0.5rem', fontSize: '1rem' }}
                            />
                            {coverUrl && (
                                <div style={{ marginTop: '0.5rem' }}>
                                    <span style={{ fontSize: '0.8rem', color: '#666' }}>Preview (16:9 Recommended):</span>
                                    <img
                                        src={coverUrl}
                                        alt="Preview"
                                        style={{ width: '100%', height: 'auto', borderRadius: '4px', marginTop: '0.25rem', border: '1px solid #ddd' }}
                                        onError={(e) => (e.currentTarget.style.display = 'none')}
                                    />
                                </div>
                            )}
                        </div>

                        {/* Excerpt */}
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Short Excerpt</label>
                            <textarea
                                value={excerpt}
                                onChange={(e) => setExcerpt(e.target.value)}
                                rows={4}
                                placeholder="A brief summary for the preview card..."
                                style={{ width: '100%', padding: '0.5rem', fontSize: '1rem' }}
                            />
                        </div>
                    </div>
                </div>

                {/* BOTTOM: BODY CONTENT EDITOR */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <label style={{ display: 'block', fontWeight: 'bold', fontSize: '1.2rem' }}>Body Content (Markdown)</label>

                    {/* Toolbar */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', borderBottom: '1px solid #eee', paddingBottom: '1rem', marginBottom: '0.5rem' }}>
                        <button onClick={() => insertMarkdown('**', '**')} style={btnStyle}><strong>B</strong></button>
                        <button onClick={() => insertMarkdown('*', '*')} style={btnStyle}><em>I</em></button>
                        <button onClick={() => insertMarkdown('## ')} style={btnStyle}>H2</button>
                        <button onClick={() => insertMarkdown('### ')} style={btnStyle}>H3</button>
                        <button onClick={() => insertMarkdown('[', '](url)')} style={btnStyle}>Link</button>
                        <button onClick={() => insertMarkdown('* ')} style={btnStyle}>List</button>
                        <button onClick={() => insertMarkdown('> ')} style={btnStyle}>Quote</button>
                        <button onClick={() => insertMarkdown('---\n')} style={btnStyle}>Divider</button>
                    </div>

                    {/* Insert Book Tools */}
                    <div style={{
                        padding: '1rem',
                        backgroundColor: '#f9fafb',
                        border: '1px solid #e5e7eb',
                        borderRadius: '6px',
                        display: 'flex',
                        gap: '1rem',
                        alignItems: 'center',
                        marginBottom: '1rem'
                    }}>
                        <span style={{ fontWeight: 'bold', fontSize: '0.9rem', color: 'var(--color-brand-forrest)' }}>Insert Book Packshot:</span>
                        <select
                            value={selectedBookId}
                            onChange={(e) => setSelectedBookId(e.target.value)}
                            style={{ padding: '0.4rem', border: '1px solid #ccc', borderRadius: '4px', flex: 1 }}
                        >
                            <option value="">-- Select Book --</option>
                            {sortedBooks.map(b => (
                                <option key={b.id} value={b.id}>{b.title} ({b.length})</option>
                            ))}
                        </select>
                        <button
                            onClick={insertBook}
                            disabled={!selectedBookId}
                            style={{
                                padding: '0.4rem 1rem',
                                backgroundColor: selectedBookId ? 'var(--color-brand-forrest)' : '#ccc',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: selectedBookId ? 'pointer' : 'not-allowed'
                            }}
                        >
                            Insert
                        </button>
                    </div>

                    <textarea
                        id="content-editor"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows={28}
                        placeholder="Write your post here using Markdown..."
                        style={{
                            width: '100%',
                            padding: '1rem',
                            fontSize: '1rem',
                            fontFamily: 'monospace',
                            lineHeight: '1.5',
                            border: '1px solid #ccc',
                            borderRadius: '4px'
                        }}
                    />
                </div>
            </div>

            {/* OUTPUT SECTION */}
            <div style={{ marginTop: '3rem', borderTop: '2px solid #eee', paddingTop: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h2 style={{ margin: 0 }}>Generated Code</h2>
                    <button
                        onClick={handleCopy}
                        style={{
                            backgroundColor: copySuccess ? 'green' : 'var(--color-brand-forrest)',
                            color: 'white',
                            border: 'none',
                            padding: '0.5rem 1rem',
                            borderRadius: '4px',
                            fontSize: '1rem',
                            fontWeight: 'bold',
                            cursor: 'pointer'
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
                    <strong>Instructions:</strong> Copy the code above and paste it into <code>src/data/journal.ts</code> inside the <code>journalPosts</code> array.
                </p>
            </div>
        </div>
    );
};
