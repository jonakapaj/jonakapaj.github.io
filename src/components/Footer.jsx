import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer" id="footer">
      <div className="footer__line" />
      <div className="container footer__inner">
        <a href="#" className="footer__logo" id="footer-logo">
          <img src="/analytics-laptop-svgrepo-com.svg" alt="JK Logo" className="footer__logo-img" />
          <span className="text-gradient">JK</span>
        </a>
        <p className="footer__copy">
          © {year} Jona Kapaj.
        </p>
        <a href="#hero" className="footer__back" id="footer-back-to-top" aria-label="Back to top">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
          Top
        </a>
      </div>
    </footer>
  );
}
