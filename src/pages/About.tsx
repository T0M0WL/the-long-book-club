
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ContactForm } from '../components/ContactForm';
import { useSetHeaderTheme } from '../context/HeaderContext';

export const About = () => {
    useSetHeaderTheme({
        logoColor: 'var(--color-brand-forrest)',
        textColor: 'var(--color-brand-forrest)',
        hamburgerColor: 'var(--color-brand-forrest)',
        activeLink: 'about',
        activeLinkBg: 'var(--color-brand-forrest)',
        activeLinkText: 'var(--color-brand-cloud)'
    });

    return (
        <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            color: 'var(--color-brand-slate)'
        }} className="about-page-container">
            <Helmet>
                <title>About | The Long Book Club</title>
                <meta name="description" content="The Long Book Club is a curated collection of the best long-format audiobooks for immersive listening." />
            </Helmet>

            <div className="about-header-section">
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginBottom: '3rem',
                    marginTop: '0'
                }}>
                    <svg
                        version="1.1"
                        viewBox="0 0 704.9 703.9"
                        style={{
                            width: '160px',
                            height: 'auto',
                            fill: 'var(--color-brand-forrest)'
                        }}
                    >
                        <path d="M665.2,495.2l37-.3c-.3-40.2-17.2-80.9-46.4-111.7-13.4-14.1-28.7-25.5-45.4-34,16.6-8.7,31.7-20.4,44.8-34.7,28.7-31.2,45-72.2,44.6-112.4l-37,.3s0,0,0,.1l-127.9,1s0,0,0-.1l-37,.3c.5,61.1-50.4,127.3-127,128.6,0-76.6,65.5-128.5,126.6-128.9l-.3-37c-.1,0-.3,0-.4,0l-1-127.9c.1,0,.2,0,.4,0l-.3-37c-40.2.3-80.9,17.2-111.7,46.4-14.1,13.4-25.5,28.7-34,45.4-8.7-16.6-20.4-31.7-34.7-44.8C284.6,19.8,243.6,3.5,203.4,3.8l.3,37s0,0,.1,0l1,127.9s0,0-.1,0l.3,37c61.1-.5,127.3,50.4,128.6,127-76.6,0-128.5-65.5-128.9-126.6l-37,.3c0,.1,0,.3,0,.4l-127.9,1c0-.1,0-.2,0-.4l-37,.3c.3,40.2,17.2,80.9,46.4,111.7,13.4,14.1,28.7,25.5,45.4,34-16.6,8.7-31.7,20.4-44.8,34.7-28.7,31.2-45,72.2-44.6,112.4l37-.3s0,0,0-.1l127.9-1s0,0,0,.1l37-.3c-.5-61.1,50.4-127.3,127-128.6,0,76.6-65.5,128.5-126.6,128.9l.3,37c.1,0,.3,0,.4,0l1,127.9c-.1,0-.2,0-.4,0l.3,37c40.2-.3,80.9-17.2,111.7-46.4,14.1-13.4,25.5-28.7,34-45.4,8.7,16.6,20.4,31.7,34.7,44.8,30.9,28.4,71.4,44.7,111.2,44.7s.8,0,1.2,0l-.3-37s0,0-.1,0l-1-127.9s0,0,.1,0l-.3-37c-61.1.5-127.3-50.4-128.6-127,76.6,0,128.5,65.5,128.9,126.6l37-.3c0-.1,0-.3,0-.4l127.9-1c0,.1,0,.2,0,.4ZM490.4,315.8c19.8-21.6,33.7-47.8,40.3-75.2l126.4-1c-15.4,48.1-60.1,90.4-121.2,91.4h0c0,.1-62.2.6-62.2.6,5.8-4.9,11.4-10.1,16.7-15.8ZM352.6,370.1h-18.7s-.3-18.7-.3-18.7v-18.7s18.7-.3,18.7-.3h18.7s.3,18.7.3,18.7v18.7s-18.7.3-18.7.3ZM459.1,45l1,126.4c-27.2,7-53.1,21.3-74.3,41.4-5.7,5.4-11,11.2-15.8,17.2l-.5-62.5h.4c0-61,41.5-106.3,89.3-122.5ZM317.1,213.3c-21.6-19.8-47.8-33.7-75.2-40.3l-1-126.4c48.1,15.4,90.4,60.1,91.4,121.2h.1s.5,62.2.5,62.2c-4.9-5.8-10.1-11.4-15.8-16.7ZM46.3,244.7l126.4-1c7,27.2,21.3,53.1,41.4,74.3,5.4,5.7,11.2,11,17.2,15.8l-62.5.5v-.4c-61,0-106.3-41.5-122.5-89.3ZM214.6,386.7c-19.8,21.6-33.7,47.8-40.3,75.2l-126.4,1c15.4-48.1,60.1-90.4,121.2-91.4h0c0-.1,62.2-.6,62.2-.6-5.8,4.9-11.4,10.1-16.7,15.8ZM245.9,657.5l-1-126.4c27.2-7,53.1-21.3,74.3-41.4,5.7-5.4,11-11.2,15.8-17.2l.5,62.5h-.4c0,61-41.5,106.3-89.3,122.5ZM387.9,489.2c21.6,19.8,47.8,33.7,75.2,40.3l1,126.4c-48.1-15.4-90.4-60.1-91.4-121.2h-.1s-.5-62.2-.5-62.2c4.9,5.8,10.1,11.4,15.8,16.7ZM532.4,458.8c-7-27.2-21.3-53.1-41.4-74.3-5.4-5.7-11.2-11-17.2-15.8l62.5-.5v.4c61,0,106.3,41.5,122.5,89.3l-126.4,1Z" />
                    </svg>
                </div>

                <h1 style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                    color: 'var(--color-brand-forrest)',
                    textAlign: 'center',
                    marginBottom: '2.75rem',
                    lineHeight: 1
                }}>
                    About The Long Book Club
                </h1>

                <div style={{
                    width: '60px',
                    height: '1px',
                    backgroundColor: 'var(--color-brand-forrest)',
                    margin: '0 auto 3rem auto'
                }} />
            </div>

            <div className="about-text-section" style={{
                fontFamily: 'var(--font-serif-accent)',
                fontSize: '1.2rem',
                lineHeight: 1.8,
                display: 'flex',
                flexDirection: 'column',
                gap: '2rem'
            }}>
                <p>
                    Thank you for visiting The Long Book Club and I hope you find it useful. I created this website out of my own frustration, tired of wading through endless unorganised blogs and forums, just to find the best long-listens that truly deserved my monthly audiobook credit. Surely I wasn’t alone?
                </p>

                <p>
                    It’s not only about getting the best value, there is a unique magic in a 20+ hour story. It becomes a companion, a world you live in for weeks (sometimes months) at a time. A dedicated hub for these unique books felt like a necessity.
                </p>

                <p>
                    I realised that if I wanted the best books with real value, I needed to make something that helped me find them easily. That is precisely what the <Link to="/long-book-finder" style={{ textDecoration: 'underline' }}>Long Book Finder Tool</Link> does, as well as the <Link to="/collections" style={{ textDecoration: 'underline' }}>Curated Collections</Link> and <Link to="/journal" style={{ textDecoration: 'underline' }}>Book Journal</Link> pages.
                </p>

                <p>
                    I sincerely hope this website helps you find your next memorable audiobook and I wish you many hours of deep, immersive listening.
                </p>

                <p style={{
                    marginTop: '1rem',
                    fontWeight: 600
                }}>
                    The Editor (@TLBC)
                </p>
            </div>

            <ContactForm />

        </div>
    );
};
