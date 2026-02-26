import { X, Save } from "lucide-react";
import { useState, useEffect } from "react";
import { useUpdateIfasheSponsorshipMutation } from "@/store/api/ifasheSponsorshipsApi";
import type { Sponsorship } from "./IfasheTugufasheSponsorshipView";
import { toast } from "react-toastify";
import { parseApiError } from "@/utils/apiErrorParser";

interface EditSponsorshipModalProps {
  isOpen: boolean;
  onClose: () => void;
  sponsorship: Sponsorship | null;
}

export default function EditSponsorshipModal({
  isOpen,
  onClose,
  sponsorship,
}: EditSponsorshipModalProps) {
  const [formData, setFormData] = useState({
    sponsorshipType: "FULL",
    startDate: "",
    endDate: "",
    status: "ACTIVE",
    pauseReason: "",
  });

  const [updateSponsorship, { isLoading }] = useUpdateIfasheSponsorshipMutation();

  useEffect(() => {
    if (sponsorship) {
      setFormData({
        sponsorshipType: sponsorship.type || "FULL",
        startDate: sponsorship.startDate !== "Unknown" ? sponsorship.startDate : "",
        endDate: sponsorship.endDate !== "N/A" && sponsorship.endDate !== "null" ? sponsorship.endDate : "",
        status: sponsorship.status || "ACTIVE",
        pauseReason: sponsorship.pauseReason || "",
      });
    }
  }, [sponsorship]);

  if (!isOpen || !sponsorship) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        sponsorship_type: formData.sponsorshipType,
        start_date: formData.startDate,
        end_date: formData.endDate || null,
        status: formData.status,
        pause_reason: formData.status === "SUSPENDED" ? formData.pauseReason : "",
      };
      await updateSponsorship({ id: sponsorship.id, data: payload }).unwrap();
      toast.success("Sponsorship updated successfully!");
      onClose();
    } catch (error: any) {
      toast.error(parseApiError(error, "Failed to update sponsorship."));
    }
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-xl max-h-[90vh] flex flex-col">

        {/* Header */}
        <div className="px-6 py-5 border-b flex items-center justify-between shrink-0">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Edit Sponsorship</h2>
            <p className="text-sm text-gray-500 mt-0.5">
              Updating sponsorship for <span className="font-medium">{sponsorship.beneficiaryName}</span>
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

            {/* Start Date & End Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date *
                </label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expected End Date
                </label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Status */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status *
                </label>
                <select
                value={formData.status}
                onChange={(e) => {
                  const newStatus = e.target.value;
                  setFormData({
                    ...formData,
                    status: newStatus,
                    pauseReason: newStatus !== "SUSPENDED" ? "" : formData.pauseReason,
                  });
                }}
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pause Reason <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.pauseReason}
                    onChange={(e) => setFormData({ ...formData, pauseReason: e.target.value })}
                    placeholder="Reason for suspension (required)"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    required
                  />
                </div>
              )}
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
