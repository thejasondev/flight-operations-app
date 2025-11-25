import React from 'react';

interface WizardNavigationProps {
  currentStep: number;
  isFirstStep: boolean;
  isLastStep: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit?: () => void;
  isSubmitting?: boolean;
  canProceed?: boolean;
}

export default function WizardNavigation({
  currentStep,
  isFirstStep,
  isLastStep,
  onPrevious,
  onNext,
  onSubmit,
  isSubmitting = false,
  canProceed = true,
}: WizardNavigationProps) {
  const handleNext = () => {
    if (isLastStep && onSubmit) {
      onSubmit();
    } else {
      onNext();
    }
  };

  return (
    <div className="flex items-center gap-3 pt-4">
      {/* Previous Button */}
      {!isFirstStep && (
        <button
          type="button"
          onClick={onPrevious}
          className="flex items-center justify-center px-4 py-3 bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 min-w-[100px]"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Anterior
        </button>
      )}

      {/* Spacer for first step */}
      {isFirstStep && <div className="flex-1" />}

      {/* Next/Submit Button */}
      <button
        type="button"
        onClick={handleNext}
        disabled={!canProceed || isSubmitting}
        className={`
          flex-1 flex items-center justify-center px-6 py-3 rounded-lg
          font-medium transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-offset-2
          ${
            isLastStep
              ? 'bg-green-600 hover:bg-green-700 focus:ring-green-500 text-white'
              : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 text-white'
          }
          ${!canProceed || isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        {isSubmitting ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
            Guardando...
          </>
        ) : isLastStep ? (
          <>
            Agregar Vuelo
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </>
        ) : (
          <>
            Siguiente
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </>
        )}
      </button>
    </div>
  );
}
