/**
 * TPT (Tiempo en Tierra) Utilities
 * Funciones para calcular y gestionar el tiempo en tierra de los vuelos
 */

export interface TPTData {
  eta: string;           // Estimated Time of Arrival
  etd: string;           // Estimated Time of Departure
  ata?: string;          // Actual Time of Arrival
  atd?: string;          // Actual Time of Departure
  tptMinutes: number;    // TPT en minutos
  tptFormatted: string;  // TPT formateado (ej: "2h 30m")
}

export interface FlightDelayAnalysis {
  arrivalDelay: {
    minutes: number;
    status: 'on-time' | 'early' | 'delayed';
    formatted: string;
  };
  departureDelay: {
    minutes: number;
    status: 'on-time' | 'early' | 'delayed';
    formatted: string;
  };
  overallStatus: 'on-time' | 'early' | 'delayed';
  overallFormatted: string;
}

export interface TPTStatus {
  phase: 'waiting' | 'active' | 'completed' | 'overdue';
  remainingMinutes: number;
  remainingFormatted: string;
  progressPercentage: number;
  delayMinutes: number;
  delayStatus: 'on-time' | 'early' | 'delayed';
  delayFormatted: string;
  // Nueva propiedad para análisis detallado
  delayAnalysis?: FlightDelayAnalysis;
}

/**
 * Convierte tiempo HH:MM a minutos desde medianoche
 */
export function timeToMinutes(time: string): number {
  if (!time || !time.includes(':')) return 0;
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

/**
 * Convierte minutos a formato HH:MM
 */
export function minutesToTime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
}

/**
 * Formatea minutos a formato legible (ej: "2h 30m", "45m")
 */
export function formatDuration(minutes: number): string {
  if (minutes < 0) return '0m';
  
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (hours === 0) {
    return `${mins}m`;
  } else if (mins === 0) {
    return `${hours}h`;
  } else {
    return `${hours}h ${mins}m`;
  }
}

/**
 * Analiza el retraso de un tiempo específico (llegada o salida)
 */
export function analyzeTimeDelay(
  estimatedTime: string,
  actualTime: string,
  type: 'arrival' | 'departure'
): { minutes: number; status: 'on-time' | 'early' | 'delayed'; formatted: string } {
  const estimatedMinutes = timeToMinutes(estimatedTime);
  const actualMinutes = timeToMinutes(actualTime);
  
  let delayMinutes = actualMinutes - estimatedMinutes;
  
  // Manejar cruce de medianoche
  if (delayMinutes < -12 * 60) {
    delayMinutes += 24 * 60;
  } else if (delayMinutes > 12 * 60) {
    delayMinutes -= 24 * 60;
  }
  
  let status: 'on-time' | 'early' | 'delayed';
  let formatted: string;
  
  const tolerance = type === 'arrival' ? 10 : 5; // 10 min para llegada, 5 min para salida
  
  if (delayMinutes <= -tolerance) {
    status = 'early';
    formatted = `Adelantado ${formatDuration(Math.abs(delayMinutes))}`;
  } else if (delayMinutes >= tolerance) {
    status = 'delayed';
    formatted = `Retrasado ${formatDuration(delayMinutes)}`;
  } else {
    status = 'on-time';
    formatted = 'A tiempo';
  }
  
  return { minutes: delayMinutes, status, formatted };
}

/**
 * Realiza un análisis completo de retrasos de vuelo
 */
export function analyzeFlightDelays(
  eta: string,
  etd: string,
  ata?: string,
  atd?: string
): FlightDelayAnalysis | undefined {
  // Necesitamos al menos ATA para hacer análisis
  if (!ata) return undefined;
  
  const arrivalDelay = analyzeTimeDelay(eta, ata, 'arrival');
  
  let departureDelay: {
    minutes: number;
    status: 'on-time' | 'early' | 'delayed';
    formatted: string;
  } = {
    minutes: 0,
    status: 'on-time',
    formatted: 'Pendiente'
  };
  
  if (atd) {
    departureDelay = analyzeTimeDelay(etd, atd, 'departure');
  }
  
  // Determinar estado general (prioridad a la salida si está disponible)
  let overallStatus: 'on-time' | 'early' | 'delayed';
  let overallFormatted: string;
  
  if (atd) {
    // Si tenemos ATD, el estado general se basa en la salida
    overallStatus = departureDelay.status;
    overallFormatted = departureDelay.formatted;
  } else {
    // Si solo tenemos ATA, el estado se basa en la llegada
    overallStatus = arrivalDelay.status;
    overallFormatted = arrivalDelay.formatted;
  }
  
  return {
    arrivalDelay,
    departureDelay,
    overallStatus,
    overallFormatted
  };
}

/**
 * Calcula el TPT basado en ETA y ETD
 */
