import React, { useState, useRef, useEffect } from 'react';
import { format, parse, isValid } from 'date-fns';
import { es } from 'date-fns/locale/es';

interface DateTimeSelectorProps {
  label: string;
  value: Date | null;
  onChange: (date: Date | null) => void;
  type: 'date' | 'time' | 'datetime';
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
  className?: string;
}

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
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(value);
  const [selectedTime, setSelectedTime] = useState({ hours: '14', minutes: '00' });
  const containerRef = useRef<HTMLDivElement>(null);

  // Update input value when external value changes
  useEffect(() => {
    if (value) {
      if (type === 'date') {
        setInputValue(format(value, 'dd/MM/yyyy', { locale: es }));
      } else if (type === 'time') {
        setInputValue(format(value, 'HH:mm'));
        setSelectedTime({
          hours: format(value, 'HH'),
          minutes: format(value, 'mm')
        });
      } else {
        setInputValue(format(value, 'dd/MM/yyyy HH:mm', { locale: es }));
      }
      setSelectedDate(value);
    } else {
      setInputValue('');
      setSelectedDate(null);
    }
  }, [value, type]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    if (type === 'time') {
      // Parse time input (HH:mm format)
      const timeRegex = /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/;
      if (timeRegex.test(newValue)) {
        const [hours, minutes] = newValue.split(':');
        const timeDate = new Date();
        timeDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);
        onChange(timeDate);
      }
    } else if (type === 'date') {
      // Parse date input (dd/MM/yyyy format)
      try {
        const parsedDate = parse(newValue, 'dd/MM/yyyy', new Date());
        if (isValid(parsedDate)) {
          onChange(parsedDate);
        }
      } catch (error) {
        // Invalid date format
      }
    }
  };

  const handleTimeChange = (hours: string, minutes: string) => {
    setSelectedTime({ hours, minutes });
    const timeDate = new Date();
    timeDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);
    onChange(timeDate);
    setInputValue(`${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`);
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    if (type === 'date') {
      onChange(date);
      setInputValue(format(date, 'dd/MM/yyyy', { locale: es }));
      setIsOpen(false);
    } else if (type === 'datetime') {
      const combinedDate = new Date(date);
      combinedDate.setHours(parseInt(selectedTime.hours), parseInt(selectedTime.minutes));
      onChange(combinedDate);
      setInputValue(format(combinedDate, 'dd/MM/yyyy HH:mm', { locale: es }));
    }
  };

  const generateCalendar = () => {
    const today = new Date();
    const currentMonth = selectedDate || today;
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    const currentDate = new Date(startDate);
    
    for (let i = 0; i < 42; i++) {
      days.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return { days, currentMonth: new Date(year, month, 1) };
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const current = selectedDate || new Date();
    const newDate = new Date(current);
    newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
    setSelectedDate(newDate);
  };

  const { days, currentMonth } = generateCalendar();

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

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <div className="relative">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder || (type === 'date' ? 'dd/mm/aaaa' : type === 'time' ? 'HH:mm' : 'dd/mm/aaaa HH:mm')}
          disabled={disabled}
          className="w-full px-4 py-3 pr-12 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        />
        
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          disabled={disabled}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 dark:hover:bg-gray-600 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {getInputIcon()}
        </button>
      </div>

      {isOpen && !disabled && (
        <div className="absolute z-50 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg min-w-[300px]">
          {(type === 'date' || type === 'datetime') && (
            <div className="p-4">
              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-4">
                <button
                  type="button"
                  onClick={() => navigateMonth('prev')}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  title="Mes anterior"
                  aria-label="Mes anterior"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {format(currentMonth, 'MMMM yyyy', { locale: es })}
                </h3>
                
                <button
                  type="button"
                  onClick={() => navigateMonth('next')}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  title="Mes siguiente"
                  aria-label="Mes siguiente"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Days of week */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map((day) => (
                  <div key={day} className="p-2 text-xs font-medium text-gray-500 dark:text-gray-400 text-center">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-1">
                {days.map((day, index) => {
                  const isCurrentMonth = day.getMonth() === currentMonth.getMonth();
                  const isSelected = Boolean(selectedDate && day.toDateString() === selectedDate.toDateString());
                  const isToday = day.toDateString() === new Date().toDateString();
                  
                  // Compare dates without time for proper date comparison
                  const dayWithoutTime = new Date(day.getFullYear(), day.getMonth(), day.getDate());
                  const minDateWithoutTime = minDate ? new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate()) : null;
                  const maxDateWithoutTime = maxDate ? new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate()) : null;
                  
                  const isDisabled = Boolean((minDateWithoutTime && dayWithoutTime < minDateWithoutTime) || (maxDateWithoutTime && dayWithoutTime > maxDateWithoutTime));

                  return (
                    <button
                      key={index}
                      type="button"
                      onClick={() => !isDisabled && handleDateSelect(day)}
                      disabled={isDisabled}
                      className={`
                        p-2 text-sm rounded-lg transition-colors
                        ${isCurrentMonth ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-gray-500'}
                        ${isSelected ? 'bg-blue-500 text-white' : ''}
                        ${isToday && !isSelected ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300' : ''}
                        ${!isDisabled && !isSelected ? 'hover:bg-gray-100 dark:hover:bg-gray-700' : ''}
                        ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                      `}
                    >
                      {day.getDate()}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {(type === 'time' || type === 'datetime') && (
            <div className="p-4 sm:p-6 border-t border-gray-200 dark:border-gray-600">
              <h4 className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-4 text-center">Seleccionar Hora</h4>
              
              {/* Time Display */}
              <div className="flex items-center justify-center mb-6">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-xl px-6 py-4 border-2 border-gray-200 dark:border-gray-600">
                  <div className="text-3xl sm:text-4xl font-mono font-bold text-gray-900 dark:text-white text-center">
                    {selectedTime.hours.padStart(2, '0')}:{selectedTime.minutes.padStart(2, '0')}
                  </div>
                </div>
              </div>

              {/* Time Controls */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {/* Hours Control */}
                <div className="text-center">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Horas</label>
                  <div className="flex flex-col items-center space-y-2">
                    <button
                      type="button"
                      onClick={() => handleTimeChange(
                        ((parseInt(selectedTime.hours) + 1) % 24).toString().padStart(2, '0'),
                        selectedTime.minutes
                      )}
                      className="w-12 h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                      aria-label="Aumentar hora"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                      </svg>
                    </button>
                    
                    <div className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 rounded-lg px-4 py-3 min-w-[4rem]">
                      <div className="text-2xl font-mono font-bold text-center text-gray-900 dark:text-white">
                        {selectedTime.hours.padStart(2, '0')}
                      </div>
                    </div>
                    
                    <button
                      type="button"
                      onClick={() => handleTimeChange(
                        ((parseInt(selectedTime.hours) - 1 + 24) % 24).toString().padStart(2, '0'),
                        selectedTime.minutes
                      )}
                      className="w-12 h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                      aria-label="Disminuir hora"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Minutes Control */}
                <div className="text-center">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Minutos</label>
                  <div className="flex flex-col items-center space-y-2">
                    <button
                      type="button"
                      onClick={() => handleTimeChange(
                        selectedTime.hours,
                        ((parseInt(selectedTime.minutes) + 15) % 60).toString().padStart(2, '0')
                      )}
                      className="w-12 h-12 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                      aria-label="Aumentar minutos"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                      </svg>
                    </button>
                    
                    <div className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 rounded-lg px-4 py-3 min-w-[4rem]">
                      <div className="text-2xl font-mono font-bold text-center text-gray-900 dark:text-white">
                        {selectedTime.minutes.padStart(2, '0')}
                      </div>
                    </div>
                    
                    <button
                      type="button"
                      onClick={() => handleTimeChange(
                        selectedTime.hours,
                        ((parseInt(selectedTime.minutes) - 15 + 60) % 60).toString().padStart(2, '0')
                      )}
                      className="w-12 h-12 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                      aria-label="Disminuir minutos"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Quick time buttons */}
              <div className="mb-4">
                <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 text-center">Horarios Comunes</h5>
                <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-2">
                  {['06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'].map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => {
                        const [hours, minutes] = time.split(':');
                        handleTimeChange(hours, minutes);
                      }}
                      className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 ${
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
              <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
                <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 text-center">Entrada Manual</h5>
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
                    className="w-16 px-3 py-2 text-center border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                    className="w-16 px-3 py-2 text-center border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="MM"
                  />
                </div>
              </div>
            </div>
          )}

          {type === 'time' && (
            <div className="p-4 border-t border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
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
      )}
    </div>
  );
}
