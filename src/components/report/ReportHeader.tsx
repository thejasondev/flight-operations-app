import React from 'react';
import ThemeToggle from '../ThemeToggle';

interface ReportHeaderProps {
  onPrint: () => void;
  onClose: () => void;
}

export default function ReportHeader({ onPrint, onClose }: ReportHeaderProps) {
  return (
    <div className="no-print mb-4 sm:mb-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <h2 id="report-title" className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
          Reporte de Operaciones
        </h2>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-2">
          <div className="flex gap-2">
            <button
              className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors text-sm sm:text-base font-medium"
              onClick={onPrint}
            >
              <span className="hidden sm:inline">Imprimir Reporte</span>
              <span className="sm:hidden">Imprimir</span>
            </button>
            <button
              className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors text-sm sm:text-base font-medium"
              onClick={onClose}
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
