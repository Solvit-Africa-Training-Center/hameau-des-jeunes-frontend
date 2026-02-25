import { X } from "lucide-react";
import { useState } from "react";

interface AssignParentWorkModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AssignParentWorkModal({
  isOpen,
  onClose,
}: AssignParentWorkModalProps) {
  const [formData, setFormData] = useState({
    selectParent: "",
    assignedDepartment: "",
    supervisor: "",
    status: "Active",
    performanceNotes: "",
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Assign parent work:", formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-xl">
        {/* Header */}
        <div className="px-6 py-5 border-b flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            Assign Parent Work
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors shrink-0"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          {/* Select Parent/Family & Assigned Department */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Parent/Family *
              </label>
              <select
                value={formData.selectParent}
                onChange={(e) =>
                  setFormData({ ...formData, selectParent: e.target.value })
                }
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm appearance-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white"
              >
                <option value="">Select a parent</option>
                <option value="Mukamana Vestine">Mukamana Vestine</option>
                <option value="Niyonzima Jean Claude">
                  Niyonzima Jean Claude
                </option>
                <option value="Uwihana Grace">Uwihana Grace</option>
                <option value="Habimana Patrick">Habimana Patrick</option>
                <option value="Nyirahabimana Angelique">
                  Nyirahabimana Angelique
                </option>
                <option value="Ndayisaba Emmanuel">Ndayisaba Emmanuel</option>
                <option value="Mukamazimpaka Claudine">
                  Mukamazimpaka Claudine
                </option>
                <option value="Bizimana Joseph">Bizimana Joseph</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Assigned Department *
              </label>
              <input
                type="text"
                value={formData.assignedDepartment}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    assignedDepartment: e.target.value,
                  })
                }
                placeholder="e.g., Kitchen, Cleaning, Farm, Admin"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Supervisor & Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Supervisor *
              </label>
              <input
                type="text"
                value={formData.supervisor}
                onChange={(e) =>
                  setFormData({ ...formData, supervisor: e.target.value })
                }
                placeholder="Supervisor name"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status *
              </label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm appearance-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white"
              >
                <option value="Active">Active</option>
                <option value="Warning Issued">Warning Issued</option>
                <option value="Suspended">Suspended</option>
              </select>
            </div>
          </div>

          {/* Performance Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Performance Notes
            </label>
            <textarea
              value={formData.performanceNotes}
              onChange={(e) =>
                setFormData({ ...formData, performanceNotes: e.target.value })
              }
              rows={4}
              placeholder="Add notes about performance, attendance, etc."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 border border-gray-300 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 bg-emerald-900 text-white rounded-xl text-sm font-medium hover:bg-emerald-800 transition-colors"
            >
              Assign Parent
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
