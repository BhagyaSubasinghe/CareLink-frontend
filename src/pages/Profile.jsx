import React from 'react';

export default function Profile() {
  return (
    <div className="max-w-xl mx-auto bg-white shadow rounded p-6">
      <h2 className="text-2xl font-semibold mb-4">Profile</h2>
      <div className="space-y-3">
        <div>
          <div className="text-sm text-slate-500">Name</div>
          <div className="font-medium">John Doe</div>
        </div>
        <div>
          <div className="text-sm text-slate-500">Email</div>
          <div className="font-medium">johndoe@example.com</div>
        </div>
        <div>
          <div className="text-sm text-slate-500">Uploaded Records</div>
          <div className="mt-2 grid grid-cols-1 gap-2">
            <div className="p-3 bg-slate-50 rounded">No records uploaded — UI placeholder</div>
          </div>
        </div>
      </div>
    </div>
  );
}
