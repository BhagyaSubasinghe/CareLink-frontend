import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function BookAppointment() {
  const location = useLocation();
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [selectedDay, setSelectedDay] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const doctor = params.get('doctor') || '';
    const day = params.get('day') || '';
    const selectedTime = params.get('time') || '';

    setDoctorName(doctor);
    setSelectedDay(day);
    if (selectedTime) {
      setTime(selectedTime);
    }
  }, [location.search]);

  function handleSubmit(e) {
    e.preventDefault();
    alert(`Appointment requested for ${date} at ${time}`);
  }

  return (
    <div className="max-w-md mx-auto bg-white shadow rounded p-6">
      <h2 className="text-2xl font-semibold mb-4">Book Appointment</h2>
      {(doctorName || selectedDay) && (
        <div className="mb-4 rounded border border-blue-100 bg-blue-50 p-3 text-sm text-slate-700">
          {doctorName && <div><strong>Doctor:</strong> {doctorName}</div>}
          {selectedDay && <div><strong>Selected slot:</strong> {selectedDay}{time ? ` at ${time}` : ''}</div>}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm">Select date</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required className="w-full border rounded px-3 py-2 mt-1" />
        </div>
        <div>
          <label className="block text-sm">Select time</label>
          <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required className="w-full border rounded px-3 py-2 mt-1" />
        </div>
        <div>
          <label className="block text-sm">Notes (optional)</label>
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} className="w-full border rounded px-3 py-2 mt-1" />
        </div>
        <div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded">Confirm</button>
        </div>
      </form>
    </div>
  );
}