export function calculateTPT(eta: string, etd: string): TPTData {
  const etaMinutes = timeToMinutes(eta);
  const etdMinutes = timeToMinutes(etd);
  
  let tptMinutes = etdMinutes - etaMinutes;
  
  // Manejar caso de vuelo que cruza medianoche
  if (tptMinutes < 0) {
    tptMinutes += 24 * 60; // Agregar 24 horas
  }
  
  // TPT mínimo de 30 minutos, máximo de 8 horas
  tptMinutes = Math.max(30, Math.min(tptMinutes, 8 * 60));
  
  return {
    eta,
    etd,
    tptMinutes,
    tptFormatted: formatDuration(tptMinutes)
  };
}

/**
 * Calcula el estado actual del TPT con análisis detallado de retrasos
 */
export function calculateTPTStatus(
  tptData: TPTData,
  actualArrivalTime?: string,
  actualDepartureTime?: string,
  currentTime?: Date
): TPTStatus {
  const now = currentTime || new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  
  // Realizar análisis detallado de retrasos si hay datos disponibles
  const delayAnalysis = analyzeFlightDelays(
    tptData.eta,
    tptData.etd,
    actualArrivalTime,
    actualDepartureTime
  );
  
  // Si no hay tiempo real de arribo, estamos esperando
  if (!actualArrivalTime) {
    return {
      phase: 'waiting',
      remainingMinutes: tptData.tptMinutes,
      remainingFormatted: tptData.tptFormatted,
      progressPercentage: 0,
      delayMinutes: 0,
      delayStatus: 'on-time',
      delayFormatted: 'A tiempo',
      delayAnalysis
    };
  }
  
  const actualArrivalMinutes = timeToMinutes(actualArrivalTime);
  
  // Si ya salió, calcular el análisis final
  if (actualDepartureTime) {
    const actualDepartureMinutes = timeToMinutes(actualDepartureTime);
    const etdMinutes = timeToMinutes(tptData.etd);
    const delayMinutes = actualDepartureMinutes - etdMinutes;
    
    // Usar el análisis detallado para el estado general
    const delayStatus = delayAnalysis?.overallStatus || 'on-time';
    const delayFormatted = delayAnalysis?.overallFormatted || 'A tiempo';
    
    return {
      phase: 'completed',
      remainingMinutes: 0,
      remainingFormatted: 'Completado',
      progressPercentage: 100,
      delayMinutes,
      delayStatus,
      delayFormatted,
      delayAnalysis
    };
  }
  
  // TPT activo - calculando tiempo restante
  const elapsedMinutes = currentMinutes - actualArrivalMinutes;
  const remainingMinutes = Math.max(0, tptData.tptMinutes - elapsedMinutes);
  const progressPercentage = Math.min(100, (elapsedMinutes / tptData.tptMinutes) * 100);
  
  // Determinar si está retrasado basado en proyección
  const etdMinutes = timeToMinutes(tptData.etd);
  const projectedDepartureMinutes = actualArrivalMinutes + tptData.tptMinutes;
  const delayMinutes = projectedDepartureMinutes - etdMinutes;
  
  let delayStatus: 'on-time' | 'early' | 'delayed';
  let delayFormatted: string;
  
  if (delayMinutes <= -5) {
    delayStatus = 'early';
    delayFormatted = `Adelantado ${formatDuration(Math.abs(delayMinutes))}`;
  } else if (delayMinutes >= 5) {
    delayStatus = 'delayed';
    delayFormatted = `Retrasado ${formatDuration(delayMinutes)}`;
  } else {
    delayStatus = 'on-time';
    delayFormatted = 'A tiempo';
  }
  
  const phase = remainingMinutes === 0 ? 'overdue' : 'active';
  
  return {
    phase,
    remainingMinutes,
    remainingFormatted: formatDuration(remainingMinutes),
    progressPercentage,
    delayMinutes,
    delayStatus,
    delayFormatted,
    delayAnalysis
  };
}

/**
 * Obtiene el color apropiado para el estado de delay
 */
export function getDelayStatusColor(status: 'on-time' | 'early' | 'delayed'): {
  bg: string;
  text: string;
  border: string;
} {
  switch (status) {
    case 'early':
      return {
        bg: 'bg-green-50 dark:bg-green-900/20',
        text: 'text-green-700 dark:text-green-300',
        border: 'border-green-200 dark:border-green-700'
      };
    case 'delayed':
      return {
        bg: 'bg-red-50 dark:bg-red-900/20',
        text: 'text-red-700 dark:text-red-300',
        border: 'border-red-200 dark:border-red-700'
      };
    default:
      return {
        bg: 'bg-blue-50 dark:bg-blue-900/20',
        text: 'text-blue-700 dark:text-blue-300',
        border: 'border-blue-200 dark:border-blue-700'
      };
  }
}

/**
 * Obtiene el color para la barra de progreso del TPT
 */
export function getTPTProgressColor(phase: TPTStatus['phase'], progressPercentage: number): string {
  switch (phase) {
    case 'waiting':
      return 'bg-gray-400';
    case 'active':
      if (progressPercentage < 50) return 'bg-green-500';
      if (progressPercentage < 80) return 'bg-yellow-500';
      return 'bg-orange-500';
    case 'overdue':
      return 'bg-red-500';
    case 'completed':
      return 'bg-blue-500';
    default:
      return 'bg-gray-400';
  }
}
