import React, { useState, useRef } from 'react';

interface AudioPlayerProps {
    src: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src }) => {
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
            padding: '6px 20px 6px 6px', // 6px padding on top, bottom, and left for snug fit
            borderRadius: '50px',
            gap: '15px',
            marginBottom: '0.5rem',
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
                style={{
                    width: '44px', // Slightly larger to match proportion
                    height: '44px',
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
                    <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="2" y="2" width="4" height="12" fill="currentColor"/>
                        <rect x="8" y="2" width="4" height="12" fill="currentColor"/>
                    </svg>
                ) : (
                    // Play Icon
                    <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: '2px' }}>
                        <path d="M12.5 8L2 14.5L2 1.5L12.5 8Z" fill="currentColor"/>
                    </svg>
                )}
            </button>

            {/* Time Current */}
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

            {/* Progress Bar Container */}
            <div style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
                height: '4px',
                backgroundColor: 'rgba(255, 255, 255, 0.3)', // Translucent white/cloud
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
                    width: '12px',
                    height: '12px',
                    backgroundColor: 'var(--color-brand-cloud)', // Cloud knob
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    zIndex: 1,
                    transition: 'transform 0.1s ease'
                }} />
            </div>

            {/* Time Duration */}
            <span style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.9rem',
                color: 'var(--color-brand-cloud)', // Cloud text
                fontWeight: 600,
                minWidth: '35px'
            }}>
                {duration}
            </span>
        </div>
    );
};

export default AudioPlayer;
