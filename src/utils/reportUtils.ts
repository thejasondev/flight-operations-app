/**
 * Utilidades para el manejo de reportes de vuelo
 */

/**
 * Formatea una hora para mostrar como HH:MM
 */
export const formatTime = (time: string): string => {
  if (!time) return "-";
  return time;
};

/**
 * Calcula la duración entre dos horas
 */
export const calculateDuration = (start: string, end: string): string => {
  if (!start || !end) return "-";

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
    return "-";
  }
};

/**
 * Verifica si una operación es de tiempo único (puntual)
 */
export const isSingleTimeOperation = (operation: string): boolean => {
  return ["Cierre de Puertas", "Empuje", "Despegue"].includes(operation);
};

/**
 * Obtiene la fecha actual formateada en español
 */
export const getFormattedDate = (): string => {
  return new Date().toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

/**
 * Obtiene la hora actual formateada
 */
export const getFormattedTime = (): string => {
  return new Date().toLocaleTimeString('es-ES', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
};

/**
 * Obtiene la fecha y hora completa formateada
 */
export const getFormattedDateTime = (): string => {
  return new Date().toLocaleString('es-ES');
};
