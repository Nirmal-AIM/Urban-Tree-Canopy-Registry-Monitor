// GVMC Ward Level Urban Tree Canopy & NDVI Dataset for Visakhapatnam (98 Wards, 10 Zones)

export const GVMC_ZONES = [
  { id: 'zone-1', name: 'Zone 1: Bheemili & Madhurawada', color: '#10B981' },
  { id: 'zone-2', name: 'Zone 2: Tagarapuvalasa & Endada', color: '#059669' },
  { id: 'zone-3', name: 'Zone 3: Arilova & Health City', color: '#047857' },
  { id: 'zone-4', name: 'Zone 4: MVP Colony & Siripuram', color: '#14B8A6' },
  { id: 'zone-5', name: 'Zone 5: Jagadamba & Old Town', color: '#F59E0B' },
  { id: 'zone-6', name: 'Zone 6: Gopalapatnam & Simhachalam', color: '#10B981' },
  { id: 'zone-7', name: 'Zone 7: Marripalem & NAD X Roads', color: '#EF4444' },
  { id: 'zone-8', name: 'Zone 8: Gajuwaka & Steel Plant Zone', color: '#DC2626' },
  { id: 'zone-9', name: 'Zone 9: Vadlapudi & Kurmannapalem', color: '#F97316' },
  { id: 'zone-10', name: 'Zone 10: Pendurthi & Anakapalli Corridor', color: '#84CC16' }
];

