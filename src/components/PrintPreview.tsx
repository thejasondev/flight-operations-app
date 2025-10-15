import React, { useEffect, useState } from 'react';
import { applyPrintStyles, removePrintStyles } from '../styles/printStyles';

interface PrintPreviewProps {
  children: React.ReactNode;
  isPreviewMode: boolean;
  onTogglePreview: () => void;
}

export default function PrintPreview({ children, isPreviewMode, onTogglePreview }: PrintPreviewProps) {
  const [printStyleElement, setPrintStyleElement] = useState<HTMLStyleElement | null>(null);

  useEffect(() => {
    if (isPreviewMode) {
      // Apply print styles for preview
      const styleElement = applyPrintStyles();
      setPrintStyleElement(styleElement);
      
      // Add preview-specific styles
      const previewStyles = document.createElement('style');
      previewStyles.textContent = `
        .print-preview-container {
          background: #f5f5f5;
          padding: 20px;
          min-height: 100vh;
        }
        
        .print-preview-page {
          width: 21cm;
          min-height: 29.7cm;
          background: white;
          margin: 0 auto;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
          padding: 0.8cm;
          box-sizing: border-box;
          font-family: Arial, sans-serif;
          font-size: 11px;
          line-height: 1.2;
        }
        
        @media screen {
          .print-content {
            position: static !important;
            width: 100% !important;
            max-width: none !important;
          }
        }
      `;
      document.head.appendChild(previewStyles);
      setPrintStyleElement(previewStyles);
      
      return () => {
        if (styleElement && styleElement.parentNode) {
          removePrintStyles(styleElement);
        }
        if (previewStyles && previewStyles.parentNode) {
          document.head.removeChild(previewStyles);
        }
      };
    } else {
      // Remove print styles when not in preview
      if (printStyleElement && printStyleElement.parentNode) {
        removePrintStyles(printStyleElement);
        setPrintStyleElement(null);
      }
    }
  }, [isPreviewMode, printStyleElement]);

  if (isPreviewMode) {
    return (
      <div className="print-preview-container">
        <div className="mb-4 text-center">
          <button
            onClick={onTogglePreview}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 mr-2"
          >
            Salir de Vista Previa
          </button>
          <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Imprimir
          </button>
        </div>
        <div className="print-preview-page">
          {children}
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
