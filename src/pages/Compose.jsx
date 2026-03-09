import { useState, useEffect } from 'react';

export default function Compose() {
    const [message, setMessage] = useState("I have so much to tell you...");
    const [dear, setDear] = useState("Beloved,");
    const [sign, setSign] = useState("Secret Admirer");
    const [baseState, setBaseState] = useState(null);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const s = params.get('s');
        if (s) {
            try {
                setBaseState(JSON.parse(atob(s)));
            } catch (e) {
                console.error("Failed to decode state", e);
            }
        }
    }, []);

    const handleNext = () => {
        if (baseState) {
            const fullState = {
                ...baseState,
                msg: message,
                dear,
                sign
            };
            const encoded = btoa(JSON.stringify(fullState));
            window.location.href = `/coffee?s=${encoded}`;
        }
    };

    return (
        <main className="text-center">
            <div className="logo-container" style={{ marginBottom: '1rem' }}>
                <h1 className="logo-text" style={{ fontSize: '3rem' }}>gift a bouquet</h1>
            </div>
            <p className="subtitle" style={{ marginBottom: '2rem' }}>Write the Card</p>

            <div style={{
                width: 350, height: 350, border: '1px solid #000', margin: '0 auto',
                padding: '2rem', textAlign: 'left', background: '#fff',
                display: 'flex', flexDirection: 'column'
            }}>
                <p style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <strong>Dear</strong>
                    <input
                        value={dear} onChange={e => setDear(e.target.value)}
                        style={{ border: 'none', borderBottom: '1px dashed #ccc', outline: 'none', fontFamily: 'var(--font-body)', fontSize: '1rem', width: '100%' }}
                    />
                </p>
                <textarea
                    style={{ flexGrow: 1, border: 'none', resize: 'none', outline: 'none', fontFamily: 'var(--font-body)', marginTop: '1.5rem', fontSize: '0.9rem', lineHeight: '1.5' }}
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                />
                <div style={{ textAlign: 'right', marginTop: '1rem' }}>
                    <strong>Sincerely,</strong><br />
                    <input
                        value={sign} onChange={e => setSign(e.target.value)}
                        style={{ border: 'none', borderBottom: '1px dashed #ccc', outline: 'none', fontFamily: 'var(--font-body)', fontSize: '1rem', width: '150px', textAlign: 'right', marginTop: '0.5rem' }}
                    />
                </div>
            </div>

            <div style={{ marginTop: '2.5rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <button className="btn-secondary" style={{ minWidth: "150px" }} onClick={() => window.history.back()}>Back</button>
                <button className="btn-primary" style={{ minWidth: "150px" }} onClick={handleNext}>Next</button>
            </div>

            <div style={{ marginTop: 'auto', fontSize: '0.75rem', marginBottom: '2rem', letterSpacing: '1px', color: '#888', paddingTop: '3rem' }}>
                -by <a href="https://www.instagram.com/kushaliciously/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline', textUnderlineOffset: '2px' }}>kushalicious</a> :)
            </div>
        </main>
    );
}
