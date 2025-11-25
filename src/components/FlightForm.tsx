import React, { useState, useEffect } from 'react';
import type { Flight } from './FlightCard';
import { useFlightForm } from '../hooks/useFlightForm';
import { useFormWizard } from '../hooks/useFormWizard';
import FlightBasicInfo from './form/FlightBasicInfo';
import RouteConfiguration from './form/RouteConfiguration';
import FlightTiming from './form/FlightTiming';
import BaseModal from './BaseModal';
import ProgressIndicator from './ProgressIndicator';
import WizardNavigation from './WizardNavigation';
import { getAirlineNames, getDestinationList } from '../data';
import '../styles/liquidGlass.css';

interface FlightFormProps {
  onSubmit: (flight: Omit<Flight, 'id' | 'status'>) => void;
  onCancel?: () => void;
  isSubmitting?: boolean;
}

export default function FlightForm({ onSubmit, onCancel, isSubmitting = false }: FlightFormProps) {
  // Datos de aerolíneas y destinos desde módulo centralizado
  const commonAirlines = getAirlineNames();
  const commonDestinations = getDestinationList();

  // Hook personalizado para la lógica del formulario
  const {
    formData,
    flightDate,
    etaTime,
    etdTime,
    errors,
    isDoubleDestination,
    suggestions,
    showSuggestions,
    setFlightDate,
    setEtaTime,
    setEtdTime,
    setIsDoubleDestination,
    setSuggestionsVisibility,
    handleInputChange,
    selectSuggestion,
    handleSubmit,
    handleReset,
  } = useFlightForm({ onSubmit, commonAirlines, commonDestinations });

  // Wizard state for mobile
  const wizardSteps = ['Datos Básicos', 'Ruta', 'Fechas y Horas'];
  const { currentStep, nextStep, previousStep, isFirstStep, isLastStep, resetWizard } =
    useFormWizard({
      totalSteps: 3,
    });

  // Desktop tabs state
  const [activeTab, setActiveTab] = useState(0);

  const icon = (
    <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
      />
    </svg>
  );

  // Validation for each step
  const canProceedStep1 =
    !errors.flightNumber && !errors.airline && !!formData.flightNumber && !!formData.airline;

  const canProceedStep2 =
    !errors.origin && !errors.destination && !!formData.origin && !!formData.destination;

  const canProceedStep3 = !errors.eta && !errors.etd && !!etaTime && !!etdTime;

  const canProceed: boolean =
    currentStep === 1 ? canProceedStep1 : currentStep === 2 ? canProceedStep2 : canProceedStep3;

  // Reset wizard when form is reset
  useEffect(() => {
    if (!formData.flightNumber && !formData.airline) {
      resetWizard();
      setActiveTab(0);
    }
  }, [formData.flightNumber, formData.airline, resetWizard]);

  const handleFormSubmit = (e?: React.FormEvent) => {
    // Call handleSubmit which will handle preventDefault internally
    handleSubmit(e);
  };

  // Render step content for mobile wizard
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <FlightBasicInfo
            flightData={{
              flightNumber: formData.flightNumber,
              airline: formData.airline,
              aircraftType: formData.aircraftType,
              aircraftRegistration: formData.aircraftRegistration,
              rampPosition: formData.rampPosition,
            }}
            onDataChange={handleInputChange}
            airlineSuggestions={suggestions.airline}
            aircraftTypeSuggestions={suggestions.aircraftType}
            showAirlineSuggestions={showSuggestions.airline}
            showAircraftTypeSuggestions={showSuggestions.aircraftType}
            onAirlineSuggestionsVisibilityChange={setSuggestionsVisibility.airline}
            onAircraftTypeSuggestionsVisibilityChange={setSuggestionsVisibility.aircraftType}
            onAirlineSuggestionSelect={(value) => selectSuggestion('airline', value)}
            onAircraftTypeSuggestionSelect={(value) => selectSuggestion('aircraftType', value)}
            errors={{
              flightNumber: errors.flightNumber,
              airline: errors.airline,
              aircraftType: errors.aircraftType,
            }}
            airlines={commonAirlines}
          />
        );
      case 2:
        return (
          <RouteConfiguration
            routeData={{
              origin: formData.origin,
              destination: formData.destination,
              secondDestination: formData.secondDestination,
            }}
            onRouteChange={handleInputChange}
            isDoubleDestination={isDoubleDestination}
            onDoubleDestinationChange={setIsDoubleDestination}
            suggestions={{
              origin: suggestions.origin,
              destination: suggestions.destination,
              secondDestination: suggestions.secondDestination,
            }}
            showSuggestions={{
              origin: showSuggestions.origin,
              destination: showSuggestions.destination,
              secondDestination: showSuggestions.secondDestination,
            }}
            onSuggestionsVisibilityChange={(field, visible) => {
              if (field === 'origin') setSuggestionsVisibility.origin(visible);
              else if (field === 'destination') setSuggestionsVisibility.destination(visible);
              else if (field === 'secondDestination')
                setSuggestionsVisibility.secondDestination(visible);
            }}
            onSuggestionSelect={selectSuggestion}
            errors={{
              origin: errors.origin,
              destination: errors.destination,
              secondDestination: errors.secondDestination,
            }}
            destinations={commonDestinations}
          />
        );
      case 3:
        return (
          <FlightTiming
            flightDate={flightDate}
            etaTime={etaTime}
            etdTime={etdTime}
            onFlightDateChange={setFlightDate}
            onEtaTimeChange={setEtaTime}
            onEtdTimeChange={setEtdTime}
            errors={{
              eta: errors.eta,
              etd: errors.etd,
            }}
          />
        );
      default:
        return null;
    }
  };

  // Render tab content for desktop
  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return (
          <FlightBasicInfo
            flightData={{
              flightNumber: formData.flightNumber,
              airline: formData.airline,
              aircraftType: formData.aircraftType,
              aircraftRegistration: formData.aircraftRegistration,
              rampPosition: formData.rampPosition,
            }}
            onDataChange={handleInputChange}
            airlineSuggestions={suggestions.airline}
            aircraftTypeSuggestions={suggestions.aircraftType}
            showAirlineSuggestions={showSuggestions.airline}
            showAircraftTypeSuggestions={showSuggestions.aircraftType}
            onAirlineSuggestionsVisibilityChange={setSuggestionsVisibility.airline}
            onAircraftTypeSuggestionsVisibilityChange={setSuggestionsVisibility.aircraftType}
            onAirlineSuggestionSelect={(value) => selectSuggestion('airline', value)}
            onAircraftTypeSuggestionSelect={(value) => selectSuggestion('aircraftType', value)}
            errors={{
              flightNumber: errors.flightNumber,
              airline: errors.airline,
              aircraftType: errors.aircraftType,
            }}
            airlines={commonAirlines}
          />
        );
      case 1:
        return (
          <RouteConfiguration
            routeData={{
              origin: formData.origin,
              destination: formData.destination,
              secondDestination: formData.secondDestination,
            }}
            onRouteChange={handleInputChange}
            isDoubleDestination={isDoubleDestination}
            onDoubleDestinationChange={setIsDoubleDestination}
            suggestions={{
              origin: suggestions.origin,
              destination: suggestions.destination,
              secondDestination: suggestions.secondDestination,
            }}
            showSuggestions={{
              origin: showSuggestions.origin,
              destination: showSuggestions.destination,
              secondDestination: showSuggestions.secondDestination,
            }}
            onSuggestionsVisibilityChange={(field, visible) => {
              if (field === 'origin') setSuggestionsVisibility.origin(visible);
              else if (field === 'destination') setSuggestionsVisibility.destination(visible);
              else if (field === 'secondDestination')
                setSuggestionsVisibility.secondDestination(visible);
            }}
            onSuggestionSelect={selectSuggestion}
            errors={{
              origin: errors.origin,
              destination: errors.destination,
              secondDestination: errors.secondDestination,
            }}
            destinations={commonDestinations}
          />
        );
      case 2:
        return (
          <FlightTiming
            flightDate={flightDate}
            etaTime={etaTime}
            etdTime={etdTime}
            onFlightDateChange={setFlightDate}
            onEtaTimeChange={setEtaTime}
            onEtdTimeChange={setEtdTime}
            errors={{
              eta: errors.eta,
              etd: errors.etd,
            }}
          />
        );
      default:
        return null;
    }
  };

  // If no onCancel is provided, render without modal wrapper
  if (!onCancel) {
    return (
      <div className="liquid-glass-modal p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
            {icon}
            <span className="ml-2">Agregar Nuevo Vuelo</span>
          </h2>
        </div>

        <form onSubmit={handleFormSubmit} className="space-y-6">
          {/* Mobile: Wizard View */}
          <div className="md:hidden">
            <ProgressIndicator currentStep={currentStep} totalSteps={3} steps={wizardSteps} />
            <div className="mt-6">{renderStepContent()}</div>
            <WizardNavigation
              currentStep={currentStep}
              isFirstStep={isFirstStep}
              isLastStep={isLastStep}
              onPrevious={previousStep}
              onNext={nextStep}
              onSubmit={handleFormSubmit}
              isSubmitting={isSubmitting}
              canProceed={canProceed}
            />
          </div>

          {/* Desktop/Tablet: Tabs View */}
          <div className="hidden md:block">
            {/* Tabs Navigation */}
            <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg mb-6">
              {wizardSteps.map((step, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setActiveTab(index)}
                  className={`
                    flex-1 py-2.5 px-4 text-sm font-medium rounded-md transition-all duration-200
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                    ${
                      activeTab === index
                        ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                    }
                  `}
                >
                  {step}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="space-y-6">{renderTabContent()}</div>

            {/* Desktop Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-6 mt-6 border-t border-gray-200 dark:border-gray-700">
              <button
                type="button"
                onClick={handleReset}
                className="sm:flex-none bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 px-6 py-3 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors font-medium"
              >
                Limpiar
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
              >
                {isSubmitting ? 'Guardando...' : 'Agregar Vuelo'}
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }

  return (
    <BaseModal
      isOpen={true}
      onClose={onCancel}
      title="Agregar Nuevo Vuelo"
      icon={icon}
      size="xl"
      showCloseButton={true}
    >
      <form onSubmit={handleFormSubmit} className="space-y-6">
        {/* Mobile: Wizard View */}
        <div className="md:hidden">
          <ProgressIndicator currentStep={currentStep} totalSteps={3} steps={wizardSteps} />
          <div className="mt-6">{renderStepContent()}</div>
          <WizardNavigation
            currentStep={currentStep}
            isFirstStep={isFirstStep}
            isLastStep={isLastStep}
            onPrevious={previousStep}
            onNext={nextStep}
            onSubmit={handleFormSubmit}
            isSubmitting={isSubmitting}
            canProceed={canProceed}
          />
        </div>

        {/* Desktop/Tablet: Tabs View */}
        <div className="hidden md:block">
          {/* Tabs Navigation */}
          <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg mb-6">
            {wizardSteps.map((step, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setActiveTab(index)}
                className={`
                  flex-1 py-2.5 px-4 text-sm font-medium rounded-md transition-all duration-200
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                  ${
                    activeTab === index
                      ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                  }
                `}
              >
                {step}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="space-y-6">{renderTabContent()}</div>

          {/* Desktop Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-6 mt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={handleReset}
              className="sm:flex-none bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 px-6 py-3 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors font-medium"
            >
              Limpiar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
            >
              {isSubmitting ? 'Guardando...' : 'Agregar Vuelo'}
            </button>
          </div>
        </div>
      </form>
    </BaseModal>
  );
}
