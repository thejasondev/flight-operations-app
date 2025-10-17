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

export interface DelayInfo {
  minutes: number;
  status: 'on-time' | 'early' | 'delayed';
  formatted: string;
  criticality?: {
    level: 'low' | 'medium' | 'high' | 'critical';
    description: string;
  };
}

export interface FlightDelayAnalysis {
  arrivalDelay: DelayInfo;
  departureDelay: DelayInfo;
  overallStatus: 'on-time' | 'early' | 'delayed';
  overallFormatted: string;
  summary: {
    totalDelayMinutes: number;
    impactLevel: 'minimal' | 'moderate' | 'significant' | 'severe';
    recommendation: string;
  };
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
 * Analiza el desfasaje exacto entre tiempo estimado y real
 * Refleja la diferencia real sin tolerancias que enmascaren la información
 */
export function analyzeTimeDelay(
  estimatedTime: string,
  actualTime: string,
  type: 'arrival' | 'departure'
): { minutes: number; status: 'on-time' | 'early' | 'delayed'; formatted: string } {
  // Validación de entrada
  if (!estimatedTime || !actualTime) {
    return { minutes: 0, status: 'on-time', formatted: 'Datos insuficientes' };
  }

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
  
  // Análisis exacto basado en desfasaje real
  if (delayMinutes === 0) {
    // Exactamente puntual
    status = 'on-time';
    formatted = 'Puntual';
  } else if (delayMinutes < 0) {
    // Adelantado (siempre positivo para operaciones)
    status = 'early';
    formatted = `Adelantado ${formatDuration(Math.abs(delayMinutes))}`;
  } else {
    // Retrasado (problema operacional)
    status = 'delayed';
    formatted = `Retrasado ${formatDuration(delayMinutes)}`;
  }
  
  return { minutes: delayMinutes, status, formatted };
}

/**
 * Obtiene el nivel de criticidad basado en el impacto operacional
 * Solo los retrasos se consideran problemáticos
 */
export function getDelayCriticality(delayMinutes: number, type: 'arrival' | 'departure'): {
  level: 'low' | 'medium' | 'high' | 'critical';
  description: string;
} {
  // Si es adelantado o puntual, siempre es operación normal
  if (delayMinutes <= 0) {
    return { 
      level: 'low', 
      description: delayMinutes === 0 ? 'Operación puntual' : 'Operación adelantada - Excelente' 
    };
  }
  
  // Solo evaluar criticidad en caso de retrasos (delayMinutes > 0)
  if (type === 'arrival') {
    if (delayMinutes <= 15) return { level: 'low', description: 'Retraso menor - Monitorear' };
    if (delayMinutes <= 30) return { level: 'medium', description: 'Retraso moderado - Atención requerida' };
    if (delayMinutes <= 60) return { level: 'high', description: 'Retraso significativo - Acción inmediata' };
    return { level: 'critical', description: 'Retraso crítico - Investigación urgente' };
  } else {
    if (delayMinutes <= 5) return { level: 'low', description: 'Retraso menor - Monitorear' };
    if (delayMinutes <= 15) return { level: 'medium', description: 'Retraso moderado - Atención requerida' };
    if (delayMinutes <= 30) return { level: 'high', description: 'Retraso significativo - Acción inmediata' };
    return { level: 'critical', description: 'Retraso crítico - Investigación urgente' };
  }
}

/**
 * Realiza un análisis completo de retrasos de vuelo con métricas profesionales
 */
export function analyzeFlightDelays(
  eta: string,
  etd: string,
  ata?: string,
  atd?: string
): FlightDelayAnalysis | undefined {
  // Necesitamos al menos ATA para hacer análisis
  if (!ata) return undefined;
  
  // Análisis de llegada con criticidad
  const arrivalAnalysis = analyzeTimeDelay(eta, ata, 'arrival');
  const arrivalCriticality = getDelayCriticality(arrivalAnalysis.minutes, 'arrival');
  
  const arrivalDelay: DelayInfo = {
    ...arrivalAnalysis,
    criticality: arrivalCriticality
  };
  
  // Análisis de salida con criticidad
  let departureDelay: DelayInfo = {
    minutes: 0,
    status: 'on-time',
    formatted: 'Pendiente'
  };
  
  if (atd) {
    const departureAnalysis = analyzeTimeDelay(etd, atd, 'departure');
    const departureCriticality = getDelayCriticality(departureAnalysis.minutes, 'departure');
    
    departureDelay = {
      ...departureAnalysis,
      criticality: departureCriticality
    };
  }
  
  // Determinar estado general con lógica mejorada
  let overallStatus: 'on-time' | 'early' | 'delayed';
  let overallFormatted: string;
  
  if (atd) {
    // Si tenemos ATD, el estado general se basa en la salida (más crítico)
    overallStatus = departureDelay.status;
    overallFormatted = departureDelay.formatted;
  } else {
    // Si solo tenemos ATA, el estado se basa en la llegada
    overallStatus = arrivalDelay.status;
    
    // Proyección inteligente para salida basada en llegada
    const projectedDepartureDelay = arrivalDelay.minutes;
    if (projectedDepartureDelay > 15) {
      overallFormatted = `Proyección: Salida retrasada ~${formatDuration(projectedDepartureDelay)}`;
    } else if (projectedDepartureDelay < -15) {
      overallFormatted = `Proyección: Salida adelantada ~${formatDuration(Math.abs(projectedDepartureDelay))}`;
    } else {
      overallFormatted = arrivalDelay.formatted;
    }
  }
  
  // Calcular resumen e impacto general - Solo retrasos son problemáticos
  const arrivalDelayActual = Math.max(0, arrivalDelay.minutes); // Solo retrasos positivos
  const departureDelayActual = atd ? Math.max(0, departureDelay.minutes) : 0;
  const totalDelayMinutes = Math.max(arrivalDelayActual, departureDelayActual);
  
  let impactLevel: 'minimal' | 'moderate' | 'significant' | 'severe';
  let recommendation: string;
  
  // Evaluar impacto solo basado en retrasos reales
  if (totalDelayMinutes === 0) {
    impactLevel = 'minimal';
    recommendation = 'Operación puntual o adelantada - Excelente rendimiento';
  } else if (totalDelayMinutes <= 15) {
    impactLevel = 'minimal';
    recommendation = 'Retraso menor - Continuar monitoreo normal';
  } else if (totalDelayMinutes <= 30) {
    impactLevel = 'moderate';
    recommendation = 'Retraso moderado - Monitorear operaciones subsecuentes';
  } else if (totalDelayMinutes <= 60) {
    impactLevel = 'significant';
    recommendation = 'Retraso significativo - Revisar causas y ajustar planificación';
  } else {
    impactLevel = 'severe';
    recommendation = 'Retraso crítico - Investigación urgente y medidas correctivas';
  }
  
  return {
    arrivalDelay,
    departureDelay,
    overallStatus,
    overallFormatted,
    summary: {
      totalDelayMinutes,
      impactLevel,
      recommendation
    }
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
