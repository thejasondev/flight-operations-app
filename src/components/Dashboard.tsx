import React, { useState, useEffect, Suspense } from "react";
import type { Flight } from "./FlightCard";
const FlightOperations = React.lazy(() => import("./FlightOperations"));
const Report = React.lazy(() => import("./Report"));
const FlightForm = React.lazy(() => import("./FlightForm"));
import DashboardHeader from "./DashboardHeader";
import DashboardMainContent from "./DashboardMainContent";
import { DeleteConfirmationModal, SwitchFlightModal } from "./ConfirmationModals";
import { useFlightData } from "../hooks/useFlightData";
import { initPerformanceOptimizations } from "../utils/performance";
import "../styles/liquidGlass.css";

export default function Dashboard() {
  // Use custom hook for flight data management
  const {
    pendingFlights,
    completedFlights,
    activeFlightId,
    activeFlight,
    addFlight,
    deleteFlight,
    setActiveFlightId,
    updateFlight,
    completeFlightOperation,
    setPendingFlights
  } = useFlightData();

  // Initialize performance optimizations once on mount
  useEffect(() => {
    initPerformanceOptimizations();
  }, []);

  // State for UI modals and forms
  const [showFlightForm, setShowFlightForm] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [reportFlight, setReportFlight] = useState<Flight | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [flightToDelete, setFlightToDelete] = useState<{id: string, type: 'pending' | 'completed'} | null>(null);
  const [showSwitchModal, setShowSwitchModal] = useState(false);
  const [flightToSwitch, setFlightToSwitch] = useState<string | null>(null);

  // Handle adding a new flight
  const handleAddFlight = (flightData: Omit<Flight, 'id' | 'status'>) => {
    addFlight(flightData);
    setShowFlightForm(false);
  };

  // Move a flight to "in-progress" status
  const handleActivateFlight = (flightId: string) => {
    // Check if there's already a flight in progress
    if (activeFlightId && activeFlightId !== flightId) {
      setFlightToSwitch(flightId);
      setShowSwitchModal(true);
      return;
    }

    // Set the flight as active
    setActiveFlightId(flightId);
    
    // Update the flight status to in-progress
    setPendingFlights(prev =>
      prev.map(flight =>
        flight.id === flightId
          ? { ...flight, status: 'in-progress' as const }
          : flight
      )
    );
  };

  // Handle flight operations completion
  const handleFlightOperationsComplete = (updatedFlight: Flight) => {
    completeFlightOperation(updatedFlight);
    setReportFlight(updatedFlight);
    setShowReport(true);
  };

  // Close the report modal
  const handleCloseReport = () => {
    setShowReport(false);
    setReportFlight(null);
  };

  // Show report for completed flight
  const handleViewReport = (flight: Flight) => {
    setReportFlight(flight);
    setShowReport(true);
  };

  // Show delete confirmation modal
  const confirmDeleteFlight = (flightId: string, type: 'pending' | 'completed') => {
    setFlightToDelete({ id: flightId, type });
    setShowDeleteModal(true);
  };

  // Cancel delete operation
  const cancelDelete = () => {
    setShowDeleteModal(false);
    setFlightToDelete(null);
  };

  // Confirm and execute delete operation
  const confirmDelete = () => {
    if (!flightToDelete) return;
    deleteFlight(flightToDelete.id, flightToDelete.type);
    setShowDeleteModal(false);
    setFlightToDelete(null);
  };

  // Confirm flight switch
  const confirmFlightSwitch = () => {
    if (!flightToSwitch) return;

    // Reset current active flight to pending
    if (activeFlightId) {
      setPendingFlights(prev =>
        prev.map(flight =>
          flight.id === activeFlightId
            ? { ...flight, status: 'pending' as const }
            : flight
        )
      );
    }

    // Set new flight as active
    setActiveFlightId(flightToSwitch);
    setPendingFlights(prev =>
      prev.map(flight =>
        flight.id === flightToSwitch
          ? { ...flight, status: 'in-progress' as const }
          : flight
      )
    );

    setShowSwitchModal(false);
    setFlightToSwitch(null);
  };

  // Cancel flight switch
  const cancelFlightSwitch = () => {
    setShowSwitchModal(false);
    setFlightToSwitch(null);
  };

  // Get flight details for modals
  const flightToDeleteDetails = flightToDelete 
    ? flightToDelete.type === 'pending'
      ? pendingFlights.find(f => f.id === flightToDelete.id)
      : completedFlights.find(f => f.id === flightToDelete.id)
    : null;

  const currentActiveFlight = activeFlightId 
    ? pendingFlights.find(f => f.id === activeFlightId)
    : null;

  const newFlightToSwitch = flightToSwitch 
    ? pendingFlights.find(f => f.id === flightToSwitch)
    : null;

  const pendingCount = pendingFlights.filter(f => f.status === 'pending').length;
  const inProgressCount = pendingFlights.filter(f => f.status === 'in-progress').length;
  const completedCount = completedFlights.length;

  // If there's an active flight, show the operations view
  if (activeFlight) {
    return (
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-[50vh] text-gray-500 dark:text-gray-400">
            Cargando operaciones de vuelo...
          </div>
        }
      >
        <FlightOperations
          flight={activeFlight}
          onBack={() => setActiveFlightId(null)}
          onComplete={handleFlightOperationsComplete}
        />
      </Suspense>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Header */}
      <DashboardHeader
        pendingCount={pendingCount}
        inProgressCount={inProgressCount}
        completedCount={completedCount}
        onNewFlight={() => setShowFlightForm(true)}
      />

      {/* Main Content */}
      {/* Pending Flights */}
      {/* In Progress Flights */}
      {/* Completed Flights */}
      <DashboardMainContent
        pendingFlights={pendingFlights}
        completedFlights={completedFlights}
        onActivateFlight={handleActivateFlight}
        onSetActiveFlight={setActiveFlightId}
        onConfirmDelete={confirmDeleteFlight}
        onViewReport={handleViewReport}
        onNewFlight={() => setShowFlightForm(true)}
      />

      {/* Flight Form Modal */}
      {showFlightForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <Suspense
              fallback={
                <div className="flex items-center justify-center py-8 text-sm text-gray-500 dark:text-gray-400">
                  Cargando formulario de vuelo...
                </div>
              }
            >
              <FlightForm
                onSubmit={handleAddFlight}
                onCancel={() => setShowFlightForm(false)}
              />
            </Suspense>
          </div>
        </div>
      )}

      {/* Report Modal */}
      {showReport && reportFlight && (
        <Suspense
          fallback={
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 text-sm text-gray-200">
              Cargando reporte...
            </div>
          }
        >
          <Report flight={reportFlight} onClose={handleCloseReport} />
        </Suspense>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        flight={flightToDeleteDetails || null}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />

      {/* Switch Flight Confirmation Modal */}
      <SwitchFlightModal
        isOpen={showSwitchModal}
        currentFlight={currentActiveFlight || null}
        newFlight={newFlightToSwitch || null}
        onConfirm={confirmFlightSwitch}
        onCancel={cancelFlightSwitch}
      />
    </div>
  );
}