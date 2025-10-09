import React, { useState, useRef, useEffect } from 'react';

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
  const [selectedTime, setSelectedTime] = useState(() => {
    if (value) {
      const [hours, minutes] = value.split(':');
      return { hours: hours || '00', minutes: minutes || '00' };
    }
    return { hours: '00', minutes: '00' };
  });
  
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  const handleInputClick = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleQuickTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    handleTimeChange(hours, minutes);
    setIsOpen(false);
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

        {/* Custom Time Picker Dropdown */}
        {isOpen && !disabled && (
          <div className="absolute z-50 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg min-w-[320px] max-w-sm">
            <div className="p-4">
              <h4 className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-4 text-center">Seleccionar Hora</h4>
              
              {/* Time Display */}
              <div className="flex items-center justify-center mb-4">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-xl px-4 py-3 border-2 border-gray-200 dark:border-gray-600">
                  <div className="text-2xl font-mono font-bold text-gray-900 dark:text-white text-center">
                    {selectedTime.hours}:{selectedTime.minutes}
                  </div>
                </div>
              </div>

              {/* Time Controls */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                {/* Hours Control */}
                <div className="text-center">
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">Horas</label>
                  <div className="flex flex-col items-center space-y-1">
                    <button
                      type="button"
                      onClick={() => handleTimeChange(
                        ((parseInt(selectedTime.hours) + 1) % 24).toString().padStart(2, '0'),
                        selectedTime.minutes
                      )}
                      className="w-8 h-8 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                      title="Aumentar hora"
                      aria-label="Aumentar hora"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                      </svg>
                    </button>
                    
                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded px-3 py-2 min-w-[3rem]">
                      <div className="text-lg font-mono font-bold text-center text-gray-900 dark:text-white">
                        {selectedTime.hours}
                      </div>
                    </div>
                    
                    <button
                      type="button"
                      onClick={() => handleTimeChange(
                        ((parseInt(selectedTime.hours) - 1 + 24) % 24).toString().padStart(2, '0'),
                        selectedTime.minutes
                      )}
                      className="w-8 h-8 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                      title="Disminuir hora"
                      aria-label="Disminuir hora"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Minutes Control */}
                <div className="text-center">
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">Minutos</label>
                  <div className="flex flex-col items-center space-y-1">
                    <button
                      type="button"
                      onClick={() => handleTimeChange(
                        selectedTime.hours,
                        ((parseInt(selectedTime.minutes) + 15) % 60).toString().padStart(2, '0')
                      )}
                      className="w-8 h-8 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
                      title="Aumentar minutos"
                      aria-label="Aumentar minutos"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                      </svg>
                    </button>
                    
                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded px-3 py-2 min-w-[3rem]">
                      <div className="text-lg font-mono font-bold text-center text-gray-900 dark:text-white">
                        {selectedTime.minutes}
                      </div>
                    </div>
                    
                    <button
                      type="button"
                      onClick={() => handleTimeChange(
                        selectedTime.hours,
                        ((parseInt(selectedTime.minutes) - 15 + 60) % 60).toString().padStart(2, '0')
                      )}
                      className="w-8 h-8 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
                      title="Disminuir minutos"
                      aria-label="Disminuir minutos"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Quick time buttons */}
              <div className="mb-4">
                <h5 className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2 text-center">Horarios Comunes</h5>
                <div className="grid grid-cols-3 gap-1">
                  {['06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'].map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => handleQuickTime(time)}
                      className={`px-2 py-1 text-xs font-medium rounded transition-colors focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                        `${selectedTime.hours}:${selectedTime.minutes}` === time
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              {/* Manual Input */}
              <div className="border-t border-gray-200 dark:border-gray-600 pt-3">
                <h5 className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2 text-center">Entrada Manual</h5>
                <div className="flex items-center justify-center space-x-2">
                  <input
                    type="number"
                    min="0"
                    max="23"
                    value={parseInt(selectedTime.hours)}
                    onChange={(e) => {
                      const value = Math.max(0, Math.min(23, parseInt(e.target.value) || 0));
                      handleTimeChange(value.toString().padStart(2, '0'), selectedTime.minutes);
                    }}
                    className="w-12 px-2 py-1 text-center text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="HH"
                  />
                  <span className="text-gray-500 dark:text-gray-400 font-bold">:</span>
                  <input
                    type="number"
                    min="0"
                    max="59"
                    step="15"
                    value={parseInt(selectedTime.minutes)}
                    onChange={(e) => {
                      const value = Math.max(0, Math.min(59, parseInt(e.target.value) || 0));
                      handleTimeChange(selectedTime.hours, value.toString().padStart(2, '0'));
                    }}
                    className="w-12 px-2 py-1 text-center text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="MM"
                  />
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
