import React, { useState, useEffect } from "react";
import type { Flight } from "./FlightCard";

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

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <div className="mb-6 border-b pb-4 border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Operaciones de Vuelo: {flight.flightNumber}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-700 dark:text-gray-300">
          <p>
            <span className="font-medium">Aerolínea:</span> {flight.airline}
          </p>
          <p>
            <span className="font-medium">Destino:</span> {flight.destination}
          </p>
          <p>
            <span className="font-medium">ETA/ETD:</span> {flight.eta} /{" "}
            {flight.etd}
          </p>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Operaciones
        </h3>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Operación
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Inicio
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Fin
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
              {OPERATIONS.map((operation) => (
                <tr
                  key={operation}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {operation}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    <input
                      type="time"
                      className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      value={operations[operation]?.start || ""}
                      onChange={(e) =>
                        handleTimeChange(operation, "start", e.target.value)
                      }
                      aria-label={`Hora de inicio para ${operation}`}
                      title={`Hora de inicio para ${operation}`}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    <input
                      type="time"
                      className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      value={operations[operation]?.end || ""}
                      onChange={(e) =>
                        handleTimeChange(operation, "end", e.target.value)
                      }
                      aria-label={`Hora de finalización para ${operation}`}
                      title={`Hora de finalización para ${operation}`}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {calculateDuration(
                      operations[operation]?.start || "",
                      operations[operation]?.end || ""
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      className={`mr-2 px-3 py-1 rounded-md ${
                        operations[operation]?.start
                          ? "bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400 cursor-not-allowed"
                          : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 hover:bg-blue-200 dark:hover:bg-blue-800"
                      }`}
                      onClick={() => handleStartOperation(operation)}
                      disabled={!!operations[operation]?.start}
                    >
                      Iniciar
                    </button>
                    <button
                      className={`px-3 py-1 rounded-md ${
                        !operations[operation]?.start || operations[operation]?.end
                          ? "bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400 cursor-not-allowed"
                          : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 hover:bg-green-200 dark:hover:bg-green-800"
                      }`}
                      onClick={() => handleEndOperation(operation)}
                      disabled={!operations[operation]?.start || !!operations[operation]?.end}
                    >
                      Finalizar
                    </button>
                  </td>
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
          className="w-full h-32 p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          placeholder="Ingrese notas adicionales aquí..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        ></textarea>
      </div>

      <div className="flex justify-between mt-6">
        <button
          className="px-4 py-2 bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          onClick={onBack}
        >
          Volver al Dashboard
        </button>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          onClick={handleCompleteOperations}
        >
          Finalizar y Generar Reporte
        </button>
      </div>
    </div>
  );
}
