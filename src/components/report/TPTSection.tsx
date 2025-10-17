import React from 'react';
import type { Flight } from '../FlightCard';
import { calculateTPT, calculateTPTStatus, formatDuration, getDelayStatusColor } from '../../utils/tptUtils';
import { StatusIcon } from '../icons/StatusIcons';

interface TPTSectionProps {
  flight: Flight;
}

export default function TPTSection({ flight }: TPTSectionProps) {
  // Solo mostrar si hay ETA y ETD
  if (!flight.eta || !flight.etd) {
    return null;
  }

  const tptData = calculateTPT(flight.eta, flight.etd);
  // TPT comienza cuando el arribo real FINALIZA (end), no cuando inicia (start)
  const actualArrivalTime = flight.operations?.["Arribo Real (ON/IN)"]?.end;
  const actualDepartureTime = flight.operations?.["Empuje"]?.start;
  const tptStatus = calculateTPTStatus(tptData, actualArrivalTime, actualDepartureTime);

  // Calcular duración real si hay tiempos reales
  let actualDuration = 'N/A';
  if (actualArrivalTime && actualDepartureTime) {
    const arrivalMinutes = parseInt(actualArrivalTime.split(':')[0]) * 60 + parseInt(actualArrivalTime.split(':')[1]);
    const departureMinutes = parseInt(actualDepartureTime.split(':')[0]) * 60 + parseInt(actualDepartureTime.split(':')[1]);
    let duration = departureMinutes - arrivalMinutes;
    if (duration < 0) duration += 24 * 60; // Handle midnight crossing
    actualDuration = formatDuration(duration);
  }

  return (
    <div className="print-section print-tpt-section bg-blue-50 dark:bg-blue-900/20 p-3 sm:p-4 rounded-lg border border-blue-200 dark:border-blue-700 mb-4">
      <h3 className="text-base sm:text-lg font-semibold mb-3 text-blue-900 dark:text-blue-100 print:text-black">
        TPT
      </h3>
      
      {/* TPT Overview */}
      <div className="print-tpt-grid grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-4">
        <div className="print-tpt-item text-center p-2 bg-white dark:bg-gray-800 rounded border border-blue-100 dark:border-blue-800">
          <span className="block text-xs text-gray-600 dark:text-gray-400 mb-1">TPT Programado</span>
          <strong className="text-sm font-bold text-blue-700 dark:text-blue-300">{tptData.tptFormatted}</strong>
        </div>
        <div className="print-tpt-item text-center p-2 bg-white dark:bg-gray-800 rounded border border-blue-100 dark:border-blue-800">
          <span className="block text-xs text-gray-600 dark:text-gray-400 mb-1">TPT Real</span>
          <strong className="text-sm font-bold text-blue-700 dark:text-blue-300">{actualDuration}</strong>
        </div>
        <div className="print-tpt-item text-center p-2 bg-white dark:bg-gray-800 rounded border border-blue-100 dark:border-blue-800">
          <span className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Estado General</span>
          <strong className="text-sm font-bold text-blue-700 dark:text-blue-300">{tptStatus.delayFormatted}</strong>
        </div>
        <div className="print-tpt-item text-center p-2 bg-white dark:bg-gray-800 rounded border border-blue-100 dark:border-blue-800">
          <span className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Diferencia TPT</span>
          <strong className="text-sm font-bold text-blue-700 dark:text-blue-300">
            {tptStatus.delayMinutes > 0 ? `+${formatDuration(tptStatus.delayMinutes)}` : 
             tptStatus.delayMinutes < 0 ? `-${formatDuration(Math.abs(tptStatus.delayMinutes))}` : 
             '0m'}
          </strong>
        </div>
      </div>

      {/* Detailed Delay Analysis */}
      {tptStatus.delayAnalysis && (
        <div className="mt-4 pt-3 border-t border-blue-200 dark:border-blue-700">
          <h4 className="text-sm font-semibold mb-2 text-blue-800 dark:text-blue-200 print:text-black">
            Análisis Detallado de Puntualidad
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Arrival Analysis */}
            <div className="p-2 bg-white dark:bg-gray-800 rounded border border-blue-100 dark:border-blue-800">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Llegada (ETA vs ATA)</span>
                <div className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getDelayStatusColor(tptStatus.delayAnalysis.arrivalDelay.status).bg} ${getDelayStatusColor(tptStatus.delayAnalysis.arrivalDelay.status).text}`}>
                  <StatusIcon 
                    status={tptStatus.delayAnalysis.arrivalDelay.status} 
                    size="sm" 
                    className="flex-shrink-0"
                  />
                </div>
              </div>
              <div className="text-xs text-gray-700 dark:text-gray-300">
                <div>ETA: {flight.eta}</div>
                <div>ATA: {actualArrivalTime || 'Pendiente'}</div>
                <div className="font-medium mt-1">{tptStatus.delayAnalysis.arrivalDelay.formatted}</div>
              </div>
            </div>

            {/* Departure Analysis */}
            <div className="p-2 bg-white dark:bg-gray-800 rounded border border-blue-100 dark:border-blue-800">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Salida (ETD vs ATD)</span>
                <div className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getDelayStatusColor(tptStatus.delayAnalysis.departureDelay.status).bg} ${getDelayStatusColor(tptStatus.delayAnalysis.departureDelay.status).text}`}>
                  <StatusIcon 
                    status={actualDepartureTime ? tptStatus.delayAnalysis.departureDelay.status : 'pending'} 
                    size="sm" 
                    className="flex-shrink-0"
                  />
                </div>
              </div>
              <div className="text-xs text-gray-700 dark:text-gray-300">
                <div>ETD: {flight.etd}</div>
                <div>ATD: {actualDepartureTime || 'Pendiente'}</div>
                <div className="font-medium mt-1">{tptStatus.delayAnalysis.departureDelay.formatted}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
