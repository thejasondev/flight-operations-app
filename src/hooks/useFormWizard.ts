import { useState, useCallback } from 'react';

interface UseFormWizardProps {
  totalSteps: number;
  onComplete?: () => void;
}

export function useFormWizard({ totalSteps, onComplete }: UseFormWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = useCallback(() => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentStep, totalSteps, onComplete]);

  const previousStep = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  }, [currentStep]);

  const goToStep = useCallback((step: number) => {
    if (step >= 1 && step <= totalSteps) {
      setCurrentStep(step);
    }
  }, [totalSteps]);

  const resetWizard = useCallback(() => {
    setCurrentStep(1);
  }, []);

  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === totalSteps;
  const progress = (currentStep / totalSteps) * 100;

  return {
    currentStep,
    nextStep,
    previousStep,
    goToStep,
    resetWizard,
    isFirstStep,
    isLastStep,
    progress,
  };
}
