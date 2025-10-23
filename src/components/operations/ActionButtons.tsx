import React from 'react';

interface ActionButtonsProps {
  onBack: () => void;
  onComplete: () => void;
  isPushbackRegistered?: boolean;
}

export default function ActionButtons({ onBack, onComplete, isPushbackRegistered = false }: ActionButtonsProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6 mb-6">
      <button
        className="w-full sm:w-auto px-6 py-3 bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-base font-medium"
        onClick={onBack}
      >
        Volver al Dashboard
      </button>
      <div className="relative">
        <button
          className={`w-full sm:w-auto px-6 py-3 rounded-lg transition-colors text-base font-medium flex items-center justify-center gap-2 ${
            isPushbackRegistered
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-600 dark:text-gray-400'
          }`}
          onClick={isPushbackRegistered ? onComplete : undefined}
          disabled={!isPushbackRegistered}
          title={!isPushbackRegistered ? 'Debe registrar el empuje antes de generar el reporte' : ''}
        >
          {isPushbackRegistered ? (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Finalizar y Generar Reporte
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Registre el Empuje Primero
            </>
          )}
        </button>
        {!isPushbackRegistered && (
          <div className="absolute -bottom-6 left-0 right-0 text-xs text-gray-500 dark:text-gray-400 text-center">
            El reporte se genera al finalizar las operaciones
          </div>
        )}
      </div>
    </div>
  );
}
