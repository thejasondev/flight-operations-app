import { useState, useEffect } from 'react';
import type { Flight } from '../components/FlightCard';
import { OPERATIONS, SINGLE_TIME_OPERATIONS, type OperationsData } from '../types/operations';
import { getCurrentTimeString } from '../utils/timeUtils';

export const useFlightOperations = (flight: Flight) => {
  const [operations, setOperations] = useState<OperationsData>({});
  const [notes, setNotes] = useState(flight.notes || "");

  // Initialize operations from flight if they exist
  useEffect(() => {
    if (flight.operations) {
      setOperations(flight.operations);
    } else {
      // Initialize with empty operations
      const initialOps: OperationsData = {};
      OPERATIONS.forEach((op) => {
        initialOps[op] = { start: "", end: "" };
      });
      setOperations(initialOps);
    }
  }, [flight]);

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
    return {
      ...flight,
      operations,
      notes,
      status: "completed",
    };
  };

  return {
    operations,
    notes,
    setNotes,
    isSingleTimeOperation,
    handleStartOperation,
    handleEndOperation,
    handleSingleTimeOperation,
    handleTimeChange,
    createCompletedFlight,
  };
};
