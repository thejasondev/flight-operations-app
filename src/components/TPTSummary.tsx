import React from 'react';
import { calculateTPT, calculateTPTStatus, getDelayStatusColor } from '../utils/tptUtils';
import type { Flight } from './FlightCard';

interface TPTSummaryProps {
  flight: Flight;
  actualArrivalTime?: string;
  actualDepartureTime?: string;
  compact?: boolean;
}

export default function TPTSummary({ 
  flight, 
  actualArrivalTime, 
  actualDepartureTime,
  compact = false 
}: TPTSummaryProps) {
  // Solo mostrar si hay ETA y ETD
  if (!flight.eta || !flight.etd) {
    return null;
  }

  const tptData = calculateTPT(flight.eta, flight.etd);
  const tptStatus = calculateTPTStatus(tptData, actualArrivalTime, actualDepartureTime);
  const delayColors = getDelayStatusColor(tptStatus.delayStatus);

  const getStatusIcon = () => {
    switch (tptStatus.phase) {
      case 'waiting':
        return (
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'active':
        return (
          <svg className="w-4 h-4 text-blue-500 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'overdue':
        return (
          <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        );
      case 'completed':
        return (
          <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return null;
    }
  };

  if (compact) {
    return (
      <div className="flex items-center space-x-2 text-xs">
        {getStatusIcon()}
        <span className="text-gray-600 dark:text-gray-400">
          TPT: {tptData.tptFormatted}
        </span>
        {tptStatus.phase === 'active' && (
          <span className="text-blue-600 dark:text-blue-400 font-medium">
            {tptStatus.remainingFormatted} restante
          </span>
        )}
        {tptStatus.delayStatus !== 'on-time' && (
          <span className={`font-medium ${delayColors.text}`}>
            {tptStatus.delayFormatted}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          {getStatusIcon()}
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            TPT: {tptData.tptFormatted}
          </span>
        </div>
        
        <div className={`px-2 py-1 rounded text-xs font-medium ${delayColors.bg} ${delayColors.text} border ${delayColors.border}`}>
          {tptStatus.delayFormatted}
        </div>
      </div>
      
      {/* Mini progress bar */}
      <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 mb-2">
        <div 
          className={`h-full rounded-full transition-all duration-500 ${
            tptStatus.phase === 'waiting' ? 'bg-gray-400' :
            tptStatus.phase === 'active' ? 'bg-blue-500' :
            tptStatus.phase === 'overdue' ? 'bg-red-500' :
            'bg-green-500'
          }`}
          style={{ width: `${Math.min(100, Math.max(0, tptStatus.progressPercentage))}%` }}
        />
      </div>
      
      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
        <span>ETA: {flight.eta}</span>
        {tptStatus.phase === 'active' && (
          <span className="font-medium text-blue-600 dark:text-blue-400">
            {tptStatus.remainingFormatted} restante
          </span>
        )}
        <span>ETD: {flight.etd}</span>
      </div>
    </div>
  );
}
