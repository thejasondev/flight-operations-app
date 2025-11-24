import React, { useState } from "react";
import FlightCard from "./FlightCard";
import type { Flight } from "./FlightCard";

interface DashboardMainContentProps {
  pendingFlights: Flight[];
  completedFlights: Flight[];
  onActivateFlight: (flightId: string) => void;
  onSetActiveFlight: (flightId: string) => void;
  onConfirmDelete: (flightId: string, type: "pending" | "completed") => void;
  onViewReport: (flight: Flight) => void;
  onNewFlight: () => void;
}

export default function DashboardMainContent({
  pendingFlights,
  completedFlights,
  onActivateFlight,
  onSetActiveFlight,
  onConfirmDelete,
  onViewReport,
  onNewFlight,
}: DashboardMainContentProps) {
  const pendingCount = pendingFlights.filter((f) => f.status === "pending").length;
  const inProgressCount = pendingFlights.filter((f) => f.status === "in-progress").length;
  const completedCount = completedFlights.length;
  const [activeTab, setActiveTab] = useState<"pending" | "in-progress" | "completed">("pending");

  return (
    <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-6 pb-24 sm:pb-6">
      {/* Grid principal: en móvil se ve solo la pestaña activa; en sm+ se muestran las tres columnas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-6 xl:gap-8">
        {/* Pending Flights */}
        <div
          className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 ${
            activeTab === "pending" ? "block" : "hidden"
          } sm:block`}
        >
          <div className="p-4 sm:p-6">
            <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 pb-2 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white flex items-center">
              <span className="mr-2">Pendientes</span>
              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100 rounded-full text-sm">
                {pendingCount}
              </span>
            </h2>
            <div className="space-y-3 sm:space-y-4 max-h-[45vh] sm:max-h-[50vh] lg:max-h-[55vh] overflow-y-auto pr-1 sm:pr-2">
              {pendingFlights
                .filter((f) => f.status === "pending")
                .map((flight) => (
                  <FlightCard
                    key={flight.id}
                    flight={flight}
                    onClick={() => onActivateFlight(flight.id)}
                    onDelete={() => onConfirmDelete(flight.id, "pending")}
                  />
                ))}
              {pendingCount === 0 && (
                <div className="text-center py-8">
                  <svg
                    className="w-12 h-12 text-gray-400 mx-auto mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  <p className="text-gray-500 dark:text-gray-400 text-center italic">
                    No hay vuelos pendientes
                  </p>
                  <button
                    onClick={onNewFlight}
                    className="mt-3 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
                  >
                    Agregar primer vuelo
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* In Progreso Flights */}
        <div
          className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 ${
            activeTab === "in-progress" ? "block" : "hidden"
          } sm:block`}
        >
          <div className="p-4 sm:p-6">
            <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 pb-2 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white flex items-center">
              <span className="mr-2">En Progreso</span>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 rounded-full text-sm">
                {inProgressCount}
              </span>
            </h2>
            <div className="space-y-3 sm:space-y-4 max-h-[45vh] sm:max-h-[50vh] lg:max-h-[55vh] overflow-y-auto pr-1 sm:pr-2">
              {pendingFlights
                .filter((f) => f.status === "in-progress")
                .map((flight) => (
                  <FlightCard
                    key={flight.id}
                    flight={flight}
                    onClick={() => onSetActiveFlight(flight.id)}
                    onDelete={() => onConfirmDelete(flight.id, "pending")}
                  />
                ))}
              {inProgressCount === 0 && (
                <div className="text-center py-8">
                  <svg
                    className="w-12 h-12 text-gray-400 mx-auto mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
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
        <div
          className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 ${
            activeTab === "completed" ? "block" : "hidden"
          } sm:block`}
        >
          <div className="p-4 sm:p-6">
            <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 pb-2 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white flex items-center">
              <span className="mr-2">Completados</span>
              <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 rounded-full text-sm">
                {completedFlights.length}
              </span>
            </h2>
            <div className="space-y-3 sm:space-y-4 max-h-[45vh] sm:max-h-[50vh] lg:max-h-[55vh] overflow-y-auto pr-1 sm:pr-2">
              {completedFlights.map((flight) => (
                <FlightCard
                  key={flight.id}
                  flight={flight}
                  onDelete={() => onConfirmDelete(flight.id, "completed")}
                  onViewReport={() => onViewReport(flight)}
                />
              ))}
              {completedFlights.length === 0 && (
                <div className="text-center py-8">
                  <svg
                    className="w-12 h-12 text-gray-400 mx-auto mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
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

      {/* Menú de navegación inferior para móvil */}
      <div
        className="fixed inset-x-0 bottom-0 z-30 bg-white/95 dark:bg-gray-900/95 border-t border-gray-200 dark:border-gray-700 backdrop-blur sm:hidden safe-area-bottom"
      >
        <nav className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setActiveTab("pending")}
            className={`flex-1 flex flex-col items-center justify-center gap-1 px-2 py-1 text-xs ${
              activeTab === "pending"
                ? "text-blue-600 dark:text-blue-400"
                : "text-gray-500 dark:text-gray-400"
            }`}
            aria-current={activeTab === "pending" ? "page" : undefined}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span>Pendientes</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("in-progress")}
            className={`flex-1 flex flex-col items-center justify-center gap-1 px-2 py-1 text-xs ${
              activeTab === "in-progress"
                ? "text-blue-600 dark:text-blue-400"
                : "text-gray-500 dark:text-gray-400"
            }`}
            aria-current={activeTab === "in-progress" ? "page" : undefined}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            <span>En Progreso</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("completed")}
            className={`flex-1 flex flex-col items-center justify-center gap-1 px-2 py-1 text-xs ${
              activeTab === "completed"
                ? "text-blue-600 dark:text-blue-400"
                : "text-gray-500 dark:text-gray-400"
            }`}
            aria-current={activeTab === "completed" ? "page" : undefined}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Completados</span>
          </button>
        </nav>
      </div>
    </main>
  );
}
