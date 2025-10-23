import React from 'react';
import type { DateTimeInputProps } from '../../types/dateTime';

export default function DateTimeInput({
  label,
  value,
  placeholder,
  required = false,
  disabled = false,
  isOpen,
  onInputChange,
  onToggleOpen,
  onFocus,
  type,
  className = '',
  icon
}: DateTimeInputProps) {
  
  const getInputIcon = () => {
    if (type === 'date') {
      return (
        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      );
    } else {
      return (
        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    }
  };

  const getDefaultPlaceholder = () => {
    if (placeholder) return placeholder;
    
    switch (type) {
      case 'date':
        return 'dd/mm/aaaa';
      case 'time':
        return 'HH:mm';
      case 'datetime':
        return 'dd/mm/aaaa HH:mm';
      default:
        return '';
    }
  };

  return (
    <div className={`relative ${className}`}>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {icon ? (
          <div className="flex items-center gap-2">
            {icon}
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </div>
        ) : (
          <>
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </>
        )}
      </label>
      
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={onInputChange}
          onFocus={onFocus}
          placeholder={getDefaultPlaceholder()}
          disabled={disabled}
          className="w-full px-4 py-3 pr-12 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        />
        
        <button
          type="button"
          onClick={onToggleOpen}
          disabled={disabled}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 dark:hover:bg-gray-600 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {getInputIcon()}
        </button>
      </div>
    </div>
  );
}
