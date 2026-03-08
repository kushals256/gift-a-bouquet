import { useState } from 'react';
import { FLOWER_ASSETS, GREENERY_ASSETS } from '../data/assets';

// Use same deterministic logic from Customizer to render the preview
function mulberry32(a) {
    return function () {
        var t = a += 0x6D2B79F5;
        t = Math.imul(t ^ t >>> 15, t | 1);
        t ^= t + Math.imul(t ^ t >>> 7, t | 61);
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
    }
}

const PRESET_COLLECTION = [
    {
        id: 'c1',
        name: 'The Romantic Classic',
        description: 'A deep, passionate arrangement of timeless reds and pinks.',
        flowers: ['f12', 'f12', 'f12', 'f11', 'f11', 'f5', 'f5', 'f3'], // Roses, Peonies, Carnations, Dahlia
        seed: 74921,
        greeneryIdx: 0,
    },
    {
        id: 'c2',
        name: 'The Bright Sunshine',
        description: 'A cheerful, golden mix guaranteed to bring a smile.',
        flowers: ['f8', 'f8', 'f10', 'f10', 'f10', 'f6', 'f6', 'f7'], // Sunflowers, Daisies, Zinnias, Ranunculus
        seed: 88312,
        greeneryIdx: 2,
    },
    {
        id: 'c3',
        name: 'The Elegant Spring',
        description: 'A delicate, sophisticated blend of soft pastels.',
        flowers: ['f1', 'f1', 'f2', 'f2', 'f2', 'f7', 'f7', 'f4'], // Orchids, Tulips, Ranunculus, Anemone
        seed: 10452,
        greeneryIdx: 1,
    },
    {
        id: 'c4',
        name: 'The Wildflower Dream',
        description: 'An artistic, textured gathering of unique blooms.',
        flowers: ['f4', 'f4', 'f9', 'f9', 'f3', 'f3', 'f6', 'f10', 'f11'], // Anemones, Lilies, Dahlias, Zinnia, Daisy, Peony
        seed: 45199,
        greeneryIdx: 2,
    }
];

export default function Collection() {

    const handleSelectPreset = (preset) => {
        const state = { f: preset.flowers, s: preset.seed, g: preset.greeneryIdx };
        const encoded = btoa(JSON.stringify(state));
        // Route straight to customize so they can tweak it or just hit next
        window.location.href = `/customize?s=${encoded}`;
    };

    return (
        <main style={{ padding: '2rem' }}>
            <div className="text-center" style={{ marginBottom: '3rem' }}>
                <div className="logo-container" style={{ margin: '0 auto' }}>
                    <h1 className="logo-text" style={{ fontSize: '3.5rem' }}>curated collection</h1>
                </div>
                <p style={{ marginTop: '1rem', letterSpacing: '2px', fontSize: '1rem', color: '#666', textTransform: 'uppercase' }}>
                    Choose from our beautifully pre-arranged bouquets.
                </p>
                <div style={{ marginTop: '2rem' }}>
                    <button className="btn-secondary" onClick={() => window.location.href = '/'}>Back Home</button>
                </div>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                gap: '3rem',
                maxWidth: '1000px',
                margin: '0 auto'
            }}>
                {PRESET_COLLECTION.map(preset => {
                    const rand = mulberry32(preset.seed);
                    return (
                        <div key={preset.id}
                            onClick={() => handleSelectPreset(preset)}
                            style={{
                                background: '#FFFCF8',
                                padding: '2rem',
                                borderRadius: '4px',
                                boxShadow: '0 10px 30px rgba(0,0,0,0.04)',
                                cursor: 'pointer',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                textAlign: 'center',
                                border: '1px solid rgba(0,0,0,0.03)',
                                transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-5px)';
                                e.currentTarget.style.boxShadow = '0 15px 40px rgba(0,0,0,0.08)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.04)';
                            }}
                        >
                            {/* Visual Preview */}
                            <div style={{ position: 'relative', width: 220, height: 220, marginBottom: '2rem' }}>
                                {/* Mini Greenery */}
                                <div style={{
                                    position: 'absolute', bottom: 10, left: '50%', transform: 'translateX(-50%)',
                                    width: 180, height: 180, zIndex: 0,
                                    opacity: 0.9, filter: 'drop-shadow(0px 2px 5px rgba(0,0,0,0.1))'
                                }} dangerouslySetInnerHTML={{ __html: GREENERY_ASSETS[preset.greeneryIdx]?.svg || '' }}></div>

                                {/* Mini Flowers */}
                                {preset.flowers.map((id, index) => {
                                    const flowerDef = FLOWER_ASSETS.find(f => f.id === id);
                                    if (!flowerDef) return null;

                                    const r = 25 + rand() * 35;
                                    const theta = Math.PI + (rand() * Math.PI); // Top half
                                    const x = r * Math.cos(theta);
                                    const y = r * Math.sin(theta);
                                    const scale = 0.6 + rand() * 0.3;
                                    const rot = rand() * 360;

                                    return (
                                        <img
                                            key={index}
                                            src={flowerDef.img}
                                            alt={flowerDef.name}
                                            style={{
                                                position: 'absolute',
                                                top: '50%', left: '50%',
                                                width: 60, height: 60, objectFit: 'contain',
                                                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(${scale}) rotate(${rot}deg)`,
                                                zIndex: Math.floor(r),
                                                filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.15))'
                                            }}
                                        />
                                    );
                                })}
                            </div>

                            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', color: 'var(--text-color)' }}>
                                {preset.name}
                            </h2>
                            <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', lineHeight: '1.5', color: '#666', marginTop: '0.5rem', marginBottom: '1.5rem' }}>
                                {preset.description}
                            </p>

                            <button className="btn-primary" style={{ padding: '0.4rem 1.5rem', fontSize: '0.8rem', minWidth: 'auto', marginTop: 'auto' }}>
                                Select Arrangement
                            </button>
                        </div>
                    )
                })}
            </div>

            <div className="text-center" style={{ marginTop: '4rem', fontSize: '0.75rem', marginBottom: '1rem', letterSpacing: '1px', color: '#888', paddingTop: '2rem' }}>
                -by kushalicious :)
            </div>
        </main>
    );
}
