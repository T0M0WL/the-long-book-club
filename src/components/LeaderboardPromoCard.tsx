import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const LeaderboardPromoCard: React.FC = () => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Link
            to="/narrators/leaderboard/"
            style={{
                textDecoration: 'none',
                color: 'inherit',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                marginBottom: '2rem',
                boxSizing: 'border-box'
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
                    transition: 'transform 0.3s ease'
                }}
            >
                {/* Forest Green Curved Shape Header */}
                <div style={{ position: 'relative', width: '100%', lineHeight: 0 }}>
                    <svg
                        viewBox="0 0 427.65 266.65"
                        style={{ width: '100%', height: 'auto', display: 'block' }}
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fill="#2c5143"
                            d="M408.56,64.79c-45.28-1.36-90.1-8.01-125.22-18.73-20.12-6.26-36.22-13.42-47.4-21.24-11.4-8.05-17.22-16.32-17.44-24.82h-8.94c-.22,8.5-6.04,16.77-17.44,24.82-11.18,8.05-27.06,15.2-47.4,21.24-35.13,10.72-80.12,17.37-125.6,18.73H0v201.86h427.65V64.79h-19.09Z"
                        />
                    </svg>

                    {/* Centered Icon (33% Bigger) and Title Overlay */}
                    <div
                        style={{
                            position: 'absolute',
                            inset: 0,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingTop: '2.4rem',
                            paddingBottom: '0.4rem',
                            paddingLeft: '1.5rem',
                            paddingRight: '1.5rem',
                            textAlign: 'center'
                        }}
                    >
                        <img
                            src="/assets/Narrator-hub-Graphics/mic-badge.svg"
                            alt="Leaderboard Shield"
                            style={{
                                width: '43px',
                                height: 'auto',
                                marginBottom: '0.75rem',
                                filter: 'drop-shadow(0 2px 5px rgba(0,0,0,0.22))'
                            }}
                        />
                        <h3
                            style={{
                                fontFamily: 'var(--font-serif-accent)',
                                color: '#f7f2e4',
                                fontSize: '1.35rem',
                                fontWeight: 400,
                                lineHeight: 1.25,
                                margin: 0,
                                letterSpacing: '0.01em'
                            }}
                        >
                            The Long Book Club<br />Narrators Leaderboard
                        </h3>
                    </div>
                </div>

                {/* Warm Cream Card Body with Vertically Centered Copy */}
                <div
                    style={{
                        backgroundColor: '#f7f2e4',
                        borderBottomLeftRadius: '1.25rem',
                        borderBottomRightRadius: '1.25rem',
                        padding: '2rem 2rem 2.25rem 2rem',
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        textAlign: 'center',
                        border: '1px solid rgba(44, 81, 67, 0.08)',
                        borderTop: 'none'
                    }}
                >
                    {/* Vertically centered copy with equal padding above & below */}
                    <div
                        style={{
                            flex: 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '100%',
                            padding: '1.5rem 0.5rem'
                        }}
                    >
                        <p
                            style={{
                                fontFamily: 'Lora, Georgia, serif',
                                fontSize: '1.18rem',
                                lineHeight: 1.6,
                                color: '#2c5143',
                                margin: 0
                            }}
                        >
                            Explore <strong style={{ color: '#fa7052', fontWeight: 700 }}>66</strong> qualifying voice artists ranked by continuous runtime.{' '}
                            <strong style={{ color: '#fa7052', fontWeight: 700 }}>9,700 hours</strong> of endurance narration
                        </p>
                    </div>

                    <div
                        style={{
                            backgroundColor: isHovered ? '#e65e40' : '#fa7052',
                            color: '#ffffff',
                            padding: '0.65rem 1.85rem',
                            borderRadius: '9999px',
                            fontSize: '1.05rem',
                            fontFamily: 'Lora, Georgia, serif',
                            fontStyle: 'italic',
                            fontWeight: 500,
                            boxShadow: '0 2px 8px rgba(250, 112, 82, 0.25)',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.45rem',
                            transition: 'background-color 0.2s ease, transform 0.2s ease'
                        }}
                    >
                        View Full Leaderboard <span style={{ fontStyle: 'normal' }}>→</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};
