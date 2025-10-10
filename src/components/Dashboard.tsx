import React, { useState } from "react";
import FlightCard from "./FlightCard";
import type { Flight } from "./FlightCard";
import FlightOperations from "./FlightOperations";
import Report from "./Report";
import ThemeToggle from "./ThemeToggle";
import FlightForm from "./FlightForm";
import { DeleteConfirmationModal, SwitchFlightModal } from "./ConfirmationModals";
import { useFlightData } from "../hooks/useFlightData";

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

  // If there's an active flight, show the operations view
  if (activeFlight) {
    return (
      <FlightOperations
        flight={activeFlight}
        onBack={() => setActiveFlightId(null)}
        onComplete={handleFlightOperationsComplete}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          {/* Mobile Header */}
          <div className="flex flex-col space-y-3 py-4 sm:hidden">
            {/* Top row: Logo and title */}
            <div className="flex items-center justify-center">
              <div className="logo-container">
                <img 
                  src="/Panel OPS.webp" 
                  alt="Panel Operaciones Aéreas Logo" 
                  className="app-logo app-logo-md"
                />
                <h1 className="text-lg font-bold text-gray-900 dark:text-white text-center">
                  Panel de Operaciones Aéreas
                </h1>
              </div>
            </div>
            
            {/* Bottom row: Theme toggle and add button */}
            <div className="flex items-center justify-between">
              <div className="flex-1"></div>
              <div className="flex items-center space-x-3">
                <ThemeToggle />
                <button
                  onClick={() => setShowFlightForm(true)}
                  className="inline-flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors font-medium text-sm"
                >
                  <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Nuevo Vuelo
                </button>
              </div>
              <div className="flex-1"></div>
            </div>
          </div>

          {/* Desktop Header */}
          <div className="hidden sm:flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="logo-container">
                <img 
                  src="/Panel OPS.webp" 
                  alt="Panel Operaciones Aéreas Logo" 
                  className="app-logo app-logo-lg"
                />
                <h1 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">
                  Panel de Operaciones Aéreas
                </h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <button
                onClick={() => setShowFlightForm(true)}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors font-medium"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Nuevo Vuelo
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Pending Flights */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="p-4 sm:p-6">
              <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 pb-2 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white flex items-center">
                <span className="mr-2">Pendientes</span>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100 rounded-full text-sm">
                  {pendingFlights.filter(f => f.status === 'pending').length}
                </span>
              </h2>
              <div className="space-y-3 sm:space-y-4 max-h-[50vh] sm:max-h-[60vh] overflow-y-auto pr-1 sm:pr-2">
                {pendingFlights.filter(f => f.status === 'pending').map((flight) => (
                  <FlightCard
                    key={flight.id}
                    flight={flight}
                    onClick={() => handleActivateFlight(flight.id)}
                    onDelete={() => confirmDeleteFlight(flight.id, 'pending')}
                  />
                ))}
                {pendingFlights.filter(f => f.status === 'pending').length === 0 && (
                  <div className="text-center py-8">
                    <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <p className="text-gray-500 dark:text-gray-400 text-center italic">
                      No hay vuelos pendientes
                    </p>
                    <button
                      onClick={() => setShowFlightForm(true)}
                      className="mt-3 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
                    >
                      Agregar primer vuelo
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* In Progress Flights */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="p-4 sm:p-6">
              <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 pb-2 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white flex items-center">
                <span className="mr-2">En Progreso</span>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 rounded-full text-sm">
                  {pendingFlights.filter(f => f.status === 'in-progress').length}
                </span>
              </h2>
              <div className="space-y-3 sm:space-y-4 max-h-[50vh] sm:max-h-[60vh] overflow-y-auto pr-1 sm:pr-2">
                {pendingFlights.filter(f => f.status === 'in-progress').map((flight) => (
                  <FlightCard
                    key={flight.id}
                    flight={flight}
                    onClick={() => setActiveFlightId(flight.id)}
                    onDelete={() => confirmDeleteFlight(flight.id, 'pending')}
                  />
                ))}
                {pendingFlights.filter(f => f.status === 'in-progress').length === 0 && (
                  <div className="text-center py-8">
                    <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <p className="text-gray-500 dark:text-gray-400 text-center italic">
                      No hay vuelos en progreso
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Completed Flights */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="p-4 sm:p-6">
              <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 pb-2 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white flex items-center">
                <span className="mr-2">Completados</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 rounded-full text-sm">
                  {completedFlights.length}
                </span>
              </h2>
              <div className="space-y-3 sm:space-y-4 max-h-[50vh] sm:max-h-[60vh] overflow-y-auto pr-1 sm:pr-2">
                {completedFlights.map((flight) => (
                  <FlightCard
                    key={flight.id}
                    flight={flight}
                    onDelete={() => confirmDeleteFlight(flight.id, 'completed')}
                    onViewReport={() => handleViewReport(flight)}
                  />
                ))}
                {completedFlights.length === 0 && (
                  <div className="text-center py-8">
                    <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-gray-500 dark:text-gray-400 text-center italic">
                      No hay vuelos completados
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Flight Form Modal */}
      {showFlightForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <FlightForm
              onSubmit={handleAddFlight}
              onCancel={() => setShowFlightForm(false)}
            />
          </div>
        </div>
      )}

      {/* Report Modal */}
      {showReport && reportFlight && (
        <Report flight={reportFlight} onClose={handleCloseReport} />
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