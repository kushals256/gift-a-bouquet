export default function Home() {
    return (
        <main className="text-center">
            <div className="logo-container">
                <h1 className="logo-text">gift a bouquet</h1>
                <p style={{ marginTop: '1rem', letterSpacing: '2px', fontSize: '0.8rem', textTransform: 'uppercase' }}>Beautiful Flowers<br />Delivered Digitally</p>
            </div>
            <div>
                {/* Soft abstract watercolor blob for the home page */}
                <div style={{
                    width: 180, height: 180,
                    background: 'radial-gradient(circle at 40% 40%, #FFF0F5, #FFD1DC 50%, #E799A3)',
                    borderRadius: '45% 55% 40% 60% / 55% 45% 60% 40%',
                    margin: '3rem auto',
                    boxShadow: '0 20px 40px rgba(231, 153, 163, 0.2)'
                }}></div>
            </div>
            <div className="btn-group">
                <button className="btn-primary" onClick={() => window.location.href = '/builder'}>Build a Bouquet</button>
                <button className="btn-secondary">View Our Collection</button>
            </div>
            <div style={{ marginTop: '3rem' }}>
                <a href="#" style={{ color: '#000', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>View Garden</a>
            </div>
        </main>
    );
}
