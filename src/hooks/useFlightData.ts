import { useState, useEffect } from 'react';
import type { Flight } from '../components/FlightCard';

interface UseFlightDataReturn {
  pendingFlights: Flight[];
  completedFlights: Flight[];
  activeFlightId: string | null;
  addFlight: (flight: Omit<Flight, 'id' | 'status'>) => void;
  deleteFlight: (flightId: string, type: 'pending' | 'completed') => void;
  setActiveFlightId: (id: string | null) => void;
  updateFlight: (updatedFlight: Flight) => void;
  completeFlightOperation: (updatedFlight: Flight) => void;
  setPendingFlights: React.Dispatch<React.SetStateAction<Flight[]>>;
  setCompletedFlights: React.Dispatch<React.SetStateAction<Flight[]>>;
  activeFlight: Flight | undefined;
}

export function useFlightData(): UseFlightDataReturn {
  const [pendingFlights, setPendingFlights] = useState<Flight[]>([]);
  const [activeFlightId, setActiveFlightIdState] = useState<string | null>(null);
  const [completedFlights, setCompletedFlights] = useState<Flight[]>([]);

  // Load saved data from localStorage on mount
  useEffect(() => {
    try {
      const savedPendingFlights = localStorage.getItem('pendingFlights');
      const savedCompletedFlights = localStorage.getItem('completedFlights');

      if (savedPendingFlights) {
        setPendingFlights(JSON.parse(savedPendingFlights));
      }

      if (savedCompletedFlights) {
        setCompletedFlights(JSON.parse(savedCompletedFlights));
      }
    } catch (error) {
      console.error('Error loading data from localStorage', error);
    }
  }, []);

  // Save data to localStorage whenever state changes
  useEffect(() => {
    try {
      localStorage.setItem('pendingFlights', JSON.stringify(pendingFlights));
      localStorage.setItem('completedFlights', JSON.stringify(completedFlights));
    } catch (error) {
      console.error('Error saving data to localStorage', error);
    }
  }, [pendingFlights, completedFlights]);

  // Get active flight
  const activeFlight = [...pendingFlights, ...completedFlights].find(
    (flight) => flight.id === activeFlightId
  );

  const addFlight = (flightData: Omit<Flight, 'id' | 'status'>) => {
    const newFlight: Flight = {
      ...flightData,
      id: Date.now().toString(),
      status: 'pending'
    };

    setPendingFlights(prev => [newFlight, ...prev]);
  };

  const deleteFlight = (flightId: string, type: 'pending' | 'completed') => {
    if (type === 'pending') {
      // If the flight being deleted is active, clear the active flight ID
      if (flightId === activeFlightId) {
        setActiveFlightIdState(null);
      }
      
      // Remove the flight from pending list
      setPendingFlights(prev => prev.filter(flight => flight.id !== flightId));
    } else {
      // Remove from completed flights
      setCompletedFlights(prev => prev.filter(flight => flight.id !== flightId));
    }
  };

  const setActiveFlightId = (id: string | null) => {
    setActiveFlightIdState(id);
  };

  const updateFlight = (updatedFlight: Flight) => {
    if (updatedFlight.status === 'pending') {
      setPendingFlights(prev =>
        prev.map(flight =>
          flight.id === updatedFlight.id ? updatedFlight : flight
        )
      );
    } else if (updatedFlight.status === 'completed') {
      setCompletedFlights(prev =>
        prev.map(flight =>
          flight.id === updatedFlight.id ? updatedFlight : flight
        )
      );
    }
  };

  const completeFlightOperation = (updatedFlight: Flight) => {
    // Mark flight as completed and move to completed flights
    const completedFlight = { ...updatedFlight, status: 'completed' as const };
    
    setCompletedFlights(prev => {
      const newCompleted = [
        completedFlight,
        ...prev
      ].slice(0, 10); // Keep only last 10
      return newCompleted;
    });

    // Remove from pending
    setPendingFlights(prev =>
      prev.filter(flight => flight.id !== updatedFlight.id)
    );

    // Clear active flight
    setActiveFlightIdState(null);
  };

  return {
    pendingFlights,
    completedFlights,
    activeFlightId,
    addFlight,
    deleteFlight,
    setActiveFlightId,
    updateFlight,
    completeFlightOperation,
    setPendingFlights,
    setCompletedFlights,
    activeFlight
  };
}
