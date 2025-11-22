// Types and constants for DateTimeSelector components

export interface DateTimeSelectorProps {
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
  icon?: React.ReactNode;
}

export interface TimeState {
  hours: string;
  minutes: string;
}

export interface CalendarProps {
  selectedDate: Date | null;
  currentMonth: Date;
  minDate?: Date;
  maxDate?: Date;
  onDateSelect: (date: Date) => void;
  onNavigateMonth: (direction: 'prev' | 'next') => void;
}

export interface TimePickerProps {
  selectedTime: TimeState;
  onTimeChange: (hours: string, minutes: string) => void;
  onClose?: () => void;
}

export interface DateTimeInputProps {
  label: string;
  value: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  isOpen: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onToggleOpen: () => void;
  onFocus: () => void;
  type: 'date' | 'time' | 'datetime';
  className?: string;
  icon?: React.ReactNode;
}

// Constants
export const DAYS_OF_WEEK = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'] as const;

export const DEFAULT_TIME: TimeState = {
  hours: '14',
  minutes: '00'
};

export const TIME_CONSTRAINTS = {
  MIN_HOUR: 0,
  MAX_HOUR: 23,
  MIN_MINUTE: 0,
  MAX_MINUTE: 59,
  MINUTE_STEP: 15
} as const;
