import { useState, useEffect } from 'react';
import './Navbar.css';

const links = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = ['about', 'skills', 'projects', 'contact'];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActive(id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner container">
        <a href="#" className="navbar__logo" id="nav-logo">
          <img src="/analytics-laptop-svgrepo-com.svg" alt="JK Logo" className="navbar__logo-img" />
          <span className="text-gradient">JK</span>
        </a>

        <ul className={`navbar__links ${menuOpen ? 'navbar__links--open' : ''}`}>
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                id={`nav-link-${l.label.toLowerCase()}`}
                className={`navbar__link ${active === l.href.slice(1) ? 'navbar__link--active' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a href="#contact" className="btn btn-primary navbar__cta" id="nav-cta">
              <span>Hire Me</span>
            </a>
          </li>
        </ul>

        <button
          className={`navbar__hamburger ${menuOpen ? 'open' : ''}`}
          id="nav-hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>
    </nav>
  );
}
