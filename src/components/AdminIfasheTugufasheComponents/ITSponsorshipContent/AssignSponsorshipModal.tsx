import { X } from "lucide-react";
import { useState } from "react";
import { useCreateIfasheSponsorshipMutation } from "@/store/api/ifasheSponsorshipsApi";
import { useGetIfasheFamiliesQuery } from "@/store/api/ifasheFamiliesApi";
import { useGetIfasheChildrenQuery } from "@/store/api/ifasheChildrenApi";
import { toast } from "react-toastify";

interface AssignSponsorshipModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AssignSponsorshipModal({ isOpen, onClose }: AssignSponsorshipModalProps) {
  const [formData, setFormData] = useState({
    selectFamily: "",
    selectChild: "",
    sponsorshipType: "FULL",
    startDate: "",
    expectedEndDate: "",
    status: "ACTIVE",
    pauseReason: "",
  });

  const { data: fetchedFamilies = [] } = useGetIfasheFamiliesQuery();
  const { data: fetchedChildren = [] } = useGetIfasheChildrenQuery();
  const [createSponsorship, { isLoading }] = useCreateIfasheSponsorshipMutation();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        child: formData.selectChild,
        sponsorship_type: formData.sponsorshipType,
        start_date: formData.startDate,
        end_date: formData.expectedEndDate || null,
        status: formData.status,
        pause_reason: formData.pauseReason,
      };
      await createSponsorship(payload).unwrap();
      toast.success("Sponsorship assigned successfully!");
      setFormData({
        selectFamily: "",
        selectChild: "",
        sponsorshipType: "FULL",
        startDate: "",
        expectedEndDate: "",
        status: "ACTIVE",
        pauseReason: "",
      });
      onClose();
    } catch (error) {
      console.error("Failed to assign sponsorship", error);
      toast.error("Failed to assign sponsorship");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-xl">

        {/* Header */}
        <div className="px-6 py-5 border-b flex items-center justify-between shrink-0">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Assign New Sponsorship</h2>
            <p className="text-sm text-gray-500 mt-0.5">
              Create a new sponsorship assignment
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors shrink-0"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4 max-h-[70vh] overflow-y-auto">

          {/* Select Child */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Family (Filter)
              </label>
              <select
                value={formData.selectFamily}
                onChange={(e) => {
                  setFormData({ ...formData, selectFamily: e.target.value, selectChild: "" });
                }}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm appearance-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white"
              >
                <option value="">All Families</option>
                {fetchedFamilies.map((f: any) => {
                  const parentName = f.parents?.[0]?.first_name 
                    ? `${f.parents[0].first_name} ${f.parents[0].last_name || ""}`.trim() 
                    : (f.family_name || "Unknown Family");
                  return (
                    <option key={f.id} value={f.id}>
                      {parentName}
                    </option>
                  );
                })}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Specific Child *
              </label>
              <select
                value={formData.selectChild}
                onChange={(e) => setFormData({ ...formData, selectChild: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm appearance-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white disabled:opacity-50 disabled:bg-gray-50"
                required
                disabled={!fetchedChildren.length}
              >
                <option value="">Select a Child</option>
                {fetchedChildren
                  .filter((child: any) => {
                    if (!formData.selectFamily) return true;
                    return child.family === formData.selectFamily || child.family_id === formData.selectFamily || child.linked_family === formData.selectFamily;
                  })
                  .map((child: any) => (
                    <option key={child.id} value={child.id}>
                      {child.full_name || child.first_name || "Unknown Child"}
                    </option>
                  ))}
              </select>
            </div>

            {/* Sponsorship Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sponsorship Type *
              </label>
              <select
                value={formData.sponsorshipType}
                onChange={(e) => setFormData({ ...formData, sponsorshipType: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm appearance-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white"
                required
              >
                <option value="FULL">Full Sponsorship</option>
                <option value="PARTIAL">Partial Sponsorship</option>
              </select>
            </div>
          </div>

          {/* Start Date & Expected End Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Date *
              </label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                placeholder="mm/dd/yyy"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Expected End Date
              </label>
              <input
                type="date"
                value={formData.expectedEndDate}
                onChange={(e) => setFormData({ ...formData, expectedEndDate: e.target.value })}
                placeholder="mm/dd/yyy"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Status & Pause Reason */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status *</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm appearance-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white"
                required
              >
                <option value="ACTIVE">Active</option>
                <option value="SUSPENDED">Suspended</option>
                <option value="COMPLETED">Completed</option>
              </select>
            </div>

            {formData.status === "SUSPENDED" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Pause Reason</label>
                <input
                  type="text"
                  value={formData.pauseReason}
                  onChange={(e) => setFormData({ ...formData, pauseReason: e.target.value })}
                  placeholder="Reason for suspension"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
            )}
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
              disabled={isLoading || !formData.selectChild || !formData.startDate}
              className="flex-1 py-3 bg-emerald-900 text-white rounded-xl text-sm font-medium hover:bg-emerald-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Assigning..." : "Assign Sponsorship"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}