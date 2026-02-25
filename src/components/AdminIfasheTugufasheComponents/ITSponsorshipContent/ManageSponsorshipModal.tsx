import { X, Trash2, AlertTriangle } from "lucide-react";
import { useDeleteIfasheSponsorshipMutation } from "@/store/api/ifasheSponsorshipsApi";
import type { Sponsorship } from "./IfasheTugufasheSponsorshipView";
import { toast } from "react-toastify";
import { useState } from "react";

interface ManageSponsorshipModalProps {
  isOpen: boolean;
  onClose: () => void;
  sponsorship: Sponsorship | null;
}

export default function ManageSponsorshipModal({
  isOpen,
  onClose,
  sponsorship,
}: ManageSponsorshipModalProps) {
  const [confirmed, setConfirmed] = useState(false);
  const [deleteSponsorship, { isLoading }] = useDeleteIfasheSponsorshipMutation();

  if (!isOpen || !sponsorship) return null;

  const handleDelete = async () => {
    if (!confirmed) {
      setConfirmed(true);
      return;
    }
    try {
      await deleteSponsorship(sponsorship.id).unwrap();
      toast.success("Sponsorship removed successfully!");
      setConfirmed(false);
      onClose();
    } catch (error) {
      console.error("Failed to delete sponsorship", error);
      toast.error("Failed to remove sponsorship");
    }
  };

  const handleClose = () => {
    setConfirmed(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-xl">

        {/* Header */}
        <div className="px-6 py-5 border-b flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Manage Sponsorship</h2>
            <p className="text-sm text-gray-500 mt-0.5">
              {sponsorship.beneficiaryName}
            </p>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">

          {/* Info Card */}
          <div className="bg-gray-50 rounded-xl p-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Beneficiary</span>
              <span className="font-medium text-gray-900">{sponsorship.beneficiaryName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Type</span>
              <span className="font-medium text-gray-900">{sponsorship.type}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Status</span>
              <span className="font-medium text-gray-900">{sponsorship.status}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Period</span>
              <span className="font-medium text-gray-900">{sponsorship.startDate} → {sponsorship.endDate}</span>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="border border-red-200 rounded-xl overflow-hidden">
            <div className="bg-red-50 px-4 py-3 border-b border-red-200">
              <p className="text-sm font-semibold text-red-700 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Danger Zone
              </p>
            </div>
            <div className="p-4 space-y-3">
              <p className="text-sm text-gray-600">
                Permanently removing this sponsorship record cannot be undone.
              </p>
              {confirmed && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-xs text-red-600 font-medium">
                    ⚠️ Are you sure? Click the button again to confirm permanent deletion.
                  </p>
                </div>
              )}
              <button
                onClick={handleDelete}
                disabled={isLoading}
                className={`w-full py-2.5 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                  confirmed
                    ? "bg-red-600 hover:bg-red-700 text-white"
                    : "bg-red-50 hover:bg-red-100 text-red-600 border border-red-200"
                }`}
              >
                <Trash2 className="w-4 h-4" />
                {isLoading ? "Removing..." : confirmed ? "Confirm Permanent Deletion" : "Remove Sponsorship"}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
