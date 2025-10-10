import { useEffect, useRef } from 'react';
import { applyPrintStyles, removePrintStyles } from '../styles/printStyles';
import { REPORT_CONFIG, KEYBOARD_KEYS } from '../constants/reportConstants';

interface UseReportProps {
  onClose: () => void;
}

export const useReport = ({ onClose }: UseReportProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  /**
   * Maneja la impresión del reporte
   */
  const handlePrint = () => {
    const printStyleElement = applyPrintStyles();
    
    // Print and cleanup
    window.print();
    
    // Remove print styles after printing
    setTimeout(() => {
      removePrintStyles(printStyleElement);
    }, REPORT_CONFIG.PRINT_CLEANUP_DELAY);
  };

  /**
   * Maneja la navegación por teclado incluyendo scroll
   */
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === KEYBOARD_KEYS.ESCAPE) {
      onClose();
      return;
    }

    // Handle scroll with arrow keys
    if (scrollContainerRef.current) {
      const scrollAmount = REPORT_CONFIG.SCROLL_AMOUNT;
      const pageScrollAmount = window.innerHeight * REPORT_CONFIG.SCROLL_PAGE_FACTOR;
      
      switch (e.key) {
        case KEYBOARD_KEYS.ARROW_UP:
          e.preventDefault();
          scrollContainerRef.current.scrollBy({ top: -scrollAmount, behavior: 'smooth' });
          break;
        case KEYBOARD_KEYS.ARROW_DOWN:
          e.preventDefault();
          scrollContainerRef.current.scrollBy({ top: scrollAmount, behavior: 'smooth' });
          break;
        case KEYBOARD_KEYS.PAGE_UP:
          e.preventDefault();
          scrollContainerRef.current.scrollBy({ top: -pageScrollAmount, behavior: 'smooth' });
          break;
        case KEYBOARD_KEYS.PAGE_DOWN:
          e.preventDefault();
          scrollContainerRef.current.scrollBy({ top: pageScrollAmount, behavior: 'smooth' });
          break;
        case KEYBOARD_KEYS.HOME:
          e.preventDefault();
          scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
          break;
        case KEYBOARD_KEYS.END:
          e.preventDefault();
          scrollContainerRef.current.scrollTo({ 
            top: scrollContainerRef.current.scrollHeight, 
            behavior: 'smooth' 
          });
          break;
      }
    }
  };

  /**
   * Maneja el scroll con rueda del mouse para mejor experiencia en desktop
   */
  const handleWheel = (e: React.WheelEvent) => {
    if (scrollContainerRef.current) {
      e.preventDefault();
      scrollContainerRef.current.scrollBy({
        top: e.deltaY,
        behavior: 'auto'
      });
    }
  };

  /**
   * Manejo del foco y prevención del scroll del body
   */
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

  return {
    modalRef,
    scrollContainerRef,
    handlePrint,
    handleKeyDown,
    handleWheel,
  };
};
