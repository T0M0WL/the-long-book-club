import React, { useState, useRef } from 'react';

interface AudioPlayerProps {
    src: string;
    compact?: boolean;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src, compact = false }) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState('0:00');
    const [duration, setDuration] = useState('0:00');

    // Format time function
    const formatTime = (timeInSeconds: number) => {
        if (isNaN(timeInSeconds)) return '0:00';
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = Math.floor(timeInSeconds % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    // Toggle Play/Pause
    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    // Handle Time Update
    const handleTimeUpdate = () => {
        if (audioRef.current) {
            const current = audioRef.current.currentTime;
            const dur = audioRef.current.duration;
            setCurrentTime(formatTime(current));
            if (dur > 0) {
                setProgress((current / dur) * 100);
            }
        }
    };

    // Handle Metadata Loaded (to get duration)
    const handleLoadedMetadata = () => {
        if (audioRef.current) {
            setDuration(formatTime(audioRef.current.duration));
        }
    };

    // Handle End of Audio
    const handleEnded = () => {
        setIsPlaying(false);
        setProgress(0);
        setCurrentTime('0:00');
        if (audioRef.current) {
            audioRef.current.currentTime = 0;
        }
    };

    // Handle manual scrubbing
    const handleScrub = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (audioRef.current) {
            const newTime = (Number(e.target.value) / 100) * audioRef.current.duration;
            audioRef.current.currentTime = newTime;
            setProgress(Number(e.target.value));
            setCurrentTime(formatTime(newTime));
        }
    };

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'var(--color-brand-coral)', // Coral background
            padding: compact ? '5px 14px 5px 5px' : '6px 20px 6px 6px', // Snug fit
            borderRadius: '50px',
            gap: compact ? '10px' : '15px',
            marginBottom: compact ? '0' : '0.5rem',
            width: '100%'
        }}>
            <audio 
                ref={audioRef} 
                src={src} 
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={handleEnded}
                preload="metadata"
            />
            
            {/* Play/Pause Button */}
            <button 
                onClick={togglePlay}
                aria-label={isPlaying ? 'Pause audio sample' : 'Play audio sample'}
                style={{
                    width: compact ? '32px' : '44px',
                    height: compact ? '32px' : '44px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-brand-cloud)', // Cloud background
                    color: 'var(--color-brand-coral)', // Coral icon
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    flexShrink: 0,
                    transition: 'transform 0.2s ease',
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
                {isPlaying ? (
                    // Pause Icon
                    <svg width={compact ? "11" : "14"} height={compact ? "13" : "16"} viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="2" y="2" width="4" height="12" fill="currentColor"/>
                        <rect x="8" y="2" width="4" height="12" fill="currentColor"/>
                    </svg>
                ) : (
                    // Play Icon
                    <svg width={compact ? "11" : "14"} height={compact ? "13" : "16"} viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: '2px' }}>
                        <path d="M12.5 8L2 14.5L2 1.5L12.5 8Z" fill="currentColor"/>
                    </svg>
                )}
            </button>

            {/* Time Current (Full mode only) */}
            {!compact && (
                <span style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.9rem',
                    color: 'var(--color-brand-cloud)', // Cloud text
                    fontWeight: 600,
                    minWidth: '35px',
                    textAlign: 'right'
                }}>
                    {currentTime}
                </span>
            )}

            {/* Progress Bar Container */}
            <div style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
                height: compact ? '3px' : '4px',
                backgroundColor: 'rgba(255, 255, 255, 0.35)', // Translucent white/cloud
                borderRadius: '2px',
                cursor: 'pointer'
            }}>
                {/* Custom Range Input */}
                <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={progress}
                    onChange={handleScrub}
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        opacity: 0,
                        cursor: 'pointer',
                        zIndex: 2
                    }}
                />
                {/* Filled Progress */}
                <div style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: `${progress}%`,
                    backgroundColor: 'var(--color-brand-cloud)', // Cloud filled
                    borderRadius: '2px',
                    pointerEvents: 'none',
                    zIndex: 1
                }} />
                {/* Scrubber Knob */}
                <div style={{
                    position: 'absolute',
                    left: `${progress}%`,
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: compact ? '10px' : '12px',
                    height: compact ? '10px' : '12px',
                    backgroundColor: 'var(--color-brand-cloud)', // Cloud knob
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    zIndex: 1,
                    transition: 'transform 0.1s ease'
                }} />
            </div>

            {/* Time Duration */}
            <span style={{
                fontFamily: compact ? 'var(--font-serif-accent)' : 'var(--font-body)',
                fontSize: compact ? '0.82rem' : '0.9rem',
                color: 'var(--color-brand-cloud)', // Cloud text
                fontWeight: compact ? 500 : 600,
                minWidth: compact ? '28px' : '35px',
                textAlign: 'right'
            }}>
                {compact ? (isPlaying ? currentTime : (duration !== '0:00' ? duration : '0:30')) : duration}
            </span>
        </div>
    );
};

export default AudioPlayer;
