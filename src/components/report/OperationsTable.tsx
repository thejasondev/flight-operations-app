import React from 'react';
import type { Flight } from '../FlightCard';
import { formatTime, calculateDuration, isSingleTimeOperation } from '../../utils/reportUtils';
import { TABLE_HEADERS, STATUS_LABELS } from '../../constants/reportConstants';

interface OperationsTableProps {
  flight: Flight;
}

export default function OperationsTable({ flight }: OperationsTableProps) {
  if (!flight.operations) return null;

  return (
    <div className="hidden lg:block print:block overflow-x-auto print:overflow-visible">
      <table className="print-table min-w-full border-collapse border border-gray-300 dark:border-gray-600 print:border-black">
        <thead className="bg-gray-50 dark:bg-gray-700 print:bg-gray-100">
          <tr>
            <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 print:text-black print:border-black uppercase tracking-wider">
              {TABLE_HEADERS.OPERATION}
            </th>
            <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 print:text-black print:border-black uppercase tracking-wider">
              {TABLE_HEADERS.START_TIME}
            </th>
            <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 print:text-black print:border-black uppercase tracking-wider">
              {TABLE_HEADERS.END_TIME}
            </th>
            <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 print:text-black print:border-black uppercase tracking-wider">
              {TABLE_HEADERS.DURATION}
            </th>
            <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 print:text-black print:border-black uppercase tracking-wider">
              {TABLE_HEADERS.STATUS}
            </th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(flight.operations).map(([operation, times], index) => (
            <tr
              key={operation}
              className={`${
                index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700'
              } border-t border-gray-300 dark:border-gray-600 print:border-black print:bg-white print:text-black`}
            >
              <td className="operation-name border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm font-medium text-gray-900 dark:text-white print:text-black print:border-black">
                {operation}
                {isSingleTimeOperation(operation) && (
                  <span className="block text-xs text-gray-500 dark:text-gray-400 print:text-gray-600 mt-1">
                    {STATUS_LABELS.PUNCTUAL_OPERATION}
                  </span>
                )}
              </td>
              {isSingleTimeOperation(operation) ? (
                <>
                  <td className="operation-time border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 print:text-black print:border-black font-medium">
                    {formatTime(times.start)}
                  </td>
                  <td className="operation-time border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 print:text-black print:border-black">
                    {formatTime(times.start)}
                  </td>
                  <td className="operation-duration border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 print:text-black print:border-black">
                    {STATUS_LABELS.PUNCTUAL_EVENT}
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm print:text-black print:border-black">
                    {times.start ? (
                      <span className="text-green-600 dark:text-green-400 print:text-black font-medium">
                        {STATUS_LABELS.COMPLETED}
                      </span>
                    ) : (
                      <span className="text-red-600 dark:text-red-400 print:text-black">
                        {STATUS_LABELS.PENDING}
                      </span>
                    )}
                  </td>
                </>
              ) : (
                <>
                  <td className="operation-time border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 print:text-black print:border-black font-medium">
                    {formatTime(times.start)}
                  </td>
                  <td className="operation-time border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 print:text-black print:border-black font-medium">
                    {formatTime(times.end)}
                  </td>
                  <td className="operation-duration border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 print:text-black print:border-black font-medium">
                    {calculateDuration(times.start, times.end)}
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm print:text-black print:border-black">
                    {times.start && times.end ? (
                      <span className="text-green-600 dark:text-green-400 print:text-black font-medium">
                        {STATUS_LABELS.COMPLETED}
                      </span>
                    ) : times.start ? (
                      <span className="text-yellow-600 dark:text-yellow-400 print:text-black font-medium">
                        {STATUS_LABELS.IN_PROGRESS}
                      </span>
                    ) : (
                      <span className="text-red-600 dark:text-red-400 print:text-black">
                        {STATUS_LABELS.PENDING}
                      </span>
                    )}
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
