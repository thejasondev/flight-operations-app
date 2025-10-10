import React from 'react';
import type { Flight } from '../FlightCard';
import { getFormattedDateTime } from '../../utils/reportUtils';
import { REPORT_LABELS } from '../../constants/reportConstants';

interface ReportFooterProps {
  flight: Flight;
}

export default function ReportFooter({ flight }: ReportFooterProps) {
  const currentDateTime = getFormattedDateTime();
  const currentYear = new Date().getFullYear();

  return (
    <div className="print-footer mt-6 sm:mt-8 print:mt-12 text-gray-500 dark:text-gray-400 print:text-black text-xs sm:text-sm border-t border-gray-200 dark:border-gray-700 print:border-black pt-3 sm:pt-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <p className="font-medium">{REPORT_LABELS.DOCUMENT_INFO}</p>
          <p className="break-words">Reporte generado: {currentDateTime}</p>
          <p className="mt-1">Sistema: Panel de Operaciones Aéreas v1.0</p>
        </div>
        <div className="text-left sm:text-right">
          <p className="font-medium">{REPORT_LABELS.VALIDATION}</p>
          <p>Este es un documento oficial de operaciones de vuelo.</p>
          <p className="mt-1">ID de Vuelo: {flight.id}</p>
        </div>
      </div>
      <div className="mt-4 pt-3 border-t border-gray-300 text-center">
        <p className="text-xs text-gray-400 print:text-black">
          © {currentYear} {REPORT_LABELS.COPYRIGHT}
        </p>
      </div>
    </div>
  );
}
