import React from 'react';
import type { Flight } from '../FlightCard';
import { REPORT_LABELS } from '../../constants/reportConstants';

interface FlightInfoSectionProps {
  flight: Flight;
}

export default function FlightInfoSection({ flight }: FlightInfoSectionProps) {
  return (
    <div className="print-section print-info-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-4">
      {/* Flight Information */}
      <div className="print-info-box bg-gray-50 dark:bg-gray-700 p-3 sm:p-4 rounded-lg print:bg-gray-100 border border-gray-200 dark:border-gray-600 print:border-gray-300">
        <h3 className="text-base sm:text-lg font-semibold mb-2 text-gray-900 dark:text-white print:text-black">
          {REPORT_LABELS.FLIGHT_INFO}
        </h3>
        <div className="space-y-1 sm:space-y-2 text-sm sm:text-base text-gray-700 dark:text-gray-300 print:text-black">
          <p className="break-words">
            <span className="font-medium">Vuelo:</span> <strong>{flight.flightNumber}</strong>
          </p>
          <p className="break-words">
            <span className="font-medium">Aerolínea:</span> <strong>{flight.airline}</strong>
          </p>
          {flight.aircraftType && (
            <p className="break-words">
              <span className="font-medium">Avión:</span> <strong>{flight.aircraftType}</strong>
            </p>
          )}
          {flight.aircraftRegistration && (
            <p className="break-words">
              <span className="font-medium">Matrícula:</span> <strong>{flight.aircraftRegistration}</strong>
            </p>
          )}
          {flight.rampPosition && (
            <p className="break-words">
              <span className="font-medium">Posición en Rampa:</span> <strong>{flight.rampPosition}</strong>
            </p>
          )}
          <p className="break-words">
            <span className="font-medium">Destino:</span> <strong>{flight.destination}</strong>
          </p>
          {flight.date && (
            <p className="break-words">
              <span className="font-medium">Fecha:</span> <strong>{flight.date}</strong>
            </p>
          )}
        </div>
      </div>
      
      {/* Scheduled Times */}
      <div className="print-info-box bg-gray-50 dark:bg-gray-700 p-3 sm:p-4 rounded-lg print:bg-gray-100 border border-gray-200 dark:border-gray-600 print:border-gray-300">
        <h3 className="text-base sm:text-lg font-semibold mb-2 text-gray-900 dark:text-white print:text-black">
          Horarios Estimados
        </h3>
        <div className="space-y-1 sm:space-y-2 text-sm sm:text-base text-gray-700 dark:text-gray-300 print:text-black">
          <p>
            <span className="font-medium">ETA:</span> <strong>{flight.eta}</strong>
          </p>
          <p>
            <span className="font-medium">ETD:</span> <strong>{flight.etd}</strong>
          </p>
        </div>
      </div>

      {/* Actual Times */}
      <div className="print-info-box bg-gray-50 dark:bg-gray-700 p-3 sm:p-4 rounded-lg print:bg-gray-100 border border-gray-200 dark:border-gray-600 print:border-gray-300">
        <h3 className="text-base sm:text-lg font-semibold mb-2 text-gray-900 dark:text-white print:text-black">
          Horarios Reales
        </h3>
        <div className="space-y-1 sm:space-y-2 text-sm sm:text-base text-gray-700 dark:text-gray-300 print:text-black">
          <p>
            <span className="font-medium">ATA:</span> <strong>{flight.ata || 'N/A'}</strong>
          </p>
          <p>
            <span className="font-medium">ATD:</span> <strong>{flight.atd || 'N/A'}</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
