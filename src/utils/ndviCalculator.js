  // NDVI Spectral Index Calculator & Satellite Remote Sensing Utilities

/**
 * Calculates Normalized Difference Vegetation Index (NDVI)
 * Formula: (NIR - RED) / (NIR + RED)
 * NIR (Near Infrared): Band 8 on Sentinel-2
 * RED: Band 4 on Sentinel-2
 */
export function calculateNdvi(nir, red) {
  if (nir + red === 0) return 0;
  return parseFloat(((nir - red) / (nir + red)).toFixed(3));
}

/**
 * Categorizes NDVI values into environmental canopy density classes
 */
export function getNdviCategory(ndvi) {
  if (ndvi >= 0.70) return { label: 'Dense Dense Tropical Canopy', color: '#047857', class: 'High' };
  if (ndvi >= 0.50) return { label: 'Moderate Urban Canopy', color: '#10B981', class: 'Moderate' };
  if (ndvi >= 0.30) return { label: 'Sparse Vegetation / Shrubs', color: '#F59E0B', class: 'Low' };
  if (ndvi >= 0.15) return { label: 'Urban Built-Up / Bare Soil', color: '#EF4444', class: 'Critical' };
  return { label: 'Water Body / Asphalt Road', color: '#3B82F6', class: 'None' };
}

/**
 * Formats Hectares to Tree Estimate
 * Standard urban forestry conversion: ~250 mature trees per hectare of canopy cover
 */
export function hectaresToEstimatedTrees(hectares) {
  return Math.round(hectares * 250);
}

/**
 * Calculates Compensatory Target based on Andhra Pradesh Urban Forestry Act (1:10 ratio)
 */
export function calculateCompensatoryTarget(treesFelled) {
  return treesFelled * 10;
}
