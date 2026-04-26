import React, { useState, useEffect } from 'react';

interface Props {
    initialBookLength?: string;
}

const AudiobookValueCalculator: React.FC<Props> = ({ initialBookLength }) => {
    // Math State
    const [hours, setHours] = useState<number>(0);
    const [minutes, setMinutes] = useState<number>(0);
    
    // Interaction State
    const [currency, setCurrency] = useState<'GBP' | 'USD'>('GBP');
    const [creditCost, setCreditCost] = useState<string>('7.99'); 

    useEffect(() => {
        if (initialBookLength) {
            const hMatch = initialBookLength.match(/(\d+)\s*(h|hr|hours|hour)/i);
            const mMatch = initialBookLength.match(/(\d+)\s*(m|min|mins|minutes|minute)/i);
            
            if (hMatch) setHours(parseInt(hMatch[1], 10));
            setMinutes(mMatch ? parseInt(mMatch[1], 10) : 0);
        }
    }, [initialBookLength]);

    // Math conversions
    const totalDecimalHours = hours + (minutes / 60);
    const costValue = parseFloat(creditCost) || 0; 
    const symbol = currency === 'GBP' ? '£' : '$';
    const cinemaPrice = currency === 'GBP' ? 5.00 : 6.00;

    let costPerHour = 0;
    let cinemaMultiplier = 0;

    if (totalDecimalHours > 0) {
        costPerHour = costValue / totalDecimalHours;
        if (costPerHour > 0) {
            cinemaMultiplier = cinemaPrice / costPerHour;
        }
    }

    return (
        <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            borderRadius: '1.5rem',
            padding: '2.5rem 2rem',
            width: '100%',
            marginBottom: '2rem',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            {/* Title */}
            <h3 style={{
                fontFamily: 'var(--font-serif-accent)',
                fontWeight: 400,
                color: 'var(--color-brand-coral)',
                fontSize: '28px',
                margin: '0 0 1.5rem 0',
                lineHeight: 1.1,
                textAlign: 'center'
            }}>
                Audiobook Value<br/>Calculator
            </h3>

            {/* Subtitle */}
            <p style={{
                fontFamily: 'var(--font-body)',
                color: 'var(--color-brand-forrest)',
                fontSize: '13px',
                margin: '0 0 2.5rem 0',
                textAlign: 'center'
            }}>
                Book length: <strong>{hours} hrs {minutes}mins</strong>
            </p>

            {/* Giant Coral Circle */}
            <div style={{ 
                width: '225px', 
                height: '225px', 
                flexShrink: 0,
                backgroundColor: 'var(--color-brand-coral)', 
                borderRadius: '50%', 
                margin: '0 auto 2.5rem auto', 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center',
                padding: '1.5rem',
                boxSizing: 'border-box',
                textAlign: 'center'
            }}>
                <div style={{ transform: 'translateY(15px)' }}>
                    <div style={{
                        fontFamily: 'var(--font-serif-accent)',
                        color: 'var(--color-brand-cloud)',
                        fontSize: '36px',
                        lineHeight: 1.1,
                        marginBottom: '0.2rem',
                        fontWeight: 700,
                        fontStyle: 'italic'
                    }}>
                        {symbol}{costPerHour > 0 ? costPerHour.toFixed(2) : '0.00'}
                    </div>
                    <div style={{
                        fontFamily: 'var(--font-serif-accent)',
                        color: 'var(--color-brand-cloud)',
                        fontSize: '1.5rem',
                        lineHeight: 1.1,
                        marginBottom: '0.8rem',
                        fontWeight: 400,
                        fontStyle: 'italic'
                    }}>
                        per hour
                    </div>
                    <div style={{
                        fontFamily: 'Inter, sans-serif',
                        color: 'var(--color-brand-cloud)',
                        fontSize: '11px',
                        fontWeight: 700,
                        textTransform: 'lowercase'
                    }}>
                        of listening
                    </div>
                </div>
            </div>

            {/* Cinema comparison */}
            <p style={{
                fontFamily: 'var(--font-serif-accent)',
                fontStyle: 'italic',
                color: 'var(--color-brand-forrest)',
                fontSize: '1.25rem',
                lineHeight: 1.4,
                margin: '0 0 2.5rem 0',
                textAlign: 'center',
                maxWidth: '320px'
            }}>
                A cinema ticket costs roughly {symbol}{cinemaPrice.toFixed(2)} per hour. This audiobook is <strong>{cinemaMultiplier > 0 ? cinemaMultiplier.toFixed(1) : '0.0'}x</strong> cheaper per hour.
            </p>

            {/* Controls Header */}
            <p style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 700,
                color: 'var(--color-brand-forrest)',
                fontSize: '13px',
                margin: '0 0 1rem 0',
                textAlign: 'center'
            }}>
                Adjust for your book credit cost
            </p>

            {/* Bottom Controls */}
            <div style={{ 
                display: 'flex', 
                gap: '1rem', 
                width: '100%', 
                maxWidth: '320px',
                justifyContent: 'center'
            }}>
                
                {/* Currency Toggle Pill */}
                <div style={{
                    display: 'flex',
                    backgroundColor: '#fff',
                    borderRadius: '2rem',
                    flex: 1,
                    overflow: 'hidden',
                    border: '1px solid rgba(0,0,0,0.05)',
                    padding: '0.25rem',
                    height: '42px',
                    boxSizing: 'border-box'
                }}>
                    <button
                        onClick={() => setCurrency('GBP')}
                        style={{
                            flex: 1,
                            padding: '0',
                            border: 'none',
                            borderRadius: '1.5rem',
                            backgroundColor: currency === 'GBP' ? 'var(--color-brand-coral)' : 'transparent',
                            color: currency === 'GBP' ? 'var(--color-brand-cloud)' : 'var(--color-brand-forrest)',
                            fontWeight: 700,
                            fontSize: '13px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.2s',
                            fontFamily: 'Inter, sans-serif'
                        }}
                    >
                        GBP(£)
                    </button>
                    <button
                        onClick={() => setCurrency('USD')}
                        style={{
                            flex: 1,
                            padding: '0',
                            border: 'none',
                            borderRadius: '1.5rem',
                            backgroundColor: currency === 'USD' ? 'var(--color-brand-coral)' : 'transparent',
                            color: currency === 'USD' ? 'var(--color-brand-cloud)' : 'var(--color-brand-forrest)',
                            fontWeight: 700,
                            fontSize: '13px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.2s',
                            fontFamily: 'Inter, sans-serif'
                        }}
                    >
                        USD($)
                    </button>
                </div>

                {/* Number Input Pill */}
                <div style={{ 
                    position: 'relative', 
                    flex: 1,
                    height: '42px',
                    display: 'flex'
                }}>
                    <span style={{
                        position: 'absolute',
                        left: '1rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: 'var(--color-brand-forrest)',
                        fontWeight: 600,
                        fontSize: '1rem',
                        fontFamily: 'Inter, sans-serif'
                    }}>{symbol}</span>
                    <input 
                        type="number" 
                        step="0.01"
                        min="0"
                        value={creditCost} 
                        onChange={(e) => setCreditCost(e.target.value)} 
                        style={{
                            width: '100%',
                            height: '100%',
                            padding: '0 1rem 0 2.2rem',
                            borderRadius: '2rem',
                            border: '1px solid rgba(0,0,0,0.05)',
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '1rem',
                            color: 'var(--color-brand-forrest)',
                            backgroundColor: '#fff',
                            boxSizing: 'border-box'
                        }}
                        placeholder={currency === 'GBP' ? '7.99' : '14.99'} 
                    />
                </div>

            </div>
        </div>
    );
};

export default AudiobookValueCalculator;
