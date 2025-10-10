import React from 'react';

interface ActionButtonsProps {
  onBack: () => void;
  onComplete: () => void;
}

export default function ActionButtons({ onBack, onComplete }: ActionButtonsProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6">
      <button
        className="w-full sm:w-auto px-6 py-3 bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-base font-medium"
        onClick={onBack}
      >
        Volver al Dashboard
      </button>
      <button
        className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-base font-medium"
        onClick={onComplete}
      >
        Finalizar y Generar Reporte
      </button>
    </div>
  );
}
