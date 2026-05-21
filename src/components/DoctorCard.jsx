import React from 'react';
import { FiStar } from 'react-icons/fi';
import { BsBag } from 'react-icons/bs';

export default function DoctorCard({ doctor }) {
  return (
    <div className="bg-white rounded-[16px] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-shadow duration-300 border border-gray-100 flex flex-col h-full">
      <div className="flex items-start justify-between mb-5">
        <div className="flex items-start space-x-4">
          <img
            src={doctor.image}
            alt={doctor.name}
            className="w-[84px] h-[84px] rounded-[14px] object-cover bg-gray-100"
          />
          <div>
            <h3 className="text-[17px] font-bold text-gray-900 mb-1">{doctor.name}</h3>
            <p className="text-[14px] font-medium text-[#059669] mb-2">{doctor.specialty}</p>
            <div className="flex items-center text-[13px] text-gray-500 font-medium">
              <BsBag className="mr-1.5 text-gray-400" size={14} />
              {doctor.experience}
            </div>
          </div>
        </div>
        <div className="flex items-center bg-blue-50 text-[#2563eb] px-2 py-1 rounded-[6px] font-semibold text-sm">
          <FiStar fill="currentColor" size={13} className="mr-1" />
          {doctor.rating}
        </div>
      </div>

      <div className="bg-[#f5f7fb] rounded-[12px] p-4 mb-5">
        <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-3">Next Available Slots</p>
        <div className="grid grid-cols-3 gap-2">
          {doctor.nextSlots.map((slot, index) => (
            <div
              key={index}
              className={`flex flex-col items-center justify-center p-2 rounded-[8px] bg-white border border-gray-100 ${
                slot.time === 'Full' ? 'opacity-50' : ''
              }`}
            >
              <span className="text-[11px] text-gray-500 font-medium uppercase mb-0.5">{slot.day}</span>
              <span className={`text-[13px] font-semibold ${slot.time === 'Full' ? 'text-gray-400' : 'text-gray-900'}`}>
                {slot.time}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-auto">
        <button className="w-full bg-[#1e40af] hover:bg-[#1d4ed8] text-white font-medium py-2.5 rounded-[8px] transition-colors text-[14px]">
          Check Availability
        </button>
      </div>
    </div>
  );
}
