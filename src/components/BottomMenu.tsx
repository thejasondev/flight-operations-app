import React from 'react';
import ThemeToggle from './ThemeToggle';

interface BottomMenuProps {
  activeTab: 'pending' | 'in-progress' | 'completed';
  setActiveTab: (tab: 'pending' | 'in-progress' | 'completed') => void;
  onNewFlight: () => void;
  pendingCount: number;
  inProgressCount: number;
  completedCount: number;
}

export default function BottomMenu({
  activeTab,
  setActiveTab,
  onNewFlight,
  pendingCount,
  inProgressCount,
  completedCount,
}: BottomMenuProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 sm:hidden">
      {/* Glass Container */}
      <div className="liquid-glass-header border-t border-gray-200 dark:border-gray-700 pb-safe-bottom">
        <div className="flex items-center justify-between px-2 py-2">
          {/* Pending Tab */}
          <button
            onClick={() => setActiveTab('pending')}
            className={`flex-1 flex flex-col items-center justify-center gap-1 p-2 rounded-xl transition-all duration-200 ${
              activeTab === 'pending'
                ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'
            }`}
          >
            <div className="relative">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {pendingCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-yellow-500 text-[10px] font-bold text-white ring-2 ring-white dark:ring-gray-900">
                  {pendingCount}
                </span>
              )}
            </div>
            <span className="text-[10px] font-medium">Pendientes</span>
          </button>

          {/* In Progress Tab */}
          <button
            onClick={() => setActiveTab('in-progress')}
            className={`flex-1 flex flex-col items-center justify-center gap-1 p-2 rounded-xl transition-all duration-200 ${
              activeTab === 'in-progress'
                ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'
            }`}
          >
            <div className="relative">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              {inProgressCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 text-[10px] font-bold text-white ring-2 ring-white dark:ring-gray-900">
                  {inProgressCount}
                </span>
              )}
            </div>
            <span className="text-[10px] font-medium">En Curso</span>
          </button>

          {/* Add Flight Button (Central & Prominent) */}
          <div className="relative -top-5 mx-2">
            <button
              onClick={onNewFlight}
              className="flex items-center justify-center w-14 h-14 rounded-full bg-blue-600 text-white shadow-lg shadow-blue-600/30 hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all duration-200 border-4 border-white dark:border-gray-900"
              aria-label="Nuevo Vuelo"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>
          </div>

          {/* Completed Tab */}
          <button
            onClick={() => setActiveTab('completed')}
            className={`flex-1 flex flex-col items-center justify-center gap-1 p-2 rounded-xl transition-all duration-200 ${
              activeTab === 'completed'
                ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'
            }`}
          >
            <div className="relative">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {completedCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-green-500 text-[10px] font-bold text-white ring-2 ring-white dark:ring-gray-900">
                  {completedCount}
                </span>
              )}
            </div>
            <span className="text-[10px] font-medium">Historial</span>
          </button>

          {/* Menu/More Tab (For Theme Toggle etc) */}
          <div className="flex-1 flex flex-col items-center justify-center gap-1 p-2">
            <ThemeToggle />
            <span className="text-[10px] font-medium text-gray-500 dark:text-gray-400 mt-1">
              Tema
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
