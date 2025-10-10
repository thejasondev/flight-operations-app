import React from 'react';
import TimeInput from '../TimeInput';
import { calculateDuration } from '../../utils/timeUtils';
import type { OperationRecord } from '../../types/operations';

interface OperationCardProps {
  operation: string;
  operationData: OperationRecord;
  isSingleTime: boolean;
  onTimeChange: (operation: string, type: "start" | "end", value: string) => void;
  onStartOperation: (operation: string) => void;
  onEndOperation: (operation: string) => void;
  onSingleTimeOperation: (operation: string) => void;
}

export default function OperationCard({
  operation,
  operationData,
  isSingleTime,
  onTimeChange,
  onStartOperation,
  onEndOperation,
  onSingleTimeOperation,
}: OperationCardProps) {
  return (
    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 shadow-sm">
      <h4 className="font-medium text-gray-900 dark:text-white mb-3">
        {operation}
      </h4>
      
      {isSingleTime ? (
        // Single time input for punctual operations
        <>
          <div className="mb-3">
            <TimeInput
              label="Hora del Evento"
              value={operationData?.start || ""}
              onChange={(value) => onTimeChange(operation, "start", value)}
              size="lg"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {operationData?.start ? (
                <span className="text-green-600 dark:text-green-400">
                  ✓ Registrado: {operationData?.start}
                </span>
              ) : (
                "Pendiente de registro"
              )}
            </div>
            <button
              className={`py-2 px-4 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                operationData?.start
                  ? "bg-gray-100 text-gray-500 dark:bg-gray-600 dark:text-gray-400 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 dark:focus:ring-offset-gray-800"
              }`}
              onClick={() => onSingleTimeOperation(operation)}
              disabled={!!operationData?.start}
            >
              {operationData?.start ? "Registrado" : "Registrar Ahora"}
            </button>
          </div>
        </>
      ) : (
        // Dual time inputs for duration-based operations
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
            <TimeInput
              label="Inicio"
              value={operationData?.start || ""}
              onChange={(value) => onTimeChange(operation, "start", value)}
              size="lg"
            />
            <TimeInput
              label="Fin"
              value={operationData?.end || ""}
              onChange={(value) => onTimeChange(operation, "end", value)}
              size="lg"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Duración: {calculateDuration(
                operationData?.start || "",
                operationData?.end || ""
              )}
            </div>
            <div className="flex space-x-2">
              <button
                className={`py-2 px-4 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  operationData?.start
                    ? "bg-gray-100 text-gray-500 dark:bg-gray-600 dark:text-gray-400 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 dark:focus:ring-offset-gray-800"
                }`}
                onClick={() => onStartOperation(operation)}
                disabled={!!operationData?.start}
              >
                Iniciar
              </button>
              <button
                className={`py-2 px-4 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  !operationData?.start || operationData?.end
                    ? "bg-gray-100 text-gray-500 dark:bg-gray-600 dark:text-gray-400 cursor-not-allowed"
                    : "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500 dark:focus:ring-offset-gray-800"
                }`}
                onClick={() => onEndOperation(operation)}
                disabled={!operationData?.start || !!operationData?.end}
              >
                Finalizar
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
