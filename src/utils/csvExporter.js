// Export Ward Net Change Audit Dataset as CSV for Government Analysts
export function exportWardCsvData(wards, year = '2025') {
  const headers = [
    'Ward No',
    'Ward Name',
    'Zone',
    'Latitude',
    'Longitude',
    'Area (Ha)',
    '2023 Baseline Canopy (Ha)',
    `${year} Current Canopy (Ha)`,
    '2023 NDVI',
    `${year} NDVI`,
    'Trees Felled (2024)',
    'Trees Planted (2024)',
    '1:10 Target Quota',
    'Net Canopy Change (%)',
    'Urban Heat Index',
    'Criticality Status',
    'Survival Rate (%)'
  ];

  const rows = wards.map(w => [
    w.wardNo,
    `"${w.name.replace(/"/g, '""')}"`,
    `"${w.zone}"`,
    w.lat,
    w.lng,
    w.areaHa,
    w.canopy2023Ha,
    w.canopy2025Ha,
    w.ndvi2023,
    w.ndvi2025,
    w.treesFelled2024,
    w.treesPlanted2024,
    w.targetCompensatory,
    `${w.netCanopyChangePercent}%`,
    `"${w.heatIndex}"`,
    w.criticality,
    `${w.survivalRatePercent}%`
  ]);

  const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `GVMC_Ward_Tree_Canopy_Audit_${year}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
