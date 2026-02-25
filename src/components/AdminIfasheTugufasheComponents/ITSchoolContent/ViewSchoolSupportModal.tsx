import { X, User, School, Calendar, DollarSign, FileText, CreditCard } from "lucide-react";
import type { SchoolSupport } from "./IfasheTugufasheSchoolSupportView";

interface ViewSchoolSupportModalProps {
  isOpen: boolean;
  onClose: () => void;
  record: SchoolSupport | null;
}

export default function ViewSchoolSupportModal({ isOpen, onClose, record }: ViewSchoolSupportModalProps) {
  if (!isOpen || !record) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PAID": return "bg-green-100 text-green-700 border-green-200";
      case "PARTIAL": return "bg-blue-100 text-blue-700 border-blue-200";
      case "PENDING": return "bg-amber-100 text-amber-700 border-amber-200";
      case "OVERDUE": return "bg-red-100 text-red-700 border-red-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const paymentProgress = record.totalCost !== "0"
    ? Math.min(100, Math.round((record.totalPaid / parseFloat(record.totalCost)) * 100))
    : 0;

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]">

        {/* Header */}
        <div className="px-6 py-5 border-b flex items-center justify-between shrink-0 bg-emerald-900 text-white">
          <div>
            <h2 className="text-xl font-semibold">School Support Details</h2>
            <p className="text-emerald-100 text-sm mt-1">
              {record.childName} — {record.academicYear}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-emerald-800 hover:bg-emerald-700 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto">

          {/* Status Banner */}
          <div className={`mb-6 p-4 rounded-xl border flex items-center justify-between ${getStatusColor(record.paymentStatus)}`}>
            <span className="font-medium">Payment Status</span>
            <span className="px-3 py-1 bg-white/50 rounded-lg font-bold text-sm">{record.paymentStatus}</span>
          </div>

          {/* Payment Progress */}
          <div className="mb-6 p-4 bg-gray-50 rounded-xl">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Payment Progress</span>
              <span className="text-sm font-bold text-gray-900">{paymentProgress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all ${paymentProgress >= 100 ? "bg-green-500" : paymentProgress > 50 ? "bg-blue-500" : "bg-amber-500"}`}
                style={{ width: `${paymentProgress}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Paid: {record.totalPaid} RWF</span>
              <span>Balance: {record.balanceDue} RWF</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Beneficiary & School */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Beneficiary</h3>
              <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500">Child Name</p>
                    <p className="font-medium text-gray-900">{record.childName}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <School className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500">School</p>
                    <p className="font-medium text-gray-900">{record.schoolName}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500">Academic Year</p>
                    <p className="font-medium text-gray-900">{record.academicYear}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Costs */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Costs</h3>
              <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                <div className="flex items-start gap-3">
                  <DollarSign className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500">School Fees</p>
                    <p className="font-medium text-gray-900">{record.schoolFees} RWF</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CreditCard className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500">Materials Cost</p>
                    <p className="font-medium text-gray-900">{record.materialsCost} RWF</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <DollarSign className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500">Total Cost</p>
                    <p className="font-bold text-gray-900">{record.totalCost} RWF</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Notes */}
          {record.notes && (
            <div className="mt-6">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Notes</h3>
              <div className="bg-gray-50 rounded-xl p-4 flex items-start gap-3">
                <FileText className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
                <p className="text-sm text-gray-700">{record.notes}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
