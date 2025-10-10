// Time utilities for flight operations

/**
 * Get current time in HH:MM format
 */
export const getCurrentTimeString = (): string => {
  const now = new Date();
  return now.toTimeString().split(" ")[0].substring(0, 5); // Only HH:MM
};

/**
 * Calculate duration between start and end times
 * Handles crossing midnight scenarios
 */
export const calculateDuration = (start: string, end: string): string => {
  if (!start || !end) return "";

  try {
    // Ensure we're working with HH:MM format
    const startFormatted = start.length === 5 ? start : start.substring(0, 5);
    const endFormatted = end.length === 5 ? end : end.substring(0, 5);
    
    const startTime = new Date(`1970-01-01T${startFormatted}:00`);
    const endTime = new Date(`1970-01-01T${endFormatted}:00`);

    const diffMs = endTime.getTime() - startTime.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    // Handle negative duration (crossing midnight)
    if (diffMins < 0) {
      const adjustedDiffMins = diffMins + (24 * 60); // Add 24 hours
      const hours = Math.floor(adjustedDiffMins / 60);
      const mins = adjustedDiffMins % 60;
      return `${hours}h ${mins}m`;
    }

    const hours = Math.floor(diffMins / 60);
    const mins = diffMins % 60;

    return `${hours}h ${mins}m`;
  } catch (error) {
    return "";
  }
};

/**
 * Validate time format (HH:MM)
 */
export const isValidTimeFormat = (time: string): boolean => {
  const timeRegex = /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/;
  return timeRegex.test(time);
};

/**
 * Format time to ensure HH:MM format
 */
export const formatTime = (time: string): string => {
  if (!time) return "";
  return time.length === 5 ? time : time.substring(0, 5);
};
