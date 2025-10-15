import React, { useState } from "react";
import type { Flight } from "./FlightCard";
import { useReport } from "../hooks/useReport";
import ReportHeader from "./report/ReportHeader";
import ReportTitle from "./report/ReportTitle";
import FlightInfoSection from "./report/FlightInfoSection";
import TPTSection from "./report/TPTSection";
import OperationsSection from "./report/OperationsSection";
import NotesSection from "./report/NotesSection";
import ReportFooter from "./report/ReportFooter";
import PrintPreview from "./PrintPreview";
import "../styles/reportStyles.css";

interface ReportProps {
  flight: Flight;
  onClose: () => void;
}

export default function Report({ flight, onClose }: ReportProps) {
  const { modalRef, scrollContainerRef, handlePrint, handleKeyDown, handleWheel } = useReport({ onClose });
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const handleTogglePreview = () => {
    setIsPreviewMode(!isPreviewMode);
  };

  const reportContent = (
    <>
      {/* Report Title */}
      <ReportTitle />

      {/* Flight Information Section */}
      <FlightInfoSection flight={flight} />

      {/* TPT Section */}
      <TPTSection flight={flight} />

      {/* Operations Section */}
      <OperationsSection flight={flight} />

      {/* Notes Section */}
      <NotesSection flight={flight} />

      {/* Report Footer */}
      <ReportFooter flight={flight} />
    </>
  );

  if (isPreviewMode) {
    return (
      <PrintPreview isPreviewMode={isPreviewMode} onTogglePreview={handleTogglePreview}>
        <div className="print-content">
          {reportContent}
        </div>
      </PrintPreview>
    );
  }

  return (
    <div 
      ref={modalRef}
      className="fixed inset-0 bg-black bg-opacity-50 z-50 print:static print:bg-transparent print:inset-auto"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      onKeyDown={handleKeyDown}
      onWheel={handleWheel}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-labelledby="report-title"
    >
      <div 
        ref={scrollContainerRef}
        className="h-full w-full overflow-y-auto overflow-x-hidden print:overflow-visible print:h-auto report-scroll-container"
      >
        <div className="min-h-full flex items-start justify-center p-2 sm:p-4 print:p-0 print:min-h-0">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-3 sm:p-6 lg:p-8 max-w-4xl w-full my-4 print:my-0 print:shadow-none print:p-0 print:max-w-none print:rounded-none">
            
            {/* Header - Mobile Optimized */}
            <ReportHeader onPrint={handlePrint} onClose={onClose} />

            {/* Printable Report Content */}
            <div className="print-content print:text-black print:bg-white">
              {reportContent}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
