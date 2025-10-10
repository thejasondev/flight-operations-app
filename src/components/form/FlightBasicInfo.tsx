import React from 'react';
import AutocompleteInput from './AutocompleteInput';

interface FlightBasicData {
  flightNumber: string;
  airline: string;
  aircraftType: string;
}

interface FlightBasicInfoProps {
  flightData: FlightBasicData;
  onDataChange: (field: keyof FlightBasicData, value: string) => void;
  airlineSuggestions: string[];
  aircraftTypeSuggestions: string[];
  showAirlineSuggestions: boolean;
  showAircraftTypeSuggestions: boolean;
  onAirlineSuggestionsVisibilityChange: (visible: boolean) => void;
  onAircraftTypeSuggestionsVisibilityChange: (visible: boolean) => void;
  onAirlineSuggestionSelect: (value: string) => void;
  onAircraftTypeSuggestionSelect: (value: string) => void;
  errors: Partial<FlightBasicData>;
  airlines: string[];
}

export default function FlightBasicInfo({
  flightData,
  onDataChange,
  airlineSuggestions,
  aircraftTypeSuggestions,
  showAirlineSuggestions,
  showAircraftTypeSuggestions,
  onAirlineSuggestionsVisibilityChange,
  onAircraftTypeSuggestionsVisibilityChange,
  onAirlineSuggestionSelect,
  onAircraftTypeSuggestionSelect,
  errors,
  airlines
}: FlightBasicInfoProps) {
  
  return (
    <div className="space-y-4">
      {/* Flight Number and Airline Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Flight Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Número de Vuelo <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={flightData.flightNumber}
            onChange={(e) => onDataChange('flightNumber', e.target.value)}
            placeholder="ej: AC123, SU456"
            className={`w-full px-4 py-3 text-sm border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
              errors.flightNumber 
                ? 'border-red-500 dark:border-red-400' 
                : 'border-gray-300 dark:border-gray-600'
            }`}
          />
          {errors.flightNumber && (
            <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.flightNumber}</p>
          )}
        </div>

        {/* Airline */}
        <AutocompleteInput
          label="Aerolínea"
          value={flightData.airline}
          onChange={(value) => onDataChange('airline', value)}
          placeholder="Escribir o seleccionar aerolínea"
          suggestions={airlineSuggestions}
          showSuggestions={showAirlineSuggestions}
          onSuggestionSelect={onAirlineSuggestionSelect}
          onSuggestionsVisibilityChange={onAirlineSuggestionsVisibilityChange}
          error={errors.airline}
          required
        />
      </div>

      {/* Aircraft Type */}
      <div>
        <AutocompleteInput
          label="Tipo de Avión"
          value={flightData.aircraftType}
          onChange={(value) => onDataChange('aircraftType', value)}
          placeholder={flightData.airline ? "Escribir o seleccionar modelo de avión" : "Selecciona primero una aerolínea"}
          suggestions={aircraftTypeSuggestions}
          showSuggestions={showAircraftTypeSuggestions}
          onSuggestionSelect={onAircraftTypeSuggestionSelect}
          onSuggestionsVisibilityChange={onAircraftTypeSuggestionsVisibilityChange}
          error={errors.aircraftType}
          disabled={!flightData.airline}
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          }
        />
        {!flightData.airline && (
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Los modelos de avión se filtrarán según la aerolínea seleccionada.
          </p>
        )}
      </div>
    </div>
  );
}
