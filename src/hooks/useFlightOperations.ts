import { useState, useEffect } from 'react';
import type { Flight } from '../components/FlightCard';
import { OPERATIONS, SINGLE_TIME_OPERATIONS, type OperationsData } from '../types/operations';
import { getCurrentTimeString } from '../utils/timeUtils';
import { useReportPersistence, useAutoSaveReport } from './useReportPersistence';

export const useFlightOperations = (flight: Flight) => {
  const [operations, setOperations] = useState<OperationsData>({});
  const [notes, setNotes] = useState("");
  const [isInitialized, setIsInitialized] = useState(false);
  const { getReportState, clearReportState } = useReportPersistence();

  // Auto-save report state with debouncing (reduced to 800ms)
  const { saveStatus } = useAutoSaveReport(flight.id, operations, notes, 800);

  // Initialize operations from saved state or flight data (only once per flight)
  useEffect(() => {
    // Prevent re-initialization if already initialized for this flight
    if (isInitialized) return;

    const initializeData = () => {
      // First priority: Check for saved report state
      const savedState = getReportState(flight.id);
      
      if (savedState) {
        console.log('Loading saved state for flight:', flight.id);
        setOperations(savedState.operations);
        setNotes(savedState.notes);
      } else if (flight.operations && Object.keys(flight.operations).length > 0) {
        // Second priority: Use existing flight operations if available
        console.log('Loading flight operations for flight:', flight.id);
        setOperations(flight.operations);
        setNotes(flight.notes || "");
      } else {
        // Last resort: Initialize with empty operations
        console.log('Initializing empty operations for flight:', flight.id);
        const initialOps: OperationsData = {};
        OPERATIONS.forEach((op) => {
          initialOps[op] = { start: "", end: "" };
        });
        setOperations(initialOps);
        setNotes(flight.notes || "");
      }
      
      setIsInitialized(true);
    };

    initializeData();
  }, [flight.id, getReportState]); // Only depend on flight.id, not the entire flight object

  // Reset initialization when flight changes
  useEffect(() => {
    setIsInitialized(false);
  }, [flight.id]);

  // Check if operation is a single-time event
  const isSingleTimeOperation = (operation: string): boolean => {
    return SINGLE_TIME_OPERATIONS.includes(operation as any);
  };

  // Handle starting an operation
  const handleStartOperation = (operation: string) => {
    const timeString = getCurrentTimeString();

    setOperations((prev) => ({
      ...prev,
      [operation]: {
        ...prev[operation],
        start: timeString,
      },
    }));
  };

  // Handle ending an operation
  const handleEndOperation = (operation: string) => {
    const timeString = getCurrentTimeString();

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
    const timeString = getCurrentTimeString();

    setOperations((prev) => ({
      ...prev,
      [operation]: {
        start: timeString,
        end: timeString, // Same time for both start and end
      },
    }));
  };

  // Handle manual time changes
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

  // Create updated flight object for completion
  const createCompletedFlight = (): Flight => {
    // Clear saved report state when completing the flight
    clearReportState(flight.id);
    
    // Extract ATA and ATD from operations
    const arriboOperation = operations["Arribo Real (ON/IN)"];
    const empujeOperation = operations["Empuje"];
    
    const ata = arriboOperation?.start || undefined;
    const atd = empujeOperation?.start || undefined;
    
    return {
      ...flight,
      operations,
      notes,
      ata,
      atd,
      status: "completed",
    };
  };

  return {
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
  };
};
