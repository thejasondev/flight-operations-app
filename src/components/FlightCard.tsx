import React from "react";
import TPTSummary from "./TPTSummary";
import "../styles/liquidGlass.css";

export interface Flight {
  id: string;
  flightNumber: string;
  airline: string;
  aircraftType?: string;
  destination: string;
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
  // Determine card styling based on status with liquid glass effect
  const getCardClasses = () => {
    const baseClasses = "liquid-glass-card p-4 mb-4 cursor-pointer transition-all border-l-4 relative overflow-hidden";
    
    if (flight.status === "pending") {
      return `${baseClasses} border-yellow-400 liquid-glass-status-pending`;
    } else if (flight.status === "in-progress") {
      return `${baseClasses} border-blue-400 liquid-glass-status-progress`;
    } else {
      return `${baseClasses} border-green-400 liquid-glass-status-completed`;
    }
  };

  // Function to handle delete button click without triggering the card click
  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the click from bubbling up to the card
    if (onDelete) {
      onDelete();
    }
  };

  // Function to handle view report button click without triggering the card click
  const handleViewReportClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the click from bubbling up to the card
    if (onViewReport) {
      onViewReport();
    }
  };

  // Get status badge based on flight status
  const getStatusBadge = () => {
    if (flight.status === "pending") {
      return (
        <span className="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100">
          Pendiente
        </span>
      );
    } else if (flight.status === "in-progress") {
      return (
        <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
          En Progreso
        </span>
      );
    } else {
      return (
        <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
          Completado
        </span>
      );
    }
  };

  return (
    <div
      className={getCardClasses()}
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            {flight.flightNumber}
          </h3>
          <div className="mt-1">{getStatusBadge()}</div>
        </div>
        <div className="flex items-start gap-2">
          <span className="text-sm px-2 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
            {flight.airline}
          </span>
          {flight.status === 'completed' && onViewReport && (
            <button 
              onClick={handleViewReportClick}
              className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 p-1 rounded-full hover:bg-green-100 dark:hover:bg-green-900 transition-colors"
              aria-label="Ver reporte del vuelo"
              title="Ver reporte del vuelo"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </button>
          )}
          {onDelete && (
            <button 
              onClick={handleDeleteClick}
              className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 p-1 rounded-full hover:bg-red-100 dark:hover:bg-red-900 transition-colors"
              aria-label="Eliminar vuelo"
              title="Eliminar vuelo"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          )}
        </div>
      </div>

      <p className="text-gray-700 dark:text-gray-300 mb-2">
        <span className="font-medium">Destino:</span> {flight.destination}
      </p>

      {flight.aircraftType && (
        <p className="text-gray-700 dark:text-gray-300 mb-2">
          <span className="font-medium">Avión:</span> {flight.aircraftType}
        </p>
      )}

      {flight.date && (
        <p className="text-gray-700 dark:text-gray-300 mb-2">
          <span className="font-medium">Fecha:</span> {flight.date}
        </p>
      )}

      <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
        <div>
          <p className="font-medium">ETA:</p>
          <p className="text-md">{flight.eta}</p>
        </div>
        <div>
          <p className="font-medium">ETD:</p>
          <p className="text-md">{flight.etd}</p>
        </div>
      </div>

      {/* TPT Summary */}
      <TPTSummary 
        flight={flight}
        actualArrivalTime={flight.operations?.["Arribo Real (ON/IN)"]?.start}
        actualDepartureTime={flight.operations?.["Empuje"]?.start}
        compact={true}
      />
    </div>
  );
}
