import { useState, useEffect } from 'react';
import { FLOWER_ASSETS } from '../data/assets';

export default function Coffee() {
    const [baseState, setBaseState] = useState(null);
    const [amount, setAmount] = useState(20);
    const [showQR, setShowQR] = useState(false);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const s = params.get('s');
        if (s) {
            try {
                setBaseState(s);
            } catch (e) {
                console.error("Failed to decode state", e);
            }
        }
    }, []);

    const handleNext = () => {
        if (baseState) {
            window.location.href = `/share?s=${baseState}`;
        } else {
            window.location.href = '/share';
        }
    };

    // Helper to render a static flower with optional stems
    const renderFlower = (id, scale = 1, rotation = 0, style = {}, showStem = true) => {
        const flower = FLOWER_ASSETS.find(f => f.id === id);
        if (!flower) return null;

        return (
            <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', ...style }}>
                <img
                    src={flower.img}
                    alt={flower.name}
                    style={{
                        width: 80 * scale,
                        height: 80 * scale,
                        objectFit: 'contain',
                        transform: `rotate(${rotation}deg)`,
                        position: 'relative',
                        zIndex: 2,
                        filter: 'drop-shadow(0px 8px 16px rgba(0,0,0,0.15))'
                    }}
                />
                {showStem && (
                    <>
                        <div style={{
                            width: '4px',
                            height: '150px',
                            background: '#2E8B57', // Stem color
                            position: 'absolute',
                            top: (40 * scale) + 'px',
                            zIndex: 1,
                            borderRadius: '2px'
                        }}></div>
                        {/* Simple leaves */}
                        <div style={{
                            width: '20px',
                            height: '10px',
                            background: '#5F8575',
                            position: 'absolute',
                            top: (80 * scale) + 'px',
                            left: 'calc(50% + 2px)',
                            borderRadius: '0 100% 0 100%',
                            transform: 'rotate(-45deg)',
                            zIndex: 0
                        }}></div>
                        <div style={{
                            width: '20px',
                            height: '10px',
                            background: '#5F8575',
                            position: 'absolute',
                            top: (110 * scale) + 'px',
                            right: 'calc(50% + 2px)',
                            borderRadius: '100% 0 100% 0',
                            transform: 'rotate(45deg)',
                            zIndex: 0
                        }}></div>
                    </>
                )}
            </div>
        );
    };

    return (
        <main className="text-center" style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px', position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', overflowX: 'hidden' }}>
            <div className="logo-container" style={{ marginBottom: '1rem', marginTop: '3rem', zIndex: 10 }}>
                <h1 className="logo-text" style={{ fontSize: '3rem' }}>gift a bouquet</h1>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '2rem', zIndex: 10, position: 'relative' }}>
                <div style={{ height: '1px', width: '40px', background: 'linear-gradient(to right, transparent, #ccc)' }}></div>
                <p className="subtitle" style={{ textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 'bold', color: '#888', margin: 0 }}>
                    BUY ME A COFFEE
                </p>
                <div style={{ height: '1px', width: '40px', background: 'linear-gradient(to left, transparent, #ccc)' }}></div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexGrow: 1, position: 'relative', width: '100%', paddingBottom: '3rem' }}>

                {/* Main Content Center - The Pristine Card */}
                <div style={{
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    zIndex: 10,
                    background: '#ffffff',
                    padding: '40px',
                    borderRadius: '24px',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.06)',
                    width: '100%',
                    maxWidth: '460px'
                }}>

                    {/* Flower Accents placed directly on the card edges */}
                    {renderFlower('f11', 1.2, 15, { position: 'absolute', top: '-40px', right: '-40px', zIndex: 12 }, false)}
                    {renderFlower('f10', 0.9, -25, { position: 'absolute', bottom: '-20px', left: '-30px', zIndex: 12 }, false)}
                    {renderFlower('f4', 0.8, 45, { position: 'absolute', bottom: '150px', right: '-25px', zIndex: 2 }, false)}

                    <p style={{ lineHeight: '1.6', fontSize: '1.1rem', fontFamily: 'var(--font-body)', color: '#333', marginBottom: '1rem', position: 'relative', zIndex: 15 }}>
                        hey! this site is run by <a href="https://www.instagram.com/kushaliciously/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-color)', textDecoration: 'underline', textUnderlineOffset: '4px', fontWeight: '500' }}>kushalicious</a>.
                    </p>
                    <p style={{ lineHeight: '1.6', fontSize: '1rem', fontFamily: 'var(--font-body)', color: '#666', marginBottom: '2.5rem', position: 'relative', zIndex: 15 }}>
                        if gift a bouquet brought you any joy today, please consider buying me a coffee!
                    </p>

                    <div style={{ width: '100%', marginBottom: '2rem', position: 'relative', zIndex: 15 }}>
                        <p style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', color: '#888', marginBottom: '1rem', fontWeight: '600' }}>Pay what you can</p>
                        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
                            {[50, 30, 20].map((val) => (
                                <button
                                    key={val}
                                    onClick={() => {
                                        setAmount(val);
                                        setShowQR(false);
                                    }}
                                    className="donation-btn"
                                    style={{
                                        padding: '12px 0',
                                        flex: 1,
                                        border: amount === val ? '2px solid var(--text-color)' : '1px solid #EAEAEA',
                                        background: amount === val ? 'var(--text-color)' : '#fff',
                                        color: amount === val ? '#fff' : 'var(--text-color)',
                                        borderRadius: '12px',
                                        cursor: 'pointer',
                                        fontFamily: 'var(--font-body)',
                                        fontSize: '1.1rem',
                                        fontWeight: amount === val ? '600' : '400',
                                        transition: 'all 0.2s ease',
                                    }}
                                >
                                    ₹{val}
                                </button>
                            ))}
                        </div>
                    </div>

                    {showQR ? (
                        <div style={{
                            width: '100%',
                            padding: '2rem',
                            border: '2px dashed #EAEAEA',
                            borderRadius: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: '#FAFAFA',
                            fontFamily: 'var(--font-body)',
                            color: '#666',
                            flexDirection: 'column',
                            gap: '1rem',
                            marginBottom: '1rem',
                            animation: 'fadeIn 0.4s ease',
                            position: 'relative', zIndex: 15
                        }}>
                            <div style={{ width: '200px', height: '200px', background: '#fff', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 24px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
                                <img src={`/qr/${amount}.png`} alt={`QR Code for ₹${amount}`} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                            </div>
                            <p style={{ fontWeight: '600', color: '#333', fontSize: '1.1rem' }}>Scan to pay ₹{amount}</p>
                            <p style={{ fontSize: '0.9rem', textAlign: 'center', color: '#888' }}>Thank you for your support ✧</p>
                        </div>
                    ) : (
                        <div style={{ width: '100%', marginBottom: '1rem', position: 'relative', zIndex: 15 }}>
                            <button
                                className="btn-primary"
                                onClick={() => setShowQR(true)}
                                style={{
                                    width: "100%",
                                    padding: '1.2rem',
                                    borderRadius: '12px',
                                    fontSize: '1rem',
                                    fontWeight: '500',
                                    letterSpacing: '2px'
                                }}
                            >
                                DONATE ₹{amount}
                            </button>
                        </div>
                    )}

                    <p style={{ fontSize: '0.85rem', color: '#999', fontStyle: 'italic', marginTop: '1rem', position: 'relative', zIndex: 15 }}>
                        no pressure if you can't buy me a coffee, go get your bouquet and thanks for stopping by!
                    </p>
                </div>
            </div>

            {/* Buttons at the bottom for navigation */}
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '3rem', zIndex: 10 }}>
                <button
                    style={{
                        padding: '1rem 2rem',
                        border: '1px solid #ccc',
                        borderRadius: '30px',
                        background: 'transparent',
                        color: '#666',
                        cursor: 'pointer',
                        letterSpacing: '1px',
                        textTransform: 'uppercase',
                        fontSize: '0.8rem',
                        fontWeight: '500',
                        transition: 'all 0.2s'
                    }}
                    onMouseOver={(e) => { e.target.style.background = '#f0f0f0'; e.target.style.color = '#333'; }}
                    onMouseOut={(e) => { e.target.style.background = 'transparent'; e.target.style.color = '#666'; }}
                    onClick={() => window.history.back()}
                >
                    Back
                </button>
                <button
                    style={{
                        padding: '1rem 2rem',
                        border: 'none',
                        borderRadius: '30px',
                        background: 'var(--text-color)',
                        color: '#fff',
                        cursor: 'pointer',
                        letterSpacing: '1px',
                        textTransform: 'uppercase',
                        fontSize: '0.8rem',
                        fontWeight: '500',
                        transition: 'all 0.2s',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }}
                    onMouseOver={(e) => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 6px 16px rgba(0,0,0,0.15)'; }}
                    onMouseOut={(e) => { e.target.style.transform = 'none'; e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)'; }}
                    onClick={handleNext}
                >
                    Continue to Bouquet
                </button>
            </div>

            <div style={{ marginTop: 'auto', fontSize: '0.75rem', marginBottom: '2rem', letterSpacing: '1px', color: '#aaa', paddingTop: '1rem', zIndex: 10 }}>
                -by <a href="https://www.instagram.com/kushaliciously/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline', textUnderlineOffset: '2px' }}>kushalicious</a> :)
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .donation-btn:hover {
                    border-color: var(--text-color) !important;
                }
            `}} />
        </main>
    );
}
