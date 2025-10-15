import React, { useState, useEffect } from 'react';
import "../styles/liquidGlass.css";

interface AutoSaveIndicatorProps {
  isVisible: boolean;
  message?: string;
  type?: 'saving' | 'saved' | 'error';
}

export default function AutoSaveIndicator({ 
  isVisible, 
  message = 'Progreso guardado',
  type = 'saved'
}: AutoSaveIndicatorProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShow(true);
      // Very brief display for saved status only
      const timer = setTimeout(() => {
        setShow(false);
      }, 1500); // Brief 1.5 second display

      return () => clearTimeout(timer);
    } else {
      setShow(false);
    }
  }, [isVisible, type]);

  if (!show) return null;

  const getIcon = () => {
    switch (type) {
      case 'saving':
        return (
          <svg className="animate-spin w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        );
      case 'saved':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
      case 'error':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return null;
    }
  };

  const getStyles = () => {
    switch (type) {
      case 'saving':
        return 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-700';
      case 'saved':
        return 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-green-200 dark:border-green-700';
      case 'error':
        return 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border-red-200 dark:border-red-700';
      default:
        return 'bg-gray-50 dark:bg-gray-900/20 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700';
    }
  };

  return (
    <div className={`
      fixed bottom-4 right-4 z-40 
      flex items-center space-x-2 
      px-4 py-3 liquid-glass-notification
      transform transition-all duration-500 ease-in-out
      ${show ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-2 opacity-0 scale-95'}
      ${type === 'saving' ? 'text-blue-700 dark:text-blue-300' : 
        type === 'saved' ? 'text-green-700 dark:text-green-300' : 
        type === 'error' ? 'text-red-700 dark:text-red-300' : 
        'text-gray-700 dark:text-gray-300'}
    `}>
      {getIcon()}
      <span className="text-sm font-medium">{message}</span>
    </div>
  );
}
