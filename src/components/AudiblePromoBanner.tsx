import React, { useState, useEffect } from 'react';
import { FaAudible } from 'react-icons/fa6';

interface AudiblePromoBannerProps {
    affiliateLink?: string;
    /** Optional ISO date string or Date object when this promotional offer expires.
     * When current time passes this date, the banner automatically disappears.
     */
    promoEndDate?: Date | string;
}

// Configurable expiry date for the Audible 3-month special offer.
// Offer ends 28th of December 2026 at 23:59:59 UTC.
const DEFAULT_AUDIBLE_PROMO_EXPIRY = '2026-12-28T23:59:59Z';

// Default Audible membership landing page with TLBC affiliate tag
const DEFAULT_AUDIBLE_AFFILIATE_LINK = 'https://www.amazon.co.uk/hz/audible/mlp/membership?tag=thelongbookclub-21';

export const AudiblePromoBanner: React.FC<AudiblePromoBannerProps> = ({
    affiliateLink = DEFAULT_AUDIBLE_AFFILIATE_LINK,
    promoEndDate = DEFAULT_AUDIBLE_PROMO_EXPIRY
}) => {
    const finalLink = affiliateLink || DEFAULT_AUDIBLE_AFFILIATE_LINK;
    const [isHovered, setIsHovered] = useState(false);
    const [currencyInfo, setCurrencyInfo] = useState<{ amount: string; unit: string; shortUnit: string }>({
        amount: '99p',
        unit: 'per month',
        shortUnit: '/mo'
    });

    // Detect user country/currency via timezone and locale
    useEffect(() => {
        try {
            const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
            const lang = navigator.language || '';

            if (
                tz === 'Europe/London' ||
                tz === 'Europe/Belfast' ||
                tz === 'Europe/Jersey' ||
                tz === 'Europe/Guernsey' ||
                tz === 'Europe/Isle_of_Man' ||
                lang.startsWith('en-GB')
            ) {
                // UK
                setCurrencyInfo({ amount: '99p', unit: 'per month', shortUnit: '/mo' });
            } else if (
                tz.startsWith('America/') ||
                tz.startsWith('US/') ||
                lang === 'en-US'
            ) {
                // US / Americas
                setCurrencyInfo({ amount: '$0.99', unit: 'per month', shortUnit: '/mo' });
            } else if (tz.startsWith('Europe/')) {
                // Eurozone (Europe excluding UK)
                setCurrencyInfo({ amount: '€0.99', unit: 'per month', shortUnit: '/mo' });
            } else if (tz.startsWith('Canada/') || tz.startsWith('Australia/')) {
                setCurrencyInfo({ amount: '$0.99', unit: 'per month', shortUnit: '/mo' });
            } else {
                setCurrencyInfo({ amount: '99p / $0.99', unit: 'per month', shortUnit: '/mo' });
            }
        } catch {
            // Default fallback
            setCurrencyInfo({ amount: '99p', unit: 'per month', shortUnit: '/mo' });
        }
    }, []);

    // Check if promotional period has expired
    if (promoEndDate) {
        const expiry = typeof promoEndDate === 'string' ? new Date(promoEndDate) : promoEndDate;
        if (!isNaN(expiry.getTime()) && new Date() > expiry) {
            return null; // Automatically removed after promotion ends
        }
    }

    if (!finalLink) return null;

    return (
        <>
            <style>{`
                .audible-promo-banner-mobile {
                    display: none;
                }
                @media (max-width: 850px) {
                    .audible-promo-banner-desktop {
                        display: none !important;
                    }
                    .audible-promo-banner-mobile {
                        display: flex !important;
                    }
                }
            `}</style>

            {/* Desktop Version: Original Editorial Card */}
            <a
                href={finalLink}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="audible-promo-banner-desktop"
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    backgroundColor: isHovered ? '#244438' : '#2c5143',
                    borderRadius: '1.25rem',
                    padding: '1.25rem 1.15rem 1.15rem 1.15rem',
                    textDecoration: 'none',
                    marginTop: 0,
                    width: '100%',
                    boxSizing: 'border-box',
                    transition: 'background-color 0.2s ease',
                    cursor: 'pointer'
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <FaAudible
                    size={35}
                    color="#ffffff"
                    style={{
                        display: 'block',
                        marginBottom: '0.55rem'
                    }}
                />

                <span
                    style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '1.06rem',
                        fontWeight: 700,
                        color: isHovered ? '#ffffff' : 'var(--color-brand-coral)',
                        lineHeight: 1.2,
                        marginBottom: '0.15rem',
                        transition: 'color 0.2s ease'
                    }}
                >
                    Audible Special offer
                </span>

                <span
                    style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '1.06rem',
                        fontWeight: 700,
                        color: isHovered ? '#ffffff' : 'var(--color-brand-coral)',
                        lineHeight: 1.2,
                        marginBottom: '0.45rem',
                        transition: 'color 0.2s ease'
                    }}
                >
                    3 Months for {currencyInfo.amount} {currencyInfo.unit}
                </span>

                <span
                    style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.72rem',
                        color: 'rgba(255, 255, 255, 0.75)',
                        lineHeight: 1.35
                    }}
                >
                    Limited-time subscription deal. Free trial also available
                </span>
            </a>

            {/* Mobile Version: Sleek 1-Line Micro-Ribbon in Cloud on Forrest Green */}
            <a
                href={finalLink}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="audible-promo-banner-mobile"
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.45rem',
                    backgroundColor: 'var(--color-brand-forrest)',
                    color: 'var(--color-brand-cloud)',
                    borderRadius: '2rem',
                    padding: '0.45rem 0.85rem',
                    textDecoration: 'none',
                    width: '100%',
                    boxSizing: 'border-box',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden'
                }}
            >
                <FaAudible
                    size={15}
                    color="var(--color-brand-cloud)"
                    style={{ flexShrink: 0 }}
                />
                <span
                    style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        color: 'var(--color-brand-cloud)',
                        lineHeight: 1
                    }}
                >
                    Special Offer: 3 Months for {currencyInfo.amount}{currencyInfo.shortUnit}
                </span>
                <span
                    style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.7rem',
                        fontWeight: 500,
                        color: 'var(--color-brand-cloud)',
                        opacity: 0.9,
                        lineHeight: 1
                    }}
                >
                    • Free Trial →
                </span>
            </a>
        </>
    );
};
