/**
 * Estilos CSS para impresión de reportes
 */

export const PRINT_STYLES = `
  @media print {
    @page {
      margin: 0.8cm;
      size: A4 portrait;
    }
    
    /* Reset all elements */
    * {
      -webkit-print-color-adjust: exact !important;
      color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    
    /* Hide everything except print content */
    body * {
      visibility: hidden;
    }
    
    .print-content, .print-content * {
      visibility: visible;
    }
    
    /* Main print container */
    .print-content {
      position: absolute;
      left: 0;
      top: 0;
      width: 100% !important;
      max-width: none !important;
      background: white !important;
      color: black !important;
      font-family: 'Arial', 'Helvetica', sans-serif !important;
      font-size: 11px !important;
      line-height: 1.2 !important;
      margin: 0 !important;
      padding: 0 !important;
      box-sizing: border-box;
    }
    
    /* Report title section */
    .print-header {
      border-bottom: 2px solid #000;
      margin-bottom: 8px;
      padding-bottom: 6px;
      text-align: center;
    }
    
    .print-header h1 {
      font-size: 16px !important;
      margin: 0 !important;
      font-weight: bold !important;
      color: black !important;
    }
    
    .print-header h2 {
      font-size: 12px !important;
      margin: 2px 0 0 0 !important;
      font-weight: normal !important;
      color: black !important;
    }
    
    /* Section spacing */
    .print-section {
      margin-bottom: 8px !important;
      page-break-inside: avoid;
    }
    
    /* Flight info grid - 3 columns */
    .print-info-grid {
      display: grid !important;
      grid-template-columns: 1fr 1fr 1fr !important;
      gap: 6px !important;
      margin-bottom: 8px !important;
    }
    
    .print-info-box {
      border: 1px solid #333 !important;
      padding: 6px !important;
      background-color: #f8f8f8 !important;
      font-size: 9px !important;
      box-sizing: border-box;
    }
    
    .print-info-box h3 {
      font-size: 10px !important;
      margin: 0 0 4px 0 !important;
      font-weight: bold !important;
      color: black !important;
    }
    
    .print-info-box p {
      margin: 1px 0 !important;
      line-height: 1.1 !important;
      color: black !important;
    }
    
    .print-info-box span {
      color: black !important;
    }
    
    .print-info-box strong {
      color: black !important;
      font-weight: bold !important;
    }
    
    /* TPT Section */
    .print-tpt-section {
      margin-bottom: 8px !important;
      padding: 6px !important;
      border: 1px solid #333 !important;
      background-color: #f0f0f0 !important;
    }
    
    .print-tpt-section h3 {
      font-size: 10px !important;
      margin: 0 0 4px 0 !important;
      font-weight: bold !important;
      color: black !important;
    }
    
    .print-tpt-grid {
      display: grid !important;
      grid-template-columns: repeat(4, 1fr) !important;
      gap: 4px !important;
      font-size: 8px !important;
    }
    
    .print-tpt-item {
      text-align: center !important;
      padding: 2px !important;
      background: white !important;
      border: 1px solid #ccc !important;
    }
    
    .print-tpt-item span {
      display: block !important;
      color: black !important;
      font-size: 7px !important;
      margin-bottom: 1px !important;
    }
    
    .print-tpt-item strong {
      display: block !important;
      font-size: 9px !important;
      font-weight: bold !important;
      color: black !important;
    }
    
    /* Operations table - optimized for print */
    .print-table {
      width: 100% !important;
      border-collapse: collapse !important;
      margin-top: 6px !important;
      font-size: 8px !important;
      table-layout: fixed !important;
    }
    
    .print-table th,
    .print-table td {
      border: 1px solid #000 !important;
      padding: 2px 3px !important;
      text-align: left !important;
      vertical-align: top !important;
      color: black !important;
      word-wrap: break-word !important;
      overflow: hidden !important;
    }
    
    .print-table th {
      background-color: #e0e0e0 !important;
      font-weight: bold !important;
      font-size: 7px !important;
      text-align: center !important;
    }
    
    /* Column widths for operations table */
    .print-table th:nth-child(1),
    .print-table td:nth-child(1) {
      width: 35% !important;
    }
    
    .print-table th:nth-child(2),
    .print-table td:nth-child(2) {
      width: 15% !important;
      text-align: center !important;
      font-family: monospace !important;
    }
    
    .print-table th:nth-child(3),
    .print-table td:nth-child(3) {
      width: 15% !important;
      text-align: center !important;
      font-family: monospace !important;
    }
    
    .print-table th:nth-child(4),
    .print-table td:nth-child(4) {
      width: 15% !important;
      text-align: center !important;
      font-style: italic !important;
    }
    
    .print-table th:nth-child(5),
    .print-table td:nth-child(5) {
      width: 20% !important;
      text-align: center !important;
    }
    
    /* Operation name styling */
    .operation-name {
      font-weight: bold !important;
      font-size: 8px !important;
    }
    
    .operation-time {
      font-family: monospace !important;
      font-size: 8px !important;
    }
    
    .operation-duration {
      font-style: italic !important;
      font-size: 8px !important;
    }
    
    /* Notes section */
    .print-notes {
      border: 1px solid #333 !important;
      padding: 6px !important;
      background-color: #f8f8f8 !important;
      margin-top: 8px !important;
      font-size: 9px !important;
    }
    
    .print-notes h3 {
      font-size: 10px !important;
      margin: 0 0 4px 0 !important;
      font-weight: bold !important;
      color: black !important;
    }
    
    .print-notes p {
      margin: 0 !important;
      color: black !important;
      line-height: 1.2 !important;
    }
    
    /* Footer */
    .print-footer {
      margin-top: 8px !important;
      padding-top: 6px !important;
      border-top: 1px solid #333 !important;
      font-size: 7px !important;
      color: black !important;
      text-align: center !important;
    }
    
    /* Hide mobile cards in print */
    .block.lg\\:hidden {
      display: none !important;
    }
    
    /* Show table in print */
    .hidden.lg\\:block {
      display: block !important;
    }
    
    /* Hide non-print elements */
    .no-print,
    button,
    .print\\:hidden {
      display: none !important;
    }
    
    /* Ensure proper spacing and no page breaks in critical sections */
    .print-info-grid,
    .print-tpt-section,
    .print-table {
      page-break-inside: avoid !important;
    }
    
    /* Force black text everywhere */
    * {
      color: black !important;
    }
    
    /* Ensure backgrounds are visible */
    .print-info-box,
    .print-tpt-section,
    .print-notes {
      -webkit-print-color-adjust: exact !important;
      color-adjust: exact !important;
    }
  }
`;

/**
 * Aplica los estilos de impresión al documento
 */
export const applyPrintStyles = (): HTMLStyleElement => {
  const printStyles = document.createElement('style');
  printStyles.textContent = PRINT_STYLES;
  document.head.appendChild(printStyles);
  return printStyles;
};

/**
 * Remueve los estilos de impresión del documento
 */
export const removePrintStyles = (styleElement: HTMLStyleElement): void => {
  if (styleElement && styleElement.parentNode) {
    document.head.removeChild(styleElement);
  }
};
