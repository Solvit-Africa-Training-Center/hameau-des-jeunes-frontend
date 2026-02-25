import { X, UserPlus, User, Briefcase, CalendarDays } from "lucide-react";
import { useState } from "react";
import { useCreateIfasheParentContractMutation } from "@/store/api/ifasheParentsApi";
import { useGetIfasheParentsQuery } from "@/store/api/ifasheParentsApi";
import { toast } from "react-toastify";
import { parseApiError } from "@/utils/apiErrorParser";

interface AssignParentWorkModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const JOB_ROLES = [
  "Kitchen", "Cleaning", "Farm / Agriculture", "Administration",
  "Security", "Childcare Assistant", "Laundry", "Construction / Maintenance",
  "Transport", "Other"
];

export default function AssignParentWorkModal({ isOpen, onClose }: AssignParentWorkModalProps) {
  const [formData, setFormData] = useState({
    parent: "",
    job_role: "",
    status: "ACTIVE",
    contract_start_date: new Date().toISOString().split("T")[0],
    contract_end_date: "",
  });

  const { data: parents = [] } = useGetIfasheParentsQuery();
  const [createContract, { isLoading }] = useCreateIfasheParentContractMutation();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.parent || !formData.job_role) {
      toast.error("Parent and Job Role are required.");
      return;
    }
    try {
      await createContract({
        parent: formData.parent,
        job_role: formData.job_role,
        status: formData.status,
        contract_start_date: formData.contract_start_date,
        ...(formData.contract_end_date ? { contract_end_date: formData.contract_end_date } : {}),
      }).unwrap();
      toast.success("Parent work assignment created!");
      setFormData({
        parent: "",
        job_role: "",
        status: "ACTIVE",
        contract_start_date: new Date().toISOString().split("T")[0],
        contract_end_date: "",
      });
      onClose();
    } catch (err) {
      toast.error(parseApiError(err, "Failed to assign parent work."));
    }
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-xl max-h-[90vh] flex flex-col">

        {/* Header */}
        <div className="px-6 py-5 border-b flex items-center justify-between shrink-0 bg-emerald-900 rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-emerald-800 rounded-xl flex items-center justify-center">
              <UserPlus className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Assign Parent Work</h2>
              <p className="text-emerald-200 text-xs mt-0.5">Create a new work contract for a parent</p>
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

            {/* Parent */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                <span className="flex items-center gap-1.5"><User className="w-4 h-4 text-emerald-600" />Parent *</span>
              </label>
              <select
                value={formData.parent}
                onChange={(e) => setFormData({ ...formData, parent: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm appearance-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white"
                required
              >
                <option value="">— Select a Parent —</option>
                {parents.map((p: any) => (
                  <option key={p.id} value={p.id}>
                    {p.full_name || `${p.first_name || ""} ${p.last_name || ""}`.trim() || p.name || "Unknown"}
                  </option>
                ))}
              </select>
            </div>

            {/* Job Role & Status */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  <span className="flex items-center gap-1.5"><Briefcase className="w-4 h-4 text-emerald-600" />Job Role *</span>
                </label>
                <select
                  value={formData.job_role}
                  onChange={(e) => setFormData({ ...formData, job_role: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm appearance-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white"
                  required
                >
                  <option value="">— Select Role —</option>
                  {JOB_ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Status *</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm appearance-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white"
                >
                  <option value="ACTIVE">Active</option>
                  <option value="SUSPENDED">Suspended</option>
                  <option value="TERMINATED">Terminated</option>
                  <option value="COMPLETED">Completed</option>
                </select>
              </div>
            </div>

            {/* Contract Start Date & End Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  <CalendarDays className="inline w-4 h-4 text-emerald-600 mr-1" />Contract Start Date *
                </label>
                <input
                  type="date"
                  value={formData.contract_start_date}
                  onChange={(e) => setFormData({ ...formData, contract_start_date: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  <CalendarDays className="inline w-4 h-4 text-emerald-600 mr-1" />Contract End Date
                </label>
                <input
                  type="date"
                  value={formData.contract_end_date}
                  onChange={(e) => setFormData({ ...formData, contract_end_date: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t bg-gray-50 flex gap-3 sticky bottom-0 rounded-b-2xl">
            <button type="button" onClick={onClose} className="flex-1 py-3 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 hover:bg-white transition-colors">
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading || !formData.parent || !formData.job_role}
              className="flex-1 py-3 bg-emerald-900 text-white rounded-xl text-sm font-semibold hover:bg-emerald-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Assigning..." : "Assign Parent"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
