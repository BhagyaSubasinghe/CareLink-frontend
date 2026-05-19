import React from 'react';
import './About.css';
import hospitalImg from '../assest/aboutus/hospital.jpg';
import doctorImg from '../assest/aboutus/doctor.jpg';
import doctor1 from '../assest/aboutus/doctor1.jpg';
import doctor2 from '../assest/aboutus/doctor2.jpg';
import doctor3 from '../assest/aboutus/doctor3.jpg';
import doctor4 from '../assest/aboutus/doctor4.jpg';
import { useNavigate } from 'react-router-dom';

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="about-root">
      <header className="about-hero">
        <img src={hospitalImg} alt="Hospital facade" className="about-hero-img" />
        <div className="about-hero-content">
          <h1>Compassionate Care, Clinical Excellence.</h1>
          <p>We combine state-of-the-art medical technology with a deeply human, patient-first approach to redefine healthcare experiences.</p>
          <button className="btn-primary" onClick={() => navigate('/contact')}>Our Mission</button>
        </div>
      </header>

      <section className="about-intro">
        <div className="intro-text">
          <h2>A Legacy of Commitment</h2>
          <p>
            CareLink has been growing with a simple but profound mission: to provide accessible, patient-centric healthcare
            that treats the person, not just the symptoms. Founded by a group of dedicated practitioners, our journey started
            with a single clinic and a promise to serve our community with compassion and excellence.
          </p>
          <p>
            Today, CareLink combines clinical expertise with modern technology to deliver reliable, evidence-based care across
            a growing network of facilities.
          </p>
        </div>

        <div className="intro-media">
          <div className="media-card">
            <img src={doctorImg} alt="Doctor" />
            <div className="media-pin">Patient-Centric Focus</div>
          </div>
        </div>
      </section>

      <section className="pillars">
        <h3 className="pillars-title">The Pillars of CareLink</h3>
        <div className="pillar-cards">
          <div className="pillar-card">
            <div className="pillar-icon">🛡️</div>
            <h4>Integrity</h4>
            <p>We uphold the highest ethical standards, ensuring transparent care and trusted partnerships.</p>
          </div>

          <div className="pillar-card">
            <div className="pillar-icon">💡</div>
            <h4>Innovation</h4>
            <p>Leveraging cutting-edge medical technology to improve outcomes and patient experiences.</p>
          </div>

          <div className="pillar-card">
            <div className="pillar-icon">🤝</div>
            <h4>Inclusion</h4>
            <p>Delivering respectful, equitable care to every person who walks through our doors.</p>
          </div>
        </div>
      </section>

      <div className="about-metrics">
        <div className="metric"> 
          <div className="metric-number">20+</div>
          <div className="metric-label">Years of Service</div>
        </div>
        <div className="metric"> 
          <div className="metric-number">1M+</div>
          <div className="metric-label">Patients Treated</div>
        </div>
        <div className="metric"> 
          <div className="metric-number">500+</div>
          <div className="metric-label">Specialist Doctors</div>
        </div>
      </div>

      <section className="leadership">
        <div className="leadership-inner">
          <div className="leadership-header">
            <div>
              <h3>Leadership & Vision</h3>
              <p>Our executive team combines decades of medical practice with strategic healthcare management expertise.</p>
            </div>
            <div className="leadership-cta">
              <button className="link-button" onClick={() => navigate('/team')}>Meet the Full Board →</button>
            </div>
          </div>

          <div className="team-grid">
            <div className="team-card">
              <img src={doctor1} alt="Dr. Sarah Chen" className="team-photo" />
              <div className="team-meta">
                <div className="team-name">Dr. Sarah Chen</div>
                <div className="team-role">Chief Medical Officer</div>
              </div>
            </div>

            <div className="team-card">
              <img src={doctor2} alt="Marcus Thorne" className="team-photo" />
              <div className="team-meta">
                <div className="team-name">Marcus Thorne</div>
                <div className="team-role">Executive Chairman</div>
              </div>
            </div>

            <div className="team-card">
              <img src={doctor3} alt="Dr. James Wilson" className="team-photo" />
              <div className="team-meta">
                <div className="team-name">Dr. James Wilson</div>
                <div className="team-role">Head of Clinical Ops</div>
              </div>
            </div>

            <div className="team-card">
              <img src={doctor4} alt="Elena Rodriguez" className="team-photo" />
              <div className="team-meta">
                <div className="team-name">Elena Rodriguez</div>
                <div className="team-role">Director of Patient Exp.</div>
              </div>
            </div>
          </div>
        </div>
      </section>
        <section className="cta-band">
          <div className="cta-inner">
            <div className="cta-text">
              <h4>Experience CareLink Near You</h4>
              <p>From specialized surgical centers to local community clinics, find the facility that fits your healthcare needs.</p>
            </div>
            <div className="cta-action">
              <button className="btn-outline" onClick={() => navigate('/locations')}>Visit Our Facilities</button>
            </div>
          </div>
        </section>

        <section className="about-footer-extended">
          <div className="about-footer-inner">
            <div className="footer-left">
              <h5>CareLink</h5>
              <p>Redefining healthcare through compassion and innovation. Your health, our priority.</p>
              <div className="socials">
                <span aria-hidden>🔗</span>
                <span aria-hidden>🐦</span>
                <span aria-hidden>🔊</span>
              </div>
            </div>

            <div className="footer-columns">
              <div className="footer-col">
                <h6>Resources</h6>
                <ul>
                  <li>Careers</li>
                  <li>Locations</li>
                  <li>Newsroom</li>
                </ul>
              </div>

              <div className="footer-col">
                <h6>Legal</h6>
                <ul>
                  <li>Privacy Policy</li>
                  <li>Terms of Service</li>
                  <li>Patient Rights</li>
                </ul>
              </div>

              <div className="footer-col support-col">
                <h6>Support</h6>
                <div className="support-number">24/7 Helpline</div>
                <div className="support-phone">1-800-CARELINK</div>
              </div>
            </div>
          </div>
        </section>
      

      
    </div>
  );
}

