import { useState } from "react";
import { X, Search } from "lucide-react";
import type { Caretaker, AssignedChild } from "./CaretakerView";
import kid1 from "@/assets/kid.jpg";
import kid2 from "@/assets/kid2.jpg";
import kid3 from "@/assets/kid3.jpg";
import kid4 from "@/assets/kid4.jpg";

interface AssignChildrenModalProps {
  isOpen: boolean;
  onClose: () => void;
  caretaker: Caretaker | null;
}

const allChildren: AssignedChild[] = [
  { id: "1", name: "Samuel Kwizera", avatar: kid1, age: 8, gender: "Male" },
  { id: "2", name: "Aisha Kamali", avatar: kid2, age: 10, gender: "Female" },
  { id: "3", name: "Umugwaneza Aline", avatar: kid3, age: 9, gender: "Female" },
  { id: "4", name: "Kayitesi Pascaline", avatar: kid4, age: 6, gender: "Female" },
  { id: "5", name: "Mukiza Aime", avatar: kid1, age: 7, gender: "Male" },
];

export default function AssignChildrenModal({
  isOpen,
  onClose,
  caretaker,
}: AssignChildrenModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  if (!isOpen || !caretaker) return null;

  const filteredChildren = allChildren.filter((child) =>
    child.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleChild = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleConfirm = () => {
    // Add your confirm logic here
    console.log("Assigned children:", selectedIds);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Add New Caretaker</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4">

          {/* Subtitle */}
          <p className="text-sm text-gray-700">
            Select children to assign to{" "}
            <span className="font-semibold">
              {caretaker.firstName} {caretaker.lastName}
            </span>
          </p>

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
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {filteredChildren.map((child) => (
              <div
                key={child.id}
                onClick={() => toggleChild(child.id)}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={child.avatar}
                    alt={child.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{child.name}</p>
                    <p className="text-xs text-gray-500">
                      {child.age} years . {child.gender}
                    </p>
                  </div>
                </div>
                <div
                  className={`w-5 h-5 rounded-full border-2 transition-colors ${
                    selectedIds.includes(child.id)
                      ? "border-emerald-900 bg-emerald-900"
                      : "border-gray-300"
                  }`}
                />
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-2 gap-4 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              className="px-6 py-3 bg-emerald-900 text-white rounded-xl text-sm font-medium hover:bg-emerald-800 transition-colors"
            >
              Confirm Assignments
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}