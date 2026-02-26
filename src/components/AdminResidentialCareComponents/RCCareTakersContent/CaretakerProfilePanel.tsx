import { X, Eye } from "lucide-react";
import type { Caretaker } from "@/store/api/caretakersApi";

const placeholderChildren = [
  {
    id: "1",
    name: "Samuel Kwizera",
    avatar: "/kid1.jpg",
    age: 8,
    gender: "Male",
  },
  {
    id: "2",
    name: "Aisha Kamali",
    avatar: "/kid2.jpg",
    age: 10,
    gender: "Female",
  },
  {
    id: "3",
    name: "David Mugisha",
    avatar: "/kid3.jpg",
    age: 13,
    gender: "Male",
  },
  {
    id: "4",
    name: "Umugwaneza Aline",
    avatar: "/kid4.jpg",
    age: 9,
    gender: "Female",
  },
];

interface CaretakerProfilePanelProps {
  isOpen: boolean;
  onClose: () => void;
  caretaker: Caretaker | null;
}

export default function CaretakerProfilePanel({
  isOpen,
  onClose,
  caretaker,
}: CaretakerProfilePanelProps) {
  if (!caretaker) return null;

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 bg-opacity-20 z-50"
          onClick={onClose}
        />
      )}

      {/* Slide-in Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5">
            <h2 className="text-lg font-semibold text-gray-900">Profile</h2>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4 text-gray-600" />
            </button>
          </div>

          {/* Avatar + Name */}
          <div className="flex flex-col items-center px-6 pb-6 border-b">
            <img
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${caretaker.first_name}`}
              alt={caretaker.full_name}
              className="w-28 h-28 rounded-full object-cover mb-4"
            />
            <h3 className="text-lg font-semibold text-gray-900">
              {caretaker.full_name}
            </h3>
            <p className="text-sm text-blue-500">
              {caretaker.role.replace(/_/g, " ")}
            </p>
          </div>

          {/* Contact Information */}
          <div className="px-6 py-5 border-b">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">
              Contact Information
            </h4>
            <div className="bg-gray-50 rounded-xl overflow-hidden divide-y divide-gray-200">
              <div className="flex items-center justify-between px-4 py-3">
                <span className="text-sm text-gray-500">Phone</span>
                <span className="text-sm text-gray-900 font-medium">
                  {caretaker.phone}
                </span>
              </div>
              <div className="flex items-center justify-between px-4 py-3">
                <span className="text-sm text-gray-500">Email</span>
                <span className="text-sm text-gray-900 font-medium">
                  {caretaker.email}
                </span>
              </div>
              <div className="flex items-center justify-between px-4 py-3">
                <span className="text-sm text-gray-500">Hire Date</span>
                <span className="text-sm text-gray-900 font-medium">
                  {caretaker.hire_date}
                </span>
              </div>
              <div className="flex items-center justify-between px-4 py-3">
                <span className="text-sm text-gray-500">Status</span>
                <span
                  className={`text-sm font-medium ${
                    caretaker.is_active ? "text-green-600" : "text-gray-400"
                  }`}
                >
                  {caretaker.is_active ? "Active" : "Inactive"}
                </span>
              </div>
            </div>
          </div>

          {/* Assigned Children */}
          <div className="px-6 py-5">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">
              Assigned Children
            </h4>
            <div className="space-y-2">
              {placeholderChildren.map((child) => (
                <div
                  key={child.id}
                  className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={child.avatar}
                      alt={child.name}
                      className="w-9 h-9 rounded-full object-cover"
                    />
                    <span className="text-sm font-medium text-gray-900">
                      {child.name}
                    </span>
                  </div>
                  <button className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors">
                    <Eye className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
