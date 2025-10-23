import React from "react";
import { useFlightOperations } from "../hooks/useFlightOperations";
import { 
  OperationsList, 
  OperationTable, 
  NotesSection, 
  ActionButtons 
} from "./operations";
import AutoSaveIndicator from "./AutoSaveIndicator";
import TPTTimer from "./TPTTimer";
import type { FlightOperationsProps } from "../types/operations";

export default function FlightOperations({
  flight,
  onComplete,
  onBack,
}: FlightOperationsProps) {
  const {
    operations,
    notes,
    setNotes,
    saveStatus,
    isSingleTimeOperation,
    handleStartOperation,
    handleEndOperation,
    handleSingleTimeOperation,
    handleTimeChange,
    createCompletedFlight,
  } = useFlightOperations(flight);

  const handleCompleteOperations = () => {
    const updatedFlight = createCompletedFlight();
    onComplete(updatedFlight);
  };

  // Extraer tiempos reales de las operaciones
  const getActualArrivalTime = () => {
    const arriboOperation = operations["Arribo Real (ON/IN)"];
    // TPT debe comenzar cuando el arribo real FINALIZA (end), no cuando inicia (start)
    // Esto representa cuando el avión está completamente en tierra y listo para operaciones
    return arriboOperation?.end || undefined;
  };

  const getActualDepartureTime = () => {
    const empujeOperation = operations["Empuje"];
    return empujeOperation?.start || undefined;
  };

  // Verificar si el empuje ha sido registrado para habilitar el botón de reporte
  const isPushbackRegistered = () => {
    const empujeOperation = operations["Empuje"];
    return !!(empujeOperation?.start);
  };

  return (
    <>
      {/* Subtle auto-save confirmation - only show when saved */}
      <AutoSaveIndicator 
        isVisible={saveStatus === 'saved'} 
        message="Guardado"
        type="saved"
      />
      
      {/* TPT Timer - Solo mostrar si hay ETA y ETD */}
      {flight.eta && flight.etd && (
        <div className="mb-6">
          <TPTTimer 
            flight={flight}
            actualArrivalTime={getActualArrivalTime()}
            actualDepartureTime={getActualDepartureTime()}
          />
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Operaciones de Vuelo
            </h3>
            
            {/* Subtle status indicator in header - only when actively saving */}
            {saveStatus === 'saving' && (
              <div className="flex items-center space-x-1 text-xs text-gray-400 dark:text-gray-500">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <span>Guardando...</span>
              </div>
            )}
          </div>

        {/* Vista móvil: Lista de tarjetas */}
        <OperationsList
          operations={operations}
          isSingleTimeOperation={isSingleTimeOperation}
          onTimeChange={handleTimeChange}
          onStartOperation={handleStartOperation}
          onEndOperation={handleEndOperation}
          onSingleTimeOperation={handleSingleTimeOperation}
        />

        {/* Vista desktop: Tabla */}
        <OperationTable
          operations={operations}
          isSingleTimeOperation={isSingleTimeOperation}
          onTimeChange={handleTimeChange}
          onStartOperation={handleStartOperation}
          onEndOperation={handleEndOperation}
          onSingleTimeOperation={handleSingleTimeOperation}
        />
      </div>

      {/* Notas */}
      <NotesSection
        notes={notes}
        onNotesChange={setNotes}
      />

      {/* Botones de acción */}
      <ActionButtons
        onBack={onBack}
        onComplete={handleCompleteOperations}
        isPushbackRegistered={isPushbackRegistered()}
      />
    </div>
    </>
  );
}
