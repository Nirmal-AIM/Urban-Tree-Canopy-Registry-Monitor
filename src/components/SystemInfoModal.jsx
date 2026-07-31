import React from 'react';
import { ShieldCheck, Cpu, Database, Satellite, CheckCircle2, X, Download } from 'lucide-react';

export default function SystemInfoModal({ onClose, isDarkMode }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className={`rounded-3xl max-w-2xl w-full p-6 space-y-5 shadow-2xl border ${
        isDarkMode ? 'bg-gray-900 border-gray-800 text-white' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        <div className={`flex justify-between items-center border-b pb-3 ${isDarkMode ? 'border-gray-800' : 'border-slate-200'}`}>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
              <ShieldCheck className="w-5 h-5" />
            </span>
            <div>
              <h3 className={`text-base font-extrabold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                PS69 Platform Architecture & Government Compliance
              </h3>
              <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-slate-500'}`}>
                Greater Visakhapatnam Municipal Corporation (GVMC) Forestry Telemetry System
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-slate-900 text-xl font-bold">&times;</button>
        </div>

        {/* System Specs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className={`p-3.5 rounded-2xl border ${isDarkMode ? 'bg-gray-950 border-gray-800' : 'bg-slate-50 border-slate-200'}`}>
            <span className="text-[10px] font-mono uppercase text-emerald-600 font-bold block">Satellite Band Source</span>
            <strong className={`text-sm block mt-0.5 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Sentinel-2 L2A (10m Resolution)</strong>
            <span className="text-[10px] text-gray-500">NIR (Band 8) & RED (Band 4)</span>
          </div>

          <div className={`p-3.5 rounded-2xl border ${isDarkMode ? 'bg-gray-950 border-gray-800' : 'bg-slate-50 border-slate-200'}`}>
            <span className="text-[10px] font-mono uppercase text-emerald-600 font-bold block">Legal Ratio Rule</span>
            <strong className={`text-sm block mt-0.5 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>1:10 Compensatory Quota</strong>
            <span className="text-[10px] text-gray-500">AP WALTA Act 2002 Mandate</span>
          </div>

          <div className={`p-3.5 rounded-2xl border ${isDarkMode ? 'bg-gray-950 border-gray-800' : 'bg-slate-50 border-slate-200'}`}>
            <span className="text-[10px] font-mono uppercase text-emerald-600 font-bold block">Escrow Fee Rate</span>
            <strong className={`text-sm block mt-0.5 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>₹2,000 / Sapling Deposit</strong>
            <span className="text-[10px] text-gray-500">Refundable on 80%+ Survival</span>
          </div>
        </div>

        {/* Key Problem Statement PS69 Solved Items */}
        <div className={`p-4 rounded-2xl border space-y-2 text-xs ${
          isDarkMode ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-200' : 'bg-emerald-50 border-emerald-200 text-emerald-900'
        }`}>
          <h4 className="font-extrabold flex items-center gap-1.5 text-sm">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Hackathon Problem Statement PS69 Requirements Fulfilled:
          </h4>
          <ul className="space-y-1.5 list-disc pl-5 text-[11px] leading-relaxed">
            <li><strong>Annual Net Canopy Change Tracking:</strong> Calculates trees planted minus trees felled across all 98 GVMC wards.</li>
            <li><strong>Digital Felling Permit & Replacement Registry:</strong> QR-verified logging of felling approvals and 1:10 replacement logs.</li>
            <li><strong>Interactive Multi-Spectral GIS Map:</strong> Leaflet & HTML5 Canvas dual-pane swipe slider for 2023 vs current year satellite comparison.</li>
            <li><strong>AI Evidence-Based Forestry Guidance:</strong> Generates automated policy directives for thermal hotspots and high-loss wards.</li>
            <li><strong>Community Adopt-A-Tree Hub:</strong> RWAs and citizens can request saplings and adopt municipal trees.</li>
          </ul>
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md text-xs"
          >
            Close System Architecture
          </button>
        </div>
      </div>
    </div>
  );
}
