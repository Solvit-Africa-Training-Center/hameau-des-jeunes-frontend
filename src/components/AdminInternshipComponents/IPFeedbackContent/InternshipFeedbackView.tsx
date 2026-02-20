import { useState } from "react";
import { Search, SlidersHorizontal, Eye, Pencil, Trash2, MessageSquare } from "lucide-react";

export interface Feedback {
  id: string;
  internName: string;
  program: string;
  supervisor: string;
  feedbackPreview: string;
  feedbackFull: string;
  submissionDate: string;
}

interface InternshipFeedbackViewProps {
  onAddFeedback: () => void;
  onViewFeedback: (feedback: Feedback) => void;
  onEditFeedback: (feedback: Feedback) => void;
  onDeleteFeedback: (feedbackId: string) => void;
}

export default function InternshipFeedbackView({
  onAddFeedback,
  onViewFeedback,
  onEditFeedback,
  onDeleteFeedback,
}: InternshipFeedbackViewProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const feedbacks: Feedback[] = [
    {
      id: "1",
      internName: "Maria Santos",
      program: "Irashe Tugufashe",
      supervisor: "Jennifer Williams",
      feedbackPreview: "Maria has shown exceptional creativity and...",
      feedbackFull:
        "Maria has shown exceptional creativity and dedication. She quickly adapted to our team workflows and contributed valuable insights to our social media campaigns.",
      submissionDate: "Feb 7, 2026",
    },
    {
      id: "2",
      internName: "Carlos Rodriguez",
      program: "Tourism & Cultural Visits",
      supervisor: "Michael Chen",
      feedbackPreview: "Carlos demonstrated excellent communication skills...",
      feedbackFull:
        "Carlos demonstrated excellent communication skills and cultural sensitivity throughout his internship. He successfully organized three cultural exchange events and received positive feedback from all participants.",
      submissionDate: "Feb 10, 2026",
    },
  ];

  const filteredFeedbacks = feedbacks.filter((feedback) =>
    feedback.internName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full h-screen bg-gray-50 flex flex-col overflow-hidden">
      <div className="flex-1 flex flex-col p-4 sm:p-6 lg:p-8 overflow-hidden">

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start justify-between mb-5 gap-4 shrink-0">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-1">Feedback System</h1>
            <p className="text-sm text-gray-600">View Feedback from Applicants here.</p>
          </div>
          <button
            onClick={onAddFeedback}
            className="flex items-center gap-2 bg-emerald-900 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-emerald-800 transition-colors whitespace-nowrap"
          >
            <MessageSquare className="w-4 h-4" />
            Add Feedback
          </button>
        </div>

        {/* Search Bar */}
        <div className="flex justify-end gap-3 mb-4 shrink-0">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>
          <button className="flex items-center justify-center px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <SlidersHorizontal className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-xl shadow-sm flex flex-col flex-1 overflow-hidden">

          {/* Desktop Table */}
          <div className="hidden lg:flex flex-col flex-1 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b shrink-0">
                <tr className="text-left">
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Intern Name
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Program
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Supervisor
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Feedback Preview
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Submission Date
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
            </table>
            <div className="overflow-auto flex-1">
              <table className="w-full">
                <tbody className="bg-white divide-y divide-gray-100">
                  {filteredFeedbacks.map((feedback) => (
                    <tr key={feedback.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-900">{feedback.internName}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{feedback.program}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{feedback.supervisor}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {feedback.feedbackPreview}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {feedback.submissionDate}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => onViewFeedback(feedback)}
                            className="p-1.5 hover:bg-blue-50 rounded-lg transition-colors"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4 text-blue-500" />
                          </button>
                          <button
                            onClick={() => onEditFeedback(feedback)}
                            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Pencil className="w-4 h-4 text-gray-500" />
                          </button>
                          <button
                            onClick={() => onDeleteFeedback(feedback.id)}
                            className="p-1.5 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden overflow-auto flex-1 p-4 space-y-3">
            {filteredFeedbacks.map((feedback) => (
              <div
                key={feedback.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-medium text-gray-900 text-sm">
                      {feedback.internName}
                    </h3>
                    <p className="text-xs text-gray-500">{feedback.program}</p>
                  </div>
                  <span className="text-xs text-gray-400">{feedback.submissionDate}</span>
                </div>

                <div className="space-y-2 text-xs mb-3">
                  <div>
                    <span className="text-gray-500">Supervisor:</span>
                    <span className="ml-1 text-gray-900">{feedback.supervisor}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Feedback:</span>
                    <p className="text-gray-900 mt-1">{feedback.feedbackPreview}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-3 border-t">
                  <button
                    onClick={() => onViewFeedback(feedback)}
                    className="flex-1 flex items-center justify-center gap-1 py-2 bg-blue-50 text-blue-600 rounded-lg text-xs font-medium hover:bg-blue-100 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    View
                  </button>
                  <button
                    onClick={() => onEditFeedback(feedback)}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Pencil className="w-4 h-4 text-gray-500" />
                  </button>
                  <button
                    onClick={() => onDeleteFeedback(feedback.id)}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredFeedbacks.length === 0 && (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-gray-500 text-sm">No feedback found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}