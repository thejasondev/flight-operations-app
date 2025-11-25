import React from 'react';
import AutocompleteInput from './AutocompleteInput';

interface FlightBasicData {
  flightNumber: string;
  airline: string;
  aircraftType: string;
  aircraftRegistration: string;
  rampPosition: string;
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
  airlines,
}: FlightBasicInfoProps) {
  return (
    <div className="space-y-4">
      {/* Flight Number and Airline Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Flight Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
                />
              </svg>
              Número de Vuelo <span className="text-red-500">*</span>
            </div>
          </label>
          <input
            type="text"
            inputMode="text"
            autoComplete="off"
            autoCapitalize="characters"
            pattern="[A-Za-z0-9]+"
            value={flightData.flightNumber}
            onChange={(e) => onDataChange('flightNumber', e.target.value.toUpperCase())}
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
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Alfanumérico (letras y números, sin espacios)
          </p>
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
          icon={
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
              />
            </svg>
          }
        />
      </div>

      {/* Aircraft Type */}
      <div>
        <AutocompleteInput
          label="Tipo de Avión"
          value={flightData.aircraftType}
          onChange={(value) => onDataChange('aircraftType', value)}
          placeholder={
            flightData.airline
              ? 'Escribir o seleccionar modelo de avión'
              : 'Selecciona primero una aerolínea'
          }
          suggestions={aircraftTypeSuggestions}
          showSuggestions={showAircraftTypeSuggestions}
          onSuggestionSelect={onAircraftTypeSuggestionSelect}
          onSuggestionsVisibilityChange={onAircraftTypeSuggestionsVisibilityChange}
          error={errors.aircraftType}
          disabled={!flightData.airline}
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          }
        />
        {!flightData.airline && (
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Los modelos de avión se filtrarán según la aerolínea seleccionada.
          </p>
        )}
      </div>

      {/* Aircraft Registration and Ramp Position Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Aircraft Registration */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Matrícula del Avión
            </div>
          </label>
          <input
            type="text"
            inputMode="text"
            autoComplete="off"
            autoCapitalize="characters"
            pattern="[A-Za-z0-9\-]+"
            value={flightData.aircraftRegistration}
            onChange={(e) => onDataChange('aircraftRegistration', e.target.value.toUpperCase())}
            placeholder="ej: C-GXYZ, N123AB, D-ABCD"
            className={`w-full px-4 py-3 text-sm border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
              errors.aircraftRegistration
                ? 'border-red-500 dark:border-red-400'
                : 'border-gray-300 dark:border-gray-600'
            }`}
          />
          {errors.aircraftRegistration && (
            <p className="mt-1 text-sm text-red-500 dark:text-red-400">
              {errors.aircraftRegistration}
            </p>
          )}
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Identificación única del avión (registro de cola)
          </p>
        </div>

        {/* Ramp Position */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Posición en Rampa
            </div>
          </label>
          <input
            type="text"
            inputMode="text"
            autoComplete="off"
            value={flightData.rampPosition}
            onChange={(e) => onDataChange('rampPosition', e.target.value)}
            placeholder="ej: 1, 5, 12, Rampa Nacional"
            className={`w-full px-4 py-3 text-sm border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
              errors.rampPosition
                ? 'border-red-500 dark:border-red-400'
                : 'border-gray-300 dark:border-gray-600'
            }`}
          />
          {errors.rampPosition && (
            <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.rampPosition}</p>
          )}
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Ubicación asignada en la plataforma del aeropuerto
          </p>
        </div>
      </div>
    </div>
  );
}
