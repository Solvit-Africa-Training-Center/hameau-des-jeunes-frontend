import { X } from "lucide-react";
import { useState } from "react";
import { useCreateIfasheSponsorshipMutation } from "@/store/api/ifasheSponsorshipsApi";

interface AssignSponsorshipModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AssignSponsorshipModal({ isOpen, onClose }: AssignSponsorshipModalProps) {
  const [formData, setFormData] = useState({
    selectFamily: "",
    selectChild: "",
    sponsorshipType: "",
    sponsorSource: "",
    startDate: "",
    expectedEndDate: "",
    status: "Active",
  });

  const [createSponsorship, { isLoading }] = useCreateIfasheSponsorshipMutation();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        family: formData.selectFamily,
        child: formData.selectChild,
        sponsorship_type: formData.sponsorshipType,
        sponsor_source: formData.sponsorSource,
        start_date: formData.startDate,
        expected_end_date: formData.expectedEndDate,
        status: formData.status,
      };
      await createSponsorship(payload).unwrap();
      setFormData({
        selectFamily: "",
        selectChild: "",
        sponsorshipType: "",
        sponsorSource: "",
        startDate: "",
        expectedEndDate: "",
        status: "Active",
      });
      onClose();
    } catch (error) {
      console.error("Failed to assign sponsorship", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-xl">

        {/* Header */}
        <div className="px-6 py-5 border-b flex items-center justify-between">
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
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">

          {/* Select Family & Select Specific Child */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Family *
              </label>
              <select
                value={formData.selectFamily}
                onChange={(e) => setFormData({ ...formData, selectFamily: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm appearance-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white"
              >
                <option value="">Select Family</option>
                <option value="Mukamana Vestine">Mukamana Vestine</option>
                <option value="Niyonzima Jean Claude">Niyonzima Jean Claude</option>
                <option value="Uwihana Grace">Uwihana Grace</option>
                <option value="Habimana Patrick">Habimana Patrick</option>
                <option value="Nyirahabimana Angelique">Nyirahabimana Angelique</option>
                <option value="Ndayisaba Emmanuel">Ndayisaba Emmanuel</option>
                <option value="Bizimana Joseph">Bizimana Joseph</option>
                <option value="Mukamazimpaka Claudine">Mukamazimpaka Claudine</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Specific Child (Optional)
              </label>
              <select
                value={formData.selectChild}
                onChange={(e) => setFormData({ ...formData, selectChild: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm appearance-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white"
              >
                <option value="">Family-wide sponsorship</option>
                <option value="Ishimwe Marie">Ishimwe Marie</option>
                <option value="Mugisha Eric">Mugisha Eric</option>
                <option value="Uwase Serah">Uwase Serah</option>
                <option value="Niyonzima Desire">Niyonzima Desire</option>
                <option value="Niyonzima Peace">Niyonzima Peace</option>
              </select>
            </div>
          </div>

          {/* Sponsorship Type & Sponsor Source */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sponsorship Type *
              </label>
              <select
                value={formData.sponsorshipType}
                onChange={(e) => setFormData({ ...formData, sponsorshipType: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm appearance-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white"
              >
                <option value="">Select Type</option>
                <option value="Education-only">Education-only</option>
                <option value="Partial">Partial</option>
                <option value="Full">Full</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sponsor Source *
              </label>
              <input
                type="text"
                value={formData.sponsorSource}
                onChange={(e) => setFormData({ ...formData, sponsorSource: e.target.value })}
                placeholder="e.g Individual, Organization, Government"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
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

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status *</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm appearance-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white"
            >
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Suspended">Suspended</option>
              <option value="Completed">Completed</option>
            </select>
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
              disabled={isLoading}
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