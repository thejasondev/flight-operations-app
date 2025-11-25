import React, { useState } from 'react';
import TPTSummary from './TPTSummary';
import { extractIATACode } from '../data';
import '../styles/liquidGlass.css';

export interface Flight {
  id: string;
  flightNumber: string;
  airline: string;
  aircraftType?: string;
  aircraftRegistration?: string;
  rampPosition?: string;
  destination: string;
  origin?: string;
  secondDestination?: string;
  date?: string;
  eta: string;
  etd: string;
  ata?: string;
  atd?: string;
  status: 'pending' | 'in-progress' | 'completed';
  operations?: Record<string, { start: string; end: string }>;
  notes?: string;
}

interface FlightCardProps {
  flight: Flight;
  onClick?: () => void;
  onDelete?: () => void;
  onViewReport?: () => void;
}

export default function FlightCard({ flight, onClick, onDelete, onViewReport }: FlightCardProps) {
  const [showDetails, setShowDetails] = useState(false);

  /**
   * Extract full IATA route from destination string
   * Handles formats like:
   * - "Varadero (VRA)/Toronto (YYZ)" → "VRA/YYZ"
   * - "Montreal (YUL)/Toronto (YYZ)/Miami (MIA)" → "YUL/YYZ/MIA"
   */
  const getRouteIATA = (destination: string): string => {
    // Split by "/" to get all segments (origin/dest1/dest2...)
    const segments = destination.split('/');

    // Extract IATA code from each segment
    const iataCodes = segments
      .map((segment) => {
        const code = extractIATACode(segment.trim());
        return code || segment.trim().split(' ')[0]; // Fallback to first word
      })
      .filter(Boolean); // Remove empty codes

    // Join with "/" separator
    return iataCodes.join('/');
  };

  // Get status configuration
  const statusConfig = {
    pending: {
      label: 'Pendiente',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      badgeClasses: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      borderClass: 'border-l-yellow-500',
      glowClass: 'liquid-glass-status-pending',
    },
    'in-progress': {
      label: 'En Proceso',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
      badgeClasses: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      borderClass: 'border-l-blue-500',
      glowClass: 'liquid-glass-status-progress',
    },
    completed: {
      label: 'Completado',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      badgeClasses: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      borderClass: 'border-l-green-500',
      glowClass: 'liquid-glass-status-completed',
    },
  };

  const currentStatus = statusConfig[flight.status];

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete) onDelete();
  };

  const handleViewReportClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onViewReport) onViewReport();
  };

  const toggleDetails = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDetails(!showDetails);
  };

  return (
    <div
      className={`liquid-glass-card p-4 mb-3 cursor-pointer transition-all border-l-4 relative overflow-hidden hover:shadow-lg ${currentStatus.borderClass} ${currentStatus.glowClass}`}
      onClick={onClick}
    >
      {/* MOBILE LAYOUT */}
      <div className="md:hidden">
        {/* Primary Info - Large and Prominent */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            {/* Route IATA - Very Large (e.g., YUL/YYZ) */}
            <div className="text-3xl font-black text-gray-900 dark:text-white mb-1">
              {getRouteIATA(flight.destination)}
            </div>

            {/* Flight Number + Airline - Medium */}
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg font-bold text-gray-700 dark:text-gray-300">
                {flight.flightNumber}
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                {flight.airline}
              </span>
            </div>

            {/* Status Badge */}
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${currentStatus.badgeClasses}`}
            >
              {currentStatus.icon}
              {currentStatus.label}
            </span>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-1">
            {flight.status === 'completed' && onViewReport && (
              <button
                onClick={handleViewReportClick}
                className="p-2 text-green-600 hover:text-green-700 dark:text-green-400 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors"
                aria-label="Ver reporte"
                title="Ver reporte del vuelo"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </button>
            )}
            {onDelete && (
              <button
                onClick={handleDeleteClick}
                className="p-2 text-red-500 hover:text-red-700 dark:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                aria-label="Eliminar"
                title="Eliminar vuelo"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Times - Large and Clear */}
        <div className="flex items-center justify-between mb-3 py-2 bg-gray-50 dark:bg-gray-800/50 rounded-lg px-3">
          <div className="text-center">
            <div className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-0.5">ETA</div>
            <div className="text-xl font-bold text-gray-900 dark:text-white tabular-nums">
              {flight.eta}
            </div>
          </div>
          <div className="text-gray-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </div>
          <div className="text-center">
            <div className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-0.5">ETD</div>
            <div className="text-xl font-bold text-gray-900 dark:text-white tabular-nums">
              {flight.etd}
            </div>
          </div>
        </div>

        {/* Secondary Details - Collapsible */}
        {(flight.aircraftType ||
          flight.aircraftRegistration ||
          flight.rampPosition ||
          flight.date) && (
          <>
            <button
              onClick={toggleDetails}
              className="w-full flex items-center justify-center gap-2 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
            >
              <span className="font-medium">
                {showDetails ? 'Ocultar detalles' : 'Ver detalles'}
              </span>
              <svg
                className={`w-4 h-4 transition-transform ${showDetails ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {showDetails && (
              <div className="mt-2 pt-3 border-t border-gray-200 dark:border-gray-700 space-y-2">
                {flight.aircraftType && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Avión:</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {flight.aircraftType}
                    </span>
                  </div>
                )}
                {flight.aircraftRegistration && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Matrícula:</span>
                    <span className="font-mono font-medium text-gray-900 dark:text-white">
                      {flight.aircraftRegistration}
                    </span>
                  </div>
                )}
                {flight.rampPosition && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Posición:</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {flight.rampPosition}
                    </span>
                  </div>
                )}
                {flight.date && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Fecha:</span>
                    <span className="font-medium text-gray-900 dark:text-white">{flight.date}</span>
                  </div>
                )}
              </div>
            )}
          </>
        )}

        {/* TPT Summary */}
        <div className="mt-3">
          <TPTSummary
            flight={flight}
            actualArrivalTime={flight.operations?.['Arribo Real (ON/IN)']?.end}
            actualDepartureTime={flight.operations?.['Empuje']?.start}
            compact={true}
          />
        </div>
      </div>

      {/* DESKTOP/TABLET LAYOUT */}
      <div className="hidden md:block">
        <div className="grid grid-cols-12 gap-4 items-start">
          {/* Left Section - Flight Info (5 cols) */}
          <div className="col-span-5">
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-2xl font-black text-gray-900 dark:text-white">
                    {flight.flightNumber}
                  </h3>
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${currentStatus.badgeClasses}`}
                  >
                    {currentStatus.icon}
                    {currentStatus.label}
                  </span>
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Aerolínea:
                  </span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    {flight.airline}
                  </span>
                </div>
              </div>

              {/* Desktop Actions */}
              <div className="flex items-center gap-1">
                {flight.status === 'completed' && onViewReport && (
                  <button
                    onClick={handleViewReportClick}
                    className="p-2 text-green-600 hover:text-green-700 dark:text-green-400 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors"
                    aria-label="Ver reporte"
                    title="Ver reporte del vuelo"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </button>
                )}
                {onDelete && (
                  <button
                    onClick={handleDeleteClick}
                    className="p-2 text-red-500 hover:text-red-700 dark:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    aria-label="Eliminar"
                    title="Eliminar vuelo"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            {/* Aircraft Details */}
            <div className="space-y-1.5">
              {flight.aircraftType && (
                <div className="flex items-center gap-2 text-sm">
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                  <span className="text-gray-600 dark:text-gray-400">Avión:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {flight.aircraftType}
                  </span>
                </div>
              )}
              {flight.aircraftRegistration && (
                <div className="flex items-center gap-2 text-sm">
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <span className="text-gray-600 dark:text-gray-400">Matrícula:</span>
                  <span className="font-mono font-medium text-gray-900 dark:text-white">
                    {flight.aircraftRegistration}
                  </span>
                </div>
              )}
              {flight.rampPosition && (
                <div className="flex items-center gap-2 text-sm">
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span className="text-gray-600 dark:text-gray-400">Posición:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {flight.rampPosition}
                  </span>
                </div>
              )}
              {flight.date && (
                <div className="flex items-center gap-2 text-sm">
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-gray-600 dark:text-gray-400">Fecha:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{flight.date}</span>
                </div>
              )}
            </div>
          </div>

          {/* Center Section - Route (3 cols) */}
          <div className="col-span-3 flex flex-col items-center justify-center py-2">
            <div className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-1">RUTA</div>
            <div className="text-4xl font-black text-blue-600 dark:text-blue-400 mb-1">
              {getRouteIATA(flight.destination)}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400 text-center">
              {flight.destination}
            </div>
          </div>

          {/* Right Section - Times & TPT (4 cols) */}
          <div className="col-span-4">
            {/* Times */}
            <div className="flex items-center justify-between mb-3 py-2 bg-gray-50 dark:bg-gray-800/50 rounded-lg px-3">
              <div className="text-center flex-1">
                <div className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-0.5">
                  ETA
                </div>
                <div className="text-xl font-bold text-gray-900 dark:text-white tabular-nums">
                  {flight.eta}
                </div>
              </div>
              <div className="text-gray-400 mx-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </div>
              <div className="text-center flex-1">
                <div className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-0.5">
                  ETD
                </div>
                <div className="text-xl font-bold text-gray-900 dark:text-white tabular-nums">
                  {flight.etd}
                </div>
              </div>
            </div>

            {/* TPT Summary */}
            <TPTSummary
              flight={flight}
              actualArrivalTime={flight.operations?.['Arribo Real (ON/IN)']?.end}
              actualDepartureTime={flight.operations?.['Empuje']?.start}
              compact={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
