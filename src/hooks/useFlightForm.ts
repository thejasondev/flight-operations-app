import { useState } from 'react';
import type { Flight } from '../components/FlightCard';
import { searchAircraftModels, getAircraftByAirline } from '../constants/aircraftData';

interface FlightFormData {
  flightNumber: string;
  airline: string;
  aircraftType: string;
  origin: string;
  destination: string;
  secondDestination?: string;
  eta: string;
  etd: string;
  date?: string;
}

interface UseFlightFormProps {
  onSubmit: (flight: Omit<Flight, 'id' | 'status'>) => void;
  commonAirlines: string[];
  commonDestinations: string[];
}

export const useFlightForm = ({ onSubmit, commonAirlines, commonDestinations }: UseFlightFormProps) => {
  const [formData, setFormData] = useState<FlightFormData>({
    flightNumber: '',
    airline: '',
    aircraftType: '',
    origin: '',
    destination: '',
    secondDestination: '',
    eta: '',
    etd: ''
  });

  const [flightDate, setFlightDate] = useState<Date | null>(null);
  const [etaTime, setEtaTime] = useState<Date | null>(null);
  const [etdTime, setEtdTime] = useState<Date | null>(null);
  const [errors, setErrors] = useState<Partial<FlightFormData>>({});
  
  // Estados para autocompletado
  const [airlineSuggestions, setAirlineSuggestions] = useState<string[]>([]);
  const [aircraftTypeSuggestions, setAircraftTypeSuggestions] = useState<string[]>([]);
  const [originSuggestions, setOriginSuggestions] = useState<string[]>([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState<string[]>([]);
  const [secondDestinationSuggestions, setSecondDestinationSuggestions] = useState<string[]>([]);
  const [showAirlineSuggestions, setShowAirlineSuggestions] = useState(false);
  const [showAircraftTypeSuggestions, setShowAircraftTypeSuggestions] = useState(false);
  const [showOriginSuggestions, setShowOriginSuggestions] = useState(false);
  const [showDestinationSuggestions, setShowDestinationSuggestions] = useState(false);
  const [showSecondDestinationSuggestions, setShowSecondDestinationSuggestions] = useState(false);
  const [isDoubleDestination, setIsDoubleDestination] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Partial<FlightFormData> = {};

    if (!formData.flightNumber.trim()) {
      newErrors.flightNumber = 'El número de vuelo es requerido';
    }

    if (!formData.airline.trim()) {
      newErrors.airline = 'La aerolínea es requerida';
    }

    if (!formData.origin.trim()) {
      newErrors.origin = 'El origen es requerido';
    }

    if (!formData.destination.trim()) {
      newErrors.destination = 'El destino es requerido';
    }

    if (isDoubleDestination && !formData.secondDestination?.trim()) {
      newErrors.secondDestination = 'El segundo destino es requerido';
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
      
      // Limpiar tipo de avión cuando cambia la aerolínea
      if (formData.aircraftType) {
        setFormData(prev => ({ ...prev, aircraftType: '' }));
      }
    }

    // Autocompletado para tipo de avión
    if (field === 'aircraftType') {
      if (value.length > 0) {
        const filtered = searchAircraftModels(value, formData.airline || undefined);
        setAircraftTypeSuggestions(filtered.slice(0, 8));
        setShowAircraftTypeSuggestions(true);
      } else {
        setShowAircraftTypeSuggestions(false);
      }
    }

    // Autocompletado para origen
    if (field === 'origin') {
      if (value.length > 0) {
        const filtered = commonDestinations.filter(destination =>
          destination.toLowerCase().includes(value.toLowerCase())
        );
        setOriginSuggestions(filtered.slice(0, 5));
        setShowOriginSuggestions(true);
      } else {
        setShowOriginSuggestions(false);
      }
    }

    // Autocompletado para destino principal
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

    // Autocompletado para segundo destino
    if (field === 'secondDestination') {
      if (value.length > 0) {
        const filtered = commonDestinations.filter(destination =>
          destination.toLowerCase().includes(value.toLowerCase())
        );
        setSecondDestinationSuggestions(filtered.slice(0, 5));
        setShowSecondDestinationSuggestions(true);
      } else {
        setShowSecondDestinationSuggestions(false);
      }
    }
  };

  const selectSuggestion = (field: keyof FlightFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (field === 'airline') {
      setShowAirlineSuggestions(false);
    } else if (field === 'aircraftType') {
      setShowAircraftTypeSuggestions(false);
    } else if (field === 'origin') {
      setShowOriginSuggestions(false);
    } else if (field === 'destination') {
      setShowDestinationSuggestions(false);
    } else if (field === 'secondDestination') {
      setShowSecondDestinationSuggestions(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Construir la ruta completa
    let routeString = `${formData.origin}/${formData.destination}`;
    if (isDoubleDestination && formData.secondDestination) {
      routeString = `${formData.origin}/${formData.destination}/${formData.secondDestination}`;
    }

    const flightData: Omit<Flight, 'id' | 'status'> = {
      flightNumber: formData.flightNumber.trim().toUpperCase(),
      airline: formData.airline.trim(),
      aircraftType: formData.aircraftType.trim() || undefined,
      destination: routeString,
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
      aircraftType: '',
      origin: '',
      destination: '',
      secondDestination: '',
      eta: '',
      etd: ''
    });
    setFlightDate(null);
    setEtaTime(null);
    setEtdTime(null);
    setErrors({});
    setIsDoubleDestination(false);
  };

  return {
    formData,
    flightDate,
    etaTime,
    etdTime,
    errors,
    isDoubleDestination,
    suggestions: {
      airline: airlineSuggestions,
      aircraftType: aircraftTypeSuggestions,
      origin: originSuggestions,
      destination: destinationSuggestions,
      secondDestination: secondDestinationSuggestions,
    },
    showSuggestions: {
      airline: showAirlineSuggestions,
      aircraftType: showAircraftTypeSuggestions,
      origin: showOriginSuggestions,
      destination: showDestinationSuggestions,
      secondDestination: showSecondDestinationSuggestions,
    },
    setFlightDate,
    setEtaTime,
    setEtdTime,
    setIsDoubleDestination,
    setSuggestionsVisibility: {
      airline: setShowAirlineSuggestions,
      aircraftType: setShowAircraftTypeSuggestions,
      origin: setShowOriginSuggestions,
      destination: setShowDestinationSuggestions,
      secondDestination: setShowSecondDestinationSuggestions,
    },
    handleInputChange,
    selectSuggestion,
    handleSubmit,
    handleReset,
  };
};
