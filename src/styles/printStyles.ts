/**
 * Estilos CSS para impresión de reportes
 */

export const PRINT_STYLES = `
  @media print {
    @page {
      margin: 1.5cm;
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
    }
    
    .print-header {
      border-bottom: 2px solid #000;
      margin-bottom: 20px;
      padding-bottom: 15px;
    }
    
    .print-section {
      margin-bottom: 25px;
      page-break-inside: avoid;
    }
    
    .print-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 15px;
    }
    
    .print-table th,
    .print-table td {
      border: 1px solid #000;
      padding: 8px;
      text-align: left;
      font-size: 11px;
    }
    
    .print-table th {
      background-color: #f5f5f5 !important;
      font-weight: bold;
    }
    
    .print-info-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      margin-bottom: 20px;
    }
    
    .print-info-box {
      border: 1px solid #ccc;
      padding: 12px;
      background-color: #f9f9f9 !important;
    }
    
    .print-notes {
      border: 1px solid #ccc;
      padding: 12px;
      background-color: #f9f9f9 !important;
      margin-top: 20px;
    }
    
    .print-footer {
      margin-top: 30px;
      padding-top: 15px;
      border-top: 1px solid #ccc;
      font-size: 10px;
      color: #666;
    }
    
    .no-print {
      display: none !important;
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
