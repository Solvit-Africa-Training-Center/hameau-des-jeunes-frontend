import type { Feedback } from "./InternshipFeedbackView";

interface FeedbackDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  feedback: Feedback | null;
}

export default function FeedbackDetailsModal({
  isOpen,
  onClose,
  feedback,
}: FeedbackDetailsModalProps) {
  if (!isOpen || !feedback) return null;

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl">

        {/* Header */}
        <div className="px-6 py-5 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Feedback Details</h2>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4">

          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-500 mb-1">Intern Name</p>
              <p className="text-sm text-gray-900 font-medium">{feedback.internName}</p>
            </div>

            <div>
              <p className="text-xs text-gray-500 mb-1">Program</p>
              <p className="text-sm text-gray-900 font-medium">{feedback.program}</p>
            </div>

            <div>
              <p className="text-xs text-gray-500 mb-1">Submission Date</p>
              <p className="text-sm text-gray-900 font-medium">{feedback.submissionDate}</p>
            </div>

            <div>
              <p className="text-xs text-gray-500 mb-1">Supervisor</p>
              <p className="text-sm text-gray-900 font-medium">{feedback.supervisor}</p>
            </div>
          </div>

          {/* Feedback Content */}
          <div>
            <p className="text-xs text-gray-500 mb-2">Feedback</p>
            <p className="text-sm text-gray-900 leading-relaxed">{feedback.feedbackFull}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t">
          <button
            onClick={onClose}
            className="w-full py-3 bg-emerald-900 text-white rounded-xl text-sm font-medium hover:bg-emerald-800 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}