import { useState } from "react";
import type { Caretaker } from "@/store/api/caretakersApi";
import { useBulkAssignChildrenMutation } from "@/store/api/caretakersApi";
import { useGetChildrenQuery } from "@/store/api/childrenApi";
import { Search, X, Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "react-toastify";

interface AssignChildrenModalProps {
  isOpen: boolean;
  onClose: () => void;
  caretaker: Caretaker | null;
  assignedChildIds?: Set<string>;
}

export default function AssignChildrenModal({
  isOpen,
  onClose,
  caretaker,
  assignedChildIds = new Set(),
}: AssignChildrenModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const { data: children = [], isLoading, isError } = useGetChildrenQuery();
  const [bulkAssign, { isLoading: isAssigning }] =
    useBulkAssignChildrenMutation();

  if (!isOpen || !caretaker) return null;

  const filteredChildren = children
    .filter((child) => !assignedChildIds.has(child.id)) // exclude already assigned
    .filter((child) =>
      child.full_name.toLowerCase().includes(searchQuery.toLowerCase()),
    );

  const toggleChild = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const handleConfirm = async () => {
    if (!caretaker || selectedIds.length === 0) return;
    try {
      const result = await bulkAssign({
        caretaker_id: caretaker.id,
        children_ids: selectedIds,
      }).unwrap();

      const count = result.results?.length ?? selectedIds.length;
      toast.success(
        `${count} child${count !== 1 ? "ren" : ""} successfully assigned to ${caretaker.full_name}.`,
      );
      setSelectedIds([]);
      onClose();
    } catch (err) {
      console.error("Assignment failed:", err);
      toast.error("Failed to assign children. Please try again.");
    }
  };

  const handleClose = () => {
    setSelectedIds([]);
    setSearchQuery("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Assign Children
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">
              to{" "}
              <span className="font-medium text-gray-700">
                {caretaker.full_name}
              </span>
              {caretaker.role && (
                <span className="text-blue-500 ml-1">
                  · {caretaker.role.replace(/_/g, " ")}
                </span>
              )}
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
        <div className="px-6 py-5 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>

          {/* Children List */}
          <div className="space-y-1 max-h-72 overflow-y-auto pr-1">
            {isLoading && (
              <div className="flex items-center justify-center gap-2 py-8 text-sm text-gray-400">
                <Loader2 className="w-4 h-4 animate-spin" />
                Loading children...
              </div>
            )}

            {isError && (
              <p className="text-sm text-center text-red-500 py-6">
                Failed to load children. Please try again.
              </p>
            )}

            {!isLoading && !isError && filteredChildren.length === 0 && (
              <p className="text-sm text-center text-gray-400 py-6">
                {children.filter((c) => !assignedChildIds.has(c.id)).length ===
                0
                  ? "All children are already assigned to this caretaker."
                  : "No children found."}
              </p>
            )}

            {!isLoading &&
              !isError &&
              filteredChildren.map((child) => {
                const selected = selectedIds.includes(child.id);
                return (
                  <div
                    key={child.id}
                    onClick={() => toggleChild(child.id)}
                    className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                      selected
                        ? "bg-emerald-50 border border-emerald-200"
                        : "hover:bg-gray-50 border border-transparent"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={
                          child.profile_image ||
                          `https://api.dicebear.com/7.x/avataaars/svg?seed=${child.first_name}`
                        }
                        alt={child.full_name}
                        className="w-10 h-10 rounded-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${child.first_name}`;
                        }}
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {child.full_name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {child.age} yrs · {child.gender}
                        </p>
                      </div>
                    </div>

                    {selected ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-gray-300 shrink-0" />
                    )}
                  </div>
                );
              })}
          </div>

          {/* Selected count */}
          {selectedIds.length > 0 && (
            <p className="text-sm text-emerald-700 font-medium">
              {selectedIds.length} child{selectedIds.length > 1 ? "ren" : ""}{" "}
              selected
            </p>
          )}

          {/* Buttons */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <button
              type="button"
              onClick={handleClose}
              disabled={isAssigning}
              className="px-6 py-3 border border-gray-300 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              disabled={selectedIds.length === 0 || isAssigning}
              className="px-6 py-3 bg-emerald-900 text-white rounded-xl text-sm font-medium hover:bg-emerald-800 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isAssigning ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Assigning...
                </>
              ) : (
                "Confirm Assignments"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
