import { useState } from 'react';
import { FLOWER_ASSETS } from '../data/assets';

export default function Builder() {
    const [selectedFlowers, setSelectedFlowers] = useState([]);

    const toggleFlower = (id) => {
        setSelectedFlowers(prev => {
            // If already selected, remove one instance (if we allow duplicates, logic differs. Let's assume multi-duplicates are allowed, or just toggle on/off)
            // The design says "pick 6 to 10 blooms", usually meaning we can pick multiple of the same or exactly 6-10 distinct. Let's allow picking duplicates by adding to an array. Oh wait, if we click to add and click to remove, a counter per flower is better.
            // Let's implement an array of selected IDs.
            const index = prev.indexOf(id);
            if (index > -1) {
                // remove one instance
                const newArr = [...prev];
                newArr.splice(index, 1);
                return newArr;
            } else {
                // add one instance
                if (prev.length < 10) {
                    return [...prev, id];
                } else {
                    alert('You can only select up to 10 blooms.');
                    return prev;
                }
            }
        });
    };

    const addFlower = (id) => {
        if (selectedFlowers.length < 10) setSelectedFlowers([...selectedFlowers, id]);
    };
    const removeFlower = (id) => {
        const idx = selectedFlowers.lastIndexOf(id);
        if (idx > -1) {
            const arr = [...selectedFlowers];
            arr.splice(idx, 1);
            setSelectedFlowers(arr);
        }
    };

    const getCount = (id) => selectedFlowers.filter(f => f === id).length;

    const isValid = selectedFlowers.length >= 6 && selectedFlowers.length <= 10;

    const handleNext = () => {
        if (isValid) {
            // encode state into URL params
            const state = { f: selectedFlowers };
            const encoded = btoa(JSON.stringify(state));
            window.location.href = `/customize?s=${encoded}`;
        }
    };

    return (
        <main className="text-center">
            <div className="logo-container" style={{ marginBottom: '1rem' }}>
                <h1 className="logo-text" style={{ fontSize: '3rem' }}>gift a bouquet</h1>
            </div>
            <p className="subtitle" style={{ marginBottom: '2rem' }}>
                Pick 6 to 10 Blooms ({selectedFlowers.length}/10)
            </p>

            <div style={{
                display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center',
                maxWidth: 900, margin: '0 auto'
            }}>
                {FLOWER_ASSETS.map(flower => {
                    const count = getCount(flower.id);
                    return (
                        <div key={flower.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <img
                                src={flower.img}
                                alt={flower.name}
                                style={{
                                    width: 100, height: 100, objectFit: 'contain',
                                    cursor: 'pointer', position: 'relative',
                                    transform: count > 0 ? 'scale(1.05)' : 'scale(1)',
                                    transition: 'transform 0.2s',
                                    filter: count > 0 ? 'drop-shadow(0 4px 6px rgba(0,0,0,0.2))' : 'drop-shadow(0 2px 4px rgba(0,0,0,0.05))'
                                }}
                                onClick={() => addFlower(flower.id)}
                            />
                            <div style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <button
                                    onClick={() => removeFlower(flower.id)}
                                    disabled={count === 0}
                                    style={{ width: 24, height: 24, borderRadius: '50%', border: '1px solid #000', background: 'transparent', cursor: count > 0 ? 'pointer' : 'default', opacity: count > 0 ? 1 : 0.3 }}
                                >-</button>
                                <span style={{ fontSize: '0.9rem', width: 20, textAlign: 'center' }}>{count}</span>
                                <button
                                    onClick={() => addFlower(flower.id)}
                                    disabled={selectedFlowers.length >= 10}
                                    style={{ width: 24, height: 24, borderRadius: '50%', border: '1px solid #000', background: 'transparent', cursor: selectedFlowers.length < 10 ? 'pointer' : 'default', opacity: selectedFlowers.length < 10 ? 1 : 0.3 }}
                                >+</button>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div style={{ marginTop: '3rem' }}>
                <button
                    className="btn-primary"
                    style={{ opacity: isValid ? 1 : 0.4, cursor: isValid ? 'pointer' : 'not-allowed', transform: 'none' }}
                    disabled={!isValid}
                    onClick={handleNext}
                >
                    Next
                </button>
            </div>
        </main >
    );
}
