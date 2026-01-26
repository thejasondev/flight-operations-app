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
    <div className="no-print mb-6 sm:mb-8 relative">
      {/* Absolute Close Button - Top Right */}
      <button
        className="absolute -top-2 -right-2 sm:top-0 sm:right-0 p-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors z-10"
        onClick={onClose}
        disabled={isDownloading}
        title="Cerrar Reporte"
        aria-label="Cerrar Reporte"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <div className="flex flex-col gap-4 pr-10">
        {/* Title Section */}
        <div>
          <h2
            id="report-title"
            className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white leading-tight"
          >
            Reporte de Operaciones
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Sistema de Gestión de Operaciones Aéreas
          </p>
        </div>

        {/* Primary Actions - Grouped */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-white font-medium shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 ${
              isDownloading
                ? 'bg-green-400 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700 hover:-translate-y-0.5 focus:ring-green-500'
            }`}
            onClick={onDownload}
            disabled={isDownloading}
            title="Descargar PDF"
          >
            {isDownloading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
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
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
              </>
            )}
          </button>

          <button
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 text-white font-medium shadow-sm transition-all hover:bg-blue-700 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={onPrint}
            disabled={isDownloading}
            title="Imprimir Reporte"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
