import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './BookAppointment.css';

const VISIT_TYPES = [
  { id: 'in-person', label: 'In-Person' },
  { id: 'telemedicine', label: 'Telemedicine' },
];

const SLOT_OPTIONS = ['09:00 AM', '10:30 AM', '11:15 AM', '02:00 PM', '03:45 PM', '04:30 PM'];

const SPECIALTIES = [
  'Interventional Cardiology & Stenting',
  'Complex Coronary Interventions',
  'Heart Failure Management',
  'Preventive Cardiovascular Medicine',
];

const EDUCATION = [
  {
    school: 'Johns Hopkins University',
    detail: 'Doctor of Medicine, 2012 - 2016',
  },
  {
    school: 'Mayo Clinic College of Medicine',
    detail: 'Residency in Cardiology, 2016 - 2020',
  },
  {
    school: 'Fellow of the American College of Cardiology',
    detail: 'FACC Certification, 2021',
  },
];

const REVIEWS = [
  {
    initials: 'JW',
    name: 'James Wilson',
    note:
      'Dr. Mitchell was incredibly thorough and patient. She explained everything in a way that was easy to understand and made me feel at ease before the procedure.',
    time: '2 days ago',
  },
  {
    initials: 'MR',
    name: 'Maria Rodriguez',
    note:
      'Excellent bedside manner. I felt much more confident managing my heart health after our consultation. Highly recommended.',
    time: '1 week ago',
  },
];

function getInitials(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part[0])
    .join('')
    .toUpperCase();
}

function buildDateOptions() {
  const today = new Date();
  return Array.from({ length: 5 }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() + index);
    return date;
  });
}

