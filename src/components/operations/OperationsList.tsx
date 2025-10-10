import React from 'react';
import OperationCard from './OperationCard';
import { OPERATIONS } from '../../types/operations';
import type { OperationsData } from '../../types/operations';

interface OperationsListProps {
  operations: OperationsData;
  isSingleTimeOperation: (operation: string) => boolean;
  onTimeChange: (operation: string, type: "start" | "end", value: string) => void;
  onStartOperation: (operation: string) => void;
  onEndOperation: (operation: string) => void;
  onSingleTimeOperation: (operation: string) => void;
}

export default function OperationsList({
  operations,
  isSingleTimeOperation,
  onTimeChange,
  onStartOperation,
  onEndOperation,
  onSingleTimeOperation,
}: OperationsListProps) {
  return (
    <div className="block lg:hidden space-y-4">
      {OPERATIONS.map((operation) => (
        <OperationCard
          key={operation}
          operation={operation}
          operationData={operations[operation]}
          isSingleTime={isSingleTimeOperation(operation)}
          onTimeChange={onTimeChange}
          onStartOperation={onStartOperation}
          onEndOperation={onEndOperation}
          onSingleTimeOperation={onSingleTimeOperation}
        />
      ))}
    </div>
  );
}
