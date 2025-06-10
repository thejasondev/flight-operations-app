import React from "react";
import type { Flight } from "./FlightCard";
import ThemeToggle from "./ThemeToggle";

interface ReportProps {
  flight: Flight;
  onClose: () => void;
}

export default function Report({ flight, onClose }: ReportProps) {
  const handlePrint = () => {
    window.print();
  };

  // Format time to show as HH:MM
  const formatTime = (time: string) => {
    if (!time) return "-";
    return time;
  };

  // Calculate duration between start and end times
  const calculateDuration = (start: string, end: string) => {
    if (!start || !end) return "-";

    try {
      const startTime = new Date(`1970-01-01T${start}`);
      const endTime = new Date(`1970-01-01T${end}`);

      const diffMs = endTime.getTime() - startTime.getTime();
      const diffMins = Math.floor(diffMs / 60000);

      const hours = Math.floor(diffMins / 60);
      const mins = diffMins % 60;

      return `${hours}h ${mins}m`;
    } catch (error) {
      return "-";
    }
  };

  // Get the current date formatted
  const formattedDate = new Date().toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 print:static print:bg-transparent">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto print:max-h-none print:shadow-none print:p-0">
        <div className="no-print flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Reporte de Operaciones
          </h2>
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <button
              className="mr-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              onClick={handlePrint}
            >
              Imprimir Reporte
            </button>
            <button
              className="px-4 py-2 bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600"
              onClick={onClose}
            >
              Cerrar
            </button>
          </div>
        </div>

        {/* Printable Report Content */}
        <div className="print:text-black print:bg-white">
          <div className="mb-6 border-b pb-4 border-gray-200 print:border-black">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white print:text-black">
                Reporte de Vuelo
              </h1>
              <div className="print:block hidden text-right">
                <p className="text-gray-700 font-medium">{formattedDate}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg print:bg-gray-100">
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white print:text-black">
                  Información del Vuelo
                </h3>
                <div className="space-y-2 text-gray-700 dark:text-gray-300 print:text-black">
                  <p>
                    <span className="font-medium">Número de Vuelo:</span> {flight.flightNumber}
                  </p>
                  <p>
                    <span className="font-medium">Aerolínea:</span> {flight.airline}
                  </p>
                  <p>
                    <span className="font-medium">Destino:</span> {flight.destination}
                  </p>
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg print:bg-gray-100">
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white print:text-black">
                  Horarios Programados
                </h3>
                <div className="space-y-2 text-gray-700 dark:text-gray-300 print:text-black">
                  <p>
                    <span className="font-medium">ETA (Hora Estimada de Arribo):</span> {flight.eta}
                  </p>
                  <p>
                    <span className="font-medium">ETD (Hora Estimada de Salida):</span> {flight.etd}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white print:text-black">
              Registro de Operaciones
            </h3>

            <table className="min-w-full border-collapse border border-gray-300 print:border-black">
              <thead className="bg-gray-50 dark:bg-gray-700 print:bg-gray-100">
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-left text-gray-700 dark:text-gray-300 print:text-black print:border-black">
                    Operación
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left text-gray-700 dark:text-gray-300 print:text-black print:border-black">
                    Hora Inicio
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left text-gray-700 dark:text-gray-300 print:text-black print:border-black">
                    Hora Fin
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left text-gray-700 dark:text-gray-300 print:text-black print:border-black">
                    Duración
                  </th>
                </tr>
              </thead>
              <tbody>
                {flight.operations &&
                  Object.entries(flight.operations).map(
                    ([operation, times]) => (
                      <tr
                        key={operation}
                        className="border-t border-gray-300 print:border-black"
                      >
                        <td className="border border-gray-300 px-4 py-2 text-gray-900 dark:text-white print:text-black print:border-black">
                          {operation}
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-gray-700 dark:text-gray-300 print:text-black print:border-black">
                          {formatTime(times.start)}
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-gray-700 dark:text-gray-300 print:text-black print:border-black">
                          {formatTime(times.end)}
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-gray-700 dark:text-gray-300 print:text-black print:border-black">
                          {calculateDuration(times.start, times.end)}
                        </td>
                      </tr>
                    )
                  )}
              </tbody>
            </table>
          </div>

          {flight.notes && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white print:text-black">
                Notas Adicionales
              </h3>
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600 print:bg-white print:border-black">
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap print:text-black">
                  {flight.notes}
                </p>
              </div>
            </div>
          )}

          <div className="mt-8 print:mt-12 text-gray-500 dark:text-gray-400 print:text-black text-sm">
            <p>Reporte generado: {new Date().toLocaleString()}</p>
            <p className="mt-1">Este es un documento oficial de operaciones de vuelo.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
