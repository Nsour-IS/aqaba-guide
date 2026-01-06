import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className="flex flex-col" style={{ minHeight: '100vh' }}>
      {/* Navigation */}
      <nav className={styles.nav}>
        <div className={`container ${styles.navContainer}`}>
          <Link href="/" className={styles.logo}>
            <span className={styles.logoIcon}>🌊</span>
            <span>Aqaba Guide</span>
          </Link>
          <div className={styles.navLinks}>
            <Link href="/explore">Explore</Link>
            <Link href="/recommend">AI Planner</Link>
            <Link href="/login">Sign In</Link>
            <Link href="/explore" className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>
              Book Now
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className={styles.hero}>
        <div className={styles.heroOverlay} />
        <div className={`container ${styles.heroContent}`}>
          <h1>Discover the Red Sea's<br />Hidden Paradise</h1>
          <p>
            AI-powered recommendations for diving, snorkeling, and marine adventures in Aqaba, Jordan.
          </p>
          <div className={styles.heroCta}>
            <Link href="/recommend" className="btn btn-primary" style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}>
              🤖 Get Personalized Recommendations
            </Link>
            <Link href="/explore" className="btn" style={{
              fontSize: '1.1rem',
              padding: '1rem 2rem',
              border: '2px solid white',
              color: 'white'
            }}>
              Browse Activities
            </Link>
          </div>
          <div className={styles.heroStats}>
            <div className={styles.stat}>
              <span className={styles.statNumber}>20+</span>
              <span className={styles.statLabel}>Dive Sites</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>50+</span>
              <span className={styles.statLabel}>Activities</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>4.9</span>
              <span className={styles.statLabel}>Rating</span>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className={`section ${styles.features}`}>
        <div className="container">
          <h2 className="text-center" style={{ marginBottom: '0.5rem' }}>Why Choose Aqaba Guide?</h2>
          <p className="text-center" style={{ color: 'var(--text-secondary)', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem' }}>
            We make exploring the Red Sea simple, safe, and unforgettable.
          </p>

          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🤖</div>
              <h3>AI-Powered Discovery</h3>
              <p>
                Answer a few simple questions and get personalized recommendations tailored to your experience level and interests.
              </p>
              <Link href="/recommend" className={styles.featureLink}>
                Try AI Planner →
              </Link>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🌊</div>
              <h3>Visual Exploration</h3>
              <p>
                Browse stunning photos and videos of over 20 dive sites and marine activities with detailed information.
              </p>
              <Link href="/explore" className={styles.featureLink}>
                Explore Sites →
              </Link>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>📅</div>
              <h3>Simple Booking</h3>
              <p>
                Book your adventure in just 3 steps with instant confirmation, transparent pricing, and no hidden fees.
              </p>
              <Link href="/explore" className={styles.featureLink}>
                Book Now →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Activities */}
      <section className={styles.popularSection}>
        <div className="container">
          <h2 className="text-center" style={{ marginBottom: '0.5rem' }}>Popular Activities</h2>
          <p className="text-center" style={{ color: 'var(--text-secondary)', marginBottom: '3rem' }}>
            Top-rated experiences loved by tourists
          </p>

          <div className={styles.activitiesGrid}>
            {[
              { id: 'cedar-pride', name: 'Cedar Pride Wreck', icon: '🚢', rating: 4.9, price: 65 },
              { id: 'snorkel-tour', name: 'Snorkeling Tour', icon: '🏊', rating: 4.7, price: 35 },
              { id: 'sunset-cruise', name: 'Sunset Cruise', icon: '🌅', rating: 4.8, price: 55 },
              { id: 'intro-dive', name: 'Discover Scuba', icon: '🤿', rating: 4.9, price: 75 },
            ].map((activity) => (
              <Link key={activity.id} href={`/book/${activity.id}`} className={styles.activityCard}>
                <div className={styles.activityImage}>
                  <span>{activity.icon}</span>
                </div>
                <div className={styles.activityInfo}>
                  <h4>{activity.name}</h4>
                  <div className={styles.activityMeta}>
                    <span>⭐ {activity.rating}</span>
                    <span className={styles.activityPrice}>From {activity.price} JOD</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center" style={{ marginTop: '2rem' }}>
            <Link href="/explore" className="btn btn-primary">
              View All Activities
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className="container text-center">
          <h2>Ready for Your Adventure?</h2>
          <p>Let our AI find the perfect activity for you in under 2 minutes.</p>
          <Link href="/recommend" className="btn btn-secondary" style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}>
            🤖 Start AI Planner
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className="container">
          <div className={styles.footerGrid}>
            <div className={styles.footerBrand}>
              <div className={styles.logo}>
                <span className={styles.logoIcon}>🌊</span>
                <span>Aqaba Guide</span>
              </div>
              <p>Your AI-powered companion for exploring the Red Sea.</p>
            </div>

            <div className={styles.footerLinks}>
              <h4>Explore</h4>
              <Link href="/explore">All Activities</Link>
              <Link href="/explore?category=diving">Diving</Link>
              <Link href="/explore?category=snorkeling">Snorkeling</Link>
              <Link href="/explore?category=boat-tours">Boat Tours</Link>
            </div>

            <div className={styles.footerLinks}>
              <h4>Support</h4>
              <a href="#">Help Center</a>
              <a href="#">Contact Us</a>
              <a href="#">Safety Info</a>
              <a href="#">Cancellation Policy</a>
            </div>

            <div className={styles.footerLinks}>
              <h4>Follow Us</h4>
              <a href="#">Instagram</a>
              <a href="#">Facebook</a>
              <a href="#">TikTok</a>
              <a href="#">YouTube</a>
            </div>
          </div>

          <div className={styles.footerBottom}>
            <p>© 2026 Aqaba Guide. All rights reserved.</p>
            <div className={styles.footerLegal}>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
