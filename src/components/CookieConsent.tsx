import { useState, useEffect } from 'react';



export const CookieConsent = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if user has already made a choice
        const consent = localStorage.getItem('cookieCheck');
        if (!consent) {
            // Slight delay for entrance animation
            const timer = setTimeout(() => setIsVisible(true), 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        setIsVisible(false);
        localStorage.setItem('cookieCheck', 'true');
        // Initialize GA if not already done (though App.tsx might have done it, standard pattern is to only init if accepted)
        // For now, we just save the pref. Logic in App.tsx can be updated later to respect this.
    };

    const handleDecline = () => {
        setIsVisible(false);
        localStorage.setItem('cookieCheck', 'false');
    };

    if (!isVisible) return null;

    return (
        <div className="cookie-consent-overlay">
            <style>{`
                .cookie-consent-overlay {
                    position: fixed;
                    bottom: 2rem;
                    left: 2rem; /* Left align on desktop */
                    transform: translateY(0); /* Remove ease center transform */
                    width: auto;
                    min-width: 320px;
                    max-width: 90vw;
                    background-color: var(--color-brand-sage);
                    border: 4px solid var(--color-brand-forrest);
                    border-radius: 9999px; /* Pill shape */
                    z-index: 10001;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 2rem 3rem;
                    text-align: center;
                    filter: drop-shadow(0 4px 10px rgba(0,0,0,0.1));
                    animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1);
                    font-family: var(--font-heading);
                }

                @keyframes slideUp {
                    from { transform: translateY(100%); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }

                @media (max-width: 768px) {
                    .cookie-consent-overlay {
                        left: 50%;
                        transform: translateX(-50%); /* Re-center on mobile */
                        width: 90vw;
                        min-width: auto;
                        padding: 1.5rem;
                        bottom: 1rem;
                        animation-name: slideUpMobile;
                        /* border-radius inherited from desktop (9999px) */
                    }
                }

                @keyframes slideUpMobile {
                    from { transform: translate(-50%, 100%); opacity: 0; }
                    to { transform: translate(-50%, 0); opacity: 1; }
                }
            `}</style>


            {/* Content Container */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>

                {/* Header: Icon + Text */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    {/* Cookie Icon */}
                    <img
                        src="/assets/cookie.svg"
                        alt="Cookie"
                        style={{ width: '38px', height: '38px' }}
                    />

                    {/* Headline */}
                    <h3 style={{
                        fontSize: '1.8rem',
                        lineHeight: '1.1',
                        color: 'var(--color-brand-forrest)',
                        margin: 0,
                        fontWeight: 400
                    }}>
                        Allow cookies into the library?
                    </h3>
                </div>

                {/* Buttons Container */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '1rem',
                    width: '100%',
                    justifyContent: 'center',
                    marginTop: '0.2rem'
                }}>
                    {/* Accept Button */}
                    <button
                        onClick={handleAccept}
                        style={{
                            backgroundColor: 'var(--color-brand-forrest)',
                            color: 'var(--color-brand-coral)',
                            border: 'none',
                            padding: '0.6rem 2.5rem',
                            borderRadius: '3rem',
                            fontSize: '1.8rem',
                            fontFamily: 'var(--font-heading)',
                            cursor: 'pointer',
                            minWidth: '140px',
                            transition: 'transform 0.1s',
                        }}
                        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        Accept
                    </button>

                    {/* Decline Button */}
                    <button
                        onClick={handleDecline}
                        style={{
                            backgroundColor: 'var(--color-brand-coral)',
                            color: 'var(--color-brand-forrest)',
                            border: 'none',
                            padding: '0.6rem 2.5rem',
                            borderRadius: '3rem',
                            fontSize: '1.8rem',
                            fontFamily: 'var(--font-heading)',
                            cursor: 'pointer',
                            minWidth: '140px',
                            transition: 'transform 0.1s',
                        }}
                        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        Decline
                    </button>
                </div>
            </div>
        </div>
    );
};
