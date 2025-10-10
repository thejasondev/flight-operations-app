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
          />
          {errors.etd && (
            <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.etd}</p>
          )}
        </div>
      </div>
    </div>
  );
}
