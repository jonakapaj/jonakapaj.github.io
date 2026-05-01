import { useRef, useEffect } from 'react';
import './About.css';

const highlights = [
  { icon: '🐍', label: 'Python', desc: 'Django, data quality engines, backend automation & APIs' },
  { icon: '⚛️', label: 'React', desc: 'Responsive UIs, data visualization, real-time updates' },
  { icon: '💼', label: 'Software Engineer', desc: 'Currently @ Reveal Data — streamlining data workflows' },
  { icon: '🎓', label: 'SE Degree', desc: 'Canadian Institute of Technology, Tirana (2023–Present)' },
];

export default function About() {
  const cardRef = useRef(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const handleMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      el.style.setProperty('--mouse-x', `${x}px`);
      el.style.setProperty('--mouse-y', `${y}px`);
    };
    el.addEventListener('mousemove', handleMove);
    return () => el.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <section className="section about" id="about">
      <div className="container">
        <div className="about__grid">
          {/* Left: text */}
          <div className="about__text">
            <p className="section-label">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/></svg>
              About Me
            </p>
            <h2 className="section-title">
              Dedicated to building<br />
              <span className="text-gradient">things that scale</span>
            </h2>
            <p className="about__bio">
              I'm Jona — a dedicated Python developer and Software Engineer currently working at{' '}
              <strong style={{ color: 'var(--ink)' }}>Reveal Data</strong> (Chicago, Remote),
              where I implement and refine features to streamline data workflows, debug issues, and help
              maintain a Python-based data collection app.
            </p>
            <p className="about__bio">
              With experience across both front-end and back-end development, I have a solid foundation
              in React.js, vanilla JavaScript, Node.js, and strong database management and API integration
              skills. I'm known for fast learning and adaptability — I thrive in dynamic environments and
              am always eager to expand my technical knowledge.
            </p>
            <p className="about__bio">
              Based in <span style={{ color: 'var(--ink)' }}>Tirana, Albania</span> 🇦🇱 — open
              to remote roles worldwide.
            </p>
            <a href="#contact" className="btn btn-primary about__cta" id="about-cta">
              <span>Let's Work Together</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          {/* Right: highlight cards */}
          <div className="about__cards" ref={cardRef}>
            <div className="about__cards-spotlight" />
            {highlights.map((h, i) => (
              <div key={h.label} className="about__card glass" id={`about-card-${i}`}>
                <span className="about__card-icon">{h.icon}</span>
                <div>
                  <h4 className="about__card-title">{h.label}</h4>
                  <p className="about__card-desc">{h.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
