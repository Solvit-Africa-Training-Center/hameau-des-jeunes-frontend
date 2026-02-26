import { X, Trash2, AlertTriangle } from "lucide-react";
import { useDeleteIfasheChildMutation } from "@/store/api/ifasheChildrenApi";
import type { Child } from "./IfasheTugufasheChildrenView";
import { toast } from "react-toastify";
import { useState } from "react";

interface ManageChildModalProps {
  isOpen: boolean;
  onClose: () => void;
  child: Child | null;
}

export default function ManageChildModal({ isOpen, onClose, child }: ManageChildModalProps) {
  const [deleteChild, { isLoading }] = useDeleteIfasheChildMutation();
  const [confirmDelete, setConfirmDelete] = useState(false);

  if (!isOpen || !child) return null;

  const handleDelete = async () => {
    try {
      await deleteChild(child.id).unwrap();
      toast.success("Child removed from program successfully");
      setConfirmDelete(false);
      onClose();
    } catch (error) {
      console.error("Failed to delete child", error);
      toast.error("Failed to delete child record");
      setConfirmDelete(false);
    }
  };

  const closeHandler = () => {
    setConfirmDelete(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b bg-gray-50 flex items-center justify-between shrink-0">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Manage Child</h2>
            <p className="text-sm text-gray-500 mt-0.5">
              Administrative actions for {child.childId}
            </p>
          </div>
          <button
            onClick={closeHandler}
            className="w-8 h-8 rounded-full bg-white hover:bg-gray-200 border border-gray-200 flex items-center justify-center transition-colors shrink-0"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-900">Child Information</h3>
            <div className="mt-2 text-sm text-gray-600 space-y-1">
              <p><span className="font-medium text-gray-500">Name:</span> {child.fullName}</p>
              <p><span className="font-medium text-gray-500">Family:</span> {child.linkedFamily}</p>
              <p><span className="font-medium text-gray-500">Status:</span> {child.status}</p>
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-sm font-medium text-red-600 flex items-center gap-2 mb-3">
              <AlertTriangle className="w-4 h-4" /> Danger Zone
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Deleting a child will permanently remove their records from the Ifashe Tugufashe program. This action cannot be undone.
            </p>

            {confirmDelete ? (
              <div className="p-4 bg-red-50 border border-red-100 rounded-lg">
                <p className="text-sm text-red-800 font-medium mb-3">Are you absolutely sure?</p>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setConfirmDelete(false)}
                    className="flex-1 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleDelete}
                    disabled={isLoading}
                    className="flex-1 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isLoading ? "Deleting..." : "Yes, Delete Record"}
                  </button>
                </div>
              </div>
            ) : (
              <button 
                onClick={() => setConfirmDelete(true)}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-white border border-red-200 text-red-600 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors"
              >
                <Trash2 className="w-4 h-4" /> Remove Child from Program
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
