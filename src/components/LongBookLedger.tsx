import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ledgerNewsItems } from '../data/ledgerNews';

export const LongBookLedger: React.FC = () => {
    const [pageIndex, setPageIndex] = useState(0);
    const ITEMS_PER_PAGE = 3;
    const totalPages = Math.ceil(ledgerNewsItems.length / ITEMS_PER_PAGE) || 1;

    const visibleItems = ledgerNewsItems.slice(
        pageIndex * ITEMS_PER_PAGE,
        (pageIndex + 1) * ITEMS_PER_PAGE
    );

    const isFirstPage = pageIndex === 0;
    const isLastPage = pageIndex >= totalPages - 1;

    return (
        <section
            aria-label="The Long Book Ledger"
            style={{
                width: '100%',
                maxWidth: '1120px',
                margin: '5rem auto 6rem auto',
                padding: '0 clamp(2.5rem, 6vw, 4.5rem)',
                boxSizing: 'border-box'
            }}
        >
            {/* Section Header */}
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                {/* LBC Ledger Icon in Forrest Green */}
                <div
                    style={{
                        width: '44px',
                        height: '42px',
                        backgroundColor: 'var(--color-brand-forrest)',
                        maskImage: 'url("/assets/LBC_LEDGER-ICON.svg")',
                        WebkitMaskImage: 'url("/assets/LBC_LEDGER-ICON.svg")',
                        maskRepeat: 'no-repeat',
                        WebkitMaskRepeat: 'no-repeat',
                        maskSize: 'contain',
                        WebkitMaskSize: 'contain',
                        maskPosition: 'center',
                        WebkitMaskPosition: 'center',
                        margin: '0 auto 1.15rem auto'
                    }}
                />

                <h2
                    style={{
                        fontFamily: 'Lora, Georgia, serif',
                        fontWeight: 400,
                        fontSize: 'clamp(2.1rem, 3.8vw, 2.75rem)',
                        color: 'var(--color-brand-forrest)',
                        margin: '0 0 0.5rem 0',
                        lineHeight: 1.15,
                        letterSpacing: '-0.02em'
                    }}
                >
                    The Long Book Ledger
                </h2>

                <p
                    style={{
                        fontFamily: 'Lora, Georgia, serif',
                        fontStyle: 'italic',
                        fontSize: 'clamp(1.1rem, 2vw, 1.3rem)',
                        fontWeight: 400,
                        color: 'var(--color-brand-forrest)',
                        margin: '0 0 1.5rem 0',
                        opacity: 0.95
                    }}
                >
                    (Audiobook News &amp; Offers)
                </p>

                <div
                    style={{
                        width: '50px',
                        height: '1px',
                        backgroundColor: 'var(--color-brand-forrest)',
                        opacity: 0.35,
                        margin: '0 auto'
                    }}
                />
            </div>

            {/* 3-Column News Grid */}
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                    gap: 'clamp(2.5rem, 5vw, 4.25rem)',
                    alignItems: 'start'
                }}
            >
                {visibleItems.map(item => (
                    <article
                        key={item.id}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            textAlign: 'left'
                        }}
                    >
                        {/* 1. Category Tag in Green Lozenge */}
                        <span
                            style={{
                                display: 'inline-block',
                                backgroundColor: 'var(--color-brand-forrest)',
                                color: '#ffffff',
                                fontFamily: 'Inter, sans-serif',
                                fontSize: '0.68rem',
                                fontWeight: 700,
                                letterSpacing: '0.06em',
                                textTransform: 'uppercase',
                                padding: '0.35rem 0.85rem',
                                borderRadius: '9999px',
                                marginBottom: '1.25rem'
                            }}
                        >
                            {item.categoryTag}
                        </span>

                        {/* 2. Headline in Lora Italic */}
                        <h3
                            style={{
                                fontFamily: 'Lora, Georgia, serif',
                                fontStyle: 'italic',
                                fontWeight: 400,
                                fontSize: 'clamp(1.65rem, 2.2vw, 1.95rem)',
                                lineHeight: 1.2,
                                letterSpacing: '-0.03em',
                                color: 'var(--color-brand-forrest)',
                                margin: '0 0 0.85rem 0'
                            }}
                        >
                            {item.headline}
                        </h3>

                        {/* 3. Date in Lozenge with Keyline */}
                        <div
                            style={{
                                display: 'inline-block',
                                border: '1px solid rgba(44, 81, 67, 0.45)',
                                color: 'var(--color-brand-forrest)',
                                fontFamily: 'Inter, sans-serif',
                                fontSize: '0.65rem',
                                fontWeight: 600,
                                letterSpacing: '0.04em',
                                textTransform: 'uppercase',
                                padding: '0.22rem 0.7rem',
                                borderRadius: '9999px',
                                marginBottom: '1.15rem'
                            }}
                        >
                            {item.dateString}
                        </div>

                        {/* 4. Sub Headline */}
                        <h4
                            style={{
                                fontFamily: 'Inter, sans-serif',
                                fontWeight: 700,
                                fontSize: '1rem',
                                lineHeight: 1.4,
                                color: 'var(--color-brand-forrest)',
                                margin: '0 0 0.85rem 0'
                            }}
                        >
                            {item.subHeadline}
                        </h4>

                        {/* 5. Paragraph of News */}
                        <p
                            style={{
                                fontFamily: 'Inter, sans-serif',
                                fontWeight: 400,
                                fontSize: '0.9rem',
                                lineHeight: 1.55,
                                color: '#44514b',
                                margin: '0 0 1.35rem 0'
                            }}
                        >
                            {item.paragraph}
                        </p>

                        {/* 6. Call to Action / Link */}
                        {item.isExternal ? (
                            <a
                                href={item.ctaLink}
                                target="_blank"
                                rel="noopener noreferrer nofollow"
                                style={{
                                    fontFamily: 'Inter, sans-serif',
                                    fontWeight: 700,
                                    fontSize: '0.92rem',
                                    color: 'var(--color-brand-forrest)',
                                    textDecoration: 'underline',
                                    textUnderlineOffset: '3px',
                                    textDecorationThickness: '1.5px',
                                    lineHeight: 1.4,
                                    transition: 'color 0.2s ease'
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-brand-coral)')}
                                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-brand-forrest)')}
                            >
                                {item.ctaText}
                            </a>
                        ) : (
                            <Link
                                to={item.ctaLink}
                                style={{
                                    fontFamily: 'Inter, sans-serif',
                                    fontWeight: 700,
                                    fontSize: '0.92rem',
                                    color: 'var(--color-brand-forrest)',
                                    textDecoration: 'underline',
                                    textUnderlineOffset: '3px',
                                    textDecorationThickness: '1.5px',
                                    lineHeight: 1.4,
                                    transition: 'color 0.2s ease'
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-brand-coral)')}
                                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-brand-forrest)')}
                            >
                                {item.ctaText}
                            </Link>
                        )}
                    </article>
                ))}
            </div>

            {/* Bottom Pagination Arrows */}
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '3.5rem',
                    marginTop: '3.75rem'
                }}
            >
                {/* Newer Button */}
                <button
                    type="button"
                    onClick={() => setPageIndex(p => Math.max(0, p - 1))}
                    disabled={isFirstPage}
                    style={{
                        background: 'none',
                        border: 'none',
                        padding: '0.4rem 0.6rem',
                        cursor: isFirstPage ? 'default' : 'pointer',
                        opacity: isFirstPage ? 0.35 : 1,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.65rem',
                        fontFamily: 'Lora, Georgia, serif',
                        fontSize: '1.15rem',
                        color: 'var(--color-brand-forrest)',
                        transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                        if (!isFirstPage) {
                            e.currentTarget.style.color = 'var(--color-brand-coral)';
                            e.currentTarget.style.transform = 'translateX(-2px)';
                        }
                    }}
                    onMouseLeave={(e) => {
                        if (!isFirstPage) {
                            e.currentTarget.style.color = 'var(--color-brand-forrest)';
                            e.currentTarget.style.transform = 'translateX(0)';
                        }
                    }}
                    aria-label="View newer news stories"
                >
                    <svg
                        width="12"
                        height="22"
                        viewBox="0 0 10 18"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ display: 'block' }}
                    >
                        <polyline points="9 1 1 9 9 17" />
                    </svg>
                    <span>Newer</span>
                </button>

                {/* Older Button */}
                <button
                    type="button"
                    onClick={() => setPageIndex(p => Math.min(totalPages - 1, p + 1))}
                    disabled={isLastPage}
                    style={{
                        background: 'none',
                        border: 'none',
                        padding: '0.4rem 0.6rem',
                        cursor: isLastPage ? 'default' : 'pointer',
                        opacity: isLastPage ? 0.35 : 1,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.65rem',
                        fontFamily: 'Lora, Georgia, serif',
                        fontSize: '1.15rem',
                        color: 'var(--color-brand-forrest)',
                        transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                        if (!isLastPage) {
                            e.currentTarget.style.color = 'var(--color-brand-coral)';
                            e.currentTarget.style.transform = 'translateX(2px)';
                        }
                    }}
                    onMouseLeave={(e) => {
                        if (!isLastPage) {
                            e.currentTarget.style.color = 'var(--color-brand-forrest)';
                            e.currentTarget.style.transform = 'translateX(0)';
                        }
                    }}
                    aria-label="View older news stories"
                >
                    <span>Older</span>
                    <svg
                        width="12"
                        height="22"
                        viewBox="0 0 10 18"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ display: 'block' }}
                    >
                        <polyline points="1 1 9 9 1 17" />
                    </svg>
                </button>
            </div>
        </section>
    );
};
