import React from 'react';
import DateTimeSelector from '../DateTimeSelector';

interface FlightTimingProps {
  flightDate: Date | null;
  etaTime: Date | null;
  etdTime: Date | null;
  onFlightDateChange: (date: Date | null) => void;
  onEtaTimeChange: (time: Date | null) => void;
  onEtdTimeChange: (time: Date | null) => void;
  errors: {
    eta?: string;
    etd?: string;
  };
}

export default function FlightTiming({
  flightDate,
  etaTime,
  etdTime,
  onFlightDateChange,
  onEtaTimeChange,
  onEtdTimeChange,
  errors
}: FlightTimingProps) {
  
  return (
    <div className="space-y-4">
      {/* Flight Date */}
      <DateTimeSelector
        label="Fecha del Vuelo"
        type="date"
        value={flightDate}
        onChange={onFlightDateChange}
        placeholder="Seleccionar fecha"
        minDate={new Date()}
        icon={
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        }
      />

      {/* ETA and ETD */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* ETA */}
        <div>
          <DateTimeSelector
            label="ETA (Hora Estimada de Arribo)"
            type="time"
            value={etaTime}
            onChange={onEtaTimeChange}
            placeholder="Seleccionar hora ETA"
            required
            icon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v13" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 21h14" />
              </svg>
            }
          />
          {errors.eta && (
            <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.eta}</p>
          )}
        </div>

        {/* ETD */}
        <div>
          <DateTimeSelector
            label="ETD (Hora Estimada de Salida)"
            type="time"
            value={etdTime}
            onChange={onEtdTimeChange}
            placeholder="Seleccionar hora ETD"
            required
            icon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 21V8" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3h14" />
              </svg>
            }
          />
          {errors.etd && (
            <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.etd}</p>
          )}
        </div>
      </div>
    </div>
  );
}
