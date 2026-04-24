// import { FaPaperPlane } from 'react-icons/fa'; // Icon removed in redesign

export const Newsletter = () => {
    return (
        <section style={{
            position: 'relative',
            padding: '8rem 2rem',
            textAlign: 'center',
            overflow: 'hidden',
            backgroundColor: 'var(--color-brand-forrest)',
            marginTop: 'auto'
        }}>
            {/* Background Image with Overlay */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 0
            }}>
                <img
                    src="/assets/newsletter-backgrounds/LongBookClub-Newsletter-Image-01.jpg"
                    alt=""
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        opacity: 1 // Full opacity for the new specific image
                    }}
                />
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'rgba(44, 81, 67, 0.4)', // Lighter overlay
                }} />
            </div>

            {/* TOP MASK (Branded Book Spine Curve) */}
            <div style={{
                position: 'absolute',
                top: -1.5, // Sub-pixel nudge
                left: 0,
                width: '100%',
                height: '60px',
                zIndex: 15,
                pointerEvents: 'none',
                backgroundColor: 'var(--color-bg)',
                backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.4)), url('/paper-texture.png')`,
                backgroundRepeat: 'repeat',
                maskImage: `url("/assets/homepage-banner-components/feature-curve.svg")`,
                WebkitMaskImage: `url("/assets/homepage-banner-components/feature-curve.svg")`,
                maskSize: '356px auto',
                WebkitMaskSize: '356px auto',
                maskRepeat: 'no-repeat',
                maskPosition: 'center top',
                transform: 'scaleY(1.05)', // Fix for 1px gap line
                transformOrigin: 'top'
            }} />

            {/* BOTTOM MASK (Standard) - Blends into Footer */}
            <div style={{
                position: 'absolute',
                bottom: -1.5, // Sub-pixel nudge
                left: 0,
                width: '100%',
                height: '60px',
                zIndex: 10000,
                pointerEvents: 'none',
                backgroundColor: 'var(--color-brand-coral)',
                backgroundImage: "url('/assets/collections-hero-images/LongBookClub-Collections-background-01.gif')",
                backgroundSize: 'cover',
                backgroundPosition: 'bottom center',
                maskImage: `url("/assets/homepage-banner-components/feature-curve.svg")`,
                WebkitMaskImage: `url("/assets/homepage-banner-components/feature-curve.svg")`,
                maskSize: '356px auto',
                WebkitMaskSize: '356px auto',
                maskRepeat: 'no-repeat',
                maskPosition: 'center bottom',
                transform: 'rotate(180deg) scaleY(1.05)', // Fix for 1px gap line
                transformOrigin: 'center'
            }} />

            {/* Content Container */}
            <div style={{ position: 'relative', zIndex: 10, maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                {/* Mail Icon */}
                <img
                    src="/assets/mail-icon.svg"
                    alt=""
                    style={{
                        height: '40px', // Reduced by 20% (50 -> 40)
                        width: 'auto',
                        marginBottom: '25px', // Added 25px explicit spacing
                        marginTop: '2rem'
                    }}
                />

                <h2 style={{
                    fontSize: 'clamp(4.4rem, 9vw, 7.4rem)', // Reduced by ~10px
                    marginBottom: '1.5rem',
                    fontFamily: 'var(--font-heading)',
                    color: 'var(--color-brand-coral)',
                    lineHeight: 0.9,
                    fontWeight: 400,
                    letterSpacing: '-0.02em' // Tightened kerning match Hero
                }}>
                    Join the <br />
                    Long Book Club
                </h2>

                <p style={{
                    color: 'var(--color-brand-sage)', // User Update: Sage
                    marginBottom: '3rem',
                    fontSize: '1.25rem',
                    lineHeight: '1.6',
                    fontFamily: 'var(--font-serif-accent)', // Lora
                    maxWidth: '600px',
                    marginLeft: 'auto',
                    marginRight: 'auto'
                }}>
                    For our monthly newsletter with curated long listens, the latest discounts, news and more.
                </p>

                <form
                    action="https://6c93b727.sibforms.com/serve/MUIFAO-78q9q-DLN_qa92QHGmG8rEMjFR0_rlgtQ3pOjmeyCSv5mBUEWU3QTRHKS01EoRI17GtadW-2JYWGNKBCGm68sPXEUe5hx-dQG7vETSSWLDyB1lxhtupzKqtzHnyOEBHJXDlSs_xnxizFQQXh8Q6y2tfUwZP3zQtJf8xGxWLxfzCFFXWo0IFCMuCNEjEbDqXSV16m1LQ5Glw=="
                    method="POST"
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                        alignItems: 'center'
                    }}
                >
                    <div style={{
                        display: 'flex',
                        gap: '1rem',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        width: '100%',
                        maxWidth: '500px'
                    }}>
                        <input
                            type="email"
                            id="EMAIL"
                            name="EMAIL"
                            placeholder="email address"
                            required
                            autoComplete="email"
                            style={{
                                flex: 2,
                                padding: '1rem 2rem',
                                borderRadius: '3rem',
                                border: 'none',
                                backgroundColor: 'var(--color-brand-cloud)',
                                color: 'var(--color-brand-slate)',
                                fontSize: '1.1rem',
                                fontFamily: 'var(--font-body)',
                                outline: 'none',
                                minWidth: '250px',
                                textAlign: 'center'
                            }}
                        />

                        <button
                            type="submit"
                            style={{
                                backgroundColor: 'var(--color-brand-coral)',
                                color: '#fff',
                                padding: '1rem 3rem',
                                borderRadius: '3rem',
                                fontSize: '1.1rem',
                                fontWeight: 500,
                                border: 'none',
                                cursor: 'pointer',
                                fontFamily: 'var(--font-serif-accent)', // User Update: Lora
                                transition: 'transform 0.2s, background 0.2s',
                                boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.backgroundColor = '#e55a3b';
                                e.currentTarget.style.transform = 'scale(1.05)';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.backgroundColor = 'var(--color-brand-coral)';
                                e.currentTarget.style.transform = 'scale(1)';
                            }}
                        >
                            Join
                        </button>
                    </div>

                    {/* Hidden fields required by Brevo */}
                    <input type="text" name="email_address_check" value="" style={{ display: 'none' }} readOnly />
                    <input type="hidden" name="locale" value="en" />
                    <input type="hidden" name="html_type" value="simple" />

                    <p style={{
                        fontSize: '0.875rem',
                        color: 'var(--color-brand-cloud)',
                        marginTop: '2rem',
                        opacity: 0.6,
                        fontFamily: 'var(--font-body)'
                    }}>
                        Unsubscribe at any time
                    </p>
                </form>
            </div>
        </section>
    );
};
