import { FLOWER_ASSETS } from '../data/assets';

export default function Home() {
    return (
        <main className="text-center">
            <div className="logo-container">
                <h1 className="logo-text">gift a bouquet</h1>
                <p style={{ marginTop: '1rem', letterSpacing: '2px', fontSize: '0.8rem', textTransform: 'uppercase' }}>Beautiful Flowers<br />Delivered Digitally</p>
            </div>
            <div style={{ margin: '3rem auto', display: 'flex', justifyContent: 'center' }}>
                <img
                    src={FLOWER_ASSETS.find(f => f.id === 'f11').img}
                    alt="Beautiful Peony"
                    style={{
                        width: 220, height: 220, objectFit: 'contain',
                        filter: 'drop-shadow(0 20px 40px rgba(231, 153, 163, 0.5))'
                    }}
                />
            </div>
            <div className="btn-group">
                <button className="btn-primary" onClick={() => window.location.href = '/builder'}>Build a Bouquet</button>
                <button className="btn-secondary" onClick={() => window.location.href = '/collection'}>View Our Collection</button>
            </div>
            <div style={{ marginTop: '3rem' }}>
                <a href="/garden" style={{ color: '#000', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '2px', textDecoration: 'none', borderBottom: '2px solid #000', paddingBottom: '4px' }}>View Garden</a>
            </div>
            <div style={{ marginTop: 'auto', fontSize: '0.75rem', marginBottom: '2rem', letterSpacing: '1px', color: '#888', paddingTop: '2rem' }}>
                -by <a href="https://www.instagram.com/kushaliciously/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>kushalicious</a> :)
            </div>
        </main>
    );
}