export const GVMC_WARDS = [
  {
    wardNo: 1,
    name: 'Bheemili Beach Road & Heritage Zone',
    zone: 'Zone 1: Bheemili & Madhurawada',
    lat: 17.8895,
    lng: 83.4542,
    areaHa: 420,
    canopy2023Ha: 145.2,
    canopy2025Ha: 132.8,
    ndvi2023: 0.68,
    ndvi2025: 0.59,
    treesFelled2024: 310,
    treesPlanted2024: 180,
    netCanopyChangePercent: -8.54,
    heatIndex: 'Moderate (31.4°C)',
    criticality: 'Warning',
    keyCauses: ['Resort construction', 'Coastal road expansion'],
    targetCompensatory: 3100,
    plantedCompensatory: 1800,
    survivalRatePercent: 82
  },
  {
    wardNo: 4,
    name: 'Madhurawada IT SEZ & Hill Crest',
    zone: 'Zone 1: Bheemili & Madhurawada',
    lat: 17.8184,
    lng: 83.3768,
    areaHa: 580,
    canopy2023Ha: 210.5,
    canopy2025Ha: 182.0,
    ndvi2023: 0.72,
    ndvi2025: 0.58,
    treesFelled2024: 640,
    treesPlanted2024: 320,
    netCanopyChangePercent: -13.54,
    heatIndex: 'High (34.2°C)',
    criticality: 'Critical',
    keyCauses: ['Commercial IT building construction', 'Six-lane widening'],
    targetCompensatory: 6400,
    plantedCompensatory: 3200,
    survivalRatePercent: 74
  },
  {
    wardNo: 12,
    name: 'Arilova Health City & Kambalakonda Foothills',
    zone: 'Zone 3: Arilova & Health City',
    lat: 17.7650,
    lng: 83.3210,
    areaHa: 390,
    canopy2023Ha: 198.0,
    canopy2025Ha: 194.5,
    ndvi2023: 0.78,
    ndvi2025: 0.76,
    treesFelled2024: 85,
    treesPlanted2024: 450,
    netCanopyChangePercent: -1.77,
    heatIndex: 'Low (29.1°C)',
    criticality: 'Stable',
    keyCauses: ['Minor utility trenching'],
    targetCompensatory: 850,
    plantedCompensatory: 4500,
    survivalRatePercent: 91
  },
  {
    wardNo: 18,
    name: 'MVP Colony Sector 1-5 & AS Raja Grounds',
    zone: 'Zone 4: MVP Colony & Siripuram',
    lat: 17.7420,
    lng: 83.3325,
    areaHa: 310,
    canopy2023Ha: 98.4,
    canopy2025Ha: 89.2,
    ndvi2023: 0.54,
    ndvi2025: 0.46,
    treesFelled2024: 245,
    treesPlanted2024: 120,
    netCanopyChangePercent: -9.35,
    heatIndex: 'High (35.1°C)',
    criticality: 'Warning',
    keyCauses: ['Drain expansion', 'Overhead cable trimming', 'Shopping complex parking'],
    targetCompensatory: 2450,
    plantedCompensatory: 1200,
    survivalRatePercent: 80
  },
  {
    wardNo: 22,
    name: 'Siripuram Junction & AU Campus Fringe',
    zone: 'Zone 4: MVP Colony & Siripuram',
    lat: 17.7230,
    lng: 83.3150,
    areaHa: 260,
    canopy2023Ha: 112.0,
    canopy2025Ha: 104.8,
    ndvi2023: 0.61,
    ndvi2025: 0.55,
    treesFelled2024: 180,
    treesPlanted2024: 220,
    netCanopyChangePercent: -6.43,
    heatIndex: 'Moderate (33.0°C)',
    criticality: 'Warning',
    keyCauses: ['Junction improvement', 'Flyover construction'],
    targetCompensatory: 1800,
    plantedCompensatory: 2200,
    survivalRatePercent: 88
  },
  {
    wardNo: 29,
    name: 'Jagadamba Junction & Poorna Market',
    zone: 'Zone 5: Jagadamba & Old Town',
    lat: 17.7110,
    lng: 83.3020,
    areaHa: 180,
    canopy2023Ha: 24.5,
    canopy2025Ha: 18.2,
    ndvi2023: 0.28,
    ndvi2025: 0.19,
    treesFelled2024: 140,
    treesPlanted2024: 30,
    netCanopyChangePercent: -25.71,
    heatIndex: 'Extreme (37.8°C)',
    criticality: 'Critical',
    keyCauses: ['High density commercial encroachment', 'Multi-level parking expansion'],
    targetCompensatory: 1400,
    plantedCompensatory: 300,
    survivalRatePercent: 62
  },
  {
    wardNo: 35,
    name: 'Kailasagiri Foothills & Tenneti Park',
    zone: 'Zone 4: MVP Colony & Siripuram',
    lat: 17.7490,
    lng: 83.3480,
    areaHa: 340,
    canopy2023Ha: 185.0,
    canopy2025Ha: 189.5,
    ndvi2023: 0.74,
    ndvi2025: 0.77,
    treesFelled2024: 40,
    treesPlanted2024: 600,
    netCanopyChangePercent: 2.43,
    heatIndex: 'Pleasant (28.5°C)',
    criticality: 'Stable',
    keyCauses: ['Cyclonic restoration', 'Urban forestry drive'],
    targetCompensatory: 400,
    plantedCompensatory: 6000,
    survivalRatePercent: 94
  },
  {
    wardNo: 48,
    name: 'Gopalapatnam Railway Station & Bus Depot',
    zone: 'Zone 6: Gopalapatnam & Simhachalam',
    lat: 17.7550,
    lng: 83.2280,
    areaHa: 410,
    canopy2023Ha: 130.0,
    canopy2025Ha: 114.2,
    ndvi2023: 0.52,
    ndvi2025: 0.43,
    treesFelled2024: 380,
    treesPlanted2024: 150,
    netCanopyChangePercent: -12.15,
    heatIndex: 'High (35.6°C)',
    criticality: 'Critical',
    keyCauses: ['Double tracking railway line', 'Road widening near depot'],
    targetCompensatory: 3800,
    plantedCompensatory: 1500,
    survivalRatePercent: 71
  },
  {
    wardNo: 62,
    name: 'Gajuwaka Industrial Highway Corridor',
    zone: 'Zone 8: Gajuwaka & Steel Plant Zone',
    lat: 17.6890,
    lng: 83.2140,
    areaHa: 620,
    canopy2023Ha: 140.0,
    canopy2025Ha: 111.0,
    ndvi2023: 0.41,
    ndvi2025: 0.31,
    treesFelled2024: 820,
    treesPlanted2024: 290,
    netCanopyChangePercent: -20.71,
    heatIndex: 'Extreme (38.4°C)',
    criticality: 'Critical',
    keyCauses: ['Heavy industrial transport corridor expansion', 'Pipeline laying'],
    targetCompensatory: 8200,
    plantedCompensatory: 2900,
    survivalRatePercent: 65
  },
  {
    wardNo: 71,
    name: 'Kurmannapalem Steel Plant Township Gate',
    zone: 'Zone 9: Vadlapudi & Kurmannapalem',
    lat: 17.6620,
    lng: 83.1850,
    areaHa: 510,
    canopy2023Ha: 240.0,
    canopy2025Ha: 232.0,
    ndvi2023: 0.79,
    ndvi2025: 0.74,
    treesFelled2024: 120,
    treesPlanted2024: 480,
    netCanopyChangePercent: -3.33,
    heatIndex: 'Moderate (31.8°C)',
    criticality: 'Stable',
    keyCauses: ['Flyover ramp construction'],
    targetCompensatory: 1200,
    plantedCompensatory: 4800,
    survivalRatePercent: 89
  },
  {
    wardNo: 85,
    name: 'Pendurthi Junction & Anandapuram Highway',
    zone: 'Zone 10: Pendurthi & Anakapalli Corridor',
    lat: 17.7810,
    lng: 83.1990,
    areaHa: 490,
    canopy2023Ha: 178.5,
    canopy2025Ha: 156.0,
    ndvi2023: 0.63,
    ndvi2025: 0.51,
    treesFelled2024: 490,
    treesPlanted2024: 210,
    netCanopyChangePercent: -12.60,
    heatIndex: 'High (34.9°C)',
    criticality: 'Critical',
    keyCauses: ['NH-16 Bypass construction', 'Residential layout sub-division'],
    targetCompensatory: 4900,
    plantedCompensatory: 2100,
    survivalRatePercent: 76
  },
  {
    wardNo: 94,
    name: 'Rushikonda IT Hill & Beach Boulevard',
    zone: 'Zone 1: Bheemili & Madhurawada',
    lat: 17.7834,
    lng: 83.3850,
    areaHa: 360,
    canopy2023Ha: 165.0,
    canopy2025Ha: 148.5,
    ndvi2023: 0.71,
    ndvi2025: 0.61,
    treesFelled2024: 390,
    treesPlanted2024: 310,
    netCanopyChangePercent: -10.00,
    heatIndex: 'Moderate (32.2°C)',
    criticality: 'Warning',
    keyCauses: ['Hospitality development', 'Beach promenade expansion'],
    targetCompensatory: 3900,
    plantedCompensatory: 3100,
    survivalRatePercent: 85
  }
];

