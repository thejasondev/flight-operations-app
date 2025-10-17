import React, { useState, useEffect } from 'react';
import { calculateTPT, calculateTPTStatus, getDelayStatusColor, getTPTProgressColor, formatDuration } from '../utils/tptUtils';
import type { Flight } from './FlightCard';
import { StatusIcon } from './icons/StatusIcons';

interface TPTTimerProps {
  flight: Flight;
  actualArrivalTime?: string;
  actualDepartureTime?: string;
  onStatusChange?: (status: any) => void;
}

export default function TPTTimer({ 
  flight, 
  actualArrivalTime, 
  actualDepartureTime,
  onStatusChange 
}: TPTTimerProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Actualizar el tiempo cada segundo
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  // Calcular TPT y estado
  const tptData = calculateTPT(flight.eta, flight.etd);
  const tptStatus = calculateTPTStatus(tptData, actualArrivalTime, actualDepartureTime, currentTime);
  
  // Notificar cambios de estado
  useEffect(() => {
    if (onStatusChange) {
      onStatusChange(tptStatus);
    }
  }, [tptStatus, onStatusChange]);

  const delayColors = getDelayStatusColor(tptStatus.delayStatus);
  const progressColor = getTPTProgressColor(tptStatus.phase, tptStatus.progressPercentage);

  const getPhaseIcon = () => {
    switch (tptStatus.phase) {
      case 'waiting':
        return (
          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'active':
        return (
          <svg className="w-5 h-5 text-blue-500 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'overdue':
        return (
          <svg className="w-5 h-5 text-red-500 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        );
      case 'completed':
        return (
          <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return null;
    }
  };

  const getPhaseText = () => {
    switch (tptStatus.phase) {
      case 'waiting':
        return 'Esperando Arribo';
      case 'active':
        return 'TPT Activo';
      case 'overdue':
        return 'Tiempo Excedido';
      case 'completed':
        return 'Vuelo Completado';
      default:
        return '';
    }
  };

  const getPhaseDescription = () => {
    switch (tptStatus.phase) {
      case 'waiting':
        return `TPT programado: ${tptData.tptFormatted}`;
      case 'active':
        return `Tiempo restante: ${tptStatus.remainingFormatted}`;
      case 'overdue':
        return 'El vuelo debería haber salido';
      case 'completed':
        return `Duración total: ${formatDuration(tptStatus.progressPercentage * tptData.tptMinutes / 100)}`;
      default:
        return '';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          {getPhaseIcon()}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              TPT
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {getPhaseText()}
            </p>
          </div>
        </div>
        
        {/* Status Badge */}
        <div className={`px-3 py-1 rounded-full text-xs font-medium border ${delayColors.bg} ${delayColors.text} ${delayColors.border}`}>
          {tptStatus.delayFormatted}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
          <span>ETA: {flight.eta}</span>
          <span>ETD: {flight.etd}</span>
        </div>
        
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
          <div 
            className={`h-full ${progressColor} transition-all duration-1000 ease-out relative`}
            style={{ width: `${Math.min(100, Math.max(0, tptStatus.progressPercentage))}%` }}
          >
            {/* Animated pulse effect for active state */}
            {tptStatus.phase === 'active' && (
              <div className="absolute inset-0 bg-white opacity-30 animate-pulse"></div>
            )}
          </div>
        </div>
        
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
          <span>0m</span>
          <span className="font-medium">{tptStatus.progressPercentage.toFixed(0)}%</span>
          <span>{tptData.tptFormatted}</span>
        </div>
      </div>

      {/* Time Information */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="text-2xl font-mono font-bold text-gray-900 dark:text-white">
            {tptStatus.remainingFormatted}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
            Tiempo Restante
          </div>
        </div>
        
        <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="text-2xl font-mono font-bold text-gray-900 dark:text-white">
            {tptData.tptFormatted}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
            TPT Total
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {getPhaseDescription()}
        </p>
        
        {/* Detailed Delay Analysis */}
        {tptStatus.delayAnalysis && (
          <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
            <h4 className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300 text-center">
              Análisis de Puntualidad
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Arrival Analysis */}
              <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Llegada</span>
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
              <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Salida</span>
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

        {/* Real times display (fallback if no analysis) */}
        {!tptStatus.delayAnalysis && (actualArrivalTime || actualDepartureTime) && (
          <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
              {actualArrivalTime && (
                <span>ATA: {actualArrivalTime}</span>
              )}
              {actualDepartureTime && (
                <span>ATD: {actualDepartureTime}</span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Alert for overdue */}
      {tptStatus.phase === 'overdue' && (
        <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg">
          <div className="flex items-center space-x-2">
            <svg className="w-4 h-4 text-red-500 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <span className="text-sm font-medium text-red-700 dark:text-red-300">
              ¡Atención! El tiempo de TPT ha sido excedido
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
