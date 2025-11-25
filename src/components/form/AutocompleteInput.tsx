import React, { useState } from 'react';

interface AutocompleteInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  placeholder?: string;
  suggestions: string[];
  showSuggestions: boolean;
  onSuggestionSelect: (suggestion: string) => void;
  onSuggestionsVisibilityChange: (visible: boolean) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  className?: string;
  inputMode?: 'text' | 'none' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search';
  autoComplete?: string;
  autoCapitalize?: 'off' | 'none' | 'on' | 'sentences' | 'words' | 'characters';
}

export default function AutocompleteInput({
  label,
  value,
  onChange,
  onFocus,
  onBlur,
  placeholder,
  suggestions,
  showSuggestions,
  onSuggestionSelect,
  onSuggestionsVisibilityChange,
  error,
  required = false,
  disabled = false,
  icon,
  className = '',
  inputMode = 'text',
  autoComplete = 'off',
  autoCapitalize = 'words',
}: AutocompleteInputProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleFocus = () => {
    if (value.length > 0) {
      onSuggestionsVisibilityChange(true);
    }
    onFocus?.();
  };

  const handleBlur = () => {
    setTimeout(() => onSuggestionsVisibilityChange(false), 200);
    onBlur?.();
  };

  const handleSuggestionClick = (suggestion: string) => {
    onSuggestionSelect(suggestion);
    onSuggestionsVisibilityChange(false);
  };

  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {icon ? (
          <div className="flex items-center gap-2">
            {icon}
            {label} {required && <span className="text-red-500">*</span>}
          </div>
        ) : (
          <>
            {label} {required && <span className="text-red-500">*</span>}
          </>
        )}
      </label>
      <div className="relative">
        <input
          type="text"
          inputMode={inputMode}
          autoComplete={autoComplete}
          autoCapitalize={autoCapitalize}
          value={value}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          disabled={disabled}
          className={`w-full px-4 py-3 text-sm border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
            error ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'
          }`}
        />
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg max-h-48 overflow-y-auto">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full text-left px-4 py-2 text-sm text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 focus:bg-gray-100 dark:focus:bg-gray-600 focus:outline-none"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-red-500 dark:text-red-400">{error}</p>}
    </div>
  );
}
