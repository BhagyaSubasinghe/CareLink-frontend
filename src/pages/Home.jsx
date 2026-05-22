import React, { useState, useEffect, useRef } from 'react';
import './Home.css';
import heroStatic from '../assest/home/heroimage.jpg';
import mashineImage from '../assest/home/mashineImage.jpg';
import facility1 from '../assest/home/image1.jpg';
import facility2 from '../assest/home/image2.jpg';
import facility3 from '../assest/home/image3.jpg';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  const [doctorSearch, setDoctorSearch] = useState('');
  const [locationSearch, setLocationSearch] = useState('');
  const [heroImage, setHeroImage] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    // if there is a static hero image in the repo, use it as default
    if (!heroImage && typeof heroStatic === 'string') {
      setHeroImage(heroStatic);
    }

    return () => {
      if (heroImage && heroImage.startsWith && heroImage.startsWith('blob:')) {
        URL.revokeObjectURL(heroImage);
      }
    };
  }, [heroImage]);

  const handleFindDoctor = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (doctorSearch) params.set('q', doctorSearch);
    if (locationSearch) params.set('location', locationSearch);
    navigate({ pathname: '/doctors', search: params.toString() });
  };

  return (
    <div className="home-root">
      <div className="hero-banner">
        <div className="hero-inner">
          <div className="hero-left">
            <div className="hero-badge">⚡ Trusted by 2M+ Patients</div>
            <h1 className="hero-title">Expert Care for Your Most Precious Asset: <span className="accent-green">Your Health.</span></h1>
            <p className="hero-sub">Access world-class healthcare with CareLink. Connect with top specialists, manage your pharmacy needs, and book emergency care instantly.</p>

            <form onSubmit={handleFindDoctor} className="hero-search-wrap" aria-label="Find doctor">
              <div className="hero-search-field">
                <span className="icon-wrap">👨‍⚕️</span>
                <input placeholder="Doctor name or specialty" value={doctorSearch} onChange={(e) => setDoctorSearch(e.target.value)} />
              </div>
              <div className="hero-search-field">
                <span className="icon-wrap">📍</span>
                <input placeholder="Select location" value={locationSearch} onChange={(e) => setLocationSearch(e.target.value)} />
              </div>
              <button className="hero-search-submit">Find a Doctor</button>
            </form>

            <div style={{marginTop:12}}>
              <strong>⭐⭐⭐⭐⭐</strong> <span style={{color:'#374151', marginLeft:8}}>500+ Top Doctors Available</span>
            </div>
          </div>

          <div className="hero-visual">
            <div className="visual-card" onClick={() => fileInputRef.current && fileInputRef.current.click()} style={{cursor:'pointer'}}>
              <input ref={fileInputRef} type="file" accept="image/*" onChange={(e)=>{
                const f = e.target.files && e.target.files[0];
                if(f) setHeroImage(URL.createObjectURL(f));
              }} style={{display:'none'}} />
              {heroImage ? (
                <img src={heroImage} alt="Uploaded hero" />
              ) : (
                <div style={{width:520,height:420,display:'flex',alignItems:'center',justifyContent:'center',color:'#94a3b8',fontWeight:700}}>
                  Click to upload hero image
                </div>
              )}
            </div>
            <div className="floating-badge">
              <div className="icon">👥</div>
              <div className="meta">
                <div className="count">500+</div>
                <div className="label">Top Specialists</div>
                <div className="progress"><div className="bar"></div></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="facilities-section">
        <div className="metrics-band top-metrics">
          <div className="metric"><div className="metric-number">98%</div><div className="metric-label">Patient Satisfaction</div></div>
          <div className="metric"><div className="metric-number">150+</div><div className="metric-label">Top-tier Awards</div></div>
          <div className="metric"><div className="metric-number">12k+</div><div className="metric-label">Successful Surgeries</div></div>
          <div className="metric"><div className="metric-number">24h</div><div className="metric-label">Emergency Response</div></div>
        </div>

        <div className="facilities-inner">
          <h3 className="facilities-title">World-Class Facilities</h3>
          <p className="facilities-sub">Step into an environment designed for healing, comfort, and professional excellence.</p>

          <div className="facility-cards">
            <div className="facility-card">
              <img src={facility1} alt="Patient Lounge" />
              <div className="facility-card-body">
                <h4>Patient Lounge</h4>
                <p>A calming space for families and patients designed with comfort in mind.</p>
              </div>
            </div>

            <div className="facility-card">
              <img src={facility2} alt="Surgical Suites" />
              <div className="facility-card-body">
                <h4>Surgical Suites</h4>
                <p>Equipped with the latest robotic-assisted technology for minimally invasive procedures.</p>
              </div>
            </div>

            <div className="facility-card">
              <img src={facility3} alt="Private Recovery" />
              <div className="facility-card-body">
                <h4>Private Recovery Suites</h4>
                <p>Hotel-standard rooms offering complete privacy and 24/7 dedicated nursing care.</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🚑</div>
            <div className="feature-title">Emergency Booking</div>
            <div className="feature-desc">Critical care access 24/7. Immediate ambulance dispatch and trauma unit notification.</div>
            <button style={{marginTop:12,background:'#ef4444',color:'#fff',padding:'10px 14px',borderRadius:10,border:0}}>Call Now</button>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📅</div>
            <div className="feature-title">Check Availability</div>
            <div className="feature-desc">View real-time schedules for preferred doctors and book appointments instantly.</div>
            <button onClick={() => navigate('/doctors')} style={{marginTop:12,background:'#0ea5a9',color:'#fff',padding:'10px 14px',borderRadius:10,border:0}}>Book Appointment</button>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💊</div>
            <div className="feature-title">Online Pharmacy</div>
            <div className="feature-desc">Order prescriptions and health supplies. Fast home delivery with professional consultation.</div>
            <button style={{marginTop:12,background:'#059669',color:'#fff',padding:'10px 14px',borderRadius:10,border:0}}>Order Medicine</button>
          </div>
        </div>

        <section className="detail-section">
          <h2 className="detail-title">Excellence in Every Detail</h2>
          <p className="detail-sub">We combine cutting-edge medical technology with a patient-first approach to redefine healthcare standards.</p>

          <div className="detail-grid">
            <div className="detail-image-card full-bleed-image" role="img" aria-label="Advanced diagnostic imaging">
              <img src={mashineImage} alt="Advanced diagnostic" />
              <div className="full-bleed-caption">
                <h3>Advanced Diagnostic Tech</h3>
                <p>Our facility is equipped with AI-powered diagnostic tools and next-generation imaging for precise and early detection.</p>
              </div>
            </div>

            <div className="detail-right">
              <div className="detail-info-card">
                <h4>Patient–First Philosophy</h4>
                <p>Beyond medicine, we focus on the human experience. Dedicated care coordinators ensure your journey is comfortable and informed at every step.</p>
              </div>

              <div className="detail-info-card detail-info-strong">
                <h4>Integrated Digital Health</h4>
                <p>Manage your health records, view test results, and message your care team through our secure, HIPAA-compliant portal.</p>
              </div>
            </div>
          </div>

          <div className="metrics-band">
            <div className="metric"><div className="metric-number">98%</div><div className="metric-label">Patient Satisfaction</div></div>
            <div className="metric"><div className="metric-number">150+</div><div className="metric-label">Top-tier Awards</div></div>
            <div className="metric"><div className="metric-number">12k+</div><div className="metric-label">Successful Surgeries</div></div>
            <div className="metric"><div className="metric-number">24h</div><div className="metric-label">Emergency Response</div></div>
          </div>
        </section>
      </div>
    </div>
  );
}
