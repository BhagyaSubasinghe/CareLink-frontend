import React, { useState } from 'react';
import './Doctors.css';
import Footer from '../components/Footer';

// ─── Data ────────────────────────────────────────────────────────────────────

const DEPARTMENTS = ['Cardiology', 'Pediatrics', 'Neurology', 'Orthopedics'];
const EXPERIENCE_LEVELS = ['All Experience Levels', '0-5 years', '5-10 years', '10-15 years', '15+ years'];

const doctorsList = [
  { id: 1, name: 'Dr. Sarah Mitchell',   specialty: 'Senior Cardiologist',  department: 'Cardiology',   rating: 4.9, experience: '13 Years Experience', nextSlots: [{ day: 'MON', time: '09:30' }, { day: 'TUE', time: '14:15' }, { day: 'WED', time: '11:00' }] },
  { id: 2, name: 'Dr. James Wilson',     specialty: 'Pediatric Specialist',  department: 'Pediatrics',   rating: 4.6, experience: '8 Years Experience',  nextSlots: [{ day: 'THU', time: '10:00' }, { day: 'FRI', time: '15:30' }, { day: 'SAT', time: 'Full'  }] },
  { id: 3, name: 'Dr. Robert Chen',      specialty: 'Orthopedic Surgeon',    department: 'Orthopedics',  rating: 5.0, experience: '22 Years Experience', nextSlots: [{ day: 'MON', time: '08:00' }, { day: 'TUE', time: '09:00' }, { day: 'WED', time: '08:30' }] },
  { id: 4, name: 'Dr. Emily Watson',     specialty: 'Neurologist',           department: 'Neurology',    rating: 4.7, experience: '10 Years Experience', nextSlots: [{ day: 'THU', time: '13:00' }, { day: 'FRI', time: '14:00' }, { day: 'SAT', time: '09:00' }] },
  { id: 5, name: 'Dr. Michael Torres',   specialty: 'Senior Cardiologist',   department: 'Cardiology',   rating: 4.8, experience: '15 Years Experience', nextSlots: [{ day: 'MON', time: '10:00' }, { day: 'WED', time: '13:30' }, { day: 'FRI', time: '11:00' }] },
  { id: 6, name: 'Dr. Linda Park',       specialty: 'Pediatric Specialist',  department: 'Pediatrics',   rating: 4.5, experience: '7 Years Experience',  nextSlots: [{ day: 'TUE', time: '09:00' }, { day: 'THU', time: '14:00' }, { day: 'SAT', time: '10:30' }] },
  { id: 7, name: 'Dr. Angela Ross',      specialty: 'Neurologist',           department: 'Neurology',    rating: 4.8, experience: '12 Years Experience', nextSlots: [{ day: 'MON', time: '11:00' }, { day: 'WED', time: '09:00' }, { day: 'FRI', time: '15:00' }] },
  { id: 8, name: 'Dr. Kevin Patel',      specialty: 'Orthopedic Surgeon',    department: 'Orthopedics',  rating: 4.6, experience: '9 Years Experience',  nextSlots: [{ day: 'TUE', time: '08:30' }, { day: 'THU', time: '12:00' }, { day: 'SAT', time: '10:00' }] },
];

// ─── Small Components ────────────────────────────────────────────────────────

const AvatarPlaceholder = ({ name, size = 72 }) => {
  const initials = name.split(' ').filter((_, i) => i > 0).slice(0, 2).map(n => n[0]).join('');
  const palette = ['#4f8ef7','#38b2ac','#ed8936','#e53e8e','#9f7aea','#48bb78','#f6ad55','#fc8181'];
  const bg = palette[name.charCodeAt(4) % palette.length];
  const bg2 = palette[(name.charCodeAt(4) + 3) % palette.length];
  return (
    <div style={{
      width: size, height: size, borderRadius: 12, flexShrink: 0,
      background: `linear-gradient(135deg, ${bg}, ${bg2})`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: '#fff', fontWeight: 800, fontSize: size * 0.27, letterSpacing: 1,
    }}>
      {initials}
    </div>
  );
};

const RatingBadge = ({ rating }) => {
  return (
    <span className="rating-badge">
      ★ {rating.toFixed(1)}
    </span>
  );
};

const SlotChip = ({ day, time }) => {
  const full = time === 'Full';
  return (
    <div className={`slot-chip ${full ? 'full' : ''}`}>
      <div className="slot-day">{day}</div>
      <div className={`slot-time ${full ? 'full' : ''}`}>{time}</div>
    </div>
  );
};

const Toggle = ({ checked, onChange }) => (
  <div onClick={() => onChange(!checked)} style={{
    width: 42, height: 22, borderRadius: 11, cursor: 'pointer',
    background: checked ? '#3b82f6' : '#cbd5e1',
    position: 'relative', transition: 'background 0.2s', flexShrink: 0,
  }}>
    <div style={{
      width: 16, height: 16, borderRadius: '50%', background: '#fff',
      position: 'absolute', top: 3, left: checked ? 23 : 3,
      transition: 'left 0.2s', boxShadow: '0 1px 4px rgba(0,0,0,0.25)',
    }} />
  </div>
);

const PagBtn = ({ label, active, onClick }) => (
  <button className={`pagination-btn ${active ? 'active' : ''}`} onClick={onClick}>
    {label}
  </button>
);

