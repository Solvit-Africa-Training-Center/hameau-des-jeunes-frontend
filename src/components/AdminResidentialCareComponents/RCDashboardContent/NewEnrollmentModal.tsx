import { X, ChevronDown, Calendar, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useGetInstitutionsQuery } from "@/store/api/educationApi";
import {
  useCreateEnrollmentMutation,
  type EnrollmentStatus,
} from "@/store/api/enrollmentApi";

interface NewEnrollmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  childId: string; // ← UUID, matches Child.id
}

const STATUS_OPTIONS: { value: EnrollmentStatus; label: string }[] = [
  { value: "ACTIVE", label: "Active" },
  { value: "COMPLETED", label: "Completed" },
  { value: "DISCONTINUED", label: "Discontinued" },
];

export default function NewEnrollmentModal({
  isOpen,
  onClose,
  childId, // ← UUID
}: NewEnrollmentModalProps) {
  const [institutionId, setInstitutionId] = useState("");
  const [programId, setProgramId] = useState("");
  const [level, setLevel] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [fees, setFees] = useState("");
  const [status, setStatus] = useState<EnrollmentStatus>("ACTIVE");

  const { data: institutions = [] } = useGetInstitutionsQuery();
  const [createEnrollment, { isLoading }] = useCreateEnrollmentMutation();

  const selectedInstitution = institutions.find((i) => i.id === institutionId);
  const programs = selectedInstitution?.programs ?? [];

  const handleClose = () => {
    setInstitutionId("");
    setProgramId("");
    setLevel("");
    setStartDate("");
    setEndDate("");
    setFees("");
    setStatus("ACTIVE");
    onClose();
  };

  const handleSave = async () => {
    if (
      !institutionId ||
      !programId ||
      !level ||
      !startDate ||
      !endDate ||
      !fees
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      await createEnrollment({
        child: childId, // ← UUID, not child_name
        institution: institutionId,
        program: programId,
        level,
        start_date: startDate,
        end_date: endDate,
        cost: fees,
        status,
      }).unwrap();

      toast.success("Enrollment created successfully.");
      handleClose();
    } catch (err: any) {
      const detail = err?.data
        ? JSON.stringify(err.data)
        : "Failed to create enrollment. Please try again.";
      toast.error(detail);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={handleClose} />

      <div className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-8 py-1 border-b">
          <h2 className="text-lg font-semibold text-gray-900">
            New Enrollment
          </h2>
          <button
            onClick={handleClose}
            className="w-6 h-6 rounded-full bg-emerald-900 flex items-center justify-center hover:bg-emerald-800 transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>

        <div className="px-8 py-4 space-y-1">
          {/* Institution */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-800">
              Institution <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                value={institutionId}
                onChange={(e) => {
                  setInstitutionId(e.target.value);
                  setProgramId("");
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm appearance-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              >
                <option value="">Select Institution</option>
                {institutions.map((inst) => (
                  <option key={inst.id} value={inst.id}>
                    {inst.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>
            {programs.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {programs.map((prog) => (
                  <span
                    key={prog.id}
                    className="px-3 py-1 text-xs bg-gray-100 text-gray-600 rounded-md"
                  >
                    {prog.program_name}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Program */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-800">
              Program <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                value={programId}
                onChange={(e) => setProgramId(e.target.value)}
                disabled={!institutionId || programs.length === 0}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm appearance-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="">Select Program</option>
                {programs.map((prog) => (
                  <option key={prog.id} value={prog.id}>
                    {prog.program_name}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>
          </div>

          {/* Level */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-800">
              Level of Study <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm appearance-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              >
                <option value="">Select Level of Study</option>
                <option value="primary">Primary</option>
                <option value="secondary">Secondary</option>
                <option value="certificate">Certificate</option>
                <option value="diploma">Diploma</option>
                <option value="bachelor">Bachelor</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-800">
                Start Date <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
                <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-800">
                End Date <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
                <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Fees */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-800">
              Fees (RWF) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={fees}
              onChange={(e) => setFees(e.target.value)}
              placeholder="Enter amount"
              min={0}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>

          {/* Status */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-800">Status</label>
            <div className="relative">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as EnrollmentStatus)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm appearance-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              >
                {STATUS_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-between pt-2 pb-2">
            <button
              onClick={handleClose}
              disabled={isLoading}
              className="px-8 py-2 border-2 border-emerald-900 text-emerald-900 rounded-2xl font-medium hover:bg-emerald-50 transition disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isLoading}
              className="px-8 py-2 bg-emerald-900 text-white rounded-2xl font-medium hover:bg-emerald-800 transition disabled:opacity-50 flex items-center gap-2"
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
