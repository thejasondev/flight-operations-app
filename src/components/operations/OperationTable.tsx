import React from 'react';
import TimeInput from '../TimeInput';
import { calculateDuration } from '../../utils/timeUtils';
import { OPERATIONS } from '../../types/operations';
import type { OperationsData } from '../../types/operations';

interface OperationTableProps {
  operations: OperationsData;
  isSingleTimeOperation: (operation: string) => boolean;
  onTimeChange: (operation: string, type: "start" | "end", value: string) => void;
  onStartOperation: (operation: string) => void;
  onEndOperation: (operation: string) => void;
  onSingleTimeOperation: (operation: string) => void;
}

export default function OperationTable({
  operations,
  isSingleTimeOperation,
  onTimeChange,
  onStartOperation,
  onEndOperation,
  onSingleTimeOperation,
}: OperationTableProps) {
  return (
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
                        onChange={(value) => onTimeChange(operation, "start", value)}
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
                      onClick={() => onSingleTimeOperation(operation)}
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
                      onChange={(value) => onTimeChange(operation, "start", value)}
                      size="sm"
                      placeholder="Inicio"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <TimeInput
                      value={operations[operation]?.end || ""}
                      onChange={(value) => onTimeChange(operation, "end", value)}
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
                      onClick={() => onStartOperation(operation)}
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
                      onClick={() => onEndOperation(operation)}
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
  );
}