function formatMonthLabel(date) {
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

function formatDayLabel(date) {
  return date.toLocaleDateString('en-US', { weekday: 'short' }).slice(0, 3);
}

function formatDateNumber(date) {
  return date.getDate();
}

function toISODate(date) {
  return date.toISOString().split('T')[0];
}

export default function BookAppointment() {
  const location = useLocation();
  const navigate = useNavigate();
  const [doctorName, setDoctorName] = useState('Dr. Sarah Mitchell');
  const [specialty, setSpecialty] = useState('Senior Cardiologist, MD, FACC');
  const [selectedVisitType, setSelectedVisitType] = useState('in-person');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const dateOptions = useMemo(() => buildDateOptions(), []);
  const monthLabel = useMemo(() => formatMonthLabel(dateOptions[0]), [dateOptions]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const doctor = params.get('doctor');
    const incomingSpecialty = params.get('specialty');
    const day = params.get('day');
    const time = params.get('time');

    if (doctor) {
      setDoctorName(doctor);
    }

    if (incomingSpecialty) {
      setSpecialty(incomingSpecialty);
    }

    if (time) {
      setSelectedTime(time);
    }

    if (day) {
      const matchedDate = dateOptions.find(date => formatDayLabel(date).toUpperCase() === day.toUpperCase());
      if (matchedDate) {
        setSelectedDate(toISODate(matchedDate));
      }
    }
  }, [location.search, dateOptions]);

  useEffect(() => {
    if (!selectedDate && dateOptions.length > 0) {
      setSelectedDate(toISODate(dateOptions[0]));
    }
    if (!selectedTime) {
      setSelectedTime(SLOT_OPTIONS[0]);
    }
  }, [dateOptions, selectedDate, selectedTime]);

  function handleSubmit(e) {
    e.preventDefault();
    const chosenDate = selectedDate || toISODate(dateOptions[0]);
    navigate('/appointment-success', {
      state: {
        doctorName,
        specialty,
        selectedVisitType,
        selectedDate: chosenDate,
        selectedTime,
        patientName: fullName,
        queueNumber: 3,
        clinicName: 'CareLink Main Campus',
        clinicLocation: 'Medical Tower, Level 4',
      },
    });
  }

  const queueNumber = 3;
  const selectedDateLabel = selectedDate
    ? new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
    : '';

  return (
    <div className="appointment-page">
      <div className="appointment-shell">
        <div className="appointment-main">
          <div className="doctor-hero-card">
            <div className="doctor-profile-badge">
              <div className="doctor-avatar-circle">{getInitials(doctorName)}</div>
              <span className="verified-pill">Verified</span>
            </div>

            <div className="doctor-copy">
              <div className="doctor-top-row">
                <div>
                  <h1>{doctorName}</h1>
                  <p>{specialty}</p>
                </div>
                <button type="button" className="share-button" aria-label="Share doctor profile">
                  ↗
                </button>
              </div>

              <div className="doctor-meta-row">
                <span>★ 4.9 (1,248 Reviews)</span>
                <span>10+ Years Exp.</span>
                <span>FACC</span>
              </div>

              <p className="doctor-summary">
                Dr. Mitchell is a board-certified cardiologist specializing in interventional cardiology and heart failure management. She is
                recognized globally for her contributions to minimally invasive cardiac procedures and patient-centered rehabilitation programs.
              </p>

              <div className="doctor-tags">
                <span>Heart Surgery</span>
                <span>Hypertension</span>
                <span>Diagnostics</span>
              </div>
            </div>
          </div>

          <div className="info-grid">
            <section className="info-panel">
              <div className="panel-title">Specialities</div>
              <ul className="bullet-list">
                {SPECIALTIES.map(item => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="info-panel">
              <div className="panel-title">Education</div>
              <div className="education-list">
                {EDUCATION.map(item => (
                  <div key={item.school} className="education-item">
                    <strong>{item.school}</strong>
                    <span>{item.detail}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <section className="reviews-panel">
            <div className="panel-header-row">
              <div className="panel-title">Patient Reviews</div>
              <button type="button" className="view-all-button">View All</button>
            </div>

            <div className="review-list">
              {REVIEWS.map(review => (
                <article key={review.name} className="review-card">
                  <div className="review-avatar">{review.initials}</div>
                  <div className="review-content">
                    <div className="review-topline">
                      <strong>{review.name}</strong>
                      <span>{review.time}</span>
                    </div>
                    <div className="review-stars">★★★★★</div>
                    <p>{review.note}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>

        <aside className="booking-panel">
          <div className="booking-header">
            <h2>Book an Appointment</h2>
            <p>Available today and next seven days</p>
          </div>

          <div className="booking-section">
            <div className="section-label">Visit Type</div>
            <div className="segmented-control">
              {VISIT_TYPES.map(type => (
                <button
                  key={type.id}
                  type="button"
                  className={`segment-button ${selectedVisitType === type.id ? 'active' : ''}`}
                  onClick={() => setSelectedVisitType(type.id)}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          <div className="booking-section">
            <div className="section-row">
              <div className="section-label">Select Date</div>
              <span className="section-hint">{monthLabel}</span>
            </div>
            <div className="date-grid">
              {dateOptions.map(date => {
                const isoDate = toISODate(date);
                const active = selectedDate === isoDate;
                return (
                  <button
                    key={isoDate}
                    type="button"
                    className={`date-card ${active ? 'active' : ''}`}
                    onClick={() => setSelectedDate(isoDate)}
                  >
                    <span>{formatDayLabel(date)}</span>
                    <strong>{formatDateNumber(date)}</strong>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="booking-section">
            <div className="section-row">
              <div className="section-label">Available Time Slots</div>
              <span className="section-hint">Select one</span>
            </div>
            <div className="time-grid">
              {SLOT_OPTIONS.map(slot => {
                const active = selectedTime === slot;
                return (
                  <button
                    key={slot}
                    type="button"
                    className={`time-slot ${active ? 'active' : ''}`}
                    onClick={() => setSelectedTime(slot)}
                  >
                    {slot}
                  </button>
                );
              })}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="booking-form">
            <div className="booking-section">
              <div className="section-label">Patient Details</div>
              <div className="form-stack">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  required
                />
                <div className="form-grid">
                  <input
                    type="number"
                    placeholder="Age"
                    value={age}
                    onChange={e => setAge(e.target.value)}
                    min="0"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                  />
                </div>
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="queue-card">
              <span>Queue Position</span>
              <strong>Patient No. {queueNumber}</strong>
            </div>

            <button type="submit" className="confirm-button">
              Confirm Appointment
            </button>

            <div className="security-note">Secure & encrypted booking</div>
          </form>
        </aside>
      </div>

      <div className="appointment-summary-strip">
        <span>
          {doctorName} · {selectedDateLabel || 'Choose a date'} · {selectedTime || 'Choose a time'}
        </span>
        <span>{selectedVisitType === 'in-person' ? 'In-Person' : 'Telemedicine'}</span>
      </div>
    </div>
  );
}
