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
                    src="/assets/newsletter-backgrounds/LongBookClub-Forrest-Newsletter-Image-01.webp"
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

            {/* TOP MASK (Rotated 180deg to curve into the content) */}
            <div style={{
                position: 'absolute',
                top: -1,
                left: 0,
                width: '100%',
                height: 'clamp(20px, 5vw, 60px)',
                zIndex: 15,
                pointerEvents: 'none',
                backgroundColor: 'var(--color-bg)',
                backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.4)), url('/paper-texture.png')`,
                backgroundRepeat: 'repeat',
                maskImage: `url("data:image/svg+xml,%3Csvg id='Layer_1' xmlns='http://www.w3.org/2000/svg' version='1.1' viewBox='0 0 595.3 30.4' preserveAspectRatio='none'%3E%3Cpath d='M392.5,0h0c-22.9,0-46.2,3.1-63.9,8.5-9.1,2.7-16.2,5.9-21.2,9.5-5.1,3.6-7.7,7.3-7.8,11.1h-2c0,0-2,0-2,0-.1-3.8-2.7-7.5-7.8-11.1-5-3.5-12.2-6.7-21.2-9.5C248.9,3.1,225.7,0,202.9,0H0v30.4h595.1V0h-202.7'/%3E%3C/svg%3E")`,
                WebkitMaskImage: `url("data:image/svg+xml,%3Csvg id='Layer_1' xmlns='http://www.w3.org/2000/svg' version='1.1' viewBox='0 0 595.3 30.4' preserveAspectRatio='none'%3E%3Cpath d='M392.5,0h0c-22.9,0-46.2,3.1-63.9,8.5-9.1,2.7-16.2,5.9-21.2,9.5-5.1,3.6-7.7,7.3-7.8,11.1h-2c0,0-2,0-2,0-.1-3.8-2.7-7.5-7.8-11.1-5-3.5-12.2-6.7-21.2-9.5C248.9,3.1,225.7,0,202.9,0H0v30.4h595.1V0h-202.7'/%3E%3C/svg%3E")`,
                maskSize: '100% 100%',
                WebkitMaskSize: '100% 100%',
                transform: 'rotate(180deg)' // Inverts the curve
            }} />

            {/* BOTTOM MASK (Standard) - Blends into Footer */}
            <div style={{
                position: 'absolute',
                bottom: -1,
                left: 0,
                width: '100%',
                height: 'clamp(20px, 5vw, 60px)',
                zIndex: 10000, // Sit above global noise to match footer
                pointerEvents: 'none',
                backgroundColor: 'var(--color-brand-coral)', // Matches Footer (Coral)
                // No texture here, just solid coral to merge with footer
                maskImage: `url("data:image/svg+xml,%3Csvg id='Layer_1' xmlns='http://www.w3.org/2000/svg' version='1.1' viewBox='0 0 595.3 30.4' preserveAspectRatio='none'%3E%3Cpath d='M392.5,0h0c-22.9,0-46.2,3.1-63.9,8.5-9.1,2.7-16.2,5.9-21.2,9.5-5.1,3.6-7.7,7.3-7.8,11.1h-2c0,0-2,0-2,0-.1-3.8-2.7-7.5-7.8-11.1-5-3.5-12.2-6.7-21.2-9.5C248.9,3.1,225.7,0,202.9,0H0v30.4h595.1V0h-202.7'/%3E%3C/svg%3E")`,
                WebkitMaskImage: `url("data:image/svg+xml,%3Csvg id='Layer_1' xmlns='http://www.w3.org/2000/svg' version='1.1' viewBox='0 0 595.3 30.4' preserveAspectRatio='none'%3E%3Cpath d='M392.5,0h0c-22.9,0-46.2,3.1-63.9,8.5-9.1,2.7-16.2,5.9-21.2,9.5-5.1,3.6-7.7,7.3-7.8,11.1h-2c0,0-2,0-2,0-.1-3.8-2.7-7.5-7.8-11.1-5-3.5-12.2-6.7-21.2-9.5C248.9,3.1,225.7,0,202.9,0H0v30.4h595.1V0h-202.7'/%3E%3C/svg%3E")`,
                maskSize: '100% 100%',
                WebkitMaskSize: '100% 100%'
            }} />

            {/* Top Left: Mail Icon */}
            <img
                src="/assets/mail-icon.svg"
                alt=""
                style={{
                    position: 'absolute',
                    top: '8rem', // Pushed down to clear the top mask
                    left: '3rem',
                    height: '40px', // Standard icon size
                    width: 'auto',
                    zIndex: 1,
                    opacity: 0.9
                }}
            />

            <div style={{ position: 'relative', zIndex: 10, maxWidth: '900px', margin: '0 auto' }}>

                <h2 style={{
                    fontSize: 'clamp(5rem, 10vw, 8rem)', // Doubled size
                    marginBottom: '1.5rem',
                    fontFamily: 'var(--font-heading)',
                    color: 'var(--color-brand-coral)',
                    lineHeight: 0.9,
                    fontWeight: 400,
                    letterSpacing: '-0.02em' // Tightened kerning match Hero
                }}>
                    Join the <br />
                    <span style={{ fontStyle: 'italic' }}>Long Book Club</span>
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
