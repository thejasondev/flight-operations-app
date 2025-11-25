import React from 'react';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  steps: string[];
}

export default function ProgressIndicator({
  currentStep,
  totalSteps,
  steps,
}: ProgressIndicatorProps) {
  return (
    <div className="w-full">
      {/* Mobile Progress Indicator - Compact */}
      <div className="md:hidden">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Paso {currentStep} de {totalSteps}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">{steps[currentStep - 1]}</span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
          <div
            className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Desktop/Tablet Progress Indicator - Detailed */}
      <div className="hidden md:block">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const stepNumber = index + 1;
            const isActive = stepNumber === currentStep;
            const isCompleted = stepNumber < currentStep;

            return (
              <React.Fragment key={stepNumber}>
                {/* Step Circle */}
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`
                      relative flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300
                      ${
                        isCompleted
                          ? 'bg-blue-600 border-blue-600'
                          : isActive
                            ? 'bg-blue-500 border-blue-500 ring-4 ring-blue-100 dark:ring-blue-900'
                            : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600'
                      }
                    `}
                  >
                    {isCompleted ? (
                      <svg
                        className="w-5 h-5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : (
                      <span
                        className={`
                          text-sm font-bold
                          ${isActive ? 'text-white' : 'text-gray-500 dark:text-gray-400'}
                        `}
                      >
                        {stepNumber}
                      </span>
                    )}
                  </div>

                  {/* Step Label */}
                  <span
                    className={`
                      mt-2 text-xs font-medium text-center max-w-[100px]
                      ${
                        isActive
                          ? 'text-blue-600 dark:text-blue-400'
                          : isCompleted
                            ? 'text-gray-700 dark:text-gray-300'
                            : 'text-gray-500 dark:text-gray-400'
                      }
                    `}
                  >
                    {step}
                  </span>
                </div>

                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div
                    className={`
                      flex-1 h-0.5 -mt-8 transition-all duration-300
                      ${stepNumber < currentStep ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'}
                    `}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}
