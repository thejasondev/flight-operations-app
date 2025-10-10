import React from "react";
import { useFlightOperations } from "../hooks/useFlightOperations";
import { 
  OperationsList, 
  OperationTable, 
  NotesSection, 
  ActionButtons 
} from "./operations";
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

  return (
    <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Operaciones
        </h3>

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
      />
    </div>
  );
}
