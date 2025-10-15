import { useState, useEffect } from 'react';
import type { Flight } from '../components/FlightCard';

interface ReportState {
  flightId: string;
  operations: Record<string, { start: string; end: string }>;
  notes: string;
  lastUpdated: number;
}

interface UseReportPersistenceReturn {
  getReportState: (flightId: string) => ReportState | null;
  saveReportState: (flightId: string, operations: Record<string, { start: string; end: string }>, notes: string) => void;
  clearReportState: (flightId: string) => void;
  hasUnsavedChanges: (flightId: string, currentOperations: Record<string, { start: string; end: string }>, currentNotes: string) => boolean;
}

const STORAGE_KEY = 'flightReportStates';
const EXPIRY_TIME = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export function useReportPersistence(): UseReportPersistenceReturn {
  const [reportStates, setReportStates] = useState<Record<string, ReportState>>({});

  // Load saved report states from localStorage on mount
  useEffect(() => {
    try {
      const savedStates = localStorage.getItem(STORAGE_KEY);
      if (savedStates) {
        const parsedStates = JSON.parse(savedStates);
        const now = Date.now();
        
        // Filter out expired states
        const validStates: Record<string, ReportState> = {};
        Object.entries(parsedStates).forEach(([flightId, state]) => {
          const reportState = state as ReportState;
          if (now - reportState.lastUpdated < EXPIRY_TIME) {
            validStates[flightId] = reportState;
          }
        });
        
        setReportStates(validStates);
        
        // Save cleaned states back to localStorage
        localStorage.setItem(STORAGE_KEY, JSON.stringify(validStates));
      }
    } catch (error) {
      console.error('Error loading report states from localStorage:', error);
    }
  }, []);

  // Save report states to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(reportStates));
    } catch (error) {
      console.error('Error saving report states to localStorage:', error);
    }
  }, [reportStates]);

  const getReportState = (flightId: string): ReportState | null => {
    const state = reportStates[flightId];
    if (!state) return null;
    
    // Check if state is expired
    const now = Date.now();
    if (now - state.lastUpdated > EXPIRY_TIME) {
      clearReportState(flightId);
      return null;
    }
    
    return state;
  };

  const saveReportState = (
    flightId: string, 
    operations: Record<string, { start: string; end: string }>, 
    notes: string
  ) => {
    const newState: ReportState = {
      flightId,
      operations: { ...operations },
      notes,
      lastUpdated: Date.now()
    };

    setReportStates(prev => ({
      ...prev,
      [flightId]: newState
    }));
  };

  const clearReportState = (flightId: string) => {
    setReportStates(prev => {
      const newStates = { ...prev };
      delete newStates[flightId];
      return newStates;
    });
  };

  const hasUnsavedChanges = (
    flightId: string, 
    currentOperations: Record<string, { start: string; end: string }>, 
    currentNotes: string
  ): boolean => {
    const savedState = getReportState(flightId);
    if (!savedState) return false;

    // Compare operations
    const savedOpsKeys = Object.keys(savedState.operations);
    const currentOpsKeys = Object.keys(currentOperations);
    
    if (savedOpsKeys.length !== currentOpsKeys.length) return true;
    
    for (const key of savedOpsKeys) {
      const savedOp = savedState.operations[key];
      const currentOp = currentOperations[key];
      
      if (!currentOp || savedOp.start !== currentOp.start || savedOp.end !== currentOp.end) {
        return true;
      }
    }

    // Compare notes
    return savedState.notes !== currentNotes;
  };

  return {
    getReportState,
    saveReportState,
    clearReportState,
    hasUnsavedChanges
  };
}

// Hook to automatically save report state with debouncing
export function useAutoSaveReport(
  flightId: string | null,
  operations: Record<string, { start: string; end: string }>,
  notes: string,
  debounceMs: number = 1000
) {
  const { saveReportState } = useReportPersistence();
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [isInitialized, setIsInitialized] = useState(false);
  const [lastSavedData, setLastSavedData] = useState<string>('');
  
  // Mark as initialized after first render to avoid saving initial state
  useEffect(() => {
    const timer = setTimeout(() => setIsInitialized(true), 500);
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    if (!flightId || !isInitialized) return;
    
    // Create a hash of current data to compare with last saved
    const currentDataHash = JSON.stringify({ operations, notes });
    
    // Don't save if data hasn't changed
    if (currentDataHash === lastSavedData) {
      return;
    }
    
    // Check if there's actual data to save
    const hasOperationData = Object.keys(operations).some(key => 
      operations[key]?.start?.trim() || operations[key]?.end?.trim()
    );
    const hasNoteData = notes.trim().length > 0;
    const hasData = hasOperationData || hasNoteData;
    
    if (!hasData) {
      setSaveStatus('idle');
      return;
    }
    
    // Only show saving status if we're actually going to save
    setSaveStatus('saving');
    
    const timeoutId = setTimeout(() => {
      try {
        saveReportState(flightId, operations, notes);
        setLastSavedData(currentDataHash);
        setSaveStatus('saved');
        
        // Reset to idle after a shorter time
        setTimeout(() => setSaveStatus('idle'), 1000);
      } catch (error) {
        console.error('Error auto-saving report:', error);
        setSaveStatus('error');
        setTimeout(() => setSaveStatus('idle'), 2000);
      }
    }, debounceMs);

    return () => {
      clearTimeout(timeoutId);
      // Don't reset status on cleanup to avoid flickering
    };
  }, [flightId, operations, notes, debounceMs, saveReportState, isInitialized, lastSavedData]);

  return { saveStatus };
}
