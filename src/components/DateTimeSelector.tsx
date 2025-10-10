import React from 'react';
import { useDateTimeSelector } from '../hooks/useDateTimeSelector';
import { Calendar, TimePicker, DateTimeInput } from './dateTime';
import type { DateTimeSelectorProps } from '../types/dateTime';

export default function DateTimeSelector({
  label,
  value,
  onChange,
  type,
  placeholder,
  required = false,
  disabled = false,
  minDate,
  maxDate,
  className = ''
}: DateTimeSelectorProps) {
  const {
    isOpen,
    inputValue,
    selectedDate,
    selectedTime,
    containerRef,
    handleInputChange,
    handleTimeChange,
    handleDateSelect,
    handleNavigateMonth,
    toggleOpen,
    handleFocus,
    setIsOpen
  } = useDateTimeSelector(value, onChange, type);

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      {/* Input Field */}
      <DateTimeInput
        label={label}
        value={inputValue}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        isOpen={isOpen}
        onInputChange={handleInputChange}
        onToggleOpen={toggleOpen}
        onFocus={handleFocus}
        type={type}
      />

      {/* Dropdown */}
      {isOpen && !disabled && (
        <div className="absolute z-50 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg min-w-[300px]">
          
          {/* Calendar Component */}
          {(type === 'date' || type === 'datetime') && (
            <Calendar
              selectedDate={selectedDate}
              currentMonth={selectedDate || new Date()}
              minDate={minDate}
              maxDate={maxDate}
              onDateSelect={handleDateSelect}
              onNavigateMonth={handleNavigateMonth}
            />
          )}

          {/* Time Picker Component */}
          {(type === 'time' || type === 'datetime') && (
            <TimePicker
              selectedTime={selectedTime}
              onTimeChange={handleTimeChange}
              onClose={type === 'time' ? () => setIsOpen(false) : undefined}
            />
          )}
        </div>
      )}
    </div>
  );
}
