import React from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale/es';
import { generateCalendarDays, isDateDisabled, getDateStatus } from '../../utils/dateTimeUtils';
import { DAYS_OF_WEEK, type CalendarProps } from '../../types/dateTime';

export default function Calendar({
  selectedDate,
  currentMonth,
  minDate,
  maxDate,
  onDateSelect,
  onNavigateMonth
}: CalendarProps) {
  const days = generateCalendarDays(currentMonth);

  return (
    <div className="p-4">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={() => onNavigateMonth('prev')}
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
          onClick={() => onNavigateMonth('next')}
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
        {DAYS_OF_WEEK.map((day) => (
          <div key={day} className="p-2 text-xs font-medium text-gray-500 dark:text-gray-400 text-center">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Days */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => {
          const { isCurrentMonth, isSelected, isToday } = getDateStatus(day, selectedDate, currentMonth);
          const disabled = isDateDisabled(day, minDate, maxDate);

          return (
            <button
              key={index}
              type="button"
              onClick={() => !disabled && onDateSelect(day)}
              disabled={disabled}
              className={`
                p-2 text-sm rounded-lg transition-colors
                ${isCurrentMonth ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-gray-500'}
                ${isSelected ? 'bg-blue-500 text-white' : ''}
                ${isToday && !isSelected ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300' : ''}
                ${!disabled && !isSelected ? 'hover:bg-gray-100 dark:hover:bg-gray-700' : ''}
                ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              `}
            >
              {day.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}
