import React from 'react';

interface NotesSectionProps {
  notes: string;
  onNotesChange: (notes: string) => void;
}

export default function NotesSection({ notes, onNotesChange }: NotesSectionProps) {
  return (
    <div className="mb-6">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        Notas Adicionales
      </h3>
      <textarea
        className="w-full h-32 p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 transition-colors placeholder-gray-500 dark:placeholder-gray-400"
        placeholder="Ingrese notas adicionales aquí..."
        value={notes}
        onChange={(e) => onNotesChange(e.target.value)}
      />
    </div>
  );
}
