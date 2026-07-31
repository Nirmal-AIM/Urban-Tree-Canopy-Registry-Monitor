import React, { useState } from 'react';
import { Sparkles, BrainCircuit, ShieldAlert, Thermometer, Wind, RefreshCw } from 'lucide-react';

export default function AiInsightGenerator({ wards, citySummary, isDarkMode }) {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSimulateAi = () => {
    setIsGenerating(true);
    setTimeout(() => setIsGenerating(false), 800);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className={`rounded-3xl p-6 border flex flex-wrap items-center justify-between gap-4 transition-colors ${
        isDarkMode ? 'glass-panel-emerald border-emerald-500/30' : 'bg-emerald-50 border-emerald-300 shadow-sm'
      }`}>
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-2xl bg-emerald-500/20 text-emerald-700">
              <Sparkles className="w-5 h-5 text-amber-500" />
            </span>
            <div>
              <h2 className={`text-xl font-extrabold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                GVMC Urban Forestry AI Policy Engine
              </h2>
              <p className={`text-xs ${isDarkMode ? 'text-emerald-200' : 'text-slate-700 font-medium'}`}>
                Automated evidence-based decision matrix trained on Sentinel-2 NDVI satellite timeseries & heat island data.
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={handleSimulateAi}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md transition-all"
        >
          <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
          Re-Analyze Satellite Telemetry
        </button>
      </div>

      {/* AI Recommendation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Critical Canopy Loss Directive */}
        <div className={`glass-panel rounded-3xl p-6 border relative overflow-hidden flex flex-col justify-between ${
          isDarkMode ? 'border-red-500/30' : 'bg-white border-red-200 shadow-sm'
        }`}>
          <div>
            <div className="flex items-center space-x-2 text-red-600 mb-3">
              <ShieldAlert className="w-5 h-5" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider">Directive 01 • Legal Action</span>
            </div>
            <h3 className={`text-base font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Suspend Non-Essential Permits in Zone 8 & Zone 5
            </h3>
            <p className={`text-xs mt-2 leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-slate-700'}`}>
              AI analysis detects a <strong className="text-red-600 font-bold">-20.7% net canopy drop</strong> in Ward 62 (Gajuwaka) and <strong className="text-red-600 font-bold">-25.7%</strong> in Ward 29 (Jagadamba).
            </p>
          </div>

          <div className={`mt-4 pt-3 border-t text-[11px] ${
            isDarkMode ? 'border-gray-800 text-gray-400' : 'border-slate-200 text-slate-600'
          }`}>
            <strong>Recommended Policy Action:</strong> Enforce mandatory 100% moratorium on commercial felling permits until 1:10 replacement quota is fulfilled.
          </div>
        </div>

        {/* Card 2: Urban Heat Island Mitigation */}
        <div className={`glass-panel rounded-3xl p-6 border relative overflow-hidden flex flex-col justify-between ${
          isDarkMode ? 'border-amber-500/30' : 'bg-white border-amber-200 shadow-sm'
        }`}>
          <div>
            <div className="flex items-center space-x-2 text-amber-600 mb-3">
              <Thermometer className="w-5 h-5" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider">Directive 02 • Thermal Mitigation</span>
            </div>
            <h3 className={`text-base font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Target High-Heat Commercial Corridors
            </h3>
            <p className={`text-xs mt-2 leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-slate-700'}`}>
              Jagadamba Junction records extreme surface temperature (<strong className="text-amber-600 font-bold">37.8°C</strong>) due to low NDVI (0.19).
            </p>
          </div>

          <div className={`mt-4 pt-3 border-t text-[11px] ${
            isDarkMode ? 'border-gray-800 text-gray-400' : 'border-slate-200 text-slate-600'
          }`}>
            <strong>Recommended Policy Action:</strong> Deploy 1,400 dense shade tree saplings along Poorna Market approach roads and multi-level parking fringes.
          </div>
        </div>

        {/* Card 3: Cyclone Resilient Tree Species Matrix */}
        <div className={`glass-panel rounded-3xl p-6 border relative overflow-hidden flex flex-col justify-between ${
          isDarkMode ? 'border-emerald-500/30' : 'bg-white border-emerald-200 shadow-sm'
        }`}>
          <div>
            <div className="flex items-center space-x-2 text-emerald-600 mb-3">
              <Wind className="w-5 h-5" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider">Directive 03 • Species Selection</span>
            </div>
            <h3 className={`text-base font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Deploy Deep-Rooted Coastal Species
            </h3>
            <p className={`text-xs mt-2 leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-slate-700'}`}>
              Visakhapatnam cyclone history (Hudhud 2014) requires deep-rooted, wind-resistant species for avenue plantations.
            </p>
          </div>

          <div className={`mt-4 pt-3 border-t text-[11px] ${
            isDarkMode ? 'border-gray-800 text-gray-400' : 'border-slate-200 text-slate-600'
          }`}>
            <strong>Recommended Species:</strong> Neem (Azadirachta Indica), Copper Pod (Peltophorum), Indian Beech (Pongamia Pinnata).
          </div>
        </div>
      </div>

      {/* Detailed Action Plan Matrix Table */}
      <div className={`glass-panel rounded-3xl p-6 border space-y-4 ${
        isDarkMode ? 'border-gray-800' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        <h3 className={`text-base font-bold flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
          <BrainCircuit className="w-5 h-5 text-emerald-600" />
          AI Priority Urban Plantation Plan (GVMC Wards)
        </h3>

        <div className="space-y-3">
          {wards.slice(0, 5).map((w, idx) => (
            <div key={w.wardNo} className={`p-4 rounded-2xl border flex flex-wrap items-center justify-between gap-4 ${
              isDarkMode ? 'bg-gray-950/90 border-gray-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-center space-x-3">
                <span className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center justify-center font-bold text-xs">
                  #{idx + 1}
                </span>
                <div>
                  <h4 className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{w.name} (Ward {w.wardNo})</h4>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-slate-500'}`}>{w.zone} • Heat Index: {w.heatIndex}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 text-xs font-mono">
                <div>
                  <span className={`block text-[10px] ${isDarkMode ? 'text-gray-400' : 'text-slate-500'}`}>Net Canopy Loss</span>
                  <span className="text-red-600 font-bold">{w.netCanopyChangePercent}%</span>
                </div>
                <div>
                  <span className={`block text-[10px] ${isDarkMode ? 'text-gray-400' : 'text-slate-500'}`}>Compensatory Gap</span>
                  <span className="text-amber-600 font-bold">{w.targetCompensatory - w.treesPlanted2024} Saplings</span>
                </div>
                <div className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-bold text-[11px] shadow-sm">
                  Priority Plantation Assigned
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
