import { X, Calendar, User, Info, CalendarDays } from "lucide-react";
import type { Sponsorship } from "./IfasheTugufasheSponsorshipView";

interface ViewSponsorshipModalProps {
  isOpen: boolean;
  onClose: () => void;
  sponsorship: Sponsorship | null;
}

export default function ViewSponsorshipModal({
  isOpen,
  onClose,
  sponsorship,
}: ViewSponsorshipModalProps) {
  if (!isOpen || !sponsorship) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-100 text-green-700 border-green-200";
      case "SUSPENDED":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "COMPLETED":
        return "bg-blue-100 text-blue-700 border-blue-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-5 border-b flex items-center justify-between shrink-0 bg-emerald-900 text-white">
          <div>
            <h2 className="text-xl font-semibold">Sponsorship Details</h2>
            <p className="text-emerald-100 text-sm mt-1">
              ID: {sponsorship.id}
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
          <div className={`mb-6 p-4 rounded-xl border flex items-center justify-between ${getStatusColor(sponsorship.status)}`}>
            <div className="flex items-center gap-2">
              <Info className="w-5 h-5" />
              <span className="font-medium">Current Status</span>
            </div>
            <span className="px-3 py-1 bg-white/50 rounded-lg font-bold text-sm">
              {sponsorship.status}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Beneficiary Details */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">
                Beneficiary Information
              </h3>
              
              <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 text-emerald-600 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Child Name</p>
                    <p className="font-medium text-gray-900">{sponsorship.beneficiaryName}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-emerald-600 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Child ID</p>
                    <p className="font-medium text-gray-900">{sponsorship.childId}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Program Details */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">
                Program Details
              </h3>
              
              <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-emerald-600 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Sponsorship Type</p>
                    <p className="font-medium text-gray-900">{sponsorship.type}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-emerald-600 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Start Date</p>
                    <p className="font-medium text-gray-900">{sponsorship.startDate}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CalendarDays className="w-5 h-5 text-emerald-600 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Expected End Date</p>
                    <p className="font-medium text-gray-900">
                      {sponsorship.endDate !== "null" ? sponsorship.endDate : "Not Set"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
          </div>

          {/* Pause Reason (if suspended) */}
          {sponsorship.status === "SUSPENDED" && sponsorship.pauseReason && (
            <div className="mt-6 space-y-2">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">
                Suspension Reason
              </h3>
              <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl">
                <p className="text-amber-800 text-sm">
                  {sponsorship.pauseReason}
                </p>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
