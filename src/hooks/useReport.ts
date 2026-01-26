import { useEffect, useRef, useState } from 'react';
import { applyPrintStyles, removePrintStyles } from '../styles/printStyles';
import { REPORT_CONFIG, KEYBOARD_KEYS } from '../constants/reportConstants';

interface UseReportProps {
  onClose: () => void;
}

export const useReport = ({ onClose }: UseReportProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  /**
   * Maneja la impresión del reporte
   */
  const handlePrint = () => {
    // Force light mode for printing
    const wasDark = document.documentElement.classList.contains('dark');
    if (wasDark) {
      document.documentElement.classList.remove('dark');
    }

    const printStyleElement = applyPrintStyles();

    // Slight delay to ensure styles are applied before print dialog opens
    // This fixes the issue on mobile where the first print attempts to print the full page
    setTimeout(() => {
      // Print
      window.print();

      // Remove print styles after printing (with a delay to ensure print dialog captured it)
      setTimeout(() => {
        removePrintStyles(printStyleElement);
        // Restore dark mode if it was active
        if (wasDark) {
          document.documentElement.classList.add('dark');
        }
      }, REPORT_CONFIG.PRINT_CLEANUP_DELAY);
    }, 500);
  };

  /**
   * Maneja la descarga/compartir del reporte como PDF
   */
  const handleDownload = async () => {
    if (!scrollContainerRef.current) return;

    // Dynamically import html2pdf to avoid SSR issues
    const html2pdf = (await import('html2pdf.js')).default;

    // Apply print styles for better PDF formatting
    const printStyleElement = applyPrintStyles();

    // Select the content to print (the inner white box)
    const element = scrollContainerRef.current.querySelector('.print-content');

    if (!element) return;

    setIsDownloading(true);

    const opt = {
      margin: [10, 10, 10, 10], // top, left, bottom, right (mm)
      filename: `Reporte_Operaciones_${new Date().toISOString().split('T')[0]}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, letterRendering: true, scrollY: 0 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    };

    // Force light mode for PDF generation
    const wasDark = document.documentElement.classList.contains('dark');
    if (wasDark) {
      document.documentElement.classList.remove('dark');
    }

    try {
      // Small delay to ensure state updates and "Generando..." text is visible
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Check if Web Share API is supported and we are on a secure context
      const isShareSupported = navigator.share && navigator.canShare;

      if (isShareSupported) {
        // Generate blob for sharing
        const blob = await html2pdf()
          .set(opt as any)
          .from(element as HTMLElement)
          .output('blob');
        const file = new File([blob], opt.filename, { type: 'application/pdf' });

        if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            files: [file],
            title: 'Reporte de Operaciones',
            text: 'Adjunto el reporte de operaciones aéreas.',
          });
        } else {
          // Fallback to save if file sharing not supported
          await html2pdf()
            .set(opt as any)
            .from(element as HTMLElement)
            .save();
        }
      } else {
        // Direct download
        await html2pdf()
          .set(opt as any)
          .from(element as HTMLElement)
          .save();
      }
    } catch (error) {
      console.error('Error generating/sharing PDF:', error);
      // Fallback to simple download on error or cancellation
      try {
        await html2pdf()
          .set(opt as any)
          .from(element as HTMLElement)
          .save();
      } catch (e) {
        console.error('Fallback download failed:', e);
        alert('Hubo un error al generar el PDF. Por favor intente nuevamente.');
      }
    } finally {
      removePrintStyles(printStyleElement);
      setIsDownloading(false);
      // Restore dark mode if it was active
      if (wasDark) {
        document.documentElement.classList.add('dark');
      }
    }
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
            behavior: 'smooth',
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
        behavior: 'auto',
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
    handleDownload,
    isDownloading,
    handleKeyDown,
    handleWheel,
  };
};
