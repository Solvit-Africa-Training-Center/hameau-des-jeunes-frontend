import { X } from "lucide-react";
import { useState } from "react";

interface AddClothesDistributionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddClothesDistributionModal({
  isOpen,
  onClose,
}: AddClothesDistributionModalProps) {
  const [formData, setFormData] = useState({
    selectChild: "",
    itemsProvided: "",
    quantity: "",
    distributionDate: "",
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Add clothes distribution:", formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-xl">

        {/* Header */}
        <div className="px-6 py-5 border-b flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Add Clothes Distribution</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors shrink-0"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">

          {/* Select Child & Items Provided */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Child *
              </label>
              <select
                value={formData.selectChild}
                onChange={(e) => setFormData({ ...formData, selectChild: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm appearance-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white"
              >
                <option value="">Select Child</option>
                <option value="Ishimwe Marie">Ishimwe Marie</option>
                <option value="Mugisha Eric">Mugisha Eric</option>
                <option value="Uwase Serah">Uwase Serah</option>
                <option value="Niyonzima Desire">Niyonzima Desire</option>
                <option value="Niyonzima Peace">Niyonzima Peace</option>
                <option value="Niyonzima Diane">Niyonzima Diane</option>
                <option value="Niyonzima Junior">Niyonzima Junior</option>
                <option value="Umutoni Ange">Umutoni Ange</option>
                <option value="Ingabire Faith">Ingabire Faith</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Items Provided *
              </label>
              <input
                type="text"
                value={formData.itemsProvided}
                onChange={(e) => setFormData({ ...formData, itemsProvided: e.target.value })}
                placeholder="e.g School uniforms, Shoes, Jacket..."
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Quantity & Distribution Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity *
              </label>
              <input
                type="number"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                placeholder="1"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Distribution Date *
              </label>
              <input
                type="date"
                value={formData.distributionDate}
                onChange={(e) => setFormData({ ...formData, distributionDate: e.target.value })}
                placeholder="e.g Books, Uniforms, Stationery"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
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
              className="flex-1 py-3 bg-emerald-900 text-white rounded-xl text-sm font-medium hover:bg-emerald-800 transition-colors"
            >
              Add Distribution
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}