import React, { useState, useRef, useEffect } from 'react';

type EditingField = 'hours' | 'minutes' | null;

interface TimeInputProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function TimeInput({
  value,
  onChange,
  label,
  placeholder = "HH:MM",
  className = "",
  disabled = false,
  required = false,
  size = 'md'
}: TimeInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [editingField, setEditingField] = useState<EditingField>(null);
  const [tempValue, setTempValue] = useState('');
  const [selectedTime, setSelectedTime] = useState(() => {
    if (value) {
      const [hours, minutes] = value.split(':');
      return { hours: hours || '00', minutes: minutes || '00' };
    }
    return { hours: '00', minutes: '00' };
  });
  
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Focus input when editing starts
  useEffect(() => {
    if (editingField && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editingField]);

  useEffect(() => {
    if (value) {
      const [hours, minutes] = value.split(':');
      setSelectedTime({ 
        hours: hours?.padStart(2, '0') || '00', 
        minutes: minutes?.padStart(2, '0') || '00' 
      });
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setEditingField(null);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleTimeChange = (hours: string, minutes: string) => {
    const newTime = { hours: hours.padStart(2, '0'), minutes: minutes.padStart(2, '0') };
    setSelectedTime(newTime);
    onChange(`${newTime.hours}:${newTime.minutes}`);
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
      const constrainedValue = Math.max(0, Math.min(23, numValue));
      handleTimeChange(constrainedValue.toString().padStart(2, '0'), selectedTime.minutes);
    } else {
      const constrainedValue = Math.max(0, Math.min(59, numValue));
      handleTimeChange(selectedTime.hours, constrainedValue.toString().padStart(2, '0'));
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

  const handleHourIncrement = (increment: number) => {
    const newHour = ((parseInt(selectedTime.hours) + increment + 24) % 24).toString().padStart(2, '0');
    handleTimeChange(newHour, selectedTime.minutes);
  };

  const handleMinuteIncrement = (increment: number) => {
    const newMinute = ((parseInt(selectedTime.minutes) + increment * 15 + 60) % 60).toString().padStart(2, '0');
    handleTimeChange(selectedTime.hours, newMinute);
  };

  const handleInputClick = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-base',
    lg: 'px-4 py-3 text-lg'
  };

  const displayValue = value || `${selectedTime.hours}:${selectedTime.minutes}`;

  return (
    <div className="relative">
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      
      <div className="relative" ref={dropdownRef}>
        <input
          ref={inputRef}
          type="text"
          value={displayValue}
          onClick={handleInputClick}
          onChange={() => {}} // Controlled by our custom logic
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          readOnly
          className={`
            ${sizeClasses[size]}
            w-full border border-gray-300 dark:border-gray-600 rounded-lg 
            bg-white dark:bg-gray-700 text-gray-900 dark:text-white 
            focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
            dark:focus:ring-blue-400 dark:focus:border-blue-400 
            transition-colors cursor-pointer font-mono
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-gray-400 dark:hover:border-gray-500'}
            ${className}
          `}
        />
        
        {/* Clock Icon */}
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>

        {/* Interactive Time Picker Dropdown */}
        {isOpen && !disabled && (
          <div className="absolute z-50 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg min-w-[320px] max-w-sm">
            <div className="p-4">
              <h4 className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-4 text-center">Seleccionar Hora</h4>
              
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
                          className="w-16 text-2xl font-mono font-bold text-center bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 rounded-lg border-2 border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          maxLength={2}
                        />
                      ) : (
                        <button
                          type="button"
                          onClick={() => startEditing('hours')}
                          className="text-2xl font-mono font-bold text-gray-900 dark:text-white hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-900 dark:hover:text-blue-100 rounded-lg px-2 py-1 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-700"
                          title="Haz clic para editar las horas"
                        >
                          {selectedTime.hours.padStart(2, '0')}
                        </button>
                      )}
                    </div>

                    {/* Separator */}
                    <div className="text-2xl font-mono font-bold text-gray-900 dark:text-white">
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
                          className="w-16 text-2xl font-mono font-bold text-center bg-green-100 dark:bg-green-900 text-green-900 dark:text-green-100 rounded-lg border-2 border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                          maxLength={2}
                        />
                      ) : (
                        <button
                          type="button"
                          onClick={() => startEditing('minutes')}
                          className="text-2xl font-mono font-bold text-gray-900 dark:text-white hover:bg-green-100 dark:hover:bg-green-900 hover:text-green-900 dark:hover:text-green-100 rounded-lg px-2 py-1 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-700"
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

        
              {/* Confirm Button */}
              <div className="mt-4">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                >
                  <div className="flex items-center justify-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Confirmar</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
