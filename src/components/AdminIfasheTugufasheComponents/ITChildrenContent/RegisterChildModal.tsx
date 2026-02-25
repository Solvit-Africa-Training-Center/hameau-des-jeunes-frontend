import { X, Save } from "lucide-react";
import { useState } from "react";

interface RegisterChildModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RegisterChildModal({ isOpen, onClose }: RegisterChildModalProps) {
  const [formData, setFormData] = useState({
    linkedFamily: "",
    fullName: "",
    dateOfBirth: "",
    gender: "",
    schoolName: "",
    educationLevel: "",
    supportStatus: "Active",
    healthConditions: "",
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Register child:", formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-xl">

        {/* Header */}
        <div className="px-6 py-5 border-b flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Register New Child</h2>
            <p className="text-sm text-gray-500 mt-0.5">
              Enter child details to register them in the program
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

          {/* Linked Family */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Linked Family *
            </label>
            <select
              value={formData.linkedFamily}
              onChange={(e) => setFormData({ ...formData, linkedFamily: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm appearance-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white"
            >
              <option value="">Select Family</option>
              <option value="Mukamana Vestine">Mukamana Vestine</option>
              <option value="Niyonzima Jean Claude">Niyonzima Jean Claude</option>
              <option value="Uwihana Grace">Uwihana Grace</option>
              <option value="Habimana Patrick">Habimana Patrick</option>
              <option value="Nyirahabimana Angelique">Nyirahabimana Angelique</option>
            </select>
          </div>

          {/* Full Name & Date of Birth */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name*
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date of Birth *
              </label>
              <input
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                placeholder="DD/MM/YYY"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Gender & School Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gender*
              </label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm appearance-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                School Name*
              </label>
              <input
                type="text"
                value={formData.schoolName}
                onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
                placeholder="Enter School name"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Education Level & Support Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Education Level*
              </label>
              <select
                value={formData.educationLevel}
                onChange={(e) => setFormData({ ...formData, educationLevel: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm appearance-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white"
              >
                <option value="">Select Level</option>
                <option value="Nursery">Nursery</option>
                <option value="Primary 1">Primary 1</option>
                <option value="Primary 2">Primary 2</option>
                <option value="Primary 3">Primary 3</option>
                <option value="Primary 4">Primary 4</option>
                <option value="Primary 5">Primary 5</option>
                <option value="Primary 6">Primary 6</option>
                <option value="Secondary 1">Secondary 1</option>
                <option value="Secondary 2">Secondary 2</option>
                <option value="Secondary 3">Secondary 3</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Support Status *
              </label>
              <select
                value={formData.supportStatus}
                onChange={(e) => setFormData({ ...formData, supportStatus: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm appearance-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Graduated">Graduated</option>
                <option value="Transferred">Transferred</option>
              </select>
            </div>
          </div>

          {/* Health Conditions */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Health Conditions
            </label>
            <textarea
              value={formData.healthConditions}
              onChange={(e) => setFormData({ ...formData, healthConditions: e.target.value })}
              rows={4}
              placeholder="Any health condition, allergies or special needs..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
            />
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
              className="flex-1 py-3 bg-emerald-900 text-white rounded-xl text-sm font-medium hover:bg-emerald-800 transition-colors flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save Child
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}