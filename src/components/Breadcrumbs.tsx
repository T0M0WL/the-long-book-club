import React from 'react';
import { Link } from 'react-router-dom';

interface BreadcrumbItem {
    label: string;
    path?: string; // If undefined, it's the current/active item (text only)
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
    return (
        <>
            <style>{`
                .breadcrumbs-nav {
                    padding: 8rem 0 100px 0;
                }
                @media (max-width: 768px) {
                    .breadcrumbs-nav {
                        padding: 8rem 0 50px 0;
                    }
                }
            `}</style>
            <nav aria-label="Breadcrumb" className="breadcrumbs-nav" style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center', // Center align breadcrumbs
                fontSize: '0.7rem',
                fontFamily: 'Inter, sans-serif',
                color: 'var(--color-brand-slate)',
                opacity: 0.8,
                position: 'relative', // Ensure z-index works
                zIndex: 100, // Ensure it sits above anything else (Header is usually 50)
                pointerEvents: 'none' // Don't block header clicks if overlapping
            }}>
                {items.map((item, index) => {


                    return (
                        <React.Fragment key={item.label}>
                            {index > 0 && (
                                <span style={{
                                    margin: '0 0.75rem',
                                    color: 'var(--color-brand-coral)',
                                    fontWeight: 400
                                }}>/</span>
                            )}

                            {item.path ? (
                                <Link
                                    to={item.path}
                                    style={{
                                        textDecoration: 'none',
                                        color: 'var(--color-brand-slate)',
                                        transition: 'color 0.2s',
                                        fontWeight: 500,
                                        pointerEvents: 'auto' // Re-enable clicks for links
                                    }}
                                    onMouseEnter={e => e.currentTarget.style.color = 'var(--color-brand-coral)'}
                                    onMouseLeave={e => e.currentTarget.style.color = 'var(--color-brand-slate)'}
                                >
                                    {item.label}
                                </Link>
                            ) : (
                                <span style={{
                                    fontWeight: 400,
                                    color: 'var(--color-brand-forrest)', // Active item slightly darker/branded
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                    maxWidth: '300px' // Truncate very long titles
                                }}>
                                    {item.label}
                                </span>
                            )}
                        </React.Fragment>
                    );
                })}
            </nav>
        </>
    );
};

export default Breadcrumbs;
