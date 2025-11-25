import React from 'react';
import TimeInput from '../TimeInput';
import { calculateDuration } from '../../utils/timeUtils';
import type { OperationRecord } from '../../types/operations';

interface OperationCardProps {
  operation: string;
  operationData: OperationRecord;
  isSingleTime: boolean;
  onTimeChange: (operation: string, type: 'start' | 'end', value: string) => void;
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
  // Determine status and style
  const getStatus = () => {
    if (isSingleTime) {
      return operationData?.start ? 'completed' : 'pending';
    } else {
      if (operationData?.end) return 'completed';
      if (operationData?.start) return 'in-progress';
      return 'pending';
    }
  };

  const status = getStatus();

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
      className: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
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
      className: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
    },
    completed: {
      label: 'Registrado',
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
      className: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
    },
  };

  const currentStatus = statusConfig[status];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 shadow-sm hover:shadow-md transition-shadow">
      {/* Header: Operation Name + Status Chip */}
      <div className="flex items-start justify-between mb-3">
        <h4 className="font-semibold text-gray-900 dark:text-white text-base flex-1">
          {operation}
        </h4>
        <span
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${currentStatus.className} flex-shrink-0 ml-2`}
        >
          {currentStatus.icon}
          {currentStatus.label}
        </span>
      </div>

      {isSingleTime ? (
        // Single time input for punctual operations
        <>
          <div className="mb-3">
            <TimeInput
              label="Hora del Evento"
              value={operationData?.start || ''}
              onChange={(value) => onTimeChange(operation, 'start', value)}
              size="lg"
            />
          </div>

          {/* Action Button - Touch Friendly (min 44px) */}
          <button
            className={`w-full min-h-[44px] py-3 px-4 rounded-lg text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              operationData?.start
                ? 'bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 focus:ring-blue-500 shadow-sm hover:shadow dark:focus:ring-offset-gray-800'
            }`}
            onClick={() => onSingleTimeOperation(operation)}
            disabled={!!operationData?.start}
          >
            {operationData?.start ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Ya Registrado
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Registrar Ahora
              </span>
            )}
          </button>
        </>
      ) : (
        // Dual time inputs for duration-based operations
        <>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <TimeInput
              label="Inicio"
              value={operationData?.start || ''}
              onChange={(value) => onTimeChange(operation, 'start', value)}
              size="lg"
            />
            <TimeInput
              label="Fin"
              value={operationData?.end || ''}
              onChange={(value) => onTimeChange(operation, 'end', value)}
              size="lg"
            />
          </div>

          {/* Duration Display */}
          {(operationData?.start || operationData?.end) && (
            <div className="mb-3 flex items-center gap-2 text-sm">
              <svg
                className="w-4 h-4 text-gray-400 dark:text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="font-medium text-gray-700 dark:text-gray-300">Duración:</span>
              <span className="font-semibold text-blue-600 dark:text-blue-400">
                {calculateDuration(operationData?.start || '', operationData?.end || '')}
              </span>
            </div>
          )}

          {/* Action Buttons - Touch Friendly (min 44px) */}
          <div className="grid grid-cols-2 gap-2">
            <button
              className={`min-h-[44px] py-3 px-3 rounded-lg text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                operationData?.start
                  ? 'bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 focus:ring-blue-500 shadow-sm hover:shadow dark:focus:ring-offset-gray-800'
              }`}
              onClick={() => onStartOperation(operation)}
              disabled={!!operationData?.start}
            >
              <span className="flex items-center justify-center gap-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Iniciar
              </span>
            </button>
            <button
              className={`min-h-[44px] py-3 px-3 rounded-lg text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                !operationData?.start || operationData?.end
                  ? 'bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-500 cursor-not-allowed'
                  : 'bg-green-600 text-white hover:bg-green-700 active:bg-green-800 focus:ring-green-500 shadow-sm hover:shadow dark:focus:ring-offset-gray-800'
              }`}
              onClick={() => onEndOperation(operation)}
              disabled={!operationData?.start || !!operationData?.end}
            >
              <span className="flex items-center justify-center gap-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Finalizar
              </span>
            </button>
          </div>
        </>
      )}
    </div>
  );
}
