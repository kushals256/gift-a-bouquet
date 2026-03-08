import { useState, useEffect } from 'react';
import { FLOWER_ASSETS, GREENERY_ASSETS } from '../data/assets';

// Simple deterministic random generator for arrangement shuffling
function mulberry32(a) {
    return function () {
        var t = a += 0x6D2B79F5;
        t = Math.imul(t ^ t >>> 15, t | 1);
        t ^= t + Math.imul(t ^ t >>> 7, t | 61);
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
    }
}

export default function Customizer() {
    const [flowers, setFlowers] = useState([]);
    const [seed, setSeed] = useState(12345);
    const [greeneryIdx, setGreeneryIdx] = useState(0);

    useEffect(() => {
        // Read from URL parameters
        const params = new URLSearchParams(window.location.search);
        const s = params.get('s');
        if (s) {
            try {
                const state = JSON.parse(atob(s));
                if (state.f) setFlowers(state.f);
            } catch (e) {
                console.error("Failed to decode state", e);
            }
        }
    }, []);

    const handleNext = () => {
        const state = { f: flowers, s: seed, g: greeneryIdx };
        const encoded = btoa(JSON.stringify(state));
        window.location.href = `/compose?s=${encoded}`;
    };

    const rand = mulberry32(seed);

    return (
        <main className="text-center">
            <div className="logo-container" style={{ marginBottom: '1rem' }}>
                <h1 className="logo-text" style={{ fontSize: '3rem' }}>gift a bouquet</h1>
            </div>
            <p className="subtitle" style={{ marginBottom: '2rem' }}>Customize Your Bouquet</p>

            <div className="btn-group" style={{ marginTop: 0, marginBottom: '2rem', display: 'flex', flexDirection: 'row', gap: '1rem', justifyContent: 'center' }}>
                <button className="btn-primary" style={{ padding: '0.5rem 2rem', minWidth: 'auto' }} onClick={() => setSeed(Math.floor(Math.random() * 100000))}>Try a new arrangement</button>
                <button className="btn-secondary" style={{ padding: '0.5rem 2rem', minWidth: 'auto' }} onClick={() => setGreeneryIdx((greeneryIdx + 1) % GREENERY_ASSETS.length)}>Change Greenery</button>
            </div>

            <div style={{ margin: '2rem auto', position: 'relative', width: 350, height: 350, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {/* Greenery Layer */}
                <div style={{
                    position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
                    width: 280, height: 280, zIndex: 0,
                    opacity: 0.9, filter: 'drop-shadow(0px 4px 10px rgba(0,0,0,0.1))'
                }} dangerouslySetInnerHTML={{ __html: GREENERY_ASSETS[greeneryIdx]?.svg || '' }}></div>

                {/* Flowers Layer */}
                {flowers.map((id, index) => {
                    const flowerDef = FLOWER_ASSETS.find(f => f.id === id);
                    if (!flowerDef) return null;

                    // Calculate random position in a circle cluster
                    const r = 40 + rand() * 50; // radius from center
                    const theta = Math.PI + (rand() * Math.PI); // Top half so they aren't hidden by the card
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
                                width: 80, height: 80, objectFit: 'contain',
                                transform: `translate(${x}px, ${y}px) scale(${scale}) rotate(${rot}deg)`,
                                zIndex: Math.floor(r),
                                filter: 'drop-shadow(0px 4px 6px rgba(0,0,0,0.15))'
                            }}
                        />
                    );
                })}
            </div>

            <div style={{ marginTop: '3rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <button className="btn-secondary" style={{ minWidth: "150px" }} onClick={() => window.history.back()}>Back</button>
                <button className="btn-primary" style={{ minWidth: "150px" }} onClick={handleNext}>Next</button>
            </div>

            <div style={{ marginTop: 'auto', fontSize: '0.75rem', marginBottom: '2rem', letterSpacing: '1px', color: '#888', paddingTop: '3rem' }}>
                -by kushalicious :)
            </div>
        </main>
    );
}
