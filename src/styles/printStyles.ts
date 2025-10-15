/**
 * Estilos CSS para impresión de reportes
 */

export const PRINT_STYLES = `
  @media print {
    @page {
      margin: 1cm;
      size: A4;
    }
    
    body * {
      visibility: hidden;
    }
    
    .print-content, .print-content * {
      visibility: visible;
    }
    
    .print-content {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      background: white !important;
      color: black !important;
      font-size: 12px;
      line-height: 1.3;
    }
    
    .print-header {
      border-bottom: 2px solid #000;
      margin-bottom: 12px;
      padding-bottom: 8px;
    }
    
    .print-header h1 {
      font-size: 18px;
      margin: 0;
      text-align: center;
    }
    
    .print-header h2 {
      font-size: 14px;
      margin: 4px 0 0 0;
      text-align: center;
      font-weight: normal;
    }
    
    .print-section {
      margin-bottom: 15px;
      page-break-inside: avoid;
    }
    
    .print-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 8px;
      font-size: 10px;
    }
    
    .print-table th,
    .print-table td {
      border: 1px solid #000;
      padding: 4px 6px;
      text-align: left;
      vertical-align: top;
    }
    
    .print-table th {
      background-color: #f0f0f0 !important;
      font-weight: bold;
      font-size: 9px;
    }
    
    .print-info-grid {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 8px;
      margin-bottom: 10px;
    }
    
    .print-info-box {
      border: 1px solid #ccc;
      padding: 8px;
      background-color: #f9f9f9 !important;
      font-size: 11px;
    }
    
    .print-info-box h3 {
      font-size: 12px;
      margin: 0 0 6px 0;
      font-weight: bold;
    }
    
    .print-info-box p {
      margin: 2px 0;
      line-height: 1.2;
    }
    
    .print-notes {
      border: 1px solid #ccc;
      padding: 8px;
      background-color: #f9f9f9 !important;
      margin-top: 12px;
      font-size: 11px;
    }
    
    .print-notes h3 {
      font-size: 12px;
      margin: 0 0 6px 0;
    }
    
    .print-footer {
      margin-top: 15px;
      padding-top: 8px;
      border-top: 1px solid #ccc;
      font-size: 9px;
      color: #666;
      text-align: center;
    }
    
    /* TPT Section Optimization */
    .print-tpt-section {
      margin-bottom: 10px;
      padding: 6px;
      border: 1px solid #ddd;
      background-color: #f8f9fa !important;
    }
    
    .print-tpt-section h3 {
      font-size: 11px;
      margin: 0 0 4px 0;
      font-weight: bold;
    }
    
    .print-tpt-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 8px;
      font-size: 10px;
    }
    
    .print-tpt-item {
      text-align: center;
      padding: 2px;
    }
    
    .print-tpt-item strong {
      display: block;
      font-size: 11px;
      margin-top: 2px;
    }
    
    /* Compact Operations Table */
    .print-operations-compact {
      font-size: 9px;
    }
    
    .print-operations-compact th,
    .print-operations-compact td {
      padding: 3px 4px;
    }
    
    .print-operations-compact .operation-name {
      font-weight: bold;
      max-width: 120px;
    }
    
    .print-operations-compact .operation-time {
      text-align: center;
      font-family: monospace;
      min-width: 50px;
    }
    
    .print-operations-compact .operation-duration {
      text-align: center;
      font-style: italic;
      min-width: 60px;
    }
    
    .no-print {
      display: none !important;
    }
    
    /* Ensure single page layout */
    .print-content {
      max-height: 25cm;
      overflow: hidden;
    }
    
    /* Responsive text sizing for better fit */
    @media print and (max-height: 25cm) {
      .print-content {
        font-size: 11px;
      }
      
      .print-table {
        font-size: 9px;
      }
      
      .print-info-box {
        font-size: 10px;
      }
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
