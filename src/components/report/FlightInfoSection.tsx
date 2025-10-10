import React from 'react';
import type { Flight } from '../FlightCard';
import { REPORT_LABELS } from '../../constants/reportConstants';

interface FlightInfoSectionProps {
  flight: Flight;
}

export default function FlightInfoSection({ flight }: FlightInfoSectionProps) {
  return (
    <div className="print-section print-info-grid grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 mb-4">
      {/* Flight Information */}
      <div className="print-info-box bg-gray-50 dark:bg-gray-700 p-3 sm:p-4 rounded-lg print:bg-gray-100 border border-gray-200 dark:border-gray-600 print:border-gray-300">
        <h3 className="text-base sm:text-lg font-semibold mb-2 text-gray-900 dark:text-white print:text-black">
          {REPORT_LABELS.FLIGHT_INFO}
        </h3>
        <div className="space-y-1 sm:space-y-2 text-sm sm:text-base text-gray-700 dark:text-gray-300 print:text-black">
          <p className="break-words">
            <span className="font-medium">Número de Vuelo:</span> <strong>{flight.flightNumber}</strong>
          </p>
          <p className="break-words">
            <span className="font-medium">Aerolínea:</span> <strong>{flight.airline}</strong>
          </p>
          <p className="break-words">
            <span className="font-medium">Destino:</span> <strong>{flight.destination}</strong>
          </p>
          {flight.date && (
            <p className="break-words">
              <span className="font-medium">Fecha de Operación:</span> <strong>{flight.date}</strong>
            </p>
          )}
        </div>
      </div>
      
      {/* Scheduled Times */}
      <div className="print-info-box bg-gray-50 dark:bg-gray-700 p-3 sm:p-4 rounded-lg print:bg-gray-100 border border-gray-200 dark:border-gray-600 print:border-gray-300">
        <h3 className="text-base sm:text-lg font-semibold mb-2 text-gray-900 dark:text-white print:text-black">
          {REPORT_LABELS.SCHEDULES}
        </h3>
        <div className="space-y-1 sm:space-y-2 text-sm sm:text-base text-gray-700 dark:text-gray-300 print:text-black">
          <p>
            <span className="font-medium">ETA (Hora Estimada de Arribo):</span> <strong>{flight.eta}</strong>
          </p>
          <p>
            <span className="font-medium">ETD (Hora Estimada de Salida):</span> <strong>{flight.etd}</strong>
          </p>
          {flight.ata && (
            <p>
              <span className="font-medium">ATA (Hora Real de Arribo):</span> <strong>{flight.ata}</strong>
            </p>
          )}
          {flight.atd && (
            <p>
              <span className="font-medium">ATD (Hora Real de Salida):</span> <strong>{flight.atd}</strong>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
