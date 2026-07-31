import React, { useState } from 'react';
import Navbar from './components/Navbar';
import NdviMapViewer from './components/NdviMapViewer';
import WardAnalyticsDashboard from './components/WardAnalyticsDashboard';
import TreeRegistry from './components/TreeRegistry';
import AiInsightGenerator from './components/AiInsightGenerator';
import CitizenReportModal from './components/CitizenReportModal';
import GreenVizagCommunityHub from './components/GreenVizagCommunityHub';
import SystemInfoModal from './components/SystemInfoModal';

import { GVMC_WARDS, getWardsForYear, calculateDynamicCitySummary } from './data/gvmcWardsData';
import { INITIAL_TREE_REGISTRY } from './data/treeRegistryData';
import { printExecutiveReport } from './utils/pdfExporter';
import { exportWardCsvData } from './utils/csvExporter';
import { FileText, X, Calendar } from 'lucide-react';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false); // Default to clean white government theme
  const [activeTab, setActiveTab] = useState('gis'); // 'gis', 'analytics', 'registry', 'insights', 'community'
  const [selectedYear, setSelectedYear] = useState('2025'); // Dynamic global year state: 2020, 2022, 2023, 2024, 2025, 2026
  
  const [wards, setWards] = useState(GVMC_WARDS);
  const [selectedWard, setSelectedWard] = useState(GVMC_WARDS[1]); // Default Madhurawada
  const [registryList, setRegistryList] = useState(INITIAL_TREE_REGISTRY);
  const [showCitizenModal, setShowCitizenModal] = useState(false);
  const [showSystemInfoModal, setShowSystemInfoModal] = useState(false);
  const [showWardDrawer, setShowWardDrawer] = useState(false);

  // Dynamic Wards and Dynamic City Summary re-computed live for the selected year
  const activeYearWards = getWardsForYear(wards, selectedYear);
  const dynamicCitySummary = calculateDynamicCitySummary(wards, registryList, selectedYear);

  const handleSelectWard = (ward) => {
    setSelectedWard(ward);
    setShowWardDrawer(true);
  };

  const handleAddPermit = (newPermit) => {
    setRegistryList([newPermit, ...registryList]);
  };

  const handleExportPdf = () => {
    printExecutiveReport(dynamicCitySummary, activeYearWards, selectedWard);
  };

  const handleExportCsv = () => {
    exportWardCsvData(activeYearWards, selectedYear);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'theme-dark' : 'theme-light'} flex flex-col font-sans transition-colors duration-300 relative`}>
      
      {/* Top Navigation Bar */}
      <Navbar
        onOpenCitizenModal={() => setShowCitizenModal(true)}
        onOpenSystemInfoModal={() => setShowSystemInfoModal(true)}
        onOpenReportModal={handleExportPdf}
        onExportCsv={handleExportCsv}
        citySummary={dynamicCitySummary}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isDarkMode={isDarkMode}
        onToggleTheme={() => setIsDarkMode(!isDarkMode)}
      />

      {/* Main Container */}
      <main className="flex-1 w-full max-w-full px-4 sm:px-8 lg:px-10 py-6 space-y-6">
        
        {/* Global Dynamic Year Indicator Banner */}
        <div className={`rounded-2xl px-5 py-3 border flex flex-wrap items-center justify-between gap-4 transition-colors ${
          isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div className="flex items-center space-x-3">
            <Calendar className="w-5 h-5 text-emerald-600" />
            <div>
              <h2 className={`text-sm font-extrabold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                Active Telemetry Dataset Year: <span className="text-emerald-600 font-mono text-base font-black">{selectedYear} {selectedYear === '2026' ? '(AI Forecast)' : ''}</span>
              </h2>
              <p className={`text-[11px] ${isDarkMode ? 'text-gray-400' : 'text-slate-500'}`}>
                All charts, scorecards, ward analytics, and NDVI maps are dynamically synchronized to Year {selectedYear}.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-1.5">
            <span className={`text-xs font-bold mr-2 ${isDarkMode ? 'text-gray-300' : 'text-slate-700'}`}>Select Year:</span>
            {['2020', '2022', '2023', '2024', '2025', '2026'].map(y => (
              <button
                key={y}
                onClick={() => setSelectedYear(y)}
                className={`px-3 py-1 rounded-xl text-xs font-mono font-bold transition-all ${
                  selectedYear === y
                    ? y === '2026' ? 'bg-amber-500 text-slate-950 shadow-md scale-105' : 'bg-emerald-600 text-white shadow-md scale-105'
                    : isDarkMode ? 'bg-gray-800 text-gray-300 hover:text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {y}{y === '2026' ? ' (Forecast)' : ''}
              </button>
            ))}
          </div>
        </div>

        {/* Tab 1: Satellite NDVI GIS Visualizer */}
        {activeTab === 'gis' && (
          <div className="space-y-6">
            <NdviMapViewer
              wards={activeYearWards}
              selectedWard={selectedWard}
              onSelectWard={handleSelectWard}
              isDarkMode={isDarkMode}
              selectedYear={selectedYear}
              onSelectYear={setSelectedYear}
            />

            {/* Dynamic Quick Metrics Strip for Selected Year */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="glass-panel rounded-2xl p-4 border">
                <span className={`text-[10px] font-mono uppercase tracking-widest ${isDarkMode ? 'text-gray-400' : 'text-slate-500 font-bold'}`}>
                  {selectedYear} Canopy Area
                </span>
                <div className={`text-2xl font-extrabold mt-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  {dynamicCitySummary.canopy2025TotalHa.toLocaleString()} Ha
                </div>
                <p className="text-[11px] text-red-500 font-medium mt-0.5">-{dynamicCitySummary.netLossHa} Ha change vs 2023</p>
              </div>

              <div className="glass-panel rounded-2xl p-4 border">
                <span className={`text-[10px] font-mono uppercase tracking-widest ${isDarkMode ? 'text-gray-400' : 'text-slate-500 font-bold'}`}>
                  {selectedYear} Canopy Net Change
                </span>
                <div className="text-2xl font-extrabold text-red-500 mt-1">{dynamicCitySummary.netLossPercent}%</div>
                <p className={`text-[11px] mt-0.5 ${isDarkMode ? 'text-gray-400' : 'text-slate-500'}`}>Visakhapatnam Metropolitan Area</p>
              </div>

              <div className="glass-panel rounded-2xl p-4 border">
                <span className={`text-[10px] font-mono uppercase tracking-widest ${isDarkMode ? 'text-gray-400' : 'text-slate-500 font-bold'}`}>
                  Escrow Guarantee Deposit
                </span>
                <div className="text-2xl font-extrabold text-emerald-600 mt-1">₹2.97 Crores</div>
                <p className="text-[11px] text-emerald-600 font-medium mt-0.5">Compensatory plantation fund</p>
              </div>

              <div className="glass-panel-danger rounded-2xl p-4 border">
                <span className={`text-[10px] font-mono uppercase tracking-widest ${isDarkMode ? 'text-red-300' : 'text-red-700 font-bold'}`}>
                  Compensatory Deficit
                </span>
                <div className={`text-2xl font-extrabold mt-1 ${isDarkMode ? 'text-white' : 'text-red-950'}`}>
                  {dynamicCitySummary.replacementDeficitTrees.toLocaleString()}
                </div>
                <p className={`text-[11px] mt-0.5 ${isDarkMode ? 'text-red-300' : 'text-red-700 font-medium'}`}>Required 1:10 saplings missing</p>
              </div>
            </div>

            {/* Horizontal Ward Quick-Selector Strip */}
            <div className="glass-panel rounded-2xl p-5 border space-y-3">
              <div className="flex justify-between items-center">
                <h4 className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  Quick-Select Visakhapatnam Wards ({selectedYear} Stats):
                </h4>
                <span className={`text-[10px] font-mono ${isDarkMode ? 'text-gray-400' : 'text-slate-500'}`}>
                  {activeYearWards.length} Key Hotspots
                </span>
              </div>
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
                {activeYearWards.map(w => {
                  const isSelected = selectedWard?.wardNo === w.wardNo;
                  return (
                    <button
                      key={w.wardNo}
                      onClick={() => handleSelectWard(w)}
                      className={`flex-shrink-0 px-4 py-2.5 rounded-xl border text-left text-xs transition-all ${
                        isSelected
                          ? 'border-emerald-600 bg-emerald-600 text-white font-bold shadow-md'
                          : isDarkMode 
                            ? 'border-gray-800 bg-gray-900 hover:bg-gray-800 text-gray-300' 
                            : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700 hover:border-slate-300 shadow-sm'
                      }`}
                    >
                      <div className="font-bold">{`W${w.wardNo}: ${w.name.split(' & ')[0]}`}</div>
                      <div className="flex items-center justify-between gap-4 mt-1 text-[10px]">
                        <span className={isSelected ? 'text-emerald-100' : isDarkMode ? 'text-gray-400' : 'text-slate-500'}>
                          NDVI: {w.ndvi2025}
                        </span>
                        <span className={`font-mono font-bold ${
                          isSelected ? 'text-white' : w.netCanopyChangePercent < -5 ? 'text-red-500' : 'text-emerald-600'
                        }`}>
                          {w.netCanopyChangePercent}%
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Ward Net Change Audit */}
        {activeTab === 'analytics' && (
          <WardAnalyticsDashboard
            wards={activeYearWards}
            citySummary={dynamicCitySummary}
            onSelectWard={handleSelectWard}
            selectedWard={selectedWard}
            isDarkMode={isDarkMode}
            selectedYear={selectedYear}
          />
        )}

        {/* Tab 3: Tree Registry & 1:10 Quota Log */}
        {activeTab === 'registry' && (
          <TreeRegistry
            registryList={registryList}
            onAddPermit={handleAddPermit}
            isDarkMode={isDarkMode}
          />
        )}

        {/* Tab 4: AI Policy Guidance */}
        {activeTab === 'insights' && (
          <AiInsightGenerator
            wards={activeYearWards}
            citySummary={dynamicCitySummary}
            isDarkMode={isDarkMode}
            selectedYear={selectedYear}
          />
        )}

        {/* Tab 5: Green Vizag Community Hub */}
        {activeTab === 'community' && (
          <GreenVizagCommunityHub
            isDarkMode={isDarkMode}
          />
        )}
      </main>

      {/* Ward Details Side Drawer */}
      {showWardDrawer && selectedWard && (
        <div className={`fixed inset-y-0 right-0 z-50 max-w-md w-full p-6 space-y-6 shadow-2xl overflow-y-auto border-l transition-all duration-300 ${
          isDarkMode ? 'bg-gray-900 border-gray-800 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-2xl'
        }`}>
          <div className={`flex items-center justify-between border-b pb-4 ${isDarkMode ? 'border-gray-800' : 'border-slate-200'}`}>
            <div>
              <span className="text-xs font-mono font-bold text-emerald-600">GVMC WARD {selectedWard.wardNo}</span>
              <h3 className={`text-lg font-bold mt-0.5 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{selectedWard.name}</h3>
              <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-slate-500'}`}>{selectedWard.zone}</p>
            </div>
            <button
              onClick={() => setShowWardDrawer(false)}
              className={`p-2 rounded-xl border transition-colors ${
                isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-400 hover:text-white' : 'bg-slate-100 border-slate-200 text-slate-500 hover:text-slate-900'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Metrics for Active Year */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className={`p-3 rounded-xl border ${isDarkMode ? 'bg-gray-950 border-gray-800' : 'bg-slate-50 border-slate-200'}`}>
              <span className={`text-[10px] block ${isDarkMode ? 'text-gray-400' : 'text-slate-500'}`}>2023 Baseline Canopy</span>
              <strong className={`text-base font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{selectedWard.canopy2023Ha} ha</strong>
            </div>
            <div className={`p-3 rounded-xl border ${isDarkMode ? 'bg-gray-950 border-gray-800' : 'bg-slate-50 border-slate-200'}`}>
              <span className={`text-[10px] block ${isDarkMode ? 'text-gray-400' : 'text-slate-500'}`}>{selectedYear} Canopy</span>
              <strong className="text-emerald-600 text-base font-bold">{selectedWard.canopy2025Ha || selectedWard.canopy2023Ha} ha</strong>
            </div>
            <div className={`p-3 rounded-xl border ${isDarkMode ? 'bg-gray-950 border-gray-800' : 'bg-slate-50 border-slate-200'}`}>
              <span className={`text-[10px] block ${isDarkMode ? 'text-gray-400' : 'text-slate-500'}`}>Net Canopy Change</span>
              <strong className={`text-base font-mono font-bold ${selectedWard.netCanopyChangePercent < -5 ? 'text-red-500' : 'text-emerald-600'}`}>
                {selectedWard.netCanopyChangePercent}%
              </strong>
            </div>
            <div className={`p-3 rounded-xl border ${isDarkMode ? 'bg-gray-950 border-gray-800' : 'bg-slate-50 border-slate-200'}`}>
              <span className={`text-[10px] block ${isDarkMode ? 'text-gray-400' : 'text-slate-500'}`}>Urban Heat Index</span>
              <strong className="text-amber-600 text-base font-bold">{selectedWard.heatIndex}</strong>
            </div>
          </div>

          {/* Compensatory Audit Progress */}
          <div className={`p-4 rounded-xl border space-y-2 text-xs ${isDarkMode ? 'bg-gray-950 border-gray-800' : 'bg-slate-50 border-slate-200'}`}>
            <div className="flex justify-between font-semibold">
              <span className={isDarkMode ? 'text-gray-300' : 'text-slate-700'}>1:10 Replacement Quota Status</span>
              <span className="text-emerald-600 font-mono font-bold">{selectedWard.treesPlanted2024} / {selectedWard.targetCompensatory}</span>
            </div>
            <div className={`w-full h-2 rounded-full overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-slate-200'}`}>
              <div
                className="h-full bg-emerald-500"
                style={{ width: `${Math.min(100, (selectedWard.treesPlanted2024 / selectedWard.targetCompensatory) * 100)}%` }}
              ></div>
            </div>
            <p className={`text-[11px] pt-1 ${isDarkMode ? 'text-gray-400' : 'text-slate-500'}`}>
              Survival Rate: <strong className="text-cyan-600 font-bold">{selectedWard.survivalRatePercent}%</strong> across verified field plots.
            </p>
          </div>

          {/* Action Buttons */}
          <div className={`space-y-2 pt-4 border-t ${isDarkMode ? 'border-gray-800' : 'border-slate-200'}`}>
            <button
              onClick={handleExportPdf}
              className="w-full py-2.5 rounded-xl font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md text-xs flex items-center justify-center gap-2"
            >
              <FileText className="w-4 h-4" />
              Generate Ward Official Audit PDF
            </button>
          </div>
        </div>
      )}

      {/* Citizen Report Modal */}
      {showCitizenModal && (
        <CitizenReportModal
          onClose={() => setShowCitizenModal(false)}
          onSubmitReport={() => {}}
          isDarkMode={isDarkMode}
        />
      )}

      {/* System Info Architecture Modal */}
      {showSystemInfoModal && (
        <SystemInfoModal
          onClose={() => setShowSystemInfoModal(false)}
          isDarkMode={isDarkMode}
        />
      )}

      {/* Footer */}
      <footer className={`border-t py-4 text-center text-xs transition-colors ${
        isDarkMode ? 'border-gray-800 bg-[#040710] text-gray-500' : 'border-slate-200 bg-white text-slate-500'
      }`}>
        <p>
          GVMC Urban Forestry Department • Hackathon Problem Statement PS69 Solution • Visakhapatnam Digital Governance
        </p>
      </footer>
    </div>
  );
}
