import Image from "next/image";
import styles from "./page.module.css"; // We might not need this if we use global classes, but let's keep it clean.

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <header className="section text-center" style={{
        background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)',
        color: 'white',
        padding: '6rem 1rem'
      }}>
        <div className="container">
          <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>Aqaba Guide</h1>
          <p style={{ fontSize: '1.5rem', maxWidth: '800px', margin: '0 auto 2rem', opacity: 0.9 }}>
            Your AI-powered companion for exploring the Red Sea's hidden gems.
          </p>
          <div className="flex justify-center gap-md">
            <button className="btn" style={{ backgroundColor: 'white', color: 'var(--primary)' }}>
              Start Exploring
            </button>
            <button className="btn" style={{ border: '2px solid white', color: 'white' }}>
              Learn More
            </button>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <main className="container section">
        <h2 className="text-center text-primary" style={{ marginBottom: '3rem' }}>Why Aqaba Guide?</h2>

        <div className="grid md:grid-cols-3 gap-md">
          {/* Feature 1 */}
          <div className="card" style={{ padding: '2rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🤖</div>
            <h3 className="text-primary">AI-Powered Discovery</h3>
            <p className="text-secondary">
              Get personalized recommendations for diving and snorkeling based on your experience and preferences.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="card" style={{ padding: '2rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌊</div>
            <h3 className="text-primary">Visual Exploration</h3>
            <p className="text-secondary">
              Browse stunning photos and videos of over 20 dive sites and marine activities.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="card" style={{ padding: '2rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📅</div>
            <h3 className="text-primary">Simple Booking</h3>
            <p className="text-secondary">
              Book your next adventure in just 3 steps with instant confirmation and no hidden fees.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer style={{ background: 'var(--muted)', padding: '2rem 0', marginTop: 'auto' }}>
        <div className="container text-center text-secondary">
          <p>© 2026 Aqaba Guide. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
