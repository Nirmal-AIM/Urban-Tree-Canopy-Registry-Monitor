import React from 'react';
import { TreePine, Satellite, ShieldAlert, FileText, PlusCircle, Sparkles, Sun, Moon, HeartHandshake, Download, Info } from 'lucide-react';

export default function Navbar({ onOpenReportModal, onOpenCitizenModal, onOpenSystemInfoModal, onExportCsv, citySummary, activeTab, setActiveTab, isDarkMode, onToggleTheme }) {
  return (
    <header className={`sticky top-0 z-50 transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-[#070b19] border-b border-gray-800 shadow-md' 
        : 'bg-white border-b border-slate-200 shadow-sm'
    }`}>
      <div className="w-full max-w-full px-4 sm:px-8 lg:px-10">
        <div className="flex items-center justify-between py-3.5">
          
          {/* Official GVMC Identity Logo & Header */}
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-md transition-colors ${
              isDarkMode 
                ? 'bg-gray-900 border border-emerald-500/30' 
                : 'bg-emerald-600 text-white shadow-emerald-600/20'
            }`}>
              <TreePine className="w-5 h-5 text-white" />
            </div>
            <div className="space-y-0.5">
              <span className={`block text-[9px] font-bold tracking-widest uppercase leading-none ${
                isDarkMode ? 'text-emerald-400' : 'text-emerald-700'
              }`}>
                Govt of Andhra Pradesh • GVMC
              </span>
              <h1 className={`block text-base font-extrabold tracking-tight leading-none mt-1 ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}>
                Urban Tree Canopy Registry & Monitor
              </h1>
              <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Active Satellite Telemetry (PS69)</span>
              </div>
            </div>
          </div>

          {/* Clean Navigation Tab Options */}
          <nav className={`hidden xl:flex items-center space-x-1 p-1 rounded-xl border transition-colors ${
            isDarkMode 
              ? 'bg-gray-900/90 border-gray-800' 
              : 'bg-slate-100/90 border-slate-200'
          }`}>
            <button
              onClick={() => setActiveTab('gis')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'gis'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : isDarkMode ? 'text-gray-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Satellite className="w-3.5 h-3.5" />
              NDVI GIS Visualizer
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'analytics'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : isDarkMode ? 'text-gray-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              Ward Net Change Audit
            </button>
            <button
              onClick={() => setActiveTab('registry')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'registry'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : isDarkMode ? 'text-gray-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              Tree Felling & Quota Log
            </button>
            <button
              onClick={() => setActiveTab('insights')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'insights'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : isDarkMode ? 'text-gray-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              AI Policy Guidance
            </button>
            <button
              onClick={() => setActiveTab('community')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'community'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : isDarkMode ? 'text-gray-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <HeartHandshake className="w-3.5 h-3.5 text-pink-500" />
              Green Vizag Citizen Hub
            </button>
          </nav>

          {/* Quick Action & Theme Switcher */}
          <div className="flex items-center space-x-2">
            {/* System Info Architecture Button */}
            <button
              onClick={onOpenSystemInfoModal}
              className={`p-2 rounded-xl border transition-all ${
                isDarkMode 
                  ? 'bg-gray-900 border-gray-800 text-emerald-400 hover:bg-gray-800' 
                  : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
              }`}
              title="PS69 Architecture & Specs"
            >
              <Info className="w-4 h-4 text-emerald-600" />
            </button>

            {/* Theme Toggle Button */}
            <button
              onClick={onToggleTheme}
              className={`p-2 rounded-xl border transition-all ${
                isDarkMode 
                  ? 'bg-gray-900 border-gray-800 text-amber-400 hover:bg-gray-800' 
                  : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
              }`}
              title={isDarkMode ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4 text-indigo-600" />}
            </button>

            <button
              onClick={onExportCsv}
              className={`hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl text-[11px] font-semibold border transition-all ${
                isDarkMode
                  ? 'bg-gray-800 text-gray-200 border-gray-700 hover:bg-gray-700'
                  : 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200'
              }`}
              title="Download Raw Dataset CSV"
            >
              <Download className="w-3.5 h-3.5 text-emerald-600" />
              Export CSV
            </button>

            <button
              onClick={onOpenCitizenModal}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-[11px] font-semibold border transition-all ${
                isDarkMode
                  ? 'bg-amber-500/10 text-amber-400 border-amber-500/30 hover:bg-amber-500/20'
                  : 'bg-amber-50 text-amber-700 border-amber-300 hover:bg-amber-100'
              }`}
            >
              <PlusCircle className="w-3.5 h-3.5" />
              Report Violation
            </button>

            <button
              onClick={onOpenReportModal}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[11px] font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md transition-all"
            >
              <FileText className="w-3.5 h-3.5" />
              Export PDF
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
