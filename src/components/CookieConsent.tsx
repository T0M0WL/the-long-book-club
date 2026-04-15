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
                    bottom: 0px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: fit-content; /* Snug fit */
                    max-width: 90vw;
                    background-color: var(--color-brand-cloud);
                    border-top-left-radius: 1.5rem;
                    border-top-right-radius: 1.5rem;
                    z-index: 10001;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: center;
                    gap: 1.5rem;
                    padding: 1rem 2rem 1rem 3.65rem; /* Increased left padding for close button spacing */
                    box-shadow: 0 -4px 20px rgba(0,0,0,0.1);
                    animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1);
                }

                .cookie-text {
                    font-family: 'Inter', sans-serif;
                    font-size: 1rem;
                    color: var(--color-brand-forrest);
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 0; /* Removed gap */
                    line-height: 1.1; /* Tighter line height */
                    white-space: nowrap;
                    text-align: left;
                }

                .cookie-policy-link {
                    font-size: 0.8rem;
                    text-decoration: underline;
                    color: var(--color-brand-forrest);
                    cursor: pointer;
                    opacity: 0.8;
                }

                .cookie-buttons {
                    display: flex;
                    gap: 0.75rem;
                    align-items: center;
                }

                .cookie-btn {
                    font-family: var(--font-serif-accent);
                    font-size: 1rem;
                    padding: 0.5rem 1.25rem;
                    border-radius: 2rem;
                    border: none;
                    cursor: pointer;
                    transition: transform 0.1s;
                    white-space: nowrap;
                }

                .cookie-btn-accept {
                    background-color: var(--color-brand-forrest);
                    color: var(--color-brand-cloud);
                }

                .cookie-btn-decline {
                    background-color: var(--color-brand-coral);
                    color: white;
                }
                
                /* Mobile tweaks */
                @media (max-width: 600px) {
                    .cookie-consent-overlay {
                        /* Reduce padding slightly but keep enough for the close button */
                        padding: 1rem 1rem 1rem 3.15rem;  /* Increased left padding */
                        gap: 1rem;
                        width: auto; /* Let it grow if needed, or fit-content */
                        max-width: 95vw; /* Ensure it doesn't overflow screen */
                    }

                    /* Force horizontal layout (no wrap) */
                    .cookie-content-wrapper {
                        flex-wrap: nowrap !important;
                        justify-content: space-between !important;
                        width: auto !important; /* Allow it to fit content */
                    }
                    
                    /* Maybe reduce text size slightly if it gets too tight? */
                    .cookie-text {
                         /* Keep as is for now */
                    }
                    
                    /* Buttons might need to shrink or wrap if VERY narrow, but user claims space */
                     .cookie-buttons {
                        flex-shrink: 0; 
                     }
                }

                @keyframes slideUp {
                    from { transform: translate(-50%, 100%); }
                    to { transform: translate(-50%, 0); }
                }

                /* Mobile slide up (since we removed translate X in previous iterations? No, strictly kept it) */
                /* Wait, in 391 we kept translateX(-50%) on base class. */
            `}</style>

            {/* Close Button - Absolute Top Left */}
            <button
                onClick={() => setIsVisible(false)}
                style={{
                    position: 'absolute',
                    top: '1rem',
                    left: '0.75rem',
                    background: 'var(--color-brand-coral)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '24px',
                    height: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    padding: 0,
                    zIndex: 2,
                }}
                aria-label="Close cookie banner"
            >
                <svg width="10" height="10" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L13 13M1 13L13 1" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
            </button>

            <div className="cookie-content-wrapper" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>

                {/* Text */}
                <div className="cookie-text">
                    <span style={{ fontWeight: 600 }}>Accept Cookies?</span>
                    <a href="/privacy" className="cookie-policy-link">(cookie policy)</a>
                </div>

                {/* Actions */}
                <div className="cookie-buttons">
                    <button
                        className="cookie-btn cookie-btn-accept"
                        onClick={handleAccept}
                    >
                        Accept
                    </button>
                    <button
                        className="cookie-btn cookie-btn-decline"
                        onClick={handleDecline}
                    >
                        Decline
                    </button>
                </div>
            </div>
        </div>
    );
};
