# 🌳 GVMC Urban Tree Canopy Registry & Monitor

> **Official Solution for Hackathon Problem Statement PS69**  
> *Greater Visakhapatnam Municipal Corporation (GVMC) Urban Forestry Department*

🌐 **Live Netlify Production URL**: [https://urban-treecanopty.netlify.app](https://urban-treecanopty.netlify.app)  
📦 **GitHub Source Repository**: [https://github.com/Nirmal-AIM/Urban-Tree-Canopy-Registry-Monitor](https://github.com/Nirmal-AIM/Urban-Tree-Canopy-Registry-Monitor)

---

## 📌 Executive Overview
The **GVMC Urban Tree Canopy Registry & Monitor** is an enterprise-grade spatial governance platform designed to detect annual tree canopy loss, enforce mandatory **1:10 compensatory re-plantation quotas**, track digital felling permits, and verify sapling survival across all **98 GVMC Municipal Wards** in Visakhapatnam, Andhra Pradesh.

---

## 🔥 Key Hackathon Features

### 1. 🛰️ Multi-Spectral Satellite NDVI Visualizer & Dual-Pane Comparison
- Real-time spectral band calculations using **Sentinel-2 L2A Telemetry** ($\text{NDVI} = \frac{\text{NIR B8} - \text{RED B4}}{\text{NIR B8} + \text{RED B4}}$).
- **Interactive Dual-Pane Swipe Comparison Slider**: Swipe compare **2023 Baseline Satellite Imagery** against **Current Live Maps**.
- Integrated **Live Google Maps (Streets View)** and **Esri Live World Satellite Tiles**.
- Dynamic year stepper supporting telemetry from **2020 through 2026 AI Predictive Forecast**.

### 2. 📊 Ward Net Change Audit Dashboard & Scorecards
- Live monitoring of monitored canopy area (Hectares), net canopy loss percentage, and thermal heat island index.
- Recharts ward comparison bar graphs and automated **Action Mandated Leaderboards** for critical loss wards ($>10\%$ loss).

### 3. 📄 Digital Escrow E-Challan & Penalty Calculator
- **Digital Felling Permit & Replacement Registry**: Tracks felling approvals, QR-verified permits, and mandatory 1:10 sapling quotas.
- **Escrow E-Challan Receipt Generator**: Printable official deposit receipts (₹2,000 / sapling mandatory escrow).
- **Field Sapling Survival Audit**: Calculates survival rates and auto-computes re-plantation default penalties (₹3,000 / dead tree).

### 4. 🤝 Green Vizag Citizen & RWA Adopt-a-Tree Portal
- Citizen violation reporting modal.
- Neighborhood adopt-a-tree showcase and RWA free sapling requisition system.

### 5. 📑 Executive Audit Export System
- **Print-Ready Official PDF Audit Report Generator**: Generates formatted GVMC executive PDF reports.
- **Raw CSV Dataset Exporter**: Download full 98-ward spatial data for offline analysis (`Export CSV`).

---

## 📜 Legal & Compliance Framework
- **AP WALTA Act 2002**: Mandates 10 replacement trees for every authorized tree felled.
- **GVMC Legal Moratorium**: Wards exceeding 10% annual canopy loss automatically trigger a commercial felling permit freeze.

---

## 🛠️ Technology Stack
- **Frontend**: React 19, Vite, JavaScript (ESNext)
- **Styling**: Vanilla TailwindCSS (Clean Government & High-Contrast Theme)
- **Mapping & GIS**: Leaflet, React-Leaflet, OpenStreetMap & Esri World Imagery
- **Data Visualization**: Recharts
- **Raster Processing**: Custom HTML5 Canvas Spatial Engine
- **PDF Generation**: HTML5 Print & Executive Renderer

---

## 🚀 Local Development Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Nirmal-AIM/Urban-Tree-Canopy-Registry-Monitor.git
   cd Urban-Tree-Canopy-Registry-Monitor
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the dev server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

---

*Developed for the GVMC Urban Forestry Digital Governance Initiative (Problem Statement PS69).*
