import React, { useState, useRef, useEffect } from 'react';
import { adjustTimeValue, constrainTimeValue } from '../../utils/dateTimeUtils';
import { TIME_CONSTRAINTS, type TimePickerProps } from '../../types/dateTime';

type EditingField = 'hours' | 'minutes' | null;

export default function TimePicker({ selectedTime, onTimeChange, onClose }: TimePickerProps) {
  const [editingField, setEditingField] = useState<EditingField>(null);
  const [tempValue, setTempValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when editing starts
  useEffect(() => {
    if (editingField && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editingField]);

  const handleHourIncrement = (increment: number) => {
    const newHour = adjustTimeValue(
      parseInt(selectedTime.hours), 
      increment, 
      TIME_CONSTRAINTS.MAX_HOUR
    );
    onTimeChange(newHour, selectedTime.minutes);
  };

  const handleMinuteIncrement = (increment: number) => {
    const newMinute = adjustTimeValue(
      parseInt(selectedTime.minutes), 
      increment * TIME_CONSTRAINTS.MINUTE_STEP, 
      TIME_CONSTRAINTS.MAX_MINUTE
    );
    onTimeChange(selectedTime.hours, newMinute);
  };

  const startEditing = (field: 'hours' | 'minutes') => {
    setEditingField(field);
    setTempValue(field === 'hours' ? selectedTime.hours : selectedTime.minutes);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow numbers and limit to 2 digits
    if (/^\d{0,2}$/.test(value)) {
      setTempValue(value);
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      confirmEdit();
    } else if (e.key === 'Escape') {
      cancelEdit();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (editingField === 'hours') {
        handleHourIncrement(1);
      } else {
        handleMinuteIncrement(1);
      }
      cancelEdit();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (editingField === 'hours') {
        handleHourIncrement(-1);
      } else {
        handleMinuteIncrement(-1);
      }
      cancelEdit();
    }
  };

  const confirmEdit = () => {
    if (!editingField) return;
    
    const numValue = parseInt(tempValue) || 0;
    
    if (editingField === 'hours') {
      const constrainedValue = constrainTimeValue(
        numValue, 
        TIME_CONSTRAINTS.MIN_HOUR, 
        TIME_CONSTRAINTS.MAX_HOUR
      );
      onTimeChange(constrainedValue.toString().padStart(2, '0'), selectedTime.minutes);
    } else {
      const constrainedValue = constrainTimeValue(
        numValue, 
        TIME_CONSTRAINTS.MIN_MINUTE, 
        TIME_CONSTRAINTS.MAX_MINUTE
      );
      onTimeChange(selectedTime.hours, constrainedValue.toString().padStart(2, '0'));
    }
    
    setEditingField(null);
    setTempValue('');
  };

  const cancelEdit = () => {
    setEditingField(null);
    setTempValue('');
  };

  const handleInputBlur = () => {
    confirmEdit();
  };

  return (
    <div className="p-4 sm:p-6 border-t border-gray-200 dark:border-gray-600">
      <h4 className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-4 text-center">
        Seleccionar Hora
      </h4>
      
      {/* Interactive Time Display */}
      <div className="flex items-center justify-center mb-6">
        <div className="bg-gray-50 dark:bg-gray-700 rounded-xl px-6 py-4 border-2 border-gray-200 dark:border-gray-600 relative">
          <div className="flex items-center justify-center space-x-2">
            {/* Hours Section */}
            <div className="relative">
              {editingField === 'hours' ? (
                <input
                  ref={inputRef}
                  type="text"
                  value={tempValue}
                  onChange={handleInputChange}
                  onKeyDown={handleInputKeyDown}
                  onBlur={handleInputBlur}
                  className="w-16 text-3xl sm:text-4xl font-mono font-bold text-center bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 rounded-lg border-2 border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  maxLength={2}
                />
              ) : (
                <button
                  type="button"
                  onClick={() => startEditing('hours')}
                  className="text-3xl sm:text-4xl font-mono font-bold text-gray-900 dark:text-white hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-900 dark:hover:text-blue-100 rounded-lg px-2 py-1 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-700"
                  title="Haz clic para editar las horas"
                >
                  {selectedTime.hours.padStart(2, '0')}
                </button>
              )}
            </div>

            {/* Separator */}
            <div className="text-3xl sm:text-4xl font-mono font-bold text-gray-900 dark:text-white">
              :
            </div>

            {/* Minutes Section */}
            <div className="relative">
              {editingField === 'minutes' ? (
                <input
                  ref={editingField === 'minutes' ? inputRef : undefined}
                  type="text"
                  value={tempValue}
                  onChange={handleInputChange}
                  onKeyDown={handleInputKeyDown}
                  onBlur={handleInputBlur}
                  className="w-16 text-3xl sm:text-4xl font-mono font-bold text-center bg-green-100 dark:bg-green-900 text-green-900 dark:text-green-100 rounded-lg border-2 border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                  maxLength={2}
                />
              ) : (
                <button
                  type="button"
                  onClick={() => startEditing('minutes')}
                  className="text-3xl sm:text-4xl font-mono font-bold text-gray-900 dark:text-white hover:bg-green-100 dark:hover:bg-green-900 hover:text-green-900 dark:hover:text-green-100 rounded-lg px-2 py-1 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-700"
                  title="Haz clic para editar los minutos"
                >
                  {selectedTime.minutes.padStart(2, '0')}
                </button>
              )}
            </div>
          </div>

          {/* Helper Text */}
          {!editingField && (
            <div className="text-xs text-gray-500 dark:text-gray-400 text-center mt-2">
              Haz clic en las horas o minutos para editarlos
            </div>
          )}
          
          {editingField && (
            <div className="text-xs text-gray-600 dark:text-gray-300 text-center mt-2">
              Enter para confirmar • Esc para cancelar • ↑↓ para ajustar
            </div>
          )}
        </div>
      </div>
      
      {/* Confirm Button for time-only mode */}
      {onClose && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 -mx-4 -mb-4 px-4 pb-4">
          <button
            type="button"
            onClick={onClose}
            className="w-full px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 shadow-sm"
          >
            <div className="flex items-center justify-center space-x-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Confirmar Hora</span>
            </div>
          </button>
        </div>
      )}
    </div>
  );
}
