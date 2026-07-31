import React, { useState, useEffect, useRef } from 'react';
import { Layers, Eye, RefreshCw, ZoomIn, ZoomOut, Info, AlertTriangle, CheckCircle, ShieldAlert, Sparkles, MapPin, Sliders, Activity, Calendar, Map as MapIcon, Globe } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet';
import { calculateNdvi, getNdviCategory } from '../utils/ndviCalculator';
import L from 'leaflet';

// Fix default Leaflet icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export default function NdviMapViewer({ wards, selectedWard, onSelectWard, isDarkMode, selectedYear, onSelectYear }) {
  const [sliderPos, setSliderPos] = useState(50);
  const [activeLayerMode, setActiveLayerMode] = useState('ndvi'); // 'ndvi', 'rgb', 'heatmap', 'google_streets', 'google_sat'

  const [inspectorData, setInspectorData] = useState({
    lat: 17.7420,
    lng: 83.3325,
    wardName: 'MVP Colony Sector 1-5',
    nir: 0.76,
    red: 0.22,
    ndvi: 0.55,
    year2023Ndvi: 0.64,
    netLossPercent: -14.0,
    status: 'Canopy Loss Detected'
  });

  const canvasRef2023 = useRef(null);
  const canvasRef2025 = useRef(null);

  useEffect(() => {
    if (activeLayerMode !== 'google_streets' && activeLayerMode !== 'google_sat') {
      drawHighResSatelliteCanvas(canvasRef2023.current, '2023', activeLayerMode);
      drawHighResSatelliteCanvas(canvasRef2025.current, selectedYear, activeLayerMode);
    }
  }, [activeLayerMode, selectedYear]);

  function drawHighResSatelliteCanvas(canvas, year, mode) {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // DEFAULT SATELLITE / NDVI / HEATMAP RASTER MODES
    const baseGradient = ctx.createLinearGradient(0, 0, width, height);
    baseGradient.addColorStop(0, '#060d1a');
    baseGradient.addColorStop(1, '#030712');
    ctx.fillStyle = baseGradient;
    ctx.fillRect(0, 0, width, height);

    let ndviMod = 1.0;
    if (year === '2020') ndviMod = 1.15;
    if (year === '2022') ndviMod = 1.05;
    if (year === '2023') ndviMod = 1.00;
    if (year === '2024') ndviMod = 0.90;
    if (year === '2025') ndviMod = 0.82;
    if (year === '2026') ndviMod = 0.72;

    const canopyNodes = [
      { x: width * 0.70, y: height * 0.15, radius: 110, ndvi: 0.68 * ndviMod },
      { x: width * 0.58, y: height * 0.25, radius: 140, ndvi: 0.72 * ndviMod },
      { x: width * 0.45, y: height * 0.38, radius: 120, ndvi: 0.78 * (ndviMod > 0.9 ? 1 : 0.95) },
      { x: width * 0.50, y: height * 0.52, radius: 90,  ndvi: 0.54 * ndviMod },
      { x: width * 0.44, y: height * 0.60, radius: 85,  ndvi: 0.61 * ndviMod },
      { x: width * 0.38, y: height * 0.68, radius: 75,  ndvi: 0.48 * ndviMod },
      { x: width * 0.25, y: height * 0.75, radius: 130, ndvi: 0.62 * ndviMod },
      { x: width * 0.18, y: height * 0.85, radius: 150, ndvi: 0.79 },
      { x: width * 0.30, y: height * 0.42, radius: 120, ndvi: 0.63 * ndviMod }
    ];

    canopyNodes.forEach(node => {
      const grad = ctx.createRadialGradient(node.x, node.y, 10, node.x, node.y, node.radius);

      if (mode === 'ndvi') {
        if (node.ndvi >= 0.60) {
          grad.addColorStop(0, 'rgba(4, 120, 87, 0.85)');
          grad.addColorStop(0.5, 'rgba(16, 185, 129, 0.5)');
          grad.addColorStop(1, 'rgba(6, 78, 59, 0.0)');
        } else if (node.ndvi >= 0.42) {
          grad.addColorStop(0, 'rgba(245, 158, 11, 0.85)');
          grad.addColorStop(0.5, 'rgba(217, 119, 6, 0.4)');
          grad.addColorStop(1, 'rgba(180, 83, 9, 0.0)');
        } else {
          grad.addColorStop(0, 'rgba(220, 38, 38, 0.9)');
          grad.addColorStop(0.5, 'rgba(185, 28, 28, 0.5)');
          grad.addColorStop(1, 'rgba(127, 29, 29, 0.0)');
        }
      } else if (mode === 'heatmap') {
        const thermal = 1 - node.ndvi;
        grad.addColorStop(0, `rgba(${Math.round(thermal * 255)}, 30, 60, 0.85)`);
        grad.addColorStop(0.7, `rgba(${Math.round(thermal * 200)}, 100, 30, 0.3)`);
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      } else {
        grad.addColorStop(0, 'rgba(34, 197, 94, 0.7)');
        grad.addColorStop(0.6, 'rgba(21, 128, 61, 0.4)');
        grad.addColorStop(1, 'rgba(20, 83, 45, 0.0)');
      }

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      ctx.fill();
    });

    // Ocean
    const seaGrad = ctx.createLinearGradient(width * 0.65, 0, width, height);
    seaGrad.addColorStop(0, '#0a2540');
    seaGrad.addColorStop(0.6, '#081a2f');
    seaGrad.addColorStop(1, '#040d18');
    ctx.fillStyle = seaGrad;

    ctx.beginPath();
    ctx.moveTo(width * 0.75, 0);
    ctx.bezierCurveTo(width * 0.68, height * 0.35, width * 0.62, height * 0.70, width * 0.85, height);
    ctx.lineTo(width, height);
    ctx.lineTo(width, 0);
    ctx.fill();

    ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(width * 0.75, 0);
    ctx.bezierCurveTo(width * 0.68, height * 0.35, width * 0.62, height * 0.70, width * 0.85, height);
    ctx.stroke();

    // Roads
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 2;
    ctx.setLineDash([6, 4]);
    ctx.beginPath();
    ctx.moveTo(width * 0.05, height * 0.92);
    ctx.lineTo(width * 0.30, height * 0.50);
    ctx.lineTo(width * 0.62, height * 0.10);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  const handleMapClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const closest = wards[Math.floor(Math.random() * wards.length)];
    const simulatedNir = parseFloat((0.6 + Math.random() * 0.3).toFixed(2));
    const simulatedRed = parseFloat((0.15 + Math.random() * 0.25).toFixed(2));
    const computedNdvi = calculateNdvi(simulatedNir, simulatedRed);

    setInspectorData({
      lat: (17.65 + (clickY / rect.height) * 0.25).toFixed(4),
      lng: (83.15 + (clickX / rect.width) * 0.35).toFixed(4),
      wardName: closest.name,
      nir: simulatedNir,
      red: simulatedRed,
      ndvi: computedNdvi,
      year2023Ndvi: closest.ndvi2023,
      netLossPercent: closest.netCanopyChangePercent,
      status: computedNdvi < 0.45 ? 'Critical Canopy Loss Zone' : 'Stable Canopy Cover'
    });

    onSelectWard(closest);
  };

  return (
    <div className="space-y-4">
      {/* Map Control Toolbar */}
      <div className={`glass-panel rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 border transition-colors ${
        isDarkMode ? 'border-gray-800' : 'border-slate-200 bg-white'
      }`}>
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h3 className={`text-sm font-extrabold leading-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Sentinel-2 Multi-Spectral Layer
            </h3>
            <p className={`text-[11px] ${isDarkMode ? 'text-gray-400' : 'text-slate-500'}`}>
              Visakhapatnam Metropolitan Spatial Telemetry
            </p>
          </div>
          
          {/* Map Layer Mode Selector */}
          <div className={`flex p-1 rounded-xl border ml-2 flex-wrap gap-1 ${isDarkMode ? 'bg-gray-950 border-gray-800' : 'bg-slate-100 border-slate-200'}`}>
            <button
              onClick={() => setActiveLayerMode('ndvi')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeLayerMode === 'ndvi' ? 'bg-emerald-600 text-white shadow-md' : isDarkMode ? 'text-gray-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              NDVI Index Map
            </button>
            <button
              onClick={() => setActiveLayerMode('rgb')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeLayerMode === 'rgb' ? 'bg-emerald-600 text-white shadow-md' : isDarkMode ? 'text-gray-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              True-Color (RGB)
            </button>
            <button
              onClick={() => setActiveLayerMode('heatmap')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeLayerMode === 'heatmap' ? 'bg-emerald-600 text-white shadow-md' : isDarkMode ? 'text-gray-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Heat Island Overlay
            </button>
            <button
              onClick={() => setActiveLayerMode('google_streets')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 ${
                activeLayerMode === 'google_streets' ? 'bg-blue-600 text-white shadow-md' : isDarkMode ? 'text-gray-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <MapIcon className="w-3.5 h-3.5" />
              Google Maps (Live Streets)
            </button>
            <button
              onClick={() => setActiveLayerMode('google_sat')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 ${
                activeLayerMode === 'google_sat' ? 'bg-indigo-600 text-white shadow-md' : isDarkMode ? 'text-gray-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              Google Satellite (Live Tiles)
            </button>
          </div>
        </div>

        {/* Multi-Year Satellite Timeline Stepper */}
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-emerald-600" />
          <span className={`text-xs font-bold ${isDarkMode ? 'text-gray-300' : 'text-slate-700'}`}>Timeline Year:</span>
          <div className={`flex p-1 rounded-xl border ${isDarkMode ? 'bg-gray-950 border-gray-800' : 'bg-slate-100 border-slate-200'}`}>
            {['2020', '2022', '2023', '2024', '2025', '2026'].map(y => (
              <button
                key={y}
                onClick={() => onSelectYear(y)}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                  selectedYear === y 
                    ? y === '2026' ? 'bg-amber-500 text-slate-950' : 'bg-emerald-600 text-white shadow-sm' 
                    : isDarkMode ? 'text-gray-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {y}{y === '2026' ? ' (Forecast)' : ''}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Map Display Container - Strictly Clipped with overflow-hidden and Scoped z-index */}
      <div className="relative w-full h-[600px] rounded-3xl overflow-hidden border border-gray-800 shadow-2xl glass-panel group isolation-auto">
        
        {/* IF LIVE GOOGLE MAPS / SATELLITE TILES MODE WITH DUAL-PANE SWIPE COMPARISON */}
        {activeLayerMode === 'google_streets' || activeLayerMode === 'google_sat' ? (
          <div className="relative w-full h-full overflow-hidden">
            {/* Right Map Layer: Live Selected Year Satellite / Street View */}
            <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
              <MapContainer
                center={[17.7230, 83.3150]}
                zoom={12}
                style={{ width: '100%', height: '100%' }}
                scrollWheelZoom={true}
              >
                {activeLayerMode === 'google_streets' ? (
                  <TileLayer
                    attribution='&copy; OpenStreetMap & Google Map Tiles'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                ) : (
                  <TileLayer
                    attribution='Tiles &copy; Esri World Imagery Satellite'
                    url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                  />
                )}

                {wards.map(w => (
                  <CircleMarker
                    key={w.wardNo}
                    center={[w.lat, w.lng]}
                    radius={12}
                    pathOptions={{
                      color: w.criticality === 'Critical' ? '#dc2626' : w.criticality === 'Warning' ? '#f59e0b' : '#10b981',
                      fillColor: w.criticality === 'Critical' ? '#ef4444' : w.criticality === 'Warning' ? '#fbbf24' : '#34d399',
                      fillOpacity: 0.8
                    }}
                    eventHandlers={{ click: () => onSelectWard(w) }}
                  >
                    <Popup>
                      <div className="p-1 text-xs">
                        <strong className="text-slate-900 font-bold">Ward {w.wardNo}: {w.name}</strong>
                        <p className="text-slate-600 mt-1">{w.zone}</p>
                        <p className="text-red-600 font-mono font-bold mt-1">Canopy Loss ({selectedYear}): {w.netCanopyChangePercent}%</p>
                      </div>
                    </Popup>
                  </CircleMarker>
                ))}
              </MapContainer>

              <div className="absolute top-4 right-4 z-10 bg-gray-950/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-emerald-500/30 text-xs font-mono text-emerald-400 flex items-center gap-2 shadow-xl pointer-events-none">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                Google Map Live ({selectedYear === '2026' ? '2026 AI Forecast' : `Year ${selectedYear}`})
              </div>
            </div>

            {/* Left Clipped Map Layer: 2023 Baseline Satellite View */}
            <div
              className="absolute top-0 left-0 bottom-0 z-10 overflow-hidden border-r-2 border-emerald-400 shadow-2xl pointer-events-none"
              style={{ width: `${sliderPos}%` }}
            >
              <div className="w-[1600px] h-[600px] overflow-hidden">
                <MapContainer
                  center={[17.7230, 83.3150]}
                  zoom={12}
                  style={{ width: '100%', height: '100%' }}
                  zoomControl={false}
                  dragging={false}
                  doubleClickZoom={false}
                  scrollWheelZoom={false}
                >
                  <TileLayer
                    attribution='Tiles &copy; Esri 2023 Baseline'
                    url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                  />
                </MapContainer>
              </div>
              <div className="absolute top-4 left-4 z-10 bg-gray-950/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-cyan-500/30 text-xs font-mono text-cyan-400 flex items-center gap-2 shadow-xl">
                <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                2023 Google Baseline Satellite
              </div>
            </div>
          </div>
        ) : (
          /* DUAL-PANE CANVAS NDVI MAP */
          <>
            {/* Layer 1: Selected Timeline Year NDVI */}
            <div className="absolute inset-0 w-full h-full cursor-crosshair overflow-hidden" onClick={handleMapClick}>
              <canvas ref={canvasRef2025} width={1600} height={600} className="w-full h-full object-cover" />
              <div className="absolute top-4 right-4 bg-gray-950/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-emerald-500/30 text-xs font-mono text-emerald-400 flex items-center gap-2 shadow-xl">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                Sentinel-2 L2A ({selectedYear === '2026' ? 'AI 2026 Forecast' : `Year ${selectedYear}`})
              </div>
            </div>

            {/* Layer 2: Year 2023 Baseline NDVI (Clipped by Slider) */}
            <div
              className="absolute top-0 left-0 bottom-0 overflow-hidden cursor-crosshair border-r-2 border-emerald-400 shadow-2xl"
              style={{ width: `${sliderPos}%` }}
              onClick={handleMapClick}
            >
              <canvas ref={canvasRef2023} width={1600} height={600} className="w-full h-full object-cover" />
              <div className="absolute top-4 left-4 bg-gray-950/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-cyan-500/30 text-xs font-mono text-cyan-400 flex items-center gap-2 shadow-xl">
                <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                Sentinel-2 Baseline (2023)
              </div>
            </div>

            {/* Ward Markers */}
            {wards.map((w) => {
              const posX = ((w.lng - 83.15) / 0.32) * 75;
              const posY = (1 - (w.lat - 17.65) / 0.25) * 85;
              const isSelected = selectedWard?.wardNo === w.wardNo;

              return (
                <button
                  key={w.wardNo}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectWard(w);
                  }}
                  style={{ left: `${Math.max(5, Math.min(70, posX))}%`, top: `${Math.max(5, Math.min(85, posY))}%` }}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all group/pin z-20 ${
                    isSelected ? 'scale-125 z-25' : 'hover:scale-110'
                  }`}
                >
                  <div className="relative flex flex-col items-center">
                    {(isSelected || w.criticality === 'Critical') && (
                      <div className={`absolute -inset-2 rounded-full pulse-radar ${
                        w.criticality === 'Critical' ? 'bg-red-500/40' : 'bg-emerald-500/40'
                      }`}></div>
                    )}

                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-extrabold shadow-xl border-2 transition-all ${
                        w.criticality === 'Critical'
                          ? 'bg-red-600 border-red-300 text-white'
                          : w.criticality === 'Warning'
                          ? 'bg-amber-500 border-amber-200 text-gray-950'
                          : 'bg-emerald-600 border-emerald-300 text-white'
                      }`}
                    >
                      W{w.wardNo}
                    </div>
                    
                    {/* Tooltip */}
                    <div className="opacity-0 group-hover/pin:opacity-100 transition-all duration-200 absolute bottom-full mb-2 w-52 p-3 rounded-2xl bg-gray-950/95 backdrop-blur-xl border border-gray-700 text-left text-xs shadow-2xl pointer-events-none z-30">
                      <div className="flex justify-between items-start">
                        <p className="font-bold text-white leading-tight">{w.name}</p>
                        <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-bold ${
                          w.criticality === 'Critical' ? 'bg-red-500/20 text-red-400' : 'bg-emerald-500/20 text-emerald-400'
                        }`}>
                          {w.criticality}
                        </span>
                      </div>
                      <p className="text-[10px] text-gray-400 mt-1">{w.zone}</p>
                      <div className="mt-2 pt-2 border-t border-gray-800/80 flex justify-between items-center text-xs">
                        <span className="text-gray-400">Net Loss ({selectedYear}):</span>
                        <span className={`font-mono font-bold ${w.netCanopyChangePercent < 0 ? 'text-red-400' : 'text-emerald-400'}`}>
                          {w.netCanopyChangePercent}%
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </>
        )}

        {/* Global Range Slider Input - Scoped z-30 Inside Map Container */}
        <input
          type="range"
          min="0"
          max="100"
          value={sliderPos}
          onChange={(e) => setSliderPos(e.target.value)}
          className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30 pointer-events-auto"
        />

        {/* Vertical Swipe Divider Handle - Strictly Bound Inside Container (top-0 bottom-0 z-30) */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-400 via-teal-300 to-emerald-500 pointer-events-none z-30 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.8)] overflow-hidden"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="w-9 h-9 rounded-full bg-emerald-500 border-2 border-white shadow-2xl flex items-center justify-center text-white text-xs font-black shrink-0">
            ↔
          </div>
        </div>

        {/* Map Bottom Banner Overlay */}
        <div className="absolute bottom-4 left-4 right-4 bg-gray-950/90 backdrop-blur-xl p-3.5 rounded-2xl border border-gray-800 flex items-center justify-between text-xs text-gray-200 z-20 shadow-2xl pointer-events-none">
          <div className="flex items-center space-x-2.5">
            <Sliders className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              <strong className="text-white">Interactive Swipe Comparison:</strong> Drag handle to compare 2023 Baseline Satellite (left) vs {selectedYear} Live Map (right).
            </span>
          </div>
          <span className="font-mono text-emerald-400 font-bold hidden sm:inline text-xs bg-emerald-500/10 px-3 py-1 rounded-xl border border-emerald-500/20">
            Visakhapatnam (17.72° N, 83.30° E)
          </span>
        </div>
      </div>

      {/* High-Tech Spectral Pixel Inspector HUD Box */}
      <div className={`rounded-3xl p-5 border grid grid-cols-1 md:grid-cols-4 gap-4 relative overflow-hidden transition-colors ${
        isDarkMode ? 'glass-panel-emerald border-emerald-500/30' : 'bg-emerald-50/90 border-emerald-200 text-slate-900 shadow-sm'
      }`}>
        <div>
          <div className={`text-[10px] font-mono uppercase tracking-widest flex items-center gap-1 font-bold ${
            isDarkMode ? 'text-emerald-300' : 'text-emerald-800'
          }`}>
            <Activity className="w-3.5 h-3.5 text-emerald-600" /> Live Spectral Target Point
          </div>
          <div className={`text-base font-extrabold mt-1 flex items-center gap-1.5 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            <MapPin className="w-4 h-4 text-emerald-600" />
            {inspectorData.wardName}
          </div>
          <div className={`text-xs font-mono mt-0.5 ${isDarkMode ? 'text-gray-400' : 'text-slate-600'}`}>
            GPS: {inspectorData.lat}° N, {inspectorData.lng}° E
          </div>
        </div>

        <div>
          <div className={`text-[10px] font-mono uppercase tracking-widest font-bold ${
            isDarkMode ? 'text-gray-400' : 'text-slate-600'
          }`}>Sentinel-2 Band Reflectance</div>
          <div className={`text-sm font-mono mt-1 flex items-center gap-3 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            <span>NIR (B8): <strong className="text-emerald-600 font-bold">{inspectorData.nir}</strong></span>
            <span>RED (B4): <strong className="text-red-600 font-bold">{inspectorData.red}</strong></span>
          </div>
          <div className={`text-[11px] mt-1 ${isDarkMode ? 'text-gray-400' : 'text-slate-600'}`}>
            Formula: <span className="font-mono text-emerald-700 font-bold">NDVI = (NIR - RED) / (NIR + RED)</span>
          </div>
        </div>

        <div>
          <div className={`text-[10px] font-mono uppercase tracking-widest font-bold ${
            isDarkMode ? 'text-gray-400' : 'text-slate-600'
          }`}>Calculated NDVI Score</div>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-black text-emerald-600 font-mono">{inspectorData.ndvi}</span>
            <span className={`text-xs font-mono ${isDarkMode ? 'text-gray-400' : 'text-slate-600'}`}>
              (2023: <strong className="text-slate-800">{inspectorData.year2023Ndvi}</strong>)
            </span>
          </div>
          <div className="text-xs font-extrabold text-red-600 mt-0.5">
            Net Change: {inspectorData.netLossPercent}%
          </div>
        </div>

        <div className={`flex flex-col justify-center border-t md:border-t-0 md:border-l md:pl-4 pt-3 md:pt-0 ${
          isDarkMode ? 'border-emerald-500/20' : 'border-emerald-200'
        }`}>
          <div className={`text-[10px] font-mono uppercase tracking-widest font-bold ${
            isDarkMode ? 'text-gray-400' : 'text-slate-600'
          }`}>AI Assessment Result</div>
          <div className={`mt-1 text-xs font-extrabold px-3 py-1 rounded-xl inline-flex items-center gap-1.5 w-fit ${
            inspectorData.ndvi < 0.45 
              ? 'bg-red-100 text-red-800 border border-red-300 font-bold' 
              : 'bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold'
          }`}>
            {inspectorData.ndvi < 0.45 ? <AlertTriangle className="w-3.5 h-3.5 text-red-600" /> : <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />}
            {inspectorData.status}
          </div>
          <p className={`text-[10px] mt-1 ${isDarkMode ? 'text-gray-400' : 'text-slate-600 font-medium'}`}>
            Directive: Priority compensatory plantation & tree protection order.
          </p>
        </div>
      </div>
    </div>
  );
}
