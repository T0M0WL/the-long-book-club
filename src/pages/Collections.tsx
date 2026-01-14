import { Link } from 'react-router-dom';
import { collections } from '../data/collections';
import { SEO } from '../components/SEO';
import { Hero } from '../components/Hero';

export const Collections = () => {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <SEO
                title="Curated Collections"
                description="Explore our curated lists of the best long-form audiobooks."
                canonical="https://thelongbookclub.com/collections"
            />
            <Hero
                backgroundImage="/assets/collections-hero-images/LongBookClub-Collections-background-01.jpg"
                title={<>Curated <br /> Collections</>}
                subtitle="Whether you’re searching for a specific trending micro-genre or the longest audiobooks ever, try these hand-picked collections as inspiration for your next long listen."
                showCornerGraphics={false}
                topGraphic="/assets/collections-hero-images/collections-graphic.svg"
                titleColor="white"
                subtitleColor="white"
                compactLogo={true}
                contentBlendMode="overlay"
                overlayOpacity={0}
                showLogo={false}
                chevronBlendMode="overlay"
            />

            <div className="page-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div id="scroll-target" style={{ scrollMarginTop: '2rem', height: 0 }} />

                <div className="collections-grid">
                    {collections.map(collection => (
                        <Link
                            key={collection.id}
                            to={`/collections/${collection.slug}`}
                            style={{
                                textDecoration: 'none',
                                color: 'inherit',
                                display: 'block'
                            }}
                        >
                            <div style={{
                                filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))', // Apply shadow to the whole irregular shape
                                transition: 'transform 0.3s ease, filter 0.3s ease',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-5px)';
                                    e.currentTarget.style.filter = 'drop-shadow(0 10px 15px rgba(0,0,0,0.15))';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.filter = 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))';
                                }}
                            >
                                {/* Top Graphic */}
                                {collection.topGraphic ? (
                                    <img
                                        src={collection.topGraphic}
                                        alt={collection.title}
                                        style={{
                                            width: '100%',
                                            display: 'block',
                                            // The graphic likely includes the rounded top or specific shape
                                        }}
                                    />
                                ) : (
                                    // Fallback if no graphic defined
                                    <div style={{ height: '150px', background: '#ccc' }}></div>
                                )}

                                {/* Middle Content */}
                                <div style={{
                                    backgroundColor: '#efeee6',
                                    padding: '2rem 2.5rem 3rem 2.5rem', // More top/side padding
                                    flex: 1,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    textAlign: 'center'
                                }}>
                                    <h2 style={{
                                        fontSize: '2.5rem', // Lora Regular Proportions
                                        marginBottom: '0.5rem', // Reduced margin slightly to bring line closer
                                        fontFamily: 'var(--font-serif-accent)', // Lora
                                        color: 'var(--color-brand-forrest)',
                                        fontWeight: 400, // Regular
                                        lineHeight: 1.1
                                    }}>
                                        {collection.title}
                                    </h2>

                                    {/* Divider Line */}
                                    <div style={{
                                        width: '60px',
                                        height: '2px',
                                        backgroundColor: 'var(--color-brand-forrest)',
                                        margin: '1.5rem 0',
                                        opacity: 0.6
                                    }}></div>

                                    <p style={{
                                        fontSize: '1rem',
                                        color: 'var(--color-text-muted)',
                                        marginBottom: '2rem',
                                        lineHeight: '1.6',
                                        fontFamily: 'var(--font-body)',
                                        flex: 1
                                    }}>
                                        {collection.description}
                                    </p>

                                    {/* Button - Orange Lozenge */}
                                    <div style={{
                                        backgroundColor: 'var(--color-brand-coral)',
                                        color: 'white',
                                        padding: '0.75rem 2rem',
                                        borderRadius: '50px',
                                        fontSize: '0.875rem',
                                        fontWeight: 600,
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.05em',
                                        boxShadow: '0 4px 10px rgba(255, 107, 74, 0.3)',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '0.5rem'
                                    }}>
                                        View Collection <span style={{ fontSize: '1.1em', lineHeight: 1 }}>&rarr;</span>
                                    </div>
                                </div>

                                {/* Bottom Curve */}
                                <img
                                    src="/assets/Collections-Cards-Gfx/collectionsCard_bottom-Curve.svg"
                                    alt=""
                                    style={{
                                        width: '100%',
                                        display: 'block',
                                        marginTop: '-1px' // Prevent sub-pixel gap
                                    }}
                                />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};
