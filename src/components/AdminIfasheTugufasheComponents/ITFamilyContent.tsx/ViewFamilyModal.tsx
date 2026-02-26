import { X } from "lucide-react";
import type { Family } from "./IfasheTugufasheFamilyView";

interface ViewFamilyModalProps {
  isOpen: boolean;
  onClose: () => void;
  family: Family | null;
}

export default function ViewFamilyModal({ isOpen, onClose, family }: ViewFamilyModalProps) {
  if (!isOpen || !family) return null;

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-5 border-b flex items-center justify-between shrink-0">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Family Details</h2>
            <p className="text-sm text-gray-500 mt-0.5">
              Viewing complete information for ID: {family.familyId}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors shrink-0"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500 mb-1">Parent / Guardian Name</p>
              <p className="font-medium text-gray-900">{family.fullName || "N/A"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Phone Number</p>
              <p className="font-medium text-gray-900">{family.phoneNumber}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">National ID</p>
              <p className="font-medium text-gray-900">{family.nationalId || "N/A"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Gender</p>
              <p className="font-medium text-gray-900">{family.gender || "N/A"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Date of Birth</p>
              <p className="font-medium text-gray-900">{family.dob || "N/A"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Recorded Children</p>
              <p className="font-medium text-gray-900">{family.children}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Education Level</p>
              <p className="font-medium text-gray-900">{family.educationLevel || "N/A"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Marital Status</p>
              <p className="font-medium text-gray-900">{family.maritalStatus || "N/A"}</p>
            </div>
            <div className="sm:col-span-2">
              <p className="text-sm text-gray-500 mb-1">Location Details / Address</p>
              <p className="font-medium text-gray-900">{family.address || "N/A"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Previous Employment</p>
              <p className="font-medium text-gray-900">{family.previousEmployment || "N/A"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Monthly Income (RWF)</p>
              <p className="font-medium text-gray-900">{family.monthlyIncome || "N/A"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Housing Condition</p>
              <p className="font-medium text-gray-900">{family.housingCondition || "N/A"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Vulnerability Level</p>
              <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium 
                ${family.vulnerabilityLevel.toUpperCase() === 'CRITICAL' ? 'bg-red-100 text-red-800' :
                  family.vulnerabilityLevel.toUpperCase() === 'HIGH' ? 'bg-orange-100 text-orange-800' :
                  family.vulnerabilityLevel.toUpperCase() === 'MEDIUM' ? 'bg-amber-100 text-amber-800' :
                  'bg-blue-100 text-blue-800'}`}>
                {family.vulnerabilityLevel || "Low"}
              </span>
            </div>
            <div className="sm:col-span-2 bg-gray-50 rounded-lg p-4 border border-gray-100">
              <p className="text-sm font-medium text-gray-700 mb-2">Social Worker Assessment Notes</p>
              <p className="text-sm text-gray-600 whitespace-pre-wrap">{family.assessmentNotes || "No assessment notes provided."}</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t bg-gray-50 flex justify-end rounded-b-2xl shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
