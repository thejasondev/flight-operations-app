import { format, parse, isValid } from 'date-fns';
import { es } from 'date-fns/locale/es';
import type { TimeState } from '../types/dateTime';

/**
 * Format date based on type
 */
export const formatDateByType = (date: Date, type: 'date' | 'time' | 'datetime'): string => {
  if (type === 'date') {
    return format(date, 'dd/MM/yyyy', { locale: es });
  } else if (type === 'time') {
    return format(date, 'HH:mm');
  } else {
    return format(date, 'dd/MM/yyyy HH:mm', { locale: es });
  }
};

/**
 * Parse date input based on type
 */
export const parseDateInput = (input: string, type: 'date' | 'time' | 'datetime'): Date | null => {
  try {
    if (type === 'time') {
      const timeRegex = /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/;
      if (timeRegex.test(input)) {
        const [hours, minutes] = input.split(':');
        const timeDate = new Date();
        timeDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);
        return timeDate;
      }
    } else if (type === 'date') {
      const parsedDate = parse(input, 'dd/MM/yyyy', new Date());
      if (isValid(parsedDate)) {
        return parsedDate;
      }
    }
    return null;
  } catch (error) {
    return null;
  }
};

/**
 * Extract time state from date
 */
export const extractTimeFromDate = (date: Date): TimeState => {
  return {
    hours: format(date, 'HH'),
    minutes: format(date, 'mm'),
  };
};

/**
 * Get current time as TimeState (HH:mm)
 */
export const getCurrentTimeState = (): TimeState => {
  const now = new Date();
  return {
    hours: format(now, 'HH'),
    minutes: format(now, 'mm'),
  };
};

/**
 * Create date with time
 */
export const createDateWithTime = (date: Date, timeState: TimeState): Date => {
  const combinedDate = new Date(date);
  combinedDate.setHours(parseInt(timeState.hours), parseInt(timeState.minutes));
  return combinedDate;
};

/**
 * Generate calendar days for a month
 */
export const generateCalendarDays = (currentMonth: Date): Date[] => {
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const firstDay = new Date(year, month, 1);

  const startDate = new Date(firstDay);
  startDate.setDate(startDate.getDate() - firstDay.getDay());

  const days = [];
  const currentDate = new Date(startDate);

  for (let i = 0; i < 42; i++) {
    days.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return days;
};

/**
 * Check if date is disabled based on constraints
 */
export const isDateDisabled = (day: Date, minDate?: Date, maxDate?: Date): boolean => {
  const dayWithoutTime = new Date(day.getFullYear(), day.getMonth(), day.getDate());
  const minDateWithoutTime = minDate
    ? new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate())
    : null;
  const maxDateWithoutTime = maxDate
    ? new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate())
    : null;

  return Boolean(
    (minDateWithoutTime && dayWithoutTime < minDateWithoutTime) ||
      (maxDateWithoutTime && dayWithoutTime > maxDateWithoutTime)
  );
};

/**
 * Get date status for styling
 */
export const getDateStatus = (day: Date, selectedDate: Date | null, currentMonth: Date) => {
  const isCurrentMonth = day.getMonth() === currentMonth.getMonth();
  const isSelected = Boolean(selectedDate && day.toDateString() === selectedDate.toDateString());
  const isToday = day.toDateString() === new Date().toDateString();

  return { isCurrentMonth, isSelected, isToday };
};

/**
 * Navigate month
 */
export const navigateMonth = (currentMonth: Date, direction: 'prev' | 'next'): Date => {
  const newDate = new Date(currentMonth);
  newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
  return newDate;
};

/**
 * Validate and constrain time values
 */
export const constrainTimeValue = (value: number, min: number, max: number): number => {
  return Math.max(min, Math.min(max, value));
};

/**
 * Increment/decrement time with wrapping
 */
export const adjustTimeValue = (current: number, increment: number, max: number): string => {
  const adjusted = (current + increment + max + 1) % (max + 1);
  return adjusted.toString().padStart(2, '0');
};
