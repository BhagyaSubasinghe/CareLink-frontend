import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './AppointmentSuccess.css';

function formatDate(value) {
  if (!value) return 'Monday, Oct 24';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });
}

function SuccessCard({ label, value, icon }) {
  return (
    <div className="success-info-card">
      <div className="success-info-icon">{icon}</div>
      <div>
        <div className="success-info-label">{label}</div>
        <div className="success-info-value">{value}</div>
      </div>
    </div>
  );
}

export default function AppointmentSuccess() {
  const location = useLocation();
  const {
    doctorName = 'Dr. Sarah Mitchell',
    specialty = 'Senior Cardiologist',
    selectedDate = '2024-10-24',
    selectedTime = '09:30 AM',
    selectedVisitType = 'in-person',
    patientName = 'Patient',
    queueNumber = 3,
    clinicName = 'CareLink Main Campus',
    clinicLocation = 'Medical Tower, Level 4',
  } = location.state || {};

  const visitTypeLabel = selectedVisitType === 'telemedicine' ? 'Telemedicine' : 'In-Person';

  return (
    <div className="success-page">
      <div className="success-shell">
        <section className="success-left-panel">
          <div className="success-checkmark">✓</div>
          <h1>Success!</h1>
          <p>Your appointment is confirmed and added to our clinical system.</p>
        </section>

        <section className="success-right-panel">
          <div className="success-header-row">
            <div>
              <h2>Appointment Details</h2>
              <p>Queue Position: Patient No. {queueNumber}</p>
            </div>
            <span className="confirmed-pill">Confirmed</span>
          </div>

          <div className="success-divider" />

          <div className="success-details-grid">
            <SuccessCard
              label="Practitioner"
              value={doctorName}
              icon="👤"
            />
            <SuccessCard
              label="Location"
              value={`${clinicName}\n${clinicLocation}`}
              icon="📍"
            />
            <SuccessCard
              label="Date"
              value={formatDate(selectedDate)}
              icon="🗓"
            />
            <SuccessCard
              label="Time"
              value={`${selectedTime}\nExpected Duration: 45m`}
              icon="⏰"
            />
          </div>

          <div className="success-map-card" aria-hidden="true">
            <div className="map-buildings">
              <div className="building building-large" />
              <div className="building building-medium" />
              <div className="building building-small" />
              <div className="map-pin">⌖</div>
            </div>
            <div className="map-caption">Clinic view and arrival point</div>
            <button type="button" className="map-button">Get Directions</button>
          </div>

          <div className="success-actions">
            <button type="button" className="primary-action">Add to Calendar</button>
            <button type="button" className="secondary-action">Download Summary</button>
            <Link to="/doctors" className="outline-action">Return Home</Link>
          </div>

          <div className="important-note">
            <div className="note-icon">i</div>
            <div className="note-text">
              <strong>Important Information</strong>
              <span>Please arrive 15 minutes early for check-in and bring your valid ID.</span>
            </div>
            <button type="button" className="faqs-link">Read FAQs</button>
          </div>
        </section>
      </div>

      <div className="success-footer-strip">
        <span>{patientName}</span>
        <span>{visitTypeLabel}</span>
      </div>
    </div>
  );
}
