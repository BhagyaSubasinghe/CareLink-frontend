import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import jsPDF from 'jspdf';
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

  const generatePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    let yPosition = 20;

    // Add header
    doc.setFontSize(24);
    doc.setTextColor(31, 78, 121); // CareLink blue
    doc.text('CareLink', 20, yPosition);
    yPosition += 15;

    // Add title
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text('Appointment Confirmation', 20, yPosition);
    yPosition += 12;

    // Add confirmation date
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Confirmation Date: ${new Date().toLocaleDateString()}`, 20, yPosition);
    yPosition += 8;

    // Divider line
    doc.setDrawColor(200, 200, 200);
    doc.line(20, yPosition, pageWidth - 20, yPosition);
    yPosition += 10;

    // Patient Information Section
    doc.setFontSize(12);
    doc.setTextColor(31, 78, 121);
    doc.text('Patient Information', 20, yPosition);
    yPosition += 8;

    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text(`Patient Name: ${patientName}`, 20, yPosition);
    yPosition += 6;
    doc.text(`Queue Position: Patient No. ${queueNumber}`, 20, yPosition);
    yPosition += 10;

    // Appointment Details Section
    doc.setFontSize(12);
    doc.setTextColor(31, 78, 121);
    doc.text('Appointment Details', 20, yPosition);
    yPosition += 8;

    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text(`Practitioner: ${doctorName}`, 20, yPosition);
    yPosition += 6;
    doc.text(`Specialty: ${specialty}`, 20, yPosition);
    yPosition += 6;
    doc.text(`Date: ${formatDate(selectedDate)}`, 20, yPosition);
    yPosition += 6;
    doc.text(`Time: ${selectedTime}`, 20, yPosition);
    yPosition += 6;
    doc.text(`Duration: 45 minutes`, 20, yPosition);
    yPosition += 6;
    doc.text(`Visit Type: ${visitTypeLabel}`, 20, yPosition);
    yPosition += 10;

    // Location Section
    doc.setFontSize(12);
    doc.setTextColor(31, 78, 121);
    doc.text('Clinic Location', 20, yPosition);
    yPosition += 8;

    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text(`Clinic: ${clinicName}`, 20, yPosition);
    yPosition += 6;
    doc.text(`Address: ${clinicLocation}`, 20, yPosition);
    yPosition += 10;

    // Important Notes Section
    doc.setFontSize(12);
    doc.setTextColor(31, 78, 121);
    doc.text('Important Information', 20, yPosition);
    yPosition += 8;

    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    const notes = [
      '• Please arrive 15 minutes early for check-in',
      '• Bring your valid ID',
      '• If you need to cancel or reschedule, please do so at least 24 hours before your appointment',
      '• For telemedicine appointments, ensure you have a stable internet connection',
    ];

    notes.forEach(note => {
      if (yPosition > pageHeight - 30) {
        doc.addPage();
        yPosition = 20;
      }
      const splitText = doc.splitTextToSize(note, pageWidth - 40);
      doc.text(splitText, 20, yPosition);
      yPosition += splitText.length * 6;
    });

    yPosition += 5;

    // Footer
    doc.setFontSize(9);
    doc.setTextColor(150, 150, 150);
    doc.text('This is an automatically generated document from CareLink', 20, pageHeight - 10);

    // Generate filename
    const fileName = `CareLink_Appointment_${patientName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(fileName);
  };

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
            <button type="button" className="secondary-action" onClick={generatePDF}>Download Summary</button>
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
