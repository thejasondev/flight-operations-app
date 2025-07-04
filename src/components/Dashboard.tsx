import React, { useState, useEffect } from "react";
import FlightCard from "./FlightCard";
import type { Flight } from "./FlightCard";
import FlightOperations from "./FlightOperations";
import Report from "./Report";
import ThemeToggle from "./ThemeToggle";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { es } from "date-fns/locale/es";

export default function Dashboard() {
  // State for flights in different stages
  const [pendingFlights, setPendingFlights] = useState<Flight[]>([]);
  const [activeFlightId, setActiveFlightId] = useState<string | null>(null);
  const [completedFlights, setCompletedFlights] = useState<Flight[]>([]);

  // State for form
  const [formData, setFormData] = useState({
    flightNumber: "",
    airline: "",
    destination: "",
    eta: "",
    etd: "",
  });

  // State for datepicker
  const [flightDate, setFlightDate] = useState<Date | null>(null);
  const [etaTime, setEtaTime] = useState<Date | null>(null);
  const [etdTime, setEtdTime] = useState<Date | null>(null);

  // State for report modal
  const [showReport, setShowReport] = useState(false);
  const [reportFlight, setReportFlight] = useState<Flight | null>(null);

  // State for delete confirmation modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [flightToDelete, setFlightToDelete] = useState<{id: string, type: 'pending' | 'completed'} | null>(null);

  // State for flight switch confirmation modal
  const [showSwitchModal, setShowSwitchModal] = useState(false);
  const [flightToSwitch, setFlightToSwitch] = useState<string | null>(null);

  // Load saved data from localStorage on mount
  useEffect(() => {
    try {
      const savedPendingFlights = localStorage.getItem("pendingFlights");
      const savedCompletedFlights = localStorage.getItem("completedFlights");
      const savedActiveFlightId = localStorage.getItem("activeFlightId");

      if (savedPendingFlights) {
        setPendingFlights(JSON.parse(savedPendingFlights));
      }

      if (savedCompletedFlights) {
        setCompletedFlights(JSON.parse(savedCompletedFlights));
      }

      if (savedActiveFlightId) {
        setActiveFlightId(savedActiveFlightId);
      }
    } catch (error) {
      console.error("Error loading data from localStorage", error);
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem("pendingFlights", JSON.stringify(pendingFlights));
      localStorage.setItem(
        "completedFlights",
        JSON.stringify(completedFlights)
      );

      if (activeFlightId) {
        localStorage.setItem("activeFlightId", activeFlightId);
      } else {
        localStorage.removeItem("activeFlightId");
      }
    } catch (error) {
      console.error("Error saving data to localStorage", error);
    }
  }, [pendingFlights, completedFlights, activeFlightId]);

  // Get active flight
  const activeFlight = [...pendingFlights, ...completedFlights].find(
    (flight) => flight.id === activeFlightId
  );

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Add a new flight
  const handleAddFlight = (e: React.FormEvent) => {
    e.preventDefault();

    if (!flightDate || !etaTime || !etdTime) {
      alert("Por favor complete todos los campos de fecha y hora");
      return;
    }

    // Format the time as HH:MM
    const eta = format(etaTime, "HH:mm");
    const etd = format(etdTime, "HH:mm");
    const flightDateStr = format(flightDate, "dd/MM/yyyy");

    const newFlight: Flight = {
      id: Date.now().toString(),
      flightNumber: formData.flightNumber.toUpperCase(),
      airline: formData.airline,
      destination: formData.destination.toUpperCase(),
      date: flightDateStr,
      eta: eta,
      etd: etd,
      status: "pending",
    };

    setPendingFlights((prev) => [...prev, newFlight]);

    // Reset form
    setFormData({
      flightNumber: "",
      airline: "",
      destination: "",
      eta: "",
      etd: "",
    });
    
    // Reset date and time pickers
    setFlightDate(null);
    setEtaTime(null);
    setEtdTime(null);
  };

  // Move a flight to "in-progress" status
  const handleActivateFlight = (flightId: string) => {
    // Check if there's already a flight in progress
    const existingInProgress = pendingFlights.find(
      (f) => f.status === "in-progress"
    );

    if (existingInProgress && existingInProgress.id !== flightId) {
      // Show modal confirmation instead of native alert
      setFlightToSwitch(flightId);
      setShowSwitchModal(true);
      return;
    }

    // If no existing flight in progress or user confirmed, activate the flight
    activateFlightDirectly(flightId);
  };

  // Activate a flight directly (used after confirmation or when no flight is in progress)
  const activateFlightDirectly = (flightId: string) => {
    setActiveFlightId(flightId);

    // Update the flight status
    setPendingFlights((prev) =>
      prev.map((flight) =>
        flight.id === flightId
          ? { ...flight, status: "in-progress" as const }
          : flight.status === "in-progress"
            ? { ...flight, status: "pending" as const }
            : flight
      )
    );
  };

  // Cancel flight switch
  const cancelSwitchFlight = () => {
    setShowSwitchModal(false);
    setFlightToSwitch(null);
  };

  // Confirm flight switch
  const confirmSwitchFlight = () => {
    if (flightToSwitch) {
      activateFlightDirectly(flightToSwitch);
      setShowSwitchModal(false);
      setFlightToSwitch(null);
    }
  };

  // Complete a flight and generate report
  const handleCompleteFlight = (updatedFlight: Flight) => {
    setReportFlight(updatedFlight);
    setShowReport(true);

    // Move to completed flights
    setCompletedFlights((prev) => {
      const newCompleted = [
        { ...updatedFlight, status: "completed" as const },
        ...prev
      ].slice(0, 10); // Keep only last 10
      return newCompleted;
    });

    // Remove from pending
    setPendingFlights((prev) =>
      prev.filter((flight) => flight.id !== updatedFlight.id)
    );

    // Clear active flight
    setActiveFlightId(null);
  };

  // Close the report modal
  const handleCloseReport = () => {
    setShowReport(false);
    setReportFlight(null);
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

    if (flightToDelete.type === 'pending') {
      // If the flight being deleted is active, clear the active flight ID
      if (flightToDelete.id === activeFlightId) {
        setActiveFlightId(null);
      }
      
      // Remove the flight from pending list
      setPendingFlights((prev) => 
        prev.filter((flight) => flight.id !== flightToDelete.id)
      );
    } else {
      // Remove from completed flights
      setCompletedFlights((prev) => 
        prev.filter((flight) => flight.id !== flightToDelete.id)
      );
    }

    // Close the modal
    setShowDeleteModal(false);
    setFlightToDelete(null);
  };

  // Get the in-progress flight (only one can be in progress)
  const inProgressFlight = pendingFlights.find(f => f.status === "in-progress");

  // Get flight details for the delete confirmation modal
  const flightToDeleteDetails = flightToDelete 
    ? flightToDelete.type === 'pending'
      ? pendingFlights.find(f => f.id === flightToDelete.id)
      : completedFlights.find(f => f.id === flightToDelete.id)
    : null;

  // Get flight details for the switch confirmation modal
  const flightToSwitchDetails = flightToSwitch 
    ? pendingFlights.find(f => f.id === flightToSwitch)
    : null;

  const inProgressFlightDetails = inProgressFlight;

  // Custom styles for the date picker
  const datePickerCustomStyles = {
    datePickerContainer: "relative",
    datePickerInput: "w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white",
  };

  return (
    <div>
      <header className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Panel de Operaciones Aéreas
        </h1>
        <div className="flex items-center space-x-2">
          <ThemeToggle />
        </div>
      </header>

      {!activeFlight ? (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Flight Add Form */}
            <div className="lg:col-span-1 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                Agregar Vuelo
              </h2>

              <form onSubmit={handleAddFlight}>
                <div className="mb-4">
                  <label htmlFor="airline" className="block text-gray-700 dark:text-gray-300 mb-1">
                    Aerolínea
                  </label>
                  <input
                    type="text"
                    id="airline"
                    name="airline"
                    value={formData.airline}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Ej: American Airlines"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="flightNumber"
                    className="block text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Número de Vuelo
                  </label>
                  <input
                    type="text"
                    id="flightNumber"
                    name="flightNumber"
                    value={formData.flightNumber}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Ej: 123/124"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="destination"
                    className="block text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Destino
                  </label>
                  <input
                    type="text"
                    id="destination"
                    name="destination"
                    value={formData.destination}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Ej: MIA/VRA"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="flightDate"
                    className="block text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Fecha del Vuelo
                  </label>
                  <div className={datePickerCustomStyles.datePickerContainer}>
                    <DatePicker
                      id="flightDate"
                      selected={flightDate}
                      onChange={(date: Date | null) => setFlightDate(date)}
                      className={datePickerCustomStyles.datePickerInput}
                      dateFormat="dd/MM/yyyy"
                      locale={es}
                      placeholderText="Seleccionar fecha"
                      required
                      calendarClassName="bg-white dark:bg-gray-800 shadow-xl border border-gray-200 dark:border-gray-700 rounded-lg"
                      showPopperArrow={false}
                      popperClassName="datepicker-popper"
                      wrapperClassName="datepicker-wrapper w-full"
                      minDate={new Date()}
                      isClearable
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="eta" className="block text-gray-700 dark:text-gray-300 mb-1">
                    ETA (Hora Estimada de Arribo)
                  </label>
                  <div className={datePickerCustomStyles.datePickerContainer}>
                    <DatePicker
                      id="eta"
                      selected={etaTime}
                      onChange={(time: Date | null) => setEtaTime(time)}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={15}
                      timeCaption="Hora"
                      dateFormat="HH:mm"
                      locale={es}
                      className={datePickerCustomStyles.datePickerInput}
                      placeholderText="Seleccionar hora"
                      required
                      calendarClassName="bg-white dark:bg-gray-800 shadow-xl border border-gray-200 dark:border-gray-700 rounded-lg"
                      showPopperArrow={false}
                      popperClassName="timepicker-popper"
                      wrapperClassName="datepicker-wrapper w-full"
                      isClearable
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="etd" className="block text-gray-700 dark:text-gray-300 mb-1">
                    ETD (Hora Estimada de Salida)
                  </label>
                  <div className={datePickerCustomStyles.datePickerContainer}>
                    <DatePicker
                      id="etd"
                      selected={etdTime}
                      onChange={(time: Date | null) => setEtdTime(time)}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={15}
                      timeCaption="Hora"
                      dateFormat="HH:mm"
                      locale={es}
                      className={datePickerCustomStyles.datePickerInput}
                      placeholderText="Seleccionar hora"
                      required
                      calendarClassName="bg-white dark:bg-gray-800 shadow-xl border border-gray-200 dark:border-gray-700 rounded-lg"
                      showPopperArrow={false}
                      popperClassName="timepicker-popper"
                      wrapperClassName="datepicker-wrapper w-full"
                      isClearable
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Agregar Vuelo
                </button>
              </form>
            </div>

            {/* Flight Status Columns */}
            <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Pending Flights */}
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white flex items-center">
                  <span className="mr-2">Pendientes</span>
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100 rounded-full text-sm">
                    {pendingFlights.filter((f) => f.status === 'pending').length}
                  </span>
                </h2>
                <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                  {pendingFlights
                    .filter((f) => f.status === 'pending')
                    .map((flight) => (
                      <FlightCard
                        key={flight.id}
                        flight={flight}
                        onClick={() => handleActivateFlight(flight.id)}
                        onDelete={() => confirmDeleteFlight(flight.id, 'pending')}
                      />
                    ))}
                  {pendingFlights.filter((f) => f.status === 'pending').length === 0 && (
                    <p className="text-gray-500 dark:text-gray-400 text-center italic py-4">
                      No hay vuelos pendientes
                    </p>
                  )}
                </div>
              </div>

              {/* In-Progress Flight */}
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white flex items-center">
                  <span className="mr-2">En Progreso</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 rounded-full text-sm">
                    {inProgressFlight ? 1 : 0}
                  </span>
                </h2>
                <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                  {inProgressFlight ? (
                    <FlightCard
                      key={inProgressFlight.id}
                      flight={inProgressFlight}
                      onClick={() => handleActivateFlight(inProgressFlight.id)}
                      onDelete={() => confirmDeleteFlight(inProgressFlight.id, 'pending')}
                    />
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400 text-center italic py-4">
                      No hay vuelos en progreso
                    </p>
                  )}
                </div>
              </div>

              {/* Completed Flights */}
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white flex items-center">
                  <span className="mr-2">Completados</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 rounded-full text-sm">
                    {completedFlights.length}
                  </span>
                </h2>
                <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                  {completedFlights.map((flight) => (
                    <FlightCard
                      key={flight.id}
                      flight={flight}
                      onDelete={() => confirmDeleteFlight(flight.id, 'completed')}
                    />
                  ))}
                  {completedFlights.length === 0 && (
                    <p className="text-gray-500 dark:text-gray-400 text-center italic py-4">
                      No hay vuelos completados
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <FlightOperations
          flight={activeFlight}
          onComplete={handleCompleteFlight}
          onBack={() => setActiveFlightId(null)}
        />
      )}

      {/* Report Modal */}
      {showReport && reportFlight && <Report flight={reportFlight} onClose={handleCloseReport} />}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && flightToDeleteDetails && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-xl max-w-md w-full mx-4 transition-all transform animate-fadeIn"
            role="document"
          >
            <div className="text-center mb-4">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-red-600 dark:text-red-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </div>
              <h3 id="modal-title" className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                Confirmar eliminación
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-1">
                ¿Está seguro que desea eliminar el vuelo?
              </p>
              <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg mb-4 mt-3">
                <p className="font-semibold text-gray-800 dark:text-gray-200">
                  {flightToDeleteDetails.flightNumber}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {flightToDeleteDetails.airline} - {flightToDeleteDetails.destination}
                </p>
                <div className="flex justify-center gap-4 text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>ETA: {flightToDeleteDetails.eta}</span>
                  <span>ETD: {flightToDeleteDetails.etd}</span>
                </div>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                Esta acción no se puede deshacer
              </p>
            </div>
            <div className="flex justify-center gap-3">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-500"
                autoFocus
              >
                Cancelar
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Flight Switch Confirmation Modal */}
      {showSwitchModal && flightToSwitchDetails && inProgressFlightDetails && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="switch-modal-title"
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-xl max-w-md w-full mx-4 transition-all transform animate-fadeIn"
            role="document"
          >
            <div className="text-center mb-4">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-600 dark:text-blue-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                  />
                </svg>
              </div>
              <h3
                id="switch-modal-title"
                className="text-lg font-bold text-gray-900 dark:text-white mb-2"
              >
                Cambiar vuelo en progreso
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-3">
                Ya hay un vuelo en progreso. ¿Desea cambiar al nuevo vuelo?
              </p>

              <div className="flex mb-4">
                <div className="flex-1 bg-gray-100 dark:bg-gray-700 p-3 rounded-l-lg border-r border-gray-200 dark:border-gray-600">
                  <p className="font-medium text-xs text-gray-500 dark:text-gray-400 mb-1">
                    Vuelo actual
                  </p>
                  <p className="font-semibold text-gray-800 dark:text-gray-200">
                    {inProgressFlightDetails.flightNumber}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                    {inProgressFlightDetails.airline}
                  </p>
                </div>
                <div className="flex-1 bg-gray-100 dark:bg-gray-700 p-3 rounded-r-lg">
                  <p className="font-medium text-xs text-gray-500 dark:text-gray-400 mb-1">
                    Nuevo vuelo
                  </p>
                  <p className="font-semibold text-gray-800 dark:text-gray-200">
                    {flightToSwitchDetails.flightNumber}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                    {flightToSwitchDetails.airline}
                  </p>
                </div>
              </div>

              <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                El vuelo actual volverá a su estado pendiente
              </p>
            </div>
            <div className="flex justify-center gap-3">
              <button
                onClick={cancelSwitchFlight}
                className="px-4 py-2 bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-500"
                autoFocus
              >
                Cancelar
              </button>
              <button
                onClick={confirmSwitchFlight}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Cambiar vuelo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-12 py-6 border-t border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-center items-center text-center md:justify-between">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 md:mb-0">
              © {new Date().getFullYear()} Panel de Operaciones Aéreas. Todos los derechos
              reservados.
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Desarrollado por{' '}
              <a
                href="https://thejasondev.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors"
                aria-label="Portfolio de TheJasonDev"
              >
                thejasondev
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
