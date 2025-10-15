import React from 'react';
import type { Flight } from './FlightCard';
import { useFlightForm } from '../hooks/useFlightForm';
import FlightBasicInfo from './form/FlightBasicInfo';
import RouteConfiguration from './form/RouteConfiguration';
import FlightTiming from './form/FlightTiming';
import "../styles/liquidGlass.css";

interface FlightFormProps {
  onSubmit: (flight: Omit<Flight, 'id' | 'status'>) => void;
  onCancel?: () => void;
  isSubmitting?: boolean;
}

export default function FlightForm({ onSubmit, onCancel, isSubmitting = false }: FlightFormProps) {
  // Datos de aerolíneas y destinos
  const commonAirlines = [
    'Air Canada', 'Air Transat', 'WestJet', 'Sunwing Airlines',
    'Nordwind Airlines', 'Azur Air', 'Rossiya Airlines', 'Aeroflot',
    'Cubana de Aviación', 'Havanatur', 'Blue Panorama Airlines',
    'Avianca', 'LATAM', 'Copa Airlines', 'American Airlines', 'Delta Air Lines', 'United Airlines', 'Air France', 'Lufthansa', 'British Airways', 'Iberia', 'KLM', 'Emirates', 'Qatar Airways', 'Turkish Airlines', 'Condor', 'World2Fly', 'Copa Airlines', 'Aeromexico', 'Conviasa', 'Rutaca Airlines', 'Plus Ultra'
  ];

  const commonDestinations = [
    'Varadero (VRA)', 'La Habana (HAV)', 'Santiago de Cuba (SCU)', 'Holguín (HOG)',
    'Cayo Coco (CCC)', 'Camagüey (CMW)', 'Cienfuegos (CFG)',
    'Toronto (YYZ)', 'Montreal (YUL)', 'Vancouver (YVR)', 'Calgary (YYC)',
    'Ottawa (YOW)', 'Edmonton (YEG)', 'Winnipeg (YWG)', 'Halifax (YHZ)',
    'Quebec City (YQB)', 'Saskatoon (YXE)',
    'Moscú (SVO)', 'San Petersburgo (LED)', 'Ekaterimburgo (SVX)', 'Novosibirsk (OVB)',
    'Kazan (KZN)', 'Sochi (AER)', 'Rostov del Don (ROV)', 'Samara (KUF)',
    'Madrid (MAD)', 'París (CDG)', 'Londres (LHR)', 'Roma (FCO)', 'Milán (MXP)',
    'Frankfurt (FRA)', 'Múnich (MUC)', 'Amsterdam (AMS)', 'Zurich (ZUR)',
    'Barcelona (BCN)', 'Berlín (BER)', 'Viena (VIE)', 'Praga (PRG)',
    'Bogotá (BOG)', 'México DF (MEX)', 'Lima (LIM)', 'São Paulo (GRU)',
    'Buenos Aires (EZE)', 'Santiago (SCL)', 'Caracas (CCS)', 'Panamá (PTY)',
    'Cancún (CUN)', 'Punta Cana (PUJ)', 'Kingston (KIN)', 'Nassau (NAS)',
    'Miami (MIA)', 'Nueva York (JFK)', 'Los Ángeles (LAX)', 'Chicago (ORD)',
    'Atlanta (ATL)', 'Dallas (DFW)', 'Boston (BOS)', 'Washington (DCA)', 'Lisboa (LIS)', 'Katowice (KTW)'
  ];

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

  return (
    <div className="liquid-glass-modal p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
          <svg className="w-6 h-6 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Agregar Nuevo Vuelo
        </h2>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            title="Cerrar formulario"
            aria-label="Cerrar formulario"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Flight Basic Information */}
        <FlightBasicInfo
          flightData={{
            flightNumber: formData.flightNumber,
            airline: formData.airline,
            aircraftType: formData.aircraftType
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
            aircraftType: errors.aircraftType
          }}
          airlines={commonAirlines}
        />

        {/* Route Configuration */}
        <RouteConfiguration
          routeData={{
            origin: formData.origin,
            destination: formData.destination,
            secondDestination: formData.secondDestination
          }}
          onRouteChange={handleInputChange}
          isDoubleDestination={isDoubleDestination}
          onDoubleDestinationChange={setIsDoubleDestination}
          suggestions={{
            origin: suggestions.origin,
            destination: suggestions.destination,
            secondDestination: suggestions.secondDestination
          }}
          showSuggestions={{
            origin: showSuggestions.origin,
            destination: showSuggestions.destination,
            secondDestination: showSuggestions.secondDestination
          }}
          onSuggestionsVisibilityChange={(field, visible) => {
            if (field === 'origin') setSuggestionsVisibility.origin(visible);
            else if (field === 'destination') setSuggestionsVisibility.destination(visible);
            else if (field === 'secondDestination') setSuggestionsVisibility.secondDestination(visible);
          }}
          onSuggestionSelect={selectSuggestion}
          errors={{
            origin: errors.origin,
            destination: errors.destination,
            secondDestination: errors.secondDestination
          }}
          destinations={commonDestinations}
        />

        {/* Flight Timing */}
        <FlightTiming
          flightDate={flightDate}
          etaTime={etaTime}
          etdTime={etdTime}
          onFlightDateChange={setFlightDate}
          onEtaTimeChange={setEtaTime}
          onEtdTimeChange={setEtdTime}
          errors={{
            eta: errors.eta,
            etd: errors.etd
          }}
        />

        {/* Form Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {isSubmitting ? 'Guardando...' : 'Agregar Vuelo'}
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="flex-1 sm:flex-none bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 px-6 py-3 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors font-medium"
          >
            Limpiar
          </button>
        </div>
      </form>
    </div>
  );
}