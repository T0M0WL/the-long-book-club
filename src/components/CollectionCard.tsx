
import { Link } from 'react-router-dom';
import type { Collection } from '../data/collections';

interface CollectionCardProps {
    collection: Collection;
}

export const CollectionCard = ({ collection }: CollectionCardProps) => {
    return (
        <Link
            to={`/collections/${collection.slug}/`}
            style={{
                textDecoration: 'none',
                color: 'inherit',
                display: 'block',
                height: '100%',
                marginBottom: '2rem' // Add some spacing for grid contexts
            }}
        >
            <div style={{
                transition: 'transform 0.3s ease',
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
            }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
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
                        }}
                    />
                ) : (
                    <div style={{ height: '150px', background: '#ccc' }}></div>
                )}

                {/* Middle Content */}
                <div style={{
                    backgroundColor: '#f2f1e7',
                    padding: '2rem 2rem 3rem 2rem',
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center'
                }}>
                    <h2 style={{
                        fontSize: 'clamp(1.5rem, 5vw, 2.2rem)', // Responsive font size
                        marginBottom: '0.5rem',
                        fontFamily: 'var(--font-serif-accent)',
                        color: 'var(--color-brand-forrest)',
                        fontWeight: 400,
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
                        lineHeight: '1.4',
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
                        fontSize: '1rem',
                        fontFamily: 'var(--font-serif-accent)',
                        fontWeight: 400,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}>
                        View Collection <span style={{ fontSize: '1.1em', lineHeight: 1, fontFamily: 'var(--font-body)' }}>&rarr;</span>
                    </div>
                </div>

                {/* Bottom Curve */}
                <img
                    src="/assets/Collections-Cards-Gfx/collectionsCard_bottom-Curve.svg"
                    alt=""
                    style={{
                        width: '100%',
                        display: 'block',
                        marginTop: '-2px', // Increased overlap
                        transform: 'scaleY(1.1)', // Tiny scale to ensure coverage
                        transformOrigin: 'top'
                    }}
                />
            </div>
        </Link>
    );
};
