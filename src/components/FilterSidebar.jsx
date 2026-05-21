import React from 'react';

export default function FilterSidebar() {
  return (
    <div className="bg-white rounded-[16px] p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-gray-100 sticky top-24">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-[17px] font-bold text-gray-900">Filters</h2>
        <button className="text-sm font-semibold text-[#2563eb] hover:underline">Reset</button>
      </div>

      {/* Department */}
      <div className="mb-6">
        <h3 className="text-[13px] font-semibold text-gray-900 mb-3">Department</h3>
        <div className="space-y-3">
          {['Cardiology', 'Pediatrics', 'Neurology', 'Orthopedics'].map((dept) => (
            <label key={dept} className="flex items-center space-x-3 cursor-pointer group">
              <input
                type="checkbox"
                defaultChecked={dept === 'Cardiology'}
                className="w-[18px] h-[18px] border-gray-300 rounded text-[#2563eb] focus:ring-[#2563eb] cursor-pointer"
              />
              <span className="text-[14px] text-gray-600 group-hover:text-gray-900 font-medium transition-colors">
                {dept}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Experience */}
      <div className="mb-6">
        <h3 className="text-[13px] font-semibold text-gray-900 mb-3">Experience</h3>
        <div className="relative">
          <select className="w-full appearance-none bg-[#f5f7fb] border border-transparent text-gray-700 py-2.5 pl-4 pr-10 rounded-[8px] text-[14px] font-medium focus:outline-none focus:ring-1 focus:ring-[#2563eb] focus:bg-white focus:border-[#2563eb] transition-all cursor-pointer">
            <option>All Experience Levels</option>
            <option>5+ Years</option>
            <option>10+ Years</option>
            <option>15+ Years</option>
            <option>20+ Years</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
          </div>
        </div>
      </div>

      {/* Location */}
      <div className="mb-6">
        <h3 className="text-[13px] font-semibold text-gray-900 mb-3">Location</h3>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <svg className="w-[18px] h-[18px] text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          </div>
          <input
            type="text"
            placeholder="City or Clinic Name"
            className="w-full bg-[#f5f7fb] border border-transparent text-gray-900 py-2.5 pl-10 pr-4 rounded-[8px] text-[14px] font-medium focus:outline-none focus:ring-1 focus:ring-[#2563eb] focus:bg-white focus:border-[#2563eb] transition-all placeholder:text-gray-400 placeholder:font-normal"
          />
        </div>
      </div>

      {/* Available Today */}
      <div className="flex items-center justify-between mt-2 pt-6 border-t border-gray-100">
        <span className="text-[14px] font-semibold text-gray-900">Available Today</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" className="sr-only peer" />
          <div className="w-10 h-[22px] bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-[18px] after:w-[18px] after:transition-all peer-checked:bg-[#2563eb]"></div>
        </label>
      </div>

    </div>
  );
}