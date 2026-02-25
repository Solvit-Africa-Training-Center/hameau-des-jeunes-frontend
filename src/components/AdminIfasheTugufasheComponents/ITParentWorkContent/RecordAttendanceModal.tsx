import { X, CalendarDays, FileText, Save } from "lucide-react";
import { useState, useEffect } from "react";
import { useCreateIfasheParentAttendanceMutation } from "@/store/api/ifasheParentsApi";
import { toast } from "react-toastify";
import { parseApiError } from "@/utils/apiErrorParser";

interface Contract {
  id: string;
  parentName: string;
  jobRole: string;
}

interface RecordAttendanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  contract: Contract | null;
}

const STATUSES = [
  { value: "PRESENT", label: "Present" },
  { value: "ABSENT", label: "Absent" },
  { value: "LATE", label: "Late" },
  { value: "SICK_LEAVE", label: "Sick Leave" },
];

export default function RecordAttendanceModal({ isOpen, onClose, contract }: RecordAttendanceModalProps) {
  const [formData, setFormData] = useState({
    attendance_date: new Date().toISOString().split("T")[0],
    status: "PRESENT",
    notes: "",
  });

  const [createAttendance, { isLoading }] = useCreateIfasheParentAttendanceMutation();

  useEffect(() => {
    if (isOpen) {
      setFormData({
        attendance_date: new Date().toISOString().split("T")[0],
        status: "PRESENT",
        notes: "",
      });
    }
  }, [isOpen]);

  if (!isOpen || !contract) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createAttendance({
        work_record: contract.id,
        attendance_date: formData.attendance_date,
        status: formData.status,
        notes: formData.notes,
      }).unwrap();
      toast.success(`Attendance recorded for ${contract.parentName}`);
      onClose();
    } catch (err) {
      toast.error(parseApiError(err, "Failed to record attendance."));
    }
  };

  const getStatusColor = (v: string) => {
    switch (v) {
      case "PRESENT": return "bg-green-100 text-green-700 border-green-300";
      case "ABSENT": return "bg-red-100 text-red-700 border-red-300";
      case "LATE": return "bg-amber-100 text-amber-700 border-amber-300";
      case "SICK_LEAVE": return "bg-blue-100 text-blue-700 border-blue-300";
      default: return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-xl">

        {/* Header */}
        <div className="px-6 py-5 border-b flex items-center justify-between bg-emerald-900 rounded-t-2xl">
          <div>
            <h2 className="text-lg font-semibold text-white">Record Attendance</h2>
            <p className="text-emerald-200 text-xs mt-0.5">
              {contract.parentName} — {contract.jobRole}
            </p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-emerald-800 hover:bg-emerald-700 flex items-center justify-center transition-colors">
            <X className="w-4 h-4 text-white" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-5">

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              <span className="flex items-center gap-1.5"><CalendarDays className="w-4 h-4 text-emerald-600" />Attendance Date *</span>
            </label>
            <input
              type="date"
              value={formData.attendance_date}
              onChange={(e) => setFormData({ ...formData, attendance_date: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              required
            />
          </div>

          {/* Status — visual button group */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status *</label>
            <div className="grid grid-cols-2 gap-2">
              {STATUSES.map((s) => (
                <button
                  key={s.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, status: s.value })}
                  className={`py-2 px-3 rounded-lg text-sm font-medium border transition-all ${
                    formData.status === s.value
                      ? getStatusColor(s.value) + " ring-2 ring-offset-1 ring-current"
                      : "bg-white border-gray-300 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              <span className="flex items-center gap-1.5"><FileText className="w-4 h-4 text-emerald-600" />Notes</span>
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
              placeholder="Reason for absence, late arrival, etc."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Footer */}
          <div className="flex gap-3 pt-1">
            <button type="button" onClick={onClose} className="flex-1 py-3 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 py-3 bg-emerald-900 text-white rounded-xl text-sm font-semibold hover:bg-emerald-800 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              {isLoading ? "Saving..." : "Record"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
