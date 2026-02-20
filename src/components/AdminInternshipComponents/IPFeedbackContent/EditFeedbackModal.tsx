import { X } from "lucide-react";
import { useState } from "react";
import type { Feedback } from "./InternshipFeedbackView";

interface EditFeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  feedback: Feedback | null;
}

export default function EditFeedbackModal({
  isOpen,
  onClose,
  feedback,
}: EditFeedbackModalProps) {
  const [formData, setFormData] = useState({
    intern: feedback?.internName || "",
    program: feedback?.program || "",
    supervisor: feedback?.supervisor || "",
    feedbackContent: feedback?.feedbackFull || "",
  });

  if (!isOpen || !feedback) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Update feedback:", formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl">

        {/* Header */}
        <div className="px-6 py-5 border-b flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Edit Feedback</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">

          {/* Intern Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Intern *</label>
            <select
              value={formData.intern}
              onChange={(e) => setFormData({ ...formData, intern: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm appearance-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white"
            >
              <option value="Maria Santos">Maria Santos</option>
              <option value="Carlos Rodriguez">Carlos Rodriguez</option>
            </select>
          </div>

          {/* Program & Supervisor */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Program</label>
              <select
                value={formData.program}
                onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm appearance-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white"
              >
                <option value="Irashe Tugufashe">Ifashe Tugufashe</option>
                <option value="Tourism & Cultural Visits">Tourism & Cultural Visits</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Supervisor *
              </label>
              <select
                value={formData.supervisor}
                onChange={(e) => setFormData({ ...formData, supervisor: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm appearance-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white"
              >
                <option value="Jennifer Williams">Jennifer Williams</option>
                <option value="Michael Chen">Michael Chen</option>
              </select>
            </div>
          </div>

          {/* Feedback Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Feedback Content *
            </label>
            <textarea
              value={formData.feedbackContent}
              onChange={(e) => setFormData({ ...formData, feedbackContent: e.target.value })}
              rows={6}
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
              Close
            </button>
            <button
              type="submit"
              className="flex-1 py-3 bg-emerald-900 text-white rounded-xl text-sm font-medium hover:bg-emerald-800 transition-colors"
            >
              Update Assignment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}