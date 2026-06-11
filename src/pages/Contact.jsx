import React, { useState } from 'react';
import { Phone, Mail, MapPin, Navigation, Clock, ChevronDown } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const departments = [
    'General Inquiry',
    'Appointment Support',
    'Billing & Payments',
    'Medical Records',
    'Feedback',
  ];

  const locations = [
    {
      name: 'CareLink Main Campus',
      address: '123 Healthcare Plaza, Medical District, NY 10001',
      status: 'Open 24/7',
      statusColor: 'bg-emerald-100 text-emerald-700',
    },
    {
      name: 'CareLink Westside Clinic',
      address: '456 West River Dr, Riverside, NY 10023',
      status: '8AM - 8PM',
      statusColor: 'bg-slate-100 text-slate-600',
    },
    {
      name: 'CareLink Pediatric Center',
      address: '88 Kids Care Rd, Medical City, NY 10045',
      status: '9AM - 5PM',
      statusColor: 'bg-slate-100 text-slate-600',
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', phone: '', department: '', message: '' });
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fbff] font-sans">
      
      {/* Hero Section */}
      <div className="w-full bg-gradient-to-b from-[#e3f0fc] to-[#f8fbff] pt-16 pb-12 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-[#003399] tracking-tight mb-4">
          Get in Touch
        </h1>
        <p className="max-w-2xl mx-auto text-sm md:text-base text-slate-600 leading-relaxed">
          Your health and well-being are our top priorities. Whether you have a question
          about our services, need to schedule an appointment, or require billing
          assistance, our dedicated team is here to support you every step of the way.
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Contact Form */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-800 mb-8">Send us a Message</h2>

            {submitted && (
              <div className="mb-6 bg-emerald-50 text-emerald-700 px-4 py-3 rounded-lg text-sm font-medium border border-emerald-200">
                ✓ Message sent successfully! We'll be in touch soon.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name & Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-[#003399] mb-2 uppercase tracking-wide">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#003399] focus:ring-2 focus:ring-blue-100 text-sm text-slate-700 placeholder-slate-400 transition"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#003399] mb-2 uppercase tracking-wide">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#003399] focus:ring-2 focus:ring-blue-100 text-sm text-slate-700 placeholder-slate-400 transition"
                    required
                  />
                </div>
              </div>

              {/* Phone & Department Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-[#003399] mb-2 uppercase tracking-wide">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#003399] focus:ring-2 focus:ring-blue-100 text-sm text-slate-700 placeholder-slate-400 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#003399] mb-2 uppercase tracking-wide">
                    Department
                  </label>
                  <div className="relative">
                    <select
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      className="w-full appearance-none px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#003399] focus:ring-2 focus:ring-blue-100 text-sm text-slate-700 bg-white transition"
                    >
                      <option value="">Select Department</option>
                      {departments.map((dept) => (
                        <option key={dept} value={dept}>
                          {dept}
                        </option>
                      ))}
                    </select>
                    <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-bold text-[#003399] mb-2 uppercase tracking-wide">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  placeholder="How can we help you today?"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#003399] focus:ring-2 focus:ring-blue-100 text-sm text-slate-700 placeholder-slate-400 resize-none transition"
                  required
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="bg-[#003399] hover:bg-[#002266] text-white font-bold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 w-full sm:w-auto"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: Contact Cards */}
          <div className="space-y-6">
            
            {/* Quick Contact Card */}
            <div className="bg-[#003a9f] rounded-xl p-6 text-white shadow-lg">
              <h3 className="text-lg font-bold mb-6">Quick Contact</h3>
              
              <div className="space-y-5">
                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="border border-white/20 p-2.5 rounded-full flex-shrink-0 flex items-center justify-center bg-white/10">
                    <Phone size={16} />
                  </div>
                  <div>
                    <p className="text-xs text-blue-200 font-medium mb-1">24/7 Helpline</p>
                    <p className="font-bold text-sm tracking-wide">1-800-CARE-LINK</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="border border-white/20 p-2.5 rounded-full flex-shrink-0 flex items-center justify-center bg-white/10">
                    <Mail size={16} />
                  </div>
                  <div>
                    <p className="text-xs text-blue-200 font-medium mb-1">Email Support</p>
                    <p className="font-bold text-sm tracking-wide">contact@carelink.health</p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="border border-white/20 p-2.5 rounded-full flex-shrink-0 flex items-center justify-center bg-white/10">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <p className="text-xs text-blue-200 font-medium mb-1">Physical Address</p>
                    <p className="font-bold text-sm leading-snug">
                      123 Healthcare Plaza,<br />Medical District, NY
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Department Directory */}
            <div className="bg-[#eef3fb] rounded-xl p-6 border border-blue-100 shadow-sm">
              <h3 className="text-base font-bold text-[#003399] mb-4">Department Directory</h3>
              
              <div className="space-y-1 divide-y divide-blue-200">
                <div className="flex justify-between items-center py-3">
                  <span className="text-sm font-semibold text-slate-800">Emergency</span>
                  <span className="text-sm font-bold text-red-600">911</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-sm font-semibold text-[#003399]">Pharmacy</span>
                  <span className="text-sm font-bold text-[#003399]">Ext. 402</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-sm font-semibold text-[#003399]">Laboratory</span>
                  <span className="text-sm font-bold text-[#003399]">Ext. 515</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-sm font-semibold text-[#003399]">Billing Dept.</span>
                  <span className="text-sm font-bold text-[#003399]">Ext. 209</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Locations Section */}
      <div className="bg-white w-full py-16 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#003399] mb-2">Our Locations</h2>
            <p className="text-slate-600">Find a CareLink facility near you.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Map Placeholder */}
            <div className="bg-gradient-to-br from-[#8C98A5] to-[#6B7A8F] rounded-xl flex items-center justify-center min-h-96 relative overflow-hidden shadow-lg">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
              </div>
              
              <div className="relative z-10 text-center">
                <MapPin size={48} className="text-white mx-auto mb-4 opacity-80" />
                <p className="text-white font-semibold text-lg">Interactive Map</p>
                <p className="text-blue-100 text-sm mt-2">(Click to view full map)</p>
              </div>

              {/* Floating action buttons */}
              <div className="absolute right-6 top-1/2 -translate-y-1/2 space-y-3 z-20">
                <button className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/40 flex items-center justify-center hover:bg-white/30 transition text-white hover:scale-110 duration-200">
                  <Navigation size={18} />
                </button>
                <button className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/40 flex items-center justify-center hover:bg-white/30 transition text-white hover:scale-110 duration-200">
                  <MapPin size={18} />
                </button>
                <button className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/40 flex items-center justify-center hover:bg-white/30 transition text-white hover:scale-110 duration-200">
                  <Phone size={18} />
                </button>
              </div>
            </div>

            {/* Location Cards */}
            <div className="space-y-4">
              {locations.map((location, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-bold text-slate-800 text-base">{location.name}</h3>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ${location.statusColor}`}>
                      {location.status}
                    </span>
                  </div>
                  <p className="text-slate-600 text-sm mb-4">{location.address}</p>
                  <div className="flex flex-wrap gap-4">
                    <button className="flex items-center gap-2 text-[#003399] text-sm font-bold hover:underline transition">
                      <Navigation size={14} /> Get Directions
                    </button>
                    <button className="flex items-center gap-2 text-[#003399] text-sm font-bold hover:underline transition">
                      <Clock size={14} /> View Hours
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Footer */}
      <div className="bg-[#003a9f] w-full py-10 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-white text-lg font-bold mb-1">Need immediate medical attention?</h2>
            <p className="text-blue-100 text-sm">Our emergency rooms are staffed with specialists 24/7.</p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <button className="flex-1 md:flex-none bg-white text-[#003399] font-bold text-sm px-6 py-2.5 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap">
              Find Nearest ER
            </button>
            <button className="flex-1 md:flex-none border-2 border-white text-white font-bold text-sm px-6 py-2.5 rounded-lg hover:bg-white/10 transition-colors whitespace-nowrap">
              Call Dispatch
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Contact;