// Dynamically compute Wards for any selected Timeline Year (2020 - 2026)
export function getWardsForYear(wards, year = '2025') {
  let multiplier = 1.0;
  if (year === '2020') multiplier = 1.14; // High post-cyclone greenness
  if (year === '2022') multiplier = 1.05;
  if (year === '2023') multiplier = 1.00; // Baseline
  if (year === '2024') multiplier = 0.94;
  if (year === '2025') multiplier = 0.893; // Current year
  if (year === '2026') multiplier = 0.816; // AI Forecast trend

  return wards.map(w => {
    const currentCanopy = parseFloat((w.canopy2023Ha * multiplier).toFixed(1));
    const netLossHa = parseFloat((w.canopy2023Ha - currentCanopy).toFixed(1));
    const netChangePercent = parseFloat((((currentCanopy - w.canopy2023Ha) / w.canopy2023Ha) * 100).toFixed(2));
    const currentNdvi = parseFloat(Math.max(0.10, Math.min(0.95, w.ndvi2023 * multiplier)).toFixed(2));

    let criticality = 'Stable';
    if (netChangePercent < -10) criticality = 'Critical';
    else if (netChangePercent < -5) criticality = 'Warning';

    return {
      ...w,
      canopy2025Ha: currentCanopy,
      ndvi2025: currentNdvi,
      netCanopyChangePercent: netChangePercent,
      criticality,
      selectedYear: year
    };
  });
}

export function calculateDynamicCitySummary(wards, registryList = [], year = '2025') {
  const yearWards = getWardsForYear(wards, year);
  const totalWards = 98;
  const monitoredAreaHa = yearWards.reduce((sum, w) => sum + w.areaHa, 0);
  const canopy2023TotalHa = parseFloat(yearWards.reduce((sum, w) => sum + w.canopy2023Ha, 0).toFixed(1));
  const canopy2025TotalHa = parseFloat(yearWards.reduce((sum, w) => sum + w.canopy2025Ha, 0).toFixed(1));
  const netLossHa = parseFloat((canopy2023TotalHa - canopy2025TotalHa).toFixed(1));
  const netLossPercent = parseFloat(((netLossHa / canopy2023TotalHa) * -100).toFixed(2));
  
  // Dynamic summation from permits registry
  const registryFelled = registryList.reduce((sum, p) => sum + (p.treesApproved || 0), 0);
  const registryPlanted = registryList.reduce((sum, p) => sum + (p.plantedCount || 0), 0);
  
  const baseFelled = yearWards.reduce((sum, w) => sum + w.treesFelled2024, 0);
  const basePlanted = yearWards.reduce((sum, w) => sum + w.treesPlanted2024, 0);

  const totalTreesFelled2024 = baseFelled + registryFelled;
  const totalTreesPlanted2024 = basePlanted + registryPlanted;
  const targetCompensatory = totalTreesFelled2024 * 10;
  const replacementDeficitTrees = targetCompensatory - totalTreesPlanted2024;
  
  const avgSurvival = (yearWards.reduce((sum, w) => sum + w.survivalRatePercent, 0) / yearWards.length).toFixed(1);

  const criticalWardsCount = yearWards.filter(w => w.criticality === 'Critical').length;
  const warningWardsCount = yearWards.filter(w => w.criticality === 'Warning').length;
  const stableWardsCount = yearWards.filter(w => w.criticality === 'Stable').length;

  return {
    selectedYear: year,
    totalWards,
    monitoredAreaHa,
    canopy2023TotalHa,
    canopy2025TotalHa,
    netLossHa,
    netLossPercent,
    totalTreesFelled2024,
    totalTreesPlanted2024,
    replacementDeficitTrees,
    overallSurvivalRatePercent: avgSurvival,
    criticalWardsCount,
    warningWardsCount,
    stableWardsCount
  };
}

export const CITY_SUMMARY = calculateDynamicCitySummary(GVMC_WARDS, [], '2025');
