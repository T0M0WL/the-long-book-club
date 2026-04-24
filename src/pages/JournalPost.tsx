import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useHeaderContext } from '../context/HeaderContext';
import { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';
import { FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa6';
import { journalPosts } from '../data/journal';
import { books } from '../data/books';
import Breadcrumbs from '../components/Breadcrumbs';

export const JournalPost = () => {
    const { slug } = useParams();
    const { setHeaderTheme } = useHeaderContext();

    // Find the current post
    const post = journalPosts.find(p => p.slug === slug);
    // Find other posts for the sidebar (exclude current)
    const otherPosts = journalPosts.filter(p => (slug ? p.slug !== slug : true)).slice(0, 3);

    useEffect(() => {
        setHeaderTheme({
            logoColor: 'var(--color-brand-forrest)',
            textColor: 'var(--color-brand-forrest)',
            hamburgerColor: 'var(--color-brand-forrest)',
            activeLink: 'journal',
            activeLinkBg: 'var(--color-brand-forrest)',
            activeLinkText: 'var(--color-brand-cloud)'
        });
    }, [setHeaderTheme]);


    if (!post) {
        return (
            <div style={{ paddingTop: '150px', textAlign: 'center' }}>
                <Helmet><title>Post Not Found</title></Helmet>
                <h1>Post Not Found</h1>
                <Link to="/journal">Return to Journal</Link>
            </div>
        );
    }

    // Custom Component for rendering Book Cards
    const renderParagraph = (props: any) => {
        const { children } = props;

        // Check if children is a string and matches [Book: slug]
        if (typeof children === 'string' && children.startsWith('[Book: ') && children.endsWith(']')) {
            const bookSlug = children.replace('[Book: ', '').replace(']', '').trim();
            const book = books.find(b => b.slug === bookSlug);

            if (book) {
                // RENDER INLINE BOOK CARD
                return (
                    <div className="inline-book-card" style={{
                        margin: '3rem 0',
                        backgroundColor: '#fff',
                        border: '1px solid #eee',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.05))',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'stretch',
                        textDecoration: 'none'
                    }}>
                        {/* Book Cover - Square 1:1 */}
                        <div style={{ width: '150px', height: '150px', flexShrink: 0 }}>
                            <img
                                src={book.coverUrl}
                                alt={book.title}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </div>

                        {/* Book Details */}
                        <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', flex: 1, textAlign: 'left' }}>
                            <h4 style={{
                                fontFamily: 'var(--font-serif-accent)',
                                fontSize: '1.4rem',
                                color: 'var(--color-brand-forrest)',
                                margin: '0 0 0.5rem 0',
                                lineHeight: '1.2'
                            }}>
                                {book.title}
                            </h4>
                            <p style={{
                                fontFamily: 'var(--font-serif-accent)',
                                fontSize: '1rem',
                                color: '#666',
                                margin: '0 0 1rem 0'
                            }}>
                                {book.author} • {book.length}
                            </p>

                            <Link to={`/book/${book.slug}`} style={{
                                display: 'inline-block',
                                color: 'var(--color-brand-coral)',
                                fontWeight: 'bold',
                                textDecoration: 'none',
                                borderBottom: '2px solid var(--color-brand-coral)',
                                width: 'fit-content'
                            }}>
                                View Book Details &rarr;
                            </Link>
                        </div>
                    </div>
                );
            }
        }

        // Default Paragraph
        return <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1.025rem',
            lineHeight: 1.6,
            marginBottom: '2rem',
            color: 'var(--color-brand-slate)',
            textAlign: 'left'
        }} {...props} />;
    };


    return (
        <div style={{ maxWidth: '100vw', overflowX: 'hidden', minHeight: '100vh', backgroundColor: 'transparent' }}>
            <Helmet>
                <title>{post.title} | The Journal</title>
            </Helmet>

            {/* MAIN CONTENT AREA */}
            <div id="post-content" style={{
                maxWidth: '1280px',
                margin: '0 auto',
                padding: '4rem 2rem 8rem 2rem',
            }}>
                {/* Breadcrumbs */}
                <style>{`
                    .journal-breadcrumbs .breadcrumbs-nav {
                        padding-top: 8rem !important;
                        padding-bottom: 2rem !important;
                    }
                `}</style>
                <div className="journal-breadcrumbs" style={{ marginBottom: '1rem', textAlign: 'left' }}>
                    <Breadcrumbs items={[
                        { label: 'Home', path: '/' },
                        { label: 'Journal', path: '/journal' },
                        { label: post.title }
                    ]} />
                </div>

                {/* Full Width Hero Image (Moved above grid) */}
                {post.coverUrl && (
                    <div style={{
                        marginBottom: '4rem',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        width: '100%',
                        aspectRatio: '16/9' // Widescreen for hero
                    }}>
                        <img
                            src={post.coverUrl}
                            alt={post.title}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </div>
                )}

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'minmax(0, 2fr) minmax(300px, 1fr)', // Content takes 2/3, Sidebar 1/3
                    gap: '6rem',
                    alignItems: 'start'
                }}>

                    {/* LEFT COLUMN: Main Content */}
                    <article>
                        {/* Header Info - Title & Excerpt */}
                        <header style={{ marginBottom: '4rem', textAlign: 'left' }}>


                            <h1 style={{
                                fontFamily: 'var(--font-heading)',
                                fontSize: 'clamp(3.5rem, 6vw, 5.5rem)',
                                color: 'var(--color-brand-forrest)',
                                lineHeight: '1.1',
                                marginBottom: '2rem',
                                fontWeight: 400,
                                letterSpacing: '-0.02em'
                            }}>
                                {post.title}
                            </h1>

                            <p style={{
                                fontFamily: 'var(--font-serif-accent)',
                                fontSize: 'clamp(1.2rem, 2vw, 1.5rem)',
                                color: 'var(--color-brand-slate)',
                                lineHeight: '1.6',
                                opacity: 0.9,
                                maxWidth: '90%',
                                marginBottom: '2rem'
                            }}>
                                {post.excerpt}
                            </p>
                        </header>

                        {/* Render simple HTML/Markdown content */}
                        <div className="journal-content">
                            <ReactMarkdown
                                remarkPlugins={[remarkBreaks]}
                                components={{
                                    h2: ({ ...props }) => <h2 style={{
                                        fontFamily: 'var(--font-serif-accent)',
                                        fontSize: '31px',
                                        marginTop: '4rem',
                                        marginBottom: '1.5rem',
                                        color: 'var(--color-brand-forrest)',
                                        fontWeight: 400,
                                        lineHeight: '1.1',
                                        textAlign: 'left'
                                    }} {...props} />,
                                    h3: ({ ...props }) => <h3 style={{
                                        fontFamily: 'var(--font-serif-accent)',
                                        fontSize: '1.35rem',
                                        marginTop: '3rem',
                                        marginBottom: '1rem',
                                        color: 'var(--color-brand-forrest)',
                                        fontWeight: 600,
                                        lineHeight: 1.5,
                                        textAlign: 'left'
                                    }} {...props} />,
                                    // USE CUSTOM PARAGRAPH RENDERER
                                    p: renderParagraph,
                                    ul: ({ ...props }) => <ul style={{
                                        marginBottom: '2rem',
                                        paddingLeft: '1.5rem',
                                        fontSize: '1.025rem',
                                        fontFamily: 'var(--font-body)',
                                        lineHeight: 1.5,
                                        color: 'var(--color-brand-slate)',
                                        textAlign: 'left'
                                    }} {...props} />,
                                    li: ({ ...props }) => <li style={{
                                        marginBottom: '0.75rem',
                                    }} {...props} />,
                                    blockquote: ({ ...props }) => <blockquote style={{
                                        borderLeft: '2px solid var(--color-brand-forrest)',
                                        paddingLeft: '2rem',
                                        fontStyle: 'italic',
                                        margin: '3rem 0',
                                        color: 'var(--color-brand-forrest)',
                                        fontSize: '1.5rem',
                                        fontFamily: 'var(--font-serif-accent)',
                                        lineHeight: 1.4,
                                        textAlign: 'left'
                                    }} {...props} />,
                                    a: ({ ...props }) => <a style={{
                                        color: 'var(--color-brand-forrest)',
                                        textDecoration: 'underline',
                                        textUnderlineOffset: '3px',
                                        textDecorationThickness: '1px',
                                        fontWeight: 600
                                    }} {...props} />
                                }}>
                                {post.content}
                            </ReactMarkdown>
                        </div>
                    </article>


                    {/* RIGHT COLUMN: Sidebar (The Latest) */}
                    <aside style={{
                        position: 'sticky',
                        top: '100px', // Stick below header
                        display: 'flex',
                        flexDirection: 'column',
                        textAlign: 'left'
                    }}>
                        {/* Social Links ABOVE Sidebar */}
                        <div style={{
                            display: 'flex',
                            gap: '1.5rem',
                            marginBottom: '1.5rem',
                            justifyContent: 'flex-start',
                            alignItems: 'center'
                        }}>
                            <a href="https://www.instagram.com/thelongbookclub" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-brand-forrest)', fontSize: '1.5rem', transition: 'color 0.3s, transform 0.3s' }} onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-brand-coral)'; e.currentTarget.style.transform = 'scale(1.1)'; }} onMouseLeave={e => { e.currentTarget.style.color = 'var(--color-brand-forrest)'; e.currentTarget.style.transform = 'scale(1)'; }}>
                                <FaInstagram />
                            </a>
                            <a href="https://www.tiktok.com/@thelongbookclub" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-brand-forrest)', fontSize: '1.5rem', transition: 'color 0.3s, transform 0.3s' }} onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-brand-coral)'; e.currentTarget.style.transform = 'scale(1.1)'; }} onMouseLeave={e => { e.currentTarget.style.color = 'var(--color-brand-forrest)'; e.currentTarget.style.transform = 'scale(1)'; }}>
                                <FaTiktok />
                            </a>
                            <a href="https://www.youtube.com/@TheLongBookClub" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-brand-forrest)', fontSize: '1.5rem', transition: 'color 0.3s, transform 0.3s' }} onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-brand-coral)'; e.currentTarget.style.transform = 'scale(1.1)'; }} onMouseLeave={e => { e.currentTarget.style.color = 'var(--color-brand-forrest)'; e.currentTarget.style.transform = 'scale(1)'; }}>
                                <FaYoutube />
                            </a>
                        </div>

                        {/* Top Curve */}
                        <img
                            src="/assets/Collections-Cards-Gfx/collectionsCard_bottom-Curve.svg"
                            alt=""
                            style={{
                                width: '100%',
                                display: 'block',
                                transform: 'scaleY(-1)',
                                filter: 'brightness(0) invert(1)',
                                marginBottom: '-1px', // Seamless connection
                                pointerEvents: 'none'
                            }}
                        />

                        {/* Content Container */}
                        <div style={{
                            backgroundColor: '#fff',
                            padding: '0 2.5rem', // Removed top/bottom padding to let curves handle it, or adjust
                            paddingTop: '50px',
                            paddingBottom: '50px'
                        }}>
                            <h3 style={{
                                fontFamily: 'var(--font-serif-accent)',
                                fontSize: '2.2rem',
                                color: 'var(--color-brand-forrest)',
                                marginBottom: '2rem',
                                fontWeight: 400,
                                letterSpacing: '-0.01em',
                                textAlign: 'left'
                            }}>
                                The Latest:
                            </h3>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                                {otherPosts.length > 0 ? otherPosts.map((other, idx) => (
                                    <div key={other.id}>
                                        <Link to={`/journal/${other.slug}`} style={{ textDecoration: 'none' }}>
                                            {/* THUMBNAIL IN SIDEBAR (Optional, but nice) */}
                                            {other.coverUrl && (
                                                <img
                                                    src={other.coverUrl}
                                                    alt={other.title}
                                                    style={{
                                                        width: '100%',
                                                        borderRadius: '4px',
                                                        marginBottom: '1rem',
                                                        objectFit: 'cover',
                                                        aspectRatio: '16/9'
                                                    }}
                                                />
                                            )}
                                            <h4 style={{
                                                fontFamily: 'var(--font-serif-accent)', // Lora
                                                fontSize: '1.1rem',
                                                color: 'var(--color-brand-slate)',
                                                marginBottom: '0.5rem',
                                                lineHeight: 1.5,
                                                fontWeight: 400,
                                                transition: 'color 0.2s'
                                            }}
                                                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-brand-coral)'}
                                                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-brand-slate)'}
                                            >
                                                {other.title}
                                            </h4>
                                        </Link>

                                        {/* Divider (dashed style maybe? or simple line) */}
                                        {idx < otherPosts.length - 1 && (
                                            <div style={{
                                                width: '100%',
                                                height: '1px',
                                                borderBottom: '1px dashed var(--color-brand-slate)',
                                                opacity: 0.3,
                                                marginTop: '1.5rem'
                                            }} />
                                        )}
                                    </div>
                                )) : (
                                    <p style={{ fontStyle: 'italic', color: '#999' }}>More posts coming soon...</p>
                                )}
                            </div>
                        </div>

                        {/* Bottom Curve */}
                        <img
                            src="/assets/Collections-Cards-Gfx/collectionsCard_bottom-Curve.svg"
                            alt=""
                            style={{
                                width: '100%',
                                display: 'block',
                                filter: 'brightness(0) invert(1)',
                                marginTop: '-1px', // Seamless connection
                                pointerEvents: 'none'
                            }}
                        />
                    </aside>
                </div>

                {/* Mobile Responsive Styles */}
                <style>{`
                    @media (max-width: 900px) {
                        .journal-content {
                                grid-template-columns: 1fr;
                        }
                        /* Convert grid to single column on mobile */
                        div[style*="grid-template-columns"] {
                            grid-template-columns: 1fr !important;
                            gap: 4rem !important;
                        }
                        aside {
                            position: static !important;
                            width: 100%;
                            margin-top: 2rem;
                            padding: 1.5rem !important; /* Less padding on mobile */
                        }
                        h1 {
                            font-size: 3rem !important;
                        }
                        .inline-book-card > div:first-child {
                            width: 100px !important;
                            height: 100px !important;
                        }
                    }
                `}</style>
            </div>
        </div >
    );
};
