import React, { useState, useEffect } from 'react';

interface Props {
    initialBookLength?: string;
}

const customStyles = `
  .commute-slider {
    -webkit-appearance: none;
    width: 100%;
    height: 10px;
    border-radius: 5px;
    outline: none;
    padding: 0;
    margin: 8px 0;
    box-sizing: border-box;
  }
  .commute-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: var(--color-brand-coral);
    cursor: pointer;
    border: none;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  .commute-slider::-moz-range-thumb {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: var(--color-brand-coral);
    cursor: pointer;
    border: none;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }

  .commute-calc-mobile {
    display: none;
  }

  @media (max-width: 850px) {
    .commute-calc-desktop {
      display: none !important;
    }
    .commute-calc-mobile {
      display: flex !important;
    }
    .commute-slider {
      height: 6px;
      border-radius: 50px;
      margin: 6px 0;
    }
    .commute-slider::-webkit-slider-thumb {
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: var(--color-brand-coral);
      cursor: pointer;
      border: none;
      box-shadow: 0 1px 3px rgba(0,0,0,0.18);
    }
    .commute-slider::-moz-range-thumb {
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: var(--color-brand-coral);
      cursor: pointer;
      border: none;
      box-shadow: 0 1px 3px rgba(0,0,0,0.18);
    }
  }
`;

const getTrackBackground = (value: number, min: number, max: number) => {
    const percentage = ((value - min) / (max - min)) * 100;
    return `linear-gradient(to right, var(--color-brand-coral) ${percentage}%, var(--color-brand-forrest) ${percentage}%)`;
};

