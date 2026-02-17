import { X } from "lucide-react";
import type { Report } from "./ReportsView";

interface ReportPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  report: Report | null;
}

export default function ReportPreviewModal({
  isOpen,
  onClose,
  report,
}: ReportPreviewModalProps) {
  if (!isOpen || !report) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-xl shadow-xl max-h-[90vh] flex flex-col">

        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b shrink-0">
          <h2 className="text-base font-semibold text-gray-900">
            Preview: {report.title}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* Modal Body - Scrollable */}
        <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">

          {/* Report Letterhead */}
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-black text-gray-900 tracking-wide">
                HAMEAU DE JEUNES
              </h1>
              <p className="text-xs font-medium text-gray-500 tracking-widest mt-0.5">
                RESIDENTIAL CARE MANAGEMENT SYSTEM
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">Report ID: #RPT-2026-001</p>
              <p className="text-xs text-gray-400 mt-0.5">Generated on: Feb 03, 2026</p>
            </div>
          </div>

          {/* Divider */}
          <hr className="border-gray-200" />

          {/* Summary Overview */}
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-3">
              Summary Overview
            </h3>
            <hr className="border-gray-100 mb-4" />
            <p className="text-sm text-gray-600 leading-relaxed">
              This document serves as the official administrative report for the period of
              Jan 1, 2026 to Feb 3, 2026. Data is compiled from live system records
              including health intake, education attendance, and financial transactions.
            </p>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-blue-400 font-medium mb-1">Active Children</p>
              <p className="text-3xl font-bold text-gray-900">43</p>
            </div>
            <div>
              <p className="text-sm text-blue-400 font-medium mb-1">Avg. Health Status</p>
              <p className="text-3xl font-bold text-gray-900">Optimal</p>
            </div>
          </div>

          {/* Additional Info based on report type */}
          <div className="space-y-3">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                Period Covered
              </p>
              <p className="text-sm text-gray-700">January 1, 2026 — February 3, 2026</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                Prepared By
              </p>
              <p className="text-sm text-gray-700">Center Administrator</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                Report Type
              </p>
              <p className="text-sm text-gray-700">{report.title}</p>
            </div>
          </div>

          {/* Divider */}
          <hr className="border-gray-200 mt-4" />

          {/* Signature */}
          <div className="flex items-end justify-between">
            <div>
              <div className="w-36 border-b-2 border-gray-400 mb-2" />
              <p className="text-sm font-semibold text-gray-900">Administrator Signature</p>
              <p className="text-xs text-blue-400">Residential Care Admin</p>
            </div>
            <p className="text-xs text-gray-400 italic">Confidential — Internal Use Only</p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t shrink-0">
          <button
            onClick={onClose}
            className="w-full py-3 bg-emerald-900 text-white rounded-xl text-sm font-medium hover:bg-emerald-800 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}