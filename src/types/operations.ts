// Types and constants for flight operations

export interface OperationRecord {
  start: string;
  end: string;
}

export type OperationsData = Record<string, OperationRecord>;

export interface FlightOperationsProps {
  flight: import('../components/FlightCard').Flight;
  onComplete: (updatedFlight: import('../components/FlightCard').Flight) => void;
  onBack: () => void;
}

// List of operations to track
export const OPERATIONS = [
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
] as const;

// Operations that are single-time events (punctual)
export const SINGLE_TIME_OPERATIONS = [
  "Cierre de Puertas",
  "Empuje", 
  "Despegue"
] as const;

export type OperationType = typeof OPERATIONS[number];
export type SingleTimeOperationType = typeof SINGLE_TIME_OPERATIONS[number];
