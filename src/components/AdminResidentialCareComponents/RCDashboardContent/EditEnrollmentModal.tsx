import { useEffect, useState } from "react";
import { X, Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import {
  useUpdateEnrollmentMutation,
  type Enrollment,
  type EnrollmentStatus,
} from "@/store/api/enrollmentApi";
import { useGetInstitutionsQuery } from "@/store/api/educationApi";

interface EditEnrollmentModalProps {
  isOpen: boolean;
  enrollment: Enrollment | null;
  onClose: () => void;
}

const STATUS_OPTIONS: { value: EnrollmentStatus; label: string }[] = [
  { value: "ACTIVE", label: "Active" },
  { value: "COMPLETED", label: "Completed" },
  { value: "DISCONTINUED", label: "Discontinued" },
];

export default function EditEnrollmentModal({
  isOpen,
  enrollment,
  onClose,
}: EditEnrollmentModalProps) {
  const [form, setForm] = useState({
    institution: "", // UUID string
    program: "", // UUID string
    level: "",
    start_date: "",
    end_date: "",
    cost: "",
    status: "ACTIVE" as EnrollmentStatus,
  });

  useEffect(() => {
    if (enrollment) {
      setForm({
        institution: enrollment.program?.institution?.id ?? "",
        program: enrollment.program?.id ?? "",
        level: enrollment.level ?? "",
        start_date: enrollment.start_date,
        end_date: enrollment.end_date,
        cost: enrollment.cost,
        status: enrollment.status,
      });
    }
  }, [enrollment]);

  const { data: institutions = [] } = useGetInstitutionsQuery();
  const [updateEnrollment, { isLoading }] = useUpdateEnrollmentMutation();

  // Programs cascade from selected institution
  const selectedInstitution = institutions.find(
    (i) => i.id === form.institution,
  );
  const programs = selectedInstitution?.programs ?? [];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "institution" ? { program: "" } : {}),
    }));
  };

  const handleSubmit = async () => {
    if (!enrollment) return;
    if (
      !form.institution ||
      !form.program ||
      !form.level ||
      !form.start_date ||
      !form.end_date ||
      !form.cost
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      await updateEnrollment({
        id: enrollment.id, // UUID string
        institution: form.institution, // UUID string
        program: form.program, // UUID string
        level: form.level,
        start_date: form.start_date,
        end_date: form.end_date,
        cost: form.cost,
        status: form.status,
      }).unwrap();
      toast.success("Enrollment updated successfully.");
      onClose();
    } catch (err: any) {
      const detail = err?.data
        ? JSON.stringify(err.data)
        : "Failed to update enrollment. Please try again.";
      toast.error(detail);
    }
  };

  if (!isOpen || !enrollment) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Edit Enrollment
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">
              Update enrollment details below
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4">
          {/* Institution */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Institution <span className="text-red-500">*</span>
            </label>
            <select
              name="institution"
              value={form.institution}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              <option value="">Select institution...</option>
              {institutions.map((inst) => (
                <option key={inst.id} value={inst.id}>
                  {inst.name}
                </option>
              ))}
            </select>
          </div>

          {/* Program */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Program <span className="text-red-500">*</span>
            </label>
            <select
              name="program"
              value={form.program}
              onChange={handleChange}
              disabled={!form.institution}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="">Select program...</option>
              {programs.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.program_name}
                </option>
              ))}
            </select>
          </div>

          {/* Level */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Level of Study <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="level"
              value={form.level}
              onChange={handleChange}
              placeholder="e.g. S2, P5, Year 1..."
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="start_date"
                value={form.start_date}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="end_date"
                value={form.end_date}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Cost */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cost (RWF) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="cost"
              value={form.cost}
              onChange={handleChange}
              placeholder="e.g. 180000"
              min={0}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status <span className="text-red-500">*</span>
            </label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              {STATUS_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="px-6 py-3 border border-gray-300 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
              className="px-6 py-3 bg-emerald-900 text-white rounded-xl text-sm font-medium hover:bg-emerald-800 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
