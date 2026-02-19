import { useState } from "react";
import ReportsView from "./ReportsView";
import ReportPreviewModal from "./ReportPreviewModal";
import type { Report } from "./ReportsView";

export default function ReportsContent() {
  const [showPreview, setShowPreview] = useState(false);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  const handlePreview = (report: Report) => {
    setSelectedReport(report);
    setShowPreview(true);
  };

  return (
    <>
      <ReportsView onPreview={handlePreview} />
      <ReportPreviewModal
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        report={selectedReport}
      />
    </>
  );
}