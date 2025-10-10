/**
 * Constantes para el sistema de reportes
 */

export const REPORT_CONFIG = {
  SCROLL_AMOUNT: 50,
  SCROLL_PAGE_FACTOR: 0.8,
  PRINT_CLEANUP_DELAY: 1000,
} as const;

export const KEYBOARD_KEYS = {
  ESCAPE: 'Escape',
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  PAGE_UP: 'PageUp',
  PAGE_DOWN: 'PageDown',
  HOME: 'Home',
  END: 'End',
} as const;

export const REPORT_SECTIONS = {
  FLIGHT_INFO: 'flight-info',
  SCHEDULES: 'schedules',
  OPERATIONS: 'operations',
  NOTES: 'notes',
  FOOTER: 'footer',
} as const;

export const OPERATION_STATUS = {
  COMPLETED: 'completed',
  IN_PROGRESS: 'in_progress',
  PENDING: 'pending',
} as const;

export const REPORT_LABELS = {
  TITLE: 'REPORTE DE OPERACIONES DE VUELO',
  SUBTITLE: 'Sistema de Gestión de Operaciones Aéreas',
  FLIGHT_INFO: 'INFORMACIÓN DEL VUELO',
  SCHEDULES: 'HORARIOS PROGRAMADOS',
  OPERATIONS: 'REGISTRO DETALLADO DE OPERACIONES',
  NOTES: 'NOTAS Y OBSERVACIONES',
  DOCUMENT_INFO: 'INFORMACIÓN DEL DOCUMENTO',
  VALIDATION: 'VALIDACIÓN',
  COPYRIGHT: 'Sistema de Gestión de Operaciones Aéreas - Documento generado automáticamente',
} as const;

export const TABLE_HEADERS = {
  OPERATION: 'OPERACIÓN',
  START_TIME: 'HORA INICIO',
  END_TIME: 'HORA FIN',
  DURATION: 'DURACIÓN',
  STATUS: 'ESTADO',
} as const;

export const STATUS_LABELS = {
  COMPLETED: '✓ COMPLETADO',
  IN_PROGRESS: '🔄 EN PROGRESO',
  PENDING: '⏳ PENDIENTE',
  REGISTERED: '✓ Registrado',
  PUNCTUAL_EVENT: 'Evento Puntual',
  PUNCTUAL_OPERATION: '(Evento puntual)',
} as const;
