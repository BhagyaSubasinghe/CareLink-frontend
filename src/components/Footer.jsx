import React, { useState } from 'react';
import '../styles/Footer.css';

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      // Handle newsletter signup
      console.log('Newsletter signup:', email);
      setEmail('');
      alert('Thank you for subscribing!');
    }
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Left Section - Logo & Social */}
        <div className="footer-section footer-brand">
          <h2 className="footer-logo">CareLink</h2>
          <p className="footer-tagline">
            Leading the way in medical excellence, trusted care, and patient-centered innovation.
          </p>
          <div className="footer-socials">
            <a href="#" className="social-icon" aria-label="Share">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                <polyline points="16 6 12 2 8 6" />
                <line x1="12" y1="2" x2="12" y2="15" />
              </svg>
            </a>
            <a href="#" className="social-icon" aria-label="Visit Website">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3 className="footer-section-title">QUICK LINKS</h3>
          <ul className="footer-links">
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/terms">Terms of Service</a></li>
            <li><a href="/patient-rights">Patient Rights</a></li>
            <li><a href="/careers">Careers</a></li>
            <li><a href="/locations">Locations</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-section">
          <h3 className="footer-section-title">CONTACT</h3>
          <div className="footer-contact-info">
            <div className="contact-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>123 Healthcare Plaza, Medical District</span>
            </div>
            <div className="contact-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span>+1(800)CARE-LINK</span>
            </div>
            <div className="contact-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              <span>contact@carelink.health</span>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="footer-section">
          <h3 className="footer-section-title">NEWSLETTER</h3>
          <p className="footer-newsletter-desc">Stay updated with health tips and news.</p>
          <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="newsletter-input"
            />
            <button type="submit" className="newsletter-btn">Join</button>
          </form>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        <p className="footer-copyright">© 2024 CareLink Healthcare. All rights reserved.</p>
      </div>
    </footer>
  );
}
