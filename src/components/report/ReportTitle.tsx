import React from 'react';
import { getFormattedDate, getFormattedTime } from '../../utils/reportUtils';
import { REPORT_LABELS } from '../../constants/reportConstants';

export default function ReportTitle() {
  const formattedDate = getFormattedDate();
  const formattedTime = getFormattedTime();

  return (
    <div className="print-header mb-4 sm:mb-6 border-b pb-3 sm:pb-4 border-gray-200 print:border-black">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white print:text-black">
            {REPORT_LABELS.TITLE}
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 print:text-black mt-1">
            {REPORT_LABELS.SUBTITLE}
          </p>
        </div>
        <div className="text-left sm:text-right">
          <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 print:text-black font-medium">
            {formattedDate}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 print:text-black">
            Generado: {formattedTime}
          </p>
        </div>
      </div>
    </div>
  );
}
