import ThreeScene from './ThreeScene';
import './Hero.css';

export default function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="container hero__inner">
        {/* Left — text */}
        <div className="hero__content">
          <p className="hero__eyebrow animate-fade-up delay-100">
            <span className="hero__status-dot" />
            Available for new opportunities
          </p>

          <h1 className="hero__title animate-fade-up delay-200">
            Hi, I'm<br />
            <span className="text-gradient">Jona Kapaj</span>
          </h1>

          <p className="hero__subtitle animate-fade-up delay-300">
            Software Engineer
          </p>

          <p className="hero__description animate-fade-up delay-400">
            Dedicated <span className="hero__tag">Python</span> developer and{' '}
            <span className="hero__tag">React</span> engineer — currently building
            data workflows at <strong>Reveal Data</strong>. Fast learner,
            detail-oriented, and passionate about clean code.
          </p>

          <div className="hero__actions animate-fade-up delay-500">
            <a href="#projects" className="btn btn-primary" id="hero-cta-projects">
              View My Work →
            </a>
            <a href="#contact" className="btn btn-outline" id="hero-cta-contact">
              Get In Touch
            </a>
          </div>

          <div className="hero__stats animate-fade-up delay-600">
            <div className="hero__stat">
              <span className="hero__stat-value text-gradient">2+</span>
              <span className="hero__stat-label">Years Experience</span>
            </div>
            <div className="hero__stat-divider" />
            <div className="hero__stat">
              <span className="hero__stat-value text-gradient">18</span>
              <span className="hero__stat-label">GitHub Repos</span>
            </div>
            <div className="hero__stat-divider" />
            <div className="hero__stat">
              <span className="hero__stat-value text-gradient">4</span>
              <span className="hero__stat-label">Companies</span>
            </div>
          </div>
        </div>

        {/* Right — 3D canvas */}
        <div className="hero__canvas-wrap">
          <ThreeScene />
        </div>
      </div>

      <a href="#about" className="hero__scroll-indicator" id="hero-scroll">
        <span>Scroll</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </a>
    </section>
  );
}
