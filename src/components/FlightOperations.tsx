import React, { useState, useEffect } from "react";
import type { Flight } from "./FlightCard";
import ThemeToggle from "./ThemeToggle";

interface FlightOperationsProps {
  flight: Flight;
  onComplete: (updatedFlight: Flight) => void;
  onBack: () => void;
}

// List of operations to track
const OPERATIONS = [
  "Arribo Real (ON/IN)",
  "Desembarco",
  "Descarga de Equipaje",
  "Limpieza de Cabina",
  "Carga de Combustible",
  "Servicio de Catering",
  "Carga de Equipaje",
  "Abordo de Pasajeros",
  "Cierre de Puertas",
  "Empuje",
  "Despegue",
];

export default function FlightOperations({
  flight,
  onComplete,
  onBack,
}: FlightOperationsProps) {
  const [operations, setOperations] = useState<
    Record<string, { start: string; end: string }>
  >({});
  const [notes, setNotes] = useState(flight.notes || "");

  // Initialize operations from flight if they exist
  useEffect(() => {
    if (flight.operations) {
      setOperations(flight.operations);
    } else {
      // Initialize with empty operations
      const initialOps: Record<string, { start: string; end: string }> = {};
      OPERATIONS.forEach((op) => {
        initialOps[op] = { start: "", end: "" };
      });
      setOperations(initialOps);
    }
  }, [flight]);

  const handleStartOperation = (operation: string) => {
    const now = new Date();
    const timeString = now.toTimeString().split(" ")[0];

    setOperations((prev) => ({
      ...prev,
      [operation]: {
        ...prev[operation],
        start: timeString,
      },
    }));
  };

  const handleEndOperation = (operation: string) => {
    const now = new Date();
    const timeString = now.toTimeString().split(" ")[0];

    setOperations((prev) => ({
      ...prev,
      [operation]: {
        ...prev[operation],
        end: timeString,
      },
    }));
  };

  const handleTimeChange = (
    operation: string,
    type: "start" | "end",
    value: string
  ) => {
    setOperations((prev) => ({
      ...prev,
      [operation]: {
        ...prev[operation],
        [type]: value,
      },
    }));
  };

  const handleCompleteOperations = () => {
    const updatedFlight: Flight = {
      ...flight,
      operations,
      notes,
      status: "completed",
    };
    onComplete(updatedFlight);
  };

  // Calculate duration between start and end times for an operation
  const calculateDuration = (start: string, end: string) => {
    if (!start || !end) return "";

    try {
      const startTime = new Date(`1970-01-01T${start}`);
      const endTime = new Date(`1970-01-01T${end}`);

      const diffMs = endTime.getTime() - startTime.getTime();
      const diffMins = Math.floor(diffMs / 60000);

      const hours = Math.floor(diffMins / 60);
      const mins = diffMins % 60;

      return `${hours}h ${mins}m`;
    } catch (error) {
      return "";
    }
  };
// ...existing code hasta el return...

return (
  <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg">
    <div className="mb-6 border-b pb-4 border-gray-200 dark:border-gray-700">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-0">
          Operaciones de Vuelo: {flight.flightNumber}
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-2 text-gray-700 dark:text-gray-300">
        <p className="flex items-center">
          <span className="font-medium w-24">Aerolínea:</span> {flight.airline}
        </p>
        <p className="flex items-center">
          <span className="font-medium w-24">Destino:</span> {flight.destination}
        </p>
        <p className="flex items-center">
          <span className="font-medium w-24">ETA/ETD:</span> {flight.eta} / {flight.etd}
        </p>
      </div>
    </div>

    <div className="mb-6">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        Operaciones
      </h3>

      {/* Vista móvil: Lista de tarjetas */}
      <div className="block lg:hidden space-y-4">
        {OPERATIONS.map((operation) => (
          <div 
            key={operation}
            className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 shadow-sm"
          >
            <h4 className="font-medium text-gray-900 dark:text-white mb-3">
              {operation}
            </h4>
            
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Inicio
                </label>
                <input
                  type="time"
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-lg"
                  value={operations[operation]?.start || ""}
                  onChange={(e) => handleTimeChange(operation, "start", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Fin
                </label>
                <input
                  type="time"
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-lg"
                  value={operations[operation]?.end || ""}
                  onChange={(e) => handleTimeChange(operation, "end", e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Duración: {calculateDuration(
                  operations[operation]?.start || "",
                  operations[operation]?.end || ""
                )}
              </div>
              <div className="flex space-x-2">
                <button
                  className={`py-2 px-4 rounded-lg text-sm font-medium ${
                    operations[operation]?.start
                      ? "bg-gray-100 text-gray-500 dark:bg-gray-600 dark:text-gray-400"
                      : "bg-blue-600 text-white"
                  }`}
                  onClick={() => handleStartOperation(operation)}
                  disabled={!!operations[operation]?.start}
                >
                  Iniciar
                </button>
                <button
                  className={`py-2 px-4 rounded-lg text-sm font-medium ${
                    !operations[operation]?.start || operations[operation]?.end
                      ? "bg-gray-100 text-gray-500 dark:bg-gray-600 dark:text-gray-400"
                      : "bg-green-600 text-white"
                  }`}
                  onClick={() => handleEndOperation(operation)}
                  disabled={!operations[operation]?.start || !!operations[operation]?.end}
                >
                  Finalizar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Vista desktop: Tabla original */}
      <div className="hidden lg:block overflow-x-auto">
        {/* Mantener el código original de la tabla aquí */}
        // ...existing table code...
      </div>
    </div>

    <div className="mb-6">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        Notas Adicionales
      </h3>
      <textarea
        className="w-full h-32 p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-base"
        placeholder="Ingrese notas adicionales aquí..."
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      ></textarea>
    </div>

    <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6">
      <button
        className="w-full sm:w-auto px-6 py-3 bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-base font-medium"
        onClick={onBack}
      >
        Volver al Dashboard
      </button>
      <button
        className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-base font-medium"
        onClick={handleCompleteOperations}
      >
        Finalizar y Generar Reporte
      </button>
    </div>
  </div>
);
}
