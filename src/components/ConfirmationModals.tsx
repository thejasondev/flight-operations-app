import React from 'react';
import type { Flight } from './FlightCard';
import BaseModal from './BaseModal';
import '../styles/liquidGlass.css';

interface DeleteModalProps {
  isOpen: boolean;
  flight: Flight | null;
  onConfirm: () => void;
  onCancel: () => void;
}

interface SwitchModalProps {
  isOpen: boolean;
  currentFlight: Flight | null;
  newFlight: Flight | null;
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeleteConfirmationModal({ isOpen, flight, onConfirm, onCancel }: DeleteModalProps) {
  if (!isOpen || !flight) return null;

  const icon = (
    <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900">
      <svg
        className="h-6 w-6 text-red-600 dark:text-red-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
        />
      </svg>
    </div>
  );

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onCancel}
      title="Confirmar Eliminación"
      icon={icon}
      size="md"
    >
      <div className="space-y-4">
        <p className="text-gray-600 dark:text-gray-300 text-center">
          ¿Está seguro que desea eliminar el vuelo <strong>{flight.flightNumber}</strong>?
        </p>

        <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            <span className="font-medium">Aerolínea:</span> {flight.airline}
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            <span className="font-medium">Destino:</span> {flight.destination}
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            <span className="font-medium">Estado:</span>{' '}
            {flight.status === 'pending'
              ? 'Pendiente'
              : flight.status === 'in-progress'
                ? 'En Progreso'
                : 'Completado'}
          </p>
        </div>

        <p className="text-sm text-red-600 dark:text-red-400 text-center font-medium">
          Esta acción no se puede deshacer.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-3 bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Eliminar
          </button>
        </div>
      </div>
    </BaseModal>
  );
}

export function SwitchFlightModal({
  isOpen,
  currentFlight,
  newFlight,
  onConfirm,
  onCancel,
}: SwitchModalProps) {
  if (!isOpen || !currentFlight || !newFlight) return null;

  const icon = (
    <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900">
      <svg
        className="h-6 w-6 text-blue-600 dark:text-blue-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
        />
      </svg>
    </div>
  );

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onCancel}
      title="Cambiar Vuelo en Progreso"
      icon={icon}
      size="lg"
    >
      <div className="space-y-4">
        <p className="text-gray-600 dark:text-gray-300 text-center">
          Ya hay un vuelo en progreso. ¿Desea cambiar al nuevo vuelo?
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
            <p className="font-medium text-xs text-gray-500 dark:text-gray-400 mb-2">
              VUELO ACTUAL
            </p>
            <p className="font-bold text-lg text-gray-900 dark:text-white mb-1">
              {currentFlight.flightNumber}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">{currentFlight.airline}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">{currentFlight.destination}</p>
          </div>

          <div className="flex-1 bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border-2 border-blue-300 dark:border-blue-700">
            <p className="font-medium text-xs text-blue-600 dark:text-blue-400 mb-2">NUEVO VUELO</p>
            <p className="font-bold text-lg text-gray-900 dark:text-white mb-1">
              {newFlight.flightNumber}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">{newFlight.airline}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">{newFlight.destination}</p>
          </div>
        </div>

        <div className="bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-700 rounded-lg p-3">
          <div className="flex">
            <svg
              className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mr-2 mt-0.5 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              El vuelo actual volverá al estado "Pendiente" y perderá el progreso de las
              operaciones.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-3 bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Cambiar Vuelo
          </button>
        </div>
      </div>
    </BaseModal>
  );
}
