import React, { useEffect, useRef } from "react";
import type { Flight } from "./FlightCard";
import ThemeToggle from "./ThemeToggle";

interface ReportProps {
  flight: Flight;
  onClose: () => void;
}

export default function Report({ flight, onClose }: ReportProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    // Add print-specific styles before printing
    const printStyles = document.createElement('style');
    printStyles.textContent = `
      @media print {
        @page {
          margin: 1.5cm;
          size: A4;
        }
        
        body * {
          visibility: hidden;
        }
        
        .print-content, .print-content * {
          visibility: visible;
        }
        
        .print-content {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          background: white !important;
          color: black !important;
        }
        
        .print-header {
          border-bottom: 2px solid #000;
          margin-bottom: 20px;
          padding-bottom: 15px;
        }
        
        .print-section {
          margin-bottom: 25px;
          page-break-inside: avoid;
        }
        
        .print-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 15px;
        }
        
        .print-table th,
        .print-table td {
          border: 1px solid #000;
          padding: 8px;
          text-align: left;
          font-size: 11px;
        }
        
        .print-table th {
          background-color: #f5f5f5 !important;
          font-weight: bold;
        }
        
        .print-info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 20px;
        }
        
        .print-info-box {
          border: 1px solid #ccc;
          padding: 12px;
          background-color: #f9f9f9 !important;
        }
        
        .print-notes {
          border: 1px solid #ccc;
          padding: 12px;
          background-color: #f9f9f9 !important;
          margin-top: 20px;
        }
        
        .print-footer {
          margin-top: 30px;
          padding-top: 15px;
          border-top: 1px solid #ccc;
          font-size: 10px;
          color: #666;
        }
        
        .no-print {
          display: none !important;
        }
      }
    `;
    
    document.head.appendChild(printStyles);
    
    // Print and cleanup
    window.print();
    
    // Remove print styles after printing
    setTimeout(() => {
      document.head.removeChild(printStyles);
    }, 1000);
  };

  // Format time to show as HH:MM
  const formatTime = (time: string) => {
    if (!time) return "-";
    return time;
  };

  // Calculate duration between start and end times
  const calculateDuration = (start: string, end: string) => {
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

  // Check if operation is a single-time event
  const isSingleTimeOperation = (operation: string) => {
    return ["Cierre de Puertas", "Empuje", "Despegue"].includes(operation);
  };

  // Handle keyboard navigation including scroll
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
      return;
    }

    // Handle scroll with arrow keys
    if (scrollContainerRef.current) {
      const scrollAmount = 50;
      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault();
          scrollContainerRef.current.scrollBy({ top: -scrollAmount, behavior: 'smooth' });
          break;
        case 'ArrowDown':
          e.preventDefault();
          scrollContainerRef.current.scrollBy({ top: scrollAmount, behavior: 'smooth' });
          break;
        case 'PageUp':
          e.preventDefault();
          scrollContainerRef.current.scrollBy({ top: -window.innerHeight * 0.8, behavior: 'smooth' });
          break;
        case 'PageDown':
          e.preventDefault();
          scrollContainerRef.current.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' });
          break;
        case 'Home':
          e.preventDefault();
          scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
          break;
        case 'End':
          e.preventDefault();
          scrollContainerRef.current.scrollTo({ top: scrollContainerRef.current.scrollHeight, behavior: 'smooth' });
          break;
      }
    }
  };

  // Focus management and scroll setup
  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.focus();
    }

    // Prevent body scroll when modal is open
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  // Handle wheel scroll for better desktop experience
  const handleWheel = (e: React.WheelEvent) => {
    if (scrollContainerRef.current) {
      e.preventDefault();
      scrollContainerRef.current.scrollBy({
        top: e.deltaY,
        behavior: 'auto'
      });
    }
  };

  // Get the current date formatted
  const formattedDate = new Date().toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div 
      ref={modalRef}
      className="fixed inset-0 bg-black bg-opacity-50 z-50 print:static print:bg-transparent print:inset-auto"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      onKeyDown={handleKeyDown}
      onWheel={handleWheel}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-labelledby="report-title"
    >
      <div 
        ref={scrollContainerRef}
        className="h-full w-full overflow-y-auto overflow-x-hidden print:overflow-visible print:h-auto"
        style={{
          WebkitOverflowScrolling: 'touch', // iOS smooth scrolling
          scrollbarWidth: 'thin', // Firefox
          scrollbarColor: 'rgba(156, 163, 175, 0.5) transparent' // Firefox
        }}
      >
        <div className="min-h-full flex items-start justify-center p-2 sm:p-4 print:p-0 print:min-h-0">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-3 sm:p-6 lg:p-8 max-w-4xl w-full my-4 print:my-0 print:shadow-none print:p-0 print:max-w-none print:rounded-none">
        {/* Header - Mobile Optimized */}
        <div className="no-print mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
            <h2 id="report-title" className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              Reporte de Operaciones
            </h2>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-2">
              <div className="flex justify-center sm:justify-start">
                <ThemeToggle />
              </div>
              <div className="flex gap-2">
                <button
                  className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors text-sm sm:text-base font-medium"
                  onClick={handlePrint}
                >
                  <span className="hidden sm:inline">Imprimir Reporte</span>
                  <span className="sm:hidden">Imprimir</span>
                </button>
                <button
                  className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors text-sm sm:text-base font-medium"
                  onClick={onClose}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Printable Report Content */}
        <div className="print-content print:text-black print:bg-white">
          <div className="print-header mb-4 sm:mb-6 border-b pb-3 sm:pb-4 border-gray-200 print:border-black">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white print:text-black">
                  REPORTE DE OPERACIONES DE VUELO
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400 print:text-black mt-1">
                  Sistema de Gestión de Operaciones Aéreas
                </p>
              </div>
              <div className="text-left sm:text-right">
                <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 print:text-black font-medium">{formattedDate}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 print:text-black">
                  Generado: {new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>

            <div className="print-section print-info-grid grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 mb-4">
              <div className="print-info-box bg-gray-50 dark:bg-gray-700 p-3 sm:p-4 rounded-lg print:bg-gray-100 border border-gray-200 dark:border-gray-600 print:border-gray-300">
                <h3 className="text-base sm:text-lg font-semibold mb-2 text-gray-900 dark:text-white print:text-black">
                  📋 INFORMACIÓN DEL VUELO
                </h3>
                <div className="space-y-1 sm:space-y-2 text-sm sm:text-base text-gray-700 dark:text-gray-300 print:text-black">
                  <p className="break-words">
                    <span className="font-medium">Número de Vuelo:</span> <strong>{flight.flightNumber}</strong>
                  </p>
                  <p className="break-words">
                    <span className="font-medium">Aerolínea:</span> <strong>{flight.airline}</strong>
                  </p>
                  <p className="break-words">
                    <span className="font-medium">Destino:</span> <strong>{flight.destination}</strong>
                  </p>
                  {flight.date && (
                    <p className="break-words">
                      <span className="font-medium">Fecha de Operación:</span> <strong>{flight.date}</strong>
                    </p>
                  )}
                </div>
              </div>
              
              <div className="print-info-box bg-gray-50 dark:bg-gray-700 p-3 sm:p-4 rounded-lg print:bg-gray-100 border border-gray-200 dark:border-gray-600 print:border-gray-300">
                <h3 className="text-base sm:text-lg font-semibold mb-2 text-gray-900 dark:text-white print:text-black">
                  ⏰ HORARIOS PROGRAMADOS
                </h3>
                <div className="space-y-1 sm:space-y-2 text-sm sm:text-base text-gray-700 dark:text-gray-300 print:text-black">
                  <p>
                    <span className="font-medium">ETA (Hora Estimada de Arribo):</span> <strong>{flight.eta}</strong>
                  </p>
                  <p>
                    <span className="font-medium">ETD (Hora Estimada de Salida):</span> <strong>{flight.etd}</strong>
                  </p>
                  {flight.ata && (
                    <p>
                      <span className="font-medium">ATA (Hora Real de Arribo):</span> <strong>{flight.ata}</strong>
                    </p>
                  )}
                  {flight.atd && (
                    <p>
                      <span className="font-medium">ATD (Hora Real de Salida):</span> <strong>{flight.atd}</strong>
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="print-section mb-4 sm:mb-6">
            <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-900 dark:text-white print:text-black">
              📊 REGISTRO DETALLADO DE OPERACIONES
            </h3>

            {/* Mobile View - Cards */}
            <div className="block lg:hidden space-y-3">
              {flight.operations &&
                Object.entries(flight.operations).map(
                  ([operation, times]) => (
                    <div
                      key={operation}
                      className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg border border-gray-200 dark:border-gray-600 print:bg-white print:border-black"
                    >
                      <h4 className="font-semibold text-gray-900 dark:text-white print:text-black mb-2 text-sm">
                        {operation}
                      </h4>
                      {isSingleTimeOperation(operation) ? (
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400 print:text-black">Hora del Evento:</span>
                            <span className="font-medium text-gray-900 dark:text-white print:text-black">
                              {formatTime(times.start)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400 print:text-black">Estado:</span>
                            <span className="text-green-600 dark:text-green-400 print:text-black font-medium">
                              {times.start ? '✓ Registrado' : 'Pendiente'}
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div>
                            <span className="block text-gray-600 dark:text-gray-400 print:text-black mb-1">Inicio:</span>
                            <span className="font-medium text-gray-900 dark:text-white print:text-black">
                              {formatTime(times.start)}
                            </span>
                          </div>
                          <div>
                            <span className="block text-gray-600 dark:text-gray-400 print:text-black mb-1">Fin:</span>
                            <span className="font-medium text-gray-900 dark:text-white print:text-black">
                              {formatTime(times.end)}
                            </span>
                          </div>
                          <div className="col-span-2 pt-2 border-t border-gray-200 dark:border-gray-600 print:border-black">
                            <span className="text-gray-600 dark:text-gray-400 print:text-black">Duración: </span>
                            <span className="font-medium text-gray-900 dark:text-white print:text-black">
                              {calculateDuration(times.start, times.end)}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                )}
            </div>

            {/* Desktop View - Table */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="print-table min-w-full border-collapse border border-gray-300 dark:border-gray-600 print:border-black">
                <thead className="bg-gray-50 dark:bg-gray-700 print:bg-gray-100">
                  <tr>
                    <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 print:text-black print:border-black uppercase tracking-wider">
                      OPERACIÓN
                    </th>
                    <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 print:text-black print:border-black uppercase tracking-wider">
                      HORA INICIO
                    </th>
                    <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 print:text-black print:border-black uppercase tracking-wider">
                      HORA FIN
                    </th>
                    <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 print:text-black print:border-black uppercase tracking-wider">
                      DURACIÓN
                    </th>
                    <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 print:text-black print:border-black uppercase tracking-wider">
                      ESTADO
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {flight.operations &&
                    Object.entries(flight.operations).map(
                      ([operation, times], index) => (
                        <tr
                          key={operation}
                          className={`${
                            index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700'
                          } border-t border-gray-300 dark:border-gray-600 print:border-black print:bg-white print:text-black`}
                        >
                          <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm font-medium text-gray-900 dark:text-white print:text-black print:border-black">
                            {operation}
                            {isSingleTimeOperation(operation) && (
                              <span className="block text-xs text-gray-500 dark:text-gray-400 print:text-gray-600 mt-1">
                                (Evento puntual)
                              </span>
                            )}
                          </td>
                          {isSingleTimeOperation(operation) ? (
                            <>
                              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 print:text-black print:border-black font-medium">
                                {formatTime(times.start)}
                              </td>
                              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 print:text-black print:border-black">
                                {formatTime(times.start)}
                              </td>
                              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 print:text-black print:border-black">
                                Evento Puntual
                              </td>
                              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm print:text-black print:border-black">
                                {times.start ? (
                                  <span className="text-green-600 dark:text-green-400 print:text-black font-medium">
                                    ✓ COMPLETADO
                                  </span>
                                ) : (
                                  <span className="text-red-600 dark:text-red-400 print:text-black">
                                    ⏳ PENDIENTE
                                  </span>
                                )}
                              </td>
                            </>
                          ) : (
                            <>
                              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 print:text-black print:border-black font-medium">
                                {formatTime(times.start)}
                              </td>
                              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 print:text-black print:border-black font-medium">
                                {formatTime(times.end)}
                              </td>
                              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 print:text-black print:border-black font-medium">
                                {calculateDuration(times.start, times.end)}
                              </td>
                              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm print:text-black print:border-black">
                                {times.start && times.end ? (
                                  <span className="text-green-600 dark:text-green-400 print:text-black font-medium">
                                    ✓ COMPLETADO
                                  </span>
                                ) : times.start ? (
                                  <span className="text-yellow-600 dark:text-yellow-400 print:text-black font-medium">
                                    🔄 EN PROGRESO
                                  </span>
                                ) : (
                                  <span className="text-red-600 dark:text-red-400 print:text-black">
                                    ⏳ PENDIENTE
                                  </span>
                                )}
                              </td>
                            </>
                          )}
                        </tr>
                      )
                    )}
                </tbody>
              </table>
            </div>
          </div>

          {flight.notes && (
            <div className="print-section print-notes mb-4 sm:mb-6">
              <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-900 dark:text-white print:text-black">
                📝 NOTAS Y OBSERVACIONES
              </h3>
              <div className="p-3 sm:p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 print:bg-white print:border-black">
                <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 whitespace-pre-wrap print:text-black break-words leading-relaxed">
                  {flight.notes}
                </p>
              </div>
            </div>
          )}

          <div className="print-footer mt-6 sm:mt-8 print:mt-12 text-gray-500 dark:text-gray-400 print:text-black text-xs sm:text-sm border-t border-gray-200 dark:border-gray-700 print:border-black pt-3 sm:pt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="font-medium">📄 INFORMACIÓN DEL DOCUMENTO</p>
                <p className="break-words">Reporte generado: {new Date().toLocaleString('es-ES')}</p>
                <p className="mt-1">Sistema: Panel de Operaciones Aéreas v1.0</p>
              </div>
              <div className="text-left sm:text-right">
                <p className="font-medium">🔒 VALIDACIÓN</p>
                <p>Este es un documento oficial de operaciones de vuelo.</p>
                <p className="mt-1">ID de Vuelo: {flight.id}</p>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-300 text-center">
              <p className="text-xs text-gray-400 print:text-black">
                © {new Date().getFullYear()} Sistema de Gestión de Operaciones Aéreas - Documento generado automáticamente
              </p>
            </div>
          </div>
        </div>
          </div>
        </div>
      </div>
    </div>
  );
}
