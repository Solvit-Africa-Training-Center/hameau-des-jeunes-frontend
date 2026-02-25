import { X, GraduationCap, School, CalendarDays, DollarSign, FileText } from "lucide-react";
import { useState } from "react";
import { useCreateIfasheSchoolSupportMutation } from "@/store/api/ifasheSchoolSupportApi";
import { useGetIfasheChildrenQuery } from "@/store/api/ifasheChildrenApi";
import { toast } from "react-toastify";
import { parseApiError } from "@/utils/apiErrorParser";

interface AddSchoolSupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddSchoolPaymentModal({ isOpen, onClose }: AddSchoolSupportModalProps) {
  const [formData, setFormData] = useState({
    childId: "",
    academic_year: "",
    school_fees: "",
    materials_cost: "",
    payment_status: "PENDING",
    notes: "",
  });

  const { data: fetchedChildren = [] } = useGetIfasheChildrenQuery();
  const [createSupport, { isLoading }] = useCreateIfasheSchoolSupportMutation();

  if (!isOpen) return null;

  // Find the selected child's full object to read their name and school UUID
  const selectedChild = fetchedChildren.find((c: any) => c.id === formData.childId);
  const childSchoolId: string = selectedChild?.school || selectedChild?.school_id || "";
  const childSchoolName: string = selectedChild?.school_name || selectedChild?.schoolName || "";

  const handleChildChange = (childId: string) => {
    setFormData({ ...formData, childId });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!childSchoolId) {
      toast.error("The selected child has no school linked. Please assign a school to the child first.");
      return;
    }

    try {
      const payload: Record<string, any> = {
        child: formData.childId,
        school: childSchoolId,
        academic_year: formData.academic_year,
        payment_status: formData.payment_status,
        notes: formData.notes,
      };
      if (formData.school_fees) payload.school_fees = formData.school_fees;
      if (formData.materials_cost) payload.materials_cost = formData.materials_cost;

      await createSupport(payload).unwrap();
      toast.success("School support record created successfully!");
      setFormData({
        childId: "",
        academic_year: "",
        school_fees: "",
        materials_cost: "",
        payment_status: "PENDING",
        notes: "",
      });
      onClose();
    } catch (error: any) {
      toast.error(parseApiError(error, "Failed to create school support record."));
    }
  };

  const isFormValid = formData.childId && childSchoolId && formData.academic_year;

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-xl max-h-[90vh] flex flex-col">

        {/* Header — Emerald banner matching the app theme */}
        <div className="px-6 py-5 border-b flex items-center justify-between shrink-0 bg-emerald-900 rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-emerald-800 rounded-xl flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Add School Support</h2>
              <p className="text-emerald-200 text-xs mt-0.5">Create a new education support record</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-emerald-800 hover:bg-emerald-700 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
          <div className="px-6 py-5 space-y-5">

            {/* Select Child */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Select Child *
              </label>
              <select
                value={formData.childId}
                onChange={(e) => handleChildChange(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm appearance-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white"
                required
              >
                <option value="">— Choose a child —</option>
                {fetchedChildren.map((c: any) => (
                  <option key={c.id} value={c.id}>
                    {c.full_name || c.first_name
                      ? `${c.first_name || ""} ${c.last_name || ""}`.trim()
                      : c.name || "Unknown Child"}
                  </option>
                ))}
              </select>
            </div>

            {/* Auto-filled School info — read-only display */}
            {formData.childId && (
              <div className={`rounded-xl px-4 py-3 flex items-center gap-3 border ${
                childSchoolId
                  ? "bg-emerald-50 border-emerald-200"
                  : "bg-red-50 border-red-200"
              }`}>
                <School className={`w-5 h-5 shrink-0 ${childSchoolId ? "text-emerald-600" : "text-red-500"}`} />
                <div className="min-w-0">
                  <p className="text-xs font-medium text-gray-500">School (auto-filled from child record)</p>
                  {childSchoolId ? (
                    <p className="text-sm font-semibold text-emerald-800 truncate">
                      {childSchoolName || childSchoolId}
                    </p>
                  ) : (
                    <p className="text-sm text-red-600 font-medium">
                      ⚠ No school linked to this child. Please update the child's profile first.
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Academic Year */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                <span className="flex items-center gap-1.5">
                  <CalendarDays className="w-4 h-4 text-emerald-600" />
                  Academic Year *
                </span>
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
              <p className="text-xs text-gray-400 mt-1">Max 12 characters</p>
            </div>

            {/* School Fees & Materials Cost */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  <span className="flex items-center gap-1.5">
                    <DollarSign className="w-4 h-4 text-emerald-600" />
                    School Fees (RWF)
                  </span>
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.school_fees}
                  onChange={(e) => setFormData({ ...formData, school_fees: e.target.value })}
                  placeholder="0.00"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  <span className="flex items-center gap-1.5">
                    <DollarSign className="w-4 h-4 text-emerald-600" />
                    Materials Cost (RWF)
                  </span>
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.materials_cost}
                  onChange={(e) => setFormData({ ...formData, materials_cost: e.target.value })}
                  placeholder="0.00"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Payment Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Payment Status *
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(["PENDING", "PARTIAL", "PAID", "OVERDUE"] as const).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setFormData({ ...formData, payment_status: s })}
                    className={`py-2 rounded-lg text-xs font-semibold transition-all border ${
                      formData.payment_status === s
                        ? s === "PAID"
                          ? "bg-green-600 text-white border-green-600"
                          : s === "PARTIAL"
                          ? "bg-blue-600 text-white border-blue-600"
                          : s === "OVERDUE"
                          ? "bg-red-600 text-white border-red-600"
                          : "bg-amber-500 text-white border-amber-500"
                        : "bg-white text-gray-600 border-gray-300 hover:border-emerald-400"
                    }`}
                  >
                    {s === "PENDING" ? "Pending" : s === "PARTIAL" ? "Partial" : s === "PAID" ? "Paid" : "Overdue"}
                  </button>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                <span className="flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-emerald-600" />
                  Notes
                </span>
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={3}
                placeholder="Any additional notes about this support record..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
              />
            </div>

          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t bg-gray-50 flex gap-3 sticky bottom-0 shrink-0 rounded-b-2xl">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 hover:bg-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading || !isFormValid}
              className="flex-1 py-3 bg-emerald-900 text-white rounded-xl text-sm font-semibold hover:bg-emerald-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Saving..." : "Add School Support"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}