const AudiobookCommuteCalculator: React.FC<Props> = ({ initialBookLength }) => {
    const [hours, setHours] = useState<number>(0);
    const [minutes, setMinutes] = useState<number>(0);

    // Sliders state
    const [dailyCommute, setDailyCommute] = useState<number>(60); // 10 to 560
    const [daysPerWeek, setDaysPerWeek] = useState<number>(5);     // 1 to 7

    const speeds = [0.7, 1.0, 1.2, 1.5, 1.7, 2.0];
    const [speedIndex, setSpeedIndex] = useState<number>(1); // Index 1 is 1.0x

    useEffect(() => {
        if (initialBookLength) {
            const hMatch = initialBookLength.match(/(\d+)\s*(h|hr|hours|hour)/i);
            const mMatch = initialBookLength.match(/(\d+)\s*(m|min|mins|minutes|minute)/i);

            if (hMatch) setHours(parseInt(hMatch[1], 10));
            setMinutes(mMatch ? parseInt(mMatch[1], 10) : 0);
        }
    }, [initialBookLength]);

    const numHours = hours || 0;
    const numMinutes = minutes || 0;
    const currentSpeed = speeds[speedIndex];

    const totalBookMinutes = (numHours * 60) + numMinutes;
    const actualListeningMinutes = currentSpeed > 0 ? (totalBookMinutes / currentSpeed) : totalBookMinutes;

    const weeklyListeningMinutes = dailyCommute * daysPerWeek;

    let calcWeeks = 0;
    let calcDays = 0;

    if (weeklyListeningMinutes > 0 && actualListeningMinutes > 0) {
        calcWeeks = Math.floor(actualListeningMinutes / weeklyListeningMinutes);
        const remainingMinutes = actualListeningMinutes % weeklyListeningMinutes;
        calcDays = Math.ceil(remainingMinutes / dailyCommute);

        if (calcDays >= daysPerWeek) {
            calcWeeks += 1;
            calcDays = 0;
        }
    }

    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: customStyles }} />

            {/* Desktop Version (> 850px): Original Giant Circle Layout */}
            <div
                className="commute-calc-desktop"
                style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.5)',
                    borderRadius: '1.5rem',
                    padding: '2.5rem 2rem',
                    width: '100%',
                    marginBottom: '2rem',
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >
                <h3 style={{
                    fontFamily: 'var(--font-serif-accent)',
                    fontWeight: 400,
                    color: 'var(--color-brand-coral)',
                    fontSize: '28px',
                    margin: '0 0 2rem 0',
                    lineHeight: 1.1,
                    textAlign: 'center'
                }}>
                    Audiobook Commute<br/>Calendar
                </h3>

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
                            fontSize: '32px',
                            lineHeight: 1.1,
                            marginBottom: '0.5rem',
                            fontWeight: 400,
                            fontStyle: 'italic'
                        }}>
                            <strong>{calcWeeks}</strong> Weeks<br/>& <strong>{calcDays}</strong> Days
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

                <p style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 700,
                    color: 'var(--color-brand-forrest)',
                    fontSize: '13px',
                    margin: '0 0 2rem 0',
                    textAlign: 'center'
                }}>
                    Adjust for your own commute
                </p>

                {/* Sliders Container */}
                <div style={{ width: '100%', maxWidth: '350px' }}>
                    {/* 1. Daily Commute Slider */}
                    <div style={{ marginBottom: '2rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                            <span style={{ fontWeight: 700, color: 'var(--color-brand-forrest)', fontFamily: 'Inter, sans-serif', fontSize: '13px' }}>Commute Duration</span>
                            <span style={{ fontWeight: 700, color: 'var(--color-brand-coral)', fontFamily: 'Inter, sans-serif', fontSize: '13px' }}>{dailyCommute} mins/day</span>
                        </div>
                        <input
                            type="range"
                            className="commute-slider"
                            min={10}
                            max={560}
                            step={10}
                            value={dailyCommute}
                            onChange={(e) => setDailyCommute(Number(e.target.value))}
                            style={{ background: getTrackBackground(dailyCommute, 10, 560) }}
                        />
                    </div>

                    {/* 2. Commute Days Slider */}
                    <div style={{ marginBottom: '2rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                            <span style={{ fontWeight: 700, color: 'var(--color-brand-forrest)', fontFamily: 'Inter, sans-serif', fontSize: '13px' }}>Commute Days</span>
                            <span style={{ fontWeight: 700, color: 'var(--color-brand-coral)', fontFamily: 'Inter, sans-serif', fontSize: '13px' }}>{daysPerWeek} days/week</span>
                        </div>
                        <input
                            type="range"
                            className="commute-slider"
                            min={1}
                            max={7}
                            step={1}
                            value={daysPerWeek}
                            onChange={(e) => setDaysPerWeek(Number(e.target.value))}
                            style={{ background: getTrackBackground(daysPerWeek, 1, 7) }}
                        />
                    </div>

                    {/* 3. Listening Speed Slider */}
                    <div style={{ marginBottom: '1rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                            <span style={{ fontWeight: 700, color: 'var(--color-brand-forrest)', fontFamily: 'Inter, sans-serif', fontSize: '13px' }}>Listening Speed</span>
                            <span style={{ fontWeight: 700, color: 'var(--color-brand-coral)', fontFamily: 'Inter, sans-serif', fontSize: '13px' }}>{currentSpeed.toFixed(1)}x</span>
                        </div>
                        <input
                            type="range"
                            className="commute-slider"
                            min={0}
                            max={5}
                            step={1}
                            value={speedIndex}
                            onChange={(e) => setSpeedIndex(Number(e.target.value))}
                            style={{ background: getTrackBackground(speedIndex, 0, 5) }}
                        />
                    </div>
                </div>
            </div>

            {/* Mobile Version (<= 850px): Refined Clean Card Layout */}
            <div
                className="commute-calc-mobile"
                style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.65)',
                    borderRadius: '1.75rem',
                    padding: '1.75rem 1.4rem 1.65rem 1.4rem',
                    width: '100%',
                    marginBottom: '1.5rem',
                    boxSizing: 'border-box',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >
                {/* Title */}
                <h3 style={{
                    fontFamily: 'var(--font-serif-accent)',
                    fontStyle: 'italic',
                    fontWeight: 400,
                    letterSpacing: '-0.01em',
                    color: 'var(--color-brand-forrest)',
                    fontSize: '1.65rem',
                    margin: '0 0 1.15rem 0',
                    lineHeight: 1.15,
                    textAlign: 'center'
                }}>
                    Commute Calendar
                </h3>

                {/* Coral Result Pill */}
                <div style={{
                    width: '100%',
                    backgroundColor: 'var(--color-brand-coral)',
                    borderRadius: '1.25rem',
                    padding: '1rem 1rem',
                    marginBottom: '1.35rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxSizing: 'border-box',
                    color: '#ffffff',
                    textAlign: 'center'
                }}>
                    <span style={{
                        fontFamily: 'var(--font-serif-accent)',
                        fontSize: '1.65rem',
                        lineHeight: 1.1,
                        color: '#ffffff',
                        fontWeight: 400
                    }}>
                        {calcWeeks} Weeks & {calcDays} Days
                    </span>
                </div>

                {/* Subtitle */}
                <p style={{
                    fontFamily: 'var(--font-body)',
                    fontWeight: 700,
                    fontSize: '0.75rem',
                    color: 'var(--color-brand-forrest)',
                    textAlign: 'center',
                    margin: '0 0 1.5rem 0',
                    letterSpacing: '0.01em'
                }}>
                    Adjust for your commute specifics:
                </p>

                {/* Sliders Container */}
                <div style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.25rem'
                }}>
                    {/* 1. Daily Commute Slider */}
                    <div style={{ width: '100%' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.35rem' }}>
                            <span style={{ fontWeight: 700, color: 'var(--color-brand-forrest)', fontFamily: 'var(--font-body)', fontSize: '0.82rem' }}>Commute Duration</span>
                            <span style={{ fontWeight: 700, color: 'var(--color-brand-coral)', fontFamily: 'var(--font-body)', fontSize: '0.82rem' }}>{dailyCommute} Mins</span>
                        </div>
                        <input
                            type="range"
                            className="commute-slider"
                            min={10}
                            max={560}
                            step={10}
                            value={dailyCommute}
                            onChange={(e) => setDailyCommute(Number(e.target.value))}
                            style={{ background: getTrackBackground(dailyCommute, 10, 560) }}
                        />
                    </div>

                    {/* 2. Commute Days Slider */}
                    <div style={{ width: '100%' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.35rem' }}>
                            <span style={{ fontWeight: 700, color: 'var(--color-brand-forrest)', fontFamily: 'var(--font-body)', fontSize: '0.82rem' }}>Commute Days</span>
                            <span style={{ fontWeight: 700, color: 'var(--color-brand-coral)', fontFamily: 'var(--font-body)', fontSize: '0.82rem' }}>{daysPerWeek} days/week</span>
                        </div>
                        <input
                            type="range"
                            className="commute-slider"
                            min={1}
                            max={7}
                            step={1}
                            value={daysPerWeek}
                            onChange={(e) => setDaysPerWeek(Number(e.target.value))}
                            style={{ background: getTrackBackground(daysPerWeek, 1, 7) }}
                        />
                    </div>

                    {/* 3. Listening Speed Slider */}
                    <div style={{ width: '100%' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.35rem' }}>
                            <span style={{ fontWeight: 700, color: 'var(--color-brand-forrest)', fontFamily: 'var(--font-body)', fontSize: '0.82rem' }}>Listening Speed</span>
                            <span style={{ fontWeight: 700, color: 'var(--color-brand-coral)', fontFamily: 'var(--font-body)', fontSize: '0.82rem' }}>{currentSpeed.toFixed(1)}x</span>
                        </div>
                        <input
                            type="range"
                            className="commute-slider"
                            min={0}
                            max={5}
                            step={1}
                            value={speedIndex}
                            onChange={(e) => setSpeedIndex(Number(e.target.value))}
                            style={{ background: getTrackBackground(speedIndex, 0, 5) }}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default AudiobookCommuteCalculator;
