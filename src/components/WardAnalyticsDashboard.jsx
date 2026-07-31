import React, { useState } from 'react';
import { Search, Filter, AlertCircle, TrendingDown, TreePine, AlertTriangle, ShieldCheck, ArrowUpRight, BarChart3, Calendar } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import { GVMC_ZONES } from '../data/gvmcWardsData';

export default function WardAnalyticsDashboard({ wards, citySummary, onSelectWard, selectedWard, isDarkMode, selectedYear }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedZone, setSelectedZone] = useState('All');
  const [criticalityFilter, setCriticalityFilter] = useState('All');

  const filteredWards = wards.filter(w => {
    const matchesSearch = w.name.toLowerCase().includes(searchTerm.toLowerCase()) || w.wardNo.toString().includes(searchTerm);
    const matchesZone = selectedZone === 'All' || w.zone === selectedZone;
    const matchesCriticality = criticalityFilter === 'All' || w.criticality === criticalityFilter;
    return matchesSearch && matchesZone && matchesCriticality;
  });

  const chartData = filteredWards.map(w => ({
    name: `W${w.wardNo}`,
    fullName: w.name,
    canopy2023: w.canopy2023Ha,
    canopy2025: w.canopy2025Ha,
    netChangePercent: w.netCanopyChangePercent,
    felled: w.treesFelled2024,
    planted: w.treesPlanted2024,
    target: w.targetCompensatory
  }));

  const topLossWards = [...wards].sort((a, b) => a.netCanopyChangePercent - b.netCanopyChangePercent).slice(0, 4);

  return (
    <div className="space-y-6">
      {/* Executive Key Metric Cards Grid for Active Year */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Monitored Wards & Area */}
        <div className={`glass-panel rounded-3xl p-5 border relative overflow-hidden transition-all ${
          isDarkMode ? 'border-gray-800' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div className="flex items-center justify-between">
            <span className={`text-[10px] font-mono uppercase tracking-widest font-bold ${
              isDarkMode ? 'text-gray-400' : 'text-slate-500'
            }`}>Monitored Territory ({selectedYear})</span>
            <span className="p-2.5 rounded-2xl bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
              <TreePine className="w-5 h-5" />
            </span>
          </div>
          <div className="mt-4">
            <div className={`text-3xl font-extrabold tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              {citySummary.canopy2025TotalHa.toLocaleString()} Ha
            </div>
            <p className="text-xs text-emerald-600 mt-1 flex items-center gap-1 font-bold">
              <span>{citySummary.totalWards} Wards Monitored</span> • Year {selectedYear}
            </p>
          </div>
          <div className={`mt-4 pt-3 border-t text-[11px] flex justify-between ${
            isDarkMode ? 'border-gray-800 text-gray-400' : 'border-slate-200 text-slate-600'
          }`}>
            <span>Stable Wards: <strong className="text-emerald-600 font-mono font-extrabold">{citySummary.stableWardsCount}</strong></span>
            <span>Critical: <strong className="text-red-600 font-mono font-extrabold">{citySummary.criticalWardsCount}</strong></span>
          </div>
        </div>

        {/* Card 2: Net Canopy Loss */}
        <div className={`glass-panel rounded-3xl p-5 border relative overflow-hidden transition-all ${
          isDarkMode ? 'border-gray-800' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div className="flex items-center justify-between">
            <span className={`text-[10px] font-mono uppercase tracking-widest font-bold ${
              isDarkMode ? 'text-gray-400' : 'text-slate-500'
            }`}>{selectedYear} Net Canopy Change</span>
            <span className="p-2.5 rounded-2xl bg-red-500/10 text-red-600 border border-red-500/20">
              <TrendingDown className="w-5 h-5" />
            </span>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-extrabold text-red-600 tracking-tight">{citySummary.netLossPercent}%</div>
            <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-300' : 'text-slate-700'}`}>
              <strong className="text-red-600 font-mono font-extrabold">-{citySummary.netLossHa} Ha</strong> green cover change vs 2023
            </p>
          </div>
          <div className={`mt-4 pt-3 border-t text-[11px] truncate ${
            isDarkMode ? 'border-gray-800 text-gray-400' : 'border-slate-200 text-slate-600'
          }`}>
            Status: {selectedYear === '2026' ? 'AI Predictive Forecast' : `Validated Satellite Telemetry (${selectedYear})`}
          </div>
        </div>

        {/* Card 3: Trees Felled */}
        <div className={`glass-panel rounded-3xl p-5 border relative overflow-hidden transition-all ${
          isDarkMode ? 'border-gray-800' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div className="flex items-center justify-between">
            <span className={`text-[10px] font-mono uppercase tracking-widest font-bold ${
              isDarkMode ? 'text-gray-400' : 'text-slate-500'
            }`}>Trees Felled ({selectedYear})</span>
            <span className="p-2.5 rounded-2xl bg-amber-500/10 text-amber-600 border border-amber-500/20">
              <AlertTriangle className="w-5 h-5" />
            </span>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-extrabold text-amber-600 tracking-tight">{citySummary.totalTreesFelled2024.toLocaleString()}</div>
            <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-300' : 'text-slate-700'}`}>
              Authorized via GVMC Urban Forestry permits
            </p>
          </div>
          <div className={`mt-4 pt-3 border-t text-[11px] flex justify-between ${
            isDarkMode ? 'border-gray-800 text-gray-400' : 'border-slate-200 text-slate-600'
          }`}>
            <span>Planted: <strong className="text-emerald-600 font-mono font-extrabold">{citySummary.totalTreesPlanted2024.toLocaleString()}</strong></span>
            <span>Survival Rate: <strong className="text-cyan-600 font-mono font-extrabold">{citySummary.overallSurvivalRatePercent}%</strong></span>
          </div>
        </div>

        {/* Card 4: Compensatory Deficit (1:10 Rule) */}
        <div className={`glass-panel-danger rounded-3xl p-5 border relative overflow-hidden transition-all ${
          isDarkMode ? 'border-red-500/30' : 'bg-red-50 border-red-200 shadow-sm'
        }`}>
          <div className="flex items-center justify-between">
            <span className={`text-[10px] font-mono uppercase tracking-widest font-bold ${
              isDarkMode ? 'text-red-300' : 'text-red-800'
            }`}>1:10 Replacement Deficit</span>
            <span className="p-2.5 rounded-2xl bg-red-500/20 text-red-600 border border-red-500/30">
              <AlertCircle className="w-5 h-5" />
            </span>
          </div>
          <div className="mt-4">
            <div className={`text-3xl font-extrabold tracking-tight ${isDarkMode ? 'text-white' : 'text-red-950'}`}>
              {citySummary.replacementDeficitTrees.toLocaleString()}
            </div>
            <p className={`text-xs mt-1 ${isDarkMode ? 'text-red-300' : 'text-red-700 font-medium'}`}>
              Missing mandatory compensatory saplings
            </p>
          </div>
          <div className={`mt-4 pt-3 border-t text-[11px] ${
            isDarkMode ? 'border-red-500/20 text-red-200' : 'border-red-200 text-red-800 font-medium'
          }`}>
            Mandatory Target: {(citySummary.totalTreesFelled2024 * 10).toLocaleString()} • Deficit Gap
          </div>
        </div>
      </div>

      {/* Main Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Recharts Bar Comparison */}
        <div className={`glass-panel rounded-3xl p-6 border space-y-4 ${
          isDarkMode ? 'border-gray-800' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className={`text-base font-extrabold flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                <BarChart3 className="w-5 h-5 text-emerald-600" />
                Ward Canopy Area Audit (2023 Baseline vs Year {selectedYear})
              </h3>
              <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-slate-500'}`}>
                Canopy cover measured in hectares per ward for Year {selectedYear}
              </p>
            </div>
            <span className="text-[10px] bg-emerald-100 text-emerald-800 border border-emerald-300 px-3 py-1 rounded-full font-mono font-bold flex items-center gap-1">
              <Calendar className="w-3 h-3 text-emerald-700" /> Year {selectedYear} Active
            </span>
          </div>

          <div className="h-[320px] w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? "#1e293b" : "#e2e8f0"} />
                <XAxis dataKey="name" stroke={isDarkMode ? "#94a3b8" : "#475569"} fontSize={11} />
                <YAxis stroke={isDarkMode ? "#94a3b8" : "#475569"} fontSize={11} unit=" ha" />
                <Tooltip
                  contentStyle={{ 
                    backgroundColor: isDarkMode ? '#090d16' : '#ffffff', 
                    borderColor: isDarkMode ? '#334155' : '#cbd5e1', 
                    borderRadius: '16px', 
                    color: isDarkMode ? '#ffffff' : '#0f172a',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.15)' 
                  }}
                  formatter={(value, name) => [`${value} Hectares`, name === 'canopy2023' ? '2023 Baseline Canopy' : `${selectedYear} Canopy`]}
                  labelFormatter={(label) => {
                    const found = chartData.find(d => d.name === label);
                    return `${label} - ${found ? found.fullName : ''}`;
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Bar dataKey="canopy2023" name="2023 Baseline Canopy (ha)" fill="#059669" radius={[6, 6, 0, 0]} />
                <Bar dataKey="canopy2025" name={`${selectedYear} Canopy (ha)`} fill="#dc2626" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right 1 Col: Top Critical Canopy Loss Leaderboard */}
        <div className={`glass-panel rounded-3xl p-6 border flex flex-col justify-between ${
          isDarkMode ? 'border-gray-800' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-base font-extrabold flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                <ShieldCheck className="w-5 h-5 text-red-600" />
                Highest Canopy Loss Wards ({selectedYear})
              </h3>
              <span className="text-[10px] bg-red-100 text-red-800 border border-red-300 px-2 py-0.5 rounded font-mono font-bold">
                Action Mandated
              </span>
            </div>

            <div className="space-y-3">
              {topLossWards.map(w => (
                <div
                  key={w.wardNo}
                  onClick={() => onSelectWard(w)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer group ${
                    isDarkMode ? 'bg-gray-950/80 border-gray-800 hover:border-red-500/50' : 'bg-slate-50 border-slate-200 hover:border-red-400'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <span className={`text-xs font-bold transition-colors ${
                        isDarkMode ? 'text-white group-hover:text-red-400' : 'text-slate-900 group-hover:text-red-600'
                      }`}>
                        Ward {w.wardNo}: {w.name}
                      </span>
                      <p className={`text-[10px] mt-0.5 ${isDarkMode ? 'text-gray-400' : 'text-slate-500'}`}>{w.zone}</p>
                    </div>
                    <span className="text-xs font-mono font-extrabold text-red-600 bg-red-100 border border-red-200 px-2 py-0.5 rounded-lg">
                      {w.netCanopyChangePercent}%
                    </span>
                  </div>

                  <div className={`mt-2 text-[11px] flex items-center justify-between ${
                    isDarkMode ? 'text-gray-400' : 'text-slate-600'
                  }`}>
                    <span>Felled: <strong className={isDarkMode ? 'text-white font-mono' : 'text-slate-900 font-mono'}>{w.treesFelled2024}</strong></span>
                    <span>1:10 Target: <strong className="text-amber-600 font-mono font-bold">{w.targetCompensatory}</strong></span>
                    <span className="text-emerald-600 font-bold flex items-center gap-0.5">
                      Inspect <ArrowUpRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 font-medium">
            💡 <strong>GVMC Mandate:</strong> Wards exceeding 10% canopy loss trigger an automatic legal moratorium on commercial felling permits.
          </div>
        </div>
      </div>

      {/* Ward Filtering & Search Toolbar */}
      <div className={`glass-panel rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 border ${
        isDarkMode ? 'border-gray-800' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        <div className="flex items-center gap-3 flex-1 min-w-[240px]">
          <div className="relative flex-1">
            <Search className={`w-4 h-4 absolute left-3.5 top-1/2 transform -translate-y-1/2 ${
              isDarkMode ? 'text-gray-400' : 'text-slate-400'
            }`} />
            <input
              type="text"
              placeholder="Search ward by name or number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full border rounded-xl pl-9 pr-4 py-2 text-xs focus:outline-none focus:border-emerald-500 ${
                isDarkMode ? 'bg-gray-950 border-gray-800 text-white' : 'bg-white border-slate-300 text-slate-900'
              }`}
            />
          </div>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {/* Zone Selector */}
          <div className="flex items-center gap-2">
            <Filter className={`w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-slate-500'}`} />
            <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-slate-600 font-medium'}`}>Zone:</span>
            <select
              value={selectedZone}
              onChange={(e) => setSelectedZone(e.target.value)}
              className={`border rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-emerald-500 ${
                isDarkMode ? 'bg-gray-950 border-gray-800 text-white' : 'bg-white border-slate-300 text-slate-900'
              }`}
            >
              <option value="All">All Zones (1-10)</option>
              {GVMC_ZONES.map(z => (
                <option key={z.id} value={z.name}>{z.name}</option>
              ))}
            </select>
          </div>

          {/* Criticality Filter */}
          <div className="flex items-center gap-2">
            <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-slate-600 font-medium'}`}>Status:</span>
            <select
              value={criticalityFilter}
              onChange={(e) => setCriticalityFilter(e.target.value)}
              className={`border rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-emerald-500 ${
                isDarkMode ? 'bg-gray-950 border-gray-800 text-white' : 'bg-white border-slate-300 text-slate-900'
              }`}
            >
              <option value="All">All Statuses</option>
              <option value="Critical">Critical (&gt;10% Loss)</option>
              <option value="Warning">Warning (5-10% Loss)</option>
              <option value="Stable">Stable (&lt;5% Loss)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Ward Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredWards.map(w => {
          const isSelected = selectedWard?.wardNo === w.wardNo;

          return (
            <div
              key={w.wardNo}
              onClick={() => onSelectWard(w)}
              className={`glass-panel rounded-3xl p-5 border transition-all cursor-pointer relative ${
                isSelected
                  ? 'border-emerald-600 ring-2 ring-emerald-500/20 bg-emerald-50/50'
                  : isDarkMode ? 'border-gray-800 hover:border-gray-700' : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-mono text-emerald-600 font-extrabold">WARD {w.wardNo}</span>
                  <h4 className={`text-base font-bold mt-0.5 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{w.name}</h4>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-slate-500'}`}>{w.zone}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold border ${
                  w.criticality === 'Critical'
                    ? 'bg-red-100 text-red-800 border-red-200'
                    : w.criticality === 'Warning'
                    ? 'bg-amber-100 text-amber-800 border-amber-200'
                    : 'bg-emerald-100 text-emerald-800 border-emerald-200'
                }`}>
                  {w.criticality}
                </span>
              </div>

              {/* Progress bar of Canopy Loss */}
              <div className="mt-4">
                <div className="flex justify-between text-xs mb-1.5">
                  <span className={isDarkMode ? 'text-gray-400' : 'text-slate-600'}>Net Canopy Change ({selectedYear}):</span>
                  <span className={`font-mono font-bold ${w.netCanopyChangePercent < -5 ? 'text-red-600' : 'text-emerald-600'}`}>
                    {w.netCanopyChangePercent}%
                  </span>
                </div>
                <div className={`w-full h-2 rounded-full overflow-hidden border ${
                  isDarkMode ? 'bg-gray-950 border-gray-800' : 'bg-slate-200 border-slate-300'
                }`}>
                  <div
                    className={`h-full ${w.netCanopyChangePercent < -10 ? 'bg-red-600' : w.netCanopyChangePercent < -5 ? 'bg-amber-500' : 'bg-emerald-600'}`}
                    style={{ width: `${Math.min(100, Math.abs(w.netCanopyChangePercent) * 4)}%` }}
                  ></div>
                </div>
              </div>

              <div className={`grid grid-cols-2 gap-2 mt-4 pt-3 border-t text-xs ${
                isDarkMode ? 'border-gray-800/80' : 'border-slate-200'
              }`}>
                <div>
                  <span className={`block text-[10px] ${isDarkMode ? 'text-gray-400' : 'text-slate-500'}`}>Trees Felled ({selectedYear})</span>
                  <strong className={`text-sm font-mono font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{w.treesFelled2024}</strong>
                </div>
                <div>
                  <span className={`block text-[10px] ${isDarkMode ? 'text-gray-400' : 'text-slate-500'}`}>1:10 Target Quota</span>
                  <strong className="text-amber-600 text-sm font-mono font-bold">{w.targetCompensatory}</strong>
                </div>
                <div>
                  <span className={`block text-[10px] ${isDarkMode ? 'text-gray-400' : 'text-slate-500'}`}>Actual Planted</span>
                  <strong className="text-emerald-600 text-sm font-mono font-bold">{w.treesPlanted2024}</strong>
                </div>
                <div>
                  <span className={`block text-[10px] ${isDarkMode ? 'text-gray-400' : 'text-slate-500'}`}>Survival Rate</span>
                  <strong className="text-cyan-600 text-sm font-mono font-bold">{w.survivalRatePercent}%</strong>
                </div>
              </div>

              <div className={`mt-3 pt-2 text-xs flex items-center justify-between border-t ${
                isDarkMode ? 'border-gray-800/50 text-gray-400' : 'border-slate-100 text-slate-500'
              }`}>
                <span className="truncate text-[11px]">Cause: {w.keyCauses[0]}</span>
                <span className="text-emerald-600 font-bold hover:underline text-[11px]">Inspect &rarr;</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
