import React, { useState, useEffect } from "react";
import FlightCard from "./FlightCard";
import type { Flight } from "./FlightCard";
import FlightOperations from "./FlightOperations";
import Report from "./Report";

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

  // State for report modal
  const [showReport, setShowReport] = useState(false);
  const [reportFlight, setReportFlight] = useState<Flight | null>(null);

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

    const newFlight: Flight = {
      id: Date.now().toString(),
      flightNumber: formData.flightNumber.toUpperCase(),
      airline: formData.airline,
      destination: formData.destination.toUpperCase(),
      eta: formData.eta,
      etd: formData.etd,
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
  };

  // Move a flight to "in-progress" status
  const handleActivateFlight = (flightId: string) => {
    // Check if there's already a flight in progress
    const existingInProgress = pendingFlights.find(
      (f) => f.status === "in-progress"
    );

    if (existingInProgress && existingInProgress.id !== flightId) {
      if (!confirm("Ya hay un vuelo en progreso. ¿Desea cambiar al nuevo vuelo?")) {
        return;
      }
    }

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

  // Get the in-progress flight (only one can be in progress)
  const inProgressFlight = pendingFlights.find(f => f.status === "in-progress");

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Panel de Operaciones Aéreas
        </h1>
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
                    placeholder="Ej: AV123"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="airline"
                    className="block text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Aerolínea
                  </label>
                  <input
                    type="text"
                    id="airline"
                    name="airline"
                    value={formData.airline}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Ej: Avianca"
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
                    placeholder="Ej: BOG-MDE"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="eta"
                    className="block text-gray-700 dark:text-gray-300 mb-1"
                  >
                    ETA (Hora Estimada de Arribo)
                  </label>
                  <input
                    type="time"
                    id="eta"
                    name="eta"
                    value={formData.eta}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="etd"
                    className="block text-gray-700 dark:text-gray-300 mb-1"
                  >
                    ETD (Hora Estimada de Salida)
                  </label>
                  <input
                    type="time"
                    id="etd"
                    name="etd"
                    value={formData.etd}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    required
                  />
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
                    {pendingFlights.filter(f => f.status === "pending").length}
                  </span>
                </h2>
                <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                  {pendingFlights
                    .filter(f => f.status === "pending")
                    .map((flight) => (
                      <FlightCard
                        key={flight.id}
                        flight={flight}
                        onClick={() => handleActivateFlight(flight.id)}
                      />
                    ))}
                  {pendingFlights.filter(f => f.status === "pending").length === 0 && (
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
                  {inProgressFlight && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 rounded-full text-sm">
                      1
                    </span>
                  )}
                </h2>
                <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                  {inProgressFlight ? (
                    <FlightCard
                      key={inProgressFlight.id}
                      flight={inProgressFlight}
                      onClick={() => handleActivateFlight(inProgressFlight.id)}
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
                    <FlightCard key={flight.id} flight={flight} />
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
      {showReport && reportFlight && (
        <Report flight={reportFlight} onClose={handleCloseReport} />
      )}
    </div>
  );
}
