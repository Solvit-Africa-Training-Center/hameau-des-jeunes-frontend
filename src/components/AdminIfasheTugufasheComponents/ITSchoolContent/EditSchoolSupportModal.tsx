import { X, Save } from "lucide-react";
import { useState, useEffect } from "react";
import { useUpdateIfasheSchoolSupportMutation } from "@/store/api/ifasheSchoolSupportApi";
import type { SchoolSupport } from "./IfasheTugufasheSchoolSupportView";
import { toast } from "react-toastify";
import { parseApiError } from "@/utils/apiErrorParser";

interface EditSchoolSupportModalProps {
  isOpen: boolean;
  onClose: () => void;
  record: SchoolSupport | null;
}

export default function EditSchoolSupportModal({ isOpen, onClose, record }: EditSchoolSupportModalProps) {
  const [formData, setFormData] = useState({
    academic_year: "",
    school_fees: "",
    materials_cost: "",
    payment_status: "PENDING",
    notes: "",
  });

  const [updateRecord, { isLoading }] = useUpdateIfasheSchoolSupportMutation();

  useEffect(() => {
    if (record) {
      setFormData({
        academic_year: record.academicYear !== "N/A" ? record.academicYear : "",
        school_fees: record.schoolFees !== "0" ? record.schoolFees : "",
        materials_cost: record.materialsCost !== "0" ? record.materialsCost : "",
        payment_status: record.paymentStatus || "PENDING",
        notes: record.notes || "",
      });
    }
  }, [record]);

  if (!isOpen || !record) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload: Record<string, any> = {
        academic_year: formData.academic_year,
        payment_status: formData.payment_status,
        notes: formData.notes,
      };
      if (formData.school_fees) payload.school_fees = formData.school_fees;
      if (formData.materials_cost) payload.materials_cost = formData.materials_cost;

      await updateRecord({ id: record.id, data: payload }).unwrap();
      toast.success("School support record updated successfully!");
      onClose();
    } catch (error: any) {
      toast.error(parseApiError(error, "Failed to update school support record."));
    }
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-xl max-h-[90vh] flex flex-col">

        {/* Header */}
        <div className="px-6 py-5 border-b flex items-center justify-between shrink-0">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Edit School Support</h2>
            <p className="text-sm text-gray-500 mt-0.5">
              Updating record for <span className="font-medium">{record.childName}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors shrink-0"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
          <div className="px-6 py-5 space-y-4">

            {/* Academic Year */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Academic Year *
              </label>
              <input
                type="text"
                value={formData.academic_year}
                onChange={(e) => setFormData({ ...formData, academic_year: e.target.value })}
                placeholder="e.g. 2025-P6"
                maxLength={12}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                required
              />
            </div>

            {/* School Fees & Materials Cost */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  School Fees (RWF)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.school_fees}
                  onChange={(e) => setFormData({ ...formData, school_fees: e.target.value })}
                  placeholder="0.00"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Materials Cost (RWF)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.materials_cost}
                  onChange={(e) => setFormData({ ...formData, materials_cost: e.target.value })}
                  placeholder="0.00"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Payment Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payment Status *
              </label>
              <select
                value={formData.payment_status}
                onChange={(e) => setFormData({ ...formData, payment_status: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm appearance-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white"
                required
              >
                <option value="PENDING">Pending</option>
                <option value="PARTIAL">Partial</option>
                <option value="PAID">Paid</option>
                <option value="OVERDUE">Overdue</option>
              </select>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={3}
                placeholder="Any additional notes..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
              />
            </div>

          </div>

          {/* Footer Buttons */}
          <div className="px-6 py-4 border-t bg-gray-50 flex gap-3 sticky bottom-0 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 border border-gray-300 rounded-xl text-sm font-medium hover:bg-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 py-3 bg-emerald-900 text-white rounded-xl text-sm font-medium hover:bg-emerald-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-4 h-4" />
              {isLoading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
