import React from "react";

export interface Flight {
  id: string;
  flightNumber: string;
  airline: string;
  destination: string;
  eta: string;
  etd: string;
  status: "pending" | "in-progress" | "completed";
  operations?: Record<string, { start: string; end: string }>;
  notes?: string;
}

interface FlightCardProps {
  flight: Flight;
  onClick?: () => void;
}

export default function FlightCard({ flight, onClick }: FlightCardProps) {
  // Determine card styling based on status
  const getCardClasses = () => {
    const baseClasses = "bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-4 cursor-pointer hover:shadow-lg transition-all border-l-4 hover-card-effect";
    
    if (flight.status === "pending") {
      return `${baseClasses} border-yellow-500`;
    } else if (flight.status === "in-progress") {
      return `${baseClasses} border-blue-500`;
    } else {
      return `${baseClasses} border-green-500`;
    }
  };

  return (
    <div
      className={getCardClasses()}
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          {flight.flightNumber}
        </h3>
        <span className="text-sm px-2 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
          {flight.airline}
        </span>
      </div>

      <p className="text-gray-700 dark:text-gray-300 mb-2">
        <span className="font-medium">Destino:</span> {flight.destination}
      </p>

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
    </div>
  );
}
