import React from 'react';
import AppointmentCard from '../components/AppointmentCard';

const sample = [
  { id: 1, date: '2026-05-10', time: '09:00 AM', doctor: 'Dr. Alice Smith', status: 'confirmed' },
  { id: 2, date: '2026-05-15', time: '11:30 AM', doctor: 'Dr. Bob Lee', status: 'pending' },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <section>
        <h2 className="font-medium mb-2">Upcoming appointments</h2>
        <div className="grid gap-3">
          {sample.map((s) => (<AppointmentCard key={s.id} appt={s} />))}
        </div>
      </section>

      <section>
        <h2 className="font-medium">Quick actions</h2>
        <div className="flex gap-3 mt-2">
          <a href="/book" className="bg-blue-600 text-white px-3 py-2 rounded">Book</a>
          <a href="/doctors" className="bg-slate-100 px-3 py-2 rounded">View Doctors</a>
        </div>
      </section>
    </div>
  );
}
