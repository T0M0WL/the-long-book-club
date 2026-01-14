import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { IoMail } from 'react-icons/io5';

// EmailJS Configuration
// Replace these with your actual keys if they differ
const SERVICE_ID = 'service_tnv89mk';
const TEMPLATE_ID = 'template_h5115ja';
const PUBLIC_KEY = 'DNUHcShXh1bWxjsnn';

export const ContactForm = () => {
    const form = useRef<HTMLFormElement>(null);
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

    const sendEmail = (e: React.FormEvent) => {
        e.preventDefault();

        if (!form.current) return;

        // Honeypot Spam Protection
        const formData = new FormData(form.current);
        if (formData.get('website')) {
            console.log('Bot detected. Silently succeeding.');
            setStatus('success');
            setTimeout(() => {
                form.current?.reset();
                setStatus('idle');
            }, 3000);
            return;
        }

        setStatus('sending');

        emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
            .then((result: { text: string }) => {
                console.log(result.text);
                setStatus('success');
                form.current?.reset();
            }, (error: { text: string }) => {
                console.log(error.text);
                setStatus('error');
            });
    };

    const inputStyles = {
        width: '100%',
        padding: '1rem',
        borderRadius: '8px',
        border: '1px solid rgba(var(--color-brand-slate-rgb), 0.2)',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        backdropFilter: 'blur(4px)',
        fontSize: '1rem',
        fontFamily: 'var(--font-sans)',
        color: 'var(--color-brand-slate)',
        transition: 'all 0.3s ease',
        outline: 'none'
    } as const;

    const labelStyles = {
        display: 'block',
        marginBottom: '0.5rem',
        fontFamily: 'var(--font-serif-accent)',
        fontSize: '0.9rem',
        letterSpacing: '0.05em',
        textTransform: 'uppercase' as const,
        color: 'var(--color-brand-forrest)',
        fontWeight: 600
    };

    return (
        <div style={{
            marginTop: '4rem',
            padding: '2rem',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.4) 100%)',
            backdropFilter: 'blur(10px)',
            borderRadius: '16px',
            border: '1px solid rgba(255,255,255,0.8)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.05)'
        }}>
            <h2 style={{
                fontFamily: 'var(--font-heading)',
                color: 'var(--color-brand-forrest)',
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                marginBottom: '1.5rem',
                textAlign: 'center'
            }}>
                Get in Touch
            </h2>
            <div style={{
                width: '60px',
                height: '1px',
                backgroundColor: 'var(--color-brand-forrest)',
                margin: '0 auto 3rem auto',
                borderRadius: '0px'
            }} />
            <p style={{
                marginBottom: '2rem',
                lineHeight: 1.6,
                color: 'var(--color-brand-slate)'
            }}>
                Have a recommendation for a long book we missed? Questions about the club?
                Send us a message below.
            </p>

            <form ref={form} onSubmit={sendEmail} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {/* Honeypot Field - Invisible to humans */}
                <input
                    type="text"
                    name="website"
                    style={{ position: 'absolute', opacity: 0, zIndex: -1, height: 0, width: 0 }}
                    tabIndex={-1}
                    autoComplete="off"
                />

                <div>
                    <label style={labelStyles}>Name</label>
                    <input
                        type="text"
                        name="name"
                        required
                        style={{ ...inputStyles, textAlign: 'center' }}
                        onFocus={(e) => e.target.style.borderColor = 'var(--color-brand-coral)'}
                        onBlur={(e) => e.target.style.borderColor = 'rgba(var(--color-brand-slate-rgb), 0.2)'}
                    />
                </div>

                <div>
                    <label style={labelStyles}>Email</label>
                    <input
                        type="email"
                        name="email"
                        required
                        style={{ ...inputStyles, textAlign: 'center' }}
                        onFocus={(e) => e.target.style.borderColor = 'var(--color-brand-coral)'}
                        onBlur={(e) => e.target.style.borderColor = 'rgba(var(--color-brand-slate-rgb), 0.2)'}
                    />
                </div>

                <div>
                    <label style={labelStyles}>Message</label>
                    <textarea
                        name="message"
                        required
                        rows={5}
                        style={{ ...inputStyles, resize: 'vertical' }}
                        onFocus={(e) => e.target.style.borderColor = 'var(--color-brand-coral)'}
                        onBlur={(e) => e.target.style.borderColor = 'rgba(var(--color-brand-slate-rgb), 0.2)'}
                    />
                </div>

                <div style={{ marginTop: '1rem' }}>
                    <button
                        type="submit"
                        disabled={status === 'sending' || status === 'success'}
                        style={{
                            padding: '1rem 2rem',
                            backgroundColor: status === 'success' ? 'var(--color-brand-forrest)' : 'var(--color-brand-coral)',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '50px',
                            fontFamily: 'var(--font-serif-accent)',
                            fontSize: '1rem',
                            fontWeight: 600,
                            letterSpacing: '0.05em',
                            cursor: status === 'success' ? 'default' : 'pointer',
                            transition: 'all 0.3s ease',
                            width: '100%',
                            opacity: status === 'sending' ? 0.7 : 1,
                            transform: status === 'sending' ? 'scale(0.98)' : 'scale(1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem'
                        }}
                    >
                        {status !== 'sending' && status !== 'success' && status !== 'error' && <IoMail size={20} />}
                        {status === 'sending' ? 'Sending...' :
                            status === 'success' ? 'Message Sent!' :
                                status === 'error' ? 'Failed - Try Again' : 'Send Message'}
                    </button>

                    {status === 'success' && (
                        <p style={{ marginTop: '1rem', color: 'var(--color-brand-forrest)', textAlign: 'center', fontWeight: 500 }}>
                            Thank you! We'll get back to you shortly.
                        </p>
                    )}
                    {status === 'error' && (
                        <p style={{ marginTop: '1rem', color: '#EF4444', textAlign: 'center', fontWeight: 500 }}>
                            Something went wrong. Please try again later.
                        </p>
                    )}
                </div>
            </form>
        </div>
    );
};
