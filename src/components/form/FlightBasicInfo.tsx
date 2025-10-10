import React from 'react';
import AutocompleteInput from './AutocompleteInput';

interface FlightBasicData {
  flightNumber: string;
  airline: string;
}

interface FlightBasicInfoProps {
  flightData: FlightBasicData;
  onDataChange: (field: keyof FlightBasicData, value: string) => void;
  airlineSuggestions: string[];
  showAirlineSuggestions: boolean;
  onAirlineSuggestionsVisibilityChange: (visible: boolean) => void;
  onAirlineSuggestionSelect: (value: string) => void;
  errors: Partial<FlightBasicData>;
  airlines: string[];
}

export default function FlightBasicInfo({
  flightData,
  onDataChange,
  airlineSuggestions,
  showAirlineSuggestions,
  onAirlineSuggestionsVisibilityChange,
  onAirlineSuggestionSelect,
  errors,
  airlines
}: FlightBasicInfoProps) {
  
  return (
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
          placeholder="ej: 123/456"
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
  );
}
