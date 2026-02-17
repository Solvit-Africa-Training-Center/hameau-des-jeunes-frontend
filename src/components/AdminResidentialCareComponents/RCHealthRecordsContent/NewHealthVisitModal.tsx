import { X } from "lucide-react";

interface NewHealthVisitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NewHealthVisitModal({ isOpen, onClose }: NewHealthVisitModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl">

        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b">
          <h2 className="text-lg font-semibold text-gray-900">New Health Visit</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* Modal Form */}
        <form className="px-6 py-5 space-y-5">

          {/* Names */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Names</label>
            <div className="relative">
              <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm appearance-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white text-gray-700">
                <option value="">Samuel Kwizera</option>
                <option value="1">Samuel Kwizera</option>
                <option value="2">Aisha Kamali</option>
                <option value="3">David Mugisha</option>
                <option value="4">Umugwaneza Aline</option>
                <option value="5">Kayitesi Pascoline</option>
                <option value="6">Mutize Aline</option>
                <option value="7">Meza Joyce</option>
                <option value="8">Hirwa Prince</option>
                <option value="9">Muhire Eric</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Facility Name & Date */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Facility name</label>
              <input
                type="text"
                placeholder="e.g Kigali Clinic"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
              <input
                type="date"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-gray-500"
              />
            </div>
          </div>

          {/* Illness / Complaint */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Illness / Complaint
            </label>
            <input
              type="text"
              placeholder="Reason for intake"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>

          {/* Prescribed Meds & Notes */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Prescribed Meds
              </label>
              <input
                type="text"
                placeholder="Dosage info"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
              <input
                type="text"
                placeholder="Clinic notes"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-emerald-900 text-white rounded-xl text-sm font-medium hover:bg-emerald-800 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}