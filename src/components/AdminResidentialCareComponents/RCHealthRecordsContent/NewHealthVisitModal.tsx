import { useState } from "react";
import { X } from "lucide-react";
import { useCreateHealthRecordMutation } from "@/store/api/healthRecordsApi";
import { useGetChildrenQuery } from "@/store/api/childrenApi";
import { toast } from "react-toastify";

interface NewHealthVisitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RECORD_TYPES = [
  { value: "MEDICAL_VISIT", label: "Medical Visit" },
  { value: "VACCINATION", label: "Vaccination" },
  { value: "ILLNESS", label: "Illness" },
];

const EMPTY_FORM = {
  child: "",
  record_type: "MEDICAL_VISIT",
  visit_date: "",
  hospital_name: "",
  diagnosis: "",
  treatment: "",
  description: "",
  cost: "",
};

export default function NewHealthVisitModal({
  isOpen,
  onClose,
}: NewHealthVisitModalProps) {
  const [form, setForm] = useState(EMPTY_FORM);

  const { data: children = [], isLoading: childrenLoading } =
    useGetChildrenQuery();
  const [createHealthRecord, { isLoading }] = useCreateHealthRecordMutation();

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleClose = () => {
    setForm(EMPTY_FORM);
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Build payload — omit empty optional fields so API doesn't get ""
    const payload: Record<string, string> = {
      child: form.child,
      record_type: form.record_type,
      visit_date: form.visit_date,
    };
    if (form.hospital_name) payload.hospital_name = form.hospital_name;
    if (form.diagnosis) payload.diagnosis = form.diagnosis;
    if (form.treatment) payload.treatment = form.treatment;
    if (form.description) payload.description = form.description;
    if (form.cost) payload.cost = parseFloat(form.cost).toFixed(2);

    try {
      await createHealthRecord(payload as any).unwrap();
      toast.success("Health record saved successfully!");
      handleClose();
    } catch (err: any) {
      console.error("Health record error:", JSON.stringify(err?.data, null, 2));
      const data = err?.data ?? {};
      const firstFieldError = Object.entries(data)
        .map(([field, msgs]) => `${field}: ${(msgs as string[]).join(", ")}`)
        .join(" | ");
      const message =
        firstFieldError || err?.data?.detail || "Failed to save health record.";
      toast.error(message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b sticky top-0 bg-white rounded-t-2xl z-10">
          <h2 className="text-lg font-semibold text-gray-900">
            New Health Visit
          </h2>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-5">
          {/* Child */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Child
            </label>
            <div className="relative">
              <select
                name="child"
                value={form.child}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm appearance-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white text-gray-700"
              >
                <option value="" disabled>
                  {childrenLoading ? "Loading children..." : "Select a child"}
                </option>
                {children.map((child) => (
                  <option key={child.id} value={child.id}>
                    {child.full_name}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                <svg
                  className="w-4 h-4 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Record Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Record Type
            </label>
            <div className="relative">
              <select
                name="record_type"
                value={form.record_type}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm appearance-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white text-gray-700"
              >
                {RECORD_TYPES.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                <svg
                  className="w-4 h-4 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Hospital Name & Visit Date */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hospital Name
              </label>
              <input
                type="text"
                name="hospital_name"
                value={form.hospital_name}
                onChange={handleChange}
                placeholder="e.g. Kigali Clinic"
                maxLength={100}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Visit Date
              </label>
              <input
                type="date"
                name="visit_date"
                value={form.visit_date}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-gray-700"
              />
            </div>
          </div>

          {/* Diagnosis */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Diagnosis
            </label>
            <input
              type="text"
              name="diagnosis"
              value={form.diagnosis}
              onChange={handleChange}
              placeholder="Enter diagnosis"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>

          {/* Treatment & Cost */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Treatment
              </label>
              <input
                type="text"
                name="treatment"
                value={form.treatment}
                onChange={handleChange}
                placeholder="Prescribed treatment"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cost (RWF)
              </label>
              <input
                type="number"
                name="cost"
                value={form.cost}
                onChange={handleChange}
                placeholder="e.g. 15000"
                min="0"
                step="0.01"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description / Notes
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              placeholder="Additional notes..."
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4 pt-2">
            <button
              type="button"
              onClick={handleClose}
              disabled={isLoading}
              className="px-6 py-3 border border-gray-300 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-3 bg-emerald-900 text-white rounded-xl text-sm font-medium hover:bg-emerald-800 transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"
                    />
                  </svg>
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
