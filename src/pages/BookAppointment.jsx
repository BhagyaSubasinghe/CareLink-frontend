import React, { useState } from 'react';

export default function BookAppointment() {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    alert(`Appointment requested for ${date} at ${time}`);
  }

  return (
    <div className="max-w-md mx-auto bg-white shadow rounded p-6">
      <h2 className="text-2xl font-semibold mb-4">Book Appointment</h2>
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
