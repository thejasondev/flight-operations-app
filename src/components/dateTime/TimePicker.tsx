import React from 'react';
import { adjustTimeValue, constrainTimeValue } from '../../utils/dateTimeUtils';
import { COMMON_TIMES, TIME_CONSTRAINTS, type TimePickerProps } from '../../types/dateTime';

export default function TimePicker({ selectedTime, onTimeChange, onClose }: TimePickerProps) {
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

  const handleManualHourChange = (value: number) => {
    const constrainedValue = constrainTimeValue(
      value, 
      TIME_CONSTRAINTS.MIN_HOUR, 
      TIME_CONSTRAINTS.MAX_HOUR
    );
    onTimeChange(constrainedValue.toString().padStart(2, '0'), selectedTime.minutes);
  };

  const handleManualMinuteChange = (value: number) => {
    const constrainedValue = constrainTimeValue(
      value, 
      TIME_CONSTRAINTS.MIN_MINUTE, 
      TIME_CONSTRAINTS.MAX_MINUTE
    );
    onTimeChange(selectedTime.hours, constrainedValue.toString().padStart(2, '0'));
  };

  return (
    <div className="p-4 sm:p-6 border-t border-gray-200 dark:border-gray-600">
      <h4 className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-4 text-center">
        Seleccionar Hora
      </h4>
      
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
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Horas
          </label>
          <div className="flex flex-col items-center space-y-2">
            <button
              type="button"
              onClick={() => handleHourIncrement(1)}
              className="w-12 h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
              aria-label="Aumentar hora"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            </button>
            
            <div className="text-2xl font-mono font-bold text-gray-900 dark:text-white w-12 text-center">
              {selectedTime.hours.padStart(2, '0')}
            </div>
            
            <button
              type="button"
              onClick={() => handleHourIncrement(-1)}
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
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Minutos
          </label>
          <div className="flex flex-col items-center space-y-2">
            <button
              type="button"
              onClick={() => handleMinuteIncrement(1)}
              className="w-12 h-12 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
              aria-label="Aumentar minutos"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            </button>
            
            <div className="text-2xl font-mono font-bold text-gray-900 dark:text-white w-12 text-center">
              {selectedTime.minutes.padStart(2, '0')}
            </div>
            
            <button
              type="button"
              onClick={() => handleMinuteIncrement(-1)}
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
        <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 text-center">
          Horarios Comunes
        </h5>
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-2">
          {COMMON_TIMES.map((time) => (
            <button
              key={time}
              type="button"
              onClick={() => {
                const [hours, minutes] = time.split(':');
                onTimeChange(hours, minutes);
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
        <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 text-center">
          Entrada Manual
        </h5>
        <div className="flex items-center justify-center space-x-2">
          <input
            type="number"
            min={TIME_CONSTRAINTS.MIN_HOUR}
            max={TIME_CONSTRAINTS.MAX_HOUR}
            value={parseInt(selectedTime.hours)}
            onChange={(e) => handleManualHourChange(parseInt(e.target.value) || 0)}
            className="w-16 px-3 py-2 text-center border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="HH"
          />
          <span className="text-gray-500 dark:text-gray-400 font-bold">:</span>
          <input
            type="number"
            min={TIME_CONSTRAINTS.MIN_MINUTE}
            max={TIME_CONSTRAINTS.MAX_MINUTE}
            step={TIME_CONSTRAINTS.MINUTE_STEP}
            value={parseInt(selectedTime.minutes)}
            onChange={(e) => handleManualMinuteChange(parseInt(e.target.value) || 0)}
            className="w-16 px-3 py-2 text-center border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="MM"
          />
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
