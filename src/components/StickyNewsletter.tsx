import { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';

export const StickyNewsletter = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isDismissed, setIsDismissed] = useState(() => {
        // Check localStorage for dismissal or signup on mount
        const status = localStorage.getItem('newsletter_status');
        if (status === 'signed_up') return true;
        if (status) {
            const timestamp = parseInt(status, 10);
            const now = Date.now();
            const oneDay = 24 * 60 * 60 * 1000;
            if (now - timestamp < oneDay) return true;
        }
        return false;
    });

    useEffect(() => {
        // Only handle scroll visibility in effect now, since dismissal is handled in initial state
        if (isDismissed) return;

        const handleScroll = () => {
            // Show after scrolling down 300px
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isDismissed]);

    const handleClose = () => {
        localStorage.setItem('newsletter_status', Date.now().toString());
        setIsDismissed(true);
    };

    const handleSignup = () => {
        localStorage.setItem('newsletter_status', 'signed_up');
        // Form will submit naturally after this
    };

    if (isDismissed || !isVisible) return null;

    return (
        <div className="newsletter-overlay">
            <style>{`
                .newsletter-overlay {
                    position: fixed;
                    bottom: 2rem;
                    right: 2rem;
                    width: 400px;
                    height: 400px;
                    background-image: url('/assets/newsletter-shape.svg');
                    background-size: 100% 100%;
                    background-position: center;
                    background-repeat: no-repeat;
                    z-index: 1000;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding: 2rem 1rem;
                    text-align: center;
                    animation: slideUp 0.3s ease-out;
                    filter: drop-shadow(0 10px 25px rgba(0,0,0,0.25));
                    color: var(--color-brand-forrest);
                }

                @keyframes slideUp {
                    from { transform: translateY(100%); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }

                @media (max-width: 768px) {
                    .newsletter-overlay {
                        right: auto;
                        left: 50%;
                        bottom: 1rem;
                        width: 90vw;
                        max-width: 380px;
                        height: auto;
                        aspect-ratio: 1/1;
                        /* Use translate explicitly to center, overriding animation if needed, 
                           but since animation uses translateY, we need to combine them carefully.
                           Actually, if animation runs once on mount, we can just use !important or set transform. 
                           However, standard transform:translate(-50%, 0) renders AFTER animation completes. */
                        transform: translate(-50%, 0);
                    }
                    
                    /* Mobile Animation to include X centering */
                    @keyframes slideUpMobile {
                        from { transform: translate(-50%, 100%); opacity: 0; }
                        to { transform: translate(-50%, 0); opacity: 1; }
                    }
                    
                    .newsletter-overlay {
                        animation-name: slideUpMobile;
                    }
                }
            `}</style>

            {/* 1. CLOSE BUTTON (Top spaced) */}
            <div
                onClick={handleClose}
                style={{
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '12px',
                    marginTop: '-5px', // Moved up ~10px
                    marginBottom: '22px' // Reduced by 10px from 2rem
                }}
            >
                <div style={{
                    backgroundColor: 'var(--color-brand-coral)', // Coral Circle
                    borderRadius: '50%',
                    width: '28px',
                    height: '28px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.2)' // Matched shadow
                }}>
                    <FaTimes size={14} color="#fff" />
                </div>
                <span style={{
                    fontSize: '0.65rem',
                    fontWeight: 800,
                    color: 'var(--color-brand-coral)',
                    letterSpacing: '0.05em',
                    lineHeight: 1,
                    textShadow: '0 4px 10px rgba(0,0,0,0.2)' // Matched shadow
                }}>
                    CLOSE
                </span>
            </div>

            {/* 2. HEADLINE */}
            <h3 style={{
                fontSize: '3rem',
                fontWeight: 400,
                margin: '0',
                fontFamily: 'var(--font-heading)',
                color: 'var(--color-brand-forrest)',
                lineHeight: 0.95,
                letterSpacing: '-0.02em'
            }}>
                Join the <br /> Long Book Club?
            </h3>

            {/* 3. SUBTITLE */}
            <p style={{
                fontSize: '0.9rem',
                marginTop: '0.75rem',
                marginBottom: '0.875rem', // Reduced from 1.5rem to lift form up ~10px
                color: 'var(--color-brand-coral)', // Coral
                fontFamily: 'var(--font-body)',
                fontWeight: 500
            }}>
                For curated long books, offers and news
            </p>

            {/* 4. FORM */}
            <form
                action="https://6c93b727.sibforms.com/serve/MUIFAO-78q9q-DLN_qa92QHGmG8rEMjFR0_rlgtQ3pOjmeyCSv5mBUEWU3QTRHKS01EoRI17GtadW-2JYWGNKBCGm68sPXEUe5hx-dQG7vETSSWLDyB1lxhtupzKqtzHnyOEBHJXDlSs_xnxizFQQXh8Q6y2tfUwZP3zQtJf8xGxWLxfzCFFXWo0IFCMuCNEjEbDqXSV16m1LQ5Glw=="
                method="POST"
                onSubmit={handleSignup}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    alignItems: 'center',
                    width: '100%'
                }}
            >
                {/* INPUT: Wide & Beige */}
                <input
                    type="email"
                    name="EMAIL"
                    placeholder="email address"
                    required
                    style={{
                        padding: '0.8rem 1.5rem',
                        borderRadius: '100px',
                        border: 'none',
                        backgroundColor: '#fff', // White
                        color: 'var(--color-brand-slate)',
                        fontSize: '1rem',
                        outline: 'none',
                        width: '75%', // Visual width match
                        textAlign: 'center',
                        fontFamily: 'var(--font-body)',
                        boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.05)'
                    }}
                />

                {/* BUTTON: Narrow & Green */}
                <button
                    type="submit"
                    style={{
                        backgroundColor: 'var(--color-brand-coral)', // Coral
                        color: '#fff', // White
                        padding: '0.6rem 2.5rem', // Wide padding, shorter height
                        borderRadius: '100px',
                        fontSize: '1.5rem',
                        fontFamily: 'var(--font-serif-accent)', // Lora
                        fontWeight: 400,
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'transform 0.2s',
                        boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
                    }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                >
                    Join
                </button>

                {/* Hidden fields */}
                <input type="text" name="email_address_check" value="" style={{ display: 'none' }} readOnly />
                <input type="hidden" name="locale" value="en" />
                <input type="hidden" name="html_type" value="simple" />
            </form>
        </div>
    );
};
