import React, { useState } from 'react';
import { FileText, PlusCircle, CheckCircle2, AlertTriangle, QrCode, Image as ImageIcon, Search, CreditCard, Calculator, ShieldCheck, Download } from 'lucide-react';
import { GVMC_WARDS } from '../data/gvmcWardsData';

export default function TreeRegistry({ registryList, onAddPermit, isDarkMode }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [previewPhoto, setPreviewPhoto] = useState(null);
  
  // Feature 1: E-Challan State
  const [activeChallan, setActiveChallan] = useState(null);

  // Feature 3: Survival Audit Calculator State
  const [auditPermit, setAuditPermit] = useState(null);
  const [verifiedLivingCount, setVerifiedLivingCount] = useState(0);

  const [formData, setFormData] = useState({
    wardNo: 4,
    applicant: '',
    reason: '',
    treesRequested: 20,
    species: 'Peltophorum, Neem',
    officerInCharge: 'R. K. Sastry (Assistant Conservator)'
  });

  const filteredPermits = registryList.filter(p => 
    p.applicant.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.permitId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.wardName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmitPermit = (e) => {
    e.preventDefault();
    const wardObj = GVMC_WARDS.find(w => w.wardNo === parseInt(formData.wardNo)) || GVMC_WARDS[0];
    const treesNum = parseInt(formData.treesRequested);
    const compensatoryQuota = treesNum * 10;
    const deposit = compensatoryQuota * 2000;

    const newPermit = {
      permitId: `GVMC-TFP-2025-${Math.floor(100 + Math.random() * 900)}`,
      wardNo: wardObj.wardNo,
      wardName: wardObj.name,
      applicant: formData.applicant || 'Visakhapatnam Urban Infrastructure Ltd',
      reason: formData.reason || 'Utility pipeline laying & underground ducting',
      treesRequested: treesNum,
      treesApproved: treesNum,
      species: formData.species,
      mandatoryCompensatoryQuota: compensatoryQuota,
      plantedCount: 0,
      depositPaidRs: deposit,
      status: 'Quota Pending',
      fellingDate: new Date().toISOString().split('T')[0],
      deadlineDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      officerInCharge: formData.officerInCharge,
      geoPoint: { lat: wardObj.lat, lng: wardObj.lng },
      verifiedByQr: true,
      photoProofBefore: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&auto=format&fit=crop&q=80',
      photoProofAfter: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&auto=format&fit=crop&q=80'
    };

    onAddPermit(newPermit);
    setShowModal(false);
  };

  // Open Audit Calculator
  const handleOpenAudit = (permit) => {
    setAuditPermit(permit);
    setVerifiedLivingCount(permit.plantedCount);
  };

  // Print E-Challan Slip
  const handlePrintChallan = (permit) => {
    const printWin = window.open('', '_blank');
    const content = `
      <html>
      <head>
        <title>GVMC Urban Forestry Escrow E-Challan</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 30px; color: #111; }
          .header { border-bottom: 3px solid #059669; padding-bottom: 10px; margin-bottom: 20px; }
          .box { border: 1px solid #ccc; padding: 15px; border-radius: 8px; margin-top: 15px; background: #f9fafb; }
          .row { display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 13px; }
          .bold { font-weight: bold; }
          .green { color: #059669; }
        </style>
      </head>
      <body>
        <div class="header">
          <h2>GREATER VISAKHAPATNAM MUNICIPAL CORPORATION</h2>
          <h3>URBAN FORESTRY ESCROW E-CHALLAN RECEIPT</h3>
        </div>
        <div class="row"><span>Challan No: <strong>GVMC-ESC-${permit.permitId}</strong></span><span>Date: ${new Date().toLocaleDateString()}</span></div>
        <div class="box">
          <div class="row"><span>Applicant:</span><span class="bold">${permit.applicant}</span></div>
          <div class="row"><span>Ward / Location:</span><span>Ward ${permit.wardNo} - ${permit.wardName}</span></div>
          <div class="row"><span>Approved Trees for Felling:</span><span>${permit.treesApproved} Trees</span></div>
          <div class="row"><span>Mandatory 1:10 Quota:</span><span class="bold green">${permit.mandatoryCompensatoryQuota} Saplings</span></div>
          <div class="row"><span>Escrow Deposit Amount:</span><span class="bold green" style="font-size:18px;">₹${permit.depositPaidRs.toLocaleString()}</span></div>
          <div class="row"><span>Bank Escrow A/C:</span><span>GVMC Forestry WALTA Fund • SBI Vizag Main Branch</span></div>
        </div>
        <p style="font-size:11px; color:#666; margin-top:20px;">* This deposit is held in GVMC WALTA Escrow account and will be refunded upon 80%+ sapling survival verification after 12 months.</p>
        <script>window.onload = function() { window.print(); }</script>
      </body>
      </html>
    `;
    printWin.document.write(content);
    printWin.document.close();
  };

  return (
    <div className="space-y-6">
      {/* Header & Permit Toolbar */}
      <div className={`glass-panel rounded-2xl p-5 border flex flex-wrap items-center justify-between gap-4 ${
        isDarkMode ? 'border-gray-800' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        <div>
          <h2 className={`text-lg font-extrabold flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            <FileText className="w-5 h-5 text-emerald-600" />
            Digital Tree Felling & Compensatory Plantation Registry
          </h2>
          <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-slate-500'}`}>
            Mandatory 1:10 Compensatory Ratio Enforcement under AP Urban Forestry Guidelines
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className={`w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 ${
              isDarkMode ? 'text-gray-400' : 'text-slate-400'
            }`} />
            <input
              type="text"
              placeholder="Search permit ID or applicant..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`border rounded-xl pl-9 pr-4 py-2 text-xs focus:outline-none focus:border-emerald-500 ${
                isDarkMode ? 'bg-gray-950 border-gray-800 text-white' : 'bg-white border-slate-300 text-slate-900'
              }`}
            />
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            Issue Felling Permit
          </button>
        </div>
      </div>

      {/* Permits Table */}
      <div className={`glass-panel rounded-2xl border overflow-hidden ${
        isDarkMode ? 'border-gray-800' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className={`font-mono text-[11px] uppercase border-b ${
              isDarkMode ? 'bg-gray-950 text-gray-400 border-gray-800' : 'bg-slate-100 text-slate-700 border-slate-200'
            }`}>
              <tr>
                <th className="px-4 py-3">Permit ID & Ward</th>
                <th className="px-4 py-3">Applicant & Reason</th>
                <th className="px-4 py-3">Trees Approved</th>
                <th className="px-4 py-3">1:10 Mandatory Quota</th>
                <th className="px-4 py-3">Deposit Guarantee</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Escrow & Survival Audits</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDarkMode ? 'divide-gray-800/60 text-gray-300' : 'divide-slate-200 text-slate-800'}`}>
              {filteredPermits.map(permit => {
                const isDeficit = permit.plantedCount < permit.mandatoryCompensatoryQuota;

                return (
                  <tr key={permit.permitId} className={isDarkMode ? 'hover:bg-gray-900/50' : 'hover:bg-slate-50'}>
                    <td className="px-4 py-3 font-medium">
                      <div className="font-mono font-bold text-emerald-600">{permit.permitId}</div>
                      <div className={`text-xs font-bold mt-0.5 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{permit.wardName}</div>
                      <div className={`text-[10px] font-mono ${isDarkMode ? 'text-gray-400' : 'text-slate-500'}`}>Ward No: {permit.wardNo}</div>
                    </td>

                    <td className="px-4 py-3">
                      <div className={`font-bold max-w-[220px] truncate ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{permit.applicant}</div>
                      <div className={`text-[11px] max-w-[220px] truncate mt-0.5 ${isDarkMode ? 'text-gray-400' : 'text-slate-600'}`}>{permit.reason}</div>
                      <div className="text-[10px] text-emerald-700 font-mono font-bold mt-0.5">Species: {permit.species}</div>
                    </td>

                    <td className="px-4 py-3 font-mono">
                      <span className="text-sm font-bold text-amber-600">{permit.treesApproved}</span> Trees
                    </td>

                    <td className="px-4 py-3 font-mono">
                      <div className={`text-xs font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{permit.plantedCount} / {permit.mandatoryCompensatoryQuota} Planted</div>
                      <div className={`w-28 h-1.5 rounded-full mt-1 overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-slate-200'}`}>
                        <div
                          className={`h-full ${isDeficit ? 'bg-red-600' : 'bg-emerald-600'}`}
                          style={{ width: `${Math.min(100, (permit.plantedCount / permit.mandatoryCompensatoryQuota) * 100)}%` }}
                        ></div>
                      </div>
                    </td>

                    <td className="px-4 py-3 font-mono">
                      <div className="text-emerald-600 font-extrabold">₹{permit.depositPaidRs.toLocaleString()}</div>
                      <button
                        onClick={() => handlePrintChallan(permit)}
                        className="text-[10px] text-indigo-600 hover:underline font-bold flex items-center gap-1 mt-0.5"
                      >
                        <CreditCard className="w-3 h-3" /> E-Challan Slip
                      </button>
                    </td>

                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold border inline-flex items-center gap-1 ${
                        permit.status === 'Completed'
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                          : permit.status === 'Critical Non-Compliance'
                          ? 'bg-red-100 text-red-800 border-red-300'
                          : 'bg-amber-100 text-amber-800 border-amber-300'
                      }`}>
                        {permit.status === 'Completed' ? <CheckCircle2 className="w-3 h-3 text-emerald-600" /> : <AlertTriangle className="w-3 h-3 text-amber-600" />}
                        {permit.status}
                      </span>
                    </td>

                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end space-x-1.5">
                        <button
                          onClick={() => handleOpenAudit(permit)}
                          className="px-2.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-300 font-bold text-[10px] flex items-center gap-1"
                          title="Run Survival Audit & Penalty Calculator"
                        >
                          <Calculator className="w-3.5 h-3.5" /> Audit Survival
                        </button>
                        <button
                          onClick={() => setPreviewPhoto(permit)}
                          className={`p-1.5 rounded-lg border transition-colors ${
                            isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300 hover:text-white' : 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200'
                          }`}
                          title="View Proof Photos"
                        >
                          <ImageIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Feature 3 Modal: Field Sapling Survival Audit & Re-Planting Penalty Calculator */}
      {auditPermit && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border ${
            isDarkMode ? 'bg-gray-900 border-gray-800 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            <div className={`flex justify-between items-center border-b pb-3 ${isDarkMode ? 'border-gray-800' : 'border-slate-200'}`}>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <h3 className="text-base font-bold">Field Sapling Survival & Penalty Audit</h3>
              </div>
              <button onClick={() => setAuditPermit(null)} className="text-gray-400 hover:text-slate-900 text-lg">&times;</button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="font-bold text-slate-900">{auditPermit.applicant}</div>
                <div className="text-[11px] text-slate-500 font-mono">Permit ID: {auditPermit.permitId} • Target Quota: {auditPermit.mandatoryCompensatoryQuota} Saplings</div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Enter Verified Living Saplings Count</label>
                <input
                  type="number"
                  min="0"
                  max={auditPermit.mandatoryCompensatoryQuota}
                  value={verifiedLivingCount}
                  onChange={(e) => setVerifiedLivingCount(parseInt(e.target.value) || 0)}
                  className="w-full border border-slate-300 rounded-xl p-2.5 bg-white text-slate-900 font-bold font-mono text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Dynamic Survival & Penalty Calculation */}
              {(() => {
                const rate = Math.round((verifiedLivingCount / auditPermit.mandatoryCompensatoryQuota) * 100);
                const isFail = rate < 80;
                const deadCount = auditPermit.mandatoryCompensatoryQuota - verifiedLivingCount;
                const penaltyRs = deadCount * 3000; // ₹3000 per dead sapling penalty

                return (
                  <div className={`p-4 rounded-2xl border space-y-2 ${isFail ? 'bg-red-50 border-red-300 text-red-950' : 'bg-emerald-50 border-emerald-300 text-emerald-950'}`}>
                    <div className="flex justify-between items-center">
                      <span className="font-bold">Sapling Survival Rate:</span>
                      <strong className={`font-mono text-base ${isFail ? 'text-red-600' : 'text-emerald-700'}`}>{rate}%</strong>
                    </div>

                    {isFail ? (
                      <div className="space-y-1 pt-1 text-[11px]">
                        <p className="text-red-700 font-bold">⚠️ Survival Rate below 80% mandatory threshold!</p>
                        <div className="flex justify-between pt-1 border-t border-red-200">
                          <span>Re-Planting Penalty Fee:</span>
                          <strong className="text-red-600 font-mono">₹{penaltyRs.toLocaleString()}</strong>
                        </div>
                        <p className="text-[10px] text-red-600">Deducted from ₹{auditPermit.depositPaidRs.toLocaleString()} Escrow Deposit.</p>
                      </div>
                    ) : (
                      <div className="text-[11px] text-emerald-800 font-medium">
                        ✓ Survival Rate meets WALTA guidelines. Full Escrow deposit eligible for release.
                      </div>
                    )}
                  </div>
                );
              })()}

              <button
                onClick={() => setAuditPermit(null)}
                className="w-full py-2.5 rounded-xl font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md"
              >
                Save Audit Record
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Issue Felling Permit */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl border ${
            isDarkMode ? 'bg-gray-900 border-gray-800 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            <div className={`flex justify-between items-center border-b pb-3 ${isDarkMode ? 'border-gray-800' : 'border-slate-200'}`}>
              <h3 className={`text-base font-bold flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                <PlusCircle className="w-5 h-5 text-emerald-600" />
                Issue Tree Felling & Compensatory Permit
              </h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-slate-900 text-lg">&times;</button>
            </div>

            <form onSubmit={handleSubmitPermit} className="space-y-3 text-xs">
              <div>
                <label className={`block font-semibold mb-1 ${isDarkMode ? 'text-gray-300' : 'text-slate-700'}`}>Select GVMC Ward</label>
                <select
                  value={formData.wardNo}
                  onChange={(e) => setFormData({ ...formData, wardNo: e.target.value })}
                  className={`w-full border rounded-xl p-2.5 focus:outline-none focus:border-emerald-500 ${
                    isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                  }`}
                >
                  {GVMC_WARDS.map(w => (
                    <option key={w.wardNo} value={w.wardNo}>
                      Ward {w.wardNo}: {w.name} ({w.zone})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={`block font-semibold mb-1 ${isDarkMode ? 'text-gray-300' : 'text-slate-700'}`}>Applicant Organization / Department</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. VMRDA / NHAI / GVMC Engineering"
                  value={formData.applicant}
                  onChange={(e) => setFormData({ ...formData, applicant: e.target.value })}
                  className={`w-full border rounded-xl p-2.5 focus:outline-none focus:border-emerald-500 ${
                    isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                  }`}
                />
              </div>

              <div>
                <label className={`block font-semibold mb-1 ${isDarkMode ? 'text-gray-300' : 'text-slate-700'}`}>Reason for Tree Cutting</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Flyover pillar construction / Road widening"
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  className={`w-full border rounded-xl p-2.5 focus:outline-none focus:border-emerald-500 ${
                    isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                  }`}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={`block font-semibold mb-1 ${isDarkMode ? 'text-gray-300' : 'text-slate-700'}`}>Trees Requested</label>
                  <input
                    type="number"
                    min="1"
                    max="1000"
                    value={formData.treesRequested}
                    onChange={(e) => setFormData({ ...formData, treesRequested: e.target.value })}
                    className={`w-full border rounded-xl p-2.5 focus:outline-none focus:border-emerald-500 ${
                      isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                    }`}
                  />
                </div>

                <div>
                  <label className={`block font-semibold mb-1 ${isDarkMode ? 'text-gray-300' : 'text-slate-700'}`}>1:10 Mandatory Quota</label>
                  <input
                    type="text"
                    disabled
                    value={`${formData.treesRequested * 10} Saplings`}
                    className="w-full bg-emerald-50 border border-emerald-400 rounded-xl p-2.5 text-emerald-800 font-bold font-mono"
                  />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-[11px] text-emerald-900 font-medium">
                💰 <strong>Escrow Deposit Calculation:</strong> ₹{(formData.treesRequested * 10 * 2000).toLocaleString()} must be deposited in GVMC Urban Forestry Escrow account prior to permit issuance.
              </div>

              <div className="flex justify-end space-x-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-500 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md"
                >
                  Issue Permit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Preview Proof Photos */}
      {previewPhoto && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`rounded-2xl max-w-2xl w-full p-6 space-y-4 shadow-2xl border ${
            isDarkMode ? 'bg-gray-900 border-gray-800 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            <div className={`flex justify-between items-center border-b pb-3 ${isDarkMode ? 'border-gray-800' : 'border-slate-200'}`}>
              <div>
                <h3 className={`text-base font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Geo-Tagged Field Verification Proof</h3>
                <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-slate-500'}`}>Permit ID: {previewPhoto.permitId} • {previewPhoto.wardName}</p>
              </div>
              <button onClick={() => setPreviewPhoto(null)} className="text-gray-400 hover:text-slate-900 text-lg">&times;</button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className={`text-xs font-bold block mb-1 ${isDarkMode ? 'text-gray-300' : 'text-slate-700'}`}>Before Felling Site Photo</span>
                <img src={previewPhoto.photoProofBefore} alt="Before" className="w-full h-48 object-cover rounded-xl border border-slate-300" />
              </div>
              <div>
                <span className={`text-xs font-bold block mb-1 ${isDarkMode ? 'text-gray-300' : 'text-slate-700'}`}>Compensatory Sapling Verification</span>
                <img src={previewPhoto.photoProofAfter} alt="After" className="w-full h-48 object-cover rounded-xl border border-slate-300" />
              </div>
            </div>

            <div className={`flex justify-between items-center pt-2 text-xs border-t ${
              isDarkMode ? 'border-gray-800 text-gray-400' : 'border-slate-200 text-slate-600'
            }`}>
              <span>Inspecting Officer: <strong className={isDarkMode ? 'text-white' : 'text-slate-900'}>{previewPhoto.officerInCharge}</strong></span>
              <span className="text-emerald-700 font-mono font-bold">QR Verified Geo-Hash</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