// ─── Doctor Card ─────────────────────────────────────────────────────────────

const DoctorCard = ({ doctor }) => (
  <div className="doctor-card">
    {/* Header row */}
    <div className="doctor-header">
      <AvatarPlaceholder name={doctor.name} size={72} />
      <div className="doctor-info">
        <div className="doctor-title-row">
          <div>
            <div className="doctor-name">{doctor.name}</div>
            <div className="doctor-specialty">{doctor.specialty}</div>
          </div>
          <RatingBadge rating={doctor.rating} />
        </div>
        <div className="doctor-experience">
          <svg className="experience-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
          </svg>
          <span>{doctor.experience}</span>
        </div>
      </div>
    </div>

    {/* Slots */}
    <div className="slots-section">
      <div className="slots-label">Next Available Slots</div>
      <div className="slots-container">
        {doctor.nextSlots.map((s, i) => <SlotChip key={i} day={s.day} time={s.time} />)}
      </div>
    </div>

    {/* CTA */}
    <button className="doctor-cta">Check Availability</button>
  </div>
);

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function Doctors() {
  const [checkedDepts, setCheckedDepts] = useState(['Cardiology']);
  const [experience, setExperience]     = useState('All Experience Levels');
  const [location, setLocation]         = useState('');
  const [availableToday, setAvailableToday] = useState(false);
  const [currentPage, setCurrentPage]   = useState(1);
  const [sortBy, setSortBy]             = useState('Highest Rating');

  const toggleDept = (dept) =>
    setCheckedDepts(prev => prev.includes(dept) ? prev.filter(d => d !== dept) : [...prev, dept]);

  const filtered = doctorsList
    .filter(d => checkedDepts.length === 0 || checkedDepts.includes(d.department))
    .sort((a, b) => sortBy === 'Highest Rating' ? b.rating - a.rating : b.experience.localeCompare(a.experience));

  const totalPages = 8;

  return (
    <div className="doctors-root">

      {/* ── Hero Banner ── */}
      <div className="doctors-hero">
        <h1>Book Your Appointment</h1>
        <p>
          Connect with our world-class specialists. Filter by expertise, experience, and location to find the right care for your needs.
        </p>
      </div>

      {/* ── Body: Sidebar + Grid ── */}
      <div className="doctors-container">

        {/* ── Sidebar ── */}
        <aside className="doctors-sidebar">
          {/* Header */}
          <div className="sidebar-header">
            <h3>Filters</h3>
            <button
              className="sidebar-reset"
              onClick={() => { setCheckedDepts([]); setExperience('All Experience Levels'); setLocation(''); setAvailableToday(false); }}
            >
              Reset
            </button>
          </div>

          {/* Department */}
          <div className="sidebar-section">
            <div className="sidebar-section-label">Department</div>
            <div className="sidebar-checkbox-group">
              {DEPARTMENTS.map(dept => (
                <label key={dept} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={checkedDepts.includes(dept)}
                    onChange={() => toggleDept(dept)}
                  />
                  <span>{dept}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div className="sidebar-section">
            <div className="sidebar-section-label">Experience</div>
            <select
              value={experience}
              onChange={e => setExperience(e.target.value)}
              className="sidebar-select"
            >
              {EXPERIENCE_LEVELS.map(l => <option key={l}>{l}</option>)}
            </select>
          </div>

          {/* Location */}
          <div className="sidebar-section">
            <div className="sidebar-section-label">Location</div>
            <div className="sidebar-input-wrapper">
              <svg className="sidebar-input-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
              </svg>
              <input
                placeholder="City or Clinic Name"
                value={location}
                onChange={e => setLocation(e.target.value)}
                className="sidebar-input"
              />
            </div>
          </div>

          {/* Available Today */}
          <div className="toggle-wrapper">
            <span className="toggle-label">Available Today</span>
            <Toggle checked={availableToday} onChange={setAvailableToday} />
          </div>
        </aside>

        {/* ── Main Content ── */}
        <main className="doctors-main">

          {/* Results bar */}
          <div className="results-bar">
            <span className="results-text">
              Showing <strong>24 verified specialists</strong>
            </span>
            <div className="sort-controls">
              <span className="sort-label">Sort by:</span>
              <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="sidebar-select" style={{width: 'auto', padding: '6px 10px'}}>
                <option>Highest Rating</option>
                <option>Most Experience</option>
                <option>Lowest Fee</option>
              </select>
            </div>
          </div>

          {/* Cards grid */}
          <div className="doctors-grid">
            {filtered.map(doctor => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
            {filtered.length === 0 && (
              <div className="empty-state">
                😔 No doctors found for the selected filters.
              </div>
            )}
          </div>

          {/* Pagination */}
          <div className="pagination">
            <PagBtn label="‹" onClick={() => setCurrentPage(p => Math.max(1, p - 1))} />
            {[1, 2, 3].map(p => (
              <PagBtn key={p} label={p} active={currentPage === p} onClick={() => setCurrentPage(p)} />
            ))}
            <span className="pagination-dots">…</span>
            <PagBtn label={8} active={currentPage === 8} onClick={() => setCurrentPage(8)} />
            <PagBtn label="›" onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
