import { useState, useEffect, useRef } from 'react';
import { FLOWER_ASSETS, GREENERY_ASSETS } from '../data/assets';

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
            <div className="logo-container" style={{ marginBottom: '0.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h1 className="logo-text" style={{ marginTop: '1rem', fontSize: '2.8rem' }}>gift a bouquet</h1>
            </div>
            <p style={{ letterSpacing: '2px', fontSize: '0.9rem', marginBottom: '1rem' }}>
                Hi, I made this bouquet for you!
            </p>

            <div style={{ margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', width: 'min(100%, 400px)' }}>
                {/* Bouquet Section */}
                <div style={{ position: 'relative', width: 'min(85vw, 320px)', height: 'min(85vw, 320px)' }}>
                    {/* Light neutral circle bg */}
                    <div style={{
                        position: 'absolute', inset: 0,
                        background: '#F2EBE5', borderRadius: '50%', zIndex: 0
                    }}></div>

                    {/* Bouquet container centered in the circle */}
                    <div style={{
                        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                        width: '85%', height: '85%', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1
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
                            const theta = Math.PI + (rand() * Math.PI); // Keep flowers in the top half
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
                </div>

                {/* Card Overlay */}
                <div style={{
                    position: 'relative', marginTop: '-3rem', transform: 'rotate(-2deg)',
                    width: 'min(90vw, 320px)', padding: '2rem 1.5rem', border: 'none', background: '#FFFCF8',
                    textAlign: 'left', boxShadow: '0 20px 40px rgba(44, 53, 45, 0.08)', zIndex: 10,
                    fontFamily: 'var(--font-handwriting)',
                    borderRadius: '2px',
                    boxSizing: 'border-box'
                }}>
                    <p style={{ fontSize: '1.4rem', color: 'var(--text-color)' }}>Dear {state.dear},</p>
                    <p style={{ fontSize: '1.3rem', margin: '1.5rem 0', whiteSpace: 'pre-wrap', color: 'var(--text-color)', lineHeight: 1.4 }}>{state.msg}</p>
                    <p style={{ fontSize: '1.3rem', textAlign: 'right', color: 'var(--text-color)' }}>Sincerely,<br />{state.sign}</p>
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center', marginTop: '2rem' }}>
                <button className="btn-primary" onClick={handleCopyLink} style={{ width: '100%', maxWidth: '250px' }}>
                    {copied ? 'Copied!' : 'Copy Link'}
                </button>
                {shareSupported && (
                    <button className="btn-secondary" onClick={handleShare} style={{ width: '100%', maxWidth: '250px' }}>Share</button>
                )}
            </div>

            <div style={{ marginTop: '1rem', fontSize: '0.7rem', marginBottom: '1rem', letterSpacing: '1px', color: '#888' }}>
                created with gift a bouquet<br />
                -by <a href="https://www.instagram.com/kushaliciously/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline', textUnderlineOffset: '2px' }}>kushalicious</a> :)<br />
                <a href="/" style={{ color: 'var(--text-color)', textDecoration: 'none', marginTop: '0.5rem', display: 'inline-block', borderBottom: '1px solid var(--text-color)' }}>make yours now</a>
            </div>
        </main>
    );
}
