import React, { useEffect } from 'react';
import '../styles/liquidGlass.css';

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  mobileFullScreen?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showCloseButton?: boolean;
}

export default function BaseModal({
  isOpen,
  onClose,
  title,
  icon,
  children,
  mobileFullScreen = true,
  size = 'md',
  showCloseButton = true,
}: BaseModalProps) {
  // Handle ESC key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Size classes for desktop
  const sizeClasses = {
    sm: 'md:max-w-sm',
    md: 'md:max-w-md',
    lg: 'md:max-w-lg',
    xl: 'md:max-w-xl',
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center mobile-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div
        className={`
          relative w-full
          ${mobileFullScreen ? 'h-full md:h-auto' : 'h-auto'}
          ${sizeClasses[size]}
          flex flex-col
          mobile-modal-sheet
          desktop-modal-content
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Content */}
        <div
          className={`
            liquid-glass-modal
            flex flex-col
            ${mobileFullScreen ? 'h-full rounded-t-3xl md:rounded-2xl' : 'rounded-2xl'}
            overflow-hidden
          `}
        >
          {/* Header - Fixed on mobile, integrated on desktop */}
          <div className="flex-shrink-0 sticky top-0 z-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between p-4 md:p-6">
              <div className="flex items-center flex-1">
                {icon && <div className="flex-shrink-0 mr-3">{icon}</div>}
                <h2
                  id="modal-title"
                  className="text-lg md:text-xl font-bold text-gray-900 dark:text-white"
                >
                  {title}
                </h2>
              </div>

              {showCloseButton && (
                <button
                  type="button"
                  onClick={onClose}
                  className="ml-4 flex-shrink-0 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Cerrar modal"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Content - Scrollable */}
          <div className="flex-1 overflow-y-auto overscroll-contain">
            <div className="p-4 md:p-6">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
