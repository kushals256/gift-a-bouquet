import { FLOWER_ASSETS } from '../data/assets';

export default function Garden() {
    return (
        <main style={{ padding: '2rem' }}>
            <div className="text-center" style={{ marginBottom: '3rem' }}>
                <div className="logo-container" style={{ margin: '0 auto' }}>
                    <h1 className="logo-text" style={{ fontSize: '3.5rem' }}>garden guide</h1>
                </div>
                <p style={{ marginTop: '1rem', letterSpacing: '2px', fontSize: '1rem', color: '#666', textTransform: 'uppercase' }}>
                    Discover the meaning behind every bloom in our collection.
                </p>
                <div style={{ marginTop: '2rem' }}>
                    <button className="btn-secondary" onClick={() => window.location.href = '/'}>Back Home</button>
                </div>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))',
                gap: '2.5rem',
                maxWidth: '1200px',
                margin: '0 auto'
            }}>
                {FLOWER_ASSETS.map(flower => (
                    <div key={flower.id} style={{
                        background: '#FFFCF8',
                        padding: '2.5rem 2rem',
                        borderRadius: '2px',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                        border: '1px solid rgba(0,0,0,0.02)'
                    }}>
                        <img
                            src={flower.img}
                            alt={flower.name}
                            style={{ width: '150px', height: '150px', objectFit: 'contain', filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))' }}
                        />
                        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.4rem', marginTop: '1.5rem', color: 'var(--text-color)' }}>
                            {flower.name}
                        </h2>
                        <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '2px', color: '#B66068', margin: '0.5rem 0 1.25rem 0' }}>
                            {flower.meaning}
                        </h3>
                        <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.05rem', lineHeight: '1.6', color: '#666' }}>
                            {flower.description}
                        </p>
                    </div>
                ))}
            </div>

            <div className="text-center" style={{ marginTop: '4rem', fontSize: '0.75rem', marginBottom: '1rem', letterSpacing: '1px', color: '#888', paddingTop: '2rem' }}>
                -by kushalicious :)
            </div>
        </main>
    );
}
