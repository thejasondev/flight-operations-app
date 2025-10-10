import React from 'react';
import type { Flight } from '../FlightCard';
import OperationsTable from './OperationsTable';
import OperationsCards from './OperationsCards';
import { REPORT_LABELS } from '../../constants/reportConstants';

interface OperationsSectionProps {
  flight: Flight;
}

export default function OperationsSection({ flight }: OperationsSectionProps) {
  return (
    <div className="print-section mb-4 sm:mb-6">
      <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-900 dark:text-white print:text-black">
        {REPORT_LABELS.OPERATIONS}
      </h3>

      {/* Mobile View - Cards */}
      <OperationsCards flight={flight} />

      {/* Desktop View - Table */}
      <OperationsTable flight={flight} />
    </div>
  );
}
