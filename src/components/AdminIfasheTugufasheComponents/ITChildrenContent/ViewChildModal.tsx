import { X } from "lucide-react";
import type { Child } from "./IfasheTugufasheChildrenView";

interface ViewChildModalProps {
  isOpen: boolean;
  onClose: () => void;
  child: Child | null;
}

export default function ViewChildModal({ isOpen, onClose, child }: ViewChildModalProps) {
  if (!isOpen || !child) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-5 border-b flex items-center justify-between shrink-0">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Child Details</h2>
            <p className="text-sm text-gray-500 mt-0.5">
              Viewing complete information for ID: {child.childId}
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
              <p className="text-sm text-gray-500 mb-1">Full Name</p>
              <p className="font-medium text-gray-900">{child.fullName || "N/A"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Linked Family</p>
              <p className="font-medium text-gray-900">{child.linkedFamily || "N/A"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Gender</p>
              <p className="font-medium text-gray-900">{child.gender || "N/A"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Date of Birth</p>
              <p className="font-medium text-gray-900">{child.dateOfBirth || "N/A"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Enrolled School</p>
              <p className="font-medium text-gray-900">{child.schoolName || "N/A"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Education Level</p>
              <p className="font-medium text-gray-900">{child.educationLevel || "N/A"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Program Status</p>
              <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium 
                ${child.status.toLowerCase() === 'active' ? 'bg-green-100 text-green-800' :
                  child.status.toLowerCase() === 'inactive' ? 'bg-gray-100 text-gray-800' :
                  child.status.toLowerCase() === 'graduated' ? 'bg-blue-100 text-blue-800' :
                  'bg-amber-100 text-amber-800'}`}>
                {child.status}
              </span>
            </div>
            <div className="sm:col-span-2 bg-gray-50 rounded-lg p-4 border border-gray-100">
              <p className="text-sm font-medium text-gray-700 mb-2">Health Conditions / Notes</p>
              <p className="text-sm text-gray-600 whitespace-pre-wrap">{child.healthConditions || "No health conditions reported."}</p>
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
