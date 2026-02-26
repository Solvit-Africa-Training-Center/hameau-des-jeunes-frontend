import { X } from "lucide-react";
import { useState } from "react";
import type { Application } from "./InternshipApplicationsView";

interface RequestInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  application: Application | null;
  onConfirm: (notes: string) => void;
}

export default function RequestInfoModal({
  isOpen,
  onClose,
  application,
  onConfirm,
}: RequestInfoModalProps) {
  const [request, setRequest] = useState("");

  if (!isOpen || !application) return null;

  const handleSend = () => {
    onConfirm(request);
    setRequest("");
  };

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-xl">
        {/* Header */}
        <div className="px-6 py-5 border-b flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 flex-1 text-center">
            What information is needed?
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors shrink-0"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          <textarea
            value={request}
            onChange={(e) => setRequest(e.target.value)}
            placeholder="Describe the information you need"
            rows={6}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
          />
        </div>

        {/* Footer */}
        <div className="px-6 py-4 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 border border-gray-300 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
          <button
            onClick={handleSend}
            className="flex-1 py-3 bg-emerald-900 text-white rounded-xl text-sm font-medium hover:bg-emerald-800 transition-colors"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
