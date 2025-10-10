# Flight Operations Components

This directory contains the refactored components for flight operations management, following clean architecture principles and separation of concerns.

## Architecture Overview

```
operations/
├── OperationCard.tsx       # Mobile view - individual operation card
├── OperationTable.tsx      # Desktop view - operations table
├── OperationsList.tsx      # Mobile view - list container
├── NotesSection.tsx        # Notes input component
├── ActionButtons.tsx       # Action buttons (back/complete)
├── index.ts               # Clean exports
└── README.md              # This documentation
```

## Component Responsibilities

### OperationCard
- **Purpose**: Display individual operation in mobile card format
- **Props**: Operation data, handlers for time changes and actions
- **Features**: Single/dual time inputs, status indicators, action buttons

### OperationTable
- **Purpose**: Display all operations in desktop table format
- **Props**: All operations data, handlers
- **Features**: Responsive table, inline time inputs, bulk actions

### OperationsList
- **Purpose**: Container for mobile card view
- **Props**: Operations data, handlers
- **Features**: Responsive grid, maps over operations

### NotesSection
- **Purpose**: Standalone notes input component
- **Props**: Notes value and change handler
- **Features**: Textarea with proper styling and accessibility

### ActionButtons
- **Purpose**: Navigation and completion actions
- **Props**: Back and complete handlers
- **Features**: Responsive button layout, proper styling

## Supporting Files

### Types (`/types/operations.ts`)
- `OperationRecord`: Single operation data structure
- `OperationsData`: Complete operations state
- `FlightOperationsProps`: Main component props
- `OPERATIONS`: List of all operation types
- `SINGLE_TIME_OPERATIONS`: Operations that are punctual events

### Hooks (`/hooks/useFlightOperations.ts`)
- **Purpose**: Centralized operations state management
- **Features**: 
  - Operations initialization
  - Time change handlers
  - Single/dual time operation logic
  - Flight completion logic

### Utils (`/utils/timeUtils.ts`)
- **Purpose**: Time calculation and formatting utilities
- **Functions**:
  - `getCurrentTimeString()`: Get current time in HH:MM
  - `calculateDuration()`: Calculate duration with midnight crossing
  - `isValidTimeFormat()`: Validate time format
  - `formatTime()`: Ensure proper time formatting

## Benefits of This Architecture

### 1. Single Responsibility Principle
- Each component has one clear purpose
- Easy to understand and maintain
- Reduced cognitive load

### 2. Reusability
- Components can be reused in different contexts
- Clean interfaces with well-defined props
- No tight coupling between components

### 3. Testability
- Small, focused components are easier to test
- Pure functions in utils are easily testable
- Hooks can be tested in isolation

### 4. Maintainability
- Changes to one component don't affect others
- Clear separation of concerns
- Easy to add new features or modify existing ones

### 5. Performance
- Smaller components can be optimized individually
- Better tree shaking potential
- Reduced bundle size for unused components

## Usage Example

```tsx
import { useFlightOperations } from '../hooks/useFlightOperations';
import { OperationsList, OperationTable, NotesSection, ActionButtons } from './operations';

function FlightOperations({ flight, onComplete, onBack }) {
  const {
    operations,
    notes,
    setNotes,
    // ... other handlers
  } = useFlightOperations(flight);

  return (
    <div>
      <OperationsList operations={operations} /* ... */ />
      <OperationTable operations={operations} /* ... */ />
      <NotesSection notes={notes} onNotesChange={setNotes} />
      <ActionButtons onBack={onBack} onComplete={handleComplete} />
    </div>
  );
}
```

## Migration Notes

### Before (433 lines)
- Single monolithic component
- Mixed responsibilities
- Difficult to test and maintain
- Repeated code between mobile/desktop views

### After (72 lines main + focused components)
- Clean separation of concerns
- Reusable components
- Easy to test and maintain
- DRY principle applied
- Better performance potential

## Future Enhancements

1. **Memoization**: Add React.memo to prevent unnecessary re-renders
2. **Virtualization**: For large operation lists
3. **Animation**: Add smooth transitions between states
4. **Accessibility**: Enhanced ARIA labels and keyboard navigation
5. **Testing**: Unit tests for each component and utility
