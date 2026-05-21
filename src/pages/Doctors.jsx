import React, { useState } from 'react';

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
  const good = rating >= 4.8;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      background: good ? '#ecfdf5' : '#fffbeb',
      color: good ? '#059669' : '#d97706',
      fontWeight: 700, fontSize: 12, borderRadius: 20, padding: '3px 9px',
      whiteSpace: 'nowrap',
    }}>
      ★ {rating.toFixed(1)}
    </span>
  );
};

const SlotChip = ({ day, time }) => {
  const full = time === 'Full';
  return (
    <div style={{
      border: `1px solid ${full ? '#fecaca' : '#e2e8f0'}`,
      borderRadius: 8, padding: '6px 8px', textAlign: 'center', minWidth: 64,
      background: full ? '#fff5f5' : '#f8fafc',
    }}>
      <div style={{ fontSize: 9, color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5 }}>{day}</div>
      <div style={{ fontSize: 12, fontWeight: 700, color: full ? '#ef4444' : '#1e293b', marginTop: 2 }}>{time}</div>
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
  <button onClick={onClick} style={{
    width: 34, height: 34, borderRadius: 7,
    border: `1.5px solid ${active ? '#3b82f6' : '#e2e8f0'}`,
    background: active ? '#3b82f6' : '#fff',
    color: active ? '#fff' : '#374151',
    fontWeight: active ? 700 : 500, fontSize: 13,
    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
    transition: 'all 0.15s',
  }}>
    {label}
  </button>
);

// ─── Doctor Card ─────────────────────────────────────────────────────────────

const DoctorCard = ({ doctor }) => (
  <div
    style={{
      background: '#fff', borderRadius: 14, border: '1px solid #e8edf5',
      padding: '18px 18px 14px', display: 'flex', flexDirection: 'column', gap: 12,
      boxShadow: '0 2px 10px rgba(0,0,0,0.05)', transition: 'box-shadow 0.2s, transform 0.2s',
    }}
    onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 28px rgba(59,130,246,0.13)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
    onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)'; e.currentTarget.style.transform = 'translateY(0)'; }}
  >
    {/* Header row */}
    <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
      <AvatarPlaceholder name={doctor.name} size={68} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 6 }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: 15, color: '#0f172a', lineHeight: 1.3 }}>{doctor.name}</div>
            <div style={{ fontSize: 12, color: '#3b82f6', fontWeight: 600, marginTop: 2 }}>{doctor.specialty}</div>
          </div>
          <RatingBadge rating={doctor.rating} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 7 }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
          </svg>
          <span style={{ fontSize: 11, color: '#64748b' }}>{doctor.experience}</span>
        </div>
      </div>
    </div>

    {/* Slots */}
    <div>
      <div style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 0.6, marginBottom: 7 }}>
        Next Available Slots
      </div>
      <div style={{ display: 'flex', gap: 7 }}>
        {doctor.nextSlots.map((s, i) => <SlotChip key={i} day={s.day} time={s.time} />)}
      </div>
    </div>

    {/* CTA */}
    <button
      style={{
        background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
        color: '#fff', border: 'none', borderRadius: 9,
        padding: '10px 0', fontWeight: 600, fontSize: 13,
        cursor: 'pointer', width: '100%', transition: 'opacity 0.15s',
      }}
      onMouseEnter={e => e.currentTarget.style.opacity = '0.87'}
      onMouseLeave={e => e.currentTarget.style.opacity = '1'}
    >
      Check Availability
    </button>
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
    <div style={{ fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif", background: '#f1f5fb', minHeight: '100vh' }}>

      {/* ── Blue Hero Banner ── */}
      <div style={{
        background: 'linear-gradient(120deg, #1e3a8a 0%, #2563eb 60%, #3b82f6 100%)',
        padding: '36px 48px 30px', color: '#fff',
      }}>
        <h1 style={{ fontSize: 30, fontWeight: 800, margin: 0, letterSpacing: -0.5 }}>
          Book Your Appointment
        </h1>
        <p style={{ margin: '8px 0 0', opacity: 0.82, fontSize: 14, maxWidth: 580 }}>
          Connect with our world-class specialists. Filter by expertise, experience, and location to find the right care for your needs.
        </p>
      </div>

      {/* ── Body: Sidebar + Grid ── */}
      <div style={{ display: 'flex', gap: 24, padding: '28px 48px 48px', maxWidth: 1280, margin: '0 auto' }}>

        {/* ── Sidebar ── */}
        <aside style={{
          width: 224, flexShrink: 0, background: '#fff',
          borderRadius: 14, border: '1px solid #e2e8f0',
          padding: '20px 18px', height: 'fit-content',
          boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
        }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
            <span style={{ fontWeight: 700, fontSize: 15, color: '#0f172a' }}>Filters</span>
            <button
              onClick={() => { setCheckedDepts([]); setExperience('All Experience Levels'); setLocation(''); setAvailableToday(false); }}
              style={{ fontSize: 12, color: '#3b82f6', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
            >
              Reset
            </button>
          </div>

          {/* Department */}
          <div style={{ marginBottom: 22 }}>
            <div style={sectionLabel}>Department</div>
            {DEPARTMENTS.map(dept => (
              <label key={dept} style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 9, cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={checkedDepts.includes(dept)}
                  onChange={() => toggleDept(dept)}
                  style={{ width: 15, height: 15, accentColor: '#3b82f6', cursor: 'pointer' }}
                />
                <span style={{ fontSize: 13, color: checkedDepts.includes(dept) ? '#1d4ed8' : '#374151', fontWeight: checkedDepts.includes(dept) ? 600 : 400 }}>
                  {dept}
                </span>
              </label>
            ))}
          </div>

          {/* Experience */}
          <div style={{ marginBottom: 22 }}>
            <div style={sectionLabel}>Experience</div>
            <select
              value={experience}
              onChange={e => setExperience(e.target.value)}
              style={selectStyle}
            >
              {EXPERIENCE_LEVELS.map(l => <option key={l}>{l}</option>)}
            </select>
          </div>

          {/* Location */}
          <div style={{ marginBottom: 22 }}>
            <div style={sectionLabel}>Location</div>
            <div style={{ position: 'relative' }}>
              <svg style={{ position: 'absolute', left: 9, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
                width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
              </svg>
              <input
                placeholder="City or Clinic Name"
                value={location}
                onChange={e => setLocation(e.target.value)}
                style={{ ...selectStyle, paddingLeft: 28 }}
              />
            </div>
          </div>

          {/* Available Today */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 13, color: '#374151', fontWeight: 500 }}>Available Today</span>
            <Toggle checked={availableToday} onChange={setAvailableToday} />
          </div>
        </aside>

        {/* ── Main Content ── */}
        <main style={{ flex: 1, minWidth: 0 }}>

          {/* Results bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
            <span style={{ fontSize: 13, color: '#64748b' }}>
              Showing <strong style={{ color: '#0f172a' }}>24 verified specialists</strong>
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 12, color: '#64748b' }}>Sort by:</span>
              <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{ ...selectStyle, width: 'auto', padding: '6px 10px' }}>
                <option>Highest Rating</option>
                <option>Most Experience</option>
                <option>Lowest Fee</option>
              </select>
            </div>
          </div>

          {/* Cards 2-col grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, marginBottom: 28 }}>
            {filtered.map(doctor => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
            {filtered.length === 0 && (
              <div style={{
                gridColumn: '1 / -1', textAlign: 'center', padding: '60px 20px',
                background: '#fff', borderRadius: 14, color: '#94a3b8', fontSize: 15,
              }}>
                😔 No doctors found for the selected filters.
              </div>
            )}
          </div>

          {/* Pagination */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 5 }}>
            <PagBtn label="‹" onClick={() => setCurrentPage(p => Math.max(1, p - 1))} />
            {[1, 2, 3].map(p => (
              <PagBtn key={p} label={p} active={currentPage === p} onClick={() => setCurrentPage(p)} />
            ))}
            <span style={{ padding: '0 2px', color: '#cbd5e1', fontWeight: 700, fontSize: 14 }}>…</span>
            <PagBtn label={8} active={currentPage === 8} onClick={() => setCurrentPage(8)} />
            <PagBtn label="›" onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} />
          </div>
        </main>
      </div>
    </div>
  );
}

// ─── Shared style objects ─────────────────────────────────────────────────────
const sectionLabel = {
  fontSize: 10, fontWeight: 700, color: '#64748b',
  textTransform: 'uppercase', letterSpacing: 0.7, marginBottom: 10,
};

const selectStyle = {
  width: '100%', padding: '8px 10px', borderRadius: 8,
  border: '1.5px solid #e2e8f0', fontSize: 12, color: '#374151',
  background: '#fff', cursor: 'pointer', outline: 'none', boxSizing: 'border-box',
};
