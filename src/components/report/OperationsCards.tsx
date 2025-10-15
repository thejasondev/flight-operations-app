import React from 'react';
import type { Flight } from '../FlightCard';
import { formatTime, calculateDuration, isSingleTimeOperation } from '../../utils/reportUtils';
import { STATUS_LABELS } from '../../constants/reportConstants';

interface OperationsCardsProps {
  flight: Flight;
}

export default function OperationsCards({ flight }: OperationsCardsProps) {
  if (!flight.operations) return null;

  return (
    <div className="block lg:hidden print:hidden space-y-3">
      {Object.entries(flight.operations).map(([operation, times]) => (
        <div
          key={operation}
          className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg border border-gray-200 dark:border-gray-600 print:bg-white print:border-black"
        >
          <h4 className="font-semibold text-gray-900 dark:text-white print:text-black mb-2 text-sm">
            {operation}
          </h4>
          {isSingleTimeOperation(operation) ? (
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400 print:text-black">Hora del Evento:</span>
                <span className="font-medium text-gray-900 dark:text-white print:text-black">
                  {formatTime(times.start)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400 print:text-black">Estado:</span>
                <span className="text-green-600 dark:text-green-400 print:text-black font-medium">
                  {times.start ? STATUS_LABELS.REGISTERED : STATUS_LABELS.PENDING}
                </span>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="block text-gray-600 dark:text-gray-400 print:text-black mb-1">Inicio:</span>
                <span className="font-medium text-gray-900 dark:text-white print:text-black">
                  {formatTime(times.start)}
                </span>
              </div>
              <div>
                <span className="block text-gray-600 dark:text-gray-400 print:text-black mb-1">Fin:</span>
                <span className="font-medium text-gray-900 dark:text-white print:text-black">
                  {formatTime(times.end)}
                </span>
              </div>
              <div className="col-span-2 pt-2 border-t border-gray-200 dark:border-gray-600 print:border-black">
                <span className="text-gray-600 dark:text-gray-400 print:text-black">Duración: </span>
                <span className="font-medium text-gray-900 dark:text-white print:text-black">
                  {calculateDuration(times.start, times.end)}
                </span>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
