import React from 'react';
import type { Flight } from '../FlightCard';
import { REPORT_LABELS } from '../../constants/reportConstants';

interface NotesSectionProps {
  flight: Flight;
}

export default function NotesSection({ flight }: NotesSectionProps) {
  if (!flight.notes) return null;

  return (
    <div className="print-section print-notes mb-4 sm:mb-6">
      <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-900 dark:text-white print:text-black">
        {REPORT_LABELS.NOTES}
      </h3>
      <div className="p-3 sm:p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 print:bg-white print:border-black">
        <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 whitespace-pre-wrap print:text-black break-words leading-relaxed">
          {flight.notes}
        </p>
      </div>
    </div>
  );
}
