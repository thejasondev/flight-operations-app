import React from 'react';
import AutocompleteInput from './AutocompleteInput';

interface RouteData {
  origin: string;
  destination: string;
  secondDestination?: string;
}

interface RouteConfigurationProps {
  routeData: RouteData;
  onRouteChange: (field: keyof RouteData, value: string) => void;
  isDoubleDestination: boolean;
  onDoubleDestinationChange: (enabled: boolean) => void;
  suggestions: {
    origin: string[];
    destination: string[];
    secondDestination: string[];
  };
  showSuggestions: {
    origin: boolean;
    destination: boolean;
    secondDestination: boolean;
  };
  onSuggestionsVisibilityChange: (field: keyof RouteData, visible: boolean) => void;
  onSuggestionSelect: (field: keyof RouteData, value: string) => void;
  errors: Partial<RouteData>;
  destinations: string[];
}

export default function RouteConfiguration({
  routeData,
  onRouteChange,
  isDoubleDestination,
  onDoubleDestinationChange,
  suggestions,
  showSuggestions,
  onSuggestionsVisibilityChange,
  onSuggestionSelect,
  errors,
  destinations
}: RouteConfigurationProps) {
  
  const handleSuggestionSelect = (field: keyof RouteData, value: string) => {
    onSuggestionSelect(field, value);
  };

  const generateSuggestions = (field: keyof RouteData, value: string) => {
    if (value.length > 0) {
      const filtered = destinations.filter(destination =>
        destination.toLowerCase().includes(value.toLowerCase())
      );
      return filtered.slice(0, 5);
    }
    return [];
  };

  return (
    <div className="space-y-4">
      {/* Header with improved mobile layout */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
        
        {/* Mobile-optimized checkbox */}
        <div className="flex items-center justify-center sm:justify-end">
          <div className="flex items-center space-x-3 bg-gray-50 dark:bg-gray-700 rounded-lg px-4 py-3 sm:px-3 sm:py-2">
            <input
              type="checkbox"
              id="doubleDestination"
              checked={isDoubleDestination}
              onChange={(e) => onDoubleDestinationChange(e.target.checked)}
              className="w-5 h-5 sm:w-4 sm:h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label 
              htmlFor="doubleDestination" 
              className="text-sm sm:text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer select-none"
            >
              Vuelo de doble destino
            </label>
          </div>
        </div>
      </div>

      {/* Origin Input */}
      <AutocompleteInput
        label="Origen"
        value={routeData.origin}
        onChange={(value) => onRouteChange('origin', value)}
        placeholder="ej: YYZ, YUL, SVO"
        suggestions={suggestions.origin}
        showSuggestions={showSuggestions.origin}
        onSuggestionSelect={(value) => handleSuggestionSelect('origin', value)}
        onSuggestionsVisibilityChange={(visible) => onSuggestionsVisibilityChange('origin', visible)}
        error={errors.origin}
        required
      />

      {/* Primary Destination Input */}
      <AutocompleteInput
        label={isDoubleDestination ? 'Primer Destino' : 'Destino'}
        value={routeData.destination}
        onChange={(value) => onRouteChange('destination', value)}
        placeholder="ej: VRA"
        suggestions={suggestions.destination}
        showSuggestions={showSuggestions.destination}
        onSuggestionSelect={(value) => handleSuggestionSelect('destination', value)}
        onSuggestionsVisibilityChange={(visible) => onSuggestionsVisibilityChange('destination', visible)}
        error={errors.destination}
        required
      />

      {/* Second Destination Input (conditional) */}
      {isDoubleDestination && (
        <AutocompleteInput
          label="Segundo Destino"
          value={routeData.secondDestination || ''}
          onChange={(value) => onRouteChange('secondDestination', value)}
          placeholder="ej: HAV"
          suggestions={suggestions.secondDestination}
          showSuggestions={showSuggestions.secondDestination}
          onSuggestionSelect={(value) => handleSuggestionSelect('secondDestination', value)}
          onSuggestionsVisibilityChange={(visible) => onSuggestionsVisibilityChange('secondDestination', visible)}
          error={errors.secondDestination}
          required
        />
      )}

      {/* Route Preview - Mobile optimized */}
      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Vista previa de la ruta:</p>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <p className="text-lg sm:text-xl font-mono font-semibold text-gray-900 dark:text-white break-all">
            {routeData.origin || '___'}/{routeData.destination || '___'}{isDoubleDestination ? `/${routeData.secondDestination || '___'}` : ''}
          </p>
          {isDoubleDestination && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              Doble destino
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
