import React from 'react';
import ThemeToggle from './ThemeToggle';

interface DashboardHeaderProps {
  pendingCount: number;
  inProgressCount: number;
  completedCount: number;
  onNewFlight: () => void;
}

export default function DashboardHeader({
  pendingCount,
  inProgressCount,
  completedCount,
  onNewFlight,
}: DashboardHeaderProps) {
  return (
    <header className="liquid-glass-header shadow-sm border-b border-gray-200 dark:border-gray-700 relative">
      <div className="max-w-7xl mx-auto px-0 sm:px-6 lg:px-8">
        {/* Mobile Header */}
        <div className="sm:hidden mobile-header-container">
          {/* Top section: Logo and title */}
          <div className="flex items-center justify-center py-4 px-4">
            <div className="logo-container flex flex-col items-center gap-2">
              <img
                src="/logo/logo-ops.webp"
                alt="Panel Operaciones Aéreas Logo"
                className="app-logo w-10 h-10 rounded-xl shadow-md"
              />
              <h1 className="text-base font-bold text-gray-900 dark:text-white text-center leading-tight">
                Panel de Operaciones Aéreas
              </h1>
            </div>
          </div>
        </div>

        {/* Desktop Header */}
        <div className="hidden sm:flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="logo-container">
              <img
                src="/logo/logo-ops.webp"
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
              onClick={onNewFlight}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors font-medium"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Nuevo Vuelo
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
