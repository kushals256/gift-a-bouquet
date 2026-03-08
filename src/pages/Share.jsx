import { useState, useEffect, useRef } from 'react';
import { FLOWER_ASSETS, GREENERY_ASSETS } from '../data/assets';
import confetti from 'canvas-confetti';

function mulberry32(a) {
    return function () {
        var t = a += 0x6D2B79F5;
        t = Math.imul(t ^ t >>> 15, t | 1);
        t ^= t + Math.imul(t ^ t >>> 7, t | 61);
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
    }
}

export default function Share() {
    const [state, setState] = useState(null);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const s = params.get('s');
        if (s) {
            try {
                setState(JSON.parse(atob(s)));

                // Trigger elegant, soft confetti when the page loads
                const duration = 3000;
                const end = Date.now() + duration;

                const frame = () => {
                    confetti({
                        particleCount: 5,
                        angle: 60,
                        spread: 55,
                        origin: { x: 0 },
                        colors: ['#FFC0CB', '#FFB6C1', '#FFF0F5', '#E799A3', '#FFFFFF']
                    });
                    confetti({
                        particleCount: 5,
                        angle: 120,
                        spread: 55,
                        origin: { x: 1 },
                        colors: ['#FFC0CB', '#FFB6C1', '#FFF0F5', '#E799A3', '#FFFFFF']
                    });

                    if (Date.now() < end) {
                        requestAnimationFrame(frame);
                    }
                };

                // Slight delay for dramatic effect
                setTimeout(frame, 500);

            } catch (e) {
                console.error("Failed to decode state", e);
            }
        }
    }, []);

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const shareSupported = !!navigator.share;
    const handleShare = () => {
        navigator.share({
            title: 'A Digital Bouquet For You',
            url: window.location.href
        }).catch(console.error);
    };

    if (!state) return <div style={{ textAlign: 'center', marginTop: '5rem' }}>Loading or invalid link...</div>;

    const rand = mulberry32(state.s || 12345);
    const flowers = state.f || [];
    const greeneryIdx = state.g || 0;

    return (
        <main className="text-center" style={{ overflowX: 'hidden' }}>
            <div className="logo-container" style={{ marginBottom: '1rem' }}>
                <h1 className="logo-text" style={{ fontSize: '3rem' }}>gift a bouquet</h1>
            </div>
            <p style={{ letterSpacing: '2px', fontSize: '1rem', marginBottom: '2rem' }}>
                Hi, I made this bouquet for you!
            </p>

            <div style={{ margin: '2rem auto', position: 'relative', width: 400, height: 500 }}>
                {/* Light neutral circle bg */}
                <div style={{
                    position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
                    width: 350, height: 350, background: '#F2EBE5', borderRadius: '50%', zIndex: 0
                }}></div>

                {/* Bouquet container centered in the circle */}
                <div style={{
                    position: 'absolute', top: 175, left: '50%', transform: 'translate(-50%, -50%)',
                    width: 300, height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1
                }}>
                    {/* Greenery */}
                    <div style={{
                        position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
                        width: 280, height: 280, zIndex: 0,
                        opacity: 0.9, filter: 'drop-shadow(0px 4px 10px rgba(0,0,0,0.1))'
                    }} dangerouslySetInnerHTML={{ __html: GREENERY_ASSETS[greeneryIdx]?.svg || '' }}></div>

                    {/* Flowers */}
                    {flowers.map((id, index) => {
                        const flowerDef = FLOWER_ASSETS.find(f => f.id === id);
                        if (!flowerDef) return null;

                        const r = 35 + rand() * 45;
                        const theta = rand() * 2 * Math.PI;
                        const x = r * Math.cos(theta);
                        const y = r * Math.sin(theta);
                        const scale = 0.8 + rand() * 0.4;
                        const rot = rand() * 360;

                        return (
                            <img
                                key={index}
                                src={flowerDef.img}
                                alt={flowerDef.name}
                                style={{
                                    position: 'absolute',
                                    width: 70, height: 70, objectFit: 'contain',
                                    transform: `translate(${x}px, ${y}px) scale(${scale}) rotate(${rot}deg)`,
                                    zIndex: Math.floor(r)
                                }}
                            />
                        );
                    })}
                </div>

                {/* Card Overlay */}
                <div style={{
                    position: 'absolute', bottom: 10, left: '50%', transform: 'translateX(-50%) rotate(-2deg)',
                    width: 320, padding: '2rem 1.5rem', border: 'none', background: '#FFFCF8',
                    textAlign: 'left', boxShadow: '0 20px 40px rgba(44, 53, 45, 0.08)', zIndex: 10,
                    fontFamily: 'var(--font-handwriting)',
                    borderRadius: '2px'
                }}>
                    <p style={{ fontSize: '1.4rem', color: 'var(--text-color)' }}>Dear {state.dear},</p>
                    <p style={{ fontSize: '1.3rem', margin: '1.5rem 0', whiteSpace: 'pre-wrap', color: 'var(--text-color)', lineHeight: 1.4 }}>{state.msg}</p>
                    <p style={{ fontSize: '1.3rem', textAlign: 'right', color: 'var(--text-color)' }}>Sincerely,<br />{state.sign}</p>
                </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
                <button className="btn-primary" onClick={handleCopyLink}>
                    {copied ? 'Copied!' : 'Copy Link'}
                </button>
                {shareSupported && (
                    <button className="btn-secondary" onClick={handleShare}>Share</button>
                )}
            </div>

            <div style={{ marginTop: '4rem', fontSize: '0.75rem', marginBottom: '2rem', letterSpacing: '1px', color: '#888' }}>
                created with gift a bouquet<br />
                -by kushalicious :)<br />
                <a href="/" style={{ color: 'var(--text-color)', textDecoration: 'none', marginTop: '0.5rem', display: 'inline-block', borderBottom: '1px solid var(--text-color)' }}>make yours now</a>
            </div>
        </main>
    );
}
