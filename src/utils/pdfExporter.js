// Executive Report Generator for GVMC Urban Forestry Department

export function printExecutiveReport(citySummary, wards, selectedWard = null) {
  const printWindow = window.open('', '_blank');
  
  const reportDate = new Date().toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const wardRows = (selectedWard ? [selectedWard] : wards).map(w => `
    <tr>
      <td style="padding: 8px; border-bottom: 1px solid #ddd; font-weight: 600;">Ward ${w.wardNo} - ${w.name}</td>
      <td style="padding: 8px; border-bottom: 1px solid #ddd;">${w.zone}</td>
      <td style="padding: 8px; border-bottom: 1px solid #ddd;">${w.canopy2023Ha} ha → ${w.canopy2025Ha} ha</td>
      <td style="padding: 8px; border-bottom: 1px solid #ddd; color: ${w.netCanopyChangePercent < -5 ? '#dc2626' : '#059669'}; font-weight: bold;">
        ${w.netCanopyChangePercent}%
      </td>
      <td style="padding: 8px; border-bottom: 1px solid #ddd;">${w.treesFelled2024} felled / ${w.treesPlanted2024} planted</td>
      <td style="padding: 8px; border-bottom: 1px solid #ddd;">
        <span style="background: ${w.criticality === 'Critical' ? '#fee2e2; color: #991b1b' : w.criticality === 'Warning' ? '#fef3c7; color: #92400e' : '#d1fae5; color: #065f46'}; padding: 3px 8px; border-radius: 4px; font-size: 12px;">
          ${w.criticality}
        </span>
      </td>
    </tr>
  `).join('');

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>GVMC Urban Tree Canopy Loss & Replacement Report</title>
      <style>
        body { font-family: 'Helvetica Neue', Arial, sans-serif; padding: 25px; color: #111; line-height: 1.5; }
        .header { border-bottom: 3px solid #059669; padding-bottom: 15px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center; }
        .title { font-size: 22px; font-weight: bold; color: #064e3b; margin: 0; }
        .subtitle { font-size: 13px; color: #666; margin-top: 4px; }
        .badge { background: #059669; color: white; padding: 4px 10px; border-radius: 4px; font-size: 12px; font-weight: bold; }
        .summary-box { background: #f0fdf4; border: 1px solid #bbf7d0; padding: 15px; border-radius: 6px; margin-bottom: 20px; display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }
        .summary-card { text-align: center; }
        .summary-card .val { font-size: 20px; font-weight: bold; color: #047857; }
        .summary-card .lbl { font-size: 11px; color: #555; text-transform: uppercase; }
        table { width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 13px; }
        th { background: #f3f4f6; text-align: left; padding: 10px; border-bottom: 2px solid #ccc; font-weight: bold; color: #374151; }
        .footer { margin-top: 40px; font-size: 11px; color: #888; border-top: 1px solid #eee; padding-top: 10px; text-align: center; }
      </style>
    </head>
    <body>
      <div class="header">
        <div>
          <h1 class="title">GREATER VISAKHAPATNAM MUNICIPAL CORPORATION (GVMC)</h1>
          <div class="subtitle">Urban Forestry Department • Problem Statement PS69 Monitoring Report</div>
        </div>
        <div>
          <span class="badge">Official Report</span>
          <div style="font-size: 11px; margin-top: 5px; color: #666;">Generated: ${reportDate}</div>
        </div>
      </div>

      <h2>Citywide Urban Tree Canopy Loss & Compensatory Status</h2>
      <div class="summary-box">
        <div class="summary-card">
          <div class="val">${citySummary.totalWards}</div>
          <div class="lbl">Monitored Wards</div>
        </div>
        <div class="summary-card">
          <div class="val" style="color: #dc2626;">-${citySummary.netLossHa} ha (${citySummary.netLossPercent}%)</div>
          <div class="lbl">Net Canopy Change</div>
        </div>
        <div class="summary-card">
          <div class="val">${citySummary.totalTreesFelled2024.toLocaleString()}</div>
          <div class="lbl">Trees Felled (2024)</div>
        </div>
        <div class="summary-card">
          <div class="val">${citySummary.replacementDeficitTrees.toLocaleString()}</div>
          <div class="lbl">1:10 Deficit Gap</div>
        </div>
      </div>

      <h3>Ward-by-Ward Net Canopy Audit ${selectedWard ? `(Filtered: Ward ${selectedWard.wardNo})` : ''}</h3>
      <table>
        <thead>
          <tr>
            <th>Ward Name</th>
            <th>Zone</th>
            <th>Canopy (2023 → 2025)</th>
            <th>Net Loss %</th>
            <th>Felled / Planted</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          ${wardRows}
        </tbody>
      </table>

      <div style="margin-top: 25px; background: #fffbebf; border-left: 4px solid #f59e0b; padding: 12px; font-size: 12px;">
        <strong>Recommended Action for Urban Forestry Officers:</strong>
        <p style="margin: 4px 0 0 0;">Priority target zones with critical canopy deficit (Zone 8 Gajuwaka & Zone 1 Madhurawada) require immediate mandatory 1:10 compensatory tree plantation drives and automated Sentinel-2 satellite NDVI quarterly audits.</p>
      </div>

      <div class="footer">
        Submitted under GVMC Urban Forestry Digital Monitoring Initiative (PS69) • Confidential Official Record
      </div>

      <script>
        window.onload = function() {
          window.print();
        }
      </script>
    </body>
    </html>
  `;

  printWindow.document.write(htmlContent);
  printWindow.document.close();
}
