import { useState, useRef, useEffect } from 'react';
import { 
  formatDateByType, 
  parseDateInput, 
  extractTimeFromDate,
  createDateWithTime,
  navigateMonth as navigateMonthUtil
} from '../utils/dateTimeUtils';
import { DEFAULT_TIME, type TimeState } from '../types/dateTime';

export const useDateTimeSelector = (
  value: Date | null,
  onChange: (date: Date | null) => void,
  type: 'date' | 'time' | 'datetime'
) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(value);
  const [selectedTime, setSelectedTime] = useState<TimeState>(DEFAULT_TIME);
  const containerRef = useRef<HTMLDivElement>(null);

  // Update input value when external value changes
  useEffect(() => {
    if (value) {
      setInputValue(formatDateByType(value, type));
      setSelectedDate(value);
      
      if (type === 'time' || type === 'datetime') {
        setSelectedTime(extractTimeFromDate(value));
      }
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

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    const parsedDate = parseDateInput(newValue, type);
    if (parsedDate) {
      onChange(parsedDate);
    }
  };

  // Handle time changes
  const handleTimeChange = (hours: string, minutes: string) => {
    setSelectedTime({ hours, minutes });
    
    if (type === 'time') {
      const timeDate = new Date();
      timeDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);
      onChange(timeDate);
      setInputValue(`${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`);
    } else if (type === 'datetime' && selectedDate) {
      const combinedDate = createDateWithTime(selectedDate, { hours, minutes });
      onChange(combinedDate);
      setInputValue(formatDateByType(combinedDate, type));
    }
  };

  // Handle date selection
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    
    if (type === 'date') {
      onChange(date);
      setInputValue(formatDateByType(date, type));
      setIsOpen(false);
    } else if (type === 'datetime') {
      const combinedDate = createDateWithTime(date, selectedTime);
      onChange(combinedDate);
      setInputValue(formatDateByType(combinedDate, type));
    }
  };

  // Handle month navigation
  const handleNavigateMonth = (direction: 'prev' | 'next') => {
    const current = selectedDate || new Date();
    const newDate = navigateMonthUtil(current, direction);
    setSelectedDate(newDate);
  };

  // Toggle dropdown
  const toggleOpen = () => setIsOpen(!isOpen);

  // Handle focus
  const handleFocus = () => setIsOpen(true);

  return {
    // State
    isOpen,
    inputValue,
    selectedDate,
    selectedTime,
    containerRef,
    
    // Handlers
    handleInputChange,
    handleTimeChange,
    handleDateSelect,
    handleNavigateMonth,
    toggleOpen,
    handleFocus,
    setIsOpen
  };
};
