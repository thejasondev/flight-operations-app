import React from 'react';
import ThemeToggle from '../ThemeToggle';

interface ReportHeaderProps {
  onPrint: () => void;
  onDownload: () => void;
  isDownloading?: boolean;
  onClose: () => void;
}

export default function ReportHeader({
  onPrint,
  onDownload,
  isDownloading = false,
  onClose,
}: ReportHeaderProps) {
  return (
    <div className="no-print mb-4 sm:mb-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <h2
          id="report-title"
          className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white"
        >
          Reporte de Operaciones
        </h2>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-2">
          <div className="flex gap-2">
            <button
              className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors text-sm sm:text-base font-medium ${
                isDownloading
                  ? 'bg-green-400 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700 focus:ring-green-500'
              }`}
              onClick={onDownload}
              disabled={isDownloading}
            >
              {isDownloading ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="animate-spin h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span>Generando...</span>
                </span>
              ) : (
                <>
                  <span className="hidden sm:inline">Descargar PDF</span>
                  <span className="sm:hidden">PDF/Compartir</span>
                </>
              )}
            </button>
            <button
              className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors text-sm sm:text-base font-medium"
              onClick={onPrint}
              disabled={isDownloading}
            >
              <span className="hidden sm:inline">Imprimir Reporte</span>
              <span className="sm:hidden">Imprimir</span>
            </button>
            <button
              className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors text-sm sm:text-base font-medium"
              onClick={onClose}
              disabled={isDownloading}
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
