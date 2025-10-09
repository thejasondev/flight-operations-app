import React, { useState } from 'react';
import DateTimeSelector from './DateTimeSelector';
import type { Flight } from './FlightCard';

interface FlightFormData {
  flightNumber: string;
  airline: string;
  destination: string;
  eta: string;
  etd: string;
  date?: string;
}

interface FlightFormProps {
  onSubmit: (flight: Omit<Flight, 'id' | 'status'>) => void;
  onCancel?: () => void;
  isSubmitting?: boolean;
}

export default function FlightForm({ onSubmit, onCancel, isSubmitting = false }: FlightFormProps) {
  const [formData, setFormData] = useState<FlightFormData>({
    flightNumber: '',
    airline: '',
    destination: '',
    eta: '',
    etd: ''
  });

  const [flightDate, setFlightDate] = useState<Date | null>(null);
  const [etaTime, setEtaTime] = useState<Date | null>(null);
  const [etdTime, setEtdTime] = useState<Date | null>(null);
  const [errors, setErrors] = useState<Partial<FlightFormData>>({});
  
  // Estados para autocompletado
  const [airlineSuggestions, setAirlineSuggestions] = useState<string[]>([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState<string[]>([]);
  const [showAirlineSuggestions, setShowAirlineSuggestions] = useState(false);
  const [showDestinationSuggestions, setShowDestinationSuggestions] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Partial<FlightFormData> = {};

    if (!formData.flightNumber.trim()) {
      newErrors.flightNumber = 'El número de vuelo es requerido';
    }

    if (!formData.airline.trim()) {
      newErrors.airline = 'La aerolínea es requerida';
    }

    if (!formData.destination.trim()) {
      newErrors.destination = 'El destino es requerido';
    }

    if (!etaTime) {
      newErrors.eta = 'La hora ETA es requerida';
    }

    if (!etdTime) {
      newErrors.etd = 'La hora ETD es requerida';
    }

    if (etaTime && etdTime && etaTime >= etdTime) {
      newErrors.etd = 'ETD debe ser posterior a ETA';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FlightFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }

    // Autocompletado para aerolíneas
    if (field === 'airline') {
      if (value.length > 0) {
        const filtered = commonAirlines.filter(airline =>
          airline.toLowerCase().includes(value.toLowerCase())
        );
        setAirlineSuggestions(filtered.slice(0, 5));
        setShowAirlineSuggestions(true);
      } else {
        setShowAirlineSuggestions(false);
      }
    }

    // Autocompletado para destinos
    if (field === 'destination') {
      if (value.length > 0) {
        const filtered = commonDestinations.filter(destination =>
          destination.toLowerCase().includes(value.toLowerCase())
        );
        setDestinationSuggestions(filtered.slice(0, 5));
        setShowDestinationSuggestions(true);
      } else {
        setShowDestinationSuggestions(false);
      }
    }
  };

  // Función para seleccionar una sugerencia
  const selectSuggestion = (field: keyof FlightFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (field === 'airline') {
      setShowAirlineSuggestions(false);
    } else if (field === 'destination') {
      setShowDestinationSuggestions(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const flightData: Omit<Flight, 'id' | 'status'> = {
      flightNumber: formData.flightNumber.trim().toUpperCase(),
      airline: formData.airline.trim(),
      destination: formData.destination.trim(),
      eta: etaTime ? etaTime.toTimeString().slice(0, 5) : '',
      etd: etdTime ? etdTime.toTimeString().slice(0, 5) : '',
      date: flightDate ? flightDate.toLocaleDateString('es-ES') : undefined,
      operations: {}
    };

    onSubmit(flightData);
  };

  const handleReset = () => {
    setFormData({
      flightNumber: '',
      airline: '',
      destination: '',
      eta: '',
      etd: ''
    });
    setFlightDate(null);
    setEtaTime(null);
    setEtdTime(null);
    setErrors({});
  };

  const commonAirlines = [
    // Aerolíneas que vuelan a Varadero, Cuba
    'Air Canada', 'Air Transat', 'WestJet', 'Sunwing Airlines',
    'Nordwind Airlines', 'Azur Air', 'Rossiya Airlines', 'Aeroflot',
    'Cubana de Aviación', 'Havanatur', 'Blue Panorama Airlines',
    // Otras aerolíneas internacionales
    'Avianca', 'LATAM', 'Copa Airlines', 'American Airlines', 'Delta Air Lines',
    'United Airlines', 'Air France', 'Lufthansa', 'British Airways', 'Iberia',
    'KLM', 'Emirates', 'Qatar Airways', 'Turkish Airlines', 'Condor'
  ];

  const commonDestinations = [
    // Destinos canadienses con vuelos a Varadero
    'Toronto (YYZ)', 'Montreal (YUL)', 'Vancouver (YVR)', 'Calgary (YYC)',
    'Ottawa (YOW)', 'Edmonton (YEG)', 'Winnipeg (YWG)', 'Halifax (YHZ)',
    'Quebec City (YQB)', 'Saskatoon (YXE)',
    // Destinos rusos con vuelos a Varadero
    'Moscú (SVO)', 'San Petersburgo (LED)', 'Ekaterimburgo (SVX)', 'Novosibirsk (OVB)',
    'Kazan (KZN)', 'Sochi (AER)', 'Rostov del Don (ROV)', 'Samara (KUF)',
    // Otros destinos europeos
    'Madrid (MAD)', 'París (CDG)', 'Londres (LHR)', 'Roma (FCO)', 'Milán (MXP)',
    'Frankfurt (FRA)', 'Múnich (MUC)', 'Amsterdam (AMS)', 'Zurich (ZUR)',
    // Destinos latinoamericanos
    'Bogotá (BOG)', 'México DF (MEX)', 'Lima (LIM)', 'São Paulo (GRU)',
    'Buenos Aires (EZE)', 'Santiago (SCL)', 'Caracas (CCS)', 'Panamá (PTY)',
    // Destinos norteamericanos
    'Miami (MIA)', 'Nueva York (JFK)', 'Los Ángeles (LAX)', 'Chicago (ORD)'
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
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
        {/* Flight Number and Airline Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Número de Vuelo <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.flightNumber}
              onChange={(e) => handleInputChange('flightNumber', e.target.value)}
              placeholder="ej: AC123, SU456, WS789"
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

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Aerolínea <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={formData.airline}
                onChange={(e) => handleInputChange('airline', e.target.value)}
                onFocus={() => formData.airline.length > 0 && setShowAirlineSuggestions(true)}
                onBlur={() => setTimeout(() => setShowAirlineSuggestions(false), 200)}
                placeholder="Escribir o seleccionar aerolínea"
                className={`w-full px-4 py-3 text-sm border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  errors.airline 
                    ? 'border-red-500 dark:border-red-400' 
                    : 'border-gray-300 dark:border-gray-600'
                }`}
              />
              {showAirlineSuggestions && airlineSuggestions.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                  {airlineSuggestions.map((airline, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => selectSuggestion('airline', airline)}
                      className="w-full text-left px-4 py-2 text-sm text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 focus:bg-gray-100 dark:focus:bg-gray-600 focus:outline-none"
                    >
                      {airline}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {errors.airline && (
              <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.airline}</p>
            )}
          </div>
        </div>

        {/* Destination */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Destino <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={formData.destination}
              onChange={(e) => handleInputChange('destination', e.target.value)}
              onFocus={() => formData.destination.length > 0 && setShowDestinationSuggestions(true)}
              onBlur={() => setTimeout(() => setShowDestinationSuggestions(false), 200)}
              placeholder="Escribir o seleccionar destino"
              className={`w-full px-4 py-3 text-sm border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                errors.destination 
                  ? 'border-red-500 dark:border-red-400' 
                  : 'border-gray-300 dark:border-gray-600'
              }`}
            />
            {showDestinationSuggestions && destinationSuggestions.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                {destinationSuggestions.map((destination, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => selectSuggestion('destination', destination)}
                    className="w-full text-left px-4 py-2 text-sm text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 focus:bg-gray-100 dark:focus:bg-gray-600 focus:outline-none"
                  >
                    {destination}
                  </button>
                ))}
              </div>
            )}
          </div>
          {errors.destination && (
            <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.destination}</p>
          )}
        </div>

        {/* Date */}
        <DateTimeSelector
          label="Fecha del Vuelo"
          type="date"
          value={flightDate}
          onChange={setFlightDate}
          placeholder="Seleccionar fecha"
          minDate={new Date()}
          className="w-full"
        />

        {/* ETA and ETD Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <DateTimeSelector
              label="ETA (Hora Estimada de Arribo)"
              type="time"
              value={etaTime}
              onChange={setEtaTime}
              placeholder="Seleccionar hora"
              required
              className="w-full"
            />
            {errors.eta && (
              <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.eta}</p>
            )}
          </div>

          <div>
            <DateTimeSelector
              label="ETD (Hora Estimada de Salida)"
              type="time"
              value={etdTime}
              onChange={setEtdTime}
              placeholder="Seleccionar hora"
              required
              className="w-full"
            />
            {errors.etd && (
              <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.etd}</p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 sm:flex-none px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Agregando...
              </div>
            ) : (
              'Agregar Vuelo'
            )}
          </button>
          
          <button
            type="button"
            onClick={handleReset}
            disabled={isSubmitting}
            className="flex-1 sm:flex-none px-6 py-3 bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            Limpiar
          </button>
        </div>
      </form>
    </div>
  );
}
