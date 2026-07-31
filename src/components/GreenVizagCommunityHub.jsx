import React, { useState } from 'react';
import { HeartHandshake, TreePine, MapPin, Award, CheckCircle2, UserCheck, Calendar, Send } from 'lucide-react';
import { GVMC_WARDS } from '../data/gvmcWardsData';

export default function GreenVizagCommunityHub({ isDarkMode }) {
  const [adoptedTrees, setAdoptedTrees] = useState([
    {
      treeId: 'GVMC-TREE-MVP-004',
      wardName: 'MVP Colony Sector 2 Avenue',
      species: 'Neem (Azadirachta Indica)',
      plantedDate: '2024-06-15',
      adoptedBy: 'K. Srinivasa Rao (RWA President)',
      wateringDays: 'Mon, Wed, Fri',
      healthStatus: 'Thriving',
      survivalScore: '98%',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&auto=format&fit=crop&q=80'
    },
    {
      treeId: 'GVMC-TREE-SIR-012',
      wardName: 'Siripuram Junction Promenade',
      species: 'Copper Pod (Peltophorum)',
      plantedDate: '2024-07-01',
      adoptedBy: 'Ananya Sharma (AU Student)',
      wateringDays: 'Daily Morning',
      healthStatus: 'Healthy Growth',
      survivalScore: '94%',
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&auto=format&fit=crop&q=80'
    }
  ]);

  const [requestSubmitted, setRequestSubmitted] = useState(false);
  const [requestForm, setRequestForm] = useState({
    rwaName: '',
    wardNo: 18,
    streetAddress: '',
    saplingsRequested: 25,
    contactPerson: '',
    phone: ''
  });

  const handleRequestSubmit = (e) => {
    e.preventDefault();
    setRequestSubmitted(true);
    setTimeout(() => {
      setRequestSubmitted(false);
      setRequestForm({ rwaName: '', wardNo: 18, streetAddress: '', saplingsRequested: 25, contactPerson: '', phone: '' });
    }, 2500);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className={`rounded-3xl p-6 border flex flex-wrap items-center justify-between gap-4 ${
        isDarkMode ? 'glass-panel-emerald border-emerald-500/30' : 'bg-emerald-50 border-emerald-300 shadow-sm'
      }`}>
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-600 border border-emerald-500/30">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <div>
            <h2 className={`text-xl font-extrabold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              "Green Vizag" Community & Citizen Action Hub
            </h2>
            <p className={`text-xs ${isDarkMode ? 'text-emerald-200' : 'text-slate-700 font-medium'}`}>
              Empowering Visakhapatnam residents & RWAs to adopt municipal trees, request avenue saplings, and track sapling survival.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3 text-xs font-mono font-bold">
          <span className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white shadow-sm flex items-center gap-1.5">
            <Award className="w-4 h-4 text-amber-300" />
            1,420 Trees Adopted Citywide
          </span>
        </div>
      </div>

      {/* Main Grid: Adopted Trees Gallery & RWA Request Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Adopted Trees Active Community Showcase */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className={`text-base font-extrabold flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            <TreePine className="w-5 h-5 text-emerald-600" />
            Active Neighborhood Tree Adoptions (MVP Colony & Siripuram)
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {adoptedTrees.map(tree => (
              <div key={tree.treeId} className={`rounded-3xl p-5 border space-y-3 transition-all ${
                isDarkMode ? 'glass-panel border-gray-800' : 'bg-white border-slate-200 shadow-sm'
              }`}>
                <div className="relative h-36 rounded-2xl overflow-hidden border border-slate-200">
                  <img src={tree.image} alt={tree.species} className="w-full h-full object-cover" />
                  <span className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-600 text-white shadow-md">
                    {tree.healthStatus}
                  </span>
                  <span className="absolute bottom-2.5 left-2.5 px-2.5 py-1 rounded-xl text-[10px] font-mono font-bold bg-black/80 text-emerald-400 backdrop-blur-md">
                    {tree.treeId}
                  </span>
                </div>

                <div>
                  <h4 className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{tree.species}</h4>
                  <p className={`text-xs flex items-center gap-1 mt-0.5 ${isDarkMode ? 'text-gray-400' : 'text-slate-500'}`}>
                    <MapPin className="w-3 h-3 text-emerald-600" /> {tree.wardName}
                  </p>
                </div>

                <div className={`p-3 rounded-xl border text-xs space-y-1.5 ${
                  isDarkMode ? 'bg-gray-950/80 border-gray-800' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className="flex justify-between items-center">
                    <span className={isDarkMode ? 'text-gray-400' : 'text-slate-600'}>Adopted Guardian:</span>
                    <strong className={isDarkMode ? 'text-white' : 'text-slate-900'}>{tree.adoptedBy}</strong>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className={isDarkMode ? 'text-gray-400' : 'text-slate-600'}>Watering Schedule:</span>
                    <span className="text-emerald-600 font-bold">{tree.wateringDays}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className={isDarkMode ? 'text-gray-400' : 'text-slate-600'}>Sapling Survival Index:</span>
                    <span className="text-cyan-600 font-mono font-extrabold">{tree.survivalScore}</span>
                  </div>
                </div>

                <button className="w-full py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-all flex items-center justify-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5" /> Log Daily Tree Care Check-in
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* RWA Free Sapling Request Form */}
        <div className={`rounded-3xl p-6 border space-y-4 ${
          isDarkMode ? 'glass-panel border-gray-800' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div>
            <h3 className={`text-base font-extrabold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              RWA Free Sapling Request
            </h3>
            <p className={`text-xs mt-0.5 ${isDarkMode ? 'text-gray-400' : 'text-slate-500'}`}>
              Request free municipal avenue saplings for your colony street or residential association.
            </p>
          </div>

          {requestSubmitted ? (
            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-300 text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
              <h4 className="text-sm font-bold text-slate-900">Request Submitted to GVMC Forestry</h4>
              <p className="text-xs text-slate-600">
                Ticket <strong className="text-emerald-700 font-mono">GVMC-RWA-2025-412</strong> generated. Sapling dispatch team assigned.
              </p>
            </div>
          ) : (
            <form onSubmit={handleRequestSubmit} className="space-y-3 text-xs">
              <div>
                <label className={`block font-semibold mb-1 ${isDarkMode ? 'text-gray-300' : 'text-slate-700'}`}>
                  RWA / Colony Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. MVP Colony Sector 3 Welfare Assoc"
                  value={requestForm.rwaName}
                  onChange={(e) => setRequestForm({ ...requestForm, rwaName: e.target.value })}
                  className={`w-full border rounded-xl p-2.5 focus:outline-none focus:border-emerald-500 ${
                    isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                  }`}
                />
              </div>

              <div>
                <label className={`block font-semibold mb-1 ${isDarkMode ? 'text-gray-300' : 'text-slate-700'}`}>
                  Select GVMC Ward
                </label>
                <select
                  value={requestForm.wardNo}
                  onChange={(e) => setRequestForm({ ...requestForm, wardNo: e.target.value })}
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
                <label className={`block font-semibold mb-1 ${isDarkMode ? 'text-gray-300' : 'text-slate-700'}`}>
                  Street Location
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 5th Main Road Avenue"
                  value={requestForm.streetAddress}
                  onChange={(e) => setRequestForm({ ...requestForm, streetAddress: e.target.value })}
                  className={`w-full border rounded-xl p-2.5 focus:outline-none focus:border-emerald-500 ${
                    isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                  }`}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={`block font-semibold mb-1 ${isDarkMode ? 'text-gray-300' : 'text-slate-700'}`}>
                    Saplings Needed
                  </label>
                  <input
                    type="number"
                    min="5"
                    max="200"
                    value={requestForm.saplingsRequested}
                    onChange={(e) => setRequestForm({ ...requestForm, saplingsRequested: e.target.value })}
                    className={`w-full border rounded-xl p-2.5 focus:outline-none focus:border-emerald-500 ${
                      isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                    }`}
                  />
                </div>
                <div>
                  <label className={`block font-semibold mb-1 ${isDarkMode ? 'text-gray-300' : 'text-slate-700'}`}>
                    Contact Mobile
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="10-digit number"
                    value={requestForm.phone}
                    onChange={(e) => setRequestForm({ ...requestForm, phone: e.target.value })}
                    className={`w-full border rounded-xl p-2.5 focus:outline-none focus:border-emerald-500 ${
                      isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                    }`}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md transition-all flex items-center justify-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" /> Submit Sapling Request
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
