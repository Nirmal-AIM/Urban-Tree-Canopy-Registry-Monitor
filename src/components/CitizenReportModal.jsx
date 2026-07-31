import React, { useState } from 'react';
import { Camera, Send, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { GVMC_WARDS } from '../data/gvmcWardsData';

export default function CitizenReportModal({ onClose, onSubmitReport, isDarkMode }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    wardNo: 18,
    landmark: 'Near AS Raja College Ground',
    incidentType: 'Illegal Tree Cutting without Permit QR',
    reporterName: '',
    phone: '',
    description: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className={`rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border transition-all ${
        isDarkMode ? 'bg-gray-900 border-gray-800 text-white' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        <div className={`flex justify-between items-center border-b pb-3 ${isDarkMode ? 'border-gray-800' : 'border-slate-200'}`}>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-amber-100 text-amber-800 border border-amber-300">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
            </span>
            <h3 className={`text-base font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Report Illegal Tree Cutting</h3>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-slate-900 text-lg">&times;</button>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-300">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Grievance Registered Successfully</h4>
            <p className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-slate-600'}`}>
              Complaint Ticket <strong className="text-emerald-600 font-mono font-bold">GVMC-CIT-2025-884</strong> has been dispatched to GVMC Zone Urban Forester.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3 text-xs">
            <div>
              <label className={`block font-semibold mb-1 ${isDarkMode ? 'text-gray-300' : 'text-slate-700'}`}>Select Ward</label>
              <select
                value={formData.wardNo}
                onChange={(e) => setFormData({ ...formData, wardNo: e.target.value })}
                className={`w-full border rounded-xl p-2.5 focus:outline-none focus:border-emerald-500 ${
                  isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                }`}
              >
                {GVMC_WARDS.map(w => (
                  <option key={w.wardNo} value={w.wardNo}>
                    Ward {w.wardNo}: {w.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={`block font-semibold mb-1 ${isDarkMode ? 'text-gray-300' : 'text-slate-700'}`}>Landmark / Street Address</label>
              <input
                type="text"
                required
                placeholder="e.g. Opposite AS Raja College / Near Siripuram Circle"
                value={formData.landmark}
                onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
                className={`w-full border rounded-xl p-2.5 focus:outline-none focus:border-emerald-500 ${
                  isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                }`}
              />
            </div>

            <div>
              <label className={`block font-semibold mb-1 ${isDarkMode ? 'text-gray-300' : 'text-slate-700'}`}>Incident Type</label>
              <select
                value={formData.incidentType}
                onChange={(e) => setFormData({ ...formData, incidentType: e.target.value })}
                className={`w-full border rounded-xl p-2.5 focus:outline-none focus:border-emerald-500 ${
                  isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                }`}
              >
                <option value="Illegal Tree Cutting without Permit QR">Unauthorized Tree Cutting (No Permit QR)</option>
                <option value="Compensatory Saplings Dried Up">Compensatory Saplings Dried / Neglected</option>
                <option value="Heavy Pruning of Mature Canopy">Unlawful Canopy Pruning</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={`block font-semibold mb-1 ${isDarkMode ? 'text-gray-300' : 'text-slate-700'}`}>Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="Full Name"
                  value={formData.reporterName}
                  onChange={(e) => setFormData({ ...formData, reporterName: e.target.value })}
                  className={`w-full border rounded-xl p-2.5 focus:outline-none focus:border-emerald-500 ${
                    isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                  }`}
                />
              </div>

              <div>
                <label className={`block font-semibold mb-1 ${isDarkMode ? 'text-gray-300' : 'text-slate-700'}`}>Mobile Number</label>
                <input
                  type="tel"
                  required
                  placeholder="10-digit mobile"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={`w-full border rounded-xl p-2.5 focus:outline-none focus:border-emerald-500 ${
                    isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                  }`}
                />
              </div>
            </div>

            <div className={`p-4 rounded-xl border border-dashed text-center cursor-pointer transition-colors ${
              isDarkMode ? 'bg-gray-950 border-gray-700 hover:border-emerald-500' : 'bg-slate-50 border-slate-300 hover:border-emerald-500'
            }`}>
              <Camera className="w-6 h-6 text-emerald-600 mx-auto mb-1" />
              <span className={`text-xs font-semibold block ${isDarkMode ? 'text-gray-300' : 'text-slate-700'}`}>Upload Photo Proof (GPS Auto-Geotagged)</span>
              <span className={`text-[10px] ${isDarkMode ? 'text-gray-400' : 'text-slate-500'}`}>Captures latitude, longitude, and timestamp metadata</span>
            </div>

            <div className="flex justify-end space-x-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-slate-500 hover:text-slate-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                Submit Grievance
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
