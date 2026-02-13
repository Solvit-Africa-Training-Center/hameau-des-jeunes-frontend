import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Admin } from "./UsersMgtTable";

interface DeleteAdminModalProps {
  isOpen: boolean;
  admin: Admin | null;
  onClose: () => void;
  onConfirm: () => void;
}

export const DeleteAdminModal = ({
  isOpen,
  admin,
  onClose,
  onConfirm,
}: DeleteAdminModalProps) => {
  if (!isOpen || !admin) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-xl">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Title */}
          <h2 className="text-lg font-bold text-center text-gray-900 mb-6">
            Delete User
          </h2>

          {/* Confirmation Text */}
          <p className="text-center text-gray-900 text-sm mb-6">
            Are you sure you want to delete{" "}
            <span className="font-bold">{admin.name}</span>?
          </p>

          {/* Warning Box */}
          <div className="bg-[#FEF8E6] border-l-4 border-[#F4B400] p-4 rounded-lg mb-8">
            <div className="flex items-start gap-3">
              <AlertTriangle
                className="text-[#F4B400] flex-shrink-0 mt-0.5"
                size={20}
              />
              <div>
                <h3 className="font-bold text-[#8B4513] mb-1">Warning</h3>
                <p className="text-[#8B4513] text-sm leading-relaxed">
                  By Deleteing this, he/she won't be able to access the system.
                  and the action can't be undone.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 border-2 border-gray-300 hover:bg-gray-50 text-gray-900 font-medium py-6 rounded-xl"
            >
              No, Cancel
            </Button>
            <Button
              type="button"
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className="flex-1 bg-[#EF4444] hover:bg-[#DC2626] text-white font-medium py-6 rounded-xl"
            >
              Yes, Delete
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
