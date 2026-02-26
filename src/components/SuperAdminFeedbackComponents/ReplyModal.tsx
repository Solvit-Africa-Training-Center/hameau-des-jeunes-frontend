import { useState } from "react";
import type { Admin } from "./FeedbackTable";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { X } from "lucide-react";

interface ReplyModalProps {
  isOpen: boolean;
  admin: Admin | null;
  onClose: () => void;
  onSave: (response: string) => void;
}

export const ReplyModal = ({
  isOpen,
  admin,
  onClose,
  onSave,
}: ReplyModalProps) => {
  const [response, setResponse] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(response);
    setResponse("");
    onClose();
  };

  const handleClose = () => {
    setResponse("");
    onClose();
  };

  if (!isOpen || !admin) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-[9998] transition-opacity"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[9999] w-full max-w-2xl">
        <div className="bg-white rounded-lg shadow-xl max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-900">
              Reply to {admin.name}
            </h2>
            <button
              onClick={handleClose}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-[#0F3D2E] text-white hover:bg-[#0F3D2E]/90 transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Original Message */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Original Message:
              </label>
              <div className="bg-[#F5F7FA] rounded-lg p-4">
                <p className="text-sm text-gray-700">
                  "{admin.messagePreview}"
                </p>
              </div>
            </div>

            {/* Your Response */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Your Response
              </label>
              <Textarea
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                placeholder="Type your reply....."
                className="min-h-[200px] resize-none border-gray-300 focus:border-[#0F3D2E] focus:ring-[#0F3D2E]"
                required
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                className="flex-1 border-gray-300 hover:bg-gray-50"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-[#0F3D2E] hover:bg-[#0F3D2E]/90"
              >
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
