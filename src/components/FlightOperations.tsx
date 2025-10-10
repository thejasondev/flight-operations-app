import React, { useState, useEffect } from "react";
import type { Flight } from "./FlightCard";
import ThemeToggle from "./ThemeToggle";
import TimeInput from "./TimeInput";

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
    const timeString = now.toTimeString().split(" ")[0].substring(0, 5); // Only HH:MM

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
    const timeString = now.toTimeString().split(" ")[0].substring(0, 5); // Only HH:MM

    setOperations((prev) => ({
      ...prev,
      [operation]: {
        ...prev[operation],
        end: timeString,
      },
    }));
  };

  // Handle single time operations (for punctual events)
  const handleSingleTimeOperation = (operation: string) => {
    const now = new Date();
    const timeString = now.toTimeString().split(" ")[0].substring(0, 5); // Only HH:MM

    setOperations((prev) => ({
      ...prev,
      [operation]: {
        start: timeString,
        end: timeString, // Same time for both start and end
      },
    }));
  };

  // Check if operation is a single-time event
  const isSingleTimeOperation = (operation: string) => {
    return ["Cierre de Puertas", "Empuje", "Despegue"].includes(operation);
  };

  const handleTimeChange = (
    operation: string,
    type: "start" | "end",
    value: string
  ) => {
    if (isSingleTimeOperation(operation)) {
      // For single-time operations, set both start and end to the same value
      setOperations((prev) => ({
        ...prev,
        [operation]: {
          start: value,
          end: value,
        },
      }));
    } else {
      // For regular operations, set only the specified type
      setOperations((prev) => ({
        ...prev,
        [operation]: {
          ...prev[operation],
          [type]: value,
        },
      }));
    }
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
      // Ensure we're working with HH:MM format
      const startFormatted = start.length === 5 ? start : start.substring(0, 5);
      const endFormatted = end.length === 5 ? end : end.substring(0, 5);
      
      const startTime = new Date(`1970-01-01T${startFormatted}:00`);
      const endTime = new Date(`1970-01-01T${endFormatted}:00`);

      const diffMs = endTime.getTime() - startTime.getTime();
      const diffMins = Math.floor(diffMs / 60000);

      // Handle negative duration (crossing midnight)
      if (diffMins < 0) {
        const adjustedDiffMins = diffMins + (24 * 60); // Add 24 hours
        const hours = Math.floor(adjustedDiffMins / 60);
        const mins = adjustedDiffMins % 60;
        return `${hours}h ${mins}m`;
      }

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
            
            {isSingleTimeOperation(operation) ? (
              // Single time input for punctual operations
              <>
                <div className="mb-3">
                  <TimeInput
                    label="Hora del Evento"
                    value={operations[operation]?.start || ""}
                    onChange={(value) => handleTimeChange(operation, "start", value)}
                    size="lg"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {operations[operation]?.start ? (
                      <span className="text-green-600 dark:text-green-400">
                        ✓ Registrado: {operations[operation]?.start}
                      </span>
                    ) : (
                      "Pendiente de registro"
                    )}
                  </div>
                  <button
                    className={`py-2 px-4 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                      operations[operation]?.start
                        ? "bg-gray-100 text-gray-500 dark:bg-gray-600 dark:text-gray-400 cursor-not-allowed"
                        : "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 dark:focus:ring-offset-gray-800"
                    }`}
                    onClick={() => handleSingleTimeOperation(operation)}
                    disabled={!!operations[operation]?.start}
                  >
                    {operations[operation]?.start ? "Registrado" : "Registrar Ahora"}
                  </button>
                </div>
              </>
            ) : (
              // Dual time inputs for duration-based operations
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                  <TimeInput
                    label="Inicio"
                    value={operations[operation]?.start || ""}
                    onChange={(value) => handleTimeChange(operation, "start", value)}
                    size="lg"
                  />
                  <TimeInput
                    label="Fin"
                    value={operations[operation]?.end || ""}
                    onChange={(value) => handleTimeChange(operation, "end", value)}
                    size="lg"
                  />
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
                      className={`py-2 px-4 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                        operations[operation]?.start
                          ? "bg-gray-100 text-gray-500 dark:bg-gray-600 dark:text-gray-400 cursor-not-allowed"
                          : "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 dark:focus:ring-offset-gray-800"
                      }`}
                      onClick={() => handleStartOperation(operation)}
                      disabled={!!operations[operation]?.start}
                    >
                      Iniciar
                    </button>
                    <button
                      className={`py-2 px-4 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                        !operations[operation]?.start || operations[operation]?.end
                          ? "bg-gray-100 text-gray-500 dark:bg-gray-600 dark:text-gray-400 cursor-not-allowed"
                          : "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500 dark:focus:ring-offset-gray-800"
                      }`}
                      onClick={() => handleEndOperation(operation)}
                      disabled={!operations[operation]?.start || !!operations[operation]?.end}
                    >
                      Finalizar
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Vista desktop: Tabla original */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Operación
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Hora Inicio
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Hora Fin
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Duración
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {OPERATIONS.map((operation, index) => (
              <tr 
                key={operation}
                className={`${
                  index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700'
                } hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors`}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  {operation}
                </td>
                {isSingleTimeOperation(operation) ? (
                  // Single time operation layout
                  <>
                    <td className="px-6 py-4 whitespace-nowrap" colSpan={2}>
                      <div className="flex items-center space-x-3">
                        <TimeInput
                          value={operations[operation]?.start || ""}
                          onChange={(value) => handleTimeChange(operation, "start", value)}
                          size="sm"
                          placeholder="Hora del evento"
                        />
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          (Evento puntual)
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400 font-medium">
                      {operations[operation]?.start ? (
                        <span className="text-green-600 dark:text-green-400">
                          ✓ Registrado
                        </span>
                      ) : (
                        <span className="text-gray-400 dark:text-gray-500">Pendiente</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        className={`inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md transition-colors ${
                          operations[operation]?.start
                            ? "text-gray-500 bg-gray-100 dark:bg-gray-600 dark:text-gray-400 cursor-not-allowed"
                            : "text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800"
                        }`}
                        onClick={() => handleSingleTimeOperation(operation)}
                        disabled={!!operations[operation]?.start}
                      >
                        {operations[operation]?.start ? "Registrado" : "Registrar Ahora"}
                      </button>
                    </td>
                  </>
                ) : (
                  // Dual time operation layout
                  <>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <TimeInput
                        value={operations[operation]?.start || ""}
                        onChange={(value) => handleTimeChange(operation, "start", value)}
                        size="sm"
                        placeholder="Inicio"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <TimeInput
                        value={operations[operation]?.end || ""}
                        onChange={(value) => handleTimeChange(operation, "end", value)}
                        size="sm"
                        placeholder="Fin"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400 font-medium">
                      {calculateDuration(
                        operations[operation]?.start || "",
                        operations[operation]?.end || ""
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                      <button
                        className={`inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md transition-colors ${
                          operations[operation]?.start
                            ? "text-gray-500 bg-gray-100 dark:bg-gray-600 dark:text-gray-400 cursor-not-allowed"
                            : "text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800"
                        }`}
                        onClick={() => handleStartOperation(operation)}
                        disabled={!!operations[operation]?.start}
                      >
                        Iniciar
                      </button>
                      <button
                        className={`inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md transition-colors ${
                          !operations[operation]?.start || operations[operation]?.end
                            ? "text-gray-500 bg-gray-100 dark:bg-gray-600 dark:text-gray-400 cursor-not-allowed"
                            : "text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 dark:focus:ring-offset-gray-800"
                        }`}
                        onClick={() => handleEndOperation(operation)}
                        disabled={!operations[operation]?.start || !!operations[operation]?.end}
                      >
                        Finalizar
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    <div className="mb-6">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        Notas Adicionales
      </h3>
      <textarea
        className="w-full h-32 p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 transition-colors placeholder-gray-500 dark:placeholder-gray-400"
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
