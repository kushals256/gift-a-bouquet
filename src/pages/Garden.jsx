import { FLOWER_ASSETS } from '../data/assets';

export default function Garden() {
    return (
        <main style={{ padding: 'min(2rem, 5vw)' }}>
            <div className="text-center" style={{ marginBottom: 'min(3rem, 10vw)' }}>
                <div className="logo-container" style={{ margin: '0 auto' }}>
                    <h1 className="logo-text" style={{ fontSize: 'clamp(2rem, 10vw, 3.5rem)' }}>garden guide</h1>
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
                        padding: 'min(2.5rem, 5vw) min(2rem, 4vw)',
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
                            <span style={{ fontSize: '1.2rem', color: '#888', whiteSpace: 'nowrap', display: 'block', marginTop: '0.25rem' }}>
                                {flower.kannadaName}
                            </span>
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
                -by <a href="https://www.instagram.com/kushaliciously/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline', textUnderlineOffset: '2px' }}>kushalicious</a> :)
            </div>
        </main>
    );
}
